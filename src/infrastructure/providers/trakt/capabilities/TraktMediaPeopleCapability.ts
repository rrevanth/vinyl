import type { IMediaPeopleCapability } from '@/src/domain/capabilities/IMediaPeopleCapability'
import type { Catalog } from '@/src/domain/entities/Catalog'
import { Catalog as CatalogEntity } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import { StableIdGenerator } from '@/src/domain/entities/StableIdGenerator'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * Trakt Media People Capability
 * Provides cast and crew information as people catalogs
 *
 * NOTE: This returns people as Media entities (type='person') in catalogs
 * The actual person details would need a separate PersonMapper if required
 */
export class TraktMediaPeopleCapability implements IMediaPeopleCapability {
  constructor(
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  async getPeopleCatalogs(media: Media): Promise<Result<Catalog[]>> {
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

      // Get people (cast & crew) from Trakt
      let peopleData: any
      if (media.type === 'movie') {
        peopleData = await this.traktClient.movies.getPeople(traktId, {
          extended: 'full,images' as any,
        })
      } else if (media.type === 'series') {
        peopleData = await this.traktClient.shows.getPeople(traktId, {
          extended: 'full,images' as any,
        })
      } else {
        return fail(
          new Error(`People data only available for movies and series, got: ${media.type}`),
          'trakt',
          'unsupported'
        )
      }

      const catalogs: Catalog[] = []

      // Create cast catalog if available
      if (peopleData.cast && peopleData.cast.length > 0) {
        const castItems = peopleData.cast.map((castMember: any, index: number) => ({
          stableId: StableIdGenerator.forCatalogItem(
            `cast-${media.stableId}`,
            castMember.person.ids.trakt.toString(),
            index
          ),
          person: castMember.person, // Store person data directly
          character: castMember.character,
          order: index,
        }))

        catalogs.push(
          new CatalogEntity({
            id: `cast-${media.stableId}`,
            providerId: 'trakt',
            type: 'mixed', // People catalogs are mixed type
            category: 'cast',
            name: 'Cast',
            description: `Cast members of ${media.title}`,
            items: castItems,
            sourceInfo: {
              originalUrl: `/${media.type === 'series' ? 'shows' : 'movies'}/${traktId}/people`,
              totalCount: castItems.length,
              lastUpdated: new Date(),
            },
          })
        )
      }

      // Create crew catalog if available (directors, writers, producers)
      const crewTypes = ['directors', 'writers', 'producers']
      for (const crewType of crewTypes) {
        if (peopleData.crew?.[crewType] && peopleData.crew[crewType].length > 0) {
          const crewItems = peopleData.crew[crewType].map((crewMember: any, index: number) => ({
            stableId: StableIdGenerator.forCatalogItem(
              `${crewType}-${media.stableId}`,
              crewMember.person.ids.trakt.toString(),
              index
            ),
            person: crewMember.person,
            job: crewMember.job,
            order: index,
          }))

          catalogs.push(
            new CatalogEntity({
              id: `${crewType}-${media.stableId}`,
              providerId: 'trakt',
              type: 'mixed',
              category: crewType,
              name: crewType.charAt(0).toUpperCase() + crewType.slice(1),
              description: `${crewType} of ${media.title}`,
              items: crewItems,
              sourceInfo: {
                originalUrl: `/${media.type === 'series' ? 'shows' : 'movies'}/${traktId}/people`,
                totalCount: crewItems.length,
                lastUpdated: new Date(),
              },
            })
          )
        }
      }

      this.logger.debug(`Retrieved ${catalogs.length} people catalogs for: ${media.title}`)
      return ok(catalogs, "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get people catalogs for ${media.type}: ${media.title}`, err)
      return fail(err, "trakt", "api_error")
    }
  }
}