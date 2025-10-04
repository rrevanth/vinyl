import type { IProvider } from '../../../domain/providers/IProvider'
import type { ProviderMetadata } from '../../../domain/providers/ProviderMetadata'
import { ProviderStatus } from '../../../domain/providers/ProviderStatus'
import { CapabilityType } from '../../../domain/capabilities/CapabilityType'
import type { StremioAddon } from '../../../domain/entities/StremioAddon'
import { StremioAddonClient } from './clients/StremioAddonClient'
import type { HttpClient } from '../../http/HttpClient'
import type { IStorageService } from '../../../domain/services/IStorageService'
import { InfrastructureError } from '../../errors/InfrastructureError'

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

  constructor(
    private readonly addon: StremioAddon,
    httpClient: HttpClient,
    _storageService: IStorageService // Unused but required for interface compatibility
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
      status: addon.isEnabled ? ProviderStatus.ENABLED : ProviderStatus.DISABLED,
      health: {
        status: ProviderStatus.INITIALIZING,
        lastChecked: new Date(),
        errorCount: 0,
      },
      configurable: addon.isConfigurable,
      requiresAuth: addon.configurationRequired,
      installedAt: addon.installedAt || new Date(),
    }

    // Initialize addon client
    this.addonClient = new StremioAddonClient(addon.transportUrl, httpClient)

    // Set capabilities from the processed addon data (already validated by registry)
    this.capabilities = addon.capabilities
  }

  /**
   * Initialize provider - simplified since manifest processing is done by registry
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Test connectivity to addon
      await this.addonClient.getManifest()

      this.metadata.status = ProviderStatus.ENABLED
      this.metadata.health = {
        status: ProviderStatus.ENABLED,
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
    return this.capabilities.includes(capability) ? ({} as T) : null
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
    return this.capabilities.includes(capability)
  }

  /**
   * Get all supported capabilities
   */
  getSupportedCapabilities(): CapabilityType[] {
    return [...this.capabilities]
  }

  /**
   * Get provider summary
   */
  getSummary(): string {
    return `Stremio addon: ${this.addon.name} (${this.capabilities.length} capabilities)`
  }
}
