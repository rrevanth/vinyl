import { useCallback } from 'react'
import { useSelector } from '@legendapp/state/react'
import { mediaLibrary$ } from '@/src/presentation/shared/stores/mediaLibrary.store'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { RefreshHomescreenUseCase } from '@/src/domain/use-cases/homescreen/RefreshHomescreenUseCase'
import type { Media } from '@/src/domain/entities/Media'
import type { ContinueWatchingItem } from '@/src/domain/capabilities/IMediaContinueWatchingCapability'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { HomescreenPreferences } from '@/src/domain/entities/UserPreferences'
import { useHomescreenDataQuery } from '../queries/useHomescreenDataQuery'
import { useQueryClient } from '@tanstack/react-query'

interface UseHomescreenDataResult {
  readonly heroItems: Media[]
  readonly continueWatching: ContinueWatchingItem[]
  readonly catalogs: Catalog[]
  readonly isLoading: boolean
  readonly isRefreshing: boolean
  readonly error: string | null
  readonly preferences: HomescreenPreferences
  refresh(): Promise<void>
}

/**
 * Hook for managing homescreen data with TanStack Query as single source of truth
 *
 * Features:
 * - TanStack Query cache is the single source of truth for data
 * - No data duplication in Legend State stores
 * - Legend State only used for UI preferences
 * - Proper error handling
 *
 * Pattern (same as media detail):
 * - Query data returned directly from cache
 * - No store syncing
 * - Components consume directly from query result
 *
 * Usage:
 * ```typescript
 * const {
 *   heroItems,
 *   continueWatching,
 *   catalogs,
 *   isLoading,
 *   refresh
 * } = useHomescreenData()
 * ```
 */
export const useHomescreenData = (): UseHomescreenDataResult => {
  const refreshHomescreenUseCase = useService<RefreshHomescreenUseCase>(
    TOKENS.RefreshHomescreenUseCase
  )
  const queryClient = useQueryClient()

  // Use TanStack Query for data fetching with caching (single source of truth)
  const {
    data: queryData,
    isLoading,
    isRefetching,
    error: queryError,
    refetch,
  } = useHomescreenDataQuery()

  // Read preferences from Legend State (UI state only)
  const preferences = useSelector(() => userPreferences$.homescreen.get())

  // Extract data from query result (directly from cache, no store sync)
  const heroItems = queryData?.heroItems ?? []
  const continueWatching = queryData?.continueWatching ?? []
  const catalogs = queryData?.catalogs ?? []

  // Manual refresh with query invalidation
  const refresh = useCallback(async () => {
    try {
      mediaLibrary$.ui.refreshing.set(true)

      // Execute use case for fresh data
      const result = await refreshHomescreenUseCase.execute()

      // Update query cache directly (single source of truth)
      queryClient.setQueryData(
        ['homescreen', 'data', {
          selectedCatalogIds: Object.keys(userPreferences$.catalogPreferences.get()),
          itemsPerRow: preferences.itemsPerRow,
        }],
        result.data
      )

      // Invalidate to trigger background refetch
      await refetch()

      mediaLibrary$.ui.lastRefresh.set(result.data.cacheStatus.lastRefreshed)
    } catch (refreshError) {
      console.error('[useHomescreenData] Failed to refresh homescreen data', refreshError)
      throw refreshError
    } finally {
      mediaLibrary$.ui.refreshing.set(false)
    }
  }, [refreshHomescreenUseCase, refetch, queryClient, preferences.itemsPerRow])

  return {
    heroItems,
    continueWatching,
    catalogs,
    isLoading,
    isRefreshing: isRefetching,
    error: queryError ? (queryError as Error).message : null,
    preferences,
    refresh,
  }
}