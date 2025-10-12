/**
 * MDBList API Types
 *
 * Based on API documentation at https://api.mdblist.com
 * MDBList provides multi-source ratings aggregation and list management
 */

/**
 * User limits and account information
 */
export interface MDBListLimits {
  api_requests: number
  api_requests_count: number
  user_id: number
  patron_status: string
  patreon_pledge: number
}

/**
 * Multi-provider ratings from MDBList
 * Includes ratings from IMDb, TMDB, Trakt, Letterboxd, Rotten Tomatoes, and Metacritic
 */
export interface MDBListRatings {
  imdb?: number
  tmdb?: number
  trakt?: number
  letterboxd?: number
  tomatoes?: number // Rotten Tomatoes critics score
  audience?: number // Rotten Tomatoes audience score
  metacritic?: number
  rogerebert?: number
  myanimelist?: number
  score?: number // MDBList composite score
  score_average?: number // MDBList average score
}

/**
 * MDBList user list metadata
 */
export interface MDBListList {
  id: number
  name: string
  slug: string
  description: string
  mediatype: 'movie' | 'show'
  items: number
  likes: number
  user_id?: number
  user_name?: string
  dynamic?: boolean
  private?: boolean
}

/**
 * MDBList item (from list items endpoint)
 */
export interface MDBListItem {
  id: number
  rank: number
  adult: number
  title: string
  imdb_id: string
  tvdb_id: number | null
  language: string
  mediatype: 'movie' | 'show'
  release_year: number
  spoken_language: string
}

/**
 * Comprehensive media information from MDBList
 */
export interface MDBListMediaInfo {
  id?: number
  title: string
  year: number
  released?: string
  released_digital?: string
  description?: string
  runtime?: number
  score?: number
  score_average?: number
  ids: {
    imdb: string
    trakt: number
    tmdb: number
    tvdb: number | null
    mal: number | null
  }
  type: 'movie' | 'show'
  ratings: MDBListRatingDetail[]
  streams?: MDBListStreamProvider[]
  watch_providers?: MDBListWatchProvider[]
  language?: string
  spoken_language?: string
  country?: string
  certification?: string
  commonsense?: boolean
  age_rating?: number
  status?: string
  trailer?: string
  poster?: string
  backdrop?: string
}

/**
 * Detailed rating from a specific source
 */
export interface MDBListRatingDetail {
  source:
    | 'imdb'
    | 'metacritic'
    | 'metacriticuser'
    | 'trakt'
    | 'tomatoes'
    | 'tmdb'
    | 'letterboxd'
    | 'rogerebert'
    | 'myanimelist'
  value: number | null
  score: number | null
  votes: number | null
  url: string | number | null
}

/**
 * Streaming provider information
 */
export interface MDBListStreamProvider {
  id: number
  name: string
}

/**
 * Watch provider information
 */
export interface MDBListWatchProvider {
  id: number
  name: string
}

/**
 * Search result from MDBList
 */
export interface MDBListSearchResult {
  title: string
  year: number
  score: number
  score_average: number
  type: 'movie' | 'show'
  ids: {
    imdbid: string
    tmdbid: number
    traktid: number
    malid: number | null
    tvdbid: number | null
  }
}

/**
 * Search response
 */
export interface MDBListSearchResponse {
  search: MDBListSearchResult[]
  total: number
}

/**
 * List items response
 */
export interface MDBListItemsResponse {
  movies: MDBListItem[]
  shows: MDBListItem[]
}

/**
 * Watchlist item
 */
export interface MDBListWatchlistItem extends MDBListItem {
  watchlist_at: string
}

/**
 * Watchlist response
 */
export interface MDBListWatchlistResponse {
  movies: MDBListWatchlistItem[]
  shows: MDBListWatchlistItem[]
}

/**
 * Ratings bulk request payload
 */
export interface MDBListRatingsBulkRequest {
  ids: (string | number)[]
  provider: 'tmdb' | 'imdb' | 'trakt' | 'tvdb' | 'mal'
}

/**
 * Ratings bulk response
 */
export interface MDBListRatingsBulkResponse {
  provider_id: string
  provider_rating: string
  mediatype: 'movie' | 'show'
  ratings: {
    id: string | number
    rating: number | null
  }[]
}

/**
 * Media info batch request payload
 */
export interface MDBListMediaInfoBatchRequest {
  ids: string[]
  append_to_response?: string[]
}

/**
 * List changes response
 */
export interface MDBListChangesResponse {
  id: number
  movie?: {
    trakt_ids: {
      added: number[]
      removed: number[]
    }
  }
  show?: {
    trakt_ids: {
      added: number[]
      removed: number[]
    }
  }
  updated: string
}

/**
 * Last activities response
 */
export interface MDBListLastActivities {
  watchlisted_at: string
}

/**
 * Modify list/watchlist request payload
 */
export interface MDBListModifyRequest {
  movies?: {
    tmdb?: number
    imdb?: string
  }[]
  shows?: {
    tmdb?: number
    imdb?: string
  }[]
}

/**
 * Modify list/watchlist response
 */
export interface MDBListModifyResponse {
  added: {
    movies: number
    shows: number
  }
  existing: {
    movies: number
    shows: number
  }
  not_found: {
    movies: number
    shows: number
  }
}
