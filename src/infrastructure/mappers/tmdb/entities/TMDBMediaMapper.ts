import { Media } from '../../../../domain/entities/Media'
import { BaseTMDBMapper } from '../base/BaseTMDBMapper'
import { TMDBImageMapper } from '../base/TMDBImageMapper'
import type { TMDBMovieResponse, TMDBTVResponse } from '../../../api/tmdb/types'
import type { TMDBConfigFactory } from '../../../factories/TMDBConfigFactory'

/**
 * Maps TMDB responses to basic Media entities
 *
 * Handles the core transformation from TMDB's movie/TV format to our unified Media entity.
 * Creates minimal Media instances optimized for TanStack Query caching.
 */
export class TMDBMediaMapper extends BaseTMDBMapper {
  /**
   * Create Media entity from TMDB movie response
   * @param tmdbMovie - TMDB movie response
   * @param configFactory - Optional config factory for image URLs
   * @returns Media entity for movie
   */
  static fromMovie(tmdbMovie: TMDBMovieResponse, configFactory?: TMDBConfigFactory): Media {
    // Validate required fields
    const title = this.validateRequired(tmdbMovie.title, 'title', { tmdbId: tmdbMovie.id })

    // Create external IDs
    const externalIds = this.createExternalIds(tmdbMovie)

    // Extract year from release date
    const year = this.extractYear(tmdbMovie.release_date)

    // Create images
    const images = TMDBImageMapper.createMediaImages(tmdbMovie, configFactory)

    return new Media({
      externalIds,
      type: 'movie',
      title,
      year,
      images,
    })
  }

  /**
   * Create Media entity from TMDB TV response
   * @param tmdbTV - TMDB TV response
   * @param configFactory - Optional config factory for image URLs
   * @returns Media entity for TV series
   */
  static fromTV(tmdbTV: TMDBTVResponse, configFactory?: TMDBConfigFactory): Media {
    // Validate required fields
    const title = this.validateRequired(tmdbTV.name, 'name', { tmdbId: tmdbTV.id })

    // Create external IDs
    const externalIds = this.createExternalIds(tmdbTV)

    // Extract year from first air date
    const year = this.extractYear(tmdbTV.first_air_date)

    // Create images
    const images = TMDBImageMapper.createMediaImages(tmdbTV, configFactory)

    return new Media({
      externalIds,
      type: 'series',
      title,
      year,
      images,
    })
  }

  /**
   * Create Media entity from mixed TMDB response (when media type is unknown)
   * Uses media_type field or response structure to determine type
   * @param tmdbData - TMDB response (could be movie or TV)
   * @param configFactory - Optional config factory for image URLs
   * @returns Media entity
   */
  static fromMixed(
    tmdbData: (TMDBMovieResponse | TMDBTVResponse) & { media_type?: 'movie' | 'tv' },
    configFactory?: TMDBConfigFactory
  ): Media {
    // Determine media type from media_type field or response structure
    const isMovie = tmdbData.media_type === 'movie' || 'title' in tmdbData

    if (isMovie) {
      return this.fromMovie(tmdbData as TMDBMovieResponse, configFactory)
    } else {
      return this.fromTV(tmdbData as TMDBTVResponse, configFactory)
    }
  }

  /**
   * Batch create Media entities from array of TMDB responses
   * @param tmdbResponses - Array of TMDB movie/TV responses
   * @param configFactory - Optional config factory for image URLs
   * @returns Array of Media entities
   */
  static fromMixedArray(
    tmdbResponses: ((TMDBMovieResponse | TMDBTVResponse) & { media_type?: 'movie' | 'tv' })[],
    configFactory?: TMDBConfigFactory
  ): Media[] {
    return tmdbResponses.map((tmdbData) => this.fromMixed(tmdbData, configFactory))
  }

  /**
   * Batch create Media entities from array of movie responses
   * @param tmdbMovies - Array of TMDB movie responses
   * @param configFactory - Optional config factory for image URLs
   * @returns Array of Media entities
   */
  static fromMovieArray(
    tmdbMovies: TMDBMovieResponse[],
    configFactory?: TMDBConfigFactory
  ): Media[] {
    return tmdbMovies.map((tmdbMovie) => this.fromMovie(tmdbMovie, configFactory))
  }

  /**
   * Batch create Media entities from array of TV responses
   * @param tmdbTVShows - Array of TMDB TV responses
   * @param configFactory - Optional config factory for image URLs
   * @returns Array of Media entities
   */
  static fromTVArray(tmdbTVShows: TMDBTVResponse[], configFactory?: TMDBConfigFactory): Media[] {
    return tmdbTVShows.map((tmdbTV) => this.fromTV(tmdbTV, configFactory))
  }
}
