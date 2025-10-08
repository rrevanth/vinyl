import { useCallback, useEffect } from 'react'
import { useSelector } from '@legendapp/state/react'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { mediaLibrary$ } from '@/src/presentation/shared/stores/mediaLibrary.store'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { UpdateHomescreenPreferencesUseCase } from '@/src/domain/use-cases/homescreen/UpdateHomescreenPreferencesUseCase'
import { useCatalogsQuery } from '../queries/useCatalogsQuery'
import { useToggleCatalogMutation } from '../queries/mutations'

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
  const updateHomescreenPreferencesUseCase = useService<UpdateHomescreenPreferencesUseCase>(
    TOKENS.UpdateHomescreenPreferencesUseCase
  )

  const selectedIds = useSelector(() => userPreferences$.homescreen.selectedCatalogIds.get())

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

        // Ensure homescreen preferences stay consistent with catalog order list
        const updatedPreferences = userPreferences$.homescreen.get()
        if (
          updatedPreferences.catalogOrder.length === 0 &&
          updatedPreferences.selectedCatalogIds.length > 0
        ) {
          await updateHomescreenPreferencesUseCase.execute({
            catalogs: {
              catalogOrder: updatedPreferences.selectedCatalogIds,
            },
          })
        }
      } catch (toggleError) {
        console.error('Failed to toggle catalog', toggleError)
        throw toggleError
      }
    },
    [toggleMutation, updateHomescreenPreferencesUseCase]
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