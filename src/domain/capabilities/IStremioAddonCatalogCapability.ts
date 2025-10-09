import type { StremioAddonCatalogRequest } from '../entities/StremioRequests'
import type { StremioAddon } from '../entities/StremioAddon'
import type { Result } from '../types/Result'

/**
 * Response from a Stremio addon catalog endpoint
 * Contains a list of available addons that can be installed
 */
export interface StremioAddonCatalogResponse {
  addons: StremioAddon[]
  cacheMaxAge?: number
}

/**
 * Capability interface for Stremio addons that provide addon catalogs
 *
 * This capability allows addons to act as addon directories/stores,
 * providing lists of other addons that users can discover and install.
 *
 * Examples:
 * - Cinemeta addon provides official and community addon catalogs
 * - Community addon repositories
 * - Curated addon collections
 */
export interface IStremioAddonCatalogCapability {
  /**
   * Get addon catalog from the provider
   *
   * @param request Catalog request specifying filters and pagination
   * @returns Promise resolving to list of available addons
   *
   * @example
   * ```typescript
   * // Get official addons
   * const request = StremioRequestFactory.createAddonCatalogRequest({
   *   addonId: 'com.linvo.cinemeta',
   *   transportUrl: 'https://v3-cinemeta.strem.io/manifest.json',
   *   catalogType: 'all',
   *   catalogId: 'official'
   * })
   *
   * const response = await addon.getAddonCatalog(request)
   * console.log(`Found ${response.addons.length} official addons`)
   * ```
   */
  getAddonCatalog(request: StremioAddonCatalogRequest): Promise<Result<StremioAddonCatalogResponse>>
}
