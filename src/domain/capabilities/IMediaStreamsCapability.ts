import type { Media } from '../entities/Media'
import type { Stream } from '../entities/Stream'
import type { Result } from '../types/Result'

/**
 * Provider information containing ID and name
 */
export interface ProviderInfo {
  id: string
  name: string
}

/**
 * Media Streams Capability - THE PRIMARY VALUE PROPOSITION
 * Provides playable stream URLs for media content
 */
export interface IMediaStreamsCapability {
  /**
   * Get available streams for a movie
   * @param media - The movie to get streams for
   * @returns Array of available streams with provider information
   */
  getStreams(media: Media): Promise<Result<{ streams: Stream[]; providerInfo: ProviderInfo }>>

  /**
   * Get available streams for a TV series episode
   * @param media - The series media
   * @param seasonNumber - Season number
   * @param episodeNumber - Episode number
   * @returns Array of available streams for the episode with provider information
   */
  getEpisodeStreams(media: Media, seasonNumber: number, episodeNumber: number): Promise<Result<{ streams: Stream[]; providerInfo: ProviderInfo }>>
}
