import { useCallback, useMemo } from 'react'
import { stremioAddons$ } from '@/src/presentation/shared/stores/stremioAddons.store'
import { StremioAddonCatalogUseCase } from '../use-cases/StremioAddonCatalogUseCase'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { StremioManifestQueryCache } from '@/src/infrastructure/providers/stremio/cache/StremioManifestQueryCache'
import { StremioProcessedAddonCache } from '@/src/infrastructure/providers/stremio/cache/StremioProcessedAddonCache'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { QueryClient } from '@tanstack/react-query'
import type { HttpClient } from '@/src/infrastructure/http/HttpClient'

/**
 * Hook for browsing and searching Stremio addon catalogs
 *
 * Provides functionality for discovering addons, previewing, searching,
 * and filtering addon catalogs with reactive state updates.
 *
 * Usage:
 * ```tsx
 * const {
 *   browsingAddons,
 *   isLoading,
 *   error,
 *   browseAddons,
 *   searchAddons,
 *   filterByCapability,
 *   previewAddon,
 * } = useStremioAddonCatalog()
 *
 * // Browse catalog
 * await browseAddons('https://catalog.example.com/manifest.json')
 *
 * // Search addons
 * const results = await searchAddons('torrent')
 *
 * // Filter by capability
 * const streamAddons = await filterByCapability('MEDIA_STREAMS')
 *
 * // Preview addon
 * const preview = await previewAddon('https://addon.example.com/manifest.json')
 * ```
 */
export const useStremioAddonCatalog = () => {
  // Get services from DI container
  const queryClient = useService<QueryClient>(TOKENS.QueryClient)
  const httpClient = useService<HttpClient>(TOKENS.HttpClient)
  const logger = useService<ILoggingService>(TOKENS.LoggingService)

  // Create cache instances
  const manifestCache = useMemo(
    () => new StremioManifestQueryCache(queryClient, httpClient, logger),
    [queryClient, httpClient, logger]
  )

  const processedAddonCache = useMemo(
    () => new StremioProcessedAddonCache(queryClient, manifestCache, logger),
    [queryClient, manifestCache, logger]
  )

  // Create use case instance
  const catalogUseCase = useMemo(
    () => new StremioAddonCatalogUseCase(manifestCache, processedAddonCache, logger),
    [manifestCache, processedAddonCache, logger]
  )

  // Reactive state from Legend State
  const browsingAddons = stremioAddons$.browsing.get()
  const isLoading = stremioAddons$.isLoading.get()
  const error = stremioAddons$.error.get()

  /**
   * Browse addons from catalog URL
   */
  const browseAddons = useCallback(
    async (catalogUrl: string) => {
      try {
        stremioAddons$.isLoading.set(true)
        stremioAddons$.error.set(null)

        logger.info('Browsing addon catalog', { catalogUrl })

        const addons = await catalogUseCase.browseAddonCatalog(catalogUrl)
        stremioAddons$.browsing.set(addons)

        logger.info('Catalog browsed successfully', { catalogUrl, count: addons.length })
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        logger.error('Failed to browse addon catalog', error as Error, { catalogUrl })
        stremioAddons$.error.set(errorMsg)
        throw error
      } finally {
        stremioAddons$.isLoading.set(false)
      }
    },
    [catalogUseCase, logger]
  )

  /**
   * Search addons by query
   */
  const searchAddons = useCallback(
    async (query: string) => {
      try {
        stremioAddons$.isLoading.set(true)
        stremioAddons$.error.set(null)

        logger.info('Searching addons', { query })

        const currentAddons = stremioAddons$.browsing.get()
        const results = await catalogUseCase.searchAddons(query, currentAddons)
        stremioAddons$.browsing.set(results)

        logger.info('Search completed', { query, count: results.length })
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        logger.error('Failed to search addons', error as Error, { query })
        stremioAddons$.error.set(errorMsg)
        throw error
      } finally {
        stremioAddons$.isLoading.set(false)
      }
    },
    [catalogUseCase, logger]
  )

  /**
   * Filter addons by capability
   */
  const filterByCapability = useCallback(
    async (capability: CapabilityType) => {
      try {
        stremioAddons$.isLoading.set(true)
        stremioAddons$.error.set(null)

        logger.info('Filtering addons by capability', { capability })

        const currentAddons = stremioAddons$.browsing.get()
        const results = await catalogUseCase.filterByCapability(capability, currentAddons)
        stremioAddons$.browsing.set(results)

        logger.info('Filter completed', { capability, count: results.length })
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        logger.error('Failed to filter addons', error as Error, { capability })
        stremioAddons$.error.set(errorMsg)
        throw error
      } finally {
        stremioAddons$.isLoading.set(false)
      }
    },
    [catalogUseCase, logger]
  )

  /**
   * Preview addon from manifest URL
   */
  const previewAddon = useCallback(
    async (manifestUrl: string) => {
      try {
        stremioAddons$.isLoading.set(true)
        stremioAddons$.error.set(null)

        logger.info('Previewing addon', { manifestUrl })

        const result = await catalogUseCase.previewAddon(manifestUrl)

        if (!result.success) {
          throw new Error(result.error || 'Failed to preview addon')
        }

        logger.info('Addon preview successful', { manifestUrl })

        return result.addon
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        logger.error('Failed to preview addon', error as Error, { manifestUrl })
        stremioAddons$.error.set(errorMsg)
        throw error
      } finally {
        stremioAddons$.isLoading.set(false)
      }
    },
    [catalogUseCase, logger]
  )

  /**
   * Check addon compatibility
   */
  const checkCompatibility = useCallback(
    async (manifestUrl: string) => {
      try {
        logger.info('Checking addon compatibility', { manifestUrl })

        const compatibility = await catalogUseCase.checkAddonCompatibility(manifestUrl)

        logger.info('Compatibility check completed', {
          manifestUrl,
          isCompatible: compatibility.isCompatible,
        })

        return compatibility
      } catch (error) {
        logger.error('Failed to check addon compatibility', error as Error, { manifestUrl })
        throw error
      }
    },
    [catalogUseCase, logger]
  )

  /**
   * Prefetch addon data for better performance
   */
  const prefetchAddon = useCallback(
    async (manifestUrl: string) => {
      try {
        await catalogUseCase.prefetchAddon(manifestUrl)
      } catch (error) {
        logger.warn('Failed to prefetch addon', { manifestUrl, error })
        // Don't throw - prefetch failures are non-critical
      }
    },
    [catalogUseCase, logger]
  )

  /**
   * Batch prefetch multiple addons
   */
  const batchPrefetchAddons = useCallback(
    async (manifestUrls: string[]) => {
      try {
        await catalogUseCase.batchPrefetchAddons(manifestUrls)
      } catch (error) {
        logger.warn('Failed to batch prefetch addons', { count: manifestUrls.length, error })
        // Don't throw - prefetch failures are non-critical
      }
    },
    [catalogUseCase, logger]
  )

  return {
    // State
    browsingAddons,
    isLoading,
    error,

    // Actions
    browseAddons,
    searchAddons,
    filterByCapability,
    previewAddon,
    checkCompatibility,
    prefetchAddon,
    batchPrefetchAddons,
  }
}
