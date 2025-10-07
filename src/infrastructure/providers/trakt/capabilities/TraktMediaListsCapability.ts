import type { IMediaListsCapability } from '@/src/domain/capabilities/IMediaListsCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { Catalog } from '@/src/domain/entities/Catalog'
import { Catalog as CatalogEntity } from '@/src/domain/entities/Catalog'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

/**
 * Trakt Media Lists Capability
 * Provides curated lists and collections containing media
 */
export class TraktMediaListsCapability implements IMediaListsCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  async getListsContaining(media: Media): Promise<Catalog[]> {
    try {
      // Extract Trakt ID
      const traktId = media.externalIds.trakt?.id
      if (!traktId) {
        throw new Error(`No Trakt ID found for ${media.type} media: ${media.title}`)
      }

      // Get lists containing this media
      let listsData: any[]
      if (media.type === 'movie') {
        listsData = await this.traktClient.movies.getLists(traktId, {
          sort: 'popular',
          limit: 20,
        })
      } else if (media.type === 'series') {
        listsData = await this.traktClient.shows.getLists(traktId, {
          sort: 'popular',
          limit: 20,
        })
      } else {
        throw new Error(`Unsupported media type: ${media.type}`)
      }

      // Map lists to catalog format
      const catalogs: Catalog[] = listsData
        .filter(list => list !== null && list !== undefined)
        .map(list =>
          new CatalogEntity({
            id: `list-${list.ids.trakt}`,
            providerId: 'trakt',
            type: 'mixed',
            category: 'list',
            name: list.name,
            description: list.description || `Curated list: ${list.name}`,
            items: [], // Items would need to be fetched separately via getList()
            sourceInfo: {
              originalUrl: `/lists/${list.ids.trakt}`,
              totalCount: list.item_count || 0,
              lastUpdated: list.updated_at ? new Date(list.updated_at) : new Date(),
            },
          })
        )

      this.logger.debug(`Retrieved ${catalogs.length} lists containing: ${media.title}`)
      return catalogs
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get lists for ${media.type}: ${media.title}`, err)
      throw err
    }
  }

  async getFeaturedLists(category?: string): Promise<Catalog[]> {
    try {
      // Get popular lists from Trakt
      // Note: Trakt doesn't have a direct "featured lists" endpoint
      // We'll use search to find popular lists
      const searchResults = await this.traktClient.search.searchLists(category || 'movies', {
        limit: 20,
      })

      const catalogs: Catalog[] = searchResults
        .filter(result => result.list !== null && result.list !== undefined)
        .map(result => {
          const list = result.list!
          return new CatalogEntity({
            id: `list-${list.ids.trakt}`,
            providerId: 'trakt',
            type: 'mixed',
            category: 'list',
            name: list.name,
            description: list.description || `Curated list: ${list.name}`,
            items: [], // Items would need to be fetched separately
            sourceInfo: {
              originalUrl: `/lists/${list.ids.trakt}`,
              totalCount: list.item_count || 0,
              lastUpdated: list.updated_at
                ? new Date(list.updated_at)
                : new Date(),
            },
          })
        })

      this.logger.debug(`Retrieved ${catalogs.length} featured lists`)
      return catalogs
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to get featured lists', err)
      throw err
    }
  }

  async getList(listId: string): Promise<Catalog> {
    try {
      // Note: Trakt API requires authentication for most list operations
      // This is a placeholder implementation
      // In a real implementation, we'd need to use authenticated endpoints

      this.logger.warn(`Getting list details for ${listId} - requires authentication`)

      // Return empty catalog as placeholder
      return new CatalogEntity({
        id: `list-${listId}`,
        providerId: 'trakt',
        type: 'mixed',
        category: 'list',
        name: 'List',
        description: 'List details require authentication',
        items: [],
        sourceInfo: {
          originalUrl: `/lists/${listId}`,
          totalCount: 0,
          lastUpdated: new Date(),
        },
      })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get list: ${listId}`, err)
      throw err
    }
  }
}