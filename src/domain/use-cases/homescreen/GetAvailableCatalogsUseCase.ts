import type { Catalog } from '@/src/domain/entities/Catalog'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'

/**
 * Use case that returns the full set of media catalogs exposed by all enabled providers.
 * Consumers can combine this list with user preferences to surface selectable catalogs.
 */
export class GetAvailableCatalogsUseCase {
  constructor(
    private readonly providerRegistry: IProviderRegistry,
    private readonly userService: IUserService,
    private readonly loggingService: ILoggingService,
    private readonly getEnabledProvidersUseCase: GetEnabledProvidersForCapabilityUseCase
  ) {}

  async execute(): Promise<Catalog[]> {
    // Get enabled and ready providers for MEDIA_CATALOG capability
    const readyProviders = this.getEnabledProvidersUseCase.execute(CapabilityType.MEDIA_CATALOG)

    // Extract capabilities
    const capabilities = readyProviders
      .map(p => p.getCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG))
      .filter((c): c is IMediaCatalogCapability => c !== null)

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
