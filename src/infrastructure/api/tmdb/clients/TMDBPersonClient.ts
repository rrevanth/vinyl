import type { TMDBBaseClient } from '../TMDBBaseClient'
import type {
  TMDBPersonResponse,
  TMDBPersonMovieCreditsResponse,
  TMDBPersonTVCreditsResponse,
  TMDBPersonCombinedCreditsResponse,
  TMDBExternalIdsResponse,
  TMDBPersonImagesResponse,
  TMDBTaggedImage,
  TMDBTranslationsResponse,
  TMDBPaginatedResponse,
  TMDBPersonAppendToResponse,
} from '../types'

/**
 * TMDB Person API client
 *
 * Provides comprehensive person/celebrity data access including
 * complete filmography, images, and biographical information.
 */
export class TMDBPersonClient {
  constructor(private readonly base: TMDBBaseClient) {}

  /**
   * Get person details with selective append_to_response options
   */
  async getPersonDetails(
    personId: number,
    appendToResponse: TMDBPersonAppendToResponse[] = []
  ): Promise<TMDBPersonResponse> {
    const params: Record<string, any> = {}

    if (appendToResponse.length > 0) {
      params.append_to_response = appendToResponse.join(',')
    }

    return this.base.get<TMDBPersonResponse>(`/person/${personId}`, params)
  }

  /**
   * Get complete person details with ALL append_to_response options
   */
  async getCompletePersonDetails(personId: number): Promise<TMDBPersonResponse> {
    return this.getPersonDetails(personId, [
      'movie_credits',
      'tv_credits',
      'combined_credits',
      'external_ids',
      'images',
      'tagged_images',
      'translations',
    ])
  }

  /**
   * Get person movie credits (filmography)
   */
  async getPersonMovieCredits(personId: number): Promise<TMDBPersonMovieCreditsResponse> {
    return this.base.get<TMDBPersonMovieCreditsResponse>(`/person/${personId}/movie_credits`)
  }

  /**
   * Get person TV show credits
   */
  async getPersonTVCredits(personId: number): Promise<TMDBPersonTVCreditsResponse> {
    return this.base.get<TMDBPersonTVCreditsResponse>(`/person/${personId}/tv_credits`)
  }

  /**
   * Get person combined credits (movies and TV shows together)
   */
  async getPersonCombinedCredits(personId: number): Promise<TMDBPersonCombinedCreditsResponse> {
    return this.base.get<TMDBPersonCombinedCreditsResponse>(`/person/${personId}/combined_credits`)
  }

  /**
   * Get person external IDs (social media, databases)
   */
  async getPersonExternalIds(personId: number): Promise<TMDBExternalIdsResponse> {
    return this.base.get<TMDBExternalIdsResponse>(`/person/${personId}/external_ids`)
  }

  /**
   * Get person images (profile photos)
   */
  async getPersonImages(personId: number): Promise<TMDBPersonImagesResponse> {
    return this.base.get<TMDBPersonImagesResponse>(`/person/${personId}/images`)
  }

  /**
   * Get person tagged images (images where person is tagged)
   */
  async getPersonTaggedImages(
    personId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBTaggedImage>> {
    return this.base.get<TMDBPaginatedResponse<TMDBTaggedImage>>(`/person/${personId}/tagged_images`, {
      page,
    })
  }

  /**
   * Get person translations
   */
  async getPersonTranslations(personId: number): Promise<TMDBTranslationsResponse> {
    return this.base.get<TMDBTranslationsResponse>(`/person/${personId}/translations`)
  }

  // Person lists

  /**
   * Get popular people
   */
  async getPopularPeople(page: number = 1): Promise<TMDBPaginatedResponse<TMDBPersonResponse>> {
    return this.base.get<TMDBPaginatedResponse<TMDBPersonResponse>>('/person/popular', { page })
  }

  /**
   * Get latest person (single person, not paginated)
   */
  async getLatestPerson(): Promise<TMDBPersonResponse> {
    return this.base.get<TMDBPersonResponse>('/person/latest')
  }

  // Utility methods for analyzing filmography

  /**
   * Get person's most popular movies
   */
  async getPersonPopularMovies(personId: number, limit: number = 10): Promise<any[]> {
    const credits = await this.getPersonMovieCredits(personId)

    // Combine cast and crew, sort by popularity, take top results
    const allMovies = [
      ...credits.cast.map((movie) => ({ ...movie, role_type: 'cast' as const })),
      ...credits.crew.map((movie) => ({ ...movie, role_type: 'crew' as const })),
    ]

    return allMovies.sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, limit)
  }

  /**
   * Get person's most popular TV shows
   */
  async getPersonPopularTVShows(personId: number, limit: number = 10): Promise<any[]> {
    const credits = await this.getPersonTVCredits(personId)

    // Combine cast and crew, sort by popularity, take top results
    const allTVShows = [
      ...credits.cast.map((show) => ({ ...show, role_type: 'cast' as const })),
      ...credits.crew.map((show) => ({ ...show, role_type: 'crew' as const })),
    ]

    return allTVShows.sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, limit)
  }

  /**
   * Get person's roles by department (for crew members)
   */
  async getPersonRolesByDepartment(personId: number): Promise<Record<string, any[]>> {
    const movieCredits = await this.getPersonMovieCredits(personId)
    const tvCredits = await this.getPersonTVCredits(personId)

    const rolesByDepartment: Record<string, any[]> = {}

    // Process movie crew roles
    for (const movie of movieCredits.crew) {
      if (!rolesByDepartment[movie.department]) {
        rolesByDepartment[movie.department] = []
      }
      rolesByDepartment[movie.department].push({
        ...movie,
        media_type: 'movie',
      })
    }

    // Process TV crew roles
    for (const tvShow of tvCredits.crew) {
      if (!rolesByDepartment[tvShow.department]) {
        rolesByDepartment[tvShow.department] = []
      }
      rolesByDepartment[tvShow.department].push({
        ...tvShow,
        media_type: 'tv',
      })
    }

    return rolesByDepartment
  }

  /**
   * Get person's career timeline (chronological filmography)
   */
  async getPersonCareerTimeline(personId: number): Promise<
    {
      year: number
      projects: any[]
    }[]
  > {
    const combinedCredits = await this.getPersonCombinedCredits(personId)
    const timeline: Record<number, any[]> = {}

    // Process all credits
    const allCredits = [
      ...combinedCredits.cast.map((item) => ({
        ...item,
        role_type: 'cast',
        date:
          item.media_type === 'movie' ? (item as any).release_date : (item as any).first_air_date,
      })),
      ...combinedCredits.crew.map((item) => ({
        ...item,
        role_type: 'crew',
        date:
          item.media_type === 'movie' ? (item as any).release_date : (item as any).first_air_date,
      })),
    ]

    // Group by year
    for (const credit of allCredits) {
      if (credit.date) {
        const year = new Date(credit.date).getFullYear()
        if (!timeline[year]) {
          timeline[year] = []
        }
        timeline[year].push(credit)
      }
    }

    // Convert to sorted array
    return Object.entries(timeline)
      .map(([year, projects]) => ({
        year: parseInt(year),
        projects: projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      }))
      .sort((a, b) => b.year - a.year)
  }

  /**
   * Get comprehensive person statistics
   */
  async getPersonStats(personId: number): Promise<{
    totalMovies: number
    totalTVShows: number
    totalProjects: number
    mostCommonRole: string | null
    activeYears: { start: number | null; end: number | null }
    averageRating: number
    topGenres: { genre: string; count: number }[]
  }> {
    const combinedCredits = await this.getPersonCombinedCredits(personId)

    const movieCount =
      combinedCredits.cast.filter((c) => c.media_type === 'movie').length +
      combinedCredits.crew.filter((c) => c.media_type === 'movie').length
    const tvCount =
      combinedCredits.cast.filter((c) => c.media_type === 'tv').length +
      combinedCredits.crew.filter((c) => c.media_type === 'tv').length

    // Calculate active years
    const allDates = [
      ...combinedCredits.cast.map((c) =>
        c.media_type === 'movie' ? (c as any).release_date : (c as any).first_air_date
      ),
      ...combinedCredits.crew.map((c) =>
        c.media_type === 'movie' ? (c as any).release_date : (c as any).first_air_date
      ),
    ]
      .filter(Boolean)
      .map((date) => new Date(date).getFullYear())

    const activeStart = allDates.length > 0 ? Math.min(...allDates) : null
    const activeEnd = allDates.length > 0 ? Math.max(...allDates) : null

    // Calculate average rating
    const ratingsSum = [...combinedCredits.cast, ...combinedCredits.crew].reduce(
      (sum, credit) => sum + (credit.vote_average || 0),
      0
    )

    const totalCredits = combinedCredits.cast.length + combinedCredits.crew.length
    const averageRating = totalCredits > 0 ? ratingsSum / totalCredits : 0

    // Find most common role (for crew)
    const jobCounts: Record<string, number> = {}
    for (const crewCredit of combinedCredits.crew) {
      jobCounts[crewCredit.job] = (jobCounts[crewCredit.job] || 0) + 1
    }

    const mostCommonRole = Object.entries(jobCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || null

    return {
      totalMovies: movieCount,
      totalTVShows: tvCount,
      totalProjects: movieCount + tvCount,
      mostCommonRole,
      activeYears: { start: activeStart, end: activeEnd },
      averageRating,
      topGenres: [], // Would need additional API calls to get genre info
    }
  }
}
