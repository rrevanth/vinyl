import type { IMediaMetadataCapability } from '@/src/domain/capabilities/IMediaMetadataCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { EnrichedMedia } from '@/src/domain/entities/EnrichedMedia'
import type { TraktDetailCache } from '../cache/TraktDetailCache'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { TraktMediaMapper } from '../mappers/TraktMediaMapper'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * Trakt Media Metadata Capability - Primary cache source
 *
 * This capability enriches basic Media entities with comprehensive metadata
 * by fetching extended Trakt API responses (with full+images extended data)
 * and caching them for other capabilities.
 */
export class TraktMediaMetadataCapability implements IMediaMetadataCapability {
  constructor(
    private readonly cache: TraktDetailCache,
    private readonly logger: ILoggingService
  ) {}

  async enrichMedia(media: Media): Promise<Result<EnrichedMedia>> {
    // Extract Trakt ID from media's external IDs
    const traktId = this.extractTraktId(media)
    if (!traktId) {
      this.logger.warn(`No Trakt ID found for ${media.type} media: ${media.title}`)
      return fail(
        new Error(`No Trakt ID found for ${media.type} media: ${media.title}`),
        'trakt',
        'missing_id'
      )
    }

    try {
      // Get or fetch extended detail from cache (THIS IS THE CORE CACHE SOURCE)
      let extendedData: any
      if (media.type === 'movie') {
        extendedData = await this.cache.getOrFetchMovieDetails(traktId)
      } else if (media.type === 'series') {
        extendedData = await this.cache.getOrFetchShowDetails(traktId)
      } else {
        this.logger.warn(`Unsupported media type: ${media.type}`)
        return fail(
          new Error(`Unsupported media type: ${media.type}`),
          'trakt',
          'unsupported'
        )
      }

      // Convert extended API response to enriched media using mapper
      const enrichedMedia = TraktMediaMapper.toEnrichedMedia(extendedData, media.type)

      this.logger.debug(`Enriched metadata for ${media.type} ${traktId}`, {
        title: enrichedMedia.media.title,
        hasOverview: !!enrichedMedia.overview,
        genreCount: enrichedMedia.genres?.length || 0,
      })

      return ok(enrichedMedia, 'trakt')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to enrich metadata for ${media.type}: ${media.title}`, err)
      return fail(err, 'trakt', 'api_error')
    }
  }

  async enrichMediaBatch(mediaList: Media[]): Promise<Result<EnrichedMedia[]>> {
    try {
      // Process in parallel for better performance
      const enrichmentPromises = mediaList.map(async (media) => {
        const result = await this.enrichMedia(media)
        if (result.success) {
          return result.data
        } else {
          this.logger.error(`Failed to enrich media in batch: ${media.title}`, result.error)
          return null
        }
      })

      const results = await Promise.all(enrichmentPromises)

      // Filter out null values (failed enrichments)
      const enrichedMedia = results.filter((result): result is EnrichedMedia => result !== null)

      return ok(enrichedMedia, 'trakt')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to enrich media batch', err)
      return fail(err, 'trakt', 'api_error')
    }
  }

  /**
   * Extract Trakt ID from media's external IDs
   */
  private extractTraktId(media: Media): string | number | null {
    // Get Trakt ID from external IDs
    if (media.externalIds.trakt?.id) {
      const id = media.externalIds.trakt.id
      this.logger.debug(`Found Trakt ID: ${id} for ${media.title}`)
      return id
    }

    this.logger.warn(`No Trakt ID found for media: ${media.title}`)
    return null
  }
}