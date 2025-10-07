import type { Media } from '@/src/domain/entities/Media'

/**
 * Represents an item in the continue watching list with playback progress
 */
export interface ContinueWatchingItem {
  /** Unique playback ID from the provider */
  playbackId: number
  /** Playback progress as a percentage (0-100) */
  progress: number
  /** Date and time when playback was paused */
  pausedAt: Date
  /** Type of media being watched */
  type: 'movie' | 'episode'
  /** Complete media object */
  media: Media
  /** Episode-specific information (only for episodes) */
  episode?: {
    season: number
    number: number
    title: string
    ids: { trakt?: string; tmdb?: string; imdb?: string }
  }
}

/**
 * Media Continue Watching Capability - Manages in-progress media playback
 * Maps to Trakt `/sync/playback` API
 */
export interface IMediaContinueWatchingCapability {
  /**
   * Get the list of media items currently in progress
   * @param params - Optional filters for limit and media type
   * @returns Array of continue watching items with playback progress
   */
  getContinueWatching(params?: { limit?: number; type?: 'movies' | 'episodes' }): Promise<ContinueWatchingItem[]>

  /**
   * Remove a media item from the continue watching list
   * @param media - Complete media object to remove
   */
  removeFromContinueWatching(media: Media): Promise<void>

  /**
   * Clear all items from the continue watching list
   */
  clearContinueWatching(): Promise<void>

  /**
   * Indicates whether this capability requires authentication
   * @returns true if authentication is required
   */
  requiresAuth(): boolean
}
