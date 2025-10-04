import {
  Catalog,
  CatalogItem,
  CatalogSourceInfo,
  CatalogPaginationInfo,
} from '../../../../domain/entities/Catalog'
import { BaseTraktMapper } from '../base/BaseTraktMapper'
import { TraktMediaMapper } from './TraktMediaMapper'
import { TraktPersonMapper } from './TraktPersonMapper'
import type {
  TraktMovie,
  TraktShow,
  TraktPerson,
  TraktSearchResult,
  TraktWatchlistItem,
  TraktCollectionItem,
  TraktPaginationHeaders,
} from '../../../api/trakt/types'

/**
 * Maps Trakt responses to Catalog entities with proper pagination
 */
export class TraktCatalogMapper extends BaseTraktMapper {
  /**
   * Create Catalog from array of Trakt movies
   */
  static fromMovieArray(
    movies: TraktMovie[],
    catalogId: string,
    category: string,
    name: string,
    paginationHeaders?: TraktPaginationHeaders,
    description?: string
  ): Catalog {
    const items: CatalogItem[] = movies.map((movie, index) => ({
      stableId: `${catalogId}-movie-${movie.ids.trakt}`,
      media: TraktMediaMapper.fromMovie(movie),
      position: index + 1,
    }))

    const sourceInfo: CatalogSourceInfo = {
      totalCount: paginationHeaders?.['X-Pagination-Item-Count'],
      lastUpdated: new Date(),
      period: this.extractPeriodFromCategory(category),
    }

    const paginationInfo: CatalogPaginationInfo = {
      currentPage: paginationHeaders?.['X-Pagination-Page'] || 1,
      totalPages: paginationHeaders?.['X-Pagination-Page-Count'],
      hasMore: this.hasMorePages(paginationHeaders),
      limit: paginationHeaders?.['X-Pagination-Limit'],
    }

    return new Catalog({
      id: catalogId,
      providerId: 'trakt',
      type: 'movie',
      category,
      name,
      description,
      items,
      sourceInfo,
      paginationInfo,
    })
  }

  /**
   * Create Catalog from array of Trakt shows
   */
  static fromShowArray(
    shows: TraktShow[],
    catalogId: string,
    category: string,
    name: string,
    paginationHeaders?: TraktPaginationHeaders,
    description?: string
  ): Catalog {
    const items: CatalogItem[] = shows.map((show, index) => ({
      stableId: `${catalogId}-show-${show.ids.trakt}`,
      media: TraktMediaMapper.fromShow(show),
      position: index + 1,
    }))

    const sourceInfo: CatalogSourceInfo = {
      totalCount: paginationHeaders?.['X-Pagination-Item-Count'],
      lastUpdated: new Date(),
      period: this.extractPeriodFromCategory(category),
    }

    const paginationInfo: CatalogPaginationInfo = {
      currentPage: paginationHeaders?.['X-Pagination-Page'] || 1,
      totalPages: paginationHeaders?.['X-Pagination-Page-Count'],
      hasMore: this.hasMorePages(paginationHeaders),
      limit: paginationHeaders?.['X-Pagination-Limit'],
    }

    return new Catalog({
      id: catalogId,
      providerId: 'trakt',
      type: 'series',
      category,
      name,
      description,
      items,
      sourceInfo,
      paginationInfo,
    })
  }

  /**
   * Create Catalog from array of Trakt persons
   */
  static fromPersonArray(
    persons: TraktPerson[],
    catalogId: string,
    category: string,
    name: string,
    paginationHeaders?: TraktPaginationHeaders,
    description?: string
  ): Catalog {
    const items: CatalogItem[] = persons.map((person, index) => ({
      stableId: `${catalogId}-person-${person.ids.trakt}`,
      person: TraktPersonMapper.fromPerson(person),
      position: index + 1,
    }))

    const sourceInfo: CatalogSourceInfo = {
      totalCount: paginationHeaders?.['X-Pagination-Item-Count'],
      lastUpdated: new Date(),
    }

    const paginationInfo: CatalogPaginationInfo = {
      currentPage: paginationHeaders?.['X-Pagination-Page'] || 1,
      totalPages: paginationHeaders?.['X-Pagination-Page-Count'],
      hasMore: this.hasMorePages(paginationHeaders),
      limit: paginationHeaders?.['X-Pagination-Limit'],
    }

    return new Catalog({
      id: catalogId,
      providerId: 'trakt',
      type: 'person',
      category,
      name,
      description,
      items,
      sourceInfo,
      paginationInfo,
    })
  }

  /**
   * Create Catalog from Trakt search results (mixed content)
   */
  static fromSearchResults(
    searchResults: TraktSearchResult[],
    query: string,
    paginationHeaders?: TraktPaginationHeaders
  ): Catalog {
    const items: CatalogItem[] = searchResults
      .map((result, index) => {
        const stableId = `search-${query}-${result.type}-${index}`

        if (result.movie) {
          return {
            stableId,
            media: TraktMediaMapper.fromMovie(result.movie),
            position: index + 1,
          }
        }

        if (result.show) {
          return {
            stableId,
            media: TraktMediaMapper.fromShow(result.show),
            position: index + 1,
          }
        }

        if (result.person) {
          return {
            stableId,
            person: TraktPersonMapper.fromPerson(result.person),
            position: index + 1,
          }
        }

        // Skip unsupported result types (episodes, lists)
        return null
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)

    const sourceInfo: CatalogSourceInfo = {
      totalCount: paginationHeaders?.['X-Pagination-Item-Count'],
      lastUpdated: new Date(),
    }

    const paginationInfo: CatalogPaginationInfo = {
      currentPage: paginationHeaders?.['X-Pagination-Page'] || 1,
      totalPages: paginationHeaders?.['X-Pagination-Page-Count'],
      hasMore: this.hasMorePages(paginationHeaders),
      limit: paginationHeaders?.['X-Pagination-Limit'],
    }

    return new Catalog({
      id: `search-${query}`,
      providerId: 'trakt',
      type: 'mixed',
      category: 'search',
      name: `Search: "${query}"`,
      items,
      sourceInfo,
      paginationInfo,
    })
  }

  /**
   * Create Catalog from Trakt watchlist items
   */
  static fromWatchlistItems(
    watchlistItems: TraktWatchlistItem[],
    userId: string,
    paginationHeaders?: TraktPaginationHeaders
  ): Catalog {
    const items: CatalogItem[] = watchlistItems
      .map((item) => {
        const stableId = `watchlist-${userId}-${item.type}-${item.rank}`

        if (item.movie) {
          return {
            stableId,
            media: TraktMediaMapper.fromMovie(item.movie),
            position: item.rank,
          }
        }

        if (item.show) {
          return {
            stableId,
            media: TraktMediaMapper.fromShow(item.show),
            position: item.rank,
          }
        }

        // Skip episodes and seasons for now
        return null
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)

    const sourceInfo: CatalogSourceInfo = {
      totalCount: paginationHeaders?.['X-Pagination-Item-Count'],
      lastUpdated: new Date(),
    }

    const paginationInfo: CatalogPaginationInfo = {
      currentPage: paginationHeaders?.['X-Pagination-Page'] || 1,
      totalPages: paginationHeaders?.['X-Pagination-Page-Count'],
      hasMore: this.hasMorePages(paginationHeaders),
      limit: paginationHeaders?.['X-Pagination-Limit'],
    }

    return new Catalog({
      id: `watchlist-${userId}`,
      providerId: 'trakt',
      type: 'mixed',
      category: 'watchlist',
      name: 'My Watchlist',
      items,
      sourceInfo,
      paginationInfo,
    })
  }

  /**
   * Create Catalog from Trakt collection items
   */
  static fromCollectionItems(
    collectionItems: TraktCollectionItem[],
    userId: string,
    paginationHeaders?: TraktPaginationHeaders
  ): Catalog {
    const items: CatalogItem[] = collectionItems
      .map((item, index) => {
        if (item.movie) {
          return {
            stableId: `collection-${userId}-movie-${item.movie.ids.trakt}`,
            media: TraktMediaMapper.fromMovie(item.movie),
            position: index + 1,
          }
        }

        if (item.show) {
          return {
            stableId: `collection-${userId}-show-${item.show.ids.trakt}`,
            media: TraktMediaMapper.fromShow(item.show),
            position: index + 1,
          }
        }

        return null
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)

    const sourceInfo: CatalogSourceInfo = {
      totalCount: paginationHeaders?.['X-Pagination-Item-Count'],
      lastUpdated: new Date(),
    }

    const paginationInfo: CatalogPaginationInfo = {
      currentPage: paginationHeaders?.['X-Pagination-Page'] || 1,
      totalPages: paginationHeaders?.['X-Pagination-Page-Count'],
      hasMore: this.hasMorePages(paginationHeaders),
      limit: paginationHeaders?.['X-Pagination-Limit'],
    }

    return new Catalog({
      id: `collection-${userId}`,
      providerId: 'trakt',
      type: 'mixed',
      category: 'collection',
      name: 'My Collection',
      items,
      sourceInfo,
      paginationInfo,
    })
  }

  /**
   * Extract time period from category name for Trakt trending/popular catalogs
   */
  private static extractPeriodFromCategory(category: string): string | undefined {
    const lowerCategory = category.toLowerCase()
    if (lowerCategory.includes('daily')) return 'daily'
    if (lowerCategory.includes('weekly')) return 'weekly'
    if (lowerCategory.includes('monthly')) return 'monthly'
    if (lowerCategory.includes('yearly')) return 'yearly'
    return 'all'
  }

  /**
   * Check if there are more pages available
   */
  private static hasMorePages(paginationHeaders?: TraktPaginationHeaders): boolean {
    if (!paginationHeaders) return false

    const currentPage = paginationHeaders['X-Pagination-Page'] || 1
    const totalPages = paginationHeaders['X-Pagination-Page-Count']

    return totalPages ? currentPage < totalPages : false
  }
}
