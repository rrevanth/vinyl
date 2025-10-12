import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { QueryClient } from '@tanstack/react-query'
import { GenericAPICache, type CacheStrategy } from '@/src/infrastructure/cache/GenericAPICache'
import type { MDBListClient } from '@/src/infrastructure/api/mdblist/MDBListClient'
import type {
  MDBListLimits,
  MDBListList,
  MDBListItemsResponse,
  MDBListMediaInfo,
  MDBListSearchResponse,
  MDBListRatingsBulkRequest,
  MDBListRatingsBulkResponse,
  MDBListMediaInfoBatchRequest,
  MDBListRatings,
} from '@/src/infrastructure/api/mdblist/types/MDBListTypes'

/**
 * MDBList API cache wrapper
 *
 * Wraps MDBList API methods with GenericAPICache for efficient caching.
 * Uses appropriate cache strategies for different endpoint types:
 * - Media info: media-details strategy (1 hour stale, 4 hours gc)
 * - Ratings: media-details strategy (1 hour stale, 4 hours gc)
 * - Lists: catalog-items strategy (5 min stale, 30 min gc)
 * - Search: search strategy (5 min stale, 15 min gc)
 * - User limits: catalog-metadata strategy (30 min stale, 2 hours gc)
 *
 * Features:
 * - Type-safe wrapper around MDBListClient
 * - Auth-aware cache keys (MDBList uses API key)
 * - Request deduplication
 * - Automatic retry with exponential backoff
 * - Memory efficient with automatic cleanup
 */
export class MDBListAPICache {
  private cache: GenericAPICache

  constructor(
    private queryClient: QueryClient,
    private logger: ILoggingService,
    private mdblistClient: MDBListClient
  ) {
    this.cache = new GenericAPICache(queryClient, logger)
  }

  // ===== USER LIMITS =====

  /**
   * Get user limits and account information (cached)
   * Cache: catalog-metadata strategy (30 min stale, 2 hours gc)
   */
  async getLimits(): Promise<MDBListLimits> {
    return this.cache.fetchWithStrategy(
      ['mdblist', 'user', 'limits'],
      () => this.mdblistClient.getLimits(),
      'catalog-metadata',
      true // Requires API key authentication
    )
  }

  // ===== LISTS =====

  /**
   * Get current user's lists (cached)
   * Cache: catalog-items strategy (5 min stale, 30 min gc)
   */
  async getUserLists(): Promise<MDBListList[]> {
    return this.cache.fetchWithStrategy(
      ['mdblist', 'lists', 'user'],
      () => this.mdblistClient.getUserLists(),
      'catalog-items',
      true // Requires API key authentication
    )
  }

  /**
   * Get list items by list ID (cached)
   * Cache: catalog-items strategy (5 min stale, 30 min gc)
   *
   * @param listId - List ID to fetch items for
   * @param options - Optional query parameters for filtering and sorting
   */
  async getListItems(
    listId: number,
    options?: {
      limit?: number
      offset?: number
      append_to_response?: string
      filter_genre?: string
      sort?: string
      order?: 'asc' | 'desc'
    }
  ): Promise<MDBListItemsResponse> {
    // Include options in cache key for proper cache separation
    return this.cache.fetchWithStrategy(
      ['mdblist', 'lists', listId, 'items', options],
      () => this.mdblistClient.getListItems(listId, options),
      'catalog-items',
      true // Requires API key authentication
    )
  }

  // ===== MEDIA INFO =====

  /**
   * Get media information by provider and ID (cached)
   * Cache: media-details strategy (1 hour stale, 4 hours gc)
   *
   * @param provider - Media provider (tmdb, imdb, trakt, tvdb, mal)
   * @param mediaType - Media type (movie, show, any)
   * @param mediaId - Media ID from provider
   * @param options - Optional append_to_response parameter
   */
  async getMediaInfo(
    provider: 'tmdb' | 'imdb' | 'trakt' | 'tvdb' | 'mal',
    mediaType: 'movie' | 'show' | 'any',
    mediaId: string,
    options?: {
      append_to_response?: string
    }
  ): Promise<MDBListMediaInfo> {
    return this.cache.fetchWithStrategy(
      ['mdblist', 'media', provider, mediaType, mediaId, options],
      () => this.mdblistClient.getMediaInfo(provider, mediaType, mediaId, options),
      'media-details',
      true // Requires API key authentication
    )
  }

  /**
   * Get movie ratings by IMDb ID (cached)
   * Cache: media-details strategy (1 hour stale, 4 hours gc)
   *
   * @param imdbId - IMDb ID (e.g., tt1234567)
   */
  async getMovieRatings(imdbId: string): Promise<MDBListRatings> {
    return this.cache.fetchWithStrategy(
      ['mdblist', 'ratings', 'movie', imdbId],
      () => this.mdblistClient.getMovieRatings(imdbId),
      'media-details',
      true // Requires API key authentication
    )
  }

  /**
   * Get show ratings by IMDb ID (cached)
   * Cache: media-details strategy (1 hour stale, 4 hours gc)
   *
   * @param imdbId - IMDb ID (e.g., tt1234567)
   */
  async getShowRatings(imdbId: string): Promise<MDBListRatings> {
    return this.cache.fetchWithStrategy(
      ['mdblist', 'ratings', 'show', imdbId],
      () => this.mdblistClient.getShowRatings(imdbId),
      'media-details',
      true // Requires API key authentication
    )
  }

  /**
   * Batch get media info (cached)
   * Cache: media-details strategy (1 hour stale, 4 hours gc)
   *
   * @param provider - Media provider (tmdb, imdb, trakt, tvdb, mal)
   * @param mediaType - Media type (movie, show, any)
   * @param request - Batch request with media IDs
   */
  async getMediaInfoBatch(
    provider: 'tmdb' | 'imdb' | 'trakt' | 'tvdb' | 'mal',
    mediaType: 'movie' | 'show' | 'any',
    request: MDBListMediaInfoBatchRequest
  ): Promise<MDBListMediaInfo[]> {
    // Include request payload in cache key for proper cache separation
    return this.cache.fetchWithStrategy(
      ['mdblist', 'media', 'batch', provider, mediaType, request],
      () => this.mdblistClient.getMediaInfoBatch(provider, mediaType, request),
      'media-details',
      true // Requires API key authentication
    )
  }

  // ===== SEARCH =====

  /**
   * Search for media (cached)
   * Cache: search strategy (5 min stale, 15 min gc)
   *
   * @param mediaType - Media type to search (movie, show, any)
   * @param query - Search query string
   * @param options - Optional search parameters
   */
  async search(
    mediaType: 'movie' | 'show' | 'any',
    query: string,
    options?: {
      limit_by_score?: number
      sort_by_score?: boolean
      year?: number
      limit?: number
    }
  ): Promise<MDBListSearchResponse> {
    return this.cache.fetchWithStrategy(
      ['mdblist', 'search', mediaType, query, options],
      () => this.mdblistClient.search(mediaType, query, options),
      'search',
      true // Requires API key authentication
    )
  }

  // ===== RATINGS =====

  /**
   * Bulk get ratings (cached)
   * Cache: media-details strategy (1 hour stale, 4 hours gc)
   *
   * @param mediaType - Media type (movie, show)
   * @param returnRating - Rating source to return
   * @param request - Bulk ratings request with media IDs
   */
  async getRatingsBulk(
    mediaType: 'movie' | 'show',
    returnRating:
      | 'trakt'
      | 'imdb'
      | 'tmdb'
      | 'letterboxd'
      | 'tomatoes'
      | 'audience'
      | 'metacritic'
      | 'rogerebert'
      | 'mal'
      | 'score'
      | 'score_average',
    request: MDBListRatingsBulkRequest
  ): Promise<MDBListRatingsBulkResponse> {
    // Include request payload in cache key for proper cache separation
    return this.cache.fetchWithStrategy(
      ['mdblist', 'ratings', 'bulk', mediaType, returnRating, request],
      () => this.mdblistClient.getRatingsBulk(mediaType, returnRating, request),
      'media-details',
      true // Requires API key authentication
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
    const authAwareKey = [...cacheKey, 'authenticated'] // MDBList requires API key
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
    const authAwareKey = [...cacheKey, 'authenticated'] // MDBList requires API key
    const config = this.cache.getStrategyConfig(strategy)

    this.queryClient.setQueryData(authAwareKey, value)

    // Update the query state to include cache timing configuration
    this.queryClient.setQueryDefaults(authAwareKey, {
      staleTime: config.staleTime,
      gcTime: config.gcTime,
    })
  }

  /**
   * Invalidate cache for specific media
   *
   * @param provider - Media provider
   * @param mediaType - Media type
   * @param mediaId - Media ID
   */
  async invalidateMediaInfo(
    provider: 'tmdb' | 'imdb' | 'trakt' | 'tvdb' | 'mal',
    mediaType: 'movie' | 'show' | 'any',
    mediaId: string
  ): Promise<void> {
    await this.cache.invalidate(['mdblist', 'media', provider, mediaType, mediaId])
  }

  /**
   * Invalidate cache for specific list
   *
   * @param listId - List ID to invalidate
   */
  async invalidateList(listId: number): Promise<void> {
    await this.cache.invalidate(['mdblist', 'lists', listId])
  }

  /**
   * Invalidate all user lists cache
   */
  async invalidateUserLists(): Promise<void> {
    await this.cache.invalidate(['mdblist', 'lists', 'user'])
  }

  /**
   * Invalidate search cache
   */
  async invalidateSearchCache(): Promise<void> {
    await this.cache.invalidate(['mdblist', 'search'])
  }

  /**
   * Invalidate all MDBList caches
   */
  async invalidateAll(): Promise<void> {
    await this.cache.invalidate(['mdblist'])
  }

  /**
   * Clear all MDBList caches (including garbage)
   */
  async clearAll(): Promise<void> {
    await this.cache.invalidate(['mdblist'])
  }

  /**
   * Prefetch media info for optimistic loading
   *
   * @param provider - Media provider
   * @param mediaType - Media type
   * @param mediaId - Media ID
   */
  async prefetchMediaInfo(
    provider: 'tmdb' | 'imdb' | 'trakt' | 'tvdb' | 'mal',
    mediaType: 'movie' | 'show' | 'any',
    mediaId: string
  ): Promise<void> {
    await this.cache.prefetchWithStrategy(
      ['mdblist', 'media', provider, mediaType, mediaId],
      () => this.mdblistClient.getMediaInfo(provider, mediaType, mediaId),
      'media-details',
      true
    )
  }

  /**
   * Get cache statistics for MDBList
   */
  getCacheStats() {
    return this.cache.getCacheStats()
  }

  /**
   * Initialize cache service
   */
  async initialize(): Promise<void> {
    await this.cache.initialize()
    this.logger.info('MDBListAPICache initialized')
  }

  /**
   * Shutdown cache service
   */
  async shutdown(): Promise<void> {
    await this.cache.shutdown()
    this.logger.info('MDBListAPICache shutdown')
  }
}
