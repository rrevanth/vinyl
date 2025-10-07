import type { HomescreenPreferences } from '@/src/domain/entities/UserPreferences'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { ValidationError } from '@/src/domain/errors/ValidationError'
import { DomainError } from '@/src/domain/errors/DomainError'

export interface UpdateHomescreenPreferencesParams {
  readonly hero?: {
    readonly enabled?: boolean
    readonly style?: 'carousel' | 'featured' | 'stack'
    readonly autoRotate?: boolean
    readonly rotationInterval?: number
  }
  readonly catalogs?: {
    readonly selectedCatalogIds?: readonly string[]
    readonly catalogOrder?: readonly string[]
    readonly customNames?: Readonly<Record<string, string>>
    readonly displayStyles?: Readonly<Record<string, 'grid' | 'list' | 'carousel'>>
  }
  readonly layout?: {
    readonly itemsPerRow?: number
    readonly showContinueWatching?: boolean
    readonly compactMode?: boolean
  }
}

export interface UpdateHomescreenPreferencesResult {
  readonly preferences: HomescreenPreferences
  readonly cacheInvalidated: boolean
  readonly warnings: readonly string[]
}

/**
 * Lightweight preference mutation use case. Validates input and persists to
 * the dedicated preferences store without applying advanced cache orchestration.
 */
export class UpdateHomescreenPreferencesUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly loggingService: ILoggingService
  ) {}

  async execute(params: UpdateHomescreenPreferencesParams): Promise<UpdateHomescreenPreferencesResult> {
    const start = Date.now()
    const warnings: string[] = []

    try {
      const userPreferences = this.userService.getCurrentUserPreferences()
      const currentHomescreen = userPreferences.homescreen

      const validation = this.validate(params, currentHomescreen)
      if (validation.errors.length > 0) {
        throw new ValidationError(validation.errors.join(', '), 'homescreen_preferences')
      }

      warnings.push(...validation.warnings)
      const updatedHomescreen = this.mergePreferences(currentHomescreen, params)

      await this.userService.updatePreferences({ homescreen: updatedHomescreen })

      this.loggingService.info('Homescreen preferences updated', {
        durationMs: Date.now() - start,
        warningCount: warnings.length,
      })

      return {
        preferences: updatedHomescreen,
        cacheInvalidated: false,
        warnings,
      }
    } catch (error) {
      this.loggingService.error('Failed to update homescreen preferences', error as Error)

      if (error instanceof ValidationError) {
        throw error
      }

      throw new DomainError('Failed to update homescreen preferences')
    }
  }

  private validate(
    params: UpdateHomescreenPreferencesParams,
    current: HomescreenPreferences
  ): { errors: string[]; warnings: string[] } {
    const errors: string[] = []
    const warnings: string[] = []

    if (params.hero?.style && !['carousel', 'featured', 'stack'].includes(params.hero.style)) {
      errors.push('Invalid hero style')
    }

    if (params.hero?.rotationInterval !== undefined) {
      const interval = params.hero.rotationInterval
      if (interval < 1000 || interval > 30000) {
        errors.push('Hero rotation interval must be between 1000ms and 30000ms')
      }

      if (params.hero.autoRotate === false) {
        warnings.push('Rotation interval provided while auto rotate disabled')
      }
    }

    if (params.catalogs?.selectedCatalogIds) {
      for (const id of params.catalogs.selectedCatalogIds) {
        if (!id || id.trim() === '') {
          errors.push('Catalog IDs must be non-empty strings')
          break
        }
      }
    }

    if (params.catalogs?.catalogOrder && params.catalogs.selectedCatalogIds) {
      const selectedIds = new Set(params.catalogs.selectedCatalogIds)
      for (const id of params.catalogs.catalogOrder) {
        if (!selectedIds.has(id)) {
          warnings.push(`Catalog order contains unselected catalog: ${id}`)
        }
      }
    }

    if (params.catalogs?.customNames) {
      for (const [catalogId, customName] of Object.entries(params.catalogs.customNames)) {
        if (!customName || customName.trim() === '') {
          errors.push(`Custom name for ${catalogId} cannot be empty`)
        } else if (customName.length > 100) {
          errors.push(`Custom name for ${catalogId} is too long`)
        }
      }
    }

    if (params.catalogs?.displayStyles) {
      for (const [catalogId, style] of Object.entries(params.catalogs.displayStyles)) {
        if (!['grid', 'list', 'carousel'].includes(style)) {
          errors.push(`Invalid display style for ${catalogId}`)
        }
      }
    }

    if (params.layout?.itemsPerRow !== undefined) {
      const items = params.layout.itemsPerRow
      if (items < 1 || items > 6) {
        errors.push('Items per row must be between 1 and 6')
      }
    }

    if (
      params.layout?.showContinueWatching === false &&
      current.showContinueWatching &&
      current.itemsPerRow === 1
    ) {
      warnings.push('Disabling continue watching may leave the hero below the fold on narrow layouts')
    }

    return { errors, warnings }
  }

  private mergePreferences(
    current: HomescreenPreferences,
    params: UpdateHomescreenPreferencesParams
  ): HomescreenPreferences {
    const heroUpdates = params.hero
      ? {
          heroEnabled: params.hero.enabled ?? current.heroEnabled,
          heroStyle: params.hero.style ?? current.heroStyle,
          heroAutoRotate: params.hero.autoRotate ?? current.heroAutoRotate,
          heroRotationInterval:
            params.hero.rotationInterval ?? current.heroRotationInterval,
        }
      : {}

    const catalogUpdates = params.catalogs
      ? {
          selectedCatalogIds: params.catalogs.selectedCatalogIds
            ? [...params.catalogs.selectedCatalogIds]
            : current.selectedCatalogIds,
          catalogOrder: params.catalogs.catalogOrder
            ? [...params.catalogs.catalogOrder]
            : current.catalogOrder,
          catalogCustomNames: params.catalogs.customNames
            ? { ...current.catalogCustomNames, ...params.catalogs.customNames }
            : current.catalogCustomNames,
          catalogDisplayStyles: params.catalogs.displayStyles
            ? { ...current.catalogDisplayStyles, ...params.catalogs.displayStyles }
            : current.catalogDisplayStyles,
        }
      : {}

    const layoutUpdates = params.layout
      ? {
          itemsPerRow: params.layout.itemsPerRow ?? current.itemsPerRow,
          showContinueWatching:
            params.layout.showContinueWatching ?? current.showContinueWatching,
          compactMode: params.layout.compactMode ?? current.compactMode,
        }
      : {}

    return {
      ...current,
      ...heroUpdates,
      ...catalogUpdates,
      ...layoutUpdates,
    }
  }
}
