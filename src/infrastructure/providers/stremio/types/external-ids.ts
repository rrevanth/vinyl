import { ExternalId } from '../../../../domain/entities/ExternalIds'

/**
 * Stremio-specific external ID metadata for URL building and context
 */
export interface StremioExternalIdMetadata {
  // Core identification
  stremioId: string
  providerId: string
  manifestUrl: string

  // Context for URL building
  mediaType: string
  catalogId?: string
  catalogType?: string

  // Additional metadata for streams/meta
  videoId?: string
  seasonNumber?: number
  episodeNumber?: number

  // Capability context
  resourceType?: 'catalog' | 'meta' | 'stream' | 'subtitles'

  // Cache optimization
  lastUpdated: Date
  expiresAt?: Date
}

/**
 * Enhanced External ID with Stremio-specific metadata and URL building
 */
export class StremioExternalId extends ExternalId {
  constructor(
    value: string,
    provider: string,
    url?: string,
    public readonly stremioMetadata?: StremioExternalIdMetadata
  ) {
    super(value, provider, url)
  }

  /**
   * Build addon endpoint URL for specific resource
   */
  buildAddonUrl(
    resource: 'catalog' | 'meta' | 'stream' | 'subtitles',
    extraArgs?: Record<string, any>
  ): string {
    if (!this.stremioMetadata) {
      throw new Error('Stremio metadata required for URL building')
    }

    const { manifestUrl, mediaType, catalogId } = this.stremioMetadata
    const baseUrl = manifestUrl.replace('/manifest.json', '')

    let url = `${baseUrl}/${resource}/${mediaType}`

    switch (resource) {
      case 'catalog':
        if (!catalogId) throw new Error('Catalog ID required for catalog URLs')
        url += `/${catalogId}`
        break
      case 'meta':
      case 'stream':
        url += `/${this.id}`
        break
    }

    if (extraArgs && Object.keys(extraArgs).length > 0) {
      const queryString = new URLSearchParams(
        Object.entries(extraArgs).map(([k, v]) => [k, String(v)])
      ).toString()
      url += `/${encodeURIComponent(queryString)}`
    }

    return url + '.json'
  }

  /**
   * Create video-specific ID for series episodes
   */
  createVideoId(seasonNumber: number, episodeNumber: number): string {
    return `${this.id}:${seasonNumber}:${episodeNumber}`
  }

  /**
   * Check if this external ID can build URLs for the given resource
   */
  canBuildUrlFor(resource: 'catalog' | 'meta' | 'stream' | 'subtitles'): boolean {
    if (!this.stremioMetadata) return false

    switch (resource) {
      case 'catalog':
        return !!this.stremioMetadata.catalogId
      case 'meta':
      case 'stream':
        return true // Can always build with media ID
      case 'subtitles':
        return true
      default:
        return false
    }
  }
}
