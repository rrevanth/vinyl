import type { IUserPreferencesRepository } from '../../../../domain/repositories/IUserPreferencesRepository'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
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
  constructor(
    private userPreferencesRepo: IUserPreferencesRepository,
    private logger: ILoggingService
  ) {}

  /**
   * Get user's Stremio preferences (installed addons, settings, customizations)
   */
  async getUserPreferences(userId: string): Promise<StremioUserPreferences> {
    try {
      const userPreferences = await this.userPreferencesRepo.getUserPreferences(userId)
      const stremioPreferences = userPreferences.accounts.stremio

      if (!stremioPreferences) {
        // Return default preferences for new users
        const { getDefaultStremioPreferences } = await import(
          '../../../../domain/preferences/StremioPreferences'
        )
        return getDefaultStremioPreferences()
      }

      // Convert date strings back to Date objects for installed addons
      Object.values(stremioPreferences.installedAddons).forEach((addon: UserInstalledAddon) => {
        addon.installedAt = new Date(addon.installedAt)
        addon.lastUpdated = new Date(addon.lastUpdated)
      })

      return stremioPreferences
    } catch (error) {
      this.logger.warn('Failed to get user Stremio preferences', { error, userId })
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
      await this.userPreferencesRepo.updateUserPreferencesForUser(userId, {
        accounts: {
          stremio: preferences,
        },
      })
    } catch (error) {
      this.logger.warn('Failed to save user Stremio preferences', { error, userId })
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
          this.logger.warn('Removing invalid addon with localhost URL', { addonId, transportUrl: addon.transportUrl })
          removedCount++
          continue
        }

        // Validate has required fields
        if (!addon.addonId || !addon.transportUrl || !addon.name) {
          this.logger.warn('Removing invalid addon with missing fields', { addonId, addon })
          removedCount++
          continue
        }

        // Validate URL format
        try {
          new URL(addon.transportUrl)
        } catch {
          this.logger.warn('Removing addon with invalid URL format', { addonId, transportUrl: addon.transportUrl })
          removedCount++
          continue
        }

        validAddons[addonId] = addon
      }

      // Save cleaned preferences if we removed any
      if (removedCount > 0) {
        preferences.installedAddons = validAddons
        await this.setUserPreferences(userId, preferences)
        this.logger.info(`Cleaned up ${removedCount} invalid addon(s) for user ${userId}`)
      }

      return removedCount
    } catch (error) {
      this.logger.warn('Failed to cleanup invalid addons', { error })
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
