/**
 * Video player backend types supported by the application
 * 
 * RN_VLC (Recommended):
 * - Best codec support including TrueHD/DTS-HD with AC3 fallback
 * - Minimal configuration following Stremio iOS proven approach
 * - Handles 4K HDR Blu-ray remuxes
 * - Available on all platforms (iOS, Android)
 * 
 * EXTERNAL:
 * - Opens stream in device's external player (VLC, Infuse, etc.)
 * - Uses system default or third-party apps
 * - Useful for specialized player features
 */
export enum VideoPlayerType {
  /**
   * React Native VLC Player - Primary built-in player
   * Uses minimal configuration for maximum codec compatibility
   * Auto-selects compatible audio tracks (AC3/AAC over TrueHD)
   */
  RN_VLC = 'RN_VLC',

  /**
   * External Player - Open stream in device's external video player
   * Allows using system default or third-party video players (VLC, Infuse, MX Player, etc.)
   * Useful for specialized player features or user preference
   */
  EXTERNAL = 'EXTERNAL',
}
