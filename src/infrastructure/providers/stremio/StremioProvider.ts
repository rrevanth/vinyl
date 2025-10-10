import type { IProvider } from '../../../domain/providers/IProvider'
import type { ProviderMetadata } from '../../../domain/providers/ProviderMetadata'
import { ProviderStatus } from '../../../domain/providers/ProviderStatus'
import { CapabilityType } from '../../../domain/capabilities/CapabilityType'
import type { StremioAddon } from '../../../domain/entities/StremioAddon'
import { StremioAddonClient } from './clients/StremioAddonClient'
import type { HttpClient } from '../../http/HttpClient'
import type { IStorageService } from '../../../domain/services/IStorageService'
import type { ILoggingService } from '../../../domain/services/ILoggingService'
import { InfrastructureError } from '../../errors/InfrastructureError'
import { StremioCapabilityFactory } from './factories'

/**
 * Stremio provider implementation - one provider per addon
 *
 * Each Stremio addon becomes its own provider instance with user-specific
 * configuration and capabilities. The addon processing (manifest parsing,
 * capability detection) is handled by StremioAddonRegistry with TanStack Query caching.
 */
export class StremioProvider implements IProvider {
  public readonly metadata: ProviderMetadata

  private readonly addonClient: StremioAddonClient
  private capabilities: CapabilityType[] = []
  private isInitialized = false

  private readonly capabilityInstances = new Map<CapabilityType, unknown>()

  constructor(
    private readonly addon: StremioAddon,
    httpClient: HttpClient,
    _storageService: IStorageService, // Unused but required for interface compatibility
    private readonly logger: ILoggingService
  ) {
    // Create provider metadata from addon
    this.metadata = {
      id: addon.id,
      name: addon.getDisplayName(),
      version: addon.version,
      description: addon.description || `Stremio addon: ${addon.name}`,
      sourceInfo: {
        type: 'stremio',
        url: addon.transportUrl,
        addonId: addon.id,
        manifestUrl: addon.transportUrl,
      },
      status: addon.isEnabled ? ProviderStatus.READY : ProviderStatus.INITIALIZING,
      health: {
        status: ProviderStatus.INITIALIZING,
        lastChecked: new Date(),
        errorCount: 0,
      },
      configurable: addon.isConfigurable,
      requiresAuth: addon.configurationRequired,
      installedAt: addon.installedAt || new Date(),
    }

    // Initialize addon client with logger for HTTP→HTTPS upgrade tracking
    this.addonClient = new StremioAddonClient(addon.transportUrl, httpClient, logger)

    // Set capabilities from the processed addon data (already validated by registry)
    this.capabilities = addon.capabilities

    this.registerCapabilities()
  }

  /**
   * Initialize provider - simplified since manifest processing is done by registry
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Test connectivity to addon
      await this.addonClient.getManifest()

      this.metadata.status = ProviderStatus.READY
      this.metadata.health = {
        status: ProviderStatus.READY,
        lastChecked: new Date(),
        errorCount: 0,
      }

      this.isInitialized = true
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))

      this.metadata.status = ProviderStatus.ERROR
      this.metadata.health = {
        status: ProviderStatus.ERROR,
        lastChecked: new Date(),
        errorCount: this.metadata.health.errorCount + 1,
        lastError: err.message,
      }

      throw new InfrastructureError(
        `Failed to initialize Stremio provider: ${this.addon.name}`,
        err
      )
    }
  }

  /**
   * Shutdown provider
   */
  async shutdown(): Promise<void> {
    this.isInitialized = false
  }

  /**
   * Check provider health
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.addonClient.getManifest()
      return true
    } catch {
      return false
    }
  }

  /**
   * Get capability implementation
   */
  getCapability<T>(capability: CapabilityType): T | null {
    // For now, Stremio providers don't implement capabilities directly
    // This would be expanded to return actual capability implementations
    return (this.capabilityInstances.get(capability) as T | undefined) ?? null
  }

  /**
   * Get the underlying addon
   */
  getAddon(): StremioAddon {
    return this.addon
  }

  /**
   * Check if provider supports a specific capability
   */
  supportsCapability(capability: CapabilityType): boolean {
    return this.capabilityInstances.has(capability)
  }

  /**
   * Get all supported capabilities
   */
  getSupportedCapabilities(): CapabilityType[] {
    return [...this.capabilityInstances.keys()]
  }

  /**
   * Get provider summary
   */
  getSummary(): string {
    return `Stremio addon: ${this.addon.name} (${this.capabilities.length} capabilities)`
  }

  /**
   * Register capabilities using factory pattern
   * Automatically creates capability instances based on addon capabilities
   */
  private registerCapabilities(): void {
    for (const capabilityType of this.capabilities) {
      const capability = StremioCapabilityFactory.createCapability(
        capabilityType,
        this.addon,
        this.addonClient,
        this.logger
      )

      if (capability) {
        this.capabilityInstances.set(capabilityType, capability)
        this.logger.debug('Registered capability', {
          addonId: this.addon.id,
          capabilityType,
        })
      }
    }

    this.logger.info('Capability registration complete', {
      addonId: this.addon.id,
      totalCapabilities: this.capabilities.length,
      registeredCapabilities: this.capabilityInstances.size,
    })
  }
}
