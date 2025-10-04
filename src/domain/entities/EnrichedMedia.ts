import type { Media } from './Media'

/**
 * Enriched Media with detailed metadata from providers
 * Used by IMediaMetadataCapability to return comprehensive information
 */
export interface EnrichedMedia {
  // Base media (required)
  media: Media

  // Detailed Information
  overview?: string
  tagline?: string
  originalTitle?: string
  originalLanguage?: string
  spokenLanguages?: string[]

  // Content Details
  genres?: Genre[]
  keywords?: Keyword[]
  productionCompanies?: ProductionCompany[]
  productionCountries?: string[]

  // Ratings & Popularity
  voteAverage?: number
  voteCount?: number
  popularity?: number
  certification?: string // Rating like PG-13, R, etc.

  // Release Information
  releaseDate?: Date
  status?: MediaStatus // Released, In Production, etc.

  // Runtime & Technical
  runtime?: number // in minutes
  budget?: number
  revenue?: number
  homepage?: string

  // Series-specific (only for type: 'series')
  numberOfSeasons?: number
  numberOfEpisodes?: number
  firstAirDate?: Date
  lastAirDate?: Date
  inProduction?: boolean
  nextEpisodeToAir?: EpisodeInfo
  lastEpisodeToAir?: EpisodeInfo
  networks?: Network[]

  // Collection Information (for movies that are part of a collection)
  belongsToCollection?: Collection

  // Additional Metadata
  adult?: boolean
  videoAvailable?: boolean
}

/**
 * Genre information
 */
export interface Genre {
  id: string
  name: string
}

/**
 * Keyword/tag information
 */
export interface Keyword {
  id: string
  name: string
}

/**
 * Production company information
 */
export interface ProductionCompany {
  id: string
  name: string
  logoPath?: string
  originCountry?: string
}

/**
 * Network information for TV series
 */
export interface Network {
  id: string
  name: string
  logoPath?: string
  originCountry?: string
}

/**
 * Movie collection information
 */
export interface Collection {
  id: string
  name: string
  overview?: string
  posterPath?: string
  backdropPath?: string
}

/**
 * Episode information for series
 */
export interface EpisodeInfo {
  id: string
  name: string
  overview?: string
  airDate?: Date
  episodeNumber: number
  seasonNumber: number
  stillPath?: string
  voteAverage?: number
}

/**
 * Media production/release status
 */
export enum MediaStatus {
  RUMORED = 'rumored',
  PLANNED = 'planned',
  IN_PRODUCTION = 'in_production',
  POST_PRODUCTION = 'post_production',
  RELEASED = 'released',
  CANCELED = 'canceled',
  // TV Series specific
  RETURNING_SERIES = 'returning_series',
  ENDED = 'ended',
}
