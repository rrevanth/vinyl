import type { IMediaStreamsCapability } from '@/src/domain/capabilities/IMediaStreamsCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { Stream } from '@/src/domain/entities/Stream'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { ok, fail, type Result } from '@/src/domain/types/Result'
import type { StremioAddonClient } from '@/src/infrastructure/providers/stremio/clients/StremioAddonClient'
import { StremioStreamMapper } from '@/src/infrastructure/mappers/stremio/StremioStreamMapper'
import { StremioIdResolver } from '@/src/infrastructure/providers/stremio/utils/StremioIdResolver'

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

  async getStreams(media: Media): Promise<Result<Stream[]>> {
    // Resolve Stremio ID for this media
    const resolvedId = StremioIdResolver.resolveId(media, this.addon.manifest)

    if (!resolvedId) {
      this.logger.warn('Could not resolve Stremio ID for streams', {
        addonId: this.addon.id,
        mediaStableId: media.stableId,
      })
      return fail(
        new Error('Could not resolve Stremio ID for streams'),
        `stremio:${this.addon.id}`,
        'missing_id'
      )
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
        return fail(
          new Error('No streams found for media'),
          `stremio:${this.addon.id}`,
          'not_found'
        )
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

      return ok(streams, `stremio:${this.addon.id}`)
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

      return fail(
        error instanceof Error ? error : new Error(String(error)),
        `stremio:${this.addon.id}`,
        'api_error'
      )
    }
  }

  async getEpisodeStreams(
    media: Media,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<Result<Stream[]>> {
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
      return fail(
        new Error('Could not resolve Stremio ID for episode streams'),
        `stremio:${this.addon.id}`,
        'missing_id'
      )
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
        return fail(
          new Error('No streams found for episode'),
          `stremio:${this.addon.id}`,
          'not_found'
        )
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

      return ok(streams, `stremio:${this.addon.id}`)
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

      return fail(
        error instanceof Error ? error : new Error(String(error)),
        `stremio:${this.addon.id}`,
        'api_error'
      )
    }
  }
}
