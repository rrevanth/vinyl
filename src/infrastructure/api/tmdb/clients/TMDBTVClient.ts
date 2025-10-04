import { TMDBBaseClient } from '../TMDBBaseClient'
import type {
  TMDBTVResponse,
  TMDBCreditsResponse,
  TMDBVideosResponse,
  TMDBImagesResponse,
  TMDBReviewResponse,
  TMDBKeywordsResponse,
  TMDBExternalIdsResponse,
  TMDBContentRatingsResponse,
  TMDBWatchProvidersResponse,
  TMDBTranslationsResponse,
  TMDBAggregateCreditsResponse,
  TMDBPaginatedResponse,
  TMDBTVAppendToResponse,
  TMDBSeason,
  TMDBEpisode,
} from '../types'

/**
 * TMDB TV Shows API client
 *
 * Provides comprehensive TV show data access including seasons and episodes
 * with full append_to_response support for maximum efficiency.
 */
export class TMDBTVClient extends TMDBBaseClient {
  /**
   * Get TV show details with selective append_to_response options
   */
  async getTVDetails(
    tvId: number,
    appendToResponse: TMDBTVAppendToResponse[] = []
  ): Promise<TMDBTVResponse> {
    const params: Record<string, any> = {}

    if (appendToResponse.length > 0) {
      params.append_to_response = appendToResponse.join(',')
    }

    return this.get<TMDBTVResponse>(`/tv/${tvId}`, params)
  }

  /**
   * Get complete TV show details with ALL append_to_response options
   */
  async getCompleteTVDetails(tvId: number): Promise<TMDBTVResponse> {
    return this.getTVDetails(tvId, [
      'credits',
      'videos',
      'images',
      'reviews',
      'recommendations',
      'similar',
      'keywords',
      'external_ids',
      'translations',
      'content_ratings',
      'watch_providers',
      'aggregate_credits',
    ])
  }

  /**
   * Get TV show credits (cast and crew)
   */
  async getTVCredits(tvId: number): Promise<TMDBCreditsResponse> {
    return this.get<TMDBCreditsResponse>(`/tv/${tvId}/credits`)
  }

  /**
   * Get TV show aggregate credits (for entire series)
   */
  async getTVAggregateCredits(tvId: number): Promise<TMDBAggregateCreditsResponse> {
    return this.get<TMDBAggregateCreditsResponse>(`/tv/${tvId}/aggregate_credits`)
  }

  /**
   * Get TV show videos (trailers, teasers, clips, etc.)
   */
  async getTVVideos(tvId: number): Promise<TMDBVideosResponse> {
    return this.get<TMDBVideosResponse>(`/tv/${tvId}/videos`)
  }

  /**
   * Get TV show images (posters, backdrops, logos)
   */
  async getTVImages(tvId: number): Promise<TMDBImagesResponse> {
    return this.get<TMDBImagesResponse>(`/tv/${tvId}/images`)
  }

  /**
   * Get TV show reviews with pagination
   */
  async getTVReviews(
    tvId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBReviewResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBReviewResponse>>(`/tv/${tvId}/reviews`, { page })
  }

  /**
   * Get TV show recommendations with pagination
   */
  async getTVRecommendations(
    tvId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBTVResponse>>(`/tv/${tvId}/recommendations`, { page })
  }

  /**
   * Get similar TV shows with pagination
   */
  async getSimilarTVShows(
    tvId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBTVResponse>>(`/tv/${tvId}/similar`, { page })
  }

  /**
   * Get TV show keywords
   */
  async getTVKeywords(tvId: number): Promise<TMDBKeywordsResponse> {
    return this.get<TMDBKeywordsResponse>(`/tv/${tvId}/keywords`)
  }

  /**
   * Get TV show external IDs
   */
  async getTVExternalIds(tvId: number): Promise<TMDBExternalIdsResponse> {
    return this.get<TMDBExternalIdsResponse>(`/tv/${tvId}/external_ids`)
  }

  /**
   * Get TV show content ratings by country
   */
  async getTVContentRatings(tvId: number): Promise<TMDBContentRatingsResponse> {
    return this.get<TMDBContentRatingsResponse>(`/tv/${tvId}/content_ratings`)
  }

  /**
   * Get TV show watch providers by region
   */
  async getTVWatchProviders(tvId: number): Promise<TMDBWatchProvidersResponse> {
    return this.get<TMDBWatchProvidersResponse>(`/tv/${tvId}/watch/providers`)
  }

  /**
   * Get TV show translations
   */
  async getTVTranslations(tvId: number): Promise<TMDBTranslationsResponse> {
    return this.get<TMDBTranslationsResponse>(`/tv/${tvId}/translations`)
  }

  // Season methods

  /**
   * Get season details with optional append_to_response
   */
  async getSeasonDetails(
    tvId: number,
    seasonNumber: number,
    appendToResponse: string[] = []
  ): Promise<
    TMDBSeason & {
      episodes?: TMDBEpisode[]
      credits?: TMDBCreditsResponse
      videos?: TMDBVideosResponse
      images?: TMDBImagesResponse
      external_ids?: TMDBExternalIdsResponse
    }
  > {
    const params: Record<string, any> = {}

    if (appendToResponse.length > 0) {
      params.append_to_response = appendToResponse.join(',')
    }

    return this.get(`/tv/${tvId}/season/${seasonNumber}`, params)
  }

  /**
   * Get complete season details with episodes and all metadata
   */
  async getCompleteSeasonDetails(tvId: number, seasonNumber: number) {
    return this.getSeasonDetails(tvId, seasonNumber, [
      'credits',
      'videos',
      'images',
      'external_ids',
    ])
  }

  /**
   * Get season credits
   */
  async getSeasonCredits(tvId: number, seasonNumber: number): Promise<TMDBCreditsResponse> {
    return this.get<TMDBCreditsResponse>(`/tv/${tvId}/season/${seasonNumber}/credits`)
  }

  /**
   * Get season videos
   */
  async getSeasonVideos(tvId: number, seasonNumber: number): Promise<TMDBVideosResponse> {
    return this.get<TMDBVideosResponse>(`/tv/${tvId}/season/${seasonNumber}/videos`)
  }

  /**
   * Get season images
   */
  async getSeasonImages(tvId: number, seasonNumber: number): Promise<TMDBImagesResponse> {
    return this.get<TMDBImagesResponse>(`/tv/${tvId}/season/${seasonNumber}/images`)
  }

  // Episode methods

  /**
   * Get episode details with optional append_to_response
   */
  async getEpisodeDetails(
    tvId: number,
    seasonNumber: number,
    episodeNumber: number,
    appendToResponse: string[] = []
  ): Promise<
    TMDBEpisode & {
      credits?: TMDBCreditsResponse
      videos?: TMDBVideosResponse
      images?: TMDBImagesResponse
      external_ids?: TMDBExternalIdsResponse
      translations?: TMDBTranslationsResponse
    }
  > {
    const params: Record<string, any> = {}

    if (appendToResponse.length > 0) {
      params.append_to_response = appendToResponse.join(',')
    }

    return this.get(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`, params)
  }

  /**
   * Get complete episode details with all metadata
   */
  async getCompleteEpisodeDetails(tvId: number, seasonNumber: number, episodeNumber: number) {
    return this.getEpisodeDetails(tvId, seasonNumber, episodeNumber, [
      'credits',
      'videos',
      'images',
      'external_ids',
      'translations',
    ])
  }

  /**
   * Get episode credits
   */
  async getEpisodeCredits(
    tvId: number,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<TMDBCreditsResponse> {
    return this.get<TMDBCreditsResponse>(
      `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/credits`
    )
  }

  /**
   * Get episode videos
   */
  async getEpisodeVideos(
    tvId: number,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<TMDBVideosResponse> {
    return this.get<TMDBVideosResponse>(
      `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/videos`
    )
  }

  /**
   * Get episode images
   */
  async getEpisodeImages(
    tvId: number,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<TMDBImagesResponse> {
    return this.get<TMDBImagesResponse>(
      `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/images`
    )
  }

  // TV lists

  /**
   * Get popular TV shows
   */
  async getPopularTVShows(page: number = 1): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBTVResponse>>('/tv/popular', { page })
  }

  /**
   * Get top rated TV shows
   */
  async getTopRatedTVShows(page: number = 1): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBTVResponse>>('/tv/top_rated', { page })
  }

  /**
   * Get TV shows airing today
   */
  async getTVAiringToday(page: number = 1): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBTVResponse>>('/tv/airing_today', { page })
  }

  /**
   * Get TV shows on the air (currently airing)
   */
  async getTVOnTheAir(page: number = 1): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.get<TMDBPaginatedResponse<TMDBTVResponse>>('/tv/on_the_air', { page })
  }

  /**
   * Get latest TV show (single show, not paginated)
   */
  async getLatestTVShow(): Promise<TMDBTVResponse> {
    return this.get<TMDBTVResponse>('/tv/latest')
  }

  // Alternative title methods

  /**
   * Get TV show alternative titles
   */
  async getTVAlternativeTitles(
    tvId: number,
    country?: string
  ): Promise<{
    id: number
    results: {
      iso_3166_1: string
      title: string
      type: string
    }[]
  }> {
    const params = country ? { country } : {}
    return this.get(`/tv/${tvId}/alternative_titles`, params)
  }

  // Network methods

  /**
   * Get network details
   */
  async getNetworkDetails(networkId: number): Promise<{
    headquarters: string
    homepage: string
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }> {
    return this.get(`/network/${networkId}`)
  }
}
