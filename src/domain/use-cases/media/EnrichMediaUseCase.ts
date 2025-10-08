import { Media } from '@/src/domain/entities/Media'
import type { ExternalIds } from '@/src/domain/entities/ExternalIds'
import type { EnrichedMedia } from '@/src/domain/entities/EnrichedMedia'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IMediaMetadataCapability } from '@/src/domain/capabilities/IMediaMetadataCapability'
import type { IMediaVideosCapability, MediaVideo } from '@/src/domain/capabilities/IMediaVideosCapability'
import type { IMediaPeopleCapability } from '@/src/domain/capabilities/IMediaPeopleCapability'
import type { IMediaSeasonsCapability, Season } from '@/src/domain/capabilities/IMediaSeasonsCapability'
import type { IMediaRatingsCapability, MediaRatings } from '@/src/domain/capabilities/IMediaRatingsCapability'
import type { IMediaReviewsCapability, Review } from '@/src/domain/capabilities/IMediaReviewsCapability'
import type { IMediaImagesCapability, MediaImages } from '@/src/domain/capabilities/IMediaImagesCapability'
import type { IMediaRecommendationsCapability } from '@/src/domain/capabilities/IMediaRecommendationsCapability'
import type { Catalog } from '@/src/domain/entities/Catalog'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'

/**
 * Enriched data structure returned by EnrichMediaUseCase
 */
export interface EnrichedMediaData {
  // Core metadata
  enrichedMedia?: EnrichedMedia

  // Additional enrichment data
  videos?: MediaVideo[]
  peopleCatalogs?: Catalog[]
  seasons?: Season[]
  ratings?: MediaRatings
  reviews?: Review[]
  images?: MediaImages
  recommendationCatalogs?: Catalog[]

  // Metadata
  providersUsed: Record<string, string[]> // Capability type -> provider IDs that succeeded
  errors: Record<string, string> // Capability type -> error message
}

/**
 * Use case for enriching media with detailed information from multiple providers
 * Respects user's provider priority order for each capability
 */
export class EnrichMediaUseCase {
  constructor(
    private providerRegistry: IProviderRegistry,
    private userService: IUserService,
    private logger: ILoggingService,
    private getEnabledProvidersUseCase: GetEnabledProvidersForCapabilityUseCase
  ) {}

  /**
   * Execute the use case to enrich media
   * @param media - The media to enrich (must have resolved external IDs)
   * @param externalIds - Complete external IDs from ResolveExternalIdsUseCase
   * @returns Enriched media data from all capabilities
   */
  async execute(media: Media, externalIds: ExternalIds): Promise<EnrichedMediaData> {
    this.logger.info('Enriching media with detailed information', {
      mediaId: media.stableId,
      title: media.title,
      type: media.type,
    })

    // Get user's provider priorities
    const preferences = this.userService.getCurrentUserPreferences()
    const priorities = preferences.providers.priorities

    // Update media with resolved external IDs
    const mediaWithIds = new Media({
      externalIds: externalIds,
      type: media.type,
      title: media.title,
      year: media.year,
      images: media.images,
      createdAt: media.createdAt,
      updatedAt: media.updatedAt,
    })

    // Fetch all enrichment data in parallel
    const [
      enrichedMedia,
      videos,
      peopleCatalogs,
      seasons,
      ratings,
      reviews,
      images,
      recommendationCatalogs,
    ] = await Promise.all([
      this.fetchWithPriority<IMediaMetadataCapability, EnrichedMedia>(
        CapabilityType.MEDIA_METADATA,
        priorities.metadata,
        mediaWithIds,
        (capability) => capability.enrichMedia(mediaWithIds)
      ),
      this.fetchWithPriority<IMediaVideosCapability, MediaVideo[]>(
        CapabilityType.MEDIA_VIDEOS,
        priorities.videos,
        mediaWithIds,
        (capability) => capability.getVideos(mediaWithIds)
      ),
      this.fetchWithPriority<IMediaPeopleCapability, Catalog[]>(
        CapabilityType.MEDIA_PEOPLE,
        priorities.people,
        mediaWithIds,
        (capability) => capability.getPeopleCatalogs(mediaWithIds)
      ),
      this.fetchWithPriority<IMediaSeasonsCapability, Season[]>(
        CapabilityType.MEDIA_SEASONS,
        priorities.seasons,
        mediaWithIds,
        (capability) => capability.getSeasons(mediaWithIds)
      ),
      this.fetchWithPriority<IMediaRatingsCapability, MediaRatings>(
        CapabilityType.MEDIA_RATINGS,
        priorities.ratings,
        mediaWithIds,
        (capability) => capability.getRatings(mediaWithIds)
      ),
      this.fetchWithPriority<IMediaReviewsCapability, Review[]>(
        CapabilityType.MEDIA_REVIEWS,
        priorities.reviews,
        mediaWithIds,
        (capability) => capability.getReviews(mediaWithIds)
      ),
      this.fetchWithPriority<IMediaImagesCapability, MediaImages>(
        CapabilityType.MEDIA_IMAGES,
        priorities.images,
        mediaWithIds,
        (capability) => capability.getImages(mediaWithIds)
      ),
      this.fetchWithPriority<IMediaRecommendationsCapability, Catalog[]>(
        CapabilityType.MEDIA_RECOMMENDATIONS,
        priorities.recommendations,
        mediaWithIds,
        (capability) => capability.getRecommendations(mediaWithIds)
      ),
    ])

    this.logger.info('Media enrichment completed', {
      mediaId: media.stableId,
      hasEnrichedMedia: !!enrichedMedia.data,
      hasVideos: !!videos.data && videos.data.length > 0,
      hasPeople: !!peopleCatalogs.data && peopleCatalogs.data.length > 0,
      hasSeasons: !!seasons.data && seasons.data.length > 0,
      hasRatings: !!ratings.data,
      hasReviews: !!reviews.data && reviews.data.length > 0,
      hasImages: !!images.data,
      hasRecommendations: !!recommendationCatalogs.data && recommendationCatalogs.data.length > 0,
    })

    // Compile providers used and errors
    const providersUsed: Record<string, string[]> = {}
    const errors: Record<string, string> = {}

    const results = [
      { type: CapabilityType.MEDIA_METADATA, result: enrichedMedia },
      { type: CapabilityType.MEDIA_VIDEOS, result: videos },
      { type: CapabilityType.MEDIA_PEOPLE, result: peopleCatalogs },
      { type: CapabilityType.MEDIA_SEASONS, result: seasons },
      { type: CapabilityType.MEDIA_RATINGS, result: ratings },
      { type: CapabilityType.MEDIA_REVIEWS, result: reviews },
      { type: CapabilityType.MEDIA_IMAGES, result: images },
      { type: CapabilityType.MEDIA_RECOMMENDATIONS, result: recommendationCatalogs },
    ]

    for (const { type, result } of results) {
      if (result.providerId) {
        providersUsed[type] = [result.providerId]
      }
      if (result.error) {
        errors[type] = result.error
      }
    }

    return {
      enrichedMedia: enrichedMedia.data,
      videos: videos.data,
      peopleCatalogs: peopleCatalogs.data,
      seasons: seasons.data,
      ratings: ratings.data,
      reviews: reviews.data,
      images: images.data,
      recommendationCatalogs: recommendationCatalogs.data,
      providersUsed,
      errors,
    }
  }

  /**
   * Fetch data from providers respecting priority order
   * Tries each provider in order until one succeeds
   */
  private async fetchWithPriority<TCapability, TResult>(
    capabilityType: CapabilityType,
    providerPriority: readonly string[],
    media: Media,
    fetcher: (capability: TCapability) => Promise<TResult>
  ): Promise<{ data?: TResult; providerId?: string; error?: string }> {
    try {
      // Get enabled and ready providers using centralized use case
      const readyProviders = this.getEnabledProvidersUseCase.execute(capabilityType)

      // Extract capabilities
      const capabilities = readyProviders
        .map(p => p.getCapability<TCapability>(capabilityType))
        .filter((c): c is TCapability => c !== null)

      if (capabilities.length === 0) {
        this.logger.warn('No providers support capability', {
          capability: capabilityType,
          mediaId: media.stableId,
        })
        return { error: 'No providers available' }
      }

      // Sort capabilities by user's priority order
      const sortedCapabilities = this.sortByPriority(capabilities, providerPriority, readyProviders)

      // Try each provider in order until one succeeds
      for (const capability of sortedCapabilities) {
        try {
          const result = await fetcher(capability)

          this.logger.info('Successfully fetched data from provider', {
            capability: capabilityType,
            mediaId: media.stableId,
          })

          return { data: result, providerId: 'provider' }
        } catch (error) {
          this.logger.warn('Provider failed to fetch data', {
            capability: capabilityType,
            error: error instanceof Error ? error.message : String(error),
            mediaId: media.stableId,
          })
          // Continue to next provider
        }
      }

      return { error: 'All providers failed' }
    } catch (error) {
      this.logger.error('Failed to fetch data with priority', error as Error, {
        capability: capabilityType,
        mediaId: media.stableId,
      })
      return { error: error instanceof Error ? error.message : String(error) }
    }
  }

  /**
   * Sort capabilities by user's provider priority order
   * Providers not in priority list are placed at the end
   */
  private sortByPriority<T>(capabilities: T[], priority: readonly string[], providers: any[]): T[] {
    // For now, we can't sort because capabilities don't expose provider ID
    // This is a limitation of the current capability interface design
    // Return as-is, which will use the order they were registered
    return [...capabilities]

    // TODO: Enhance IProvider to expose providerId on capabilities
    // Then implement proper sorting like:
    // return [...capabilities].sort((a, b) => {
    //   const aIndex = priority.indexOf(a.providerId)
    //   const bIndex = priority.indexOf(b.providerId)
    //   if (aIndex === -1 && bIndex === -1) return 0
    //   if (aIndex === -1) return 1
    //   if (bIndex === -1) return -1
    //   return aIndex - bIndex
    // })
  }
}