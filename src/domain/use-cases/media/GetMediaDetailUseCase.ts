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
import type { EnrichMediaUseCase } from './EnrichMediaUseCase'
import type { GetWatchProgressUseCase } from './GetWatchProgressUseCase'

/**
 * Complete media detail data interface
 * Combines data from all enrichment use cases
 */
export interface MediaDetailData {
  // Core data
  media: Media
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
 * Centralized use case for fetching all media detail data
 * Orchestrates three existing use cases following CLEAN architecture
 *
 * Execution pattern:
 * 1. Step 1: Resolve external IDs (blocking - needed for everything)
 * 2. Step 2: Parallel fetch enriched data + watch progress
 * 3. Return combined MediaDetailData
 */
export class GetMediaDetailUseCase {
  constructor(
    private resolveExternalIdsUseCase: ResolveExternalIdsUseCase,
    private enrichMediaUseCase: EnrichMediaUseCase,
    private getWatchProgressUseCase: GetWatchProgressUseCase,
    private logger: ILoggingService
  ) {}

  /**
   * Execute the use case to fetch all media detail data
   * @param media - The media to fetch details for
   * @returns Complete MediaDetailData with all fetched information
   */
  async execute(media: Media): Promise<MediaDetailData> {
    this.logger.info('Fetching complete media detail data', {
      mediaId: media.stableId,
      title: media.title,
      type: media.type,
    })

    try {
      // Step 1: Resolve external IDs (blocking - needed for all enrichment)
      this.logger.info('Step 1: Resolving external IDs', {
        mediaId: media.stableId,
      })

      const externalIds = await this.resolveExternalIdsUseCase.execute(media)

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

      const [enrichedData, watchProgress] = await Promise.all([
        this.enrichMediaUseCase.execute(media, externalIds).catch((error) => {
          this.logger.error('Failed to enrich media', error as Error, {
            mediaId: media.stableId,
          })
          // Return empty enriched data on failure with all optional fields undefined
          return {
            enrichedMedia: undefined,
            videos: undefined,
            peopleCatalogs: undefined,
            seasons: undefined,
            ratings: undefined,
            reviews: undefined,
            images: undefined,
            recommendationCatalogs: undefined,
            providersUsed: {},
            errors: { enrichment: error instanceof Error ? error.message : String(error) },
          }
        }),
        this.getWatchProgressUseCase.execute(media).catch((error) => {
          this.logger.error('Failed to get watch progress', error as Error, {
            mediaId: media.stableId,
          })
          // Return null on failure (watch progress is optional)
          return null
        }),
      ])

      this.logger.info('Media detail data fetching completed', {
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

      // Step 3: Return combined MediaDetailData
      return {
        // Core data
        media,
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
        errors: enrichedData.errors,
      }
    } catch (error) {
      this.logger.error('Failed to fetch media detail data', error as Error, {
        mediaId: media.stableId,
        title: media.title,
      })

      // Return minimal data structure on catastrophic failure
      return {
        media,
        externalIds: media.externalIds,
        watchProgress: null,
        providersUsed: {},
        errors: {
          fatal: error instanceof Error ? error.message : String(error),
        },
      }
    }
  }
}
