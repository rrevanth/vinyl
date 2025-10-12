import type { IProvider } from '@/src/domain/providers/IProvider'
import type { MDBListClient } from '@/src/infrastructure/api/mdblist/MDBListClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { ProviderMetadata } from '@/src/domain/providers/ProviderMetadata'
import { ProviderStatus } from '@/src/domain/providers/ProviderStatus'
import { MDBListCapabilityRegistry } from './MDBListCapabilityRegistry'

/**
 * MDBList Provider implementation
 *
 * Provides aggregated ratings from multiple sources:
 * - IMDb
 * - TMDB
 * - Trakt
 * - Letterboxd
 * - Rotten Tomatoes (critics and audience)
 * - Metacritic
 * - Roger Ebert
 * - MyAnimeList (for anime)
 *
 * Features:
 * - Multi-source ratings aggregation
 * - Requires API key authentication
 * - Configurable via user preferences
 * - Automatic rating normalization
 * - Graceful degradation when API key is not configured
 */
export class MDBListProvider implements IProvider {
  readonly metadata: ProviderMetadata

  private readonly capabilityRegistry: MDBListCapabilityRegistry
  private isInitialized = false

  constructor(
    private readonly mdblistClient: MDBListClient,
    private readonly logger: ILoggingService
  ) {
    // Create provider metadata
    this.metadata = {
      id: 'mdblist',
      name: 'MDBList',
      version: '1.0.0',
      description:
        'Aggregated ratings from multiple sources (IMDb, TMDB, Trakt, Letterboxd, Rotten Tomatoes, Metacritic)',
      sourceInfo: {
        type: 'mdblist',
        baseUrl: 'https://api.mdblist.com',
        apiVersion: '1',
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
    this.capabilityRegistry = new MDBListCapabilityRegistry(this.mdblistClient, this.logger)
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Check if API key is configured
      const config = this.mdblistClient.getCurrentConfig()

      if (!config.hasValidApiKey) {
        // MDBList is optional - initialize without capabilities if no API key
        this.logger.info('MDBList API key not configured, provider will run in limited mode')
        await this.capabilityRegistry.initialize()

        this.metadata.status = ProviderStatus.READY
        this.metadata.health = {
          status: ProviderStatus.READY,
          lastChecked: new Date(),
          errorCount: 0,
        }

        this.isInitialized = true
        return
      }

      // Test connection to MDBList
      const connectionTest = await this.mdblistClient.testConnection()
      if (!connectionTest.success) {
        throw new Error(`MDBList connection failed: ${connectionTest.error}`)
      }

      // Initialize capabilities with authentication
      await this.capabilityRegistry.initialize()

      this.metadata.status = ProviderStatus.READY
      this.metadata.health = {
        status: ProviderStatus.READY,
        lastChecked: new Date(),
        errorCount: 0,
      }

      this.isInitialized = true
      this.logger.info('MDBListProvider initialized successfully', {
        authenticated: true,
        apiLimits: connectionTest.limits,
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

      this.logger.error('Failed to initialize MDBListProvider', err)
      throw err
    }
  }

  async shutdown(): Promise<void> {
    if (!this.isInitialized) return

    try {
      await this.capabilityRegistry.shutdown()
      this.mdblistClient.destroy()

      this.metadata.status = ProviderStatus.INITIALIZING
      this.isInitialized = false
      this.logger.info('MDBListProvider shutdown successfully')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to shutdown MDBListProvider', err)
      throw err
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.isInitialized) return false

      // Check if API key is configured
      const config = this.mdblistClient.getCurrentConfig()
      if (!config.hasValidApiKey) {
        // Provider is healthy but in limited mode
        this.metadata.health = {
          status: ProviderStatus.READY,
          lastChecked: new Date(),
          errorCount: 0,
        }
        return true
      }

      // Test connection with authenticated API
      const connectionTest = await this.mdblistClient.testConnection()
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

    this.logger.debug('MDBListProvider.getCapability called', {
      capability,
      isInitialized: this.isInitialized,
      hasResult: result !== null,
      status: this.metadata.status,
      authenticated: this.capabilityRegistry.isAuthenticated(),
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
