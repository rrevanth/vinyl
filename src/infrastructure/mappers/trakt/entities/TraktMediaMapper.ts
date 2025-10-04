import { Media, MediaImages } from '../../../../domain/entities/Media'
import { BaseTraktMapper } from '../base/BaseTraktMapper'
import type { TraktMovie, TraktShow } from '../../../api/trakt/types'

/**
 * Maps Trakt responses to basic Media entities
 */
export class TraktMediaMapper extends BaseTraktMapper {
  /**
   * Create Media entity from Trakt movie response
   */
  static fromMovie(traktMovie: TraktMovie): Media {
    const title = this.validateRequired(traktMovie.title, 'title')
    const externalIds = this.createExternalIds(traktMovie.ids, 'movie')
    const year = this.extractYear(traktMovie.year, traktMovie.released)

    // Trakt doesn't provide image URLs directly, so we create empty MediaImages
    const images = new MediaImages()

    return new Media({
      externalIds,
      type: 'movie',
      title,
      year,
      images,
    })
  }

  /**
   * Create Media entity from Trakt show response
   */
  static fromShow(traktShow: TraktShow): Media {
    const title = this.validateRequired(traktShow.title, 'title')
    const externalIds = this.createExternalIds(traktShow.ids, 'tv')
    const year = this.extractYear(traktShow.year, traktShow.first_aired)

    // Trakt doesn't provide image URLs directly, so we create empty MediaImages
    const images = new MediaImages()

    return new Media({
      externalIds,
      type: 'series',
      title,
      year,
      images,
    })
  }

  /**
   * Batch create Media entities from array of Trakt movies
   */
  static fromMovieArray(traktMovies: TraktMovie[]): Media[] {
    return traktMovies.map((movie) => this.fromMovie(movie))
  }

  /**
   * Batch create Media entities from array of Trakt shows
   */
  static fromShowArray(traktShows: TraktShow[]): Media[] {
    return traktShows.map((show) => this.fromShow(show))
  }
}
