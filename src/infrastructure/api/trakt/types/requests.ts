/**
 * Base pagination parameters for Trakt API
 * Used across multiple endpoints for consistent pagination
 */
import type { TraktMovie, TraktShow, TraktSeason, TraktEpisode, TraktList } from './responses'

export interface TraktPaginationParams {
  page?: number // Default: 1
  limit?: number // Default: 10, Max: 100
}

/**
 * Extended info levels for Trakt API responses
 * Can be combined with comma separation
 */
export type TraktExtended = 'images' | 'full' | 'metadata'

/**
 * Base request parameters that apply to most endpoints
 */
export interface TraktBaseParams {
  extended?: TraktExtended | TraktExtended[]
}

/**
 * Search request parameters
 */
export interface TraktSearchParams extends TraktBaseParams, TraktPaginationParams {
  query: string
  type?: 'movie' | 'show' | 'episode' | 'person' | 'list'
  fields?: ('title' | 'description' | 'name' | 'translations' | 'aliases')[]
}

/**
 * Calendar request parameters
 */
export interface TraktCalendarParams extends TraktBaseParams {
  start_date?: string // ISO 8601 date
  days?: number // Max: 33
}

/**
 * Filter parameters for movies and shows
 * Supports filtering by various criteria
 */
export interface TraktFilterParams {
  // Content filters
  query?: string
  years?: string // Format: "2020" or "2020-2024"
  genres?: string[] // Genre slugs
  languages?: string[] // ISO 639-1 codes
  countries?: string[] // ISO 3166-1 codes
  runtimes?: string // Format: "30-90" (minutes)
  studio_ids?: number[]

  // Rating filters
  ratings?: string // Format: "75-100" (0-100)
  votes?: string // Format: "5000-10000"
  tmdb_ratings?: string // Format: "5.5-10.0"
  tmdb_votes?: string // Format: "5000-10000"
  imdb_ratings?: string // Format: "5.5-10.0"
  imdb_votes?: string // Format: "5000-10000"
  rt_meters?: string // Format: "55-100" (Rotten Tomatoes)
  rt_user_meters?: string // Format: "65-100"
  metascores?: string // Format: "50-100"

  // Movie-specific filters
  certifications?: string[] // US certifications (movies)

  // Show-specific filters
  network_ids?: number[] // Trakt network IDs
  status?: (
    | 'returning series'
    | 'continuing'
    | 'in production'
    | 'planned'
    | 'upcoming'
    | 'pilot'
    | 'canceled'
    | 'ended'
  )[]

  // Episode-specific filters
  episode_types?: (
    | 'standard'
    | 'series_premiere'
    | 'season_premiere'
    | 'mid_season_finale'
    | 'mid_season_premiere'
    | 'season_finale'
    | 'series_finale'
  )[]
}

/**
 * Check-in request parameters
 */
export interface TraktCheckinParams {
  // Media item (one of these required)
  movie?: TraktMovie
  episode?: TraktEpisode
  show?: TraktShow // Used with episode for identification

  // Optional parameters
  sharing?: {
    twitter?: boolean
    mastodon?: boolean
    tumblr?: boolean
  }
  message?: string
}

/**
 * Comment request parameters
 */
export interface TraktCommentParams {
  // Media item (one of these required)
  movie?: TraktMovie
  show?: TraktShow
  season?: TraktSeason
  episode?: TraktEpisode
  list?: TraktList

  // Comment content
  comment: string
  spoiler?: boolean
  sharing?: {
    twitter?: boolean
    tumblr?: boolean
    medium?: boolean
  }
}

/**
 * Sync request parameters for adding/removing items
 */
export interface TraktSyncParams {
  movies?: TraktMovie[]
  shows?: TraktShow[]
  seasons?: TraktSeason[]
  episodes?: TraktEpisode[]
}

/**
 * History parameters for watching activity
 */
export interface TraktHistoryParams extends TraktBaseParams, TraktPaginationParams {
  type?: 'movies' | 'shows' | 'seasons' | 'episodes'
  item_id?: number
  start_at?: string // ISO 8601 date
  end_at?: string // ISO 8601 date
}

/**
 * Statistics parameters
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TraktStatsParams {
  // No additional parameters for basic stats
}

/**
 * Watchlist parameters
 */
export interface TraktWatchlistParams extends TraktBaseParams, TraktPaginationParams {
  type?: 'movies' | 'shows' | 'seasons' | 'episodes'
  sort?: 'rank' | 'added' | 'released' | 'title'
}

/**
 * Collection parameters
 */
export interface TraktCollectionParams extends TraktBaseParams, TraktPaginationParams {
  type?: 'movies' | 'shows'
}

/**
 * Recommendations parameters
 */
export interface TraktRecommendationsParams extends TraktBaseParams {
  ignore_collected?: boolean
  ignore_watchlisted?: boolean
}
