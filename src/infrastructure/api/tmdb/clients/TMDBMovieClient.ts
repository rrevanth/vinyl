import { TMDBBaseClient } from '../TMDBBaseClient'
import type {
  TMDBMovieResponse,
  TMDBCreditsResponse,
  TMDBVideosResponse,
  TMDBImagesResponse,
  TMDBReviewResponse,
  TMDBKeywordsResponse,
  TMDBExternalIdsResponse,
  TMDBReleaseDatesResponse,
  TMDBWatchProvidersResponse,
  TMDBTranslationsResponse,
  TMDBPaginatedResponse,
  TMDBMovieAppendToResponse,
} from '../types'

/**
 * TMDB Movie API client
 *
 * Provides comprehensive movie data access with full append_to_response support.
 * Maximizes data fetching efficiency by requesting all relevant information in single calls.
 */
export class TMDBMovieClient extends TMDBBaseClient {
  /**
   * Get movie details with selective append_to_response options
   */
  async getMovieDetails(
    movieId: number,
    appendToResponse: TMDBMovieAppendToResponse[] = []
  ): Promise<TMDBMovieResponse> {
    const params: Record<string, any> = {}

    if (appendToResponse.length > 0) {
      params.append_to_response = appendToResponse.join(',')
    }

    return this.get<TMDBMovieResponse>(`/movie/${movieId}`, params)
  }

  /**
   * Get complete movie details with ALL append_to_response options
   * This is the kitchen sink approach - fetches everything in one request
   */
  async getCompleteMovieDetails(movieId: number): Promise<TMDBMovieResponse> {
    return this.getMovieDetails(movieId, [
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
    ])
  }

  /**
   * Get movie credits (cast and crew)
   */
  async getMovieCredits(movieId: number): Promise<TMDBCreditsResponse> {
    return this.get<TMDBCreditsResponse>(`/movie/${movieId}/credits`)
  }

  /**
   * Get movie videos (trailers, teasers, clips, etc.)
   */
  async getMovieVideos(movieId: number): Promise<TMDBVideosResponse> {
    return this.get<TMDBVideosResponse>(`/movie/${movieId}/videos`)
  }

  /**
   * Get movie images (posters, backdrops, logos)
   */
  async getMovieImages(movieId: number): Promise<TMDBImagesResponse> {
    return this.get<TMDBImagesResponse>(`/movie/${movieId}/images`)
  }

  /**
   * Get movie reviews with pagination
   */
  async getMovieReviews(
    movieId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBReviewResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBReviewResponse>>(`/movie/${movieId}/reviews`, {
      page,
    })
  }

  /**
   * Get movie recommendations with pagination
   */
  async getMovieRecommendations(
    movieId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBMovieResponse>>(`/movie/${movieId}/recommendations`, {
      page,
    })
  }

  /**
   * Get similar movies with pagination
   */
  async getSimilarMovies(
    movieId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBMovieResponse>>(`/movie/${movieId}/similar`, { page })
  }

  /**
   * Get movie keywords
   */
  async getMovieKeywords(movieId: number): Promise<TMDBKeywordsResponse> {
    return this.get<TMDBKeywordsResponse>(`/movie/${movieId}/keywords`)
  }

  /**
   * Get movie external IDs (IMDB, Facebook, Twitter, etc.)
   */
  async getMovieExternalIds(movieId: number): Promise<TMDBExternalIdsResponse> {
    return this.get<TMDBExternalIdsResponse>(`/movie/${movieId}/external_ids`)
  }

  /**
   * Get movie release dates by country
   */
  async getMovieReleaseDates(movieId: number): Promise<TMDBReleaseDatesResponse> {
    return this.get<TMDBReleaseDatesResponse>(`/movie/${movieId}/release_dates`)
  }

  /**
   * Get movie watch providers by region
   */
  async getMovieWatchProviders(movieId: number): Promise<TMDBWatchProvidersResponse> {
    return this.get<TMDBWatchProvidersResponse>(`/movie/${movieId}/watch/providers`)
  }

  /**
   * Get movie translations
   */
  async getMovieTranslations(movieId: number): Promise<TMDBTranslationsResponse> {
    return this.get<TMDBTranslationsResponse>(`/movie/${movieId}/translations`)
  }

  // Movie lists

  /**
   * Get popular movies
   */
  async getPopularMovies(page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBMovieResponse>>('/movie/popular', { page })
  }

  /**
   * Get top rated movies
   */
  async getTopRatedMovies(page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBMovieResponse>>('/movie/top_rated', { page })
  }

  /**
   * Get upcoming movies
   */
  async getUpcomingMovies(page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBMovieResponse>>('/movie/upcoming', { page })
  }

  /**
   * Get now playing movies
   */
  async getNowPlayingMovies(page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBMovieResponse>>('/movie/now_playing', { page })
  }

  /**
   * Get latest movie (single movie, not paginated)
   */
  async getLatestMovie(): Promise<TMDBMovieResponse> {
    return this.get<TMDBMovieResponse>('/movie/latest')
  }

  // Alternative title methods

  /**
   * Get movie alternative titles
   */
  async getMovieAlternativeTitles(
    movieId: number,
    country?: string
  ): Promise<{
    id: number
    titles: {
      iso_3166_1: string
      title: string
      type: string
    }[]
  }> {
    const params = country ? { country } : {}
    return this.get(`/movie/${movieId}/alternative_titles`, params)
  }

  // Collection methods

  /**
   * Get movie collection details if movie belongs to a collection
   */
  async getMovieCollection(collectionId: number): Promise<{
    id: number
    name: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    parts: TMDBMovieResponse[]
  }> {
    return this.get(`/collection/${collectionId}`)
  }
}
