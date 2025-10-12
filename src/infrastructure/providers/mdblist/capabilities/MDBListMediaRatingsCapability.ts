import type {
  IMediaRatingsCapability,
  MediaRatings,
} from '@/src/domain/capabilities/IMediaRatingsCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { MDBListClient } from '@/src/infrastructure/api/mdblist/MDBListClient'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { ok, fail, type Result } from '@/src/domain/types/Result'
import { MDBListMapper } from '../MDBListMapper'
import { useQuery } from '@tanstack/react-query'

/**
 * MDBList Media Ratings Capability
 *
 * Retrieves aggregated ratings from multiple sources via MDBList API:
 * - IMDb
 * - TMDB
 * - Trakt
 * - Letterboxd
 * - Rotten Tomatoes (critics and audience)
 * - Metacritic
 * - Roger Ebert
 * - MyAnimeList (for anime)
 *
 * Features:
 * - TanStack Query caching with 24-hour stale time
 * - Automatic rating normalization to 0-10 scale
 * - Handles missing ratings gracefully
 * - IMDb ID-based lookup for maximum compatibility
 */
export class MDBListMediaRatingsCapability implements IMediaRatingsCapability {
  constructor(
    private readonly mdblistClient: MDBListClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get aggregated ratings for media from MDBList
   * @param media - The media to get ratings for
   * @returns Result with aggregated ratings from multiple sources
   */
  async getRatings(media: Media): Promise<Result<MediaRatings>> {
    try {
      // Check if MDBList is configured with API key
      const config = this.mdblistClient.getCurrentConfig()
      if (!config.hasValidApiKey) {
        this.logger.debug('MDBList API key not configured, skipping ratings fetch')
        return fail(
          new Error('MDBList API key not configured'),
          'mdblist',
          'missing_credentials'
        )
      }

      // MDBList requires IMDb ID for lookups
      const imdbId = media.externalIds.imdb?.id
      if (!imdbId) {
        this.logger.warn(`No IMDb ID found for media: ${media.title}`)
        return fail(
          new Error(`No IMDb ID found for media: ${media.title}`),
          'mdblist',
          'missing_id'
        )
      }

      // Fetch ratings based on media type
      const mdblistRatings =
        media.type === 'movie'
          ? await this.mdblistClient.getMovieRatings(imdbId)
          : await this.mdblistClient.getShowRatings(imdbId)

      // Validate that we got at least some ratings
      if (!MDBListMapper.hasValidRatings(mdblistRatings)) {
        this.logger.warn(`No ratings found for ${media.type}: ${media.title} (${imdbId})`)
        return fail(
          new Error(`No ratings found for ${media.type}: ${media.title}`),
          'mdblist',
          'not_found'
        )
      }

      // Map to domain entity
      const mediaRatings = MDBListMapper.toMediaRatings(mdblistRatings)

      this.logger.debug(`Retrieved MDBList ratings for ${media.type}: ${media.title}`, {
        imdbId,
        sources: mediaRatings.sources,
        average: mediaRatings.average,
      })

      return ok(mediaRatings, 'mdblist', { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get MDBList ratings for ${media.type}: ${media.title}`, err)
      return fail(err, 'mdblist', 'api_error')
    }
  }
}

/**
 * React Hook for fetching media ratings with TanStack Query caching
 *
 * @param media - The media to get ratings for
 * @param capability - The MDBList ratings capability instance
 * @returns TanStack Query result with cached ratings data
 *
 * @example
 * ```tsx
 * const { data: ratings, isLoading, error } = useMDBListRatings(media, capability)
 *
 * if (isLoading) return <LoadingSpinner />
 * if (error) return <ErrorMessage error={error} />
 * if (ratings?.success) {
 *   return <RatingsDisplay ratings={ratings.data} />
 * }
 * ```
 */
export function useMDBListRatings(
  media: Media,
  capability: MDBListMediaRatingsCapability
) {
  return useQuery({
    queryKey: ['mdblist', 'ratings', media.stableId, media.externalIds.imdb?.id],
    queryFn: () => capability.getRatings(media),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - ratings don't change frequently
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days - keep in cache for a week
    enabled: !!media.externalIds.imdb?.id, // Only fetch if IMDb ID is available
  })
}
