import { HttpClient } from '@/src/infrastructure/http/HttpClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktConfigFactory, EffectiveTraktConfig } from '@/src/infrastructure/factories/TraktConfigFactory'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { NotFoundError, UnauthorizedError } from '@/src/domain/errors'
import { NetworkError } from '@/src/infrastructure/errors'
import { RequestQueueService } from '@/src/infrastructure/services/RequestQueueService'
import type { TraktAPICache } from '@/src/infrastructure/cache/TraktAPICache'
import type {
  TraktTokenResponse,
  TraktTokenRequest,
  TraktRefreshTokenRequest,
  TraktDeviceCodeRequest,
  TraktDeviceCodeResponse,
  TraktDeviceTokenRequest,
  TraktErrorResponse,
} from './types'

/**
 * Base Trakt API client with OAuth authentication and reactive configuration
 *
 * Features:
 * - Complete OAuth 2.0 flow support (web and device)
 * - Automatic token refresh with expiration handling
 * - Reactive configuration that reloads when user preferences change
 * - Trakt-specific error mapping and rate limiting
 * - Comprehensive authentication state management
 */
export class TraktBaseClient {
  protected httpClient!: HttpClient
  protected currentConfig!: EffectiveTraktConfig
  private configSubscription?: () => void
  private tokenRefreshPromise?: Promise<void>
  private currentAccessToken: string | null = null
  private static configLoaded = false
  private readonly apiCache?: TraktAPICache

  constructor(
    private readonly configFactory: TraktConfigFactory,
    private readonly logger: ILoggingService,
    private readonly queueService: RequestQueueService
  ) {
    // Initialize configuration
    this.reloadConfiguration()

    // Set up reactive configuration watching
    this.setupConfigurationWatcher()
  }

  /**
   * Set the API cache after construction
   * Used to break circular dependency between TraktClient and TraktAPICache
   */
  setCache(cache: TraktAPICache): void {
    // @ts-expect-error - We're setting a readonly property after construction to break circular dependency
    this.apiCache = cache
    this.logger.debug('Trakt cache injected into base client')
  }

  /**
   * Reload Trakt configuration from user preferences
   * Called on initialization and when preferences change
   */
  private reloadConfiguration(): void {
    // Get current user account for Trakt from preferences
    const userAccount = userPreferences$.accounts.trakt.get()

    // Create effective configuration with fallbacks
    this.currentConfig = this.configFactory.createEffectiveConfig(userAccount)

    // Validate configuration
    this.configFactory.validateConfig(this.currentConfig)

    // Update current access token
    this.currentAccessToken = this.currentConfig.accessToken || null

    // Create new HTTP client with current config and Trakt-specific headers
    this.httpClient = new HttpClient(
      this.currentConfig.effectiveBaseUrl,
      () => this.currentAccessToken, // Synchronous token getter
      this.logger,
      {
        'trakt-api-key': this.currentConfig.effectiveClientId,
        'trakt-api-version': '2',
        'User-Agent': 'VNYL/1.0.0', // Required by Trakt API
      },
      30000 // 30-second timeout for Trakt API
    )

    // Check if token needs refresh and do it in background
    if (this.configFactory.needsTokenRefresh(this.currentConfig)) {
      this.refreshTokenIfNeeded().catch((error) => {
        this.logger.error('Background token refresh failed', error)
      })
    }

    // Only log on first load to prevent duplicate logs from multiple instances
    if (!TraktBaseClient.configLoaded) {
      this.logger.info('Trakt configuration reloaded', {
        source: this.currentConfig.configSource,
        hasTokens: this.currentConfig.hasValidTokens,
        needsAuth: this.currentConfig.needsAuthentication,
      })
      TraktBaseClient.configLoaded = true
    }
  }

  /**
   * Set up reactive configuration watching
   * Automatically reloads when user preferences change
   */
  private setupConfigurationWatcher(): void {
    this.configSubscription = userPreferences$.accounts.trakt.onChange(() => {
      // this.logger.debug('Trakt user account changed, reloading configuration')
      this.reloadConfiguration()
    })
  }

  /**
   * Clean up subscriptions
   */
  destroy(): void {
    if (this.configSubscription) {
      this.configSubscription()
      this.configSubscription = undefined
    }
  }

  /**
   * Refresh access token if needed
   * Prevents multiple simultaneous refresh attempts
   */
  private async refreshTokenIfNeeded(): Promise<void> {
    if (this.tokenRefreshPromise) {
      return this.tokenRefreshPromise
    }

    this.tokenRefreshPromise = this.performTokenRefresh()

    try {
      await this.tokenRefreshPromise
    } finally {
      this.tokenRefreshPromise = undefined
    }
  }

  /**
   * Perform actual token refresh
   */
  private async performTokenRefresh(): Promise<void> {
    if (!this.currentConfig.refreshToken) {
      throw new UnauthorizedError('No refresh token available')
    }

    try {
      const refreshRequest: TraktRefreshTokenRequest = {
        refresh_token: this.currentConfig.refreshToken,
        client_id: this.currentConfig.effectiveClientId,
        client_secret: this.currentConfig.effectiveClientSecret,
        redirect_uri: this.currentConfig.effectiveRedirectUri,
        grant_type: 'refresh_token',
      }

      const tokenResponse = await this.httpClient.post<TraktTokenResponse>(
        '/oauth/token',
        refreshRequest
      )

      // Update account with new tokens
      const updatedAccount = this.configFactory.updateConfigWithTokens(
        this.currentConfig,
        tokenResponse.access_token,
        tokenResponse.refresh_token,
        tokenResponse.expires_in
      )

      // Update user preferences store
      userPreferences$.accounts.trakt.set(updatedAccount)

      // Update current access token for immediate use
      this.currentAccessToken = updatedAccount.accessToken || null

      this.logger.info('Trakt access token refreshed successfully')
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      this.logger.error('Failed to refresh Trakt access token', error)
      throw new UnauthorizedError('Failed to refresh access token')
    }
  }

  /**
   * Generate OAuth authorization URL
   */
  getAuthorizationUrl(state?: string): string {
    return this.configFactory.getOAuthUrl(this.currentConfig, state)
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string, state?: string): Promise<TraktTokenResponse> {
    const tokenRequest: TraktTokenRequest = {
      code,
      client_id: this.currentConfig.effectiveClientId,
      client_secret: this.currentConfig.effectiveClientSecret,
      redirect_uri: this.currentConfig.effectiveRedirectUri,
      grant_type: 'authorization_code',
    }

    try {
      const tokenResponse = await this.httpClient.post<TraktTokenResponse>(
        '/oauth/token',
        tokenRequest
      )

      // Update account with new tokens
      const updatedAccount = this.configFactory.updateConfigWithTokens(
        this.currentConfig,
        tokenResponse.access_token,
        tokenResponse.refresh_token,
        tokenResponse.expires_in
      )

      // Update user preferences store
      userPreferences$.accounts.trakt.set(updatedAccount)

      // Update current access token for immediate use
      this.currentAccessToken = updatedAccount.accessToken || null

      this.logger.info('Trakt OAuth flow completed successfully')
      return tokenResponse
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      this.logger.error('Failed to exchange authorization code for token', error)
      throw this.mapTraktError(err)
    }
  }

  /**
   * Generate device code for device authentication
   */
  async generateDeviceCode(): Promise<TraktDeviceCodeResponse> {
    const request: TraktDeviceCodeRequest = {
      client_id: this.currentConfig.effectiveClientId,
    }

    try {
      return await this.httpClient.post<TraktDeviceCodeResponse>('/oauth/device/code', request)
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      this.logger.error('Failed to generate device code', error)
      throw this.mapTraktError(err)
    }
  }

  /**
   * Poll for device token
   */
  async pollForDeviceToken(deviceCode: string): Promise<TraktTokenResponse> {
    const request: TraktDeviceTokenRequest = {
      code: deviceCode,
      client_id: this.currentConfig.effectiveClientId,
      client_secret: this.currentConfig.effectiveClientSecret,
    }

    try {
      const tokenResponse = await this.httpClient.post<TraktTokenResponse>(
        '/oauth/device/token',
        request
      )

      // Update account with new tokens
      const updatedAccount = this.configFactory.updateConfigWithTokens(
        this.currentConfig,
        tokenResponse.access_token,
        tokenResponse.refresh_token,
        tokenResponse.expires_in
      )

      // Update user preferences store
      userPreferences$.accounts.trakt.set(updatedAccount)

      // Update current access token for immediate use
      this.currentAccessToken = updatedAccount.accessToken || null

      this.logger.info('Trakt device authentication completed successfully')
      return tokenResponse
    } catch (error) {
      // Device flow has specific error codes that should be handled by caller
      throw this.mapTraktError(error)
    }
  }

  /**
   * Revoke current access token
   */
  async revokeToken(): Promise<void> {
    if (!this.currentConfig.accessToken) {
      return // No token to revoke
    }

    try {
      await this.httpClient.post('/oauth/revoke', {
        token: this.currentConfig.accessToken,
        client_id: this.currentConfig.effectiveClientId,
        client_secret: this.currentConfig.effectiveClientSecret,
      })

      // Clear tokens from account
      const clearedAccount = {
        ...this.currentConfig,
        accessToken: '',
        refreshToken: '',
        expiresAt: 0,
      }

      // Update user preferences store
      userPreferences$.accounts.trakt.set(clearedAccount)

      // Clear current access token
      this.currentAccessToken = null

      this.logger.info('Trakt access token revoked successfully')
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      this.logger.error('Failed to revoke Trakt access token', error)
      // Don't throw error for revocation failures
    }
  }

  /**
   * Make authenticated GET request
   * Cache-first pattern: Check cache before entering queue
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const queryParams = new URLSearchParams()

    // Add all parameters to query string
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value))
        }
      })
    }

    const url = queryParams.toString() ? `${endpoint}?${queryParams}` : endpoint

    // Build cache key
    const cacheKey = ['trakt', endpoint, params]

    // Try cache first - NO QUEUE if cache hit!
    if (this.apiCache) {
      const cached = await this.apiCache.tryGetFromCache<T>(cacheKey)
      if (cached) {
        this.logger.debug('Cache HIT - instant return, bypassing queue', { endpoint })
        return cached
      }
      this.logger.debug('Cache MISS - entering queue', { endpoint })
    }

    // Cache miss - enter queue and fetch
    return this.queueService.enqueue('trakt', async () => {
      try {
        const result = await this.httpClient.get<T>(url)

        // Store in cache after successful fetch
        if (this.apiCache) {
          await this.apiCache.setInCache(cacheKey, result, 'media-details')
        }

        return result
      } catch (error) {
        throw this.mapTraktError(error)
      }
    })
  }

  /**
   * Make authenticated POST request
   * Cache-first pattern: Check cache before entering queue
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    // Build cache key (include data for uniqueness)
    const cacheKey = ['trakt', endpoint, data]

    // Try cache first - NO QUEUE if cache hit!
    if (this.apiCache) {
      const cached = await this.apiCache.tryGetFromCache<T>(cacheKey)
      if (cached) {
        this.logger.debug('Cache HIT - instant return, bypassing queue', { endpoint })
        return cached
      }
      this.logger.debug('Cache MISS - entering queue', { endpoint })
    }

    // Cache miss - enter queue and fetch
    return this.queueService.enqueue('trakt', async () => {
      try {
        const result = await this.httpClient.post<T>(endpoint, data)

        // Store in cache after successful fetch
        if (this.apiCache) {
          await this.apiCache.setInCache(cacheKey, result, 'media-details')
        }

        return result
      } catch (error) {
        throw this.mapTraktError(error)
      }
    })
  }

  /**
   * Make authenticated PUT request
   * Cache-first pattern: Check cache before entering queue
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    // Build cache key (include data for uniqueness)
    const cacheKey = ['trakt', endpoint, data]

    // Try cache first - NO QUEUE if cache hit!
    if (this.apiCache) {
      const cached = await this.apiCache.tryGetFromCache<T>(cacheKey)
      if (cached) {
        this.logger.debug('Cache HIT - instant return, bypassing queue', { endpoint })
        return cached
      }
      this.logger.debug('Cache MISS - entering queue', { endpoint })
    }

    // Cache miss - enter queue and fetch
    return this.queueService.enqueue('trakt', async () => {
      try {
        const result = await this.httpClient.put<T>(endpoint, data)

        // Store in cache after successful fetch
        if (this.apiCache) {
          await this.apiCache.setInCache(cacheKey, result, 'media-details')
        }

        return result
      } catch (error) {
        throw this.mapTraktError(error)
      }
    })
  }

  /**
   * Make authenticated DELETE request
   * Cache-first pattern: Check cache before entering queue
   */
  async delete<T>(endpoint: string): Promise<T> {
    // Build cache key
    const cacheKey = ['trakt', endpoint]

    // Try cache first - NO QUEUE if cache hit!
    if (this.apiCache) {
      const cached = await this.apiCache.tryGetFromCache<T>(cacheKey)
      if (cached) {
        this.logger.debug('Cache HIT - instant return, bypassing queue', { endpoint })
        return cached
      }
      this.logger.debug('Cache MISS - entering queue', { endpoint })
    }

    // Cache miss - enter queue and fetch
    return this.queueService.enqueue('trakt', async () => {
      try {
        const result = await this.httpClient.delete<T>(endpoint)

        // Store in cache after successful fetch
        if (this.apiCache) {
          await this.apiCache.setInCache(cacheKey, result, 'media-details')
        }

        return result
      } catch (error) {
        throw this.mapTraktError(error)
      }
    })
  }

  /**
   * Map Trakt API errors to domain errors
   */
  private mapTraktError(error: any): Error {
    if (error.response) {
      const status = error.response.status
      const data: TraktErrorResponse = error.response.data

      switch (status) {
        case 401:
          return new UnauthorizedError(data.error_description || 'Unauthorized')
        case 404:
          return new NotFoundError(data.error_description || 'Not found')
        case 409:
          // Conflict - often used for checkin in progress
          return new Error(data.error_description || 'Conflict')
        case 429:
          // Rate limit exceeded
          return new Error('Rate limit exceeded')
        case 500:
        case 502:
        case 503:
        case 504:
          return new NetworkError(data.error_description || 'Trakt service unavailable')
        default:
          return new Error(data.error_description || `Trakt API error: ${status}`)
      }
    }

    if (error.request) {
      return new NetworkError('Network error communicating with Trakt')
    }

    return error instanceof Error ? error : new Error('Unknown Trakt API error')
  }

  /**
   * Get current effective configuration
   * Useful for debugging and logging
   */
  getCurrentConfig(): EffectiveTraktConfig {
    return this.currentConfig
  }

  /**
   * Check if client is authenticated and ready
   */
  isAuthenticated(): boolean {
    return this.currentConfig.hasValidTokens && !this.currentConfig.needsAuthentication
  }
}
