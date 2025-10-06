import { useCallback, useMemo, useEffect } from 'react'
import { useSelector } from '@legendapp/state/react'
import { userState$ } from '@/src/presentation/shared/stores/app.store'
import { stremioAddons$ } from '@/src/presentation/shared/stores/stremioAddons.store'
import { StremioAddonsUseCase } from '../use-cases/StremioAddonsUseCase'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { StremioAddonRegistry } from '@/src/infrastructure/providers/stremio/StremioAddonRegistry'
import type { StremioAddonStorage } from '@/src/infrastructure/providers/stremio/storage/StremioAddonStorage'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'

/**
 * Hook for managing Stremio addons
 *
 * Provides functionality for installing, uninstalling, toggling, and managing
 * Stremio addons with reactive state updates.
 *
 * Usage:
 * ```tsx
 * const {
 *   installedAddons,
 *   isLoading,
 *   error,
 *   installAddon,
 *   uninstallAddon,
 *   toggleAddon,
 *   refreshAddon,
 *   clearCache,
 * } = useStremioAddons()
 *
 * // Install addon
 * await installAddon('https://addon.example.com/manifest.json')
 *
 * // Uninstall addon
 * await uninstallAddon('addon-id')
 *
 * // Toggle addon
 * await toggleAddon('addon-id', true)
 * ```
 */
export const useStremioAddons = () => {
  // Get services from DI container
  const addonRegistry = useService<StremioAddonRegistry>(TOKENS.StremioAddonRegistry)
  const addonStorage = useService<StremioAddonStorage>(TOKENS.StremioAddonStorage)
  const logger = useService<ILoggingService>(TOKENS.LoggingService)

  // Create use case instance
  const addonsUseCase = useMemo(
    () => new StremioAddonsUseCase(addonRegistry, addonStorage, logger),
    [addonRegistry, addonStorage, logger]
  )

  // Get current user from state
  const currentUser = useSelector(() => userState$.currentUser.get())

  // Reactive state from Legend State using useSelector
  const installedAddons = useSelector(() => stremioAddons$.installed.get())
  const isLoading = useSelector(() => stremioAddons$.isLoading.get())
  const error = useSelector(() => stremioAddons$.error.get())

  /**
   * Load installed addons for current user
   */
  const loadInstalledAddons = useCallback(async () => {
    try {
      stremioAddons$.isLoading.set(true)
      stremioAddons$.error.set(null)

      const addons = await addonsUseCase.getInstalledAddons(currentUser.id)
      stremioAddons$.installed.set(addons)

      logger.info('Loaded installed addons', { userId: currentUser.id, count: addons.length })
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      logger.error('Failed to load installed addons', error as Error, { userId: currentUser.id })
      stremioAddons$.error.set(errorMsg)
    } finally {
      stremioAddons$.isLoading.set(false)
    }
  }, [addonsUseCase, currentUser.id, logger])

  /**
   * Load addons on mount and initialize Stremio system
   * IMPORTANT: Cleanup happens inside initializeStremio BEFORE loading
   */
  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize Stremio system (includes cleanup as first step)
        const { initializeStremio } = await import(
          '@/src/infrastructure/providers/stremio/initializeStremio'
        )

        await initializeStremio(currentUser.id)
        logger.info('Stremio system initialized', { userId: currentUser.id })
      } catch (error) {
        logger.warn('Stremio initialization warning', error as Error)
        // Continue anyway - not critical
      }

      // Load installed addons into state (after cleanup and init)
      await loadInstalledAddons()
    }

    initialize().catch((error) => {
      logger.error('Failed to initialize Stremio on mount', error as Error)
    })
  }, [currentUser.id, loadInstalledAddons, logger])

  /**
   * Install addon from manifest URL
   */
  const installAddon = useCallback(
    async (manifestUrl: string) => {
      try {
        stremioAddons$.isLoading.set(true)
        stremioAddons$.error.set(null)

        logger.info('Installing addon', { userId: currentUser.id, manifestUrl })

        const result = await addonsUseCase.installAddon(currentUser.id, manifestUrl)

        if (!result.success) {
          throw new Error(result.error || 'Failed to install addon')
        }

        // Reload installed addons
        await loadInstalledAddons()

        logger.info('Addon installed successfully', { userId: currentUser.id, manifestUrl })
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        logger.error('Failed to install addon', error as Error, { userId: currentUser.id, manifestUrl })
        stremioAddons$.error.set(errorMsg)
        throw error
      } finally {
        stremioAddons$.isLoading.set(false)
      }
    },
    [addonsUseCase, currentUser.id, logger, loadInstalledAddons]
  )

  /**
   * Uninstall addon by ID
   */
  const uninstallAddon = useCallback(
    async (addonId: string) => {
      try {
        stremioAddons$.isLoading.set(true)
        stremioAddons$.error.set(null)

        logger.info('Uninstalling addon', { userId: currentUser.id, addonId })

        const result = await addonsUseCase.uninstallAddon(currentUser.id, addonId)

        if (!result.success) {
          throw new Error(result.error || 'Failed to uninstall addon')
        }

        // Reload installed addons
        await loadInstalledAddons()

        logger.info('Addon uninstalled successfully', { userId: currentUser.id, addonId })
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        logger.error('Failed to uninstall addon', error as Error, { userId: currentUser.id, addonId })
        stremioAddons$.error.set(errorMsg)
        throw error
      } finally {
        stremioAddons$.isLoading.set(false)
      }
    },
    [addonsUseCase, currentUser.id, logger, loadInstalledAddons]
  )

  /**
   * Toggle addon enabled/disabled state
   */
  const toggleAddon = useCallback(
    async (addonId: string, isEnabled: boolean) => {
      try {
        stremioAddons$.isLoading.set(true)
        stremioAddons$.error.set(null)

        logger.info('Toggling addon', { userId: currentUser.id, addonId, isEnabled })

        const result = await addonsUseCase.toggleAddon(currentUser.id, addonId, isEnabled)

        if (!result.success) {
          throw new Error(result.error || 'Failed to toggle addon')
        }

        // Reload installed addons
        await loadInstalledAddons()

        logger.info('Addon toggled successfully', { userId: currentUser.id, addonId, isEnabled })
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        logger.error('Failed to toggle addon', error as Error, { userId: currentUser.id, addonId, isEnabled })
        stremioAddons$.error.set(errorMsg)
        throw error
      } finally {
        stremioAddons$.isLoading.set(false)
      }
    },
    [addonsUseCase, currentUser.id, logger, loadInstalledAddons]
  )

  /**
   * Refresh addon manifest from server
   */
  const refreshAddon = useCallback(
    async (addonId: string) => {
      try {
        stremioAddons$.isLoading.set(true)
        stremioAddons$.error.set(null)

        logger.info('Refreshing addon', { userId: currentUser.id, addonId })

        const result = await addonsUseCase.refreshAddonManifest(currentUser.id, addonId)

        if (!result.success) {
          throw new Error(result.error || 'Failed to refresh addon')
        }

        // Reload installed addons
        await loadInstalledAddons()

        logger.info('Addon refreshed successfully', { userId: currentUser.id, addonId })
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        logger.error('Failed to refresh addon', error as Error, { userId: currentUser.id, addonId })
        stremioAddons$.error.set(errorMsg)
        throw error
      } finally {
        stremioAddons$.isLoading.set(false)
      }
    },
    [addonsUseCase, currentUser.id, logger, loadInstalledAddons]
  )

  /**
   * Clear addon cache
   */
  const clearCache = useCallback(async () => {
    try {
      stremioAddons$.isLoading.set(true)
      stremioAddons$.error.set(null)

      logger.info('Clearing addon cache', { userId: currentUser.id })

      const result = await addonsUseCase.clearAddonCache()

      if (!result.success) {
        throw new Error(result.error || 'Failed to clear cache')
      }

      logger.info('Addon cache cleared successfully', { userId: currentUser.id })
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      logger.error('Failed to clear addon cache', error as Error, { userId: currentUser.id })
      stremioAddons$.error.set(errorMsg)
      throw error
    } finally {
      stremioAddons$.isLoading.set(false)
    }
  }, [addonsUseCase, currentUser.id, logger])

  /**
   * Validate manifest URL
   */
  const validateManifestUrl = useCallback(
    async (url: string): Promise<boolean> => {
      try {
        const result = await addonsUseCase.validateManifestUrl(url)
        return result.success
      } catch (error) {
        logger.error('Failed to validate manifest URL', error as Error, { url })
        return false
      }
    },
    [addonsUseCase, logger]
  )

  /**
   * Get configure URL for addon
   */
  const getConfigureUrl = useCallback(
    (addon: StremioAddon): string | null => {
      return addonsUseCase.getConfigureUrl(addon)
    },
    [addonsUseCase]
  )

  return {
    // State
    installedAddons,
    isLoading,
    error,

    // Actions
    installAddon,
    uninstallAddon,
    toggleAddon,
    refreshAddon,
    clearCache,
    validateManifestUrl,
    getConfigureUrl,
    reload: loadInstalledAddons,
  }
}
