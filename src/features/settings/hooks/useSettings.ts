import { useCallback } from 'react'
import { useAppState } from '@/src/presentation/shared/hooks/useAppState'
import { SettingsUseCase, CacheInfo, AppInfo } from '@/src/domain/use-cases/SettingsUseCase'
import type { ThemeMode, SupportedLocale } from '@/src/presentation/shared/stores/app.store'
import type { UIPreferences } from '@/src/domain/entities'

const settingsUseCase = new SettingsUseCase()

export const useSettings = () => {
  const {
    // Theme
    currentTheme$,
    effectiveTheme$,
    setTheme,

    // Locale
    locale,
    setLocale,
    getSupportedLocales,

    // User preferences
    currentUserPreferences$,
    appState$,
    userPreferences$,
  } = useAppState()

  // Appearance settings
  const getCurrentTheme = useCallback((): ThemeMode => {
    return currentTheme$.get()
  }, [currentTheme$])

  const getEffectiveTheme = useCallback((): 'light' | 'dark' => {
    return effectiveTheme$.get()
  }, [effectiveTheme$])

  // Display settings
  const getCurrentLocale = useCallback((): SupportedLocale => {
    return locale()
  }, [locale])

  const getUIPreferences = useCallback((): UIPreferences | undefined => {
    return currentUserPreferences$.get()?.ui
  }, [currentUserPreferences$])

  const setThemeMode = useCallback(
    (theme: ThemeMode) => {
      setTheme(theme)
    },
    [setTheme]
  )

  const setAppLanguage = useCallback(
    (language: SupportedLocale) => {
      setLocale(language)
    },
    [setLocale]
  )

  const setGridViewMode = useCallback(
    (mode: 'compact' | 'comfortable' | 'cozy') => {
      const activeId = appState$.activeUserId.peek()
      const currentPrefs = userPreferences$[activeId].peek()
      if (currentPrefs) {
        userPreferences$[activeId].set({
          ...currentPrefs,
          ui: { ...currentPrefs.ui, gridViewMode: mode },
          updatedAt: Date.now(),
        })
      }
    },
    [appState$, userPreferences$]
  )

  const setAutoplayTrailers = useCallback(
    (autoplay: boolean) => {
      const activeId = appState$.activeUserId.peek()
      const currentPrefs = userPreferences$[activeId].peek()
      if (currentPrefs) {
        userPreferences$[activeId].set({
          ...currentPrefs,
          ui: { ...currentPrefs.ui, autoplayTrailers: autoplay },
          updatedAt: Date.now(),
        })
      }
    },
    [appState$, userPreferences$]
  )

  // Cache management
  const getCacheInfo = useCallback(async (): Promise<CacheInfo> => {
    return settingsUseCase.getCacheInfo()
  }, [])

  const clearCache = useCallback(async (): Promise<void> => {
    return settingsUseCase.clearCache()
  }, [])

  // App info
  const getAppInfo = useCallback(async (): Promise<AppInfo> => {
    return settingsUseCase.getAppInfo()
  }, [])

  return {
    // Theme management
    currentTheme$,
    effectiveTheme$,
    getCurrentTheme,
    getEffectiveTheme,
    setThemeMode,

    // Locale management
    getCurrentLocale,
    setAppLanguage,
    getSupportedLocales,

    // UI preferences
    currentUserPreferences$,
    getUIPreferences,
    setGridViewMode,
    setAutoplayTrailers,

    // Cache & app info
    getCacheInfo,
    clearCache,
    getAppInfo,
  }
}
