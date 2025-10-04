import { ExternalIds, ExternalId } from '../../../../domain/entities/ExternalIds'
import { InfrastructureError } from '../../../errors/InfrastructureError'
import type { TraktIds } from '../../../api/trakt/types'

/**
 * Base mapper class for Trakt data transformation
 */
export abstract class BaseTraktMapper {
  /**
   * Create ExternalIds from Trakt IDs object
   */
  protected static createExternalIds(traktIds: TraktIds, mediaType?: 'movie' | 'tv'): ExternalIds {
    const externalIdsData: Partial<{
      trakt: ExternalId
      imdb: ExternalId
      tmdb: ExternalId
      tvdb: ExternalId
    }> = {}

    // Add Trakt ID (required)
    const traktType = mediaType === 'tv' ? 'shows' : 'movies'
    externalIdsData.trakt = new ExternalId(
      traktIds.trakt.toString(),
      'trakt',
      `https://trakt.tv/${traktType}/${traktIds.slug}`
    )

    // Add other IDs if available
    if (traktIds.imdb) {
      externalIdsData.imdb = new ExternalId(
        traktIds.imdb,
        'imdb',
        `https://www.imdb.com/title/${traktIds.imdb}/`
      )
    }

    if (traktIds.tmdb) {
      const tmdbType = mediaType === 'tv' ? 'tv' : 'movie'
      externalIdsData.tmdb = new ExternalId(
        traktIds.tmdb.toString(),
        'tmdb',
        `https://www.themoviedb.org/${tmdbType}/${traktIds.tmdb}`
      )
    }

    if (traktIds.tvdb) {
      externalIdsData.tvdb = new ExternalId(
        traktIds.tvdb.toString(),
        'tvdb',
        `https://thetvdb.com/?tab=series&id=${traktIds.tvdb}`
      )
    }

    return new ExternalIds(externalIdsData)
  }

  /**
   * Parse Trakt date string to Date object
   */
  protected static parseDate(traktDate?: string): Date | undefined {
    if (!traktDate) return undefined

    try {
      const date = new Date(traktDate)
      return isNaN(date.getTime()) ? undefined : date
    } catch {
      return undefined
    }
  }

  /**
   * Extract year from date or return provided year
   */
  protected static extractYear(year?: number, dateString?: string): number | undefined {
    if (year) return year
    if (dateString) {
      const date = new Date(dateString)
      return isNaN(date.getTime()) ? undefined : date.getFullYear()
    }
    return undefined
  }

  /**
   * Safe string transformation
   */
  protected static safeString(value?: string | null): string | undefined {
    return value && value.trim() !== '' ? value : undefined
  }

  /**
   * Safe number transformation
   */
  protected static safeNumber(value?: number | null): number | undefined {
    return typeof value === 'number' && !isNaN(value) ? value : undefined
  }

  /**
   * Safe array transformation
   */
  protected static safeArray<T>(value?: T[] | null): T[] {
    return Array.isArray(value) ? value : []
  }

  /**
   * Validate required field
   */
  protected static validateRequired<T>(value: T | null | undefined, fieldName: string): T {
    if (value === null || value === undefined || value === '') {
      throw new InfrastructureError(`Required field '${fieldName}' is missing`)
    }
    return value
  }
}
