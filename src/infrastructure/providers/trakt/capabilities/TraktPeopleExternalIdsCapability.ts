import type { IPeopleExternalIdsCapability } from '@/src/domain/capabilities/IPeopleExternalIdsCapability'
import type { Person } from '@/src/domain/entities/Person'
import { ExternalIds, ExternalId } from '@/src/domain/entities/ExternalIds'
import type { TraktDetailCache } from '@/src/infrastructure/providers/trakt/cache/TraktDetailCache'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktClient } from '@/src/infrastructure/api/trakt/TraktClient'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * Trakt People External IDs Capability
 *
 * Provides cross-platform person ID mapping using Trakt's comprehensive
 * ID system (Trakt, TMDB, IMDB, TVDB).
 */
export class TraktPeopleExternalIdsCapability implements IPeopleExternalIdsCapability {
  constructor(
    private readonly detailCache: TraktDetailCache,
    private readonly traktClient: TraktClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get external IDs for a person from cached details
   */
  async getExternalIds(person: Person): Promise<Result<ExternalIds>> {
    try {
      const traktId = this.extractTraktId(person)
      if (!traktId) {
        throw new Error(`No Trakt ID found for person: ${person.name}`)
      }

      // Get person details from cache (includes all external IDs)
      const traktPerson = await this.detailCache.getOrFetchPersonDetails(traktId)

      // Build comprehensive external IDs object
      const externalIds = new ExternalIds({
        trakt: new ExternalId(
          traktPerson.ids.trakt.toString(),
          'trakt',
          `https://trakt.tv/people/${traktPerson.ids.slug}`
        ),
        tmdb: traktPerson.ids.tmdb
          ? new ExternalId(
              traktPerson.ids.tmdb.toString(),
              'tmdb',
              `https://www.themoviedb.org/person/${traktPerson.ids.tmdb}`
            )
          : undefined,
        imdb: traktPerson.ids.imdb
          ? new ExternalId(
              traktPerson.ids.imdb,
              'imdb',
              `https://www.imdb.com/name/${traktPerson.ids.imdb}/`
            )
          : undefined,
        tvdb: traktPerson.ids.tvdb
          ? new ExternalId(
              traktPerson.ids.tvdb.toString(),
              'tvdb',
              `https://www.thetvdb.com/?id=${traktPerson.ids.tvdb}`
            )
          : undefined,
      })

      this.logger.debug(`Retrieved external IDs for person ${traktId}`, {
        name: traktPerson.name,
        hasTmdb: !!traktPerson.ids.tmdb,
        hasImdb: !!traktPerson.ids.imdb,
        hasTvdb: !!traktPerson.ids.tvdb,
      })

      return ok(externalIds, "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get external IDs for person: ${person.name}`, err)
      return fail(err, "trakt", "api_error")
    }
  }

  /**
   * Find person by external ID from another platform
   */
  async findByExternalId(externalId: string, platform: string): Promise<Result<Person | null>> {
    try {
      this.logger.debug(`Finding person by ${platform} ID: ${externalId}`)

      // Use Trakt's search by external ID functionality
      // Note: searchByExternalId only accepts single extended value, not array
      const searchResults = await this.traktClient.search.searchByExternalId(
        platform as 'imdb' | 'tmdb' | 'tvdb',
        externalId,
        {
          type: 'person',
          extended: 'full', // Use 'full' to get comprehensive person data
        }
      )

      if (searchResults.length === 0 || !searchResults[0].person) {
        this.logger.debug(`No person found for ${platform} ID: ${externalId}`)
        return ok(null, "trakt", { cached: false })
      }

      // Import mapper to convert to Person entity
      const { TraktPeopleMapper } = await import(
        '@/src/infrastructure/providers/trakt/mappers/TraktPeopleMapper'
      )
      const person = TraktPeopleMapper.toPerson(searchResults[0].person)

      this.logger.debug(`Found person by ${platform} ID: ${externalId}`, {
        name: person.name,
        traktId: person.externalIds.trakt?.id,
      })

      return ok(person, "trakt", { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to find person by ${platform} ID: ${externalId}`, err)
      // Return null instead of throwing - person not found is a valid result
      return ok(null, "trakt", { cached: false })
    }
  }

  /**
   * Extract Trakt ID from person's external IDs
   */
  private extractTraktId(person: Person): number | null {
    if (person.externalIds.trakt?.id) {
      const id = parseInt(person.externalIds.trakt.id)
      if (!isNaN(id)) {
        return id
      }
    }

    this.logger.warn(`No Trakt ID found for person: ${person.name}`)
    return null
  }
}