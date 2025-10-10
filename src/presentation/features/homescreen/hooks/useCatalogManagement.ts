import type { Catalog } from '@/src/domain/entities/Catalog'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { useSelector } from '@legendapp/state/react'
import { useCallback } from 'react'
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
 * Hook for managing catalog selection with TanStack Query as single source of truth
 *
 * Features:
 * - TanStack Query cache is the single source of truth for catalog data
 * - No data duplication in Legend State stores
 * - Optimistic updates for catalog toggles
 * - Proper error handling with mutations
 *
 * Pattern (same as media detail):
 * - Query data returned directly from cache
 * - No store syncing
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

  // Use TanStack Query for data fetching with caching (single source of truth)
  const {
    data: catalogs,
    isLoading,
    error: queryError,
    refetch,
  } = useCatalogsQuery()

  // Use mutation for catalog toggle
  const toggleMutation = useToggleCatalogMutation()

  const toggleCatalog = useCallback(
    async (catalogId: string) => {
      try {
        // Execute mutation (automatically invalidates queries)
        await toggleMutation.mutateAsync(catalogId)
      } catch (toggleError) {
        console.error('[useCatalogManagement] Failed to toggle catalog', toggleError)
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