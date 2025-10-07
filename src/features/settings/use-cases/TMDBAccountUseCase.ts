import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TMDBAccount } from '@/src/domain/entities/UserPreferences'
import type { TMDBClient } from '@/src/infrastructure/api/tmdb/TMDBClient'
import type { IEnvironmentService } from '@/src/domain/services/IEnvironmentService'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
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
      userPreferences$.accounts.tmdb.apiKey.set(apiKey)
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
      userPreferences$.accounts.tmdb.baseURL.set(baseURL)
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
      userPreferences$.accounts.tmdb.imageBaseURL.set(imageBaseURL)
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
      userPreferences$.accounts.tmdb.language.set(language)
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
      userPreferences$.accounts.tmdb.region.set(region)
      this.logger.info('TMDB region updated successfully')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to update TMDB region', err)
      throw err
    }
  }

  /**
   * Validate TMDB connection by testing API access with effective config
   * Uses priority: Custom values > Environment values > Defaults
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
      this.logger.info('Validating TMDB connection with effective config')
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
      return {
        success: false,
        error: err.message,
      }
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
  getTMDBConfig(): TMDBAccount {
    return userPreferences$.accounts.tmdb.get()!
  }

  /**
   * Validate and save TMDB configuration
   * Only validates if user has provided custom values
   * Otherwise, just saves the configuration (will use env/defaults)
   *
   * @param config Partial TMDB configuration to validate and save
   * @returns ValidationResult with success status
   */
  async validateAndSave(config: Partial<TMDBAccount>): Promise<ValidationResult> {
    try {
      this.logger.info('Validating TMDB configuration', {
        hasCustomApiKey: Boolean(config.apiKey),
        hasCustomBaseURL: Boolean(config.baseURL),
        hasCustomImageBaseURL: Boolean(config.imageBaseURL),
      })

      // Get current configuration
      const currentConfig = userPreferences$.accounts.tmdb.get()!

      // Merge provided config with current config
      const newConfig: TMDBAccount = {
        apiKey: config.apiKey !== undefined ? config.apiKey : currentConfig.apiKey,
        baseURL: config.baseURL ?? currentConfig.baseURL,
        imageBaseURL: config.imageBaseURL ?? currentConfig.imageBaseURL,
        language: config.language ?? currentConfig.language,
        region: config.region ?? currentConfig.region,
      }

      // Check if user has entered any custom values
      const hasCustomValues =
        Boolean(config.apiKey) ||
        (config.baseURL && config.baseURL !== 'https://api.themoviedb.org/3') ||
        (config.imageBaseURL && config.imageBaseURL !== 'https://image.tmdb.org/t/p/')

      // If no custom values, just save and return success (will use env/defaults)
      if (!hasCustomValues) {
        userPreferences$.accounts.tmdb.set(newConfig)
        this.logger.info('TMDB configuration saved (using env/defaults)')
        return {
          success: true,
          validatedConfig: newConfig,
        }
      }

      // Validate custom configuration
      const originalConfig = { ...currentConfig }
      userPreferences$.accounts.tmdb.set(newConfig)

      try {
        // Create temporary client to test the custom configuration
        const tempFactory = new TMDBConfigFactory(this.envService)
        const tempClient = new TMDBClientClass(tempFactory, this.logger)

        // Test connection
        const testResult = await tempClient.testConnection()

        // Clean up
        tempClient.destroy()

        if (!testResult.success) {
          // Restore original configuration on failure
          userPreferences$.accounts.tmdb.set(originalConfig)

          this.logger.warn('TMDB custom configuration validation failed', {
            error: testResult.error,
          })

          return {
            success: false,
            error: testResult.error ?? 'Connection test failed',
          }
        }

        // Validation succeeded
        this.logger.info('TMDB custom configuration validated and saved successfully')

        return {
          success: true,
          validatedConfig: newConfig,
        }
      } catch (testError) {
        // Restore original configuration on error
        userPreferences$.accounts.tmdb.set(originalConfig)

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

      userPreferences$.accounts.tmdb.set({
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
