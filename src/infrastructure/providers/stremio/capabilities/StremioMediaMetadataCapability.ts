import type { IMediaMetadataCapability } from '@/src/domain/capabilities/IMediaMetadataCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { EnrichedMedia } from '@/src/domain/entities/EnrichedMedia'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { ok, fail, type Result } from '@/src/domain/types/Result'
import type { StremioAddonClient } from '@/src/infrastructure/providers/stremio/clients/StremioAddonClient'
import { StremioMetaMapper } from '@/src/infrastructure/mappers/stremio/StremioMetaMapper'
import { StremioIdResolver } from '@/src/infrastructure/providers/stremio/utils/StremioIdResolver'

/**
 * Provides detailed metadata enrichment backed by a Stremio addon
 */
export class StremioMediaMetadataCapability implements IMediaMetadataCapability {
  constructor(
    private readonly addon: StremioAddon,
    private readonly addonClient: StremioAddonClient,
    private readonly logger: ILoggingService
  ) {}

  async enrichMedia(media: Media): Promise<Result<EnrichedMedia>> {
    // Resolve Stremio ID for this media
    const resolvedId = StremioIdResolver.resolveId(media, this.addon.manifest)

    if (!resolvedId) {
      this.logger.warn('Could not resolve Stremio ID for media metadata', {
        addonId: this.addon.id,
        mediaStableId: media.stableId,
      })

      return fail(
        new Error('Could not resolve Stremio ID for media metadata'),
        `stremio:${this.addon.id}`,
        'missing_id'
      )
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

      return ok(enrichedMedia, `stremio:${this.addon.id}`)
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

      return fail(
        error instanceof Error ? error : new Error(String(error)),
        `stremio:${this.addon.id}`,
        'api_error'
      )
    }
  }

  async enrichMediaBatch(mediaList: Media[]): Promise<Result<EnrichedMedia[]>> {
    // Simple parallel enrichment
    const results = await Promise.allSettled(mediaList.map((media) => this.enrichMedia(media)))

    const successfulResults = results
      .filter(
        (result): result is PromiseFulfilledResult<Result<EnrichedMedia>> =>
          result.status === 'fulfilled' && result.value.success === true
      )
      .map((result) => (result.value as { success: true; data: EnrichedMedia }).data)

    if (successfulResults.length === 0) {
      return fail(
        new Error('All media enrichment failed'),
        `stremio:${this.addon.id}`,
        'api_error'
      )
    }

    return ok(successfulResults, `stremio:${this.addon.id}`)
  }
}
