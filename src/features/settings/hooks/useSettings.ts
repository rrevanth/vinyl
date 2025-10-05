import { useCallback } from 'react'
import { useAppState } from '@/src/presentation/shared/hooks/useAppState'
import { SettingsUseCase, CacheInfo, AppInfo } from '../use-cases/SettingsUseCase'
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

  const getUIPreferences = useCallback((): UIPreferences => {
    return userPreferences$.ui.get()
  }, [userPreferences$])

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

  const setContentLanguage = useCallback(
    (language: string) => {
      userPreferences$.ui.contentLanguage.set(language)
    },
    [userPreferences$]
  )

  const setGridViewMode = useCallback(
    (mode: 'compact' | 'comfortable' | 'cozy') => {
      userPreferences$.ui.gridViewMode.set(mode)
    },
    [userPreferences$]
  )

  const setShowAdultContent = useCallback(
    (show: boolean) => {
      userPreferences$.ui.showAdultContent.set(show)
    },
    [userPreferences$]
  )

  const setAutoplayTrailers = useCallback(
    (autoplay: boolean) => {
      userPreferences$.ui.autoplayTrailers.set(autoplay)
    },
    [userPreferences$]
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
    userPreferences$,
    getUIPreferences,
    setContentLanguage,
    setGridViewMode,
    setShowAdultContent,
    setAutoplayTrailers,

    // Cache & app info
    getCacheInfo,
    clearCache,
    getAppInfo,
  }
}
