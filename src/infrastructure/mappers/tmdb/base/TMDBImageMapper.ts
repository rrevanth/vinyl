import { MediaImages } from '../../../../domain/entities/Media'
import { PersonImages } from '../../../../domain/entities/Person'
import type { TMDBConfigFactory } from '../../../factories/TMDBConfigFactory'

/**
 * TMDB Image URL mapper - handles image URL generation with TMDB configuration
 *
 * TMDB provides different image sizes:
 * - Posters: w92, w154, w185, w342, w500, w780, original
 * - Backdrops: w300, w780, w1280, original
 * - Profiles: w45, w185, h632, original
 */
export class TMDBImageMapper {
  /**
   * Create MediaImages from TMDB movie/TV response
   * @param tmdbData - TMDB response with image paths
   * @param configFactory - TMDB config factory for base URLs
   * @returns MediaImages instance with properly formatted URLs
   */
  static createMediaImages(
    tmdbData: { poster_path?: string | null; backdrop_path?: string | null },
    configFactory?: TMDBConfigFactory
  ): MediaImages {
    const baseUrl =
      configFactory?.createEffectiveConfig().effectiveImageBaseURL || 'https://image.tmdb.org/t/p/'

    return new MediaImages({
      // Primary images - high quality
      poster: tmdbData.poster_path ? `${baseUrl}w500${tmdbData.poster_path}` : undefined,
      backdrop: tmdbData.backdrop_path ? `${baseUrl}w1280${tmdbData.backdrop_path}` : undefined,

      // Alternative sizes
      posterAlternatives: tmdbData.poster_path
        ? [
            `${baseUrl}w342${tmdbData.poster_path}`,
            `${baseUrl}w780${tmdbData.poster_path}`,
            `${baseUrl}original${tmdbData.poster_path}`,
          ]
        : [],

      backdropAlternatives: tmdbData.backdrop_path
        ? [`${baseUrl}w780${tmdbData.backdrop_path}`, `${baseUrl}original${tmdbData.backdrop_path}`]
        : [],

      // Thumbnails for performance
      posterThumbnail: tmdbData.poster_path ? `${baseUrl}w185${tmdbData.poster_path}` : undefined,
      backdropThumbnail: tmdbData.backdrop_path
        ? `${baseUrl}w300${tmdbData.backdrop_path}`
        : undefined,

      // Quality indicators
      posterQuality: 'high',
      backdropQuality: 'high',
    })
  }

  /**
   * Create PersonImages from TMDB person response
   * @param tmdbData - TMDB person response with profile path
   * @param configFactory - TMDB config factory for base URLs
   * @returns PersonImages instance with properly formatted URLs
   */
  static createPersonImages(
    tmdbData: { profile_path?: string | null },
    configFactory?: TMDBConfigFactory
  ): PersonImages {
    const baseUrl =
      configFactory?.createEffectiveConfig().effectiveImageBaseURL || 'https://image.tmdb.org/t/p/'

    return new PersonImages({
      // Primary profile image
      profile: tmdbData.profile_path ? `${baseUrl}h632${tmdbData.profile_path}` : undefined,

      // Alternative sizes
      profileAlternatives: tmdbData.profile_path
        ? [`${baseUrl}w185${tmdbData.profile_path}`, `${baseUrl}original${tmdbData.profile_path}`]
        : [],

      // Thumbnail for performance
      profileThumbnail: tmdbData.profile_path ? `${baseUrl}w45${tmdbData.profile_path}` : undefined,

      // Quality indicator
      profileQuality: 'high',
    })
  }

  /**
   * Get the best poster URL for a given size preference
   * @param posterPath - TMDB poster path (without base URL)
   * @param size - Preferred size
   * @param configFactory - TMDB config factory for base URLs
   * @returns Complete poster URL or undefined
   */
  static getPosterUrl(
    posterPath?: string | null,
    size: 'small' | 'medium' | 'large' | 'original' = 'medium',
    configFactory?: TMDBConfigFactory
  ): string | undefined {
    if (!posterPath) return undefined

    const baseUrl =
      configFactory?.createEffectiveConfig().effectiveImageBaseURL || 'https://image.tmdb.org/t/p/'

    const sizeMap = {
      small: 'w185',
      medium: 'w500',
      large: 'w780',
      original: 'original',
    }

    return `${baseUrl}${sizeMap[size]}${posterPath}`
  }

  /**
   * Get the best backdrop URL for a given size preference
   * @param backdropPath - TMDB backdrop path (without base URL)
   * @param size - Preferred size
   * @param configFactory - TMDB config factory for base URLs
   * @returns Complete backdrop URL or undefined
   */
  static getBackdropUrl(
    backdropPath?: string | null,
    size: 'small' | 'medium' | 'large' | 'original' = 'medium',
    configFactory?: TMDBConfigFactory
  ): string | undefined {
    if (!backdropPath) return undefined

    const baseUrl =
      configFactory?.createEffectiveConfig().effectiveImageBaseURL || 'https://image.tmdb.org/t/p/'

    const sizeMap = {
      small: 'w300',
      medium: 'w780',
      large: 'w1280',
      original: 'original',
    }

    return `${baseUrl}${sizeMap[size]}${backdropPath}`
  }

  /**
   * Get the best profile URL for a given size preference
   * @param profilePath - TMDB profile path (without base URL)
   * @param size - Preferred size
   * @param configFactory - TMDB config factory for base URLs
   * @returns Complete profile URL or undefined
   */
  static getProfileUrl(
    profilePath?: string | null,
    size: 'small' | 'medium' | 'large' | 'original' = 'medium',
    configFactory?: TMDBConfigFactory
  ): string | undefined {
    if (!profilePath) return undefined

    const baseUrl =
      configFactory?.createEffectiveConfig().effectiveImageBaseURL || 'https://image.tmdb.org/t/p/'

    const sizeMap = {
      small: 'w45',
      medium: 'w185',
      large: 'h632',
      original: 'original',
    }

    return `${baseUrl}${sizeMap[size]}${profilePath}`
  }
}
