import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import { StremioAddon } from '@/src/domain/entities/StremioAddon'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { HttpClient } from '@/src/infrastructure/http/HttpClient'
import type { StremioManifestQueryCache } from '@/src/infrastructure/providers/stremio/cache/StremioManifestQueryCache'
import type { StremioProcessedAddonCache } from '@/src/infrastructure/providers/stremio/cache/StremioProcessedAddonCache'
import { StremioAddonClient } from '@/src/infrastructure/providers/stremio/clients/StremioAddonClient'
import type { AddonOperationResult } from './StremioAddonsUseCase'

/**
 * Use case for browsing and searching Stremio addon catalogs
 * Handles addon discovery, preview, search, and filtering
 */
export class StremioAddonCatalogUseCase {
  constructor(
    private readonly manifestCache: StremioManifestQueryCache,
    private readonly processedAddonCache: StremioProcessedAddonCache,
    private readonly httpClient: HttpClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Search addons by query string
   * Returns filtered array of StremioAddon entities
   */
  async searchAddons(query: string, addons: StremioAddon[]): Promise<StremioAddon[]> {
    try {
      this.logger.debug('Searching addons', { query, totalAddons: addons.length })

      if (!query.trim()) {
        return addons
      }

      const lowercaseQuery = query.toLowerCase()

      const filtered = addons.filter((addon) => {
        // Search in name
        if (addon.name.toLowerCase().includes(lowercaseQuery)) {
          return true
        }

        // Search in description
        if (addon.description?.toLowerCase().includes(lowercaseQuery)) {
          return true
        }

        // Search in addon ID
        if (addon.id.toLowerCase().includes(lowercaseQuery)) {
          return true
        }

        // Search in custom name
        if (addon.customName?.toLowerCase().includes(lowercaseQuery)) {
          return true
        }

        return false
      })

      this.logger.debug('Search completed', {
        query,
        totalAddons: addons.length,
        matchedAddons: filtered.length,
      })

      return filtered
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to search addons', error as Error, { query })
      throw new Error(`Search failed: ${errorMsg}`)
    }
  }

  /**
   * Filter addons by capability
   * Returns filtered array of StremioAddon entities
   */
  async filterByCapability(
    capability: CapabilityType,
    addons: StremioAddon[]
  ): Promise<StremioAddon[]> {
    try {
      this.logger.debug('Filtering addons by capability', {
        capability,
        totalAddons: addons.length,
      })

      const filtered = addons.filter((addon) => addon.hasCapability(capability))

      this.logger.debug('Filter completed', {
        capability,
        totalAddons: addons.length,
        matchedAddons: filtered.length,
      })

      return filtered
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to filter addons by capability', error as Error, { capability })
      throw new Error(`Filter failed: ${errorMsg}`)
    }
  }

  /**
   * Preview an addon from a manifest URL
   * Returns result object with addon data if valid
   */
  async previewAddon(manifestUrl: string): Promise<AddonOperationResult> {
    try {
      this.logger.info('Previewing addon', { manifestUrl })

      // Get processed addon data (includes validation)
      const processedAddon = await this.processedAddonCache.getProcessedAddon(manifestUrl)

      if (!processedAddon.isValid) {
        return {
          success: false,
          error: `Invalid addon: ${processedAddon.validationResult.errors.join(', ')}`,
        }
      }

      if (!processedAddon.isCompatible) {
        return {
          success: false,
          error: `Addon is not compatible: ${processedAddon.capabilitySummary}`,
        }
      }

      // Create StremioAddon entity for preview
      const addon = new StremioAddon({
        manifest: processedAddon.rawManifest,
        transportUrl: manifestUrl,
        capabilities: processedAddon.capabilities?.capabilities || [],
        isInstalled: false,
        isEnabled: false,
      })

      this.logger.info('Addon preview successful', {
        manifestUrl,
        addonId: addon.id,
        addonName: addon.name,
      })

      return {
        success: true,
        addon,
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to preview addon', error as Error, { manifestUrl })

      return {
        success: false,
        error: `Preview failed: ${errorMsg}`,
      }
    }
  }

  /**
   * Get addon compatibility information
   * Returns detailed compatibility check
   */
  async checkAddonCompatibility(manifestUrl: string): Promise<{
    isCompatible: boolean
    issues: string[]
    warnings: string[]
    capabilities: CapabilityType[]
  }> {
    try {
      this.logger.debug('Checking addon compatibility', { manifestUrl })

      const processedAddon = await this.processedAddonCache.getProcessedAddon(manifestUrl)

      const result = {
        isCompatible: processedAddon.isCompatible,
        issues: processedAddon.validationResult.errors,
        warnings: processedAddon.validationResult.warnings,
        capabilities: processedAddon.capabilities?.capabilities || [],
      }

      this.logger.debug('Compatibility check completed', {
        manifestUrl,
        isCompatible: result.isCompatible,
        issues: result.issues.length,
        warnings: result.warnings.length,
        capabilities: result.capabilities.length,
      })

      return result
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to check addon compatibility', error as Error, { manifestUrl })

      return {
        isCompatible: false,
        issues: [errorMsg],
        warnings: [],
        capabilities: [],
      }
    }
  }

  /**
   * Prefetch addon data for better performance
   * Does not throw on failure - prefetch is non-critical
   */
  async prefetchAddon(manifestUrl: string): Promise<void> {
    try {
      this.logger.debug('Prefetching addon', { manifestUrl })

      await this.processedAddonCache.prefetchProcessedAddon(manifestUrl)

      this.logger.debug('Addon prefetch completed', { manifestUrl })
    } catch (error) {
      this.logger.warn('Failed to prefetch addon', { manifestUrl, error })
      // Don't throw - prefetch failures are non-critical
    }
  }

  /**
   * Batch prefetch multiple addons
   * Does not throw on failure - prefetch is non-critical
   */
  async batchPrefetchAddons(manifestUrls: string[]): Promise<void> {
    try {
      this.logger.debug('Batch prefetching addons', { count: manifestUrls.length })

      await this.processedAddonCache.batchProcessAddons(manifestUrls)

      this.logger.debug('Batch prefetch completed', { count: manifestUrls.length })
    } catch (error) {
      this.logger.warn('Failed to batch prefetch addons', { count: manifestUrls.length, error })
      // Don't throw - prefetch failures are non-critical
    }
  }

  /**
   * Get addon catalogs from installed addons with STREMIO_ADDON_CATALOG capability
   * Returns array of addons that provide addon catalog endpoints
   */
  async getAddonCatalogsFromInstalledAddons(
    installedAddons: StremioAddon[]
  ): Promise<
    {
      addonId: string
      addonName: string
      transportUrl: string
      catalogs: { type: string; id: string; name: string }[]
    }[]
  > {
    try {
      // Filter addons with STREMIO_ADDON_CATALOG capability AND that are enabled
      const addonsWithCatalog = installedAddons.filter(
        (addon) =>
          addon.isEnabled && addon.hasCapability(CapabilityType.STREMIO_ADDON_CATALOG as CapabilityType)
      )

      const results = []

      // Only include addons that have addonCatalogs array with entries
      for (const addon of addonsWithCatalog) {
        if (addon.manifest.addonCatalogs && addon.manifest.addonCatalogs.length > 0) {
          results.push({
            addonId: addon.id,
            addonName: addon.getDisplayName(),
            transportUrl: addon.transportUrl,
            catalogs: addon.manifest.addonCatalogs,
          })
        }
      }

      this.logger.debug('Found addon catalog sources', {
        totalInstalled: installedAddons.length,
        withCapability: addonsWithCatalog.length,
        withCatalogs: results.length,
      })

      return results
    } catch (error) {
      this.logger.error('Failed to get addon catalogs from installed addons', error as Error)

      // Return empty array instead of throwing - this is a non-critical failure
      return []
    }
  }

  /**
   * Browse specific addon catalog by type and id
   * Returns array of StremioAddon entities from the catalog response
   *
   * @param addonTransportUrl - Full transport URL of the addon providing the catalog
   * @param type - Catalog type (e.g., 'all', 'movie', 'series')
   * @param id - Catalog id (e.g., 'official', 'community')
   * @returns Array of StremioAddon entities or error result
   */
  async browseSpecificAddonCatalog(
    addonTransportUrl: string,
    type: string,
    id: string
  ): Promise<{
    success: boolean
    addons?: StremioAddon[]
    error?: string
  }> {
    try {
      // Create client and fetch addon catalog
      const client = new StremioAddonClient(addonTransportUrl, this.httpClient)
      const response = await client.getAddonCatalog(type, id)

      // Convert addon manifests to StremioAddon entities
      const addons: StremioAddon[] = []
      let skippedInvalid = 0

      for (const addonManifest of response.addons) {
        try {
          // Skip localhost/invalid URLs (these shouldn't be in public catalogs)
          if (
            addonManifest.transportUrl.includes('127.0.0.1') ||
            addonManifest.transportUrl.includes('localhost') ||
            addonManifest.transportUrl.includes('0.0.0.0')
          ) {
            skippedInvalid++
            continue
          }

          // Validate URL format
          try {
            new URL(addonManifest.transportUrl)
          } catch {
            skippedInvalid++
            continue
          }

          // Safely parse manifest with defaults
          const manifest = this.safelyParseManifest(addonManifest.manifest)

          // Skip if manifest is invalid
          if (!manifest) {
            skippedInvalid++
            continue
          }

          // Extract capabilities from manifest resources
          const capabilities = this.extractCapabilitiesFromManifest(manifest)

          // Create StremioAddon entity from catalog response (for browsing only)
          // Fresh manifest will be fetched and validated during installation
          const addon = new StremioAddon({
            manifest: manifest as any,
            transportUrl: addonManifest.transportUrl,
            capabilities,
            isInstalled: false,
            isEnabled: false,
          })

          addons.push(addon)
        } catch {
          // Silently skip addons that fail to process - this is normal for broken/offline addons
          skippedInvalid++
          continue
        }
      }

      if (skippedInvalid > 0) {
        this.logger.warn('Some addons were skipped during catalog browse', {
          totalInCatalog: response.addons.length,
          successfullyProcessed: addons.length,
          skippedInvalid,
        })
      }

      return {
        success: true,
        addons,
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to browse addon catalog', error as Error, {
        addonTransportUrl,
        type,
        id,
      })

      return {
        success: false,
        error: `Failed to browse catalog: ${errorMsg}`,
      }
    }
  }

  /**
   * Make catalog IDs unique by combining id, type, and index
   * Prevents Legend State duplicate ID warnings
   */
  private makeUniqueCatalogId(catalog: any, index: number): string {
    const id = catalog.id || 'unknown'
    const type = catalog.type || 'all'
    return `${id}-${type}-${index}`
  }

  /**
   * Safely filter array to remove undefined/null values
   */
  private filterValidArrayElements<T>(arr: any): T[] {
    if (!Array.isArray(arr)) {
      return []
    }
    return arr.filter((item) => item !== null && item !== undefined)
  }

  /**
   * Safely parse manifest from catalog response
   * Handles missing or malformed fields gracefully
   */
  private safelyParseManifest(rawManifest: any): any {
    if (!rawManifest || typeof rawManifest !== 'object') {
      return null
    }

    // Required fields
    if (!rawManifest.id || !rawManifest.name) {
      return null
    }

    // Parse and sanitize catalogs with unique IDs
    const rawCatalogs = this.filterValidArrayElements(rawManifest.catalogs)
    const catalogs = rawCatalogs.map((catalog, index) => {
      if (!catalog || typeof catalog !== 'object') {
        return null
      }
      return {
        ...catalog,
        id: this.makeUniqueCatalogId(catalog, index),
      }
    }).filter((c) => c !== null)

    // Parse and sanitize addon catalogs with unique IDs
    const rawAddonCatalogs = this.filterValidArrayElements(rawManifest.addonCatalogs)
    const addonCatalogs = rawAddonCatalogs.length > 0
      ? rawAddonCatalogs.map((catalog, index) => {
          if (!catalog || typeof catalog !== 'object') {
            return null
          }
          return {
            ...catalog,
            id: this.makeUniqueCatalogId(catalog, index),
          }
        }).filter((c) => c !== null)
      : undefined

    // Parse and sanitize resources
    const resources = this.filterValidArrayElements(rawManifest.resources)

    // Parse and sanitize types and idPrefixes
    const types = this.filterValidArrayElements(rawManifest.types)
    const idPrefixes = this.filterValidArrayElements(rawManifest.idPrefixes)

    // Build safe manifest with defaults
    return {
      id: String(rawManifest.id),
      name: String(rawManifest.name),
      version: rawManifest.version ? String(rawManifest.version) : '1.0.0',
      description: rawManifest.description ? String(rawManifest.description) : '',
      catalogs,
      resources,
      types,
      idPrefixes,
      background: rawManifest.background ? String(rawManifest.background) : undefined,
      logo: rawManifest.logo ? String(rawManifest.logo) : undefined,
      contactEmail: rawManifest.contactEmail ? String(rawManifest.contactEmail) : undefined,
      behaviorHints: rawManifest.behaviorHints && typeof rawManifest.behaviorHints === 'object'
        ? rawManifest.behaviorHints
        : {},
      addonCatalogs,
    }
  }

  /**
   * Extract capabilities from manifest resources
   * Basic capability detection from manifest structure
   */
  private extractCapabilitiesFromManifest(manifest: any): CapabilityType[] {
    const capabilities: CapabilityType[] = []

    if (!manifest || !manifest.resources || !Array.isArray(manifest.resources)) {
      return capabilities
    }

    // Check for resource types
    const resourceNames = new Set<string>()

    for (const resource of manifest.resources) {
      if (typeof resource === 'string') {
        resourceNames.add(resource.toLowerCase())
      } else if (resource && typeof resource === 'object' && resource.name) {
        resourceNames.add(resource.name.toLowerCase())
      }
    }

    // Map resources to capabilities
    if (resourceNames.has('stream')) {
      capabilities.push(CapabilityType.MEDIA_STREAMS)
    }
    if (resourceNames.has('meta')) {
      capabilities.push(CapabilityType.MEDIA_METADATA)
    }
    if (resourceNames.has('catalog')) {
      capabilities.push(CapabilityType.MEDIA_CATALOG)
    }
    if (resourceNames.has('subtitles')) {
      capabilities.push(CapabilityType.MEDIA_SUBTITLES)
    }

    // Check for addon_catalog (special capability)
    if (manifest.addonCatalogs && Array.isArray(manifest.addonCatalogs)) {
      capabilities.push(CapabilityType.STREMIO_ADDON_CATALOG)
    }

    return capabilities
  }
}
