import type { IMediaContinueWatchingCapability, ContinueWatchingItem } from '@/src/domain/capabilities/IMediaContinueWatchingCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import { TraktMediaMapper } from '@/src/infrastructure/providers/trakt/mappers/TraktMediaMapper'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * Trakt Continue Watching Capability
 *
 * Manages playback progress for in-progress media items.
 * Maps Trakt /sync/playback API to domain continue watching operations.
 *
 * Features:
 * - Get continue watching list with playback progress
 * - Remove items from continue watching
 * - Clear all continue watching items
 * - Maps Trakt playback items to domain ContinueWatchingItem
 */
export class TraktMediaContinueWatchingCapability implements IMediaContinueWatchingCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get the list of media items currently in progress
   */
  async getContinueWatching(params?: {
    limit?: number
    type?: 'movies' | 'episodes'
  }): Promise<Result<ContinueWatchingItem[]>> {
    try {
      this.logger.info('[TraktMediaContinueWatchingCapability] Fetching continue watching', { params })

      const playbackItems = await this.traktClient.sync.getPlaybackProgress(params)

      const continueWatchingItems: ContinueWatchingItem[] = playbackItems.map((item) => {
        // Determine media type and convert to Media entity
        const isEpisode = item.type === 'episode'
        const media = isEpisode && item.show
          ? TraktMediaMapper.showToMedia(item.show)
          : item.movie
            ? TraktMediaMapper.movieToMedia(item.movie)
            : null

        if (!media) {
          this.logger.warn('[TraktMediaContinueWatchingCapability] Missing media data', { item })
          return null
        }

        // Build continue watching item
        const continueWatchingItem: ContinueWatchingItem = {
          playbackId: item.id,
          progress: item.progress,
          pausedAt: new Date(item.paused_at),
          type: item.type,
          media,
        }

        // Add episode info if available
        if (isEpisode && item.episode) {
          continueWatchingItem.episode = {
            season: item.episode.season,
            number: item.episode.number,
            title: item.episode.title || '',
            ids: {
              trakt: item.episode.ids.trakt.toString(),
              tmdb: item.episode.ids.tmdb?.toString(),
              imdb: item.episode.ids.imdb,
            },
          }
        }

        return continueWatchingItem
      }).filter((item): item is ContinueWatchingItem => item !== null)

      this.logger.info('[TraktMediaContinueWatchingCapability] Fetched continue watching', {
        count: continueWatchingItems.length,
      })

      return ok(continueWatchingItems, 'trakt')
    } catch (error) {
      this.logger.error('[TraktMediaContinueWatchingCapability] Failed to fetch continue watching', error as Error)
      return fail(error as Error, 'trakt', 'api_error')
    }
  }

  /**
   * Remove a media item from the continue watching list
   */
  async removeFromContinueWatching(media: Media): Promise<Result<void>> {
    try {
      this.logger.info('[TraktMediaContinueWatchingCapability] Removing from continue watching', {
        mediaId: media.stableId,
      })

      // Get current continue watching to find playback ID
      const continueWatchingResult = await this.getContinueWatching()
      if (!continueWatchingResult.success) {
        return fail(continueWatchingResult.error, 'trakt', continueWatchingResult.reason)
      }

      const item = continueWatchingResult.data.find((cw) => cw.media.stableId === media.stableId)

      if (!item) {
        this.logger.warn('[TraktMediaContinueWatchingCapability] Media not found in continue watching', {
          mediaId: media.stableId,
        })
        return ok(undefined, 'trakt')
      }

      await this.traktClient.sync.removePlaybackProgress(item.playbackId)

      this.logger.info('[TraktMediaContinueWatchingCapability] Removed from continue watching', {
        mediaId: media.stableId,
        playbackId: item.playbackId,
      })

      return ok(undefined, 'trakt')
    } catch (error) {
      this.logger.error('[TraktMediaContinueWatchingCapability] Failed to remove from continue watching', error as Error, {
        mediaId: media.stableId,
      })
      return fail(error as Error, 'trakt', 'api_error')
    }
  }

  /**
   * Clear all items from the continue watching list
   */
  async clearContinueWatching(): Promise<Result<void>> {
    try {
      this.logger.info('[TraktMediaContinueWatchingCapability] Clearing continue watching')

      const continueWatchingResult = await this.getContinueWatching()
      if (!continueWatchingResult.success) {
        return fail(continueWatchingResult.error, 'trakt', continueWatchingResult.reason)
      }

      await Promise.all(
        continueWatchingResult.data.map((item) =>
          this.traktClient.sync.removePlaybackProgress(item.playbackId)
        )
      )

      this.logger.info('[TraktMediaContinueWatchingCapability] Cleared continue watching', {
        count: continueWatchingResult.data.length,
      })

      return ok(undefined, 'trakt')
    } catch (error) {
      this.logger.error('[TraktMediaContinueWatchingCapability] Failed to clear continue watching', error as Error)
      return fail(error as Error, 'trakt', 'api_error')
    }
  }

  /**
   * Indicates whether this capability requires authentication
   */
  requiresAuth(): boolean {
    return true
  }
}