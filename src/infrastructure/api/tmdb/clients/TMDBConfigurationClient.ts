import type { TMDBBaseClient } from '../TMDBBaseClient'
import type {
  TMDBConfigurationResponse,
  TMDBGenre,
  TMDBCountryResponse,
  TMDBLanguageResponse,
} from '../types'

/**
 * TMDB Configuration API client
 *
 * Provides access to TMDB system configuration data including
 * genres, countries, languages, and API configuration settings.
 */
export class TMDBConfigurationClient {
  constructor(private readonly base: TMDBBaseClient) {}

  /**
   * Get API configuration (image sizes, base URLs, etc.)
   */
  async getAPIConfiguration(): Promise<TMDBConfigurationResponse> {
    return this.base.get<TMDBConfigurationResponse>('/configuration')
  }

  /**
   * Get list of countries used throughout TMDB
   */
  async getCountries(): Promise<TMDBCountryResponse[]> {
    return this.base.get<TMDBCountryResponse[]>('/configuration/countries')
  }

  /**
   * Get list of jobs available on TMDB
   */
  async getJobs(): Promise<
    {
      department: string
      jobs: string[]
    }[]
  > {
    return this.base.get('/configuration/jobs')
  }

  /**
   * Get list of languages used throughout TMDB
   */
  async getLanguages(): Promise<TMDBLanguageResponse[]> {
    return this.base.get<TMDBLanguageResponse[]>('/configuration/languages')
  }

  /**
   * Get list of primary translations used on TMDB
   */
  async getPrimaryTranslations(): Promise<string[]> {
    return this.base.get<string[]>('/configuration/primary_translations')
  }

  /**
   * Get list of timezones used throughout TMDB
   */
  async getTimezones(): Promise<
    {
      iso_3166_1: string
      zones: string[]
    }[]
  > {
    return this.base.get('/configuration/timezones')
  }

  // Genre methods

  /**
   * Get list of official movie genres
   */
  async getMovieGenres(): Promise<{ genres: TMDBGenre[] }> {
    return this.base.get<{ genres: TMDBGenre[] }>('/genre/movie/list')
  }

  /**
   * Get list of official TV show genres
   */
  async getTVGenres(): Promise<{ genres: TMDBGenre[] }> {
    return this.base.get<{ genres: TMDBGenre[] }>('/genre/tv/list')
  }

  /**
   * Get combined list of all genres (movies and TV)
   */
  async getAllGenres(): Promise<{
    movieGenres: TMDBGenre[]
    tvGenres: TMDBGenre[]
    combinedGenres: TMDBGenre[]
  }> {
    const [movieResponse, tvResponse] = await Promise.all([
      this.getMovieGenres(),
      this.getTVGenres(),
    ])

    const movieGenres = movieResponse.genres
    const tvGenres = tvResponse.genres

    // Create a combined list with unique genres
    const genreMap = new Map<number, TMDBGenre>()

    movieGenres.forEach((genre) => genreMap.set(genre.id, genre))
    tvGenres.forEach((genre) => genreMap.set(genre.id, genre))

    const combinedGenres = Array.from(genreMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    return {
      movieGenres,
      tvGenres,
      combinedGenres,
    }
  }

  // Watch provider methods

  /**
   * Get available watch provider regions
   */
  async getWatchProviderRegions(): Promise<
    {
      iso_3166_1: string
      english_name: string
      native_name: string
    }[]
  > {
    return this.base.get('/watch/providers/regions')
  }

  /**
   * Get movie watch providers for a specific region
   */
  async getMovieWatchProviders(region?: string): Promise<{
    results: {
      display_priority: number
      logo_path: string
      provider_name: string
      provider_id: number
    }[]
  }> {
    const params = region ? { watch_region: region } : {}
    return this.base.get('/watch/providers/movie', params)
  }

  /**
   * Get TV watch providers for a specific region
   */
  async getTVWatchProviders(region?: string): Promise<{
    results: {
      display_priority: number
      logo_path: string
      provider_name: string
      provider_id: number
    }[]
  }> {
    const params = region ? { watch_region: region } : {}
    return this.base.get('/watch/providers/tv', params)
  }

  // Certification methods

  /**
   * Get movie certifications for all countries
   */
  async getMovieCertifications(): Promise<{
    certifications: Record<
      string,
      {
        certification: string
        meaning: string
        order: number
      }[]
    >
  }> {
    return this.base.get('/certification/movie/list')
  }

  /**
   * Get TV content ratings for all countries
   */
  async getTVCertifications(): Promise<{
    certifications: Record<
      string,
      {
        certification: string
        meaning: string
        order: number
      }[]
    >
  }> {
    return this.base.get('/certification/tv/list')
  }

  // Utility methods for working with configuration data

  /**
   * Get genre name by ID
   */
  async getGenreName(genreId: number, mediaType: 'movie' | 'tv' = 'movie'): Promise<string | null> {
    const genres = mediaType === 'movie' ? await this.getMovieGenres() : await this.getTVGenres()

    const genre = genres.genres.find((g) => g.id === genreId)
    return genre?.name || null
  }

  /**
   * Get country name by ISO code
   */
  async getCountryName(isoCode: string): Promise<string | null> {
    const countries = await this.getCountries()
    const country = countries.find((c) => c.iso_3166_1 === isoCode)
    return country?.english_name || null
  }

  /**
   * Get language name by ISO code
   */
  async getLanguageName(isoCode: string): Promise<string | null> {
    const languages = await this.getLanguages()
    const language = languages.find((l) => l.iso_639_1 === isoCode)
    return language?.english_name || null
  }

  /**
   * Get comprehensive configuration data (cached)
   */
  async getFullConfiguration(): Promise<{
    api: TMDBConfigurationResponse
    movieGenres: TMDBGenre[]
    tvGenres: TMDBGenre[]
    countries: TMDBCountryResponse[]
    languages: TMDBLanguageResponse[]
    jobs: { department: string; jobs: string[] }[]
    watchProviderRegions: { iso_3166_1: string; english_name: string; native_name: string }[]
    movieCertifications: any
    tvCertifications: any
  }> {
    // Fetch all configuration data in parallel
    const [
      api,
      movieGenres,
      tvGenres,
      countries,
      languages,
      jobs,
      watchProviderRegions,
      movieCertifications,
      tvCertifications,
    ] = await Promise.all([
      this.getAPIConfiguration(),
      this.getMovieGenres(),
      this.getTVGenres(),
      this.getCountries(),
      this.getLanguages(),
      this.getJobs(),
      this.getWatchProviderRegions(),
      this.getMovieCertifications(),
      this.getTVCertifications(),
    ])

    return {
      api,
      movieGenres: movieGenres.genres,
      tvGenres: tvGenres.genres,
      countries,
      languages,
      jobs,
      watchProviderRegions,
      movieCertifications,
      tvCertifications,
    }
  }
}
