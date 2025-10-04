import type { Media } from '../entities/Media'
import type { EnrichedMedia } from '../entities/EnrichedMedia'

/**
 * Media Metadata Capability - Enriches basic media with detailed information
 * Takes minimal Media entity and returns comprehensive metadata
 */
export interface IMediaMetadataCapability {
  /**
   * Enrich media with detailed metadata (genres, overview, ratings, etc.)
   * @param media - Base media to enrich
   * @returns Enriched media with comprehensive metadata
   */
  enrichMedia(media: Media): Promise<EnrichedMedia>

  /**
   * Batch enrich multiple media items for efficiency
   * @param mediaList - Array of base media to enrich
   * @returns Array of enriched media with comprehensive metadata
   */
  enrichMediaBatch(mediaList: Media[]): Promise<EnrichedMedia[]>
}
