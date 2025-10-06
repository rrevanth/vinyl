import { useCallback, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from '@legendapp/state/react'
import { currentUser$ } from '@/src/presentation/shared/stores/app.store'
import { stremioAddons$ } from '@/src/presentation/shared/stores/stremioAddons.store'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { StremioAddonsUseCase } from '@/src/domain/use-cases/StremioAddonsUseCase'
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
  const addonsUseCase = useService<StremioAddonsUseCase>(TOKENS.StremioAddonsUseCase)
  const logger = useService<ILoggingService>(TOKENS.LoggingService)
  const queryClient = useQueryClient()

  // Get current user from state
  const currentUser = useSelector(() => currentUser$.get())

  // Query for installed addons
  const {
    data: installedAddons = [],
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ['stremio', 'addons', 'installed', currentUser?.id],
    queryFn: async () => {
      if (!currentUser) {
        throw new Error('No user logged in')
      }
      // Initialize Stremio first
      const { initializeStremio } = await import('@/src/infrastructure/providers/stremio/initializeStremio')
      await initializeStremio(currentUser.id)
      return addonsUseCase.getInstalledAddons(currentUser.id)
    },
    enabled: !!currentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Sync to Legend State for UI reactivity
  useEffect(() => {
    stremioAddons$.installed.set(installedAddons)
    stremioAddons$.isLoading.set(isLoading)
    const errorMsg = queryError instanceof Error ? queryError.message : null
    stremioAddons$.error.set(errorMsg)
  }, [installedAddons, isLoading, queryError])

  // Mutation for installing addon
  const installMutation = useMutation({
    mutationFn: (manifestUrl: string) => addonsUseCase.installAddon(currentUser.id, manifestUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stremio', 'addons', 'installed'] })
      logger.info('Addon installed successfully', { userId: currentUser.id })
    },
  })

  // Mutation for uninstalling addon
  const uninstallMutation = useMutation({
    mutationFn: (addonId: string) => addonsUseCase.uninstallAddon(currentUser.id, addonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stremio', 'addons', 'installed'] })
      logger.info('Addon uninstalled successfully', { userId: currentUser.id })
    },
  })

  // Mutation for toggling addon
  const toggleMutation = useMutation({
    mutationFn: ({ addonId, isEnabled }: { addonId: string; isEnabled: boolean }) =>
      addonsUseCase.toggleAddon(currentUser.id, addonId, isEnabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stremio', 'addons', 'installed'] })
      logger.info('Addon toggled successfully', { userId: currentUser.id })
    },
  })

  // Mutation for refreshing addon
  const refreshMutation = useMutation({
    mutationFn: (addonId: string) => addonsUseCase.refreshAddonManifest(currentUser.id, addonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stremio', 'addons', 'installed'] })
      logger.info('Addon refreshed successfully', { userId: currentUser.id })
    },
  })

  // Mutation for clearing cache
  const clearCacheMutation = useMutation({
    mutationFn: () => addonsUseCase.clearAddonCache(),
    onSuccess: () => {
      logger.info('Addon cache cleared successfully', { userId: currentUser.id })
    },
  })

  /**
   * Install addon from manifest URL
   */
  const installAddon = useCallback(
    async (manifestUrl: string) => {
      logger.info('Installing addon', { userId: currentUser.id, manifestUrl })

      const result = await installMutation.mutateAsync(manifestUrl)

      if (!result.success) {
        throw new Error(result.error || 'Failed to install addon')
      }
    },
    [installMutation, currentUser.id, logger]
  )

  /**
   * Uninstall addon by ID
   */
  const uninstallAddon = useCallback(
    async (addonId: string) => {
      logger.info('Uninstalling addon', { userId: currentUser.id, addonId })

      const result = await uninstallMutation.mutateAsync(addonId)

      if (!result.success) {
        throw new Error(result.error || 'Failed to uninstall addon')
      }
    },
    [uninstallMutation, currentUser.id, logger]
  )

  /**
   * Toggle addon enabled/disabled state
   */
  const toggleAddon = useCallback(
    async (addonId: string, isEnabled: boolean) => {
      logger.info('Toggling addon', { userId: currentUser.id, addonId, isEnabled })

      const result = await toggleMutation.mutateAsync({ addonId, isEnabled })

      if (!result.success) {
        throw new Error(result.error || 'Failed to toggle addon')
      }
    },
    [toggleMutation, currentUser.id, logger]
  )

  /**
   * Refresh addon manifest from server
   */
  const refreshAddon = useCallback(
    async (addonId: string) => {
      logger.info('Refreshing addon', { userId: currentUser.id, addonId })

      const result = await refreshMutation.mutateAsync(addonId)

      if (!result.success) {
        throw new Error(result.error || 'Failed to refresh addon')
      }
    },
    [refreshMutation, currentUser.id, logger]
  )

  /**
   * Clear addon cache
   */
  const clearCache = useCallback(async () => {
    logger.info('Clearing addon cache', { userId: currentUser.id })

    const result = await clearCacheMutation.mutateAsync()

    if (!result.success) {
      throw new Error(result.error || 'Failed to clear cache')
    }
  }, [clearCacheMutation, currentUser.id, logger])

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
    isLoading:
      isLoading ||
      installMutation.isPending ||
      uninstallMutation.isPending ||
      toggleMutation.isPending ||
      refreshMutation.isPending ||
      clearCacheMutation.isPending,
    error: queryError instanceof Error ? queryError.message : null,

    // Actions
    installAddon,
    uninstallAddon,
    toggleAddon,
    refreshAddon,
    clearCache,
    validateManifestUrl,
    getConfigureUrl,
    reload: () => queryClient.invalidateQueries({ queryKey: ['stremio', 'addons', 'installed'] }),
  }
}
