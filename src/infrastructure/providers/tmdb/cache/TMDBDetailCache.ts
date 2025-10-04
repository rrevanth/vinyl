import type { QueryClient } from '@tanstack/react-query'
import type { TMDBClient } from '../../../api/tmdb/TMDBClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import type {
  TMDBMovieResponse,
  TMDBTVResponse,
  TMDBPersonResponse,
  TMDBMovieAppendToResponse,
  TMDBTVAppendToResponse,
  TMDBPersonAppendToResponse,
} from '../../../api/tmdb/types'

/**
 * Multi-level TanStack Query cache for TMDB extended API responses
 *
 * Features:
 * - Provider-level caching with longer TTL (2+ hours)
 * - Coordinates with domain-level cache (shorter TTL)
 * - Single extended API calls fetch all needed data
 * - Background refresh and invalidation
 * - User-controlled cache management
 * - Memory efficient with automatic cleanup
 */
export class TMDBDetailCache {
  // Cache configuration
  private readonly CACHE_TIME = 1000 * 60 * 60 * 2 // 2 hours (provider level)
  private readonly STALE_TIME = 1000 * 60 * 30 // 30 minutes

  // Full append options for maximum data retrieval in single API calls
  private readonly MOVIE_APPEND_OPTIONS: TMDBMovieAppendToResponse[] = [
    'credits',
    'videos',
    'images',
    'reviews',
    'recommendations',
    'similar',
    'keywords',
    'external_ids',
    'translations',
    'release_dates',
    'watch_providers',
  ]

  private readonly TV_APPEND_OPTIONS: TMDBTVAppendToResponse[] = [
    'credits',
    'videos',
    'images',
    'reviews',
    'recommendations',
    'similar',
    'keywords',
    'external_ids',
    'translations',
    'content_ratings',
    'watch_providers',
    'aggregate_credits',
  ]

  private readonly PERSON_APPEND_OPTIONS: TMDBPersonAppendToResponse[] = [
    'movie_credits',
    'tv_credits',
    'combined_credits',
    'external_ids',
    'images',
    'tagged_images',
    'translations',
  ]

  constructor(
    private readonly tmdbClient: TMDBClient,
    private readonly queryClient: QueryClient,
    private readonly logger: ILoggingService
  ) {}

  async initialize(): Promise<void> {
    this.logger.debug('TMDBDetailCache initialized with TanStack Query')
  }

  async shutdown(): Promise<void> {
    // Clear all TMDB-related queries
    await this.queryClient.invalidateQueries({
      queryKey: ['tmdb', 'api'],
    })
    this.logger.debug('TMDBDetailCache shutdown')
  }

  // ===== QUERY KEY FACTORIES (Provider Level) =====
  private getMovieQueryKey(movieId: number): string[] {
    return ['tmdb', 'api', 'movie', 'details', movieId.toString()]
  }

  private getTVQueryKey(tvId: number): string[] {
    return ['tmdb', 'api', 'tv', 'details', tvId.toString()]
  }

  private getPersonQueryKey(personId: number): string[] {
    return ['tmdb', 'api', 'person', 'details', personId.toString()]
  }

  // ===== MOVIE CACHE WITH TANSTACK QUERY =====
  async getOrFetchMovieDetails(movieId: number): Promise<TMDBMovieResponse> {
    const queryKey = this.getMovieQueryKey(movieId)

    return this.queryClient.fetchQuery({
      queryKey,
      queryFn: async (): Promise<TMDBMovieResponse> => {
        this.logger.debug(`Fetching movie ${movieId} with extended data`)

        return this.tmdbClient.movies.getMovieDetails(movieId, this.MOVIE_APPEND_OPTIONS)
      },
      staleTime: this.STALE_TIME,
      gcTime: this.CACHE_TIME, // Updated from cacheTime (deprecated)
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })
  }

  // ===== TV CACHE WITH TANSTACK QUERY =====
  async getOrFetchTVDetails(tvId: number): Promise<TMDBTVResponse> {
    const queryKey = this.getTVQueryKey(tvId)

    return this.queryClient.fetchQuery({
      queryKey,
      queryFn: async (): Promise<TMDBTVResponse> => {
        this.logger.debug(`Fetching TV ${tvId} with extended data`)

        return this.tmdbClient.tv.getTVDetails(tvId, this.TV_APPEND_OPTIONS)
      },
      staleTime: this.STALE_TIME,
      gcTime: this.CACHE_TIME,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })
  }

  // ===== PERSON CACHE WITH TANSTACK QUERY =====
  async getOrFetchPersonDetails(personId: number): Promise<TMDBPersonResponse> {
    const queryKey = this.getPersonQueryKey(personId)

    return this.queryClient.fetchQuery({
      queryKey,
      queryFn: async (): Promise<TMDBPersonResponse> => {
        this.logger.debug(`Fetching person ${personId} with extended data`)

        return this.tmdbClient.people.getPersonDetails(personId, this.PERSON_APPEND_OPTIONS)
      },
      staleTime: this.STALE_TIME,
      gcTime: this.CACHE_TIME,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })
  }

  // ===== CACHE INVALIDATION & MANAGEMENT =====
  async invalidateMovieCache(movieId?: number): Promise<void> {
    if (movieId) {
      await this.queryClient.invalidateQueries({
        queryKey: this.getMovieQueryKey(movieId),
      })
      // Also invalidate related domain-level cache
      await this.queryClient.invalidateQueries({
        queryKey: ['movies', 'detail', movieId.toString()],
      })
    } else {
      await this.queryClient.invalidateQueries({
        queryKey: ['tmdb', 'api', 'movie'],
      })
      await this.queryClient.invalidateQueries({
        queryKey: ['movies'],
      })
    }
    this.logger.debug(`Invalidated movie cache ${movieId ? `for ${movieId}` : '(all)'}`)
  }

  async invalidateTVCache(tvId?: number): Promise<void> {
    if (tvId) {
      await this.queryClient.invalidateQueries({
        queryKey: this.getTVQueryKey(tvId),
      })
      // Also invalidate related domain-level cache
      await this.queryClient.invalidateQueries({
        queryKey: ['tv', 'detail', tvId.toString()],
      })
    } else {
      await this.queryClient.invalidateQueries({
        queryKey: ['tmdb', 'api', 'tv'],
      })
      await this.queryClient.invalidateQueries({
        queryKey: ['tv'],
      })
    }
    this.logger.debug(`Invalidated TV cache ${tvId ? `for ${tvId}` : '(all)'}`)
  }

  async invalidatePersonCache(personId?: number): Promise<void> {
    if (personId) {
      await this.queryClient.invalidateQueries({
        queryKey: this.getPersonQueryKey(personId),
      })
      // Also invalidate related domain-level cache
      await this.queryClient.invalidateQueries({
        queryKey: ['people', 'detail', personId.toString()],
      })
    } else {
      await this.queryClient.invalidateQueries({
        queryKey: ['tmdb', 'api', 'person'],
      })
      await this.queryClient.invalidateQueries({
        queryKey: ['people'],
      })
    }
    this.logger.debug(`Invalidated person cache ${personId ? `for ${personId}` : '(all)'}`)
  }

  async clearAllTMDBCache(): Promise<void> {
    // Clear both provider and domain level caches
    await this.queryClient.invalidateQueries({
      queryKey: ['tmdb', 'api'],
    })
    await this.queryClient.invalidateQueries({
      queryKey: ['movies'],
    })
    await this.queryClient.invalidateQueries({
      queryKey: ['tv'],
    })
    await this.queryClient.invalidateQueries({
      queryKey: ['people'],
    })
    this.logger.info('Cleared all TMDB cache (provider + domain levels)')
  }

  // ===== CACHE STATS FOR USER VISIBILITY =====
  getCacheStats(): {
    movies: number
    tv: number
    people: number
    totalSize: number
  } {
    const cache = this.queryClient.getQueryCache()
    const queries = cache.getAll()

    // Filter for TMDB API queries (provider level)
    const tmdbApiQueries = queries.filter(
      (query) =>
        Array.isArray(query.queryKey) && query.queryKey[0] === 'tmdb' && query.queryKey[1] === 'api'
    )

    const movieQueries = tmdbApiQueries.filter((q) => q.queryKey[2] === 'movie').length
    const tvQueries = tmdbApiQueries.filter((q) => q.queryKey[2] === 'tv').length
    const personQueries = tmdbApiQueries.filter((q) => q.queryKey[2] === 'person').length

    return {
      movies: movieQueries,
      tv: tvQueries,
      people: personQueries,
      totalSize: tmdbApiQueries.length,
    }
  }

  // ===== PREFETCHING FOR PERFORMANCE =====
  async prefetchMovieDetails(movieId: number): Promise<void> {
    const queryKey = this.getMovieQueryKey(movieId)

    await this.queryClient.prefetchQuery({
      queryKey,
      queryFn: () => this.tmdbClient.movies.getMovieDetails(movieId, this.MOVIE_APPEND_OPTIONS),
      staleTime: this.STALE_TIME,
      gcTime: this.CACHE_TIME,
    })

    this.logger.debug(`Prefetched movie ${movieId}`)
  }

  async prefetchTVDetails(tvId: number): Promise<void> {
    const queryKey = this.getTVQueryKey(tvId)

    await this.queryClient.prefetchQuery({
      queryKey,
      queryFn: () => this.tmdbClient.tv.getTVDetails(tvId, this.TV_APPEND_OPTIONS),
      staleTime: this.STALE_TIME,
      gcTime: this.CACHE_TIME,
    })

    this.logger.debug(`Prefetched TV ${tvId}`)
  }

  // ===== CACHE INSPECTION (FOR DEBUGGING) =====
  async inspectCache(): Promise<{
    providerLevel: number
    domainLevel: number
    totalQueries: number
  }> {
    const cache = this.queryClient.getQueryCache()
    const queries = cache.getAll()

    const providerQueries = queries.filter(
      (q) => Array.isArray(q.queryKey) && q.queryKey[0] === 'tmdb' && q.queryKey[1] === 'api'
    ).length

    const domainQueries = queries.filter(
      (q) =>
        Array.isArray(q.queryKey) && ['movies', 'tv', 'people'].includes(q.queryKey[0] as string)
    ).length

    return {
      providerLevel: providerQueries,
      domainLevel: domainQueries,
      totalQueries: queries.length,
    }
  }
}
