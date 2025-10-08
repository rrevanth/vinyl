import type { CapabilityType } from '../capabilities/CapabilityType'
import type { ProviderMetadata } from './ProviderMetadata'

/**
 * Simplified provider interface - Pure data fetcher with no business logic
 * All providers (TMDB, Trakt, Stremio addons) implement this interface
 *
 * Key principles:
 * - No enable/disable methods (handled by user preferences)
 * - No priority management (handled by use cases)
 * - No health tracking methods (internal detail)
 * - Capability support determined by getCapability() returning non-null
 */
export interface IProvider {
  // Metadata
  readonly metadata: ProviderMetadata

  // Lifecycle
  initialize(): Promise<void>
  shutdown(): Promise<void>
  healthCheck(): Promise<boolean>

  // Capability access - core method for determining what provider supports
  getCapability<T>(capability: CapabilityType): T | null

  // Capability discovery - returns list of all capabilities this provider supports
  getSupportedCapabilities(): CapabilityType[]
}
