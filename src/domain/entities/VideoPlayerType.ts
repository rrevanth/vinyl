/**
 * Video player backend types supported by the application
 */
export enum VideoPlayerType {
  /**
   * Expo Video - Modern Expo video player
   * Available on all platforms (iOS, Android, Web)
   * Replaces deprecated expo-av
   */
  EXPO_VIDEO = 'EXPO_VIDEO',

  /**
   * React Native VLC Player - Universal codec support
   * Advanced media player with comprehensive format support
   * Available on all platforms
   */
  RN_VLC = 'RN_VLC',
}
