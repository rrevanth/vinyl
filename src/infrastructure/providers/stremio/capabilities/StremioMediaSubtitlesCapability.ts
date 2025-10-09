import type { IMediaSubtitlesCapability } from '@/src/domain/capabilities/IMediaSubtitlesCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { Subtitle } from '@/src/domain/entities/Stream'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { ok, fail, type Result } from '@/src/domain/types/Result'
import type { StremioAddonClient } from '@/src/infrastructure/providers/stremio/clients/StremioAddonClient'
import { StremioSubtitleMapper } from '@/src/infrastructure/mappers/stremio/StremioSubtitleMapper'
import { StremioIdResolver } from '@/src/infrastructure/providers/stremio/utils/StremioIdResolver'

/**
 * Provides subtitle files backed by a Stremio addon
 */
export class StremioMediaSubtitlesCapability implements IMediaSubtitlesCapability {
  constructor(
    private readonly addon: StremioAddon,
    private readonly addonClient: StremioAddonClient,
    private readonly logger: ILoggingService
  ) {}

  async getSubtitles(media: Media): Promise<Result<Subtitle[]>> {
    // Resolve Stremio ID for this media
    const resolvedId = StremioIdResolver.resolveId(media, this.addon.manifest)

    if (!resolvedId) {
      this.logger.warn('Could not resolve Stremio ID for subtitles', {
        addonId: this.addon.id,
        mediaStableId: media.stableId,
      })
      return fail(
        new Error('Could not resolve Stremio ID for subtitles'),
        `stremio:${this.addon.id}`,
        'missing_id'
      )
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
        return fail(
          new Error('No subtitles found for media'),
          `stremio:${this.addon.id}`,
          'not_found'
        )
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

      return ok(subtitles, `stremio:${this.addon.id}`)
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

      return fail(
        error instanceof Error ? error : new Error(String(error)),
        `stremio:${this.addon.id}`,
        'api_error'
      )
    }
  }

  async getEpisodeSubtitles(
    media: Media,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<Result<Subtitle[]>> {
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
      return fail(
        new Error('Could not resolve Stremio ID for episode subtitles'),
        `stremio:${this.addon.id}`,
        'missing_id'
      )
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
        return fail(
          new Error('No subtitles found for episode'),
          `stremio:${this.addon.id}`,
          'not_found'
        )
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

      return ok(subtitles, `stremio:${this.addon.id}`)
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

      return fail(
        error instanceof Error ? error : new Error(String(error)),
        `stremio:${this.addon.id}`,
        'api_error'
      )
    }
  }
}
