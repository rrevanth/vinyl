import type { Catalog } from '@/src/domain/entities/Catalog'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'

/**
 * Use case that returns the full set of media catalogs exposed by all enabled providers.
 * Consumers can combine this list with user preferences to surface selectable catalogs.
 */
export class GetAvailableCatalogsUseCase {
  constructor(
    private readonly providerRegistry: IProviderRegistry,
    private readonly loggingService: ILoggingService
  ) {}

  async execute(): Promise<Catalog[]> {
    const capabilities = this.providerRegistry
      .getProvidersForCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG, true)

    const seen = new Set<string>()
    const catalogs: Catalog[] = []

    for (const capability of capabilities) {
      try {
        // Use page 0 to fetch metadata only (no items, fast)
        const providerCatalogs = await capability.getCatalogs({ page: 0 })
        for (const catalog of providerCatalogs) {
          if (seen.has(catalog.stableId)) {
            continue
          }

          catalogs.push(catalog)
          seen.add(catalog.stableId)
        }
      } catch (error) {
        this.loggingService.warn('Failed to enumerate provider catalogs for homescreen settings', {
          error: (error as Error).message,
        })
      }
    }

    return catalogs
  }
}
