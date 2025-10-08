import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import type { Catalog } from '@/src/domain/entities/Catalog'
import { Catalog as CatalogEntity } from '@/src/domain/entities/Catalog'
import type { CatalogFilters } from '@/src/domain/entities/StableIdGenerator'
import { StableIdGenerator } from '@/src/domain/entities/StableIdGenerator'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import { TraktMediaMapper } from '../mappers/TraktMediaMapper'

/**
 * Trakt Media Catalog Capability
 * Provides trending, popular, and anticipated catalogs for movies and TV shows
 */
export class TraktMediaCatalogCapability implements IMediaCatalogCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  async getCatalogs(filters?: CatalogFilters): Promise<Catalog[]> {
    try {
      this.logger.debug('Fetching Trakt catalogs', { filters })

      // Page 0 = metadata-only mode (no API calls for items)
      if (filters?.page === 0) {
        this.logger.debug('Page 0 requested - returning metadata-only catalogs')
        const metadataCatalogs: Catalog[] = [
          this.createMetadataCatalog('trending-movies', 'movie', 'Trending Movies'),
          this.createMetadataCatalog('popular-movies', 'movie', 'Popular Movies'),
          this.createMetadataCatalog('anticipated-movies', 'movie', 'Anticipated Movies'),
          this.createMetadataCatalog('trending-shows', 'series', 'Trending Shows'),
          this.createMetadataCatalog('popular-shows', 'series', 'Popular Shows'),
          this.createMetadataCatalog('anticipated-shows', 'series', 'Anticipated Shows'),
        ]
        return metadataCatalogs
      }

      const catalogs: Catalog[] = []
      const params = {
        limit: filters?.limit || 20,
        page: 1,
        extended: 'full,images' as const,
      }

      // Fetch trending movies
      const trendingMovies = await this.traktClient.movies.getTrending(params)
      catalogs.push(this.createCatalog('trending-movies', 'movie', 'Trending Movies', trendingMovies.map(item => item.movie)))

      // Fetch popular movies
      const popularMovies = await this.traktClient.movies.getPopular(params)
      catalogs.push(this.createCatalog('popular-movies', 'movie', 'Popular Movies', popularMovies))

      // Fetch anticipated movies
      const anticipatedMovies = await this.traktClient.movies.getAnticipated(params)
      catalogs.push(this.createCatalog('anticipated-movies', 'movie', 'Anticipated Movies', anticipatedMovies.map(item => item.movie)))

      // Fetch trending shows
      const trendingShows = await this.traktClient.shows.getTrending(params)
      catalogs.push(this.createCatalog('trending-shows', 'series', 'Trending Shows', trendingShows.map(item => item.show)))

      // Fetch popular shows
      const popularShows = await this.traktClient.shows.getPopular(params)
      catalogs.push(this.createCatalog('popular-shows', 'series', 'Popular Shows', popularShows))

      // Fetch anticipated shows
      const anticipatedShows = await this.traktClient.shows.getAnticipated(params)
      catalogs.push(this.createCatalog('anticipated-shows', 'series', 'Anticipated Shows', anticipatedShows.map(item => item.show)))

      this.logger.debug(`Retrieved ${catalogs.length} Trakt catalogs`)
      return catalogs
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to fetch Trakt catalogs', err)
      throw err
    }
  }

  async loadMoreItems(catalog: Catalog): Promise<Catalog> {
    try {
      const nextPage = catalog.paginationInfo.currentPage + 1
      const params = {
        limit: 20,
        page: nextPage,
        extended: 'full,images' as const,
      }

      let newData: any[] = []

      // Determine which endpoint to call based on catalog ID
      if (catalog.id.includes('trending-movies')) {
        const result = await this.traktClient.movies.getTrending(params)
        newData = result.map(item => item.movie)
      } else if (catalog.id.includes('popular-movies')) {
        newData = await this.traktClient.movies.getPopular(params)
      } else if (catalog.id.includes('anticipated-movies')) {
        const result = await this.traktClient.movies.getAnticipated(params)
        newData = result.map(item => item.movie)
      } else if (catalog.id.includes('trending-shows')) {
        const result = await this.traktClient.shows.getTrending(params)
        newData = result.map(item => item.show)
      } else if (catalog.id.includes('popular-shows')) {
        newData = await this.traktClient.shows.getPopular(params)
      } else if (catalog.id.includes('anticipated-shows')) {
        const result = await this.traktClient.shows.getAnticipated(params)
        newData = result.map(item => item.show)
      }

      const newItems = newData.map((item, index) => {
        const media = catalog.type === 'series'
          ? TraktMediaMapper.showToMedia(item)
          : TraktMediaMapper.movieToMedia(item)

        return {
          stableId: StableIdGenerator.forCatalogItem(
            catalog.id,
            media.stableId,
            catalog.items.length + index
          ),
          media,
        }
      })

      // Append new items to catalog
      return catalog.appendItems(newItems, {
        currentPage: nextPage,
        totalPages: nextPage + 1, // Trakt doesn't provide total pages, assume there's always one more
        hasMore: newItems.length > 0,
      })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to load more items for catalog: ${catalog.id}`, err)
      throw err
    }
  }

  private createCatalog(
    id: string,
    type: 'movie' | 'series',
    name: string,
    data: any[]
  ): Catalog {
    const items = data.map((item, index) => {
      const media = type === 'series'
        ? TraktMediaMapper.showToMedia(item)
        : TraktMediaMapper.movieToMedia(item)

      return {
        stableId: StableIdGenerator.forCatalogItem(id, media.stableId, index),
        media,
      }
    })

    return new CatalogEntity({
      id,
      providerId: 'trakt',
      type,
      category: id.split('-')[0], // 'trending', 'popular', 'anticipated'
      name,
      description: `${name} from Trakt`,
      items,
      sourceInfo: {
        originalUrl: `/${type === 'series' ? 'shows' : 'movies'}/${id.split('-')[0]}`,
        totalCount: items.length,
        lastUpdated: new Date(),
      },
      paginationInfo: {
        currentPage: 1,
        totalPages: 2, // Assume there's more content
        hasMore: true,
      },
    })
  }

  private createMetadataCatalog(
    id: string,
    type: 'movie' | 'series',
    name: string
  ): Catalog {
    return new CatalogEntity({
      id,
      providerId: 'trakt',
      type,
      category: id.split('-')[0], // 'trending', 'popular', 'anticipated'
      name,
      description: `${name} from Trakt`,
      items: [], // Empty items for metadata-only mode
      sourceInfo: {
        originalUrl: `/${type === 'series' ? 'shows' : 'movies'}/${id.split('-')[0]}`,
        totalCount: 0,
        lastUpdated: new Date(),
      },
      paginationInfo: {
        currentPage: 0,
        totalPages: 1,
        hasMore: true,
      },
    })
  }
}
