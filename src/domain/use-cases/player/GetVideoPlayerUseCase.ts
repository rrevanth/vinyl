import { Platform } from 'react-native'
import type { VideoPlayerType } from '@/src/domain/entities/VideoPlayerType'
import { VideoPlayerType as PlayerType } from '@/src/domain/entities/VideoPlayerType'
import type { IPreferencesService } from '@/src/domain/services/IPreferencesService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

/**
 * Use case for determining which video player to use
 * Returns the user's preferred player (all players available on all platforms)
 */
export class GetVideoPlayerUseCase {
  constructor(
    private preferencesService: IPreferencesService,
    private logger: ILoggingService
  ) {}

  /**
   * Execute the use case to get the video player type
   *
   * Returns the user's preferred player with fallback to EXPO_VIDEO
   *
   * @returns The video player type to use
   */
  execute(): VideoPlayerType {
    const preference = this.preferencesService.getVideoPlayerPreference()
    const platform = Platform.OS

    this.logger.info('Using video player', {
      player: preference,
      platform,
    })

    return preference || PlayerType.EXPO_VIDEO
  }
}
