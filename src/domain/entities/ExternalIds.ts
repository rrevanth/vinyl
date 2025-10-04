/**
 * Basic external ID for traditional platforms
 */
export class ExternalId {
  constructor(
    public readonly id: string,
    public readonly providerId: string,
    public readonly url?: string
  ) {}

  toString(): string {
    return this.id
  }
}

/**
 * Stremio-specific external ID with complex provider information
 * Only used when media originally came from a Stremio catalog
 */
export class StremioExternalId {
  constructor(
    public readonly addonId: string,
    public readonly catalogId: string,
    public readonly mediaType: string, // Stremio's resource type: 'movie', 'series', 'anime', 'tv', 'channel', etc.
    public readonly mediaId: string,
    public readonly providerId: string, // Our internal provider ID (e.g., 'stremio:torrentio')
    public readonly manifestUrl?: string
  ) {}

  toString(): string {
    return `${this.addonId}:${this.catalogId}:${this.mediaId}`
  }

  /**
   * Generate the full URL for accessing this media via Stremio addon
   */
  getMetaUrl(): string {
    const baseUrl = this.manifestUrl?.replace('/manifest.json', '') || ''
    return `${baseUrl}/meta/${this.mediaType}/${this.mediaId}.json`
  }

  /**
   * Generate the stream URL for this media via Stremio addon
   */
  getStreamUrl(): string {
    const baseUrl = this.manifestUrl?.replace('/manifest.json', '') || ''
    return `${baseUrl}/stream/${this.mediaType}/${this.mediaId}.json`
  }
}

/**
 * Container for external IDs from various providers
 * Supports both traditional string-based IDs and complex Stremio IDs
 */
export class ExternalIds {
  // Traditional platform IDs
  public readonly imdb?: ExternalId
  public readonly tmdb?: ExternalId
  public readonly trakt?: ExternalId
  public readonly tvdb?: ExternalId
  public readonly fanart?: ExternalId

  // Stremio-specific (ONLY when media originally came from Stremio catalog)
  public readonly stremio?: StremioExternalId

  constructor(
    data: Partial<{
      imdb: ExternalId
      tmdb: ExternalId
      trakt: ExternalId
      tvdb: ExternalId
      fanart: ExternalId
      stremio: StremioExternalId
    }> = {}
  ) {
    this.imdb = data.imdb
    this.tmdb = data.tmdb
    this.trakt = data.trakt
    this.tvdb = data.tvdb
    this.fanart = data.fanart
    this.stremio = data.stremio
  }

  /**
   * Get the primary external ID for this entity
   * Priority: IMDB > TMDB > Trakt > TVDB > Stremio > Fanart
   */
  getPrimaryId(): ExternalId | StremioExternalId | null {
    return this.imdb || this.tmdb || this.trakt || this.tvdb || this.stremio || this.fanart || null
  }

  /**
   * Check if any external IDs exist
   */
  hasAnyId(): boolean {
    return !!(this.imdb || this.tmdb || this.trakt || this.tvdb || this.stremio || this.fanart)
  }

  /**
   * Get all available external IDs as an array
   */
  getAllIds(): (ExternalId | StremioExternalId)[] {
    const ids: (ExternalId | StremioExternalId)[] = []

    if (this.imdb) ids.push(this.imdb)
    if (this.tmdb) ids.push(this.tmdb)
    if (this.trakt) ids.push(this.trakt)
    if (this.tvdb) ids.push(this.tvdb)
    if (this.stremio) ids.push(this.stremio)
    if (this.fanart) ids.push(this.fanart)

    return ids
  }

  /**
   * Merge external IDs from another ExternalIds object
   * Existing IDs take precedence
   */
  merge(other: ExternalIds): ExternalIds {
    return new ExternalIds({
      imdb: this.imdb || other.imdb,
      tmdb: this.tmdb || other.tmdb,
      trakt: this.trakt || other.trakt,
      tvdb: this.tvdb || other.tvdb,
      fanart: this.fanart || other.fanart,
      stremio: this.stremio || other.stremio,
    })
  }
}

/**
 * Helper functions for creating ExternalIds
 */
export const ExternalIdHelpers = {
  /**
   * Create ExternalIds from IMDB ID
   */
  fromImdb(imdbId: string, providerId: string = 'imdb'): ExternalIds {
    return new ExternalIds({
      imdb: new ExternalId(imdbId, providerId, `https://www.imdb.com/title/${imdbId}/`),
    })
  },

  /**
   * Create ExternalIds from TMDB ID
   */
  fromTmdb(tmdbId: number, mediaType: 'movie' | 'tv', providerId: string = 'tmdb'): ExternalIds {
    return new ExternalIds({
      tmdb: new ExternalId(
        tmdbId.toString(),
        providerId,
        `https://www.themoviedb.org/${mediaType}/${tmdbId}`
      ),
    })
  },

  /**
   * Create ExternalIds from Trakt ID
   */
  fromTrakt(
    traktId: number,
    mediaType: 'movies' | 'shows',
    providerId: string = 'trakt'
  ): ExternalIds {
    return new ExternalIds({
      trakt: new ExternalId(
        traktId.toString(),
        providerId,
        `https://trakt.tv/${mediaType}/${traktId}`
      ),
    })
  },

  /**
   * Create ExternalIds from Stremio addon info
   */
  fromStremio(
    addonId: string,
    catalogId: string,
    mediaType: string,
    mediaId: string,
    providerId: string,
    manifestUrl?: string
  ): ExternalIds {
    return new ExternalIds({
      stremio: new StremioExternalId(
        addonId,
        catalogId,
        mediaType,
        mediaId,
        providerId,
        manifestUrl
      ),
    })
  },
}
