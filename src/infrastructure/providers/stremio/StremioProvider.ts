import type { IProvider } from '../../../domain/providers/IProvider'
import type { ProviderMetadata } from '../../../domain/providers/ProviderMetadata'
import { ProviderStatus } from '../../../domain/providers/ProviderStatus'
import { CapabilityType } from '../../../domain/capabilities/CapabilityType'
import type { StremioAddon } from '../../../domain/entities/StremioAddon'
import { StremioAddonClient } from './clients/StremioAddonClient'
import { StremioManifestCache } from './storage/StremioManifestCache'
import { StremioManifestParser } from './StremioManifestParser'
import type { HttpClient } from '../../http/HttpClient'
import type { IStorageService } from '../../../domain/services/IStorageService'
import { InfrastructureError } from '../../errors/InfrastructureError'

/**
 * Stremio provider implementation - one provider per addon
 *
 * Each Stremio addon becomes its own provider instance with user-specific
 * configuration and capabilities. Provides a clean interface for accessing
 * Stremio addon functionality through the standard provider pattern.
 */
export class StremioProvider implements IProvider {
  public readonly metadata: ProviderMetadata

  private readonly addonClient: StremioAddonClient
  private readonly manifestCache: StremioManifestCache
  private capabilities: CapabilityType[] = []
  private isInitialized = false

  constructor(
    private readonly addon: StremioAddon,
    httpClient: HttpClient,
    storageService: IStorageService
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
      lastUsed: addon.lastUpdated,
    }

    // Initialize clients
    this.addonClient = new StremioAddonClient(addon.transportUrl, httpClient)
    this.manifestCache = new StremioManifestCache(storageService, httpClient)
    this.capabilities = addon.capabilities
  }

  /**
   * Initialize the provider and validate addon
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Fetch and cache manifest to validate addon is accessible
      const manifest = await this.manifestCache.getManifest(
        this.addon.transportUrl,
        this.addon.version
      )

      // Validate and parse capabilities
      const parseResult = StremioManifestParser.parseManifest(manifest)

      if (!parseResult.isValid) {
        throw new InfrastructureError(`Invalid addon manifest: ${parseResult.errors.join(', ')}`)
      }

      if (
        !parseResult.capabilities ||
        !StremioManifestParser.isAddonCompatible(parseResult.capabilities)
      ) {
        throw new InfrastructureError(`Incompatible addon: ${this.addon.name}`)
      }

      // Store validated capabilities
      this.capabilities = parseResult.capabilities.capabilities
      this.isInitialized = true
    } catch (error) {
      throw new InfrastructureError(
        `Failed to initialize Stremio provider for addon ${this.addon.id}`,
        error instanceof Error ? error : new Error(String(error))
      )
    }
  }

  /**
   * Shutdown the provider
   */
  async shutdown(): Promise<void> {
    this.isInitialized = false
  }

  /**
   * Health check - verify addon is accessible
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.manifestCache.getManifest(this.addon.transportUrl)
      return true
    } catch {
      return false
    }
  }

  /**
   * Get capability implementation
   *
   * TODO: Implement actual capability objects
   * For now, return null to focus on registry implementation
   */
  getCapability<T>(capability: CapabilityType): T | null {
    if (!this.isInitialized || !this.capabilities.includes(capability)) {
      return null
    }

    // TODO: Implement actual capability objects here
    // For now, return placeholder to complete Phase 4 structure
    return {} as T
  }

  /**
   * Get addon information
   */
  getAddon(): StremioAddon {
    return this.addon
  }

  /**
   * Check if provider supports specific capability
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
   * Get provider summary for debugging
   */
  getSummary(): string {
    return [
      `ID: ${this.addon.id}`,
      `Name: ${this.addon.getDisplayName()}`,
      `Capabilities: ${this.capabilities.join(', ')}`,
      `Types: ${this.addon.supportedTypes.join(', ')}`,
      `Status: ${this.isInitialized ? 'ready' : 'not initialized'}`,
    ].join(' | ')
  }
}
