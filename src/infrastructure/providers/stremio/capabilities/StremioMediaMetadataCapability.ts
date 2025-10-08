import type { IMediaMetadataCapability } from '@/src/domain/capabilities/IMediaMetadataCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { EnrichedMedia } from '@/src/domain/entities/EnrichedMedia'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { StremioAddonClient } from '@/src/infrastructure/providers/stremio/clients/StremioAddonClient'
import { StremioMetaMapper } from '@/src/infrastructure/mappers/stremio/StremioMetaMapper'
import { StremioIdResolver } from '@/src/infrastructure/providers/stremio/utils/StremioIdResolver'
import { InfrastructureError } from '@/src/infrastructure/errors/InfrastructureError'

/**
 * Provides detailed metadata enrichment backed by a Stremio addon
 */
export class StremioMediaMetadataCapability implements IMediaMetadataCapability {
  constructor(
    private readonly addon: StremioAddon,
    private readonly addonClient: StremioAddonClient,
    private readonly logger: ILoggingService
  ) {}

  async enrichMedia(media: Media): Promise<EnrichedMedia> {
    // Resolve Stremio ID for this media
    const resolvedId = StremioIdResolver.resolveId(media, this.addon.manifest)

    if (!resolvedId) {
      this.logger.warn('Could not resolve Stremio ID for media metadata', {
        addonId: this.addon.id,
        mediaStableId: media.stableId,
      })

      // Return minimal enriched media
      return {
        media,
      }
    }

    try {
      // Fetch metadata from addon
      const response = await this.addonClient.getMeta(resolvedId.type, resolvedId.id)

      // Transform to enriched media
      const enrichedMedia = StremioMetaMapper.toEnrichedMedia(response.meta, media)

      this.logger.debug('Successfully enriched media from Stremio addon', {
        addonId: this.addon.id,
        mediaStableId: media.stableId,
        resolvedType: resolvedId.type,
        resolvedId: resolvedId.id,
      })

      return enrichedMedia
    } catch (error) {
      this.logger.error(
        'Failed to enrich media from Stremio addon',
        error instanceof Error ? error : new Error(String(error)),
        {
          addonId: this.addon.id,
          mediaStableId: media.stableId,
          resolvedType: resolvedId.type,
          resolvedId: resolvedId.id,
        }
      )

      throw new InfrastructureError(
        `Failed to enrich media from Stremio addon: ${this.addon.name}`,
        error instanceof Error ? error : new Error(String(error))
      )
    }
  }

  async enrichMediaBatch(mediaList: Media[]): Promise<EnrichedMedia[]> {
    // Simple parallel enrichment
    const results = await Promise.allSettled(
      mediaList.map((media) => this.enrichMedia(media))
    )

    return results
      .filter((result): result is PromiseFulfilledResult<EnrichedMedia> => result.status === 'fulfilled')
      .map((result) => result.value)
  }
}
