import type { IUserService } from '@/src/domain/services/IUserService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'

/**
 * Use case for updating enabled capabilities for a specific provider
 *
 * Validates that requested capabilities are actually supported by the provider
 * before persisting changes to user preferences.
 */
export class UpdateProviderCapabilitiesUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly providerRegistry: IProviderRegistry,
    private readonly loggingService: ILoggingService
  ) {}

  /**
   * Update enabled capabilities for a provider
   *
   * @param providerId - The provider ID to update
   * @param enabledCapabilities - Array of capabilities to enable
   * @throws Error if provider not found or capabilities not supported
   */
  async execute(providerId: string, enabledCapabilities: CapabilityType[]): Promise<void> {
    try {
      // Validate provider exists
      const provider = this.providerRegistry.getProvider(providerId)
      if (!provider) {
        throw new Error(`Provider not found: ${providerId}`)
      }

      // Validate all requested capabilities are supported by the provider
      const supportedCapabilities = provider.getSupportedCapabilities()
      const unsupportedCapabilities = enabledCapabilities.filter(
        cap => !supportedCapabilities.includes(cap)
      )

      if (unsupportedCapabilities.length > 0) {
        throw new Error(
          `Provider ${providerId} does not support capabilities: ${unsupportedCapabilities.join(', ')}`
        )
      }

      this.loggingService.info('Updating provider capabilities', {
        providerId,
        enabledCount: enabledCapabilities.length,
        capabilities: enabledCapabilities,
      })

      // Get current preferences
      const currentPreferences = this.userService.getCurrentUserPreferences()

      // Update enabledCapabilitiesByProvider
      const updatedCapabilitiesByProvider = {
        ...currentPreferences.providers.enabledCapabilitiesByProvider,
        [providerId]: enabledCapabilities,
      }

      // Save updated preferences
      await this.userService.updatePreferences({
        providers: {
          ...currentPreferences.providers,
          enabledCapabilitiesByProvider: updatedCapabilitiesByProvider,
        },
      })

      this.loggingService.info('Provider capabilities updated successfully', {
        providerId,
      })
    } catch (error) {
      this.loggingService.error(
        'Failed to update provider capabilities',
        error as Error,
        { providerId, enabledCapabilities }
      )
      throw error
    }
  }
}