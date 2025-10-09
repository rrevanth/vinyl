import type { Person } from '../entities/Person'
import type { ExternalIds } from '../entities/ExternalIds'
import type { Result } from '../types/Result'

/**
 * People External IDs Capability - Cross-platform person ID mapping
 */
export interface IPeopleExternalIdsCapability {
  /**
   * Get external IDs for a person across different platforms
   * @param person - The person to get external IDs for
   * @returns ExternalIds object with platform mappings
   */
  getExternalIds(person: Person): Promise<Result<ExternalIds>>

  /**
   * Find person by external ID from another platform
   * @param externalId - External ID to search by
   * @param platform - Platform the ID belongs to (imdb, tmdb, etc.)
   * @returns Person object if found
   */
  findByExternalId(externalId: string, platform: string): Promise<Result<Person | null>>
}
