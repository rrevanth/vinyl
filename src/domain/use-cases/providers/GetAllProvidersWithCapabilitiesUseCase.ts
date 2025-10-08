import type { IProvider } from '@/src/domain/providers/IProvider'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'

/**
 * Provider with its capabilities and enabled state
 */
export interface ProviderWithCapabilities {
  provider: IProvider
  supportedCapabilities: CapabilityType[]
  enabledCapabilities: readonly CapabilityType[]
}

/**
 * Use case to get all registered providers with their capabilities
 *
 * Returns each provider with:
 * - The provider instance
 * - List of capabilities it supports
 * - List of capabilities currently enabled by user
 */
export class GetAllProvidersWithCapabilitiesUseCase {
  constructor(
    private readonly providerRegistry: IProviderRegistry,
    private readonly userService: IUserService,
    private readonly loggingService: ILoggingService
  ) {}

  /**
   * Get all providers with their capability information
   *
   * @returns Array of providers with their supported and enabled capabilities
   */
  execute(): ProviderWithCapabilities[] {
    // Get all registered providers
    const allProviders = this.providerRegistry.getAllProviders()

    if (allProviders.length === 0) {
      this.loggingService.info('No providers registered')
      return []
    }

    // Get user preferences
    const preferences = this.userService.getCurrentUserPreferences()
    const enabledCapabilitiesByProvider = preferences.providers.enabledCapabilitiesByProvider

    // Map each provider to include capability information
    const providersWithCapabilities: ProviderWithCapabilities[] = allProviders.map(provider => {
      // Get all capabilities this provider supports
      const supportedCapabilities = provider.getSupportedCapabilities()

      // Get capabilities enabled by user for this provider
      const enabledCapabilities = enabledCapabilitiesByProvider[provider.metadata.id] ?? []

      return {
        provider,
        supportedCapabilities,
        enabledCapabilities,
      }
    })

    this.loggingService.info('Retrieved providers with capabilities', {
      totalProviders: providersWithCapabilities.length,
      providerIds: providersWithCapabilities.map(p => p.provider.metadata.id),
    })

    return providersWithCapabilities
  }
}