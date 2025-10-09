import type { Media } from '@/src/domain/entities/Media'
import type { StremioExternalId } from '@/src/domain/entities/ExternalIds'
import type { StremioManifest } from '@/src/infrastructure/providers/stremio/types/manifest'

/**
 * Resolved ID information for Stremio addon API calls
 */
export interface ResolvedStremioId {
  type: string // Stremio resource type (movie, series, etc.)
  id: string // The actual ID to use in API calls
}

/**
 * Utility for resolving Stremio IDs from Media entities
 * Implements the idPrefixes matching logic from Stremio SDK
 */
export class StremioIdResolver {
  /**
   * Resolve the appropriate Stremio ID for a media item
   *
   * Resolution priority:
   * 1. Use Stremio trace from Media.externalIds.stremio if available
   * 2. Match addon's idPrefixes with available ExternalIds
   * 3. Fallback to first available ID if no idPrefixes defined
   *
   * @param media - The media entity to resolve ID for
   * @param addonManifest - The addon's manifest containing idPrefixes
   * @param season - Optional season number for series episodes
   * @param episode - Optional episode number for series episodes
   * @returns Resolved ID info or null if no suitable ID found
   */
  static resolveId(
    media: Media,
    addonManifest: StremioManifest,
    season?: number,
    episode?: number
  ): ResolvedStremioId | null {
    // Priority 1: Use Stremio trace if available
    if (media.externalIds.stremio) {
      const baseId = media.externalIds.stremio.mediaId
      const id = this.formatEpisodeId(baseId, season, episode)

      return {
        type: media.externalIds.stremio.mediaType,
        id,
      }
    }

    // Priority 2: Try idPrefixes matching
    const idPrefixes = addonManifest.idPrefixes || []
    if (idPrefixes.length > 0) {
      const matchedId = this.matchIdPrefixes(media, idPrefixes, season, episode)
      if (matchedId) {
        return matchedId
      }
    }

    // Priority 3: Fallback to first available ID
    const primaryId = media.externalIds.getPrimaryId()
    if (primaryId) {
      // Check if it's a StremioExternalId
      if ('mediaId' in primaryId) {
        // It's a StremioExternalId
        const baseId = primaryId.mediaId
        const id = this.formatEpisodeId(baseId, season, episode)

        return {
          type: primaryId.mediaType,
          id,
        }
      } else {
        // It's a regular ExternalId
        const baseId = primaryId.id
        const id = this.formatEpisodeId(baseId, season, episode)

        // Use original Stremio type if available, otherwise fallback to normalized type
        const stremioType = media.externalIds.stremio
          ? (media.externalIds.stremio as StremioExternalId).mediaType
          : this.normalizeMediaType(media.type)

        return {
          type: stremioType,
          id,
        }
      }
    }

    return null
  }

  /**
   * Match external IDs against addon's idPrefixes
   * Returns the first matching ID
   */
  private static matchIdPrefixes(
    media: Media,
    idPrefixes: string[],
    season?: number,
    episode?: number
  ): ResolvedStremioId | null {
    // Use original Stremio type if available, otherwise fallback to normalized type
    const stremioType = media.externalIds.stremio
      ? (media.externalIds.stremio as StremioExternalId).mediaType
      : this.normalizeMediaType(media.type)

    // Check IMDB ID
    if (media.externalIds.imdb) {
      const imdbId = media.externalIds.imdb.id
      if (idPrefixes.some((prefix) => imdbId.startsWith(prefix))) {
        return {
          type: stremioType,
          id: this.formatEpisodeId(imdbId, season, episode),
        }
      }
    }

    // Check TMDB ID with 'tmdb:' prefix
    if (media.externalIds.tmdb) {
      const tmdbId = `tmdb:${media.externalIds.tmdb.id}`
      if (idPrefixes.some((prefix) => tmdbId.startsWith(prefix))) {
        return {
          type: stremioType,
          id: this.formatEpisodeId(tmdbId, season, episode),
        }
      }
    }

    // Check Trakt ID with 'trakt:' prefix
    if (media.externalIds.trakt) {
      const traktId = `trakt:${media.externalIds.trakt.id}`
      if (idPrefixes.some((prefix) => traktId.startsWith(prefix))) {
        return {
          type: stremioType,
          id: this.formatEpisodeId(traktId, season, episode),
        }
      }
    }

    // Check TVDB ID with 'tvdb:' prefix
    if (media.externalIds.tvdb) {
      const tvdbId = `tvdb:${media.externalIds.tvdb.id}`
      if (idPrefixes.some((prefix) => tvdbId.startsWith(prefix))) {
        return {
          type: stremioType,
          id: this.formatEpisodeId(tvdbId, season, episode),
        }
      }
    }

    return null
  }

  /**
   * Format episode ID for series
   * For series episodes: {metaId}:{season}:{episode}
   * For movies: just the metaId
   */
  private static formatEpisodeId(
    baseId: string,
    season?: number,
    episode?: number
  ): string {
    if (season !== undefined && episode !== undefined) {
      return `${baseId}:${season}:${episode}`
    }
    return baseId
  }

  /**
   * Normalize our media type to Stremio resource type
   */
  private static normalizeMediaType(type: 'movie' | 'series'): string {
    return type === 'series' ? 'series' : 'movie'
  }
}
