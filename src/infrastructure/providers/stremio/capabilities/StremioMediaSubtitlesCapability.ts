import type { IMediaSubtitlesCapability } from '@/src/domain/capabilities/IMediaSubtitlesCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { Subtitle } from '@/src/domain/entities/Stream'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { StremioAddonClient } from '@/src/infrastructure/providers/stremio/clients/StremioAddonClient'
import { StremioSubtitleMapper } from '@/src/infrastructure/mappers/stremio/StremioSubtitleMapper'
import { StremioIdResolver } from '@/src/infrastructure/providers/stremio/utils/StremioIdResolver'
import { InfrastructureError } from '@/src/infrastructure/errors/InfrastructureError'

/**
 * Provides subtitle files backed by a Stremio addon
 */
export class StremioMediaSubtitlesCapability implements IMediaSubtitlesCapability {
  constructor(
    private readonly addon: StremioAddon,
    private readonly addonClient: StremioAddonClient,
    private readonly logger: ILoggingService
  ) {}

  async getSubtitles(media: Media): Promise<Subtitle[]> {
    // Resolve Stremio ID for this media
    const resolvedId = StremioIdResolver.resolveId(media, this.addon.manifest)

    if (!resolvedId) {
      this.logger.warn('Could not resolve Stremio ID for subtitles', {
        addonId: this.addon.id,
        mediaStableId: media.stableId,
      })
      return []
    }

    try {
      // Fetch subtitles from addon
      const response = await this.addonClient.getSubtitles(resolvedId.type, resolvedId.id)

      if (!response.subtitles || response.subtitles.length === 0) {
        this.logger.debug('No subtitles found for media', {
          addonId: this.addon.id,
          mediaStableId: media.stableId,
          resolvedType: resolvedId.type,
          resolvedId: resolvedId.id,
        })
        return []
      }

      // Transform to domain subtitles
      const subtitles = StremioSubtitleMapper.toSubtitles(
        response.subtitles,
        this.addon.id,
        media.stableId
      )

      this.logger.debug('Successfully fetched subtitles from Stremio addon', {
        addonId: this.addon.id,
        mediaStableId: media.stableId,
        subtitleCount: subtitles.length,
        resolvedType: resolvedId.type,
        resolvedId: resolvedId.id,
      })

      return subtitles
    } catch (error) {
      this.logger.error(
        'Failed to fetch subtitles from Stremio addon',
        error instanceof Error ? error : new Error(String(error)),
        {
          addonId: this.addon.id,
          mediaStableId: media.stableId,
          resolvedType: resolvedId.type,
          resolvedId: resolvedId.id,
        }
      )

      throw new InfrastructureError(
        `Failed to fetch subtitles from Stremio addon: ${this.addon.name}`,
        error instanceof Error ? error : new Error(String(error))
      )
    }
  }

  async getEpisodeSubtitles(
    media: Media,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<Subtitle[]> {
    // Resolve Stremio ID with episode information
    const resolvedId = StremioIdResolver.resolveId(
      media,
      this.addon.manifest,
      seasonNumber,
      episodeNumber
    )

    if (!resolvedId) {
      this.logger.warn('Could not resolve Stremio ID for episode subtitles', {
        addonId: this.addon.id,
        mediaStableId: media.stableId,
        season: seasonNumber,
        episode: episodeNumber,
      })
      return []
    }

    try {
      // Fetch subtitles for episode
      const response = await this.addonClient.getSubtitles(resolvedId.type, resolvedId.id)

      if (!response.subtitles || response.subtitles.length === 0) {
        this.logger.debug('No subtitles found for episode', {
          addonId: this.addon.id,
          mediaStableId: media.stableId,
          season: seasonNumber,
          episode: episodeNumber,
          resolvedType: resolvedId.type,
          resolvedId: resolvedId.id,
        })
        return []
      }

      // Transform to domain subtitles
      const subtitles = StremioSubtitleMapper.toSubtitles(
        response.subtitles,
        this.addon.id,
        media.stableId
      )

      this.logger.debug('Successfully fetched episode subtitles from Stremio addon', {
        addonId: this.addon.id,
        mediaStableId: media.stableId,
        season: seasonNumber,
        episode: episodeNumber,
        subtitleCount: subtitles.length,
        resolvedType: resolvedId.type,
        resolvedId: resolvedId.id,
      })

      return subtitles
    } catch (error) {
      this.logger.error(
        'Failed to fetch episode subtitles from Stremio addon',
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
        `Failed to fetch episode subtitles from Stremio addon: ${this.addon.name}`,
        error instanceof Error ? error : new Error(String(error))
      )
    }
  }
}
