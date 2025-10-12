import type { ILoggingService } from '../../../domain/services/ILoggingService'
import type { TMDBConfigFactory } from '../../factories/TMDBConfigFactory'
import type { RequestQueueService } from '../../services/RequestQueueService'
import type { TMDBAPICache } from '../../cache/TMDBAPICache'
import { TMDBBaseClient } from './TMDBBaseClient'
import { TMDBMovieClient } from './clients/TMDBMovieClient'
import { TMDBTVClient } from './clients/TMDBTVClient'
import { TMDBSearchClient } from './clients/TMDBSearchClient'
import { TMDBPersonClient } from './clients/TMDBPersonClient'
import { TMDBDiscoverClient } from './clients/TMDBDiscoverClient'
import { TMDBConfigurationClient } from './clients/TMDBConfigurationClient'
import { TMDBImageClient } from './clients/TMDBImageClient'

/**
 * Unified TMDB API client
 *
 * Provides access to all TMDB functionality through specialized client properties.
 * This is the main entry point for all TMDB API interactions in the application.
 *
 * Features:
 * - Composition of all specialized TMDB clients
 * - Shared configuration and reactive updates
 * - Single point of access for providers and UI components
 * - Unified error handling and retry logic
 * - Image URL generation utilities
 */
export class TMDBClient {
  // Specialized client properties for logical grouping
  readonly movies: TMDBMovieClient
  readonly tv: TMDBTVClient
  readonly search: TMDBSearchClient
  readonly people: TMDBPersonClient
  readonly discover: TMDBDiscoverClient
  readonly configuration: TMDBConfigurationClient
  readonly images: TMDBImageClient

  // Direct access to base client for advanced usage
  readonly base: TMDBBaseClient

  constructor(
    configFactory: TMDBConfigFactory,
    logger: ILoggingService,
    queueService: RequestQueueService
  ) {
    // Initialize base client with shared configuration
    this.base = new TMDBBaseClient(configFactory, logger, queueService)

    // Initialize all specialized clients
    // Each client inherits the reactive configuration from base client
    this.movies = new TMDBMovieClient(configFactory, logger, queueService)
    this.tv = new TMDBTVClient(configFactory, logger, queueService)
    this.search = new TMDBSearchClient(configFactory, logger, queueService)
    this.people = new TMDBPersonClient(configFactory, logger, queueService)
    this.discover = new TMDBDiscoverClient(configFactory, logger, queueService)
    this.configuration = new TMDBConfigurationClient(configFactory, logger, queueService)
    this.images = new TMDBImageClient(configFactory, logger, queueService)
  }

  /**
   * Get current effective TMDB configuration
   * Useful for debugging and logging
   */
  getCurrentConfig() {
    return this.base.getCurrentConfig()
  }

  /**
   * Set the API cache for all TMDB clients
   * Used to break circular dependency between TMDBClient and TMDBAPICache
   */
  setCache(cache: TMDBAPICache): void {
    this.base.setCache(cache)
    this.movies.setCache(cache)
    this.tv.setCache(cache)
    this.search.setCache(cache)
    this.people.setCache(cache)
    this.discover.setCache(cache)
    this.configuration.setCache(cache)
    this.images.setCache(cache)
  }

  /**
   * Clean up all clients and remove configuration watchers
   *
   * This method should be called when the client is no longer needed to prevent memory leaks.
   * It cleans up all reactive subscriptions and specialized client instances.
   *
   * Usage:
   * ```typescript
   * const tmdb = container.resolve<TMDBClient>(TOKENS.TMDBClient)
   * // ... use client
   * tmdb.destroy() // Clean up when done
   * ```
   */
  destroy(): void {
    this.base.destroy()
    this.movies.destroy()
    this.tv.destroy()
    this.search.destroy()
    this.people.destroy()
    this.discover.destroy()
    this.configuration.destroy()
    this.images.destroy()
  }

  /**
   * Check if TMDB client is properly configured
   */
  isConfigured(): boolean {
    const config = this.getCurrentConfig()
    return Boolean(
      config.effectiveApiKey && config.effectiveBaseURL && config.effectiveImageBaseURL
    )
  }

  /**
   * Get configuration source for debugging
   */
  getConfigurationSource(): 'user' | 'env' | 'default' {
    return this.getCurrentConfig().configSource
  }

  /**
   * Test TMDB connection and configuration
   */
  async testConnection(): Promise<{
    success: boolean
    error?: string
    config: {
      source: string
      hasApiKey: boolean
      language: string
      region: string
    }
  }> {
    try {
      // Try to fetch TMDB configuration as a simple test
      await this.configuration.getAPIConfiguration()

      const config = this.getCurrentConfig()
      return {
        success: true,
        config: {
          source: config.configSource,
          hasApiKey: Boolean(config.effectiveApiKey),
          language: config.effectiveLanguage,
          region: config.effectiveRegion,
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        config: {
          source: this.getCurrentConfig().configSource,
          hasApiKey: Boolean(this.getCurrentConfig().effectiveApiKey),
          language: this.getCurrentConfig().effectiveLanguage,
          region: this.getCurrentConfig().effectiveRegion,
        },
      }
    }
  }
}
