import { Person, PersonImages } from '../../../../domain/entities/Person'
import { BaseTraktMapper } from '../base/BaseTraktMapper'
import type { TraktPerson } from '../../../api/trakt/types'

/**
 * Maps Trakt person responses to Person entities
 */
export class TraktPersonMapper extends BaseTraktMapper {
  /**
   * Create Person entity from Trakt person response
   */
  static fromPerson(traktPerson: TraktPerson): Person {
    const name = this.validateRequired(traktPerson.name, 'name')
    const externalIds = this.createExternalIds(traktPerson.ids, 'movie') // Default to movie for person URLs

    // Trakt doesn't provide images directly, but might have them in extended responses
    const images = new PersonImages({
      profile: traktPerson.images?.headshot?.[0], // Use headshot as primary profile
      headshot: traktPerson.images?.headshot?.[0],
      profileAlternatives: traktPerson.images?.headshot?.slice(1), // Additional headshots as alternatives
    })

    return new Person({
      externalIds,
      name,
      images,
      // Trakt doesn't provide knownForDepartment, would need to be inferred from context
    })
  }

  /**
   * Create Person entity with known department context
   * Useful when mapping from cast/crew where we know their role
   */
  static fromPersonWithDepartment(traktPerson: TraktPerson, knownForDepartment?: string): Person {
    const name = this.validateRequired(traktPerson.name, 'name')
    const externalIds = this.createExternalIds(traktPerson.ids, 'movie') // Default to movie for person URLs

    const images = new PersonImages({
      profile: traktPerson.images?.headshot?.[0],
      headshot: traktPerson.images?.headshot?.[0],
      profileAlternatives: traktPerson.images?.headshot?.slice(1),
    })

    return new Person({
      externalIds,
      name,
      images,
      knownForDepartment,
    })
  }

  /**
   * Batch create Person entities from array of Trakt persons
   */
  static fromPersonArray(traktPersons: TraktPerson[]): Person[] {
    return traktPersons.map((person) => this.fromPerson(person))
  }

  /**
   * Batch create Person entities with department context
   */
  static fromPersonArrayWithDepartment(
    traktPersons: TraktPerson[],
    knownForDepartment?: string
  ): Person[] {
    return traktPersons.map((person) => this.fromPersonWithDepartment(person, knownForDepartment))
  }
}
