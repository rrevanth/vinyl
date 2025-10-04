import { HttpClient } from '../../http/HttpClient'
import type { ILoggingService } from '../../../domain/services/ILoggingService'
import type { TMDBConfigFactory, EffectiveTMDBConfig } from '../../factories/TMDBConfigFactory'
import { tmdbConfig$ } from '../../../presentation/shared/stores/user.store'
import { NotFoundError, UnauthorizedError } from '../../../domain/errors'
import { NetworkError } from '../../errors'
import type { TMDBImageSize } from './types'

/**
 * Base TMDB API client with reactive configuration and error handling
 *
 * Features:
 * - Reactive configuration that reloads when user preferences change
 * - TMDB-specific authentication (API key in query params)
 * - Comprehensive error mapping from TMDB errors to domain errors
 * - Image URL generation utilities
 * - Automatic retry logic inherited from base HttpClient
 */
export class TMDBBaseClient {
  protected httpClient!: HttpClient
  protected currentConfig!: EffectiveTMDBConfig
  private configSubscription?: () => void

  constructor(
    private readonly configFactory: TMDBConfigFactory,
    private readonly logger: ILoggingService
  ) {
    // Initialize configuration
    this.reloadConfiguration()

    // Set up reactive configuration watching
    this.setupConfigurationWatcher()
  }

  /**
   * Reload TMDB configuration from user preferences
   * Called on initialization and when preferences change
   */
  private reloadConfiguration(): void {
    // Get current user preferences for TMDB
    const userConfig = tmdbConfig$.get()

    // Create effective configuration with fallbacks
    this.currentConfig = this.configFactory.createEffectiveConfig(userConfig)

    // Validate configuration
    this.configFactory.validateConfig(this.currentConfig)

    // Create new HTTP client with current config
    this.httpClient = new HttpClient(
      this.currentConfig.effectiveBaseURL,
      () => null, // TMDB uses API key, not Bearer auth
      this.logger
    )

    // Set up TMDB-specific request interceptor
    this.setupTMDBAuthentication()

    this.logger.info('TMDB Configuration reloaded', {
      source: this.currentConfig.configSource,
      language: this.currentConfig.effectiveLanguage,
      region: this.currentConfig.effectiveRegion,
      hasApiKey: Boolean(this.currentConfig.effectiveApiKey),
    })
  }

  /**
   * Set up watcher for user preference changes
   */
  private setupConfigurationWatcher(): void {
    // Watch for changes in TMDB configuration
    this.configSubscription = tmdbConfig$.onChange(() => {
      this.logger.info('TMDB preferences changed, reloading configuration...')
      this.reloadConfiguration()
    })
  }

  /**
   * Set up TMDB-specific authentication and parameter injection
   */
  private setupTMDBAuthentication(): void {
    // Get access to the internal axios instance
    const axiosInstance = (this.httpClient as any).client

    // Add TMDB API key and language/region to all requests
    axiosInstance.interceptors.request.use((config: any) => {
      if (!config.params) {
        config.params = {}
      }

      // Add API key to all requests
      config.params.api_key = this.currentConfig.effectiveApiKey

      // Add language to all requests (can be overridden by explicit params)
      if (!config.params.language) {
        config.params.language = this.currentConfig.effectiveLanguage
      }

      // Add region for relevant endpoints
      if (this.shouldAddRegion(config.url) && !config.params.region) {
        config.params.region = this.currentConfig.effectiveRegion
      }

      return config
    })
  }

  /**
   * Determine if region parameter should be added to the request
   */
  private shouldAddRegion(url?: string): boolean {
    if (!url) return false

    // Region is useful for these endpoint types
    const regionEndpoints = [
      '/discover/',
      '/search/',
      '/movie/',
      '/tv/',
      '/trending/',
      '/watch/providers',
    ]

    return regionEndpoints.some((endpoint) => url.includes(endpoint))
  }

  /**
   * Make HTTP GET request with TMDB error handling
   */
  protected async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      return await this.httpClient.get<T>(endpoint, { params })
    } catch (error) {
      throw this.mapTMDBError(error)
    }
  }

  /**
   * Make HTTP POST request with TMDB error handling
   */
  protected async post<T>(endpoint: string, data?: any, params?: Record<string, any>): Promise<T> {
    try {
      return await this.httpClient.post<T>(endpoint, data, { params })
    } catch (error) {
      throw this.mapTMDBError(error)
    }
  }

  /**
   * Map TMDB API errors to domain errors
   */
  private mapTMDBError(error: any): Error {
    // Check if it's already a mapped error from HttpClient
    if (
      error instanceof NotFoundError ||
      error instanceof UnauthorizedError ||
      error instanceof NetworkError
    ) {
      return error
    }

    // Map TMDB-specific error codes
    if (error.response?.data?.status_code) {
      const tmdbCode = error.response.data.status_code
      const tmdbMessage = error.response.data.status_message || 'Unknown TMDB error'

      switch (tmdbCode) {
        case 7: // Invalid API key
          return new UnauthorizedError(`TMDB API key is invalid: ${tmdbMessage}`)

        case 34: // The resource you requested could not be found
          return new NotFoundError(`TMDB resource not found: ${tmdbMessage}`)

        case 11: // Internal error
          return new NetworkError(`TMDB internal error: ${tmdbMessage}`, 500)

        case 25: // Your request count is over the allowed limit
          return new NetworkError(`TMDB rate limit exceeded: ${tmdbMessage}`, 429)

        case 6: // Invalid id
          return new NotFoundError(`TMDB invalid ID: ${tmdbMessage}`)

        case 22: // Invalid page
          return new NetworkError(`TMDB invalid page: ${tmdbMessage}`, 400)

        default:
          return new NetworkError(
            `TMDB API error (${tmdbCode}): ${tmdbMessage}`,
            error.response?.status || 500
          )
      }
    }

    // If no TMDB error code, return the original error
    return error
  }

  /**
   * Generate poster image URL with size option
   */
  getPosterURL(posterPath: string, size: TMDBImageSize = 'w500'): string {
    if (!posterPath) return ''

    // Remove leading slash if present
    const cleanPath = posterPath.startsWith('/') ? posterPath.slice(1) : posterPath

    return `${this.currentConfig.effectiveImageBaseURL}${size}/${cleanPath}`
  }

  /**
   * Generate backdrop image URL with size option
   */
  getBackdropURL(backdropPath: string, size: TMDBImageSize = 'w1280'): string {
    if (!backdropPath) return ''

    // Remove leading slash if present
    const cleanPath = backdropPath.startsWith('/') ? backdropPath.slice(1) : backdropPath

    return `${this.currentConfig.effectiveImageBaseURL}${size}/${cleanPath}`
  }

  /**
   * Generate profile image URL with size option
   */
  getProfileURL(profilePath: string, size: TMDBImageSize = 'w185'): string {
    if (!profilePath) return ''

    // Remove leading slash if present
    const cleanPath = profilePath.startsWith('/') ? profilePath.slice(1) : profilePath

    return `${this.currentConfig.effectiveImageBaseURL}${size}/${cleanPath}`
  }

  /**
   * Get current effective configuration (for debugging/logging)
   */
  getCurrentConfig(): EffectiveTMDBConfig {
    return this.currentConfig
  }

  /**
   * Cleanup method to remove configuration watcher
   */
  dispose(): void {
    if (this.configSubscription) {
      this.configSubscription()
      this.configSubscription = undefined
    }
  }
}
