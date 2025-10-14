import type { IMediaRecommendationsCapability } from '@/src/domain/capabilities/IMediaRecommendationsCapability'
import type { Catalog } from '@/src/domain/entities/Catalog'
import { Catalog as CatalogEntity } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import { StableIdGenerator } from '@/src/domain/entities/StableIdGenerator'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import { TraktMediaMapper } from '../mappers/TraktMediaMapper'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * Trakt Media Recommendations Capability
 * Provides related/recommended content for movies and TV shows
 */
export class TraktMediaRecommendationsCapability implements IMediaRecommendationsCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  async getRecommendations(media: Media): Promise<Result<Catalog[]>> {
    try {
      // Extract Trakt ID
      const traktId = media.externalIds.trakt?.id
      if (!traktId) {
        return fail(
          new Error(`No Trakt ID found for ${media.type} media: ${media.title}`),
          'trakt',
          'missing_id'
        )
      }

      const catalogs: Catalog[] = []
      const params = {
        extended: 'full,images' as any,
        limit: 20,
      }

      // Get related items (similar content)
      let relatedData: any[] = []
      if (media.type === 'movie') {
        relatedData = await this.traktClient.movies.getRelated(traktId, params)
      } else if (media.type === 'series') {
        relatedData = await this.traktClient.shows.getRelated(traktId, params)
      }

      if (relatedData.length > 0) {
        const relatedItems = relatedData.map((item, index) => {
          const relatedMedia = media.type === 'series'
            ? TraktMediaMapper.showToMedia(item)
            : TraktMediaMapper.movieToMedia(item)

          return {
            stableId: StableIdGenerator.forCatalogItem(
              `related-${media.stableId}`,
              relatedMedia.stableId,
              index
            ),
            media: relatedMedia,
          }
        })

        catalogs.push(
          new CatalogEntity({
            id: `related-${media.stableId}`,
            providerId: 'trakt',
            type: media.type,
            category: 'recommendations',
            name: `Similar to ${media.title}`,
            description: `Content similar to ${media.title}`,
            items: relatedItems,
            contextMedia: media,
            sourceInfo: {
              originalUrl: `/${media.type === 'series' ? 'shows' : 'movies'}/${traktId}/related`,
              totalCount: relatedItems.length,
              lastUpdated: new Date(),
            },
            paginationInfo: {
              currentPage: 1,
              totalPages: 1,
              hasMore: false,
            },
          })
        )
      }

      this.logger.debug(`Retrieved ${catalogs.length} recommendation catalogs for: ${media.title}`)
      return ok(catalogs, "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get recommendations for ${media.type}: ${media.title}`, err)
      return fail(err, "trakt", "api_error")
    }
  }

  async loadMoreItems(catalog: Catalog): Promise<Result<Catalog>> {
    // Validate catalog has context media
    if (!catalog.contextMedia) {
      return fail(
        new Error('Catalog must have contextMedia to load more recommendations'),
        'trakt',
        'invalid_input'
      )
    }

    // Check if there are more items to load
    if (!catalog.paginationInfo.hasMore) {
      return fail(
        new Error('No more items to load for this catalog'),
        'trakt',
        'not_found'
      )
    }

    // Extract Trakt ID from context media
    const traktId = catalog.contextMedia.externalIds.trakt?.id
    if (!traktId) {
      return fail(
        new Error(`No Trakt ID found for context media: ${catalog.contextMedia.title}`),
        'trakt',
        'missing_id'
      )
    }

    try {
      const nextPage = catalog.paginationInfo.currentPage + 1
      const mediaType = catalog.contextMedia.type

      const params = {
        extended: 'full,images' as any,
        limit: 20,
        page: nextPage,
      }

      // Get related items for next page
      let relatedData: any[] = []
      if (mediaType === 'movie') {
        relatedData = await this.traktClient.movies.getRelated(traktId, params)
      } else if (mediaType === 'series') {
        relatedData = await this.traktClient.shows.getRelated(traktId, params)
      } else {
        return fail(
          new Error(`Unsupported media type for recommendations: ${mediaType}`),
          'trakt',
          'unsupported'
        )
      }

      // Map response to catalog items
      const newItems = relatedData.map((item, index) => {
        const relatedMedia =
          mediaType === 'series'
            ? TraktMediaMapper.showToMedia(item)
            : TraktMediaMapper.movieToMedia(item)

        return {
          stableId: StableIdGenerator.forCatalogItem(
            catalog.id,
            relatedMedia.stableId,
            catalog.items.length + index
          ),
          media: relatedMedia,
        }
      })

      // Trakt doesn't provide total pages info, so we assume no more pages if we get less than limit
      const hasMore = relatedData.length >= 20

      // Create updated pagination info
      const newPaginationInfo = {
        currentPage: nextPage,
        hasMore,
      }

      // Append new items to catalog
      const updatedCatalog = catalog.appendItems(newItems, newPaginationInfo)

      this.logger.debug(
        `Loaded page ${nextPage} for catalog ${catalog.id}, added ${newItems.length} items`,
        {
          totalItems: updatedCatalog.items.length,
          hasMore: updatedCatalog.paginationInfo.hasMore,
        }
      )

      return ok(updatedCatalog, 'trakt')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to load more items for catalog ${catalog.id}`, err)
      return fail(err, 'trakt', 'api_error')
    }
  }
}