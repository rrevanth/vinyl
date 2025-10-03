/**
 * Internationalization (i18n) service interface
 *
 * Provides abstraction for locale management and language preferences.
 * Implementation handles device locale detection and locale persistence.
 */
export interface II18nService {
  /**
   * Retrieves the stored locale preference
   * @returns Promise resolving to the current locale code (e.g., 'en-US')
   */
  getLocale(): Promise<string>

  /**
   * Sets the locale preference
   * @param locale Locale code to set (e.g., 'en-US', 'fr-FR')
   */
  setLocale(locale: string): Promise<void>

  /**
   * Gets the device's current locale
   * @returns Device locale code
   */
  getDeviceLocale(): string

  /**
   * Gets list of supported locales
   * @returns Array of supported locale codes
   */
  getSupportedLocales(): string[]

  /**
   * Checks if a locale is supported
   * @param locale Locale code to check
   * @returns True if locale is supported
   */
  isLocaleSupported(locale: string): boolean
}