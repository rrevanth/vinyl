import { useCallback, useMemo } from 'react'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { TMDBAccountUseCase } from '../use-cases/TMDBAccountUseCase'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { TMDBClient } from '@/src/infrastructure/api/tmdb/TMDBClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IEnvironmentService } from '@/src/domain/services/IEnvironmentService'
import type { TMDBAccount } from '@/src/domain/entities/UserPreferences'

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
  const tmdbClient = useService<TMDBClient>(TOKENS.TMDBClient)
  const logger = useService<ILoggingService>(TOKENS.LoggingService)
  const environment = useService<IEnvironmentService>(TOKENS.EnvironmentService)

  // Create use case instance
  const tmdbUseCase = useMemo(
    () => new TMDBAccountUseCase(tmdbClient, logger, environment),
    [tmdbClient, logger, environment]
  )

  // Reactive TMDB config from Legend State
  const config = userPreferences$.accounts.tmdb.get()!

  // Setter functions
  const setApiKey = useCallback(
    (apiKey: string) => {
      tmdbUseCase.updateApiKey(apiKey)
    },
    [tmdbUseCase]
  )

  const setBaseURL = useCallback(
    (baseURL: string) => {
      tmdbUseCase.updateBaseURL(baseURL)
    },
    [tmdbUseCase]
  )

  const setImageBaseURL = useCallback(
    (imageBaseURL: string) => {
      tmdbUseCase.updateImageBaseURL(imageBaseURL)
    },
    [tmdbUseCase]
  )

  const setLanguage = useCallback(
    (language: string) => {
      tmdbUseCase.updateLanguage(language)
    },
    [tmdbUseCase]
  )

  const setRegion = useCallback(
    (region: string) => {
      tmdbUseCase.updateRegion(region)
    },
    [tmdbUseCase]
  )

  const validateConnection = useCallback(async () => {
    return tmdbUseCase.validateConnection()
  }, [tmdbUseCase])

  const validateAndSave = useCallback(async (config: Partial<TMDBAccount>) => {
    return tmdbUseCase.validateAndSave(config)
  }, [tmdbUseCase])

  const isConfigured = useCallback(() => {
    return tmdbUseCase.isConfigured()
  }, [tmdbUseCase])

  const getConfigurationSource = useCallback(() => {
    return tmdbUseCase.getConfigurationSource()
  }, [tmdbUseCase])

  const resetToDefaults = useCallback(() => {
    tmdbUseCase.resetToDefaults()
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
export const useTMDBConfig = (): TMDBAccount => {
  return userPreferences$.accounts.tmdb.get()!
}
