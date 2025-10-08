import type { ManageCatalogUseCase } from '@/src/domain/use-cases/homescreen/ManageCatalogUseCase'
import type { UpdateHomescreenPreferencesUseCase } from '@/src/domain/use-cases/homescreen/UpdateHomescreenPreferencesUseCase'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { useService } from '@/src/infrastructure/di/useService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * Mutation hook for toggling catalog selection
 *
 * Features:
 * - Automatic query invalidation after successful toggle
 * - Invalidates both homescreen and catalogs queries
 * - Error handling with mutation state
 * - Loading state tracking
 *
 * Usage:
 * ```typescript
 * const toggleMutation = useToggleCatalogMutation()
 *
 * await toggleMutation.mutateAsync('catalog-id')
 *
 * if (toggleMutation.isError) {
 *   console.error(toggleMutation.error)
 * }
 * ```
 */
export const useToggleCatalogMutation = () => {
  const queryClient = useQueryClient()
  const manageCatalogUseCase = useService<ManageCatalogUseCase>(TOKENS.ManageCatalogUseCase)

  return useMutation({
    mutationFn: (catalogId: string) =>
      manageCatalogUseCase.execute({ operation: 'toggle', catalogId }),
    onSuccess: () => {
      // Only invalidate cache - don't refetch all data
      void queryClient.invalidateQueries({ queryKey: ['homescreen'] })
      void queryClient.invalidateQueries({ queryKey: ['catalogs'] })
      
      // Remove specific catalog data from cache to force reload when needed
      void queryClient.removeQueries({ queryKey: ['catalog', 'data'] })
    },
  })
}

/**
 * Mutation hook for updating homescreen preferences
 *
 * Features:
 * - Automatic query invalidation after successful update
 * - Invalidates homescreen queries to reflect new preferences
 * - Error handling with mutation state
 * - Loading state tracking
 *
 * Usage:
 * ```typescript
 * const updatePreferencesMutation = useUpdateHomescreenPreferencesMutation()
 *
 * await updatePreferencesMutation.mutateAsync({
 *   catalogs: { catalogOrder: ['id1', 'id2'] }
 * })
 * ```
 */
export const useUpdateHomescreenPreferencesMutation = () => {
  const queryClient = useQueryClient()
  const updatePreferencesUseCase = useService<UpdateHomescreenPreferencesUseCase>(
    TOKENS.UpdateHomescreenPreferencesUseCase
  )

  return useMutation({
    mutationFn: updatePreferencesUseCase.execute.bind(updatePreferencesUseCase),
    onSuccess: () => {
      // Invalidate homescreen queries to trigger refetch with new preferences
      void queryClient.invalidateQueries({ queryKey: ['homescreen'] })
    },
  })
}