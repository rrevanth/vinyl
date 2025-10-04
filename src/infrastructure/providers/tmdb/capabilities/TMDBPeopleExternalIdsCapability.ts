import type { IPeopleExternalIdsCapability } from '../../../../domain/capabilities/IPeopleExternalIdsCapability'
import type { Person } from '../../../../domain/entities/Person'
import { ExternalIds, ExternalId } from '../../../../domain/entities/ExternalIds'
import type { TMDBDetailCache } from '../cache/TMDBDetailCache'
import type { TMDBClient } from '../../../api/tmdb/TMDBClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { TMDBPersonMapper } from '../../../mappers/tmdb/entities/TMDBPersonMapper'

/**
 * TMDB People External IDs Capability
 *
 * Extracts external IDs from cached person details including IMDB,
 * Instagram, Twitter, Facebook, TikTok, and other social platform links.
 */
export class TMDBPeopleExternalIdsCapability implements IPeopleExternalIdsCapability {
  constructor(
    private readonly cache: TMDBDetailCache,
    private readonly tmdbClient: TMDBClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get external IDs for a person
   */
  async getExternalIds(person: Person): Promise<ExternalIds> {
    try {
      // Extract TMDB ID from person's external IDs
      const tmdbId = this.extractTMDBId(person)
      if (!tmdbId) {
        throw new Error(`No TMDB ID found for person: ${person.name}`)
      }

      // Get cached person details with external IDs
      const personDetails = await this.cache.getOrFetchPersonDetails(tmdbId)

      // Extract and enrich external IDs from TMDB response
      const enrichedExternalIds = this.mapTMDBExternalIds(personDetails, tmdbId)

      this.logger.debug(`Retrieved external IDs for person ${tmdbId}`, {
        name: person.name,
        externalIdCount: Object.keys(enrichedExternalIds).length,
        platforms: Object.keys(enrichedExternalIds),
      })

      return enrichedExternalIds
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get external IDs for person: ${person.name}`, err)
      throw err
    }
  }

  /**
   * Find person by external ID from another platform
   */
  async findByExternalId(externalId: string, platform: string): Promise<Person | null> {
    try {
      this.logger.debug(`Finding person by external ID: ${platform}:${externalId}`)

      // For now, only support TMDB ID direct lookup
      // TMDB's find endpoint has limited external source support
      if (platform === 'tmdb') {
        const tmdbId = parseInt(externalId)
        if (!isNaN(tmdbId)) {
          const personData = await this.tmdbClient.people.getPersonDetails(tmdbId)
          const person = TMDBPersonMapper.fromTMDB(personData)

          this.logger.debug(`Found person by TMDB ID: ${externalId}`, {
            personName: person.name,
          })

          return person
        }
      }

      // For other platforms, we would need to implement search-based lookup
      // This is a future enhancement
      this.logger.debug(`External ID lookup not supported for platform: ${platform}`)
      return null
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to find person by external ID: ${platform}:${externalId}`, err)
      return null
    }
  }

  /**
   * Map TMDB external IDs to ExternalIds entity
   */
  private mapTMDBExternalIds(tmdbPerson: any, tmdbId: number): ExternalIds {
    const externalIdsData: Record<string, ExternalId> = {}

    // Always include TMDB ID
    externalIdsData.tmdb = new ExternalId(
      tmdbId.toString(),
      'tmdb',
      `https://www.themoviedb.org/person/${tmdbId}`
    )

    const externalIds = tmdbPerson.external_ids || {}

    // Map IMDB ID
    if (externalIds.imdb_id) {
      externalIdsData.imdb = new ExternalId(
        externalIds.imdb_id,
        'imdb',
        `https://www.imdb.com/name/${externalIds.imdb_id}/`
      )
    }

    // Map Instagram
    if (externalIds.instagram_id) {
      externalIdsData.instagram = new ExternalId(
        externalIds.instagram_id,
        'instagram',
        `https://www.instagram.com/${externalIds.instagram_id}/`
      )
    }

    // Map Twitter
    if (externalIds.twitter_id) {
      externalIdsData.twitter = new ExternalId(
        externalIds.twitter_id,
        'twitter',
        `https://twitter.com/${externalIds.twitter_id}`
      )
    }

    // Map Facebook
    if (externalIds.facebook_id) {
      externalIdsData.facebook = new ExternalId(
        externalIds.facebook_id,
        'facebook',
        `https://www.facebook.com/${externalIds.facebook_id}`
      )
    }

    // Map TikTok
    if (externalIds.tiktok_id) {
      externalIdsData.tiktok = new ExternalId(
        externalIds.tiktok_id,
        'tiktok',
        `https://www.tiktok.com/@${externalIds.tiktok_id}`
      )
    }

    // Map YouTube
    if (externalIds.youtube_id) {
      externalIdsData.youtube = new ExternalId(
        externalIds.youtube_id,
        'youtube',
        `https://www.youtube.com/channel/${externalIds.youtube_id}`
      )
    }

    // Map Wikidata
    if (externalIds.wikidata_id) {
      externalIdsData.wikidata = new ExternalId(
        externalIds.wikidata_id,
        'wikidata',
        `https://www.wikidata.org/wiki/${externalIds.wikidata_id}`
      )
    }

    return new ExternalIds(externalIdsData)
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
}
