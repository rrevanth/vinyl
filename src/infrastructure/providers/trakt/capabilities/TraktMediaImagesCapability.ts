import type {
  IMediaImagesCapability,
  MediaImages,
  MediaImage,
} from '@/src/domain/capabilities/IMediaImagesCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { TraktDetailCache } from '../cache/TraktDetailCache'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

/**
 * Trakt Media Images Capability
 *
 * Retrieves images from cached Trakt extended API responses.
 * This capability leverages the cache populated by TraktMediaMetadataCapability
 * which fetches data with extended=['full', 'images'].
 */
export class TraktMediaImagesCapability implements IMediaImagesCapability {
  constructor(
    private readonly cache: TraktDetailCache,
    private readonly logger: ILoggingService
  ) {}

  async getImages(media: Media): Promise<MediaImages> {
    try {
      // Extract Trakt ID from media's external IDs
      const traktId = media.externalIds.trakt?.id
      if (!traktId) {
        throw new Error(`No Trakt ID found for ${media.type} media: ${media.title}`)
      }

      // Get cached extended data (should already be populated by metadata capability)
      let extendedData: any
      if (media.type === 'movie') {
        extendedData = await this.cache.getOrFetchMovieDetails(traktId)
      } else if (media.type === 'series') {
        extendedData = await this.cache.getOrFetchShowDetails(traktId)
      } else {
        throw new Error(`Unsupported media type: ${media.type}`)
      }

      // Extract images from the cached response
      const traktImages = extendedData.images || {}

      const result: MediaImages = {
        posters: this.mapTraktImages(traktImages.poster || []),
        backdrops: this.mapTraktImages(traktImages.fanart || []),
        logos: this.mapTraktImages(traktImages.logo || []),
      }

      this.logger.debug(`Retrieved images for ${media.type} ${traktId}`, {
        title: media.title,
        posterCount: result.posters.length,
        backdropCount: result.backdrops.length,
        logoCount: result.logos.length,
      })

      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get images for ${media.type}: ${media.title}`, err)
      throw err
    }
  }

  /**
   * Map Trakt image URLs to domain MediaImage objects
   * Trakt returns arrays of image URLs, we need to convert them to MediaImage format
   */
  private mapTraktImages(traktImageUrls: string[]): MediaImage[] {
    return traktImageUrls.map((url, index) => {
      // Ensure URL is absolute
      const fullUrl = url.startsWith('http') ? url : `https://${url}`

      return {
        aspectRatio: 0, // Trakt doesn't provide aspect ratio
        height: 0, // Trakt doesn't provide dimensions
        width: 0, // Trakt doesn't provide dimensions
        language: undefined, // Trakt doesn't provide language
        filePath: fullUrl,
        voteAverage: 0, // Trakt doesn't provide image ratings
        voteCount: 0, // Trakt doesn't provide image ratings
      }
    })
  }
}