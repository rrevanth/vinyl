import { HttpClient } from '../../../http/HttpClient'
import { InfrastructureError } from '../../../errors/InfrastructureError'
import { StremioUrlHelper } from '../utils/StremioUrlHelper'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type {
  StremioManifest,
  StremioTransportUrl,
  StremioStreamResponse,
  StremioMetaResponse,
  StremioCatalogResponse,
  StremioAddonCatalogResponse,
  StremioSubtitlesResponse,
} from '../types'

/**
 * HTTP client for Stremio addon API endpoints
 * Uses HttpClient with empty baseURL for absolute URL support
 *
 * Automatically upgrades HTTP URLs to HTTPS for iOS App Transport Security compliance.
 */
export class StremioAddonClient {
  private readonly baseUrl: string

  constructor(
    private transportUrl: StremioTransportUrl,
    private readonly httpClient: HttpClient,
    private readonly logger?: ILoggingService
  ) {
    // Auto-upgrade HTTP → HTTPS for iOS App Transport Security
    const upgradedUrl = StremioUrlHelper.upgradeToHttps(transportUrl, logger)
    this.transportUrl = upgradedUrl as StremioTransportUrl

    // Derive base URL by removing /manifest.json
    this.baseUrl = StremioUrlHelper.extractBaseUrl(upgradedUrl)
  }

  /**
   * Get addon manifest
   */
  async getManifest(): Promise<StremioManifest> {
    try {
      // Use transportUrl directly - it's already the full manifest URL
      const response = await this.httpClient.get<StremioManifest>(this.transportUrl)
      return response
    } catch (error) {
      throw new InfrastructureError(
        `Failed to fetch Stremio addon manifest from ${this.transportUrl}`,
        error instanceof Error ? error : new Error(String(error))
      )
    }
  }

  /**
   * Get catalog entries
   */
  async getCatalog(
    type: string,
    id: string,
    extra?: Record<string, string>
  ): Promise<StremioCatalogResponse> {
    try {
      const url = this.buildUrl('catalog', type, id, extra)
      this.logger?.info('🌐 STREMIO CATALOG API CALL', {
        transportUrl: this.transportUrl,
        type,
        id,
        extra,
        constructedUrl: url,
      })
      const response = await this.httpClient.get<StremioCatalogResponse>(url)
      this.logger?.info('📦 STREMIO CATALOG API RESPONSE', {
        url,
        metasCount: response.metas?.length ?? 0,
      })
      return response
    } catch (error) {
      throw new InfrastructureError(
        `Failed to fetch Stremio catalog ${type}/${id} from ${this.transportUrl}`,
        error instanceof Error ? error : new Error(String(error))
      )
    }
  }

  /**
   * Get metadata for specific item
   */
  async getMeta(
    type: string,
    id: string,
    extra?: Record<string, string>
  ): Promise<StremioMetaResponse> {
    try {
      const url = this.buildUrl('meta', type, id, extra)
      const response = await this.httpClient.get<StremioMetaResponse>(url)
      return response
    } catch (error) {
      throw new InfrastructureError(
        `Failed to fetch Stremio meta ${type}/${id} from ${this.transportUrl}`,
        error instanceof Error ? error : new Error(String(error))
      )
    }
  }

  /**
   * Get streams for specific item
   */
  async getStream(
    type: string,
    id: string,
    extra?: Record<string, string>
  ): Promise<StremioStreamResponse> {
    try {
      const url = this.buildUrl('stream', type, id, extra)
      const response = await this.httpClient.get<StremioStreamResponse>(url)
      return response
    } catch (error) {
      throw new InfrastructureError(
        `Failed to fetch Stremio streams ${type}/${id} from ${this.transportUrl}`,
        error instanceof Error ? error : new Error(String(error))
      )
    }
  }

  /**
   * Get addon catalog (list of other addons)
   *
   * @param type - Catalog type (e.g., 'all', 'movie', 'series', 'channel')
   * @param id - Catalog id (e.g., 'official', 'community')
   * @param extra - Optional extra parameters
   *
   * @example
   * // Fetch Cinemeta official addons for all types
   * await client.getAddonCatalog('all', 'official')
   * // Results in: GET https://v3-cinemeta.strem.io/addon_catalog/all/official.json
   */
  async getAddonCatalog(
    type: string,
    id: string,
    extra?: Record<string, string>
  ): Promise<StremioAddonCatalogResponse> {
    try {
      const url = this.buildUrl('addon_catalog', type, id, extra)
      const response = await this.httpClient.get<StremioAddonCatalogResponse>(url)
      return response
    } catch (error) {
      throw new InfrastructureError(
        `Failed to fetch Stremio addon catalog ${type}/${id} from ${this.transportUrl}`,
        error instanceof Error ? error : new Error(String(error))
      )
    }
  }

  /**
   * Get subtitles for specific item
   *
   * @param type - Media type (e.g., 'movie', 'series')
   * @param videoId - Video ID (for movies: metaId, for series: metaId:season:episode)
   * @param extra - Optional extra parameters (videoHash, videoSize, filename for OpenSubtitles)
   *
   * @example
   * // Get subtitles for a movie
   * await client.getSubtitles('movie', 'tt0848228')
   * // Get subtitles for a series episode
   * await client.getSubtitles('series', 'tt0898266:9:17')
   * // With OpenSubtitles hash
   * await client.getSubtitles('movie', 'tt0848228', { videoHash: '...' })
   */
  async getSubtitles(
    type: string,
    videoId: string,
    extra?: Record<string, string>
  ): Promise<StremioSubtitlesResponse> {
    try {
      const url = this.buildUrl('subtitles', type, videoId, extra)
      const response = await this.httpClient.get<StremioSubtitlesResponse>(url)
      return response
    } catch (error) {
      throw new InfrastructureError(
        `Failed to fetch Stremio subtitles ${type}/${videoId} from ${this.transportUrl}`,
        error instanceof Error ? error : new Error(String(error))
      )
    }
  }

  /**
   * Build API URL for specific endpoint
   */
  private buildUrl(
    resource: string,
    type?: string,
    id?: string,
    extra?: Record<string, string>
  ): string {
    // Use baseUrl (without /manifest.json) for resource endpoints
    let url = `${this.baseUrl}/${resource}`

    if (type && id) {
      url += `/${type}/${id}`
    }

    if (extra && Object.keys(extra).length > 0) {
      const params = new URLSearchParams()
      Object.entries(extra).forEach(([key, value]) => {
        params.append(key, value)
      })
      url += `/${params.toString()}.json`
    } else {
      url += '.json'
    }

    return url
  }
}
