import type { Media } from '@/src/domain/entities/Media'

/**
 * Represents an item in the watchlist
 */
export interface WatchlistItem {
  /** Complete media object */
  media: Media
  /** Date and time when added to watchlist */
  addedAt: Date
  /** Optional user notes about this item */
  notes?: string
  /** Optional sort order */
  sort?: number
}

/**
 * Media Watchlist Capability - Manages user's watchlist
 * Maps to Trakt `/sync/watchlist` API
 */
export interface IMediaWatchlistCapability {
  /**
   * Get the user's watchlist
   * @param params - Optional filters for type, sort order, and limit
   * @returns Array of watchlist items
   */
  getWatchlist(params?: {
    type?: 'movies' | 'shows'
    sort?: 'added' | 'released' | 'title'
    limit?: number
  }): Promise<WatchlistItem[]>

  /**
   * Add media to the watchlist
   * @param media - Complete media object or array of media objects
   */
  addToWatchlist(media: Media | Media[]): Promise<void>

  /**
   * Remove media from the watchlist
   * @param media - Complete media object or array of media objects
   */
  removeFromWatchlist(media: Media | Media[]): Promise<void>

  /**
   * Indicates whether this capability requires authentication
   * @returns true if authentication is required
   */
  requiresAuth(): boolean
}
