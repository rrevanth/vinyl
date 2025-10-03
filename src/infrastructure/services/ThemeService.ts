/**
 * Theme management implementation of IThemeService
 *
 * Provides theme mode management with system theme detection.
 * Integrates with Unistyles for theme application and react-native Appearance API.
 */
import { Appearance } from 'react-native'
import { UnistylesRuntime } from 'react-native-unistyles'
import { IThemeService, ThemeMode } from '@/src/domain/services/IThemeService'
import { IStorageService } from '@/src/domain/services/IStorageService'

export class ThemeService implements IThemeService {
  private readonly STORAGE_KEY = 'theme_mode'
  private readonly storage: IStorageService
  private themeChangeCallbacks: Set<(mode: ThemeMode) => void> = new Set()

  constructor(storage: IStorageService) {
    this.storage = storage

    // Subscribe to system theme changes
    Appearance.addChangeListener(() => {
      this.handleSystemThemeChange()
    })
  }

  /**
   * Handles system theme changes when mode is 'system'
   */
  private async handleSystemThemeChange(): Promise<void> {
    const mode = await this.getThemeMode()
    if (mode === 'system') {
      this.applyTheme(mode)
      this.notifyThemeChangeCallbacks(mode)
    }
  }

  /**
   * Applies theme to Unistyles runtime
   */
  private applyTheme(mode: ThemeMode): void {
    const effectiveTheme = this.resolveEffectiveTheme(mode)
    UnistylesRuntime.setTheme(effectiveTheme)
  }

  /**
   * Resolves effective theme from mode (handles 'system' resolution)
   */
  private resolveEffectiveTheme(mode: ThemeMode): 'light' | 'dark' {
    if (mode === 'system') {
      const colorScheme = Appearance.getColorScheme()
      return colorScheme === 'dark' ? 'dark' : 'light'
    }
    return mode
  }

  /**
   * Notifies all subscribed callbacks of theme change
   */
  private notifyThemeChangeCallbacks(mode: ThemeMode): void {
    this.themeChangeCallbacks.forEach((callback) => {
      callback(mode)
    })
  }

  /**
   * Retrieves the stored theme mode preference
   */
  async getThemeMode(): Promise<ThemeMode> {
    const stored = await this.storage.get<ThemeMode>(this.STORAGE_KEY)
    return stored ?? 'system'
  }

  /**
   * Sets the theme mode preference
   */
  async setThemeMode(mode: ThemeMode): Promise<void> {
    await this.storage.set(this.STORAGE_KEY, mode)
    this.applyTheme(mode)
    this.notifyThemeChangeCallbacks(mode)
  }

  /**
   * Gets the effective theme (resolved from system if mode is 'system')
   */
  getEffectiveTheme(): 'light' | 'dark' {
    return UnistylesRuntime.themeName as 'light' | 'dark'
  }

  /**
   * Subscribes to theme changes
   */
  subscribeToThemeChanges(callback: (mode: ThemeMode) => void): () => void {
    this.themeChangeCallbacks.add(callback)

    // Return unsubscribe function
    return () => {
      this.themeChangeCallbacks.delete(callback)
    }
  }
}