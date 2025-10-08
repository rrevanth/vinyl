import type { IProvider } from '@/src/domain/providers/IProvider'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import { ProviderStatus } from '@/src/domain/providers/ProviderStatus'

/**
 * Centralized use case for filtering providers by capability and user preferences
 *
 * This use case encapsulates the common logic for:
 * 1. Getting providers that support a capability
 * 2. Filtering by user's enabledCapabilitiesByProvider preferences
 * 3. Filtering by operational status (READY only)
 *
 * Used by all use cases and screens that need enabled providers.
 */
export class GetEnabledProvidersForCapabilityUseCase {
  constructor(
    private readonly providerRegistry: IProviderRegistry,
    private readonly userService: IUserService,
    private readonly loggingService: ILoggingService
  ) {}

  /**
   * Get all enabled and ready providers for a specific capability
   *
   * @param capabilityType - The capability to filter providers by
   * @returns Array of providers that are enabled, ready, and support the capability
   */
  execute(capabilityType: CapabilityType): IProvider[] {
    // 1. Get all providers that support this capability
    const providers = this.providerRegistry.getProvidersForCapability(capabilityType)

    if (providers.length === 0) {
      this.loggingService.info('No providers support capability', {
        capability: capabilityType,
      })
      return []
    }

    // 2. Filter by user's enabledCapabilitiesByProvider preferences
    const preferences = this.userService.getCurrentUserPreferences()
    const enabledProviders = providers.filter(provider => {
      const providerCapabilities =
        preferences.providers.enabledCapabilitiesByProvider[provider.metadata.id]

      // If provider has no entry, assume all capabilities are OFF
      if (!providerCapabilities) {
        return false
      }

      // Check if this specific capability is enabled for this provider
      return providerCapabilities.includes(capabilityType)
    })

    if (enabledProviders.length === 0) {
      this.loggingService.info('No providers have capability enabled in user preferences', {
        capability: capabilityType,
        totalProviders: providers.length,
      })
      return []
    }

    // 3. Filter by operational status (READY only, not ERROR/INITIALIZING)
    const readyProviders = enabledProviders.filter(
      provider => provider.metadata.status === ProviderStatus.READY
    )

    if (readyProviders.length === 0) {
      this.loggingService.warn('No providers are ready for capability', {
        capability: capabilityType,
        enabledCount: enabledProviders.length,
      })
      return []
    }

    this.loggingService.info('Found enabled and ready providers for capability', {
      capability: capabilityType,
      count: readyProviders.length,
      providerIds: readyProviders.map(p => p.metadata.id),
    })

    return readyProviders
  }
}