import type { StremioConfigFactory } from '../../factories/StremioConfigFactory'
import type { IProviderRegistry } from '../../../domain/providers/IProviderRegistry'
import type { ILoggingService } from '../../../domain/services/ILoggingService'
import type { HttpClient } from '../../http/HttpClient'
import type { IStorageService } from '../../../domain/services/IStorageService'
import type { QueryClient } from '@tanstack/react-query'
import { StremioAddonStorage } from './storage/StremioAddonStorage'
import { StremioManifestQueryCache } from './cache/StremioManifestQueryCache'
import { StremioProcessedAddonCache } from './cache/StremioProcessedAddonCache'
import { StremioProvider } from './StremioProvider'
import { StremioAddon } from '../../../domain/entities/StremioAddon'
import type { UserInstalledAddon } from '../../../domain/preferences/StremioPreferences'
import { stremioConfig$ } from '../../../presentation/shared/stores/user.store'
import { InfrastructureError } from '../../errors/InfrastructureError'

/**
 * Registry for managing Stremio addon providers with TanStack Query caching
 *
 * Manages user's installed Stremio addons and provides reactive updates
 * when user preferences change. Uses efficient TanStack Query caching
 * for both raw manifests and processed addon data.
 */
export class StremioAddonRegistry {
  private readonly addonStorage: StremioAddonStorage
  private readonly manifestCache: StremioManifestQueryCache
  private readonly processedAddonCache: StremioProcessedAddonCache
  private readonly activeProviders = new Map<string, StremioProvider>()
  private isInitialized = false
  private configSubscription?: () => void

  constructor(
    private readonly configFactory: StremioConfigFactory,
    private readonly providerRegistry: IProviderRegistry,
    private readonly httpClient: HttpClient,
    private readonly storageService: IStorageService,
    private readonly queryClient: QueryClient,
    private readonly logger: ILoggingService
  ) {
    this.addonStorage = new StremioAddonStorage(storageService)
    this.manifestCache = new StremioManifestQueryCache(queryClient, httpClient, logger)
    this.processedAddonCache = new StremioProcessedAddonCache(
      queryClient,
      this.manifestCache,
      logger
    )
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
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to initialize StremioAddonRegistry', err)
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

    // Shutdown caches
    await this.manifestCache.shutdown()
    await this.processedAddonCache.shutdown()

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
      // Get processed addon data (includes validation and capability detection)
      const processedAddon = await this.processedAddonCache.getProcessedAddon(manifestUrl)

      if (!processedAddon.isValid || !processedAddon.capabilities) {
        throw new InfrastructureError(
          `Invalid addon manifest: ${processedAddon.validationResult.errors.join(', ')}`
        )
      }

      if (!processedAddon.isCompatible) {
        throw new InfrastructureError(
          `Addon is not compatible with this application: ${processedAddon.capabilitySummary}`
        )
      }

      // Install addon in storage (the storage will detect capabilities)
      await this.addonStorage.installAddon(
        userId,
        processedAddon.rawManifest,
        manifestUrl,
        userConfig
      )

      this.logger.info(`Installed addon for user ${userId}`, {
        addonId: processedAddon.rawManifest.id,
        addonName: processedAddon.rawManifest.name,
        capabilities: processedAddon.capabilities.capabilities.length,
      })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to install addon for user ${userId}`, err)
      throw err
    }
  }

  /**
   * Uninstall addon for user
   */
  async uninstallAddon(userId: string, addonId: string): Promise<void> {
    try {
      await this.addonStorage.uninstallAddon(userId, addonId)

      // Unregister provider if active
      await this.unregisterProvider(addonId)

      this.logger.info(`Uninstalled addon for user ${userId}`, { addonId })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to uninstall addon for user ${userId}`, err)
      throw err
    }
  }

  /**
   * Toggle addon enabled/disabled state
   */
  async toggleAddon(userId: string, addonId: string, isEnabled: boolean): Promise<void> {
    try {
      await this.addonStorage.toggleAddon(userId, addonId, isEnabled)

      if (isEnabled) {
        await this.registerProviderForAddon(userId, addonId)
      } else {
        await this.unregisterProvider(addonId)
      }

      this.logger.info(`Toggled addon for user ${userId}`, { addonId, isEnabled })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to toggle addon for user ${userId}`, err)
      throw err
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      manifests: this.manifestCache.getCacheStats(),
      processedAddons: this.processedAddonCache.getCacheStats(),
    }
  }

  /**
   * Clear all caches
   */
  async clearAllCaches(): Promise<void> {
    await this.manifestCache.clearAllManifests()
    await this.processedAddonCache.clearAllProcessedAddons()
    this.logger.info('Cleared all Stremio caches')
  }

  /**
   * Start reactive subscription to user preferences
   */
  private startConfigSubscription(userId: string): void {
    this.configSubscription = stremioConfig$.onChange(() => {
      this.refreshEnabledProviders(userId).catch((error) => {
        this.logger.error('Failed to refresh enabled providers', error as Error)
      })
    })
  }

  /**
   * Load and register user's installed addons
   */
  private async loadUserAddons(userId: string): Promise<void> {
    const preferences = await this.addonStorage.getUserPreferences(userId)
    const enabledAddons = Object.values(preferences.installedAddons).filter(
      (addon) => addon.isEnabled
    )

    this.logger.debug(`Loading ${enabledAddons.length} enabled addons for user ${userId}`)

    // Register providers for enabled addons
    await Promise.allSettled(
      enabledAddons.map((addon) => this.registerProviderForAddon(userId, addon.addonId))
    )
  }

  /**
   * Refresh enabled providers based on current preferences
   */
  private async refreshEnabledProviders(userId: string): Promise<void> {
    const preferences = await this.addonStorage.getUserPreferences(userId)
    const enabledAddonIds = Object.values(preferences.installedAddons)
      .filter((addon) => addon.isEnabled)
      .map((addon) => addon.addonId)

    const currentProviderIds = new Set(this.activeProviders.keys())

    // Unregister providers that are no longer enabled
    for (const providerId of currentProviderIds) {
      if (!enabledAddonIds.includes(providerId)) {
        await this.unregisterProvider(providerId)
      }
    }

    // Register new enabled providers
    for (const addonId of enabledAddonIds) {
      if (!currentProviderIds.has(addonId)) {
        await this.registerProviderForAddon(userId, addonId)
      }
    }
  }

  /**
   * Register a provider for a specific addon
   */
  private async registerProviderForAddon(userId: string, addonId: string): Promise<void> {
    try {
      if (this.activeProviders.has(addonId)) {
        return // Already registered
      }

      // Get addon configuration
      const preferences = await this.addonStorage.getUserPreferences(userId)
      const installedAddon = preferences.installedAddons[addonId]

      if (!installedAddon) {
        throw new Error(`Addon ${addonId} not found for user ${userId}`)
      }

      // Get processed addon data for manifest
      const processedAddon = await this.processedAddonCache.getProcessedAddon(
        installedAddon.transportUrl
      )

      // Create StremioAddon entity
      const stremioAddon = new StremioAddon({
        manifest: processedAddon.rawManifest,
        transportUrl: installedAddon.transportUrl,
        capabilities: installedAddon.capabilities,
        isInstalled: true,
        isEnabled: installedAddon.isEnabled,
        installedAt: installedAddon.installedAt,
        userPriority: installedAddon.userConfig.priority,
        userCategories: installedAddon.userConfig.categories,
        customName: installedAddon.userConfig.customName,
      })

      // Create and register provider
      const provider = new StremioProvider(stremioAddon, this.httpClient, this.storageService)

      await provider.initialize()

      this.activeProviders.set(addonId, provider)
      this.providerRegistry.registerProvider(provider)

      this.logger.debug(`Registered provider for addon ${addonId}`)
    } catch (error) {
      this.logger.error(`Failed to register provider for addon ${addonId}`, error as Error)
    }
  }

  /**
   * Unregister a provider
   */
  private async unregisterProvider(addonId: string): Promise<void> {
    const provider = this.activeProviders.get(addonId)
    if (!provider) {
      return // Not registered
    }

    try {
      await provider.shutdown()
      this.providerRegistry.unregisterProvider(provider.metadata.id)
      this.activeProviders.delete(addonId)

      this.logger.debug(`Unregistered provider for addon ${addonId}`)
    } catch (error) {
      this.logger.error(`Failed to unregister provider for addon ${addonId}`, error as Error)
    }
  }

  /**
   * Shutdown all active providers
   */
  private async shutdownAllProviders(): Promise<void> {
    const shutdownPromises = Array.from(this.activeProviders.entries()).map(
      async ([addonId, provider]) => {
        try {
          await provider.shutdown()
        } catch (error) {
          this.logger.error(`Failed to shutdown provider ${addonId}`, error as Error)
        }
      }
    )

    await Promise.allSettled(shutdownPromises)
    this.activeProviders.clear()
  }
}
