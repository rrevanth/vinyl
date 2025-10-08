import { TraktBaseClient } from '../TraktBaseClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TraktConfigFactory } from '@/src/infrastructure/factories/TraktConfigFactory'
import type {
  TraktPerson,
  TraktPersonCredits,
  TraktExtended,
  TraktPaginationParams,
} from '../types'

/**
 * Trakt People API client
 *
 * Provides comprehensive person-related functionality including:
 * - Person details with extended info support
 * - Movie credits (cast and crew)
 * - TV show credits (cast and crew with episode counts)
 */
export class TraktPeopleClient extends TraktBaseClient {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(configFactory: TraktConfigFactory, logger: ILoggingService) {
    super(configFactory, logger)
  }

  /**
   * Get person details by ID
   * @param personId - Trakt ID, slug, or IMDB ID
   */
  async getDetails(
    personId: string | number,
    options?: { extended?: TraktExtended | TraktExtended[] }
  ): Promise<TraktPerson> {
    return this.get<TraktPerson>(`/people/${personId}`, options)
  }

  /**
   * Get movie credits for a person (cast and crew)
   * Returns complete filmography with character names and job titles
   *
   * @param personId - Trakt ID, slug, or IMDB ID
   * @param options - Extended info options (recommended: 'full' for complete movie data)
   * @returns Cast array and crew object grouped by department
   */
  async getMovieCredits(
    personId: string | number,
    options?: { extended?: TraktExtended | TraktExtended[] }
  ): Promise<TraktPersonCredits> {
    return this.get<TraktPersonCredits>(`/people/${personId}/movies`, options)
  }

  /**
   * Get TV show credits for a person (cast and crew)
   * Includes episode counts and series regular flags
   *
   * @param personId - Trakt ID, slug, or IMDB ID
   * @param options - Extended info options (recommended: 'full' for complete show data)
   * @returns Cast array and crew object grouped by department with episode counts
   */
  async getShowCredits(
    personId: string | number,
    options?: { extended?: TraktExtended | TraktExtended[] }
  ): Promise<TraktPersonCredits> {
    return this.get<TraktPersonCredits>(`/people/${personId}/shows`, options)
  }

  /**
   * Get lists containing this person
   */
  async getLists(
    personId: string | number,
    params?: TraktPaginationParams & {
      type?: 'all' | 'personal' | 'official'
      sort?: 'popular' | 'likes' | 'comments' | 'items' | 'added' | 'updated'
    }
  ): Promise<any[]> {
    return this.get<any[]>(`/people/${personId}/lists`, params)
  }
}