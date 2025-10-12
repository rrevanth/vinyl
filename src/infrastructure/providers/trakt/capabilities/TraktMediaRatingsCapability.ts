import type { IMediaRatingsCapability, MediaRatings, Rating } from '@/src/domain/capabilities/IMediaRatingsCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * Trakt Media Ratings Capability
 * Provides Trakt ratings and aggregated ratings from the platform
 */
export class TraktMediaRatingsCapability implements IMediaRatingsCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  async getRatings(media: Media): Promise<Result<MediaRatings>> {
    try {
      // Extract Trakt ID
      const traktId = media.externalIds.trakt?.id
      if (!traktId) {
        return fail(
          new Error(`No Trakt ID found for ${media.type} media: ${media.title}`),
          'trakt',
          'missing_id'
        )
      }

      // Get ratings from Trakt
      let ratingsData: any
      if (media.type === 'movie') {
        ratingsData = await this.traktClient.movies.getRatings(traktId)
      } else if (media.type === 'series') {
        ratingsData = await this.traktClient.shows.getRatings(traktId)
      } else {
        return fail(
          new Error(`Ratings only available for movies and series, got: ${media.type}`),
          'trakt',
          'unsupported'
        )
      }

      // Map to MediaRatings format
      const traktRating: Rating | undefined = ratingsData.rating
        ? {
            score: ratingsData.rating,
            maxScore: 10,
            voteCount: ratingsData.votes,
            url: `https://trakt.tv/${media.type === 'series' ? 'shows' : 'movies'}/${traktId}`,
          }
        : undefined

      const ratings: MediaRatings = {
        trakt: traktRating,
        average: traktRating?.score,
        sources: traktRating ? ['trakt'] : [],
      }

      this.logger.debug(`Retrieved ratings for ${media.type}: ${media.title}`, {
        traktScore: traktRating?.score,
        voteCount: traktRating?.voteCount,
      })

      return ok(ratings, "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get ratings for ${media.type}: ${media.title}`, err)
      return fail(err, "trakt", "api_error")
    }
  }
}