import { useCallback, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from '@legendapp/state/react'
import * as WebBrowser from 'expo-web-browser'
import { randomUUID } from 'expo-crypto'
import {
  currentUser$,
  currentUserPreferences$,
  userPreferences$,
  appState$,
  upgradeCurrentUserToAuthenticated,
  updateCurrentUserLastActive,
} from '@/src/presentation/shared/stores/app.store'
import type { TraktConfig } from '@/src/domain/entities/UserPreferences'
import {
  oauthState$,
  setPendingOAuthState,
  clearOAuthState,
} from '@/src/presentation/shared/stores/oauth.store'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { TraktAccountUseCase } from '@/src/domain/use-cases/TraktAccountUseCase'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

/**
 * Simplified hook for Trakt account OAuth management
 *
 * Provides simple OAuth flow functionality and reactive access to Trakt account status.
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
  const traktUseCase = useService<TraktAccountUseCase>(TOKENS.TraktAccountUseCase)
  const traktClient = useService<TraktClient>(TOKENS.TraktClient)
  const logger = useService<ILoggingService>(TOKENS.LoggingService)

  // Reactive state from Legend State
  const currentUser = useSelector(() => currentUser$.get())
  const currentPrefs = useSelector(() => currentUserPreferences$.get())
  const traktConfig = useSelector(() => currentPrefs?.trakt)

  // Local state for OAuth-specific error messages
  const [error, setError] = useState<string | null>(null)

  // Computed values
  const isConnected = Boolean(currentPrefs?.trakt?.accessToken && currentPrefs?.trakt?.username)
  const account = currentPrefs?.trakt
    ? {
        username: currentPrefs.trakt.username!,
        userId: currentPrefs.trakt.userId!,
      }
    : undefined

  // Mutation for handling OAuth callback (exchanging code for token)
  const connectMutation = useMutation({
    mutationFn: async ({ code, state }: { code: string; state: string }) => {
      return traktUseCase.handleCallback(code, state)
    },
    onSuccess: (result) => {
      if (result.success && result.tokens && currentUser) {
        // Update User entity auth state
        upgradeCurrentUserToAuthenticated()
        updateCurrentUserLastActive()

        // Update preferences with all Trakt data (identity + tokens)
        const activeId = appState$.activeUserId.get()
        const prefs = userPreferences$[activeId].peek()

        if (prefs) {
          // Safely get existing Trakt config or use empty object
          const existingTraktConfig = prefs.trakt || {}

          // Clean API config fields (convert empty strings to undefined for env var fallback)
          const cleanedPrefs = {
            ...existingTraktConfig,
            clientId: existingTraktConfig.clientId || undefined,
            clientSecret: existingTraktConfig.clientSecret || undefined,
            redirectUri: existingTraktConfig.redirectUri || undefined,
          }

          // Update entire preferences object to ensure persistence
          userPreferences$[activeId].set({
            ...prefs,
            trakt: {
              ...cleanedPrefs,
              username: result.tokens.username,
              userId: result.tokens.userId,
              accessToken: result.tokens.accessToken,
              refreshToken: result.tokens.refreshToken,
              tokenExpiresAt: new Date(result.tokens.expiresAt).toISOString(),
            },
            updatedAt: Date.now(),
          })

          logger.info('Trakt tokens saved to preferences', {
            hasAccessToken: Boolean(result.tokens.accessToken),
            hasRefreshToken: Boolean(result.tokens.refreshToken),
            username: result.tokens.username,
            expiresAt: new Date(result.tokens.expiresAt).toISOString(),
          })
        }
      }
    },
  })

  // Mutation for disconnecting account
  const disconnectMutation = useMutation({
    mutationFn: async () => {
      return traktUseCase.disconnectAccount()
    },
    onSuccess: (result) => {
      if (result.success) {
        // Clear Trakt data from preferences
        const activeId = appState$.activeUserId.get()
        const prefs = userPreferences$[activeId].peek()

        if (prefs) {
          // Update entire preferences object to ensure persistence
          userPreferences$[activeId].set({
            ...prefs,
            trakt: {
              ...prefs.trakt,
              username: undefined,
              userId: undefined,
              accessToken: undefined,
              refreshToken: undefined,
              tokenExpiresAt: undefined,
            },
            updatedAt: Date.now(),
          })
        }

        // Update user last active
        updateCurrentUserLastActive()
      }
      clearOAuthState()
    },
  })

  // Mutation for refreshing token
  const refreshTokenMutation = useMutation({
    mutationFn: async () => {
      if (!account) {
        throw new Error('No Trakt account connected')
      }

      // Get token expiration from preferences
      const tokenExpiresAt = currentPrefs?.trakt?.tokenExpiresAt
        ? new Date(currentPrefs.trakt.tokenExpiresAt).getTime()
        : 0

      if (traktUseCase.isTokenExpired(tokenExpiresAt)) {
        logger.info('Trakt token expired, refreshing')
        return traktUseCase.refreshAccessToken()
      }
      return { success: true }
    },
  })

  // Mutation for saving configuration
  const saveConfigMutation = useMutation({
    mutationFn: async (config: Partial<TraktConfig>) => {
      const activeId = appState$.activeUserId.get()
      const prefs = userPreferences$[activeId].peek()

      if (!prefs) {
        throw new Error('No user preferences found')
      }

      // Update entire preferences object to ensure persistence
      userPreferences$[activeId].set({
        ...prefs,
        trakt: {
          ...prefs.trakt,
          baseUrl: config.baseUrl ?? prefs.trakt.baseUrl,
          clientId: config.clientId ?? prefs.trakt.clientId,
          clientSecret: config.clientSecret ?? prefs.trakt.clientSecret,
          redirectUri: config.redirectUri ?? prefs.trakt.redirectUri,
        },
        updatedAt: Date.now(),
      })

      return { success: true }
    },
  })

  /**
   * Start OAuth authentication flow
   * Opens browser for user to authorize the app
   */
  const startOAuthFlow = useCallback(async () => {
    try {
      // Clear previous errors and state
      setError(null)
      clearOAuthState()

      // Generate CSRF protection state
      const state = randomUUID()
      setPendingOAuthState(state)

      // Get authorization URL from use case
      const authUrl = traktUseCase.getAuthorizationUrl(state)

      // Get the redirect URI from Trakt client config
      const redirectUri = traktClient.getCurrentConfig().effectiveRedirectUri

      logger.info('Opening Trakt OAuth browser', {
        state,
        redirectUri,
        authUrl
      })

      // Open browser for OAuth flow
      const browserResult = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri)

      logger.info('WebBrowser result', { type: browserResult.type })

      if (browserResult.type === 'success' && browserResult.url) {
        // Parse authorization code and state from redirect URL
        const url = new URL(browserResult.url)
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

        // Use mutation to handle callback
        const result = await connectMutation.mutateAsync({ code, state: returnedState })

        if (!result.success) {
          throw new Error(result.error || 'Failed to connect Trakt account')
        }

        logger.info('Trakt account connected successfully')
        clearOAuthState()
      } else if (browserResult.type === 'cancel') {
        logger.info('OAuth flow cancelled by user')
        setError('Authentication cancelled')
        clearOAuthState()
      } else {
        throw new Error('OAuth flow failed')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      logger.error('OAuth flow failed', error as Error)
      setError(errorMessage)

      // Clear OAuth state on failure to allow retry
      clearOAuthState()
    }
  }, [traktUseCase, traktClient, logger, connectMutation])

  /**
   * Handle OAuth callback from deep link
   * Used when the app is opened via deep link after OAuth authorization
   */
  const handleOAuthCallback = useCallback(
    async (code: string, state: string) => {
      try {
        // Validate state matches pending state
        const pendingState = oauthState$.pendingState.get()
        if (state !== pendingState) {
          throw new Error('OAuth state mismatch - potential CSRF attack')
        }

        logger.info('OAuth authorization successful, exchanging code for token')

        // Use mutation to handle callback
        const result = await connectMutation.mutateAsync({ code, state })

        if (!result.success) {
          throw new Error(result.error || 'Failed to connect Trakt account')
        }

        logger.info('Trakt account connected successfully')
        clearOAuthState()
      } catch (error) {
        logger.error('OAuth callback failed', error as Error)

        // Clear OAuth state on failure to allow retry
        clearOAuthState()
        throw error
      }
    },
    [connectMutation, logger]
  )

  /**
   * Disconnect Trakt account
   * Revokes token and clears account data
   */
  const disconnect = useCallback(async () => {
    try {
      logger.info('Disconnecting Trakt account')

      const result = await disconnectMutation.mutateAsync()

      if (!result.success) {
        throw new Error(result.error || 'Failed to disconnect Trakt account')
      }

      logger.info('Trakt account disconnected successfully')
    } catch (error) {
      logger.error('Failed to disconnect Trakt account', error as Error)
      throw error
    }
  }, [disconnectMutation, logger])

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
      const result = await refreshTokenMutation.mutateAsync()

      if (!result.success) {
        throw new Error(result.error || 'Failed to refresh token')
      }

      // Return the updated account info from currentUserPreferences$
      return currentUserPreferences$.get()?.trakt
    } catch (error) {
      logger.error('Failed to refresh Trakt token', error as Error)
      throw error
    }
  }, [refreshTokenMutation, logger])

  /**
   * Save Trakt configuration
   * Updates user preferences with new configuration values
   */
  const saveConfig = useCallback(
    async (config: Partial<TraktConfig>) => {
      try {
        logger.info('Saving Trakt configuration', {
          hasBaseUrl: Boolean(config.baseUrl),
          hasClientId: Boolean(config.clientId),
          hasClientSecret: Boolean(config.clientSecret),
        })

        const result = await saveConfigMutation.mutateAsync(config)

        if (!result.success) {
          throw new Error('Failed to save configuration')
        }

        logger.info('Trakt configuration saved successfully')
        return { success: true }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        logger.error('Failed to save Trakt configuration', error as Error)
        return { success: false, error: errorMessage }
      }
    },
    [saveConfigMutation, logger]
  )

  return {
    // State
    isConnected,
    account,
    isLoading:
      connectMutation.isPending ||
      disconnectMutation.isPending ||
      refreshTokenMutation.isPending ||
      saveConfigMutation.isPending,
    error,
    config: traktConfig,

    // Actions
    startOAuthFlow,
    handleOAuthCallback,
    disconnect,
    validateAuthentication,
    refreshToken,
    saveConfig,
  }
}

/**
 * Hook for getting Trakt account info only (read-only)
 * Use this when you only need to read the account without mutation functions
 */
export const useTraktAccountInfo = (): { username: string; userId: string } | undefined => {
  const prefs = currentUserPreferences$.get()
  return prefs?.trakt?.username && prefs?.trakt?.userId
    ? {
        username: prefs.trakt.username,
        userId: prefs.trakt.userId,
      }
    : undefined
}