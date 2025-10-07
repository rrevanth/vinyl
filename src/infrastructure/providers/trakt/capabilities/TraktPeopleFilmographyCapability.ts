import type { IPeopleFilmographyCapability } from '@/src/domain/capabilities/IPeopleFilmographyCapability'
import type { Person } from '@/src/domain/entities/Person'
import { Catalog, type CatalogItem } from '@/src/domain/entities/Catalog'
import { StableIdGenerator } from '@/src/domain/entities/StableIdGenerator'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import { TraktMediaMapper } from '../mappers/TraktMediaMapper'
import type {
  TraktPersonCredits,
  TraktPersonCastCredit,
  TraktPersonCrewCredit,
} from '@/src/infrastructure/api/trakt/types'

/**
 * Department name mappings for crew credits
 */
const DEPARTMENT_NAMES: Record<string, string> = {
  directing: 'Directing',
  writing: 'Writing',
  production: 'Production',
  art: 'Art',
  'costume & make-up': 'Costume & Make-up',
  sound: 'Sound',
  camera: 'Camera',
  'visual effects': 'Visual Effects',
  lighting: 'Lighting',
  editing: 'Editing',
  'created by': 'Creator',
}

/**
 * Trakt People Filmography Capability
 *
 * Provides comprehensive filmography data using Trakt's people credits endpoints:
 * - GET /people/{id}/movies - Movie cast and crew credits
 * - GET /people/{id}/shows - TV show cast and crew credits with episode counts
 *
 * Returns multiple catalogs grouped by role (Acting, Directing, Writing, etc.)
 */
export class TraktPeopleFilmographyCapability implements IPeopleFilmographyCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get filmography catalogs for a person
   * Fetches both movie and show credits in parallel
   *
   * @param person - Person entity with Trakt external ID
   * @returns Array of filmography catalogs grouped by department/role
   */
  async getFilmography(person: Person): Promise<Catalog[]> {
    // Extract Trakt person ID
    const traktId = person.externalIds.trakt?.id

    if (!traktId) {
      this.logger.warn('Cannot fetch filmography: Person has no Trakt ID', {
        personName: person.name,
      })
      return []
    }

    try {
      this.logger.debug('Fetching filmography for person', {
        personName: person.name,
        traktId,
      })

      // Fetch movie and show credits in parallel with extended=full for complete data
      const [movieCredits, showCredits] = await Promise.all([
        this.traktClient.people.getMovieCredits(traktId, { extended: 'full' }),
        this.traktClient.people.getShowCredits(traktId, { extended: 'full' }),
      ])

      // Build catalogs from credits
      const catalogs = this.buildFilmographyCatalogs(person, movieCredits, showCredits)

      this.logger.info('Successfully fetched filmography', {
        personName: person.name,
        catalogCount: catalogs.length,
        totalItems: catalogs.reduce((sum, cat) => sum + cat.items.length, 0),
      })

      return catalogs
    } catch (error) {
      this.logger.error('Failed to fetch filmography', error as Error, {
        personName: person.name,
        traktId,
      })
      throw error
    }
  }

  /**
   * Build filmography catalogs from movie and show credits
   * Groups by department (Acting, Directing, Writing, etc.)
   */
  private buildFilmographyCatalogs(
    person: Person,
    movieCredits: TraktPersonCredits,
    showCredits: TraktPersonCredits
  ): Catalog[] {
    const catalogs: Catalog[] = []

    // 1. Acting catalog (cast credits)
    const actingItems = this.buildActingItems(movieCredits.cast, showCredits.cast)
    if (actingItems.length > 0) {
      catalogs.push(
        new Catalog({
          id: 'acting',
          providerId: 'trakt',
          type: 'mixed',
          category: 'filmography',
          name: 'Acting',
          description: `${person.name}'s acting credits`,
          items: actingItems,
          contextPerson: person,
          sourceInfo: {
            apiVersion: 'v2',
            totalCount: actingItems.length,
          },
          paginationInfo: {
            currentPage: 1,
            hasMore: false,
          },
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        })
      )
    }

    // 2. Directing catalog
    const directingItems = this.buildCrewItems(
      movieCredits.crew.directing,
      showCredits.crew.directing
    )
    if (directingItems.length > 0) {
      catalogs.push(
        new Catalog({
          id: 'directing',
          providerId: 'trakt',
          type: 'mixed',
          category: 'filmography',
          name: 'Directing',
          description: `${person.name}'s directing credits`,
          items: directingItems,
          contextPerson: person,
          sourceInfo: {
            apiVersion: 'v2',
            totalCount: directingItems.length,
          },
          paginationInfo: {
            currentPage: 1,
            hasMore: false,
          },
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
      )
    }

    // 3. Writing catalog
    const writingItems = this.buildCrewItems(movieCredits.crew.writing, showCredits.crew.writing)
    if (writingItems.length > 0) {
      catalogs.push(
        new Catalog({
          id: 'writing',
          providerId: 'trakt',
          type: 'mixed',
          category: 'filmography',
          name: 'Writing',
          description: `${person.name}'s writing credits`,
          items: writingItems,
          contextPerson: person,
          sourceInfo: {
            apiVersion: 'v2',
            totalCount: writingItems.length,
          },
          paginationInfo: {
            currentPage: 1,
            hasMore: false,
          },
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
      )
    }

    // 4. Production catalog
    const productionItems = this.buildCrewItems(
      movieCredits.crew.production,
      showCredits.crew.production
    )
    if (productionItems.length > 0) {
      catalogs.push(
        new Catalog({
          id: 'production',
          providerId: 'trakt',
          type: 'mixed',
          category: 'filmography',
          name: 'Production',
          description: `${person.name}'s production credits`,
          items: productionItems,
          contextPerson: person,
          sourceInfo: {
            apiVersion: 'v2',
            totalCount: productionItems.length,
          },
          paginationInfo: {
            currentPage: 1,
            hasMore: false,
          },
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
      )
    }

    // 5. Creator catalog (shows only)
    if (showCredits.crew['created by'] && showCredits.crew['created by'].length > 0) {
      const creatorItems = this.buildCrewItems(undefined, showCredits.crew['created by'])
      catalogs.push(
        new Catalog({
          id: 'creator',
          providerId: 'trakt',
          type: 'series',
          category: 'filmography',
          name: 'Creator',
          description: `${person.name}'s created shows`,
          items: creatorItems,
          contextPerson: person,
          sourceInfo: {
            apiVersion: 'v2',
            totalCount: creatorItems.length,
          },
          paginationInfo: {
            currentPage: 1,
            hasMore: false,
          },
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
      )
    }

    // 6. Other crew departments (combined if items exist)
    const otherCrewItems: CatalogItem[] = []
    const otherDepartments: (keyof typeof movieCredits.crew)[] = [
      'art',
      'costume & make-up',
      'sound',
      'camera',
      'visual effects',
      'lighting',
      'editing',
    ]

    for (const dept of otherDepartments) {
      const movieDeptCredits = movieCredits.crew[dept]
      const showDeptCredits = showCredits.crew[dept]
      const items = this.buildCrewItems(movieDeptCredits, showDeptCredits)

      if (items.length > 0) {
        // Add department label to each item
        items.forEach((item) => {
          item.department = DEPARTMENT_NAMES[dept] || dept
        })
        otherCrewItems.push(...items)
      }
    }

    if (otherCrewItems.length > 0) {
      catalogs.push(
        new Catalog({
          id: 'other-crew',
          providerId: 'trakt',
          type: 'mixed',
          category: 'filmography',
          name: 'Other Crew',
          description: `${person.name}'s other crew credits`,
          items: otherCrewItems,
          contextPerson: person,
          sourceInfo: {
            apiVersion: 'v2',
            totalCount: otherCrewItems.length,
          },
          paginationInfo: {
            currentPage: 1,
            hasMore: false,
          },
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
      )
    }

    return catalogs
  }

  /**
   * Build catalog items from cast credits (acting)
   * Includes character names and episode counts for shows
   */
  private buildActingItems(
    movieCast: TraktPersonCastCredit[],
    showCast: TraktPersonCastCredit[]
  ): CatalogItem[] {
    const items: CatalogItem[] = []

    // Add movie cast credits
    movieCast.forEach((credit, index) => {
      if (credit.movie) {
        const media = TraktMediaMapper.movieToMedia(credit.movie)
        const characterName = credit.characters.join(', ')

        items.push({
          stableId: StableIdGenerator.forCatalogItem('trakt-filmography-acting', media.stableId, index),
          media,
          role: characterName,
          department: 'Acting',
          order: index,
        })
      }
    })

    // Add show cast credits
    showCast.forEach((credit, index) => {
      if (credit.show) {
        const media = TraktMediaMapper.showToMedia(credit.show)
        const characterName = credit.characters.join(', ')
        const episodeInfo = credit.episode_count
          ? ` (${credit.episode_count} episode${credit.episode_count > 1 ? 's' : ''})`
          : ''
        const regularInfo = credit.series_regular ? ' [Series Regular]' : ''
        const role = `${characterName}${episodeInfo}${regularInfo}`

        items.push({
          stableId: StableIdGenerator.forCatalogItem(
            'trakt-filmography-acting',
            media.stableId,
            movieCast.length + index
          ),
          media,
          role,
          department: 'Acting',
          order: movieCast.length + index,
        })
      }
    })

    return items
  }

  /**
   * Build catalog items from crew credits
   * Includes job titles and episode counts for shows
   */
  private buildCrewItems(
    movieCrew?: TraktPersonCrewCredit[],
    showCrew?: TraktPersonCrewCredit[]
  ): CatalogItem[] {
    const items: CatalogItem[] = []

    // Add movie crew credits
    if (movieCrew) {
      movieCrew.forEach((credit, index) => {
        if (credit.movie) {
          const media = TraktMediaMapper.movieToMedia(credit.movie)
          const jobTitle = credit.jobs.join(', ')

          items.push({
            stableId: StableIdGenerator.forCatalogItem('trakt-filmography-crew', media.stableId, index),
            media,
            role: jobTitle,
            order: index,
          })
        }
      })
    }

    // Add show crew credits
    if (showCrew) {
      showCrew.forEach((credit, index) => {
        if (credit.show) {
          const media = TraktMediaMapper.showToMedia(credit.show)
          const jobTitle = credit.jobs.join(', ')
          const episodeInfo = credit.episode_count
            ? ` (${credit.episode_count} episode${credit.episode_count > 1 ? 's' : ''})`
            : ''
          const role = `${jobTitle}${episodeInfo}`

          items.push({
            stableId: StableIdGenerator.forCatalogItem(
              'trakt-filmography-crew',
              media.stableId,
              (movieCrew?.length || 0) + index
            ),
            media,
            role,
            order: (movieCrew?.length || 0) + index,
          })
        }
      })
    }

    return items
  }
}