import type { IMediaExternalIdsCapability } from '@/src/domain/capabilities/IMediaExternalIdsCapability'
import { ExternalIds, ExternalId } from '@/src/domain/entities/ExternalIds'
import type { Media } from '@/src/domain/entities/Media'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TMDBSearchClient } from '@/src/infrastructure/api/tmdb/clients/TMDBSearchClient'
import type { TMDBMovieClient } from '@/src/infrastructure/api/tmdb/clients/TMDBMovieClient'
import type { TMDBTVClient } from '@/src/infrastructure/api/tmdb/clients/TMDBTVClient'
import type { TMDBExternalIdsResponse, TMDBMultiSearchResult } from '@/src/infrastructure/api/tmdb/types'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * TMDB Media External IDs Capability
 *
 * Provides cross-platform ID mappings using TMDB's external_ids endpoint
 * Supports both direct TMDB ID lookups and search-based ID resolution
 */
export class TMDBMediaExternalIdsCapability implements IMediaExternalIdsCapability {
  constructor(
    private readonly searchClient: TMDBSearchClient,
    private readonly movieClient: TMDBMovieClient,
    private readonly tvClient: TMDBTVClient,
    private readonly logger: ILoggingService
  ) {}

  async getExternalIds(media: Media): Promise<Result<ExternalIds>> {
    try {
      // Extract TMDB ID from media's external IDs
      const tmdbId = media.externalIds.tmdb?.id
      if (tmdbId) {
        this.logger.debug(`Getting external IDs for TMDB ID: ${tmdbId}`, {
          mediaType: media.type,
          title: media.title,
        })
        // Direct lookup using TMDB ID
        return await this.fetchExternalIdsByTMDBId(parseInt(tmdbId), media.type)
      }

      // Fallback: search for the media and get external IDs
      this.logger.debug(`No TMDB ID found, searching for: ${media.title}`, {
        mediaType: media.type,
        year: media.year,
      })
      return await this.searchAndFetchExternalIds(media)
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get external IDs for ${media.type}: ${media.title}`, err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  async findByExternalId(externalId: string, platform: string): Promise<Result<Media | null>> {
    try {
      this.logger.debug(`Finding media by ${platform} ID: ${externalId}`)

      // TMDB Find endpoint only supports IMDB and TVDB
      const validPlatform = platform.toLowerCase()
      if (validPlatform !== 'imdb' && validPlatform !== 'tvdb') {
        this.logger.warn(`Unsupported platform for TMDB find: ${platform}`)
        return ok(null, 'tmdb', { cached: false })
      }

      // Use TMDB's find endpoint
      // Note: TMDB doesn't have a dedicated client method for /find,
      // but we can search by external ID using multi-search as fallback
      // For IMDB IDs, we can use the fact that many endpoints accept them

      this.logger.info(`TMDB Find API not implemented in client, returning null`, {
        externalId,
        platform,
      })
      return ok(null, 'tmdb', { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to find media by ${platform} ID: ${externalId}`, err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  /**
   * Fetch external IDs using TMDB ID
   */
  private async fetchExternalIdsByTMDBId(
    tmdbId: number,
    mediaType: 'movie' | 'series'
  ): Promise<Result<ExternalIds>> {
    try {
      let response: TMDBExternalIdsResponse

      if (mediaType === 'movie') {
        response = await this.movieClient.getMovieExternalIds(tmdbId)
      } else {
        response = await this.tvClient.getTVExternalIds(tmdbId)
      }

      const externalIds = this.mapTMDBExternalIds(tmdbId, mediaType, response)

      this.logger.debug(`Fetched external IDs for TMDB ${tmdbId}`, {
        hasImdb: !!externalIds.imdb,
        hasTvdb: !!externalIds.tvdb,
      })

      return ok(externalIds, 'tmdb', { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to fetch external IDs for TMDB ID ${tmdbId}`, err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  /**
   * Search for media and fetch external IDs
   */
  private async searchAndFetchExternalIds(media: Media): Promise<Result<ExternalIds>> {
    try {
      // Search using multi-search
      const searchResults = await this.searchClient.multiSearch({
        query: media.title,
      })

      if (!searchResults.results || searchResults.results.length === 0) {
        this.logger.warn(`No search results found for: ${media.title}`)
        return fail(new Error('No search results found'), 'tmdb', 'not_found')
      }

      // Filter results by media type and year
      const mediaTypeFilter = media.type === 'movie' ? 'movie' : 'tv'
      const filteredResults = searchResults.results.filter((result: TMDBMultiSearchResult) => {
        if (result.media_type !== mediaTypeFilter) return false

        // Extract year from result
        let resultYear: number | undefined
        if (result.media_type === 'movie' && result.release_date) {
          resultYear = parseInt(result.release_date.split('-')[0])
        } else if (result.media_type === 'tv' && result.first_air_date) {
          resultYear = parseInt(result.first_air_date.split('-')[0])
        }

        // Check year match with ±1 tolerance
        if (media.year && resultYear) {
          return Math.abs(resultYear - media.year) <= 1
        }

        return true
      })

      if (filteredResults.length === 0) {
        this.logger.warn(`No matching results found for: ${media.title} (${media.year})`)
        return fail(new Error('No matching results found'), 'tmdb', 'not_found')
      }

      // Take the first match (best match)
      const bestMatch = filteredResults[0]
      this.logger.debug(`Found match for ${media.title}`, {
        tmdbId: bestMatch.id,
        title: bestMatch.media_type === 'movie' ? bestMatch.title : bestMatch.name,
      })

      // Fetch external IDs for the matched media
      return await this.fetchExternalIdsByTMDBId(bestMatch.id, media.type)
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to search and fetch external IDs for: ${media.title}`, err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  /**
   * Map TMDB external IDs response to domain ExternalIds
   */
  private mapTMDBExternalIds(
    tmdbId: number,
    mediaType: 'movie' | 'series',
    response: TMDBExternalIdsResponse
  ): ExternalIds {
    const externalIdsData: Partial<{
      tmdb: ExternalId
      imdb: ExternalId
      tvdb: ExternalId
    }> = {}

    // Add TMDB ID (always present)
    const tmdbMediaType = mediaType === 'movie' ? 'movie' : 'tv'
    externalIdsData.tmdb = new ExternalId(
      tmdbId.toString(),
      'tmdb',
      `https://www.themoviedb.org/${tmdbMediaType}/${tmdbId}`
    )

    // Add IMDB ID if available
    if (response.imdb_id) {
      externalIdsData.imdb = new ExternalId(
        response.imdb_id,
        'imdb',
        `https://www.imdb.com/title/${response.imdb_id}/`
      )
    }

    // Add TVDB ID if available
    if (response.tvdb_id) {
      externalIdsData.tvdb = new ExternalId(
        response.tvdb_id.toString(),
        'tvdb',
        `https://thetvdb.com/?tab=series&id=${response.tvdb_id}`
      )
    }

    return new ExternalIds(externalIdsData)
  }
}
