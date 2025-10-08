import type { ILoggingService } from '../../../domain/services/ILoggingService'
import type { EffectiveTraktConfig, TraktConfigFactory } from '../../factories/TraktConfigFactory'
import { TraktBaseClient } from './TraktBaseClient'
import { TraktCalendarClient } from './clients/TraktCalendarClient'
import { TraktMoviesClient } from './clients/TraktMoviesClient'
import { TraktPeopleClient } from './clients/TraktPeopleClient'
import { TraktSearchClient } from './clients/TraktSearchClient'
import { TraktShowsClient } from './clients/TraktShowsClient'
import { TraktSyncClient } from './clients/TraktSyncClient'
import { TraktUsersClient } from './clients/TraktUsersClient'

/**
 * Unified Trakt API client
 *
 * Provides access to all Trakt functionality through specialized client properties.
 * This is the main entry point for all Trakt API interactions in the application.
 *
 * Features:
 * - Composition of all specialized Trakt clients
 * - Shared OAuth authentication and configuration
 * - Single point of access for providers and UI components
 * - Unified error handling and retry logic
 * - Complete OAuth 2.0 flow management
 */
export class TraktClient {
  // Specialized client properties for logical grouping
  readonly movies: TraktMoviesClient
  readonly shows: TraktShowsClient
  readonly calendar: TraktCalendarClient
  readonly search: TraktSearchClient
  readonly users: TraktUsersClient
  readonly sync: TraktSyncClient
  readonly people: TraktPeopleClient

  // Base client for direct access to authentication methods
  readonly base: TraktBaseClient

  constructor(configFactory: TraktConfigFactory, logger: ILoggingService) {
    // Initialize base client with shared configuration
    this.base = new TraktBaseClient(configFactory, logger)

    // Initialize all specialized clients
    // Each client inherits the OAuth authentication from base client
    this.movies = new TraktMoviesClient(configFactory, logger)
    this.shows = new TraktShowsClient(configFactory, logger)
    this.calendar = new TraktCalendarClient(configFactory, logger)
    this.search = new TraktSearchClient(configFactory, logger)
    this.users = new TraktUsersClient(configFactory, logger)
    this.sync = new TraktSyncClient(configFactory, logger)
    this.people = new TraktPeopleClient(configFactory, logger)
  }

  /**
   * Get current effective Trakt configuration
   * Useful for debugging and logging
   */
  getCurrentConfig(): EffectiveTraktConfig {
    return this.base.getCurrentConfig()
  }

  /**
   * Check if client is authenticated and ready for API calls
   */
  isAuthenticated(): boolean {
    return this.base.isAuthenticated()
  }

  /**
   * Get OAuth authorization URL for authentication flow
   */
  getAuthorizationUrl(state?: string): string {
    return this.base.getAuthorizationUrl(state)
  }

  /**
   * Exchange authorization code for access token
   * Call this after user completes OAuth flow
   */
  async exchangeCodeForToken(code: string, state?: string) {
    return this.base.exchangeCodeForToken(code, state)
  }

  /**
   * Generate device code for device authentication flow
   * Use for devices without web browser access
   */
  async generateDeviceCode() {
    return this.base.generateDeviceCode()
  }

  /**
   * Poll for device token during device authentication
   * Keep calling until user authorizes on their device
   */
  async pollForDeviceToken(deviceCode: string) {
    return this.base.pollForDeviceToken(deviceCode)
  }

  /**
   * Revoke current access token and log out user
   */
  async revokeToken(): Promise<void> {
    return this.base.revokeToken()
  }

  /**
   * Clean up resources and subscriptions
   *
   * This method should be called when the client is no longer needed to prevent memory leaks.
   * It cleans up all reactive subscriptions and specialized client instances.
   *
   * Usage:
   * ```typescript
   * const trakt = container.resolve<TraktClient>(TOKENS.TraktClient)
   * // ... use client
   * trakt.destroy() // Clean up when done
   * ```
   */
  destroy(): void {
    this.base.destroy()
    this.movies.destroy()
    this.shows.destroy()
    this.calendar.destroy()
    this.search.destroy()
    this.users.destroy()
    this.sync.destroy()
    this.people.destroy()
  }

  // Convenience methods for common operations

  /**
   * Quick authentication check with user profile
   * Returns null if not authenticated
   */
  async validateAuthentication() {
    return this.users.validateAuthentication()
  }

  /**
   * Get comprehensive dashboard data for authenticated user
   */
  async getDashboardData() {
    if (!this.isAuthenticated()) {
      throw new Error('Authentication required for dashboard data')
    }

    const [profile, stats, upcomingShows, recentHistory, watchlist] = await Promise.all([
      this.users.getMyProfile({ extended: 'full' }),
      this.users.getMyStats(),
      this.calendar.getUpcomingEpisodes({ extended: 'full' }),
      this.users.getMyHistory({ limit: 10, extended: 'full' }),
      this.users.getMyWatchlist({ limit: 10, extended: 'full' }),
    ])

    return {
      profile,
      stats,
      upcomingShows,
      recentHistory,
      watchlist,
    }
  }

  /**
   * Quick movie lookup with complete data
   */
  async getCompleteMovieData(movieId: string | number) {
    const [details, comments, ratings, related] = await Promise.all([
      this.movies.getDetails(movieId, { extended: 'full,images' }),
      this.movies.getComments(movieId, { limit: 10, sort: 'likes' }),
      this.movies.getRatings(movieId),
      this.movies.getRelated(movieId, { limit: 10, extended: 'full' }),
    ])

    return { details, comments, ratings, related }
  }

  /**
   * Quick show lookup with complete data
   */
  async getCompleteShowData(showId: string | number) {
    const [details, seasons, comments, ratings, related, nextEpisode] = await Promise.all([
      this.shows.getDetails(showId, { extended: 'full,images' }),
      this.shows.getSeasons(showId, { extended: 'full' }),
      this.shows.getComments(showId, { limit: 10, sort: 'likes' }),
      this.shows.getRatings(showId),
      this.shows.getRelated(showId, { limit: 10, extended: 'full' }),
      this.shows.getNextEpisode(showId, { extended: 'full' }).catch(() => null),
    ])

    return { details, seasons, comments, ratings, related, nextEpisode }
  }

  /**
   * Smart search with comprehensive results
   */
  async smartSearch(query: string, options?: { limit?: number }) {
    return this.search.comprehensiveSearch(query, {
      extended: 'full',
      limit: options?.limit || 10,
    })
  }

  /**
   * Quick check-in for currently watching
   */
  async quickCheckin(
    media: {
      movie?: { title: string; year: number; ids: any }
      episode?: { season: number; number: number; ids: any }
      show?: { title: string; year: number; ids: any }
    },
    message?: string
  ) {
    if (media.movie) {
      return this.sync.checkinMovie(media.movie, { message })
    } else if (media.episode) {
      return this.sync.checkinEpisode(media.episode, media.show, { message })
    } else {
      throw new Error('Must provide either movie or episode for check-in')
    }
  }

  /**
   * Quick add to watchlist
   */
  async quickAddToWatchlist(items: {
    movies?: { title: string; year: number; ids: any }[]
    shows?: { title: string; year: number; ids: any }[]
  }) {
    return this.sync.addToWatchlist(items)
  }

  /**
   * Mark as watched with current timestamp
   */
  async markAsWatched(media: {
    movie?: { title: string; year: number; ids: any }
    episode?: { season: number; number: number; ids: any }
  }) {
    const watchedAt = new Date().toISOString()

    if (media.movie) {
      return this.sync.markMovieWatched(media.movie, watchedAt)
    } else if (media.episode) {
      return this.sync.markEpisodeWatched(media.episode, watchedAt)
    } else {
      throw new Error('Must provide either movie or episode to mark as watched')
    }
  }
}
