import type { IProvider } from '../../../domain/providers/IProvider'
import type { TMDBClient } from '../../api/tmdb/TMDBClient'
import type { ILoggingService } from '../../../domain/services/ILoggingService'
import { CapabilityType } from '../../../domain/capabilities/CapabilityType'
import type { ProviderMetadata } from '../../../domain/providers/ProviderMetadata'
import { ProviderStatus } from '../../../domain/providers/ProviderStatus'
import { TMDBDetailCache } from './cache/TMDBDetailCache'
import { TMDBCapabilityRegistry } from './TMDBCapabilityRegistry'
import type { QueryClient } from '@tanstack/react-query'

/**
 * TMDB Provider implementation with multi-level TanStack Query caching
 */
export class TMDBProvider implements IProvider {
  readonly metadata: ProviderMetadata

  private readonly cache: TMDBDetailCache
  private readonly capabilityRegistry: TMDBCapabilityRegistry
  private isInitialized = false

  constructor(
    private readonly tmdbClient: TMDBClient,
    private readonly queryClient: QueryClient,
    private readonly logger: ILoggingService
  ) {
    // Create proper metadata object
    this.metadata = {
      id: 'tmdb',
      name: 'The Movie Database',
      version: '1.0.0',
      description: 'Official TMDB provider for movies and TV shows with comprehensive metadata',
      sourceInfo: {
        type: 'tmdb',
        baseUrl: 'https://api.themoviedb.org/3',
        apiVersion: '3',
      },
      status: ProviderStatus.INITIALIZING,
      health: {
        status: ProviderStatus.INITIALIZING,
        lastChecked: new Date(),
        errorCount: 0,
      },
      configurable: true,
      requiresAuth: true,
      installedAt: new Date(),
    }

    // Initialize cache and capability registry
    this.cache = new TMDBDetailCache(tmdbClient, queryClient, logger)
    this.capabilityRegistry = new TMDBCapabilityRegistry(this.cache, tmdbClient, logger)
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      const connectionTest = await this.tmdbClient.testConnection()
      if (!connectionTest.success) {
        throw new Error(`TMDB connection failed: ${connectionTest.error}`)
      }

      await this.cache.initialize()
      await this.capabilityRegistry.initialize()

      this.metadata.status = ProviderStatus.ENABLED
      this.metadata.health = {
        status: ProviderStatus.ENABLED,
        lastChecked: new Date(),
        errorCount: 0,
      }

      this.isInitialized = true
      this.logger.info('TMDBProvider initialized successfully')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))

      this.metadata.status = ProviderStatus.ERROR
      this.metadata.health = {
        status: ProviderStatus.ERROR,
        lastChecked: new Date(),
        errorCount: this.metadata.health.errorCount + 1,
        lastError: err.message,
      }

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

      this.metadata.status = ProviderStatus.DISABLED
      this.isInitialized = false
      this.logger.info('TMDBProvider shutdown successfully')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to shutdown TMDBProvider', err)
      throw err
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.isInitialized) return false

      const connectionTest = await this.tmdbClient.testConnection()
      const isHealthy = connectionTest.success

      this.metadata.health = {
        status: isHealthy ? ProviderStatus.ENABLED : ProviderStatus.ERROR,
        lastChecked: new Date(),
        errorCount: isHealthy ? 0 : this.metadata.health.errorCount + 1,
        lastError: isHealthy ? undefined : connectionTest.error,
      }

      return isHealthy
    } catch (error) {
      this.metadata.health = {
        status: ProviderStatus.ERROR,
        lastChecked: new Date(),
        errorCount: this.metadata.health.errorCount + 1,
        lastError: error instanceof Error ? error.message : 'Unknown error',
      }
      return false
    }
  }

  getCapability<T>(capability: CapabilityType): T | null {
    return this.capabilityRegistry.getCapability<T>(capability)
  }

  // ===== ADDITIONAL METHODS FOR USER CONTROL =====

  async clearCache(): Promise<void> {
    await this.cache.clearAllTMDBCache()
    this.logger.info('User cleared TMDB cache')
  }

  getCacheStats(): {
    movies: number
    tv: number
    people: number
    totalSize: number
  } {
    return this.cache.getCacheStats()
  }
}
