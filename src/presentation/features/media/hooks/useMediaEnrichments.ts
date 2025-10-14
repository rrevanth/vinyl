import { useQuery } from '@tanstack/react-query'
import type { GetMediaEnrichmentsUseCase, MediaEnrichmentsData } from '@/src/domain/use-cases/media/GetMediaEnrichmentsUseCase'
import type { Media } from '@/src/domain/entities/Media'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'

/**
 * Hook for fetching media enrichments ONLY (no Media entity)
 * 
 * NEW PATTERN:
 * - Media entity passed via router params (navigation state)
 * - Enrichments cached via TanStack Query (server state)
 * - This hook fetches only server state
 * 
 * Usage:
 * ```typescript
 * const params = useLocalSearchParams<{ mediaData: string }>()
 * const media = useMemo(() => Media.fromJSON(JSON.parse(params.mediaData)), [params.mediaData])
 * const { enrichments, isLoading, error } = useMediaEnrichments(media)
 * ```
 */
export const useMediaEnrichments = (media: Media) => {
  const getMediaEnrichmentsUseCase = useService<GetMediaEnrichmentsUseCase>(TOKENS.GetMediaEnrichmentsUseCase)

  const query = useQuery({
    queryKey: ['media-enrichments', media.stableId],
    queryFn: async (): Promise<MediaEnrichmentsData> => {
      console.log('[useMediaEnrichments] Executing use case for enrichments', {
        stableId: media.stableId,
        title: media.title,
      })

      // Execute use case to get all enriched data
      const result = await getMediaEnrichmentsUseCase.execute(media)

      console.log('[useMediaEnrichments] Use case completed', {
        stableId: media.stableId,
        hasEnrichedData: !!result.enrichedMedia,
        hasVideos: !!result.videos,
        hasSeasons: !!result.seasons,
      })

      return result
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  })

  return {
    // Complete enrichments data
    enrichments: query.data,
    externalIds: query.data?.externalIds,
    enrichedData: query.data?.enrichedMedia,
    watchProgress: query.data?.watchProgress,
    seasons: query.data?.seasons,
    videos: query.data?.videos,
    peopleCatalogs: query.data?.peopleCatalogs,
    recommendationCatalogs: query.data?.recommendationCatalogs,
    ratings: query.data?.ratings,
    reviews: query.data?.reviews,
    images: query.data?.images,

    // Loading states
    isLoading: query.isLoading,

    // Error state
    error: query.error ? (query.error as Error).message : null,

    // Refetch function
    refetch: query.refetch,
  }
}
