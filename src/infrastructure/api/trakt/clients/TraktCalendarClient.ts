import { TraktBaseClient } from '../TraktBaseClient'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'
import type { TraktConfigFactory } from '../../../factories/TraktConfigFactory'
import type {
  TraktCalendarShow,
  TraktCalendarMovie,
  TraktExtended,
  TraktCalendarParams,
  TraktFilterParams,
} from '../types'

/**
 * Trakt Calendar API client
 *
 * Provides calendar functionality for shows and movies:
 * - Personal calendars (my shows, premieres, finales)
 * - Global calendars (all shows, movies, streaming releases)
 * - Calendar filtering and date range support
 * - DVD and streaming release calendars
 */
export class TraktCalendarClient extends TraktBaseClient {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(configFactory: TraktConfigFactory, logger: ILoggingService) {
    super(configFactory, logger)
  }

  // Personal Calendar Methods (require authentication)

  /**
   * Get personal show calendar
   * Shows episodes for shows the user has watched, collected, or watchlisted
   */
  async getMyShows(
    params?: TraktCalendarParams &
      TraktFilterParams & {
        start_date?: string
        days?: number
      }
  ): Promise<TraktCalendarShow[]> {
    const {
      start_date = new Date().toISOString().split('T')[0],
      days = 7,
      ...otherParams
    } = params || {}
    return this.get<TraktCalendarShow[]>(`/calendars/my/shows/${start_date}/${days}`, otherParams)
  }

  /**
   * Get personal new shows calendar
   * Shows new series premieres only
   */
  async getMyNewShows(
    params?: TraktCalendarParams &
      TraktFilterParams & {
        start_date?: string
        days?: number
      }
  ): Promise<TraktCalendarShow[]> {
    const {
      start_date = new Date().toISOString().split('T')[0],
      days = 7,
      ...otherParams
    } = params || {}
    return this.get<TraktCalendarShow[]>(
      `/calendars/my/shows/new/${start_date}/${days}`,
      otherParams
    )
  }

  /**
   * Get personal season premieres calendar
   * Shows series premieres, season premieres, and mid-season premieres
   */
  async getMyPremieres(
    params?: TraktCalendarParams &
      TraktFilterParams & {
        start_date?: string
        days?: number
      }
  ): Promise<TraktCalendarShow[]> {
    const {
      start_date = new Date().toISOString().split('T')[0],
      days = 7,
      ...otherParams
    } = params || {}
    return this.get<TraktCalendarShow[]>(
      `/calendars/my/shows/premieres/${start_date}/${days}`,
      otherParams
    )
  }

  /**
   * Get personal finales calendar
   * Shows series finales, season finales, and mid-season finales
   */
  async getMyFinales(
    params?: TraktCalendarParams &
      TraktFilterParams & {
        start_date?: string
        days?: number
      }
  ): Promise<TraktCalendarShow[]> {
    const {
      start_date = new Date().toISOString().split('T')[0],
      days = 7,
      ...otherParams
    } = params || {}
    return this.get<TraktCalendarShow[]>(
      `/calendars/my/shows/finales/${start_date}/${days}`,
      otherParams
    )
  }

  /**
   * Get personal movies calendar
   * Movies the user has watched, collected, or watchlisted
   */
  async getMyMovies(
    params?: TraktCalendarParams &
      TraktFilterParams & {
        start_date?: string
        days?: number
      }
  ): Promise<TraktCalendarMovie[]> {
    const {
      start_date = new Date().toISOString().split('T')[0],
      days = 7,
      ...otherParams
    } = params || {}
    return this.get<TraktCalendarMovie[]>(`/calendars/my/movies/${start_date}/${days}`, otherParams)
  }

  /**
   * Get personal streaming calendar
   * Streaming releases for user's watchlisted movies
   */
  async getMyStreaming(
    params?: TraktCalendarParams &
      TraktFilterParams & {
        start_date?: string
        days?: number
      }
  ): Promise<TraktCalendarMovie[]> {
    const {
      start_date = new Date().toISOString().split('T')[0],
      days = 7,
      ...otherParams
    } = params || {}
    return this.get<TraktCalendarMovie[]>(
      `/calendars/my/streaming/${start_date}/${days}`,
      otherParams
    )
  }

  /**
   * Get personal DVD calendar
   * DVD releases for user's watchlisted movies
   */
  async getMyDVD(
    params?: TraktCalendarParams &
      TraktFilterParams & {
        start_date?: string
        days?: number
      }
  ): Promise<TraktCalendarMovie[]> {
    const {
      start_date = new Date().toISOString().split('T')[0],
      days = 7,
      ...otherParams
    } = params || {}
    return this.get<TraktCalendarMovie[]>(`/calendars/my/dvd/${start_date}/${days}`, otherParams)
  }

  // Global Calendar Methods (public, no authentication required)

  /**
   * Get all shows calendar
   * All shows airing during the time period
   */
  async getAllShows(
    params?: TraktCalendarParams &
      TraktFilterParams & {
        start_date?: string
        days?: number
      }
  ): Promise<TraktCalendarShow[]> {
    const {
      start_date = new Date().toISOString().split('T')[0],
      days = 7,
      ...otherParams
    } = params || {}
    return this.get<TraktCalendarShow[]>(`/calendars/all/shows/${start_date}/${days}`, otherParams)
  }

  /**
   * Get all new shows calendar
   * All new series premieres airing
   */
  async getAllNewShows(
    params?: TraktCalendarParams &
      TraktFilterParams & {
        start_date?: string
        days?: number
      }
  ): Promise<TraktCalendarShow[]> {
    const {
      start_date = new Date().toISOString().split('T')[0],
      days = 7,
      ...otherParams
    } = params || {}
    return this.get<TraktCalendarShow[]>(
      `/calendars/all/shows/new/${start_date}/${days}`,
      otherParams
    )
  }

  /**
   * Get all season premieres calendar
   * All series premieres, season premieres, and mid-season premieres
   */
  async getAllPremieres(
    params?: TraktCalendarParams &
      TraktFilterParams & {
        start_date?: string
        days?: number
      }
  ): Promise<TraktCalendarShow[]> {
    const {
      start_date = new Date().toISOString().split('T')[0],
      days = 7,
      ...otherParams
    } = params || {}
    return this.get<TraktCalendarShow[]>(
      `/calendars/all/shows/premieres/${start_date}/${days}`,
      otherParams
    )
  }

  /**
   * Get all finales calendar
   * All series finales, season finales, and mid-season finales
   */
  async getAllFinales(
    params?: TraktCalendarParams &
      TraktFilterParams & {
        start_date?: string
        days?: number
      }
  ): Promise<TraktCalendarShow[]> {
    const {
      start_date = new Date().toISOString().split('T')[0],
      days = 7,
      ...otherParams
    } = params || {}
    return this.get<TraktCalendarShow[]>(
      `/calendars/all/shows/finales/${start_date}/${days}`,
      otherParams
    )
  }

  /**
   * Get all movies calendar
   * All movies with release dates during the time period
   */
  async getAllMovies(
    params?: TraktCalendarParams &
      TraktFilterParams & {
        start_date?: string
        days?: number
      }
  ): Promise<TraktCalendarMovie[]> {
    const {
      start_date = new Date().toISOString().split('T')[0],
      days = 7,
      ...otherParams
    } = params || {}
    return this.get<TraktCalendarMovie[]>(
      `/calendars/all/movies/${start_date}/${days}`,
      otherParams
    )
  }

  /**
   * Get all streaming calendar
   * All movies with US streaming releases during the time period
   */
  async getAllStreaming(
    params?: TraktCalendarParams &
      TraktFilterParams & {
        start_date?: string
        days?: number
      }
  ): Promise<TraktCalendarMovie[]> {
    const {
      start_date = new Date().toISOString().split('T')[0],
      days = 7,
      ...otherParams
    } = params || {}
    return this.get<TraktCalendarMovie[]>(
      `/calendars/all/streaming/${start_date}/${days}`,
      otherParams
    )
  }

  /**
   * Get all DVD calendar
   * All movies with US DVD releases during the time period
   */
  async getAllDVD(
    params?: TraktCalendarParams &
      TraktFilterParams & {
        start_date?: string
        days?: number
      }
  ): Promise<TraktCalendarMovie[]> {
    const {
      start_date = new Date().toISOString().split('T')[0],
      days = 7,
      ...otherParams
    } = params || {}
    return this.get<TraktCalendarMovie[]>(`/calendars/all/dvd/${start_date}/${days}`, otherParams)
  }

  // Utility Methods

  /**
   * Get calendar for a specific date range
   * Convenience method for getting multiple calendar types
   */
  async getCalendarRange(
    startDate: string,
    days: number,
    options?: {
      includeShows?: boolean
      includeMovies?: boolean
      includePremieres?: boolean
      includeFinales?: boolean
      personal?: boolean
      extended?: TraktExtended
    }
  ): Promise<{
    shows?: TraktCalendarShow[]
    movies?: TraktCalendarMovie[]
    premieres?: TraktCalendarShow[]
    finales?: TraktCalendarShow[]
  }> {
    const {
      includeShows = true,
      includeMovies = true,
      includePremieres = false,
      includeFinales = false,
      personal = false,
      extended,
    } = options || {}

    const params = { start_date: startDate, days, extended }
    const results: any = {}

    const promises: Promise<any>[] = []

    if (includeShows) {
      promises.push(
        (personal ? this.getMyShows(params) : this.getAllShows(params)).then(
          (shows) => (results.shows = shows)
        )
      )
    }

    if (includeMovies) {
      promises.push(
        (personal ? this.getMyMovies(params) : this.getAllMovies(params)).then(
          (movies) => (results.movies = movies)
        )
      )
    }

    if (includePremieres) {
      promises.push(
        (personal ? this.getMyPremieres(params) : this.getAllPremieres(params)).then(
          (premieres) => (results.premieres = premieres)
        )
      )
    }

    if (includeFinales) {
      promises.push(
        (personal ? this.getMyFinales(params) : this.getAllFinales(params)).then(
          (finales) => (results.finales = finales)
        )
      )
    }

    await Promise.all(promises)
    return results
  }

  /**
   * Get upcoming episodes for the next week
   * Convenience method for user's upcoming shows
   */
  async getUpcomingEpisodes(params?: { extended?: TraktExtended }): Promise<TraktCalendarShow[]> {
    const startDate = new Date().toISOString().split('T')[0]
    return this.getMyShows({ start_date: startDate, days: 7, ...params })
  }
}
