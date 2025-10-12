import type { ProviderStatus, ProviderHealth } from './ProviderStatus'

/**
 * Source information for providers (clean and extensible)
 */
export interface ProviderSourceInfo {
  type: 'tmdb' | 'trakt' | 'stremio' | 'fanart' | 'mdblist' // Provider source type
  url?: string // For Stremio addons: manifest URL, for others: base URL

  // Stremio-specific
  addonId?: string // Stremio addon identifier
  manifestUrl?: string // Full manifest URL

  // API-specific
  apiVersion?: string // API version being used
  baseUrl?: string // API base URL

  // Extensible for future providers
  [key: string]: any
}

/**
 * Simplified provider metadata (NO priority - moved to UserPreferences)
 * Contains only essential information about the provider
 */
export interface ProviderMetadata {
  // Identity
  id: string // 'tmdb' | 'trakt' | 'stremio:addon-id'
  name: string // Display name
  version: string
  description: string

  // Source information (clean object)
  sourceInfo: ProviderSourceInfo

  // Visual
  icon?: string
  logo?: string

  // State (managed by registry)
  status: ProviderStatus // enabled/disabled/error
  health: ProviderHealth

  // Configuration
  configurable: boolean // Supports user configuration
  requiresAuth: boolean // Requires API key/auth

  // Timestamps
  installedAt: Date
  lastUsed?: Date
}
