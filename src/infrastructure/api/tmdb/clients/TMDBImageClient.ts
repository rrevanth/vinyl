import { TMDBBaseClient } from '../TMDBBaseClient'
import type { TMDBImageSize } from '../types'

/**
 * TMDB Image utilities client
 *
 * Provides comprehensive image URL generation and management
 * with support for all TMDB image types and sizes.
 */
export class TMDBImageClient extends TMDBBaseClient {
  // Available image sizes for different image types
  private static readonly POSTER_SIZES: TMDBImageSize[] = [
    'w92',
    'w154',
    'w185',
    'w342',
    'w500',
    'w780',
    'original',
  ]

  private static readonly BACKDROP_SIZES: TMDBImageSize[] = ['w300', 'w780', 'w1280', 'original']

  private static readonly PROFILE_SIZES: TMDBImageSize[] = ['w45', 'w185', 'h632', 'original']

  private static readonly LOGO_SIZES: TMDBImageSize[] = [
    'w45',
    'w92',
    'w154',
    'w185',
    'w300',
    'w500',
    'original',
  ]

  private static readonly STILL_SIZES: TMDBImageSize[] = ['w92', 'w185', 'w300', 'original']

  /**
   * Generate poster image URL
   */
  getPosterURL(posterPath: string, size: TMDBImageSize = 'w500'): string {
    if (!posterPath) return ''
    return this.buildImageURL(posterPath, size)
  }

  /**
   * Generate backdrop image URL
   */
  getBackdropURL(backdropPath: string, size: TMDBImageSize = 'w1280'): string {
    if (!backdropPath) return ''
    return this.buildImageURL(backdropPath, size)
  }

  /**
   * Generate profile image URL
   */
  getProfileURL(profilePath: string, size: TMDBImageSize = 'w185'): string {
    if (!profilePath) return ''
    return this.buildImageURL(profilePath, size)
  }

  /**
   * Generate logo image URL
   */
  getLogoURL(logoPath: string, size: TMDBImageSize = 'w185'): string {
    if (!logoPath) return ''
    return this.buildImageURL(logoPath, size)
  }

  /**
   * Generate still image URL (for episodes)
   */
  getStillURL(stillPath: string, size: TMDBImageSize = 'w300'): string {
    if (!stillPath) return ''
    return this.buildImageURL(stillPath, size)
  }

  /**
   * Build complete image URL
   */
  private buildImageURL(imagePath: string, size: TMDBImageSize): string {
    const config = this.getCurrentConfig()
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
    return `${config.effectiveImageBaseURL}${size}/${cleanPath}`
  }

  /**
   * Get multiple poster sizes for responsive images
   */
  getResponsivePosterURLs(posterPath: string): Record<string, string> {
    if (!posterPath) return {}

    return {
      small: this.getPosterURL(posterPath, 'w185'),
      medium: this.getPosterURL(posterPath, 'w342'),
      large: this.getPosterURL(posterPath, 'w500'),
      xlarge: this.getPosterURL(posterPath, 'w780'),
      original: this.getPosterURL(posterPath, 'original'),
    }
  }

  /**
   * Get multiple backdrop sizes for responsive images
   */
  getResponsiveBackdropURLs(backdropPath: string): Record<string, string> {
    if (!backdropPath) return {}

    return {
      small: this.getBackdropURL(backdropPath, 'w300'),
      medium: this.getBackdropURL(backdropPath, 'w780'),
      large: this.getBackdropURL(backdropPath, 'w1280'),
      original: this.getBackdropURL(backdropPath, 'original'),
    }
  }

  /**
   * Get multiple profile sizes
   */
  getResponsiveProfileURLs(profilePath: string): Record<string, string> {
    if (!profilePath) return {}

    return {
      thumbnail: this.getProfileURL(profilePath, 'w45'),
      small: this.getProfileURL(profilePath, 'w185'),
      large: this.getProfileURL(profilePath, 'h632'),
      original: this.getProfileURL(profilePath, 'original'),
    }
  }

  /**
   * Generate srcSet string for responsive images
   */
  getPosterSrcSet(posterPath: string): string {
    if (!posterPath) return ''

    const urls = this.getResponsivePosterURLs(posterPath)
    return [
      `${urls.small} 185w`,
      `${urls.medium} 342w`,
      `${urls.large} 500w`,
      `${urls.xlarge} 780w`,
    ].join(', ')
  }

  /**
   * Generate srcSet string for backdrop images
   */
  getBackdropSrcSet(backdropPath: string): string {
    if (!backdropPath) return ''

    const urls = this.getResponsiveBackdropURLs(backdropPath)
    return [`${urls.small} 300w`, `${urls.medium} 780w`, `${urls.large} 1280w`].join(', ')
  }

  /**
   * Get optimal image size based on display dimensions
   */
  getOptimalPosterSize(displayWidth: number): TMDBImageSize {
    if (displayWidth <= 92) return 'w92'
    if (displayWidth <= 154) return 'w154'
    if (displayWidth <= 185) return 'w185'
    if (displayWidth <= 342) return 'w342'
    if (displayWidth <= 500) return 'w500'
    if (displayWidth <= 780) return 'w780'
    return 'original'
  }

  /**
   * Get optimal backdrop size based on display dimensions
   */
  getOptimalBackdropSize(displayWidth: number): TMDBImageSize {
    if (displayWidth <= 300) return 'w300'
    if (displayWidth <= 780) return 'w780'
    if (displayWidth <= 1280) return 'w1280'
    return 'original'
  }

  /**
   * Get optimal profile size based on display dimensions
   */
  getOptimalProfileSize(displayWidth: number): TMDBImageSize {
    if (displayWidth <= 45) return 'w45'
    if (displayWidth <= 185) return 'w185'
    return 'h632'
  }

  /**
   * Validate if image path is valid TMDB format
   */
  isValidImagePath(imagePath: string): boolean {
    if (!imagePath) return false
    return imagePath.startsWith('/') && imagePath.length > 1
  }

  /**
   * Get available sizes for image type
   */
  getAvailableSizes(
    imageType: 'poster' | 'backdrop' | 'profile' | 'logo' | 'still'
  ): TMDBImageSize[] {
    switch (imageType) {
      case 'poster':
        return [...TMDBImageClient.POSTER_SIZES]
      case 'backdrop':
        return [...TMDBImageClient.BACKDROP_SIZES]
      case 'profile':
        return [...TMDBImageClient.PROFILE_SIZES]
      case 'logo':
        return [...TMDBImageClient.LOGO_SIZES]
      case 'still':
        return [...TMDBImageClient.STILL_SIZES]
      default:
        return []
    }
  }

  /**
   * Generate image URLs for all available sizes of a specific type
   */
  getAllSizeURLs(
    imagePath: string,
    imageType: 'poster' | 'backdrop' | 'profile' | 'logo' | 'still'
  ): Record<string, string> {
    if (!imagePath) return {}

    const sizes = this.getAvailableSizes(imageType)
    const urls: Record<string, string> = {}

    for (const size of sizes) {
      switch (imageType) {
        case 'poster':
          urls[size] = this.getPosterURL(imagePath, size)
          break
        case 'backdrop':
          urls[size] = this.getBackdropURL(imagePath, size)
          break
        case 'profile':
          urls[size] = this.getProfileURL(imagePath, size)
          break
        case 'logo':
          urls[size] = this.getLogoURL(imagePath, size)
          break
        case 'still':
          urls[size] = this.getStillURL(imagePath, size)
          break
      }
    }

    return urls
  }

  /**
   * Generate image metadata for SEO and accessibility
   */
  getImageMetadata(
    imagePath: string,
    imageType: 'poster' | 'backdrop' | 'profile' | 'logo' | 'still',
    title?: string
  ): {
    src: string
    srcSet: string
    alt: string
    sizes: string
    loading: 'lazy' | 'eager'
  } {
    if (!imagePath) {
      return {
        src: '',
        srcSet: '',
        alt: title || 'No image available',
        sizes: '',
        loading: 'lazy',
      }
    }

    let src: string
    let srcSet: string
    let sizes: string

    switch (imageType) {
      case 'poster':
        src = this.getPosterURL(imagePath, 'w500')
        srcSet = this.getPosterSrcSet(imagePath)
        sizes =
          '(max-width: 185px) 185px, (max-width: 342px) 342px, (max-width: 500px) 500px, 780px'
        break
      case 'backdrop':
        src = this.getBackdropURL(imagePath, 'w1280')
        srcSet = this.getBackdropSrcSet(imagePath)
        sizes = '(max-width: 300px) 300px, (max-width: 780px) 780px, 1280px'
        break
      case 'profile':
        src = this.getProfileURL(imagePath, 'w185')
        srcSet = ''
        sizes = ''
        break
      default:
        src = this.buildImageURL(imagePath, 'w300')
        srcSet = ''
        sizes = ''
    }

    return {
      src,
      srcSet,
      alt: title || `${imageType} image`,
      sizes,
      loading: 'lazy',
    }
  }
}
