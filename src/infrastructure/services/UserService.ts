import type { IUserService } from '../../domain/services/IUserService'
import type { User, UserPreferences, TraktAccount } from '../../domain/entities'
import {
  createAnonymousUser,
  upgradeToAuthenticatedUser,
  updateLastActive,
  updateUserPreferences,
} from '../../domain/entities'
import {
  userState$,
  userPreferences$,
  isAuthenticated$,
  hasTraktAuth$,
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

  async loginWithTrakt(traktAccount: TraktAccount): Promise<void> {
    const currentUser = userState$.currentUser.get()
    const authenticatedUser = upgradeToAuthenticatedUser(currentUser, {
      trakt: traktAccount,
    })

    userState$.currentUser.set(authenticatedUser)
  }

  async logout(): Promise<void> {
    const anonymousUser = createAnonymousUser()
    userState$.currentUser.set(anonymousUser)
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

  isAuthenticated(): boolean {
    return isAuthenticated$.get()
  }

  hasTraktAuth(): boolean {
    return hasTraktAuth$.get()
  }
}
