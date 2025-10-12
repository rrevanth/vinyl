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

  /**
   * Serialize to JSON for cache persistence
   */
  toJSON() {
    return {
      id: this.id,
      providerId: this.providerId,
      url: this.url,
    }
  }

  /**
   * Deserialize from JSON to restore class instance with methods
   */
  static fromJSON(data: any): ExternalId {
    return new ExternalId(data.id, data.providerId, data.url)
  }
}

/**
 * Stremio-specific external ID with complex provider information
 * Only used when media originally came from a Stremio catalog
 */
export class StremioExternalId {
  constructor(
    public readonly addonId: string,
    public readonly addonName: string, // Addon display name for provider UI
    public readonly catalogId: string, // Actual catalog ID (e.g., 'ustv', not 'catalog')
    public readonly catalogType: string, // Original catalog type from manifest
    public readonly mediaType: string, // Stremio's resource type: 'movie', 'series', 'anime', 'tv', 'channel', etc.
    public readonly mediaId: string,
    public readonly providerId: string, // Our internal provider ID (e.g., 'stremio:torrentio')
    public readonly manifestUrl: string // Required for API calls
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

  /**
   * Serialize to JSON for cache persistence
   */
  toJSON() {
    return {
      addonId: this.addonId,
      addonName: this.addonName,
      catalogId: this.catalogId,
      catalogType: this.catalogType,
      mediaType: this.mediaType,
      mediaId: this.mediaId,
      providerId: this.providerId,
      manifestUrl: this.manifestUrl,
    }
  }

  /**
   * Deserialize from JSON to restore class instance with methods
   */
  static fromJSON(data: any): StremioExternalId {
    return new StremioExternalId(
      data.addonId,
      data.addonName,
      data.catalogId,
      data.catalogType,
      data.mediaType,
      data.mediaId,
      data.providerId,
      data.manifestUrl
    )
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
  public readonly mal?: ExternalId
  public readonly kitsu?: ExternalId

  // Stremio-specific (ONLY when media originally came from Stremio catalog)
  public readonly stremio?: StremioExternalId

  constructor(
    data: Partial<{
      imdb: ExternalId
      tmdb: ExternalId
      trakt: ExternalId
      tvdb: ExternalId
      fanart: ExternalId
      mal: ExternalId
      kitsu: ExternalId
      stremio: StremioExternalId
    }> = {}
  ) {
    this.imdb = data.imdb
    this.tmdb = data.tmdb
    this.trakt = data.trakt
    this.tvdb = data.tvdb
    this.fanart = data.fanart
    this.mal = data.mal
    this.kitsu = data.kitsu
    this.stremio = data.stremio
  }

  /**
   * Get the primary external ID for this entity
   * Priority: IMDB > TMDB > Trakt > TVDB > Stremio > Fanart > MAL > Kitsu
   */
  getPrimaryId(): ExternalId | StremioExternalId | null {
    return this.imdb || this.tmdb || this.trakt || this.tvdb || this.stremio || this.fanart || this.mal || this.kitsu || null
  }

  /**
   * Check if any external IDs exist
   */
  hasAnyId(): boolean {
    return !!(this.imdb || this.tmdb || this.trakt || this.tvdb || this.stremio || this.fanart || this.mal || this.kitsu)
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
    if (this.mal) ids.push(this.mal)
    if (this.kitsu) ids.push(this.kitsu)

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
      mal: this.mal || other.mal,
      kitsu: this.kitsu || other.kitsu,
    })
  }

  /**
   * Serialize to JSON for cache persistence
   * Calls toJSON() on nested ExternalId/StremioExternalId instances
   */
  toJSON() {
    return {
      imdb: this.imdb?.toJSON(),
      tmdb: this.tmdb?.toJSON(),
      trakt: this.trakt?.toJSON(),
      tvdb: this.tvdb?.toJSON(),
      fanart: this.fanart?.toJSON(),
      mal: this.mal?.toJSON(),
      kitsu: this.kitsu?.toJSON(),
      stremio: this.stremio?.toJSON(),
    }
  }

  /**
   * Deserialize from JSON to restore class instance with methods
   * Reconstructs nested ExternalId/StremioExternalId instances
   */
  static fromJSON(data: any): ExternalIds {
    return new ExternalIds({
      imdb: data.imdb ? ExternalId.fromJSON(data.imdb) : undefined,
      tmdb: data.tmdb ? ExternalId.fromJSON(data.tmdb) : undefined,
      trakt: data.trakt ? ExternalId.fromJSON(data.trakt) : undefined,
      tvdb: data.tvdb ? ExternalId.fromJSON(data.tvdb) : undefined,
      fanart: data.fanart ? ExternalId.fromJSON(data.fanart) : undefined,
      mal: data.mal ? ExternalId.fromJSON(data.mal) : undefined,
      kitsu: data.kitsu ? ExternalId.fromJSON(data.kitsu) : undefined,
      stremio: data.stremio ? StremioExternalId.fromJSON(data.stremio) : undefined,
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
   * Create ExternalIds from MAL ID
   */
  fromMal(malId: number, providerId: string = 'mal'): ExternalIds {
    return new ExternalIds({
      mal: new ExternalId(malId.toString(), providerId, `https://myanimelist.net/anime/${malId}`),
    })
  },

  /**
   * Create ExternalIds from Kitsu ID
   */
  fromKitsu(kitsuId: number, providerId: string = 'kitsu'): ExternalIds {
    return new ExternalIds({
      kitsu: new ExternalId(kitsuId.toString(), providerId, `https://kitsu.io/anime/${kitsuId}`),
    })
  },

  /**
   * Create ExternalIds from Stremio addon info
   */
  fromStremio(
    addonId: string,
    addonName: string,
    catalogId: string,
    catalogType: string,
    mediaType: string,
    mediaId: string,
    providerId: string,
    manifestUrl: string
  ): ExternalIds {
    return new ExternalIds({
      stremio: new StremioExternalId(
        addonId,
        addonName,
        catalogId,
        catalogType,
        mediaType,
        mediaId,
        providerId,
        manifestUrl
      ),
    })
  },
}
