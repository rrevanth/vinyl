import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { DomainError } from '@/src/domain/errors'

/**
 * Result type for authentication operations
 */
export interface AuthResult {
  success: boolean
  error?: string
  tokens?: {
    username: string
    userId: string
    accessToken: string
    refreshToken: string
    expiresAt: number
  }
}

/**
 * Result type for disconnect operations
 */
export interface DisconnectResult {
  success: boolean
  error?: string
}

/**
 * Result type for token refresh operations
 */
export interface TokenRefreshResult {
  success: boolean
  error?: string
  tokens?: {
    accessToken: string
    refreshToken: string
    expiresAt: number
  }
}

/**
 * Simplified use case for Trakt account OAuth management
 *
 * Domain layer - No direct store mutations
 * All methods that modify user state return updated User objects
 */
export class TraktAccountUseCase {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Generate OAuth authorization URL with optional state parameter
   * State parameter is used for CSRF protection
   */
  getAuthorizationUrl(state?: string): string {
    try {
      const authUrl = this.traktClient.getAuthorizationUrl(state)
      this.logger.info('Generated Trakt OAuth URL', { hasState: Boolean(state) })
      return authUrl
    } catch (error) {
      this.logger.error('Failed to generate Trakt OAuth URL', error as Error)
      throw new DomainError('Failed to generate authorization URL')
    }
  }

  /**
   * Handle OAuth callback by exchanging authorization code for access token
   * Returns AuthResult with tokens and user identity (username, userId)
   * Presentation layer handles updating stores
   */
  async handleCallback(code: string, state?: string): Promise<AuthResult> {
    try {
      this.logger.info('Handling Trakt OAuth callback', { hasState: Boolean(state) })

      // Exchange code for token
      const tokenResponse = await this.traktClient.exchangeCodeForToken(code, state)

      // Validate authentication and get user profile
      const profile = await this.traktClient.validateAuthentication()

      if (!profile) {
        const errorMsg = 'Failed to retrieve user profile after authentication'
        this.logger.error(errorMsg, new Error(errorMsg))
        return { success: false, error: errorMsg }
      }

      // Return all Trakt data (identity + tokens) in one object
      const tokens = {
        username: profile.username,
        userId: profile.ids.slug,
        accessToken: tokenResponse.access_token,
        refreshToken: tokenResponse.refresh_token,
        expiresAt: Date.now() + tokenResponse.expires_in * 1000,
      }

      this.logger.info('Trakt account connected successfully', {
        username: tokens.username,
        userId: tokens.userId,
      })

      return { success: true, tokens }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to handle Trakt OAuth callback', error as Error, { code, state })
      return { success: false, error: `OAuth callback failed: ${errorMsg}` }
    }
  }

  /**
   * Disconnect Trakt account by revoking token
   * Presentation layer handles clearing data from stores
   */
  async disconnectAccount(): Promise<DisconnectResult> {
    try {
      // Revoke token with Trakt API
      await this.traktClient.revokeToken()

      this.logger.info('Trakt account disconnected successfully')
      return { success: true }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to disconnect Trakt account', error as Error)
      return { success: false, error: `Disconnect failed: ${errorMsg}` }
    }
  }

  /**
   * Check if Trakt access token is expired
   * @param expiresAt - Timestamp when the token expires
   */
  isTokenExpired(expiresAt: number): boolean {
    return Date.now() >= expiresAt
  }

  /**
   * Refresh Trakt access token using refresh token
   * Returns TokenRefreshResult instead of throwing errors
   * Note: TraktClient handles token refresh and store updates automatically
   */
  async refreshAccessToken(): Promise<TokenRefreshResult> {
    try {
      this.logger.info('Refreshing Trakt access token')

      // The TraktClient automatically handles token refresh internally
      // We just need to validate authentication to trigger the refresh if needed
      const profile = await this.traktClient.validateAuthentication()

      if (!profile) {
        const errorMsg = 'Failed to validate authentication after token refresh'
        this.logger.error(errorMsg, new Error(errorMsg))
        return { success: false, error: errorMsg }
      }

      // Return success - tokens are already updated in userPreferences$ by TraktClient
      this.logger.info('Trakt access token refreshed successfully')

      return { success: true }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to refresh Trakt access token', error as Error)
      return { success: false, error: `Token refresh failed: ${errorMsg}` }
    }
  }

  /**
   * Validate current authentication status
   */
  async validateAuthentication(): Promise<boolean> {
    try {
      const profile = await this.traktClient.validateAuthentication()
      return Boolean(profile)
    } catch (error) {
      this.logger.warn('Trakt authentication validation failed', { error })
      return false
    }
  }
}
