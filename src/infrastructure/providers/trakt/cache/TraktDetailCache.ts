import type { QueryClient } from '@tanstack/react-query'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktMovie, TraktShow, TraktPerson } from '@/src/infrastructure/api/trakt/types'

/**
 * Multi-level TanStack Query cache for Trakt extended API responses
 *
 * Features:
 * - Provider-level caching with longer TTL (2+ hours)
 * - Coordinates with domain-level cache (shorter TTL)
 * - Single extended API calls fetch all needed data
 * - Background refresh and invalidation
 * - User-controlled cache management
 * - Memory efficient with automatic cleanup
 * - Auth-aware caching (different cache keys for authenticated vs public)
 */
export class TraktDetailCache {
  // Cache configuration
  private readonly CACHE_TIME = 1000 * 60 * 60 * 2 // 2 hours (provider level)
  private readonly STALE_TIME = 1000 * 60 * 30 // 30 minutes

  // Extended options for comprehensive data retrieval
  private readonly EXTENDED_FULL_IMAGES: ('full' | 'images')[] = ['full', 'images']

  constructor(
    private readonly traktClient: TraktClient,
    private readonly queryClient: QueryClient,
    private readonly logger: ILoggingService
  ) {}

  async initialize(): Promise<void> {
    this.logger.debug('TraktDetailCache initialized with TanStack Query')
  }

  async shutdown(): Promise<void> {
    // Clear all Trakt-related queries
    await this.queryClient.invalidateQueries({
      queryKey: ['trakt', 'api'],
    })
    this.logger.debug('TraktDetailCache shutdown')
  }

  // ===== QUERY KEY FACTORIES (Provider Level) =====
  private getMovieQueryKey(movieId: string | number, isAuthenticated: boolean): string[] {
    return ['trakt', 'api', 'movie', 'details', movieId.toString(), isAuthenticated ? 'auth' : 'public']
  }

  private getShowQueryKey(showId: string | number, isAuthenticated: boolean): string[] {
    return ['trakt', 'api', 'show', 'details', showId.toString(), isAuthenticated ? 'auth' : 'public']
  }

  private getPersonQueryKey(personId: string | number): string[] {
    return ['trakt', 'api', 'person', 'details', personId.toString()]
  }

  // ===== MOVIE CACHE WITH TANSTACK QUERY =====
  async getOrFetchMovieDetails(movieId: string | number): Promise<TraktMovie> {
    const isAuthenticated = this.traktClient.isAuthenticated()
    const queryKey = this.getMovieQueryKey(movieId, isAuthenticated)

    return this.queryClient.fetchQuery({
      queryKey,
      queryFn: async (): Promise<TraktMovie> => {
        this.logger.debug(`Fetching Trakt movie ${movieId} with extended data`, {
          authenticated: isAuthenticated,
        })

        return this.traktClient.movies.getDetails(movieId, {
          extended: this.EXTENDED_FULL_IMAGES,
        })
      },
      staleTime: this.STALE_TIME,
      gcTime: this.CACHE_TIME,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })
  }

  // ===== SHOW CACHE WITH TANSTACK QUERY =====
  async getOrFetchShowDetails(showId: string | number): Promise<TraktShow> {
    const isAuthenticated = this.traktClient.isAuthenticated()
    const queryKey = this.getShowQueryKey(showId, isAuthenticated)

    return this.queryClient.fetchQuery({
      queryKey,
      queryFn: async (): Promise<TraktShow> => {
        this.logger.debug(`Fetching Trakt show ${showId} with extended data`, {
          authenticated: isAuthenticated,
        })

        return this.traktClient.shows.getDetails(showId, {
          extended: this.EXTENDED_FULL_IMAGES,
        })
      },
      staleTime: this.STALE_TIME,
      gcTime: this.CACHE_TIME,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })
  }

  // ===== PERSON CACHE WITH TANSTACK QUERY =====
  // NOTE: Trakt doesn't have a direct person details endpoint like TMDB
  // Person data comes from search results or credits within movie/show responses
  // This method is a placeholder for future implementation if needed
  async getOrFetchPersonDetails(personId: string | number): Promise<TraktPerson> {
    const queryKey = this.getPersonQueryKey(personId)

    return this.queryClient.fetchQuery({
      queryKey,
      queryFn: async (): Promise<TraktPerson> => {
        this.logger.debug(`Fetching Trakt person ${personId} via search`)

        // Use search as a workaround to get person details
        // This is not ideal but Trakt API doesn't have a direct person details endpoint
        const searchResults = await this.traktClient.search.searchPeople(personId.toString(), {
          extended: this.EXTENDED_FULL_IMAGES,
          limit: 1,
        })

        if (searchResults.length === 0 || !searchResults[0].person) {
          throw new Error(`Person ${personId} not found`)
        }

        return searchResults[0].person
      },
      staleTime: this.STALE_TIME,
      gcTime: this.CACHE_TIME,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })
  }

  // ===== CACHE INVALIDATION & MANAGEMENT =====
  async invalidateMovieCache(movieId?: string | number): Promise<void> {
    if (movieId) {
      // Invalidate both authenticated and public versions
      await this.queryClient.invalidateQueries({
        queryKey: ['trakt', 'api', 'movie', 'details', movieId.toString()],
      })
      // Also invalidate related domain-level cache
      await this.queryClient.invalidateQueries({
        queryKey: ['movies', 'detail', movieId.toString()],
      })
    } else {
      await this.queryClient.invalidateQueries({
        queryKey: ['trakt', 'api', 'movie'],
      })
      await this.queryClient.invalidateQueries({
        queryKey: ['movies'],
      })
    }
    this.logger.debug(`Invalidated Trakt movie cache ${movieId ? `for ${movieId}` : '(all)'}`)
  }

  async invalidateShowCache(showId?: string | number): Promise<void> {
    if (showId) {
      // Invalidate both authenticated and public versions
      await this.queryClient.invalidateQueries({
        queryKey: ['trakt', 'api', 'show', 'details', showId.toString()],
      })
      // Also invalidate related domain-level cache
      await this.queryClient.invalidateQueries({
        queryKey: ['tv', 'detail', showId.toString()],
      })
    } else {
      await this.queryClient.invalidateQueries({
        queryKey: ['trakt', 'api', 'show'],
      })
      await this.queryClient.invalidateQueries({
        queryKey: ['tv'],
      })
    }
    this.logger.debug(`Invalidated Trakt show cache ${showId ? `for ${showId}` : '(all)'}`)
  }

  async invalidatePersonCache(personId?: string | number): Promise<void> {
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
        queryKey: ['trakt', 'api', 'person'],
      })
      await this.queryClient.invalidateQueries({
        queryKey: ['people'],
      })
    }
    this.logger.debug(`Invalidated Trakt person cache ${personId ? `for ${personId}` : '(all)'}`)
  }

  async clearAllTraktCache(): Promise<void> {
    // Clear both provider and domain level caches
    await this.queryClient.invalidateQueries({
      queryKey: ['trakt', 'api'],
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
    this.logger.info('Cleared all Trakt cache (provider + domain levels)')
  }

  // ===== CACHE STATS FOR USER VISIBILITY =====
  getCacheStats(): {
    movies: number
    shows: number
    people: number
    totalSize: number
  } {
    const cache = this.queryClient.getQueryCache()
    const queries = cache.getAll()

    // Filter for Trakt API queries (provider level)
    const traktApiQueries = queries.filter(
      (query) =>
        Array.isArray(query.queryKey) &&
        query.queryKey[0] === 'trakt' &&
        query.queryKey[1] === 'api'
    )

    const movieQueries = traktApiQueries.filter((q) => q.queryKey[2] === 'movie').length
    const showQueries = traktApiQueries.filter((q) => q.queryKey[2] === 'show').length
    const personQueries = traktApiQueries.filter((q) => q.queryKey[2] === 'person').length

    return {
      movies: movieQueries,
      shows: showQueries,
      people: personQueries,
      totalSize: traktApiQueries.length,
    }
  }

  // ===== PREFETCHING FOR PERFORMANCE =====
  async prefetchMovieDetails(movieId: string | number): Promise<void> {
    const isAuthenticated = this.traktClient.isAuthenticated()
    const queryKey = this.getMovieQueryKey(movieId, isAuthenticated)

    await this.queryClient.prefetchQuery({
      queryKey,
      queryFn: () =>
        this.traktClient.movies.getDetails(movieId, {
          extended: this.EXTENDED_FULL_IMAGES,
        }),
      staleTime: this.STALE_TIME,
      gcTime: this.CACHE_TIME,
    })

    this.logger.debug(`Prefetched Trakt movie ${movieId}`)
  }

  async prefetchShowDetails(showId: string | number): Promise<void> {
    const isAuthenticated = this.traktClient.isAuthenticated()
    const queryKey = this.getShowQueryKey(showId, isAuthenticated)

    await this.queryClient.prefetchQuery({
      queryKey,
      queryFn: () =>
        this.traktClient.shows.getDetails(showId, {
          extended: this.EXTENDED_FULL_IMAGES,
        }),
      staleTime: this.STALE_TIME,
      gcTime: this.CACHE_TIME,
    })

    this.logger.debug(`Prefetched Trakt show ${showId}`)
  }

  // ===== CACHE INSPECTION (FOR DEBUGGING) =====
  async inspectCache(): Promise<{
    providerLevel: number
    domainLevel: number
    totalQueries: number
    authQueries: number
    publicQueries: number
  }> {
    const cache = this.queryClient.getQueryCache()
    const queries = cache.getAll()

    const providerQueries = queries.filter(
      (q) => Array.isArray(q.queryKey) && q.queryKey[0] === 'trakt' && q.queryKey[1] === 'api'
    )

    const domainQueries = queries.filter(
      (q) =>
        Array.isArray(q.queryKey) &&
        ['movies', 'tv', 'people'].includes(q.queryKey[0] as string)
    )

    const authQueries = providerQueries.filter(
      (q) => q.queryKey[q.queryKey.length - 1] === 'auth'
    ).length

    const publicQueries = providerQueries.filter(
      (q) => q.queryKey[q.queryKey.length - 1] === 'public'
    ).length

    return {
      providerLevel: providerQueries.length,
      domainLevel: domainQueries.length,
      totalQueries: queries.length,
      authQueries,
      publicQueries,
    }
  }

  /**
   * Invalidate all authenticated caches when user logs out
   * This ensures no cached user-specific data remains
   */
  async invalidateAuthenticatedCaches(): Promise<void> {
    // Find all queries with 'auth' in the key
    const cache = this.queryClient.getQueryCache()
    const authQueries = cache
      .getAll()
      .filter(
        (q) =>
          Array.isArray(q.queryKey) &&
          q.queryKey[0] === 'trakt' &&
          q.queryKey[q.queryKey.length - 1] === 'auth'
      )

    for (const query of authQueries) {
      await this.queryClient.invalidateQueries({ queryKey: query.queryKey })
    }

    this.logger.info('Invalidated all authenticated Trakt caches')
  }
}
