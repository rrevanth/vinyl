import { Catalog } from '@/src/domain/entities/Catalog'
import type { ContinueWatchingItem , IMediaContinueWatchingCapability } from '@/src/domain/capabilities/IMediaContinueWatchingCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { UserPreferences } from '@/src/domain/entities/UserPreferences'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'
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
    private readonly loggingService: ILoggingService,
    private readonly getEnabledProvidersUseCase: GetEnabledProvidersForCapabilityUseCase
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

    // Get enabled and ready providers for MEDIA_CATALOG capability
    const readyProviders = this.getEnabledProvidersUseCase.execute(CapabilityType.MEDIA_CATALOG)

    // Extract capabilities
    const catalogProviders = readyProviders
      .map(p => p.getCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG))
      .filter((c): c is IMediaCatalogCapability => c !== null)

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
    // Get enabled and ready providers for MEDIA_CONTINUE_WATCHING capability
    const readyProviders = this.getEnabledProvidersUseCase.execute(CapabilityType.MEDIA_CONTINUE_WATCHING)

    // Extract capabilities
    const capabilities = readyProviders
      .map(p => p.getCapability<IMediaContinueWatchingCapability>(CapabilityType.MEDIA_CONTINUE_WATCHING))
      .filter((c): c is IMediaContinueWatchingCapability => c !== null)

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
    this.loggingService.info('=== START: fetchCatalogs ===', {
      itemsPerCatalog,
      selectedCatalogIds: preferences.homescreen.selectedCatalogIds,
      catalogOrder: preferences.homescreen.catalogOrder,
    })

    // Get enabled and ready providers for MEDIA_CATALOG capability
    const readyProviders = this.getEnabledProvidersUseCase.execute(CapabilityType.MEDIA_CATALOG)

    // Extract capabilities
    const capabilities = readyProviders
      .map(p => p.getCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG))
      .filter((c): c is IMediaCatalogCapability => c !== null)

    this.loggingService.info('Found catalog capabilities', {
      capabilitiesCount: capabilities.length,
      providerIds: capabilities.map((cap) => (cap as any).addon?.id ?? 'unknown'),
    })

    if (capabilities.length === 0) {
      this.loggingService.warn('No catalog capabilities available')
      return []
    }

    const limit = itemsPerCatalog ?? 20

    // Step 1: Fetch metadata for ALL catalogs (page 0 - fast, no items)
    this.loggingService.info('STEP 1: Fetching metadata for all catalogs (page 0)')

    const allMetadataCatalogs: Catalog[] = []
    for (const capability of capabilities) {
      try {
        const metadataCatalogs = await capability.getCatalogs({ page: 0 })
        this.loggingService.debug('Received metadata catalogs from capability', {
          providerId: (capability as any).addon?.id ?? 'unknown',
          catalogCount: metadataCatalogs.length,
          stableIds: metadataCatalogs.map((c) => c.stableId),
        })
        allMetadataCatalogs.push(...metadataCatalogs)
      } catch (error) {
        this.loggingService.warn('Failed to fetch catalog metadata', {
          providerId: (capability as any).addon?.id ?? 'unknown',
          error: (error as Error).message,
          stack: (error as Error).stack,
        })
      }
    }

    this.loggingService.info('STEP 1 COMPLETE: Fetched catalog metadata', {
      totalCatalogs: allMetadataCatalogs.length,
      stableIds: allMetadataCatalogs.map((c) => c.stableId),
      catalogNames: allMetadataCatalogs.map((c) => c.name),
      providerIds: allMetadataCatalogs.map((c) => c.providerId),
    })

    // Step 2: Filter by enabled catalogs (selectedCatalogIds)
    this.loggingService.info('STEP 2: Filtering by enabled catalogs')

    const selectedIds = new Set(preferences.homescreen.selectedCatalogIds)
    const enabledMetadata = selectedIds.size === 0
      ? allMetadataCatalogs // Show all if nothing selected
      : allMetadataCatalogs.filter((catalog) => selectedIds.has(catalog.stableId))

    this.loggingService.info('STEP 2 COMPLETE: Filtered enabled catalogs', {
      selectedCatalogIdsCount: selectedIds.size,
      selectedCatalogIds: Array.from(selectedIds),
      allMetadataCount: allMetadataCatalogs.length,
      enabledCount: enabledMetadata.length,
      enabledStableIds: enabledMetadata.map((c) => c.stableId),
      enabledNames: enabledMetadata.map((c) => c.name),
      filteredOutCount: allMetadataCatalogs.length - enabledMetadata.length,
    })

    if (enabledMetadata.length === 0) {
      this.loggingService.warn('No enabled catalogs after filtering', {
        selectedCatalogIds: Array.from(selectedIds),
        allMetadataStableIds: allMetadataCatalogs.map((c) => c.stableId),
      })
      return []
    }

    // Step 3: Create a map of stableId → capability for efficient lookup
    this.loggingService.info('STEP 3: Mapping stableId to capability')

    const stableIdToCapability = new Map<string, IMediaCatalogCapability>()
    for (const capability of capabilities) {
      try {
        const metadataCatalogs = await capability.getCatalogs({ page: 0 })
        for (const catalog of metadataCatalogs) {
          stableIdToCapability.set(catalog.stableId, capability)
          this.loggingService.debug('Mapped stableId to capability', {
            stableId: catalog.stableId,
            catalogName: catalog.name,
            providerId: catalog.providerId,
          })
        }
      } catch {
        // Already logged in Step 1
      }
    }

    this.loggingService.info('STEP 3 COMPLETE: Created stableId → capability map', {
      mappedStableIds: Array.from(stableIdToCapability.keys()),
      mappingCount: stableIdToCapability.size,
    })

    // Step 4: Fetch items (page 1) ONLY for enabled catalogs
    this.loggingService.info('STEP 4: Fetching items for enabled catalogs (page 1)', {
      enabledCatalogCount: enabledMetadata.length,
      limit,
    })
    const catalogsWithItems: Catalog[] = []
    const seenStableIds = new Set<string>()

    for (const metadata of enabledMetadata) {
      this.loggingService.debug('Processing enabled catalog', {
        stableId: metadata.stableId,
        catalogName: metadata.name,
        providerId: metadata.providerId,
      })

      const capability = stableIdToCapability.get(metadata.stableId)
      if (!capability) {
        this.loggingService.warn('CRITICAL: No capability found for catalog', {
          stableId: metadata.stableId,
          catalogName: metadata.name,
          providerId: metadata.providerId,
          availableStableIds: Array.from(stableIdToCapability.keys()),
        })
        continue
      }

      try {
        // Fetch catalogs with items from this provider (page 1)
        this.loggingService.debug('Fetching page 1 from capability', {
          stableId: metadata.stableId,
          catalogName: metadata.name,
          providerId: metadata.providerId,
          limit,
        })

        const catalogs = await capability.getCatalogs({ page: 1, limit })

        this.loggingService.debug('Received page 1 catalogs', {
          stableId: metadata.stableId,
          catalogsCount: catalogs.length,
          catalogStableIds: catalogs.map((c) => c.stableId),
        })

        // Find the matching catalog by stableId
        const catalogWithItems = catalogs.find(c => c.stableId === metadata.stableId)
        if (!catalogWithItems) {
          this.loggingService.warn('CRITICAL: Catalog not found in page 1 results', {
            requestedStableId: metadata.stableId,
            catalogName: metadata.name,
            receivedStableIds: catalogs.map((c) => c.stableId),
            receivedCount: catalogs.length,
          })
          continue
        }

        this.loggingService.debug('Found matching catalog', {
          stableId: catalogWithItems.stableId,
          catalogName: catalogWithItems.name,
          itemCount: catalogWithItems.items.length,
        })

        if (catalogWithItems.items.length === 0) {
          this.loggingService.warn('Catalog has no items', {
            stableId: metadata.stableId,
            catalogName: metadata.name,
          })
          continue
        }

        // Deduplicate by stableId
        if (seenStableIds.has(catalogWithItems.stableId)) {
          this.loggingService.debug('Skipping duplicate catalog', {
            stableId: catalogWithItems.stableId,
          })
          continue
        }

        // Apply custom name if exists
        const customName = preferences.homescreen.catalogCustomNames[metadata.stableId]
        const finalCatalog = new Catalog({
          id: catalogWithItems.id,
          providerId: catalogWithItems.providerId,
          type: catalogWithItems.type,
          category: catalogWithItems.category,
          name: customName ?? catalogWithItems.name,
          description: catalogWithItems.description,
          items: catalogWithItems.items.slice(0, limit),
          sourceInfo: catalogWithItems.sourceInfo,
          paginationInfo: catalogWithItems.paginationInfo,
          contextMedia: catalogWithItems.contextMedia,
          contextPerson: catalogWithItems.contextPerson,
          filters: catalogWithItems.filters,
          createdAt: catalogWithItems.createdAt,
          expiresAt: catalogWithItems.expiresAt,
        })

        this.loggingService.info('Added catalog to homescreen', {
          stableId: finalCatalog.stableId,
          catalogName: finalCatalog.name,
          customName: customName ?? 'none',
          itemCount: finalCatalog.items.length,
          providerId: finalCatalog.providerId,
        })

        catalogsWithItems.push(finalCatalog)
        seenStableIds.add(catalogWithItems.stableId)
      } catch (error) {
        this.loggingService.error('Failed to load catalog items for homescreen', error as Error, {
          catalogStableId: metadata.stableId,
          catalogName: metadata.name,
          providerId: metadata.providerId,
        })
      }
    }

    this.loggingService.info('STEP 4 COMPLETE: Fetched catalogs with items', {
      requestedCount: enabledMetadata.length,
      successfulCount: catalogsWithItems.length,
      failedCount: enabledMetadata.length - catalogsWithItems.length,
      stableIds: catalogsWithItems.map((c) => c.stableId),
      catalogNames: catalogsWithItems.map((c) => c.name),
    })

    if (catalogsWithItems.length === 0) {
      this.loggingService.warn('No catalogs with items after fetching', {
        enabledMetadataCount: enabledMetadata.length,
        enabledStableIds: enabledMetadata.map((c) => c.stableId),
      })
      return []
    }

    // Step 5: Sort by catalogOrder (existing logic is correct)
    this.loggingService.info('STEP 5: Sorting catalogs by user order')

    const catalogOrder = preferences.homescreen.catalogOrder
    if (catalogOrder.length === 0) {
      this.loggingService.info('No catalog order specified - returning unsorted')
      return catalogsWithItems
    }

    const orderMap = new Map<string, number>()
    catalogOrder.forEach((id, index) => orderMap.set(id, index))

    const sortedCatalogs = [...catalogsWithItems].sort((a, b) => {
      const orderA = orderMap.get(a.stableId)
      const orderB = orderMap.get(b.stableId)

      if (orderA === undefined && orderB === undefined) return 0
      if (orderA === undefined) return 1
      if (orderB === undefined) return -1

      return orderA - orderB
    })

    this.loggingService.info('STEP 5 COMPLETE: Sorted catalogs by user order', {
      catalogOrder,
      sortedStableIds: sortedCatalogs.map((c) => c.stableId),
      sortedNames: sortedCatalogs.map((c) => c.name),
    })

    this.loggingService.info('=== END: fetchCatalogs ===', {
      finalCatalogCount: sortedCatalogs.length,
      finalStableIds: sortedCatalogs.map((c) => c.stableId),
    })

    return sortedCatalogs
  }
}
