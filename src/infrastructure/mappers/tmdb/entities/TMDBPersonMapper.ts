import { Person } from '../../../../domain/entities/Person'
import { BaseTMDBMapper } from '../base/BaseTMDBMapper'
import { TMDBImageMapper } from '../base/TMDBImageMapper'
import { ExternalId, ExternalIds } from '../../../../domain/entities/ExternalIds'
import type { TMDBPersonResponse } from '../../../api/tmdb/types'
import type { TMDBConfigFactory } from '../../../factories/TMDBConfigFactory'

/**
 * Maps TMDB person responses to Person entities
 */
export class TMDBPersonMapper extends BaseTMDBMapper {
  /**
   * Create Person entity from TMDB person response
   */
  static fromTMDB(tmdbPerson: TMDBPersonResponse, configFactory?: TMDBConfigFactory): Person {
    const name = this.validateRequired(tmdbPerson.name, 'name', { tmdbId: tmdbPerson.id })
    const externalIds = this.createPersonExternalIds(tmdbPerson)
    const images = TMDBImageMapper.createPersonImages(tmdbPerson, configFactory)

    return new Person({
      externalIds,
      name,
      knownForDepartment: tmdbPerson.known_for_department,
      images,
    })
  }

  /**
   * Batch create Person entities from array of TMDB person responses
   */
  static fromTMDBArray(
    tmdbPersons: TMDBPersonResponse[],
    configFactory?: TMDBConfigFactory
  ): Person[] {
    return tmdbPersons.map((tmdbPerson) => this.fromTMDB(tmdbPerson, configFactory))
  }

  /**
   * Create external IDs specifically for person entities
   */
  private static createPersonExternalIds(tmdbPerson: TMDBPersonResponse): ExternalIds {
    const externalIdsData: Partial<{
      tmdb: ExternalId
      imdb: ExternalId
    }> = {}

    // Add TMDB ID
    externalIdsData.tmdb = new ExternalId(
      tmdbPerson.id.toString(),
      'tmdb',
      `https://www.themoviedb.org/person/${tmdbPerson.id}`
    )

    // Add IMDB ID if available
    if (tmdbPerson.imdb_id) {
      externalIdsData.imdb = new ExternalId(
        tmdbPerson.imdb_id,
        'imdb',
        `https://www.imdb.com/name/${tmdbPerson.imdb_id}/`
      )
    }

    // Add external IDs from append_to_response if available
    if (tmdbPerson.external_ids?.imdb_id && !externalIdsData.imdb) {
      externalIdsData.imdb = new ExternalId(
        tmdbPerson.external_ids.imdb_id,
        'imdb',
        `https://www.imdb.com/name/${tmdbPerson.external_ids.imdb_id}/`
      )
    }

    return new ExternalIds(externalIdsData)
  }
}
