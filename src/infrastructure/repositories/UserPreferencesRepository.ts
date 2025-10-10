import type { IUserPreferencesRepository } from '@/src/domain/repositories/IUserPreferencesRepository'
import type { UserPreferences } from '@/src/domain/entities'
import { updateUserPreferences } from '@/src/domain/entities'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'

/**
 * UserPreferencesRepository implementation
 * Handles user preferences persistence using Legend State observables
 * Legend State automatically persists changes to AsyncStorage
 */
export class UserPreferencesRepository implements IUserPreferencesRepository {
  /**
   * Get current user preferences
   * Returns the complete preferences object from the reactive store
   */
  getCurrentUserPreferences(): UserPreferences {
    return userPreferences$.get()
  }

  /**
   * Get user preferences by user ID
   * For multi-user scenarios - currently returns current preferences
   * TODO: Implement multi-user storage when needed
   */
  async getUserPreferences(_userId: string): Promise<UserPreferences> {
    // For now, return current preferences
    // Future: Implement user-specific storage lookup
    return userPreferences$.get()
  }

  /**
   * Update user preferences
   * Merges partial updates with existing preferences
   * Legend State automatically persists to AsyncStorage
   */
  async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<void> {
    const currentPreferences = userPreferences$.get()
    const updatedPreferences = updateUserPreferences(currentPreferences, preferences)
    userPreferences$.set(updatedPreferences)
  }

  /**
   * Update user preferences for a specific user
   * For multi-user scenarios - currently updates current user
   * TODO: Implement multi-user storage when needed
   */
  async updateUserPreferencesForUser(
    _userId: string,
    preferences: Partial<UserPreferences>
  ): Promise<void> {
    // For now, update current preferences
    // Future: Implement user-specific storage
    await this.updateUserPreferences(preferences)
  }

  /**
   * Save complete preferences object
   * Overwrites all preferences
   */
  async saveUserPreferences(preferences: UserPreferences): Promise<void> {
    userPreferences$.set(preferences)
  }

  /**
   * Clear user preferences
   * Resets to defaults by setting to default preferences
   */
  async clearUserPreferences(): Promise<void> {
    const { createDefaultUserPreferences } = await import('@/src/domain/entities')
    const defaultPreferences = createDefaultUserPreferences()
    userPreferences$.set(defaultPreferences)
  }
}
