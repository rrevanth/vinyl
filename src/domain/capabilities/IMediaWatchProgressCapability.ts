import type { Media } from '@/src/domain/entities/Media'
import type { Result } from '../types/Result'

/**
 * Progress information for a single episode
 */
export interface EpisodeProgress {
  /** Episode number */
  number: number
  /** Whether this episode has been watched */
  completed: boolean
  /** Date and time when last watched */
  lastWatchedAt?: Date
  /** Number of times this episode has been played */
  plays?: number
}

/**
 * Progress information for a season
 */
export interface SeasonProgress {
  /** Season number */
  number: number
  /** Season title if available */
  title?: string
  /** Total number of aired episodes */
  aired: number
  /** Number of completed episodes */
  completed: number
  /** Progress for each episode in the season */
  episodes: EpisodeProgress[]
}

/**
 * Watch progress for a TV series
 */
export interface SeriesWatchProgress {
  /** Total number of aired episodes */
  aired: number
  /** Total number of completed episodes */
  completed: number
  /** Date and time when last watched */
  lastWatchedAt?: Date
  /** Date and time when progress was reset */
  resetAt?: Date
  /** Progress for each season */
  seasons: SeasonProgress[]
  /** Next episode to watch */
  nextEpisode?: {
    season: number
    number: number
    title?: string
    ids: { trakt?: string; tmdb?: string }
  }
  /** Last episode watched */
  lastEpisode?: {
    season: number
    number: number
    title?: string
    ids: { trakt?: string; tmdb?: string }
  }
}

/**
 * Watch progress for a movie
 */
export interface MovieWatchProgress {
  /** Whether the movie has been watched */
  watched: boolean
  /** Number of times the movie has been played */
  plays: number
  /** Date and time when last watched */
  lastWatchedAt?: Date
}

/**
 * Combined watch progress for any media type
 */
export interface WatchProgress {
  /** Media identifier */
  mediaId: string
  /** Type of media */
  mediaType: 'movie' | 'series'
  /** Movie-specific progress (only for movies) */
  movie?: MovieWatchProgress
  /** Series-specific progress (only for series) */
  series?: SeriesWatchProgress
  /** Date and time when progress was last updated */
  lastUpdated: Date
}

/**
 * Media Watch Progress Capability - Tracks watch progress for media
 * Maps to Trakt `/shows/{id}/progress/watched` API
 */
export interface IMediaWatchProgressCapability {
  /**
   * Get watch progress for a media item
   * @param media - Complete media object
   * @returns Watch progress information
   */
  getProgress(media: Media): Promise<Result<WatchProgress>>

  /**
   * Mark media as watched
   * @param media - Complete media object
   * @param episodeInfo - Episode information (required for series)
   */
  markAsWatched(media: Media, episodeInfo?: { season: number; episode: number }): Promise<Result<void>>

  /**
   * Mark media as unwatched
   * @param media - Complete media object
   * @param episodeInfo - Episode information (required for series)
   */
  markAsUnwatched(media: Media, episodeInfo?: { season: number; episode: number }): Promise<Result<void>>

  /**
   * Indicates whether this capability requires authentication
   * @returns true if authentication is required
   */
  requiresAuth(): boolean
}
