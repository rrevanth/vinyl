import type { CapabilityType } from '../../../domain/capabilities/CapabilityType'
import type { TMDBDetailCache } from './cache/TMDBDetailCache'
import type { TMDBClient } from '../../api/tmdb/TMDBClient'
import type { ILoggingService } from '../../../domain/services/ILoggingService'

// Import capability implementations as we create them
import { TMDBMediaMetadataCapability } from './capabilities/TMDBMediaMetadataCapability'
// TODO: Import other capabilities as they're created
// import { TMDBMediaImagesCapability } from './capabilities/TMDBMediaImagesCapability'
// import { TMDBMediaSearchCapability } from './capabilities/TMDBMediaSearchCapability'
// import { TMDBMediaCatalogCapability } from './capabilities/TMDBMediaCatalogCapability'

/**
 * Central registry for TMDB capability implementations
 *
 * Features:
 * - Lazy initialization of capability instances
 * - Type-safe capability method execution
 * - Health monitoring across all capabilities
 * - Centralized error handling and logging
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

      // TODO: Register additional capabilities as they're implemented
      // this.capabilities.set(
      //   CapabilityType.MEDIA_IMAGES,
      //   new TMDBMediaImagesCapability(this.cache, this.logger)
      // )

      // this.capabilities.set(
      //   CapabilityType.MEDIA_SEARCH,
      //   new TMDBMediaSearchCapability(this.tmdbClient, this.logger)
      // )

      // this.capabilities.set(
      //   CapabilityType.MEDIA_CATALOG,
      //   new TMDBMediaCatalogCapability(this.tmdbClient, this.logger)
      // )

      this.isInitialized = true
      this.logger.debug(
        `TMDBCapabilityRegistry initialized with ${this.capabilities.size} capabilities`
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

  /**
   * Execute a capability method with type safety and error handling
   */
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
      this.logger.debug(`Executing TMDB capability ${capability}.${method}`)
      const result = await capabilityImpl[method](request)
      this.logger.debug(`Successfully executed TMDB capability ${capability}.${method}`)
      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to execute TMDB capability ${capability}.${method}`, err)
      throw err
    }
  }

  /**
   * Get capability implementation for direct access (if needed)
   */
  getCapability<T>(capability: CapabilityType): T | null {
    return this.capabilities.get(capability) || null
  }

  /**
   * Check if a capability is supported and registered
   */
  hasCapability(capability: CapabilityType): boolean {
    return this.capabilities.has(capability)
  }

  /**
   * Get health status of all registered capabilities
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

      // Test a core capability (metadata) to verify health
      const metadataCapability = this.capabilities.get(CapabilityType.MEDIA_METADATA)
      if (!metadataCapability) {
        return {
          status: 'degraded',
          details: {
            error: 'Core metadata capability not available',
            capabilities: this.capabilities.size,
          },
        }
      }

      // All checks passed
      return {
        status: 'healthy',
        details: {
          registeredCapabilities: this.capabilities.size,
          availableCapabilities: Array.from(this.capabilities.keys()),
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

  /**
   * Get list of all registered capabilities
   */
  getRegisteredCapabilities(): CapabilityType[] {
    return Array.from(this.capabilities.keys())
  }
}
