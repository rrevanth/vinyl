import type { IMediaStreamsCapability } from '@/src/domain/capabilities/IMediaStreamsCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { Stream } from '@/src/domain/entities/Stream'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { StremioAddonClient } from '@/src/infrastructure/providers/stremio/clients/StremioAddonClient'
import { StremioStreamMapper } from '@/src/infrastructure/mappers/stremio/StremioStreamMapper'
import { StremioIdResolver } from '@/src/infrastructure/providers/stremio/utils/StremioIdResolver'
import { InfrastructureError } from '@/src/infrastructure/errors/InfrastructureError'

/**
 * Provides playable streams backed by a Stremio addon
 * Implements the primary value proposition: stream discovery
 */
export class StremioMediaStreamsCapability implements IMediaStreamsCapability {
  constructor(
    private readonly addon: StremioAddon,
    private readonly addonClient: StremioAddonClient,
    private readonly logger: ILoggingService
  ) {}

  async getStreams(media: Media): Promise<Stream[]> {
    // Resolve Stremio ID for this media
    const resolvedId = StremioIdResolver.resolveId(media, this.addon.manifest)

    if (!resolvedId) {
      this.logger.warn('Could not resolve Stremio ID for streams', {
        addonId: this.addon.id,
        mediaStableId: media.stableId,
      })
      return []
    }

    try {
      // Fetch streams from addon
      const response = await this.addonClient.getStream(resolvedId.type, resolvedId.id)

      if (!response.streams || response.streams.length === 0) {
        this.logger.debug('No streams found for media', {
          addonId: this.addon.id,
          mediaStableId: media.stableId,
          resolvedType: resolvedId.type,
          resolvedId: resolvedId.id,
        })
        return []
      }

      // Transform to domain streams
      const streams = StremioStreamMapper.fromStremioStreamArray(
        response.streams,
        this.addon.id,
        media.stableId
      )

      this.logger.debug('Successfully fetched streams from Stremio addon', {
        addonId: this.addon.id,
        mediaStableId: media.stableId,
        streamCount: streams.length,
        resolvedType: resolvedId.type,
        resolvedId: resolvedId.id,
      })

      return streams
    } catch (error) {
      this.logger.error(
        'Failed to fetch streams from Stremio addon',
        error instanceof Error ? error : new Error(String(error)),
        {
          addonId: this.addon.id,
          mediaStableId: media.stableId,
          resolvedType: resolvedId.type,
          resolvedId: resolvedId.id,
        }
      )

      throw new InfrastructureError(
        `Failed to fetch streams from Stremio addon: ${this.addon.name}`,
        error instanceof Error ? error : new Error(String(error))
      )
    }
  }

  async getEpisodeStreams(
    media: Media,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<Stream[]> {
    // Resolve Stremio ID with episode information
    const resolvedId = StremioIdResolver.resolveId(
      media,
      this.addon.manifest,
      seasonNumber,
      episodeNumber
    )

    if (!resolvedId) {
      this.logger.warn('Could not resolve Stremio ID for episode streams', {
        addonId: this.addon.id,
        mediaStableId: media.stableId,
        season: seasonNumber,
        episode: episodeNumber,
      })
      return []
    }

    try {
      // Fetch streams for episode
      const response = await this.addonClient.getStream(resolvedId.type, resolvedId.id)

      if (!response.streams || response.streams.length === 0) {
        this.logger.debug('No streams found for episode', {
          addonId: this.addon.id,
          mediaStableId: media.stableId,
          season: seasonNumber,
          episode: episodeNumber,
          resolvedType: resolvedId.type,
          resolvedId: resolvedId.id,
        })
        return []
      }

      // Transform to domain streams
      const streams = StremioStreamMapper.fromStremioStreamArray(
        response.streams,
        this.addon.id,
        media.stableId
      )

      this.logger.debug('Successfully fetched episode streams from Stremio addon', {
        addonId: this.addon.id,
        mediaStableId: media.stableId,
        season: seasonNumber,
        episode: episodeNumber,
        streamCount: streams.length,
        resolvedType: resolvedId.type,
        resolvedId: resolvedId.id,
      })

      return streams
    } catch (error) {
      this.logger.error(
        'Failed to fetch episode streams from Stremio addon',
        error instanceof Error ? error : new Error(String(error)),
        {
          addonId: this.addon.id,
          mediaStableId: media.stableId,
          season: seasonNumber,
          episode: episodeNumber,
          resolvedType: resolvedId.type,
          resolvedId: resolvedId.id,
        }
      )

      throw new InfrastructureError(
        `Failed to fetch episode streams from Stremio addon: ${this.addon.name}`,
        error instanceof Error ? error : new Error(String(error))
      )
    }
  }
}
