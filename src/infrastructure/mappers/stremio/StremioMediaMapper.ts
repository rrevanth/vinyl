import { Media, MediaImages } from '../../../domain/entities/Media'
import { ExternalIds, StremioExternalId } from '../../../domain/entities/ExternalIds'
import type { StremioMetaPreview, StremioMeta } from '../../providers/stremio/types/responses'
import { StremioExternalIdParser } from '../../providers/stremio/utils/StremioExternalIdParser'

/**
 * Mapper for converting Stremio meta objects to domain Media entities
 */
export class StremioMediaMapper {
  /**
   * Convert Stremio meta preview to Media entity (for catalog responses)
   */
  static fromMetaPreview(
    stremioMeta: StremioMetaPreview,
    addonId: string,
    addonName: string,
    catalogId: string,
    catalogType: string,
    manifestUrl: string
  ): Media {
    // Create StremioExternalId with complete context
    const stremioId = new StremioExternalId(
      addonId,
      addonName,
      catalogId,
      catalogType,
      stremioMeta.type, // Original Stremio type preserved
      stremioMeta.id,
      `stremio:${addonId}`,
      manifestUrl
    )

    // Parse external IDs from Stremio ID
    const parsedIds = StremioExternalIdParser.parseExternalIds(stremioMeta.id, addonId)

    // Merge parsed IDs with Stremio ID
    let externalIds = new ExternalIds({ ...parsedIds, stremio: stremioId })

    // Normalize type for Media entity
    const normalizedType = this.normalizeType(stremioMeta.type)
    const year = this.extractYear(stremioMeta.releaseInfo)

    const images = new MediaImages({
      poster: stremioMeta.poster,
      posterThumbnail: stremioMeta.poster,
    })

    // Map genres from Stremio format to Media format
    const genres = this.mapGenres(stremioMeta.genres)

    // Parse IMDB rating if available
    const rating = this.parseImdbRating(stremioMeta.imdbRating)

    return new Media({
      externalIds,
      type: normalizedType,
      title: stremioMeta.name,
      year,
      images,
      overview: stremioMeta.description,
      genres,
      rating,
    })
  }

  /**
   * Convert full Stremio meta to enriched Media entity (for meta responses)
   */
  static fromMeta(
    stremioMeta: StremioMeta,
    addonId: string,
    addonName: string,
    catalogId: string,
    catalogType: string,
    manifestUrl: string
  ): Media {
    // Create StremioExternalId with complete context
    const stremioId = new StremioExternalId(
      addonId,
      addonName,
      catalogId,
      catalogType,
      stremioMeta.type, // Original Stremio type preserved
      stremioMeta.id,
      `stremio:${addonId}`,
      manifestUrl
    )

    // Parse external IDs from Stremio ID
    const parsedIds = StremioExternalIdParser.parseExternalIds(stremioMeta.id, addonId)

    // Merge parsed IDs with Stremio ID
    let externalIds = new ExternalIds({ ...parsedIds, stremio: stremioId })

    // Normalize type for Media entity
    const normalizedType = this.normalizeType(stremioMeta.type)
    const year = this.extractYear(stremioMeta.released || stremioMeta.releaseInfo)

    const images = new MediaImages({
      poster: stremioMeta.poster,
      backdrop: stremioMeta.background,
      logo: stremioMeta.logo,
      posterThumbnail: stremioMeta.poster,
      backdropThumbnail: stremioMeta.background,
    })

    // Map genres from Stremio format to Media format
    const genres = this.mapGenres(stremioMeta.genres)

    // Parse IMDB rating if available
    const rating = this.parseImdbRating(stremioMeta.imdbRating)

    // Parse runtime if available (Stremio provides it as a string like "120 min")
    const runtime = this.parseRuntime(stremioMeta.runtime)

    return new Media({
      externalIds,
      type: normalizedType,
      title: stremioMeta.name,
      year,
      images,
      overview: stremioMeta.description,
      runtime,
      genres,
      rating,
    })
  }

  /**
   * Convert array of Stremio meta previews to Media entities
   */
  static fromMetaPreviewArray(
    stremioMetas: StremioMetaPreview[],
    addonId: string,
    addonName: string,
    catalogId: string,
    catalogType: string,
    manifestUrl: string
  ): Media[] {
    return stremioMetas.map((meta) =>
      this.fromMetaPreview(meta, addonId, addonName, catalogId, catalogType, manifestUrl)
    )
  }

  /**
   * Normalize Stremio type to Media type
   */
  private static normalizeType(stremioType: string): 'movie' | 'series' {
    const lower = stremioType.toLowerCase()

    if (['movie', 'movies', 'film', 'cinema'].includes(lower)) {
      return 'movie'
    }

    if (['series', 'show', 'shows', 'tv', 'channel', 'channels', 'anime'].includes(lower)) {
      return 'series'
    }

    // Default fallback
    return 'movie'
  }

  /**
   * Extract year from various date/release formats
   */
  private static extractYear(releaseInfo?: string): number | undefined {
    if (!releaseInfo) return undefined

    // Extract 4-digit year from various formats
    const yearMatch = releaseInfo.match(/(\d{4})/)
    return yearMatch ? parseInt(yearMatch[1]) : undefined
  }

  /**
   * Map Stremio genres to Media genre format
   * Uses a simple numeric hash of the genre name as ID since Stremio doesn't provide genre IDs
   */
  private static mapGenres(stremioGenres?: string[]): { id: number; name: string }[] | undefined {
    if (!stremioGenres || stremioGenres.length === 0) return undefined

    return stremioGenres.map((genre) => ({
      id: this.hashGenreName(genre),
      name: genre,
    }))
  }

  /**
   * Generate a simple numeric hash for genre names
   * This provides consistent IDs for the same genre name across requests
   */
  private static hashGenreName(genre: string): number {
    let hash = 0
    for (let i = 0; i < genre.length; i++) {
      const char = genre.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
  }

  /**
   * Parse IMDB rating from string format (e.g., "7.5/10" or "7.5")
   */
  private static parseImdbRating(imdbRating?: string): { average: number; count: number; source: string } | undefined {
    if (!imdbRating) return undefined

    // Extract numeric rating from various formats
    const ratingMatch = imdbRating.match(/([0-9.]+)/)
    if (!ratingMatch) return undefined

    const rating = parseFloat(ratingMatch[1])
    if (isNaN(rating)) return undefined

    return {
      average: rating,
      count: 0, // Stremio doesn't provide vote count
      source: 'imdb',
    }
  }

  /**
   * Parse runtime from Stremio string format (e.g., "120 min" or "2h 30min")
   */
  private static parseRuntime(runtime?: string): number | undefined {
    if (!runtime) return undefined

    // Try to extract minutes from various formats
    // Format: "120 min", "120min", "120 minutes"
    const minMatch = runtime.match(/(\d+)\s*(?:min|minutes?)/i)
    if (minMatch) {
      return parseInt(minMatch[1])
    }

    // Format: "2h 30min", "2 hours 30 minutes"
    const hourMinMatch = runtime.match(/(\d+)\s*(?:h|hours?)\s*(\d+)?\s*(?:min|minutes?)?/i)
    if (hourMinMatch) {
      const hours = parseInt(hourMinMatch[1])
      const minutes = hourMinMatch[2] ? parseInt(hourMinMatch[2]) : 0
      return hours * 60 + minutes
    }

    // Format: "2h", "2 hours"
    const hourMatch = runtime.match(/(\d+)\s*(?:h|hours?)/i)
    if (hourMatch) {
      return parseInt(hourMatch[1]) * 60
    }

    return undefined
  }
}
