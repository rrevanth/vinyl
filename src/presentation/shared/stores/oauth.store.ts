import { observable } from '@legendapp/state'

/**
 * OAuth state management store
 * Tracks OAuth flow state for CSRF protection and processing status
 */
export interface OAuthState {
  pendingState: string | null
  isProcessing: boolean
  error: string | null
}

export const oauthState$ = observable<OAuthState>({
  pendingState: null,
  isProcessing: false,
  error: null,
})

/**
 * Set pending OAuth state for CSRF validation
 */
export const setPendingOAuthState = (state: string | null) => {
  oauthState$.pendingState.set(state)
}

/**
 * Set OAuth processing status
 */
export const setOAuthProcessing = (isProcessing: boolean) => {
  oauthState$.isProcessing.set(isProcessing)
}

/**
 * Set OAuth error
 */
export const setOAuthError = (error: string | null) => {
  oauthState$.error.set(error)
}

/**
 * Clear OAuth state
 */
export const clearOAuthState = () => {
  oauthState$.set({
    pendingState: null,
    isProcessing: false,
    error: null,
  })
}