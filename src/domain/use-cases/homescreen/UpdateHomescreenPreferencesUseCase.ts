import type { HomescreenPreferences, UserPreferences } from '@/src/domain/entities/UserPreferences'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { ICacheService } from '@/src/domain/services/ICacheService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { ValidationError } from '@/src/domain/errors/ValidationError'
import { DomainError } from '@/src/domain/errors/DomainError'

/**
 * Parameters for updating homescreen preferences
 */
export interface UpdateHomescreenPreferencesParams {
  /** Hero section configuration */
  readonly hero?: {
    readonly enabled?: boolean
    readonly style?: 'carousel' | 'featured' | 'stack'
    readonly autoRotate?: boolean
    readonly rotationInterval?: number
  }
  
  /** Catalog management settings */
  readonly catalogs?: {
    readonly selectedCatalogIds?: readonly string[]
    readonly catalogOrder?: readonly string[]
    readonly customNames?: Readonly<Record<string, string>>
    readonly displayStyles?: Readonly<Record<string, 'grid' | 'list' | 'carousel'>>
  }
  
  /** Layout preferences */
  readonly layout?: {
    readonly itemsPerRow?: number
    readonly showContinueWatching?: boolean
    readonly compactMode?: boolean
  }
}

/**
 * Result of the homescreen preferences update operation
 */
export interface UpdateHomescreenPreferencesResult {
  /** Updated preferences */
  readonly preferences: HomescreenPreferences
  /** Whether cache invalidation was triggered */
  readonly cacheInvalidated: boolean
  /** Validation warnings (non-blocking issues) */
  readonly warnings: readonly string[]
}

/**
 * Use case that handles updating user homescreen preferences with validation,
 * cache invalidation, and conflict resolution. Ensures preferences are valid
 * and consistent before applying updates.
 * 
 * This use case manages the complex logic around homescreen customization,
 * including catalog ordering, display styles, and feature toggles.
 */
export class UpdateHomescreenPreferencesUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly cacheService: ICacheService,
    private readonly loggingService: ILoggingService
  ) {}

  /**
   * Update homescreen preferences with validation and cache management
   * 
   * @param params - Partial preferences to update
   * @returns Result containing updated preferences and operation status
   * @throws ValidationError if preferences are invalid
   * @throws DomainError if update fails
   */
  async execute(
    params: UpdateHomescreenPreferencesParams
  ): Promise<UpdateHomescreenPreferencesResult> {
    const startTime = Date.now()
    const currentUser = this.userService.getCurrentUser()
    const currentPreferences = currentUser.preferences.homescreen
    
    try {
      this.loggingService.info('Updating homescreen preferences', {
        userId: currentUser.id,
        updates: params,
      })

      // Validate the updates
      const validationResult = this.validatePreferences(params, currentPreferences)
      if (validationResult.errors.length > 0) {
        throw new ValidationError(
          `Invalid homescreen preferences: ${validationResult.errors.join(', ')}`,
          'homescreen_preferences'
        )
      }

      // Build the updated preferences
      const updatedHomescreenPreferences = this.mergePreferences(currentPreferences, params)

      // Check if cache invalidation is needed
      const needsCacheInvalidation = this.shouldInvalidateCache(currentPreferences, params)

      // Update user preferences
      const updatedUserPreferences: Partial<UserPreferences> = {
        homescreen: updatedHomescreenPreferences,
      }

      await this.userService.updatePreferences(updatedUserPreferences)

      // Invalidate cache if needed
      if (needsCacheInvalidation) {
        await this.invalidateHomescreenCache(currentUser.id)
      }

      const executionTime = Date.now() - startTime
      this.loggingService.info('Successfully updated homescreen preferences', {
        userId: currentUser.id,
        executionTime,
        cacheInvalidated: needsCacheInvalidation,
        warningCount: validationResult.warnings.length,
      })

      return {
        preferences: updatedHomescreenPreferences,
        cacheInvalidated: needsCacheInvalidation,
        warnings: validationResult.warnings,
      }

    } catch (error) {
      this.loggingService.error('Failed to update homescreen preferences', error as Error, {
        userId: currentUser.id,
        params,
        executionTime: Date.now() - startTime,
      })

      if (error instanceof ValidationError) {
        throw error
      }

      throw new DomainError('Failed to update homescreen preferences')
    }
  }

  /**
   * Validate homescreen preference updates
   */
  private validatePreferences(
    params: UpdateHomescreenPreferencesParams,
    current: HomescreenPreferences
  ): { errors: string[]; warnings: string[] } {
    const errors: string[] = []
    const warnings: string[] = []

    // Validate hero section settings
    if (params.hero) {
      if (params.hero.style && !['carousel', 'featured', 'stack'].includes(params.hero.style)) {
        errors.push('Invalid hero style. Must be one of: carousel, featured, stack')
      }

      if (params.hero.rotationInterval !== undefined) {
        if (params.hero.rotationInterval < 1000 || params.hero.rotationInterval > 30000) {
          errors.push('Hero rotation interval must be between 1000ms and 30000ms')
        }
      }

      // Warning for rotation without auto-rotate
      if (params.hero.autoRotate === false && params.hero.rotationInterval !== undefined) {
        warnings.push('Hero rotation interval specified but auto-rotate is disabled')
      }
    }

    // Validate catalog settings
    if (params.catalogs) {
      // Validate catalog IDs format
      if (params.catalogs.selectedCatalogIds) {
        for (const catalogId of params.catalogs.selectedCatalogIds) {
          if (!catalogId || typeof catalogId !== 'string' || catalogId.trim() === '') {
            errors.push('All catalog IDs must be non-empty strings')
            break
          }
        }
      }

      // Validate catalog order consistency
      if (params.catalogs.catalogOrder && params.catalogs.selectedCatalogIds) {
        const selectedIds = new Set(params.catalogs.selectedCatalogIds)
        const orderedIds = new Set(params.catalogs.catalogOrder)
        
        // Check for IDs in order that aren't selected
        for (const orderId of params.catalogs.catalogOrder) {
          if (!selectedIds.has(orderId)) {
            warnings.push(`Catalog order contains unselected catalog: ${orderId}`)
          }
        }

        // Check for selected IDs not in order
        for (const selectedId of params.catalogs.selectedCatalogIds) {
          if (!orderedIds.has(selectedId)) {
            warnings.push(`Selected catalog not in order list: ${selectedId}`)
          }
        }
      }

      // Validate custom names
      if (params.catalogs.customNames) {
        for (const [catalogId, customName] of Object.entries(params.catalogs.customNames)) {
          if (!customName || customName.trim() === '') {
            errors.push(`Custom name for catalog ${catalogId} cannot be empty`)
          }
          if (customName.length > 100) {
            errors.push(`Custom name for catalog ${catalogId} is too long (max 100 characters)`)
          }
        }
      }

      // Validate display styles
      if (params.catalogs.displayStyles) {
        for (const [catalogId, style] of Object.entries(params.catalogs.displayStyles)) {
          if (!['grid', 'list', 'carousel'].includes(style)) {
            errors.push(`Invalid display style for catalog ${catalogId}: ${style}`)
          }
        }
      }
    }

    // Validate layout settings
    if (params.layout) {
      if (params.layout.itemsPerRow !== undefined) {
        if (params.layout.itemsPerRow < 1 || params.layout.itemsPerRow > 6) {
          errors.push('Items per row must be between 1 and 6')
        }
      }
    }

    return { errors, warnings }
  }

  /**
   * Merge current preferences with updates
   */
  private mergePreferences(
    current: HomescreenPreferences,
    params: UpdateHomescreenPreferencesParams
  ): HomescreenPreferences {
    const updated: HomescreenPreferences = { ...current }

    // Merge hero settings
    if (params.hero) {
      if (params.hero.enabled !== undefined) {
        updated.heroEnabled = params.hero.enabled
      }
      if (params.hero.style) {
        updated.heroStyle = params.hero.style
      }
      if (params.hero.autoRotate !== undefined) {
        updated.heroAutoRotate = params.hero.autoRotate
      }
      if (params.hero.rotationInterval !== undefined) {
        updated.heroRotationInterval = params.hero.rotationInterval
      }
    }

    // Merge catalog settings
    if (params.catalogs) {
      if (params.catalogs.selectedCatalogIds) {
        updated.selectedCatalogIds = params.catalogs.selectedCatalogIds
      }
      if (params.catalogs.catalogOrder) {
        updated.catalogOrder = params.catalogs.catalogOrder
      }
      if (params.catalogs.customNames) {
        updated.catalogCustomNames = {
          ...current.catalogCustomNames,
          ...params.catalogs.customNames,
        }
      }
      if (params.catalogs.displayStyles) {
        updated.catalogDisplayStyles = {
          ...current.catalogDisplayStyles,
          ...params.catalogs.displayStyles,
        }
      }
    }

    // Merge layout settings
    if (params.layout) {
      if (params.layout.itemsPerRow !== undefined) {
        updated.itemsPerRow = params.layout.itemsPerRow
      }
      if (params.layout.showContinueWatching !== undefined) {
        updated.showContinueWatching = params.layout.showContinueWatching
      }
      if (params.layout.compactMode !== undefined) {
        updated.compactMode = params.layout.compactMode
      }
    }

    return updated
  }

  /**
   * Determine if cache invalidation is needed based on changes
   */
  private shouldInvalidateCache(
    current: HomescreenPreferences,
    params: UpdateHomescreenPreferencesParams
  ): boolean {
    // Hero section changes that affect data
    if (params.hero?.enabled !== undefined && params.hero.enabled !== current.heroEnabled) {
      return true
    }

    // Catalog selection changes
    if (params.catalogs?.selectedCatalogIds) {
      const currentSelected = new Set(current.selectedCatalogIds)
      const newSelected = new Set(params.catalogs.selectedCatalogIds)
      
      if (currentSelected.size !== newSelected.size) {
        return true
      }
      
      for (const id of newSelected) {
        if (!currentSelected.has(id)) {
          return true
        }
      }
    }

    // Catalog order changes (affects display but not data fetch)
    if (params.catalogs?.catalogOrder) {
      return false // Order changes don't require cache invalidation
    }

    // Continue watching toggle
    if (params.layout?.showContinueWatching !== undefined &&
        params.layout.showContinueWatching !== current.showContinueWatching) {
      return true
    }

    // Layout changes don't require cache invalidation
    return false
  }

  /**
   * Invalidate homescreen cache after preference changes
   */
  private async invalidateHomescreenCache(userId: string): Promise<void> {
    try {
      const cacheKey = this.cacheService.keys.userPreferences(userId) + ':homescreen'
      await this.cacheService.delete(cacheKey)
      
      this.loggingService.info('Invalidated homescreen cache after preference update', {
        userId,
      })
    } catch (error) {
      this.loggingService.warn('Failed to invalidate homescreen cache', {
        userId,
        error: (error as Error).message,
      })
      // Don't throw - cache invalidation failure shouldn't break preference update
    }
  }
}