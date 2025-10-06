import type { IEnvironmentService } from '../../domain/services/IEnvironmentService'
import type { TraktConfig } from '../../domain/entities/UserPreferences'
import { InfrastructureError } from '../errors/InfrastructureError'

/**
 * Effective Trakt configuration with resolved values
 * Extends base TraktConfig with metadata about configuration source
 */
export interface EffectiveTraktConfig extends TraktConfig {
  readonly effectiveClientId: string
  readonly effectiveClientSecret: string
  readonly effectiveRedirectUri: string
  readonly effectiveBaseUrl: string
  readonly effectiveLanguage: string
  readonly effectiveCountry: string
  readonly configSource: 'user' | 'env' | 'default'
  readonly hasValidTokens: boolean
  readonly needsAuthentication: boolean
}

/**
 * Factory for creating effective Trakt configuration
 *
 * Implements configuration hierarchy: User Preferences > Environment Variables > Defaults
 * Provides fallback configuration to ensure Trakt client always has valid settings.
 * Handles OAuth token validation and expiration detection.
 */
export class TraktConfigFactory {
  constructor(private readonly envService: IEnvironmentService) {}

  /**
   * Create effective Trakt configuration from user preferences
   *
   * Configuration priority:
   * 1. User Preferences (if configured in UserPreferences)
   * 2. Environment Variables (EXPO_PUBLIC_TRAKT_*)
   * 3. Default Values (for basic functionality)
   */
  createEffectiveConfig(userConfig?: TraktConfig): EffectiveTraktConfig {
    // Get effective values with hierarchy
    const effectiveClientId = userConfig?.clientId || this.envService.getTraktClientId() || ''
    const effectiveClientSecret =
      userConfig?.clientSecret || this.envService.getTraktClientSecret() || ''
    const effectiveRedirectUri =
      userConfig?.redirectUri || this.envService.get('TRAKT_REDIRECT_URI', 'vnyl://auth/trakt/callback')
    const effectiveBaseUrl =
      userConfig?.baseUrl || this.envService.get('TRAKT_BASE_URL', 'https://api.trakt.tv')
    const effectiveLanguage = userConfig?.language || 'en-US'
    const effectiveCountry = userConfig?.country || 'US'

    // Determine configuration source
    const configSource: 'user' | 'env' | 'default' = userConfig?.clientId
      ? 'user'
      : this.envService.getTraktClientId()
        ? 'env'
        : 'default'

    // Check token validity
    const hasValidTokens = this.hasValidTokens(userConfig)
    const needsAuthentication = !hasValidTokens || !effectiveClientId || !effectiveClientSecret

    return {
      ...userConfig,
      effectiveClientId,
      effectiveClientSecret,
      effectiveRedirectUri,
      effectiveBaseUrl,
      effectiveLanguage,
      effectiveCountry,
      configSource,
      hasValidTokens,
      needsAuthentication,
    }
  }

  /**
   * Validate effective configuration
   * Throws descriptive errors for missing or invalid configuration
   */
  validateConfig(config: EffectiveTraktConfig): void {
    if (!config.effectiveClientId) {
      throw new InfrastructureError(
        'Trakt client ID is required. Set EXPO_PUBLIC_TRAKT_CLIENT_ID environment variable or configure in user preferences.'
      )
    }

    if (!config.effectiveClientSecret) {
      throw new InfrastructureError(
        'Trakt client secret is required. Set EXPO_PUBLIC_TRAKT_CLIENT_SECRET environment variable or configure in user preferences.'
      )
    }

    if (!config.effectiveRedirectUri) {
      throw new InfrastructureError(
        'Trakt redirect URI is required. Set EXPO_PUBLIC_TRAKT_REDIRECT_URI environment variable or configure in user preferences.'
      )
    }

    // Validate URL format
    try {
      new URL(config.effectiveBaseUrl)
    } catch {
      throw new InfrastructureError(`Invalid Trakt base URL: ${config.effectiveBaseUrl}`)
    }

    // Validate redirect URI format
    if (!config.effectiveRedirectUri.includes('://')) {
      throw new InfrastructureError(
        `Invalid Trakt redirect URI format: ${config.effectiveRedirectUri}`
      )
    }
  }

  /**
   * Check if authentication is required
   * Returns true if no valid tokens or client credentials are missing
   */
  isAuthenticationRequired(config?: TraktConfig): boolean {
    const effective = this.createEffectiveConfig(config)
    return effective.needsAuthentication
  }

  /**
   * Generate OAuth authorization URL
   * Used to initiate the OAuth flow
   */
  getOAuthUrl(config: EffectiveTraktConfig, state?: string): string {
    // Trakt OAuth authorization is always at trakt.tv (not api.trakt.tv)
    const authBaseUrl = 'https://trakt.tv'
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: config.effectiveClientId,
      redirect_uri: config.effectiveRedirectUri,
    })

    if (state) {
      params.append('state', state)
    }

    return `${authBaseUrl}/oauth/authorize?${params.toString()}`
  }

  /**
   * Get device authentication URL
   * Used for device flow authentication
   */
  getDeviceAuthUrl(): string {
    return 'https://trakt.tv/activate'
  }

  /**
   * Check if tokens are valid and not expired
   */
  private hasValidTokens(config?: TraktConfig): boolean {
    if (!config?.accessToken || !config?.refreshToken) {
      return false
    }

    // Check if token is expired
    if (config.tokenExpiresAt) {
      const expiresAt = new Date(config.tokenExpiresAt)
      const now = new Date()
      const bufferMinutes = 5 // Refresh 5 minutes before expiration
      const bufferTime = new Date(now.getTime() + bufferMinutes * 60 * 1000)

      if (expiresAt <= bufferTime) {
        return false // Token expired or about to expire
      }
    }

    return true
  }

  /**
   * Check if token needs refresh
   * Returns true if token exists but will expire soon
   */
  needsTokenRefresh(config?: TraktConfig): boolean {
    if (!config?.accessToken || !config?.refreshToken) {
      return false
    }

    if (!config.tokenExpiresAt) {
      return false // No expiration info
    }

    const expiresAt = new Date(config.tokenExpiresAt)
    const now = new Date()
    const refreshThreshold = 60 // Refresh 60 minutes before expiration
    const refreshTime = new Date(now.getTime() + refreshThreshold * 60 * 1000)

    return expiresAt <= refreshTime
  }

  /**
   * Create updated config with new tokens
   * Helper for updating configuration after OAuth operations
   */
  updateConfigWithTokens(
    config: TraktConfig,
    accessToken: string,
    refreshToken: string,
    expiresIn: number
  ): TraktConfig {
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString()

    return {
      ...config,
      accessToken,
      refreshToken,
      tokenExpiresAt: expiresAt,
    }
  }
}
