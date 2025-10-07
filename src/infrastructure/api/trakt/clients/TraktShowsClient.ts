import { TraktBaseClient } from '../TraktBaseClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import type { TraktConfigFactory } from '../../../factories/TraktConfigFactory'
import type {
  TraktShow,
  TraktSeason,
  TraktEpisode,
  TraktComment,
  TraktExtended,
  TraktPaginationParams,
  TraktFilterParams,
  TraktShowProgress,
  TraktVideo,
} from '../types'

/**
 * Trakt Shows API client
 *
 * Provides comprehensive TV show functionality including:
 * - Show, season, and episode details
 * - Show comments, ratings, and statistics
 * - Popular, trending, and anticipated shows
 * - Season and episode management
 * - Show translations and aliases
 */
export class TraktShowsClient extends TraktBaseClient {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(configFactory: TraktConfigFactory, logger: ILoggingService) {
    super(configFactory, logger)
  }

  // Show Methods

  /**
   * Get show details by ID
   */
  async getDetails(
    showId: string | number,
    options?: { extended?: TraktExtended | TraktExtended[] }
  ): Promise<TraktShow> {
    return this.get<TraktShow>(`/shows/${showId}`, undefined, options)
  }

  /**
   * Get show videos (trailers, teasers, clips, featurettes)
   */
  async getVideos(showId: string | number): Promise<TraktVideo[]> {
    return this.get<TraktVideo[]>(`/shows/${showId}/videos`)
  }

  /**
   * Get show aliases
   */
  async getAliases(showId: string | number): Promise<{ title: string; country: string }[]> {
    return this.get<{ title: string; country: string }[]>(`/shows/${showId}/aliases`)
  }

  /**
   * Get show certifications
   */
  async getCertifications(showId: string | number): Promise<any[]> {
    return this.get<any[]>(`/shows/${showId}/certifications`)
  }

  /**
   * Get show translations
   */
  async getTranslations(showId: string | number, language?: string): Promise<any[]> {
    const endpoint = language
      ? `/shows/${showId}/translations/${language}`
      : `/shows/${showId}/translations`
    return this.get<any[]>(endpoint)
  }

  /**
   * Get show comments
   */
  async getComments(
    showId: string | number,
    params?: TraktPaginationParams & { sort?: 'newest' | 'oldest' | 'likes' | 'replies' }
  ): Promise<TraktComment[]> {
    return this.get<TraktComment[]>(`/shows/${showId}/comments`, params)
  }

  /**
   * Get show lists
   */
  async getLists(
    showId: string | number,
    params?: TraktPaginationParams & {
      type?: 'all' | 'personal' | 'official'
      sort?: 'popular' | 'likes' | 'comments' | 'items' | 'added' | 'updated'
    }
  ): Promise<any[]> {
    return this.get<any[]>(`/shows/${showId}/lists`, params)
  }

  /**
   * Get show people (cast and crew)
   */
  async getPeople(
    showId: string | number,
    options?: { extended?: TraktExtended }
  ): Promise<{
    cast: { character: string; characters: string[]; episode_count: number; person: any }[]
    crew: Record<string, { job: string; jobs: string[]; episode_count: number; person: any }[]>
  }> {
    return this.get(`/shows/${showId}/people`, undefined, options)
  }

  /**
   * Get show ratings
   */
  async getRatings(showId: string | number): Promise<{
    rating: number
    votes: number
    distribution: Record<string, number>
  }> {
    return this.get(`/shows/${showId}/ratings`)
  }

  /**
   * Get related shows
   */
  async getRelated(
    showId: string | number,
    params?: { limit?: number; extended?: TraktExtended }
  ): Promise<TraktShow[]> {
    return this.get<TraktShow[]>(`/shows/${showId}/related`, params)
  }

  /**
   * Get show statistics
   */
  async getStats(showId: string | number): Promise<{
    watchers: number
    plays: number
    collectors: number
    collected_episodes: number
    comments: number
    lists: number
    votes: number
    favorited: number
  }> {
    return this.get(`/shows/${showId}/stats`)
  }

  /**
   * Get people watching this show now
   */
  async getWatching(showId: string | number): Promise<any[]> {
    return this.get<any[]>(`/shows/${showId}/watching`)
  }

  /**
   * Get next episode to air
   */
  async getNextEpisode(
    showId: string | number,
    options?: { extended?: TraktExtended }
  ): Promise<TraktEpisode> {
    return this.get<TraktEpisode>(`/shows/${showId}/next_episode`, undefined, options)
  }

  /**
   * Get last episode aired
   */
  async getLastEpisode(
    showId: string | number,
    options?: { extended?: TraktExtended }
  ): Promise<TraktEpisode> {
    return this.get<TraktEpisode>(`/shows/${showId}/last_episode`, undefined, options)
  }

  // Season Methods

  /**
   * Get all seasons for a show
   */
  async getSeasons(
    showId: string | number,
    options?: { extended?: TraktExtended | TraktExtended[] }
  ): Promise<TraktSeason[]> {
    return this.get<TraktSeason[]>(`/shows/${showId}/seasons`, undefined, options)
  }

  /**
   * Get season details
   */
  async getSeasonDetails(
    showId: string | number,
    season: number,
    options?: { extended?: TraktExtended | TraktExtended[] }
  ): Promise<TraktEpisode[]> {
    return this.get<TraktEpisode[]>(`/shows/${showId}/seasons/${season}`, undefined, options)
  }

  /**
   * Get season comments
   */
  async getSeasonComments(
    showId: string | number,
    season: number,
    params?: TraktPaginationParams & { sort?: 'newest' | 'oldest' | 'likes' | 'replies' }
  ): Promise<TraktComment[]> {
    return this.get<TraktComment[]>(`/shows/${showId}/seasons/${season}/comments`, params)
  }

  /**
   * Get season lists
   */
  async getSeasonLists(
    showId: string | number,
    season: number,
    params?: TraktPaginationParams & {
      type?: 'all' | 'personal' | 'official'
      sort?: 'popular' | 'likes' | 'comments' | 'items' | 'added' | 'updated'
    }
  ): Promise<any[]> {
    return this.get<any[]>(`/shows/${showId}/seasons/${season}/lists`, params)
  }

  /**
   * Get season ratings
   */
  async getSeasonRatings(
    showId: string | number,
    season: number
  ): Promise<{
    rating: number
    votes: number
    distribution: Record<string, number>
  }> {
    return this.get(`/shows/${showId}/seasons/${season}/ratings`)
  }

  /**
   * Get season statistics
   */
  async getSeasonStats(
    showId: string | number,
    season: number
  ): Promise<{
    watchers: number
    plays: number
    collectors: number
    collected_episodes: number
    comments: number
    lists: number
    votes: number
  }> {
    return this.get(`/shows/${showId}/seasons/${season}/stats`)
  }

  /**
   * Get people watching this season now
   */
  async getSeasonWatching(showId: string | number, season: number): Promise<any[]> {
    return this.get<any[]>(`/shows/${showId}/seasons/${season}/watching`)
  }

  // Episode Methods

  /**
   * Get episode details
   */
  async getEpisodeDetails(
    showId: string | number,
    season: number,
    episode: number,
    options?: { extended?: TraktExtended | TraktExtended[] }
  ): Promise<TraktEpisode> {
    return this.get<TraktEpisode>(
      `/shows/${showId}/seasons/${season}/episodes/${episode}`,
      undefined,
      options
    )
  }

  /**
   * Get episode comments
   */
  async getEpisodeComments(
    showId: string | number,
    season: number,
    episode: number,
    params?: TraktPaginationParams & { sort?: 'newest' | 'oldest' | 'likes' | 'replies' }
  ): Promise<TraktComment[]> {
    return this.get<TraktComment[]>(
      `/shows/${showId}/seasons/${season}/episodes/${episode}/comments`,
      params
    )
  }

  /**
   * Get episode lists
   */
  async getEpisodeLists(
    showId: string | number,
    season: number,
    episode: number,
    params?: TraktPaginationParams & {
      type?: 'all' | 'personal' | 'official'
      sort?: 'popular' | 'likes' | 'comments' | 'items' | 'added' | 'updated'
    }
  ): Promise<any[]> {
    return this.get<any[]>(`/shows/${showId}/seasons/${season}/episodes/${episode}/lists`, params)
  }

  /**
   * Get episode ratings
   */
  async getEpisodeRatings(
    showId: string | number,
    season: number,
    episode: number
  ): Promise<{
    rating: number
    votes: number
    distribution: Record<string, number>
  }> {
    return this.get(`/shows/${showId}/seasons/${season}/episodes/${episode}/ratings`)
  }

  /**
   * Get episode statistics
   */
  async getEpisodeStats(
    showId: string | number,
    season: number,
    episode: number
  ): Promise<{
    watchers: number
    plays: number
    collectors: number
    votes: number
    comments: number
    lists: number
  }> {
    return this.get(`/shows/${showId}/seasons/${season}/episodes/${episode}/stats`)
  }

  /**
   * Get people watching this episode now
   */
  async getEpisodeWatching(
    showId: string | number,
    season: number,
    episode: number
  ): Promise<any[]> {
    return this.get<any[]>(`/shows/${showId}/seasons/${season}/episodes/${episode}/watching`)
  }

  // Popular Lists and Trending

  /**
   * Get popular shows
   */
  async getPopular(
    params?: TraktPaginationParams & TraktFilterParams & { extended?: TraktExtended }
  ): Promise<TraktShow[]> {
    return this.get<TraktShow[]>('/shows/popular', params)
  }

  /**
   * Get trending shows
   */
  async getTrending(
    params?: TraktPaginationParams & TraktFilterParams & { extended?: TraktExtended }
  ): Promise<{ watchers: number; show: TraktShow }[]> {
    return this.get('/shows/trending', params)
  }

  /**
   * Get most played shows
   */
  async getMostPlayed(
    params?: TraktPaginationParams &
      TraktFilterParams & {
        period?: 'weekly' | 'monthly' | 'yearly' | 'all'
        extended?: TraktExtended
      }
  ): Promise<
    { watcher_count: number; play_count: number; collected_count: number; show: TraktShow }[]
  > {
    return this.get('/shows/played', params)
  }

  /**
   * Get most watched shows
   */
  async getMostWatched(
    params?: TraktPaginationParams &
      TraktFilterParams & {
        period?: 'weekly' | 'monthly' | 'yearly' | 'all'
        extended?: TraktExtended
      }
  ): Promise<
    { watcher_count: number; play_count: number; collected_count: number; show: TraktShow }[]
  > {
    return this.get('/shows/watched', params)
  }

  /**
   * Get most collected shows
   */
  async getMostCollected(
    params?: TraktPaginationParams &
      TraktFilterParams & {
        period?: 'weekly' | 'monthly' | 'yearly' | 'all'
        extended?: TraktExtended
      }
  ): Promise<
    { watcher_count: number; play_count: number; collected_count: number; show: TraktShow }[]
  > {
    return this.get('/shows/collected', params)
  }

  /**
   * Get anticipated shows
   */
  async getAnticipated(
    params?: TraktPaginationParams & TraktFilterParams & { extended?: TraktExtended }
  ): Promise<{ list_count: number; show: TraktShow }[]> {
    return this.get('/shows/anticipated', params)
  }

  /**
   * Get show updates (recently updated shows)
   */
  async getUpdates(
    params?: TraktPaginationParams & {
      start_date?: string // ISO 8601 date
      extended?: TraktExtended
    }
  ): Promise<{ updated_at: string; show: TraktShow }[]> {
    return this.get('/shows/updates', params)
  }

  // User-specific methods (require authentication)

  /**
   * Get recommended shows for authenticated user
   */
  async getRecommendations(params?: {
    ignore_collected?: boolean
    extended?: TraktExtended
  }): Promise<TraktShow[]> {
    return this.get<TraktShow[]>('/recommendations/shows', params)
  }

  /**
   * Hide a show from recommendations
   */
  async hideRecommendation(showId: string | number): Promise<void> {
    await this.delete(`/recommendations/shows/${showId}`)
  }

  // Progress tracking methods (require authentication)

  /**
   * Get watched progress for a show
   * Returns detailed progress for all seasons and episodes
   */
  async getProgress(
    showId: string | number,
    params?: {
      hidden?: boolean
      specials?: boolean
      count_specials?: boolean
      last_activity?: 'aired' | 'watched'
    }
  ): Promise<TraktShowProgress> {
    return this.get<TraktShowProgress>(`/shows/${showId}/progress/watched`, params)
  }

  /**
   * Reset watched progress for a show
   * Removes all watch history for this show
   */
  async resetProgress(showId: string | number): Promise<void> {
    await this.post(`/shows/${showId}/progress/watched/reset`, {})
  }
}
