import { useService } from '../../../infrastructure/di/useService'
import { TOKENS } from '../../../infrastructure/di/tokens'
import type { IUserService } from '../../../domain/services/IUserService'
import {
  user$,
  userPreferences$,
  isAuthenticated$,
  hasTraktAuth$,
  currentTheme$,
  tmdbConfig$,
  traktConfig$,
  stremioConfig$,
} from '../stores/user.store'

export const useUser = () => {
  const userService = useService<IUserService>(TOKENS.UserService)

  return {
    // Service methods
    userService,

    // Reactive state
    user$,
    userPreferences$,
    isAuthenticated$,
    hasTraktAuth$,
    currentTheme$,
    tmdbConfig$,
    traktConfig$,
    stremioConfig$,

    // Convenience methods
    initializeUser: () => userService.initializeUser(),
    loginWithTrakt: userService.loginWithTrakt.bind(userService),
    logout: () => userService.logout(),
    updatePreferences: userService.updatePreferences.bind(userService),
    updateLastActive: () => userService.updateLastActive(),
    getCurrentUser: () => userService.getCurrentUser(),
    isAuthenticated: () => userService.isAuthenticated(),
    hasTraktAuth: () => userService.hasTraktAuth(),
  }
}
