import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { GetPersonDetailUseCase, PersonDetailData } from '@/src/domain/use-cases/people/GetPersonDetailUseCase'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'

/**
 * Hook for person detail screen using TanStack Query as single source of truth
 *
 * Pattern:
 * 1. Check if cached data has enrichments (metadata, filmography, images)
 * 2. If NO enrichments → staleTime: 0 (forces refetch immediately)
 * 3. If HAS enrichments → staleTime: 5min (uses cached data)
 * 4. This ensures enrichments always load on first navigation but uses cache on back navigation
 */
export const usePersonDetail = (stableId: string) => {
  const getPersonDetailUseCase = useService<GetPersonDetailUseCase>(TOKENS.GetPersonDetailUseCase)
  const queryClient = useQueryClient()

  // Check if cached data already has enrichments
  const cachedData = queryClient.getQueryData<PersonDetailData>(['person-detail', stableId])
  const hasEnrichments = !!(
    cachedData?.enrichments?.metadata ||
    cachedData?.enrichments?.filmography ||
    cachedData?.enrichments?.images
  )

  console.log('[usePersonDetail] Cache check', {
    stableId,
    hasCachedData: !!cachedData,
    hasPerson: !!cachedData?.person,
    hasEnrichments,
    willForceRefetch: !hasEnrichments,
  })

  // Query for complete person detail data
  const query = useQuery({
    queryKey: ['person-detail', stableId],
    queryFn: async (): Promise<PersonDetailData> => {
      // Get Person from cache (should be pre-populated during navigation)
      const cachedData = queryClient.getQueryData<PersonDetailData>(['person-detail', stableId])

      if (!cachedData?.person) {
        throw new Error(`No person found in cache for stableId: ${stableId}`)
      }

      console.log('[usePersonDetail] Executing use case for enrichments', {
        stableId,
        name: cachedData.person.name,
      })

      // Execute use case to get all enriched data
      const result = await getPersonDetailUseCase.execute(cachedData.person)

      console.log('[usePersonDetail] Use case completed', {
        stableId,
        hasMetadata: !!result.enrichments.metadata,
        hasFilmography: !!result.enrichments.filmography,
        hasImages: !!result.enrichments.images,
        filmographyCount: result.enrichments.filmography?.length || 0,
      })

      return result
    },
    // Conditional staleTime based on whether enrichments exist
    // If no enrichments → staleTime: 0 (immediately stale, forces refetch)
    // If has enrichments → staleTime: 5min (fresh, uses cache)
    staleTime: hasEnrichments ? 5 * 60 * 1000 : 0,
    gcTime: 30 * 60 * 1000, // 30 minutes
  })

  return {
    // Complete data from GetPersonDetailUseCase
    data: query.data,
    person: query.data?.person,
    metadata: query.data?.enrichments.metadata,
    filmography: query.data?.enrichments.filmography,
    images: query.data?.enrichments.images,

    // Loading states
    isLoading: query.isLoading,

    // Error state
    error: query.error ? (query.error as Error).message : null,

    // Refetch function
    refetch: query.refetch,
  }
}
