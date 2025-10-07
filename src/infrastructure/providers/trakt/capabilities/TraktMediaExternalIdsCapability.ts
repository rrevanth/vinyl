import type { IMediaExternalIdsCapability } from '@/src/domain/capabilities/IMediaExternalIdsCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { ExternalIds } from '@/src/domain/entities/ExternalIds'
import type { TraktDetailCache } from '../cache/TraktDetailCache'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { TraktMediaMapper } from '../mappers/TraktMediaMapper'

/**
 * Trakt Media External IDs Capability
 * Provides cross-platform ID mappings from cached Trakt data
 */
export class TraktMediaExternalIdsCapability implements IMediaExternalIdsCapability {
  constructor(
    private readonly cache: TraktDetailCache,
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  async getExternalIds(media: Media): Promise<ExternalIds> {
    try {
      // If we already have a Trakt ID, get cached data with all IDs
      const traktId = media.externalIds.trakt?.id
      if (!traktId) {
        // Return existing external IDs if no Trakt ID
        return media.externalIds
      }

      // Get cached extended data (should already have all IDs)
      let extendedData: any
      if (media.type === 'movie') {
        extendedData = await this.cache.getOrFetchMovieDetails(traktId)
      } else if (media.type === 'series') {
        extendedData = await this.cache.getOrFetchShowDetails(traktId)
      } else {
        throw new Error(`Unsupported media type: ${media.type}`)
      }

      // Extract IDs from cached response
      const enrichedMedia = TraktMediaMapper.toEnrichedMedia(extendedData, media.type)

      this.logger.debug(`Retrieved external IDs for ${media.type}: ${media.title}`, {
        hasImdb: !!enrichedMedia.media.externalIds.imdb,
        hasTmdb: !!enrichedMedia.media.externalIds.tmdb,
        hasTvdb: !!enrichedMedia.media.externalIds.tvdb,
      })

      return enrichedMedia.media.externalIds
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get external IDs for ${media.type}: ${media.title}`, err)
      throw err
    }
  }

  async findByExternalId(externalId: string, platform: string): Promise<Media | null> {
    try {
      this.logger.debug(`Searching Trakt for ${platform} ID: ${externalId}`)

      // Use Trakt's ID lookup endpoint
      // Platform must be one of: 'imdb', 'tmdb', 'tvdb'
      const validPlatform = platform.toLowerCase() as 'imdb' | 'tmdb' | 'tvdb'
      const searchResults = await this.traktClient.search.searchByExternalId(
        validPlatform,
        externalId,
        {
          extended: ['full', 'images'] as any,
        }
      )

      if (searchResults.length === 0) {
        this.logger.debug(`No results found for ${platform} ID: ${externalId}`)
        return null
      }

      // Return the first result
      const result = searchResults[0]
      let media: Media | null = null

      if (result.type === 'movie' && result.movie) {
        media = TraktMediaMapper.movieToMedia(result.movie)
      } else if (result.type === 'show' && result.show) {
        media = TraktMediaMapper.showToMedia(result.show)
      }

      if (media) {
        this.logger.debug(`Found media for ${platform} ID ${externalId}: ${media.title}`)
      }

      return media
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to find media by ${platform} ID: ${externalId}`, err)
      throw err
    }
  }
}