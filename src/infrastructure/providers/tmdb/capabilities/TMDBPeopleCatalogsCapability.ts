import type { IPeopleCatalogsCapability } from '../../../../domain/capabilities/IPeopleCatalogsCapability'
import { Catalog, type CatalogItem } from '../../../../domain/entities/Catalog'
import type { TMDBClient } from '../../../api/tmdb/TMDBClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { TMDBPersonMapper } from '../../../mappers/tmdb/entities/TMDBPersonMapper'
import type { TMDBPaginatedResponse, TMDBPersonResponse } from '../../../api/tmdb/types'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * TMDB People Catalogs Capability
 *
 * Provides people catalogs including popular people, trending actors/directors,
 * and categorized person lists for discovery and browsing.
 */
export class TMDBPeopleCatalogsCapability implements IPeopleCatalogsCapability {
  constructor(
    private readonly tmdbClient: TMDBClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get available people catalogs
   */
  async getPeopleCatalogs(category?: string): Promise<Result<Catalog[]>> {
    try {
      this.logger.debug('Fetching people catalogs', { category })

      // Fetch multiple people catalogs in parallel
      const [popularPeople, trendingDay, trendingWeek] = await Promise.allSettled([
        this.getPopularPeopleCatalog(),
        this.getTrendingPeopleCatalog('day'),
        this.getTrendingPeopleCatalog('week'),
      ])

      const catalogs: Catalog[] = []

      // Add successful catalogs
      if (popularPeople.status === 'fulfilled') {
        catalogs.push(popularPeople.value)
      } else {
        this.logger.warn('Failed to fetch popular people catalog', popularPeople.reason)
      }

      if (trendingDay.status === 'fulfilled') {
        catalogs.push(trendingDay.value)
      } else {
        this.logger.warn('Failed to fetch trending people (day) catalog', trendingDay.reason)
      }

      if (trendingWeek.status === 'fulfilled') {
        catalogs.push(trendingWeek.value)
      } else {
        this.logger.warn('Failed to fetch trending people (week) catalog', trendingWeek.reason)
      }

      this.logger.debug(`Generated ${catalogs.length} people catalogs`)

      return ok(catalogs, 'tmdb')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to get people catalogs', err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  /**
   * Get people trending in different time periods
   */
  async getTrendingPeople(timeWindow?: string): Promise<Result<Catalog>> {
    const period = (timeWindow === 'week' ? 'week' : 'day') as 'day' | 'week'

    try {
      const catalog = await this.getTrendingPeopleCatalog(period)
      return ok(catalog, 'tmdb')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get trending people for ${period}`, err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  /**
   * Get people by specific criteria
   */
  async getPeopleByCriteria(criteria: Record<string, any>): Promise<Result<Catalog>> {
    try {
      this.logger.debug('Getting people by criteria', { criteria })

      // For now, return popular people as a fallback
      // This could be enhanced to support genre filters, nationality, etc.
      const response = await this.tmdbClient.people.getPopularPeople()

      const catalog = this.createPeopleCatalog(
        response,
        `tmdb_people_criteria_${Date.now()}`,
        'People by Criteria',
        'People matching specified criteria'
      )

      return ok(catalog, 'tmdb')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to get people by criteria', err, { criteria })
      return fail(err, 'tmdb', 'api_error')
    }
  }

  /**
   * Create popular people catalog
   */
  private async getPopularPeopleCatalog(): Promise<Catalog> {
    const response = await this.tmdbClient.people.getPopularPeople()

    return this.createPeopleCatalog(
      response,
      'tmdb_people_popular',
      'Popular People',
      'Most popular people on TMDB'
    )
  }

  /**
   * Create trending people catalog
   */
  private async getTrendingPeopleCatalog(timeWindow: 'day' | 'week'): Promise<Catalog> {
    const response = await this.tmdbClient.discover.getTrendingPeople(timeWindow)

    const catalogId = `tmdb_people_trending_${timeWindow}`
    const catalogName = `Trending People ${timeWindow === 'day' ? 'Today' : 'This Week'}`
    const description = `People trending ${timeWindow === 'day' ? 'today' : 'this week'} on TMDB`

    return this.createPeopleCatalog(response, catalogId, catalogName, description)
  }

  /**
   * Helper method to create people catalog
   */
  private createPeopleCatalog(
    tmdbResponse: TMDBPaginatedResponse<TMDBPersonResponse>,
    catalogId: string,
    catalogName: string,
    description: string
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
      category: 'catalog',
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
