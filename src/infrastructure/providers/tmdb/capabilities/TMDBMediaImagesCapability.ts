import type {
  IMediaImagesCapability,
  MediaImages,
  MediaImage,
} from '../../../../domain/capabilities/IMediaImagesCapability'
import type { Media } from '../../../../domain/entities/Media'
import type { TMDBDetailCache } from '../cache/TMDBDetailCache'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * TMDB Media Images Capability
 *
 * Retrieves images from cached TMDB extended API responses.
 * This capability leverages the cache populated by TMDBMediaMetadataCapability.
 */
export class TMDBMediaImagesCapability implements IMediaImagesCapability {
  constructor(
    private readonly cache: TMDBDetailCache,
    private readonly logger: ILoggingService
  ) {}

  async getImages(media: Media): Promise<Result<MediaImages>> {
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
      // Get cached extended data (should already be populated by metadata capability)
      let extendedData: any
      if (media.type === 'movie') {
        extendedData = await this.cache.getOrFetchMovieDetails(tmdbId)
      } else if (media.type === 'series') {
        extendedData = await this.cache.getOrFetchTVDetails(tmdbId)
      } else {
        return fail(
          new Error(`Unsupported media type: ${media.type}`),
          'tmdb',
          'unsupported'
        )
      }

      // Extract images from the cached response
      const images = extendedData.images || { posters: [], backdrops: [], logos: [] }

      const result: MediaImages = {
        posters: this.mapTMDBImages(images.posters || []),
        backdrops: this.mapTMDBImages(images.backdrops || []),
        logos: this.mapTMDBImages(images.logos || []),
      }

      this.logger.debug(`Retrieved images for ${media.type} ${tmdbId}`, {
        title: media.title,
        posterCount: result.posters.length,
        backdropCount: result.backdrops.length,
        logoCount: result.logos.length,
      })

      return ok(result, 'tmdb', { cached: true })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get images for ${media.type}: ${media.title}`, err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  /**
   * Map TMDB image response to domain MediaImage objects
   */
  private mapTMDBImages(tmdbImages: any[]): MediaImage[] {
    return tmdbImages.map((img) => ({
      aspectRatio: img.aspect_ratio || 0,
      height: img.height || 0,
      width: img.width || 0,
      language: img.iso_639_1 || undefined,
      filePath: img.file_path || '',
      voteAverage: img.vote_average || 0,
      voteCount: img.vote_count || 0,
    }))
  }

  /**
   * Extract TMDB ID from media's external IDs
   */
  private extractTMDBId(media: Media): number | null {
    if (media.externalIds.tmdb?.id) {
      const id = parseInt(media.externalIds.tmdb.id)
      if (!isNaN(id)) {
        return id
      }
    }

    this.logger.warn(`No TMDB ID found for media: ${media.title}`)
    return null
  }
}
