import { observable } from '@legendapp/state'
import type { Media } from '@/src/domain/entities/Media'

/**
 * Watchlist item - represents a media item in the user's watchlist
 */
export interface WatchlistItem {
  /** Unique ID for this watchlist entry */
  id: string
  /** Complete media object */
  media: Media
  /** When this item was added to the watchlist */
  listedAt: Date
  /** Type of media */
  type: 'movie' | 'series'
}

export const watchlist$ = observable<{
  items: WatchlistItem[]
  isLoading: boolean
  lastUpdated?: Date
}>({
  items: [],
  isLoading: false,
})

// Helper: Check if media is in watchlist
export const isInWatchlist = (mediaId: string): boolean => {
  const items = watchlist$.items.get()
  return items.some((item) => item.media.stableId === mediaId)
}

// Helper: Find watchlist item by media ID
export const findWatchlistItem = (mediaId: string) => {
  const items = watchlist$.items.get()
  return items.find((item) => item.media.stableId === mediaId)
}

// Helper: Get watchlist count
export const getWatchlistCount = () => {
  return watchlist$.items.get().length
}
