import type { Media } from '../entities/Media'
import type { Catalog } from '../entities/Catalog'
import type { Result } from '../types/Result'

/**
 * Media People Capability - Returns people catalogs (cast, crew) for media
 */
export interface IMediaPeopleCapability {
  /**
   * Get people catalogs for a media item
   * @param media - The media to get people information for
   * @returns Array of people catalogs (e.g., "Main Cast", "Supporting Cast", "Directors", "Writers", "Producers")
   */
  getPeopleCatalogs(media: Media): Promise<Result<Catalog[]>>
}
