import { Media, MediaImages } from '../../../domain/entities/Media'
import { ExternalIds, ExternalId } from '../../../domain/entities/ExternalIds'
import type { EnrichedMedia } from '../../../domain/entities/EnrichedMedia'
import type { TMDBMovieResponse, TMDBTVResponse } from '../../api/tmdb/types'
import { BaseTMDBMapper } from './base/BaseTMDBMapper'

/**
 * Simplified TMDB Media Mapper for core functionality
 * Focuses on essential Media and EnrichedMedia creation
 */
export class TMDBMediaMapper extends BaseTMDBMapper {
  /**
   * Convert TMDB movie response to basic Media entity
   */
  static fromMovieResponse(movie: TMDBMovieResponse): Media {
    const externalIds = new ExternalIds({
      tmdb: new ExternalId(movie.id.toString(), 'tmdb'),
      imdb: movie.external_ids?.imdb_id
        ? new ExternalId(movie.external_ids.imdb_id, 'imdb')
        : undefined,
    })

    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : undefined

    const images = new MediaImages({
      poster: movie.poster_path ? this.buildImageUrl(movie.poster_path, 'w500') : undefined,
      backdrop: movie.backdrop_path ? this.buildImageUrl(movie.backdrop_path, 'w1280') : undefined,
      posterThumbnail: movie.poster_path
        ? this.buildImageUrl(movie.poster_path, 'w185')
        : undefined,
      backdropThumbnail: movie.backdrop_path
        ? this.buildImageUrl(movie.backdrop_path, 'w780')
        : undefined,
    })

    return new Media({
      externalIds,
      type: 'movie',
      title: movie.title,
      year,
      images,
    })
  }

  /**
   * Convert TMDB TV response to basic Media entity
   */
  static fromTVResponse(tv: TMDBTVResponse): Media {
    const externalIds = new ExternalIds({
      tmdb: new ExternalId(tv.id.toString(), 'tmdb'),
      imdb: tv.external_ids?.imdb_id ? new ExternalId(tv.external_ids.imdb_id, 'imdb') : undefined,
    })

    const year = tv.first_air_date ? new Date(tv.first_air_date).getFullYear() : undefined

    const images = new MediaImages({
      poster: tv.poster_path ? this.buildImageUrl(tv.poster_path, 'w500') : undefined,
      backdrop: tv.backdrop_path ? this.buildImageUrl(tv.backdrop_path, 'w1280') : undefined,
      posterThumbnail: tv.poster_path ? this.buildImageUrl(tv.poster_path, 'w185') : undefined,
      backdropThumbnail: tv.backdrop_path
        ? this.buildImageUrl(tv.backdrop_path, 'w780')
        : undefined,
    })

    return new Media({
      externalIds,
      type: 'series',
      title: tv.name,
      year,
      images,
    })
  }

  /**
   * Create enriched media from TMDB movie response (simplified version)
   */
  static toEnrichedMovieFromResponse(movie: TMDBMovieResponse): EnrichedMedia {
    const baseMedia = this.fromMovieResponse(movie)

    return {
      media: baseMedia,
      overview: movie.overview || undefined,
      originalTitle: movie.original_title || undefined,
      voteAverage: movie.vote_average || undefined,
      voteCount: movie.vote_count || undefined,
      popularity: movie.popularity || undefined,
      releaseDate: movie.release_date ? new Date(movie.release_date) : undefined,
      runtime: movie.runtime || undefined,
      adult: movie.adult || false,
    }
  }

  /**
   * Create enriched media from TMDB TV response (simplified version)
   */
  static toEnrichedTVFromResponse(tv: TMDBTVResponse): EnrichedMedia {
    const baseMedia = this.fromTVResponse(tv)

    return {
      media: baseMedia,
      overview: tv.overview || undefined,
      originalTitle: tv.original_name || undefined,
      voteAverage: tv.vote_average || undefined,
      voteCount: tv.vote_count || undefined,
      popularity: tv.popularity || undefined,
      firstAirDate: tv.first_air_date ? new Date(tv.first_air_date) : undefined,
      lastAirDate: tv.last_air_date ? new Date(tv.last_air_date) : undefined,
      numberOfSeasons: tv.number_of_seasons || undefined,
      numberOfEpisodes: tv.number_of_episodes || undefined,
      inProduction: tv.in_production || false,
      adult: tv.adult || false,
    }
  }

  /**
   * Build full image URL with TMDB base URL and size
   */
  private static buildImageUrl(imagePath: string, size: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/'
    return `${baseUrl}${size}${imagePath}`
  }
}
