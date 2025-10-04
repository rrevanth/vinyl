import type { IEnvironmentService } from '../../domain/services/IEnvironmentService'
import type { TMDBConfig } from '../../domain/entities/UserPreferences'

/**
 * Effective TMDB configuration with resolved values
 * Extends base TMDBConfig with metadata about configuration source
 */
export interface EffectiveTMDBConfig extends TMDBConfig {
  readonly effectiveApiKey: string
  readonly effectiveBaseURL: string
  readonly effectiveImageBaseURL: string
  readonly effectiveLanguage: string
  readonly effectiveRegion: string
  readonly configSource: 'user' | 'env' | 'default'
}

/**
 * Factory for creating effective TMDB configuration
 *
 * Implements configuration hierarchy: User Preferences > Environment Variables > Defaults
 * Provides fallback configuration to ensure TMDB client always has valid settings.
 */
export class TMDBConfigFactory {
  constructor(private readonly envService: IEnvironmentService) {}

  /**
   * Create effective TMDB configuration from user preferences
   *
   * Configuration priority:
   * 1. User Preferences (if configured in UserPreferences)
   * 2. Environment Variables (EXPO_PUBLIC_TMDB_*)
   * 3. Default Values (hardcoded fallbacks)
   *
   * @param userConfig Optional user preferences configuration
   * @returns Complete TMDB configuration with all required values
   */
  createEffectiveConfig(userConfig?: TMDBConfig): EffectiveTMDBConfig {
    // Resolve each configuration value with priority hierarchy
    const effectiveApiKey = this.resolveApiKey(userConfig?.apiKey)
    const effectiveBaseURL = this.resolveBaseURL(userConfig?.baseURL)
    const effectiveImageBaseURL = this.resolveImageBaseURL(userConfig?.imageBaseURL)
    const effectiveLanguage = this.resolveLanguage(userConfig?.language)
    const effectiveRegion = this.resolveRegion(userConfig?.region)

    // Determine primary configuration source
    const configSource = this.determineConfigSource(userConfig)

    return {
      // Original TMDBConfig interface for backward compatibility
      apiKey: effectiveApiKey,
      baseURL: effectiveBaseURL,
      imageBaseURL: effectiveImageBaseURL,
      language: effectiveLanguage,
      region: effectiveRegion,

      // Extended interface with metadata
      effectiveApiKey,
      effectiveBaseURL,
      effectiveImageBaseURL,
      effectiveLanguage,
      effectiveRegion,
      configSource,
    }
  }

  /**
   * Resolve API key with fallback hierarchy
   */
  private resolveApiKey(userApiKey?: string): string {
    return userApiKey || this.envService.getTMDBApiKey()
  }

  /**
   * Resolve base URL with fallback hierarchy
   */
  private resolveBaseURL(userBaseURL?: string): string {
    return userBaseURL || this.envService.getTMDBBaseURL()
  }

  /**
   * Resolve image base URL with fallback hierarchy
   */
  private resolveImageBaseURL(userImageBaseURL?: string): string {
    return userImageBaseURL || this.envService.getTMDBImageBaseURL()
  }

  /**
   * Resolve language with fallback hierarchy
   */
  private resolveLanguage(userLanguage?: string): string {
    return userLanguage || this.envService.getTMDBLanguage()
  }

  /**
   * Resolve region with fallback hierarchy
   */
  private resolveRegion(userRegion?: string): string {
    return userRegion || this.envService.getTMDBRegion()
  }

  /**
   * Determine the primary configuration source for debugging
   */
  private determineConfigSource(userConfig?: TMDBConfig): 'user' | 'env' | 'default' {
    // Check if user has provided any configuration
    if (userConfig?.apiKey) {
      return 'user'
    }

    // Check if environment variables are set (beyond defaults)
    if (this.envService.get('TMDB_API_KEY') !== this.envService.getTMDBApiKey()) {
      return 'env'
    }

    return 'default'
  }

  /**
   * Validate that the effective configuration is complete and valid
   */
  validateConfig(config: EffectiveTMDBConfig): void {
    if (!config.effectiveApiKey) {
      throw new Error('TMDB API key is required')
    }

    if (!config.effectiveBaseURL) {
      throw new Error('TMDB base URL is required')
    }

    if (!config.effectiveImageBaseURL) {
      throw new Error('TMDB image base URL is required')
    }

    if (!config.effectiveLanguage) {
      throw new Error('TMDB language is required')
    }

    if (!config.effectiveRegion) {
      throw new Error('TMDB region is required')
    }
  }
}
