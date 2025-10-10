import type { VideoPlayerType } from '@/src/domain/entities/VideoPlayerType'

/**
 * Service interface for managing user preferences
 * Provides access to user preferences without direct store manipulation
 */
export interface IPreferencesService {
  /**
   * Get the user's preferred video player type
   * @returns The preferred video player type (expo-av, vlc, or native)
   */
  getVideoPlayerPreference(): VideoPlayerType

  /**
   * Set the user's preferred video player type
   * @param player - The video player type to set as preferred
   */
  setVideoPlayerPreference(player: VideoPlayerType): Promise<void>
}
