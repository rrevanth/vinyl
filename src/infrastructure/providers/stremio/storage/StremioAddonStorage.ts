import type { IStorageService } from '../../../../domain/services/IStorageService'
import type {
  StremioUserPreferences,
  UserInstalledAddon,
  UserAddonConfig,
} from '../../../../domain/preferences/StremioPreferences'
import type { CapabilityType } from '../../../../domain/capabilities/CapabilityType'
import type { StremioManifest, StremioTransportUrl } from '../types'

/**
 * Per-user Stremio addon storage and management
 * Handles user-specific addon installations, configurations, and preferences
 */
export class StremioAddonStorage {
  private readonly USER_STORAGE_KEY = 'stremio_user_preferences'

  constructor(private storage: IStorageService) {}

  /**
   * Get user's Stremio preferences (installed addons, settings, customizations)
   */
  async getUserPreferences(userId: string): Promise<StremioUserPreferences> {
    try {
      const key = `${this.USER_STORAGE_KEY}_${userId}`
      const data = await this.storage.get<string>(key)

      if (!data) {
        // Return default preferences for new users
        const { getDefaultStremioPreferences } = await import(
          '../../../../domain/preferences/StremioPreferences'
        )
        return getDefaultStremioPreferences()
      }

      const parsed = JSON.parse(data) as StremioUserPreferences

      // Convert date strings back to Date objects for installed addons
      Object.values(parsed.installedAddons).forEach((addon: UserInstalledAddon) => {
        addon.installedAt = new Date(addon.installedAt)
        addon.lastUpdated = new Date(addon.lastUpdated)
      })

      return parsed
    } catch (error) {
      console.warn('Failed to get user Stremio preferences:', error)
      const { getDefaultStremioPreferences } = await import(
        '../../../../domain/preferences/StremioPreferences'
      )
      return getDefaultStremioPreferences()
    }
  }

  /**
   * Save user's Stremio preferences
   */
  async setUserPreferences(userId: string, preferences: StremioUserPreferences): Promise<void> {
    try {
      const key = `${this.USER_STORAGE_KEY}_${userId}`
      await this.storage.set(key, JSON.stringify(preferences))
    } catch (error) {
      console.warn('Failed to save user Stremio preferences:', error)
      throw error
    }
  }

  /**
   * Install addon for user with automatic capability detection
   */
  async installAddon(
    userId: string,
    manifest: StremioManifest,
    transportUrl: StremioTransportUrl,
    userConfig?: Partial<UserAddonConfig>
  ): Promise<void> {
    const preferences = await this.getUserPreferences(userId)

    // Detect capabilities from manifest
    const capabilities = this.detectCapabilities(manifest)

    const installedAddon: UserInstalledAddon = {
      addonId: manifest.id,
      name: manifest.name,
      version: manifest.version || '1.0.0',
      transportUrl,
      installedAt: new Date(),
      lastUpdated: new Date(),
      isEnabled: true,
      capabilities,
      supportedTypes: manifest.types || [],
      supportedIdPrefixes: manifest.idPrefixes || [],
      userConfig: {
        priority: userConfig?.priority || 5,
        categories: userConfig?.categories || ['user-installed'],
        customName: userConfig?.customName,
        customIdPrefixes: userConfig?.customIdPrefixes,
        notes: userConfig?.notes,
      },
      configuration: {}, // Will be populated by addon configuration if supported
    }

    preferences.installedAddons[manifest.id] = installedAddon
    await this.setUserPreferences(userId, preferences)
  }

  /**
   * Uninstall addon for user
   */
  async uninstallAddon(userId: string, addonId: string): Promise<void> {
    const preferences = await this.getUserPreferences(userId)
    delete preferences.installedAddons[addonId]
    await this.setUserPreferences(userId, preferences)
  }

  /**
   * Update addon configuration for user
   */
  async updateAddonConfig(
    userId: string,
    addonId: string,
    config: Partial<UserAddonConfig>
  ): Promise<void> {
    const preferences = await this.getUserPreferences(userId)
    const addon = preferences.installedAddons[addonId]

    if (!addon) {
      throw new Error(`Addon ${addonId} not found for user ${userId}`)
    }

    addon.userConfig = { ...addon.userConfig, ...config }
    addon.lastUpdated = new Date()

    await this.setUserPreferences(userId, preferences)
  }

  /**
   * Enable/disable addon for user
   */
  async toggleAddon(userId: string, addonId: string, isEnabled: boolean): Promise<void> {
    const preferences = await this.getUserPreferences(userId)
    const addon = preferences.installedAddons[addonId]

    if (!addon) {
      throw new Error(`Addon ${addonId} not found for user ${userId}`)
    }

    addon.isEnabled = isEnabled
    addon.lastUpdated = new Date()

    await this.setUserPreferences(userId, preferences)
  }

  /**
   * Get user's enabled addons with specific capability
   */
  async getAddonsWithCapability(
    userId: string,
    capability: CapabilityType
  ): Promise<UserInstalledAddon[]> {
    const preferences = await this.getUserPreferences(userId)

    return Object.values(preferences.installedAddons).filter(
      (addon: UserInstalledAddon) => addon.isEnabled && addon.capabilities.includes(capability)
    )
  }

  /**
   * Get user's enabled addons supporting specific media type
   */
  async getAddonsForType(userId: string, mediaType: string): Promise<UserInstalledAddon[]> {
    const preferences = await this.getUserPreferences(userId)

    return Object.values(preferences.installedAddons).filter(
      (addon: UserInstalledAddon) => addon.isEnabled && addon.supportedTypes.includes(mediaType)
    )
  }

  /**
   * Clear all user data (for privacy compliance)
   */
  async clearUserData(userId: string): Promise<void> {
    try {
      const key = `${this.USER_STORAGE_KEY}_${userId}`
      await this.storage.remove(key)
    } catch (error) {
      console.warn('Failed to clear user Stremio data:', error)
      throw error
    }
  }

  /**
   * Detect capabilities from Stremio manifest
   * Uses smart detection with fallbacks for incomplete manifests
   */
  private detectCapabilities(manifest: StremioManifest): CapabilityType[] {
    const capabilities: CapabilityType[] = []

    // Primary detection: Check resources array
    if (manifest.resources?.length) {
      manifest.resources.forEach((resource) => {
        switch (resource) {
          case 'catalog':
            capabilities.push('MEDIA_CATALOG' as CapabilityType)
            break
          case 'meta':
            capabilities.push('MEDIA_METADATA' as CapabilityType)
            break
          case 'stream':
            capabilities.push('MEDIA_STREAMS' as CapabilityType)
            break
          case 'addon_catalog':
            capabilities.push('STREMIO_ADDON_CATALOG' as CapabilityType)
            break
          case 'subtitles':
            capabilities.push('MEDIA_SUBTITLES' as CapabilityType)
            break
        }
      })
    }

    // Fallback detection: Analyze other manifest properties
    if (capabilities.length === 0) {
      // If has catalogs, assume it provides catalog capability
      if (manifest.catalogs?.length) {
        capabilities.push('MEDIA_CATALOG' as CapabilityType)
      }

      // If has types and idPrefixes, likely provides metadata
      if (manifest.types?.length && manifest.idPrefixes?.length) {
        capabilities.push('MEDIA_METADATA' as CapabilityType)
      }

      // Default assumption for stream addons
      if (manifest.types?.length) {
        capabilities.push('MEDIA_STREAMS' as CapabilityType)
      }
    }

    return [...new Set(capabilities)] // Remove duplicates
  }
}
