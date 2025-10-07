/**
 * Comprehensive Trakt API response types
 *
 * Based on the official Trakt API documentation, covering all media objects
 * and response formats with support for extended info levels.
 */

/**
 * Common ID mappings used across all media types
 */
export interface TraktIds {
  trakt: number
  slug: string
  imdb?: string
  tmdb?: number
  tvdb?: number
}

/**
 * Image URLs returned when extended=images
 */
export interface TraktImages {
  fanart?: string[]
  poster?: string[]
  logo?: string[]
  clearart?: string[]
  banner?: string[]
  thumb?: string[]
  screenshot?: string[] // For episodes
  headshot?: string[] // For people
}

/**
 * User object (minimal and extended versions)
 */
export interface TraktUser {
  username: string
  private: boolean
  name?: string
  vip?: boolean
  vip_ep?: boolean
  ids: {
    slug: string
  }
  // Extended fields
  joined_at?: string
  location?: string
  about?: string
  gender?: string
  age?: number
  images?: TraktImages
}

/**
 * Movie object (minimal and extended versions)
 */
export interface TraktMovie {
  title: string
  year: number
  ids: TraktIds

  // Extended fields (when extended=full)
  tagline?: string
  overview?: string
  released?: string
  runtime?: number
  country?: string
  trailer?: string
  homepage?: string
  status?: string
  rating?: number
  votes?: number
  comment_count?: number
  language?: string
  available_translations?: string[]
  genres?: string[]
  certification?: string

  // Images (when extended=images)
  images?: TraktImages

  // Metadata (when extended=metadata)
  updated_at?: string
}

/**
 * Show object (minimal and extended versions)
 */
export interface TraktShow {
  title: string
  year: number
  ids: TraktIds

  // Extended fields (when extended=full)
  overview?: string
  first_aired?: string
  airs?: {
    day?: string
    time?: string
    timezone?: string
  }
  runtime?: number
  certification?: string
  network?: string
  country?: string
  trailer?: string
  homepage?: string
  status?: string
  rating?: number
  votes?: number
  comment_count?: number
  language?: string
  available_translations?: string[]
  genres?: string[]
  aired_episodes?: number

  // Images (when extended=images)
  images?: TraktImages

  // Metadata (when extended=metadata)
  updated_at?: string
}

/**
 * Season object (minimal and extended versions)
 */
export interface TraktSeason {
  number: number
  ids: TraktIds

  // Extended fields (when extended=full)
  title?: string
  overview?: string
  first_aired?: string
  episode_count?: number
  aired_episodes?: number
  rating?: number
  votes?: number

  // Images (when extended=images)
  images?: TraktImages

  // Episodes (when episodes are included)
  episodes?: TraktEpisode[]
}

/**
 * Episode object (minimal and extended versions)
 */
export interface TraktEpisode {
  season: number
  number: number
  title?: string
  ids: TraktIds

  // Extended fields (when extended=full)
  number_abs?: number // Absolute number for anime
  overview?: string
  first_aired?: string
  runtime?: number
  rating?: number
  votes?: number
  comment_count?: number
  available_translations?: string[]

  // Images (when extended=images)
  images?: TraktImages

  // Metadata (when extended=metadata)
  updated_at?: string
}

/**
 * Person object (minimal and extended versions)
 */
export interface TraktPerson {
  name: string
  ids: TraktIds

  // Extended fields (when extended=full)
  biography?: string
  birthday?: string
  death?: string
  birthplace?: string
  homepage?: string

  // Images (when extended=images)
  images?: TraktImages
}

/**
 * Cast member for a person's filmography
 */
export interface TraktPersonCastCredit {
  characters: string[]
  episode_count?: number // Shows only
  series_regular?: boolean // Shows only
  movie?: TraktMovie
  show?: TraktShow
}

/**
 * Crew member for a person's filmography
 */
export interface TraktPersonCrewCredit {
  jobs: string[]
  episode_count?: number // Shows only
  movie?: TraktMovie
  show?: TraktShow
}

/**
 * Complete filmography response for a person
 */
export interface TraktPersonCredits {
  cast: TraktPersonCastCredit[]
  crew: {
    directing?: TraktPersonCrewCredit[]
    writing?: TraktPersonCrewCredit[]
    production?: TraktPersonCrewCredit[]
    art?: TraktPersonCrewCredit[]
    'costume & make-up'?: TraktPersonCrewCredit[]
    sound?: TraktPersonCrewCredit[]
    camera?: TraktPersonCrewCredit[]
    'visual effects'?: TraktPersonCrewCredit[]
    lighting?: TraktPersonCrewCredit[]
    editing?: TraktPersonCrewCredit[]
    'created by'?: TraktPersonCrewCredit[]
  }
}

/**
 * List object
 */
export interface TraktList {
  name: string
  description?: string
  privacy: 'private' | 'friends' | 'public'
  display_numbers: boolean
  allow_comments: boolean
  sort_by: string
  sort_how: 'asc' | 'desc'
  created_at: string
  updated_at: string
  item_count: number
  comment_count: number
  like_count: number
  ids: {
    trakt: number
    slug: string
  }
  user: TraktUser
}

/**
 * Calendar entry for shows
 */
export interface TraktCalendarShow {
  first_aired: string
  episode: TraktEpisode
  show: TraktShow
}

/**
 * Calendar entry for movies
 */
export interface TraktCalendarMovie {
  released: string
  movie: TraktMovie
}

/**
 * Check-in response
 */
export interface TraktCheckinResponse {
  id: number
  watched_at: string
  sharing?: {
    twitter?: boolean
    mastodon?: boolean
    tumblr?: boolean
  }
  movie?: TraktMovie
  episode?: TraktEpisode
  show?: TraktShow
}

/**
 * Comment object
 */
export interface TraktComment {
  id: number
  parent_id: number
  created_at: string
  updated_at: string
  comment: string
  spoiler: boolean
  review: boolean
  replies: number
  likes: number
  user_stats?: {
    rating?: number
    play_count?: number
    completed_count?: number
  }
  user: TraktUser
}

/**
 * Search result object
 */
export interface TraktSearchResult {
  type: 'movie' | 'show' | 'episode' | 'person' | 'list'
  score: number
  movie?: TraktMovie
  show?: TraktShow
  episode?: TraktEpisode
  person?: TraktPerson
  list?: TraktList
}

/**
 * User stats object
 */
export interface TraktUserStats {
  movies: {
    plays: number
    watched: number
    minutes: number
    collected: number
    ratings: number
    comments: number
  }
  shows: {
    watched: number
    collected: number
    ratings: number
    comments: number
  }
  seasons: {
    ratings: number
    comments: number
  }
  episodes: {
    plays: number
    watched: number
    minutes: number
    collected: number
    ratings: number
    comments: number
  }
  network: {
    friends: number
    followers: number
    following: number
  }
  ratings: {
    total: number
    distribution: {
      [key: string]: number // "1" through "10"
    }
  }
}

/**
 * Sync response for collection/watchlist operations
 */
export interface TraktSyncResponse {
  added: {
    movies?: number
    shows?: number
    seasons?: number
    episodes?: number
  }
  deleted: {
    movies?: number
    shows?: number
    seasons?: number
    episodes?: number
  }
  existing: {
    movies?: number
    shows?: number
    seasons?: number
    episodes?: number
  }
  not_found: {
    movies?: TraktMovie[]
    shows?: TraktShow[]
    seasons?: TraktSeason[]
    episodes?: TraktEpisode[]
  }
}

/**
 * History item
 */
export interface TraktHistoryItem {
  id: number
  watched_at: string
  action: 'scrobble' | 'checkin' | 'watch'
  type: 'movie' | 'episode'
  movie?: TraktMovie
  episode?: TraktEpisode
  show?: TraktShow
}

/**
 * Watchlist item
 */
export interface TraktWatchlistItem {
  rank: number
  listed_at: string
  type: 'movie' | 'show' | 'season' | 'episode'
  movie?: TraktMovie
  show?: TraktShow
  season?: TraktSeason
  episode?: TraktEpisode
}

/**
 * Collection item (movies or shows)
 */
export interface TraktCollectionItem {
  last_collected_at: string
  last_updated_at: string
  movie?: TraktMovie
  show?: TraktShow
  seasons?: TraktSeason[]
}

/**
 * Certification object
 */
export interface TraktCertification {
  name: string
  slug: string
  description: string
}

/**
 * Certifications response
 */
export interface TraktCertifications {
  us: TraktCertification[]
}

/**
 * Pagination headers (returned in HTTP headers)
 */
export interface TraktPaginationHeaders {
  'X-Pagination-Page': number
  'X-Pagination-Limit': number
  'X-Pagination-Page-Count': number
  'X-Pagination-Item-Count': number
}

/**
 * Rate limit headers
 */
export interface TraktRateLimitHeaders {
  'X-Ratelimit': string // JSON object with rate limit info
  'Retry-After'?: number
}

/**
 * Error response from Trakt API
 */
export interface TraktErrorResponse {
  error?: string
  error_description?: string
  expires_at?: string // For 409 conflicts (checkin in progress)
}

/**
 * Playback progress item (continue watching)
 */
export interface TraktPlaybackItem {
  id: number
  progress: number
  paused_at: string
  type: 'movie' | 'episode'
  movie?: TraktMovie
  episode?: TraktEpisode
  show?: TraktShow
}

/**
 * Episode progress for show progress tracking
 */
export interface TraktEpisodeProgress {
  number: number
  completed: boolean
  last_watched_at?: string
  plays?: number
}

/**
 * Season progress for show progress tracking
 */
export interface TraktSeasonProgress {
  number: number
  title?: string
  aired: number
  completed: number
  episodes: TraktEpisodeProgress[]
}

/**
 * Next/Last episode info in show progress
 */
export interface TraktProgressEpisode {
  season: number
  number: number
  title?: string
  ids: TraktIds
}

/**
 * Show watched progress response
 */
export interface TraktShowProgress {
  aired: number
  completed: number
  last_watched_at?: string
  reset_at?: string
  seasons: TraktSeasonProgress[]
  hidden_seasons?: TraktSeasonProgress[]
  next_episode?: TraktProgressEpisode
  last_episode?: TraktProgressEpisode
}

/**
 * Video object (trailers, teasers, clips, etc.)
 */
export interface TraktVideo {
  title: string
  url: string
  site: string // 'youtube', 'vimeo', etc.
  type: 'trailer' | 'teaser' | 'clip' | 'featurette'
  size: number // 1080, 720, etc.
  official: boolean
  published_at: string
  country: string
  language: string
}

/**
 * Generic API response wrapper
 */
export interface TraktApiResponse<T> {
  data: T
  headers: Headers
  status: number
}
