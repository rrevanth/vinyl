import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { GetMediaDetailUseCase, MediaDetailData } from '@/src/domain/use-cases/media/GetMediaDetailUseCase'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'

/**
 * Hook for media detail screen using TanStack Query as single source of truth
 *
 * Pattern:
 * 1. Check if cached data has enrichments
 * 2. If NO enrichments → staleTime: 0 (forces refetch immediately)
 * 3. If HAS enrichments → staleTime: 5min (uses cached data)
 * 4. This ensures enrichments always load on first navigation but uses cache on back navigation
 */
export const useMediaDetail = (stableId: string) => {
  const getMediaDetailUseCase = useService<GetMediaDetailUseCase>(TOKENS.GetMediaDetailUseCase)
  const queryClient = useQueryClient()

  // Check if cached data already has enrichments
  const cachedData = queryClient.getQueryData<MediaDetailData>(['media-detail', stableId])
  const hasEnrichments = !!(
    cachedData?.enrichedMedia ||
    cachedData?.videos ||
    cachedData?.seasons ||
    cachedData?.peopleCatalogs ||
    cachedData?.recommendationCatalogs
  )

  console.log('[useMediaDetail] Cache check', {
    stableId,
    hasCachedData: !!cachedData,
    hasMedia: !!cachedData?.media,
    hasEnrichments,
    willForceRefetch: !hasEnrichments,
  })

  // Query for complete media detail data
  const query = useQuery({
    queryKey: ['media-detail', stableId],
    queryFn: async (): Promise<MediaDetailData> => {
      // Get Media from cache (should be pre-populated during navigation)
      const cachedData = queryClient.getQueryData<MediaDetailData>(['media-detail', stableId])

      if (!cachedData?.media) {
        throw new Error(`No media found in cache for stableId: ${stableId}`)
      }

      console.log('[useMediaDetail] Executing use case for enrichments', {
        stableId,
        title: cachedData.media.title,
      })

      // Execute use case to get all enriched data
      const result = await getMediaDetailUseCase.execute(cachedData.media)

      console.log('[useMediaDetail] Use case completed', {
        stableId,
        hasEnrichedData: !!result.enrichedMedia,
        hasVideos: !!result.videos,
        hasSeasons: !!result.seasons,
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
    // Complete data from GetMediaDetailUseCase
    data: query.data,
    media: query.data?.media,
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
