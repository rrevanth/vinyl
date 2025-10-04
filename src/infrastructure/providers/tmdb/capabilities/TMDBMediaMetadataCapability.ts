import type { IMediaMetadataCapability } from '../../../../domain/capabilities/IMediaMetadataCapability'
import type { Media } from '../../../../domain/entities/Media'
import type { EnrichedMedia } from '../../../../domain/entities/EnrichedMedia'
import type { TMDBDetailCache } from '../cache/TMDBDetailCache'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { TMDBMediaMapper } from '../../../mappers/tmdb/TMDBMediaMapper'

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

  async enrichMedia(media: Media): Promise<EnrichedMedia> {
    try {
      // Extract TMDB ID from media's external IDs
      const tmdbId = this.extractTMDBId(media)
      if (!tmdbId) {
        throw new Error(`No TMDB ID found for ${media.type} media: ${media.title}`)
      }

      // Get or fetch extended detail (THIS IS THE CORE CACHE SOURCE)
      let extendedData: any
      if (media.type === 'movie') {
        extendedData = await this.cache.getOrFetchMovieDetails(tmdbId)
      } else if (media.type === 'series') {
        extendedData = await this.cache.getOrFetchTVDetails(tmdbId)
      } else {
        throw new Error(`Unsupported media type: ${media.type}`)
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

      return enrichedMedia
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to enrich metadata for ${media.type}: ${media.title}`, err)
      throw err
    }
  }

  async enrichMediaBatch(mediaList: Media[]): Promise<EnrichedMedia[]> {
    // TODO: Implement batch processing for better performance
    // For now, process sequentially
    const enrichedMedia: EnrichedMedia[] = []

    for (const media of mediaList) {
      try {
        const enriched = await this.enrichMedia(media)
        enrichedMedia.push(enriched)
      } catch (error) {
        this.logger.error(`Failed to enrich media in batch: ${media.title}`, error as Error)
        // Continue with other items, don't fail entire batch
      }
    }

    return enrichedMedia
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
