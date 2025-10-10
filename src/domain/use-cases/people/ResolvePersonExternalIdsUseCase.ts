import type { Person } from '@/src/domain/entities/Person'
import type { ExternalIds } from '@/src/domain/entities/ExternalIds'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { IPeopleExternalIdsCapability } from '@/src/domain/capabilities/IPeopleExternalIdsCapability'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'
import type { Result } from '@/src/domain/types/Result'
import { ok } from '@/src/domain/types/Result'

/**
 * Use case for resolving person external IDs from all enabled providers
 * Fetches in parallel and merges results with early exit optimization
 */
export class ResolvePersonExternalIdsUseCase {
  constructor(
    private providerRegistry: IProviderRegistry,
    private userService: IUserService,
    private logger: ILoggingService,
    private getEnabledProvidersUseCase: GetEnabledProvidersForCapabilityUseCase
  ) {}

  /**
   * Execute the use case to resolve external IDs
   * @param person - The person to resolve external IDs for
   * @returns Result containing merged ExternalIds from all providers
   */
  async execute(person: Person): Promise<Result<ExternalIds>> {
    this.logger.info('Resolving external IDs for person', {
      personId: person.stableId,
      name: person.name,
    })

    // Get enabled and ready providers using centralized use case
    const readyProviders = this.getEnabledProvidersUseCase.execute(
      CapabilityType.PEOPLE_EXTERNAL_IDS
    )

    // Extract capabilities
    const capabilities = readyProviders
      .map(p => p.getCapability<IPeopleExternalIdsCapability>(CapabilityType.PEOPLE_EXTERNAL_IDS))
      .filter((c): c is IPeopleExternalIdsCapability => c !== null)

    if (capabilities.length === 0) {
      this.logger.warn('No providers support PEOPLE_EXTERNAL_IDS capability', {
        personId: person.stableId,
      })
      return ok(person.externalIds, 'system', { reason: 'no_providers' })
    }

    this.logger.info('Fetching external IDs from providers', {
      personId: person.stableId,
      providerCount: capabilities.length,
    })

    // Fetch from all providers in parallel - using Result pattern
    const results = await Promise.all(
      capabilities.map((capability) => capability.getExternalIds(person))
    )

    // Merge all successful results
    let mergedIds = person.externalIds

    for (const result of results) {
      if (result.success) {
        mergedIds = mergedIds.merge(result.data)

        // Early exit optimization: stop when we have key IDs (IMDB + TMDB + Trakt)
        if (mergedIds.imdb && mergedIds.tmdb && mergedIds.trakt) {
          this.logger.info('Early exit: all key external IDs resolved', {
            personId: person.stableId,
            hasImdb: !!mergedIds.imdb,
            hasTmdb: !!mergedIds.tmdb,
            hasTrakt: !!mergedIds.trakt,
          })
          break
        }
      } else {
        this.logger.warn('Provider failed to fetch external IDs', {
          personId: person.stableId,
          providerId: result.providerId,
          reason: result.reason,
          error: result.error.message,
        })
      }
    }

    this.logger.info('External IDs resolved successfully', {
      personId: person.stableId,
      hasImdb: !!mergedIds.imdb,
      hasTmdb: !!mergedIds.tmdb,
      hasTrakt: !!mergedIds.trakt,
      hasTvdb: !!mergedIds.tvdb,
      hasStremio: !!mergedIds.stremio,
    })

    return ok(mergedIds, 'system', {
      providersUsed: results.filter(r => r.success).map(r => r.providerId),
      earlyExit: mergedIds.imdb && mergedIds.tmdb && mergedIds.trakt,
    })
  }
}
