import type { Media } from '../entities/Media'
import type { ExternalIds } from '../entities/ExternalIds'

/**
 * Media External IDs Capability - Provides external platform IDs for cross-referencing
 */
export interface IMediaExternalIdsCapability {
  /**
   * Get external IDs for media across different platforms
   * @param media - The media to get external IDs for
   * @returns ExternalIds object with platform mappings
   */
  getExternalIds(media: Media): Promise<ExternalIds>

  /**
   * Find media by external ID from another platform
   * @param externalId - External ID to search by
   * @param platform - Platform the ID belongs to (imdb, tmdb, etc.)
   * @returns Media object if found
   */
  findByExternalId(externalId: string, platform: string): Promise<Media | null>
}
