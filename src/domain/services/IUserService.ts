import type { User, UserPreferences } from '../entities'

export interface IUserService {
  /**
   * Initialize user session on app startup
   * Creates anonymous user if none exists, loads existing user from storage
   */
  initializeUser(): Promise<void>

  /**
   * Log out user and return to anonymous state
   * Clears authentication data and account preferences
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
   * Get current user preferences (reactive)
   * Returns the persisted preferences object managed separately from user entity
   */
  getCurrentUserPreferences(): UserPreferences

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean

  /**
   * Check if user has Trakt authentication
   */
  hasTraktAuth(): boolean
}
