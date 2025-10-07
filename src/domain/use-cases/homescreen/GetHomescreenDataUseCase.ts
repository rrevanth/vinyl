import { Catalog } from '@/src/domain/entities/Catalog'
import type { ContinueWatchingItem , IMediaContinueWatchingCapability } from '@/src/domain/capabilities/IMediaContinueWatchingCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { UserPreferences } from '@/src/domain/entities/UserPreferences'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'

/**
 * Response containing all homescreen data sections
 */
export interface HomescreenData {
  readonly heroItems: Media[]
  readonly continueWatching: ContinueWatchingItem[]
  readonly catalogs: Catalog[]
  readonly cacheStatus: {
    readonly isStale: boolean
    readonly lastRefreshed: Date | null
  }
}

/**
 * Parameters for customizing homescreen data retrieval
 */
export interface GetHomescreenDataParams {
  readonly heroLimit?: number
  readonly continueWatchingLimit?: number
  readonly itemsPerCatalog?: number
}

/**
 * Lightweight orchestration layer that gathers homescreen data from providers.
 * Smart ranking/caching will be added in later iterations; for now we surface
 * provider output as-is, scoped by user preferences.
 */
export class GetHomescreenDataUseCase {
  constructor(
    private readonly providerRegistry: IProviderRegistry,
    private readonly userService: IUserService,
    private readonly loggingService: ILoggingService
  ) {}

  async execute(params: GetHomescreenDataParams = {}): Promise<HomescreenData> {
    const preferences = this.userService.getCurrentUserPreferences()

    const [heroItems, continueWatching, catalogs] = await Promise.all([
      this.fetchHeroItems(preferences, params.heroLimit),
      this.fetchContinueWatching(params.continueWatchingLimit),
      this.fetchCatalogs(preferences, params.itemsPerCatalog),
    ])

    return {
      heroItems,
      continueWatching,
      catalogs,
      cacheStatus: {
        isStale: false,
        lastRefreshed: new Date(),
      },
    }
  }

  private async fetchHeroItems(
    preferences: UserPreferences,
    limit?: number
  ): Promise<Media[]> {
    if (!preferences.homescreen.heroEnabled) {
      return []
    }

    const heroLimit = limit ?? 10
    const catalogProviders = this.providerRegistry
      .getProvidersForCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG, true)

    if (catalogProviders.length === 0) {
      this.loggingService.warn('No catalog providers available while building hero section')
      return []
    }

    const aggregated: Media[] = []

    for (const capability of catalogProviders) {
      if (aggregated.length >= heroLimit) {
        break
      }

      try {
        const catalogs = await capability.getCatalogs()
        const heroCatalog = catalogs[0]
        if (!heroCatalog) {
          continue
        }

        const items = heroCatalog.items
          .map((item) => item.media)
          .filter((media): media is Media => !!media)

        if (items.length === 0) {
          continue
        }

        const remaining = heroLimit - aggregated.length
        aggregated.push(...items.slice(0, remaining))
      } catch (error) {
        this.loggingService.warn('Failed to collect hero items from provider', {
          error: (error as Error).message,
        })
      }
    }

    return aggregated.slice(0, heroLimit)
  }

  private async fetchContinueWatching(limit?: number): Promise<ContinueWatchingItem[]> {
    const capabilities = this.providerRegistry
      .getProvidersForCapability<IMediaContinueWatchingCapability>(
        CapabilityType.MEDIA_CONTINUE_WATCHING,
        true
      )

    if (capabilities.length === 0) {
      return []
    }

    try {
      const items = await capabilities[0].getContinueWatching({ limit })
      return items ?? []
    } catch (error) {
      this.loggingService.warn('Failed to load continue watching items', {
        error: (error as Error).message,
      })
      return []
    }
  }

  private async fetchCatalogs(
    preferences: UserPreferences,
    itemsPerCatalog?: number
  ): Promise<Catalog[]> {
    const capabilities = this.providerRegistry
      .getProvidersForCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG, true)

    if (capabilities.length === 0) {
      return []
    }

    const selectedIds = new Set(preferences.homescreen.selectedCatalogIds)
    const desiredOrder = preferences.homescreen.catalogOrder
    const limit = itemsPerCatalog ?? 20

    const discoveredCatalogs: Catalog[] = []
    const seenStableIds = new Set<string>()

    for (const capability of capabilities) {
      try {
        const catalogs = await capability.getCatalogs()
        for (const catalog of catalogs) {
          const shouldInclude = selectedIds.size === 0 || selectedIds.has(catalog.stableId)
          if (!shouldInclude) {
            continue
          }

          const trimmedItems = catalog.items.slice(0, limit)
          if (trimmedItems.length === 0) {
            continue
          }

          const key = catalog.stableId || `${catalog.providerId}:${catalog.id}`
          if (seenStableIds.has(key)) {
            continue
          }

          discoveredCatalogs.push(
            new Catalog({
              id: catalog.id,
              providerId: catalog.providerId,
              type: catalog.type,
              category: catalog.category,
              name: preferences.homescreen.catalogCustomNames[catalog.stableId] ?? catalog.name,
              description: catalog.description,
              items: trimmedItems,
              sourceInfo: catalog.sourceInfo,
              paginationInfo: catalog.paginationInfo,
              contextMedia: catalog.contextMedia,
              contextPerson: catalog.contextPerson,
              filters: catalog.filters,
              createdAt: catalog.createdAt,
              expiresAt: catalog.expiresAt,
            })
          )
          seenStableIds.add(key)
        }
      } catch (error) {
        this.loggingService.warn('Failed to load catalog list for homescreen', {
          error: (error as Error).message,
        })
      }
    }

    if (discoveredCatalogs.length === 0) {
      return []
    }

    if (desiredOrder.length === 0) {
      return discoveredCatalogs
    }

    const orderMap = new Map<string, number>()
    desiredOrder.forEach((id, index) => orderMap.set(id, index))

    return [...discoveredCatalogs].sort((a, b) => {
      const orderA = orderMap.get(a.stableId)
      const orderB = orderMap.get(b.stableId)

      if (orderA === undefined && orderB === undefined) return 0
      if (orderA === undefined) return 1
      if (orderB === undefined) return -1

      return orderA - orderB
    })
  }
}
