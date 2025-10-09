import type { Media } from '@/src/domain/entities/Media'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type {
  IMediaWatchProgressCapability,
  WatchProgress,
} from '@/src/domain/capabilities/IMediaWatchProgressCapability'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'

/**
 * Use case for fetching watch progress for media
 * Respects user's provider priority order
 */
export class GetWatchProgressUseCase {
  constructor(
    private providerRegistry: IProviderRegistry,
    private userService: IUserService,
    private logger: ILoggingService,
    private getEnabledProvidersUseCase: GetEnabledProvidersForCapabilityUseCase
  ) {}

  /**
   * Execute the use case to get watch progress
   * @param media - The media to get watch progress for
   * @returns Watch progress information or null if not available
   */
  async execute(media: Media): Promise<WatchProgress | null> {
    this.logger.info('Getting watch progress for media', {
      mediaId: media.stableId,
      title: media.title,
      type: media.type,
    })

    // Get user's provider priorities for watch progress
    const preferences = this.userService.getCurrentUserPreferences()
    const watchProgressPriorities = preferences.providers.priorities.watch_progress

    // Get enabled and ready providers using centralized use case
    const readyProviders = this.getEnabledProvidersUseCase.execute(
      CapabilityType.MEDIA_WATCH_PROGRESS
    )

    // Extract capabilities with provider IDs
    const capabilities = readyProviders
      .map(p => ({
        capability: p.getCapability<IMediaWatchProgressCapability>(CapabilityType.MEDIA_WATCH_PROGRESS),
        providerId: p.metadata.id
      }))
      .filter((c): c is { capability: IMediaWatchProgressCapability; providerId: string } => c.capability !== null)

    if (capabilities.length === 0) {
      this.logger.warn('No providers support MEDIA_WATCH_PROGRESS capability', {
        mediaId: media.stableId,
      })
      return null
    }

    // Sort capabilities by user's priority order
    const sortedCapabilities = this.sortByPriority(capabilities, watchProgressPriorities)

    this.logger.info('Fetching watch progress from providers', {
      mediaId: media.stableId,
      providerCount: sortedCapabilities.length,
    })

    // Try each provider in order until one succeeds - Using Result pattern
    for (const { capability, providerId } of sortedCapabilities) {
      try {
        const result = await capability.getProgress(media)

        if (!result.success) {
          this.logger.warn('Failed to fetch watch progress from provider', {
            providerId: result.providerId,
            reason: result.reason,
            error: result.error.message,
            mediaId: media.stableId,
          })
          continue
        }

        const progress = result.data

        this.logger.info('Successfully fetched watch progress', {
          mediaId: media.stableId,
          providerId,
          hasProgress: !!progress,
          mediaType: progress?.mediaType,
        })

        return progress
      } catch (error) {
        this.logger.warn('Failed to fetch watch progress from provider', {
          providerId,
          error: error instanceof Error ? error.message : String(error),
          mediaId: media.stableId,
        })
        // Continue to next provider
      }
    }

    this.logger.warn('All providers failed to fetch watch progress', {
      mediaId: media.stableId,
    })

    return null
  }

  /**
   * Sort capabilities by user's provider priority order
   * Providers not in priority list are placed at the end
   */
  private sortByPriority<T extends { providerId: string }>(
    items: T[],
    priority: readonly string[]
  ): T[] {
    return items.sort((a, b) => {
      const indexA = priority.indexOf(a.providerId)
      const indexB = priority.indexOf(b.providerId)

      if (indexA === -1 && indexB === -1) return 0
      if (indexA === -1) return 1
      if (indexB === -1) return -1
      return indexA - indexB
    })
  }
}