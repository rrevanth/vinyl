import { computed } from '@legendapp/state'
import { persistObservable, configureObservablePersistence } from '@legendapp/state/persist'
import { ObservablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage'
import { Appearance } from 'react-native'
import { UnistylesRuntime } from 'react-native-unistyles'
import * as Localization from 'expo-localization'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { User, UserPreferences } from '../../../domain/entities'
import {
  createDefaultUserPreferences,
  addUserHelpers,
  createPrimaryAnonymousUser,
  createSecondaryAnonymousUser,
  upgradeToAuthenticatedUser,
  updateLastActive,
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

// === INTERFACES ===

interface AppState {
  activeUserId: string
}

interface UsersStore {
  [userId: string]: User
}

interface UserPreferencesStore {
  [userId: string]: UserPreferences
}

// === CONSTANTS ===

const supportedLocales: SupportedLocale[] = ['en', 'es']

// === HELPERS ===

const getDeviceLocale = (): SupportedLocale => {
  const locales = Localization.getLocales()
  const deviceLocale = locales.length > 0 ? locales[0].languageCode : 'en'
  const languageCode = deviceLocale?.split('-')[0].toLowerCase() as SupportedLocale
  return supportedLocales.includes(languageCode) ? languageCode : 'en'
}

// === PERSISTED OBSERVABLES ===

// Multi-user stores
export const users$ = persistObservable<UsersStore>(() => ({}), {
  pluginLocal: ObservablePersistAsyncStorage,
  local: {
    name: 'users',
  },
})

export const userPreferences$ = persistObservable<UserPreferencesStore>(() => ({}), {
  pluginLocal: ObservablePersistAsyncStorage,
  local: {
    name: 'userPreferences',
  },
})

// === PERSISTENCE READY CHECK ===

/**
 * Wait for AsyncStorage to finish loading persisted data
 * This ensures DI container initialization happens AFTER tokens are loaded
 */
export const waitForPersistenceReady = async (): Promise<void> => {
  console.log('[Persistence] Waiting for AsyncStorage to load...')

  // Legend State's persistObservable loads asynchronously on module initialization
  // Give it a moment to sync from AsyncStorage before proceeding
  // This prevents TraktClient from reading empty config before tokens are loaded
  await new Promise(resolve => setTimeout(resolve, 200))

  console.log('[Persistence] AsyncStorage load complete')
}

// App state with active user
export const appState$ = persistObservable<AppState>(
  () => {
    // Initialize with primary anonymous user if no users exist
    const existingUsers = users$.peek()
    if (Object.keys(existingUsers).length === 0) {
      const primaryUser = createPrimaryAnonymousUser()
      const deviceLocale = getDeviceLocale()

      users$[primaryUser.id].set(primaryUser)
      userPreferences$[primaryUser.id].set(createDefaultUserPreferences(deviceLocale))

      return { activeUserId: primaryUser.id }
    }

    // Find existing primary user
    const primaryUser = Object.values(existingUsers).find(u => u.isPrimary)
    if (primaryUser) {
      return { activeUserId: primaryUser.id }
    }

    // Fallback: use first user
    const firstUserId = Object.keys(existingUsers)[0]
    return { activeUserId: firstUserId }
  },
  {
    pluginLocal: ObservablePersistAsyncStorage,
    local: {
      name: 'appState',
    },
  }
)

// === COMPUTED VALUES ===

// Current user
export const currentUser$ = computed(() => {
  const activeId = appState$.activeUserId.get()
  return users$[activeId]?.get()
})

export const currentUserPreferences$ = computed(() => {
  const activeId = appState$.activeUserId.get()
  return userPreferences$[activeId]?.get()
})

// User helpers
export const isAuthenticated$ = computed(() => {
  const user = currentUser$.get()
  return user ? addUserHelpers(user).isAuthenticated : false
})

export const hasTraktAuth$ = computed(() => {
  const prefs = currentUserPreferences$.get()
  return !!prefs?.trakt?.accessToken && !!prefs?.trakt?.username
})

export const isPrimaryUser$ = computed(() => {
  const user = currentUser$.get()
  return user?.isPrimary ?? false
})

// Locale (per-user)
export const currentLocale$ = computed(() => {
  const prefs = currentUserPreferences$.get()
  return (prefs?.locale as SupportedLocale) ?? 'en'
})

// Theme computeds
export const currentTheme$ = computed(() => {
  const prefs = currentUserPreferences$.get()
  return prefs?.ui?.theme ?? 'system'
})

export const effectiveTheme$ = computed(() => {
  const theme = currentTheme$.get()
  if (theme === 'system') {
    return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'
  }
  return theme
})

// Provider configurations (needed by infrastructure layer)
export const tmdbConfig$ = computed(() => {
  const prefs = currentUserPreferences$.get()
  return prefs?.tmdb
})

export const traktConfig$ = computed(() => {
  const prefs = currentUserPreferences$.get()
  return prefs?.trakt
})

export const stremioConfig$ = computed(() => {
  const prefs = currentUserPreferences$.get()
  return prefs?.stremio
})

// === USER MANAGEMENT ACTIONS ===

/**
 * Create new user profile
 * Returns the new user ID
 */
export const createUserProfile = (): string => {
  const newUser = createSecondaryAnonymousUser()
  const deviceLocale = getDeviceLocale()

  users$[newUser.id].set(newUser)
  userPreferences$[newUser.id].set(createDefaultUserPreferences(deviceLocale))

  return newUser.id
}

/**
 * Switch active user
 */
export const switchToUser = (userId: string): void => {
  const user = users$[userId].peek()
  if (!user) {
    throw new Error(`User ${userId} not found`)
  }
  appState$.activeUserId.set(userId)
}

/**
 * Delete user profile (only if not primary)
 */
export const deleteUserProfile = (userId: string): void => {
  const user = users$[userId].peek()
  if (!user) {
    throw new Error(`User ${userId} not found`)
  }
  if (user.isPrimary) {
    throw new Error('Cannot delete primary user')
  }

  users$[userId].delete()
  userPreferences$[userId].delete()

  // If deleting active user, switch to primary
  if (appState$.activeUserId.peek() === userId) {
    const allUsers = users$.peek()
    const primaryUser = Object.values(allUsers).find(u => u.isPrimary)
    if (primaryUser) {
      appState$.activeUserId.set(primaryUser.id)
    }
  }
}

/**
 * Get primary user
 */
export const getPrimaryUser = (): User => {
  const allUsers = users$.peek()
  const primary = Object.values(allUsers).find(u => u.isPrimary)
  if (!primary) {
    throw new Error('No primary user found')
  }
  return primary
}

/**
 * Get all users
 */
export const getAllUsers = (): User[] => {
  return Object.values(users$.peek())
}

/**
 * Update current user
 */
export const updateCurrentUser = (updates: Partial<User>): void => {
  const activeId = appState$.activeUserId.get()
  const currentUser = users$[activeId].peek()
  if (currentUser) {
    users$[activeId].set({ ...currentUser, ...updates })
  }
}

/**
 * Update current user's last active timestamp
 */
export const updateCurrentUserLastActive = (): void => {
  const activeId = appState$.activeUserId.get()
  const currentUser = users$[activeId].peek()
  if (currentUser) {
    users$[activeId].set(updateLastActive(currentUser))
  }
}

/**
 * Upgrade current user to authenticated
 */
export const upgradeCurrentUserToAuthenticated = (): void => {
  const activeId = appState$.activeUserId.get()
  const currentUser = users$[activeId].peek()
  if (currentUser) {
    users$[activeId].set(upgradeToAuthenticatedUser(currentUser))
  }
}

// === LOCALE ACTIONS ===

/**
 * Set locale for current user
 */
export const setLocale = (locale: SupportedLocale): void => {
  if (!supportedLocales.includes(locale)) {
    throw new Error(
      `Unsupported locale: ${locale}. Supported locales: ${supportedLocales.join(', ')}`
    )
  }

  const activeId = appState$.activeUserId.get()
  const prefs = userPreferences$[activeId].peek()
  if (prefs) {
    userPreferences$[activeId].set({ ...prefs, locale })
  }
}

export const getSupportedLocales = (): SupportedLocale[] => [...supportedLocales]

// === THEME ACTIONS ===

/**
 * Set theme for current user
 */
export const setTheme = (theme: ThemeMode): void => {
  const activeId = appState$.activeUserId.get()
  const prefs = userPreferences$[activeId].peek()
  if (prefs) {
    userPreferences$[activeId].set({
      ...prefs,
      ui: { ...prefs.ui, theme },
    })
  }
}

// === THEME MANAGEMENT ===

const applyTheme = (theme: 'light' | 'dark') => {
  try {
    UnistylesRuntime.setTheme(theme)
  } catch {
    console.warn(`Unistyles theme '${theme}' not ready yet, will retry after configuration`)
    setTimeout(() => applyTheme(theme), 100)
  }
}

let systemThemeSubscription: { remove: () => void } | null = null

const initializeTheme = () => {
  const effective = effectiveTheme$.get()
  applyTheme(effective)

  // Subscribe to theme preference changes
  currentTheme$.onChange(() => {
    const newEffective = effectiveTheme$.get()
    applyTheme(newEffective)
  })

  // Subscribe to active user changes
  appState$.activeUserId.onChange(() => {
    const newEffective = effectiveTheme$.get()
    applyTheme(newEffective)
  })

  // Subscribe to system theme changes with proper cleanup
  if (systemThemeSubscription) {
    systemThemeSubscription.remove()
  }

  systemThemeSubscription = Appearance.addChangeListener(() => {
    if (currentTheme$.get() === 'system') {
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

// === MIGRATION ===

/**
 * Migrate from single-user to multi-user structure
 * Called automatically on app startup
 */
const migrateToMultiUser = async () => {
  try {
    // Check if we have the old single-user structure
    const oldUserState = await AsyncStorage.getItem('userState')
    const oldAppState = await AsyncStorage.getItem('appState')

    if (oldUserState) {
      const parsed = JSON.parse(oldUserState)
      const oldUser = parsed.currentUser

      // Check if already migrated (user has isPrimary field)
      if (oldUser && oldUser.isPrimary === undefined) {
        console.log('[Migration] Migrating from single-user to multi-user structure')

        // Create primary user from old user
        const primaryUser: User = {
          id: oldUser.id,
          isPrimary: true,
          authState: oldUser.authState,
          createdAt: oldUser.createdAt || Date.now(),
          lastActiveAt: oldUser.lastActiveAt || Date.now(),
        }

        // Get locale from old appState
        let locale = 'en'
        if (oldAppState) {
          const appStateParsed = JSON.parse(oldAppState)
          locale = appStateParsed.locale || 'en'
        }

        // Get old preferences or create new
        const oldPrefsData = await AsyncStorage.getItem('userPreferences')
        let prefs: UserPreferences
        if (oldPrefsData) {
          const oldPrefs = JSON.parse(oldPrefsData)
          prefs = { ...oldPrefs, locale }
        } else {
          prefs = createDefaultUserPreferences(locale)
        }

        // Set migrated data
        users$[primaryUser.id].set(primaryUser)
        userPreferences$[primaryUser.id].set(prefs)
        appState$.activeUserId.set(primaryUser.id)

        // Remove old storage keys
        await AsyncStorage.removeItem('userState')

        console.log('[Migration] Migration complete!')
      }
    }
  } catch (error) {
    console.error('[Migration] Failed to migrate:', error)
  }
}

// Run migration on module load
migrateToMultiUser()
