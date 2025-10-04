import type { EnrichedMedia, Genre } from '../../../../domain/entities/EnrichedMedia'
import { MediaStatus } from '../../../../domain/entities/EnrichedMedia'
import { Media, MediaImages } from '../../../../domain/entities/Media'
import { BaseTraktMapper } from '../base/BaseTraktMapper'
import type { TraktMovie, TraktShow } from '../../../api/trakt/types'

/**
 * Maps Trakt responses to EnrichedMedia entities with comprehensive metadata
 */
export class TraktEnrichedMediaMapper extends BaseTraktMapper {
  /**
   * Create EnrichedMedia entity from Trakt movie response with extended data
   */
  static fromMovie(traktMovie: TraktMovie): EnrichedMedia {
    const title = this.validateRequired(traktMovie.title, 'title')
    const externalIds = this.createExternalIds(traktMovie.ids, 'movie')
    const year = this.extractYear(traktMovie.year, traktMovie.released)

    // Create basic Media entity
    const images = new MediaImages()
    const media = new Media({
      externalIds,
      type: 'movie',
      title,
      year,
      images,
    })

    // Map extended fields to EnrichedMedia
    const enrichedMedia: EnrichedMedia = {
      media,
      overview: this.safeString(traktMovie.overview),
      tagline: this.safeString(traktMovie.tagline),
      originalTitle: title, // Trakt doesn't distinguish original vs translated titles
      releaseDate: this.parseDate(traktMovie.released),
      runtime: this.safeNumber(traktMovie.runtime),
      homepage: this.safeString(traktMovie.homepage),
      voteAverage: this.safeNumber(traktMovie.rating),
      voteCount: this.safeNumber(traktMovie.votes),
      certification: this.safeString(traktMovie.certification),
      status: this.mapMovieStatus(traktMovie.status),
      originalLanguage: this.safeString(traktMovie.language),
      spokenLanguages: this.safeArray(traktMovie.available_translations),
      genres: this.mapGenres(traktMovie.genres),
      productionCountries: traktMovie.country ? [traktMovie.country] : undefined,
    }

    return enrichedMedia
  }

  /**
   * Create EnrichedMedia entity from Trakt show response with extended data
   */
  static fromShow(traktShow: TraktShow): EnrichedMedia {
    const title = this.validateRequired(traktShow.title, 'title')
    const externalIds = this.createExternalIds(traktShow.ids, 'tv')
    const year = this.extractYear(traktShow.year, traktShow.first_aired)

    // Create basic Media entity
    const images = new MediaImages()
    const media = new Media({
      externalIds,
      type: 'series',
      title,
      year,
      images,
    })

    // Map extended fields to EnrichedMedia
    const enrichedMedia: EnrichedMedia = {
      media,
      overview: this.safeString(traktShow.overview),
      originalTitle: title, // Trakt doesn't distinguish original vs translated titles
      firstAirDate: this.parseDate(traktShow.first_aired),
      runtime: this.safeNumber(traktShow.runtime),
      homepage: this.safeString(traktShow.homepage),
      voteAverage: this.safeNumber(traktShow.rating),
      voteCount: this.safeNumber(traktShow.votes),
      certification: this.safeString(traktShow.certification),
      status: this.mapShowStatus(traktShow.status),
      originalLanguage: this.safeString(traktShow.language),
      spokenLanguages: this.safeArray(traktShow.available_translations),
      genres: this.mapGenres(traktShow.genres),
      productionCountries: traktShow.country ? [traktShow.country] : undefined,
      numberOfEpisodes: this.safeNumber(traktShow.aired_episodes),
      networks: traktShow.network
        ? [
            {
              id: traktShow.network,
              name: traktShow.network,
            },
          ]
        : undefined,
      inProduction: traktShow.status === 'returning series' || traktShow.status === 'in production',
    }

    return enrichedMedia
  }

  /**
   * Map Trakt genres to domain Genre objects
   */
  private static mapGenres(traktGenres?: string[]): Genre[] | undefined {
    if (!traktGenres?.length) return undefined

    return traktGenres.map((genreName) => ({
      id: genreName.toLowerCase().replace(/\s+/g, '-'), // Create ID from name
      name: genreName,
    }))
  }

  /**
   * Map Trakt movie status to domain MediaStatus
   */
  private static mapMovieStatus(traktStatus?: string): MediaStatus | undefined {
    if (!traktStatus) return undefined

    switch (traktStatus.toLowerCase()) {
      case 'released':
        return MediaStatus.RELEASED
      case 'in production':
        return MediaStatus.IN_PRODUCTION
      case 'post production':
        return MediaStatus.POST_PRODUCTION
      case 'planned':
        return MediaStatus.PLANNED
      case 'canceled':
      case 'cancelled':
        return MediaStatus.CANCELED
      case 'rumored':
        return MediaStatus.RUMORED
      default:
        return undefined
    }
  }

  /**
   * Map Trakt show status to domain MediaStatus
   */
  private static mapShowStatus(traktStatus?: string): MediaStatus | undefined {
    if (!traktStatus) return undefined

    switch (traktStatus.toLowerCase()) {
      case 'returning series':
        return MediaStatus.RETURNING_SERIES
      case 'ended':
        return MediaStatus.ENDED
      case 'canceled':
      case 'cancelled':
        return MediaStatus.CANCELED
      case 'in production':
        return MediaStatus.IN_PRODUCTION
      default:
        return undefined
    }
  }

  /**
   * Batch create EnrichedMedia entities from array of Trakt movies
   */
  static fromMovieArray(traktMovies: TraktMovie[]): EnrichedMedia[] {
    return traktMovies.map((movie) => this.fromMovie(movie))
  }

  /**
   * Batch create EnrichedMedia entities from array of Trakt shows
   */
  static fromShowArray(traktShows: TraktShow[]): EnrichedMedia[] {
    return traktShows.map((show) => this.fromShow(show))
  }
}
