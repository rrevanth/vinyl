import type { IPeopleFilmographyCapability } from '../../../../domain/capabilities/IPeopleFilmographyCapability'
import type { Person } from '../../../../domain/entities/Person'
import { Catalog, type CatalogItem } from '../../../../domain/entities/Catalog'
import type { TMDBDetailCache } from '../cache/TMDBDetailCache'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { TMDBMediaMapper } from '../../../mappers/tmdb/TMDBMediaMapper'

/**
 * TMDB People Filmography Capability
 *
 * Extracts filmography data from cached person details and creates
 * role-based catalogs (Actor, Director, Producer, Writer, etc.).
 */
export class TMDBPeopleFilmographyCapability implements IPeopleFilmographyCapability {
  constructor(
    private readonly cache: TMDBDetailCache,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get filmography catalogs for a person
   */
  async getFilmography(person: Person): Promise<Catalog[]> {
    try {
      // Extract TMDB ID from person's external IDs
      const tmdbId = this.extractTMDBId(person)
      if (!tmdbId) {
        throw new Error(`No TMDB ID found for person: ${person.name}`)
      }

      // Get cached person details with credits
      const personDetails = await this.cache.getOrFetchPersonDetails(tmdbId)

      const catalogs: Catalog[] = []

      // Process movie credits
      if (personDetails.movie_credits) {
        const movieCatalogs = this.createMovieCreditsCatalogs(person, personDetails.movie_credits)
        catalogs.push(...movieCatalogs)
      }

      // Process TV credits
      if (personDetails.tv_credits) {
        const tvCatalogs = this.createTVCreditsCatalogs(person, personDetails.tv_credits)
        catalogs.push(...tvCatalogs)
      }

      this.logger.debug(`Generated ${catalogs.length} filmography catalogs for person ${tmdbId}`, {
        name: person.name,
        movieCredits: personDetails.movie_credits?.cast?.length || 0,
        tvCredits: personDetails.tv_credits?.cast?.length || 0,
      })

      return catalogs
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get filmography for person: ${person.name}`, err)
      throw err
    }
  }

  /**
   * Create movie credit catalogs grouped by role
   */
  private createMovieCreditsCatalogs(person: Person, movieCredits: any): Catalog[] {
    const catalogs: Catalog[] = []
    const personId = this.extractTMDBId(person)

    // Group credits by department/role
    const roleGroups: Record<string, any[]> = {}

    // Process cast (actor) credits
    if (movieCredits.cast?.length > 0) {
      roleGroups['Actor'] = movieCredits.cast
    }

    // Process crew credits grouped by department
    if (movieCredits.crew?.length > 0) {
      movieCredits.crew.forEach((credit: any) => {
        const department = credit.department || 'Other'
        if (!roleGroups[department]) {
          roleGroups[department] = []
        }
        roleGroups[department].push(credit)
      })
    }

    // Create catalog for each role group
    Object.entries(roleGroups).forEach(([role, credits]) => {
      if (credits.length === 0) return

      const items: CatalogItem[] = credits
        .sort((a: any, b: any) => {
          // Sort by release date (newest first)
          const dateA = new Date(a.release_date || '1900-01-01').getTime()
          const dateB = new Date(b.release_date || '1900-01-01').getTime()
          return dateB - dateA
        })
        .map((credit: any) => ({
          stableId: '',
          media: TMDBMediaMapper.fromMovieResponse(credit),
          metadata: {
            role: role === 'Actor' ? credit.character : credit.job,
            department: credit.department,
            order: credit.order,
          },
        }))

      const catalog = new Catalog({
        id: `tmdb_person_${personId}_movies_${role.toLowerCase().replace(/\s+/g, '_')}`,
        providerId: 'tmdb',
        name: `${person.name} as ${role} in Movies`,
        type: 'movie',
        category: 'filmography',
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
   * Create TV credit catalogs grouped by role
   */
  private createTVCreditsCatalogs(person: Person, tvCredits: any): Catalog[] {
    const catalogs: Catalog[] = []
    const personId = this.extractTMDBId(person)

    // Group credits by department/role
    const roleGroups: Record<string, any[]> = {}

    // Process cast (actor) credits
    if (tvCredits.cast?.length > 0) {
      roleGroups['Actor'] = tvCredits.cast
    }

    // Process crew credits grouped by department
    if (tvCredits.crew?.length > 0) {
      tvCredits.crew.forEach((credit: any) => {
        const department = credit.department || 'Other'
        if (!roleGroups[department]) {
          roleGroups[department] = []
        }
        roleGroups[department].push(credit)
      })
    }

    // Create catalog for each role group
    Object.entries(roleGroups).forEach(([role, credits]) => {
      if (credits.length === 0) return

      const items: CatalogItem[] = credits
        .sort((a: any, b: any) => {
          // Sort by first air date (newest first)
          const dateA = new Date(a.first_air_date || '1900-01-01').getTime()
          const dateB = new Date(b.first_air_date || '1900-01-01').getTime()
          return dateB - dateA
        })
        .map((credit: any) => ({
          stableId: '',
          media: TMDBMediaMapper.fromTVResponse(credit),
          metadata: {
            role: role === 'Actor' ? credit.character : credit.job,
            department: credit.department,
            episodeCount: credit.episode_count,
          },
        }))

      const catalog = new Catalog({
        id: `tmdb_person_${personId}_tv_${role.toLowerCase().replace(/\s+/g, '_')}`,
        providerId: 'tmdb',
        name: `${person.name} as ${role} in TV Shows`,
        type: 'series',
        category: 'filmography',
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
   * Extract TMDB ID from person's external IDs
   */
  private extractTMDBId(person: Person): number | null {
    if (person.externalIds.tmdb?.id) {
      const id = parseInt(person.externalIds.tmdb.id)
      if (!isNaN(id)) {
        return id
      }
    }

    this.logger.warn(`No TMDB ID found for person: ${person.name}`)
    return null
  }
}
