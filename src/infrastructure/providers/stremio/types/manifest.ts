/**
 * Complete Stremio addon manifest based on official specification
 */
export interface StremioManifest {
  // Required fields
  id: string
  version: string
  name: string
  description: string

  // Capability definition
  resources: (string | StremioResource)[]
  types: string[]
  idPrefixes?: string[]

  // Content catalogs
  catalogs: StremioCatalog[]

  // Addon catalogs (for addon_catalog resource)
  addonCatalogs?: StremioAddonCatalog[]

  // Optional metadata
  logo?: string
  background?: string
  contactEmail?: string

  // Behavior configuration
  behaviorHints?: {
    configurable?: boolean
    configurationRequired?: boolean
    adult?: boolean
    p2p?: boolean
  }

  // User configuration
  config?: StremioConfig[]
}

/**
 * Resource definition with optional type and prefix overrides
 */
export interface StremioResource {
  name: 'catalog' | 'meta' | 'stream' | 'subtitles' | 'addon_catalog'
  types?: string[]
  idPrefixes?: string[]
}

/**
 * Catalog definition in manifest
 */
export interface StremioCatalog {
  type: string
  id: string
  name: string
  extra?: StremioExtra[]
  genres?: string[]
}

/**
 * Addon catalog definition in manifest
 * Defines available addon catalog endpoints for addon_catalog resource
 */
export interface StremioAddonCatalog {
  type: string // 'all', 'movie', 'series', 'channel', 'tv', etc.
  id: string // 'official', 'community', etc.
  name: string // 'Official', 'Community', etc.
}

/**
 * Extra parameter definition for catalogs
 */
export interface StremioExtra {
  name: string
  isRequired?: boolean
  options?: string[]
  optionsLimit?: number
}

/**
 * Configuration field for configurable addons
 */
export interface StremioConfig {
  key: string
  type: 'text' | 'number' | 'password' | 'checkbox' | 'select'
  title?: string
  default?: string
  options?: string[]
  required?: boolean
}

/**
 * Transport URL type for addon endpoints
 */
export type StremioTransportUrl = string

/**
 * Addon ID type
 */
export type StremioAddonId = string
