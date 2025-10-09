import type { Catalog } from '../entities/Catalog'
import type { Result } from '../types/Result'

/**
 * Media Lists Search Capability - Search within curated lists
 */
export interface IMediaListsSearchCapability {
  /**
   * Search for lists by name or description
   * @param query - Search query for list names/descriptions
   * @param filters - Optional filters (category, creator, etc.)
   * @returns Catalog containing matching lists
   */
  searchLists(query: string, filters?: Record<string, any>): Promise<Result<Catalog>>

  /**
   * Get lists by creator/curator
   * @param creatorId - ID of the list creator
   * @returns Array of lists created by this user
   */
  getListsByCreator(creatorId: string): Promise<Result<Catalog[]>>
}
