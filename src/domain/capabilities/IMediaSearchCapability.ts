import type { Catalog } from '../entities/Catalog'
import type { Result } from '../types/Result'

/**
 * Media Search Capability - Search for media content with pagination support
 * Providers can organize search results by their own discretion (movies, TV, people, etc.)
 */
export interface IMediaSearchCapability {
  /**
   * Search for media by title/query
   * @param query - Search query string
   * @param filters - Optional search filters (media type, year range, etc.)
   * @returns Array of catalogs containing search results organized by provider preference
   */
  searchMedia(query: string, filters?: Record<string, any>): Promise<Result<Catalog[]>>

  /**
   * Load more items for a specific search result catalog (pagination)
   * @param catalog - The search result catalog to load more items for
   * @returns Updated catalog with new search results appended
   */
  loadMoreItems(catalog: Catalog): Promise<Result<Catalog>>
}
