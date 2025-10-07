import type { IPeopleMetadataCapability } from '@/src/domain/capabilities/IPeopleMetadataCapability'
import { Person } from '@/src/domain/entities/Person'
import type { TraktDetailCache } from '@/src/infrastructure/providers/trakt/cache/TraktDetailCache'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { TraktPeopleMapper } from '@/src/infrastructure/providers/trakt/mappers/TraktPeopleMapper'

/**
 * Trakt People Metadata Capability
 *
 * Retrieves detailed person information from Trakt API including biography,
 * birth info, and career details via the detail cache.
 *
 * Note: Trakt doesn't have a direct person details endpoint, so we use
 * the search API with extended=full to get complete person data.
 */
export class TraktPeopleMetadataCapability implements IPeopleMetadataCapability {
  constructor(
    private readonly detailCache: TraktDetailCache,
    private readonly logger: ILoggingService
  ) {}

  async getPersonMetadata(person: Person): Promise<Person> {
    try {
      // Extract Trakt person ID from external IDs
      const traktId = this.extractTraktId(person)
      if (!traktId) {
        throw new Error(`No Trakt ID found for person: ${person.name}`)
      }

      // Get person details from cache (uses search API internally)
      const traktPerson = await this.detailCache.getOrFetchPersonDetails(traktId)

      // Convert Trakt response to Person entity
      // Note: Additional metadata like biography, birthday is available in the
      // TraktPerson object but not stored in the Person entity. These should be
      // managed separately in Legend State if needed for UI.
      const enrichedPerson = TraktPeopleMapper.toPerson(traktPerson)

      this.logger.debug(`Retrieved metadata for person ${traktId}`, {
        name: enrichedPerson.name,
        hasBiography: !!traktPerson.biography,
        hasBirthday: !!traktPerson.birthday,
      })

      return enrichedPerson
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get metadata for person: ${person.name}`, err)
      throw err
    }
  }

  async getBatchPersonMetadata(people: Person[]): Promise<Person[]> {
    const enrichedPeople: Person[] = []

    // Process people in parallel with concurrency limit
    const concurrency = 5
    const chunks = this.chunkArray(people, concurrency)

    for (const chunk of chunks) {
      const chunkPromises = chunk.map(async (person) => {
        try {
          return await this.getPersonMetadata(person)
        } catch (error) {
          this.logger.error(`Failed to enrich person in batch: ${person.name}`, error as Error)
          // Return original person if enrichment fails
          return person
        }
      })

      const chunkResults = await Promise.all(chunkPromises)
      enrichedPeople.push(...chunkResults)
    }

    this.logger.debug(`Enriched ${enrichedPeople.length}/${people.length} people in batch`)
    return enrichedPeople
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

  /**
   * Split array into chunks for batch processing
   */
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }
}