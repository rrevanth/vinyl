import type { IPeopleExternalIdsCapability } from '../../../../domain/capabilities/IPeopleExternalIdsCapability'
import type { Person } from '../../../../domain/entities/Person'
import { ExternalIds, ExternalId } from '../../../../domain/entities/ExternalIds'
import type { TMDBDetailCache } from '../cache/TMDBDetailCache'
import type { TMDBClient } from '../../../api/tmdb/TMDBClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import { TMDBPersonMapper } from '../../../mappers/tmdb/entities/TMDBPersonMapper'
import { ok, fail, type Result } from '@/src/domain/types/Result'

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
  async getExternalIds(person: Person): Promise<Result<ExternalIds>> {
    try {
      // 1. Try direct TMDB ID lookup if exists
      const tmdbId = person.externalIds.tmdb?.id
      if (tmdbId) {
        this.logger.debug(`Getting external IDs for TMDB ID: ${tmdbId}`, {
          name: person.name,
        })
        return await this.fetchExternalIdsByTMDBId(parseInt(tmdbId))
      }

      // 2. Fallback: search for person and get external IDs
      this.logger.debug(`No TMDB ID found, searching for: ${person.name}`)
      return await this.searchAndFetchExternalIds(person)
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get external IDs for: ${person.name}`, err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  /**
   * Find person by external ID from another platform
   */
  async findByExternalId(externalId: string, platform: string): Promise<Result<Person>> {
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

          return ok(person, 'tmdb')
        }
      }

      // For other platforms, we would need to implement search-based lookup
      // This is a future enhancement
      this.logger.debug(`External ID lookup not supported for platform: ${platform}`)
      return fail(
        new Error(`External ID lookup not supported for platform: ${platform}`),
        'tmdb',
        'unsupported'
      )
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to find person by external ID: ${platform}:${externalId}`, err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  /**
   * Fetch external IDs using TMDB ID
   */
  private async fetchExternalIdsByTMDBId(tmdbId: number): Promise<Result<ExternalIds>> {
    try {
      // Get cached person details with external IDs
      const personDetails = await this.cache.getOrFetchPersonDetails(tmdbId)

      // Extract and enrich external IDs from TMDB response
      const enrichedExternalIds = this.mapTMDBExternalIds(personDetails, tmdbId)

      this.logger.debug(`Retrieved external IDs for person ${tmdbId}`, {
        externalIdCount: Object.keys(enrichedExternalIds).length,
        platforms: Object.keys(enrichedExternalIds),
      })

      return ok(enrichedExternalIds, 'tmdb', { cached: true })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to fetch external IDs for TMDB ID ${tmdbId}`, err)
      return fail(err, 'tmdb', 'api_error')
    }
  }

  /**
   * Search for person and fetch external IDs
   */
  private async searchAndFetchExternalIds(person: Person): Promise<Result<ExternalIds>> {
    try {
      // 1. Search using person name
      const searchResults = await this.tmdbClient.search.searchPeople({
        query: person.name,
      })

      if (!searchResults.results || searchResults.results.length === 0) {
        this.logger.warn(`No search results found for: ${person.name}`)
        return fail(new Error('No search results found'), 'tmdb', 'not_found')
      }

      // 2. Take best match (first result from TMDB)
      const bestMatch = searchResults.results[0]

      this.logger.debug(`Found match for ${person.name}`, {
        tmdbId: bestMatch.id,
        name: bestMatch.name,
      })

      // 3. Fetch external IDs for matched person
      return await this.fetchExternalIdsByTMDBId(bestMatch.id)
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to search and fetch external IDs for: ${person.name}`, err)
      return fail(err, 'tmdb', 'api_error')
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
}
