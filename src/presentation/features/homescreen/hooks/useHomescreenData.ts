import { useCallback, useEffect } from 'react'
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
 * Hook for managing homescreen data with TanStack Query caching
 *
 * Features:
 * - Automatic caching with background refetching
 * - Syncs query data to Legend State stores for reactive UI
 * - Manual refresh capability
 * - Proper error handling
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

  // Use TanStack Query for data fetching with caching
  const {
    data: queryData,
    isLoading,
    isRefetching,
    error: queryError,
    refetch,
  } = useHomescreenDataQuery()

  // Read from Legend State stores for reactive UI
  const heroItems = useSelector(() => mediaLibrary$.hero.items.get())
  const continueWatching = useSelector(() => mediaLibrary$.continueWatching.items.get())
  const catalogs = useSelector(() => mediaLibrary$.catalogs.displayed.get())
  const preferences = useSelector(() => userPreferences$.homescreen.get())

  // Sync query data to Legend State stores
  useEffect(() => {
    if (queryData) {
      mediaLibrary$.hero.items.set(queryData.heroItems)
      mediaLibrary$.continueWatching.items.set(queryData.continueWatching)
      mediaLibrary$.catalogs.available.set(queryData.catalogs)
      mediaLibrary$.catalogs.displayed.set(queryData.catalogs)
      mediaLibrary$.ui.lastRefresh.set(queryData.cacheStatus.lastRefreshed)
    }
  }, [queryData])

  // Manual refresh with force refetch
  const refresh = useCallback(async () => {
    try {
      const result = await refreshHomescreenUseCase.execute()
      mediaLibrary$.hero.items.set(result.data.heroItems)
      mediaLibrary$.continueWatching.items.set(result.data.continueWatching)
      mediaLibrary$.catalogs.available.set(result.data.catalogs)
      mediaLibrary$.catalogs.displayed.set(result.data.catalogs)
      mediaLibrary$.ui.lastRefresh.set(result.data.cacheStatus.lastRefreshed)

      // Invalidate query cache to reflect new data
      await refetch()
    } catch (refreshError) {
      console.error('Failed to refresh homescreen data', refreshError)
      throw refreshError
    }
  }, [refreshHomescreenUseCase, refetch])

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