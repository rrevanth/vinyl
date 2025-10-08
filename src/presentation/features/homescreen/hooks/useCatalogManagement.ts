import type { Catalog } from '@/src/domain/entities/Catalog'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { mediaLibrary$ } from '@/src/presentation/shared/stores/mediaLibrary.store'
import { useSelector } from '@legendapp/state/react'
import { useCallback, useEffect } from 'react'
import { useToggleCatalogMutation } from '../queries/mutations'
import { useCatalogsQuery } from '../queries/useCatalogsQuery'

interface UseCatalogManagementResult {
  readonly catalogs: Catalog[]
  readonly selectedIds: readonly string[]
  readonly isLoading: boolean
  readonly error: string | null
  toggleCatalog(catalogId: string): Promise<void>
  refresh(): Promise<void>
}

/**
 * Hook for managing catalog selection with TanStack Query caching
 *
 * Features:
 * - Automatic caching with background refetching
 * - Optimistic updates for catalog toggles
 * - Syncs query data to Legend State stores
 * - Proper error handling with mutations
 *
 * Usage:
 * ```typescript
 * const {
 *   catalogs,
 *   selectedIds,
 *   toggleCatalog,
 *   refresh
 * } = useCatalogManagement()
 * ```
 */
export const useCatalogManagement = (): UseCatalogManagementResult => {

  const selectedIds = useSelector(() => Object.keys(userPreferences$.catalogPreferences.get()))

  // Use TanStack Query for data fetching with caching
  const {
    data: catalogs,
    isLoading,
    error: queryError,
    refetch,
  } = useCatalogsQuery()

  // Use mutation for catalog toggle
  const toggleMutation = useToggleCatalogMutation()

  // Sync query data to Legend State stores
  useEffect(() => {
    if (catalogs) {
      mediaLibrary$.catalogs.available.set(catalogs)
    }
  }, [catalogs])

  const toggleCatalog = useCallback(
    async (catalogId: string) => {
      try {
        // Execute mutation (automatically invalidates queries)
        await toggleMutation.mutateAsync(catalogId)
      } catch (toggleError) {
        console.error('Failed to toggle catalog', toggleError)
        throw toggleError
      }
    },
    [toggleMutation]
  )

  return {
    catalogs: catalogs ?? [],
    selectedIds,
    isLoading,
    error: queryError ? (queryError as Error).message : toggleMutation.error?.message ?? null,
    toggleCatalog,
    refresh: async () => {
      await refetch()
    },
  }
}