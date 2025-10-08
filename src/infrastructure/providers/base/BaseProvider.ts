import type { IProvider } from '../../../domain/providers/IProvider'
import type { ProviderMetadata, ProviderHealth } from '../../../domain/providers'
import { ProviderStatus } from '../../../domain/providers'
import { CapabilityType } from '../../../domain/capabilities/CapabilityType'
import type {
  IMediaCatalogCapability,
  IMediaMetadataCapability,
  IMediaRecommendationsCapability,
  IMediaPeopleCapability,
  IMediaStreamsCapability,
  IPeopleFilmographyCapability,
} from '../../../domain/capabilities'

/**
 * Base provider implementation with null capability fields
 * Providers extend this and set capability instances they support to non-null
 *
 * Key pattern:
 * - All capabilities start as null
 * - Provider sets capabilities they support in constructor
 * - getCapability() returns the instance or null (determines support)
 * - NO business logic - providers are pure data fetchers
 */
export abstract class BaseProvider implements IProvider {
  protected _metadata: ProviderMetadata
  protected _health: ProviderHealth

  // All capabilities initialized to null - providers set what they support
  protected mediaCatalogCapability: IMediaCatalogCapability | null = null
  protected mediaMetadataCapability: IMediaMetadataCapability | null = null
  protected mediaRecommendationsCapability: IMediaRecommendationsCapability | null = null
  protected mediaPeopleCapability: IMediaPeopleCapability | null = null
  protected mediaStreamsCapability: IMediaStreamsCapability | null = null

  // People capabilities
  protected peopleFilmographyCapability: IPeopleFilmographyCapability | null = null

  // TODO: Add remaining capability fields as interfaces are created:
  // protected mediaSearchCapability: IMediaSearchCapability | null = null
  // protected mediaVideosCapability: IMediaVideosCapability | null = null
  // protected mediaSeasonsCapability: IMediaSeasonsCapability | null = null
  // protected mediaExternalIdsCapability: IMediaExternalIdsCapability | null = null
  // protected mediaImagesCapability: IMediaImagesCapability | null = null
  // protected mediaRatingsCapability: IMediaRatingsCapability | null = null
  // protected mediaReviewsCapability: IMediaReviewsCapability | null = null
  // protected mediaListsCapability: IMediaListsCapability | null = null
  // protected mediaListsSearchCapability: IMediaListsSearchCapability | null = null
  // protected peopleMetadataCapability: IPeopleMetadataCapability | null = null
  // protected peopleSearchCapability: IPeopleSearchCapability | null = null
  // protected peopleExternalIdsCapability: IPeopleExternalIdsCapability | null = null
  // protected peopleImagesCapability: IPeopleImagesCapability | null = null
  // protected peopleCatalogsCapability: IPeopleCatalogsCapability | null = null

  constructor(metadata: ProviderMetadata) {
    this._metadata = { ...metadata }
    this._health = {
      status: ProviderStatus.INITIALIZING,
      lastChecked: new Date(),
      errorCount: 0,
    }
  }

  get metadata(): ProviderMetadata {
    return { ...this._metadata }
  }

  // Lifecycle methods (subclasses implement)
  abstract initialize(): Promise<void>
  abstract shutdown(): Promise<void>

  // Health checking
  async healthCheck(): Promise<boolean> {
    try {
      const startTime = Date.now()
      await this.performHealthCheck()
      const responseTime = Date.now() - startTime

      this._health = {
        status: ProviderStatus.READY,
        lastChecked: new Date(),
        errorCount: 0,
        responseTime,
      }
      return true
    } catch (error) {
      this._health = {
        status: ProviderStatus.ERROR,
        lastChecked: new Date(),
        errorCount: this._health.errorCount + 1,
        lastError: (error as Error).message,
      }
      return false
    }
  }

  protected abstract performHealthCheck(): Promise<void>

  /**
   * Core capability resolution method
   * Returns capability instance or null - this determines if provider supports the capability
   */
  getCapability<T>(capability: CapabilityType): T | null {
    switch (capability) {
      case CapabilityType.MEDIA_CATALOG:
        return this.mediaCatalogCapability as T
      case CapabilityType.MEDIA_METADATA:
        return this.mediaMetadataCapability as T
      case CapabilityType.MEDIA_RECOMMENDATIONS:
        return this.mediaRecommendationsCapability as T
      case CapabilityType.MEDIA_PEOPLE:
        return this.mediaPeopleCapability as T
      case CapabilityType.MEDIA_STREAMS:
        return this.mediaStreamsCapability as T
      case CapabilityType.PEOPLE_FILMOGRAPHY:
        return this.peopleFilmographyCapability as T

      // TODO: Add remaining cases as interfaces are created
      // case CapabilityType.MEDIA_SEARCH:
      //   return this.mediaSearchCapability as T
      // case CapabilityType.MEDIA_SUBTITLES:
      //   return this.mediaSubtitlesCapability as T
      // ... etc

      default:
        return null
    }
  }

  /**
   * Capability discovery - returns list of all capabilities this provider supports
   */
  getSupportedCapabilities(): CapabilityType[] {
    return Object.values(CapabilityType).filter(
      (capability) => this.getCapability(capability) !== null
    )
  }
}
