import type { Catalog } from '@/src/domain/entities/Catalog'
import type { HomescreenPreferences } from '@/src/domain/entities/UserPreferences'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import { ValidationError } from '@/src/domain/errors/ValidationError'
import { NotFoundError } from '@/src/domain/errors/NotFoundError'
import { DomainError } from '@/src/domain/errors/DomainError'

export type CatalogOperation = 'add' | 'remove' | 'reorder' | 'rename' | 'style' | 'toggle'

export interface ManageCatalogParams {
  readonly operation: CatalogOperation
  readonly catalogId?: string
  readonly newOrder?: readonly string[]
  readonly customName?: string
  readonly displayStyle?: 'grid' | 'list' | 'carousel'
  readonly position?: number
}

export interface ManageCatalogResult {
  readonly operation: CatalogOperation
  readonly preferences: HomescreenPreferences
  readonly affectedCatalog?: Catalog
  readonly cacheInvalidated: boolean
  readonly success: boolean
  readonly messages: readonly string[]
}

interface NormalizedParams {
  readonly operation: CatalogOperation
  readonly catalogId?: string
  readonly newOrder: readonly string[]
  readonly customName?: string
  readonly displayStyle?: 'grid' | 'list' | 'carousel'
  readonly position?: number
}

/**
 * Minimal catalog management use case that focuses on updating preferences.
 */
export class ManageCatalogUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly providerRegistry: IProviderRegistry,
    private readonly loggingService: ILoggingService
  ) {}

  async execute(params: ManageCatalogParams): Promise<ManageCatalogResult> {
    const preferences = this.userService.getCurrentUserPreferences()
    const homescreen = preferences.homescreen

    try {
      const normalizedParams = this.validate(params, homescreen)
      const availableCatalogs = await this.collectCatalogs()
      const affectedCatalog = normalizedParams.catalogId
        ? availableCatalogs.find((catalog) => catalog.stableId === normalizedParams.catalogId)
        : undefined

      if (normalizedParams.catalogId && !affectedCatalog) {
        throw new NotFoundError(`Catalog ${normalizedParams.catalogId} not found`)
      }

      const updatedPreferences = this.performOperation(homescreen, normalizedParams)

      await this.userService.updatePreferences({ homescreen: updatedPreferences })

      this.loggingService.info('Homescreen catalog preferences updated', {
        operation: params.operation,
        catalogId: normalizedParams.catalogId,
      })

      return {
        operation: params.operation,
        preferences: updatedPreferences,
        affectedCatalog,
        cacheInvalidated: false,
        success: true,
        messages: [],
      }
    } catch (error) {
      this.loggingService.error('Failed to manage homescreen catalogs', error as Error, {
        operation: params.operation,
        catalogId: params.catalogId,
      })

      if (error instanceof ValidationError || error instanceof NotFoundError) {
        throw error
      }

      throw new DomainError(`Failed to execute catalog operation: ${params.operation}`)
    }
  }

  private async collectCatalogs(): Promise<Catalog[]> {
    const providers = this.providerRegistry
      .getProvidersForCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG, true)

    const catalogs: Catalog[] = []

    for (const capability of providers) {
      try {
        const providerCatalogs = await capability.getCatalogs()
        catalogs.push(...providerCatalogs)
      } catch (error) {
        this.loggingService.warn('Failed to fetch catalog list during management operation', {
          error: (error as Error).message,
        })
      }
    }

    return catalogs
  }

  private validate(
    params: ManageCatalogParams,
    currentPreferences: HomescreenPreferences
  ): NormalizedParams {
    if (
      ['add', 'remove', 'rename', 'style', 'toggle'].includes(params.operation) &&
      (!params.catalogId || params.catalogId.trim() === '')
    ) {
      throw new ValidationError('Catalog ID is required for this operation', 'catalogId')
    }

    if (params.operation === 'reorder') {
      if (!params.newOrder || params.newOrder.length === 0) {
        throw new ValidationError('New order is required for reorder operation', 'newOrder')
      }

      const currentIds = new Set(currentPreferences.selectedCatalogIds)
      const newIds = new Set(params.newOrder)

      if (currentIds.size !== newIds.size || [...currentIds].some((id) => !newIds.has(id))) {
        throw new ValidationError('Reorder must include all selected catalogs', 'newOrder')
      }
    }

    if (params.operation === 'rename') {
      if (!params.customName || params.customName.trim() === '') {
        throw new ValidationError('Custom name cannot be empty', 'customName')
      }

      if (params.customName.length > 100) {
        throw new ValidationError('Custom name must be 100 characters or less', 'customName')
      }
    }

    if (params.operation === 'style') {
      if (!params.displayStyle) {
        throw new ValidationError('Display style is required for style operation', 'displayStyle')
      }
    }

    return {
      operation: params.operation,
      catalogId: params.catalogId,
      newOrder: params.newOrder ?? [],
      customName: params.customName?.trim(),
      displayStyle: params.displayStyle,
      position: params.position,
    }
  }

  private performOperation(
    current: HomescreenPreferences,
    params: NormalizedParams
  ): HomescreenPreferences {
    switch (params.operation) {
      case 'add':
        return this.addCatalog(current, params.catalogId!, params.position)
      case 'remove':
        return this.removeCatalog(current, params.catalogId!)
      case 'toggle':
        return this.toggleCatalog(current, params.catalogId!)
      case 'reorder':
        return {
          ...current,
          catalogOrder: [...params.newOrder],
        }
      case 'rename':
        return {
          ...current,
          catalogCustomNames: {
            ...current.catalogCustomNames,
            [params.catalogId!]: params.customName!,
          },
        }
      case 'style':
        return {
          ...current,
          catalogDisplayStyles: {
            ...current.catalogDisplayStyles,
            [params.catalogId!]: params.displayStyle!,
          },
        }
      default:
        return current
    }
  }

  private addCatalog(
    current: HomescreenPreferences,
    catalogId: string,
    position?: number
  ): HomescreenPreferences {
    if (current.selectedCatalogIds.includes(catalogId)) {
      return current
    }

    const nextSelected = [...current.selectedCatalogIds]
    const insertIndex = position !== undefined ? Math.max(0, position) : nextSelected.length
    nextSelected.splice(insertIndex, 0, catalogId)

    const nextOrder = current.catalogOrder.includes(catalogId)
      ? current.catalogOrder
      : [...current.catalogOrder, catalogId]

    return {
      ...current,
      selectedCatalogIds: nextSelected,
      catalogOrder: nextOrder,
    }
  }

  private removeCatalog(current: HomescreenPreferences, catalogId: string): HomescreenPreferences {
    const nextSelected = current.selectedCatalogIds.filter((id) => id !== catalogId)
    const { [catalogId]: _, ...restNames } = current.catalogCustomNames
    const { [catalogId]: __, ...restStyles } = current.catalogDisplayStyles

    return {
      ...current,
      selectedCatalogIds: nextSelected,
      catalogOrder: current.catalogOrder.filter((id) => id !== catalogId),
      catalogCustomNames: restNames,
      catalogDisplayStyles: restStyles,
    }
  }

  private toggleCatalog(current: HomescreenPreferences, catalogId: string): HomescreenPreferences {
    return current.selectedCatalogIds.includes(catalogId)
      ? this.removeCatalog(current, catalogId)
      : this.addCatalog(current, catalogId)
  }
}
