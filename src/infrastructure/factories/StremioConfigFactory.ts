import type { StremioUserPreferences } from '../../domain/preferences/StremioPreferences'
import { getDefaultStremioPreferences } from '../../domain/preferences/StremioPreferences'

/**
 * Effective Stremio configuration with resolved values
 * Extends base StremioUserPreferences with computed metadata about addon state
 */
export interface EffectiveStremioConfig extends StremioUserPreferences {
  readonly enabledAddonCount: number
  readonly totalInstalledAddons: number
  readonly hasConfiguredAddons: boolean
  readonly configSource: 'user' | 'default'
  readonly isConfigurationComplete: boolean
}

/**
 * Factory for creating effective Stremio configuration
 *
 * Processes user's Stremio preferences to provide computed metadata about addon state
 * and configuration completeness. Used by Stremio providers and registry for
 * reactive updates when user preferences change.
 */
export class StremioConfigFactory {
  /**
   * Create effective Stremio configuration from user preferences
   *
   * Adds computed properties about addon state:
   * - Number of enabled addons
   * - Total installed addons
   * - Configuration completeness status
   * - Source of configuration (user-customized vs default)
   */
  createEffectiveConfig(userConfig?: StremioUserPreferences): EffectiveStremioConfig {
    // Use provided config or default
    const config = userConfig || this.getDefaultConfig()

    // Calculate addon statistics
    const installedAddons = Object.values(config.installedAddons)
    const enabledAddons = installedAddons.filter((addon) => addon.isEnabled)

    const enabledAddonCount = enabledAddons.length
    const totalInstalledAddons = installedAddons.length
    const hasConfiguredAddons = totalInstalledAddons > 0

    // Determine configuration source
    const configSource: 'user' | 'default' = hasConfiguredAddons ? 'user' : 'default'

    // Check if configuration is complete (has at least some enabled addons)
    const isConfigurationComplete = enabledAddonCount > 0

    return {
      ...config,
      enabledAddonCount,
      totalInstalledAddons,
      hasConfiguredAddons,
      configSource,
      isConfigurationComplete,
    }
  }

  /**
   * Validate effective configuration
   * Provides warnings for common configuration issues
   */
  validateConfig(config: EffectiveStremioConfig): { isValid: boolean; warnings: string[] } {
    const warnings: string[] = []
    let isValid = true

    // Check for basic configuration
    if (!config.hasConfiguredAddons) {
      warnings.push('No Stremio addons installed. Install addons to access content.')
      isValid = false
    }

    // Check for enabled addons
    if (config.hasConfiguredAddons && config.enabledAddonCount === 0) {
      warnings.push('All installed addons are disabled. Enable addons to access content.')
      isValid = false
    }

    // Check for addon discovery
    if (config.customizations.customAddonSources.length === 0 && !config.hasConfiguredAddons) {
      warnings.push('Consider adding custom addon sources for discovering new addons.')
    }

    // Check for adult content settings
    const hasAdultAddons = Object.values(config.installedAddons).some((addon) =>
      addon.userConfig.categories.includes('adult')
    )

    if (hasAdultAddons && !config.settings.enableAdultContent) {
      warnings.push('Adult content addons are installed but adult content is disabled in settings.')
    }

    return { isValid, warnings }
  }

  /**
   * Get configuration summary for debugging/display
   */
  getConfigSummary(config: EffectiveStremioConfig): string {
    const { enabledAddonCount, totalInstalledAddons, configSource } = config

    return [
      `Source: ${configSource}`,
      `Addons: ${enabledAddonCount}/${totalInstalledAddons} enabled`,
      `Adult Content: ${config.settings.enableAdultContent ? 'enabled' : 'disabled'}`,
      `P2P Content: ${config.settings.enableP2PContent ? 'enabled' : 'disabled'}`,
      `Auto Update: ${config.settings.autoUpdateAddons ? 'enabled' : 'disabled'}`,
    ].join(' | ')
  }

  /**
   * Get default Stremio configuration
   * Private helper for fallback configuration
   */
  private getDefaultConfig(): StremioUserPreferences {
    return getDefaultStremioPreferences()
  }
}
