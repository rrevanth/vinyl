import type { IMediaRatingsCapability, MediaRatings, Rating } from '@/src/domain/capabilities/IMediaRatingsCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

/**
 * Trakt Media Ratings Capability
 * Provides Trakt ratings and aggregated ratings from the platform
 */
export class TraktMediaRatingsCapability implements IMediaRatingsCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  async getRatings(media: Media): Promise<MediaRatings> {
    try {
      // Extract Trakt ID
      const traktId = media.externalIds.trakt?.id
      if (!traktId) {
        throw new Error(`No Trakt ID found for ${media.type} media: ${media.title}`)
      }

      // Get ratings from Trakt
      let ratingsData: any
      if (media.type === 'movie') {
        ratingsData = await this.traktClient.movies.getRatings(traktId)
      } else if (media.type === 'series') {
        ratingsData = await this.traktClient.shows.getRatings(traktId)
      } else {
        throw new Error(`Unsupported media type: ${media.type}`)
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

      return ratings
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get ratings for ${media.type}: ${media.title}`, err)
      throw err
    }
  }
}