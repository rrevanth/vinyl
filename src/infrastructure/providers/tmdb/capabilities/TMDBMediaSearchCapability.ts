import type { IMediaSearchCapability } from '../../../../domain/capabilities/IMediaSearchCapability'
import type { Catalog } from '../../../../domain/entities/Catalog'
import { Catalog as CatalogEntity } from '../../../../domain/entities/Catalog'
import type { TMDBClient } from '../../../api/tmdb/TMDBClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { TMDBMediaMapper } from '../../../mappers/tmdb/TMDBMediaMapper'
import { StableIdGenerator } from '../../../../domain/entities/StableIdGenerator'

/**
 * TMDB Media Search Capability
 * Provides search functionality across movies and TV shows, returning Catalog[] as required by IMediaSearchCapability
 */
export class TMDBMediaSearchCapability implements IMediaSearchCapability {
  constructor(
    private readonly tmdbClient: TMDBClient,
    private readonly logger: ILoggingService
  ) {}

  async searchMedia(query: string, filters?: Record<string, any>): Promise<Catalog[]> {
    if (!query || query.trim().length < 2) {
      return []
    }

    try {
      this.logger.debug(`Searching TMDB for: ${query}`)

      // Use TMDB multi-search to get both movies and TV shows
      const searchResults = await this.tmdbClient.search.searchAll(query, {
        page: filters?.page || 1,
        includeAdult: filters?.includeAdult || false,
      })

      const catalogItems: any[] = []

      for (const result of searchResults.results) {
        try {
          if (result.media_type === 'movie') {
            const movieMedia = TMDBMediaMapper.fromMovieResponse(result as any)
            catalogItems.push({
              stableId: StableIdGenerator.forCatalogItem(
                'tmdb-search',
                movieMedia.stableId,
                catalogItems.length
              ),
              media: movieMedia,
            })
          } else if (result.media_type === 'tv') {
            const tvMedia = TMDBMediaMapper.fromTVResponse(result as any)
            catalogItems.push({
              stableId: StableIdGenerator.forCatalogItem(
                'tmdb-search',
                tvMedia.stableId,
                catalogItems.length
              ),
              media: tvMedia,
            })
          }
          // Skip person results for now
        } catch (error) {
          this.logger.warn(`Failed to map search result`, { result, error })
        }
      }

      // Create a single "Search Results" catalog
      const catalog = new CatalogEntity({
        id: `search-${query.replace(/[^a-zA-Z0-9]/g, '-')}`,
        providerId: 'tmdb',
        type: 'mixed',
        category: 'search',
        name: `Search Results for "${query}"`,
        description: `TMDB search results for "${query}"`,
        items: catalogItems,
        sourceInfo: {
          originalUrl: '/search/multi',
          totalCount: searchResults.total_results,
          lastUpdated: new Date(),
        },
        paginationInfo: {
          currentPage: searchResults.page,
          totalPages: searchResults.total_pages,
          hasMore: searchResults.page < searchResults.total_pages,
        },
      })

      this.logger.debug(`Search returned ${catalogItems.length} results for: ${query}`)
      return [catalog]
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to search TMDB for: ${query}`, err)
      throw err
    }
  }

  async loadMoreItems(catalog: Catalog): Promise<Catalog> {
    // Extract query from catalog ID
    const query = catalog.id.replace('search-', '').replace(/-/g, ' ')
    const nextPage = catalog.paginationInfo.currentPage + 1

    try {
      const searchResults = await this.tmdbClient.search.searchAll(query, {
        page: nextPage,
        includeAdult: false,
      })

      const newItems: any[] = []

      for (const result of searchResults.results) {
        try {
          if (result.media_type === 'movie') {
            const movieMedia = TMDBMediaMapper.fromMovieResponse(result as any)
            newItems.push({
              stableId: StableIdGenerator.forCatalogItem(
                'tmdb-search',
                movieMedia.stableId,
                catalog.items.length + newItems.length
              ),
              media: movieMedia,
            })
          } else if (result.media_type === 'tv') {
            const tvMedia = TMDBMediaMapper.fromTVResponse(result as any)
            newItems.push({
              stableId: StableIdGenerator.forCatalogItem(
                'tmdb-search',
                tvMedia.stableId,
                catalog.items.length + newItems.length
              ),
              media: tvMedia,
            })
          }
        } catch (error) {
          this.logger.warn(`Failed to map search result in loadMore`, { result, error })
        }
      }

      // Append new items to existing catalog
      return catalog.appendItems(newItems, {
        currentPage: searchResults.page,
        totalPages: searchResults.total_pages,
        hasMore: searchResults.page < searchResults.total_pages,
      })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to load more search results for: ${query}`, err)
      throw err
    }
  }
}
