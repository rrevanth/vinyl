import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import type { Catalog } from '@/src/domain/entities/Catalog'
import { DomainError } from '@/src/domain/errors/DomainError'
import { NotFoundError } from '@/src/domain/errors/NotFoundError'
import { ValidationError } from '@/src/domain/errors/ValidationError'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'

export interface LoadMoreCatalogItemsParams {
  readonly catalogStableId: string
  readonly currentCatalog?: Catalog
}

export interface LoadMoreCatalogItemsResult {
  readonly updatedCatalog: Catalog
  readonly newItemsCount: number
  readonly hasMoreItems: boolean
}

/**
 * Minimal pagination helper that delegates to the MEDIA_CATALOG capability.
 * For recommendations, use LoadMoreRecommendationsUseCase instead.
 */
export class LoadMoreCatalogItemsUseCase {
  constructor(
    private readonly providerRegistry: IProviderRegistry,
    private readonly userService: IUserService,
    private readonly loggingService: ILoggingService,
    private readonly getEnabledProvidersUseCase: GetEnabledProvidersForCapabilityUseCase
  ) {}

  async execute(params: LoadMoreCatalogItemsParams): Promise<LoadMoreCatalogItemsResult> {
    let currentCatalog: Catalog | undefined
    let matchedCapability: IMediaCatalogCapability | undefined

    try {
      // Use provided current catalog if available
      if (params.currentCatalog) {
        currentCatalog = params.currentCatalog
        matchedCapability = await this.findCatalogCapability(params.catalogStableId)
      } else {
        // Fallback to fetching from provider
        matchedCapability = await this.findCatalogCapability(params.catalogStableId)

        // If we found a capability, get the current catalog
        if (matchedCapability) {
          const catalogResult = await this.getCatalogFromCapability(
            matchedCapability,
            params.catalogStableId
          )
          if (catalogResult) {
            currentCatalog = catalogResult
          }
        }
      }

      if (!currentCatalog || !matchedCapability) {
        throw new NotFoundError(`Catalog ${params.catalogStableId} not found`)
      }

      if (!currentCatalog.canLoadMore()) {
        throw new ValidationError('Catalog has no more items to load', 'pagination')
      }

      const result = await matchedCapability.loadMoreItems(currentCatalog)

      if (!result.success) {
        this.loggingService.error('Failed to load more items', result.error, {
          catalogStableId: params.catalogStableId,
          providerId: result.providerId,
          reason: result.reason,
        })
        throw new DomainError('Unable to load more catalog items')
      }

      const updatedCatalog = result.data
      const newItemsCount = updatedCatalog.getItemCount() - currentCatalog.getItemCount()

      return {
        updatedCatalog,
        newItemsCount: Math.max(newItemsCount, 0),
        hasMoreItems: updatedCatalog.canLoadMore(),
      }
    } catch (error) {
      this.loggingService.error('Failed to load additional catalog items', error as Error, {
        catalogStableId: params.catalogStableId,
      })

      if (error instanceof NotFoundError || error instanceof ValidationError) {
        throw error
      }

      throw new DomainError('Unable to load more catalog items')
    }
  }

  /**
   * Find a MEDIA_CATALOG capability that provides the specified catalog
   */
  private async findCatalogCapability(
    catalogStableId: string
  ): Promise<IMediaCatalogCapability | undefined> {
    const readyProviders = this.getEnabledProvidersUseCase.execute(CapabilityType.MEDIA_CATALOG)
    const capabilities = readyProviders
      .map((p) => p.getCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG))
      .filter((c): c is IMediaCatalogCapability => c !== null)

    for (const capability of capabilities) {
      try {
        const result = await capability.getCatalogs()

        if (!result.success) {
          this.loggingService.warn('Failed to query provider catalogs during pagination', {
            providerId: result.providerId,
            reason: result.reason,
            error: result.error.message,
          })
          continue
        }

        const catalogs = result.data
        const catalog = catalogs.find((entry) => entry.stableId === catalogStableId)
        if (catalog) {
          return capability
        }
      } catch (error) {
        this.loggingService.warn('Failed to query provider catalogs during pagination', {
          error: (error as Error).message,
        })
      }
    }

    return undefined
  }

  /**
   * Get a catalog from a capability by its stable ID
   */
  private async getCatalogFromCapability(
    capability: IMediaCatalogCapability,
    catalogStableId: string
  ): Promise<Catalog | undefined> {
    try {
      const result = await capability.getCatalogs()

      if (!result.success) {
        return undefined
      }

      const catalogs = result.data
      return catalogs.find((entry) => entry.stableId === catalogStableId)
    } catch (error) {
      this.loggingService.warn('Failed to get catalog from capability', {
        error: (error as Error).message,
      })
      return undefined
    }
  }
}
