import type { HomescreenData , GetHomescreenDataUseCase } from './GetHomescreenDataUseCase'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { DomainError } from '@/src/domain/errors/DomainError'

export interface RefreshHomescreenParams {
  readonly sections?: readonly ('hero' | 'continueWatching' | 'catalogs')[]
  readonly force?: boolean
}

export interface RefreshHomescreenResult {
  readonly data: HomescreenData
  readonly refreshedSections: readonly ('hero' | 'continueWatching' | 'catalogs')[]
  readonly cacheInvalidated: boolean
  readonly timing: {
    readonly startTime: Date
    readonly endTime: Date
    readonly durationMs: number
  }
  readonly errors: readonly {
    readonly section: string
    readonly error: string
    readonly recoverable: boolean
  }[]
  readonly success: boolean
}

/**
 * Simplified refresh orchestrator that delegates to GetHomescreenDataUseCase.
 */
export class RefreshHomescreenUseCase {
  constructor(
    private readonly getHomescreenDataUseCase: GetHomescreenDataUseCase,
    private readonly userService: IUserService,
    private readonly loggingService: ILoggingService
  ) {}

  async execute(params: RefreshHomescreenParams = {}): Promise<RefreshHomescreenResult> {
    const startTime = new Date()
    const sections = params.sections ?? ['hero', 'continueWatching', 'catalogs']

    try {
      const data = await this.getHomescreenDataUseCase.execute({
        heroLimit: 10,
        continueWatchingLimit: 20,
      })

      const endTime = new Date()
      const durationMs = endTime.getTime() - startTime.getTime()

      this.loggingService.info('Homescreen data refreshed', {
        userId: this.userService.getCurrentUser().id,
        sections,
        durationMs,
      })

      return {
        data,
        refreshedSections: sections,
        cacheInvalidated: false,
        timing: {
          startTime,
          endTime,
          durationMs,
        },
        errors: [],
        success: true,
      }
    } catch (error) {
      const endTime = new Date()
      const durationMs = endTime.getTime() - startTime.getTime()

      this.loggingService.error('Homescreen refresh failed', error as Error, {
        userId: this.userService.getCurrentUser().id,
        durationMs,
      })

      throw new DomainError('Failed to refresh homescreen data')
    }
  }
}
