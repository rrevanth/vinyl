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
 * Handles communication with individual Stremio addons
 */
export class StremioAddonClient {
  constructor(
    private readonly transportUrl: StremioTransportUrl,
    private readonly httpClient: HttpClient
  ) {}

  /**
   * Get addon manifest
   */
  async getManifest(): Promise<StremioManifest> {
    try {
      const response = await this.httpClient.get<StremioManifest>(
        `${this.transportUrl}/manifest.json`
      )
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
   */
  async getAddonCatalog(extra?: Record<string, string>): Promise<StremioAddonCatalogResponse> {
    try {
      const url = this.buildUrl('addon_catalog', undefined, undefined, extra)
      const response = await this.httpClient.get<StremioAddonCatalogResponse>(url)
      return response
    } catch (error) {
      throw new InfrastructureError(
        `Failed to fetch Stremio addon catalog from ${this.transportUrl}`,
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
    let url = `${this.transportUrl}/${resource}`

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
