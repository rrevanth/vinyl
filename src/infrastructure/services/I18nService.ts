/**
 * Locale management implementation of II18nService
 *
 * Provides internationalization support with device locale detection.
 * Validates and persists user locale preferences.
 */
import * as Localization from 'expo-localization'
import { II18nService } from '@/src/domain/services/II18nService'
import { IStorageService } from '@/src/domain/services/IStorageService'

export class I18nService implements II18nService {
  private readonly STORAGE_KEY = 'locale'
  private readonly storage: IStorageService
  private readonly supportedLocales: string[] = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh', 'ko']

  constructor(storage: IStorageService) {
    this.storage = storage
  }

  /**
   * Extracts language code from locale (e.g., 'en-US' -> 'en')
   */
  private extractLanguageCode(locale: string): string {
    return locale.split('-')[0].toLowerCase()
  }

  /**
   * Validates and normalizes locale to supported language code
   */
  private normalizeLocale(locale: string): string | null {
    const languageCode = this.extractLanguageCode(locale)
    return this.isLocaleSupported(languageCode) ? languageCode : null
  }

  /**
   * Retrieves the stored locale preference
   */
  async getLocale(): Promise<string> {
    const stored = await this.storage.get<string>(this.STORAGE_KEY)

    if (stored && this.isLocaleSupported(stored)) {
      return stored
    }

    // Fallback to device locale or default to 'en'
    const deviceLocale = this.getDeviceLocale()
    const normalized = this.normalizeLocale(deviceLocale)
    return normalized ?? 'en'
  }

  /**
   * Sets the locale preference
   */
  async setLocale(locale: string): Promise<void> {
    const normalized = this.normalizeLocale(locale)

    if (!normalized) {
      throw new Error(`Unsupported locale: ${locale}. Supported locales: ${this.supportedLocales.join(', ')}`)
    }

    await this.storage.set(this.STORAGE_KEY, normalized)
  }

  /**
   * Gets the device's current locale
   */
  getDeviceLocale(): string {
    const locales = Localization.getLocales()
    return locales.length > 0 ? locales[0].languageCode ?? 'en' : 'en'
  }

  /**
   * Gets list of supported locales
   */
  getSupportedLocales(): string[] {
    return [...this.supportedLocales]
  }

  /**
   * Checks if a locale is supported
   */
  isLocaleSupported(locale: string): boolean {
    const languageCode = this.extractLanguageCode(locale)
    return this.supportedLocales.includes(languageCode)
  }
}