import type { Catalog } from '@/src/domain/entities/Catalog'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import { NotFoundError } from '@/src/domain/errors/NotFoundError'
import { ValidationError } from '@/src/domain/errors/ValidationError'
import { DomainError } from '@/src/domain/errors/DomainError'

export interface LoadMoreCatalogItemsParams {
  readonly catalogStableId: string
}

export interface LoadMoreCatalogItemsResult {
  readonly updatedCatalog: Catalog
  readonly newItemsCount: number
  readonly hasMoreItems: boolean
}

/**
 * Minimal pagination helper that delegates to the provider capability.
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
    let matchedProvider: IMediaCatalogCapability | undefined

    try {
      // Get enabled and ready providers for MEDIA_CATALOG capability
      const readyProviders = this.getEnabledProvidersUseCase.execute(CapabilityType.MEDIA_CATALOG)

      // Extract capabilities
      const capabilities = readyProviders
        .map(p => p.getCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG))
        .filter((c): c is IMediaCatalogCapability => c !== null)

      for (const capability of capabilities) {
        try {
          const catalogs = await capability.getCatalogs()
          const catalog = catalogs.find((entry) => entry.stableId === params.catalogStableId)
          if (catalog) {
            currentCatalog = catalog
            matchedProvider = capability
            break
          }
        } catch (error) {
          this.loggingService.warn('Failed to query provider catalogs during pagination', {
            error: (error as Error).message,
          })
        }
      }

      if (!currentCatalog || !matchedProvider) {
        throw new NotFoundError(`Catalog ${params.catalogStableId} not found`)
      }

      if (!currentCatalog.canLoadMore()) {
        throw new ValidationError('Catalog has no more items to load', 'pagination')
      }

      const updatedCatalog = await matchedProvider.loadMoreItems(currentCatalog)
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
}
