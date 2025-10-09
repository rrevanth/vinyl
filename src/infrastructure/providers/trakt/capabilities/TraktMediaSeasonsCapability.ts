import type { Episode, IMediaSeasonsCapability, Season } from '@/src/domain/capabilities/IMediaSeasonsCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * Trakt Media Seasons Capability
 * Provides season and episode information for TV series
 */
export class TraktMediaSeasonsCapability implements IMediaSeasonsCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  async getSeasons(media: Media, seasonNumber?: number): Promise<Result<Season[]>> {
    try {
      if (media.type !== 'series') {
        throw new Error(`Cannot get seasons for non-series media: ${media.type}`)
      }

      // Extract Trakt ID
      const traktId = media.externalIds.trakt?.id
      if (!traktId) {
        throw new Error(`No Trakt ID found for series: ${media.title}`)
      }

      // Get seasons with extended data
      const seasonsData = await this.traktClient.shows.getSeasons(traktId, {
        extended: ['full', 'episodes'] as any,
      })

      // Filter to specific season if requested
      const filteredSeasons = seasonNumber !== undefined
        ? seasonsData.filter(s => s.number === seasonNumber)
        : seasonsData

      // Map to domain Season objects
      const seasons: Season[] = filteredSeasons.map(seasonData => ({
        id: `${traktId}-s${seasonData.number}`,
        seasonNumber: seasonData.number,
        name: seasonData.title || `Season ${seasonData.number}`,
        overview: seasonData.overview,
        airDate: seasonData.first_aired ? new Date(seasonData.first_aired) : undefined,
        episodeCount: seasonData.episode_count || 0,
        episodes: seasonData.episodes?.map(ep => this.mapEpisode(ep, seasonData.number)) || [],
        posterPath: seasonData.images?.poster?.[0],
      }))

      this.logger.debug(`Retrieved ${seasons.length} seasons for: ${media.title}`)
      return ok(seasons, "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get seasons for series: ${media.title}`, err)
      return fail(err, "trakt", "api_error")
    }
  }

  async getEpisode(media: Media, seasonNumber: number, episodeNumber: number): Promise<Result<Episode>> {
    try {
      if (media.type !== 'series') {
        throw new Error(`Cannot get episode for non-series media: ${media.type}`)
      }

      // Extract Trakt ID
      const traktId = media.externalIds.trakt?.id
      if (!traktId) {
        throw new Error(`No Trakt ID found for series: ${media.title}`)
      }

      // Get specific episode with extended data
      const episodeData = await this.traktClient.shows.getEpisodeDetails(
        traktId,
        seasonNumber,
        episodeNumber,
        {
          extended: 'full,images' as any,
        }
      )

      const episode = this.mapEpisode(episodeData, seasonNumber)

      this.logger.debug(`Retrieved episode S${seasonNumber}E${episodeNumber} for: ${media.title}`)
      return ok(episode, "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(
        `Failed to get episode S${seasonNumber}E${episodeNumber} for series: ${media.title}`,
        err
      )
      return fail(err, "trakt", "api_error")
    }
  }

  private mapEpisode(episodeData: any, seasonNumber: number): Episode {
    return {
      id: `${episodeData.ids?.trakt || episodeData.number}`,
      episodeNumber: episodeData.number,
      seasonNumber,
      name: episodeData.title || `Episode ${episodeData.number}`,
      overview: episodeData.overview,
      airDate: episodeData.first_aired ? new Date(episodeData.first_aired) : undefined,
      runtime: episodeData.runtime,
      stillPath: episodeData.images?.screenshot?.[0],
      voteAverage: episodeData.rating,
      voteCount: episodeData.votes,
    }
  }
}