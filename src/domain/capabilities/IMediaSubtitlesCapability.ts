import type { Media } from '../entities/Media'
import type { Subtitle } from '../entities/Stream'

/**
 * Media Subtitles Capability - Provides subtitle files for content
 */
export interface IMediaSubtitlesCapability {
  /**
   * Get available subtitles for a movie
   * @param media - The movie to get subtitles for
   * @returns Array of available subtitles
   */
  getSubtitles(media: Media): Promise<Subtitle[]>

  /**
   * Get available subtitles for a TV series episode
   * @param media - The series media
   * @param seasonNumber - Season number
   * @param episodeNumber - Episode number
   * @returns Array of available subtitles for the episode
   */
  getEpisodeSubtitles(
    media: Media,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<Subtitle[]>
}
