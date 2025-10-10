import type { IPreferencesService } from '@/src/domain/services/IPreferencesService'
import type { VideoPlayerType } from '@/src/domain/entities/VideoPlayerType'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'

/**
 * PreferencesService implementation
 * Provides access to user preferences through the reactive store
 */
export class PreferencesService implements IPreferencesService {
  /**
   * Get the user's preferred video player type
   * @returns The preferred video player type from user preferences
   */
  getVideoPlayerPreference(): VideoPlayerType {
    return userPreferences$.playback.preferredVideoPlayer.get()
  }

  /**
   * Set the user's preferred video player type
   * Automatically persists to storage via Legend State
   * @param player - The video player type to set as preferred
   */
  async setVideoPlayerPreference(player: VideoPlayerType): Promise<void> {
    userPreferences$.playback.preferredVideoPlayer.set(player)
  }
}
