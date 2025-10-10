import type { GetHomescreenDataUseCase } from '@/src/domain/use-cases/homescreen/GetHomescreenDataUseCase'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { useService } from '@/src/infrastructure/di/useService'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { useSelector } from '@legendapp/state/react'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

interface ViewportCatalogLoadingResult {
  readonly visibleCatalogIds: string[]
  readonly loadCatalogData: (catalogId: string) => Promise<void>
  readonly isCatalogLoading: (catalogId: string) => boolean
  readonly updateVisibleCatalogs: (catalogIds: string[]) => void
}

/**
 * Hook for managing viewport-based catalog loading with TanStack Query
 *
 * Features:
 * - Only loads catalog data for visible catalogs
 * - Tracks loading state per catalog
 * - Caches loaded catalog data in TanStack Query
 * - Optimizes performance by avoiding unnecessary API calls
 *
 * Pattern (same as media detail):
 * - TanStack Query cache is the single source of truth
 * - No store syncing
 *
 * Usage:
 * ```typescript
 * const {
 *   visibleCatalogIds,
 *   loadCatalogData,
 *   isCatalogLoading
 * } = useViewportCatalogLoading()
 * ```
 */
export const useViewportCatalogLoading = (): ViewportCatalogLoadingResult => {
  const queryClient = useQueryClient()
  const getHomescreenDataUseCase = useService<GetHomescreenDataUseCase>(
    TOKENS.GetHomescreenDataUseCase
  )

  const [visibleCatalogIds, setVisibleCatalogIds] = useState<string[]>([])
  const [loadingCatalogs, setLoadingCatalogs] = useState<Set<string>>(new Set())

  const catalogPreferences = useSelector(() => userPreferences$.catalogPreferences.get())

  // Load catalog data for a specific catalog
  const loadCatalogData = useCallback(async (catalogId: string) => {
    // Check if catalog is already loaded or loading
    if (loadingCatalogs.has(catalogId)) {
      return
    }

    // Check if catalog data is already cached
    const cacheKey = ['catalog', 'data', catalogId]
    const cachedData = queryClient.getQueryData(cacheKey)
    if (cachedData) {
      return
    }

    setLoadingCatalogs(prev => new Set(prev).add(catalogId))

    try {
      // Load only this specific catalog's data
      const catalogData = await getHomescreenDataUseCase.execute({
        heroLimit: 0, // Don't load hero items
        continueWatchingLimit: 0, // Don't load continue watching
        specificCatalogIds: [catalogId] // Only load this catalog
      })

      // Cache the catalog data (TanStack Query as single source of truth)
      queryClient.setQueryData(cacheKey, catalogData)

      console.log('[useViewportCatalogLoading] Cached catalog data', {
        catalogId,
        itemCount: catalogData.catalogs[0]?.getItemCount(),
        canLoadMore: catalogData.catalogs[0]?.canLoadMore(),
      })
    } catch (error) {
      console.error(`[useViewportCatalogLoading] Failed to load catalog ${catalogId}:`, error)
    } finally {
      setLoadingCatalogs(prev => {
        const newSet = new Set(prev)
        newSet.delete(catalogId)
        return newSet
      })
    }
  }, [getHomescreenDataUseCase, queryClient, loadingCatalogs])

  // Check if a catalog is currently loading
  const isCatalogLoading = useCallback((catalogId: string) => {
    return loadingCatalogs.has(catalogId)
  }, [loadingCatalogs])

  // Update visible catalog IDs when viewport changes
  const updateVisibleCatalogs = useCallback((catalogIds: string[]) => {
    setVisibleCatalogIds(catalogIds)

    // Load data for newly visible catalogs
    catalogIds.forEach(catalogId => {
      if (catalogPreferences[catalogId]) {
        void loadCatalogData(catalogId)
      }
    })
  }, [catalogPreferences, loadCatalogData])

  return {
    visibleCatalogIds,
    loadCatalogData,
    isCatalogLoading,
    updateVisibleCatalogs
  }
}
