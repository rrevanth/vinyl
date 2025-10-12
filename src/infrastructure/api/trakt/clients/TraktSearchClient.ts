import { TraktBaseClient } from '../TraktBaseClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import type { TraktConfigFactory } from '../../../factories/TraktConfigFactory'
import type { RequestQueueService } from '../../../services/RequestQueueService'
import type {
  TraktSearchResult,
  TraktExtended,
  TraktPaginationParams,
  TraktSearchParams,
  TraktFilterParams,
} from '../types'

/**
 * Trakt Search API client
 *
 * Provides comprehensive search functionality:
 * - Multi-search across all content types
 * - Type-specific searches (movies, shows, episodes, people, lists)
 * - Advanced filtering and sorting options
 * - Text search with field targeting
 */
export class TraktSearchClient extends TraktBaseClient {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    configFactory: TraktConfigFactory,
    logger: ILoggingService,
    queueService: RequestQueueService
  ) {
    super(configFactory, logger, queueService)
  }

  /**
   * Multi-search across all content types
   * Searches movies, shows, episodes, people, and lists
   */
  async searchAll(
    query: string,
    params?: Omit<TraktSearchParams, 'query' | 'type'> & TraktPaginationParams & TraktFilterParams
  ): Promise<TraktSearchResult[]> {
    return this.get<TraktSearchResult[]>('/search', {
      query,
      ...params,
    })
  }

  /**
   * Search movies only
   */
  async searchMovies(
    query: string,
    params?: Omit<TraktSearchParams, 'query' | 'type'> & TraktPaginationParams & TraktFilterParams
  ): Promise<TraktSearchResult[]> {
    return this.get<TraktSearchResult[]>('/search', {
      query,
      type: 'movie',
      ...params,
    })
  }

  /**
   * Search TV shows only
   */
  async searchShows(
    query: string,
    params?: Omit<TraktSearchParams, 'query' | 'type'> & TraktPaginationParams & TraktFilterParams
  ): Promise<TraktSearchResult[]> {
    return this.get<TraktSearchResult[]>('/search', {
      query,
      type: 'show',
      ...params,
    })
  }

  /**
   * Search episodes only
   */
  async searchEpisodes(
    query: string,
    params?: Omit<TraktSearchParams, 'query' | 'type'> & TraktPaginationParams & TraktFilterParams
  ): Promise<TraktSearchResult[]> {
    return this.get<TraktSearchResult[]>('/search', {
      query,
      type: 'episode',
      ...params,
    })
  }

  /**
   * Search people only
   */
  async searchPeople(
    query: string,
    params?: Omit<TraktSearchParams, 'query' | 'type'> & TraktPaginationParams & TraktFilterParams
  ): Promise<TraktSearchResult[]> {
    return this.get<TraktSearchResult[]>('/search', {
      query,
      type: 'person',
      ...params,
    })
  }

  /**
   * Search lists only
   */
  async searchLists(
    query: string,
    params?: Omit<TraktSearchParams, 'query' | 'type'> & TraktPaginationParams & TraktFilterParams
  ): Promise<TraktSearchResult[]> {
    return this.get<TraktSearchResult[]>('/search', {
      query,
      type: 'list',
      ...params,
    })
  }

  /**
   * Advanced search with multiple filters
   * Combines text search with advanced filtering options
   */
  async advancedSearch(
    params: {
      query?: string
      type?: 'movie' | 'show' | 'episode' | 'person' | 'list'
      fields?: ('title' | 'description' | 'name' | 'translations' | 'aliases')[]
    } & TraktPaginationParams &
      TraktFilterParams & { extended?: TraktExtended }
  ): Promise<TraktSearchResult[]> {
    return this.get<TraktSearchResult[]>('/search', params)
  }

  /**
   * Search by external ID (IMDB, TMDB, TVDB)
   * Finds content by external database IDs
   */
  async searchByExternalId(
    idType: 'imdb' | 'tmdb' | 'tvdb',
    id: string | number,
    params?: {
      type?: 'movie' | 'show' | 'episode' | 'person'
      extended?: TraktExtended
    }
  ): Promise<TraktSearchResult[]> {
    return this.get<TraktSearchResult[]>(`/search/${idType}/${id}`, params)
  }

  /**
   * Search by Trakt ID
   * Finds content by Trakt database ID
   */
  async searchByTraktId(
    id: string | number,
    params?: {
      type?: 'movie' | 'show' | 'episode' | 'person'
      extended?: TraktExtended
    }
  ): Promise<TraktSearchResult[]> {
    return this.get<TraktSearchResult[]>(`/search/trakt/${id}`, params)
  }

  /**
   * Get popular searches
   * Returns currently popular search terms
   */
  async getPopularSearches(): Promise<{ query: string; count: number }[]> {
    return this.get<{ query: string; count: number }[]>('/search/popular')
  }

  /**
   * Search suggestions based on partial query
   * Provides autocomplete-style suggestions
   */
  async getSuggestions(
    query: string,
    params?: {
      type?: 'movie' | 'show' | 'person'
      limit?: number
    }
  ): Promise<TraktSearchResult[]> {
    return this.get<TraktSearchResult[]>('/search/suggestions', {
      query,
      ...params,
    })
  }

  // Utility Methods

  /**
   * Comprehensive search with fallback
   * Tries multiple search strategies to find the best matches
   */
  async comprehensiveSearch(
    query: string,
    options?: {
      includeMovies?: boolean
      includeShows?: boolean
      includePeople?: boolean
      extended?: TraktExtended
      limit?: number
    }
  ): Promise<{
    movies: TraktSearchResult[]
    shows: TraktSearchResult[]
    people: TraktSearchResult[]
    all: TraktSearchResult[]
  }> {
    const {
      includeMovies = true,
      includeShows = true,
      includePeople = true,
      extended,
      limit = 10,
    } = options || {}

    const promises: Promise<any>[] = []
    const results: any = {}

    // Search all types first
    promises.push(this.searchAll(query, { extended, limit }).then((all) => (results.all = all)))

    // Type-specific searches
    if (includeMovies) {
      promises.push(
        this.searchMovies(query, { extended, limit }).then((movies) => (results.movies = movies))
      )
    }

    if (includeShows) {
      promises.push(
        this.searchShows(query, { extended, limit }).then((shows) => (results.shows = shows))
      )
    }

    if (includePeople) {
      promises.push(
        this.searchPeople(query, { extended, limit }).then((people) => (results.people = people))
      )
    }

    await Promise.all(promises)

    return {
      movies: results.movies || [],
      shows: results.shows || [],
      people: results.people || [],
      all: results.all || [],
    }
  }

  /**
   * Smart search with auto-detection
   * Automatically determines the best search strategy based on query patterns
   */
  async smartSearch(
    query: string,
    params?: { extended?: TraktExtended; limit?: number }
  ): Promise<TraktSearchResult[]> {
    // Detect query patterns
    const isImdbId = /^tt\d+$/.test(query)
    const isTmdbId = /^\d+$/.test(query) && query.length < 8
    const isYear = /^\d{4}$/.test(query)

    // Use appropriate search strategy
    if (isImdbId) {
      return this.searchByExternalId('imdb', query, params)
    }

    if (isTmdbId) {
      return this.searchByExternalId('tmdb', parseInt(query), params)
    }

    if (isYear) {
      return this.advancedSearch({
        query,
        years: query,
        ...params,
      })
    }

    // Default to multi-search
    return this.searchAll(query, params)
  }
}
