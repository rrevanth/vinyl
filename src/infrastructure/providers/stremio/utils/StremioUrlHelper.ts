import type { ILoggingService } from '@/src/domain/services/ILoggingService'

/**
 * Stremio URL helper utilities
 *
 * Provides URL manipulation and validation for Stremio addon URLs,
 * with special handling for iOS App Transport Security requirements.
 */
export class StremioUrlHelper {
  /**
   * Upgrade HTTP URLs to HTTPS for iOS App Transport Security
   *
   * iOS ATS blocks HTTP requests by default. This method automatically
   * upgrades HTTP URLs to HTTPS to prevent network errors on iOS devices.
   *
   * @param url - The URL to upgrade
   * @param logger - Optional logging service for tracking upgrades
   * @returns HTTPS URL or original URL if already HTTPS
   *
   * @example
   * ```typescript
   * // HTTP URL gets upgraded
   * StremioUrlHelper.upgradeToHttps('http://v3-cinemeta.strem.io/manifest.json')
   * // Returns: 'https://v3-cinemeta.strem.io/manifest.json'
   *
   * // HTTPS URL stays unchanged
   * StremioUrlHelper.upgradeToHttps('https://v3-cinemeta.strem.io/manifest.json')
   * // Returns: 'https://v3-cinemeta.strem.io/manifest.json'
   * ```
   */
  static upgradeToHttps(url: string, logger?: ILoggingService): string {
    try {
      const urlObj = new URL(url)

      if (urlObj.protocol === 'http:') {
        const upgradedUrl = url.replace('http://', 'https://')

        logger?.warn('Upgrading HTTP to HTTPS for iOS App Transport Security', {
          originalUrl: url,
          upgradedUrl,
          reason: 'iOS ATS blocks HTTP requests',
        })

        return upgradedUrl
      }

      return url
    } catch (error) {
      logger?.error('Invalid URL format', error as Error, { url })
      return url // Return as-is if invalid, let caller handle validation
    }
  }

  /**
   * Validate Stremio manifest URL format
   *
   * Checks if a URL points to a valid Stremio manifest endpoint.
   * Valid manifest URLs must end with `/manifest.json` or `.json`.
   *
   * @param url - The URL to validate
   * @returns True if valid manifest URL format, false otherwise
   *
   * @example
   * ```typescript
   * StremioUrlHelper.isValidManifestUrl('https://example.com/manifest.json')
   * // Returns: true
   *
   * StremioUrlHelper.isValidManifestUrl('https://example.com/addon.json')
   * // Returns: true
   *
   * StremioUrlHelper.isValidManifestUrl('https://example.com')
   * // Returns: false
   * ```
   */
  static isValidManifestUrl(url: string): boolean {
    try {
      const urlObj = new URL(url)
      return urlObj.pathname.endsWith('/manifest.json') || urlObj.pathname.endsWith('.json')
    } catch {
      return false
    }
  }

  /**
   * Extract base URL from manifest URL
   *
   * Removes `/manifest.json` suffix to get the base addon URL.
   *
   * @param manifestUrl - The manifest URL
   * @returns Base URL without /manifest.json
   *
   * @example
   * ```typescript
   * StremioUrlHelper.extractBaseUrl('https://example.com/manifest.json')
   * // Returns: 'https://example.com'
   *
   * StremioUrlHelper.extractBaseUrl('https://example.com')
   * // Returns: 'https://example.com'
   * ```
   */
  static extractBaseUrl(manifestUrl: string): string {
    return manifestUrl.endsWith('/manifest.json')
      ? manifestUrl.replace('/manifest.json', '')
      : manifestUrl
  }
}
