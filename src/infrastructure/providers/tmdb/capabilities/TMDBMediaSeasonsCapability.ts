import type {
  IMediaSeasonsCapability,
  Season,
  Episode,
} from '../../../../domain/capabilities/IMediaSeasonsCapability'
import type { Media } from '../../../../domain/entities/Media'
import type { TMDBDetailCache } from '../cache/TMDBDetailCache'
import type { TMDBClient } from '../../../api/tmdb/TMDBClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'

/**
 * TMDB Media Seasons Capability
 *
 * Retrieves season and episode data for TV series.
 * Uses both cached TV details and additional API calls for episode-specific data.
 */
export class TMDBMediaSeasonsCapability implements IMediaSeasonsCapability {
  constructor(
    private readonly cache: TMDBDetailCache,
    private readonly tmdbClient: TMDBClient,
    private readonly logger: ILoggingService
  ) {}

  async getSeasons(media: Media, seasonNumber?: number): Promise<Season[]> {
    try {
      if (media.type !== 'series') {
        throw new Error(`Season data only available for series, got: ${media.type}`)
      }

      // Extract TMDB ID from media's external IDs
      const tmdbId = this.extractTMDBId(media)
      if (!tmdbId) {
        throw new Error(`No TMDB ID found for series: ${media.title}`)
      }

      // Get cached TV details which includes basic season info
      const tvDetails = await this.cache.getOrFetchTVDetails(tmdbId)

      if (!tvDetails.seasons || tvDetails.seasons.length === 0) {
        return []
      }

      // Filter for specific season if requested
      const seasonsToProcess = seasonNumber
        ? tvDetails.seasons.filter((s: any) => s.season_number === seasonNumber)
        : tvDetails.seasons

      // Fetch detailed season data including episodes
      const seasons = await Promise.all(
        seasonsToProcess.map(async (seasonData: any) => {
          try {
            return await this.getDetailedSeason(tmdbId, seasonData)
          } catch (error) {
            this.logger.warn(
              `Failed to get detailed season data for season ${seasonData.season_number}`,
              error as Error
            )
            // Return basic season data if detailed fetch fails
            return this.mapBasicSeason(seasonData)
          }
        })
      )

      this.logger.debug(`Retrieved ${seasons.length} seasons for series ${tmdbId}`, {
        title: media.title,
        seasonNumbers: seasons.map((s) => s.seasonNumber),
      })

      return seasons
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get seasons for series: ${media.title}`, err)
      throw err
    }
  }

  async getEpisode(media: Media, seasonNumber: number, episodeNumber: number): Promise<Episode> {
    try {
      if (media.type !== 'series') {
        throw new Error(`Episode data only available for series, got: ${media.type}`)
      }

      // Extract TMDB ID from media's external IDs
      const tmdbId = this.extractTMDBId(media)
      if (!tmdbId) {
        throw new Error(`No TMDB ID found for series: ${media.title}`)
      }

      // Get specific episode details from TMDB API
      const episodeDetails = await this.tmdbClient.tv.getEpisodeDetails(
        tmdbId,
        seasonNumber,
        episodeNumber
      )

      const episode = this.mapEpisode(episodeDetails)

      this.logger.debug(
        `Retrieved episode S${seasonNumber}E${episodeNumber} for series ${tmdbId}`,
        {
          title: media.title,
          episodeName: episode.name,
        }
      )

      return episode
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(
        `Failed to get episode S${seasonNumber}E${episodeNumber} for series: ${media.title}`,
        err
      )
      throw err
    }
  }

  /**
   * Get detailed season data including all episodes
   */
  private async getDetailedSeason(tvId: number, basicSeasonData: any): Promise<Season> {
    const seasonDetails = await this.tmdbClient.tv.getSeasonDetails(
      tvId,
      basicSeasonData.season_number
    )

    return {
      id: seasonDetails.id?.toString() || `${tvId}-s${basicSeasonData.season_number}`,
      seasonNumber: basicSeasonData.season_number,
      name: seasonDetails.name || `Season ${basicSeasonData.season_number}`,
      overview: seasonDetails.overview,
      airDate: seasonDetails.air_date ? new Date(seasonDetails.air_date) : undefined,
      episodeCount: seasonDetails.episodes?.length || basicSeasonData.episode_count || 0,
      episodes: (seasonDetails.episodes || []).map((ep: any) => this.mapEpisode(ep)),
      posterPath: seasonDetails.poster_path || undefined,
    }
  }

  /**
   * Map basic season data when detailed fetch fails
   */
  private mapBasicSeason(seasonData: any): Season {
    return {
      id: seasonData.id?.toString() || `season-${seasonData.season_number}`,
      seasonNumber: seasonData.season_number,
      name: seasonData.name || `Season ${seasonData.season_number}`,
      overview: seasonData.overview,
      airDate: seasonData.air_date ? new Date(seasonData.air_date) : undefined,
      episodeCount: seasonData.episode_count || 0,
      episodes: [], // No episode details in basic data
      posterPath: seasonData.poster_path,
    }
  }

  /**
   * Map TMDB episode data to domain Episode interface
   */
  private mapEpisode(episodeData: any): Episode {
    return {
      id:
        episodeData.id?.toString() ||
        `ep-${episodeData.season_number}-${episodeData.episode_number}`,
      episodeNumber: episodeData.episode_number,
      seasonNumber: episodeData.season_number,
      name: episodeData.name || `Episode ${episodeData.episode_number}`,
      overview: episodeData.overview,
      airDate: episodeData.air_date ? new Date(episodeData.air_date) : undefined,
      runtime: episodeData.runtime,
      stillPath: episodeData.still_path,
      voteAverage: episodeData.vote_average,
      voteCount: episodeData.vote_count,
      productionCode: episodeData.production_code,
    }
  }

  /**
   * Extract TMDB ID from media's external IDs
   */
  private extractTMDBId(media: Media): number | null {
    if (media.externalIds.tmdb?.id) {
      const id = parseInt(media.externalIds.tmdb.id)
      if (!isNaN(id)) {
        return id
      }
    }

    this.logger.warn(`No TMDB ID found for media: ${media.title}`)
    return null
  }
}
