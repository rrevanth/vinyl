import type { ICatalogRepository } from '@/src/domain/repositories/ICatalogRepository'
import type { Catalog } from '@/src/domain/entities'
import { catalogCache$ } from '@/src/presentation/shared/stores/app.store'

/**
 * CatalogRepository implementation
 * Handles catalog caching using Legend State observables
 * Provides efficient catalog storage and retrieval
 */
export class CatalogRepository implements ICatalogRepository {
  /**
   * Get cached catalogs
   * Returns all catalogs from cache
   */
  getCachedCatalogs(): Catalog[] {
    return catalogCache$.get()
  }

  /**
   * Get cached catalog by stable ID
   * Returns a specific catalog from cache
   */
  getCachedCatalog(stableId: string): Catalog | null {
    const catalogs = catalogCache$.get()
    return catalogs.find((catalog) => catalog.stableId === stableId) ?? null
  }

  /**
   * Cache a catalog
   * Stores catalog data for future retrieval
   */
  async cacheCatalog(catalog: Catalog): Promise<void> {
    const currentCatalogs = catalogCache$.get()
    const existingIndex = currentCatalogs.findIndex(
      (c) => c.stableId === catalog.stableId
    )

    if (existingIndex >= 0) {
      // Update existing catalog
      const updatedCatalogs = [...currentCatalogs]
      updatedCatalogs[existingIndex] = catalog
      catalogCache$.set(updatedCatalogs)
    } else {
      // Add new catalog
      catalogCache$.set([...currentCatalogs, catalog])
    }
  }

  /**
   * Cache multiple catalogs
   * Batch operation for storing multiple catalogs
   */
  async cacheCatalogs(catalogs: Catalog[]): Promise<void> {
    const currentCatalogs = catalogCache$.get()
    const catalogMap = new Map(
      currentCatalogs.map((c) => [c.stableId, c])
    )

    // Update or add catalogs
    catalogs.forEach((catalog) => {
      catalogMap.set(catalog.stableId, catalog)
    })

    catalogCache$.set(Array.from(catalogMap.values()))
  }

  /**
   * Clear catalog cache
   * Removes all cached catalogs
   */
  async clearCatalogCache(): Promise<void> {
    catalogCache$.set([])
  }

  /**
   * Clear expired catalogs
   * Removes only expired catalogs from cache
   */
  async clearExpiredCatalogs(): Promise<void> {
    const currentCatalogs = catalogCache$.get()
    const validCatalogs = currentCatalogs.filter((catalog) => !catalog.isExpired())
    catalogCache$.set(validCatalogs)
  }

  /**
   * Get catalog by provider and category
   * Returns cached catalog matching provider and category filters
   */
  getCatalogByProviderAndCategory(
    providerId: string,
    category: string
  ): Catalog | null {
    const catalogs = catalogCache$.get()
    return (
      catalogs.find(
        (catalog) =>
          catalog.providerId === providerId && catalog.category === category
      ) ?? null
    )
  }
}
