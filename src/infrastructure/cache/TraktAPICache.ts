import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type {
  TraktMovie,
  TraktShow,
  TraktPerson,
  TraktSearchResult,
  TraktHistoryItem,
  TraktWatchlistItem,
  TraktCollectionItem,
  TraktPlaybackItem,
  TraktUser,
  TraktUserStats,
  TraktExtended,
  TraktPaginationParams,
  TraktFilterParams,
  TraktSearchParams,
  TraktHistoryParams,
  TraktWatchlistParams,
  TraktCollectionParams,
} from '@/src/infrastructure/api/trakt/types'
import type { QueryClient } from '@tanstack/react-query'
import { GenericAPICache, type CacheStrategy } from '@/src/infrastructure/cache/GenericAPICache'

/**
 * Trakt API cache wrapper
 *
 * Features:
 * - Wraps common Trakt API methods with GenericAPICache strategies
 * - Auth-aware cache keys (append 'auth' or 'public')
 * - Type-safe with proper TypeScript interfaces
 * - Intelligent cache strategy selection per endpoint type
 * - Coordinates with TraktDetailCache for multi-level caching
 *
 * Cache Strategy Mapping:
 * - Movie/Show details: 'media-details' (1 hour stale, 4 hours gc)
 * - Continue watching/playback progress: 'continue-watching' (1 min stale, 5 min gc)
 * - Search: 'search' (5 min stale, 15 min gc)
 * - User lists/watchlist: 'catalog-items' (5 min stale, 30 min gc)
 * - User profile/stats: 'media-details' (1 hour stale, 4 hours gc)
 */
export class TraktAPICache {
  private cache: GenericAPICache

  constructor(
    private readonly queryClient: QueryClient,
    private readonly logger: ILoggingService,
    private readonly traktClient: TraktClient
  ) {
    this.cache = new GenericAPICache(queryClient, logger)
  }

  /**
   * Initialize the cache service
   */
  async initialize(): Promise<void> {
    await this.cache.initialize()
    this.logger.debug('TraktAPICache initialized')
  }

  /**
   * Shutdown the cache service
   */
  async shutdown(): Promise<void> {
    await this.cache.shutdown()
    this.logger.debug('TraktAPICache shutdown')
  }

  // ===== MOVIE METHODS =====

  /**
   * Get movie details with caching
   */
  async getMovieDetails(
    movieId: string | number,
    options?: { extended?: TraktExtended }
  ): Promise<TraktMovie> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    return this.cache.fetchWithStrategy(
      ['trakt', 'movie', 'details', movieId.toString(), options?.extended ?? 'min'],
      () => this.traktClient.movies.getDetails(movieId, options),
      'media-details',
      isAuthenticated
    )
  }

  /**
   * Get related movies with caching
   */
  async getRelatedMovies(
    movieId: string | number,
    options?: { limit?: number; extended?: TraktExtended }
  ): Promise<TraktMovie[]> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    return this.cache.fetchWithStrategy(
      [
        'trakt',
        'movie',
        'related',
        movieId.toString(),
        options?.limit ?? 10,
        options?.extended ?? 'min',
      ],
      () => this.traktClient.movies.getRelated(movieId, options),
      'catalog-items',
      isAuthenticated
    )
  }

  // ===== SHOW METHODS =====

  /**
   * Get show details with caching
   */
  async getShowDetails(
    showId: string | number,
    options?: { extended?: TraktExtended }
  ): Promise<TraktShow> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    return this.cache.fetchWithStrategy(
      ['trakt', 'show', 'details', showId.toString(), options?.extended ?? 'min'],
      () => this.traktClient.shows.getDetails(showId, options),
      'media-details',
      isAuthenticated
    )
  }

  /**
   * Get related shows with caching
   */
  async getRelatedShows(
    showId: string | number,
    options?: { limit?: number; extended?: TraktExtended }
  ): Promise<TraktShow[]> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    return this.cache.fetchWithStrategy(
      [
        'trakt',
        'show',
        'related',
        showId.toString(),
        options?.limit ?? 10,
        options?.extended ?? 'min',
      ],
      () => this.traktClient.shows.getRelated(showId, options),
      'catalog-items',
      isAuthenticated
    )
  }

  // ===== SEARCH METHODS =====

  /**
   * Search all content types with caching
   */
  async searchAll(
    query: string,
    params?: Omit<TraktSearchParams, 'query' | 'type'> & TraktPaginationParams & TraktFilterParams
  ): Promise<TraktSearchResult[]> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    return this.cache.fetchWithStrategy(
      [
        'trakt',
        'search',
        'all',
        query,
        params?.limit ?? 10,
        params?.page ?? 1,
        params?.extended ?? 'min',
      ],
      () => this.traktClient.search.searchAll(query, params),
      'search',
      isAuthenticated
    )
  }

  /**
   * Search movies with caching
   */
  async searchMovies(
    query: string,
    params?: Omit<TraktSearchParams, 'query' | 'type'> & TraktPaginationParams & TraktFilterParams
  ): Promise<TraktSearchResult[]> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    return this.cache.fetchWithStrategy(
      [
        'trakt',
        'search',
        'movies',
        query,
        params?.limit ?? 10,
        params?.page ?? 1,
        params?.extended ?? 'min',
      ],
      () => this.traktClient.search.searchMovies(query, params),
      'search',
      isAuthenticated
    )
  }

  /**
   * Search shows with caching
   */
  async searchShows(
    query: string,
    params?: Omit<TraktSearchParams, 'query' | 'type'> & TraktPaginationParams & TraktFilterParams
  ): Promise<TraktSearchResult[]> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    return this.cache.fetchWithStrategy(
      [
        'trakt',
        'search',
        'shows',
        query,
        params?.limit ?? 10,
        params?.page ?? 1,
        params?.extended ?? 'min',
      ],
      () => this.traktClient.search.searchShows(query, params),
      'search',
      isAuthenticated
    )
  }

  /**
   * Search people with caching
   */
  async searchPeople(
    query: string,
    params?: Omit<TraktSearchParams, 'query' | 'type'> & TraktPaginationParams & TraktFilterParams
  ): Promise<TraktSearchResult[]> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    return this.cache.fetchWithStrategy(
      [
        'trakt',
        'search',
        'people',
        query,
        params?.limit ?? 10,
        params?.page ?? 1,
        params?.extended ?? 'min',
      ],
      () => this.traktClient.search.searchPeople(query, params),
      'search',
      isAuthenticated
    )
  }

  // ===== SYNC METHODS (Continue Watching & Playback Progress) =====

  /**
   * Get playback progress (continue watching) with caching
   * NOTE: Requires authentication
   */
  async getPlaybackProgress(params?: {
    type?: 'movies' | 'episodes'
    limit?: number
  }): Promise<TraktPlaybackItem[]> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    // Return empty array if not authenticated
    if (!isAuthenticated) {
      this.logger.debug('Skipping playback progress fetch - not authenticated')
      return []
    }

    return this.cache.fetchWithStrategy(
      ['trakt', 'sync', 'playback', params?.type ?? 'all', params?.limit ?? 12],
      () => this.traktClient.sync.getPlaybackProgress(params),
      'continue-watching',
      true // Always authenticated
    )
  }

  // ===== USER METHODS =====

  /**
   * Get user profile with caching
   */
  async getUserProfile(
    username: string,
    options?: { extended?: TraktExtended }
  ): Promise<TraktUser> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    return this.cache.fetchWithStrategy(
      ['trakt', 'user', 'profile', username, options?.extended ?? 'min'],
      () => this.traktClient.users.getProfile(username, options),
      'media-details',
      isAuthenticated
    )
  }

  /**
   * Get current user's profile with caching
   * NOTE: Requires authentication
   */
  async getMyProfile(options?: { extended?: TraktExtended }): Promise<TraktUser | null> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    // Return null if not authenticated
    if (!isAuthenticated) {
      this.logger.debug('Skipping profile fetch - not authenticated')
      return null
    }

    return this.cache.fetchWithStrategy(
      ['trakt', 'user', 'profile', 'me', options?.extended ?? 'min'],
      () => this.traktClient.users.getMyProfile(options),
      'media-details',
      true // Always authenticated
    )
  }

  /**
   * Get user statistics with caching
   */
  async getUserStats(username: string): Promise<TraktUserStats> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    return this.cache.fetchWithStrategy(
      ['trakt', 'user', 'stats', username],
      () => this.traktClient.users.getStats(username),
      'media-details',
      isAuthenticated
    )
  }

  /**
   * Get current user's statistics with caching
   * NOTE: Requires authentication
   */
  async getMyStats(): Promise<TraktUserStats | null> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    // Return null if not authenticated
    if (!isAuthenticated) {
      this.logger.debug('Skipping stats fetch - not authenticated')
      return null
    }

    return this.cache.fetchWithStrategy(
      ['trakt', 'user', 'stats', 'me'],
      () => this.traktClient.users.getMyStats(),
      'media-details',
      true // Always authenticated
    )
  }

  // ===== HISTORY METHODS =====

  /**
   * Get user's watch history with caching
   */
  async getUserHistory(
    username: string,
    params?: TraktHistoryParams
  ): Promise<TraktHistoryItem[]> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    return this.cache.fetchWithStrategy(
      [
        'trakt',
        'user',
        'history',
        username,
        params?.limit ?? 10,
        params?.page ?? 1,
        params?.type ?? 'all',
        params?.extended ?? 'min',
      ],
      () => this.traktClient.users.getHistory(username, params),
      'catalog-items',
      isAuthenticated
    )
  }

  /**
   * Get current user's watch history with caching
   * NOTE: Requires authentication
   */
  async getMyHistory(params?: TraktHistoryParams): Promise<TraktHistoryItem[]> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    // Return empty array if not authenticated
    if (!isAuthenticated) {
      this.logger.debug('Skipping history fetch - not authenticated')
      return []
    }

    return this.cache.fetchWithStrategy(
      [
        'trakt',
        'user',
        'history',
        'me',
        params?.limit ?? 10,
        params?.page ?? 1,
        params?.type ?? 'all',
        params?.extended ?? 'min',
      ],
      () => this.traktClient.users.getMyHistory(params),
      'catalog-items',
      true // Always authenticated
    )
  }

  // ===== WATCHLIST METHODS =====

  /**
   * Get user's watchlist with caching
   */
  async getUserWatchlist(
    username: string,
    params?: TraktWatchlistParams
  ): Promise<TraktWatchlistItem[]> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    return this.cache.fetchWithStrategy(
      [
        'trakt',
        'user',
        'watchlist',
        username,
        params?.limit ?? 10,
        params?.page ?? 1,
        params?.type ?? 'all',
        params?.sort ?? 'rank',
        params?.extended ?? 'min',
      ],
      () => this.traktClient.users.getWatchlist(username, params),
      'catalog-items',
      isAuthenticated
    )
  }

  /**
   * Get current user's watchlist with caching
   * NOTE: Requires authentication
   */
  async getMyWatchlist(params?: TraktWatchlistParams): Promise<TraktWatchlistItem[]> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    // Return empty array if not authenticated
    if (!isAuthenticated) {
      this.logger.debug('Skipping watchlist fetch - not authenticated')
      return []
    }

    return this.cache.fetchWithStrategy(
      [
        'trakt',
        'user',
        'watchlist',
        'me',
        params?.limit ?? 10,
        params?.page ?? 1,
        params?.type ?? 'all',
        params?.sort ?? 'rank',
        params?.extended ?? 'min',
      ],
      () => this.traktClient.users.getMyWatchlist(params),
      'catalog-items',
      true // Always authenticated
    )
  }

  // ===== COLLECTION METHODS =====

  /**
   * Get user's collection with caching
   */
  async getUserCollection(
    username: string,
    params?: TraktCollectionParams
  ): Promise<TraktCollectionItem[]> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    return this.cache.fetchWithStrategy(
      [
        'trakt',
        'user',
        'collection',
        username,
        params?.type ?? 'all',
        params?.extended ?? 'min',
      ],
      () => this.traktClient.users.getCollection(username, params),
      'catalog-items',
      isAuthenticated
    )
  }

  /**
   * Get current user's collection with caching
   * NOTE: Requires authentication
   */
  async getMyCollection(params?: TraktCollectionParams): Promise<TraktCollectionItem[]> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    // Return empty array if not authenticated
    if (!isAuthenticated) {
      this.logger.debug('Skipping collection fetch - not authenticated')
      return []
    }

    return this.cache.fetchWithStrategy(
      ['trakt', 'user', 'collection', 'me', params?.type ?? 'all', params?.extended ?? 'min'],
      () => this.traktClient.users.getMyCollection(params),
      'catalog-items',
      true // Always authenticated
    )
  }

  // ===== PEOPLE METHODS =====

  /**
   * Get person details via search with caching
   * NOTE: Trakt doesn't have a direct person details endpoint
   */
  async getPersonDetails(personId: string | number): Promise<TraktPerson> {
    const isAuthenticated = this.traktClient.isAuthenticated()

    return this.cache.fetchWithStrategy(
      ['trakt', 'person', 'details', personId.toString()],
      async () => {
        // Use search as a workaround to get person details
        const searchResults = await this.traktClient.search.searchPeople(personId.toString(), {
          extended: 'full,images',
          limit: 1,
        })

        if (searchResults.length === 0 || !searchResults[0].person) {
          throw new Error(`Person ${personId} not found`)
        }

        return searchResults[0].person
      },
      'media-details',
      isAuthenticated
    )
  }

  // ===== CACHE MANAGEMENT =====

  /**
   * Try to get a value from cache without triggering a fetch
   * Returns null if cache entry doesn't exist or is expired
   *
   * @param cacheKey - Cache key array to look up
   * @returns Cached value or null if not found/expired
   */
  async tryGetFromCache<T>(cacheKey: unknown[]): Promise<T | null> {
    const authAwareKey = [...cacheKey, 'authenticated'] // Trakt requires auth
    const cachedData = this.queryClient.getQueryData<T>(authAwareKey)
    return cachedData ?? null
  }

  /**
   * Set a value in cache with the given strategy
   * Useful for manually populating cache (e.g., from optimistic updates)
   *
   * @param cacheKey - Cache key array
   * @param value - Value to store in cache
   * @param strategy - Cache strategy to determine stale/gc times
   */
  async setInCache<T>(cacheKey: unknown[], value: T, strategy: CacheStrategy): Promise<void> {
    const authAwareKey = [...cacheKey, 'authenticated'] // Trakt requires auth
    const config = this.cache.getStrategyConfig(strategy)

    this.queryClient.setQueryData(authAwareKey, value)

    // Update the query state to include cache timing configuration
    this.queryClient.setQueryDefaults(authAwareKey, {
      staleTime: config.staleTime,
      gcTime: config.gcTime,
    })

    this.logger.debug('Set cache entry', {
      queryKey: authAwareKey,
      strategy,
      staleTime: config.staleTime,
      gcTime: config.gcTime,
    })
  }

  /**
   * Invalidate movie cache
   */
  async invalidateMovieCache(movieId?: string | number): Promise<void> {
    if (movieId) {
      await this.cache.invalidate(['trakt', 'movie', 'details', movieId.toString()])
      await this.cache.invalidate(['trakt', 'movie', 'related', movieId.toString()])
    } else {
      await this.cache.invalidate(['trakt', 'movie'])
    }
    this.logger.debug(`Invalidated Trakt movie cache ${movieId ? `for ${movieId}` : '(all)'}`)
  }

  /**
   * Invalidate show cache
   */
  async invalidateShowCache(showId?: string | number): Promise<void> {
    if (showId) {
      await this.cache.invalidate(['trakt', 'show', 'details', showId.toString()])
      await this.cache.invalidate(['trakt', 'show', 'related', showId.toString()])
    } else {
      await this.cache.invalidate(['trakt', 'show'])
    }
    this.logger.debug(`Invalidated Trakt show cache ${showId ? `for ${showId}` : '(all)'}`)
  }

  /**
   * Invalidate search cache
   */
  async invalidateSearchCache(query?: string): Promise<void> {
    if (query) {
      await this.cache.invalidate(['trakt', 'search', 'all', query])
      await this.cache.invalidate(['trakt', 'search', 'movies', query])
      await this.cache.invalidate(['trakt', 'search', 'shows', query])
      await this.cache.invalidate(['trakt', 'search', 'people', query])
    } else {
      await this.cache.invalidate(['trakt', 'search'])
    }
    this.logger.debug(`Invalidated Trakt search cache ${query ? `for "${query}"` : '(all)'}`)
  }

  /**
   * Invalidate user data cache
   */
  async invalidateUserCache(username?: string): Promise<void> {
    if (username) {
      await this.cache.invalidate(['trakt', 'user', 'profile', username])
      await this.cache.invalidate(['trakt', 'user', 'stats', username])
      await this.cache.invalidate(['trakt', 'user', 'history', username])
      await this.cache.invalidate(['trakt', 'user', 'watchlist', username])
      await this.cache.invalidate(['trakt', 'user', 'collection', username])
    } else {
      await this.cache.invalidate(['trakt', 'user'])
    }
    this.logger.debug(`Invalidated Trakt user cache ${username ? `for ${username}` : '(all)'}`)
  }

  /**
   * Invalidate continue watching cache
   */
  async invalidateContinueWatchingCache(): Promise<void> {
    await this.cache.invalidate(['trakt', 'sync', 'playback'])
    this.logger.debug('Invalidated Trakt continue watching cache')
  }

  /**
   * Invalidate all authenticated caches when user logs out
   * This ensures no cached user-specific data remains
   */
  async invalidateAuthenticatedCaches(): Promise<void> {
    await this.cache.invalidateAuthenticatedCaches()
    this.logger.info('Invalidated all authenticated Trakt caches')
  }

  /**
   * Clear all Trakt cache
   */
  async clearAllTraktCache(): Promise<void> {
    await this.cache.invalidate(['trakt'])
    this.logger.info('Cleared all Trakt cache')
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return this.cache.getCacheStats()
  }
}
