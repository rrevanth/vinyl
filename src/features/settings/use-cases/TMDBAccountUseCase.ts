import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TMDBConfig } from '@/src/domain/entities/UserPreferences'
import type { TMDBClient } from '@/src/infrastructure/api/tmdb/TMDBClient'
import type { IEnvironmentService } from '@/src/domain/services/IEnvironmentService'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { DomainError } from '@/src/domain/errors'
import { TMDBConfigFactory } from '@/src/infrastructure/factories/TMDBConfigFactory'
import { TMDBClient as TMDBClientClass } from '@/src/infrastructure/api/tmdb/TMDBClient'

/**
 * Result of TMDB configuration validation
 */
export interface ValidationResult {
  success: boolean
  error?: string
  validatedConfig?: {
    apiKey: string
    baseURL: string
    imageBaseURL: string
    language: string
    region: string
  }
}

/**
 * TMDB Account Management Use Case
 *
 * Handles TMDB settings configuration and validation following CLEAN architecture.
 *
 * Features:
 * - Update TMDB configuration settings (API key, URLs, language, region)
 * - Validate connection to TMDB API
 * - Get current TMDB configuration
 * - All updates use Legend State observables for reactivity
 */
export class TMDBAccountUseCase {
  constructor(
    private readonly tmdbClient: TMDBClient,
    private readonly logger: ILoggingService,
    private readonly envService: IEnvironmentService
  ) {}

  /**
   * Update TMDB API key
   * Immediately updates the observable, triggering reactive clients to reload
   */
  updateApiKey(apiKey: string): void {
    try {
      this.logger.info('Updating TMDB API key', { hasKey: Boolean(apiKey) })
      userPreferences$.tmdb.apiKey.set(apiKey)
      this.logger.info('TMDB API key updated successfully')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to update TMDB API key', err)
      throw err
    }
  }

  /**
   * Update TMDB base URL
   */
  updateBaseURL(baseURL: string): void {
    try {
      this.logger.info('Updating TMDB base URL', { baseURL })
      userPreferences$.tmdb.baseURL.set(baseURL)
      this.logger.info('TMDB base URL updated successfully')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to update TMDB base URL', err)
      throw err
    }
  }

  /**
   * Update TMDB image base URL
   */
  updateImageBaseURL(imageBaseURL: string): void {
    try {
      this.logger.info('Updating TMDB image base URL', { imageBaseURL })
      userPreferences$.tmdb.imageBaseURL.set(imageBaseURL)
      this.logger.info('TMDB image base URL updated successfully')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to update TMDB image base URL', err)
      throw err
    }
  }

  /**
   * Update TMDB language preference
   */
  updateLanguage(language: string): void {
    try {
      this.logger.info('Updating TMDB language', { language })
      userPreferences$.tmdb.language.set(language)
      this.logger.info('TMDB language updated successfully')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to update TMDB language', err)
      throw err
    }
  }

  /**
   * Update TMDB region preference
   */
  updateRegion(region: string): void {
    try {
      this.logger.info('Updating TMDB region', { region })
      userPreferences$.tmdb.region.set(region)
      this.logger.info('TMDB region updated successfully')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to update TMDB region', err)
      throw err
    }
  }

  /**
   * Validate TMDB connection by testing API access
   * Returns true if configuration is valid and API is accessible
   */
  async validateConnection(): Promise<{
    success: boolean
    error?: string
    config?: {
      source: string
      hasApiKey: boolean
      language: string
      region: string
    }
  }> {
    try {
      this.logger.info('Validating TMDB connection')
      const result = await this.tmdbClient.testConnection()

      if (result.success) {
        this.logger.info('TMDB connection validated successfully', result.config)
      } else {
        this.logger.warn('TMDB connection validation failed', {
          error: result.error,
          config: result.config,
        })
      }

      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to validate TMDB connection', err)
      throw new DomainError(`TMDB connection validation failed: ${err.message}`)
    }
  }

  /**
   * Check if TMDB client is properly configured with API key
   */
  isConfigured(): boolean {
    return this.tmdbClient.isConfigured()
  }

  /**
   * Get current configuration source (user, env, or default)
   */
  getConfigurationSource(): 'user' | 'env' | 'default' {
    return this.tmdbClient.getConfigurationSource()
  }

  /**
   * Get current TMDB configuration details
   */
  getCurrentConfig() {
    return this.tmdbClient.getCurrentConfig()
  }

  /**
   * Get current TMDB configuration from user preferences
   */
  getTMDBConfig(): TMDBConfig {
    return userPreferences$.tmdb.get()
  }

  /**
   * Validate and save custom TMDB configuration
   *
   * This method creates a temporary TMDB client with the provided configuration,
   * validates it by testing the connection to TMDB API, and only saves the
   * configuration to Legend State if validation succeeds.
   *
   * @param config Partial TMDB configuration to validate and save
   * @returns ValidationResult with success status, error message if failed, or validated config if succeeded
   */
  async validateAndSave(config: Partial<TMDBConfig>): Promise<ValidationResult> {
    try {
      this.logger.info('Validating custom TMDB configuration', {
        hasApiKey: Boolean(config.apiKey),
        hasBaseURL: Boolean(config.baseURL),
        hasImageBaseURL: Boolean(config.imageBaseURL),
      })

      // Get current configuration as fallback for missing values
      const currentConfig = userPreferences$.tmdb.get()

      // Merge provided config with current config
      const tempConfig: TMDBConfig = {
        apiKey: config.apiKey ?? currentConfig.apiKey,
        baseURL: config.baseURL ?? currentConfig.baseURL,
        imageBaseURL: config.imageBaseURL ?? currentConfig.imageBaseURL,
        language: config.language ?? currentConfig.language,
        region: config.region ?? currentConfig.region,
      }

      // Validate that required fields are present
      if (!tempConfig.apiKey) {
        return {
          success: false,
          error: 'API key is required',
        }
      }

      if (!tempConfig.baseURL) {
        return {
          success: false,
          error: 'Base URL is required',
        }
      }

      if (!tempConfig.imageBaseURL) {
        return {
          success: false,
          error: 'Image base URL is required',
        }
      }

      // Create temporary factory and client for validation
      const tempFactory = new TMDBConfigFactory(this.envService)
      const tempClient = new TMDBClientClass(tempFactory, this.logger)

      // Temporarily set the config in user preferences for factory to pick up
      // We'll restore it if validation fails
      const originalConfig = { ...currentConfig }
      userPreferences$.tmdb.set(tempConfig)

      try {
        // Test connection with temporary configuration
        const testResult = await tempClient.testConnection()

        // Clean up temporary client
        tempClient.destroy()

        if (!testResult.success) {
          // Restore original configuration on validation failure
          userPreferences$.tmdb.set(originalConfig)

          this.logger.warn('TMDB configuration validation failed', {
            error: testResult.error,
          })

          return {
            success: false,
            error: testResult.error ?? 'Connection test failed',
          }
        }

        // Validation succeeded - config is already saved in Legend State
        this.logger.info('TMDB configuration validated and saved successfully', {
          source: testResult.config.source,
        })

        return {
          success: true,
          validatedConfig: {
            apiKey: tempConfig.apiKey,
            baseURL: tempConfig.baseURL,
            imageBaseURL: tempConfig.imageBaseURL,
            language: tempConfig.language,
            region: tempConfig.region,
          },
        }
      } catch (testError) {
        // Restore original configuration on error
        userPreferences$.tmdb.set(originalConfig)

        // Clean up temporary client
        tempClient.destroy()

        const err = testError instanceof Error ? testError : new Error(String(testError))
        this.logger.error('Error testing TMDB configuration', err)

        return {
          success: false,
          error: err.message,
        }
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to validate and save TMDB configuration', err)

      return {
        success: false,
        error: `Validation failed: ${err.message}`,
      }
    }
  }

  /**
   * Reset TMDB configuration to defaults
   */
  resetToDefaults(): void {
    try {
      this.logger.info('Resetting TMDB configuration to defaults')

      userPreferences$.tmdb.set({
        apiKey: '',
        baseURL: 'https://api.themoviedb.org/3',
        imageBaseURL: 'https://image.tmdb.org/t/p/',
        language: 'en-US',
        region: 'US',
      })

      this.logger.info('TMDB configuration reset successfully')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to reset TMDB configuration', err)
      throw err
    }
  }
}
