import type { QueryClient } from '@tanstack/react-query'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { FanartClient } from '@/src/infrastructure/api/fanart/FanartClient'
import type {
  FanartMovieImages,
  FanartShowImages,
} from '@/src/infrastructure/api/fanart/types/FanartTypes'
import { GenericAPICache, type CacheStrategy } from '@/src/infrastructure/cache/GenericAPICache'

/**
 * Fanart.tv API Cache Wrapper
 *
 * Wraps Fanart.tv API methods with intelligent caching strategies using TanStack Query.
 *
 * Cache Strategies:
 * - Movie images: media-details (1 hour stale, 4 hours gc)
 * - TV show images: media-details (1 hour stale, 4 hours gc)
 *
 * Features:
 * - Type-safe API with proper TypeScript interfaces
 * - Automatic request deduplication
 * - Configurable cache expiration per endpoint type
 * - Retry logic with exponential backoff
 * - Memory efficient with automatic cleanup
 */
export class FanartAPICache {
  private readonly cache: GenericAPICache

  constructor(
    queryClient: QueryClient,
    logger: ILoggingService,
    private readonly fanartClient: FanartClient
  ) {
    this.cache = new GenericAPICache(queryClient, logger)
  }

  /**
   * Get movie images by TMDB ID or IMDb ID with caching
   *
   * Cache: 1 hour stale time, 4 hours gc time
   *
   * @param id - TMDB ID (number) or IMDb ID (string starting with 'tt')
   * @returns Movie images from Fanart.tv
   */
  async getMovieImages(id: string | number): Promise<FanartMovieImages> {
    return this.cache.fetchWithStrategy(
      ['fanart', 'movie', 'images', String(id)],
      () => this.fanartClient.getMovieImages(id),
      'media-details'
    )
  }

  /**
   * Get TV show images by TheTVDB ID with caching
   *
   * Cache: 1 hour stale time, 4 hours gc time
   *
   * @param id - TheTVDB ID
   * @returns TV show images from Fanart.tv
   */
  async getShowImages(id: string | number): Promise<FanartShowImages> {
    return this.cache.fetchWithStrategy(
      ['fanart', 'tv', 'images', String(id)],
      () => this.fanartClient.getShowImages(id),
      'media-details'
    )
  }

  /**
   * Prefetch movie images for optimistic loading
   *
   * @param id - TMDB ID (number) or IMDb ID (string starting with 'tt')
   */
  async prefetchMovieImages(id: string | number): Promise<void> {
    await this.cache.prefetchWithStrategy(
      ['fanart', 'movie', 'images', String(id)],
      () => this.fanartClient.getMovieImages(id),
      'media-details'
    )
  }

  /**
   * Prefetch TV show images for optimistic loading
   *
   * @param id - TheTVDB ID
   */
  async prefetchShowImages(id: string | number): Promise<void> {
    await this.cache.prefetchWithStrategy(
      ['fanart', 'tv', 'images', String(id)],
      () => this.fanartClient.getShowImages(id),
      'media-details'
    )
  }

  /**
   * Invalidate movie images cache for a specific ID
   *
   * @param id - TMDB ID (number) or IMDb ID (string starting with 'tt')
   */
  async invalidateMovieImages(id: string | number): Promise<void> {
    await this.cache.invalidate(['fanart', 'movie', 'images', String(id)], true)
  }

  /**
   * Invalidate TV show images cache for a specific ID
   *
   * @param id - TheTVDB ID
   */
  async invalidateShowImages(id: string | number): Promise<void> {
    await this.cache.invalidate(['fanart', 'tv', 'images', String(id)], true)
  }

  /**
   * Attempt to get value from cache without making a network request
   *
   * @param cacheKey - Cache key array for identification
   * @returns Cached value if found and not expired, null otherwise
   */
  async tryGetFromCache<T>(cacheKey: unknown[]): Promise<T | null> {
    const authAwareKey = [...cacheKey, 'authenticated']
    const cachedData = this.cache['queryClient'].getQueryData<T>(authAwareKey)
    return cachedData ?? null
  }

  /**
   * Set value in cache with the given strategy
   *
   * @param cacheKey - Cache key array for identification
   * @param value - Value to cache
   * @param _strategy - Cache strategy (unused, for future use)
   */
  async setInCache<T>(cacheKey: unknown[], value: T, _strategy: CacheStrategy): Promise<void> {
    const authAwareKey = [...cacheKey, 'authenticated']
    this.cache['queryClient'].setQueryData(authAwareKey, value, {
      updatedAt: Date.now(),
    })
  }

  /**
   * Invalidate all Fanart.tv caches
   */
  async invalidateAll(): Promise<void> {
    await this.cache.invalidate(['fanart'], false)
  }

  /**
   * Get preview URL for an image (smaller version)
   * Replaces 'fanart' with 'preview' in the URL
   *
   * This is a utility method that doesn't require caching
   *
   * @param originalUrl - Original Fanart.tv image URL
   * @returns Preview URL with smaller image
   */
  getPreviewUrl(originalUrl: string): string {
    return this.fanartClient.getPreviewUrl(originalUrl)
  }
}
