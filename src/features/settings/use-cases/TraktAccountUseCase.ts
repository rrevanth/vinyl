import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { User, TraktAccount } from '@/src/domain/entities/User'
import { userState$ } from '@/src/presentation/shared/stores/app.store'
import { DomainError } from '@/src/domain/errors'

/**
 * Result type for authentication operations
 */
export interface AuthResult {
  success: boolean
  error?: string
  account?: TraktAccount
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
  account?: TraktAccount
}

/**
 * Simplified use case for Trakt account OAuth management
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
   * Updates userState$ with Trakt account information
   * Returns AuthResult instead of throwing errors
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

      // Create Trakt account from response
      const traktAccount: TraktAccount = {
        username: profile.username,
        userId: profile.ids.slug,
        accessToken: tokenResponse.access_token,
        refreshToken: tokenResponse.refresh_token,
        expiresAt: Date.now() + tokenResponse.expires_in * 1000,
      }

      // Update user state with Trakt account
      const currentUser = userState$.currentUser.get()
      const updatedUser: User = {
        ...currentUser,
        authState: 'authenticated',
        account: {
          ...currentUser.account,
          trakt: traktAccount,
        },
        lastActiveAt: Date.now(),
      }

      userState$.currentUser.set(updatedUser)

      this.logger.info('Trakt account connected successfully', {
        username: traktAccount.username,
        userId: traktAccount.userId,
      })

      return { success: true, account: traktAccount }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to handle Trakt OAuth callback', error as Error, { code, state })
      return { success: false, error: `OAuth callback failed: ${errorMsg}` }
    }
  }

  /**
   * Disconnect Trakt account by revoking token and clearing account data
   * Returns DisconnectResult instead of throwing errors
   */
  async disconnectAccount(): Promise<DisconnectResult> {
    try {
      // Revoke token with Trakt API
      await this.traktClient.revokeToken()

      // Update user state to remove Trakt account
      const currentUser = userState$.currentUser.get()
      const updatedUser: User = {
        ...currentUser,
        authState: currentUser.account?.trakt ? 'anonymous' : currentUser.authState,
        account: currentUser.account
          ? {
              ...currentUser.account,
              trakt: undefined,
            }
          : null,
        lastActiveAt: Date.now(),
      }

      userState$.currentUser.set(updatedUser)

      this.logger.info('Trakt account disconnected successfully')
      return { success: true }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to disconnect Trakt account', error as Error)
      return { success: false, error: `Disconnect failed: ${errorMsg}` }
    }
  }

  /**
   * Check if user has connected Trakt account
   */
  isConnected(user: User): boolean {
    return Boolean(user.account?.trakt)
  }

  /**
   * Get Trakt account information if available
   */
  getAccountInfo(user: User): TraktAccount | undefined {
    return user.account?.trakt
  }

  /**
   * Check if Trakt access token is expired
   */
  isTokenExpired(account: TraktAccount): boolean {
    return Date.now() >= account.expiresAt
  }

  /**
   * Refresh Trakt access token using refresh token
   * Returns TokenRefreshResult instead of throwing errors
   */
  async refreshAccessToken(account: TraktAccount): Promise<TokenRefreshResult> {
    try {
      this.logger.info('Refreshing Trakt access token', { userId: account.userId })

      // The TraktClient automatically handles token refresh internally
      // We just need to validate authentication to trigger the refresh if needed
      const profile = await this.traktClient.validateAuthentication()

      if (!profile) {
        const errorMsg = 'Failed to validate authentication after token refresh'
        this.logger.error(errorMsg, new Error(errorMsg), { userId: account.userId })
        return { success: false, error: errorMsg }
      }

      // Get the updated configuration with new tokens from userPreferences$
      // (TraktClient updates this automatically during refresh)
      const currentUser = userState$.currentUser.get()
      const currentAccount = currentUser.account?.trakt

      if (!currentAccount) {
        const errorMsg = 'Trakt account not found after refresh'
        this.logger.error(errorMsg, new Error(errorMsg), { userId: account.userId })
        return { success: false, error: errorMsg }
      }

      this.logger.info('Trakt access token refreshed successfully')

      return { success: true, account: currentAccount }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error('Failed to refresh Trakt access token', error as Error, {
        userId: account.userId,
      })
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

  /**
   * Get current user from state
   */
  getCurrentUser(): User {
    return userState$.currentUser.get()
  }

  /**
   * Check if current user is connected to Trakt
   */
  isCurrentUserConnected(): boolean {
    const user = this.getCurrentUser()
    return this.isConnected(user)
  }

  /**
   * Get current user's Trakt account info
   */
  getCurrentAccountInfo(): TraktAccount | undefined {
    const user = this.getCurrentUser()
    return this.getAccountInfo(user)
  }

}
