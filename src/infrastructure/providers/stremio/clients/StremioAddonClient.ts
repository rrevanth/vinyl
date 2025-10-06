import { HttpClient } from '../../../http/HttpClient'
import { InfrastructureError } from '../../../errors/InfrastructureError'
import type {
  StremioManifest,
  StremioTransportUrl,
  StremioStreamResponse,
  StremioMetaResponse,
  StremioCatalogResponse,
  StremioAddonCatalogResponse,
} from '../types'

/**
 * HTTP client for Stremio addon API endpoints
 * Uses HttpClient with empty baseURL for absolute URL support
 */
export class StremioAddonClient {
  private readonly baseUrl: string

  constructor(
    private readonly transportUrl: StremioTransportUrl,
    private readonly httpClient: HttpClient
  ) {
    // transportUrl is the full manifest URL (e.g., https://example.com/manifest.json)
    // Derive base URL by removing /manifest.json
    this.baseUrl = transportUrl.endsWith('/manifest.json')
      ? transportUrl.replace('/manifest.json', '')
      : transportUrl
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
      const response = await this.httpClient.get<StremioCatalogResponse>(url)
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
      url += `.json?${params.toString()}`
    } else {
      url += '.json'
    }

    return url
  }
}
