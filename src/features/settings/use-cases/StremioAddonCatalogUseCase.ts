import type { StremioManifestQueryCache } from '@/src/infrastructure/providers/stremio/cache/StremioManifestQueryCache'
import type { StremioProcessedAddonCache } from '@/src/infrastructure/providers/stremio/cache/StremioProcessedAddonCache'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'
import type { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { AddonOperationResult } from './StremioAddonsUseCase'

/**
 * Use case for browsing and searching Stremio addon catalogs
 * Handles addon discovery, preview, search, and filtering
 */
export class StremioAddonCatalogUseCase {
  constructor(
    private readonly manifestCache: StremioManifestQueryCache,
    private readonly processedAddonCache: StremioProcessedAddonCache,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Browse addons from a catalog URL
   * Returns array of StremioAddon entities
   */
  async browseAddonCatalog(catalogUrl: string): Promise<StremioAddon[]> {
    try {
      this.logger.info('Browsing addon catalog', { catalogUrl })

      // For now, return empty array
      // TODO: Implement catalog fetching when catalog endpoint is available
      // This would involve:
      // 1. Fetching the catalog manifest
      // 2. Getting addon_catalog resource
      // 3. Processing each addon entry
      // 4. Creating StremioAddon entities

      this.logger.info('Catalog browsed successfully', {
        catalogUrl,
        count: 0,
      })

      return []
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to browse addon catalog', error as Error, { catalogUrl })
      throw new Error(`Failed to browse catalog: ${errorMsg}`)
    }
  }

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
      const addon = new (await import('@/src/domain/entities/StremioAddon')).StremioAddon({
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
}
