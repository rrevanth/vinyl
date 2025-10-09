import type { Media } from '../entities/Media'
import type { Catalog } from '../entities/Catalog'
import type { Result } from '../types/Result'

/**
 * Media Recommendations Capability - Returns multiple recommendation catalogs
 */
export interface IMediaRecommendationsCapability {
  /**
   * Get recommendation catalogs for a media item
   * @param media - The media to get recommendations for
   * @returns Array of recommendation catalogs (e.g., "Similar Movies", "Recommended Movies", "People Who Liked This Also Liked")
   */
  getRecommendations(media: Media): Promise<Result<Catalog[]>>
}
