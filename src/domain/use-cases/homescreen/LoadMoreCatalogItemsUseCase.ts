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

      // Use provided current catalog if available, otherwise fetch from provider
      if (params.currentCatalog) {
        currentCatalog = params.currentCatalog
        // Find the matching provider for this catalog
        const capabilities = readyProviders
          .map(p => p.getCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG))
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
            const catalog = catalogs.find((entry) => entry.stableId === params.catalogStableId)
            if (catalog) {
              matchedProvider = capability
              break
            }
          } catch (error) {
            this.loggingService.warn('Failed to query provider catalogs during pagination', {
              error: (error as Error).message,
            })
          }
        }
      } else {
        // Fallback to fetching from provider (original behavior)
        const capabilities = readyProviders
          .map(p => p.getCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG))
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
      }

      if (!currentCatalog || !matchedProvider) {
        throw new NotFoundError(`Catalog ${params.catalogStableId} not found`)
      }

      if (!currentCatalog.canLoadMore()) {
        throw new ValidationError('Catalog has no more items to load', 'pagination')
      }

      const result = await matchedProvider.loadMoreItems(currentCatalog)

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
}
