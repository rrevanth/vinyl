import type { QueryClient } from '@tanstack/react-query'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { TMDBClient } from '@/src/infrastructure/api/tmdb/TMDBClient'
import type {
  TMDBMovieResponse,
  TMDBTVResponse,
  TMDBPersonResponse,
  TMDBMultiSearchResult,
  TMDBPaginatedResponse,
  TMDBMovieAppendToResponse,
  TMDBTVAppendToResponse,
  TMDBCreditsResponse,
  TMDBVideosResponse,
  TMDBImagesResponse,
  TMDBReviewResponse,
  TMDBKeywordsResponse,
  TMDBExternalIdsResponse,
  TMDBReleaseDatesResponse,
  TMDBWatchProvidersResponse,
  TMDBTranslationsResponse,
  TMDBContentRatingsResponse,
  TMDBAggregateCreditsResponse,
  TMDBSeason,
  TMDBEpisode,
  TMDBMovieSearchParams,
  TMDBTVSearchParams,
  TMDBPersonSearchParams,
  TMDBMultiSearchParams,
  TMDBDiscoverMovieFilters,
  TMDBDiscoverTVFilters,
} from '@/src/infrastructure/api/tmdb/types'
import { GenericAPICache, type CacheStrategy } from '@/src/infrastructure/cache/GenericAPICache'

/**
 * TMDB API Cache wrapper
 *
 * Wraps TMDB API methods with GenericAPICache for consistent caching behavior
 * across all TMDB operations. Uses appropriate cache strategies for different
 * endpoint types.
 *
 * Features:
 * - Media details cached for 1 hour (media-details strategy)
 * - Search results cached for 5 minutes (search strategy)
 * - Catalog/list items cached for 5 minutes (catalog-items strategy)
 * - Consistent auth-aware cache keys (though TMDB doesn't use auth)
 * - Automatic retry with exponential backoff
 * - Type-safe with full TypeScript support
 *
 * Usage:
 * ```typescript
 * const tmdbCache = container.resolve<TMDBAPICache>(TOKENS.TMDBAPICache)
 *
 * // Get movie details with caching
 * const movie = await tmdbCache.getMovieDetails(123)
 *
 * // Search with caching
 * const results = await tmdbCache.searchMovies({ query: 'matrix' })
 * ```
 */
export class TMDBAPICache {
  private cache: GenericAPICache

  constructor(
    private readonly queryClient: QueryClient,
    private readonly logger: ILoggingService,
    private readonly tmdbClient: TMDBClient
  ) {
    this.cache = new GenericAPICache(queryClient, logger)
  }

  // ============================================================================
  // Movie Methods
  // ============================================================================

  /**
   * Get movie details with selective append_to_response options
   * Cached with media-details strategy (1 hour stale time)
   */
  async getMovieDetails(
    movieId: number,
    appendToResponse: TMDBMovieAppendToResponse[] = []
  ): Promise<TMDBMovieResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'details', movieId, appendToResponse.join(',')],
      () => this.tmdbClient.movies.getMovieDetails(movieId, appendToResponse),
      'media-details',
      false // TMDB doesn't use authentication
    )
  }

  /**
   * Get complete movie details with ALL append_to_response options
   * Cached with media-details strategy (1 hour stale time)
   */
  async getCompleteMovieDetails(movieId: number): Promise<TMDBMovieResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'complete', movieId],
      () => this.tmdbClient.movies.getCompleteMovieDetails(movieId),
      'media-details',
      false
    )
  }

  /**
   * Get movie credits (cast and crew)
   * Cached with media-details strategy
   */
  async getMovieCredits(movieId: number): Promise<TMDBCreditsResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'credits', movieId],
      () => this.tmdbClient.movies.getMovieCredits(movieId),
      'media-details',
      false
    )
  }

  /**
   * Get movie videos (trailers, teasers, clips)
   * Cached with media-details strategy
   */
  async getMovieVideos(movieId: number): Promise<TMDBVideosResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'videos', movieId],
      () => this.tmdbClient.movies.getMovieVideos(movieId),
      'media-details',
      false
    )
  }

  /**
   * Get movie images (posters, backdrops, logos)
   * Cached with media-details strategy
   */
  async getMovieImages(movieId: number): Promise<TMDBImagesResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'images', movieId],
      () => this.tmdbClient.movies.getMovieImages(movieId),
      'media-details',
      false
    )
  }

  /**
   * Get movie reviews with pagination
   * Cached with catalog-items strategy (5 minutes)
   */
  async getMovieReviews(
    movieId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBReviewResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'reviews', movieId, page],
      () => this.tmdbClient.movies.getMovieReviews(movieId, page),
      'catalog-items',
      false
    )
  }

  /**
   * Get movie recommendations
   * Cached with catalog-items strategy
   */
  async getMovieRecommendations(
    movieId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'recommendations', movieId, page],
      () => this.tmdbClient.movies.getMovieRecommendations(movieId, page),
      'catalog-items',
      false
    )
  }

  /**
   * Get similar movies
   * Cached with catalog-items strategy
   */
  async getSimilarMovies(
    movieId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'similar', movieId, page],
      () => this.tmdbClient.movies.getSimilarMovies(movieId, page),
      'catalog-items',
      false
    )
  }

  /**
   * Get movie keywords
   * Cached with media-details strategy
   */
  async getMovieKeywords(movieId: number): Promise<TMDBKeywordsResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'keywords', movieId],
      () => this.tmdbClient.movies.getMovieKeywords(movieId),
      'media-details',
      false
    )
  }

  /**
   * Get movie external IDs
   * Cached with media-details strategy
   */
  async getMovieExternalIds(movieId: number): Promise<TMDBExternalIdsResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'external_ids', movieId],
      () => this.tmdbClient.movies.getMovieExternalIds(movieId),
      'media-details',
      false
    )
  }

  /**
   * Get movie release dates
   * Cached with media-details strategy
   */
  async getMovieReleaseDates(movieId: number): Promise<TMDBReleaseDatesResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'release_dates', movieId],
      () => this.tmdbClient.movies.getMovieReleaseDates(movieId),
      'media-details',
      false
    )
  }

  /**
   * Get movie watch providers
   * Cached with media-details strategy
   */
  async getMovieWatchProviders(movieId: number): Promise<TMDBWatchProvidersResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'watch_providers', movieId],
      () => this.tmdbClient.movies.getMovieWatchProviders(movieId),
      'media-details',
      false
    )
  }

  /**
   * Get movie translations
   * Cached with media-details strategy
   */
  async getMovieTranslations(movieId: number): Promise<TMDBTranslationsResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'translations', movieId],
      () => this.tmdbClient.movies.getMovieTranslations(movieId),
      'media-details',
      false
    )
  }

  // Movie lists

  /**
   * Get popular movies
   * Cached with catalog-items strategy
   */
  async getPopularMovies(page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'popular', page],
      () => this.tmdbClient.movies.getPopularMovies(page),
      'catalog-items',
      false
    )
  }

  /**
   * Get top rated movies
   * Cached with catalog-items strategy
   */
  async getTopRatedMovies(page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'top_rated', page],
      () => this.tmdbClient.movies.getTopRatedMovies(page),
      'catalog-items',
      false
    )
  }

  /**
   * Get upcoming movies
   * Cached with catalog-items strategy
   */
  async getUpcomingMovies(page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'upcoming', page],
      () => this.tmdbClient.movies.getUpcomingMovies(page),
      'catalog-items',
      false
    )
  }

  /**
   * Get now playing movies
   * Cached with catalog-items strategy
   */
  async getNowPlayingMovies(page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'now_playing', page],
      () => this.tmdbClient.movies.getNowPlayingMovies(page),
      'catalog-items',
      false
    )
  }

  /**
   * Get latest movie
   * Cached with media-details strategy
   */
  async getLatestMovie(): Promise<TMDBMovieResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'movie', 'latest'],
      () => this.tmdbClient.movies.getLatestMovie(),
      'media-details',
      false
    )
  }

  // ============================================================================
  // TV Show Methods
  // ============================================================================

  /**
   * Get TV show details with selective append_to_response options
   * Cached with media-details strategy
   */
  async getTVDetails(
    tvId: number,
    appendToResponse: TMDBTVAppendToResponse[] = []
  ): Promise<TMDBTVResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'details', tvId, appendToResponse.join(',')],
      () => this.tmdbClient.tv.getTVDetails(tvId, appendToResponse),
      'media-details',
      false
    )
  }

  /**
   * Get complete TV show details with ALL append_to_response options
   * Cached with media-details strategy
   */
  async getCompleteTVDetails(tvId: number): Promise<TMDBTVResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'complete', tvId],
      () => this.tmdbClient.tv.getCompleteTVDetails(tvId),
      'media-details',
      false
    )
  }

  /**
   * Get TV show credits
   * Cached with media-details strategy
   */
  async getTVCredits(tvId: number): Promise<TMDBCreditsResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'credits', tvId],
      () => this.tmdbClient.tv.getTVCredits(tvId),
      'media-details',
      false
    )
  }

  /**
   * Get TV show aggregate credits
   * Cached with media-details strategy
   */
  async getTVAggregateCredits(tvId: number): Promise<TMDBAggregateCreditsResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'aggregate_credits', tvId],
      () => this.tmdbClient.tv.getTVAggregateCredits(tvId),
      'media-details',
      false
    )
  }

  /**
   * Get TV show videos
   * Cached with media-details strategy
   */
  async getTVVideos(tvId: number): Promise<TMDBVideosResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'videos', tvId],
      () => this.tmdbClient.tv.getTVVideos(tvId),
      'media-details',
      false
    )
  }

  /**
   * Get TV show images
   * Cached with media-details strategy
   */
  async getTVImages(tvId: number): Promise<TMDBImagesResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'images', tvId],
      () => this.tmdbClient.tv.getTVImages(tvId),
      'media-details',
      false
    )
  }

  /**
   * Get TV show reviews
   * Cached with catalog-items strategy
   */
  async getTVReviews(
    tvId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBReviewResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'reviews', tvId, page],
      () => this.tmdbClient.tv.getTVReviews(tvId, page),
      'catalog-items',
      false
    )
  }

  /**
   * Get TV show recommendations
   * Cached with catalog-items strategy
   */
  async getTVRecommendations(
    tvId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'recommendations', tvId, page],
      () => this.tmdbClient.tv.getTVRecommendations(tvId, page),
      'catalog-items',
      false
    )
  }

  /**
   * Get similar TV shows
   * Cached with catalog-items strategy
   */
  async getSimilarTVShows(
    tvId: number,
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'similar', tvId, page],
      () => this.tmdbClient.tv.getSimilarTVShows(tvId, page),
      'catalog-items',
      false
    )
  }

  /**
   * Get TV show keywords
   * Cached with media-details strategy
   */
  async getTVKeywords(tvId: number): Promise<TMDBKeywordsResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'keywords', tvId],
      () => this.tmdbClient.tv.getTVKeywords(tvId),
      'media-details',
      false
    )
  }

  /**
   * Get TV show external IDs
   * Cached with media-details strategy
   */
  async getTVExternalIds(tvId: number): Promise<TMDBExternalIdsResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'external_ids', tvId],
      () => this.tmdbClient.tv.getTVExternalIds(tvId),
      'media-details',
      false
    )
  }

  /**
   * Get TV show content ratings
   * Cached with media-details strategy
   */
  async getTVContentRatings(tvId: number): Promise<TMDBContentRatingsResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'content_ratings', tvId],
      () => this.tmdbClient.tv.getTVContentRatings(tvId),
      'media-details',
      false
    )
  }

  /**
   * Get TV show watch providers
   * Cached with media-details strategy
   */
  async getTVWatchProviders(tvId: number): Promise<TMDBWatchProvidersResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'watch_providers', tvId],
      () => this.tmdbClient.tv.getTVWatchProviders(tvId),
      'media-details',
      false
    )
  }

  /**
   * Get TV show translations
   * Cached with media-details strategy
   */
  async getTVTranslations(tvId: number): Promise<TMDBTranslationsResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'translations', tvId],
      () => this.tmdbClient.tv.getTVTranslations(tvId),
      'media-details',
      false
    )
  }

  // Season methods

  /**
   * Get season details
   * Cached with media-details strategy
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
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'season', tvId, seasonNumber, appendToResponse.join(',')],
      () => this.tmdbClient.tv.getSeasonDetails(tvId, seasonNumber, appendToResponse),
      'media-details',
      false
    )
  }

  /**
   * Get complete season details
   * Cached with media-details strategy
   */
  async getCompleteSeasonDetails(tvId: number, seasonNumber: number) {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'season', 'complete', tvId, seasonNumber],
      () => this.tmdbClient.tv.getCompleteSeasonDetails(tvId, seasonNumber),
      'media-details',
      false
    )
  }

  // Episode methods

  /**
   * Get episode details
   * Cached with media-details strategy
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
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'episode', tvId, seasonNumber, episodeNumber, appendToResponse.join(',')],
      () => this.tmdbClient.tv.getEpisodeDetails(tvId, seasonNumber, episodeNumber, appendToResponse),
      'media-details',
      false
    )
  }

  /**
   * Get complete episode details
   * Cached with media-details strategy
   */
  async getCompleteEpisodeDetails(tvId: number, seasonNumber: number, episodeNumber: number) {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'episode', 'complete', tvId, seasonNumber, episodeNumber],
      () => this.tmdbClient.tv.getCompleteEpisodeDetails(tvId, seasonNumber, episodeNumber),
      'media-details',
      false
    )
  }

  // TV lists

  /**
   * Get popular TV shows
   * Cached with catalog-items strategy
   */
  async getPopularTVShows(page: number = 1): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'popular', page],
      () => this.tmdbClient.tv.getPopularTVShows(page),
      'catalog-items',
      false
    )
  }

  /**
   * Get top rated TV shows
   * Cached with catalog-items strategy
   */
  async getTopRatedTVShows(page: number = 1): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'top_rated', page],
      () => this.tmdbClient.tv.getTopRatedTVShows(page),
      'catalog-items',
      false
    )
  }

  /**
   * Get TV shows airing today
   * Cached with catalog-items strategy
   */
  async getTVAiringToday(page: number = 1): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'airing_today', page],
      () => this.tmdbClient.tv.getTVAiringToday(page),
      'catalog-items',
      false
    )
  }

  /**
   * Get TV shows on the air
   * Cached with catalog-items strategy
   */
  async getTVOnTheAir(page: number = 1): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'on_the_air', page],
      () => this.tmdbClient.tv.getTVOnTheAir(page),
      'catalog-items',
      false
    )
  }

  /**
   * Get latest TV show
   * Cached with media-details strategy
   */
  async getLatestTVShow(): Promise<TMDBTVResponse> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'tv', 'latest'],
      () => this.tmdbClient.tv.getLatestTVShow(),
      'media-details',
      false
    )
  }

  // ============================================================================
  // Search Methods
  // ============================================================================

  /**
   * Multi-search across all content types
   * Cached with search strategy (5 minutes)
   */
  async multiSearch(
    params: TMDBMultiSearchParams
  ): Promise<TMDBPaginatedResponse<TMDBMultiSearchResult>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'search', 'multi', params.query, params.page ?? 1, params.include_adult ?? false],
      () => this.tmdbClient.search.multiSearch(params),
      'search',
      false
    )
  }

  /**
   * Search movies
   * Cached with search strategy
   */
  async searchMovies(
    params: TMDBMovieSearchParams
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.cache.fetchWithStrategy(
      [
        'tmdb',
        'search',
        'movie',
        params.query,
        params.page ?? 1,
        params.include_adult ?? false,
        params.primary_release_year ?? '',
        params.year ?? '',
        params.region ?? '',
      ],
      () => this.tmdbClient.search.searchMovies(params),
      'search',
      false
    )
  }

  /**
   * Search TV shows
   * Cached with search strategy
   */
  async searchTVShows(params: TMDBTVSearchParams): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.cache.fetchWithStrategy(
      [
        'tmdb',
        'search',
        'tv',
        params.query,
        params.page ?? 1,
        params.include_adult ?? false,
        params.first_air_date_year ?? '',
      ],
      () => this.tmdbClient.search.searchTVShows(params),
      'search',
      false
    )
  }

  /**
   * Search people
   * Cached with search strategy
   */
  async searchPeople(
    params: TMDBPersonSearchParams
  ): Promise<TMDBPaginatedResponse<TMDBPersonResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'search', 'person', params.query, params.page ?? 1, params.include_adult ?? false],
      () => this.tmdbClient.search.searchPeople(params),
      'search',
      false
    )
  }

  // ============================================================================
  // Discover Methods
  // ============================================================================

  /**
   * Discover movies with filtering
   * Cached with catalog-items strategy
   */
  async discoverMovies(
    filters: TMDBDiscoverMovieFilters = {}
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'discover', 'movie', JSON.stringify(filters)],
      () => this.tmdbClient.discover.discoverMovies(filters),
      'catalog-items',
      false
    )
  }

  /**
   * Discover TV shows with filtering
   * Cached with catalog-items strategy
   */
  async discoverTVShows(
    filters: TMDBDiscoverTVFilters = {}
  ): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'discover', 'tv', JSON.stringify(filters)],
      () => this.tmdbClient.discover.discoverTVShows(filters),
      'catalog-items',
      false
    )
  }

  /**
   * Get trending movies
   * Cached with catalog-items strategy
   */
  async getTrendingMovies(
    timeWindow: 'day' | 'week' = 'week',
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBMovieResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'trending', 'movie', timeWindow, page],
      () => this.tmdbClient.discover.getTrendingMovies(timeWindow, page),
      'catalog-items',
      false
    )
  }

  /**
   * Get trending TV shows
   * Cached with catalog-items strategy
   */
  async getTrendingTVShows(
    timeWindow: 'day' | 'week' = 'week',
    page: number = 1
  ): Promise<TMDBPaginatedResponse<TMDBTVResponse>> {
    return this.cache.fetchWithStrategy(
      ['tmdb', 'trending', 'tv', timeWindow, page],
      () => this.tmdbClient.discover.getTrendingTVShows(timeWindow, page),
      'catalog-items',
      false
    )
  }

  // ============================================================================
  // Cache Management
  // ============================================================================

  /**
   * Try to get a value from cache without triggering a fetch
   * Returns null if cache entry doesn't exist or is expired
   *
   * @param cacheKey - Cache key array to look up
   * @returns Cached value or null if not found/expired
   */
  async tryGetFromCache<T>(cacheKey: unknown[]): Promise<T | null> {
    const authAwareKey = [...cacheKey, 'public'] // TMDB doesn't use auth
    const cachedData = this.queryClient.getQueryData<T>(authAwareKey)
    return cachedData ?? null
  }

  /**
   * Set a value in cache with the given strategy
   * Useful for manually populating cache (e.g., from optimistic updates)
   *
   * @param cacheKey - Cache key array
   * @param value - Value to store in cache
   * @param strategy - Cache strategy to determine stale/gc times
   */
  async setInCache<T>(cacheKey: unknown[], value: T, strategy: CacheStrategy): Promise<void> {
    const authAwareKey = [...cacheKey, 'public'] // TMDB doesn't use auth
    const config = this.cache.getStrategyConfig(strategy)

    this.queryClient.setQueryData(authAwareKey, value)

    // Update the query state to include cache timing configuration
    this.queryClient.setQueryDefaults(authAwareKey, {
      staleTime: config.staleTime,
      gcTime: config.gcTime,
    })

    this.logger.debug('Set cache entry', {
      queryKey: authAwareKey,
      strategy,
      staleTime: config.staleTime,
      gcTime: config.gcTime,
    })
  }

  /**
   * Invalidate all TMDB caches
   */
  async invalidateAll(): Promise<void> {
    await this.cache.invalidate(['tmdb'])
  }

  /**
   * Invalidate movie caches
   */
  async invalidateMovieCaches(): Promise<void> {
    await this.cache.invalidate(['tmdb', 'movie'])
  }

  /**
   * Invalidate TV show caches
   */
  async invalidateTVCaches(): Promise<void> {
    await this.cache.invalidate(['tmdb', 'tv'])
  }

  /**
   * Invalidate search caches
   */
  async invalidateSearchCaches(): Promise<void> {
    await this.cache.invalidate(['tmdb', 'search'])
  }

  /**
   * Invalidate discover caches
   */
  async invalidateDiscoverCaches(): Promise<void> {
    await this.cache.invalidate(['tmdb', 'discover'])
  }

  /**
   * Invalidate specific movie cache
   */
  async invalidateMovie(movieId: number): Promise<void> {
    await this.cache.invalidate(['tmdb', 'movie', 'details', movieId])
    await this.cache.invalidate(['tmdb', 'movie', 'complete', movieId])
  }

  /**
   * Invalidate specific TV show cache
   */
  async invalidateTVShow(tvId: number): Promise<void> {
    await this.cache.invalidate(['tmdb', 'tv', 'details', tvId])
    await this.cache.invalidate(['tmdb', 'tv', 'complete', tvId])
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return this.cache.getCacheStats()
  }

  /**
   * Clear all caches
   */
  async clearAll(): Promise<void> {
    await this.cache.clearAll()
  }

  /**
   * Initialize the cache
   */
  async initialize(): Promise<void> {
    await this.cache.initialize()
    this.logger.info('TMDBAPICache initialized')
  }

  /**
   * Shutdown the cache
   */
  async shutdown(): Promise<void> {
    await this.cache.shutdown()
    this.logger.info('TMDBAPICache shutdown')
  }
}
