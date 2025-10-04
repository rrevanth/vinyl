/**
 * Request types for Stremio addon operations
 * These represent the various requests that can be made to Stremio addons
 */

/**
 * Base request interface for all Stremio addon requests
 */
export interface StremioBaseRequest {
  addonId: string
  transportUrl: string
  extra?: Record<string, string | undefined>
}

/**
 * Request to get catalog items from a Stremio addon
 * Corresponds to: /catalog/{type}/{id}/{extra?}.json
 */
export interface StremioCatalogRequest extends StremioBaseRequest {
  type: string // Media type (movie, series, etc.)
  catalogId: string // Catalog identifier (top, year, genre, etc.)
  extra?: {
    genre?: string
    search?: string
    skip?: string
    [key: string]: string | undefined
  }
}

/**
 * Request to get metadata for specific media from a Stremio addon
 * Corresponds to: /meta/{type}/{id}/{extra?}.json
 */
export interface StremioMetaRequest extends StremioBaseRequest {
  type: string // Media type (movie, series)
  id: string // Media ID (tt1234567, kitsu:123, etc.)
  extra?: {
    videoId?: string // For series episodes
    seasonId?: string // For series seasons
    [key: string]: string | undefined
  }
}

/**
 * Request to get streams for specific media from a Stremio addon
 * Corresponds to: /stream/{type}/{id}/{extra?}.json
 */
export interface StremioStreamRequest extends StremioBaseRequest {
  type: string // Media type (movie, series)
  id: string // Media ID with optional season/episode info
  extra?: {
    season?: string
    episode?: string
    [key: string]: string | undefined
  }
}

/**
 * Request to get addon catalog (list of other addons) from a Stremio addon
 * Corresponds to: /addon_catalog/{extra?}.json
 */
export interface StremioAddonCatalogRequest extends StremioBaseRequest {
  catalogType?: string // Type filter (all, movie, series, official, community, etc.)
  catalogId?: string // Catalog identifier (official, community, etc.)
  extra?: {
    search?: string
    category?: string
    skip?: string
    [key: string]: string | undefined
  }
}

/**
 * Request to get subtitles for specific media from a Stremio addon
 * Corresponds to: /subtitles/{type}/{id}/{extra?}.json
 */
export interface StremioSubtitlesRequest extends StremioBaseRequest {
  type: string // Media type (movie, series)
  id: string // Media ID with optional season/episode info
  extra?: {
    videoId?: string
    [key: string]: string | undefined
  }
}

/**
 * Union type for all possible Stremio requests
 */
export type StremioRequest =
  | StremioCatalogRequest
  | StremioMetaRequest
  | StremioStreamRequest
  | StremioAddonCatalogRequest
  | StremioSubtitlesRequest

/**
 * Request factory functions for creating typed requests
 */
export class StremioRequestFactory {
  /**
   * Create a catalog request
   */
  static createCatalogRequest(params: {
    addonId: string
    transportUrl: string
    type: string
    catalogId: string
    extra?: Record<string, string>
  }): StremioCatalogRequest {
    return {
      addonId: params.addonId,
      transportUrl: params.transportUrl,
      type: params.type,
      catalogId: params.catalogId,
      extra: params.extra,
    }
  }

  /**
   * Create a meta request
   */
  static createMetaRequest(params: {
    addonId: string
    transportUrl: string
    type: string
    id: string
    extra?: Record<string, string>
  }): StremioMetaRequest {
    return {
      addonId: params.addonId,
      transportUrl: params.transportUrl,
      type: params.type,
      id: params.id,
      extra: params.extra,
    }
  }

  /**
   * Create a stream request
   */
  static createStreamRequest(params: {
    addonId: string
    transportUrl: string
    type: string
    id: string
    extra?: Record<string, string>
  }): StremioStreamRequest {
    return {
      addonId: params.addonId,
      transportUrl: params.transportUrl,
      type: params.type,
      id: params.id,
      extra: params.extra,
    }
  }

  /**
   * Create an addon catalog request
   */
  static createAddonCatalogRequest(params: {
    addonId: string
    transportUrl: string
    catalogType?: string
    catalogId?: string
    extra?: Record<string, string>
  }): StremioAddonCatalogRequest {
    return {
      addonId: params.addonId,
      transportUrl: params.transportUrl,
      catalogType: params.catalogType,
      catalogId: params.catalogId,
      extra: params.extra,
    }
  }

  /**
   * Create a subtitles request
   */
  static createSubtitlesRequest(params: {
    addonId: string
    transportUrl: string
    type: string
    id: string
    extra?: Record<string, string>
  }): StremioSubtitlesRequest {
    return {
      addonId: params.addonId,
      transportUrl: params.transportUrl,
      type: params.type,
      id: params.id,
      extra: params.extra,
    }
  }
}
