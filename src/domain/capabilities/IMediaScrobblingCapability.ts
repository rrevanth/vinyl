import type { Media } from '@/src/domain/entities/Media'

/**
 * Media Scrobbling Capability - Manages real-time playback tracking and check-ins
 * Maps to Trakt scrobble and check-in APIs
 */
export interface IMediaScrobblingCapability {
  /**
   * Start scrobbling (tracking playback progress)
   * @param media - Complete media object being watched
   * @param progress - Playback progress as a percentage (0-100)
   * @param episodeInfo - Episode information (required for series)
   */
  startScrobble(
    media: Media,
    progress: number,
    episodeInfo?: { season: number; episode: number }
  ): Promise<void>

  /**
   * Pause scrobbling
   * @param media - Complete media object being watched
   * @param progress - Playback progress as a percentage (0-100)
   * @param episodeInfo - Episode information (required for series)
   */
  pauseScrobble(
    media: Media,
    progress: number,
    episodeInfo?: { season: number; episode: number }
  ): Promise<void>

  /**
   * Stop scrobbling (end playback tracking)
   * @param media - Complete media object being watched
   * @param progress - Final playback progress as a percentage (0-100)
   * @param episodeInfo - Episode information (required for series)
   */
  stopScrobble(
    media: Media,
    progress: number,
    episodeInfo?: { season: number; episode: number }
  ): Promise<void>

  /**
   * Check-in to media (social feature for sharing what you're watching)
   * @param media - Complete media object being watched
   * @param message - Optional social message to share
   * @param episodeInfo - Episode information (required for series)
   */
  checkin(
    media: Media,
    message?: string,
    episodeInfo?: { season: number; episode: number }
  ): Promise<void>

  /**
   * Cancel an active check-in
   */
  cancelCheckin(): Promise<void>

  /**
   * Indicates whether this capability requires authentication
   * @returns true if authentication is required
   */
  requiresAuth(): boolean
}
