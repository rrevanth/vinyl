import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { TraktDetailCache } from './cache/TraktDetailCache'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

// Import all capability implementations
import { TraktMediaMetadataCapability } from './capabilities/TraktMediaMetadataCapability'
import { TraktMediaSearchCapability } from './capabilities/TraktMediaSearchCapability'
import { TraktMediaCatalogCapability } from './capabilities/TraktMediaCatalogCapability'
import { TraktMediaRecommendationsCapability } from './capabilities/TraktMediaRecommendationsCapability'
import { TraktMediaImagesCapability } from './capabilities/TraktMediaImagesCapability'
import { TraktMediaVideosCapability } from './capabilities/TraktMediaVideosCapability'
import { TraktMediaSeasonsCapability } from './capabilities/TraktMediaSeasonsCapability'
import { TraktMediaExternalIdsCapability } from './capabilities/TraktMediaExternalIdsCapability'
import { TraktMediaRatingsCapability } from './capabilities/TraktMediaRatingsCapability'
import { TraktMediaReviewsCapability } from './capabilities/TraktMediaReviewsCapability'
import { TraktMediaPeopleCapability } from './capabilities/TraktMediaPeopleCapability'
import { TraktMediaListsCapability } from './capabilities/TraktMediaListsCapability'
import { TraktMediaListsSearchCapability } from './capabilities/TraktMediaListsSearchCapability'
import { TraktPeopleMetadataCapability } from './capabilities/TraktPeopleMetadataCapability'
import { TraktPeopleSearchCapability } from './capabilities/TraktPeopleSearchCapability'
import { TraktPeopleFilmographyCapability } from './capabilities/TraktPeopleFilmographyCapability'
import { TraktPeopleImagesCapability } from './capabilities/TraktPeopleImagesCapability'
import { TraktPeopleExternalIdsCapability } from './capabilities/TraktPeopleExternalIdsCapability'
import { TraktPeopleCatalogsCapability } from './capabilities/TraktPeopleCatalogsCapability'
import { TraktMediaWatchlistCapability } from './capabilities/TraktMediaWatchlistCapability'
import { TraktMediaScrobblingCapability } from './capabilities/TraktMediaScrobblingCapability'
import { TraktMediaContinueWatchingCapability } from './capabilities/TraktMediaContinueWatchingCapability'
import { TraktMediaWatchProgressCapability } from './capabilities/TraktMediaWatchProgressCapability'

/**
 * Central registry for Trakt capability implementations
 *
 * Registers and manages all Trakt capabilities with proper dependencies.
 * Some capabilities are only available when user is authenticated (auth-gated).
 *
 * Registered Capabilities:
 * - Media capabilities: metadata, search, catalog, recommendations, images, videos, seasons, external IDs, ratings, reviews, people, lists
 * - People capabilities: metadata, search, filmography, images, external IDs, catalogs
 * - Auth-gated capabilities: watchlist, scrobbling, continue watching, watch progress (only when authenticated)
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

      // Register core metadata capability (primary cache source)
      this.capabilities.set(
        CapabilityType.MEDIA_METADATA,
        new TraktMediaMetadataCapability(this.cache, this.logger)
      )

      // Register search capability (fresh data)
      this.capabilities.set(
        CapabilityType.MEDIA_SEARCH,
        new TraktMediaSearchCapability(this.traktClient, this.logger)
      )

      // Register catalog capability (fresh data) - CRITICAL for homescreen
      this.capabilities.set(
        CapabilityType.MEDIA_CATALOG,
        new TraktMediaCatalogCapability(this.traktClient, this.logger)
      )

      // Register recommendations capability (fresh data)
      this.capabilities.set(
        CapabilityType.MEDIA_RECOMMENDATIONS,
        new TraktMediaRecommendationsCapability(this.traktClient, this.logger)
      )

      // Register media content capabilities (use cached data)
      this.capabilities.set(
        CapabilityType.MEDIA_IMAGES,
        new TraktMediaImagesCapability(this.cache, this.logger)
      )

      this.capabilities.set(
        CapabilityType.MEDIA_VIDEOS,
        new TraktMediaVideosCapability(this.traktClient, this.logger)
      )

      // Register season/episode capability (fresh data)
      this.capabilities.set(
        CapabilityType.MEDIA_SEASONS,
        new TraktMediaSeasonsCapability(this.traktClient, this.logger)
      )

      // Register external IDs capability (cache + client)
      this.capabilities.set(
        CapabilityType.MEDIA_EXTERNAL_IDS,
        new TraktMediaExternalIdsCapability(this.cache, this.traktClient, this.logger)
      )

      // Register ratings capability (fresh data)
      this.capabilities.set(
        CapabilityType.MEDIA_RATINGS,
        new TraktMediaRatingsCapability(this.traktClient, this.logger)
      )

      // Register reviews capability (fresh data)
      this.capabilities.set(
        CapabilityType.MEDIA_REVIEWS,
        new TraktMediaReviewsCapability(this.traktClient, this.logger)
      )

      // Register media people capability (client-based)
      this.capabilities.set(
        CapabilityType.MEDIA_PEOPLE,
        new TraktMediaPeopleCapability(this.traktClient, this.logger)
      )

      // Register media lists capability (fresh data)
      this.capabilities.set(
        CapabilityType.MEDIA_LISTS,
        new TraktMediaListsCapability(this.traktClient, this.logger)
      )

      // Register media lists search capability (fresh data)
      this.capabilities.set(
        CapabilityType.MEDIA_LISTS_SEARCH,
        new TraktMediaListsSearchCapability(this.traktClient, this.logger)
      )

      // Register people metadata capability (cache-based)
      this.capabilities.set(
        CapabilityType.PEOPLE_METADATA,
        new TraktPeopleMetadataCapability(this.cache, this.logger)
      )

      // Register people search capability (fresh data)
      this.capabilities.set(
        CapabilityType.PEOPLE_SEARCH,
        new TraktPeopleSearchCapability(this.traktClient, this.logger)
      )

      // Register people filmography capability (client-based)
      this.capabilities.set(
        CapabilityType.PEOPLE_FILMOGRAPHY,
        new TraktPeopleFilmographyCapability(this.traktClient, this.logger)
      )

      // Register people images capability (cache-based)
      this.capabilities.set(
        CapabilityType.PEOPLE_IMAGES,
        new TraktPeopleImagesCapability(this.cache, this.logger)
      )

      // Register people external IDs capability (cache + client)
      this.capabilities.set(
        CapabilityType.PEOPLE_EXTERNAL_IDS,
        new TraktPeopleExternalIdsCapability(this.cache, this.traktClient, this.logger)
      )

      // Register people catalogs capability (logger only)
      this.capabilities.set(
        CapabilityType.PEOPLE_CATALOGS,
        new TraktPeopleCatalogsCapability(this.logger)
      )

      // Auth-gated capabilities (only register if authenticated)
      if (isAuthenticated) {
        // Register watchlist capability (requires auth)
        this.capabilities.set(
          CapabilityType.MEDIA_WATCHLIST,
          new TraktMediaWatchlistCapability(this.traktClient, this.logger)
        )

        // Register scrobbling capability (requires auth)
        this.capabilities.set(
          CapabilityType.MEDIA_SCROBBLING,
          new TraktMediaScrobblingCapability(this.traktClient, this.logger)
        )

        // Register continue watching capability (requires auth)
        this.capabilities.set(
          CapabilityType.MEDIA_CONTINUE_WATCHING,
          new TraktMediaContinueWatchingCapability(this.traktClient, this.logger)
        )

        // Register watch progress capability (requires auth)
        this.capabilities.set(
          CapabilityType.MEDIA_WATCH_PROGRESS,
          new TraktMediaWatchProgressCapability(this.traktClient, this.logger)
        )

        // this.logger.debug('Registered auth-gated Trakt capabilities', {
        //   count: 4,
        // })
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