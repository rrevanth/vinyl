import { observable } from '@legendapp/state'

/**
 * Simplified OAuth state management
 * Only tracks pending CSRF state for validation
 */
export interface OAuthState {
  pendingState: string | null
}

export const oauthState$ = observable<OAuthState>({
  pendingState: null,
})

/**
 * Set pending OAuth state for CSRF validation
 */
export const setPendingOAuthState = (state: string | null) => {
  oauthState$.pendingState.set(state)
}

/**
 * Clear OAuth state
 */
export const clearOAuthState = () => {
  oauthState$.pendingState.set(null)
}