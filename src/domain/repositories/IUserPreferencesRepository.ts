import type { UserPreferences } from '@/src/domain/entities'

/**
 * Repository interface for user preferences persistence
 * Handles reading and writing user preferences data
 */
export interface IUserPreferencesRepository {
  /**
   * Get current user preferences
   * Returns the complete preferences object
   */
  getCurrentUserPreferences(): UserPreferences

  /**
   * Get user preferences by user ID
   * Used for multi-user scenarios
   */
  getUserPreferences(userId: string): Promise<UserPreferences>

  /**
   * Update user preferences
   * Merges partial updates with existing preferences
   */
  updateUserPreferences(preferences: Partial<UserPreferences>): Promise<void>

  /**
   * Update user preferences for a specific user
   * Used for multi-user scenarios
   */
  updateUserPreferencesForUser(
    userId: string,
    preferences: Partial<UserPreferences>
  ): Promise<void>

  /**
   * Save complete preferences object
   * Overwrites all preferences
   */
  saveUserPreferences(preferences: UserPreferences): Promise<void>

  /**
   * Clear user preferences
   * Resets to defaults
   */
  clearUserPreferences(): Promise<void>
}
