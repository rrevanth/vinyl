import type { StremioMeta } from '@/src/infrastructure/providers/stremio/types/responses'
import type { EnrichedMedia } from '@/src/domain/entities/EnrichedMedia'
import { MediaStatus } from '@/src/domain/entities/EnrichedMedia'
import type { Media } from '@/src/domain/entities/Media'

/**
 * Maps Stremio meta responses to EnrichedMedia domain entities
 */
export class StremioMetaMapper {
  /**
   * Transform Stremio meta object to EnrichedMedia
   */
  static toEnrichedMedia(stremioMeta: StremioMeta, baseMedia: Media): EnrichedMedia {
    return {
      media: baseMedia,

      // Description & tagline
      overview: stremioMeta.description,
      tagline: undefined, // Stremio doesn't have tagline

      // Titles & Language
      originalTitle: undefined, // Stremio doesn't differentiate original title
      originalLanguage: stremioMeta.language,
      spokenLanguages: stremioMeta.language ? [stremioMeta.language] : undefined,

      // Genres (simple string array conversion)
      genres: stremioMeta.genres?.map((genre) => ({
        id: genre.toLowerCase().replace(/\s+/g, '-'),
        name: genre,
      })),

      // Keywords - Stremio doesn't have keywords
      keywords: undefined,

      // Production info
      productionCompanies: undefined, // Stremio doesn't have this
      productionCountries: stremioMeta.country ? [stremioMeta.country] : undefined,

      // Ratings
      voteAverage: stremioMeta.imdbRating
        ? parseFloat(stremioMeta.imdbRating)
        : undefined,
      voteCount: undefined, // Stremio doesn't provide vote count
      popularity: undefined, // Stremio doesn't have popularity metric
      certification: undefined, // Stremio doesn't have certification

      // Release info
      releaseDate: stremioMeta.released
        ? new Date(stremioMeta.released)
        : undefined,
      status: stremioMeta.type === 'series' && stremioMeta.videos?.length
        ? MediaStatus.RELEASED
        : undefined,

      // Runtime
      runtime: stremioMeta.runtime
        ? this.parseRuntime(stremioMeta.runtime)
        : undefined,
      budget: undefined,
      revenue: undefined,
      homepage: stremioMeta.website,

      // Series-specific fields
      numberOfSeasons: this.extractNumberOfSeasons(stremioMeta),
      numberOfEpisodes: this.extractNumberOfEpisodes(stremioMeta),
      firstAirDate: stremioMeta.released
        ? new Date(stremioMeta.released)
        : undefined,
      lastAirDate: undefined, // Not available in Stremio
      inProduction: undefined,
      nextEpisodeToAir: undefined,
      lastEpisodeToAir: undefined,
      networks: undefined, // Stremio doesn't have network info

      // Collection
      belongsToCollection: undefined,
    }
  }

  /**
   * Parse runtime string to minutes
   * Examples: "120 min", "2h 30min", "1h 45m"
   */
  private static parseRuntime(runtime: string): number | undefined {
    // Try to extract total minutes
    const minMatch = runtime.match(/(\d+)\s*min/i)
    if (minMatch) {
      return parseInt(minMatch[1], 10)
    }

    // Try hours and minutes format
    const hourMatch = runtime.match(/(\d+)h\s*(\d+)?m?/i)
    if (hourMatch) {
      const hours = parseInt(hourMatch[1], 10)
      const mins = hourMatch[2] ? parseInt(hourMatch[2], 10) : 0
      return hours * 60 + mins
    }

    return undefined
  }

  /**
   * Extract number of seasons from videos array
   */
  private static extractNumberOfSeasons(meta: StremioMeta): number | undefined {
    if (!meta.videos || meta.videos.length === 0) {
      return undefined
    }

    const seasons = new Set(
      meta.videos
        .map((v) => v.season)
        .filter((s): s is number => s !== undefined)
    )

    return seasons.size > 0 ? seasons.size : undefined
  }

  /**
   * Extract total number of episodes from videos array
   */
  private static extractNumberOfEpisodes(meta: StremioMeta): number | undefined {
    if (!meta.videos || meta.videos.length === 0) {
      return undefined
    }

    return meta.videos.length
  }
}
