import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { MDBListClient } from '@/src/infrastructure/api/mdblist/MDBListClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { MDBListMediaRatingsCapability } from './capabilities/MDBListMediaRatingsCapability'

/**
 * MDBList Capability Registry
 *
 * Manages all capabilities provided by the MDBList provider
 *
 * Capabilities:
 * - MEDIA_RATINGS: Aggregated ratings from multiple sources
 *
 * The registry dynamically enables capabilities based on authentication status:
 * - Ratings capability is only available when API key is configured
 */
export class MDBListCapabilityRegistry {
  private capabilities = new Map<CapabilityType, any>()

  constructor(
    private readonly mdblistClient: MDBListClient,
    private readonly logger: ILoggingService
  ) {}

  async initialize(): Promise<void> {
    // Only register capabilities if API key is configured
    const config = this.mdblistClient.getCurrentConfig()

    if (config.hasValidApiKey) {
      // Register Media Ratings capability
      this.capabilities.set(
        CapabilityType.MEDIA_RATINGS,
        new MDBListMediaRatingsCapability(this.mdblistClient, this.logger)
      )

      this.logger.info('MDBListCapabilityRegistry initialized with authentication', {
        capabilities: Array.from(this.capabilities.keys()),
        configSource: config.configSource,
      })
    } else {
      this.logger.info(
        'MDBListCapabilityRegistry initialized without authentication (API key not configured)'
      )
    }
  }

  async shutdown(): Promise<void> {
    this.capabilities.clear()
    this.logger.info('MDBListCapabilityRegistry shutdown')
  }

  getCapability<T>(capability: CapabilityType): T | null {
    return (this.capabilities.get(capability) as T) || null
  }

  /**
   * Check if the registry is authenticated and has capabilities
   * @returns True if API key is configured and capabilities are available
   */
  isAuthenticated(): boolean {
    return this.capabilities.size > 0
  }
}
