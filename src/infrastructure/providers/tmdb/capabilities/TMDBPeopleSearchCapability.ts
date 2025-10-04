import type { IPeopleSearchCapability } from '../../../../domain/capabilities/IPeopleSearchCapability'
import { Catalog, type CatalogItem } from '../../../../domain/entities/Catalog'
import type { TMDBClient } from '../../../api/tmdb/TMDBClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { TMDBCatalogMapper } from '../../../mappers/tmdb/entities/TMDBCatalogMapper'
import { TMDBPersonMapper } from '../../../mappers/tmdb/entities/TMDBPersonMapper'
import type { TMDBPaginatedResponse, TMDBPersonResponse } from '../../../api/tmdb/types'

/**
 * TMDB People Search Capability
 *
 * Provides comprehensive people search functionality including name search,
 * popular people, trending actors/directors, and person discovery.
 */
export class TMDBPeopleSearchCapability implements IPeopleSearchCapability {
  constructor(
    private readonly tmdbClient: TMDBClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Search for people by name
   */
  async searchPeople(query: string, filters?: Record<string, any>): Promise<Catalog> {
    try {
      const page = filters?.page || 1
      const includeAdult = filters?.include_adult || false

      this.logger.debug(`Searching people for query: "${query}"`, {
        page,
        includeAdult,
      })

      const response = await this.tmdbClient.search.searchPeople({
        query,
        page,
        include_adult: includeAdult,
      })

      // Convert TMDB search results to Catalog
      const catalog = TMDBCatalogMapper.fromPersonSearch(response, query)

      this.logger.debug(`Found ${response.results?.length || 0} people for query: "${query}"`, {
        totalResults: response.total_results,
        totalPages: response.total_pages,
        currentPage: response.page,
      })

      return catalog
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to search people for query: "${query}"`, err)
      throw err
    }
  }

  /**
   * Get popular/trending people
   */
  async getPopularPeople(category?: string): Promise<Catalog> {
    try {
      this.logger.debug(`Getting popular people`, { category })

      let response: TMDBPaginatedResponse<TMDBPersonResponse>
      let catalogName: string
      let catalogDescription: string
      let catalogId: string

      if (category === 'trending_day') {
        // Get trending people (day)
        response = await this.tmdbClient.discover.getTrendingPeople('day')
        catalogName = 'Trending People Today'
        catalogDescription = 'People trending today on TMDB'
        catalogId = 'tmdb_people_trending_day'
      } else if (category === 'trending_week') {
        // Get trending people (week)
        response = await this.tmdbClient.discover.getTrendingPeople('week')
        catalogName = 'Trending People This Week'
        catalogDescription = 'People trending this week on TMDB'
        catalogId = 'tmdb_people_trending_week'
      } else {
        // Default to popular people
        response = await this.tmdbClient.people.getPopularPeople()
        catalogName = 'Popular People'
        catalogDescription = 'Most popular people on TMDB'
        catalogId = 'tmdb_people_popular'
      }

      // Convert TMDB response to Catalog using the person search method with custom name
      const catalog = this.createPeopleCatalog(response, catalogId, catalogName, {
        description: catalogDescription,
        category: category || 'popular',
      })

      this.logger.debug(`Retrieved ${response.results?.length || 0} popular people`, {
        category: category || 'popular',
        totalResults: response.total_results,
      })

      return catalog
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get popular people`, err, { category })
      throw err
    }
  }

  /**
   * Helper method to create people catalog with custom metadata
   */
  private createPeopleCatalog(
    tmdbResponse: TMDBPaginatedResponse<TMDBPersonResponse>,
    catalogId: string,
    catalogName: string,
    options: {
      description?: string
      category?: string
    } = {}
  ): Catalog {
    const items: CatalogItem[] = tmdbResponse.results.map((person) => ({
      stableId: '',
      person: TMDBPersonMapper.fromTMDB(person),
    }))

    return new Catalog({
      id: catalogId,
      providerId: 'tmdb',
      name: catalogName,
      type: 'person',
      category: options.category || 'popular',
      items,

      sourceInfo: {
        providerId: 'tmdb',
        apiVersion: 'v3',
        totalCount: tmdbResponse.total_results,
        lastUpdated: new Date(),
      },

      paginationInfo: {
        currentPage: tmdbResponse.page,
        totalPages: tmdbResponse.total_pages,
        hasMore: tmdbResponse.page < tmdbResponse.total_pages,
        offset: (tmdbResponse.page - 1) * 20,
        limit: 20,
      },
    })
  }
}
