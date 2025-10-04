import type { Person } from '../entities/Person'

/**
 * People Metadata Capability - Provides detailed person information
 */
export interface IPeopleMetadataCapability {
  /**
   * Get enriched person metadata
   * @param person - Base person to enrich
   * @returns Person with full metadata (biography, birthdate, etc.)
   */
  getPersonMetadata(person: Person): Promise<Person>

  /**
   * Get multiple people metadata in batch
   * @param people - Array of base people to enrich
   * @returns Array of enriched people
   */
  getBatchPersonMetadata(people: Person[]): Promise<Person[]>
}
