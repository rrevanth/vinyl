/**
 * Base TMDB response interfaces and common types
 *
 * All TMDB API response types with complete coverage for append_to_response options.
 * Based on TMDB API v3 documentation: https://developers.themoviedb.org/3
 */

// Base response structure for all TMDB entities
export interface TMDBBaseResponse {
  id: number
  adult?: boolean
  original_language?: string
  popularity?: number
  vote_average?: number
  vote_count?: number
}

// Paginated response wrapper
export interface TMDBPaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

// Image size types for type safety
export type TMDBImageSize =
  // Poster sizes
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'original'
  // Backdrop sizes
  | 'w300'
  | 'w780'
  | 'w1280'
  // Profile sizes
  | 'w45'
  | 'h632'

// Date strings (YYYY-MM-DD format)
export type TMDBDateString = string

// External ID services
export interface TMDBExternalIdsResponse {
  imdb_id?: string | null
  facebook_id?: string | null
  instagram_id?: string | null
  twitter_id?: string | null
  freebase_mid?: string | null
  freebase_id?: string | null
  tvdb_id?: number | null
  tvrage_id?: number | null
  wikidata_id?: string | null
}

// Genre
export interface TMDBGenre {
  id: number
  name: string
}

// Production company
export interface TMDBProductionCompany {
  id: number
  logo_path?: string | null
  name: string
  origin_country: string
}

// Production country
export interface TMDBProductionCountry {
  iso_3166_1: string
  name: string
}

// Spoken language
export interface TMDBSpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

// Collection
export interface TMDBCollection {
  id: number
  name: string
  poster_path?: string | null
  backdrop_path?: string | null
}

// Keyword
export interface TMDBKeyword {
  id: number
  name: string
}

export interface TMDBKeywordsResponse {
  keywords: TMDBKeyword[]
}

// Video
export interface TMDBVideo {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: TMDBDateString
  id: string
}

export interface TMDBVideosResponse {
  results: TMDBVideo[]
}

// Image
export interface TMDBImage {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1?: string | null
  vote_average: number
  vote_count: number
  width: number
}

export interface TMDBImagesResponse {
  backdrops: TMDBImage[]
  logos: TMDBImage[]
  posters: TMDBImage[]
}

// Person images (different structure)
export interface TMDBPersonImagesResponse {
  profiles: TMDBImage[]
}

// Tagged image (for person tagged images)
export interface TMDBTaggedImage extends TMDBImage {
  id: string
  image_type: string
  media: TMDBMovieResponse | TMDBTVResponse
  media_type: 'movie' | 'tv'
}

// Review
export interface TMDBReviewResponse {
  id: string
  author: string
  author_details: {
    name?: string
    username?: string
    avatar_path?: string | null
    rating?: number | null
  }
  content: string
  created_at: TMDBDateString
  updated_at: TMDBDateString
  url: string
}

// Credits - Cast member
export interface TMDBCastMember {
  adult?: boolean
  gender?: number | null
  id: number
  known_for_department?: string
  name: string
  original_name: string
  popularity?: number
  profile_path?: string | null
  cast_id?: number
  character: string
  credit_id: string
  order: number
}

// Credits - Crew member
export interface TMDBCrewMember {
  adult?: boolean
  gender?: number | null
  id: number
  known_for_department?: string
  name: string
  original_name: string
  popularity?: number
  profile_path?: string | null
  credit_id: string
  department: string
  job: string
}

// Credits response
export interface TMDBCreditsResponse {
  id?: number
  cast: TMDBCastMember[]
  crew: TMDBCrewMember[]
}

// Network (for TV shows)
export interface TMDBNetwork {
  id: number
  logo_path?: string | null
  name: string
  origin_country: string
}

// Creator (for TV shows)
export interface TMDBCreatedBy {
  id: number
  credit_id: string
  name: string
  gender?: number | null
  profile_path?: string | null
}

// Episode
export interface TMDBEpisode {
  air_date?: TMDBDateString | null
  episode_number: number
  id: number
  name: string
  overview: string
  production_code?: string
  runtime?: number | null
  season_number: number
  show_id: number
  still_path?: string | null
  vote_average: number
  vote_count: number
  crew?: TMDBCrewMember[]
  guest_stars?: TMDBCastMember[]
}

// Season
export interface TMDBSeason {
  air_date?: TMDBDateString | null
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path?: string | null
  season_number: number
}

// Translation
export interface TMDBTranslation {
  iso_3166_1: string
  iso_639_1: string
  name: string
  english_name: string
  data: {
    homepage?: string
    overview?: string
    runtime?: number
    tagline?: string
    title?: string
  }
}

export interface TMDBTranslationsResponse {
  translations: TMDBTranslation[]
}

// Content rating (for TV shows)
export interface TMDBContentRating {
  descriptors: string[]
  iso_3166_1: string
  rating: string
}

export interface TMDBContentRatingsResponse {
  results: TMDBContentRating[]
}

// Release date (for movies)
export interface TMDBReleaseDate {
  certification: string
  iso_639_1: string
  note?: string
  release_date: TMDBDateString
  type: number
}

export interface TMDBReleaseDatesResponse {
  results: {
    iso_3166_1: string
    release_dates: TMDBReleaseDate[]
  }[]
}

// Watch providers
export interface TMDBWatchProvider {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}

export interface TMDBWatchProviderRegion {
  link?: string
  buy?: TMDBWatchProvider[]
  flatrate?: TMDBWatchProvider[]
  rent?: TMDBWatchProvider[]
  ads?: TMDBWatchProvider[]
}

export interface TMDBWatchProvidersResponse {
  id?: number
  results: Record<string, TMDBWatchProviderRegion>
}

// Main entity interfaces
export interface TMDBMovieResponse extends TMDBBaseResponse {
  backdrop_path?: string | null
  genre_ids?: number[]
  original_title: string
  overview: string
  poster_path?: string | null
  release_date: TMDBDateString
  title: string
  video: boolean

  // Extended movie details (when fetching by ID)
  belongs_to_collection?: TMDBCollection | null
  budget?: number
  genres?: TMDBGenre[]
  homepage?: string | null
  imdb_id?: string | null
  production_companies?: TMDBProductionCompany[]
  production_countries?: TMDBProductionCountry[]
  revenue?: number
  runtime?: number | null
  spoken_languages?: TMDBSpokenLanguage[]
  status?: string
  tagline?: string | null

  // append_to_response fields
  credits?: TMDBCreditsResponse
  videos?: TMDBVideosResponse
  images?: TMDBImagesResponse
  reviews?: TMDBPaginatedResponse<TMDBReviewResponse>
  recommendations?: TMDBPaginatedResponse<TMDBMovieResponse>
  similar?: TMDBPaginatedResponse<TMDBMovieResponse>
  keywords?: TMDBKeywordsResponse
  external_ids?: TMDBExternalIdsResponse
  translations?: TMDBTranslationsResponse
  release_dates?: TMDBReleaseDatesResponse
  watch_providers?: TMDBWatchProvidersResponse
}

export interface TMDBTVResponse extends TMDBBaseResponse {
  backdrop_path?: string | null
  first_air_date: TMDBDateString
  genre_ids?: number[]
  name: string
  origin_country: string[]
  original_name: string
  overview: string
  poster_path?: string | null

  // Extended TV details (when fetching by ID)
  created_by?: TMDBCreatedBy[]
  episode_run_time?: number[]
  genres?: TMDBGenre[]
  homepage?: string | null
  in_production?: boolean
  languages?: string[]
  last_air_date?: TMDBDateString | null
  last_episode_to_air?: TMDBEpisode | null
  next_episode_to_air?: TMDBEpisode | null
  networks?: TMDBNetwork[]
  number_of_episodes?: number
  number_of_seasons?: number
  production_companies?: TMDBProductionCompany[]
  production_countries?: TMDBProductionCountry[]
  seasons?: TMDBSeason[]
  spoken_languages?: TMDBSpokenLanguage[]
  status?: string
  tagline?: string | null
  type?: string

  // append_to_response fields
  credits?: TMDBCreditsResponse
  videos?: TMDBVideosResponse
  images?: TMDBImagesResponse
  reviews?: TMDBPaginatedResponse<TMDBReviewResponse>
  recommendations?: TMDBPaginatedResponse<TMDBTVResponse>
  similar?: TMDBPaginatedResponse<TMDBTVResponse>
  keywords?: TMDBKeywordsResponse
  external_ids?: TMDBExternalIdsResponse
  translations?: TMDBTranslationsResponse
  content_ratings?: TMDBContentRatingsResponse
  watch_providers?: TMDBWatchProvidersResponse
  aggregate_credits?: TMDBAggregateCreditsResponse
}

export interface TMDBPersonResponse extends TMDBBaseResponse {
  gender?: number | null
  known_for_department?: string
  name: string
  profile_path?: string | null

  // Extended person details (when fetching by ID)
  also_known_as?: string[]
  biography?: string
  birthday?: TMDBDateString | null
  deathday?: TMDBDateString | null
  homepage?: string | null
  imdb_id?: string | null
  place_of_birth?: string | null

  // append_to_response fields
  movie_credits?: TMDBPersonMovieCreditsResponse
  tv_credits?: TMDBPersonTVCreditsResponse
  combined_credits?: TMDBPersonCombinedCreditsResponse
  external_ids?: TMDBExternalIdsResponse
  images?: TMDBPersonImagesResponse
  tagged_images?: TMDBPaginatedResponse<TMDBTaggedImage>
  translations?: TMDBTranslationsResponse
}

// Person credits
export interface TMDBPersonMovieCreditsResponse {
  cast: (TMDBMovieResponse & { character: string; credit_id: string; order?: number })[]
  crew: (TMDBMovieResponse & { department: string; job: string; credit_id: string })[]
}

export interface TMDBPersonTVCreditsResponse {
  cast: (TMDBTVResponse & { character: string; credit_id: string; episode_count: number })[]
  crew: (TMDBTVResponse & { department: string; job: string; credit_id: string; episode_count: number })[]
}

export interface TMDBPersonCombinedCreditsResponse {
  cast: ((TMDBMovieResponse | TMDBTVResponse) & {
      media_type: 'movie' | 'tv'
      character?: string
      credit_id: string
      order?: number
      episode_count?: number
    })[]
  crew: ((TMDBMovieResponse | TMDBTVResponse) & {
      media_type: 'movie' | 'tv'
      department: string
      job: string
      credit_id: string
      episode_count?: number
    })[]
}

// Aggregate credits (for TV shows)
export interface TMDBAggregateCreditsResponse {
  cast: {
    adult?: boolean
    gender?: number | null
    id: number
    known_for_department?: string
    name: string
    original_name: string
    popularity?: number
    profile_path?: string | null
    roles: {
      credit_id: string
      character: string
      episode_count: number
    }[]
    total_episode_count: number
    order: number
  }[]
  crew: {
    adult?: boolean
    gender?: number | null
    id: number
    known_for_department?: string
    name: string
    original_name: string
    popularity?: number
    profile_path?: string | null
    jobs: {
      credit_id: string
      job: string
      episode_count: number
    }[]
    department: string
    total_episode_count: number
  }[]
}

// Search result union type
export type TMDBSearchResult =
  | TMDBMovieResponse
  | TMDBTVResponse
  | TMDBPersonResponse
  | TMDBCollectionResponse

// Multi-search results (includes media_type)
export interface TMDBMultiSearchResult extends TMDBBaseResponse {
  media_type: 'movie' | 'tv' | 'person'

  // Movie fields
  title?: string
  original_title?: string
  release_date?: TMDBDateString
  video?: boolean

  // TV fields
  name?: string
  original_name?: string
  first_air_date?: TMDBDateString
  origin_country?: string[]

  // Person fields
  gender?: number | null
  known_for_department?: string
  known_for?: (TMDBMovieResponse | TMDBTVResponse)[]

  // Common fields
  backdrop_path?: string | null
  genre_ids?: number[]
  overview?: string
  poster_path?: string | null
  profile_path?: string | null
}

// Collection response
export interface TMDBCollectionResponse {
  id: number
  name: string
  overview: string
  poster_path?: string | null
  backdrop_path?: string | null
  parts?: TMDBMovieResponse[]
}

// Configuration responses
export interface TMDBConfigurationResponse {
  images: {
    base_url: string
    secure_base_url: string
    backdrop_sizes: string[]
    logo_sizes: string[]
    poster_sizes: string[]
    profile_sizes: string[]
    still_sizes: string[]
  }
  change_keys: string[]
}

export interface TMDBCountryResponse {
  iso_3166_1: string
  english_name: string
  native_name?: string
}

export interface TMDBLanguageResponse {
  iso_639_1: string
  english_name: string
  name: string
}

// Append to response options (for type safety)
export type TMDBMovieAppendToResponse =
  | 'credits'
  | 'videos'
  | 'images'
  | 'reviews'
  | 'recommendations'
  | 'similar'
  | 'keywords'
  | 'external_ids'
  | 'translations'
  | 'release_dates'
  | 'watch_providers'

export type TMDBTVAppendToResponse =
  | 'credits'
  | 'videos'
  | 'images'
  | 'reviews'
  | 'recommendations'
  | 'similar'
  | 'keywords'
  | 'external_ids'
  | 'translations'
  | 'content_ratings'
  | 'watch_providers'
  | 'aggregate_credits'

export type TMDBPersonAppendToResponse =
  | 'movie_credits'
  | 'tv_credits'
  | 'combined_credits'
  | 'external_ids'
  | 'images'
  | 'tagged_images'
  | 'translations'
