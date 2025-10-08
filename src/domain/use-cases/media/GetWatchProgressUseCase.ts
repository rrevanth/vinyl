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

    try {
      // Get user's provider priorities for watch progress
      const preferences = this.userService.getCurrentUserPreferences()
      const watchProgressPriorities = preferences.providers.priorities.watch_progress

      // Get enabled and ready providers using centralized use case
      const readyProviders = this.getEnabledProvidersUseCase.execute(
        CapabilityType.MEDIA_WATCH_PROGRESS
      )

      // Extract capabilities
      const capabilities = readyProviders
        .map(p => p.getCapability<IMediaWatchProgressCapability>(CapabilityType.MEDIA_WATCH_PROGRESS))
        .filter((c): c is IMediaWatchProgressCapability => c !== null)

      if (capabilities.length === 0) {
        this.logger.warn('No providers support MEDIA_WATCH_PROGRESS capability', {
          mediaId: media.stableId,
        })
        return null
      }

      // Sort capabilities by user's priority order (if possible)
      // Note: Current limitation - capabilities don't expose provider ID
      const sortedCapabilities = this.sortByPriority(capabilities, watchProgressPriorities)

      this.logger.info('Fetching watch progress from providers', {
        mediaId: media.stableId,
        providerCount: sortedCapabilities.length,
      })

      // Try each provider in order until one succeeds
      for (const capability of sortedCapabilities) {
        try {
          const progress = await capability.getProgress(media)

          this.logger.info('Successfully fetched watch progress', {
            mediaId: media.stableId,
            hasProgress: !!progress,
            mediaType: progress.mediaType,
          })

          return progress
        } catch (error) {
          this.logger.warn('Failed to fetch watch progress from provider', {
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
    } catch (error) {
      this.logger.error('Failed to get watch progress', error as Error, {
        mediaId: media.stableId,
        title: media.title,
      })
      return null
    }
  }

  /**
   * Sort capabilities by user's provider priority order
   * Providers not in priority list are placed at the end
   */
  private sortByPriority<T>(capabilities: T[], priority: readonly string[]): T[] {
    // For now, we can't sort because capabilities don't expose provider ID
    // This is a limitation of the current capability interface design
    // Return as-is, which will use the order they were registered
    return [...capabilities]

    // TODO: Enhance IProvider to expose providerId on capabilities
    // Then implement proper sorting like:
    // return [...capabilities].sort((a, b) => {
    //   const aIndex = priority.indexOf(a.providerId)
    //   const bIndex = priority.indexOf(b.providerId)
    //   if (aIndex === -1 && bIndex === -1) return 0
    //   if (aIndex === -1) return 1
    //   if (bIndex === -1) return -1
    //   return aIndex - bIndex
    // })
  }
}