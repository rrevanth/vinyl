import type { IUserService } from '../../domain/services/IUserService'
import type { User, UserPreferences } from '../../domain/entities'
import {
  createAnonymousUser,
  updateLastActive,
  updateUserPreferences,
} from '../../domain/entities'
import {
  userState$,
  userPreferences$,
  isAuthenticated$,
} from '../../presentation/shared/stores/app.store'

export class UserService implements IUserService {
  async initializeUser(): Promise<void> {
    const existingUserState = userState$.get()

    if (!existingUserState.currentUser) {
      const anonymousUser = createAnonymousUser()
      userState$.currentUser.set(anonymousUser)
    } else {
      userState$.currentUser.set(updateLastActive(existingUserState.currentUser))
    }
  }

  async logout(): Promise<void> {
    const anonymousUser = createAnonymousUser()
    userState$.currentUser.set(anonymousUser)

    // Clear account data from preferences
    userPreferences$.accounts.trakt.set(undefined)
    userPreferences$.accounts.tmdb.set(undefined)
    userPreferences$.accounts.stremio.set(undefined)
  }

  async updatePreferences(preferences: Partial<UserPreferences>): Promise<void> {
    const currentPreferences = userPreferences$.get()
    const updatedPreferences = updateUserPreferences(currentPreferences, preferences)
    userPreferences$.set(updatedPreferences)
  }

  async updateLastActive(): Promise<void> {
    const currentUser = userState$.currentUser.get()
    const updatedUser = updateLastActive(currentUser)
    userState$.currentUser.set(updatedUser)
  }

  getCurrentUser(): User {
    return userState$.currentUser.get()
  }

  getCurrentUserPreferences(): UserPreferences {
    return userPreferences$.get()
  }

  isAuthenticated(): boolean {
    return isAuthenticated$.get()
  }

  hasTraktAuth(): boolean {
    return !!userPreferences$.accounts.trakt.get()
  }
}
