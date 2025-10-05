import { useCallback, useState, useMemo } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { randomUUID } from 'expo-crypto'
import { userState$ } from '@/src/presentation/shared/stores/app.store'
import {
  oauthState$,
  setPendingOAuthState,
  setOAuthProcessing,
  setOAuthError,
  clearOAuthState,
} from '@/src/presentation/shared/stores/oauth.store'
import { TraktAccountUseCase } from '../use-cases/TraktAccountUseCase'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktAccount } from '@/src/domain/entities/User'

/**
 * Hook for Trakt account OAuth management
 *
 * Provides OAuth flow functionality and reactive access to Trakt account status.
 * Uses expo-web-browser for OAuth authentication flow.
 *
 * Usage:
 * ```tsx
 * const { isConnected, account, startOAuthFlow, disconnect } = useTraktAccount()
 *
 * // Start OAuth flow
 * await startOAuthFlow()
 *
 * // Disconnect account
 * await disconnect()
 *
 * // Check connection status
 * if (isConnected) {
 *   console.log('Connected as:', account?.username)
 * }
 * ```
 */
export const useTraktAccount = () => {
  // Get services from DI container
  const traktClient = useService<TraktClient>(TOKENS.TraktClient)
  const logger = useService<ILoggingService>(TOKENS.LoggingService)

  // Create use case instance
  const traktUseCase = useMemo(
    () => new TraktAccountUseCase(traktClient, logger),
    [traktClient, logger]
  )

  // Local loading state for UI feedback
  const [isLoading, setIsLoading] = useState(false)

  // Reactive state from Legend State
  const currentUser = userState$.currentUser.get()
  const oauthState = oauthState$.get()

  // Computed values
  const isConnected = traktUseCase.isConnected(currentUser)
  const account = traktUseCase.getAccountInfo(currentUser)

  /**
   * Start OAuth authentication flow
   * Opens browser for user to authorize the app
   */
  const startOAuthFlow = useCallback(async () => {
    try {
      setIsLoading(true)
      setOAuthProcessing(true)
      setOAuthError(null)

      // Generate CSRF protection state
      const state = randomUUID()
      setPendingOAuthState(state)

      // Get authorization URL from use case
      const authUrl = traktUseCase.getAuthorizationUrl(state)

      // Get the correct redirect URI from Trakt client config
      const redirectUri = traktClient.getCurrentConfig().effectiveRedirectUri

      logger.info('Opening Trakt OAuth browser', { state, redirectUri })

      // Open browser for OAuth flow with proper redirect URI
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri // Use the actual redirect URI from config
      )

      if (result.type === 'success' && result.url) {
        // Parse authorization code and state from redirect URL
        const url = new URL(result.url)
        const code = url.searchParams.get('code')
        const returnedState = url.searchParams.get('state')

        if (!code) {
          throw new Error('No authorization code received from Trakt')
        }

        // Validate state matches (CSRF protection)
        if (returnedState !== state) {
          throw new Error('OAuth state mismatch - potential CSRF attack')
        }

        logger.info('OAuth authorization successful, exchanging code for token')

        // Handle callback and exchange code for token
        await traktUseCase.handleCallback(code, returnedState)

        logger.info('Trakt account connected successfully')
        clearOAuthState()
      } else if (result.type === 'cancel') {
        logger.info('OAuth flow cancelled by user')
        setOAuthError('Authentication cancelled')
      } else {
        throw new Error('OAuth flow failed')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      logger.error('OAuth flow failed', error as Error)
      setOAuthError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
      setOAuthProcessing(false)
    }
  }, [traktUseCase, traktClient, logger])

  /**
   * Handle OAuth callback from deep link
   * Used when the app is opened via deep link after OAuth authorization
   */
  const handleOAuthCallback = useCallback(
    async (code: string, state: string) => {
      try {
        setIsLoading(true)

        // Validate state matches pending state
        const pendingState = oauthState$.pendingState.get()
        if (state !== pendingState) {
          throw new Error('OAuth state mismatch - potential CSRF attack')
        }

        logger.info('OAuth authorization successful, exchanging code for token')

        // Handle callback and exchange code for token
        await traktUseCase.handleCallback(code, state)

        logger.info('Trakt account connected successfully')
        clearOAuthState()
      } catch (error) {
        logger.error('OAuth callback failed', error as Error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [traktUseCase, logger]
  )

  /**
   * Disconnect Trakt account
   * Revokes token and clears account data
   */
  const disconnect = useCallback(async () => {
    try {
      setIsLoading(true)
      logger.info('Disconnecting Trakt account')

      await traktUseCase.disconnectAccount()

      logger.info('Trakt account disconnected successfully')
      clearOAuthState()
    } catch (error) {
      logger.error('Failed to disconnect Trakt account', error as Error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [traktUseCase, logger])

  /**
   * Validate current authentication
   * Useful for checking if token is still valid
   */
  const validateAuthentication = useCallback(async () => {
    try {
      return await traktUseCase.validateAuthentication()
    } catch (error) {
      logger.error('Failed to validate Trakt authentication', error as Error)
      return false
    }
  }, [traktUseCase, logger])

  /**
   * Refresh access token if expired
   */
  const refreshToken = useCallback(async () => {
    try {
      if (!account) {
        throw new Error('No Trakt account connected')
      }

      if (traktUseCase.isTokenExpired(account)) {
        logger.info('Trakt token expired, refreshing')
        return await traktUseCase.refreshAccessToken(account)
      }

      return account
    } catch (error) {
      logger.error('Failed to refresh Trakt token', error as Error)
      throw error
    }
  }, [account, traktUseCase, logger])

  return {
    // State
    isConnected,
    account,
    isLoading: isLoading || oauthState.isProcessing,
    error: oauthState.error,

    // Actions
    startOAuthFlow,
    handleOAuthCallback,
    disconnect,
    validateAuthentication,
    refreshToken,
  }
}

/**
 * Hook for getting Trakt account info only (read-only)
 * Use this when you only need to read the account without mutation functions
 */
export const useTraktAccountInfo = (): TraktAccount | undefined => {
  const currentUser = userState$.currentUser.get()
  return currentUser.account?.trakt
}