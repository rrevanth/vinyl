/**
 * TMDB API request parameter interfaces
 *
 * Type definitions for all TMDB API endpoint parameters including
 * search filters, discover filters, and pagination options.
 */

// Base pagination parameters
export interface TMDBPaginationParams {
  page?: number
}

// Base search parameters
export interface TMDBBaseSearchParams extends TMDBPaginationParams {
  query: string
  include_adult?: boolean
}

// Movie search parameters
export interface TMDBMovieSearchParams extends TMDBBaseSearchParams {
  primary_release_year?: number
  year?: number
  region?: string
}

// TV search parameters
export interface TMDBTVSearchParams extends TMDBBaseSearchParams {
  first_air_date_year?: number
}

// Person search parameters
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TMDBPersonSearchParams extends TMDBBaseSearchParams {
  // Person search has no additional filters
}

// Collection search parameters
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TMDBCollectionSearchParams extends TMDBBaseSearchParams {
  // Collection search has no additional filters
}

// Multi-search parameters
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TMDBMultiSearchParams extends TMDBBaseSearchParams {
  // Multi-search has no additional filters
}

// Discover sort options
export type TMDBDiscoverSortBy =
  | 'popularity.asc'
  | 'popularity.desc'
  | 'release_date.asc'
  | 'release_date.desc'
  | 'revenue.asc'
  | 'revenue.desc'
  | 'primary_release_date.asc'
  | 'primary_release_date.desc'
  | 'original_title.asc'
  | 'original_title.desc'
  | 'vote_average.asc'
  | 'vote_average.desc'
  | 'vote_count.asc'
  | 'vote_count.desc'
  | 'first_air_date.asc'
  | 'first_air_date.desc'
  | 'name.asc'
  | 'name.desc'

// Base discover parameters
export interface TMDBBaseDiscoverParams extends TMDBPaginationParams {
  sort_by?: TMDBDiscoverSortBy
  include_adult?: boolean
  include_video?: boolean
  language?: string
  region?: string

  // Date filters
  'primary_release_date.gte'?: string
  'primary_release_date.lte'?: string
  'release_date.gte'?: string
  'release_date.lte'?: string
  'first_air_date.gte'?: string
  'first_air_date.lte'?: string

  // Vote filters
  'vote_count.gte'?: number
  'vote_count.lte'?: number
  'vote_average.gte'?: number
  'vote_average.lte'?: number

  // Genre filters
  with_genres?: string
  without_genres?: string

  // People filters
  with_cast?: string
  with_crew?: string
  with_people?: string

  // Company filters
  with_companies?: string

  // Keyword filters
  with_keywords?: string
  without_keywords?: string
}

// Movie discover parameters
export interface TMDBDiscoverMovieParams extends TMDBBaseDiscoverParams {
  // Movie-specific filters
  certification_country?: string
  certification?: string
  'certification.lte'?: string
  'certification.gte'?: string

  primary_release_year?: number
  year?: number

  'with_runtime.gte'?: number
  'with_runtime.lte'?: number

  with_original_language?: string

  // Watch providers
  watch_region?: string
  with_watch_providers?: string
  with_watch_monetization_types?: string
}

// TV discover parameters
export interface TMDBDiscoverTVParams extends TMDBBaseDiscoverParams {
  // TV-specific filters
  'air_date.gte'?: string
  'air_date.lte'?: string
  first_air_date_year?: number

  timezone?: string

  'with_runtime.gte'?: number
  'with_runtime.lte'?: number

  with_original_language?: string
  with_networks?: string
  with_status?: string
  with_type?: string

  // Watch providers
  watch_region?: string
  with_watch_providers?: string
  with_watch_monetization_types?: string

  screened_theatrically?: boolean
}

// Simplified filter interfaces for easier usage
export interface TMDBDiscoverMovieFilters {
  page?: number
  sortBy?: TMDBDiscoverSortBy
  includeAdult?: boolean
  includeVideo?: boolean

  // Date filters
  releaseDateGte?: string
  releaseDateLte?: string
  primaryReleaseYear?: number
  year?: number

  // Rating filters
  voteCountGte?: number
  voteCountLte?: number
  voteAverageGte?: number
  voteAverageLte?: number

  // Genre filters (array of genre IDs)
  withGenres?: number[]
  withoutGenres?: number[]

  // People filters (array of person IDs)
  withCast?: number[]
  withCrew?: number[]
  withPeople?: number[]

  // Company filters (array of company IDs)
  withCompanies?: number[]

  // Keyword filters (array of keyword IDs)
  withKeywords?: number[]
  withoutKeywords?: number[]

  // Runtime filters
  runtimeGte?: number
  runtimeLte?: number

  // Language/region
  originalLanguage?: string
  region?: string

  // Certification
  certification?: string
  certificationCountry?: string

  // Watch providers
  watchRegion?: string
  withWatchProviders?: number[]
  withWatchMonetizationTypes?: ('flatrate' | 'free' | 'ads' | 'rent' | 'buy')[]
}

export interface TMDBDiscoverTVFilters {
  page?: number
  sortBy?: TMDBDiscoverSortBy
  includeAdult?: boolean

  // Date filters
  airDateGte?: string
  airDateLte?: string
  firstAirDateYear?: number

  // Rating filters
  voteCountGte?: number
  voteCountLte?: number
  voteAverageGte?: number
  voteAverageLte?: number

  // Genre filters (array of genre IDs)
  withGenres?: number[]
  withoutGenres?: number[]

  // People filters (array of person IDs)
  withCast?: number[]
  withCrew?: number[]
  withPeople?: number[]

  // Company filters (array of company IDs)
  withCompanies?: number[]

  // Network filters (array of network IDs)
  withNetworks?: number[]

  // Keyword filters (array of keyword IDs)
  withKeywords?: number[]
  withoutKeywords?: number[]

  // Runtime filters
  runtimeGte?: number
  runtimeLte?: number

  // Language/region
  originalLanguage?: string
  region?: string
  timezone?: string

  // TV-specific filters
  withStatus?: ('returning_series' | 'planned' | 'in_production' | 'ended' | 'canceled' | 'pilot')[]
  withType?: (
    | 'documentary'
    | 'news'
    | 'miniseries'
    | 'reality'
    | 'scripted'
    | 'talk_show'
    | 'video'
  )[]

  // Watch providers
  watchRegion?: string
  withWatchProviders?: number[]
  withWatchMonetizationTypes?: ('flatrate' | 'free' | 'ads' | 'rent' | 'buy')[]

  screenedTheatrically?: boolean
}

// Configuration request parameters
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TMDBConfigurationParams {
  // No parameters for basic configuration
}

// Trending parameters
export interface TMDBTrendingParams extends TMDBPaginationParams {
  time_window?: 'day' | 'week'
}

// Popular/Top Rated list parameters
export interface TMDBListParams extends TMDBPaginationParams {
  language?: string
  region?: string
}

// Person detail parameters
export interface TMDBPersonParams {
  person_id: number
  append_to_response?: string
  language?: string
}

// Movie detail parameters
export interface TMDBMovieParams {
  movie_id: number
  append_to_response?: string
  language?: string
}

// TV detail parameters
export interface TMDBTVParams {
  tv_id: number
  append_to_response?: string
  language?: string
}

// Season detail parameters
export interface TMDBSeasonParams {
  tv_id: number
  season_number: number
  append_to_response?: string
  language?: string
}

// Episode detail parameters
export interface TMDBEpisodeParams {
  tv_id: number
  season_number: number
  episode_number: number
  append_to_response?: string
  language?: string
}

// Search options for convenience
export interface TMDBSearchOptions {
  page?: number
  includeAdult?: boolean
  region?: string
  year?: number
  primaryReleaseYear?: number
  firstAirDateYear?: number
}
