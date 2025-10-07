import type {
  IMediaReviewsCapability,
  Review,
  ReviewsResponse,
} from '@/src/domain/capabilities/IMediaReviewsCapability'
import { ReviewType } from '@/src/domain/capabilities/IMediaReviewsCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

/**
 * Trakt Media Reviews Capability
 * Provides user comments (Trakt's equivalent of reviews)
 */
export class TraktMediaReviewsCapability implements IMediaReviewsCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  async getReviews(media: Media, reviewType?: ReviewType): Promise<Review[]> {
    try {
      // Extract Trakt ID
      const traktId = media.externalIds.trakt?.id
      if (!traktId) {
        throw new Error(`No Trakt ID found for ${media.type} media: ${media.title}`)
      }

      // Get comments from Trakt (Trakt calls them comments, not reviews)
      let commentsData: any[]
      if (media.type === 'movie') {
        commentsData = await this.traktClient.movies.getComments(traktId, {
          sort: 'newest',
        })
      } else if (media.type === 'series') {
        commentsData = await this.traktClient.shows.getComments(traktId, {
          sort: 'newest',
        })
      } else {
        throw new Error(`Unsupported media type: ${media.type}`)
      }

      // Map comments to reviews
      const reviews: Review[] = commentsData.map(comment => this.mapCommentToReview(comment))

      this.logger.debug(`Retrieved ${reviews.length} reviews for ${media.type}: ${media.title}`)
      return reviews
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get reviews for ${media.type}: ${media.title}`, err)
      throw err
    }
  }

  async getReviewsPaginated(
    media: Media,
    page: number,
    reviewType?: ReviewType
  ): Promise<ReviewsResponse> {
    try {
      // Extract Trakt ID
      const traktId = media.externalIds.trakt?.id
      if (!traktId) {
        throw new Error(`No Trakt ID found for ${media.type} media: ${media.title}`)
      }

      // Get paginated comments from Trakt
      let commentsData: any[]
      if (media.type === 'movie') {
        commentsData = await this.traktClient.movies.getComments(traktId, {
          sort: 'newest',
          page,
          limit: 20,
        })
      } else if (media.type === 'series') {
        commentsData = await this.traktClient.shows.getComments(traktId, {
          sort: 'newest',
          page,
          limit: 20,
        })
      } else {
        throw new Error(`Unsupported media type: ${media.type}`)
      }

      // Map comments to reviews
      const reviews: Review[] = commentsData.map(comment => this.mapCommentToReview(comment))

      const response: ReviewsResponse = {
        reviews,
        page,
        totalPages: page + 1, // Trakt doesn't provide total pages, assume there's one more
        totalResults: reviews.length,
        hasMore: reviews.length >= 20,
      }

      this.logger.debug(
        `Retrieved page ${page} of reviews for ${media.type}: ${media.title}`,
        {
          reviewCount: reviews.length,
        }
      )

      return response
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get paginated reviews for ${media.type}: ${media.title}`, err)
      throw err
    }
  }

  private mapCommentToReview(comment: any): Review {
    return {
      id: comment.id?.toString() || '',
      author: comment.user?.username || 'Anonymous',
      content: comment.comment || '',
      rating: comment.user_rating, // Trakt includes user rating with comment
      maxRating: 10,
      createdAt: comment.created_at ? new Date(comment.created_at) : new Date(),
      updatedAt: comment.updated_at ? new Date(comment.updated_at) : undefined,
      url: comment.share_url,
      reviewType: ReviewType.USER, // Trakt comments are all user-generated
      helpful: comment.likes || 0,
      spoiler: comment.spoiler || false,
    }
  }
}