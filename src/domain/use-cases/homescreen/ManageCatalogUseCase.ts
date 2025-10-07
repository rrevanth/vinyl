import type { Catalog } from '@/src/domain/entities/Catalog'
import type { HomescreenPreferences, UserPreferences } from '@/src/domain/entities/UserPreferences'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { ICacheService } from '@/src/domain/services/ICacheService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import { ValidationError } from '@/src/domain/errors/ValidationError'
import { NotFoundError } from '@/src/domain/errors/NotFoundError'
import { DomainError } from '@/src/domain/errors/DomainError'

/**
 * Operations supported for catalog management
 */
export type CatalogOperation = 
  | 'add'      // Add catalog to homescreen
  | 'remove'   // Remove catalog from homescreen
  | 'reorder'  // Change catalog order
  | 'rename'   // Set custom name for catalog
  | 'style'    // Change display style for catalog
  | 'toggle'   // Toggle catalog visibility

/**
 * Parameters for catalog management operations
 */
export interface ManageCatalogParams {
  /** The operation to perform */
  readonly operation: CatalogOperation
  
  /** Target catalog stable ID (required for all operations except reorder) */
  readonly catalogId?: string
  
  /** New catalog order (for reorder operation) */
  readonly newOrder?: readonly string[]
  
  /** Custom name for catalog (for rename operation) */
  readonly customName?: string
  
  /** Display style for catalog (for style operation) */
  readonly displayStyle?: 'grid' | 'list' | 'carousel'
  
  /** Position for insertion (for add operation) */
  readonly position?: number
}

/**
 * Result of catalog management operation
 */
export interface ManageCatalogResult {
  /** The operation that was performed */
  readonly operation: CatalogOperation
  
  /** Updated homescreen preferences */
  readonly preferences: HomescreenPreferences
  
  /** The affected catalog (if applicable) */
  readonly affectedCatalog?: Catalog
  
  /** Whether cache was invalidated */
  readonly cacheInvalidated: boolean
  
  /** Operation success status */
  readonly success: boolean
  
  /** Any warnings or notes about the operation */
  readonly messages: readonly string[]
}

/**
 * Use case that handles catalog management operations for the homescreen
 * including adding/removing catalogs, reordering, renaming, and changing
 * display styles. Manages preference updates and cache invalidation.
 * 
 * This use case provides a centralized interface for all catalog management
 * operations while ensuring data consistency and proper cache management.
 */
export class ManageCatalogUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly providerRegistry: IProviderRegistry,
    private readonly cacheService: ICacheService,
    private readonly loggingService: ILoggingService
  ) {}

  /**
   * Execute a catalog management operation
   * 
   * @param params - Parameters defining the operation to perform
   * @returns Result of the operation including updated preferences
   * @throws ValidationError if operation parameters are invalid
   * @throws NotFoundError if catalog not found
   * @throws DomainError if operation fails
   */
  async execute(params: ManageCatalogParams): Promise<ManageCatalogResult> {
    const startTime = Date.now()
    const currentUser = this.userService.getCurrentUser()
    const currentPreferences = currentUser.preferences.homescreen
    
    try {
      this.loggingService.info('Executing catalog management operation', {
        userId: currentUser.id,
        operation: params.operation,
        catalogId: params.catalogId,
      })

      // Validate operation parameters
      this.validateOperation(params, currentPreferences)

      // Get available catalogs if needed
      const availableCatalogs = await this.getAvailableCatalogs()

      // Execute the specific operation
      const result = await this.executeOperation(
        params,
        currentPreferences,
        availableCatalogs
      )

      // Update user preferences
      const updatedUserPreferences: Partial<UserPreferences> = {
        homescreen: result.preferences,
      }

      await this.userService.updatePreferences(updatedUserPreferences)

      // Invalidate cache if needed
      if (result.cacheInvalidated) {
        await this.invalidateHomescreenCache(currentUser.id)
      }

      const executionTime = Date.now() - startTime
      this.loggingService.info('Successfully executed catalog management operation', {
        userId: currentUser.id,
        operation: params.operation,
        executionTime,
        cacheInvalidated: result.cacheInvalidated,
      })

      return result

    } catch (error) {
      this.loggingService.error('Failed to execute catalog management operation', error as Error, {
        userId: currentUser.id,
        operation: params.operation,
        catalogId: params.catalogId,
        executionTime: Date.now() - startTime,
      })

      if (error instanceof ValidationError || error instanceof NotFoundError) {
        throw error
      }

      throw new DomainError(`Failed to execute catalog operation: ${params.operation}`)
    }
  }

  /**
   * Validate operation parameters
   */
  private validateOperation(
    params: ManageCatalogParams,
    currentPreferences: HomescreenPreferences
  ): void {
    // Validate catalog ID for operations that require it
    if (['add', 'remove', 'rename', 'style', 'toggle'].includes(params.operation)) {
      if (!params.catalogId || params.catalogId.trim() === '') {
        throw new ValidationError(
          `Catalog ID is required for ${params.operation} operation`,
          'catalogId'
        )
      }
    }

    // Validate specific operation parameters
    switch (params.operation) {
      case 'reorder':
        if (!params.newOrder || params.newOrder.length === 0) {
          throw new ValidationError('New order is required for reorder operation', 'newOrder')
        }
        // Check that all current catalogs are included in new order
        const currentIds = new Set(currentPreferences.selectedCatalogIds)
        const newIds = new Set(params.newOrder)
        if (currentIds.size !== newIds.size || 
            [...currentIds].some(id => !newIds.has(id))) {
          throw new ValidationError(
            'New order must include all currently selected catalogs',
            'newOrder'
          )
        }
        break

      case 'rename':
        if (!params.customName || params.customName.trim() === '') {
          throw new ValidationError('Custom name is required for rename operation', 'customName')
        }
        if (params.customName.length > 100) {
          throw new ValidationError(
            'Custom name must be 100 characters or less',
            'customName'
          )
        }
        break

      case 'style':
        if (!params.displayStyle || !['grid', 'list', 'carousel'].includes(params.displayStyle)) {
          throw new ValidationError(
            'Valid display style (grid, list, carousel) is required for style operation',
            'displayStyle'
          )
        }
        break

      case 'add':
        if (params.position !== undefined && 
            (params.position < 0 || params.position > currentPreferences.selectedCatalogIds.length)) {
          throw new ValidationError(
            `Position must be between 0 and ${currentPreferences.selectedCatalogIds.length}`,
            'position'
          )
        }
        break
    }
  }

  /**
   * Execute the specific catalog operation
   */
  private async executeOperation(
    params: ManageCatalogParams,
    currentPreferences: HomescreenPreferences,
    availableCatalogs: Catalog[]
  ): Promise<ManageCatalogResult> {
    let affectedCatalog: Catalog | undefined
    let cacheInvalidated = false
    const messages: string[] = []

    // Find the target catalog if needed
    if (params.catalogId) {
      affectedCatalog = availableCatalogs.find(cat => cat.stableId === params.catalogId)
      if (!affectedCatalog && ['add', 'rename', 'style', 'toggle'].includes(params.operation)) {
        throw new NotFoundError(`Catalog not found: ${params.catalogId}`)
      }
    }

    // Execute the operation
    let updatedPreferences: HomescreenPreferences

    switch (params.operation) {
      case 'add':
        updatedPreferences = this.addCatalog(currentPreferences, params, affectedCatalog!)
        cacheInvalidated = true
        messages.push(`Added catalog: ${affectedCatalog!.name}`)
        break

      case 'remove':
        updatedPreferences = this.removeCatalog(currentPreferences, params.catalogId!)
        cacheInvalidated = true
        messages.push(`Removed catalog: ${params.catalogId}`)
        break

      case 'reorder':
        updatedPreferences = this.reorderCatalogs(currentPreferences, params.newOrder!)
        // Reordering doesn't require cache invalidation (same data, different order)
        messages.push('Reordered catalogs')
        break

      case 'rename':
        updatedPreferences = this.renameCatalog(currentPreferences, params.catalogId!, params.customName!)
        messages.push(`Renamed catalog: ${affectedCatalog!.name} -> ${params.customName}`)
        break

      case 'style':
        updatedPreferences = this.changeCatalogStyle(currentPreferences, params.catalogId!, params.displayStyle!)
        messages.push(`Changed style for catalog: ${affectedCatalog!.name} -> ${params.displayStyle}`)
        break

      case 'toggle':
        const isCurrentlySelected = currentPreferences.selectedCatalogIds.includes(params.catalogId!)
        if (isCurrentlySelected) {
          updatedPreferences = this.removeCatalog(currentPreferences, params.catalogId!)
          messages.push(`Hidden catalog: ${affectedCatalog!.name}`)
        } else {
          updatedPreferences = this.addCatalog(currentPreferences, params, affectedCatalog!)
          messages.push(`Shown catalog: ${affectedCatalog!.name}`)
        }
        cacheInvalidated = true
        break

      default:
        throw new ValidationError(`Unknown operation: ${params.operation}`, 'operation')
    }

    return {
      operation: params.operation,
      preferences: updatedPreferences,
      affectedCatalog,
      cacheInvalidated,
      success: true,
      messages,
    }
  }

  /**
   * Add a catalog to the homescreen
   */
  private addCatalog(
    current: HomescreenPreferences,
    params: ManageCatalogParams,
    catalog: Catalog
  ): HomescreenPreferences {
    const catalogId = catalog.stableId

    // Check if already added
    if (current.selectedCatalogIds.includes(catalogId)) {
      throw new ValidationError(`Catalog already added: ${catalogId}`, 'catalogId')
    }

    // Determine insertion position
    const position = params.position ?? current.selectedCatalogIds.length

    // Add to selected catalogs
    const newSelectedIds = [...current.selectedCatalogIds]
    newSelectedIds.splice(position, 0, catalogId)

    // Add to order
    const newOrder = [...current.catalogOrder]
    if (!newOrder.includes(catalogId)) {
      newOrder.splice(position, 0, catalogId)
    }

    return {
      ...current,
      selectedCatalogIds: newSelectedIds,
      catalogOrder: newOrder,
    }
  }

  /**
   * Remove a catalog from the homescreen
   */
  private removeCatalog(
    current: HomescreenPreferences,
    catalogId: string
  ): HomescreenPreferences {
    // Check if currently selected
    if (!current.selectedCatalogIds.includes(catalogId)) {
      throw new ValidationError(`Catalog not currently selected: ${catalogId}`, 'catalogId')
    }

    return {
      ...current,
      selectedCatalogIds: current.selectedCatalogIds.filter(id => id !== catalogId),
      catalogOrder: current.catalogOrder.filter(id => id !== catalogId),
      // Keep custom names and display styles (user might re-add later)
    }
  }

  /**
   * Reorder catalogs
   */
  private reorderCatalogs(
    current: HomescreenPreferences,
    newOrder: readonly string[]
  ): HomescreenPreferences {
    return {
      ...current,
      catalogOrder: [...newOrder],
    }
  }

  /**
   * Rename a catalog with a custom name
   */
  private renameCatalog(
    current: HomescreenPreferences,
    catalogId: string,
    customName: string
  ): HomescreenPreferences {
    return {
      ...current,
      catalogCustomNames: {
        ...current.catalogCustomNames,
        [catalogId]: customName,
      },
    }
  }

  /**
   * Change the display style for a catalog
   */
  private changeCatalogStyle(
    current: HomescreenPreferences,
    catalogId: string,
    displayStyle: 'grid' | 'list' | 'carousel'
  ): HomescreenPreferences {
    return {
      ...current,
      catalogDisplayStyles: {
        ...current.catalogDisplayStyles,
        [catalogId]: displayStyle,
      },
    }
  }

  /**
   * Get all available catalogs from providers
   */
  private async getAvailableCatalogs(): Promise<Catalog[]> {
    try {
      const catalogProviders = this.providerRegistry
        .getProvidersForCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG, true)

      if (catalogProviders.length === 0) {
        return []
      }

      const catalogPromises = catalogProviders.map(async (provider) => {
        try {
          return await provider.getCatalogs()
        } catch (error) {
          this.loggingService.warn('Failed to fetch catalogs from provider', {
            providerId: provider.metadata?.id,
            error: (error as Error).message,
          })
          return []
        }
      })

      const catalogResults = await Promise.allSettled(catalogPromises)
      return catalogResults
        .filter((result): result is PromiseFulfilledResult<Catalog[]> => result.status === 'fulfilled')
        .flatMap(result => result.value)

    } catch (error) {
      this.loggingService.error('Failed to get available catalogs', error as Error)
      return []
    }
  }

  /**
   * Invalidate homescreen cache
   */
  private async invalidateHomescreenCache(userId: string): Promise<void> {
    try {
      const cacheKey = this.cacheService.keys.userPreferences(userId) + ':homescreen'
      await this.cacheService.delete(cacheKey)
      
      this.loggingService.info('Invalidated homescreen cache after catalog management', {
        userId,
      })
    } catch (error) {
      this.loggingService.warn('Failed to invalidate homescreen cache', {
        userId,
        error: (error as Error).message,
      })
      // Don't throw - cache invalidation failure shouldn't break the operation
    }
  }
}