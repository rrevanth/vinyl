import { TraktBaseClient } from '../TraktBaseClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import type { TraktConfigFactory } from '../../../factories/TraktConfigFactory'
import type {
  TraktCheckinResponse,
  TraktSyncResponse,
  TraktCheckinParams,
  TraktSyncParams,
  TraktMovie,
  TraktShow,
  TraktSeason,
  TraktEpisode,
  TraktPlaybackItem,
} from '../types'

/**
 * Trakt Sync API client
 *
 * Provides synchronization and check-in functionality:
 * - Manual check-ins for movies and episodes
 * - Automatic scrobbling support
 * - Collection management (add/remove items)
 * - Watchlist management
 * - Watch history synchronization
 * - Bulk operations for syncing libraries
 */
export class TraktSyncClient extends TraktBaseClient {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(configFactory: TraktConfigFactory, logger: ILoggingService) {
    super(configFactory, logger)
  }

  // Check-in Methods

  /**
   * Check into a movie
   * Indicates the user is currently watching a movie
   */
  async checkinMovie(
    movie: TraktMovie,
    options?: {
      sharing?: {
        twitter?: boolean
        mastodon?: boolean
        tumblr?: boolean
      }
      message?: string
    }
  ): Promise<TraktCheckinResponse> {
    const params: TraktCheckinParams = {
      movie,
      ...options,
    }
    return this.post<TraktCheckinResponse>('/checkin', params)
  }

  /**
   * Check into an episode
   * Indicates the user is currently watching an episode
   */
  async checkinEpisode(
    episode: TraktEpisode,
    show?: TraktShow,
    options?: {
      sharing?: {
        twitter?: boolean
        mastodon?: boolean
        tumblr?: boolean
      }
      message?: string
    }
  ): Promise<TraktCheckinResponse> {
    const params: TraktCheckinParams = {
      episode,
      show,
      ...options,
    }
    return this.post<TraktCheckinResponse>('/checkin', params)
  }

  /**
   * Delete any active check-ins
   * Removes current check-in status
   */
  async cancelCheckin(): Promise<void> {
    await this.delete('/checkin')
  }

  // Scrobble Methods (for automatic tracking)

  /**
   * Start scrobbling a movie
   * Indicates playback has started
   */
  async startScrobbleMovie(movie: TraktMovie, progress: number): Promise<void> {
    await this.post('/scrobble/start', {
      movie,
      progress,
    })
  }

  /**
   * Start scrobbling an episode
   * Indicates playback has started
   */
  async startScrobbleEpisode(
    episode: TraktEpisode,
    progress: number,
    show?: TraktShow
  ): Promise<void> {
    await this.post('/scrobble/start', {
      episode,
      show,
      progress,
    })
  }

  /**
   * Pause scrobbling
   * Indicates playback was paused
   */
  async pauseScrobble(
    media: { movie?: TraktMovie; episode?: TraktEpisode; show?: TraktShow },
    progress: number
  ): Promise<void> {
    await this.post('/scrobble/pause', {
      ...media,
      progress,
    })
  }

  /**
   * Stop scrobbling
   * Indicates playback was stopped (adds to watch history)
   */
  async stopScrobble(
    media: { movie?: TraktMovie; episode?: TraktEpisode; show?: TraktShow },
    progress: number
  ): Promise<void> {
    await this.post('/scrobble/stop', {
      ...media,
      progress,
    })
  }

  // Collection Management

  /**
   * Add items to collection
   * Adds movies, shows, seasons, or episodes to user's collection
   */
  async addToCollection(items: TraktSyncParams): Promise<TraktSyncResponse> {
    return this.post<TraktSyncResponse>('/sync/collection', items)
  }

  /**
   * Remove items from collection
   */
  async removeFromCollection(items: TraktSyncParams): Promise<TraktSyncResponse> {
    return this.post<TraktSyncResponse>('/sync/collection/remove', items)
  }

  /**
   * Add movies to collection
   */
  async addMoviesToCollection(
    movies: (TraktMovie & {
        collected_at?: string
        audio?: string
        audio_channels?: string
        resolution?: string
        hdr?: string
        media_type?: string
      })[]
  ): Promise<TraktSyncResponse> {
    return this.addToCollection({ movies })
  }

  /**
   * Add shows to collection
   */
  async addShowsToCollection(
    shows: (TraktShow & {
        collected_at?: string
        seasons?: (TraktSeason & {
            collected_at?: string
            episodes?: (TraktEpisode & { collected_at?: string })[]
          })[]
      })[]
  ): Promise<TraktSyncResponse> {
    return this.addToCollection({ shows })
  }

  // Watchlist Management

  /**
   * Add items to watchlist
   */
  async addToWatchlist(items: TraktSyncParams): Promise<TraktSyncResponse> {
    return this.post<TraktSyncResponse>('/sync/watchlist', items)
  }

  /**
   * Remove items from watchlist
   */
  async removeFromWatchlist(items: TraktSyncParams): Promise<TraktSyncResponse> {
    return this.post<TraktSyncResponse>('/sync/watchlist/remove', items)
  }

  /**
   * Add movies to watchlist
   */
  async addMoviesToWatchlist(movies: TraktMovie[]): Promise<TraktSyncResponse> {
    return this.addToWatchlist({ movies })
  }

  /**
   * Add shows to watchlist
   */
  async addShowsToWatchlist(shows: TraktShow[]): Promise<TraktSyncResponse> {
    return this.addToWatchlist({ shows })
  }

  // Watch History Management

  /**
   * Add items to watch history
   * Marks items as watched with optional timestamp
   */
  async addToHistory(items: {
    movies?: (TraktMovie & { watched_at?: string })[]
    shows?: (TraktShow & {
        watched_at?: string
        seasons?: (TraktSeason & {
            watched_at?: string
            episodes?: (TraktEpisode & { watched_at?: string })[]
          })[]
      })[]
    episodes?: (TraktEpisode & { watched_at?: string })[]
  }): Promise<TraktSyncResponse> {
    return this.post<TraktSyncResponse>('/sync/history', items)
  }

  /**
   * Remove items from watch history
   */
  async removeFromHistory(items: TraktSyncParams): Promise<TraktSyncResponse> {
    return this.post<TraktSyncResponse>('/sync/history/remove', items)
  }

  /**
   * Mark movie as watched
   */
  async markMovieWatched(movie: TraktMovie, watchedAt?: string): Promise<TraktSyncResponse> {
    return this.addToHistory({
      movies: [{ ...movie, watched_at: watchedAt }],
    })
  }

  /**
   * Mark episode as watched
   */
  async markEpisodeWatched(episode: TraktEpisode, watchedAt?: string): Promise<TraktSyncResponse> {
    return this.addToHistory({
      episodes: [{ ...episode, watched_at: watchedAt }],
    })
  }

  // Ratings Management

  /**
   * Add ratings for items
   */
  async addRatings(items: {
    movies?: (TraktMovie & { rating: number; rated_at?: string })[]
    shows?: (TraktShow & { rating: number; rated_at?: string })[]
    seasons?: (TraktSeason & { rating: number; rated_at?: string })[]
    episodes?: (TraktEpisode & { rating: number; rated_at?: string })[]
  }): Promise<TraktSyncResponse> {
    return this.post<TraktSyncResponse>('/sync/ratings', items)
  }

  /**
   * Remove ratings for items
   */
  async removeRatings(items: TraktSyncParams): Promise<TraktSyncResponse> {
    return this.post<TraktSyncResponse>('/sync/ratings/remove', items)
  }

  /**
   * Rate a movie (1-10 scale)
   */
  async rateMovie(movie: TraktMovie, rating: number, ratedAt?: string): Promise<TraktSyncResponse> {
    return this.addRatings({
      movies: [{ ...movie, rating, rated_at: ratedAt }],
    })
  }

  /**
   * Rate a show (1-10 scale)
   */
  async rateShow(show: TraktShow, rating: number, ratedAt?: string): Promise<TraktSyncResponse> {
    return this.addRatings({
      shows: [{ ...show, rating, rated_at: ratedAt }],
    })
  }

  // Bulk Sync Operations

  /**
   * Get sync status for last sync operation
   */
  async getLastActivities(): Promise<{
    all: string
    movies: {
      watched_at: string
      collected_at: string
      rated_at: string
      watchlisted_at: string
      commented_at: string
      paused_at: string
      hidden_at: string
    }
    episodes: {
      watched_at: string
      collected_at: string
      rated_at: string
      watchlisted_at: string
      commented_at: string
      paused_at: string
    }
    shows: {
      rated_at: string
      watchlisted_at: string
      commented_at: string
      hidden_at: string
    }
    seasons: {
      rated_at: string
      watchlisted_at: string
      commented_at: string
      hidden_at: string
    }
    comments: {
      liked_at: string
    }
    lists: {
      liked_at: string
      updated_at: string
      commented_at: string
    }
  }> {
    return this.get('/sync/last_activities')
  }

  /**
   * Bulk sync multiple operations
   * Performs multiple sync operations in a single request
   */
  async bulkSync(operations: {
    addToCollection?: TraktSyncParams
    removeFromCollection?: TraktSyncParams
    addToWatchlist?: TraktSyncParams
    removeFromWatchlist?: TraktSyncParams
    addToHistory?: TraktSyncParams
    removeFromHistory?: TraktSyncParams
  }): Promise<{
    collection?: TraktSyncResponse
    watchlist?: TraktSyncResponse
    history?: TraktSyncResponse
  }> {
    const results: any = {}
    const promises: Promise<any>[] = []

    if (operations.addToCollection) {
      promises.push(
        this.addToCollection(operations.addToCollection).then(
          (result) => (results.collection = result)
        )
      )
    }

    if (operations.addToWatchlist) {
      promises.push(
        this.addToWatchlist(operations.addToWatchlist).then(
          (result) => (results.watchlist = result)
        )
      )
    }

    if (operations.addToHistory) {
      promises.push(
        this.addToHistory(operations.addToHistory).then((result) => (results.history = result))
      )
    }

    await Promise.all(promises)
    return results
  }

  // Playback Progress Methods

  /**
   * Get playback progress for in-progress items (continue watching)
   * Returns movies and episodes that are currently in progress
   */
  async getPlaybackProgress(params?: {
    type?: 'movies' | 'episodes'
    limit?: number
  }): Promise<TraktPlaybackItem[]> {
    return this.get<TraktPlaybackItem[]>('/sync/playback', params)
  }

  /**
   * Remove a playback progress item by ID
   * Removes an item from the continue watching list
   */
  async removePlaybackProgress(playbackId: number): Promise<void> {
    await this.delete(`/sync/playback/${playbackId}`)
  }
}
