import type { Catalog } from '@/src/domain/entities'

/**
 * Repository interface for catalog persistence and caching
 * Handles storing and retrieving catalog data
 */
export interface ICatalogRepository {
  /**
   * Get cached catalogs
   * Returns all catalogs from cache
   */
  getCachedCatalogs(): Catalog[]

  /**
   * Get cached catalog by stable ID
   * Returns a specific catalog from cache
   */
  getCachedCatalog(stableId: string): Catalog | null

  /**
   * Cache a catalog
   * Stores catalog data for future retrieval
   */
  cacheCatalog(catalog: Catalog): Promise<void>

  /**
   * Cache multiple catalogs
   * Batch operation for storing multiple catalogs
   */
  cacheCatalogs(catalogs: Catalog[]): Promise<void>

  /**
   * Clear catalog cache
   * Removes all cached catalogs
   */
  clearCatalogCache(): Promise<void>

  /**
   * Clear expired catalogs
   * Removes only expired catalogs from cache
   */
  clearExpiredCatalogs(): Promise<void>

  /**
   * Get catalog by provider and category
   * Returns cached catalog matching provider and category filters
   */
  getCatalogByProviderAndCategory(
    providerId: string,
    category: string
  ): Catalog | null
}
