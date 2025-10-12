import type {
  IMediaImagesCapability,
  MediaImages,
  MediaImage,
} from '@/src/domain/capabilities/IMediaImagesCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { FanartClient } from '@/src/infrastructure/api/fanart/FanartClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { ok, fail, type Result } from '@/src/domain/types/Result'
import type { FanartImage } from '@/src/infrastructure/api/fanart/types/FanartTypes'

/**
 * Fanart.tv Media Images Capability
 *
 * Retrieves HD logos, clearart, posters, and backgrounds from Fanart.tv
 * Provides high-quality promotional artwork for movies and TV shows.
 */
export class FanartMediaImagesCapability implements IMediaImagesCapability {
  constructor(
    private readonly fanartClient: FanartClient,
    private readonly logger: ILoggingService
  ) {}

  async getImages(media: Media): Promise<Result<MediaImages>> {
    try {
      if (media.type === 'movie') {
        return await this.getMovieImages(media)
      } else if (media.type === 'series') {
        return await this.getShowImages(media)
      } else {
        return fail(
          new Error(`Unsupported media type: ${media.type}`),
          'fanart',
          'unsupported'
        )
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get Fanart.tv images for ${media.type}: ${media.title}`, err)
      return fail(err, 'fanart', 'api_error')
    }
  }

  /**
   * Get movie images from Fanart.tv
   */
  private async getMovieImages(media: Media): Promise<Result<MediaImages>> {
    // Try TMDB ID first (preferred), then IMDb ID
    const tmdbId = media.externalIds.tmdb?.id
    const imdbId = media.externalIds.imdb?.id

    if (!tmdbId && !imdbId) {
      this.logger.warn(`No TMDB or IMDb ID found for movie: ${media.title}`)
      return fail(
        new Error(`No TMDB or IMDb ID found for movie: ${media.title}`),
        'fanart',
        'missing_id'
      )
    }

    try {
      // Use TMDB ID if available, otherwise use IMDb ID
      const id = tmdbId || imdbId!
      const fanartData = await this.fanartClient.getMovieImages(id)

      const result: MediaImages = {
        // Map HD logos and regular logos to logos array
        logos: [
          ...this.mapFanartImages(fanartData.hdmovielogo || []),
          ...this.mapFanartImages(fanartData.movielogo || []),
        ],
        // Map HD clearart and regular clearart to posters (high quality artwork)
        posters: [
          ...this.mapFanartImages(fanartData.hdclearart || []),
          ...this.mapFanartImages(fanartData.hdmovieclearart || []),
          ...this.mapFanartImages(fanartData.movieart || []),
          ...this.mapFanartImages(fanartData.movieposter || []),
        ],
        // Map backgrounds
        backdrops: this.mapFanartImages(fanartData.moviebackground || []),
      }

      this.logger.debug(`Retrieved Fanart.tv images for movie ${media.title}`, {
        tmdbId,
        imdbId,
        logoCount: result.logos.length,
        posterCount: result.posters.length,
        backdropCount: result.backdrops.length,
      })

      return ok(result, 'fanart', { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to fetch Fanart.tv movie images for: ${media.title}`, err)
      return fail(err, 'fanart', 'api_error')
    }
  }

  /**
   * Get TV show images from Fanart.tv
   */
  private async getShowImages(media: Media): Promise<Result<MediaImages>> {
    // Fanart.tv requires TheTVDB ID for TV shows
    const tvdbId = media.externalIds.tvdb?.id

    if (!tvdbId) {
      this.logger.warn(`No TheTVDB ID found for TV show: ${media.title}`)
      return fail(
        new Error(`No TheTVDB ID found for TV show: ${media.title}`),
        'fanart',
        'missing_id'
      )
    }

    try {
      const fanartData = await this.fanartClient.getShowImages(tvdbId)

      const result: MediaImages = {
        // Map HD TV logos and clear logos
        logos: [
          ...this.mapFanartImages(fanartData.hdtvlogo || []),
          ...this.mapFanartImages(fanartData.clearlogo || []),
        ],
        // Map clearart, character art, and posters
        posters: [
          ...this.mapFanartImages(fanartData.clearart || []),
          ...this.mapFanartImages(fanartData.hdclearart || []),
          ...this.mapFanartImages(fanartData.characterart || []),
          ...this.mapFanartImages(fanartData.tvposter || []),
        ],
        // Map show backgrounds
        backdrops: this.mapFanartImages(fanartData.showbackground || []),
      }

      this.logger.debug(`Retrieved Fanart.tv images for TV show ${media.title}`, {
        tvdbId,
        logoCount: result.logos.length,
        posterCount: result.posters.length,
        backdropCount: result.backdrops.length,
      })

      return ok(result, 'fanart', { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to fetch Fanart.tv TV images for: ${media.title}`, err)
      return fail(err, 'fanart', 'api_error')
    }
  }

  /**
   * Map Fanart.tv images to domain MediaImage objects
   */
  private mapFanartImages(fanartImages: FanartImage[]): MediaImage[] {
    return fanartImages.map((img) => {
      // Fanart.tv images don't provide dimensions directly
      // We'll use aspect ratio 16:9 as default for backdrops, 2:3 for posters
      // This is a reasonable assumption for Fanart.tv images
      const isBackdrop = img.url.includes('background')
      const aspectRatio = isBackdrop ? 16 / 9 : 2 / 3

      return {
        aspectRatio,
        height: 0, // Not provided by Fanart.tv
        width: 0, // Not provided by Fanart.tv
        language: img.lang || undefined,
        filePath: img.url,
        voteAverage: parseInt(img.likes || '0', 10),
        voteCount: parseInt(img.likes || '0', 10),
      }
    })
  }
}
