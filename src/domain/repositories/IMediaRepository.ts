import type { Media } from '@/src/domain/entities'

/**
 * Repository interface for media entity persistence
 * Handles storing and retrieving media data
 */
export interface IMediaRepository {
  /**
   * Get media by stable ID
   * Returns media entity from cache or storage
   */
  getMedia(stableId: string): Promise<Media | null>

  /**
   * Save media entity
   * Stores complete media object
   */
  saveMedia(media: Media): Promise<void>

  /**
   * Save multiple media entities
   * Batch operation for storing multiple media objects
   */
  saveMediaBatch(mediaList: Media[]): Promise<void>

  /**
   * Search media by query
   * Returns matching media from cache/storage
   */
  searchMedia(query: string): Promise<Media[]>

  /**
   * Get recently viewed media
   * Returns media sorted by last viewed timestamp
   */
  getRecentlyViewed(limit?: number): Promise<Media[]>

  /**
   * Mark media as viewed
   * Updates last viewed timestamp
   */
  markAsViewed(stableId: string): Promise<void>

  /**
   * Clear media cache
   * Removes all cached media data
   */
  clearMediaCache(): Promise<void>

  /**
   * Get media by external ID
   * Lookup media using TMDB, IMDB, or other external IDs
   */
  getMediaByExternalId(
    externalIdType: string,
    externalId: string
  ): Promise<Media | null>
}
