import type { Media } from '../entities/Media'

/**
 * Media Videos Capability - Provides trailers, clips, and promotional videos
 */
export interface IMediaVideosCapability {
  /**
   * Get videos related to media (trailers, clips, behind-the-scenes)
   * @param media - The media to get videos for
   * @returns Array of video URLs with metadata
   */
  getVideos(media: Media): Promise<MediaVideo[]>
}

/**
 * Represents a video associated with media content
 */
export interface MediaVideo {
  id: string
  name: string
  key: string // Video ID/key for the video platform
  site: string // Platform: YouTube, Vimeo, etc.
  type: VideoType
  size: number // Quality indicator (e.g., 720, 1080)
  language?: string
  official: boolean
  publishedAt?: Date
}

export enum VideoType {
  TRAILER = 'trailer',
  TEASER = 'teaser',
  CLIP = 'clip',
  FEATURETTE = 'featurette',
  BEHIND_THE_SCENES = 'behind_the_scenes',
  BLOOPERS = 'bloopers',
  OPENING_CREDITS = 'opening_credits',
}
