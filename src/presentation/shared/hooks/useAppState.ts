import type { IUserService } from '../../../domain/services/IUserService'
import { TOKENS } from '../../../infrastructure/di/tokens'
import { useService } from '../../../infrastructure/di/useService'
import {
  // App state
  appState$,
  // Theme
  currentTheme$,
  effectiveTheme$,
  getSupportedLocales,
  hasTraktAuth$,
  isAuthenticated$,
  setLocale,
  setTheme,
  stremioConfig$,
  SupportedLocale,
  // Types
  ThemeMode,
  // Provider configs
  tmdbConfig$,
  traktConfig$,
  // User state
  currentUser$,
  currentUserPreferences$,
  currentLocale$,
  userPreferences$,
} from '../stores/app.store'

/**
 * Single hook for all app state management
 * Includes user data, preferences, theme, locale, and provider configs
 */
export const useAppState = () => {
  const userService = useService<IUserService>(TOKENS.UserService)

  return {
    // === APP STATE ===
    appState$,
    locale: () => currentLocale$.get(),
    setLocale,
    getSupportedLocales,

    // === USER STATE ===
    currentUser$,
    currentUserPreferences$,
    userPreferences$,
    isAuthenticated$,
    hasTraktAuth$,

    // User service methods
    userService,
    initializeUser: () => userService.initializeUser(),
    getCurrentUser: () => userService.getCurrentUser(),
    isAuthenticated: () => userService.isAuthenticated(),

    // === THEME ===
    currentTheme$,
    effectiveTheme$,
    theme: () => currentTheme$.get(),
    setTheme,

    // === PROVIDER CONFIGS ===
    tmdbConfig$,
    traktConfig$,
    stremioConfig$,
  }
}

export type { SupportedLocale, ThemeMode }

