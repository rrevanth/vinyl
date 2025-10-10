import type { IUserService } from '@/src/domain/services/IUserService'
import type { User, UserPreferences } from '@/src/domain/entities'
import {
  createAnonymousUser,
  updateLastActive,
  updateUserPreferences,
} from '@/src/domain/entities'
import {
  userState$,
  userPreferences$,
  isAuthenticated$,
} from '@/src/presentation/shared/stores/app.store'

/**
 * Internal helper class for managing user preferences
 * Encapsulates preference update logic and state management
 */
class PreferencesManager {
  async updatePreferences(preferences: Partial<UserPreferences>): Promise<void> {
    const currentPreferences = userPreferences$.get()
    const updatedPreferences = updateUserPreferences(currentPreferences, preferences)
    userPreferences$.set(updatedPreferences)
  }

  getCurrentPreferences(): UserPreferences {
    return userPreferences$.get()
  }

  hasTraktAuth(): boolean {
    return !!userPreferences$.accounts.trakt.get()
  }
}

/**
 * Internal helper class for managing user accounts and authentication
 * Handles account data clearing and authentication state
 */
class AccountManager {
  clearAllAccounts(): void {
    userPreferences$.accounts.trakt.set(undefined)
    userPreferences$.accounts.tmdb.set(undefined)
    userPreferences$.accounts.stremio.set(undefined)
  }

  isAuthenticated(): boolean {
    return isAuthenticated$.get()
  }
}

/**
 * Internal helper class for managing user session state
 * Handles user initialization, activity tracking, and session lifecycle
 */
class SessionManager {
  initializeSession(): void {
    const existingUserState = userState$.get()

    if (!existingUserState.currentUser) {
      const anonymousUser = createAnonymousUser()
      userState$.currentUser.set(anonymousUser)
    } else {
      userState$.currentUser.set(updateLastActive(existingUserState.currentUser))
    }
  }

  updateLastActive(): void {
    const currentUser = userState$.currentUser.get()
    const updatedUser = updateLastActive(currentUser)
    userState$.currentUser.set(updatedUser)
  }

  resetToAnonymous(): void {
    const anonymousUser = createAnonymousUser()
    userState$.currentUser.set(anonymousUser)
  }

  getCurrentUser(): User {
    return userState$.currentUser.get()
  }
}

/**
 * UserService - Multi-User Context Manager
 *
 * Design Decision: Centralized Service for Multi-User Support
 *
 * This service maintains a centralized role as the single entry point for all user-related
 * operations to support future multi-user scenarios where the application may need to:
 * - Switch between multiple user contexts (e.g., family accounts)
 * - Maintain separate preference sets per user
 * - Handle cross-user synchronization
 * - Manage user-specific state isolation
 *
 * Internal Architecture: Composition Pattern
 * Rather than splitting into separate services, we use composition internally to organize
 * concerns while keeping the public API simple and consistent:
 * - PreferencesManager: Handles preference operations
 * - AccountManager: Manages authentication and account data
 * - SessionManager: Controls user session lifecycle
 *
 * This approach provides:
 * - Clear separation of concerns internally
 * - Simple, unified API for consumers
 * - Easy multi-user context switching
 * - Maintainable codebase with single responsibility per helper
 */
export class UserService implements IUserService {
  // Internal helpers using composition pattern
  private readonly preferencesManager: PreferencesManager
  private readonly accountManager: AccountManager
  private readonly sessionManager: SessionManager

  constructor() {
    this.preferencesManager = new PreferencesManager()
    this.accountManager = new AccountManager()
    this.sessionManager = new SessionManager()
  }

  /**
   * Initialize user session on app startup
   * Delegates to SessionManager for user initialization logic
   */
  async initializeUser(): Promise<void> {
    this.sessionManager.initializeSession()
  }

  /**
   * Log out user and return to anonymous state
   * Coordinates session reset and account clearing across helpers
   */
  async logout(): Promise<void> {
    this.sessionManager.resetToAnonymous()
    this.accountManager.clearAllAccounts()
  }

  /**
   * Update user preferences
   * Delegates to PreferencesManager for preference update logic
   */
  async updatePreferences(preferences: Partial<UserPreferences>): Promise<void> {
    await this.preferencesManager.updatePreferences(preferences)
  }

  /**
   * Update user activity timestamp
   * Delegates to SessionManager for activity tracking
   */
  async updateLastActive(): Promise<void> {
    this.sessionManager.updateLastActive()
  }

  /**
   * Get current user (reactive)
   * Access current user from SessionManager
   */
  getCurrentUser(): User {
    return this.sessionManager.getCurrentUser()
  }

  /**
   * Get current user preferences (reactive)
   * Access preferences from PreferencesManager
   */
  getCurrentUserPreferences(): UserPreferences {
    return this.preferencesManager.getCurrentPreferences()
  }

  /**
   * Check if user is authenticated
   * Delegates to AccountManager for authentication state
   */
  isAuthenticated(): boolean {
    return this.accountManager.isAuthenticated()
  }

  /**
   * Check if user has Trakt authentication
   * Delegates to PreferencesManager for account-specific checks
   */
  hasTraktAuth(): boolean {
    return this.preferencesManager.hasTraktAuth()
  }
}
