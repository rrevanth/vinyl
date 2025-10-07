import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { TraktDetailCache } from './cache/TraktDetailCache'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

/**
 * Central registry for Trakt capability implementations
 *
 * Registers and manages all Trakt capabilities with proper dependencies.
 * Some capabilities are only available when user is authenticated (auth-gated).
 *
 * Capabilities will be implemented by other agents:
 * - Media capabilities (metadata, search, recommendations, etc.)
 * - Auth-gated capabilities (watchlist, scrobbling, continue watching, etc.)
 * - People capabilities (filmography, metadata, search, etc.)
 * - List capabilities (media lists, list search)
 */
export class TraktCapabilityRegistry {
  private readonly capabilities = new Map<CapabilityType, any>()
  private isInitialized = false

  constructor(
    private readonly cache: TraktDetailCache,
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      const isAuthenticated = this.traktClient.isAuthenticated()

      // NOTE: Capability implementations will be added by other agents
      // This registry structure follows the TMDB pattern

      // TODO: Register MEDIA_METADATA capability (cache-based)
      // TODO: Register MEDIA_SEARCH capability (fresh data)
      // TODO: Register MEDIA_CATALOG capability (fresh data)
      // TODO: Register MEDIA_RECOMMENDATIONS capability (fresh data)
      // TODO: Register MEDIA_IMAGES capability (cache-based)
      // TODO: Register MEDIA_VIDEOS capability (cache-based)
      // TODO: Register MEDIA_SEASONS capability (mixed cache + fresh)
      // TODO: Register MEDIA_EXTERNAL_IDS capability (cache-based)
      // TODO: Register MEDIA_RATINGS capability (fresh data)
      // TODO: Register MEDIA_REVIEWS capability (fresh data)
      // TODO: Register MEDIA_PEOPLE capability (cache-based)
      // TODO: Register MEDIA_LISTS capability (fresh data)
      // TODO: Register MEDIA_LISTS_SEARCH capability (fresh data)

      // TODO: Register PEOPLE_METADATA capability (fresh data)
      // TODO: Register PEOPLE_SEARCH capability (fresh data)
      // TODO: Register PEOPLE_FILMOGRAPHY capability (cache-based)
      // TODO: Register PEOPLE_IMAGES capability (cache-based)
      // TODO: Register PEOPLE_EXTERNAL_IDS capability (cache-based)
      // TODO: Register PEOPLE_CATALOGS capability (fresh data)

      // Auth-gated capabilities (only register if authenticated)
      if (isAuthenticated) {
        // TODO: Register MEDIA_WATCHLIST capability (requires auth)
        // TODO: Register MEDIA_SCROBBLING capability (requires auth)
        // TODO: Register MEDIA_CONTINUE_WATCHING capability (requires auth)
        // TODO: Register MEDIA_WATCH_PROGRESS capability (requires auth)

        this.logger.debug('Registered auth-gated Trakt capabilities', {
          count: this.capabilities.size,
        })
      }

      this.isInitialized = true
      this.logger.info(
        `TraktCapabilityRegistry initialized with ${this.capabilities.size} capabilities`,
        {
          capabilities: Array.from(this.capabilities.keys()),
          authenticated: isAuthenticated,
        }
      )
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to initialize TraktCapabilityRegistry', err)
      throw err
    }
  }

  async shutdown(): Promise<void> {
    this.capabilities.clear()
    this.isInitialized = false
    this.logger.debug('TraktCapabilityRegistry shutdown')
  }

  /**
   * Execute a capability method dynamically
   * Used by provider to route requests to appropriate capability implementations
   */
  async execute<T>(capability: CapabilityType, method: string, request: any): Promise<T> {
    if (!this.isInitialized) {
      throw new Error('TraktCapabilityRegistry not initialized')
    }

    const capabilityImpl = this.capabilities.get(capability)
    if (!capabilityImpl) {
      throw new Error(`Capability ${capability} not registered in Trakt provider`)
    }

    if (typeof capabilityImpl[method] !== 'function') {
      throw new Error(`Method ${method} not found on capability ${capability}`)
    }

    try {
      const result = await capabilityImpl[method](request)
      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to execute Trakt capability ${capability}.${method}`, err)
      throw err
    }
  }

  /**
   * Get capability implementation directly
   * Used by provider to access capability methods
   */
  getCapability<T>(capability: CapabilityType): T | null {
    return this.capabilities.get(capability) || null
  }

  /**
   * Check if a capability is registered
   * Useful for checking auth-gated capabilities
   */
  hasCapability(capability: CapabilityType): boolean {
    return this.capabilities.has(capability)
  }

  /**
   * Get all registered capability types
   */
  getRegisteredCapabilities(): CapabilityType[] {
    return Array.from(this.capabilities.keys())
  }

  /**
   * Re-register capabilities after authentication state changes
   * This is called when user logs in/out to add/remove auth-gated capabilities
   */
  async reregisterCapabilities(): Promise<void> {
    this.logger.debug('Re-registering Trakt capabilities due to auth state change')
    this.isInitialized = false
    await this.initialize()
  }

  /**
   * Get health status of capability registry
   */
  async getHealthStatus(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy'
    details: Record<string, any>
  }> {
    try {
      if (!this.isInitialized) {
        return {
          status: 'unhealthy',
          details: { error: 'Registry not initialized' },
        }
      }

      return {
        status: 'healthy',
        details: {
          registeredCapabilities: this.capabilities.size,
          authenticated: this.traktClient.isAuthenticated(),
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
}