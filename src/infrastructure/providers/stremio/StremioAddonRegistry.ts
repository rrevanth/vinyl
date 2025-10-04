import type {
  EffectiveStremioConfig,
  StremioConfigFactory,
} from '../../factories/StremioConfigFactory'
import type { IProviderRegistry } from '../../../domain/providers/IProviderRegistry'
import type { ILoggingService } from '../../../domain/services/ILoggingService'
import type { HttpClient } from '../../http/HttpClient'
import type { IStorageService } from '../../../domain/services/IStorageService'
import { StremioAddonStorage } from './storage/StremioAddonStorage'
import { StremioManifestCache } from './storage/StremioManifestCache'
import { StremioProvider } from './StremioProvider'
import { StremioManifestParser } from './StremioManifestParser'
import { StremioAddon } from '../../../domain/entities/StremioAddon'
import type { UserInstalledAddon } from '../../../domain/preferences/StremioPreferences'
import { stremioConfig$ } from '../../../presentation/shared/stores/user.store'
import { InfrastructureError } from '../../errors/InfrastructureError'

/**
 * Registry for managing Stremio addon providers with reactive updates
 *
 * Manages user's installed Stremio addons and provides reactive updates
 * when user preferences change. Automatically registers/unregisters
 * providers based on user's addon configuration changes.
 */
export class StremioAddonRegistry {
  private readonly addonStorage: StremioAddonStorage
  private readonly manifestCache: StremioManifestCache
  private readonly activeProviders = new Map<string, StremioProvider>()
  private isInitialized = false
  private configSubscription?: () => void

  constructor(
    private readonly configFactory: StremioConfigFactory,
    private readonly providerRegistry: IProviderRegistry,
    private readonly httpClient: HttpClient,
    private readonly storageService: IStorageService,
    private readonly logger: ILoggingService
  ) {
    this.addonStorage = new StremioAddonStorage(storageService)
    this.manifestCache = new StremioManifestCache(storageService, httpClient)
  }

  /**
   * Initialize the registry and start reactive updates
   */
  async initialize(userId: string): Promise<void> {
    if (this.isInitialized) return

    try {
      // Load user's current addon configuration
      await this.loadUserAddons(userId)

      // Start reactive subscription to user preferences
      this.startConfigSubscription(userId)

      this.isInitialized = true
      this.logger.info('StremioAddonRegistry initialized', { userId })
    } catch (error) {
      this.logger.error('Failed to initialize StremioAddonRegistry', error)
      throw new InfrastructureError(
        'Failed to initialize Stremio addon registry',
        error instanceof Error ? error : new Error(String(error))
      )
    }
  }

  /**
   * Shutdown the registry and cleanup subscriptions
   */
  async shutdown(): Promise<void> {
    if (!this.isInitialized) return

    // Stop config subscription
    if (this.configSubscription) {
      this.configSubscription()
      this.configSubscription = undefined
    }

    // Shutdown all active providers
    await this.shutdownAllProviders()

    this.isInitialized = false
    this.logger.info('StremioAddonRegistry shutdown')
  }

  /**
   * Install a new addon for the user
   */
  async installAddon(
    userId: string,
    manifestUrl: string,
    userConfig?: Partial<UserInstalledAddon['userConfig']>
  ): Promise<void> {
    try {
      // Fetch and validate manifest
      const manifest = await this.manifestCache.fetchAndCacheManifest(manifestUrl)

      // Parse and validate capabilities
      const parseResult = StremioManifestParser.parseManifest(manifest)
      if (!parseResult.isValid || !parseResult.capabilities) {
        throw new InfrastructureError(`Invalid addon manifest: ${parseResult.errors.join(', ')}`)
      }

      // Install addon in storage
      await this.addonStorage.installAddon(userId, manifest, manifestUrl, userConfig)

      // Refresh providers to include new addon
      await this.refreshEnabledProviders(userId)

      this.logger.info('Stremio addon installed', { userId, addonId: manifest.id })
    } catch (error) {
      this.logger.error('Failed to install Stremio addon', error)
      throw new InfrastructureError(
        `Failed to install addon from ${manifestUrl}`,
        error instanceof Error ? error : new Error(String(error))
      )
    }
  }

  /**
   * Uninstall addon for user
   */
  async uninstallAddon(userId: string, addonId: string): Promise<void> {
    try {
      // Remove from storage
      await this.addonStorage.uninstallAddon(userId, addonId)

      // Unregister provider if active
      await this.unregisterProvider(addonId)

      // Clear manifest cache
      const preferences = await this.addonStorage.getUserPreferences(userId)
      const addon = preferences.installedAddons[addonId]
      if (addon) {
        await this.manifestCache.clearManifest(addon.transportUrl)
      }

      this.logger.info('Stremio addon uninstalled', { userId, addonId })
    } catch (error) {
      this.logger.error('Failed to uninstall Stremio addon', error)
    } catch (error) {
      this.logger.error('Failed to toggle Stremio addon', error)
      throw error
    }
  }

  /**
   * Get registry summary for debugging
   */
  getSummary(): string {
    const providerCount = this.activeProviders.size
    const providerIds = Array.from(this.activeProviders.keys()).slice(0, 5)
    
    return [
      `Providers: ${providerCount}`,
      `Active: [${providerIds.join(', ')}${providerCount > 5 ? '...' : ''}]`,
      `Status: ${this.isInitialized ? 'initialized' : 'not initialized'}`,
    ].join(' | ')
  }

  /**
   * Start reactive subscription to user preferences
   */
  private startConfigSubscription(userId: string): void {
    // Subscribe to stremio config changes from Legend State store
    this.configSubscription = stremioConfig$.onChange(async (config) => {
      try {
        this.logger.debug('Stremio config changed, refreshing providers', { userId })
        await this.refreshEnabledProviders(userId)
      } catch (error) {
        this.logger.error('Failed to refresh providers on config change', error)
      }
    })
  }

  /**
   * Load user's addon configuration and register providers
   */
  private async loadUserAddons(userId: string): Promise<void> {
    const preferences = await this.addonStorage.getUserPreferences(userId)
    const enabledAddons = Object.values(preferences.installedAddons).filter(
      (addon) => addon.isEnabled
    )

    this.logger.debug('Loading user addons', { userId, count: enabledAddons.length })

    // Register providers for all enabled addons
    await Promise.all(
      enabledAddons.map((addon) => this.registerProviderForAddon(userId, addon.addonId))
    )
  }

  /**
   * Refresh enabled providers based on current user configuration
   */
  private async refreshEnabledProviders(userId: string): Promise<void> {
    const preferences = await this.addonStorage.getUserPreferences(userId)
    const enabledAddonIds = Object.keys(preferences.installedAddons).filter(
      (id) => preferences.installedAddons[id].isEnabled
    )

    // Unregister providers that are no longer enabled
    const currentProviderIds = Array.from(this.activeProviders.keys())
    for (const providerId of currentProviderIds) {
      if (!enabledAddonIds.includes(providerId)) {
        await this.unregisterProvider(providerId)
      }
    }

    // Register providers for newly enabled addons
    for (const addonId of enabledAddonIds) {
      if (!this.activeProviders.has(addonId)) {
        await this.registerProviderForAddon(userId, addonId)
      }
    }
  }

  /**
   * Register provider for specific addon
   */
  private async registerProviderForAddon(userId: string, addonId: string): Promise<void> {
    try {
      if (this.activeProviders.has(addonId)) {
        return // Already registered
      }

      // Get addon from storage
      const preferences = await this.addonStorage.getUserPreferences(userId)
      const installedAddon = preferences.installedAddons[addonId]

      if (!installedAddon || !installedAddon.isEnabled) {
        return // Addon not installed or disabled
      }

      // Get fresh manifest
      const manifest = await this.manifestCache.getManifest(
        installedAddon.transportUrl,
        installedAddon.version
      )

      // Create StremioAddon domain object
      const addon = StremioAddon.fromInstalledAddon(installedAddon, manifest)

      // Create and initialize provider
      const provider = new StremioProvider(addon, this.httpClient, this.storageService)
      await provider.initialize()

      // Register with provider registry
      await this.providerRegistry.registerProvider(provider)

      // Track locally
      this.activeProviders.set(addonId, provider)

      this.logger.debug('Registered Stremio provider', { addonId })
    } catch (error) {
      this.logger.error('Failed to register provider for addon', { error, addonId })
    }
  }

  /**
   * Unregister provider
   */
  private async unregisterProvider(addonId: string): Promise<void> {
    const provider = this.activeProviders.get(addonId)
    if (!provider) return

    try {
      // Unregister from provider registry
      await this.providerRegistry.unregisterProvider(provider.metadata.id)

      // Shutdown provider
      await provider.shutdown()

      // Remove from tracking
      this.activeProviders.delete(addonId)

      this.logger.debug('Unregistered Stremio provider', { addonId })
    } catch (error) {
      this.logger.error('Failed to unregister provider', { error, addonId })
    }
  }

  /**
   * Shutdown all active providers
   */
  private async shutdownAllProviders(): Promise<void> {
    const shutdownPromises = Array.from(this.activeProviders.entries()).map(
      async ([addonId, provider]) => {
        try {
          await this.unregisterProvider(addonId)
        } catch (error) {
          this.logger.error('Failed to shutdown provider', { error, addonId })
        }
      }
    )

    await Promise.all(shutdownPromises)
    this.activeProviders.clear()
  }
}
