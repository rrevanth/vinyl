import type { GetHomescreenDataUseCase } from '@/src/domain/use-cases/homescreen/GetHomescreenDataUseCase'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { useService } from '@/src/infrastructure/di/useService'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { useSelector } from '@legendapp/state/react'
import { useQuery } from '@tanstack/react-query'

interface HomescreenDataParams {
  readonly heroLimit: number
  readonly continueWatchingLimit: number
  readonly itemsPerCatalog: number
}

/**
 * Query hook for fetching homescreen data with automatic caching
 *
 * Features:
 * - Automatic caching with 3-minute stale time
 * - Query key includes user preferences for proper cache invalidation
 * - Background refetching when preferences change
 * - Deduplication of concurrent requests
 * - Cache persists for 10 minutes after unmount
 */
export const useHomescreenDataQuery = () => {
  const getHomescreenDataUseCase = useService<GetHomescreenDataUseCase>(
    TOKENS.GetHomescreenDataUseCase
  )
  const homescreenPreferences = useSelector(() => userPreferences$.homescreen.get())
  const catalogPreferences = useSelector(() => userPreferences$.catalogPreferences.get())

  const params: HomescreenDataParams = {
    heroLimit: 10,
    continueWatchingLimit: 12,
    itemsPerCatalog: homescreenPreferences.itemsPerRow * 4,
  }

  return useQuery({
    queryKey: [
      'homescreen',
      'data',
      {
        selectedCatalogIds: Object.keys(catalogPreferences),
        itemsPerRow: homescreenPreferences.itemsPerRow,
      },
    ],
    queryFn: () => getHomescreenDataUseCase.execute(params),
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}