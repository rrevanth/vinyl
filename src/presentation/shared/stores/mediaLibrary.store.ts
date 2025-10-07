import { observable } from '@legendapp/state'
import type { Media } from '@/src/domain/entities/Media'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { ContinueWatchingItem } from '@/src/domain/capabilities/IMediaContinueWatchingCapability'

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

/**
 * Watch progress for series/shows
 */
export interface SeriesProgress {
  aired: number
  completed: number
  nextEpisode?: {
    season: number
    number: number
  }
  seasons: {
    number: number
    aired: number
    completed: number
    episodes: {
      number: number
      completed: boolean
      lastWatchedAt?: Date
    }[]
  }[]
}

/**
 * Watch progress for movies
 */
export interface MovieProgress {
  watched: boolean
  lastWatchedAt?: Date
}

/**
 * Complete watch progress for a media item
 */
export interface WatchProgress {
  series?: SeriesProgress
  movie?: MovieProgress
}

/**
 * Consolidated media library store that manages all media-related state
 * for the homescreen system including hero section, continue watching,
 * watchlist, watch progress, and catalog management.
 */
export const mediaLibrary$ = observable({
  // Hero Section
  hero: {
    /** Featured media items for the hero carousel */
    items: [] as Media[],
    /** Currently active hero item index */
    currentIndex: 0,
    /** Whether auto-rotation is enabled */
    isAutoRotating: false,
    /** Loading state for hero items */
    isLoading: false,
  },
  
  // Continue Watching (from continueWatching.store.ts)
  continueWatching: {
    /** Continue watching items with complete media objects */
    items: [] as ContinueWatchingItem[],
    /** Loading state for continue watching */
    isLoading: false,
    /** Last time continue watching was updated */
    lastUpdated: null as Date | null,
  },
  
  // Watchlist (from watchlist.store.ts)
  watchlist: {
    /** Watchlist items with complete media objects */
    items: [] as WatchlistItem[],
    /** Loading state for watchlist */
    isLoading: false,
    /** Last time watchlist was updated */
    lastUpdated: null as Date | null,
  },
  
  // Watch Progress (from watchProgress.store.ts)
  /** Map of media ID to watch progress */
  watchProgress: {} as Record<string, WatchProgress>,
  
  // Catalogs for homescreen
  catalogs: {
    /** All available catalogs */
    available: [] as Catalog[],
    /** Catalogs currently displayed on homescreen */
    displayed: [] as Catalog[],
    /** Global loading state for catalogs */
    isLoading: false,
    /** Specific catalog IDs currently loading */
    loadingCatalogIds: [] as string[],
  },
  
  // UI State
  ui: {
    /** Pull-to-refresh state */
    refreshing: false,
    /** Last refresh timestamp */
    lastRefresh: null as Date | null,
    /** Error messages by component/section */
    errors: {} as Record<string, string>,
  }
})

// =============================================================================
// HERO SECTION HELPERS
// =============================================================================

/**
 * Set hero items and reset to first item
 */
export const setHeroItems = (items: Media[]) => {
  mediaLibrary$.hero.items.set(items)
  mediaLibrary$.hero.currentIndex.set(0)
}

/**
 * Navigate to next hero item
 */
export const nextHeroItem = () => {
  const currentIndex = mediaLibrary$.hero.currentIndex.get()
  const itemsLength = mediaLibrary$.hero.items.get().length
  
  if (itemsLength === 0) return
  
  const nextIndex = (currentIndex + 1) % itemsLength
  mediaLibrary$.hero.currentIndex.set(nextIndex)
}

/**
 * Navigate to previous hero item
 */
export const previousHeroItem = () => {
  const currentIndex = mediaLibrary$.hero.currentIndex.get()
  const itemsLength = mediaLibrary$.hero.items.get().length
  
  if (itemsLength === 0) return
  
  const prevIndex = currentIndex === 0 ? itemsLength - 1 : currentIndex - 1
  mediaLibrary$.hero.currentIndex.set(prevIndex)
}

/**
 * Get current hero item
 */
export const getCurrentHeroItem = (): Media | null => {
  const items = mediaLibrary$.hero.items.get()
  const currentIndex = mediaLibrary$.hero.currentIndex.get()
  
  return items[currentIndex] || null
}

/**
 * Set hero auto-rotation state
 */
export const setHeroAutoRotation = (enabled: boolean) => {
  mediaLibrary$.hero.isAutoRotating.set(enabled)
}

// =============================================================================
// CONTINUE WATCHING HELPERS
// =============================================================================

/**
 * Find continue watching item by media ID
 */
export const findContinueWatchingByMediaId = (mediaId: string) => {
  const items = mediaLibrary$.continueWatching.items.get()
  return items.find((item) => item.media.stableId === mediaId)
}

/**
 * Get continue watching count
 */
export const getContinueWatchingCount = () => {
  return mediaLibrary$.continueWatching.items.get().length
}

/**
 * Add item to continue watching
 */
export const addToContinueWatching = (item: ContinueWatchingItem) => {
  const items = mediaLibrary$.continueWatching.items.get()
  const existingIndex = items.findIndex((existing) => existing.media.stableId === item.media.stableId)
  
  if (existingIndex >= 0) {
    // Update existing item
    mediaLibrary$.continueWatching.items[existingIndex].set(item)
  } else {
    // Add new item to beginning
    mediaLibrary$.continueWatching.items.set([item, ...items])
  }
  
  mediaLibrary$.continueWatching.lastUpdated.set(new Date())
}

/**
 * Remove item from continue watching
 */
export const removeFromContinueWatching = (mediaId: string) => {
  const items = mediaLibrary$.continueWatching.items.get()
  const filtered = items.filter((item) => item.media.stableId !== mediaId)
  mediaLibrary$.continueWatching.items.set(filtered)
  mediaLibrary$.continueWatching.lastUpdated.set(new Date())
}

// =============================================================================
// WATCHLIST HELPERS
// =============================================================================

/**
 * Check if media is in watchlist
 */
export const isInWatchlist = (mediaId: string): boolean => {
  const items = mediaLibrary$.watchlist.items.get()
  return items.some((item) => item.media.stableId === mediaId)
}

/**
 * Find watchlist item by media ID
 */
export const findWatchlistItem = (mediaId: string) => {
  const items = mediaLibrary$.watchlist.items.get()
  return items.find((item) => item.media.stableId === mediaId)
}

/**
 * Get watchlist count
 */
export const getWatchlistCount = () => {
  return mediaLibrary$.watchlist.items.get().length
}

/**
 * Add media to watchlist
 */
export const addToWatchlist = (media: Media) => {
  if (isInWatchlist(media.stableId)) return
  
  const newItem: WatchlistItem = {
    id: `${media.stableId}-${Date.now()}`,
    media,
    listedAt: new Date(),
    type: media.type as 'movie' | 'series',
  }
  
  const items = mediaLibrary$.watchlist.items.get()
  mediaLibrary$.watchlist.items.set([newItem, ...items])
  mediaLibrary$.watchlist.lastUpdated.set(new Date())
}

/**
 * Remove media from watchlist
 */
export const removeFromWatchlist = (mediaId: string) => {
  const items = mediaLibrary$.watchlist.items.get()
  const filtered = items.filter((item) => item.media.stableId !== mediaId)
  mediaLibrary$.watchlist.items.set(filtered)
  mediaLibrary$.watchlist.lastUpdated.set(new Date())
}

/**
 * Toggle media in watchlist
 */
export const toggleWatchlist = (media: Media) => {
  if (isInWatchlist(media.stableId)) {
    removeFromWatchlist(media.stableId)
  } else {
    addToWatchlist(media)
  }
}

// =============================================================================
// WATCH PROGRESS HELPERS
// =============================================================================

/**
 * Check if episode is watched
 */
export const isEpisodeWatched = (
  mediaId: string,
  season: number,
  episode: number
): boolean => {
  const progress = mediaLibrary$.watchProgress[mediaId].series?.get()
  if (!progress) return false

  const seasonData = progress.seasons.find((s) => s.number === season)
  const episodeData = seasonData?.episodes.find((e) => e.number === episode)
  return episodeData?.completed ?? false
}

/**
 * Get next episode to watch
 */
export const getNextEpisode = (mediaId: string) => {
  return mediaLibrary$.watchProgress[mediaId].series?.nextEpisode.get()
}

/**
 * Get season completion percentage
 */
export const getSeasonCompletion = (mediaId: string, seasonNumber: number) => {
  const progress = mediaLibrary$.watchProgress[mediaId].series?.get()
  const seasonData = progress?.seasons.find((s) => s.number === seasonNumber)
  if (!seasonData) return { completed: 0, aired: 0, percentage: 0 }

  return {
    completed: seasonData.completed,
    aired: seasonData.aired,
    percentage: Math.round((seasonData.completed / seasonData.aired) * 100),
  }
}

/**
 * Check if movie is watched
 */
export const isMovieWatched = (mediaId: string): boolean => {
  return mediaLibrary$.watchProgress[mediaId].movie?.watched.get() ?? false
}

/**
 * Set watch progress for a media item
 */
export const setWatchProgress = (mediaId: string, progress: WatchProgress) => {
  mediaLibrary$.watchProgress[mediaId].set(progress)
}

/**
 * Mark episode as watched
 */
export const markEpisodeWatched = (
  mediaId: string,
  season: number,
  episode: number,
  watched: boolean = true
) => {
  const currentProgress = mediaLibrary$.watchProgress[mediaId].series?.get()
  if (!currentProgress) return

  const seasonIndex = currentProgress.seasons.findIndex((s) => s.number === season)
  if (seasonIndex === -1) return

  const episodeIndex = currentProgress.seasons[seasonIndex].episodes.findIndex((e) => e.number === episode)
  if (episodeIndex === -1) return

  mediaLibrary$.watchProgress[mediaId].series.seasons[seasonIndex].episodes[episodeIndex].completed.set(watched)
  if (watched) {
    mediaLibrary$.watchProgress[mediaId].series.seasons[seasonIndex].episodes[episodeIndex].lastWatchedAt.set(new Date())
  }
}

/**
 * Mark movie as watched
 */
export const markMovieWatched = (mediaId: string, watched: boolean = true) => {
  mediaLibrary$.watchProgress[mediaId].movie.watched.set(watched)
  if (watched) {
    mediaLibrary$.watchProgress[mediaId].movie.lastWatchedAt.set(new Date())
  }
}

// =============================================================================
// CATALOG HELPERS
// =============================================================================

/**
 * Set available catalogs
 */
export const setAvailableCatalogs = (catalogs: Catalog[]) => {
  mediaLibrary$.catalogs.available.set(catalogs)
}

/**
 * Set displayed catalogs for homescreen
 */
export const setDisplayedCatalogs = (catalogs: Catalog[]) => {
  mediaLibrary$.catalogs.displayed.set(catalogs)
}

/**
 * Add catalog to loading state
 */
export const addCatalogLoading = (catalogId: string) => {
  const loadingIds = mediaLibrary$.catalogs.loadingCatalogIds.get()
  if (!loadingIds.includes(catalogId)) {
    mediaLibrary$.catalogs.loadingCatalogIds.set([...loadingIds, catalogId])
  }
}

/**
 * Remove catalog from loading state
 */
export const removeCatalogLoading = (catalogId: string) => {
  const loadingIds = mediaLibrary$.catalogs.loadingCatalogIds.get()
  mediaLibrary$.catalogs.loadingCatalogIds.set(loadingIds.filter(id => id !== catalogId))
}

/**
 * Check if catalog is loading
 */
export const isCatalogLoading = (catalogId: string): boolean => {
  const loadingIds = mediaLibrary$.catalogs.loadingCatalogIds.get()
  return loadingIds.includes(catalogId)
}

/**
 * Find catalog by ID
 */
export const findCatalogById = (catalogId: string): Catalog | null => {
  const catalogs = mediaLibrary$.catalogs.available.get()
  return catalogs.find(catalog => catalog.id === catalogId) || null
}

// =============================================================================
// UI STATE HELPERS
// =============================================================================

/**
 * Set refresh state
 */
export const setRefreshing = (refreshing: boolean) => {
  mediaLibrary$.ui.refreshing.set(refreshing)
  if (!refreshing) {
    mediaLibrary$.ui.lastRefresh.set(new Date())
  }
}

/**
 * Set error for a component/section
 */
export const setError = (key: string, message: string) => {
  mediaLibrary$.ui.errors[key].set(message)
}

/**
 * Clear error for a component/section
 */
export const clearError = (key: string) => {
  const errors = mediaLibrary$.ui.errors.get()
  const { [key]: _, ...rest } = errors
  mediaLibrary$.ui.errors.set(rest)
}

/**
 * Clear all errors
 */
export const clearAllErrors = () => {
  mediaLibrary$.ui.errors.set({})
}

/**
 * Get error for a component/section
 */
export const getError = (key: string): string | null => {
  return mediaLibrary$.ui.errors[key].get() || null
}

// =============================================================================
// GENERAL HELPERS
// =============================================================================

/**
 * Reset all loading states
 */
export const resetLoadingStates = () => {
  mediaLibrary$.hero.isLoading.set(false)
  mediaLibrary$.continueWatching.isLoading.set(false)
  mediaLibrary$.watchlist.isLoading.set(false)
  mediaLibrary$.catalogs.isLoading.set(false)
  mediaLibrary$.catalogs.loadingCatalogIds.set([])
  mediaLibrary$.ui.refreshing.set(false)
}

/**
 * Get total counts for dashboard
 */
export const getLibraryCounts = () => {
  return {
    continueWatching: getContinueWatchingCount(),
    watchlist: getWatchlistCount(),
    watchProgress: Object.keys(mediaLibrary$.watchProgress.get()).length,
  }
}