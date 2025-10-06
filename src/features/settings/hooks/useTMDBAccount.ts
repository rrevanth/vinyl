import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from '@legendapp/state/react'
import { currentUserPreferences$, userPreferences$, appState$ } from '@/src/presentation/shared/stores/app.store'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { TMDBAccountUseCase } from '@/src/domain/use-cases/TMDBAccountUseCase'
import type { TMDBConfig } from '@/src/domain/entities/UserPreferences'

/**
 * Hook for TMDB account management
 *
 * Provides reactive access to TMDB configuration and setter functions.
 * All changes are immediately reflected in the UI through Legend State observables.
 *
 * Usage:
 * ```tsx
 * const { config, setApiKey, validateConnection, isConfigured } = useTMDBAccount()
 *
 * // Update API key
 * await setApiKey('your-tmdb-api-key')
 *
 * // Validate connection
 * const result = await validateConnection()
 * if (result.success) {
 *   // Connection is valid
 * }
 * ```
 */
export const useTMDBAccount = () => {
  // Get services from DI container
  const tmdbUseCase = useService<TMDBAccountUseCase>(TOKENS.TMDBAccountUseCase)

  // Reactive TMDB config from Legend State (read from current user's preferences)
  const config = useSelector(() => currentUserPreferences$.get()?.tmdb)

  // Mutation for validateAndSave (async operation)
  const validateAndSaveMutation = useMutation({
    mutationFn: async (partialConfig: Partial<TMDBConfig>) => {
      return tmdbUseCase.validateAndSave(partialConfig, config!)
    },
    onSuccess: (result) => {
      if (result.success && result.updatedConfig) {
        const activeId = appState$.activeUserId.peek()
        const currentPrefs = userPreferences$[activeId].peek()
        if (currentPrefs) {
          userPreferences$[activeId].set({
            ...currentPrefs,
            tmdb: result.updatedConfig,
            updatedAt: Date.now(),
          })
        }
      }
    },
  })

  // Setter functions - now update store with returned config
  const setApiKey = useCallback(
    (apiKey: string) => {
      const updatedConfig = tmdbUseCase.updateApiKey(apiKey, config!)
      const activeId = appState$.activeUserId.peek()
      const currentPrefs = userPreferences$[activeId].peek()
      if (currentPrefs) {
        userPreferences$[activeId].set({
          ...currentPrefs,
          tmdb: updatedConfig,
          updatedAt: Date.now(),
        })
      }
    },
    [tmdbUseCase, config]
  )

  const setBaseURL = useCallback(
    (baseURL: string) => {
      const updatedConfig = tmdbUseCase.updateBaseURL(baseURL, config!)
      const activeId = appState$.activeUserId.peek()
      const currentPrefs = userPreferences$[activeId].peek()
      if (currentPrefs) {
        userPreferences$[activeId].set({
          ...currentPrefs,
          tmdb: updatedConfig,
          updatedAt: Date.now(),
        })
      }
    },
    [tmdbUseCase, config]
  )

  const setImageBaseURL = useCallback(
    (imageBaseURL: string) => {
      const updatedConfig = tmdbUseCase.updateImageBaseURL(imageBaseURL, config!)
      const activeId = appState$.activeUserId.peek()
      const currentPrefs = userPreferences$[activeId].peek()
      if (currentPrefs) {
        userPreferences$[activeId].set({
          ...currentPrefs,
          tmdb: updatedConfig,
          updatedAt: Date.now(),
        })
      }
    },
    [tmdbUseCase, config]
  )

  const setLanguage = useCallback(
    (language: string) => {
      const updatedConfig = tmdbUseCase.updateLanguage(language, config!)
      const activeId = appState$.activeUserId.peek()
      const currentPrefs = userPreferences$[activeId].peek()
      if (currentPrefs) {
        userPreferences$[activeId].set({
          ...currentPrefs,
          tmdb: updatedConfig,
          updatedAt: Date.now(),
        })
      }
    },
    [tmdbUseCase, config]
  )

  const setRegion = useCallback(
    (region: string) => {
      const updatedConfig = tmdbUseCase.updateRegion(region, config!)
      const activeId = appState$.activeUserId.peek()
      const currentPrefs = userPreferences$[activeId].peek()
      if (currentPrefs) {
        userPreferences$[activeId].set({
          ...currentPrefs,
          tmdb: updatedConfig,
          updatedAt: Date.now(),
        })
      }
    },
    [tmdbUseCase, config]
  )

  const validateConnection = useCallback(async () => {
    return tmdbUseCase.validateConnection()
  }, [tmdbUseCase])

  const validateAndSave = useCallback(
    async (partialConfig: Partial<TMDBConfig>) => {
      return validateAndSaveMutation.mutateAsync(partialConfig)
    },
    [validateAndSaveMutation]
  )

  const isConfigured = useCallback(() => {
    return tmdbUseCase.isConfigured()
  }, [tmdbUseCase])

  const getConfigurationSource = useCallback(() => {
    return tmdbUseCase.getConfigurationSource()
  }, [tmdbUseCase])

  const resetToDefaults = useCallback(() => {
    const defaultConfig = tmdbUseCase.resetToDefaults()
    const activeId = appState$.activeUserId.peek()
    const currentPrefs = userPreferences$[activeId].peek()
    if (currentPrefs) {
      userPreferences$[activeId].set({
        ...currentPrefs,
        tmdb: defaultConfig,
        updatedAt: Date.now(),
      })
    }
  }, [tmdbUseCase])

  return {
    config,
    setApiKey,
    setBaseURL,
    setImageBaseURL,
    setLanguage,
    setRegion,
    validateConnection,
    validateAndSave,
    isConfigured,
    getConfigurationSource,
    resetToDefaults,
  }
}

/**
 * Hook for getting TMDB config only (read-only)
 * Use this when you only need to read the config without mutation functions
 */
export const useTMDBConfig = (): TMDBConfig | undefined => {
  return currentUserPreferences$.get()?.tmdb
}