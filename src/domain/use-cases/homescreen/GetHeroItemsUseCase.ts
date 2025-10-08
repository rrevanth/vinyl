import type { Media } from '@/src/domain/entities/Media'
import type { CatalogFilters } from '@/src/domain/entities/StableIdGenerator'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'

/**
 * Parameters for customizing hero items retrieval
 */
export interface GetHeroItemsParams {
  /** Maximum number of hero items to return */
  readonly limit?: number
  /** Specific content types to include */
  readonly contentTypes?: readonly ('movie' | 'series')[]
  /** Specific catalog filters to forward to providers */
  readonly filters?: CatalogFilters
}

/**
 * Result containing hero items and metadata
 */
export interface GetHeroItemsResult {
  /** Selected hero items for display */
  readonly heroItems: Media[]
  /** Total number of available hero items across all sources */
  readonly totalAvailable: number
  /** Sources that contributed to hero items */
  readonly sources: readonly {
    readonly providerId: string
    readonly category: string
    readonly itemCount: number
  }[]
  /** Whether data was loaded from cache */
  readonly fromCache: boolean
  /** Cache expiration time (null when no cache layer is used) */
  readonly expiresAt: Date | null
}

/**
 * Lightweight implementation that surfaces catalog items for the hero section.
 * Smart filtering/scoring will be added later; currently we return the first
 * matching items for the enabled providers, respecting user preferences.
 */
export class GetHeroItemsUseCase {
  constructor(
    private readonly providerRegistry: IProviderRegistry,
    private readonly userService: IUserService,
    private readonly loggingService: ILoggingService,
    private readonly getEnabledProvidersUseCase: GetEnabledProvidersForCapabilityUseCase
  ) {}

  async execute(params: GetHeroItemsParams = {}): Promise<GetHeroItemsResult> {
    const preferences = this.userService.getCurrentUserPreferences()

    if (!preferences.homescreen.heroEnabled) {
      return this.createEmptyResult()
    }

    const limit = params.limit ?? 10

    // Get enabled and ready providers for MEDIA_CATALOG capability
    const readyProviders = this.getEnabledProvidersUseCase.execute(CapabilityType.MEDIA_CATALOG)

    // Extract capabilities
    const capabilities = readyProviders
      .map(p => p.getCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG))
      .filter((c): c is IMediaCatalogCapability => c !== null)

    if (capabilities.length === 0) {
      this.loggingService.warn('No catalog providers available for hero items')
      return this.createEmptyResult()
    }

    const aggregated: Media[] = []
    const sources: { providerId: string; category: string; itemCount: number }[] = []

    for (const capability of capabilities) {
      if (aggregated.length >= limit) {
        break
      }

      try {
        const catalogs = await capability.getCatalogs(params.filters)
        const heroCatalog = this.pickHeroCatalog(catalogs)
        if (!heroCatalog) {
          continue
        }

        const candidateItems = heroCatalog.items
          .map((item) => item.media)
          .filter((media): media is Media => !!media)
          .filter((media) => this.matchesContentType(media, params.contentTypes))

        if (candidateItems.length === 0) {
          continue
        }

        const remaining = limit - aggregated.length
        aggregated.push(...candidateItems.slice(0, remaining))
        sources.push({
          providerId: heroCatalog.providerId,
          category: heroCatalog.category,
          itemCount: Math.min(candidateItems.length, remaining),
        })
      } catch (error) {
        this.loggingService.warn('Failed to fetch hero catalog', {
          error: (error as Error).message,
        })
      }
    }

    return {
      heroItems: aggregated.slice(0, limit),
      totalAvailable: aggregated.length,
      sources,
      fromCache: false,
      expiresAt: null,
    }
  }

  private pickHeroCatalog(
    catalogs: Awaited<ReturnType<IMediaCatalogCapability['getCatalogs']>>
  ) {
    const heroCategoryOrder = ['featured', 'hero', 'trending', 'popular', 'top_rated']
    for (const category of heroCategoryOrder) {
      const match = catalogs.find((catalog) => catalog.category.toLowerCase() === category)
      if (match) {
        return match
      }
    }
    return catalogs[0]
  }

  private matchesContentType(media: Media, contentTypes?: readonly ('movie' | 'series')[]): boolean {
    if (!contentTypes || contentTypes.length === 0) {
      return true
    }
    return contentTypes.includes(media.type)
  }

  private createEmptyResult(): GetHeroItemsResult {
    return {
      heroItems: [],
      totalAvailable: 0,
      sources: [],
      fromCache: false,
      expiresAt: null,
    }
  }
}
