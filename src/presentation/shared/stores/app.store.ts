import { computed } from '@legendapp/state'
import { persistObservable, configureObservablePersistence } from '@legendapp/state/persist'
import { ObservablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage'
import { Appearance } from 'react-native'
import { UnistylesRuntime } from 'react-native-unistyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { User, Catalog, Media } from '../../../domain/entities'
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

// App-wide state interface (reserved for future app-level state)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AppState {
  // Reserved for non-user-specific app state
}

// User state interface
interface UserState {
  currentUser: User
}

// Constants
const supportedLocales: SupportedLocale[] = ['en', 'es']

// Default state creators
const createDefaultAppState = (): AppState => ({
  // Reserved for future app-level state
})

const createDefaultUserState = (): UserState => ({
  currentUser: createAnonymousUser(),
})

// === PERSISTED OBSERVABLES ===

// App-wide state (reserved for future app-level state)
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

// Catalog cache (for homescreen and browse)
export const catalogCache$ = persistObservable<Catalog[]>([], {
  pluginLocal: ObservablePersistAsyncStorage,
  local: {
    name: 'catalogCache',
  },
})

// Media cache (for quick access to media details)
export const mediaCache$ = persistObservable<Record<string, Media>>({}, {
  pluginLocal: ObservablePersistAsyncStorage,
  local: {
    name: 'mediaCache',
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
  const traktAccount = userPreferences$.accounts.trakt.get()
  return !!traktAccount && !!traktAccount.accessToken
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
export const tmdbConfig$ = computed(() => userPreferences$.accounts.tmdb.get())
export const traktConfig$ = computed(() => userPreferences$.accounts.trakt.get())
export const stremioConfig$ = computed(() => userPreferences$.accounts.stremio.get())
export const mdblistConfig$ = computed(() => userPreferences$.accounts.mdblist.get())

// === ACTIONS ===

// Locale actions
export const setLocale = (locale: SupportedLocale) => {
  if (!supportedLocales.includes(locale)) {
    throw new Error(
      `Unsupported locale: ${locale}. Supported locales: ${supportedLocales.join(', ')}`
    )
  }
  userPreferences$.ui.locale.set(locale)
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
