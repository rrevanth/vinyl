import type { IMediaListsSearchCapability } from '@/src/domain/capabilities/IMediaListsSearchCapability'
import type { Catalog } from '@/src/domain/entities/Catalog'
import { Catalog as CatalogEntity } from '@/src/domain/entities/Catalog'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { StableIdGenerator } from '@/src/domain/entities/StableIdGenerator'

/**
 * Trakt Media Lists Search Capability
 * Provides search functionality for curated lists
 */
export class TraktMediaListsSearchCapability implements IMediaListsSearchCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  async searchLists(query: string, filters?: Record<string, any>): Promise<Catalog> {
    if (!query || query.trim().length < 2) {
      return this.createEmptyListsCatalog(query)
    }

    try {
      this.logger.debug(`Searching Trakt lists for: ${query}`)

      // Search for lists
      const searchResults = await this.traktClient.search.searchLists(query, {
        limit: filters?.limit || 20,
      })

      // Map search results to catalog items
      const catalogItems = searchResults
        .filter(result => result.list !== null && result.list !== undefined)
        .map((result, index) => {
          const list = result.list!
          return {
            stableId: StableIdGenerator.forCatalogItem(
              'lists-search',
              list.ids.trakt.toString(),
              index
            ),
            list, // Store list metadata
            itemCount: list.item_count || 0,
            updatedAt: list.updated_at ? new Date(list.updated_at) : undefined,
          }
        })

      const catalog = new CatalogEntity({
        id: `lists-search-${query.replace(/[^a-zA-Z0-9]/g, '-')}`,
        providerId: 'trakt',
        type: 'mixed',
        category: 'lists',
        name: `Lists matching "${query}"`,
        description: `Trakt list search results for "${query}"`,
        items: catalogItems,
        sourceInfo: {
          originalUrl: '/search/list',
          totalCount: catalogItems.length,
          lastUpdated: new Date(),
        },
        paginationInfo: {
          currentPage: 1,
          totalPages: 1,
          hasMore: false, // Trakt list search doesn't support pagination in basic endpoint
        },
      })

      this.logger.debug(`List search returned ${catalogItems.length} results for: ${query}`)
      return catalog
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to search lists for: ${query}`, err)
      throw err
    }
  }

  async getListsByCreator(creatorId: string): Promise<Catalog[]> {
    try {
      this.logger.debug(`Getting lists by creator: ${creatorId}`)

      // Note: Trakt API requires authentication for user-specific operations
      // This would typically use the /users/:id/lists endpoint
      // For now, return empty array as placeholder

      this.logger.warn(
        `Getting lists by creator ${creatorId} requires authentication - not implemented`
      )

      return []
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get lists by creator: ${creatorId}`, err)
      throw err
    }
  }

  private createEmptyListsCatalog(query: string): Catalog {
    return new CatalogEntity({
      id: `lists-search-${query.replace(/[^a-zA-Z0-9]/g, '-')}`,
      providerId: 'trakt',
      type: 'mixed',
      category: 'lists',
      name: `Lists matching "${query}"`,
      description: `No results found for "${query}"`,
      items: [],
      sourceInfo: {
        originalUrl: '/search/list',
        totalCount: 0,
        lastUpdated: new Date(),
      },
    })
  }
}