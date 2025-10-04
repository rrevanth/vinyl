import type { Person } from '../entities/Person'
import type { Catalog } from '../entities/Catalog'

/**
 * People Filmography Capability - Returns filmography catalogs for a person
 */
export interface IPeopleFilmographyCapability {
  /**
   * Get filmography catalogs for a person
   * @param person - The person to get filmography for
   * @returns Array of filmography catalogs (e.g., "As Director", "As Producer", "As Actor", "As Writer")
   */
  getFilmography(person: Person): Promise<Catalog[]>
}
