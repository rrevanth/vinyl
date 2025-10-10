import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { IMediaStreamsCapability } from '@/src/domain/capabilities/IMediaStreamsCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { Stream } from '@/src/domain/entities/Stream'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'

/**
 * Callback fired when a provider completes (success or failure)
 */
export type ProviderStreamCallback = (providerId: string, streams: Stream[], error?: Error) => void

/**
 * Use case for fetching media streams from all enabled providers.
 * Supports progressive streaming - results arrive as each provider completes.
 */
export class GetMediaStreamsUseCase {
  constructor(
    private getEnabledProvidersUseCase: GetEnabledProvidersForCapabilityUseCase,
    private logger: ILoggingService
  ) {}

  /**
   * Fetch streams for a movie or TV show from all enabled providers.
   * Results are returned progressively via optional callback as each provider completes.
   *
   * @param media - The media entity to fetch streams for
   * @param onProviderComplete - Optional callback fired when each provider completes
   * @returns Object containing aggregated streams and provider IDs
   */
  async execute(
    media: Media,
    onProviderComplete?: ProviderStreamCallback
  ): Promise<{ streams: Stream[]; providers: string[] }> {
    try {
      // Get all enabled providers with MEDIA_STREAMS capability
      const providers = await this.getEnabledProvidersUseCase.execute(CapabilityType.MEDIA_STREAMS)

      this.logger.info('Fetching streams from providers', {
        stableId: media.stableId,
        mediaType: media.type,
        providerCount: providers.length,
      })

      const aggregatedStreams: Stream[] = []
      const successfulProviders = new Set<string>()

      // Process each provider independently (don't wait for all)
      const providerPromises = providers.map(async (provider) => {
        try {
          const capability = provider.getCapability<IMediaStreamsCapability>(
            CapabilityType.MEDIA_STREAMS
          )

          if (!capability) {
            this.logger.warn('Provider missing MEDIA_STREAMS capability', {
              providerId: provider.metadata.id,
            })
            // Fire callback with empty result
            onProviderComplete?.(provider.metadata.id, [], new Error('Missing capability'))
            return
          }

          const result = await capability.getStreams(media)

          if (result.success) {
            const streams = result.data
            aggregatedStreams.push(...streams)
            successfulProviders.add(provider.metadata.id)

            this.logger.info('Successfully fetched streams from provider', {
              providerId: provider.metadata.id,
              streamCount: streams.length,
            })

            // Fire callback immediately with this provider's results
            onProviderComplete?.(provider.metadata.id, streams)
          } else {
            this.logger.warn('Provider returned error for getStreams', {
              providerId: provider.metadata.id,
              error: result.error,
            })

            // Fire callback with error
            onProviderComplete?.(provider.metadata.id, [], new Error(result.error?.message || 'Unknown error'))
          }
        } catch (error) {
          const err = error instanceof Error ? error : new Error(String(error))
          this.logger.error(
            'Failed to fetch streams from provider',
            err,
            {
              providerId: provider.metadata.id,
              stableId: media.stableId,
            }
          )

          // Fire callback with error
          onProviderComplete?.(provider.metadata.id, [], err)
        }
      })

      // Wait for all providers to complete (settled, not rejected)
      await Promise.allSettled(providerPromises)

      const providerIds = Array.from(successfulProviders)

      this.logger.info('Stream aggregation complete', {
        totalStreams: aggregatedStreams.length,
        successfulProviders: providerIds.length,
      })

      return {
        streams: aggregatedStreams,
        providers: providerIds,
      }
    } catch (error) {
      this.logger.error(
        'Failed to aggregate streams',
        error instanceof Error ? error : new Error(String(error)),
        { stableId: media.stableId }
      )
      // Return empty result instead of throwing
      return { streams: [], providers: [] }
    }
  }

  /**
   * Fetch streams for a specific TV show episode from all enabled providers.
   * Results are returned progressively via optional callback as each provider completes.
   *
   * @param media - The TV show media entity
   * @param seasonNumber - The season number
   * @param episodeNumber - The episode number
   * @param onProviderComplete - Optional callback fired when each provider completes
   * @returns Object containing aggregated streams and provider IDs
   */
  async executeForEpisode(
    media: Media,
    seasonNumber: number,
    episodeNumber: number,
    onProviderComplete?: ProviderStreamCallback
  ): Promise<{ streams: Stream[]; providers: string[] }> {
    try {
      // Get all enabled providers with MEDIA_STREAMS capability
      const providers = await this.getEnabledProvidersUseCase.execute(CapabilityType.MEDIA_STREAMS)

      this.logger.info('Fetching episode streams from providers', {
        stableId: media.stableId,
        seasonNumber,
        episodeNumber,
        providerCount: providers.length,
      })

      const aggregatedStreams: Stream[] = []
      const successfulProviders = new Set<string>()

      // Process each provider independently (don't wait for all)
      const providerPromises = providers.map(async (provider) => {
        try {
          const capability = provider.getCapability<IMediaStreamsCapability>(
            CapabilityType.MEDIA_STREAMS
          )

          if (!capability) {
            this.logger.warn('Provider missing MEDIA_STREAMS capability', {
              providerId: provider.metadata.id,
            })
            // Fire callback with empty result
            onProviderComplete?.(provider.metadata.id, [], new Error('Missing capability'))
            return
          }

          const result = await capability.getEpisodeStreams(media, seasonNumber, episodeNumber)

          if (result.success) {
            const streams = result.data
            aggregatedStreams.push(...streams)
            successfulProviders.add(provider.metadata.id)

            this.logger.info('Successfully fetched episode streams from provider', {
              providerId: provider.metadata.id,
              streamCount: streams.length,
            })

            // Fire callback immediately with this provider's results
            onProviderComplete?.(provider.metadata.id, streams)
          } else {
            this.logger.warn('Provider returned error for getEpisodeStreams', {
              providerId: provider.metadata.id,
              error: result.error,
            })

            // Fire callback with error
            onProviderComplete?.(provider.metadata.id, [], new Error(result.error?.message || 'Unknown error'))
          }
        } catch (error) {
          const err = error instanceof Error ? error : new Error(String(error))
          this.logger.error(
            'Failed to fetch episode streams from provider',
            err,
            {
              providerId: provider.metadata.id,
              stableId: media.stableId,
              seasonNumber,
              episodeNumber,
            }
          )

          // Fire callback with error
          onProviderComplete?.(provider.metadata.id, [], err)
        }
      })

      // Wait for all providers to complete (settled, not rejected)
      await Promise.allSettled(providerPromises)

      const providerIds = Array.from(successfulProviders)

      this.logger.info('Episode stream aggregation complete', {
        totalStreams: aggregatedStreams.length,
        successfulProviders: providerIds.length,
      })

      return {
        streams: aggregatedStreams,
        providers: providerIds,
      }
    } catch (error) {
      this.logger.error(
        'Failed to aggregate episode streams',
        error instanceof Error ? error : new Error(String(error)),
        {
          stableId: media.stableId,
          seasonNumber,
          episodeNumber,
        }
      )
      // Return empty result instead of throwing
      return { streams: [], providers: [] }
    }
  }
}
