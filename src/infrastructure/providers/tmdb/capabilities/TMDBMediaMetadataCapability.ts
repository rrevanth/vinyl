import type { IMediaMetadataCapability } from '../../../../domain/capabilities/IMediaMetadataCapability'
import type { Media } from '../../../../domain/entities/Media'
import type { EnrichedMedia } from '../../../../domain/entities/EnrichedMedia'
import type { TMDBDetailCache } from '../cache/TMDBDetailCache'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { TMDBMediaMapper } from '../../../mappers/tmdb/TMDBMediaMapper'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * TMDB Media Metadata Capability - Primary cache source
 *
 * This capability enriches basic Media entities with comprehensive metadata
 * by fetching extended TMDB API responses and caching them for other capabilities.
 */
export class TMDBMediaMetadataCapability implements IMediaMetadataCapability {
  constructor(
    private readonly cache: TMDBDetailCache,
    private readonly logger: ILoggingService
  ) {}

  async enrichMedia(media: Media): Promise<Result<EnrichedMedia>> {
    // Extract TMDB ID from media's external IDs
    const tmdbId = this.extractTMDBId(media)
    if (!tmdbId) {
      this.logger.warn(`No TMDB ID found for media: ${media.title}`)
      return fail(
        new Error(`No TMDB ID found for ${media.type} media: ${media.title}`),
        'tmdb',
        'missing_id'
      )
    }

    try {
      // Get or fetch extended detail (THIS IS THE CORE CACHE SOURCE)
      let extendedData: any
      if (media.type === 'movie') {
        extendedData = await this.cache.getOrFetchMovieDetails(tmdbId)
      } else if (media.type === 'series') {
        extendedData = await this.cache.getOrFetchTVDetails(tmdbId)
      } else {
        const unsupportedError = new Error(`Unsupported media type: ${media.type}`)
        this.logger.error(`Unsupported media type: ${media.type}`, unsupportedError)
        return fail(
          unsupportedError,
          'tmdb',
          'unsupported'
        )
      }

      // Convert extended API response to enriched media
      const enrichedMedia =
        media.type === 'movie'
          ? TMDBMediaMapper.toEnrichedMovieFromResponse(extendedData)
          : TMDBMediaMapper.toEnrichedTVFromResponse(extendedData)

      this.logger.debug(`Enriched metadata for ${media.type} ${tmdbId}`, {
        title: enrichedMedia.media.title,
        hasOverview: !!enrichedMedia.overview,
        genreCount: enrichedMedia.genres?.length || 0,
      })

      return ok(enrichedMedia, 'tmdb', { cached: true })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to enrich metadata for ${media.type}: ${media.title}`, err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  async enrichMediaBatch(mediaList: Media[]): Promise<Result<EnrichedMedia[]>> {
    const enrichedMedia: EnrichedMedia[] = []

    for (const media of mediaList) {
      const result = await this.enrichMedia(media)
      if (result.success && result.data) {
        enrichedMedia.push(result.data)
      } else {
        this.logger.warn(`Failed to enrich media in batch: ${media.title}`, {
          error: result.success === false && result.error ? result.error.message : 'Unknown error',
        })
      }
    }

    if (enrichedMedia.length === 0 && mediaList.length > 0) {
      return fail(
        new Error('Failed to enrich any media in batch'),
        'tmdb',
        'api_error'
      )
    }

    return ok(enrichedMedia, 'tmdb', { count: enrichedMedia.length })
  }

  /**
   * Extract TMDB ID from media's external IDs
   */
  private extractTMDBId(media: Media): number | null {
    // Get TMDB ID from external IDs
    if (media.externalIds.tmdb?.id) {
      const id = parseInt(media.externalIds.tmdb.id)
      if (!isNaN(id)) {
        this.logger.debug(`Found TMDB ID: ${id} for ${media.title}`)
        return id
      }
    }

    this.logger.warn(`No TMDB ID found for media: ${media.title}`)
    return null
  }
}
