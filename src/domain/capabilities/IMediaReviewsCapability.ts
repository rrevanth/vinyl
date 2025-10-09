import type { Media } from '../entities/Media'
import type { Result } from '../types/Result'

/**
 * Media Reviews Capability - Provides user and critic reviews
 */
export interface IMediaReviewsCapability {
  /**
   * Get reviews for media content
   * @param media - The media to get reviews for
   * @param reviewType - Type of reviews to fetch
   * @returns Array of reviews
   */
  getReviews(media: Media, reviewType?: ReviewType): Promise<Result<Review[]>>

  /**
   * Get paginated reviews
   * @param media - The media to get reviews for
   * @param page - Page number for pagination
   * @param reviewType - Type of reviews to fetch
   * @returns Reviews with pagination info
   */
  getReviewsPaginated(media: Media, page: number, reviewType?: ReviewType): Promise<Result<ReviewsResponse>>
}

/**
 * Types of reviews available
 */
export enum ReviewType {
  ALL = 'all',
  CRITIC = 'critic',
  USER = 'user',
  VERIFIED = 'verified',
}

/**
 * Individual review structure
 */
export interface Review {
  id: string
  author: string
  content: string
  rating?: number
  maxRating?: number
  createdAt: Date
  updatedAt?: Date
  url?: string
  reviewType: ReviewType
  helpful?: number // Upvotes/helpful count
  language?: string
  spoiler: boolean
}

/**
 * Paginated reviews response
 */
export interface ReviewsResponse {
  reviews: Review[]
  page: number
  totalPages: number
  totalResults: number
  hasMore: boolean
}
