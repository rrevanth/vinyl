import { useQuery } from '@tanstack/react-query'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { GetAvailableCatalogsUseCase } from '@/src/domain/use-cases/homescreen/GetAvailableCatalogsUseCase'

/**
 * Query hook for fetching available catalogs with automatic caching
 *
 * Features:
 * - Automatic caching with 5-minute stale time
 * - Background refetching when stale
 * - Deduplication of concurrent requests
 * - Cache persists for 10 minutes after unmount
 */
export const useCatalogsQuery = () => {
  const getAvailableCatalogsUseCase = useService<GetAvailableCatalogsUseCase>(
    TOKENS.GetAvailableCatalogsUseCase
  )

  return useQuery({
    queryKey: ['catalogs', 'available'],
    queryFn: () => getAvailableCatalogsUseCase.execute(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  })
}