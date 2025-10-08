import type { IMediaSearchCapability } from '@/src/domain/capabilities/IMediaSearchCapability'
import type { Catalog } from '@/src/domain/entities/Catalog'
import { Catalog as CatalogEntity } from '@/src/domain/entities/Catalog'
import { StableIdGenerator } from '@/src/domain/entities/StableIdGenerator'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import { TraktMediaMapper } from '../mappers/TraktMediaMapper'

/**
 * Trakt Media Search Capability
 * Provides search functionality across movies and TV shows with Trakt's extended=full parameter
 */
export class TraktMediaSearchCapability implements IMediaSearchCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  async searchMedia(query: string, filters?: Record<string, any>): Promise<Catalog[]> {
    if (!query || query.trim().length < 2) {
      return []
    }

    try {
      this.logger.debug(`Searching Trakt for: ${query}`)

      // Use Trakt search with extended=full for immediate rich data
      const searchResults = await this.traktClient.search.searchAll(query, {
        extended: 'full,images',
        limit: filters?.limit || 20,
      })

      const catalogItems: any[] = []

      for (const result of searchResults) {
        try {
          if (result.type === 'movie' && result.movie) {
            const movieMedia = TraktMediaMapper.movieToMedia(result.movie)
            catalogItems.push({
              stableId: StableIdGenerator.forCatalogItem(
                'trakt-search',
                movieMedia.stableId,
                catalogItems.length
              ),
              media: movieMedia,
            })
          } else if (result.type === 'show' && result.show) {
            const showMedia = TraktMediaMapper.showToMedia(result.show)
            catalogItems.push({
              stableId: StableIdGenerator.forCatalogItem(
                'trakt-search',
                showMedia.stableId,
                catalogItems.length
              ),
              media: showMedia,
            })
          }
          // Skip person and other result types for now
        } catch (error) {
          this.logger.warn(`Failed to map search result`, { result, error })
        }
      }

      // Create a single "Search Results" catalog
      const catalog = new CatalogEntity({
        id: `search-${query.replace(/[^a-zA-Z0-9]/g, '-')}`,
        providerId: 'trakt',
        type: 'mixed',
        category: 'search',
        name: `Search Results for "${query}"`,
        description: `Trakt search results for "${query}"`,
        items: catalogItems,
        sourceInfo: {
          originalUrl: '/search/query',
          totalCount: searchResults.length,
          lastUpdated: new Date(),
        },
        paginationInfo: {
          currentPage: 1,
          totalPages: 1,
          hasMore: false, // Trakt search doesn't have pagination in this endpoint
        },
      })

      this.logger.debug(`Search returned ${catalogItems.length} results for: ${query}`)
      return [catalog]
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to search Trakt for: ${query}`, err)
      throw err
    }
  }

  async loadMoreItems(catalog: Catalog): Promise<Catalog> {
    // Trakt's basic search endpoint doesn't support pagination
    // Return the original catalog unchanged
    this.logger.debug(`Trakt search does not support pagination, returning original catalog`)
    return catalog
  }
}