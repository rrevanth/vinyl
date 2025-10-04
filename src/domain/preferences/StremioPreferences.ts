import type { CapabilityType } from '../capabilities/CapabilityType'

/**
 * Complete Stremio user preferences including installed addons and customizations
 */
export interface StremioUserPreferences {
  installedAddons: Record<string, UserInstalledAddon>
  settings: StremioUserSettings
  ui: StremioUIPreferences
  customizations: StremioUserCustomizations
}

/**
 * User's installed addon with all customizations and cached metadata
 */
export interface UserInstalledAddon {
  // Core identification
  addonId: string
  name: string
  version: string
  transportUrl: string

  // Installation metadata
  installedAt: Date
  lastUpdated: Date
  isEnabled: boolean

  // Processed capabilities (cached for performance)
  capabilities: CapabilityType[]
  supportedTypes: string[]
  supportedIdPrefixes: string[]

  // User customizations
  userConfig: UserAddonConfig

  // Addon configuration (for configurable addons)
  configuration?: Record<string, any>
}

/**
 * User-specific addon configuration and customizations
 */
export interface UserAddonConfig {
  customIdPrefixes?: string[] // User-added ID prefixes for compatibility
  customName?: string // User-defined display name
  priority: number // User-defined priority (1-10)
  categories: string[] // User-assigned categories
  notes?: string // User notes about the addon
}

/**
 * Global Stremio settings for the user
 */
export interface StremioUserSettings {
  autoUpdateAddons: boolean
  enableAdultContent: boolean
  enableP2PContent: boolean
  maxConcurrentStreams: number
  preferredStreamQuality: 'low' | 'medium' | 'high' | 'original'
  defaultStreamingServer?: string
}

/**
 * UI preferences for Stremio addon management
 */
export interface StremioUIPreferences {
  showAddonCategories: string[]
  sortAddonsBy: 'name' | 'rating' | 'recent' | 'popularity'
  hideIncompatibleAddons: boolean
  compactAddonView: boolean
}

/**
 * User customizations and personal addon management
 */
export interface StremioUserCustomizations {
  customAddonSources: string[] // Custom addon catalog URLs
  blockedAddons: string[] // Addon IDs user has blocked
  favoriteAddons: string[] // User's favorite addon IDs
}

/**
 * Default Stremio preferences for new users
 */
export const getDefaultStremioPreferences = (): StremioUserPreferences => ({
  installedAddons: {},
  settings: {
    autoUpdateAddons: true,
    enableAdultContent: false,
    enableP2PContent: false,
    maxConcurrentStreams: 3,
    preferredStreamQuality: 'high',
  },
  ui: {
    showAddonCategories: ['official', 'popular', 'streaming'],
    sortAddonsBy: 'popularity',
    hideIncompatibleAddons: true,
    compactAddonView: false,
  },
  customizations: {
    customAddonSources: [],
    blockedAddons: [],
    favoriteAddons: [],
  },
})
