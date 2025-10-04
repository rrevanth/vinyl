import type { Catalog } from '../entities/Catalog'
import type { CatalogFilters } from '../entities/StableIdGenerator'

/**
 * Media Catalog Capability - Returns multiple catalogs that the provider supports
 */
export interface IMediaCatalogCapability {
  /**
   * Get all catalogs this provider supports, optionally filtered
   * @param filters - Optional filters to apply (genre, year, etc.)
   * @returns Array of catalogs this provider can provide
   */
  getCatalogs(filters?: CatalogFilters): Promise<Catalog[]>

  /**
   * Load more items for a specific catalog (pagination)
   * @param catalog - The catalog to load more items for
   * @returns Updated catalog with new items appended
   */
  loadMoreItems(catalog: Catalog): Promise<Catalog>
}
