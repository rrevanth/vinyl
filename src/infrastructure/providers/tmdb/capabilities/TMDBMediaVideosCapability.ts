import type {
  IMediaVideosCapability,
  MediaVideo,
} from '../../../../domain/capabilities/IMediaVideosCapability'
import { VideoType } from '../../../../domain/capabilities/IMediaVideosCapability'
import type { Media } from '../../../../domain/entities/Media'
import type { TMDBDetailCache } from '../cache/TMDBDetailCache'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'

/**
 * TMDB Media Videos Capability
 *
 * Retrieves videos (trailers, clips, teasers) from cached TMDB extended API responses.
 * This capability leverages the cache populated by TMDBMediaMetadataCapability.
 */
export class TMDBMediaVideosCapability implements IMediaVideosCapability {
  constructor(
    private readonly cache: TMDBDetailCache,
    private readonly logger: ILoggingService
  ) {}

  async getVideos(media: Media): Promise<MediaVideo[]> {
    try {
      // Extract TMDB ID from media's external IDs
      const tmdbId = this.extractTMDBId(media)
      if (!tmdbId) {
        throw new Error(`No TMDB ID found for ${media.type} media: ${media.title}`)
      }

      // Get cached extended data (should already be populated by metadata capability)
      let extendedData: any
      if (media.type === 'movie') {
        extendedData = await this.cache.getOrFetchMovieDetails(tmdbId)
      } else if (media.type === 'series') {
        extendedData = await this.cache.getOrFetchTVDetails(tmdbId)
      } else {
        throw new Error(`Unsupported media type: ${media.type}`)
      }

      // Extract videos from the cached response
      const videos = extendedData.videos?.results || []

      const result = videos.map((video: any) => this.mapTMDBVideo(video))

      this.logger.debug(`Retrieved videos for ${media.type} ${tmdbId}`, {
        title: media.title,
        videoCount: result.length,
        trailerCount: result.filter((v: MediaVideo) => v.type === VideoType.TRAILER).length,
      })

      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get videos for ${media.type}: ${media.title}`, err)
      throw err
    }
  }

  /**
   * Map TMDB video response to domain MediaVideo object
   */
  private mapTMDBVideo(tmdbVideo: any): MediaVideo {
    return {
      id: tmdbVideo.id || '',
      name: tmdbVideo.name || '',
      key: tmdbVideo.key || '',
      site: tmdbVideo.site || 'YouTube',
      type: this.mapVideoType(tmdbVideo.type),
      size: tmdbVideo.size || 720,
      language: tmdbVideo.iso_639_1 || undefined,
      official: tmdbVideo.official === true,
      publishedAt: tmdbVideo.published_at ? new Date(tmdbVideo.published_at) : undefined,
    }
  }

  /**
   * Map TMDB video type to domain VideoType enum
   */
  private mapVideoType(tmdbType: string): VideoType {
    const normalizedType = tmdbType?.toLowerCase() || ''

    switch (normalizedType) {
      case 'trailer':
        return VideoType.TRAILER
      case 'teaser':
        return VideoType.TEASER
      case 'clip':
        return VideoType.CLIP
      case 'featurette':
        return VideoType.FEATURETTE
      case 'behind the scenes':
        return VideoType.BEHIND_THE_SCENES
      case 'bloopers':
        return VideoType.BLOOPERS
      case 'opening credits':
        return VideoType.OPENING_CREDITS
      default:
        return VideoType.CLIP // Default fallback
    }
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
