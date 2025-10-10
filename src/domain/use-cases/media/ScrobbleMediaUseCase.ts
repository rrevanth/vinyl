import type { Media } from '@/src/domain/entities/Media'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { IMediaScrobblingCapability } from '@/src/domain/capabilities/IMediaScrobblingCapability'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'

/**
 * Scrobble Media Use Case
 * Manages real-time playback tracking (scrobbling) across all providers that support it
 */
export class ScrobbleMediaUseCase {
  constructor(
    private readonly getEnabledProvidersUseCase: GetEnabledProvidersForCapabilityUseCase,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Start scrobbling (begin watching)
   * @param media - Media being watched
   * @param progress - Playback progress percentage (0-100)
   * @param episodeInfo - Episode info for series
   */
  async start(
    media: Media,
    progress: number,
    episodeInfo?: { season: number; episode: number }
  ): Promise<void> {
    const providers = await this.getEnabledProvidersUseCase.execute(CapabilityType.MEDIA_SCROBBLING)

    if (providers.length === 0) {
      this.logger.debug('No scrobbling providers available (auth may be required)')
      return
    }

    this.logger.info('Starting scrobble', {
      media: media.stableId,
      progress,
      episodeInfo,
      providerCount: providers.length,
    })

    await Promise.allSettled(
      providers.map(async (provider) => {
        const capability = provider.getCapability<IMediaScrobblingCapability>(
          CapabilityType.MEDIA_SCROBBLING
        )

        if (!capability) {
          this.logger.warn('Provider missing MEDIA_SCROBBLING capability', {
            providerId: provider.metadata.id,
          })
          return
        }

        const result = await capability.startScrobble(media, progress, episodeInfo)
        if (!result.success) {
          this.logger.warn('Failed to start scrobble', {
            error: result.error.message,
            provider: provider.metadata.id,
          })
        }
      })
    )
  }

  /**
   * Pause scrobbling (pause watching)
   * @param media - Media being watched
   * @param progress - Playback progress percentage (0-100)
   * @param episodeInfo - Episode info for series
   */
  async pause(
    media: Media,
    progress: number,
    episodeInfo?: { season: number; episode: number }
  ): Promise<void> {
    const providers = await this.getEnabledProvidersUseCase.execute(CapabilityType.MEDIA_SCROBBLING)

    if (providers.length === 0) return

    this.logger.debug('Pausing scrobble', { media: media.stableId, progress })

    await Promise.allSettled(
      providers.map(async (provider) => {
        const capability = provider.getCapability<IMediaScrobblingCapability>(
          CapabilityType.MEDIA_SCROBBLING
        )

        if (!capability) return

        const result = await capability.pauseScrobble(media, progress, episodeInfo)
        if (!result.success) {
          this.logger.warn('Failed to pause scrobble', {
            error: result.error.message,
            provider: provider.metadata.id,
          })
        }
      })
    )
  }

  /**
   * Stop scrobbling (finish watching)
   * @param media - Media being watched
   * @param progress - Final playback progress percentage (0-100)
   * @param episodeInfo - Episode info for series
   */
  async stop(
    media: Media,
    progress: number,
    episodeInfo?: { season: number; episode: number }
  ): Promise<void> {
    const providers = await this.getEnabledProvidersUseCase.execute(CapabilityType.MEDIA_SCROBBLING)

    if (providers.length === 0) return

    this.logger.info('Stopping scrobble', {
      media: media.stableId,
      progress,
      episodeInfo,
    })

    await Promise.allSettled(
      providers.map(async (provider) => {
        const capability = provider.getCapability<IMediaScrobblingCapability>(
          CapabilityType.MEDIA_SCROBBLING
        )

        if (!capability) return

        const result = await capability.stopScrobble(media, progress, episodeInfo)
        if (!result.success) {
          this.logger.warn('Failed to stop scrobble', {
            error: result.error.message,
            provider: provider.metadata.id,
          })
        }
      })
    )
  }
}
