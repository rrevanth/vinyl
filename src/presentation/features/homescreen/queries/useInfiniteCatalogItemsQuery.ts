import type { Catalog } from '@/src/domain/entities/Catalog'
import type { LoadMoreCatalogItemsUseCase } from '@/src/domain/use-cases/homescreen/LoadMoreCatalogItemsUseCase'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { useService } from '@/src/infrastructure/di/useService'
import { useInfiniteQuery } from '@tanstack/react-query'

/**
 * Infinite query hook for loading more catalog items with pagination
 *
 * Features:
 * - Infinite scroll pagination support
 * - Automatic detection of when more items can be loaded
 * - Each page maintains the updated catalog state
 * - Caching with 5-minute stale time
 * - Disabled when catalog cannot load more items
 *
 * Usage:
 * ```typescript
 * const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
 *   useInfiniteCatalogItemsQuery(catalog)
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
export const useInfiniteCatalogItemsQuery = (catalog: Catalog) => {
  const loadMoreCatalogItemsUseCase = useService<LoadMoreCatalogItemsUseCase>(
    TOKENS.LoadMoreCatalogItemsUseCase
  )

  const canLoadMore = catalog.canLoadMore()
  console.log('[useInfiniteCatalogItemsQuery] Query setup', {
    catalogId: catalog.stableId,
    canLoadMore,
    itemCount: catalog.getItemCount(),
    paginationInfo: catalog.paginationInfo,
    queryKey: ['catalog', 'items', catalog.stableId],
  })

  return useInfiniteQuery({
    queryKey: ['catalog', 'items', catalog.stableId],
    queryFn: async ({ pageParam }) => {
      // pageParam is the catalog with current pagination state
      const currentCatalog = pageParam || catalog

      console.log('[useInfiniteCatalogItemsQuery] queryFn called', {
        catalogId: currentCatalog.stableId,
        canLoadMore: currentCatalog.canLoadMore(),
        itemCount: currentCatalog.getItemCount(),
        hasPageParam: !!pageParam,
        pageParamItemCount: pageParam?.getItemCount() ?? 0,
      })

      if (!currentCatalog.canLoadMore()) {
        console.log('[useInfiniteCatalogItemsQuery] Cannot load more, returning current catalog')
        return currentCatalog
      }

      console.log('[useInfiniteCatalogItemsQuery] Loading more items...')
      const result = await loadMoreCatalogItemsUseCase.execute({
        catalogStableId: currentCatalog.stableId,
        currentCatalog: currentCatalog,
      })

      console.log('[useInfiniteCatalogItemsQuery] Loaded more items', {
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