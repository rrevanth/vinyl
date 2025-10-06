import type { IUserService } from '../../domain/services/IUserService'
import type { User, UserPreferences } from '../../domain/entities'
import type { TraktConfig } from '../../domain/entities/UserPreferences'
import { updateUserPreferences } from '../../domain/entities'
import {
  currentUser$,
  userPreferences$,
  appState$,
  isAuthenticated$,
  hasTraktAuth$,
  updateCurrentUserLastActive,
  upgradeCurrentUserToAuthenticated,
} from '../../presentation/shared/stores/app.store'

export class UserService implements IUserService {
  async initializeUser(): Promise<void> {
    // Multi-user initialization is handled by app.store.ts automatically
    // Just update the current user's last active timestamp
    updateCurrentUserLastActive()
  }

  async loginWithTrakt(traktConfig: TraktConfig): Promise<void> {
    // Upgrade current user to authenticated
    upgradeCurrentUserToAuthenticated()

    // Update trakt config in current user's preferences
    const activeId = appState$.activeUserId.get()
    const currentPrefs = userPreferences$[activeId].peek()
    if (currentPrefs) {
      userPreferences$[activeId].set({
        ...currentPrefs,
        trakt: { ...currentPrefs.trakt, ...traktConfig },
        updatedAt: Date.now(),
      })
    }
  }

  async logout(): Promise<void> {
    // Clear Trakt auth from current user's preferences
    const activeId = appState$.activeUserId.get()
    const currentPrefs = userPreferences$[activeId].peek()
    if (currentPrefs) {
      userPreferences$[activeId].set({
        ...currentPrefs,
        trakt: {
          ...currentPrefs.trakt,
          username: undefined,
          userId: undefined,
          accessToken: undefined,
          refreshToken: undefined,
          tokenExpiresAt: undefined,
        },
        updatedAt: Date.now(),
      })
    }
  }

  async updatePreferences(preferences: Partial<UserPreferences>): Promise<void> {
    const activeId = appState$.activeUserId.get()
    const currentPrefs = userPreferences$[activeId].peek()
    if (currentPrefs) {
      const updatedPreferences = updateUserPreferences(currentPrefs, preferences)
      userPreferences$[activeId].set(updatedPreferences)
    }
  }

  async updateLastActive(): Promise<void> {
    updateCurrentUserLastActive()
  }

  getCurrentUser(): User {
    return currentUser$.get()!
  }

  isAuthenticated(): boolean {
    return isAuthenticated$.get()
  }

  hasTraktAuth(): boolean {
    return hasTraktAuth$.get()
  }
}
