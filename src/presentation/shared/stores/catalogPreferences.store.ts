import { observable } from '@legendapp/state'

/**
 * Catalog UI preferences store - minimal state for catalog display
 *
 * This store ONLY contains UI preferences (order, hidden state).
 * Catalog data lives in TanStack Query cache.
 */
export const catalogPreferences$ = observable({
  /** Order of catalog IDs for display */
  catalogOrder: [] as string[],

  /** Hidden catalog IDs (user chose to hide) */
  hiddenCatalogIds: [] as string[],
})

/**
 * Set catalog display order
 */
export const setCatalogOrder = (catalogIds: string[]) => {
  catalogPreferences$.catalogOrder.set(catalogIds)
}

/**
 * Hide a catalog from homescreen
 */
export const hideCatalog = (catalogId: string) => {
  const hidden = catalogPreferences$.hiddenCatalogIds.get()
  if (!hidden.includes(catalogId)) {
    catalogPreferences$.hiddenCatalogIds.set([...hidden, catalogId])
  }
}

/**
 * Show a previously hidden catalog
 */
export const showCatalog = (catalogId: string) => {
  const hidden = catalogPreferences$.hiddenCatalogIds.get()
  catalogPreferences$.hiddenCatalogIds.set(hidden.filter(id => id !== catalogId))
}

/**
 * Toggle catalog visibility
 */
export const toggleCatalogVisibility = (catalogId: string) => {
  const hidden = catalogPreferences$.hiddenCatalogIds.get()
  if (hidden.includes(catalogId)) {
    showCatalog(catalogId)
  } else {
    hideCatalog(catalogId)
  }
}

/**
 * Check if catalog is hidden
 */
export const isCatalogHidden = (catalogId: string): boolean => {
  const hidden = catalogPreferences$.hiddenCatalogIds.get()
  return hidden.includes(catalogId)
}

/**
 * Reorder catalogs (move from oldIndex to newIndex)
 */
export const reorderCatalogs = (oldIndex: number, newIndex: number) => {
  const order = catalogPreferences$.catalogOrder.get()
  const newOrder = [...order]
  const [removed] = newOrder.splice(oldIndex, 1)
  newOrder.splice(newIndex, 0, removed)
  catalogPreferences$.catalogOrder.set(newOrder)
}
