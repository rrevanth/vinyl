import { HttpClient } from '@/src/infrastructure/http/HttpClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type {
  MDBListConfigFactory,
  EffectiveMDBListConfig,
} from '@/src/infrastructure/factories/MDBListConfigFactory'
import { RequestQueueService } from '@/src/infrastructure/services/RequestQueueService'
import type {
  MDBListLimits,
  MDBListList,
  MDBListItemsResponse,
  MDBListMediaInfo,
  MDBListSearchResponse,
  MDBListRatingsBulkRequest,
  MDBListRatingsBulkResponse,
  MDBListMediaInfoBatchRequest,
  MDBListRatings,
} from './types/MDBListTypes'
import { NotFoundError, UnauthorizedError } from '@/src/domain/errors'
import { NetworkError } from '@/src/infrastructure/errors'
import { mdblistConfig$ } from '@/src/presentation/shared/stores/app.store'
import type { MDBListAPICache } from '@/src/infrastructure/cache/MDBListAPICache'

/**
 * MDBList API client with reactive configuration
 *
 * Features:
 * - Reactive configuration that reloads when user preferences change
 * - API key authentication via query parameter or header
 * - Multi-source ratings aggregation
 * - List management and watchlist functionality
 * - Comprehensive error mapping
 * - Automatic retry logic
 */
export class MDBListClient {
  protected httpClient!: HttpClient
  protected currentConfig!: EffectiveMDBListConfig
  private configSubscription?: () => void
  private static configLoaded = false
  private readonly apiCache?: MDBListAPICache

  constructor(
    private readonly configFactory: MDBListConfigFactory,
    private readonly logger: ILoggingService,
    private readonly queueService: RequestQueueService
  ) {
    // Initialize configuration
    this.reloadConfiguration()

    // Set up reactive configuration watching
    this.setupConfigurationWatcher()
  }

  /**
   * Set API cache (injected after construction to break circular dependency)
   */
  setCache(cache: MDBListAPICache): void {
    // @ts-expect-error - Setting readonly property to break circular dependency
    this.apiCache = cache
    this.logger.info('MDBList cache injected into client')
  }

  /**
   * Reload MDBList configuration from user preferences
   * Called on initialization and when preferences change
   */
  private reloadConfiguration(): void {
    // Get current user preferences for MDBList
    const userConfig = mdblistConfig$.get()

    // Create effective configuration with fallbacks
    this.currentConfig = this.configFactory.createEffectiveConfig(userConfig)

    // Only validate if API key is provided (MDBList is optional)
    if (this.currentConfig.hasValidApiKey) {
      this.configFactory.validateConfig(this.currentConfig)
    }

    // Create new HTTP client with current config
    this.httpClient = new HttpClient(
      this.currentConfig.effectiveBaseURL,
      () => null, // MDBList uses API key, not Bearer auth
      this.logger
    )

    // Set up MDBList-specific request interceptor
    this.setupMDBListAuthentication()

    // Only log on first load to prevent duplicate logs from multiple instances
    if (!MDBListClient.configLoaded) {
      this.logger.info('MDBList Configuration reloaded', {
        source: this.currentConfig.configSource,
        hasApiKey: this.currentConfig.hasValidApiKey,
      })
      MDBListClient.configLoaded = true
    }
  }

  /**
   * Set up watcher for user preference changes
   */
  private setupConfigurationWatcher(): void {
    // Watch for changes in MDBList configuration
    this.configSubscription = mdblistConfig$.onChange(() => {
      this.logger.info('MDBList preferences changed, reloading configuration...')
      this.reloadConfiguration()
    })
  }

  /**
   * Set up MDBList-specific authentication
   * API key can be sent via query parameter or header
   */
  private setupMDBListAuthentication(): void {
    // Get access to the internal axios instance
    const axiosInstance = (this.httpClient as any).client

    // Add MDBList API key to all requests
    axiosInstance.interceptors.request.use((config: any) => {
      if (!this.currentConfig.hasValidApiKey) {
        throw new Error('MDBList API key is required')
      }

      // Add API key to query params (primary method per API docs)
      if (!config.params) {
        config.params = {}
      }
      config.params.apikey = this.currentConfig.effectiveApiKey

      // Also add to headers as fallback
      if (!config.headers) {
        config.headers = {}
      }
      config.headers['api-key'] = this.currentConfig.effectiveApiKey

      return config
    })

    // Add error handling interceptor
    axiosInstance.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (error.response) {
          const status = error.response.status

          // Map HTTP status codes to domain errors
          if (status === 401 || status === 403) {
            throw new UnauthorizedError('Invalid or missing MDBList API key')
          }

          if (status === 404) {
            throw new NotFoundError('MDBList resource not found')
          }

          if (status === 429) {
            throw new Error('MDBList API rate limit exceeded')
          }

          if (status >= 500) {
            throw new NetworkError(
              'MDBList server error',
              error.response.data?.message || error.message
            )
          }
        }

        // Re-throw original error if not handled
        throw error
      }
    )
  }

  /**
   * Get current effective MDBList configuration
   */
  getCurrentConfig(): EffectiveMDBListConfig {
    return this.currentConfig
  }

  /**
   * Clean up configuration watcher
   */
  destroy(): void {
    if (this.configSubscription) {
      this.configSubscription()
      this.configSubscription = undefined
    }
  }

  // ===== USER LIMITS =====

  /**
   * Get user limits and account information
   * GET /user?apikey=xxx
   */
  async getLimits(): Promise<MDBListLimits> {
    const cacheKey = ['mdblist', 'limits']

    if (this.apiCache) {
      const cached = await this.apiCache.tryGetFromCache<MDBListLimits>(cacheKey)
      if (cached) {
        this.logger.debug('Cache HIT - instant return', { method: 'getLimits' })
        return cached
      }
      this.logger.debug('Cache MISS - entering queue', { method: 'getLimits' })
    }

    return this.queueService.enqueue('mdblist', async () => {
      const result = await this.httpClient.get<MDBListLimits>('/user')

      if (this.apiCache) {
        await this.apiCache.setInCache(cacheKey, result, 'catalog-metadata')
      }

      return result
    })
  }

  // ===== LISTS =====

  /**
   * Get current user's lists
   * GET /lists/user?apikey=xxx
   */
  async getUserLists(): Promise<MDBListList[]> {
    const cacheKey = ['mdblist', 'user-lists']

    if (this.apiCache) {
      const cached = await this.apiCache.tryGetFromCache<MDBListList[]>(cacheKey)
      if (cached) {
        this.logger.debug('Cache HIT - instant return', { method: 'getUserLists' })
        return cached
      }
      this.logger.debug('Cache MISS - entering queue', { method: 'getUserLists' })
    }

    return this.queueService.enqueue('mdblist', async () => {
      const result = await this.httpClient.get<MDBListList[]>('/lists/user')

      if (this.apiCache) {
        await this.apiCache.setInCache(cacheKey, result, 'catalog-items')
      }

      return result
    })
  }

  /**
   * Get list items by list ID
   * GET /lists/{listid}/items?apikey=xxx
   */
  async getListItems(
    listId: number,
    options?: {
      limit?: number
      offset?: number
      append_to_response?: string
      filter_genre?: string
      sort?: string
      order?: 'asc' | 'desc'
    }
  ): Promise<MDBListItemsResponse> {
    const cacheKey = ['mdblist', 'list-items', listId, options]

    if (this.apiCache) {
      const cached = await this.apiCache.tryGetFromCache<MDBListItemsResponse>(cacheKey)
      if (cached) {
        this.logger.debug('Cache HIT - instant return', { method: 'getListItems', listId })
        return cached
      }
      this.logger.debug('Cache MISS - entering queue', { method: 'getListItems', listId })
    }

    return this.queueService.enqueue('mdblist', async () => {
      const result = await this.httpClient.get<MDBListItemsResponse>(`/lists/${listId}/items`, {
        params: options,
      })

      if (this.apiCache) {
        await this.apiCache.setInCache(cacheKey, result, 'catalog-items')
      }

      return result
    })
  }

  // ===== MEDIA INFO =====

  /**
   * Get media information by provider and ID
   * GET /{media_provider}/{media_type}/{media_id}?apikey=xxx
   */
  async getMediaInfo(
    provider: 'tmdb' | 'imdb' | 'trakt' | 'tvdb' | 'mal',
    mediaType: 'movie' | 'show' | 'any',
    mediaId: string,
    options?: {
      append_to_response?: string
    }
  ): Promise<MDBListMediaInfo> {
    const cacheKey = ['mdblist', 'media-info', provider, mediaType, mediaId, options]

    if (this.apiCache) {
      const cached = await this.apiCache.tryGetFromCache<MDBListMediaInfo>(cacheKey)
      if (cached) {
        this.logger.debug('Cache HIT - instant return', {
          method: 'getMediaInfo',
          provider,
          mediaType,
          mediaId,
        })
        return cached
      }
      this.logger.debug('Cache MISS - entering queue', {
        method: 'getMediaInfo',
        provider,
        mediaType,
        mediaId,
      })
    }

    return this.queueService.enqueue('mdblist', async () => {
      const result = await this.httpClient.get<MDBListMediaInfo>(
        `/${provider}/${mediaType}/${mediaId}`,
        {
          params: options,
        }
      )

      if (this.apiCache) {
        await this.apiCache.setInCache(cacheKey, result, 'media-details')
      }

      return result
    })
  }

  /**
   * Get media ratings by IMDb ID
   * Uses media info endpoint and extracts ratings
   */
  async getMovieRatings(imdbId: string): Promise<MDBListRatings> {
    const mediaInfo = await this.getMediaInfo('imdb', 'movie', imdbId)
    return this.extractRatingsFromMediaInfo(mediaInfo)
  }

  /**
   * Get show ratings by IMDb ID
   * Uses media info endpoint and extracts ratings
   */
  async getShowRatings(imdbId: string): Promise<MDBListRatings> {
    const mediaInfo = await this.getMediaInfo('imdb', 'show', imdbId)
    return this.extractRatingsFromMediaInfo(mediaInfo)
  }

  /**
   * Extract ratings object from media info response
   */
  private extractRatingsFromMediaInfo(mediaInfo: MDBListMediaInfo): MDBListRatings {
    const ratings: MDBListRatings = {
      score: mediaInfo.score,
      score_average: mediaInfo.score_average,
    }

    // Extract ratings from ratings array
    mediaInfo.ratings?.forEach((rating) => {
      const value = rating.score ?? rating.value
      if (value !== null) {
        switch (rating.source) {
          case 'imdb':
            ratings.imdb = value
            break
          case 'tmdb':
            ratings.tmdb = value
            break
          case 'trakt':
            ratings.trakt = value
            break
          case 'letterboxd':
            ratings.letterboxd = value
            break
          case 'tomatoes':
            ratings.tomatoes = value
            break
          case 'metacritic':
            ratings.metacritic = value
            break
          case 'rogerebert':
            ratings.rogerebert = value
            break
          case 'myanimelist':
            ratings.myanimelist = value
            break
        }
      }
    })

    return ratings
  }

  /**
   * Batch get media info
   * POST /{media_provider}/{media_type}?apikey=xxx
   */
  async getMediaInfoBatch(
    provider: 'tmdb' | 'imdb' | 'trakt' | 'tvdb' | 'mal',
    mediaType: 'movie' | 'show' | 'any',
    request: MDBListMediaInfoBatchRequest
  ): Promise<MDBListMediaInfo[]> {
    const cacheKey = ['mdblist', 'media-info-batch', provider, mediaType, request]

    if (this.apiCache) {
      const cached = await this.apiCache.tryGetFromCache<MDBListMediaInfo[]>(cacheKey)
      if (cached) {
        this.logger.debug('Cache HIT - instant return', {
          method: 'getMediaInfoBatch',
          provider,
          mediaType,
        })
        return cached
      }
      this.logger.debug('Cache MISS - entering queue', {
        method: 'getMediaInfoBatch',
        provider,
        mediaType,
      })
    }

    return this.queueService.enqueue('mdblist', async () => {
      const result = await this.httpClient.post<MDBListMediaInfo[]>(
        `/${provider}/${mediaType}`,
        request
      )

      if (this.apiCache) {
        await this.apiCache.setInCache(cacheKey, result, 'media-details')
      }

      return result
    })
  }

  // ===== SEARCH =====

  /**
   * Search for media
   * GET /search/{media_type}?apikey=xxx&query=xxx
   */
  async search(
    mediaType: 'movie' | 'show' | 'any',
    query: string,
    options?: {
      limit_by_score?: number
      sort_by_score?: boolean
      year?: number
      limit?: number
    }
  ): Promise<MDBListSearchResponse> {
    const cacheKey = ['mdblist', 'search', mediaType, query, options]

    if (this.apiCache) {
      const cached = await this.apiCache.tryGetFromCache<MDBListSearchResponse>(cacheKey)
      if (cached) {
        this.logger.debug('Cache HIT - instant return', { method: 'search', mediaType, query })
        return cached
      }
      this.logger.debug('Cache MISS - entering queue', { method: 'search', mediaType, query })
    }

    return this.queueService.enqueue('mdblist', async () => {
      const result = await this.httpClient.get<MDBListSearchResponse>(`/search/${mediaType}`, {
        params: {
          query,
          ...options,
        },
      })

      if (this.apiCache) {
        await this.apiCache.setInCache(cacheKey, result, 'search')
      }

      return result
    })
  }

  // ===== RATINGS =====

  /**
   * Bulk get ratings
   * POST /rating/{media_type}/{return_rating}?apikey=xxx
   */
  async getRatingsBulk(
    mediaType: 'movie' | 'show',
    returnRating:
      | 'trakt'
      | 'imdb'
      | 'tmdb'
      | 'letterboxd'
      | 'tomatoes'
      | 'audience'
      | 'metacritic'
      | 'rogerebert'
      | 'mal'
      | 'score'
      | 'score_average',
    request: MDBListRatingsBulkRequest
  ): Promise<MDBListRatingsBulkResponse> {
    const cacheKey = ['mdblist', 'ratings-bulk', mediaType, returnRating, request]

    if (this.apiCache) {
      const cached = await this.apiCache.tryGetFromCache<MDBListRatingsBulkResponse>(cacheKey)
      if (cached) {
        this.logger.debug('Cache HIT - instant return', {
          method: 'getRatingsBulk',
          mediaType,
          returnRating,
        })
        return cached
      }
      this.logger.debug('Cache MISS - entering queue', {
        method: 'getRatingsBulk',
        mediaType,
        returnRating,
      })
    }

    return this.queueService.enqueue('mdblist', async () => {
      const result = await this.httpClient.post<MDBListRatingsBulkResponse>(
        `/rating/${mediaType}/${returnRating}`,
        request
      )

      if (this.apiCache) {
        await this.apiCache.setInCache(cacheKey, result, 'media-details')
      }

      return result
    })
  }

  // ===== CONNECTION TEST =====

  /**
   * Test MDBList connection and configuration
   * Uses user limits endpoint as a simple connectivity test
   */
  async testConnection(): Promise<{
    success: boolean
    error?: string
    limits?: MDBListLimits
  }> {
    try {
      const limits = await this.getLimits()

      return {
        success: true,
        limits,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}
