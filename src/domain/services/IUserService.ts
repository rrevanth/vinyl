import type { User, UserPreferences, TraktAccount } from '../entities'

export interface IUserService {
  /**
   * Initialize user session on app startup
   * Creates anonymous user if none exists, loads existing user from storage
   */
  initializeUser(): Promise<void>

  /**
   * Authenticate user with Trakt account
   * Upgrades anonymous user to authenticated state
   */
  loginWithTrakt(traktAccount: TraktAccount): Promise<void>

  /**
   * Log out user and return to anonymous state
   * Clears authentication data but preserves preferences
   */
  logout(): Promise<void>

  /**
   * Update user preferences
   * Automatically persists changes via Legend State
   */
  updatePreferences(preferences: Partial<UserPreferences>): Promise<void>

  /**
   * Update user activity timestamp
   * Used for session management and analytics
   */
  updateLastActive(): Promise<void>

  /**
   * Get current user (reactive)
   * Returns the current user from the store
   */
  getCurrentUser(): User

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean

  /**
   * Check if user has Trakt authentication
   */
  hasTraktAuth(): boolean
}
