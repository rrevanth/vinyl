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
 * - Simple Map-based storage with basic state management
 * - Use cases handle all complex logic and orchestration
 */
export class ProviderRegistry implements IProviderRegistry {
  private providers = new Map<string, IProvider>()

  async registerProvider(provider: IProvider): Promise<void> {
    const providerId = provider.metadata.id
    this.providers.set(providerId, provider)

    // Initialize provider (let it handle its own lifecycle)
    try {
      await provider.initialize()
      // Update status directly on metadata since IProvider doesn't expose updateStatus
      ;(provider.metadata as any).status = ProviderStatus.ENABLED
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

  getEnabledProviders(): IProvider[] {
    return Array.from(this.providers.values()).filter(
      (provider) => provider.metadata.status === ProviderStatus.ENABLED
    )
  }

  /**
   * Returns capability instances for all providers that support the given capability
   * This is the core method - returns actual capability implementations ready to use
   */
  getProvidersForCapability<T>(capability: CapabilityType, onlyEnabled = true): T[] {
    const providers = onlyEnabled ? this.getEnabledProviders() : this.getAllProviders()

    const capabilities: T[] = []
    for (const provider of providers) {
      const capabilityInstance = provider.getCapability<T>(capability)
      if (capabilityInstance) {
        capabilities.push(capabilityInstance)
      }
    }

    return capabilities
  }

  async enableProvider(providerId: string): Promise<void> {
    const provider = this.providers.get(providerId)
    if (provider) {
      // Update status directly on metadata since IProvider doesn't expose updateStatus
      ;(provider.metadata as any).status = ProviderStatus.ENABLED
    }
  }

  async disableProvider(providerId: string): Promise<void> {
    const provider = this.providers.get(providerId)
    if (provider) {
      // Update status directly on metadata since IProvider doesn't expose updateStatus
      ;(provider.metadata as any).status = ProviderStatus.DISABLED
    }
  }
}
