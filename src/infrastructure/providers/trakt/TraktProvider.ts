import type { IProvider } from '@/src/domain/providers/IProvider'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { ProviderMetadata } from '@/src/domain/providers/ProviderMetadata'
import { ProviderStatus } from '@/src/domain/providers/ProviderStatus'
import { TraktDetailCache } from './cache/TraktDetailCache'
import { TraktCapabilityRegistry } from './TraktCapabilityRegistry'
import type { QueryClient } from '@tanstack/react-query'

/**
 * Trakt Provider implementation with multi-level TanStack Query caching
 *
 * Key features:
 * - OAuth 2.0 authentication support (optional)
 * - Auth-gated capabilities (watchlist, scrobbling, etc.)
 * - Public capabilities available without authentication
 * - Multi-level caching with TanStack Query
 * - Automatic cache invalidation on auth state changes
 * - Comprehensive metadata and user activity tracking
 */
export class TraktProvider implements IProvider {
  readonly metadata: ProviderMetadata

  private readonly cache: TraktDetailCache
  private readonly capabilityRegistry: TraktCapabilityRegistry
  private isInitialized = false

  constructor(
    private readonly traktClient: TraktClient,
    private readonly queryClient: QueryClient,
    private readonly logger: ILoggingService
  ) {
    // Create proper metadata object
    this.metadata = {
      id: 'trakt',
      name: 'Trakt',
      version: '1.0.0',
      description:
        'Trakt provider for movies and TV shows with user activity tracking, watchlists, and scrobbling',
      sourceInfo: {
        type: 'trakt',
        baseUrl: 'https://api.trakt.tv',
        apiVersion: '2',
      },
      status: ProviderStatus.INITIALIZING,
      health: {
        status: ProviderStatus.INITIALIZING,
        lastChecked: new Date(),
        errorCount: 0,
      },
      configurable: true,
      requiresAuth: false, // Auth is optional - public features work without it
      installedAt: new Date(),
    }

    // Initialize cache and capability registry
    this.cache = new TraktDetailCache(traktClient, queryClient, logger)
    this.capabilityRegistry = new TraktCapabilityRegistry(this.cache, traktClient, logger)
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Trakt doesn't have a simple connection test endpoint like TMDB
      // We'll verify by checking if we can get configuration
      // For authenticated users, we'll validate the token
      if (this.traktClient.isAuthenticated()) {
        const authCheck = await this.traktClient.validateAuthentication()
        if (!authCheck) {
          this.logger.warn('Trakt authentication failed, continuing with public access')
        } else {
          this.logger.info('Trakt authenticated successfully', {
            username: authCheck.username,
          })
        }
      }

      await this.cache.initialize()
      await this.capabilityRegistry.initialize()

      this.metadata.status = ProviderStatus.READY
      this.metadata.health = {
        status: ProviderStatus.READY,
        lastChecked: new Date(),
        errorCount: 0,
      }

      this.isInitialized = true
      this.logger.info('TraktProvider initialized successfully', {
        authenticated: this.traktClient.isAuthenticated(),
        capabilities: this.capabilityRegistry.getRegisteredCapabilities().length,
      })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))

      this.metadata.status = ProviderStatus.ERROR
      this.metadata.health = {
        status: ProviderStatus.ERROR,
        lastChecked: new Date(),
        errorCount: this.metadata.health.errorCount + 1,
        lastError: err.message,
      }

      this.logger.error('Failed to initialize TraktProvider', err)
      throw err
    }
  }

  async shutdown(): Promise<void> {
    if (!this.isInitialized) return

    try {
      await this.capabilityRegistry.shutdown()
      await this.cache.shutdown()
      this.traktClient.destroy()

      this.metadata.status = ProviderStatus.INITIALIZING
      this.isInitialized = false
      this.logger.info('TraktProvider shutdown successfully')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to shutdown TraktProvider', err)
      throw err
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.isInitialized) return false

      // Basic health check - verify we can make a request
      // Use a lightweight endpoint that doesn't require auth
      try {
        // Try to get trending movies as a basic connectivity test
        await this.traktClient.movies.getTrending({ limit: 1 })
        const isHealthy = true

        this.metadata.health = {
          status: isHealthy ? ProviderStatus.READY : ProviderStatus.ERROR,
          lastChecked: new Date(),
          errorCount: isHealthy ? 0 : this.metadata.health.errorCount + 1,
          lastError: isHealthy ? undefined : 'Connection test failed',
        }

        return isHealthy
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error))
        this.metadata.health = {
          status: ProviderStatus.ERROR,
          lastChecked: new Date(),
          errorCount: this.metadata.health.errorCount + 1,
          lastError: err.message,
        }
        return false
      }
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

  getSupportedCapabilities(): CapabilityType[] {
    // Iterate through all capability types and check which ones are supported
    return Object.values(CapabilityType).filter(
      (capability) => this.capabilityRegistry.getCapability(capability) !== null
    )
  }

  // ===== AUTHENTICATION MANAGEMENT =====

  /**
   * Check if provider is authenticated
   */
  isAuthenticated(): boolean {
    return this.traktClient.isAuthenticated()
  }

  /**
   * Handle authentication state change
   * Called when user logs in or out
   * Re-registers capabilities to add/remove auth-gated features
   */
  async onAuthenticationChanged(): Promise<void> {
    try {
      this.logger.info('Trakt authentication state changed, re-registering capabilities', {
        authenticated: this.traktClient.isAuthenticated(),
      })

      // Invalidate all authenticated caches when logging out
      if (!this.traktClient.isAuthenticated()) {
        await this.cache.invalidateAuthenticatedCaches()
      }

      // Re-register capabilities to add/remove auth-gated features
      await this.capabilityRegistry.reregisterCapabilities()

      this.logger.info('Trakt capabilities re-registered after auth change')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to handle Trakt authentication change', err)
      throw err
    }
  }

  // ===== USER CONTROL METHODS =====

  /**
   * Clear all Trakt cache (both authenticated and public)
   */
  async clearCache(): Promise<void> {
    await this.cache.clearAllTraktCache()
    this.logger.info('User cleared Trakt cache')
  }

  /**
   * Clear only authenticated caches
   * Useful when switching accounts
   */
  async clearAuthenticatedCache(): Promise<void> {
    await this.cache.invalidateAuthenticatedCaches()
    this.logger.info('User cleared authenticated Trakt cache')
  }

  /**
   * Get cache statistics for user visibility
   */
  getCacheStats(): {
    movies: number
    shows: number
    people: number
    totalSize: number
  } {
    return this.cache.getCacheStats()
  }

  /**
   * Get detailed cache inspection data
   * Includes provider-level and domain-level cache counts
   */
  async inspectCache(): Promise<{
    providerLevel: number
    domainLevel: number
    totalQueries: number
    authQueries: number
    publicQueries: number
  }> {
    return this.cache.inspectCache()
  }

  /**
   * Check if a specific capability is available
   * Useful for UI to show/hide features based on auth state
   */
  hasCapability(capability: CapabilityType): boolean {
    return this.capabilityRegistry.hasCapability(capability)
  }

  /**
   * Get list of all available capabilities
   */
  getAvailableCapabilities(): CapabilityType[] {
    return this.capabilityRegistry.getRegisteredCapabilities()
  }
}