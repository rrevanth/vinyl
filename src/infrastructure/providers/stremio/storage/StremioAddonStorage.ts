import type { IStorageService } from '../../../../domain/services/IStorageService'
import type {
  StremioUserPreferences,
  UserInstalledAddon,
  UserAddonConfig,
} from '../../../../domain/preferences/StremioPreferences'
import { CapabilityType } from '../../../../domain/capabilities/CapabilityType'
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
   * Clean up invalid addons (localhost URLs, missing fields, etc.)
   * Should be called on app initialization to remove stale/invalid data
   */
  async cleanupInvalidAddons(userId: string): Promise<number> {
    try {
      const preferences = await this.getUserPreferences(userId)
      const validAddons: Record<string, UserInstalledAddon> = {}
      let removedCount = 0

      for (const [addonId, addon] of Object.entries(preferences.installedAddons)) {
        // Skip localhost/invalid URLs (from development/testing)
        if (
          addon.transportUrl.includes('127.0.0.1') ||
          addon.transportUrl.includes('localhost') ||
          addon.transportUrl.includes('0.0.0.0')
        ) {
          console.warn('Removing invalid addon with localhost URL', { addonId, transportUrl: addon.transportUrl })
          removedCount++
          continue
        }

        // Validate has required fields
        if (!addon.addonId || !addon.transportUrl || !addon.name) {
          console.warn('Removing invalid addon with missing fields', { addonId, addon })
          removedCount++
          continue
        }

        // Validate URL format
        try {
          new URL(addon.transportUrl)
        } catch {
          console.warn('Removing addon with invalid URL format', { addonId, transportUrl: addon.transportUrl })
          removedCount++
          continue
        }

        validAddons[addonId] = addon
      }

      // Save cleaned preferences if we removed any
      if (removedCount > 0) {
        preferences.installedAddons = validAddons
        await this.setUserPreferences(userId, preferences)
        console.info(`Cleaned up ${removedCount} invalid addon(s) for user ${userId}`)
      }

      return removedCount
    } catch (error) {
      console.warn('Failed to cleanup invalid addons:', error)
      return 0 // Non-critical, return 0 on error
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
            capabilities.push(CapabilityType.MEDIA_CATALOG)
            break
          case 'meta':
            capabilities.push(CapabilityType.MEDIA_METADATA)
            break
          case 'stream':
            capabilities.push(CapabilityType.MEDIA_STREAMS)
            break
          case 'addon_catalog':
            capabilities.push(CapabilityType.STREMIO_ADDON_CATALOG)
            break
          case 'subtitles':
            capabilities.push(CapabilityType.MEDIA_SUBTITLES)
            break
        }
      })
    }

    // Fallback detection: Analyze other manifest properties
    if (capabilities.length === 0) {
      // If has catalogs, assume it provides catalog capability
      if (manifest.catalogs?.length) {
        capabilities.push(CapabilityType.MEDIA_CATALOG)
      }

      // If has types and idPrefixes, likely provides metadata
      if (manifest.types?.length && manifest.idPrefixes?.length) {
        capabilities.push(CapabilityType.MEDIA_METADATA)
      }

      // Default assumption for stream addons
      if (manifest.types?.length) {
        capabilities.push(CapabilityType.MEDIA_STREAMS)
      }
    }

    return [...new Set(capabilities)] // Remove duplicates
  }
}
