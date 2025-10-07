// ============================================================================
// Cache Service Interface
// ============================================================================

/**
 * Cache key generation and management utilities
 */
export interface ICacheKeyGenerator {
  /**
   * Generate cache key for media metadata
   */
  media(mediaId: string, providerId?: string): string

  /**
   * Generate cache key for catalog data
   */
  catalog(catalogId: string, page?: number, filters?: Record<string, unknown>): string

  /**
   * Generate cache key for continue watching data
   */
  continueWatching(userId: string): string

  /**
   * Generate cache key for search results
   */
  search(query: string, type?: string, filters?: Record<string, unknown>): string

  /**
   * Generate cache key for user preferences
   */
  userPreferences(userId: string): string

  /**
   * Generate cache key for provider data
   */
  provider(providerId: string, dataType: string): string
}

/**
 * Cache configuration for different data types
 */
export interface ICacheConfig {
  /**
   * Time-to-live in milliseconds
   */
  readonly ttl: number

  /**
   * Whether to refresh cache in background before expiry
   */
  readonly refreshInBackground?: boolean

  /**
   * Maximum number of items to store for this cache type
   */
  readonly maxItems?: number

  /**
   * Whether to persist cache across app restarts
   */
  readonly persistent?: boolean
}

/**
 * Cache invalidation strategies
 */
export interface ICacheInvalidation {
  /**
   * Invalidate all cache entries matching a pattern
   */
  invalidatePattern(pattern: string): Promise<void>

  /**
   * Invalidate cache for specific media
   */
  invalidateMedia(mediaId: string): Promise<void>

  /**
   * Invalidate cache for specific catalog
   */
  invalidateCatalog(catalogId: string): Promise<void>

  /**
   * Invalidate all user-specific cache
   */
  invalidateUser(userId: string): Promise<void>

  /**
   * Invalidate all cache (nuclear option)
   */
  invalidateAll(): Promise<void>

  /**
   * Clean up expired cache entries
   */
  cleanup(): Promise<void>
}

/**
 * Cache service interface for media, catalog, and user data caching
 * Provides high-level caching operations with TTL and invalidation support
 */
export interface ICacheService extends ICacheInvalidation {
  /**
   * Cache key generator
   */
  readonly keys: ICacheKeyGenerator

  /**
   * Store data in cache with specified TTL
   */
  set<T>(key: string, value: T, config?: Partial<ICacheConfig>): Promise<void>

  /**
   * Retrieve data from cache
   */
  get<T>(key: string): Promise<T | null>

  /**
   * Check if cache key exists and is not expired
   */
  has(key: string): Promise<boolean>

  /**
   * Remove specific cache entry
   */
  delete(key: string): Promise<void>

  /**
   * Get cache statistics
   */
  getStats(): Promise<{
    totalKeys: number
    totalSize: number
    hitRate: number
    missRate: number
  }>

  /**
   * Cache media metadata with appropriate TTL
   */
  cacheMedia<T>(mediaId: string, data: T, providerId?: string): Promise<void>

  /**
   * Get cached media metadata
   */
  getMedia<T>(mediaId: string, providerId?: string): Promise<T | null>

  /**
   * Cache catalog data with pagination support
   */
  cacheCatalog<T>(
    catalogId: string,
    data: T,
    page?: number,
    filters?: Record<string, unknown>
  ): Promise<void>

  /**
   * Get cached catalog data
   */
  getCatalog<T>(
    catalogId: string,
    page?: number,
    filters?: Record<string, unknown>
  ): Promise<T | null>

  /**
   * Cache continue watching data for user
   */
  cacheContinueWatching<T>(userId: string, data: T): Promise<void>

  /**
   * Get cached continue watching data
   */
  getContinueWatching<T>(userId: string): Promise<T | null>

  /**
   * Cache search results with query and filters
   */
  cacheSearch<T>(
    query: string,
    data: T,
    type?: string,
    filters?: Record<string, unknown>
  ): Promise<void>

  /**
   * Get cached search results
   */
  getSearch<T>(
    query: string,
    type?: string,
    filters?: Record<string, unknown>
  ): Promise<T | null>

  /**
   * Cache user preferences
   */
  cacheUserPreferences<T>(userId: string, preferences: T): Promise<void>

  /**
   * Get cached user preferences
   */
  getUserPreferences<T>(userId: string): Promise<T | null>

  /**
   * Cache provider-specific data
   */
  cacheProviderData<T>(providerId: string, dataType: string, data: T): Promise<void>

  /**
   * Get cached provider-specific data
   */
  getProviderData<T>(providerId: string, dataType: string): Promise<T | null>
}

/**
 * Default cache configurations for different data types
 */
export const DEFAULT_CACHE_CONFIGS: Record<string, ICacheConfig> = {
  media: {
    ttl: 30 * 60 * 1000, // 30 minutes
    refreshInBackground: true,
    maxItems: 1000,
    persistent: true,
  },
  catalog: {
    ttl: 15 * 60 * 1000, // 15 minutes
    refreshInBackground: true,
    maxItems: 500,
    persistent: true,
  },
  continueWatching: {
    ttl: 5 * 60 * 1000, // 5 minutes
    refreshInBackground: false,
    maxItems: 50,
    persistent: true,
  },
  search: {
    ttl: 10 * 60 * 1000, // 10 minutes
    refreshInBackground: false,
    maxItems: 200,
    persistent: false,
  },
  userPreferences: {
    ttl: 60 * 60 * 1000, // 1 hour
    refreshInBackground: false,
    maxItems: 10,
    persistent: true,
  },
  provider: {
    ttl: 20 * 60 * 1000, // 20 minutes
    refreshInBackground: true,
    maxItems: 100,
    persistent: true,
  },
}