import type { Catalog } from '@/src/domain/entities/Catalog'
import type { LoadMoreRecommendationsUseCase } from '@/src/domain/use-cases/media/LoadMoreRecommendationsUseCase'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { useService } from '@/src/infrastructure/di/useService'
import { useInfiniteQuery } from '@tanstack/react-query'

/**
 * Infinite query hook for loading more recommendation items with pagination
 *
 * Features:
 * - Infinite scroll pagination support for recommendation catalogs
 * - Automatic detection of when more items can be loaded
 * - Each page maintains the updated catalog state
 * - Caching with 5-minute stale time
 * - Disabled when catalog cannot load more items
 * - Requires catalog to have contextMedia (source media for recommendations)
 *
 * Usage:
 * ```typescript
 * const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
 *   useInfiniteRecommendationsQuery(catalog)
 *
 * // Trigger next page load
 * if (hasNextPage && !isFetchingNextPage) {
 *   await fetchNextPage()
 * }
 *
 * // Access all pages
 * const allPages = data?.pages ?? []
 * const latestCatalog = allPages[allPages.length - 1]
 * ```
 */
export const useInfiniteRecommendationsQuery = (catalog: Catalog) => {
  const loadMoreRecommendationsUseCase = useService<LoadMoreRecommendationsUseCase>(
    TOKENS.LoadMoreRecommendationsUseCase
  )

  const canLoadMore = catalog.canLoadMore()
  console.log('[useInfiniteRecommendationsQuery] Query setup', {
    catalogId: catalog.stableId,
    canLoadMore,
    itemCount: catalog.getItemCount(),
    hasContextMedia: !!catalog.contextMedia,
    contextMediaId: catalog.contextMedia?.stableId,
    paginationInfo: catalog.paginationInfo,
    queryKey: ['recommendations', 'items', catalog.stableId],
  })

  return useInfiniteQuery({
    queryKey: ['recommendations', 'items', catalog.stableId],
    queryFn: async ({ pageParam }) => {
      // pageParam is the catalog with current pagination state
      const currentCatalog = pageParam || catalog

      console.log('[useInfiniteRecommendationsQuery] queryFn called', {
        catalogId: currentCatalog.stableId,
        canLoadMore: currentCatalog.canLoadMore(),
        itemCount: currentCatalog.getItemCount(),
        hasPageParam: !!pageParam,
        pageParamItemCount: pageParam?.getItemCount() ?? 0,
        contextMediaId: currentCatalog.contextMedia?.stableId,
      })

      if (!currentCatalog.canLoadMore()) {
        console.log('[useInfiniteRecommendationsQuery] Cannot load more, returning current catalog')
        return currentCatalog
      }

      console.log('[useInfiniteRecommendationsQuery] Loading more recommendations...')
      const result = await loadMoreRecommendationsUseCase.execute({
        catalog: currentCatalog,
      })

      console.log('[useInfiniteRecommendationsQuery] Loaded more recommendations', {
        oldItemCount: currentCatalog.getItemCount(),
        newItemCount: result.updatedCatalog.getItemCount(),
        hasMore: result.updatedCatalog.canLoadMore(),
        newItemsCount: result.newItemsCount,
        accumulatedItems: result.updatedCatalog.items.length,
      })

      return result.updatedCatalog
    },
    initialPageParam: catalog,
    getNextPageParam: (lastPage) => {
      return lastPage.canLoadMore() ? lastPage : undefined
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: catalog.canLoadMore(),
  })
}
