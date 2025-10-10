import type { ManageCatalogUseCase } from '@/src/domain/use-cases/homescreen/ManageCatalogUseCase'
import type { UpdateHomescreenPreferencesUseCase } from '@/src/domain/use-cases/homescreen/UpdateHomescreenPreferencesUseCase'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { useService } from '@/src/infrastructure/di/useService'
import { useMutation } from '@tanstack/react-query'

/**
 * Mutation hook for toggling catalog selection
 *
 * Features:
 * - Error handling with mutation state
 * - Loading state tracking
 * - Query invalidation handled by useGlobalQueryInvalidation hook
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
  const manageCatalogUseCase = useService<ManageCatalogUseCase>(TOKENS.ManageCatalogUseCase)

  return useMutation({
    mutationFn: (catalogId: string) =>
      manageCatalogUseCase.execute({ operation: 'toggle', catalogId }),
    // Invalidation handled by useGlobalQueryInvalidation hook
  })
}

/**
 * Mutation hook for updating homescreen preferences
 *
 * Features:
 * - Error handling with mutation state
 * - Loading state tracking
 * - Query invalidation handled by useGlobalQueryInvalidation hook
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
  const updatePreferencesUseCase = useService<UpdateHomescreenPreferencesUseCase>(
    TOKENS.UpdateHomescreenPreferencesUseCase
  )

  return useMutation({
    mutationFn: updatePreferencesUseCase.execute.bind(updatePreferencesUseCase),
    // Invalidation handled by useGlobalQueryInvalidation hook
  })
}