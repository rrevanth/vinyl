import type { IStorageService } from '../../../../domain/services/IStorageService'
import { HttpClient } from '../../../http/HttpClient'
import { StremioAddonClient } from '../clients/StremioAddonClient'
import type { StremioManifest, StremioTransportUrl } from '../types'

/**
 * Cached manifest with metadata
 */
export interface CachedManifest {
  manifest: StremioManifest
  transportUrl: string
  cachedAt: Date
  expiresAt: Date
  etag?: string
}

/**
 * Global manifest cache (user-agnostic) for performance optimization
 * Caches addon manifests globally to avoid repeated fetches across users
 */
export class StremioManifestCache {
  private readonly CACHE_KEY = 'stremio_manifest_cache'
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

  constructor(
    private storage: IStorageService,
    private httpClient: HttpClient
  ) {}

  /**
   * Get manifest from cache or fetch fresh if expired/missing
   */
  async getManifest(
    transportUrl: StremioTransportUrl,
    expectedVersion?: string
  ): Promise<StremioManifest> {
    const cached = await this.getCachedManifest(transportUrl)

    // Return cached if valid and version matches
    if (
      cached &&
      cached.expiresAt > new Date() &&
      (!expectedVersion || cached.manifest.version === expectedVersion)
    ) {
      return cached.manifest
    }

    // Fetch fresh manifest
    return this.fetchAndCacheManifest(transportUrl)
  }

  /**
   * Fetch and cache manifest from addon
   */
  async fetchAndCacheManifest(transportUrl: StremioTransportUrl): Promise<StremioManifest> {
    const client = new StremioAddonClient(transportUrl, this.httpClient)
    const manifest = await client.getManifest()

    // Cache the manifest
    const cached: CachedManifest = {
      manifest,
      transportUrl,
      cachedAt: new Date(),
      expiresAt: new Date(Date.now() + this.CACHE_DURATION),
    }

    await this.setCachedManifest(transportUrl, cached)
    return manifest
  }

  /**
   * Clear cached manifest for specific addon
   */
  async clearManifest(transportUrl: StremioTransportUrl): Promise<void> {
    const cacheKey = `${this.CACHE_KEY}_${this.hashUrl(transportUrl)}`
    await this.storage.remove(cacheKey)
  }

  /**
   * Clear all cached manifests
   */
  async clearAllManifests(): Promise<void> {
    // Note: This is a simple implementation. In production, you might want
    // to track cache keys more efficiently
    const keys = await this.storage.getAllKeys()
    const cacheKeys = keys.filter((key) => key.startsWith(this.CACHE_KEY))

    await Promise.all(cacheKeys.map((key) => this.storage.remove(key)))
  }

  /**
   * Get cached manifest by URL
   */
  private async getCachedManifest(transportUrl: string): Promise<CachedManifest | null> {
    try {
      const cacheKey = `${this.CACHE_KEY}_${this.hashUrl(transportUrl)}`
      const data = await this.storage.get<string>(cacheKey)

      if (!data) return null

      const parsed = JSON.parse(data) as CachedManifest
      // Convert date strings back to Date objects
      parsed.cachedAt = new Date(parsed.cachedAt)
      parsed.expiresAt = new Date(parsed.expiresAt)

      return parsed
    } catch (error) {
      console.warn('Failed to get cached manifest:', error)
      return null
    }
  }

  /**
   * Set cached manifest by URL
   */
  private async setCachedManifest(transportUrl: string, cached: CachedManifest): Promise<void> {
    try {
      const cacheKey = `${this.CACHE_KEY}_${this.hashUrl(transportUrl)}`
      await this.storage.set(cacheKey, JSON.stringify(cached))
    } catch (error) {
      console.warn('Failed to cache manifest:', error)
    }
  }

  /**
   * Generate hash for URL to use as cache key
   */
  private hashUrl(url: string): string {
    // Simple hash function for URL (could use crypto in production)
    return btoa(url)
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 16)
  }
}
