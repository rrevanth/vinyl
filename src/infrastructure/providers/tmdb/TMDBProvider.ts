import type { IProvider } from '../../../domain/providers/IProvider'
import type { TMDBClient } from '../../api/tmdb/TMDBClient'
import type { ILoggingService } from '../../../domain/services/ILoggingService'
import { CapabilityType } from '../../../domain/capabilities/CapabilityType'
import { ProviderMetadata } from '../../../domain/providers/ProviderMetadata'
import { TMDBDetailCache } from './cache/TMDBDetailCache'
import { TMDBCapabilityRegistry } from './TMDBCapabilityRegistry'
import type { QueryClient } from '@tanstack/react-query'

/**
 * TMDB Provider implementation with multi-level TanStack Query caching
 *
 * Features:
 * - 11 supported capabilities for comprehensive movie/TV data
 * - Smart caching with extended API responses
 * - Multi-level cache coordination (provider + domain levels)
 * - Background data refresh and invalidation
 * - User-controlled cache management
 */
export class TMDBProvider implements IProvider {
  readonly id = 'tmdb'
  readonly name = 'The Movie Database'
  readonly version = '1.0.0'
  readonly metadata: ProviderMetadata

  readonly capabilities = new Set([
    CapabilityType.MEDIA_CATALOG,
    CapabilityType.MEDIA_METADATA,
    CapabilityType.MEDIA_SEARCH,
    CapabilityType.MEDIA_RECOMMENDATIONS,
    CapabilityType.MEDIA_VIDEOS,
    CapabilityType.MEDIA_SEASONS,
    CapabilityType.MEDIA_EXTERNAL_IDS,
    CapabilityType.MEDIA_IMAGES,
    CapabilityType.MEDIA_RATINGS,
    CapabilityType.MEDIA_REVIEWS,
    CapabilityType.MEDIA_PEOPLE,
  ])

  private readonly cache: TMDBDetailCache
  private readonly capabilityRegistry: TMDBCapabilityRegistry
  private isInitialized = false

  constructor(
    private readonly tmdbClient: TMDBClient,
    private readonly queryClient: QueryClient,
    private readonly logger: ILoggingService
  ) {
    this.metadata = new ProviderMetadata({
      id: this.id,
      name: this.name,
      version: this.version,
      type: 'tmdb',
      description: 'Official TMDB provider for movies and TV shows with comprehensive metadata',
      capabilities: Array.from(this.capabilities),
    })

    // Initialize cache and capability registry
    this.cache = new TMDBDetailCache(tmdbClient, queryClient, logger)
    this.capabilityRegistry = new TMDBCapabilityRegistry(this.cache, tmdbClient, logger)
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Test TMDB connection and configuration
      const connectionTest = await this.tmdbClient.testConnection()
      if (!connectionTest.success) {
        throw new Error(`TMDB connection failed: ${connectionTest.error}`)
      }

      // Initialize cache layer
      await this.cache.initialize()

      // Initialize capability registry
      await this.capabilityRegistry.initialize()

      this.isInitialized = true
      this.logger.info('TMDBProvider initialized successfully', {
        capabilities: this.capabilities.size,
        config: connectionTest.config,
      })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to initialize TMDBProvider', err)
      throw err
    }
  }

  async shutdown(): Promise<void> {
    if (!this.isInitialized) return

    try {
      await this.capabilityRegistry.shutdown()
      await this.cache.shutdown()
      this.tmdbClient.destroy()

      this.isInitialized = false
      this.logger.info('TMDBProvider shutdown successfully')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to shutdown TMDBProvider', err)
      throw err
    }
  }

  hasCapability(capability: CapabilityType): boolean {
    return this.capabilities.has(capability)
  }

  async executeCapability<T>(capability: CapabilityType, method: string, request: any): Promise<T> {
    if (!this.isInitialized) {
      throw new Error('TMDBProvider not initialized')
    }

    if (!this.hasCapability(capability)) {
      throw new Error(`TMDBProvider does not support capability: ${capability}`)
    }

    return this.capabilityRegistry.execute<T>(capability, method, request)
  }

  async getHealthStatus(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy'
    details: Record<string, any>
  }> {
    try {
      if (!this.isInitialized) {
        return {
          status: 'unhealthy',
          details: { error: 'Provider not initialized' },
        }
      }

      // Test TMDB connection
      const connectionTest = await this.tmdbClient.testConnection()
      if (!connectionTest.success) {
        return {
          status: 'degraded',
          details: {
            error: connectionTest.error,
            tmdbConfig: connectionTest.config,
          },
        }
      }

      // Get cache stats and capability health
      const cacheStats = this.cache.getCacheStats()
      const capabilityHealth = await this.capabilityRegistry.getHealthStatus()

      return {
        status: capabilityHealth.status,
        details: {
          tmdbConnection: 'healthy',
          cache: cacheStats,
          capabilities: capabilityHealth.details,
          config: connectionTest.config,
        },
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        details: {
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }
    }
  }

  // ===== CACHE MANAGEMENT FOR USER CONTROL =====

  /**
   * Clear all TMDB cache (both provider and domain levels)
   */
  async clearCache(): Promise<void> {
    await this.cache.clearAllTMDBCache()
    this.logger.info('User cleared TMDB cache')
  }

  /**
   * Get cache statistics for user information
   */
  getCacheStats(): {
    movies: number
    tv: number
    people: number
    totalSize: number
  } {
    return this.cache.getCacheStats()
  }

  /**
   * Invalidate specific cache type
   */
  async invalidateCache(type?: 'movies' | 'tv' | 'people'): Promise<void> {
    if (type === 'movies') {
      await this.cache.invalidateMovieCache()
    } else if (type === 'tv') {
      await this.cache.invalidateTVCache()
    } else if (type === 'people') {
      await this.cache.invalidatePersonCache()
    } else {
      await this.cache.clearAllTMDBCache()
    }
  }

  /**
   * Prefetch popular content for better performance
   */
  async prefetchPopularContent(): Promise<void> {
    try {
      // Prefetch some popular movies and TV shows
      // This runs in background and doesn't block user interactions
      this.logger.debug('Starting background prefetch of popular content')

      // TODO: Implement prefetching of popular content
      // await this.cache.prefetchMovieDetails(popularMovieIds)
      // await this.cache.prefetchTVDetails(popularTVIds)
    } catch (error) {
      // Don't throw - this is background prefetching
      this.logger.error('Failed to prefetch popular content', error as Error)
    }
  }
}
