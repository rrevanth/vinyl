import { TraktBaseClient } from '../TraktBaseClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import type { TraktConfigFactory } from '../../../factories/TraktConfigFactory'
import type { RequestQueueService } from '../../../services/RequestQueueService'
import type {
  TraktUser,
  TraktUserStats,
  TraktHistoryItem,
  TraktWatchlistItem,
  TraktCollectionItem,
  TraktExtended,
  TraktPaginationParams,
  TraktHistoryParams,
  TraktWatchlistParams,
  TraktCollectionParams,
} from '../types'

/**
 * Trakt Users API client
 *
 * Provides user-related functionality:
 * - User profiles and settings
 * - Watch history and statistics
 * - Collections and watchlists
 * - User followers and following
 * - User ratings and comments
 */
export class TraktUsersClient extends TraktBaseClient {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    configFactory: TraktConfigFactory,
    logger: ILoggingService,
    queueService: RequestQueueService
  ) {
    super(configFactory, logger, queueService)
  }

  // User Profile Methods

  /**
   * Get user profile
   * Use 'me' for authenticated user's profile
   */
  async getProfile(username: string, options?: { extended?: TraktExtended }): Promise<TraktUser> {
    return this.get<TraktUser>(`/users/${username}`, options)
  }

  /**
   * Get current user's profile (requires authentication)
   */
  async getMyProfile(options?: { extended?: TraktExtended }): Promise<TraktUser> {
    return this.getProfile('me', options)
  }

  /**
   * Get user settings (authenticated user only)
   */
  async getSettings(): Promise<{
    user: TraktUser
    account: {
      timezone: string
      date_format: string
      time_24hr: boolean
      cover_image: string
    }
    connections: {
      twitter?: boolean
      mastodon?: boolean
      tumblr?: boolean
      medium?: boolean
    }
    sharing_text: {
      watching: string
      watched: string
    }
  }> {
    return this.get('/users/settings')
  }

  // User Statistics

  /**
   * Get user statistics
   */
  async getStats(username: string): Promise<TraktUserStats> {
    return this.get<TraktUserStats>(`/users/${username}/stats`)
  }

  /**
   * Get current user's statistics
   */
  async getMyStats(): Promise<TraktUserStats> {
    return this.getStats('me')
  }

  // Watch History

  /**
   * Get user's watch history
   */
  async getHistory(username: string, params?: TraktHistoryParams): Promise<TraktHistoryItem[]> {
    return this.get<TraktHistoryItem[]>(`/users/${username}/history`, params)
  }

  /**
   * Get current user's watch history
   */
  async getMyHistory(params?: TraktHistoryParams): Promise<TraktHistoryItem[]> {
    return this.getHistory('me', params)
  }

  /**
   * Get user's movie history
   */
  async getMovieHistory(
    username: string,
    params?: Omit<TraktHistoryParams, 'type'> & { item_id?: number }
  ): Promise<TraktHistoryItem[]> {
    return this.get<TraktHistoryItem[]>(`/users/${username}/history/movies`, params)
  }

  /**
   * Get user's show history
   */
  async getShowHistory(
    username: string,
    params?: Omit<TraktHistoryParams, 'type'> & { item_id?: number }
  ): Promise<TraktHistoryItem[]> {
    return this.get<TraktHistoryItem[]>(`/users/${username}/history/shows`, params)
  }

  // Watchlist

  /**
   * Get user's watchlist
   */
  async getWatchlist(
    username: string,
    params?: TraktWatchlistParams
  ): Promise<TraktWatchlistItem[]> {
    return this.get<TraktWatchlistItem[]>(`/users/${username}/watchlist`, params)
  }

  /**
   * Get current user's watchlist
   */
  async getMyWatchlist(params?: TraktWatchlistParams): Promise<TraktWatchlistItem[]> {
    return this.getWatchlist('me', params)
  }

  /**
   * Get user's movie watchlist
   */
  async getMovieWatchlist(
    username: string,
    params?: Omit<TraktWatchlistParams, 'type'>
  ): Promise<TraktWatchlistItem[]> {
    return this.get<TraktWatchlistItem[]>(`/users/${username}/watchlist/movies`, params)
  }

  /**
   * Get user's show watchlist
   */
  async getShowWatchlist(
    username: string,
    params?: Omit<TraktWatchlistParams, 'type'>
  ): Promise<TraktWatchlistItem[]> {
    return this.get<TraktWatchlistItem[]>(`/users/${username}/watchlist/shows`, params)
  }

  // Collection

  /**
   * Get user's collection
   */
  async getCollection(
    username: string,
    params?: TraktCollectionParams
  ): Promise<TraktCollectionItem[]> {
    return this.get<TraktCollectionItem[]>(`/users/${username}/collection`, params)
  }

  /**
   * Get current user's collection
   */
  async getMyCollection(params?: TraktCollectionParams): Promise<TraktCollectionItem[]> {
    return this.getCollection('me', params)
  }

  /**
   * Get user's movie collection
   */
  async getMovieCollection(
    username: string,
    params?: Omit<TraktCollectionParams, 'type'>
  ): Promise<TraktCollectionItem[]> {
    return this.get<TraktCollectionItem[]>(`/users/${username}/collection/movies`, params)
  }

  /**
   * Get user's show collection
   */
  async getShowCollection(
    username: string,
    params?: Omit<TraktCollectionParams, 'type'>
  ): Promise<TraktCollectionItem[]> {
    return this.get<TraktCollectionItem[]>(`/users/${username}/collection/shows`, params)
  }

  // Lists

  /**
   * Get user's custom lists
   */
  async getLists(username: string): Promise<any[]> {
    return this.get<any[]>(`/users/${username}/lists`)
  }

  /**
   * Get current user's lists
   */
  async getMyLists(): Promise<any[]> {
    return this.getLists('me')
  }

  /**
   * Get specific list
   */
  async getList(
    username: string,
    listId: string | number,
    params?: { extended?: TraktExtended }
  ): Promise<any> {
    return this.get(`/users/${username}/lists/${listId}`, params)
  }

  /**
   * Get list items
   */
  async getListItems(
    username: string,
    listId: string | number,
    params?: TraktPaginationParams & {
      type?: 'movies' | 'shows' | 'seasons' | 'episodes' | 'people'
      extended?: TraktExtended
    }
  ): Promise<any[]> {
    return this.get<any[]>(`/users/${username}/lists/${listId}/items`, params)
  }

  // Social Features

  /**
   * Get user's followers
   */
  async getFollowers(
    username: string,
    params?: TraktPaginationParams & { extended?: TraktExtended }
  ): Promise<{ followed_at: string; user: TraktUser }[]> {
    return this.get(`/users/${username}/followers`, params)
  }

  /**
   * Get users that user is following
   */
  async getFollowing(
    username: string,
    params?: TraktPaginationParams & { extended?: TraktExtended }
  ): Promise<{ followed_at: string; user: TraktUser }[]> {
    return this.get(`/users/${username}/following`, params)
  }

  /**
   * Get user's friends (mutual followers)
   */
  async getFriends(
    username: string,
    params?: TraktPaginationParams & { extended?: TraktExtended }
  ): Promise<{ friends_at: string; user: TraktUser }[]> {
    return this.get(`/users/${username}/friends`, params)
  }

  // User-specific authenticated actions

  /**
   * Follow a user (requires authentication)
   */
  async followUser(username: string): Promise<void> {
    await this.post(`/users/${username}/follow`)
  }

  /**
   * Unfollow a user (requires authentication)
   */
  async unfollowUser(username: string): Promise<void> {
    await this.delete(`/users/${username}/follow`)
  }

  // Ratings and Comments

  /**
   * Get user's ratings
   */
  async getRatings(
    username: string,
    params?: TraktPaginationParams & {
      type?: 'movies' | 'shows' | 'seasons' | 'episodes'
      rating?: number // Filter by specific rating (1-10)
      extended?: TraktExtended
    }
  ): Promise<any[]> {
    return this.get<any[]>(`/users/${username}/ratings`, params)
  }

  /**
   * Get user's comments
   */
  async getComments(
    username: string,
    params?: TraktPaginationParams & {
      comment_type?: 'all' | 'reviews' | 'shouts'
      type?: 'movies' | 'shows' | 'seasons' | 'episodes' | 'lists'
      include_replies?: boolean
      extended?: TraktExtended
    }
  ): Promise<any[]> {
    return this.get<any[]>(`/users/${username}/comments`, params)
  }

  // Utility Methods

  /**
   * Get comprehensive user profile with stats and activity
   */
  async getCompleteProfile(username: string): Promise<{
    profile: TraktUser
    stats: TraktUserStats
    recentHistory: TraktHistoryItem[]
    watchlist: TraktWatchlistItem[]
  }> {
    const [profile, stats, recentHistory, watchlist] = await Promise.all([
      this.getProfile(username, { extended: 'full' }),
      this.getStats(username),
      this.getHistory(username, { limit: 10 }),
      this.getWatchlist(username, { limit: 10 }),
    ])

    return { profile, stats, recentHistory, watchlist }
  }

  /**
   * Check if user is authenticated and get their profile
   */
  async validateAuthentication(): Promise<TraktUser | null> {
    try {
      return await this.getMyProfile({ extended: 'full' })
    } catch {
      return null
    }
  }
}
