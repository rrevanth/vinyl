/**
 * Environment service interface for accessing environment variables
 *
 * Provides abstraction for environment variable access with type safety
 * and fallback defaults. All EXPO_PUBLIC_ variables are accessible.
 */
export interface IEnvironmentService {
  /**
   * Get environment variable with optional default
   * @param key Variable key (without EXPO_PUBLIC_ prefix)
   * @param defaultValue Default value if variable not found
   */
  get<T = string>(key: string, defaultValue?: T): T

  /**
   * Get required environment variable (throws if not found)
   * @param key Variable key (without EXPO_PUBLIC_ prefix)
   */
  getRequired(key: string): string

  /**
   * Get TMDB API key from environment or default
   */
  getTMDBApiKey(): string

  /**
   * Get TMDB base URL from environment or default
   */
  getTMDBBaseURL(): string

  /**
   * Get TMDB image base URL from environment or default
   */
  getTMDBImageBaseURL(): string

  /**
   * Get TMDB default language from environment or default
   */
  getTMDBLanguage(): string

  /**
   * Get TMDB default region from environment or default
   */
  getTMDBRegion(): string

  /**
   * Get Trakt client ID from environment
   */
  getTraktClientId(): string

  /**
   * Get Trakt client secret from environment
   */
  getTraktClientSecret(): string

  /**
   * Check if running in development mode
   */
  isDevelopment(): boolean

  /**
   * Check if running in production mode
   */
  isProduction(): boolean

  /**
   * Clear environment variable cache (for testing)
   */
  clearCache(): void
}
