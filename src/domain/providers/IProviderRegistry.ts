import type { CapabilityType } from '../capabilities/CapabilityType'
import type { IProvider } from './IProvider'

/**
 * Simplified provider registry interface - No business logic, just storage/retrieval
 * All priority and enable/disable logic is handled via UserPreferences
 */
export interface IProviderRegistry {
  // Registration
  registerProvider(provider: IProvider): Promise<void>
  unregisterProvider(providerId: string): Promise<void>

  // Querying
  getProvider(providerId: string): IProvider | null
  getAllProviders(): IProvider[]

  // Capability-based resolution (returns all providers that support the capability)
  getProvidersForCapability(capability: CapabilityType): IProvider[]

  // Convenience method to get capability instances directly
  getCapabilitiesForType<T>(capability: CapabilityType): T[]

  // Capability discovery
  getProviderCapabilities(providerId: string): CapabilityType[]
}
