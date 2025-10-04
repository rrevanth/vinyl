import type { Media } from '../../../../domain/entities/Media'
import type { ExternalIds } from '../../../../domain/entities/ExternalIds'
import type { StremioMetaPreview, StremioMeta } from '../../providers/stremio/types/responses'
import { StableIdGenerator } from '../../../../domain/entities/StableIdGenerator'

/**
 * Mapper for converting Stremio meta objects to domain Media entities
 */
export class StremioMediaMapper {
  /**
   * Convert Stremio meta preview to Media entity (for catalog responses)
   */
  static fromMetaPreview(stremioMeta: StremioMetaPreview): Media {
    const externalIds: ExternalIds = {
      imdb: stremioMeta.id.startsWith('tt') ? stremioMeta.id : undefined,
      stremio: stremioMeta.id,
    }

    return {
      id: StableIdGenerator.generateForMedia(stremioMeta.type, externalIds),
      type: stremioMeta.type as 'movie' | 'series',
      title: stremioMeta.name,
      originalTitle: stremioMeta.name,
      releaseDate: stremioMeta.releaseInfo || undefined,
      genres: stremioMeta.genres || [],
      overview: stremioMeta.description || undefined,
      externalIds,
      images: {
        poster: stremioMeta.poster || undefined,
        posterThumbnail: stremioMeta.poster || undefined,
      },
      ratings: stremioMeta.imdbRating
        ? {
            imdb: parseFloat(stremioMeta.imdbRating),
          }
        : undefined,
      people: {
        directors: stremioMeta.director || [],
        cast: stremioMeta.cast || [],
      },
      metadata: {
        source: 'stremio',
        lastUpdated: new Date(),
        isComplete: false, // Meta preview has limited information
      },
    }
  }

  /**
   * Convert full Stremio meta to enriched Media entity (for meta responses)
   */
  static fromMeta(stremioMeta: StremioMeta): Media {
    const externalIds: ExternalIds = {
      imdb: stremioMeta.id.startsWith('tt') ? stremioMeta.id : undefined,
      stremio: stremioMeta.id,
    }

    return {
      id: StableIdGenerator.generateForMedia(stremioMeta.type, externalIds),
      type: stremioMeta.type as 'movie' | 'series',
      title: stremioMeta.name,
      originalTitle: stremioMeta.name,
      releaseDate: stremioMeta.released || stremioMeta.releaseInfo || undefined,
      genres: stremioMeta.genres || [],
      overview: stremioMeta.description || undefined,
      externalIds,
      images: {
        poster: stremioMeta.poster || undefined,
        backdrop: stremioMeta.background || undefined,
        logo: stremioMeta.logo || undefined,
        posterThumbnail: stremioMeta.poster || undefined,
      },
      ratings: stremioMeta.imdbRating
        ? {
            imdb: parseFloat(stremioMeta.imdbRating),
          }
        : undefined,
      people: {
        directors: stremioMeta.director || [],
        cast: stremioMeta.cast || [],
      },
      runtime: stremioMeta.runtime ? this.parseRuntime(stremioMeta.runtime) : undefined,
      languages: stremioMeta.language ? [stremioMeta.language] : undefined,
      countries: stremioMeta.country ? [stremioMeta.country] : undefined,
      metadata: {
        source: 'stremio',
        lastUpdated: new Date(),
        isComplete: true, // Full meta has comprehensive information
        website: stremioMeta.website || undefined,
        awards: stremioMeta.awards || undefined,
      },
    }
  }

  /**
   * Convert array of Stremio meta previews to Media entities
   */
  static fromMetaPreviewArray(stremioMetas: StremioMetaPreview[]): Media[] {
    return stremioMetas.map((meta) => this.fromMetaPreview(meta))
  }

  /**
   * Parse runtime string to minutes
   * Handles formats like "120 min", "1h 45min", "90"
   */
  private static parseRuntime(runtimeStr: string): number | undefined {
    if (!runtimeStr) return undefined

    // Handle pure numbers (assume minutes)
    const pureNumber = parseInt(runtimeStr)
    if (!isNaN(pureNumber) && runtimeStr.match(/^\d+$/)) {
      return pureNumber
    }

    // Handle "120 min" format
    const minutesMatch = runtimeStr.match(/(\d+)\s*min/i)
    if (minutesMatch) {
      return parseInt(minutesMatch[1])
    }

    // Handle "1h 45min" format
    const hoursMinutesMatch = runtimeStr.match(/(\d+)h\s*(\d+)?min/i)
    if (hoursMinutesMatch) {
      const hours = parseInt(hoursMinutesMatch[1])
      const minutes = hoursMinutesMatch[2] ? parseInt(hoursMinutesMatch[2]) : 0
      return hours * 60 + minutes
    }

    // Handle "2h" format
    const hoursMatch = runtimeStr.match(/(\d+)h/i)
    if (hoursMatch) {
      return parseInt(hoursMatch[1]) * 60
    }

    return undefined
  }
}
