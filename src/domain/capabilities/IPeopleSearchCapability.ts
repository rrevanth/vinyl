import type { Catalog } from '../entities/Catalog'
import type { Result } from '../types/Result'

/**
 * People Search Capability - Search for people (actors, directors, etc.)
 */
export interface IPeopleSearchCapability {
  /**
   * Search for people by name
   * @param query - Search query (person name)
   * @param filters - Optional filters (role, popularity, etc.)
   * @returns Catalog containing matching people
   */
  searchPeople(query: string, filters?: Record<string, any>): Promise<Result<Catalog>>

  /**
   * Get popular/trending people
   * @param category - Category filter (actors, directors, etc.)
   * @returns Catalog containing popular people
   */
  getPopularPeople(category?: string): Promise<Result<Catalog>>
}
