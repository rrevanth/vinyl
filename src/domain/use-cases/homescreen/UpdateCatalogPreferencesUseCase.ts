import type { CatalogPreferences, UserPreferences } from '@/src/domain/entities/UserPreferences'
import { DomainError } from '@/src/domain/errors/DomainError'
import { ValidationError } from '@/src/domain/errors/ValidationError'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IUserService } from '@/src/domain/services/IUserService'

export interface UpdateCatalogPreferencesParams {
  readonly catalogPreferences?: Readonly<Record<string, CatalogPreferences>>
}

export interface UpdateCatalogPreferencesResult {
  readonly preferences: UserPreferences
  readonly cacheInvalidated: boolean
  readonly warnings: readonly string[]
}

/**
 * Use case for managing centralized catalog preferences
 * 
 * Handles:
 * - Catalog selection (enabled/disabled)
 * - Catalog ordering
 * - Custom names
 * - Display styles
 */
export class UpdateCatalogPreferencesUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly loggingService: ILoggingService
  ) {}

  async execute(params: UpdateCatalogPreferencesParams): Promise<UpdateCatalogPreferencesResult> {
    const start = Date.now()
    const warnings: string[] = []

    try {
      const userPreferences = this.userService.getCurrentUserPreferences()
      const currentCatalogPreferences = userPreferences.catalogPreferences

      // Validate input
      const validation = this.validate(params, currentCatalogPreferences)
      if (validation.errors.length > 0) {
        throw new ValidationError(`Invalid catalog preferences: ${validation.errors.join(', ')}`, 'catalogPreferences')
      }
      warnings.push(...validation.warnings)

      // Merge preferences
      const updatedPreferences = this.mergePreferences(userPreferences, params)

      // Update user preferences
      await this.userService.updatePreferences({ catalogPreferences: updatedPreferences.catalogPreferences })

      this.loggingService.info('Catalog preferences updated', {
        catalogCount: Object.keys(updatedPreferences.catalogPreferences).length,
        duration: Date.now() - start,
      })

      return {
        preferences: updatedPreferences,
        cacheInvalidated: true,
        warnings,
      }
    } catch (error) {
      this.loggingService.error('Failed to update catalog preferences', error as Error, {
        duration: Date.now() - start,
      })

      if (error instanceof ValidationError) {
        throw error
      }

      throw new DomainError('Failed to update catalog preferences')
    }
  }

  private validate(
    params: UpdateCatalogPreferencesParams,
    current: Readonly<Record<string, CatalogPreferences>>
  ): { errors: string[]; warnings: string[] } {
    const errors: string[] = []
    const warnings: string[] = []

    if (!params.catalogPreferences) {
      return { errors, warnings }
    }

    // Validate catalog preferences
    for (const [catalogId, preferences] of Object.entries(params.catalogPreferences)) {
      if (!catalogId || catalogId.trim() === '') {
        errors.push('Catalog ID cannot be empty')
        continue
      }

      if (typeof preferences.order !== 'number' || preferences.order < 1) {
        errors.push(`Catalog ${catalogId}: order must be a positive number`)
      }

      if (preferences.customName !== undefined && typeof preferences.customName !== 'string') {
        errors.push(`Catalog ${catalogId}: customName must be a string`)
      }

      if (preferences.customName !== undefined && preferences.customName.trim() === '') {
        warnings.push(`Catalog ${catalogId}: customName is empty, will be ignored`)
      }
    }

    return { errors, warnings }
  }

  private mergePreferences(
    current: UserPreferences,
    params: UpdateCatalogPreferencesParams
  ): UserPreferences {
    if (!params.catalogPreferences) {
      return current
    }

    return {
      ...current,
      catalogPreferences: {
        ...current.catalogPreferences,
        ...params.catalogPreferences,
      },
    }
  }
}
