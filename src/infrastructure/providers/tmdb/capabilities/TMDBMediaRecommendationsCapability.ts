import type { IMediaRecommendationsCapability } from '../../../../domain/capabilities/IMediaRecommendationsCapability'
import type { Media } from '../../../../domain/entities/Media'
import type { Catalog } from '../../../../domain/entities/Catalog'
import { Catalog as CatalogEntity } from '../../../../domain/entities/Catalog'
import type { TMDBClient } from '../../../api/tmdb/TMDBClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { TMDBMediaMapper } from '../../../mappers/tmdb/TMDBMediaMapper'
import { StableIdGenerator } from '../../../../domain/entities/StableIdGenerator'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * TMDB Media Recommendations Capability
 *
 * Provides "Similar" catalogs for movies and TV shows based on TMDB's algorithms.
 */
export class TMDBMediaRecommendationsCapability implements IMediaRecommendationsCapability {
  constructor(
    private readonly tmdbClient: TMDBClient,
    private readonly logger: ILoggingService
  ) {}

  async getRecommendations(media: Media): Promise<Result<Catalog[]>> {
    // Extract TMDB ID from media's external IDs
    const tmdbId = this.extractTMDBId(media)
    if (!tmdbId) {
      this.logger.warn(`No TMDB ID found for media: ${media.title}`)
      return fail(
        new Error(`No TMDB ID found for ${media.type} media: ${media.title}`),
        'tmdb',
        'missing_id'
      )
    }

    try {
      const catalogs: Catalog[] = []

      if (media.type === 'movie') {
        // Get similar movies
        catalogs.push(await this.createSimilarMoviesCatalog(tmdbId, media))
      } else if (media.type === 'series') {
        // Get similar TV shows
        catalogs.push(await this.createSimilarTVCatalog(tmdbId, media))
      } else {
        return fail(
          new Error(`Recommendations not supported for media type: ${media.type}`),
          'tmdb',
          'unsupported'
        )
      }

      // Filter out empty catalogs
      const nonEmptyCatalogs = catalogs.filter((catalog) => catalog.items.length > 0)

      this.logger.debug(
        `Retrieved ${nonEmptyCatalogs.length} recommendation catalogs for ${media.type} ${tmdbId}`,
        {
          title: media.title,
          catalogNames: nonEmptyCatalogs.map((c) => c.name),
        }
      )

      return ok(nonEmptyCatalogs, 'tmdb')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get recommendations for ${media.type}: ${media.title}`, err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  /**
   * Create similar movies catalog
   */
  private async createSimilarMoviesCatalog(movieId: number, contextMedia: Media): Promise<Catalog> {
    try {
      const response = await this.tmdbClient.movies.getSimilarMovies(movieId, 1)

      const items = response.results.map((movie: any, index: number) => {
        const media = TMDBMediaMapper.fromMovieResponse(movie)
        return {
          stableId: StableIdGenerator.forCatalogItem(
            `tmdb-similar-movies-${movieId}`,
            media.stableId,
            index
          ),
          media,
        }
      })

      return new CatalogEntity({
        id: `tmdb-similar-movies-${movieId}`,
        providerId: 'tmdb',
        type: 'movie',
        category: 'similar',
        name: `Similar to "${contextMedia.title}"`,
        description: `Movies similar to ${contextMedia.title}`,
        items,
        contextMedia,
        sourceInfo: {
          originalUrl: `/movie/${movieId}/similar`,
          totalCount: response.total_results,
          lastUpdated: new Date(),
        },
        paginationInfo: {
          currentPage: response.page,
          totalPages: response.total_pages,
          hasMore: response.page < response.total_pages,
        },
      })
    } catch (error) {
      this.logger.warn(`Failed to get similar movies for ${movieId}`, error as Error)
      return this.createEmptyCatalog('similar', 'movie', contextMedia)
    }
  }

  /**
   * Create similar TV shows catalog
   */
  private async createSimilarTVCatalog(tvId: number, contextMedia: Media): Promise<Catalog> {
    try {
      const response = await this.tmdbClient.tv.getSimilarTVShows(tvId, 1)

      const items = response.results.map((tv: any, index: number) => {
        const media = TMDBMediaMapper.fromTVResponse(tv)
        return {
          stableId: StableIdGenerator.forCatalogItem(
            `tmdb-similar-tv-${tvId}`,
            media.stableId,
            index
          ),
          media,
        }
      })

      return new CatalogEntity({
        id: `tmdb-similar-tv-${tvId}`,
        providerId: 'tmdb',
        type: 'series',
        category: 'similar',
        name: `Similar to "${contextMedia.title}"`,
        description: `TV shows similar to ${contextMedia.title}`,
        items,
        contextMedia,
        sourceInfo: {
          originalUrl: `/tv/${tvId}/similar`,
          totalCount: response.total_results,
          lastUpdated: new Date(),
        },
        paginationInfo: {
          currentPage: response.page,
          totalPages: response.total_pages,
          hasMore: response.page < response.total_pages,
        },
      })
    } catch (error) {
      this.logger.warn(`Failed to get similar TV shows for ${tvId}`, error as Error)
      return this.createEmptyCatalog('similar', 'series', contextMedia)
    }
  }

  /**
   * Create empty catalog when API calls fail
   */
  private createEmptyCatalog(
    category: string,
    type: 'movie' | 'series',
    contextMedia: Media
  ): Catalog {
    return new CatalogEntity({
      id: `tmdb-empty-${category}-${type}`,
      providerId: 'tmdb',
      type,
      category,
      name: `${category} (unavailable)`,
      description: `${category} for ${contextMedia.title} are currently unavailable`,
      items: [],
      contextMedia,
      sourceInfo: {
        lastUpdated: new Date(),
      },
      paginationInfo: {
        currentPage: 0,
        hasMore: false,
      },
    })
  }

  /**
   * Extract TMDB ID from media's external IDs
   */
  private extractTMDBId(media: Media): number | null {
    if (media.externalIds.tmdb?.id) {
      const id = parseInt(media.externalIds.tmdb.id)
      if (!isNaN(id)) {
        return id
      }
    }

    this.logger.warn(`No TMDB ID found for media: ${media.title}`)
    return null
  }
}
