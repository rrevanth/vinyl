import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TMDBConfig } from '@/src/domain/entities/UserPreferences'
import type { TMDBClient } from '@/src/infrastructure/api/tmdb/TMDBClient'
import type { IEnvironmentService } from '@/src/domain/services/IEnvironmentService'

/**
 * Result of TMDB configuration validation
 */
export interface ValidationResult {
  success: boolean
  error?: string
  updatedConfig?: TMDBConfig
}

/**
 * TMDB Account Management Use Case
 *
 * Domain layer - No direct store mutations
 * All methods that modify config return updated TMDBConfig objects
 *
 * Features:
 * - Update TMDB configuration settings (API key, URLs, language, region)
 * - Validate connection to TMDB API
 * - Get current TMDB configuration
 */
export class TMDBAccountUseCase {
  constructor(
    private readonly tmdbClient: TMDBClient,
    private readonly logger: ILoggingService,
    private readonly envService: IEnvironmentService
  ) {}

  /**
   * Update TMDB API key
   * Returns updated configuration (presentation layer updates store)
   */
  updateApiKey(apiKey: string, currentConfig: TMDBConfig): TMDBConfig {
    try {
      this.logger.info('Updating TMDB API key', { hasKey: Boolean(apiKey) })
      const updatedConfig: TMDBConfig = {
        ...currentConfig,
        apiKey,
      }
      this.logger.info('TMDB API key updated successfully')
      return updatedConfig
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to update TMDB API key', err)
      throw err
    }
  }

  /**
   * Update TMDB base URL
   * Returns updated configuration (presentation layer updates store)
   */
  updateBaseURL(baseURL: string, currentConfig: TMDBConfig): TMDBConfig {
    try {
      this.logger.info('Updating TMDB base URL', { baseURL })
      const updatedConfig: TMDBConfig = {
        ...currentConfig,
        baseURL,
      }
      this.logger.info('TMDB base URL updated successfully')
      return updatedConfig
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to update TMDB base URL', err)
      throw err
    }
  }

  /**
   * Update TMDB image base URL
   * Returns updated configuration (presentation layer updates store)
   */
  updateImageBaseURL(imageBaseURL: string, currentConfig: TMDBConfig): TMDBConfig {
    try {
      this.logger.info('Updating TMDB image base URL', { imageBaseURL })
      const updatedConfig: TMDBConfig = {
        ...currentConfig,
        imageBaseURL,
      }
      this.logger.info('TMDB image base URL updated successfully')
      return updatedConfig
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to update TMDB image base URL', err)
      throw err
    }
  }

  /**
   * Update TMDB language preference
   * Returns updated configuration (presentation layer updates store)
   */
  updateLanguage(language: string, currentConfig: TMDBConfig): TMDBConfig {
    try {
      this.logger.info('Updating TMDB language', { language })
      const updatedConfig: TMDBConfig = {
        ...currentConfig,
        language,
      }
      this.logger.info('TMDB language updated successfully')
      return updatedConfig
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to update TMDB language', err)
      throw err
    }
  }

  /**
   * Update TMDB region preference
   * Returns updated configuration (presentation layer updates store)
   */
  updateRegion(region: string, currentConfig: TMDBConfig): TMDBConfig {
    try {
      this.logger.info('Updating TMDB region', { region })
      const updatedConfig: TMDBConfig = {
        ...currentConfig,
        region,
      }
      this.logger.info('TMDB region updated successfully')
      return updatedConfig
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
   * Validate custom TMDB configuration by making a direct API request
   * This bypasses the TMDBClient store dependency issue
   *
   * @param config TMDB configuration to validate
   * @returns Validation result
   */
  private async validateCustomConfig(config: TMDBConfig): Promise<{
    success: boolean
    error?: string
  }> {
    try {
      // Merge custom config with defaults for empty values
      // This matches the runtime behavior where empty strings fall back to defaults
      const testConfig = {
        apiKey: config.apiKey || this.envService.getTMDBApiKey(),
        baseURL: config.baseURL || this.envService.getTMDBBaseURL(),
        imageBaseURL: config.imageBaseURL || this.envService.getTMDBImageBaseURL(),
        language: config.language || this.envService.getTMDBLanguage(),
        region: config.region || this.envService.getTMDBRegion(),
      }

      this.logger.info('Testing TMDB configuration with merged values', {
        hasApiKey: Boolean(testConfig.apiKey),
        baseURL: testConfig.baseURL,
        language: testConfig.language,
        region: testConfig.region,
      })

      // Create a minimal HttpClient for testing (not using TMDBClient to avoid store dependency)
      const { HttpClient } = await import('@/src/infrastructure/http/HttpClient')
      const httpClient = new HttpClient(
        testConfig.baseURL,
        () => null, // TMDB doesn't use Bearer auth
        this.logger
      )

      // Make a test request to TMDB configuration endpoint with API key as query param
      await httpClient.get('/configuration', {
        params: {
          api_key: testConfig.apiKey,
        },
      })

      this.logger.info('TMDB configuration test successful')

      return {
        success: true,
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('TMDB configuration test failed', err)

      return {
        success: false,
        error: err.message,
      }
    }
  }

  /**
   * Validate and save TMDB configuration
   * Only validates if user has provided custom values
   * Otherwise, just returns the configuration (will use env/defaults)
   *
   * Returns ValidationResult with updated config (presentation layer updates store)
   *
   * @param config Partial TMDB configuration to validate and save
   * @param currentConfig Current TMDB configuration from preferences
   * @returns ValidationResult with success status and updated config
   */
  async validateAndSave(
    config: Partial<TMDBConfig>,
    currentConfig: TMDBConfig
  ): Promise<ValidationResult> {
    try {
      this.logger.info('Validating TMDB configuration', {
        hasCustomApiKey: Boolean(config.apiKey),
        hasCustomBaseURL: Boolean(config.baseURL),
        hasCustomImageBaseURL: Boolean(config.imageBaseURL),
      })

      // Merge provided config with current config
      const newConfig: TMDBConfig = {
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

      // If no custom values, just return success (will use env/defaults)
      if (!hasCustomValues) {
        this.logger.info('TMDB configuration validated (using env/defaults)')
        return {
          success: true,
          updatedConfig: newConfig,
        }
      }

      // Validate custom configuration using direct API request
      const testResult = await this.validateCustomConfig(newConfig)

      if (!testResult.success) {
        this.logger.warn('TMDB custom configuration validation failed', {
          error: testResult.error,
        })

        return {
          success: false,
          error: testResult.error ?? 'Connection test failed',
        }
      }

      // Validation succeeded
      this.logger.info('TMDB custom configuration validated successfully')

      return {
        success: true,
        updatedConfig: newConfig,
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
   * Returns default configuration (presentation layer updates store)
   */
  resetToDefaults(): TMDBConfig {
    try {
      this.logger.info('Resetting TMDB configuration to defaults')

      const defaultConfig: TMDBConfig = {
        apiKey: '',
        baseURL: 'https://api.themoviedb.org/3',
        imageBaseURL: 'https://image.tmdb.org/t/p/',
        language: 'en-US',
        region: 'US',
      }

      this.logger.info('TMDB configuration reset successfully')
      return defaultConfig
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to reset TMDB configuration', err)
      throw err
    }
  }
}
