import type { Media } from '@/src/domain/entities/Media'
import type { ExternalIds } from '@/src/domain/entities/ExternalIds'
import type { EnrichedMedia } from '@/src/domain/entities/EnrichedMedia'
import type { WatchProgress } from '@/src/domain/capabilities/IMediaWatchProgressCapability'
import type { MediaVideo } from '@/src/domain/capabilities/IMediaVideosCapability'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { Season } from '@/src/domain/capabilities/IMediaSeasonsCapability'
import type { MediaRatings } from '@/src/domain/capabilities/IMediaRatingsCapability'
import type { Review } from '@/src/domain/capabilities/IMediaReviewsCapability'
import type { MediaImages } from '@/src/domain/capabilities/IMediaImagesCapability'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { ResolveExternalIdsUseCase } from './ResolveExternalIdsUseCase'
import type { EnrichMediaUseCase, EnrichedMediaData } from './EnrichMediaUseCase'
import type { GetWatchProgressUseCase } from './GetWatchProgressUseCase'

/**
 * Media enrichments data interface
 * Contains ONLY enrichment data fetched from external providers
 * Does NOT contain the Media entity itself (passed via router params)
 */
export interface MediaEnrichmentsData {
  // External IDs resolved
  externalIds: ExternalIds

  // Enriched data (from EnrichMediaUseCase)
  enrichedMedia?: EnrichedMedia
  videos?: MediaVideo[]
  peopleCatalogs?: Catalog[]
  seasons?: Season[]
  ratings?: MediaRatings
  reviews?: Review[]
  images?: MediaImages
  recommendationCatalogs?: Catalog[]

  // Watch progress
  watchProgress?: WatchProgress | null

  // Metadata
  providersUsed: Record<string, string[]>
  errors: Record<string, string>
}

/**
 * Use case for fetching media enrichments ONLY
 * Does NOT cache or return the Media entity itself
 * 
 * Pattern:
 * - Media entity passed via router params (navigation state)
 * - Enrichments cached via TanStack Query (server state)
 * - This use case fetches only server state
 * 
 * Execution pattern:
 * 1. Step 1: Resolve external IDs (blocking - needed for everything)
 * 2. Step 2: Parallel fetch enriched data + watch progress
 * 3. Return enrichments only (no Media entity)
 */
export class GetMediaEnrichmentsUseCase {
  constructor(
    private resolveExternalIdsUseCase: ResolveExternalIdsUseCase,
    private enrichMediaUseCase: EnrichMediaUseCase,
    private getWatchProgressUseCase: GetWatchProgressUseCase,
    private logger: ILoggingService
  ) {}

  /**
   * Execute the use case to fetch media enrichments
   * @param media - The media to fetch enrichments for (from router params)
   * @returns MediaEnrichmentsData with all fetched information
   */
  async execute(media: Media): Promise<MediaEnrichmentsData> {
    this.logger.info('Fetching media enrichments', {
      mediaId: media.stableId,
      title: media.title,
      type: media.type,
    })

    // Step 1: Resolve external IDs (blocking - needed for all enrichment)
    this.logger.info('Step 1: Resolving external IDs', {
      mediaId: media.stableId,
    })

    const externalIdsResult = await this.resolveExternalIdsUseCase.execute(media)

    if (!externalIdsResult.success) {
      this.logger.error('Failed to resolve external IDs', externalIdsResult.error as Error, {
        mediaId: media.stableId,
        reason: externalIdsResult.reason,
      })

      // Return minimal data structure on external IDs failure
      return {
        externalIds: media.externalIds,
        watchProgress: null,
        providersUsed: {},
        errors: {
          externalIds: externalIdsResult.error.message,
        },
      }
    }

    const externalIds = externalIdsResult.data

    this.logger.info('External IDs resolved', {
      mediaId: media.stableId,
      hasImdb: !!externalIds.imdb,
      hasTmdb: !!externalIds.tmdb,
      hasTrakt: !!externalIds.trakt,
    })

    // Step 2: Parallel fetch enriched data + watch progress
    this.logger.info('Step 2: Fetching enriched data and watch progress in parallel', {
      mediaId: media.stableId,
    })

    const [enrichedDataResult, watchProgressResult] = await Promise.all([
      this.enrichMediaUseCase.execute(media, externalIds),
      this.getWatchProgressUseCase.execute(media),
    ])

    // Handle enriched data result
    const enrichmentErrors: Record<string, string> = {}
    let enrichedData: EnrichedMediaData

    if (!enrichedDataResult.success) {
      this.logger.error('Failed to enrich media', enrichedDataResult.error as Error, {
        mediaId: media.stableId,
        reason: enrichedDataResult.reason,
      })
      enrichmentErrors.enrichment = enrichedDataResult.error.message
      enrichedData = {
        enrichedMedia: undefined,
        videos: undefined,
        peopleCatalogs: undefined,
        seasons: undefined,
        ratings: undefined,
        reviews: undefined,
        images: undefined,
        recommendationCatalogs: undefined,
        providersUsed: {},
        errors: enrichmentErrors,
      }
    } else {
      enrichedData = enrichedDataResult.data
    }

    // Handle watch progress result
    let watchProgress: WatchProgress | null = null
    if (!watchProgressResult.success) {
      this.logger.warn('Failed to get watch progress', {
        mediaId: media.stableId,
        reason: watchProgressResult.reason,
        error: watchProgressResult.error.message,
      })
      // Watch progress is optional, so we don't treat this as a fatal error
      watchProgress = null
    } else {
      watchProgress = watchProgressResult.data
    }

    this.logger.info('Media enrichments fetching completed', {
      mediaId: media.stableId,
      hasEnrichedMedia: !!enrichedData.enrichedMedia,
      hasVideos: !!enrichedData.videos && enrichedData.videos.length > 0,
      hasPeopleCatalogs: !!enrichedData.peopleCatalogs && enrichedData.peopleCatalogs.length > 0,
      hasSeasons: !!enrichedData.seasons && enrichedData.seasons.length > 0,
      hasRatings: !!enrichedData.ratings,
      hasReviews: !!enrichedData.reviews && enrichedData.reviews.length > 0,
      hasImages: !!enrichedData.images,
      hasRecommendations: !!enrichedData.recommendationCatalogs && enrichedData.recommendationCatalogs.length > 0,
      hasWatchProgress: !!watchProgress,
    })

    // Step 3: Return enrichments only (no Media entity)
    return {
      // External IDs
      externalIds,

      // Enriched data
      enrichedMedia: enrichedData.enrichedMedia,
      videos: enrichedData.videos,
      peopleCatalogs: enrichedData.peopleCatalogs,
      seasons: enrichedData.seasons,
      ratings: enrichedData.ratings,
      reviews: enrichedData.reviews,
      images: enrichedData.images,
      recommendationCatalogs: enrichedData.recommendationCatalogs,

      // Watch progress
      watchProgress,

      // Metadata
      providersUsed: enrichedData.providersUsed,
      errors: { ...enrichedData.errors, ...enrichmentErrors },
    }
  }
}
