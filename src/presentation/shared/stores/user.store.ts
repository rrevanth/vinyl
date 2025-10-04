import { computed } from '@legendapp/state'
import { persistObservable, configureObservablePersistence } from '@legendapp/state/persist'
import { ObservablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { User } from '../../../domain/entities'
import {
  createDefaultUserPreferences,
  addUserHelpers,
  createAnonymousUser,
} from '../../../domain/entities'

// Configure global persistence settings
configureObservablePersistence({
  localOptions: {
    asyncStorage: {
      AsyncStorage,
    },
  },
})

interface UserState {
  currentUser: User
}

const createDefaultUserState = (): UserState => ({
  currentUser: createAnonymousUser(),
})

export const userState$ = persistObservable(createDefaultUserState, {
  pluginLocal: ObservablePersistAsyncStorage,
  local: {
    name: 'userState',
  },
})

export const userPreferences$ = persistObservable(createDefaultUserPreferences, {
  pluginLocal: ObservablePersistAsyncStorage,
  local: {
    name: 'userPreferences',
  },
})

export const user$ = computed(() => userState$.currentUser.get())

export const isAuthenticated$ = computed(() => {
  const user = userState$.currentUser.get()
  return addUserHelpers(user).isAuthenticated
})

export const hasTraktAuth$ = computed(() => {
  const user = userState$.currentUser.get()
  return addUserHelpers(user).hasTraktAuth
})

export const currentTheme$ = computed(() => userPreferences$.ui.theme.get())

export const tmdbConfig$ = computed(() => userPreferences$.tmdb.get())

export const traktConfig$ = computed(() => userPreferences$.trakt.get())

export const stremioConfig$ = computed(() => userPreferences$.stremio.get())
