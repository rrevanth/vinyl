// Re-export from individual stores (for legacy compatibility)
export * from './app.store'
export { continueWatching$ } from './continueWatching.store'
export { watchlist$ } from './watchlist.store' 
export { watchProgress$ } from './watchProgress.store'

// Re-export original helper functions with original names (backward compatibility)
export {
  findContinueWatchingByMediaId as legacyFindContinueWatchingByMediaId,
  getContinueWatchingCount as legacyGetContinueWatchingCount,
} from './continueWatching.store'

export {
  isInWatchlist as legacyIsInWatchlist,
  findWatchlistItem as legacyFindWatchlistItem,
  getWatchlistCount as legacyGetWatchlistCount,
  type WatchlistItem as LegacyWatchlistItem,
} from './watchlist.store'

export {
  isEpisodeWatched as legacyIsEpisodeWatched,
  getNextEpisode as legacyGetNextEpisode,
  getSeasonCompletion as legacyGetSeasonCompletion,
  isMovieWatched as legacyIsMovieWatched,
  type SeriesProgress as LegacySeriesProgress,
  type MovieProgress as LegacyMovieProgress,
  type WatchProgress as LegacyWatchProgress,
} from './watchProgress.store'

// Consolidated media library store (primary export)
export {
  mediaLibrary$,
  // Types
  type WatchlistItem,
  type SeriesProgress,
  type MovieProgress,
  type WatchProgress,
  // Continue watching
  findContinueWatchingByMediaId,
  getContinueWatchingCount,
  addToContinueWatching,
  removeFromContinueWatching,
  // Watchlist
  isInWatchlist,
  findWatchlistItem,
  getWatchlistCount,
  addToWatchlist,
  removeFromWatchlist,
  toggleWatchlist,
  // Watch progress
  isEpisodeWatched,
  getNextEpisode,
  getSeasonCompletion,
  isMovieWatched,
  setWatchProgress,
  markEpisodeWatched,
  markMovieWatched,
  // Hero section
  setHeroItems,
  nextHeroItem,
  previousHeroItem,
  getCurrentHeroItem,
  setHeroAutoRotation,
  // Catalogs (UI state only - data lives in TanStack Query)
  addCatalogLoading,
  removeCatalogLoading,
  isCatalogLoading,
  // UI state
  setRefreshing,
  setError,
  clearError,
  clearAllErrors,
  getError,
  // General
  resetLoadingStates,
  getLibraryCounts,
} from './mediaLibrary.store'
