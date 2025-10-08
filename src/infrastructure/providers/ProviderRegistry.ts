import type { IProviderRegistry } from '../../domain/providers/IProviderRegistry'
import type { IProvider } from '../../domain/providers/IProvider'
import type { CapabilityType } from '../../domain/capabilities/CapabilityType'
import { ProviderStatus } from '../../domain/providers'

/**
 * Simple provider registry implementation - Pure storage/retrieval
 *
 * Key design principles:
 * - NO business logic (no priority, fallback, or error handling)
 * - NO provider lifecycle management (providers manage themselves)
 * - Simple Map-based storage with operational status tracking
 * - Use cases handle filtering by user preferences
 */
export class ProviderRegistry implements IProviderRegistry {
  private providers = new Map<string, IProvider>()

  async registerProvider(provider: IProvider): Promise<void> {
    const providerId = provider.metadata.id
    this.providers.set(providerId, provider)

    // Initialize provider (let it handle its own lifecycle)
    try {
      ;(provider.metadata as any).status = ProviderStatus.INITIALIZING
      await provider.initialize()
      ;(provider.metadata as any).status = ProviderStatus.READY
    } catch {
      ;(provider.metadata as any).status = ProviderStatus.ERROR
    }
  }

  async unregisterProvider(providerId: string): Promise<void> {
    const provider = this.providers.get(providerId)
    if (provider) {
      // Clean shutdown
      try {
        await provider.shutdown()
      } catch {
        // Ignore shutdown errors during unregistration
      }
      this.providers.delete(providerId)
    }
  }

  getProvider(providerId: string): IProvider | null {
    return this.providers.get(providerId) || null
  }

  getAllProviders(): IProvider[] {
    return Array.from(this.providers.values())
  }

  /**
   * Returns all providers that support the given capability
   * No filtering by user preferences - that's handled in use cases
   */
  getProvidersForCapability(capability: CapabilityType): IProvider[] {
    return Array.from(this.providers.values()).filter(provider =>
      provider.getCapability(capability) !== null
    )
  }

  /**
   * Convenience method to get capability instances directly
   * Returns only non-null capability instances from all providers
   */
  getCapabilitiesForType<T>(capability: CapabilityType): T[] {
    const capabilities: T[] = []
    for (const provider of this.providers.values()) {
      const cap = provider.getCapability<T>(capability)
      if (cap !== null) {
        capabilities.push(cap)
      }
    }
    return capabilities
  }

  /**
   * Get all capabilities supported by a specific provider
   */
  getProviderCapabilities(providerId: string): CapabilityType[] {
    const provider = this.providers.get(providerId)
    if (!provider) {
      return []
    }
    return provider.getSupportedCapabilities()
  }
}
