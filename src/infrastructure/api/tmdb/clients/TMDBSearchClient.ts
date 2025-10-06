import type { TMDBBaseClient } from '../TMDBBaseClient'
import type {
  TMDBMovieResponse,
  TMDBTVResponse,
  TMDBPersonResponse,
  TMDBCollectionResponse,
  TMDBMultiSearchResult,
  TMDBPaginatedResponse,
  TMDBMovieSearchParams,
  TMDBTVSearchParams,
  TMDBPersonSearchParams,
  TMDBCollectionSearchParams,
  TMDBMultiSearchParams,
  TMDBSearchOptions,
} from '../types'

/**
 * TMDB Search API client
 *
 * Provides comprehensive search functionality across all TMDB content types
 * with advanced filtering and multi-search capabilities.
 */
export class TMDBSearchClient {
  constructor(private readonly base: TMDBBaseClient) {}

  /**
   * Multi-search across all content types (movies, TV shows, people)
   */
  async multiSearch(
    params: TMDBMultiSearchParams
  ): Promise<TMDBPaginatedResponse<TMDBMultiSearchResult>> {
    const queryParams = {
      query: params.query,
      page: params.page || 1,
      include_adult: params.include_adult || false,
    }

    return this.base.get<TMDBPaginatedResponse<TMDBMultiSearchResult>>('/search/multi', queryParams)
  }

  /**
   * Search movies with comprehensive filtering options
   */
  async searchMovies(
    params: TMDBMovieSearchParams
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    const queryParams = {
      query: params.query,
      page: params.page || 1,
      include_adult: params.include_adult || false,
      ...(params.primary_release_year && { primary_release_year: params.primary_release_year }),
      ...(params.year && { year: params.year }),
      ...(params.region && { region: params.region }),
    }

    return this.base.get<TMDBPaginatedResponse<TMDBMovieResponse>>('/search/movie', queryParams)
  }

  /**
   * Search TV shows with filtering options
   */
  async searchTVShows(params: TMDBTVSearchParams): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    const queryParams = {
      query: params.query,
      page: params.page || 1,
      include_adult: params.include_adult || false,
      ...(params.first_air_date_year && { first_air_date_year: params.first_air_date_year }),
    }

    return this.base.get<TMDBPaginatedResponse<TMDBTVResponse>>('/search/tv', queryParams)
  }

  /**
   * Search people (actors, directors, writers, etc.)
   */
  async searchPeople(
    params: TMDBPersonSearchParams
  ): Promise<TMDBPaginatedResponse<TMDBPersonResponse>> {
    const queryParams = {
      query: params.query,
      page: params.page || 1,
      include_adult: params.include_adult || false,
    }

    return this.base.get<TMDBPaginatedResponse<TMDBPersonResponse>>('/search/person', queryParams)
  }

  /**
   * Search collections
   */
  async searchCollections(
    params: TMDBCollectionSearchParams
  ): Promise<TMDBPaginatedResponse<TMDBCollectionResponse>> {
    const queryParams = {
      query: params.query,
      page: params.page || 1,
    }

    return this.base.get<TMDBPaginatedResponse<TMDBCollectionResponse>>(
      '/search/collection',
      queryParams
    )
  }

  /**
   * Search companies
   */
  async searchCompanies(params: { query: string; page?: number }): Promise<
    TMDBPaginatedResponse<{
      id: number
      logo_path: string | null
      name: string
      origin_country: string
    }>
  > {
    const queryParams = {
      query: params.query,
      page: params.page || 1,
    }

    return this.base.get('/search/company', queryParams)
  }

  /**
   * Search keywords
   */
  async searchKeywords(params: { query: string; page?: number }): Promise<
    TMDBPaginatedResponse<{
      id: number
      name: string
    }>
  > {
    const queryParams = {
      query: params.query,
      page: params.page || 1,
    }

    return this.base.get('/search/keyword', queryParams)
  }

  // Convenience methods with simplified parameters

  /**
   * Simple movie search with optional filters
   */
  async searchMoviesSimple(
    query: string,
    options: TMDBSearchOptions = {}
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.searchMovies({
      query,
      page: options.page,
      include_adult: options.includeAdult,
      region: options.region,
      primary_release_year: options.primaryReleaseYear,
      year: options.year,
    })
  }

  /**
   * Simple TV show search with optional filters
   */
  async searchTVSimple(
    query: string,
    options: TMDBSearchOptions = {}
  ): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.searchTVShows({
      query,
      page: options.page,
      include_adult: options.includeAdult,
      first_air_date_year: options.firstAirDateYear,
    })
  }

  /**
   * Simple person search
   */
  async searchPeopleSimple(
    query: string,
    options: Pick<TMDBSearchOptions, 'page' | 'includeAdult'> = {}
  ): Promise<TMDBPaginatedResponse<TMDBPersonResponse>> {
    return this.searchPeople({
      query,
      page: options.page,
      include_adult: options.includeAdult,
    })
  }

  /**
   * Simple multi-search
   */
  async searchAll(
    query: string,
    options: Pick<TMDBSearchOptions, 'page' | 'includeAdult'> = {}
  ): Promise<TMDBPaginatedResponse<TMDBMultiSearchResult>> {
    return this.multiSearch({
      query,
      page: options.page,
      include_adult: options.includeAdult,
    })
  }

  // Advanced search methods

  /**
   * Search for movies by specific year range
   */
  async searchMoviesByYearRange(
    query: string,
    startYear: number,
    endYear: number,
    page: number = 1
  ): Promise<TMDBMovieResponse[]> {
    const allResults: TMDBMovieResponse[] = []

    for (let year = startYear; year <= endYear; year++) {
      const results = await this.searchMovies({
        query,
        year,
        page,
      })
      allResults.push(...results.results)
    }

    return allResults
  }

  /**
   * Search for TV shows by air date year range
   */
  async searchTVByYearRange(
    query: string,
    startYear: number,
    endYear: number,
    page: number = 1
  ): Promise<TMDBTVResponse[]> {
    const allResults: TMDBTVResponse[] = []

    for (let year = startYear; year <= endYear; year++) {
      const results = await this.searchTVShows({
        query,
        first_air_date_year: year,
        page,
      })
      allResults.push(...results.results)
    }

    return allResults
  }

  /**
   * Comprehensive search across all types with filtering
   */
  async comprehensiveSearch(
    query: string,
    options: {
      includeMovies?: boolean
      includeTVShows?: boolean
      includePeople?: boolean
      includeCollections?: boolean
      includeAdult?: boolean
      page?: number
      movieYear?: number
      tvYear?: number
    } = {}
  ): Promise<{
    movies?: TMDBPaginatedResponse<TMDBMovieResponse>
    tvShows?: TMDBPaginatedResponse<TMDBTVResponse>
    people?: TMDBPaginatedResponse<TMDBPersonResponse>
    collections?: TMDBPaginatedResponse<TMDBCollectionResponse>
  }> {
    const results: any = {}
    const searchPromises: Promise<any>[] = []

    if (options.includeMovies !== false) {
      searchPromises.push(
        this.searchMovies({
          query,
          page: options.page,
          include_adult: options.includeAdult,
          year: options.movieYear,
        }).then((result) => ({ type: 'movies', data: result }))
      )
    }

    if (options.includeTVShows !== false) {
      searchPromises.push(
        this.searchTVShows({
          query,
          page: options.page,
          include_adult: options.includeAdult,
          first_air_date_year: options.tvYear,
        }).then((result) => ({ type: 'tvShows', data: result }))
      )
    }

    if (options.includePeople !== false) {
      searchPromises.push(
        this.searchPeople({
          query,
          page: options.page,
          include_adult: options.includeAdult,
        }).then((result) => ({ type: 'people', data: result }))
      )
    }

    if (options.includeCollections === true) {
      searchPromises.push(
        this.searchCollections({
          query,
          page: options.page,
        }).then((result) => ({ type: 'collections', data: result }))
      )
    }

    const searchResults = await Promise.all(searchPromises)

    for (const result of searchResults) {
      results[result.type] = result.data
    }

    return results
  }
}
