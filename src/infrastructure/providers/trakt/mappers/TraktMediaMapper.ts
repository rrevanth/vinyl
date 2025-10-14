import { Media, MediaImages } from '@/src/domain/entities/Media'
import { ExternalIds, ExternalId } from '@/src/domain/entities/ExternalIds'
import type { EnrichedMedia, Genre } from '@/src/domain/entities/EnrichedMedia'
import { MediaStatus } from '@/src/domain/entities/EnrichedMedia'
import type { TraktMovie, TraktShow, TraktIds, TraktImages } from '@/src/infrastructure/api/trakt/types'

/**
 * Mapper for converting Trakt API objects to domain entities
 *
 * Handles both minimal and extended Trakt responses, mapping IDs and images
 * to our unified Media entity structure
 */
export class TraktMediaMapper {
  /**
   * Convert Trakt IDs to ExternalIds entity
   */
  private static mapExternalIds(traktIds: TraktIds): ExternalIds {
    return new ExternalIds({
      trakt: new ExternalId(traktIds.trakt.toString(), 'trakt', `https://trakt.tv/${traktIds.trakt}`),
      tmdb: traktIds.tmdb
        ? new ExternalId(traktIds.tmdb.toString(), 'tmdb', `https://www.themoviedb.org/${traktIds.tmdb}`)
        : undefined,
      imdb: traktIds.imdb
        ? new ExternalId(traktIds.imdb, 'imdb', `https://www.imdb.com/title/${traktIds.imdb}/`)
        : undefined,
      tvdb: traktIds.tvdb
        ? new ExternalId(traktIds.tvdb.toString(), 'tvdb', `https://www.thetvdb.com/?id=${traktIds.tvdb}`)
        : undefined,
    })
  }

  /**
   * Convert Trakt images to MediaImages entity
   * Trakt images come as arrays, we take the first available
   */
  private static mapImages(traktImages?: TraktImages): MediaImages {
    if (!traktImages) {
      return new MediaImages()
    }

    // Extract first image from each array and add https:// if needed
    const poster = traktImages.poster?.[0]
      ? traktImages.poster[0].startsWith('http')
        ? traktImages.poster[0]
        : `https://${traktImages.poster[0]}`
      : undefined

    const backdrop = traktImages.fanart?.[0]
      ? traktImages.fanart[0].startsWith('http')
        ? traktImages.fanart[0]
        : `https://${traktImages.fanart[0]}`
      : undefined

    const logo = traktImages.logo?.[0]
      ? traktImages.logo[0].startsWith('http')
        ? traktImages.logo[0]
        : `https://${traktImages.logo[0]}`
      : undefined

    // Use remaining images as alternatives
    const posterAlternatives = traktImages.poster
      ?.slice(1)
      .map((img) => (img.startsWith('http') ? img : `https://${img}`))

    const backdropAlternatives = traktImages.fanart
      ?.slice(1)
      .map((img) => (img.startsWith('http') ? img : `https://${img}`))

    return new MediaImages({
      poster,
      backdrop,
      logo,
      posterAlternatives,
      backdropAlternatives,
      posterQuality: 'high',
      backdropQuality: 'high',
    })
  }

  /**
   * Convert Trakt movie to minimal Media entity
   */
  static movieToMedia(traktMovie: TraktMovie): Media {
    // Map genres from Trakt format to Media format
    const genres = this.mapGenres(traktMovie.genres)

    // Map rating from Trakt format to Media format
    const rating = traktMovie.rating && traktMovie.votes
      ? {
          average: traktMovie.rating,
          count: traktMovie.votes,
          source: 'trakt',
        }
      : undefined

    return new Media({
      externalIds: this.mapExternalIds(traktMovie.ids),
      type: 'movie',
      title: traktMovie.title,
      year: traktMovie.year,
      images: this.mapImages(traktMovie.images),
      overview: traktMovie.overview,
      runtime: traktMovie.runtime,
      genres,
      certification: traktMovie.certification,
      rating,
    })
  }

  /**
   * Convert Trakt show to minimal Media entity
   */
  static showToMedia(traktShow: TraktShow): Media {
    // Map genres from Trakt format to Media format
    const genres = this.mapGenres(traktShow.genres)

    // Map rating from Trakt format to Media format
    const rating = traktShow.rating && traktShow.votes
      ? {
          average: traktShow.rating,
          count: traktShow.votes,
          source: 'trakt',
        }
      : undefined

    return new Media({
      externalIds: this.mapExternalIds(traktShow.ids),
      type: 'series',
      title: traktShow.title,
      year: traktShow.year,
      images: this.mapImages(traktShow.images),
      overview: traktShow.overview,
      runtime: traktShow.runtime,
      genres,
      certification: traktShow.certification,
      rating,
    })
  }

  /**
   * Map Trakt status to MediaStatus enum
   */
  private static mapStatus(traktStatus?: string): MediaStatus | undefined {
    if (!traktStatus) return undefined

    const statusMap: Record<string, MediaStatus> = {
      rumored: MediaStatus.RUMORED,
      planned: MediaStatus.PLANNED,
      'in production': MediaStatus.IN_PRODUCTION,
      'post production': MediaStatus.POST_PRODUCTION,
      released: MediaStatus.RELEASED,
      canceled: MediaStatus.CANCELED,
      'returning series': MediaStatus.RETURNING_SERIES,
      ended: MediaStatus.ENDED,
    }

    return statusMap[traktStatus.toLowerCase()] || MediaStatus.RELEASED
  }

  /**
   * Convert Trakt genres to MediaGenre array
   * Uses a simple numeric hash of the genre name as ID since Trakt doesn't provide genre IDs
   */
  private static mapGenres(traktGenres?: string[]): { id: number; name: string }[] | undefined {
    if (!traktGenres || traktGenres.length === 0) return undefined

    return traktGenres.map((genre) => ({
      id: this.hashGenreName(genre),
      name: genre,
    }))
  }

  /**
   * Generate a simple numeric hash for genre names
   * This provides consistent IDs for the same genre name across requests
   */
  private static hashGenreName(genre: string): number {
    let hash = 0
    for (let i = 0; i < genre.length; i++) {
      const char = genre.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
  }

  /**
   * Convert Trakt genres to Genre array (for EnrichedMedia compatibility)
   * Maps string genre names to Genre objects with string IDs
   */
  private static mapGenresForEnriched(traktGenres?: string[]): Genre[] | undefined {
    if (!traktGenres || traktGenres.length === 0) return undefined

    return traktGenres.map((genre) => ({
      id: genre.toLowerCase().replace(/\s+/g, '-'),
      name: genre,
    }))
  }

  /**
   * Convert Trakt movie with extended data to EnrichedMedia
   */
  static movieToEnrichedMedia(traktMovie: TraktMovie): EnrichedMedia {
    const media = this.movieToMedia(traktMovie)

    return {
      media,
      overview: traktMovie.overview,
      tagline: traktMovie.tagline,
      originalLanguage: traktMovie.language,
      spokenLanguages: traktMovie.available_translations,
      genres: this.mapGenresForEnriched(traktMovie.genres),
      voteAverage: traktMovie.rating,
      voteCount: traktMovie.votes,
      certification: traktMovie.certification,
      releaseDate: traktMovie.released ? new Date(traktMovie.released) : undefined,
      status: this.mapStatus(traktMovie.status),
      runtime: traktMovie.runtime,
      homepage: traktMovie.homepage,
      productionCountries: traktMovie.country ? [traktMovie.country] : undefined,
    }
  }

  /**
   * Convert Trakt show with extended data to EnrichedMedia
   */
  static showToEnrichedMedia(traktShow: TraktShow): EnrichedMedia {
    const media = this.showToMedia(traktShow)

    return {
      media,
      overview: traktShow.overview,
      originalLanguage: traktShow.language,
      spokenLanguages: traktShow.available_translations,
      genres: this.mapGenresForEnriched(traktShow.genres),
      voteAverage: traktShow.rating,
      voteCount: traktShow.votes,
      certification: traktShow.certification,
      firstAirDate: traktShow.first_aired ? new Date(traktShow.first_aired) : undefined,
      status: this.mapStatus(traktShow.status),
      runtime: traktShow.runtime,
      homepage: traktShow.homepage,
      productionCountries: traktShow.country ? [traktShow.country] : undefined,
      numberOfSeasons: traktShow.aired_episodes, // Trakt doesn't have season count, using episodes
      numberOfEpisodes: traktShow.aired_episodes,
      inProduction: traktShow.status === 'returning series',
      networks: traktShow.network
        ? [
            {
              id: traktShow.network.toLowerCase().replace(/\s+/g, '-'),
              name: traktShow.network,
            },
          ]
        : undefined,
    }
  }

  /**
   * Convert generic Trakt object to Media (type inference)
   * Useful for search results or mixed-type responses
   */
  static toMedia(traktObject: TraktMovie | TraktShow, type: 'movie' | 'series'): Media {
    if (type === 'movie') {
      return this.movieToMedia(traktObject as TraktMovie)
    } else {
      return this.showToMedia(traktObject as TraktShow)
    }
  }

  /**
   * Convert generic Trakt object to EnrichedMedia (type inference)
   */
  static toEnrichedMedia(traktObject: TraktMovie | TraktShow, type: 'movie' | 'series'): EnrichedMedia {
    if (type === 'movie') {
      return this.movieToEnrichedMedia(traktObject as TraktMovie)
    } else {
      return this.showToEnrichedMedia(traktObject as TraktShow)
    }
  }
}
