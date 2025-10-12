import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { FanartClient } from '@/src/infrastructure/api/fanart/FanartClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { FanartMediaImagesCapability } from './capabilities/FanartMediaImagesCapability'

/**
 * Fanart.tv Capability Registry
 *
 * Manages all capabilities provided by the Fanart.tv provider
 */
export class FanartCapabilityRegistry {
  private capabilities = new Map<CapabilityType, any>()

  constructor(
    private readonly fanartClient: FanartClient,
    private readonly logger: ILoggingService
  ) {}

  async initialize(): Promise<void> {
    // Register Media Images capability
    this.capabilities.set(
      CapabilityType.MEDIA_IMAGES,
      new FanartMediaImagesCapability(this.fanartClient, this.logger)
    )

    this.logger.info('FanartCapabilityRegistry initialized', {
      capabilities: Array.from(this.capabilities.keys()),
    })
  }

  async shutdown(): Promise<void> {
    this.capabilities.clear()
    this.logger.info('FanartCapabilityRegistry shutdown')
  }

  getCapability<T>(capability: CapabilityType): T | null {
    return (this.capabilities.get(capability) as T) || null
  }
}
