import type { CapabilityType } from '../capabilities/CapabilityType'
import type { IProvider } from './IProvider'

/**
 * Simplified provider registry interface - No business logic, just storage/retrieval
 * All priority and fallback logic is handled in use cases
 */
export interface IProviderRegistry {
  // Registration
  registerProvider(provider: IProvider): Promise<void>
  unregisterProvider(providerId: string): Promise<void>

  // Querying
  getProvider(providerId: string): IProvider | null
  getAllProviders(): IProvider[]
  getEnabledProviders(): IProvider[]

  // Capability-based resolution (returns pure capability implementations)
  getProvidersForCapability<T>(capability: CapabilityType, onlyEnabled?: boolean): T[]

  // Simple enable/disable (just state management)
  enableProvider(providerId: string): Promise<void>
  disableProvider(providerId: string): Promise<void>
}
