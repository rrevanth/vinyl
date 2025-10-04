import type {
  EnrichedMedia,
  Genre,
  Keyword,
  ProductionCompany,
  Network,
  Collection,
  EpisodeInfo,
} from '../../../../domain/entities/EnrichedMedia'
import { BaseTMDBMapper } from '../base/BaseTMDBMapper'
import { TMDBMediaMapper } from './TMDBMediaMapper'
import type {
  TMDBMovieResponse,
  TMDBTVResponse,
  TMDBGenre,
  TMDBKeyword,
  TMDBProductionCompany,
  TMDBNetwork,
  TMDBCollection,
  TMDBEpisode,
  TMDBSpokenLanguage,
} from '../../../api/tmdb/types'
import type { TMDBConfigFactory } from '../../../factories/TMDBConfigFactory'

/**
 * Maps TMDB responses to EnrichedMedia entities with comprehensive metadata
 *
 * Handles the complex transformation from TMDB's detailed responses to our EnrichedMedia format.
 * Processes all the rich metadata including genres, production info, ratings, etc.
 */
export class TMDBEnrichedMediaMapper extends BaseTMDBMapper {
  /**
   * Create EnrichedMedia from TMDB movie response with full metadata
   * @param tmdbMovie - TMDB movie response (preferably with append_to_response data)
   * @param configFactory - Optional config factory for image URLs
   * @returns EnrichedMedia with comprehensive movie metadata
   */
  static fromMovie(tmdbMovie: TMDBMovieResponse, configFactory?: TMDBConfigFactory): EnrichedMedia {
    // Create base Media entity
    const baseMedia = TMDBMediaMapper.fromMovie(tmdbMovie, configFactory)

    return {
      media: baseMedia,

      // Basic Information
      overview: this.safeString(tmdbMovie.overview),
      tagline: this.safeString(tmdbMovie.tagline),
      originalTitle: this.safeString(tmdbMovie.original_title),
      originalLanguage: this.safeString(tmdbMovie.original_language),
      spokenLanguages: this.mapSpokenLanguages(tmdbMovie.spoken_languages),

      // Content Details
      genres: this.mapGenres(tmdbMovie.genres),
      keywords: this.mapKeywords(tmdbMovie.keywords?.keywords),
      productionCompanies: this.mapProductionCompanies(tmdbMovie.production_companies),
      productionCountries: this.mapProductionCountries(tmdbMovie.production_countries),

      // Ratings & Popularity
      voteAverage: this.safeNumber(tmdbMovie.vote_average),
      voteCount: this.safeNumber(tmdbMovie.vote_count),
      popularity: this.safeNumber(tmdbMovie.popularity),
      certification: this.extractCertification(tmdbMovie.release_dates),

      // Release Information
      releaseDate: this.parseDate(tmdbMovie.release_date),
      status: this.mapMediaStatus(tmdbMovie.status),

      // Runtime & Financial
      runtime: this.safeNumber(tmdbMovie.runtime),
      budget: this.safeNumber(tmdbMovie.budget),
      revenue: this.safeNumber(tmdbMovie.revenue),
      homepage: this.safeString(tmdbMovie.homepage),

      // Collection Information
      belongsToCollection: this.mapCollection(tmdbMovie.belongs_to_collection),

      // Technical
      adult: tmdbMovie.adult,
      videoAvailable: tmdbMovie.video,
    }
  }

  /**
   * Create EnrichedMedia from TMDB TV response with full metadata
   * @param tmdbTV - TMDB TV response (preferably with append_to_response data)
   * @param configFactory - Optional config factory for image URLs
   * @returns EnrichedMedia with comprehensive TV series metadata
   */
  static fromTV(tmdbTV: TMDBTVResponse, configFactory?: TMDBConfigFactory): EnrichedMedia {
    // Create base Media entity
    const baseMedia = TMDBMediaMapper.fromTV(tmdbTV, configFactory)

    return {
      media: baseMedia,

      // Basic Information
      overview: this.safeString(tmdbTV.overview),
      tagline: this.safeString(tmdbTV.tagline),
      originalTitle: this.safeString(tmdbTV.original_name),
      originalLanguage: this.safeString(tmdbTV.original_language),
      spokenLanguages: this.mapSpokenLanguages(tmdbTV.spoken_languages),

      // Content Details
      genres: this.mapGenres(tmdbTV.genres),
      keywords: this.mapKeywords(tmdbTV.keywords?.keywords),
      productionCompanies: this.mapProductionCompanies(tmdbTV.production_companies),
      productionCountries: this.mapProductionCountries(tmdbTV.production_countries),

      // Ratings & Popularity
      voteAverage: this.safeNumber(tmdbTV.vote_average),
      voteCount: this.safeNumber(tmdbTV.vote_count),
      popularity: this.safeNumber(tmdbTV.popularity),
      certification: this.extractTVCertification(tmdbTV.content_ratings),

      // Release Information
      releaseDate: this.parseDate(tmdbTV.first_air_date),
      status: this.mapMediaStatus(tmdbTV.status),

      // Series-specific Information
      numberOfSeasons: this.safeNumber(tmdbTV.number_of_seasons),
      numberOfEpisodes: this.safeNumber(tmdbTV.number_of_episodes),
      firstAirDate: this.parseDate(tmdbTV.first_air_date),
      lastAirDate: this.parseDate(tmdbTV.last_air_date),
      inProduction: tmdbTV.in_production,
      nextEpisodeToAir: this.mapEpisode(tmdbTV.next_episode_to_air),
      lastEpisodeToAir: this.mapEpisode(tmdbTV.last_episode_to_air),
      networks: this.mapNetworks(tmdbTV.networks),

      // Runtime (average for TV series)
      runtime: this.calculateAverageRuntime(tmdbTV.episode_run_time),
      homepage: this.safeString(tmdbTV.homepage),

      // Technical
      adult: tmdbTV.adult,
    }
  }

  // Helper methods for mapping complex nested data

  private static mapGenres(genres?: TMDBGenre[]): Genre[] {
    return this.safeArray(genres).map((genre) => ({
      id: genre.id.toString(),
      name: genre.name,
    }))
  }

  private static mapKeywords(keywords?: TMDBKeyword[]): Keyword[] {
    return this.safeArray(keywords).map((keyword) => ({
      id: keyword.id.toString(),
      name: keyword.name,
    }))
  }

  private static mapProductionCompanies(companies?: TMDBProductionCompany[]): ProductionCompany[] {
    return this.safeArray(companies).map((company) => ({
      id: company.id.toString(),
      name: company.name,
      logoPath: company.logo_path || undefined,
      originCountry: company.origin_country,
    }))
  }

  private static mapProductionCountries(
    countries?: { iso_3166_1: string; name: string }[]
  ): string[] {
    return this.safeArray(countries).map((country) => country.name)
  }

  private static mapSpokenLanguages(languages?: TMDBSpokenLanguage[]): string[] {
    return this.safeArray(languages).map((lang) => lang.english_name)
  }

  private static mapNetworks(networks?: TMDBNetwork[]): Network[] {
    return this.safeArray(networks).map((network) => ({
      id: network.id.toString(),
      name: network.name,
      logoPath: network.logo_path || undefined,
      originCountry: network.origin_country,
    }))
  }

  private static mapCollection(collection?: TMDBCollection | null): Collection | undefined {
    if (!collection) return undefined

    return {
      id: collection.id.toString(),
      name: collection.name,
      overview: undefined, // TMDB collection response doesn't include overview in main response
      posterPath: collection.poster_path || undefined,
      backdropPath: collection.backdrop_path || undefined,
    }
  }

  private static mapEpisode(episode?: TMDBEpisode | null): EpisodeInfo | undefined {
    if (!episode) return undefined

    return {
      id: episode.id.toString(),
      name: episode.name,
      overview: this.safeString(episode.overview),
      airDate: this.parseDate(episode.air_date),
      episodeNumber: episode.episode_number,
      seasonNumber: episode.season_number,
      stillPath: episode.still_path || undefined,
      voteAverage: this.safeNumber(episode.vote_average),
    }
  }

  private static extractCertification(releaseDates?: {
    results: { iso_3166_1: string; release_dates: { certification: string }[] }[]
  }): string | undefined {
    if (!releaseDates?.results) return undefined

    // Look for US certification first, then any available certification
    const usRelease = releaseDates.results.find((r) => r.iso_3166_1 === 'US')
    if (usRelease?.release_dates[0]?.certification) {
      return usRelease.release_dates[0].certification
    }

    // Fallback to any certification
    for (const release of releaseDates.results) {
      if (release.release_dates[0]?.certification) {
        return release.release_dates[0].certification
      }
    }

    return undefined
  }

  private static extractTVCertification(contentRatings?: {
    results: { iso_3166_1: string; rating: string }[]
  }): string | undefined {
    if (!contentRatings?.results) return undefined

    // Look for US rating first
    const usRating = contentRatings.results.find((r) => r.iso_3166_1 === 'US')
    if (usRating?.rating) {
      return usRating.rating
    }

    // Fallback to any rating
    return contentRatings.results[0]?.rating
  }

  private static calculateAverageRuntime(runtimes?: number[]): number | undefined {
    if (!runtimes?.length) return undefined

    const validRuntimes = runtimes.filter((r) => r > 0)
    if (!validRuntimes.length) return undefined

    return Math.round(validRuntimes.reduce((sum, r) => sum + r, 0) / validRuntimes.length)
  }
}
