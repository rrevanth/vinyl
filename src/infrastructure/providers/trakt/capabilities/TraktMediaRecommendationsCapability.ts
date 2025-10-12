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
}