import type { Media } from '../entities/Media'

/**
 * Media Images Capability - Provides posters, backdrops, and promotional images
 */
export interface IMediaImagesCapability {
  /**
   * Get images for media (posters, backdrops, logos)
   * @param media - The media to get images for
   * @returns Collection of images by type
   */
  getImages(media: Media): Promise<MediaImages>
}

/**
 * Collection of images for media content
 */
export interface MediaImages {
  posters: MediaImage[]
  backdrops: MediaImage[]
  logos: MediaImage[]
}

/**
 * Represents an image with metadata
 */
export interface MediaImage {
  aspectRatio: number
  height: number
  width: number
  language?: string
  filePath: string
  voteAverage: number
  voteCount: number
}
