import { ExternalIds, ExternalId } from '../../../../domain/entities/ExternalIds'
import { MediaStatus } from '../../../../domain/entities/EnrichedMedia'
import { MapperError } from '../../../errors/MapperError'
import type { TMDBMovieResponse, TMDBTVResponse, TMDBDateString } from '../../../api/tmdb/types'

/**
 * Base mapper class providing common utilities for TMDB data transformation
 *
 * Handles:
 * - Date parsing and validation
 * - External ID creation from TMDB responses
 * - Common field validation and error handling
 * - Status mapping from TMDB to domain enums
 */
export abstract class BaseTMDBMapper {
  /**
   * Parse TMDB date string to Date object
   * @param tmdbDate - TMDB date string in YYYY-MM-DD format
   * @returns Date object or undefined if invalid/null
   */
  protected static parseDate(tmdbDate?: TMDBDateString | null): Date | undefined {
    if (!tmdbDate || tmdbDate === '') return undefined

    try {
      // TMDB uses YYYY-MM-DD format
      const date = new Date(tmdbDate + 'T00:00:00Z') // Add time to avoid timezone issues

      // Validate the date is reasonable (after 1900, before 2100)
      if (date.getFullYear() < 1900 || date.getFullYear() > 2100) {
        return undefined
      }

      return date
    } catch {
      return undefined
    }
  }

  /**
   * Extract year from TMDB date string
   * @param tmdbDate - TMDB date string in YYYY-MM-DD format
   * @returns Year as number or undefined if invalid
   */
  protected static extractYear(tmdbDate?: TMDBDateString | null): number | undefined {
    if (!tmdbDate || tmdbDate === '') return undefined

    try {
      const year = parseInt(tmdbDate.split('-')[0])
      return year >= 1900 && year <= 2100 ? year : undefined
    } catch {
      return undefined
    }
  }

  /**
   * Create ExternalIds from TMDB movie response
   * @param tmdbData - TMDB movie or TV response
   * @returns ExternalIds instance with TMDB ID and any additional IDs
   */
  protected static createExternalIds(tmdbData: TMDBMovieResponse | TMDBTVResponse): ExternalIds {
    const externalIdsData: Partial<{
      tmdb: ExternalId
      imdb: ExternalId
      tvdb: ExternalId
    }> = {}

    // Add TMDB ID (required)
    const mediaType = 'title' in tmdbData ? 'movie' : 'tv'
    externalIdsData.tmdb = new ExternalId(
      tmdbData.id.toString(),
      'tmdb',
      `https://www.themoviedb.org/${mediaType}/${tmdbData.id}`
    )

    // Add IMDB ID if available in main response
    if ('imdb_id' in tmdbData && tmdbData.imdb_id) {
      externalIdsData.imdb = new ExternalId(
        tmdbData.imdb_id,
        'imdb',
        `https://www.imdb.com/title/${tmdbData.imdb_id}/`
      )
    }

    // Add external IDs from append_to_response if available
    if (tmdbData.external_ids) {
      const extIds = tmdbData.external_ids

      if (extIds.imdb_id && !externalIdsData.imdb) {
        externalIdsData.imdb = new ExternalId(
          extIds.imdb_id,
          'imdb',
          `https://www.imdb.com/title/${extIds.imdb_id}/`
        )
      }

      if (extIds.tvdb_id) {
        externalIdsData.tvdb = new ExternalId(
          extIds.tvdb_id.toString(),
          'tvdb',
          `https://thetvdb.com/?tab=series&id=${extIds.tvdb_id}`
        )
      }
    }

    return new ExternalIds(externalIdsData)
  }

  /**
   * Map TMDB status to domain MediaStatus enum
   * @param tmdbStatus - TMDB status string
   * @returns MediaStatus enum value
   */
  protected static mapMediaStatus(tmdbStatus?: string): MediaStatus | undefined {
    if (!tmdbStatus) return undefined

    switch (tmdbStatus.toLowerCase()) {
      case 'released':
        return MediaStatus.RELEASED
      case 'rumored':
        return MediaStatus.RUMORED
      case 'planned':
        return MediaStatus.PLANNED
      case 'in production':
        return MediaStatus.IN_PRODUCTION
      case 'post production':
        return MediaStatus.POST_PRODUCTION
      case 'canceled':
      case 'cancelled':
        return MediaStatus.CANCELED
      case 'returning series':
        return MediaStatus.RETURNING_SERIES
      case 'ended':
        return MediaStatus.ENDED
      default:
        return undefined
    }
  }

  /**
   * Validate that a required field exists, throw descriptive error if not
   * @param value - Value to validate
   * @param fieldName - Name of the field for error message
   * @param context - Additional context for error
   * @returns The validated value
   */
  protected static validateRequired<T>(
    value: T | null | undefined,
    fieldName: string,
    context?: Record<string, any>
  ): T {
    if (value === null || value === undefined || value === '') {
      const contextStr = context ? ` Context: ${JSON.stringify(context)}` : ''
      throw new MapperError(`Required field '${fieldName}' is missing or empty.${contextStr}`)
    }
    return value
  }

  /**
   * Safe string transformation - handles null/undefined gracefully
   * @param value - String value that might be null/undefined
   * @returns String or undefined
   */
  protected static safeString(value?: string | null): string | undefined {
    return value && value.trim() !== '' ? value : undefined
  }

  /**
   * Safe number transformation - handles null/undefined gracefully
   * @param value - Number value that might be null/undefined
   * @returns Number or undefined
   */
  protected static safeNumber(value?: number | null): number | undefined {
    return typeof value === 'number' && !isNaN(value) ? value : undefined
  }

  /**
   * Safe array transformation - ensures we always have an array
   * @param value - Array that might be null/undefined
   * @returns Array (empty if null/undefined)
   */
  protected static safeArray<T>(value?: T[] | null): T[] {
    return Array.isArray(value) ? value : []
  }
}
