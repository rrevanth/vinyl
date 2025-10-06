/**
 * Domain Use Cases
 *
 * Application-specific business logic that orchestrates domain entities and services.
 * Use cases are pure domain logic with no presentation layer dependencies.
 * All state mutations return updated data objects for the presentation layer to handle.
 */

// Trakt Account Management
export { TraktAccountUseCase } from './TraktAccountUseCase'
export type {
  AuthResult,
  DisconnectResult,
  TokenRefreshResult,
} from './TraktAccountUseCase'

// TMDB Account Management
export { TMDBAccountUseCase } from './TMDBAccountUseCase'
export type { ValidationResult } from './TMDBAccountUseCase'

// Stremio Addon Management
export { StremioAddonsUseCase } from './StremioAddonsUseCase'
export type { AddonOperationResult } from './StremioAddonsUseCase'

// Stremio Addon Catalog
export { StremioAddonCatalogUseCase } from './StremioAddonCatalogUseCase'

// General Settings
export { SettingsUseCase } from './SettingsUseCase'
export type { CacheInfo, AppInfo } from './SettingsUseCase'
