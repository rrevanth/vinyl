import type { Media } from '../entities/Media'
import type { Stream } from '../entities/Stream'
import type { Result } from '../types/Result'

/**
 * Media Streams Capability - THE PRIMARY VALUE PROPOSITION
 * Provides playable stream URLs for media content
 */
export interface IMediaStreamsCapability {
  /**
   * Get available streams for a movie
   * @param media - The movie to get streams for
   * @returns Array of available streams
   */
  getStreams(media: Media): Promise<Result<Stream[]>>

  /**
   * Get available streams for a TV series episode
   * @param media - The series media
   * @param seasonNumber - Season number
   * @param episodeNumber - Episode number
   * @returns Array of available streams for the episode
   */
  getEpisodeStreams(media: Media, seasonNumber: number, episodeNumber: number): Promise<Result<Stream[]>>
}
