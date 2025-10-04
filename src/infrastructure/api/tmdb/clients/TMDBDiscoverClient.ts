import { TMDBBaseClient } from '../TMDBBaseClient'
import type {
  TMDBMovieResponse,
  TMDBTVResponse,
  TMDBPaginatedResponse,
  TMDBDiscoverMovieFilters,
  TMDBDiscoverTVFilters,
  TMDBDiscoverMovieParams,
  TMDBDiscoverTVParams,
} from '../types'

/**
 * TMDB Discover API client
 *
 * Provides comprehensive content discovery with advanced filtering,
 * sorting, and pagination capabilities. Supports all TMDB discover
 * parameters for maximum flexibility.
 */
export class TMDBDiscoverClient extends TMDBBaseClient {
  /**
   * Discover movies with comprehensive filtering
   */
  async discoverMovies(
    filters: TMDBDiscoverMovieFilters = {}
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    const params = this.buildMovieDiscoverParams(filters)
    return this.get<TMDBPaginatedResponse<TMDBMovieResponse>>('/discover/movie', params)
  }

  /**
   * Discover TV shows with comprehensive filtering
   */
  async discoverTVShows(
    filters: TMDBDiscoverTVFilters = {}
  ): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    const params = this.buildTVDiscoverParams(filters)
    return this.get<TMDBPaginatedResponse<TMDBTVResponse>>('/discover/tv', params)
  }

  /**
   * Build movie discover parameters from filter object
   */
  private buildMovieDiscoverParams(filters: TMDBDiscoverMovieFilters): TMDBDiscoverMovieParams {
    const params: TMDBDiscoverMovieParams = {
      page: filters.page || 1,
      sort_by: filters.sortBy || 'popularity.desc',
      include_adult: filters.includeAdult || false,
      include_video: filters.includeVideo || false,
    }

    // Date filters
    if (filters.releaseDateGte) params['release_date.gte'] = filters.releaseDateGte
    if (filters.releaseDateLte) params['release_date.lte'] = filters.releaseDateLte
    if (filters.primaryReleaseYear) params.primary_release_year = filters.primaryReleaseYear
    if (filters.year) params.year = filters.year

    // Vote filters
    if (filters.voteCountGte !== undefined) params['vote_count.gte'] = filters.voteCountGte
    if (filters.voteCountLte !== undefined) params['vote_count.lte'] = filters.voteCountLte
    if (filters.voteAverageGte !== undefined) params['vote_average.gte'] = filters.voteAverageGte
    if (filters.voteAverageLte !== undefined) params['vote_average.lte'] = filters.voteAverageLte

    // Genre filters
    if (filters.withGenres?.length) params.with_genres = filters.withGenres.join(',')
    if (filters.withoutGenres?.length) params.without_genres = filters.withoutGenres.join(',')

    // People filters
    if (filters.withCast?.length) params.with_cast = filters.withCast.join(',')
    if (filters.withCrew?.length) params.with_crew = filters.withCrew.join(',')
    if (filters.withPeople?.length) params.with_people = filters.withPeople.join(',')

    // Company filters
    if (filters.withCompanies?.length) params.with_companies = filters.withCompanies.join(',')

    // Keyword filters
    if (filters.withKeywords?.length) params.with_keywords = filters.withKeywords.join(',')
    if (filters.withoutKeywords?.length) params.without_keywords = filters.withoutKeywords.join(',')

    // Runtime filters
    if (filters.runtimeGte !== undefined) params['with_runtime.gte'] = filters.runtimeGte
    if (filters.runtimeLte !== undefined) params['with_runtime.lte'] = filters.runtimeLte

    // Language/region
    if (filters.originalLanguage) params.with_original_language = filters.originalLanguage
    if (filters.region) params.region = filters.region

    // Certification
    if (filters.certification) params.certification = filters.certification
    if (filters.certificationCountry) params.certification_country = filters.certificationCountry

    // Watch providers
    if (filters.watchRegion) params.watch_region = filters.watchRegion
    if (filters.withWatchProviders?.length)
      params.with_watch_providers = filters.withWatchProviders.join(',')
    if (filters.withWatchMonetizationTypes?.length) {
      params.with_watch_monetization_types = filters.withWatchMonetizationTypes.join('|')
    }

    return params
  }

  /**
   * Build TV discover parameters from filter object
   */
  private buildTVDiscoverParams(filters: TMDBDiscoverTVFilters): TMDBDiscoverTVParams {
    const params: TMDBDiscoverTVParams = {
      page: filters.page || 1,
      sort_by: filters.sortBy || 'popularity.desc',
      include_adult: filters.includeAdult || false,
    }

    // Date filters
    if (filters.airDateGte) params['air_date.gte'] = filters.airDateGte
    if (filters.airDateLte) params['air_date.lte'] = filters.airDateLte
    if (filters.firstAirDateYear) params.first_air_date_year = filters.firstAirDateYear

    // Vote filters
    if (filters.voteCountGte !== undefined) params['vote_count.gte'] = filters.voteCountGte
    if (filters.voteCountLte !== undefined) params['vote_count.lte'] = filters.voteCountLte
    if (filters.voteAverageGte !== undefined) params['vote_average.gte'] = filters.voteAverageGte
    if (filters.voteAverageLte !== undefined) params['vote_average.lte'] = filters.voteAverageLte

    // Genre filters
    if (filters.withGenres?.length) params.with_genres = filters.withGenres.join(',')
    if (filters.withoutGenres?.length) params.without_genres = filters.withoutGenres.join(',')

    // People filters
    if (filters.withCast?.length) params.with_cast = filters.withCast.join(',')
    if (filters.withCrew?.length) params.with_crew = filters.withCrew.join(',')
    if (filters.withPeople?.length) params.with_people = filters.withPeople.join(',')

    // Company and network filters
    if (filters.withCompanies?.length) params.with_companies = filters.withCompanies.join(',')
    if (filters.withNetworks?.length) params.with_networks = filters.withNetworks.join(',')

    // Keyword filters
    if (filters.withKeywords?.length) params.with_keywords = filters.withKeywords.join(',')
    if (filters.withoutKeywords?.length) params.without_keywords = filters.withoutKeywords.join(',')

    // Runtime filters
    if (filters.runtimeGte !== undefined) params['with_runtime.gte'] = filters.runtimeGte
    if (filters.runtimeLte !== undefined) params['with_runtime.lte'] = filters.runtimeLte

    // Language/region
    if (filters.originalLanguage) params.with_original_language = filters.originalLanguage
    if (filters.region) params.region = filters.region
    if (filters.timezone) params.timezone = filters.timezone

    // TV-specific filters
    if (filters.withStatus?.length) params.with_status = filters.withStatus.join(',')
    if (filters.withType?.length) params.with_type = filters.withType.join(',')

    // Watch providers
    if (filters.watchRegion) params.watch_region = filters.watchRegion
    if (filters.withWatchProviders?.length)
      params.with_watch_providers = filters.withWatchProviders.join(',')
    if (filters.withWatchMonetizationTypes?.length) {
      params.with_watch_monetization_types = filters.withWatchMonetizationTypes.join('|')
    }

    // Theatrical screening
    if (filters.screenedTheatrically !== undefined)
      params.screened_theatrically = filters.screenedTheatrically

    return params
  }

  // Trending content (technically part of discover)

  /**
   * Get trending movies
   */
  async getTrendingMovies(
    timeWindow: 'day' | 'week' = 'week',
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBMovieResponse>>(`/trending/movie/${timeWindow}`, {
      page,
    })
  }

  /**
   * Get trending TV shows
   */
  async getTrendingTVShows(
    timeWindow: 'day' | 'week' = 'week',
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBTVResponse>>(`/trending/tv/${timeWindow}`, { page })
  }

  /**
   * Get trending people
   */
  async getTrendingPeople(
    timeWindow: 'day' | 'week' = 'week',
    page: number = 1
  ): Promise<TMDBPaginatedResponse<any>> {
    return this.get<TMDBPaginatedResponse<any>>(`/trending/person/${timeWindow}`, { page })
  }

  /**
   * Get all trending content
   */
  async getTrendingAll(
    timeWindow: 'day' | 'week' = 'week',
    page: number = 1
  ): Promise<TMDBPaginatedResponse<any>> {
    return this.get<TMDBPaginatedResponse<any>>(`/trending/all/${timeWindow}`, { page })
  }

  // Convenience methods for common discover use cases

  /**
   * Discover popular movies by genre
   */
  async getPopularMoviesByGenre(
    genreIds: number[],
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.discoverMovies({
      withGenres: genreIds,
      sortBy: 'popularity.desc',
      page,
    })
  }

  /**
   * Discover highly rated movies
   */
  async getHighlyRatedMovies(
    minRating: number = 7.0,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.discoverMovies({
      voteAverageGte: minRating,
      voteCountGte: 100, // Ensure enough votes for credibility
      sortBy: 'vote_average.desc',
      page,
    })
  }

  /**
   * Discover new releases
   */
  async getNewReleases(page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    const today = new Date()
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    return this.discoverMovies({
      releaseDateGte: thirtyDaysAgo.toISOString().split('T')[0],
      releaseDateLte: today.toISOString().split('T')[0],
      sortBy: 'release_date.desc',
      page,
    })
  }

  /**
   * Discover movies by decade
   */
  async getMoviesByDecade(
    decade: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    const startYear = decade
    const endYear = decade + 9

    return this.discoverMovies({
      releaseDateGte: `${startYear}-01-01`,
      releaseDateLte: `${endYear}-12-31`,
      sortBy: 'popularity.desc',
      page,
    })
  }

  /**
   * Discover movies by actor
   */
  async getMoviesByActor(
    personId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.discoverMovies({
      withCast: [personId],
      sortBy: 'popularity.desc',
      page,
    })
  }

  /**
   * Discover movies by director
   */
  async getMoviesByDirector(
    personId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.discoverMovies({
      withCrew: [personId],
      sortBy: 'popularity.desc',
      page,
    })
  }

  /**
   * Discover similar content based on multiple filters
   */
  async getRecommendationsBasedOnFilters(
    seedFilters: {
      genres?: number[]
      cast?: number[]
      crew?: number[]
      keywords?: number[]
      companies?: number[]
    },
    contentType: 'movie' | 'tv' = 'movie',
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse | TMDBTVResponse>> {
    const commonFilters = {
      withGenres: seedFilters.genres,
      withCast: seedFilters.cast,
      withCrew: seedFilters.crew,
      withKeywords: seedFilters.keywords,
      withCompanies: seedFilters.companies,
      sortBy: 'popularity.desc' as const,
      page,
    }

    if (contentType === 'movie') {
      return this.discoverMovies(commonFilters)
    } else {
      return this.discoverTVShows(commonFilters)
    }
  }

  /**
   * Advanced multi-criteria discovery
   */
  async advancedDiscover(criteria: {
    contentType: 'movie' | 'tv'
    minRating?: number
    minVotes?: number
    genres?: number[]
    excludeGenres?: number[]
    yearRange?: { start: number; end: number }
    runtimeRange?: { min: number; max: number }
    cast?: number[]
    crew?: number[]
    companies?: number[]
    keywords?: number[]
    region?: string
    sortBy?: string
    page?: number
  }): Promise<TMDBPaginatedResponse<TMDBMovieResponse | TMDBTVResponse>> {
    const baseFilters = {
      page: criteria.page || 1,
      sortBy: (criteria.sortBy as any) || 'popularity.desc',
      voteAverageGte: criteria.minRating,
      voteCountGte: criteria.minVotes,
      withGenres: criteria.genres,
      withoutGenres: criteria.excludeGenres,
      withCast: criteria.cast,
      withCrew: criteria.crew,
      withCompanies: criteria.companies,
      withKeywords: criteria.keywords,
      region: criteria.region,
      runtimeGte: criteria.runtimeRange?.min,
      runtimeLte: criteria.runtimeRange?.max,
    }

    if (criteria.contentType === 'movie') {
      return this.discoverMovies({
        ...baseFilters,
        releaseDateGte: criteria.yearRange ? `${criteria.yearRange.start}-01-01` : undefined,
        releaseDateLte: criteria.yearRange ? `${criteria.yearRange.end}-12-31` : undefined,
      })
    } else {
      return this.discoverTVShows({
        ...baseFilters,
        airDateGte: criteria.yearRange ? `${criteria.yearRange.start}-01-01` : undefined,
        airDateLte: criteria.yearRange ? `${criteria.yearRange.end}-12-31` : undefined,
      })
    }
  }
}
