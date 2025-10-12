import type { IProvider } from '@/src/domain/providers/IProvider'
import type { FanartClient } from '@/src/infrastructure/api/fanart/FanartClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { ProviderMetadata } from '@/src/domain/providers/ProviderMetadata'
import { ProviderStatus } from '@/src/domain/providers/ProviderStatus'
import { FanartCapabilityRegistry } from './FanartCapabilityRegistry'

/**
 * Fanart.tv Provider implementation
 *
 * Provides high-quality images (logos, clearart, backgrounds) for movies and TV shows
 */
export class FanartProvider implements IProvider {
  readonly metadata: ProviderMetadata

  private readonly capabilityRegistry: FanartCapabilityRegistry
  private isInitialized = false

  constructor(
    private readonly fanartClient: FanartClient,
    private readonly logger: ILoggingService
  ) {
    // Create provider metadata
    this.metadata = {
      id: 'fanart',
      name: 'Fanart.tv',
      version: '1.0.0',
      description: 'High-quality images provider for movies and TV shows with HD logos and clearart',
      sourceInfo: {
        type: 'fanart',
        baseUrl: 'http://webservice.fanart.tv/v3',
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

    // Initialize capability registry
    this.capabilityRegistry = new FanartCapabilityRegistry(this.fanartClient, this.logger)
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Test connection to Fanart.tv
      const connectionTest = await this.fanartClient.testConnection()
      if (!connectionTest.success) {
        throw new Error(`Fanart.tv connection failed: ${connectionTest.error}`)
      }

      // Initialize capabilities
      await this.capabilityRegistry.initialize()

      this.metadata.status = ProviderStatus.READY
      this.metadata.health = {
        status: ProviderStatus.READY,
        lastChecked: new Date(),
        errorCount: 0,
      }

      this.isInitialized = true
      this.logger.info('FanartProvider initialized successfully')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))

      this.metadata.status = ProviderStatus.ERROR
      this.metadata.health = {
        status: ProviderStatus.ERROR,
        lastChecked: new Date(),
        errorCount: this.metadata.health.errorCount + 1,
        lastError: err.message,
      }

      this.logger.error('Failed to initialize FanartProvider', err)
      throw err
    }
  }

  async shutdown(): Promise<void> {
    if (!this.isInitialized) return

    try {
      await this.capabilityRegistry.shutdown()

      this.metadata.status = ProviderStatus.INITIALIZING
      this.isInitialized = false
      this.logger.info('FanartProvider shutdown successfully')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to shutdown FanartProvider', err)
      throw err
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.isInitialized) return false

      const connectionTest = await this.fanartClient.testConnection()
      const isHealthy = connectionTest.success

      this.metadata.health = {
        status: isHealthy ? ProviderStatus.READY : ProviderStatus.ERROR,
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
    const result = this.capabilityRegistry.getCapability<T>(capability)

    this.logger.debug('FanartProvider.getCapability called', {
      capability,
      isInitialized: this.isInitialized,
      hasResult: result !== null,
      status: this.metadata.status,
    })

    return result
  }

  getSupportedCapabilities(): CapabilityType[] {
    // Return all capability types that this provider supports
    return Object.values(CapabilityType).filter(
      (capability) => this.capabilityRegistry.getCapability(capability) !== null
    )
  }
}
