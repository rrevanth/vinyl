import type { QueryClient } from '@tanstack/react-query'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { StremioManifestParser } from '../StremioManifestParser'
import type { ManifestValidationResult, ParsedCapabilities } from '../StremioManifestParser'
import type { StremioManifest, StremioTransportUrl } from '../types'
import type { StremioManifestQueryCache } from './StremioManifestQueryCache'
import { InfrastructureError } from '../../../errors/InfrastructureError'

/**
 * Processed addon data with comprehensive metadata
 */
export interface ProcessedAddonData {
  // Source data
  transportUrl: string
  rawManifest: StremioManifest

  // Processed results
  validationResult: ManifestValidationResult
  capabilities: ParsedCapabilities | null

  // Computed properties
  isValid: boolean
  isCompatible: boolean
  capabilitySummary: string

  // Processing metadata
  processedAt: Date
  processingVersion: string // Track parser version for cache invalidation
}

/**
 * TanStack Query-based cache for processed Stremio addon data
 *
 * Caches the expensive computation results from manifest parsing,
 * capability detection, and validation. This provides significant
 * performance improvements for addon browsing and management.
 */
export class StremioProcessedAddonCache {
  private readonly PROCESSING_VERSION = '1.0.0' // Bump when parser logic changes

  constructor(
    private readonly queryClient: QueryClient,
    private readonly manifestCache: StremioManifestQueryCache,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get processed addon data from cache or compute fresh if needed
   */
  async getProcessedAddon(transportUrl: StremioTransportUrl): Promise<ProcessedAddonData> {
    const queryKey = this.createProcessedAddonQueryKey(transportUrl)

    try {
      const processedData = await this.queryClient.fetchQuery({
        queryKey,
        queryFn: () => this.processAddon(transportUrl),
        staleTime: 12 * 60 * 60 * 1000, // 12 hours - processing rarely changes
        gcTime: 48 * 60 * 60 * 1000, // 48 hours - keep longer than raw manifest
        retry: 2, // Fewer retries since this is computation, not network
        retryDelay: 1000,
      })

      // Check if processing version has changed (cache invalidation)
      if (processedData.processingVersion !== this.PROCESSING_VERSION) {
        this.logger.debug(`Processing version mismatch for ${transportUrl}, reprocessing`, {
          cached: processedData.processingVersion,
          current: this.PROCESSING_VERSION,
        })

        await this.invalidateProcessedAddon(transportUrl)
        return this.getProcessedAddon(transportUrl) // Recursive call
      }

      this.logger.debug(`Retrieved processed addon data for ${transportUrl}`, {
        isValid: processedData.isValid,
        isCompatible: processedData.isCompatible,
        capabilities: processedData.capabilities?.capabilities.length || 0,
        fromCache: true,
      })

      return processedData
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get processed addon data for ${transportUrl}`, err)
      throw new InfrastructureError(`Failed to process Stremio addon from ${transportUrl}`, err)
    }
  }

  /**
   * Get only validation result (lightweight operation)
   */
  async getValidationResult(transportUrl: StremioTransportUrl): Promise<ManifestValidationResult> {
    const processedData = await this.getProcessedAddon(transportUrl)
    return processedData.validationResult
  }

  /**
   * Check if addon is compatible (quick compatibility check)
   */
  async isAddonCompatible(transportUrl: StremioTransportUrl): Promise<boolean> {
    try {
      const processedData = await this.getProcessedAddon(transportUrl)
      return processedData.isCompatible
    } catch (error) {
      this.logger.warn(`Failed to check addon compatibility for ${transportUrl}`, error as Error)
      return false // Default to incompatible on error
    }
  }

  /**
   * Prefetch processed addon data for better performance
   */
  async prefetchProcessedAddon(transportUrl: StremioTransportUrl): Promise<void> {
    const queryKey = this.createProcessedAddonQueryKey(transportUrl)

    try {
      await this.queryClient.prefetchQuery({
        queryKey,
        queryFn: () => this.processAddon(transportUrl),
        staleTime: 12 * 60 * 60 * 1000,
        gcTime: 48 * 60 * 60 * 1000,
      })

      this.logger.debug(`Prefetched processed addon data for ${transportUrl}`)
    } catch (error) {
      this.logger.warn(
        `Failed to prefetch processed addon data for ${transportUrl}`,
        error as Error
      )
      // Don't throw - prefetch failures are non-critical
    }
  }

  /**
   * Batch process multiple addons efficiently
   */
  async batchProcessAddons(transportUrls: StremioTransportUrl[]): Promise<ProcessedAddonData[]> {
    const promises = transportUrls.map((url) =>
      this.prefetchProcessedAddon(url).then(() => this.getProcessedAddon(url))
    )

    const results = await Promise.allSettled(promises)

    const processedAddons: ProcessedAddonData[] = []
    const failed: string[] = []

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        processedAddons.push(result.value)
      } else {
        failed.push(transportUrls[index])
        this.logger.warn(`Failed to process addon in batch: ${transportUrls[index]}`, result.reason)
      }
    })

    this.logger.debug(`Batch processed ${processedAddons.length}/${transportUrls.length} addons`, {
      successful: processedAddons.length,
      failed: failed.length,
    })

    return processedAddons
  }

  /**
   * Invalidate processed addon data and force recomputation
   */
  async invalidateProcessedAddon(transportUrl: StremioTransportUrl): Promise<void> {
    const queryKey = this.createProcessedAddonQueryKey(transportUrl)

    await this.queryClient.invalidateQueries({ queryKey })
    this.logger.debug(`Invalidated processed addon cache for ${transportUrl}`)
  }

  /**
   * Clear all processed addon data
   */
  async clearAllProcessedAddons(): Promise<void> {
    await this.queryClient.invalidateQueries({
      queryKey: ['stremio', 'processed-addon'],
    })
    this.logger.info('Cleared all processed Stremio addon data')
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    processedAddonCount: number
    totalSize: number
    validAddons: number
    compatibleAddons: number
  } {
    const queryCache = this.queryClient.getQueryCache()
    const processedQueries = queryCache.findAll({
      queryKey: ['stremio', 'processed-addon'],
    })

    let totalSize = 0
    let validAddons = 0
    let compatibleAddons = 0

    processedQueries.forEach((query) => {
      const data = query.state.data as ProcessedAddonData | undefined
      if (data) {
        totalSize += JSON.stringify(data).length
        if (data.isValid) validAddons++
        if (data.isCompatible) compatibleAddons++
      }
    })

    return {
      processedAddonCount: processedQueries.length,
      totalSize,
      validAddons,
      compatibleAddons,
    }
  }

  /**
   * Process addon manifest and compute all derived data
   */
  private async processAddon(transportUrl: StremioTransportUrl): Promise<ProcessedAddonData> {
    this.logger.debug(`Processing addon manifest for ${transportUrl}`)

    // Get raw manifest from manifest cache
    const rawManifest = await this.manifestCache.getManifest(transportUrl)

    // Parse and validate manifest (expensive computation)
    const validationResult = StremioManifestParser.parseManifest(rawManifest)

    const processedData: ProcessedAddonData = {
      transportUrl,
      rawManifest,
      validationResult,
      capabilities: validationResult.capabilities,
      isValid: validationResult.isValid,
      isCompatible: validationResult.capabilities
        ? StremioManifestParser.isAddonCompatible(validationResult.capabilities)
        : false,
      capabilitySummary: validationResult.capabilities
        ? StremioManifestParser.getCapabilitySummary(validationResult.capabilities)
        : 'No capabilities detected',
      processedAt: new Date(),
      processingVersion: this.PROCESSING_VERSION,
    }

    this.logger.debug(`Processed addon manifest for ${transportUrl}`, {
      isValid: processedData.isValid,
      isCompatible: processedData.isCompatible,
      capabilityCount: processedData.capabilities?.capabilities.length || 0,
      errors: validationResult.errors.length,
      warnings: validationResult.warnings.length,
    })

    return processedData
  }

  /**
   * Create consistent query key for processed addon
   */
  private createProcessedAddonQueryKey(transportUrl: StremioTransportUrl): string[] {
    return ['stremio', 'processed-addon', transportUrl, this.PROCESSING_VERSION]
  }

  /**
   * Shutdown and cleanup
   */
  async shutdown(): Promise<void> {
    // TanStack Query handles cleanup automatically
    this.logger.debug('StremioProcessedAddonCache shutdown')
  }
}
