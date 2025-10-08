import type { ProviderPriorities } from '@/src/domain/entities/UserPreferences'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

/**
 * Use case for saving provider priority preferences
 *
 * Encapsulates the business logic for persisting user's provider priority order
 * for each capability type. Ensures proper error handling and logging.
 *
 * @example
 * ```typescript
 * const useCase = new SaveProviderPrioritiesUseCase(userService, loggingService)
 * await useCase.execute({
 *   metadata: ['tmdb', 'trakt'],
 *   streams: ['stremio'],
 *   external_ids: ['tmdb', 'trakt'],
 *   // ... other capability priorities
 * })
 * ```
 */
export class SaveProviderPrioritiesUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly loggingService: ILoggingService
  ) {}

  /**
   * Save provider priorities to user preferences
   *
   * Updates the user's provider priority configuration by merging with existing
   * preferences and persisting the changes. Logs the operation for audit and debugging.
   *
   * @param priorities - The new priority configuration to save
   * @throws {Error} If the save operation fails (e.g., storage unavailable, network error)
   *
   * @example
   * ```typescript
   * try {
   *   await useCase.execute({
   *     metadata: ['tmdb', 'trakt', 'stremio'],
   *     streams: ['stremio', 'torrent'],
   *     // ... other capabilities
   *   })
   * } catch (error) {
   *   // Handle error appropriately in presentation layer
   * }
   * ```
   */
  async execute(priorities: ProviderPriorities): Promise<void> {
    try {
      this.loggingService.info('Saving provider priorities', {
        metadata: priorities.metadata,
        streams: priorities.streams,
        external_ids: priorities.external_ids,
        videos: priorities.videos,
        people: priorities.people,
        seasons: priorities.seasons,
        ratings: priorities.ratings,
        reviews: priorities.reviews,
        images: priorities.images,
        recommendations: priorities.recommendations,
        watch_progress: priorities.watch_progress,
      })

      // Get current preferences and merge with new priorities
      const currentPreferences = this.userService.getCurrentUserPreferences()

      await this.userService.updatePreferences({
        providers: {
          ...currentPreferences.providers,
          priorities,
        },
      })

      this.loggingService.info('Provider priorities saved successfully')
    } catch (error) {
      this.loggingService.error(
        'Failed to save provider priorities',
        error as Error,
        { priorities }
      )
      throw error
    }
  }
}