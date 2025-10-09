import type {
  IMediaWatchProgressCapability,
  WatchProgress,
  MovieWatchProgress,
  SeriesWatchProgress,
  SeasonProgress,
  EpisodeProgress,
} from '@/src/domain/capabilities/IMediaWatchProgressCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * Trakt Watch Progress Capability
 *
 * Tracks watch progress for movies and TV series.
 * Maps Trakt /shows/{id}/progress/watched and /sync/watched APIs to domain progress operations.
 *
 * Features:
 * - Get detailed watch progress for movies and series
 * - Mark episodes/movies as watched
 * - Mark episodes/movies as unwatched
 * - Track per-episode and per-season progress
 */
export class TraktMediaWatchProgressCapability implements IMediaWatchProgressCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get watch progress for a media item
   */
  async getProgress(media: Media): Promise<Result<WatchProgress>> {
    // Extract Trakt ID
    const traktId = media.externalIds.trakt?.id
    if (!traktId) {
      this.logger.warn('[TraktMediaWatchProgressCapability] Missing Trakt ID', {
        mediaId: media.stableId,
      })
      return fail(new Error(`Missing Trakt ID for media: ${media.stableId}`), 'trakt', 'missing_id')
    }

    try {
      this.logger.info('[TraktMediaWatchProgressCapability] Fetching progress', {
        mediaId: media.stableId,
        type: media.type,
      })

      if (media.type === 'movie') {
        return this.getMovieProgress(media, traktId)
      } else {
        return this.getSeriesProgress(media, traktId)
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('[TraktMediaWatchProgressCapability] Failed to fetch progress', err, {
        mediaId: media.stableId,
      })
      return fail(err, 'trakt', 'api_error')
    }
  }

  /**
   * Get watch progress for a movie
   */
  private async getMovieProgress(media: Media, traktId: string): Promise<Result<WatchProgress>> {
    // Get watch history for this movie
    const history = await this.traktClient.users.getMovieHistory('me', { item_id: Number(traktId) })

    const watched = history.length > 0
    const plays = history.length
    const lastWatchedAt = history.length > 0 ? new Date(history[0].watched_at) : undefined

    const movieProgress: MovieWatchProgress = {
      watched,
      plays,
      lastWatchedAt,
    }

    const result: WatchProgress = {
      mediaId: media.stableId,
      mediaType: 'movie',
      movie: movieProgress,
      lastUpdated: new Date(),
    }

    return ok(result, 'trakt', { cached: false })
  }

  /**
   * Get watch progress for a TV series
   */
  private async getSeriesProgress(media: Media, traktId: string): Promise<Result<WatchProgress>> {
    // Get show progress from Trakt
    const showProgress = await this.traktClient.shows.getProgress(traktId, {
      hidden: false,
      specials: false,
      count_specials: true,
    })

    // Map seasons
    const seasons: SeasonProgress[] = showProgress.seasons.map((traktSeason) => {
      const episodes: EpisodeProgress[] = traktSeason.episodes.map((traktEp) => ({
        number: traktEp.number,
        completed: traktEp.completed,
        lastWatchedAt: traktEp.last_watched_at ? new Date(traktEp.last_watched_at) : undefined,
        plays: traktEp.plays,
      }))

      return {
        number: traktSeason.number,
        title: traktSeason.title,
        aired: traktSeason.aired,
        completed: traktSeason.completed,
        episodes,
      }
    })

    const seriesProgress: SeriesWatchProgress = {
      aired: showProgress.aired,
      completed: showProgress.completed,
      lastWatchedAt: showProgress.last_watched_at ? new Date(showProgress.last_watched_at) : undefined,
      resetAt: showProgress.reset_at ? new Date(showProgress.reset_at) : undefined,
      seasons,
      nextEpisode: showProgress.next_episode
        ? {
            season: showProgress.next_episode.season,
            number: showProgress.next_episode.number,
            title: showProgress.next_episode.title,
            ids: {
              trakt: showProgress.next_episode.ids.trakt.toString(),
              tmdb: showProgress.next_episode.ids.tmdb?.toString(),
            },
          }
        : undefined,
      lastEpisode: showProgress.last_episode
        ? {
            season: showProgress.last_episode.season,
            number: showProgress.last_episode.number,
            title: showProgress.last_episode.title,
            ids: {
              trakt: showProgress.last_episode.ids.trakt.toString(),
              tmdb: showProgress.last_episode.ids.tmdb?.toString(),
            },
          }
        : undefined,
    }

    const result: WatchProgress = {
      mediaId: media.stableId,
      mediaType: 'series',
      series: seriesProgress,
      lastUpdated: new Date(),
    }

    return ok(result, 'trakt', { cached: false })
  }

  /**
   * Mark media as watched
   */
  async markAsWatched(media: Media, episodeInfo?: { season: number; episode: number }): Promise<Result<void>> {
    // Extract Trakt ID
    const traktId = media.externalIds.trakt?.id
    if (!traktId) {
      this.logger.warn('[TraktMediaWatchProgressCapability] Missing Trakt ID', {
        mediaId: media.stableId,
      })
      return fail(
        new Error(`Missing Trakt ID for media: ${media.stableId}`),
        'trakt',
        'missing_id'
      )
    }

    try {
      this.logger.info('[TraktMediaWatchProgressCapability] Marking as watched', {
        mediaId: media.stableId,
        type: media.type,
        episodeInfo,
      })

      const watchedAt = new Date().toISOString()

      if (media.type === 'movie') {
        await this.traktClient.sync.markMovieWatched(
          {
            title: media.title,
            year: media.year || 0,
            ids: {
              trakt: Number(traktId),
              slug: '',
              tmdb: media.externalIds.tmdb?.id ? Number(media.externalIds.tmdb.id) : undefined,
              imdb: media.externalIds.imdb?.id,
            },
          },
          watchedAt
        )
      } else {
        if (!episodeInfo) {
          return fail(
            new Error('Episode info required for series'),
            'trakt',
            'missing_id'
          )
        }

        await this.traktClient.sync.markEpisodeWatched(
          {
            season: episodeInfo.season,
            number: episodeInfo.episode,
            ids: {
              trakt: Number(traktId),
              slug: '',
            },
          },
          watchedAt
        )
      }

      this.logger.info('[TraktMediaWatchProgressCapability] Marked as watched', {
        mediaId: media.stableId,
      })

      return ok(undefined, 'trakt')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('[TraktMediaWatchProgressCapability] Failed to mark as watched', err, {
        mediaId: media.stableId,
      })
      return fail(err, 'trakt', 'api_error')
    }
  }

  /**
   * Mark media as unwatched
   */
  async markAsUnwatched(media: Media, episodeInfo?: { season: number; episode: number }): Promise<Result<void>> {
    // Extract Trakt ID
    const traktId = media.externalIds.trakt?.id
    if (!traktId) {
      this.logger.warn('[TraktMediaWatchProgressCapability] Missing Trakt ID', {
        mediaId: media.stableId,
      })
      return fail(
        new Error(`Missing Trakt ID for media: ${media.stableId}`),
        'trakt',
        'missing_id'
      )
    }

    try {
      this.logger.info('[TraktMediaWatchProgressCapability] Marking as unwatched', {
        mediaId: media.stableId,
        type: media.type,
        episodeInfo,
      })

      if (media.type === 'movie') {
        await this.traktClient.sync.removeFromHistory({
          movies: [
            {
              title: media.title,
              year: media.year || 0,
              ids: {
                trakt: Number(traktId),
                slug: '',
                tmdb: media.externalIds.tmdb?.id ? Number(media.externalIds.tmdb.id) : undefined,
                imdb: media.externalIds.imdb?.id,
              },
            },
          ],
        })
      } else {
        if (!episodeInfo) {
          return fail(
            new Error('Episode info required for series'),
            'trakt',
            'missing_id'
          )
        }

        await this.traktClient.sync.removeFromHistory({
          episodes: [
            {
              season: episodeInfo.season,
              number: episodeInfo.episode,
              ids: {
                trakt: Number(traktId),
                slug: '',
              },
            },
          ],
        })
      }

      this.logger.info('[TraktMediaWatchProgressCapability] Marked as unwatched', {
        mediaId: media.stableId,
      })

      return ok(undefined, 'trakt')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('[TraktMediaWatchProgressCapability] Failed to mark as unwatched', err, {
        mediaId: media.stableId,
      })
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