import type { IPeopleMetadataCapability } from '../../../../domain/capabilities/IPeopleMetadataCapability'
import type { Person } from '../../../../domain/entities/Person'
import type { TMDBClient } from '../../../api/tmdb/TMDBClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { TMDBPersonMapper } from '../../../mappers/tmdb/entities/TMDBPersonMapper'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * TMDB People Metadata Capability
 *
 * Retrieves detailed person information from TMDB API including biography,
 * birth info, career details, and filmography.
 */
export class TMDBPeopleMetadataCapability implements IPeopleMetadataCapability {
  constructor(
    private readonly tmdbClient: TMDBClient,
    private readonly logger: ILoggingService
  ) {}

  async getPersonMetadata(person: Person): Promise<Result<Person>> {
    // Extract TMDB ID from person's external IDs
    const tmdbId = this.extractTMDBId(person)
    if (!tmdbId) {
      this.logger.warn(`No TMDB ID found for person: ${person.name}`)
      return fail(
        new Error(`No TMDB ID found for person: ${person.name}`),
        'tmdb',
        'missing_id'
      )
    }

    try {
      // Get comprehensive person data with all available append options
      const personDetails = await this.tmdbClient.people.getPersonDetails(tmdbId, [
        'movie_credits',
        'tv_credits',
        'combined_credits',
        'external_ids',
        'images',
        'tagged_images',
      ])

      // Convert TMDB response to enriched Person entity
      const enrichedPerson = TMDBPersonMapper.fromTMDB(personDetails)

      this.logger.debug(`Retrieved metadata for person ${tmdbId}`, {
        name: enrichedPerson.name,
        department: enrichedPerson.knownForDepartment,
        movieCredits: personDetails.movie_credits?.cast?.length || 0,
        tvCredits: personDetails.tv_credits?.cast?.length || 0,
      })

      return ok(enrichedPerson, 'tmdb')
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get metadata for person: ${person.name}`, err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  async getBatchPersonMetadata(people: Person[]): Promise<Result<Person[]>> {
    const enrichedPeople: Person[] = []

    // Process people in parallel with concurrency limit
    const concurrency = 5
    const chunks = this.chunkArray(people, concurrency)

    for (const chunk of chunks) {
      const chunkPromises = chunk.map(async (person) => {
        const result = await this.getPersonMetadata(person)
        if (result.success && result.data) {
          return result.data
        } else {
          const errorMessage = result.success === false && result.error ? result.error.message : 'Unknown error'
          this.logger.warn(`Failed to enrich person in batch: ${person.name}`, {
            error: errorMessage,
          })
          // Return original person if enrichment fails
          return person
        }
      })

      const chunkResults = await Promise.all(chunkPromises)
      enrichedPeople.push(...chunkResults)
    }

    this.logger.debug(`Enriched ${enrichedPeople.length}/${people.length} people in batch`)
    return ok(enrichedPeople, 'tmdb', { count: enrichedPeople.length })
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
