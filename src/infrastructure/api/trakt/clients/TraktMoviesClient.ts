import { TraktBaseClient } from '../TraktBaseClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import type { TraktConfigFactory } from '../../../factories/TraktConfigFactory'
import type {
  TraktMovie,
  TraktComment,
  TraktExtended,
  TraktPaginationParams,
  TraktFilterParams,
  TraktVideo,
} from '../types'

/**
 * Trakt Movies API client
 *
 * Provides comprehensive movie-related functionality including:
 * - Movie details with extended info support
 * - Movie comments and ratings
 * - Popular, trending, and anticipated movies
 * - Movie recommendations and related movies
 * - Movie translations and aliases
 */
export class TraktMoviesClient extends TraktBaseClient {
   
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(configFactory: TraktConfigFactory, logger: ILoggingService) {
    super(configFactory, logger)
  }

  /**
   * Get movie details by ID
   */
  async getDetails(
    movieId: string | number,
    options?: { extended?: TraktExtended | TraktExtended[] }
  ): Promise<TraktMovie> {
    return this.get<TraktMovie>(`/movies/${movieId}`, undefined, options)
  }

  /**
   * Get movie videos (trailers, teasers, clips, featurettes)
   */
  async getVideos(movieId: string | number): Promise<TraktVideo[]> {
    return this.get<TraktVideo[]>(`/movies/${movieId}/videos`)
  }

  /**
   * Get movie aliases
   */
  async getAliases(movieId: string | number): Promise<{ title: string; country: string }[]> {
    return this.get<{ title: string; country: string }[]>(`/movies/${movieId}/aliases`)
  }

  /**
   * Get movie releases by country
   */
  async getReleases(movieId: string | number, country?: string): Promise<any[]> {
    const endpoint = country
      ? `/movies/${movieId}/releases/${country}`
      : `/movies/${movieId}/releases`
    return this.get<any[]>(endpoint)
  }

  /**
   * Get movie translations
   */
  async getTranslations(movieId: string | number, language?: string): Promise<any[]> {
    const endpoint = language
      ? `/movies/${movieId}/translations/${language}`
      : `/movies/${movieId}/translations`
    return this.get<any[]>(endpoint)
  }

  /**
   * Get movie comments
   */
  async getComments(
    movieId: string | number,
    params?: TraktPaginationParams & { sort?: 'newest' | 'oldest' | 'likes' | 'replies' }
  ): Promise<TraktComment[]> {
    return this.get<TraktComment[]>(`/movies/${movieId}/comments`, params)
  }

  /**
   * Get movie lists containing this movie
   */
  async getLists(
    movieId: string | number,
    params?: TraktPaginationParams & {
      type?: 'all' | 'personal' | 'official'
      sort?: 'popular' | 'likes' | 'comments' | 'items' | 'added' | 'updated'
    }
  ): Promise<any[]> {
    return this.get<any[]>(`/movies/${movieId}/lists`, params)
  }

  /**
   * Get people (cast and crew) for a movie
   */
  async getPeople(
    movieId: string | number,
    options?: { extended?: TraktExtended }
  ): Promise<{
    cast: { character: string; characters: string[]; person: any }[]
    crew: Record<string, { job: string; jobs: string[]; person: any }[]>
  }> {
    return this.get(`/movies/${movieId}/people`, undefined, options)
  }

  /**
   * Get movie ratings
   */
  async getRatings(movieId: string | number): Promise<{
    rating: number
    votes: number
    distribution: Record<string, number>
  }> {
    return this.get(`/movies/${movieId}/ratings`)
  }

  /**
   * Get related movies
   */
  async getRelated(
    movieId: string | number,
    params?: { limit?: number; extended?: TraktExtended }
  ): Promise<TraktMovie[]> {
    return this.get<TraktMovie[]>(`/movies/${movieId}/related`, params)
  }

  /**
   * Get movie statistics
   */
  async getStats(movieId: string | number): Promise<{
    watchers: number
    plays: number
    collectors: number
    collected_episodes: number
    comments: number
    lists: number
    votes: number
    favorited: number
  }> {
    return this.get(`/movies/${movieId}/stats`)
  }

  /**
   * Get movie watching activity
   */
  async getWatching(movieId: string | number): Promise<any[]> {
    return this.get<any[]>(`/movies/${movieId}/watching`)
  }

  // Popular Lists and Trending

  /**
   * Get popular movies
   */
  async getPopular(
    params?: TraktPaginationParams & TraktFilterParams & { extended?: TraktExtended }
  ): Promise<TraktMovie[]> {
    return this.get<TraktMovie[]>('/movies/popular', params)
  }

  /**
   * Get trending movies
   */
  async getTrending(
    params?: TraktPaginationParams & TraktFilterParams & { extended?: TraktExtended }
  ): Promise<{ watchers: number; movie: TraktMovie }[]> {
    return this.get('/movies/trending', params)
  }

  /**
   * Get most played movies
   */
  async getMostPlayed(
    params?: TraktPaginationParams &
      TraktFilterParams & {
        period?: 'weekly' | 'monthly' | 'yearly' | 'all'
        extended?: TraktExtended
      }
  ): Promise<
    { watcher_count: number; play_count: number; collected_count: number; movie: TraktMovie }[]
  > {
    return this.get('/movies/played', params)
  }

  /**
   * Get most watched movies
   */
  async getMostWatched(
    params?: TraktPaginationParams &
      TraktFilterParams & {
        period?: 'weekly' | 'monthly' | 'yearly' | 'all'
        extended?: TraktExtended
      }
  ): Promise<
    { watcher_count: number; play_count: number; collected_count: number; movie: TraktMovie }[]
  > {
    return this.get('/movies/watched', params)
  }

  /**
   * Get most collected movies
   */
  async getMostCollected(
    params?: TraktPaginationParams &
      TraktFilterParams & {
        period?: 'weekly' | 'monthly' | 'yearly' | 'all'
        extended?: TraktExtended
      }
  ): Promise<
    { watcher_count: number; play_count: number; collected_count: number; movie: TraktMovie }[]
  > {
    return this.get('/movies/collected', params)
  }

  /**
   * Get anticipated movies
   */
  async getAnticipated(
    params?: TraktPaginationParams & TraktFilterParams & { extended?: TraktExtended }
  ): Promise<{ list_count: number; movie: TraktMovie }[]> {
    return this.get('/movies/anticipated', params)
  }

  /**
   * Get box office movies
   */
  async getBoxOffice(params?: {
    extended?: TraktExtended
  }): Promise<{ revenue: number; movie: TraktMovie }[]> {
    return this.get('/movies/boxoffice', params)
  }

  /**
   * Get movie updates (recently updated movies)
   */
  async getUpdates(
    params?: TraktPaginationParams & {
      start_date?: string // ISO 8601 date
      extended?: TraktExtended
    }
  ): Promise<{ updated_at: string; movie: TraktMovie }[]> {
    return this.get('/movies/updates', params)
  }

  // User-specific methods (require authentication)

  /**
   * Get recommended movies for authenticated user
   */
  async getRecommendations(params?: {
    ignore_collected?: boolean
    extended?: TraktExtended
  }): Promise<TraktMovie[]> {
    return this.get<TraktMovie[]>('/recommendations/movies', params)
  }

  /**
   * Hide a movie from recommendations
   */
  async hideRecommendation(movieId: string | number): Promise<void> {
    await this.delete(`/recommendations/movies/${movieId}`)
  }
}
