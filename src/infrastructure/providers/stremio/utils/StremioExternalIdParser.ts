import { ExternalId } from '@/src/domain/entities/ExternalIds'

/**
 * Utility for parsing external IDs from Stremio catalog item IDs
 *
 * Stremio IDs can be prefixed to indicate their source:
 * - tt1234567: IMDB ID
 * - tmdb:12345: TMDB ID
 * - trakt:12345: Trakt ID
 * - tvdb:12345: TVDB ID
 * - mal:12345: MyAnimeList ID
 * - kitsu:123: Kitsu ID
 */
export class StremioExternalIdParser {
  /**
   * Parse external IDs from Stremio catalog item ID
   *
   * @param stremioId - The ID from Stremio catalog item (e.g., "tmdb:12345", "tt1234567")
   * @param addonId - The addon ID for providerId
   * @returns Object with parsed external IDs
   */
  static parseExternalIds(
    stremioId: string,
    addonId: string
  ): Partial<{
    imdb: ExternalId
    tmdb: ExternalId
    trakt: ExternalId
    tvdb: ExternalId
    mal: ExternalId
    kitsu: ExternalId
  }> {
    const result: Partial<{
      imdb: ExternalId
      tmdb: ExternalId
      trakt: ExternalId
      tvdb: ExternalId
      mal: ExternalId
      kitsu: ExternalId
    }> = {}

    // IMDB ID (starts with 'tt')
    if (stremioId.startsWith('tt')) {
      result.imdb = new ExternalId(
        stremioId,
        addonId,
        `https://www.imdb.com/title/${stremioId}/`
      )
      return result
    }

    // TMDB ID (format: "tmdb:12345")
    if (stremioId.startsWith('tmdb:')) {
      const tmdbId = stremioId.replace('tmdb:', '')
      result.tmdb = new ExternalId(
        tmdbId,
        addonId,
        `https://www.themoviedb.org/movie/${tmdbId}` // Will be corrected by type in mapper
      )
      return result
    }

    // Trakt ID (format: "trakt:12345")
    if (stremioId.startsWith('trakt:')) {
      const traktId = stremioId.replace('trakt:', '')
      result.trakt = new ExternalId(
        traktId,
        addonId,
        `https://trakt.tv/movies/${traktId}` // Will be corrected by type in mapper
      )
      return result
    }

    // TVDB ID (format: "tvdb:12345")
    if (stremioId.startsWith('tvdb:')) {
      const tvdbId = stremioId.replace('tvdb:', '')
      result.tvdb = new ExternalId(
        tvdbId,
        addonId,
        `https://www.thetvdb.com/?id=${tvdbId}&tab=series`
      )
      return result
    }

    // MAL ID (format: "mal:12345")
    if (stremioId.startsWith('mal:')) {
      const malId = stremioId.replace('mal:', '')
      result.mal = new ExternalId(
        malId,
        addonId,
        `https://myanimelist.net/anime/${malId}`
      )
      return result
    }

    // Kitsu ID (format: "kitsu:123")
    if (stremioId.startsWith('kitsu:')) {
      const kitsuId = stremioId.replace('kitsu:', '')
      result.kitsu = new ExternalId(
        kitsuId,
        addonId,
        `https://kitsu.io/anime/${kitsuId}`
      )
      return result
    }

    // No recognized prefix - return empty
    return result
  }
}
