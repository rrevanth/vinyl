/**
 * Theme mode type definition
 */
export type ThemeMode = 'light' | 'dark' | 'system'

/**
 * Theme management interface
 *
 * Provides abstraction for theme mode management and system theme detection.
 * Supports light, dark, and system-based theme modes.
 */
export interface IThemeService {
  /**
   * Retrieves the stored theme mode preference
   * @returns Promise resolving to the current theme mode
   */
  getThemeMode(): Promise<ThemeMode>

  /**
   * Sets the theme mode preference
   * @param mode Theme mode to set
   */
  setThemeMode(mode: ThemeMode): Promise<void>

  /**
   * Gets the effective theme (resolved from system if mode is 'system')
   * @returns The actual theme to apply ('light' or 'dark')
   */
  getEffectiveTheme(): 'light' | 'dark'

  /**
   * Subscribes to theme changes
   * @param callback Function called when theme changes
   * @returns Unsubscribe function
   */
  subscribeToThemeChanges(callback: (mode: ThemeMode) => void): () => void
}