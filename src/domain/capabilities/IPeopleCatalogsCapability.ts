import type { Catalog } from '../entities/Catalog'
import type { Result } from '../types/Result'

/**
 * People Catalogs Capability - Provides curated lists of people
 */
export interface IPeopleCatalogsCapability {
  /**
   * Get catalogs of people (popular actors, directors, etc.)
   * @param category - Category of people catalog (actors, directors, writers, etc.)
   * @returns Array of people catalogs
   */
  getPeopleCatalogs(category?: string): Promise<Result<Catalog[]>>

  /**
   * Get people trending in different time periods
   * @param timeWindow - Time window (day, week, all)
   * @returns Catalog of trending people
   */
  getTrendingPeople(timeWindow?: string): Promise<Result<Catalog>>

  /**
   * Get people by specific criteria
   * @param criteria - Search criteria (genre, era, nationality, etc.)
   * @returns Catalog of people matching criteria
   */
  getPeopleByCriteria(criteria: Record<string, any>): Promise<Result<Catalog>>
}
