/**
 * Fanart.tv API Types
 *
 * Type definitions for Fanart.tv API responses
 * Based on https://fanart.tv API v3 specification
 */

/**
 * Base Fanart image with metadata
 */
export interface FanartImage {
  id: string
  url: string
  lang: string
  likes: string
}

/**
 * Movie disc image (extends FanartImage)
 */
export interface FanartMovieDisc extends FanartImage {
  disc: string
  disc_type: string
}

/**
 * Movie images response from Fanart.tv
 */
export interface FanartMovieImages {
  name: string
  tmdb_id: string
  imdb_id: string
  hdmovielogo?: FanartImage[]
  movielogo?: FanartImage[]
  hdclearart?: FanartImage[]
  hdmovieclearart?: FanartImage[]
  movieart?: FanartImage[]
  moviedisc?: FanartMovieDisc[]
  movieposter?: FanartImage[]
  moviebackground?: FanartImage[]
  moviebanner?: FanartImage[]
  moviethumb?: FanartImage[]
}

/**
 * TV show images response from Fanart.tv
 */
export interface FanartShowImages {
  name: string
  thetvdb_id: string
  hdtvlogo?: FanartImage[]
  clearlogo?: FanartImage[]
  clearart?: FanartImage[]
  hdclearart?: FanartImage[]
  showbackground?: FanartImage[]
  tvthumb?: FanartImage[]
  seasonposter?: FanartImage[]
  seasonthumb?: FanartImage[]
  seasonbanner?: FanartImage[]
  characterart?: FanartImage[]
  tvposter?: FanartImage[]
  tvbanner?: FanartImage[]
}

/**
 * Fanart.tv error response
 */
export interface FanartErrorResponse {
  status: 'error'
  error_message?: string
  'error message'?: string
}
