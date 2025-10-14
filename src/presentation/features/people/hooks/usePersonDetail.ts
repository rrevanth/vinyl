import { useQuery } from '@tanstack/react-query'
import type { GetPersonDetailUseCase, PersonDetailData } from '@/src/domain/use-cases/people/GetPersonDetailUseCase'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { Person } from '@/src/domain/entities/Person'

/**
 * Hook for person detail screen using TanStack Query for enrichments only
 *
 * NEW PATTERN:
 * - Person entity comes from navigation params (instant rendering)
 * - Only enrichments (metadata, filmography) are cached in TanStack Query
 * - This matches the pattern used in media detail screen
 */
export const usePersonDetail = (person: Person) => {
  const getPersonDetailUseCase = useService<GetPersonDetailUseCase>(TOKENS.GetPersonDetailUseCase)

  console.log('[usePersonDetail] Fetching enrichments for person', {
    stableId: person.stableId,
    name: person.name,
  })

  // Query for person enrichments only (metadata, filmography)
  const query = useQuery({
    queryKey: ['person-enrichments', person.stableId],
    queryFn: async (): Promise<PersonDetailData> => {
      console.log('[usePersonDetail] Executing use case for enrichments', {
        stableId: person.stableId,
        name: person.name,
      })

      // Execute use case to get all enriched data
      const result = await getPersonDetailUseCase.execute(person)

      console.log('[usePersonDetail] Use case completed', {
        stableId: person.stableId,
        hasMetadata: !!result.enrichments.metadata,
        hasFilmography: !!result.enrichments.filmography,
        hasImages: !!result.enrichments.images,
        filmographyCount: result.enrichments.filmography?.length || 0,
      })

      return result
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })

  return {
    // Complete data from GetPersonDetailUseCase
    data: query.data,
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
