import { CapabilityType } from '../../../domain/capabilities/CapabilityType'
import type { TMDBDetailCache } from './cache/TMDBDetailCache'
import type { TMDBClient } from '../../api/tmdb/TMDBClient'
import type { ILoggingService } from '../../../domain/services/ILoggingService'

// Import all capability implementations
import { TMDBMediaMetadataCapability } from './capabilities/TMDBMediaMetadataCapability'
import { TMDBMediaSearchCapability } from './capabilities/TMDBMediaSearchCapability'
import { TMDBMediaImagesCapability } from './capabilities/TMDBMediaImagesCapability'
import { TMDBMediaVideosCapability } from './capabilities/TMDBMediaVideosCapability'
import { TMDBCatalogCapability } from './capabilities/TMDBCatalogCapability'
import { TMDBMediaSeasonsCapability } from './capabilities/TMDBMediaSeasonsCapability'
import { TMDBPeopleMetadataCapability } from './capabilities/TMDBPeopleMetadataCapability'
import { TMDBMediaRecommendationsCapability } from './capabilities/TMDBMediaRecommendationsCapability'
// Import new people capabilities
import { TMDBPeopleSearchCapability } from './capabilities/TMDBPeopleSearchCapability'
import { TMDBPeopleFilmographyCapability } from './capabilities/TMDBPeopleFilmographyCapability'
import { TMDBPeopleImagesCapability } from './capabilities/TMDBPeopleImagesCapability'
import { TMDBPeopleExternalIdsCapability } from './capabilities/TMDBPeopleExternalIdsCapability'
import { TMDBPeopleCatalogsCapability } from './capabilities/TMDBPeopleCatalogsCapability'
import { TMDBMediaPeopleCapability } from './capabilities/TMDBMediaPeopleCapability'
// Import media external IDs capability
import { TMDBMediaExternalIdsCapability } from './capabilities/TMDBMediaExternalIdsCapability'

/**
 * Central registry for TMDB capability implementations
 *
 * Registers and manages all TMDB capabilities with proper dependencies
 */
export class TMDBCapabilityRegistry {
  private readonly capabilities = new Map<CapabilityType, any>()
  private isInitialized = false

  constructor(
    private readonly cache: TMDBDetailCache,
    private readonly tmdbClient: TMDBClient,
    private readonly logger: ILoggingService
  ) {}

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Register core metadata capability (primary cache source)
      this.capabilities.set(
        CapabilityType.MEDIA_METADATA,
        new TMDBMediaMetadataCapability(this.cache, this.logger)
      )

      // Register search capability
      this.capabilities.set(
        CapabilityType.MEDIA_SEARCH,
        new TMDBMediaSearchCapability(this.tmdbClient, this.logger)
      )

      // Register media content capabilities (use cached data)
      this.capabilities.set(
        CapabilityType.MEDIA_IMAGES,
        new TMDBMediaImagesCapability(this.cache, this.logger)
      )

      this.capabilities.set(
        CapabilityType.MEDIA_VIDEOS,
        new TMDBMediaVideosCapability(this.cache, this.logger)
      )

      // Register catalog capability (fresh data)
      this.capabilities.set(
        CapabilityType.MEDIA_CATALOG,
        new TMDBCatalogCapability(this.tmdbClient, this.logger)
      )

      // Register season/episode capability (mixed cached + fresh data)
      this.capabilities.set(
        CapabilityType.MEDIA_SEASONS,
        new TMDBMediaSeasonsCapability(this.cache, this.tmdbClient, this.logger)
      )

      // Register people capability (fresh data)
      this.capabilities.set(
        CapabilityType.PEOPLE_METADATA,
        new TMDBPeopleMetadataCapability(this.tmdbClient, this.logger)
      )

      // Register people search capability (fresh data)
      this.capabilities.set(
        CapabilityType.PEOPLE_SEARCH,
        new TMDBPeopleSearchCapability(this.tmdbClient, this.logger)
      )

      // Register people filmography capability (uses cached data)
      this.capabilities.set(
        CapabilityType.PEOPLE_FILMOGRAPHY,
        new TMDBPeopleFilmographyCapability(this.cache, this.logger)
      )

      // Register people images capability (uses cached data)
      this.capabilities.set(
        CapabilityType.PEOPLE_IMAGES,
        new TMDBPeopleImagesCapability(this.cache, this.logger)
      )

      // Register people external IDs capability (uses cached + fresh data)
      this.capabilities.set(
        CapabilityType.PEOPLE_EXTERNAL_IDS,
        new TMDBPeopleExternalIdsCapability(this.cache, this.tmdbClient, this.logger)
      )

      // Register people catalogs capability (fresh data)
      this.capabilities.set(
        CapabilityType.PEOPLE_CATALOGS,
        new TMDBPeopleCatalogsCapability(this.tmdbClient, this.logger)
      )

      // Register media people capability (uses cached data)
      this.capabilities.set(
        CapabilityType.MEDIA_PEOPLE,
        new TMDBMediaPeopleCapability(this.cache, this.logger)
      )

      // Register recommendations capability (fresh data)
      this.capabilities.set(
        CapabilityType.MEDIA_RECOMMENDATIONS,
        new TMDBMediaRecommendationsCapability(this.tmdbClient, this.logger)
      )

      // Register media external IDs capability (fresh data)
      this.capabilities.set(
        CapabilityType.MEDIA_EXTERNAL_IDS,
        new TMDBMediaExternalIdsCapability(
          this.tmdbClient.search,
          this.tmdbClient.movies,
          this.tmdbClient.tv,
          this.logger
        )
      )

      this.isInitialized = true
      this.logger.info(
        `TMDBCapabilityRegistry initialized with ${this.capabilities.size} capabilities`,
        {
          capabilities: Array.from(this.capabilities.keys()),
        }
      )
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to initialize TMDBCapabilityRegistry', err)
      throw err
    }
  }

  async shutdown(): Promise<void> {
    this.capabilities.clear()
    this.isInitialized = false
    this.logger.debug('TMDBCapabilityRegistry shutdown')
  }

  async execute<T>(capability: CapabilityType, method: string, request: any): Promise<T> {
    if (!this.isInitialized) {
      throw new Error('TMDBCapabilityRegistry not initialized')
    }

    const capabilityImpl = this.capabilities.get(capability)
    if (!capabilityImpl) {
      throw new Error(`Capability ${capability} not registered in TMDB provider`)
    }

    if (typeof capabilityImpl[method] !== 'function') {
      throw new Error(`Method ${method} not found on capability ${capability}`)
    }

    try {
      const result = await capabilityImpl[method](request)
      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to execute TMDB capability ${capability}.${method}`, err)
      throw err
    }
  }

  getCapability<T>(capability: CapabilityType): T | null {
    const result = this.capabilities.get(capability) || null

    this.logger.debug('TMDBCapabilityRegistry.getCapability called', {
      capability,
      isInitialized: this.isInitialized,
      hasCapability: result !== null,
      totalCapabilities: this.capabilities.size,
      allCapabilities: Array.from(this.capabilities.keys()),
    })

    return result
  }

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
