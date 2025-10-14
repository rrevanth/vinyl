import type { Catalog } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import { useMemo } from 'react'
import { useInfiniteRecommendationsQuery } from './useInfiniteRecommendationsQuery'

/**
 * Infinite query hook for recommendations catalog grid screen
 * Flattens all pages for grid display with infinite scroll
 *
 * Features:
 * - Flattens all pages into a single array for MediaGrid
 * - Filters out items without media
 * - Maintains infinite scroll pagination state
 * - Caching inherited from useInfiniteRecommendationsQuery
 *
 * Usage:
 * ```typescript
 * const {
 *   items,
 *   fetchNextPage,
 *   hasNextPage,
 *   isFetchingNextPage,
 *   isLoading,
 *   isError,
 * } = useInfiniteRecommendationsCatalogQuery(catalog)
 *
 * // Use items directly in MediaGrid
 * <MediaGrid
 *   items={items}
 *   onEndReached={() => {
 *     if (hasNextPage && !isFetchingNextPage) {
 *       fetchNextPage()
 *     }
 *   }}
 * />
 * ```
 */
export const useInfiniteRecommendationsCatalogQuery = (catalog: Catalog) => {
  const infiniteQuery = useInfiniteRecommendationsQuery(catalog)

  // Flatten all pages into single array for grid
  const items = useMemo<Media[]>(() => {
    if (!infiniteQuery.data?.pages) return []

    return infiniteQuery.data.pages.flatMap((page) =>
      page.items.filter((item) => !!item.media).map((item) => item.media!)
    )
  }, [infiniteQuery.data?.pages])

  return {
    items,
    ...infiniteQuery,
  }
}
