import axios, { AxiosInstance } from 'axios'
import axiosRetry, { exponentialDelay, isNetworkOrIdempotentRequestError } from 'axios-retry'
import type { FanartConfigFactory } from '@/src/infrastructure/factories/FanartConfigFactory'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { RequestQueueService } from '@/src/infrastructure/services/RequestQueueService'
import type { FanartAPICache } from '@/src/infrastructure/cache/FanartAPICache'
import type {
  FanartMovieImages,
  FanartShowImages,
  FanartErrorResponse,
} from './types/FanartTypes'

/**
 * Fanart.tv API Client
 *
 * Provides methods to fetch images from Fanart.tv API for movies and TV shows.
 * Implements automatic retry logic and error handling.
 * Supports cache-first pattern when cache is injected.
 */
export class FanartClient {
  private client: AxiosInstance
  private readonly apiCache?: FanartAPICache

  constructor(
    private readonly configFactory: FanartConfigFactory,
    private readonly logger: ILoggingService,
    private readonly queueService: RequestQueueService
  ) {
    this.client = this.createAxiosInstance()
  }

  /**
   * Inject cache for cache-first pattern
   * This is called after cache initialization to break circular dependency
   */
  setCache(cache: FanartAPICache): void {
    // @ts-expect-error - Setting readonly property to break circular dependency
    this.apiCache = cache
    this.logger.info('Fanart cache injected into client')
  }

  /**
   * Create and configure Axios instance with retry logic
   */
  private createAxiosInstance(): AxiosInstance {
    const config = this.configFactory.createConfig()

    const instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout,
      headers: {
        'Content-Type': 'application/json',
        // API key as header (preferred method)
        'api-key': config.apiKey,
        // Optional client key (personal API key)
        ...(config.clientKey && { 'client-key': config.clientKey }),
      },
    })

    // Setup retry logic for failed requests
    axiosRetry(instance, {
      retries: 3,
      retryDelay: exponentialDelay,
      retryCondition: (error) => {
        // Retry on network errors or 5xx server errors
        return isNetworkOrIdempotentRequestError(error) || error.response?.status === 429
      },
    })

    // Response interceptor for error handling
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.data) {
          const errorData = error.response.data as FanartErrorResponse
          if (errorData.status === 'error') {
            const message = errorData.error_message || errorData['error message'] || 'Unknown error'
            this.logger.error('Fanart.tv API error', new Error(message))
          }
        }
        return Promise.reject(error)
      }
    )

    return instance
  }

  /**
   * Get movie images by TMDB ID or IMDb ID
   * @param id TMDB ID (number) or IMDb ID (string starting with 'tt')
   */
  async getMovieImages(id: string | number): Promise<FanartMovieImages> {
    const cacheKey = ['fanart', 'movie', 'images', String(id)]

    // Cache-first: Try to get from cache immediately
    if (this.apiCache) {
      const cached = await this.apiCache.tryGetFromCache<FanartMovieImages>(cacheKey)
      if (cached) {
        this.logger.debug('Cache HIT - instant return', { method: 'getMovieImages', id })
        return cached
      }
      this.logger.debug('Cache MISS - entering queue', { method: 'getMovieImages', id })
    }

    // Cache miss or no cache: Enter queue and fetch from API
    return this.queueService.enqueue('fanart', async () => {
      try {
        this.logger.debug(`Fetching Fanart.tv movie images for ID: ${id}`)

        const response = await this.client.get<FanartMovieImages>(`/movies/${id}`)

        // Store in cache if available
        if (this.apiCache) {
          await this.apiCache.setInCache(cacheKey, response.data, 'media-details')
        }

        this.logger.debug(`Successfully fetched movie images for: ${response.data.name}`, {
          tmdbId: response.data.tmdb_id,
          imdbId: response.data.imdb_id,
        })

        return response.data
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error))
        this.logger.error(`Failed to fetch movie images for ID: ${id}`, err)
        throw err
      }
    })
  }

  /**
   * Get TV show images by TheTVDB ID
   * @param id TheTVDB ID
   */
  async getShowImages(id: string | number): Promise<FanartShowImages> {
    const cacheKey = ['fanart', 'tv', 'images', String(id)]

    // Cache-first: Try to get from cache immediately
    if (this.apiCache) {
      const cached = await this.apiCache.tryGetFromCache<FanartShowImages>(cacheKey)
      if (cached) {
        this.logger.debug('Cache HIT - instant return', { method: 'getShowImages', id })
        return cached
      }
      this.logger.debug('Cache MISS - entering queue', { method: 'getShowImages', id })
    }

    // Cache miss or no cache: Enter queue and fetch from API
    return this.queueService.enqueue('fanart', async () => {
      try {
        this.logger.debug(`Fetching Fanart.tv TV images for TheTVDB ID: ${id}`)

        const response = await this.client.get<FanartShowImages>(`/tv/${id}`)

        // Store in cache if available
        if (this.apiCache) {
          await this.apiCache.setInCache(cacheKey, response.data, 'media-details')
        }

        this.logger.debug(`Successfully fetched TV images for: ${response.data.name}`, {
          thetvdbId: response.data.thetvdb_id,
        })

        return response.data
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error))
        this.logger.error(`Failed to fetch TV images for TheTVDB ID: ${id}`, err)
        throw err
      }
    })
  }

  /**
   * Get preview URL for an image (smaller version)
   * Replaces 'fanart' with 'preview' in the URL
   *
   * @param originalUrl Original Fanart.tv image URL
   * @returns Preview URL with smaller image
   */
  getPreviewUrl(originalUrl: string): string {
    return originalUrl.replace('/fanart/', '/preview/')
  }

  /**
   * Test connection to Fanart.tv API
   * Attempts to fetch images for a known movie (LOTR: Fellowship - TMDB ID 120)
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    return this.queueService.enqueue('fanart', async () => {
      try {
        // Test with Lord of the Rings: Fellowship of the Ring (TMDB ID: 120)
        // Call the direct client instead of getMovieImages to avoid double-queuing
        await this.client.get(`/movies/120`)

        this.logger.info('Fanart.tv connection test successful')
        return { success: true }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        this.logger.error('Fanart.tv connection test failed', error as Error)

        return {
          success: false,
          error: message,
        }
      }
    })
  }

  /**
   * Update client configuration (useful for reactive updates)
   * @param apiKey New API key
   * @param clientKey New client key (optional)
   */
  updateConfig(apiKey?: string, clientKey?: string): void {
    const config = this.configFactory.createConfig(apiKey, clientKey)
    this.configFactory.validateConfig(config)

    // Update headers
    this.client.defaults.headers['api-key'] = config.apiKey

    if (config.clientKey) {
      this.client.defaults.headers['client-key'] = config.clientKey
    } else {
      delete this.client.defaults.headers['client-key']
    }

    this.logger.info('Fanart.tv client configuration updated')
  }
}
