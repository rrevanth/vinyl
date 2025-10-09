import type { Media } from '@/src/domain/entities/Media'
import type { ExternalIds } from '@/src/domain/entities/ExternalIds'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { IMediaExternalIdsCapability } from '@/src/domain/capabilities/IMediaExternalIdsCapability'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'

/**
 * Use case for resolving external IDs from all enabled providers
 * Fetches in parallel and merges results with early exit optimization
 */
export class ResolveExternalIdsUseCase {
  constructor(
    private providerRegistry: IProviderRegistry,
    private userService: IUserService,
    private logger: ILoggingService,
    private getEnabledProvidersUseCase: GetEnabledProvidersForCapabilityUseCase
  ) {}

  /**
   * Execute the use case to resolve external IDs
   * @param media - The media to resolve external IDs for
   * @returns Merged ExternalIds from all providers
   */
  async execute(media: Media): Promise<ExternalIds> {
    this.logger.info('Resolving external IDs for media', {
      mediaId: media.stableId,
      title: media.title,
      type: media.type,
    })

    // Get enabled and ready providers using centralized use case
    const readyProviders = this.getEnabledProvidersUseCase.execute(
      CapabilityType.MEDIA_EXTERNAL_IDS
    )

    // Extract capabilities
    const capabilities = readyProviders
      .map(p => p.getCapability<IMediaExternalIdsCapability>(CapabilityType.MEDIA_EXTERNAL_IDS))
      .filter((c): c is IMediaExternalIdsCapability => c !== null)

    if (capabilities.length === 0) {
      this.logger.warn('No providers support MEDIA_EXTERNAL_IDS capability', {
        mediaId: media.stableId,
      })
      return media.externalIds
    }

    this.logger.info('Fetching external IDs from providers', {
      mediaId: media.stableId,
      providerCount: capabilities.length,
    })

    // Fetch from all providers in parallel - using Result pattern
    const results = await Promise.all(
      capabilities.map((capability) => capability.getExternalIds(media))
    )

    // Merge all successful results
    let mergedIds = media.externalIds

    for (const result of results) {
      if (result.success) {
        mergedIds = mergedIds.merge(result.data)

        // Early exit optimization: stop when we have key IDs (IMDB + TMDB + Trakt)
        if (mergedIds.imdb && mergedIds.tmdb && mergedIds.trakt) {
          this.logger.info('Early exit: all key external IDs resolved', {
            mediaId: media.stableId,
            hasImdb: !!mergedIds.imdb,
            hasTmdb: !!mergedIds.tmdb,
            hasTrakt: !!mergedIds.trakt,
          })
          break
        }
      } else {
        this.logger.warn('Provider failed to fetch external IDs', {
          mediaId: media.stableId,
          providerId: result.providerId,
          reason: result.reason,
          error: result.error.message,
        })
      }
    }

    this.logger.info('External IDs resolved successfully', {
      mediaId: media.stableId,
      hasImdb: !!mergedIds.imdb,
      hasTmdb: !!mergedIds.tmdb,
      hasTrakt: !!mergedIds.trakt,
      hasTvdb: !!mergedIds.tvdb,
      hasStremio: !!mergedIds.stremio,
    })

    return mergedIds
  }
}