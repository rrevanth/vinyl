import type { IPeopleSearchCapability } from '@/src/domain/capabilities/IPeopleSearchCapability'
import { Catalog, type CatalogItem } from '@/src/domain/entities/Catalog'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { TraktSearchResult } from '@/src/infrastructure/api/trakt/types/responses'
import { TraktPeopleMapper } from '@/src/infrastructure/providers/trakt/mappers/TraktPeopleMapper'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * Trakt People Search Capability
 *
 * Provides comprehensive people search functionality including name search
 * and popular people lists.
 *
 * Uses extended=full to get immediate complete person data without additional calls.
 */
export class TraktPeopleSearchCapability implements IPeopleSearchCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Search for people by name
   */
  async searchPeople(query: string, filters?: Record<string, any>): Promise<Result<Catalog>> {
    try {
      const limit = filters?.limit || 20
      const page = filters?.page || 1

      this.logger.debug(`Searching people for query: "${query}"`, {
        limit,
        page,
      })

      // Use extended=full to get complete person data immediately
      const searchResults = await this.traktClient.search.searchPeople(query, {
        extended: 'full,images',
        limit,
        page,
      })

      // Convert Trakt search results to Catalog
      const catalog = this.createPeopleCatalog(
        searchResults,
        `trakt_people_search_${query.replace(/\s+/g, '_')}`,
        `Search Results: "${query}"`,
        {
          description: `People matching "${query}"`,
          category: 'search',
        }
      )

      this.logger.debug(`Found ${searchResults.length} people for query: "${query}"`)

      return ok(catalog, "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to search people for query: "${query}"`, err)
      return fail(err, "trakt", "api_error")
    }
  }

  /**
   * Get popular people
   * Note: Trakt doesn't have a dedicated popular people endpoint,
   * so this returns an empty catalog for now
   */
  async getPopularPeople(category?: string): Promise<Result<Catalog>> {
    try {
      this.logger.debug(`Getting popular people`, { category })

      // Trakt API doesn't have a popular people endpoint like TMDB
      // We'll return an empty catalog for now
      // In a production app, you might want to:
      // 1. Use a curated list from Trakt lists
      // 2. Aggregate from popular movies/shows
      // 3. Use search with common actor names

      const catalogName = 'Popular People'
      const catalogId = 'trakt_people_popular'

      this.logger.warn('Trakt API does not provide a popular people endpoint')

      return ok(new Catalog({
        id: catalogId,
        providerId: 'trakt',
        name: catalogName,
        type: 'person',
        category: category || 'popular',
        items: [],

        sourceInfo: {
          providerId: 'trakt',
          apiVersion: 'v2',
          totalCount: 0,
          lastUpdated: new Date(),
        },

        paginationInfo: {
          currentPage: 1,
          totalPages: 1,
          hasMore: false,
          offset: 0,
          limit: 20,
        },
      }), "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get popular people`, err, { category })
      return fail(err, "trakt", "api_error")
    }
  }

  /**
   * Helper method to create people catalog from search results
   */
  private createPeopleCatalog(
    searchResults: TraktSearchResult[],
    catalogId: string,
    catalogName: string,
    options: {
      description?: string
      category?: string
    } = {}
  ): Catalog {
    const items: CatalogItem[] = searchResults
      .filter((result) => result.person) // Ensure person exists
      .map((result) => ({
        stableId: '',
        person: TraktPeopleMapper.toPerson(result.person!),
      }))

    return new Catalog({
      id: catalogId,
      providerId: 'trakt',
      name: catalogName,
      type: 'person',
      category: options.category || 'search',
      items,

      sourceInfo: {
        providerId: 'trakt',
        apiVersion: 'v2',
        totalCount: items.length,
        lastUpdated: new Date(),
      },

      paginationInfo: {
        currentPage: 1,
        totalPages: 1,
        hasMore: false,
        offset: 0,
        limit: items.length,
      },
    })
  }
}