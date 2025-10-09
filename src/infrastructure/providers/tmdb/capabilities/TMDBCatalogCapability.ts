import type { IMediaCatalogCapability } from '../../../../domain/capabilities/IMediaCatalogCapability'
import type { Catalog } from '../../../../domain/entities/Catalog'
import { Catalog as CatalogEntity } from '../../../../domain/entities/Catalog'
import type { CatalogFilters } from '../../../../domain/entities/StableIdGenerator'
import type { TMDBClient } from '../../../api/tmdb/TMDBClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { TMDBMediaMapper } from '../../../mappers/tmdb/TMDBMediaMapper'
import { StableIdGenerator } from '../../../../domain/entities/StableIdGenerator'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * TMDB Media Catalog Capability
 *
 * Provides TMDB's curated catalogs: Popular, Top Rated, Trending, Now Playing, etc.
 * This capability fetches fresh data from TMDB API (not cached).
 */
export class TMDBCatalogCapability implements IMediaCatalogCapability {
  constructor(
    private readonly tmdbClient: TMDBClient,
    private readonly logger: ILoggingService
  ) {}

  async getCatalogs(filters?: CatalogFilters): Promise<Result<Catalog[]>> {
    try {
      this.logger.debug('Getting TMDB catalogs', { filters })

      const catalogs: Catalog[] = []

      // Movie catalogs
      if (!filters?.type || filters.type === 'movie') {
        catalogs.push(
          await this.createCatalog('movie', 'popular', 'Popular Movies'),
          await this.createCatalog('movie', 'top_rated', 'Top Rated Movies'),
          await this.createCatalog('movie', 'now_playing', 'Now Playing'),
          await this.createCatalog('movie', 'upcoming', 'Upcoming Movies')
        )
      }

      // TV Show catalogs
      if (!filters?.type || filters.type === 'series') {
        catalogs.push(
          await this.createCatalog('tv', 'popular', 'Popular TV Shows'),
          await this.createCatalog('tv', 'top_rated', 'Top Rated TV Shows'),
          await this.createCatalog('tv', 'airing_today', 'Airing Today'),
          await this.createCatalog('tv', 'on_the_air', 'Currently Airing')
        )
      }

      // Trending catalogs (mixed type)
      if (!filters?.type) {
        catalogs.push(
          await this.createTrendingCatalog('day', 'Trending Today'),
          await this.createTrendingCatalog('week', 'Trending This Week')
        )
      }

      this.logger.debug(`Retrieved ${catalogs.length} TMDB catalogs`)
      return ok(catalogs, 'tmdb')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error('Failed to get TMDB catalogs', err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  async loadMoreItems(catalog: Catalog): Promise<Result<Catalog>> {
    try {
      const nextPage = catalog.paginationInfo.currentPage + 1

      this.logger.debug(`Loading more items for catalog: ${catalog.id}, page ${nextPage}`)

      let response: any

      if (catalog.category === 'trending') {
        // Use discover client for trending content
        const timeWindow = catalog.sourceInfo.period || 'week'
        response = await this.tmdbClient.discover.getTrendingAll(timeWindow as any, nextPage)
      } else {
        // Regular catalog
        const [mediaType, catalogType] = this.parseCatalogId(catalog.id)
        response = await this.fetchCatalogData(mediaType as 'movie' | 'tv', catalogType, nextPage)
      }

      const newItems = response.results.map((item: any, index: number) => {
        const media =
          item.media_type === 'movie' || !item.media_type
            ? TMDBMediaMapper.fromMovieResponse(item)
            : TMDBMediaMapper.fromTVResponse(item)

        return {
          stableId: StableIdGenerator.forCatalogItem(
            catalog.stableId,
            media.stableId,
            catalog.items.length + index
          ),
          media,
        }
      })

      const updatedCatalog = catalog.appendItems(newItems, {
        currentPage: response.page,
        totalPages: response.total_pages,
        hasMore: response.page < response.total_pages,
      })

      return ok(updatedCatalog, 'tmdb')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to load more items for catalog: ${catalog.id}`, err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  /**
   * Create a standard TMDB catalog (movie/tv)
   */
  private async createCatalog(
    mediaType: 'movie' | 'tv',
    catalogType: string,
    displayName: string
  ): Promise<Catalog> {
    const response = await this.fetchCatalogData(mediaType, catalogType, 1)

    const items = response.results.map((item: any, index: number) => {
      const media =
        mediaType === 'movie'
          ? TMDBMediaMapper.fromMovieResponse(item)
          : TMDBMediaMapper.fromTVResponse(item)

      return {
        stableId: StableIdGenerator.forCatalogItem(
          `tmdb-${mediaType}-${catalogType}`,
          media.stableId,
          index
        ),
        media,
      }
    })

    return new CatalogEntity({
      id: `tmdb-${mediaType}-${catalogType}`,
      providerId: 'tmdb',
      type: mediaType === 'movie' ? 'movie' : 'series',
      category: catalogType,
      name: displayName,
      description: `${displayName} from TMDB`,
      items,
      sourceInfo: {
        originalUrl: `/${mediaType}/${catalogType}`,
        totalCount: response.total_results,
        lastUpdated: new Date(),
      },
      paginationInfo: {
        currentPage: response.page,
        totalPages: response.total_pages,
        hasMore: response.page < response.total_pages,
      },
    })
  }

  /**
   * Create a trending catalog (mixed movie/tv content)
   */
  private async createTrendingCatalog(
    timeWindow: 'day' | 'week',
    displayName: string
  ): Promise<Catalog> {
    const response = await this.tmdbClient.discover.getTrendingAll(timeWindow, 1)

    const items = response.results.map((item: any, index: number) => {
      const media =
        item.media_type === 'movie'
          ? TMDBMediaMapper.fromMovieResponse(item)
          : TMDBMediaMapper.fromTVResponse(item)

      return {
        stableId: StableIdGenerator.forCatalogItem(
          `tmdb-trending-${timeWindow}`,
          media.stableId,
          index
        ),
        media,
      }
    })

    return new CatalogEntity({
      id: `tmdb-trending-${timeWindow}`,
      providerId: 'tmdb',
      type: 'mixed',
      category: 'trending',
      name: displayName,
      description: `${displayName} from TMDB`,
      items,
      sourceInfo: {
        originalUrl: `/trending/all/${timeWindow}`,
        totalCount: response.total_results,
        period: timeWindow,
        lastUpdated: new Date(),
      },
      paginationInfo: {
        currentPage: response.page,
        totalPages: response.total_pages,
        hasMore: response.page < response.total_pages,
      },
    })
  }

  /**
   * Fetch catalog data from TMDB API using correct method names
   */
  private async fetchCatalogData(mediaType: 'movie' | 'tv', catalogType: string, page: number) {
    if (mediaType === 'movie') {
      switch (catalogType) {
        case 'popular':
          return this.tmdbClient.movies.getPopularMovies(page)
        case 'top_rated':
          return this.tmdbClient.movies.getTopRatedMovies(page)
        case 'now_playing':
          return this.tmdbClient.movies.getNowPlayingMovies(page)
        case 'upcoming':
          return this.tmdbClient.movies.getUpcomingMovies(page)
        default:
          throw new Error(`Unsupported movie catalog type: ${catalogType}`)
      }
    } else {
      switch (catalogType) {
        case 'popular':
          return this.tmdbClient.tv.getPopularTVShows(page)
        case 'top_rated':
          return this.tmdbClient.tv.getTopRatedTVShows(page)
        case 'airing_today':
          return this.tmdbClient.tv.getTVAiringToday(page)
        case 'on_the_air':
          return this.tmdbClient.tv.getTVOnTheAir(page)
        default:
          throw new Error(`Unsupported TV catalog type: ${catalogType}`)
      }
    }
  }

  /**
   * Parse catalog ID to extract media type and catalog type
   */
  private parseCatalogId(catalogId: string): [string, string] {
    const parts = catalogId.replace('tmdb-', '').split('-')
    if (parts.length >= 2) {
      return [parts[0], parts[1]]
    }
    throw new Error(`Invalid catalog ID format: ${catalogId}`)
  }
}
