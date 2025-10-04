import type { Media } from '../entities/Media'

/**
 * Media Ratings Capability - Provides ratings and reviews aggregation
 */
export interface IMediaRatingsCapability {
  /**
   * Get ratings from various sources for media
   * @param media - The media to get ratings for
   * @returns Aggregated ratings from different platforms
   */
  getRatings(media: Media): Promise<MediaRatings>
}

/**
 * Aggregated ratings from various sources
 */
export interface MediaRatings {
  imdb?: Rating
  tmdb?: Rating
  rottenTomatoes?: RottenTomatoesRating
  metacritic?: Rating
  trakt?: Rating
  letterboxd?: Rating
  average?: number // Calculated average across sources
  sources: string[] // List of platforms that provided ratings
}

/**
 * Standard rating structure
 */
export interface Rating {
  score: number
  maxScore: number
  voteCount?: number
  url?: string
}

/**
 * Rotten Tomatoes specific rating with critic/audience split
 */
export interface RottenTomatoesRating {
  critics: Rating
  audience: Rating
  consensus?: string
}
