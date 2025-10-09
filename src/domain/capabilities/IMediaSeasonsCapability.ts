import type { Media } from '../entities/Media'
import type { Result } from '../types/Result'

/**
 * Media Seasons Capability - Provides season and episode information for TV series
 */
export interface IMediaSeasonsCapability {
  /**
   * Get detailed season information for a TV series
   * @param media - The TV series media
   * @param seasonNumber - Optional specific season number
   * @returns Array of seasons with episode details
   */
  getSeasons(media: Media, seasonNumber?: number): Promise<Result<Season[]>>

  /**
   * Get specific episode details
   * @param media - The TV series media
   * @param seasonNumber - Season number
   * @param episodeNumber - Episode number
   * @returns Detailed episode information, or null if not found
   */
  getEpisode(media: Media, seasonNumber: number, episodeNumber: number): Promise<Result<Episode | null>>
}

/**
 * Represents a TV season with episodes
 */
export interface Season {
  id: string
  seasonNumber: number
  name?: string
  overview?: string
  airDate?: Date
  episodeCount: number
  episodes: Episode[]
  posterPath?: string
}

/**
 * Represents a TV episode
 */
export interface Episode {
  id: string
  episodeNumber: number
  seasonNumber: number
  name: string
  overview?: string
  airDate?: Date
  runtime?: number // in minutes
  stillPath?: string // Episode screenshot
  voteAverage?: number
  voteCount?: number
  productionCode?: string
}
