import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { IMediaRecommendationsCapability } from '@/src/domain/capabilities/IMediaRecommendationsCapability'
import type { Catalog } from '@/src/domain/entities/Catalog'
import { DomainError } from '@/src/domain/errors/DomainError'
import { NotFoundError } from '@/src/domain/errors/NotFoundError'
import { ValidationError } from '@/src/domain/errors/ValidationError'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'

export interface LoadMoreRecommendationsParams {
  readonly catalog: Catalog // Must have contextMedia
}

export interface LoadMoreRecommendationsResult {
  readonly updatedCatalog: Catalog
  readonly newItemsCount: number
  readonly hasMoreItems: boolean
}

/**
 * Dedicated use case for loading more recommendations.
 *
 * Requirements:
 * - Catalog must have contextMedia (the source media for recommendations)
 * - Uses MEDIA_RECOMMENDATIONS capability only
 * - Matches provider by catalog.providerId
 * - Each catalog is independent with its own pagination state
 */
export class LoadMoreRecommendationsUseCase {
  constructor(
    private readonly loggingService: ILoggingService,
    private readonly getEnabledProvidersUseCase: GetEnabledProvidersForCapabilityUseCase
  ) {}

  async execute(params: LoadMoreRecommendationsParams): Promise<LoadMoreRecommendationsResult> {
    const { catalog } = params

    try {
      // Validate catalog has contextMedia
      if (!catalog.contextMedia) {
        throw new ValidationError(
          'Recommendations catalog must have contextMedia',
          'contextMedia'
        )
      }

      // Validate catalog can load more items
      if (!catalog.canLoadMore()) {
        throw new ValidationError(
          'Catalog has no more items to load',
          'pagination'
        )
      }

      // Get providers with MEDIA_RECOMMENDATIONS capability
      const enabledProviders = this.getEnabledProvidersUseCase.execute(
        CapabilityType.MEDIA_RECOMMENDATIONS
      )

      // Match provider by catalog.providerId
      const matchedProvider = enabledProviders.find(
        (provider) => provider.metadata.id === catalog.providerId
      )

      if (!matchedProvider) {
        throw new NotFoundError(
          `Provider with id '${catalog.providerId}' not found or not enabled for MEDIA_RECOMMENDATIONS`
        )
      }

      // Get MEDIA_RECOMMENDATIONS capability from matched provider
      const capability = matchedProvider.getCapability<IMediaRecommendationsCapability>(
        CapabilityType.MEDIA_RECOMMENDATIONS
      )

      if (!capability) {
        throw new NotFoundError(
          `Provider '${catalog.providerId}' does not support MEDIA_RECOMMENDATIONS capability`
        )
      }

      this.loggingService.debug('Loading more recommendations', {
        catalogId: catalog.id,
        providerId: catalog.providerId,
        currentItemCount: catalog.getItemCount(),
      })

      // Call capability to load more items
      const result = await capability.loadMoreItems(catalog)

      if (!result.success) {
        this.loggingService.error('Failed to load more recommendations', result.error, {
          catalogId: catalog.id,
          providerId: result.providerId,
          reason: result.reason,
        })
        throw new DomainError('Unable to load more recommendations')
      }

      const updatedCatalog = result.data
      const newItemsCount = updatedCatalog.getItemCount() - catalog.getItemCount()

      this.loggingService.debug('Successfully loaded more recommendations', {
        catalogId: catalog.id,
        providerId: catalog.providerId,
        newItemsCount,
        totalItems: updatedCatalog.getItemCount(),
        hasMoreItems: updatedCatalog.canLoadMore(),
      })

      return {
        updatedCatalog,
        newItemsCount: Math.max(newItemsCount, 0),
        hasMoreItems: updatedCatalog.canLoadMore(),
      }
    } catch (error) {
      this.loggingService.error('Failed to load more recommendations', error as Error, {
        catalogId: catalog.id,
        providerId: catalog.providerId,
      })

      if (
        error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof DomainError
      ) {
        throw error
      }

      throw new DomainError('Unable to load more recommendations')
    }
  }
}
