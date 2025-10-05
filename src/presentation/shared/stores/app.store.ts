import { computed } from '@legendapp/state'
import { persistObservable, configureObservablePersistence } from '@legendapp/state/persist'
import { ObservablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage'
import { Appearance } from 'react-native'
import { UnistylesRuntime } from 'react-native-unistyles'
import * as Localization from 'expo-localization'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { User } from '../../../domain/entities'
import {
  createDefaultUserPreferences,
  addUserHelpers,
  createAnonymousUser,
} from '../../../domain/entities'
import type { SupportedLocale } from '../i18n/translations'

// Configure global persistence settings
configureObservablePersistence({
  localOptions: {
    asyncStorage: {
      AsyncStorage,
    },
  },
})

// Types
export type ThemeMode = 'light' | 'dark' | 'system'
export type { SupportedLocale }

// App-wide state interface
interface AppState {
  locale: SupportedLocale
}

// User state interface
interface UserState {
  currentUser: User
}

// Constants
const supportedLocales: SupportedLocale[] = ['en', 'es']

// Helpers
const getDeviceLocale = (): SupportedLocale => {
  const locales = Localization.getLocales()
  const deviceLocale = locales.length > 0 ? locales[0].languageCode : 'en'
  const languageCode = deviceLocale?.split('-')[0].toLowerCase() as SupportedLocale
  return supportedLocales.includes(languageCode) ? languageCode : 'en'
}

// Default state creators
const createDefaultAppState = (): AppState => ({
  locale: getDeviceLocale(),
})

const createDefaultUserState = (): UserState => ({
  currentUser: createAnonymousUser(),
})

// === PERSISTED OBSERVABLES ===

// App-wide state (locale, etc.)
export const appState$ = persistObservable(createDefaultAppState, {
  pluginLocal: ObservablePersistAsyncStorage,
  local: {
    name: 'appState',
  },
})

// User state (authentication, profile)
export const userState$ = persistObservable(createDefaultUserState, {
  pluginLocal: ObservablePersistAsyncStorage,
  local: {
    name: 'userState',
  },
})

// User preferences (theme, settings, provider configs)
export const userPreferences$ = persistObservable(createDefaultUserPreferences, {
  pluginLocal: ObservablePersistAsyncStorage,
  local: {
    name: 'userPreferences',
  },
})

// === COMPUTED VALUES ===

// User computeds
export const user$ = computed(() => userState$.currentUser.get())

export const isAuthenticated$ = computed(() => {
  const user = userState$.currentUser.get()
  return addUserHelpers(user).isAuthenticated
})

export const hasTraktAuth$ = computed(() => {
  const user = userState$.currentUser.get()
  return addUserHelpers(user).hasTraktAuth
})

// Theme computeds
export const currentTheme$ = computed(() => userPreferences$.ui.theme.get())

export const effectiveTheme$ = computed(() => {
  const theme = userPreferences$.ui.theme.get()
  if (theme === 'system') {
    return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'
  }
  return theme
})

// Provider configurations (needed by infrastructure layer)
export const tmdbConfig$ = computed(() => userPreferences$.tmdb.get())
export const traktConfig$ = computed(() => userPreferences$.trakt.get())
export const stremioConfig$ = computed(() => userPreferences$.stremio.get())

// === ACTIONS ===

// Locale actions
export const setLocale = (locale: SupportedLocale) => {
  if (!supportedLocales.includes(locale)) {
    throw new Error(
      `Unsupported locale: ${locale}. Supported locales: ${supportedLocales.join(', ')}`
    )
  }
  appState$.locale.set(locale)
}

export const getSupportedLocales = (): SupportedLocale[] => [...supportedLocales]

// Theme actions
export const setTheme = (theme: ThemeMode) => {
  userPreferences$.ui.theme.set(theme)
}

// === THEME MANAGEMENT ===

const applyTheme = (theme: 'light' | 'dark') => {
  try {
    // Attempt to set the theme - if themes aren't registered, this will throw
    UnistylesRuntime.setTheme(theme)
  } catch {
    // Theme system not ready yet, schedule retry
    console.warn(`Unistyles theme '${theme}' not ready yet, will retry after configuration`)
    setTimeout(() => applyTheme(theme), 100)
  }
}

let systemThemeSubscription: { remove: () => void } | null = null

const initializeTheme = () => {
  const effective = effectiveTheme$.get()
  applyTheme(effective)

  // Subscribe to theme preference changes
  userPreferences$.ui.theme.onChange(() => {
    const newEffective = effectiveTheme$.get()
    applyTheme(newEffective)
  })

  // Subscribe to system theme changes with proper cleanup
  if (systemThemeSubscription) {
    systemThemeSubscription.remove()
  }

  systemThemeSubscription = Appearance.addChangeListener(() => {
    if (userPreferences$.ui.theme.get() === 'system') {
      // Force re-evaluation of computed value to trigger theme update
      const newEffective = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'
      applyTheme(newEffective)
    }
  })
}

// Initialize theme on module load
initializeTheme()

// Cleanup function for potential unmount scenarios
export const cleanupThemeManagement = () => {
  if (systemThemeSubscription) {
    systemThemeSubscription.remove()
    systemThemeSubscription = null
  }
}
