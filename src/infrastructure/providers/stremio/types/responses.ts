import type { CapabilityType } from '../../../../domain/capabilities/CapabilityType'

/**
 * Catalog endpoint response: /catalog/{type}/{id}/{extraArgs?}.json
 */
export interface StremioCatalogResponse {
  metas: StremioMetaPreview[]
  cacheMaxAge?: number
}

/**
 * Meta endpoint response: /meta/{type}/{id}.json
 */
export interface StremioMetaResponse {
  meta: StremioMeta
  cacheMaxAge?: number
}

/**
 * Stream endpoint response: /stream/{type}/{videoId}.json
 */
export interface StremioStreamResponse {
  streams: StremioStream[]
  cacheMaxAge?: number
}

/**
 * Addon catalog endpoint response: /addon_catalog/{type}/{id}.json
 */
export interface StremioAddonCatalogResponse {
  addons: StremioAddonManifest[]
  cacheMaxAge?: number
}

/**
 * Meta Preview Object used in catalog responses
 */
export interface StremioMetaPreview {
  id: string
  type: string
  name: string
  poster: string
  posterShape?: 'poster' | 'square' | 'landscape'

  // Optional preview metadata for discover page
  genres?: string[]
  imdbRating?: string
  releaseInfo?: string
  director?: string[]
  cast?: string[]
  description?: string
}

/**
 * Full Meta Object for detailed metadata
 */
export interface StremioMeta {
  id: string
  type: string
  name: string

  // Images
  poster?: string
  posterShape?: 'poster' | 'square' | 'landscape'
  background?: string
  logo?: string

  // Metadata
  genres?: string[]
  description?: string
  releaseInfo?: string
  director?: string[]
  cast?: string[]
  imdbRating?: string
  released?: string
  runtime?: string
  language?: string
  country?: string
  awards?: string
  website?: string

  // Videos (for series/channels)
  videos?: StremioVideo[]

  // Links & behavior
  links?: StremioMetaLink[]
  behaviorHints?: {
    defaultVideoId?: string
  }
}

/**
 * Video object for series episodes or channel content
 */
export interface StremioVideo {
  id: string
  title: string
  released: string

  thumbnail?: string
  season?: number
  episode?: number
  overview?: string
  available?: boolean
  streams?: StremioStream[]
}

/**
 * Meta link for internal or external references
 */
export interface StremioMetaLink {
  name: string
  category: string
  url: string
}

/**
 * Stream object with various source types
 */
export interface StremioStream {
  // Stream sources (exactly one required)
  url?: string // Direct HTTP/HTTPS video URL
  ytId?: string // YouTube video ID
  infoHash?: string // BitTorrent info hash
  fileIdx?: number // File index in torrent
  externalUrl?: string // External webpage URL

  // Stream metadata
  name?: string // Stream quality/source name
  title?: string // Stream description (deprecated)
  description?: string // Stream description

  // Additional options
  subtitles?: StremioSubtitle[]
  sources?: string[] // Tracker URLs and DHT nodes

  // Behavior hints
  behaviorHints?: {
    countryWhitelist?: string[] // Allowed countries (ISO 3166-1 alpha-3)
    notWebReady?: boolean // Requires special handling
    bingeGroup?: string // Auto-selection for binge watching
    proxyHeaders?: {
      // Custom headers
      request?: Record<string, string>
      response?: Record<string, string>
    }
    videoHash?: string // OpenSubtitles hash
    videoSize?: number // Video file size in bytes
    filename?: string // Original filename
  }
}

/**
 * Subtitle object
 */
export interface StremioSubtitle {
  url: string
  lang: string // Language code (ISO 639-1)
}

/**
 * Addon manifest for addon catalog responses
 */
export interface StremioAddonManifest {
  id: string
  name: string
  description: string
  version: string
  logo?: string
  background?: string
  transportUrl: string
  capabilities: CapabilityType[]
  types: string[]
  categories: string[]
  isOfficial?: boolean
  isVerified?: boolean
}
