import type { QueryClient } from '@tanstack/react-query'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { StremioAddonClient } from '../clients/StremioAddonClient'
import type { StremioManifest, StremioTransportUrl } from '../types'
import type { HttpClient } from '../../../http/HttpClient'
import { InfrastructureError } from '../../../errors/InfrastructureError'
import { NetworkError } from '../../../errors/NetworkError'
import { NotFoundError } from '../../../../domain/errors'

/**
 * Raw manifest data with metadata
 */
export interface CachedManifest {
  manifest: StremioManifest
  transportUrl: string
  fetchedAt: Date
  etag?: string
}

/**
 * TanStack Query-based Stremio manifest cache
 *
 * Replaces the old AsyncStorage-based manifest cache with TanStack Query
 * for better memory management, automatic TTL, and consistent caching patterns.
 */
export class StremioManifestQueryCache {
  constructor(
    private readonly queryClient: QueryClient,
    private readonly httpClient: HttpClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get manifest from cache or fetch fresh if expired/missing
   * Uses TanStack Query for caching with automatic TTL and background refresh
   */
  async getManifest(
    transportUrl: StremioTransportUrl,
    expectedVersion?: string
  ): Promise<StremioManifest> {
    const queryKey = this.createManifestQueryKey(transportUrl)

    try {
      const cachedData = await this.queryClient.fetchQuery({
        queryKey,
        queryFn: () => this.fetchManifest(transportUrl),
        staleTime: 6 * 60 * 60 * 1000, // 6 hours - consider fresh
        gcTime: 24 * 60 * 60 * 1000, // 24 hours - keep in memory/storage
        retry: (failureCount, error) => {
          // Don't retry on 4xx client errors (bad URL, not found, validation errors)
          if (error instanceof NetworkError && error.statusCode) {
            if (error.statusCode >= 400 && error.statusCode < 500) {
              this.logger.debug(`Not retrying 4xx error for ${transportUrl}`, {
                statusCode: error.statusCode,
                error: error.message,
              })
              return false
            }
          }
          // Don't retry on NotFoundError
          if (error instanceof NotFoundError) {
            this.logger.debug(`Not retrying NotFoundError for ${transportUrl}`)
            return false
          }
          // Retry network errors and 5xx errors up to 2 times (reduced from 3)
          return failureCount < 2
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      })

      // Validate version if expected
      if (expectedVersion && cachedData.manifest.version !== expectedVersion) {
        this.logger.warn(`Manifest version mismatch for ${transportUrl}`, {
          expected: expectedVersion,
          actual: cachedData.manifest.version,
        })

        // Invalidate cache and refetch
        await this.invalidateManifest(transportUrl)
        return this.getManifest(transportUrl) // Recursive call without version check
      }

      this.logger.debug(`Retrieved manifest for ${transportUrl}`, {
        version: cachedData.manifest.version,
        fromCache: true,
      })

      return cachedData.manifest
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get manifest for ${transportUrl}`, err)
      throw new InfrastructureError(`Failed to retrieve Stremio manifest from ${transportUrl}`, err)
    }
  }

  /**
   * Prefetch manifest for better performance
   */
  async prefetchManifest(transportUrl: StremioTransportUrl): Promise<void> {
    const queryKey = this.createManifestQueryKey(transportUrl)

    try {
      await this.queryClient.prefetchQuery({
        queryKey,
        queryFn: () => this.fetchManifest(transportUrl),
        staleTime: 6 * 60 * 60 * 1000,
        gcTime: 24 * 60 * 60 * 1000,
      })

      this.logger.debug(`Prefetched manifest for ${transportUrl}`)
    } catch (error) {
      this.logger.warn(`Failed to prefetch manifest for ${transportUrl}`, error as Error)
      // Don't throw - prefetch failures are non-critical
    }
  }

  /**
   * Invalidate cached manifest and force refresh
   */
  async invalidateManifest(transportUrl: StremioTransportUrl): Promise<void> {
    const queryKey = this.createManifestQueryKey(transportUrl)

    await this.queryClient.invalidateQueries({ queryKey })
    this.logger.debug(`Invalidated manifest cache for ${transportUrl}`)
  }

  /**
   * Clear all cached manifests
   */
  async clearAllManifests(): Promise<void> {
    await this.queryClient.invalidateQueries({
      queryKey: ['stremio', 'manifest'],
    })
    this.logger.info('Cleared all cached Stremio manifests')
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    manifestCount: number
    totalSize: number
  } {
    const queryCache = this.queryClient.getQueryCache()
    const manifestQueries = queryCache.findAll({
      queryKey: ['stremio', 'manifest'],
    })

    const totalSize = manifestQueries.reduce((size, query) => {
      const data = query.state.data as CachedManifest | undefined
      return size + (data ? JSON.stringify(data).length : 0)
    }, 0)

    return {
      manifestCount: manifestQueries.length,
      totalSize,
    }
  }

  /**
   * Fetch fresh manifest from addon server
   */
  private async fetchManifest(transportUrl: StremioTransportUrl): Promise<CachedManifest> {
    this.logger.debug(`Fetching fresh manifest from ${transportUrl}`)

    const addonClient = new StremioAddonClient(transportUrl, this.httpClient)
    const manifest = await addonClient.getManifest()

    const cachedManifest: CachedManifest = {
      manifest,
      transportUrl,
      fetchedAt: new Date(),
      // TODO: Add etag support if addon servers provide it
    }

    this.logger.debug(`Fetched fresh manifest for ${transportUrl}`, {
      version: manifest.version,
      name: manifest.name,
    })

    return cachedManifest
  }

  /**
   * Create consistent query key for manifest
   */
  private createManifestQueryKey(transportUrl: StremioTransportUrl): string[] {
    return ['stremio', 'manifest', transportUrl]
  }

  /**
   * Shutdown and cleanup
   */
  async shutdown(): Promise<void> {
    // TanStack Query handles cleanup automatically
    this.logger.debug('StremioManifestQueryCache shutdown')
  }
}
