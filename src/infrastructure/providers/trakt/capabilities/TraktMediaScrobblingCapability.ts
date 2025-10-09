import type { IMediaScrobblingCapability } from '@/src/domain/capabilities/IMediaScrobblingCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * Trakt Scrobbling Capability
 *
 * Manages real-time playback tracking and check-ins.
 * Maps Trakt /scrobble and /checkin APIs to domain scrobbling operations.
 *
 * Features:
 * - Start/pause/stop scrobbling for real-time tracking
 * - Check-in to media for social sharing
 * - Cancel active check-ins
 * - Support for both movies and episodes
 */
export class TraktMediaScrobblingCapability implements IMediaScrobblingCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Start scrobbling (tracking playback progress)
   */
  async startScrobble(
    media: Media,
    progress: number,
    episodeInfo?: { season: number; episode: number }
  ): Promise<Result<void>> {
    try {
      this.logger.info('[TraktMediaScrobblingCapability] Starting scrobble', {
        mediaId: media.stableId,
        type: media.type,
        progress,
        episodeInfo,
      })

      // Extract Trakt ID
      const traktId = media.externalIds.trakt?.id
      if (!traktId) {
        throw new Error(`Missing Trakt ID for media: ${media.stableId}`)
      }

      if (media.type === 'movie') {
        await this.traktClient.sync.startScrobbleMovie(
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
          progress
        )
      } else {
        if (!episodeInfo) {
          throw new Error('Episode info required for series scrobbling')
        }

        await this.traktClient.sync.startScrobbleEpisode(
          {
            season: episodeInfo.season,
            number: episodeInfo.episode,
            ids: {
              trakt: Number(traktId),
              slug: '',
            },
          },
          progress,
          {
            title: media.title,
            year: media.year || 0,
            ids: {
              trakt: Number(traktId),
              slug: '',
            },
          }
        )
      }

      this.logger.info('[TraktMediaScrobblingCapability] Started scrobble', {
        mediaId: media.stableId,
      })
      return ok(undefined, "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('[TraktMediaScrobblingCapability] Failed to start scrobble', err, {
        mediaId: media.stableId,
      })
      return fail(err, "trakt", "api_error")
    }
  }

  /**
   * Pause scrobbling
   */
  async pauseScrobble(
    media: Media,
    progress: number,
    episodeInfo?: { season: number; episode: number }
  ): Promise<Result<void>> {
    try {
      this.logger.info('[TraktMediaScrobblingCapability] Pausing scrobble', {
        mediaId: media.stableId,
        type: media.type,
        progress,
        episodeInfo,
      })

      // Extract Trakt ID
      const traktId = media.externalIds.trakt?.id
      if (!traktId) {
        throw new Error(`Missing Trakt ID for media: ${media.stableId}`)
      }

      const scrobbleData =
        media.type === 'movie'
          ? {
              movie: {
                title: media.title,
                year: media.year || 0,
                ids: {
                  trakt: Number(traktId),
                  slug: '',
                  tmdb: media.externalIds.tmdb?.id ? Number(media.externalIds.tmdb.id) : undefined,
                  imdb: media.externalIds.imdb?.id,
                },
              },
            }
          : episodeInfo
            ? {
                episode: {
                  season: episodeInfo.season,
                  number: episodeInfo.episode,
                  ids: {
                    trakt: Number(traktId),
                    slug: '',
                  },
                },
                show: {
                  title: media.title,
                  year: media.year || 0,
                  ids: {
                    trakt: Number(traktId),
                    slug: '',
                  },
                },
              }
            : null

      if (!scrobbleData) {
        throw new Error('Episode info required for series scrobbling')
      }

      await this.traktClient.sync.pauseScrobble(scrobbleData, progress)

      this.logger.info('[TraktMediaScrobblingCapability] Paused scrobble', {
        mediaId: media.stableId,
      })
      return ok(undefined, "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('[TraktMediaScrobblingCapability] Failed to pause scrobble', err, {
        mediaId: media.stableId,
      })
      return fail(err, "trakt", "api_error")
    }
  }

  /**
   * Stop scrobbling (end playback tracking)
   */
  async stopScrobble(
    media: Media,
    progress: number,
    episodeInfo?: { season: number; episode: number }
  ): Promise<Result<void>> {
    try {
      this.logger.info('[TraktMediaScrobblingCapability] Stopping scrobble', {
        mediaId: media.stableId,
        type: media.type,
        progress,
        episodeInfo,
      })

      // Extract Trakt ID
      const traktId = media.externalIds.trakt?.id
      if (!traktId) {
        throw new Error(`Missing Trakt ID for media: ${media.stableId}`)
      }

      const scrobbleData =
        media.type === 'movie'
          ? {
              movie: {
                title: media.title,
                year: media.year || 0,
                ids: {
                  trakt: Number(traktId),
                  slug: '',
                  tmdb: media.externalIds.tmdb?.id ? Number(media.externalIds.tmdb.id) : undefined,
                  imdb: media.externalIds.imdb?.id,
                },
              },
            }
          : episodeInfo
            ? {
                episode: {
                  season: episodeInfo.season,
                  number: episodeInfo.episode,
                  ids: {
                    trakt: Number(traktId),
                    slug: '',
                  },
                },
                show: {
                  title: media.title,
                  year: media.year || 0,
                  ids: {
                    trakt: Number(traktId),
                    slug: '',
                  },
                },
              }
            : null

      if (!scrobbleData) {
        throw new Error('Episode info required for series scrobbling')
      }

      await this.traktClient.sync.stopScrobble(scrobbleData, progress)

      this.logger.info('[TraktMediaScrobblingCapability] Stopped scrobble', {
        mediaId: media.stableId,
      })
      return ok(undefined, "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('[TraktMediaScrobblingCapability] Failed to stop scrobble', err, {
        mediaId: media.stableId,
      })
      return fail(err, "trakt", "api_error")
    }
  }

  /**
   * Check-in to media (social feature for sharing what you're watching)
   */
  async checkin(
    media: Media,
    message?: string,
    episodeInfo?: { season: number; episode: number }
  ): Promise<Result<void>> {
    try {
      this.logger.info('[TraktMediaScrobblingCapability] Checking in', {
        mediaId: media.stableId,
        type: media.type,
        episodeInfo,
      })

      // Extract Trakt ID
      const traktId = media.externalIds.trakt?.id
      if (!traktId) {
        throw new Error(`Missing Trakt ID for media: ${media.stableId}`)
      }

      if (media.type === 'movie') {
        await this.traktClient.sync.checkinMovie(
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
          { message }
        )
      } else {
        if (!episodeInfo) {
          throw new Error('Episode info required for series check-in')
        }

        await this.traktClient.sync.checkinEpisode(
          {
            season: episodeInfo.season,
            number: episodeInfo.episode,
            ids: {
              trakt: Number(traktId),
              slug: '',
            },
          },
          {
            title: media.title,
            year: media.year || 0,
            ids: {
              trakt: Number(traktId),
              slug: '',
            },
          },
          { message }
        )
      }

      this.logger.info('[TraktMediaScrobblingCapability] Checked in', {
        mediaId: media.stableId,
      })
      return ok(undefined, "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('[TraktMediaScrobblingCapability] Failed to check in', err, {
        mediaId: media.stableId,
      })
      return fail(err, "trakt", "api_error")
    }
  }

  /**
   * Cancel an active check-in
   */
  async cancelCheckin(): Promise<Result<void>> {
    try {
      this.logger.info('[TraktMediaScrobblingCapability] Canceling check-in')

      await this.traktClient.sync.cancelCheckin()

      this.logger.info('[TraktMediaScrobblingCapability] Canceled check-in')
      return ok(undefined, "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('[TraktMediaScrobblingCapability] Failed to cancel check-in', err)
      return fail(err, "trakt", "api_error")
    }
  }

  /**
   * Indicates whether this capability requires authentication
   */
  requiresAuth(): boolean {
    return true
  }
}