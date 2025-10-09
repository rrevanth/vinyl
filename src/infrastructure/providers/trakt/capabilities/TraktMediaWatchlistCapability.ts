import type { IMediaWatchlistCapability, WatchlistItem } from '@/src/domain/capabilities/IMediaWatchlistCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import { TraktMediaMapper } from '@/src/infrastructure/providers/trakt/mappers/TraktMediaMapper'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * Trakt Watchlist Capability
 *
 * Manages user's watchlist for movies and TV shows.
 * Maps Trakt /sync/watchlist APIs to domain watchlist operations.
 *
 * Features:
 * - Get user's watchlist with sorting options
 * - Add media to watchlist (single or bulk)
 * - Remove media from watchlist (single or bulk)
 * - Convert Trakt watchlist items to domain WatchlistItem
 */
export class TraktMediaWatchlistCapability implements IMediaWatchlistCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get the user's watchlist
   */
  async getWatchlist(params?: {
    type?: 'movies' | 'shows'
    sort?: 'added' | 'released' | 'title'
    limit?: number
  }): Promise<Result<WatchlistItem[]>> {
    try {
      this.logger.info('[TraktMediaWatchlistCapability] Fetching watchlist', { params })

      const traktWatchlist = await this.traktClient.users.getMyWatchlist({
        type: params?.type,
        sort: params?.sort || 'added',
        limit: params?.limit,
      })

      const watchlistItems: WatchlistItem[] = traktWatchlist
        .map((item) => {
          // Convert Trakt item to Media
          const media =
            item.type === 'movie' && item.movie
              ? TraktMediaMapper.movieToMedia(item.movie)
              : item.type === 'show' && item.show
                ? TraktMediaMapper.showToMedia(item.show)
                : null

          if (!media) {
            this.logger.warn('[TraktMediaWatchlistCapability] Missing media data in watchlist item', { item })
            return null
          }

          const watchlistItem: WatchlistItem = {
            media,
            addedAt: new Date(item.listed_at),
            sort: item.rank,
          }

          return watchlistItem
        })
        .filter((item): item is WatchlistItem => item !== null)

      this.logger.info('[TraktMediaWatchlistCapability] Fetched watchlist', {
        count: watchlistItems.length,
      })

      return ok(watchlistItems, 'trakt', { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('[TraktMediaWatchlistCapability] Failed to fetch watchlist', err)
      return fail(err, 'trakt', 'api_error')
    }
  }

  /**
   * Add media to the watchlist
   */
  async addToWatchlist(media: Media | Media[]): Promise<Result<void>> {
    try {
      const mediaArray = Array.isArray(media) ? media : [media]
      this.logger.info('[TraktMediaWatchlistCapability] Adding to watchlist', {
        count: mediaArray.length,
      })

      // Separate movies and shows
      const movies: any[] = []
      const shows: any[] = []

      for (const item of mediaArray) {
        const traktId = item.externalIds.trakt?.id
        if (!traktId) {
          this.logger.warn('[TraktMediaWatchlistCapability] Missing Trakt ID', {
            mediaId: item.stableId,
          })
          continue
        }

        const traktItem = {
          title: item.title,
          year: item.year || 0,
          ids: {
            trakt: Number(traktId),
            slug: '',
            tmdb: item.externalIds.tmdb?.id ? Number(item.externalIds.tmdb.id) : undefined,
            imdb: item.externalIds.imdb?.id,
          },
        }

        if (item.type === 'movie') {
          movies.push(traktItem)
        } else {
          shows.push(traktItem)
        }
      }

      // Add to watchlist
      if (movies.length > 0 || shows.length > 0) {
        await this.traktClient.sync.addToWatchlist({
          movies: movies.length > 0 ? movies : undefined,
          shows: shows.length > 0 ? shows : undefined,
        })
      }

      this.logger.info('[TraktMediaWatchlistCapability] Added to watchlist', {
        moviesAdded: movies.length,
        showsAdded: shows.length,
      })
      return ok(undefined, 'trakt', { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('[TraktMediaWatchlistCapability] Failed to add to watchlist', err)
      return fail(err, 'trakt', 'api_error')
    }
  }

  /**
   * Remove media from the watchlist
   */
  async removeFromWatchlist(media: Media | Media[]): Promise<Result<void>> {
    try {
      const mediaArray = Array.isArray(media) ? media : [media]
      this.logger.info('[TraktMediaWatchlistCapability] Removing from watchlist', {
        count: mediaArray.length,
      })

      // Separate movies and shows
      const movies: any[] = []
      const shows: any[] = []

      for (const item of mediaArray) {
        const traktId = item.externalIds.trakt?.id
        if (!traktId) {
          this.logger.warn('[TraktMediaWatchlistCapability] Missing Trakt ID', {
            mediaId: item.stableId,
          })
          continue
        }

        const traktItem = {
          title: item.title,
          year: item.year || 0,
          ids: {
            trakt: Number(traktId),
            slug: '',
            tmdb: item.externalIds.tmdb?.id ? Number(item.externalIds.tmdb.id) : undefined,
            imdb: item.externalIds.imdb?.id,
          },
        }

        if (item.type === 'movie') {
          movies.push(traktItem)
        } else {
          shows.push(traktItem)
        }
      }

      // Remove from watchlist
      if (movies.length > 0 || shows.length > 0) {
        await this.traktClient.sync.removeFromWatchlist({
          movies: movies.length > 0 ? movies : undefined,
          shows: shows.length > 0 ? shows : undefined,
        })
      }

      this.logger.info('[TraktMediaWatchlistCapability] Removed from watchlist', {
        moviesRemoved: movies.length,
        showsRemoved: shows.length,
      })
      return ok(undefined, 'trakt', { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('[TraktMediaWatchlistCapability] Failed to remove from watchlist', err)
      return fail(err, 'trakt', 'api_error')
    }
  }

  /**
   * Indicates whether this capability requires authentication
   */
  requiresAuth(): boolean {
    return true
  }
}