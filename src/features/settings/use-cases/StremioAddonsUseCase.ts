import type { StremioAddonRegistry } from '@/src/infrastructure/providers/stremio/StremioAddonRegistry'
import type { StremioAddonStorage } from '@/src/infrastructure/providers/stremio/storage/StremioAddonStorage'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'

/**
 * Result type for addon operations
 */
export interface AddonOperationResult {
  success: boolean
  error?: string
  addon?: StremioAddon
}

/**
 * Use case for managing Stremio addons
 * Handles installation, uninstallation, toggling, and configuration of Stremio addons
 */
export class StremioAddonsUseCase {
  constructor(
    private readonly addonRegistry: StremioAddonRegistry,
    private readonly addonStorage: StremioAddonStorage,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get all installed addons for a user
   * Returns complete addon objects with installation state
   */
  async getInstalledAddons(userId: string): Promise<StremioAddon[]> {
    try {
      this.logger.debug('Getting installed addons', { userId })

      const preferences = await this.addonStorage.getUserPreferences(userId)
      const installedAddons = Object.values(preferences.installedAddons)

      this.logger.info('Retrieved installed addons', {
        userId,
        count: installedAddons.length,
      })

      // TODO: Convert UserInstalledAddon to StremioAddon entities
      // For now, return empty array - this will be implemented when we integrate with the registry
      return []
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to get installed addons', error as Error, { userId })
      throw new Error(`Failed to get installed addons: ${errorMsg}`)
    }
  }

  /**
   * Install an addon from a manifest URL
   * Returns result object with success status and addon data
   */
  async installAddon(userId: string, manifestUrl: string): Promise<AddonOperationResult> {
    try {
      this.logger.info('Installing addon', { userId, manifestUrl })

      // Validate manifest URL first
      const validationResult = await this.validateManifestUrl(manifestUrl)
      if (!validationResult.success) {
        return {
          success: false,
          error: validationResult.error,
        }
      }

      // Install addon via registry (handles validation and capability detection)
      await this.addonRegistry.installAddon(userId, manifestUrl)

      this.logger.info('Addon installed successfully', { userId, manifestUrl })

      return {
        success: true,
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to install addon', error as Error, { userId, manifestUrl })

      return {
        success: false,
        error: `Installation failed: ${errorMsg}`,
      }
    }
  }

  /**
   * Uninstall an addon
   * Returns result object with success status
   */
  async uninstallAddon(userId: string, addonId: string): Promise<AddonOperationResult> {
    try {
      this.logger.info('Uninstalling addon', { userId, addonId })

      await this.addonRegistry.uninstallAddon(userId, addonId)

      this.logger.info('Addon uninstalled successfully', { userId, addonId })

      return {
        success: true,
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to uninstall addon', error as Error, { userId, addonId })

      return {
        success: false,
        error: `Uninstallation failed: ${errorMsg}`,
      }
    }
  }

  /**
   * Toggle addon enabled/disabled state
   * Returns result object with success status
   */
  async toggleAddon(
    userId: string,
    addonId: string,
    isEnabled: boolean
  ): Promise<AddonOperationResult> {
    try {
      this.logger.info('Toggling addon', { userId, addonId, isEnabled })

      await this.addonRegistry.toggleAddon(userId, addonId, isEnabled)

      this.logger.info('Addon toggled successfully', { userId, addonId, isEnabled })

      return {
        success: true,
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to toggle addon', error as Error, { userId, addonId, isEnabled })

      return {
        success: false,
        error: `Toggle failed: ${errorMsg}`,
      }
    }
  }

  /**
   * Refresh addon manifest from server
   * Returns result object with success status and updated addon data
   */
  async refreshAddonManifest(userId: string, addonId: string): Promise<AddonOperationResult> {
    try {
      this.logger.info('Refreshing addon manifest', { userId, addonId })

      // Get addon details
      const preferences = await this.addonStorage.getUserPreferences(userId)
      const addon = preferences.installedAddons[addonId]

      if (!addon) {
        return {
          success: false,
          error: `Addon ${addonId} not found`,
        }
      }

      // Uninstall and reinstall to force manifest refresh
      await this.addonRegistry.uninstallAddon(userId, addonId)
      await this.addonRegistry.installAddon(userId, addon.transportUrl, {
        customName: addon.userConfig.customName,
        priority: addon.userConfig.priority,
        categories: addon.userConfig.categories,
        notes: addon.userConfig.notes,
      })

      this.logger.info('Addon manifest refreshed successfully', { userId, addonId })

      return {
        success: true,
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to refresh addon manifest', error as Error, { userId, addonId })

      return {
        success: false,
        error: `Refresh failed: ${errorMsg}`,
      }
    }
  }

  /**
   * Clear all addon caches
   * Returns result object with success status
   */
  async clearAddonCache(): Promise<AddonOperationResult> {
    try {
      this.logger.info('Clearing addon cache')

      await this.addonRegistry.clearAllCaches()

      this.logger.info('Addon cache cleared successfully')

      return {
        success: true,
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to clear addon cache', error as Error)

      return {
        success: false,
        error: `Cache clear failed: ${errorMsg}`,
      }
    }
  }

  /**
   * Validate a manifest URL
   * Returns result object with success status
   */
  async validateManifestUrl(url: string): Promise<AddonOperationResult> {
    try {
      // Basic URL validation
      try {
        const parsed = new URL(url)

        // Check for valid protocol
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          return {
            success: false,
            error: 'Invalid URL protocol. Only HTTP and HTTPS are supported',
          }
        }

        // Check for valid hostname
        if (!parsed.hostname) {
          return {
            success: false,
            error: 'Invalid URL hostname',
          }
        }
      } catch {
        return {
          success: false,
          error: 'Invalid URL format',
        }
      }

      this.logger.debug('Manifest URL is valid', { url })

      return {
        success: true,
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to validate manifest URL', error as Error, { url })

      return {
        success: false,
        error: `Validation failed: ${errorMsg}`,
      }
    }
  }

  /**
   * Get configure URL for an addon
   * Returns null if addon doesn't support configuration
   */
  getConfigureUrl(addon: StremioAddon): string | null {
    if (!addon.isConfigurable) {
      return null
    }

    // Stremio addons typically expose configuration at /configure endpoint
    try {
      const baseUrl = new URL(addon.transportUrl)
      return `${baseUrl.origin}/configure`
    } catch (error) {
      this.logger.error('Failed to construct configure URL', error as Error, {
        addonId: addon.id,
        transportUrl: addon.transportUrl,
      })
      return null
    }
  }
}
