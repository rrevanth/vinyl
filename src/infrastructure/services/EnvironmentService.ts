import type { IEnvironmentService } from '../../domain/services/IEnvironmentService'
import { InfrastructureError } from '../errors/InfrastructureError'

/**
 * Environment service implementation for Expo/React Native
 *
 * Provides access to EXPO_PUBLIC_ environment variables with caching,
 * type safety, and fallback defaults. Includes TMDB-specific helpers.
 */
export class EnvironmentService implements IEnvironmentService {
  private cache = new Map<string, any>()

  get<T = string>(key: string, defaultValue?: T): T {
    // Check cache first for performance
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }

    // Access EXPO_PUBLIC_ prefixed environment variable
    const envKey = `EXPO_PUBLIC_${key.toUpperCase()}`
    const value = process.env[envKey] || defaultValue

    // Cache the result
    this.cache.set(key, value)
    return value as T
  }

  getRequired(key: string): string {
    const value = this.get(key)
    if (!value) {
      throw new InfrastructureError(
        `Required environment variable not found: EXPO_PUBLIC_${key.toUpperCase()}`
      )
    }
    return value
  }

  getTMDBApiKey(): string {
    return this.get('TMDB_API_KEY', 'e17569e110b6d80155dc2ad0983d8af0')
  }

  getTMDBBaseURL(): string {
    return this.get('TMDB_BASE_URL', 'https://api.themoviedb.org/3')
  }

  getTMDBImageBaseURL(): string {
    return this.get('TMDB_IMAGE_BASE_URL', 'https://image.tmdb.org/t/p/')
  }

  getTMDBLanguage(): string {
    return this.get('TMDB_LANGUAGE', 'en-US')
  }

  getTMDBRegion(): string {
    return this.get('TMDB_REGION', 'US')
  }

  getTraktClientId(): string {
    return this.get('TRAKT_CLIENT_ID', '')
  }

  getTraktClientSecret(): string {
    return this.get('TRAKT_CLIENT_SECRET', '')
  }

  getFanartApiKey(): string {
    return this.get('FANART_API_KEY', '')
  }

  getFanartClientKey(): string {
    return this.get('FANART_CLIENT_KEY', '')
  }

  getFanartBaseURL(): string {
    return this.get('FANART_BASE_URL', 'http://webservice.fanart.tv/v3')
  }

  getMDBListApiKey(): string {
    return this.get('MDBLIST_API_KEY', '')
  }

  getMDBListBaseURL(): string {
    return this.get('MDBLIST_BASE_URL', 'https://api.mdblist.com')
  }

  isDevelopment(): boolean {
    return __DEV__ || process.env.NODE_ENV === 'development'
  }

  isProduction(): boolean {
    return process.env.NODE_ENV === 'production'
  }

  clearCache(): void {
    this.cache.clear()
  }
}
