import type { IPeopleCatalogsCapability } from '@/src/domain/capabilities/IPeopleCatalogsCapability'
import { Catalog } from '@/src/domain/entities/Catalog'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

/**
 * Trakt People Catalogs Capability
 *
 * Note: Trakt API does not provide dedicated people catalog endpoints like:
 * - Popular people
 * - Trending people
 * - People by genre/criteria
 *
 * Unlike TMDB which has /person/popular and trending endpoints, Trakt's
 * people data is primarily accessed through search or as part of movie/show credits.
 *
 * To get people catalogs from Trakt, you would need to:
 * 1. Aggregate from popular movies/shows and extract cast/crew
 * 2. Use TMDB as the catalog provider for people lists
 * 3. Implement a custom catalog aggregation service
 * 4. Use Trakt lists that contain people (if community-created)
 *
 * This capability returns empty catalogs as a placeholder.
 */
export class TraktPeopleCatalogsCapability implements IPeopleCatalogsCapability {
  constructor(private readonly logger: ILoggingService) {}

  /**
   * Get catalogs of people (popular actors, directors, etc.)
   * Returns empty array since Trakt doesn't provide people catalog endpoints
   */
  async getPeopleCatalogs(category?: string): Promise<Catalog[]> {
    this.logger.warn(
      `Trakt API does not provide people catalog endpoints (category: ${category || 'none'}). ` +
        `Consider using TMDB provider for people catalogs instead.`
    )

    // Return empty array - people catalogs not available from Trakt
    return []
  }

  /**
   * Get people trending in different time periods
   * Returns empty catalog since Trakt doesn't provide trending people endpoint
   */
  async getTrendingPeople(timeWindow?: string): Promise<Catalog> {
    this.logger.warn(
      `Trakt API does not provide trending people endpoint (timeWindow: ${timeWindow || 'none'}). ` +
        `Consider using TMDB provider for trending people instead.`
    )

    // Return empty catalog - trending people not available from Trakt
    return new Catalog({
      id: 'trakt_people_trending_unavailable',
      providerId: 'trakt',
      name: 'Trending People (Unavailable)',
      type: 'person',
      category: 'trending',
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
        limit: 0,
      },
    })
  }

  /**
   * Get people by specific criteria
   * Returns empty catalog since Trakt doesn't provide people filtering endpoints
   */
  async getPeopleByCriteria(criteria: Record<string, any>): Promise<Catalog> {
    this.logger.warn(
      `Trakt API does not provide people filtering endpoints (criteria: ${JSON.stringify(criteria)}). ` +
        `Consider using TMDB provider for people filtering instead.`
    )

    // Return empty catalog - criteria-based people search not available from Trakt
    return new Catalog({
      id: 'trakt_people_criteria_unavailable',
      providerId: 'trakt',
      name: 'People by Criteria (Unavailable)',
      type: 'person',
      category: 'filtered',
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
        limit: 0,
      },
    })
  }
}