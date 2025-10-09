import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { CatalogPreferences, UserPreferences } from '@/src/domain/entities/UserPreferences'
import { DomainError } from '@/src/domain/errors/DomainError'
import { NotFoundError } from '@/src/domain/errors/NotFoundError'
import { ValidationError } from '@/src/domain/errors/ValidationError'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'

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
  readonly preferences: UserPreferences
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
    private readonly loggingService: ILoggingService,
    private readonly getEnabledProvidersUseCase: GetEnabledProvidersForCapabilityUseCase
  ) {}

  async execute(params: ManageCatalogParams): Promise<ManageCatalogResult> {
    const preferences = this.userService.getCurrentUserPreferences()
    const catalogPreferences = preferences.catalogPreferences

    try {
      const normalizedParams = this.validate(params, catalogPreferences)
      const availableCatalogs = await this.collectCatalogs()
      const affectedCatalog = normalizedParams.catalogId
        ? availableCatalogs.find((catalog) => catalog.stableId === normalizedParams.catalogId)
        : undefined

      if (normalizedParams.catalogId && !affectedCatalog) {
        throw new NotFoundError(`Catalog ${normalizedParams.catalogId} not found`)
      }

      const updatedPreferences = this.performOperation(preferences, normalizedParams)

      await this.userService.updatePreferences({ catalogPreferences: updatedPreferences.catalogPreferences })

      this.loggingService.info('Catalog preferences updated', {
        operation: params.operation,
        catalogId: normalizedParams.catalogId,
      })

      return {
        operation: params.operation,
        preferences: updatedPreferences,
        affectedCatalog,
        cacheInvalidated: true,
        success: true,
        messages: [],
      }
    } catch (error) {
      this.loggingService.error('Failed to manage catalog preferences', error as Error, {
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
    // Get enabled and ready providers for MEDIA_CATALOG capability
    const readyProviders = this.getEnabledProvidersUseCase.execute(CapabilityType.MEDIA_CATALOG)

    // Extract capabilities
    const capabilities = readyProviders
      .map(p => p.getCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG))
      .filter((c): c is IMediaCatalogCapability => c !== null)

    const catalogs: Catalog[] = []

    for (const capability of capabilities) {
      // Use page 0 for metadata only (fast, no items needed for validation)
      // Use Result pattern - check result.success
      const result = await capability.getCatalogs({ page: 0 })

      if (!result.success) {
        this.loggingService.warn('Failed to fetch catalog list during management operation', {
          providerId: result.providerId,
          reason: result.reason,
          error: result.error.message,
        })
        continue
      }

      catalogs.push(...result.data)
    }

    return catalogs
  }

  private validate(
    params: ManageCatalogParams,
    currentPreferences: Readonly<Record<string, CatalogPreferences>>
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
    current: UserPreferences,
    params: NormalizedParams
  ): UserPreferences {
    switch (params.operation) {
      case 'add':
        return this.addCatalog(current, params.catalogId!, params.position)
      case 'remove':
        return this.removeCatalog(current, params.catalogId!)
      case 'toggle':
        return this.toggleCatalog(current, params.catalogId!)
      case 'reorder':
        return this.reorderCatalogs(current, params.newOrder)
      case 'rename':
        return this.renameCatalog(current, params.catalogId!, params.customName!)
      case 'style':
        return this.setCatalogStyle(current, params.catalogId!, params.displayStyle!)
      default:
        return current
    }
  }

  private addCatalog(
    current: UserPreferences,
    catalogId: string,
    position?: number
  ): UserPreferences {
    const currentPreferences = current.catalogPreferences
    const maxOrder = Math.max(0, ...Object.values(currentPreferences).map(p => p.order))
    const newOrder = position !== undefined ? position + 1 : maxOrder + 1

    return {
      ...current,
      catalogPreferences: {
        ...currentPreferences,
        [catalogId]: {
          order: newOrder,
          customName: currentPreferences[catalogId]?.customName,
        },
      },
    }
  }

  private removeCatalog(current: UserPreferences, catalogId: string): UserPreferences {
    const { [catalogId]: _, ...restPreferences } = current.catalogPreferences

    return {
      ...current,
      catalogPreferences: restPreferences,
    }
  }

  private toggleCatalog(current: UserPreferences, catalogId: string): UserPreferences {
    const currentPreferences = current.catalogPreferences
    const isSelected = catalogId in currentPreferences

    return isSelected
      ? this.removeCatalog(current, catalogId)
      : this.addCatalog(current, catalogId)
  }

  private reorderCatalogs(current: UserPreferences, newOrder: readonly string[]): UserPreferences {
    const updatedPreferences: Record<string, CatalogPreferences> = {}

    newOrder.forEach((catalogId, index) => {
      const existing = current.catalogPreferences[catalogId]
      updatedPreferences[catalogId] = {
        order: index + 1,
        customName: existing?.customName,
      }
    })

    return {
      ...current,
      catalogPreferences: updatedPreferences,
    }
  }

  private renameCatalog(current: UserPreferences, catalogId: string, customName: string): UserPreferences {
    const currentPreferences = current.catalogPreferences
    const existing = currentPreferences[catalogId]

    if (!existing) {
      throw new NotFoundError(`Catalog ${catalogId} not found`)
    }

    return {
      ...current,
      catalogPreferences: {
        ...currentPreferences,
        [catalogId]: {
          ...existing,
          customName,
        },
      },
    }
  }

  private setCatalogStyle(current: UserPreferences, catalogId: string, displayStyle: string): UserPreferences {
    // Note: Display style is not part of CatalogPreferences in the current design
    // This method is kept for compatibility but doesn't modify catalogPreferences
    // If display styles are needed, they should be added to CatalogPreferences interface
    return current
  }
}
