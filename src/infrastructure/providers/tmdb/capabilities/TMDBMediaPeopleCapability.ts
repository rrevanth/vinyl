import type { IMediaPeopleCapability } from '../../../../domain/capabilities/IMediaPeopleCapability'
import type { Media } from '../../../../domain/entities/Media'
import { Catalog, type CatalogItem } from '../../../../domain/entities/Catalog'
import type { TMDBDetailCache } from '../cache/TMDBDetailCache'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { TMDBPersonMapper } from '../../../mappers/tmdb/entities/TMDBPersonMapper'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * TMDB Media People Capability
 *
 * Extracts cast and crew information from cached media details and creates
 * people catalogs (Main Cast, Supporting Cast, Directors, Writers, Producers, etc.).
 */
export class TMDBMediaPeopleCapability implements IMediaPeopleCapability {
  constructor(
    private readonly cache: TMDBDetailCache,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get people catalogs for a media item
   */
  async getPeopleCatalogs(media: Media): Promise<Result<Catalog[]>> {
    // Extract TMDB ID from media's external IDs
    const tmdbId = this.extractTMDBId(media)
    if (!tmdbId) {
      this.logger.warn(`No TMDB ID found for media: ${media.title}`)
      return fail(
        new Error(`No TMDB ID found for media: ${media.title}`),
        'tmdb',
        'missing_id'
      )
    }

    try {
      let mediaDetails: any
      if (media.type === 'movie') {
        mediaDetails = await this.cache.getOrFetchMovieDetails(tmdbId)
      } else if (media.type === 'series') {
        mediaDetails = await this.cache.getOrFetchTVDetails(tmdbId)
      } else {
        return fail(
          new Error(`Unsupported media type: ${media.type}`),
          'tmdb',
          'unsupported'
        )
      }

      const catalogs: Catalog[] = []

      // Process credits
      if (mediaDetails.credits) {
        const peopleCatalogs = this.createPeopleCatalogs(media, mediaDetails.credits, tmdbId)
        catalogs.push(...peopleCatalogs)
      }

      this.logger.debug(`Generated ${catalogs.length} people catalogs for media ${tmdbId}`, {
        title: media.title,
        type: media.type,
      })

      return ok(catalogs, 'tmdb', { cached: true })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get people catalogs for media: ${media.title}`, err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  /**
   * Create people catalogs from credits data
   */
  private createPeopleCatalogs(media: Media, credits: any, tmdbId: number): Catalog[] {
    const catalogs: Catalog[] = []

    // Create cast catalogs
    if (credits.cast?.length > 0) {
      const castCatalog = this.createCastCatalog(media, credits.cast, tmdbId)
      catalogs.push(castCatalog)
    }

    // Create crew catalogs grouped by department
    if (credits.crew?.length > 0) {
      const crewCatalogs = this.createCrewCatalogs(media, credits.crew, tmdbId)
      catalogs.push(...crewCatalogs)
    }

    return catalogs
  }

  /**
   * Create cast catalog
   */
  private createCastCatalog(media: Media, cast: any[], tmdbId: number): Catalog {
    // Sort by order (main cast first)
    const sortedCast = cast.sort((a, b) => (a.order || 999) - (b.order || 999))

    const items: CatalogItem[] = sortedCast.map((castMember) => ({
      stableId: '',
      person: TMDBPersonMapper.fromTMDB(castMember),
      metadata: {
        character: castMember.character,
        order: castMember.order,
        creditId: castMember.credit_id,
      },
    }))

    return new Catalog({
      id: `tmdb_media_${tmdbId}_cast`,
      providerId: 'tmdb',
      name: `${media.title} - Cast`,
      type: 'person',
      category: 'cast',
      items,

      sourceInfo: {
        providerId: 'tmdb',
        apiVersion: 'v3',
        totalCount: items.length,
        lastUpdated: new Date(),
      },

      paginationInfo: {
        currentPage: 1,
        totalPages: 1,
        hasMore: false,
        offset: 0,
        limit: items.length,
      },
    })
  }

  /**
   * Create crew catalogs grouped by department
   */
  private createCrewCatalogs(media: Media, crew: any[], tmdbId: number): Catalog[] {
    const catalogs: Catalog[] = []

    // Group crew by department
    const departmentGroups: Record<string, any[]> = {}
    crew.forEach((crewMember) => {
      const department = crewMember.department || 'Other'
      if (!departmentGroups[department]) {
        departmentGroups[department] = []
      }
      departmentGroups[department].push(crewMember)
    })

    // Create catalog for each major department
    const majorDepartments = ['Directing', 'Writing', 'Production', 'Camera', 'Sound', 'Editing']

    majorDepartments.forEach((department) => {
      const departmentCrew = departmentGroups[department]
      if (!departmentCrew?.length) return

      const items: CatalogItem[] = departmentCrew.map((crewMember) => ({
        stableId: '',
        person: TMDBPersonMapper.fromTMDB(crewMember),
        metadata: {
          job: crewMember.job,
          department: crewMember.department,
          creditId: crewMember.credit_id,
        },
      }))

      const catalog = new Catalog({
        id: `tmdb_media_${tmdbId}_crew_${department.toLowerCase()}`,
        providerId: 'tmdb',
        name: `${media.title} - ${department}`,
        type: 'person',
        category: 'crew',
        items,

        sourceInfo: {
          providerId: 'tmdb',
          apiVersion: 'v3',
          totalCount: items.length,
          lastUpdated: new Date(),
        },

        paginationInfo: {
          currentPage: 1,
          totalPages: 1,
          hasMore: false,
          offset: 0,
          limit: items.length,
        },
      })

      catalogs.push(catalog)
    })

    return catalogs
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
