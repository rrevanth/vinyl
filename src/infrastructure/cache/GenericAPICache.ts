import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { QueryClient } from '@tanstack/react-query'

/**
 * Cache strategy type for different endpoint categories
 */
export type CacheStrategy = 'catalog-metadata' | 'catalog-items' | 'continue-watching' | 'media-details' | 'search'

/**
 * Cache configuration for a specific strategy
 */
export interface CacheConfig {
  staleTime: number
  gcTime: number
}

/**
 * Options for cache operations
 */
export interface CacheOptions {
  staleTime?: number
  gcTime?: number
  retry?: number
  retryDelay?: (attemptIndex: number) => number
}

/**
 * Generic API-level caching service using TanStack Query
 *
 * Features:
 * - Type-safe generic implementation
 * - Per-endpoint cache configuration
 * - Request deduplication
 * - Auth-aware cache keys
 * - Configurable stale/gc times per endpoint type
 * - Automatic retry with exponential backoff
 * - Memory efficient with automatic cleanup
 */
export class GenericAPICache {
  // Cache strategies with predefined configurations
  private readonly CACHE_STRATEGIES: Record<CacheStrategy, CacheConfig> = {
    'catalog-metadata': {
      staleTime: 30 * 60 * 1000,  // 30 minutes
      gcTime: 2 * 60 * 60 * 1000,  // 2 hours
    },
    'catalog-items': {
      staleTime: 5 * 60 * 1000,   // 5 minutes
      gcTime: 30 * 60 * 1000,     // 30 minutes
    },
    'continue-watching': {
      staleTime: 1 * 60 * 1000,   // 1 minute
      gcTime: 5 * 60 * 1000,      // 5 minutes
    },
    'media-details': {
      staleTime: 60 * 60 * 1000,  // 1 hour
      gcTime: 4 * 60 * 60 * 1000, // 4 hours
    },
    'search': {
      staleTime: 5 * 60 * 1000,   // 5 minutes
      gcTime: 15 * 60 * 1000,     // 15 minutes
    },
  }

  // Default retry configuration
  private readonly DEFAULT_RETRY_COUNT = 2
  private readonly DEFAULT_RETRY_DELAY = (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000)

  constructor(
    private readonly queryClient: QueryClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Fetch data with caching using predefined cache strategy
   *
   * @param queryKey - Unique query key array for cache identification
   * @param fetchFn - Function that fetches the data
   * @param strategy - Cache strategy to use
   * @param isAuthenticated - Whether the request is authenticated (affects cache key)
   * @returns Promise with cached or fresh data
   */
  async fetchWithStrategy<TResult>(
    queryKey: unknown[],
    fetchFn: () => Promise<TResult>,
    strategy: CacheStrategy,
    isAuthenticated: boolean = false
  ): Promise<TResult> {
    const config = this.CACHE_STRATEGIES[strategy]
    const authAwareKey = this.makeAuthAwareKey(queryKey, isAuthenticated)

    this.logger.debug(`Fetching with ${strategy} strategy`, {
      queryKey: authAwareKey,
      authenticated: isAuthenticated,
      staleTime: config.staleTime,
      gcTime: config.gcTime,
    })

    return this.queryClient.fetchQuery({
      queryKey: authAwareKey,
      queryFn: fetchFn,
      staleTime: config.staleTime,
      gcTime: config.gcTime,
      retry: this.DEFAULT_RETRY_COUNT,
      retryDelay: this.DEFAULT_RETRY_DELAY,
    })
  }

  /**
   * Fetch data with custom cache configuration
   *
   * @param queryKey - Unique query key array for cache identification
   * @param fetchFn - Function that fetches the data
   * @param options - Custom cache options
   * @param isAuthenticated - Whether the request is authenticated (affects cache key)
   * @returns Promise with cached or fresh data
   */
  async fetchWithCache<TResult>(
    queryKey: unknown[],
    fetchFn: () => Promise<TResult>,
    options: CacheOptions = {},
    isAuthenticated: boolean = false
  ): Promise<TResult> {
    const authAwareKey = this.makeAuthAwareKey(queryKey, isAuthenticated)

    this.logger.debug('Fetching with custom cache options', {
      queryKey: authAwareKey,
      authenticated: isAuthenticated,
      options,
    })

    return this.queryClient.fetchQuery({
      queryKey: authAwareKey,
      queryFn: fetchFn,
      staleTime: options.staleTime,
      gcTime: options.gcTime,
      retry: options.retry ?? this.DEFAULT_RETRY_COUNT,
      retryDelay: options.retryDelay ?? this.DEFAULT_RETRY_DELAY,
    })
  }

  /**
   * Prefetch data with caching using predefined cache strategy
   * Useful for optimistic loading
   *
   * @param queryKey - Unique query key array for cache identification
   * @param fetchFn - Function that fetches the data
   * @param strategy - Cache strategy to use
   * @param isAuthenticated - Whether the request is authenticated (affects cache key)
   * @returns Promise that resolves when prefetch is complete
   */
  async prefetchWithStrategy<TResult>(
    queryKey: unknown[],
    fetchFn: () => Promise<TResult>,
    strategy: CacheStrategy,
    isAuthenticated: boolean = false
  ): Promise<void> {
    const config = this.CACHE_STRATEGIES[strategy]
    const authAwareKey = this.makeAuthAwareKey(queryKey, isAuthenticated)

    this.logger.debug(`Prefetching with ${strategy} strategy`, {
      queryKey: authAwareKey,
      authenticated: isAuthenticated,
    })

    await this.queryClient.prefetchQuery({
      queryKey: authAwareKey,
      queryFn: fetchFn,
      staleTime: config.staleTime,
      gcTime: config.gcTime,
    })
  }

  /**
   * Invalidate cache entries matching the query key
   *
   * @param queryKey - Query key to invalidate (partial match supported)
   * @param exact - If true, only exact matches are invalidated
   */
  async invalidate(queryKey: unknown[], exact: boolean = false): Promise<void> {
    this.logger.debug('Invalidating cache', { queryKey, exact })

    await this.queryClient.invalidateQueries({
      queryKey,
      exact,
    })
  }

  /**
   * Invalidate all authenticated caches
   * Useful when user logs out
   */
  async invalidateAuthenticatedCaches(): Promise<void> {
    const cache = this.queryClient.getQueryCache()
    const authQueries = cache
      .getAll()
      .filter((q) => {
        const key = q.queryKey as unknown[]
        return key[key.length - 1] === 'auth'
      })

    this.logger.debug('Invalidating authenticated caches', {
      count: authQueries.length,
    })

    for (const query of authQueries) {
      await this.queryClient.invalidateQueries({ queryKey: query.queryKey })
    }
  }

  /**
   * Clear all cached data
   */
  async clearAll(): Promise<void> {
    this.logger.info('Clearing all cached data')
    await this.queryClient.clear()
  }

  /**
   * Get cache statistics
   *
   * @returns Object with cache stats
   */
  getCacheStats(): {
    totalQueries: number
    authQueries: number
    publicQueries: number
    strategies: Record<string, number>
  } {
    const cache = this.queryClient.getQueryCache()
    const queries = cache.getAll()

    const authQueries = queries.filter((q) => {
      const key = q.queryKey as unknown[]
      return key[key.length - 1] === 'auth'
    }).length

    const publicQueries = queries.filter((q) => {
      const key = q.queryKey as unknown[]
      return key[key.length - 1] === 'public'
    }).length

    // Count queries by strategy (if strategy is in query key)
    const strategies: Record<string, number> = {}
    for (const strategy of Object.keys(this.CACHE_STRATEGIES)) {
      strategies[strategy] = queries.filter((q) => {
        const key = q.queryKey as unknown[]
        return key.includes(strategy)
      }).length
    }

    return {
      totalQueries: queries.length,
      authQueries,
      publicQueries,
      strategies,
    }
  }

  /**
   * Get cache configuration for a specific strategy
   *
   * @param strategy - Cache strategy
   * @returns Cache configuration
   */
  getStrategyConfig(strategy: CacheStrategy): CacheConfig {
    return this.CACHE_STRATEGIES[strategy]
  }

  /**
   * Make cache key auth-aware by appending auth status
   *
   * @param queryKey - Original query key
   * @param isAuthenticated - Authentication status
   * @returns Auth-aware query key
   */
  private makeAuthAwareKey(queryKey: unknown[], isAuthenticated: boolean): unknown[] {
    return [...queryKey, isAuthenticated ? 'auth' : 'public']
  }

  /**
   * Initialize the cache service
   */
  async initialize(): Promise<void> {
    this.logger.debug('GenericAPICache initialized with TanStack Query')
  }

  /**
   * Shutdown the cache service
   */
  async shutdown(): Promise<void> {
    await this.clearAll()
    this.logger.debug('GenericAPICache shutdown')
  }
}
