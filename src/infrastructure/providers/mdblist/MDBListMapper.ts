import type { MDBListRatings } from '@/src/infrastructure/api/mdblist/types/MDBListTypes'
import type {
  MediaRatings,
  Rating,
  RottenTomatoesRating,
} from '@/src/domain/capabilities/IMediaRatingsCapability'

/**
 * MDBList Data Mapper
 *
 * Maps MDBList API responses to domain entities
 * Handles missing values and data normalization
 */
export class MDBListMapper {
  /**
   * Map MDBListRatings to domain MediaRatings entity
   * @param mdblistRatings - Raw ratings from MDBList API
   * @returns Normalized domain MediaRatings object
   */
  static toMediaRatings(mdblistRatings: MDBListRatings): MediaRatings {
    const sources: string[] = []

    // Map IMDb rating (scale 0-10)
    const imdb: Rating | undefined = mdblistRatings.imdb
      ? {
          score: mdblistRatings.imdb,
          maxScore: 10,
        }
      : undefined
    if (imdb) sources.push('IMDb')

    // Map TMDB rating (scale 0-10)
    const tmdb: Rating | undefined = mdblistRatings.tmdb
      ? {
          score: mdblistRatings.tmdb,
          maxScore: 10,
        }
      : undefined
    if (tmdb) sources.push('TMDB')

    // Map Trakt rating (scale 0-10)
    const trakt: Rating | undefined = mdblistRatings.trakt
      ? {
          score: mdblistRatings.trakt,
          maxScore: 10,
        }
      : undefined
    if (trakt) sources.push('Trakt')

    // Map Letterboxd rating (scale 0-5, convert to 0-10)
    const letterboxd: Rating | undefined = mdblistRatings.letterboxd
      ? {
          score: mdblistRatings.letterboxd * 2, // Convert 5-star to 10-point scale
          maxScore: 10,
        }
      : undefined
    if (letterboxd) sources.push('Letterboxd')

    // Map Metacritic rating (scale 0-100, convert to 0-10)
    const metacritic: Rating | undefined = mdblistRatings.metacritic
      ? {
          score: mdblistRatings.metacritic / 10, // Convert 100-point to 10-point scale
          maxScore: 10,
        }
      : undefined
    if (metacritic) sources.push('Metacritic')

    // Map Rotten Tomatoes ratings (critics and audience, scale 0-100, convert to 0-10)
    const rottenTomatoes: RottenTomatoesRating | undefined =
      mdblistRatings.tomatoes || mdblistRatings.audience
        ? {
            critics: {
              score: (mdblistRatings.tomatoes || 0) / 10,
              maxScore: 10,
            },
            audience: {
              score: (mdblistRatings.audience || 0) / 10,
              maxScore: 10,
            },
          }
        : undefined
    if (rottenTomatoes) sources.push('Rotten Tomatoes')

    // Calculate average score from all available ratings
    const scores: number[] = []
    if (imdb) scores.push(imdb.score)
    if (tmdb) scores.push(tmdb.score)
    if (trakt) scores.push(trakt.score)
    if (letterboxd) scores.push(letterboxd.score)
    if (metacritic) scores.push(metacritic.score)
    if (rottenTomatoes) {
      scores.push(rottenTomatoes.critics.score)
      scores.push(rottenTomatoes.audience.score)
    }

    const average =
      scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : undefined

    return {
      imdb,
      tmdb,
      trakt,
      letterboxd,
      metacritic,
      rottenTomatoes,
      average,
      sources,
    }
  }

  /**
   * Check if ratings data is valid and has at least one rating source
   * @param mdblistRatings - Raw ratings from MDBList API
   * @returns True if ratings data is valid
   */
  static hasValidRatings(mdblistRatings: MDBListRatings): boolean {
    return !!(
      mdblistRatings.imdb ||
      mdblistRatings.tmdb ||
      mdblistRatings.trakt ||
      mdblistRatings.letterboxd ||
      mdblistRatings.tomatoes ||
      mdblistRatings.audience ||
      mdblistRatings.metacritic ||
      mdblistRatings.score ||
      mdblistRatings.score_average
    )
  }
}
