import type { Media } from '../entities/Media'
import type { Catalog } from '../entities/Catalog'
import type { Result } from '../types/Result'

/**
 * Media Lists Capability - Provides curated lists and collections
 */
export interface IMediaListsCapability {
  /**
   * Get curated lists containing specific media
   * @param media - The media to find lists for
   * @returns Array of lists/collections containing this media
   */
  getListsContaining(media: Media): Promise<Result<Catalog[]>>

  /**
   * Get popular/featured lists from the platform
   * @param category - Category of lists (popular, trending, etc.)
   * @returns Array of curated lists as catalogs
   */
  getFeaturedLists(category?: string): Promise<Result<Catalog[]>>

  /**
   * Get detailed list contents
   * @param listId - ID of the list to retrieve
   * @returns Catalog with full list contents
   */
  getList(listId: string): Promise<Result<Catalog>>
}
