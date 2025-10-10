import { Person } from '@/src/domain/entities/Person'
import type { ExternalIds } from '@/src/domain/entities/ExternalIds'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IPeopleMetadataCapability } from '@/src/domain/capabilities/IPeopleMetadataCapability'
import type { IPeopleFilmographyCapability } from '@/src/domain/capabilities/IPeopleFilmographyCapability'
import type {
  IPeopleImagesCapability,
  PersonImage,
} from '@/src/domain/capabilities/IPeopleImagesCapability'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'
import type { ResolvePersonExternalIdsUseCase } from './ResolvePersonExternalIdsUseCase'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import type { Result } from '@/src/domain/types/Result'

/**
 * Complete person detail data interface
 * Combines data from all enrichment capabilities
 */
export interface PersonDetailData {
  // Core data
  person: Person
  externalIds: ExternalIds

  // Enriched data
  enrichments: {
    metadata: Person | null // Biography, birthdate, deathdate, etc.
    filmography: Catalog[] | null // Known for credits
    images: PersonImage[] | null // Profile images
  }

  // Metadata
  providersUsed: {
    metadata: string[]
    filmography: string[]
    images: string[]
  }
  errors: {
    metadata?: string
    filmography?: string
    images?: string
  }
}

/**
 * Centralized use case for fetching all person detail data
 * Orchestrates resolution and enrichment following CLEAN architecture
 *
 * Execution pattern:
 * 1. Step 1: Resolve external IDs (blocking - needed for everything)
 * 2. Step 2: Parallel fetch enriched metadata + filmography + images
 * 3. Return combined PersonDetailData
 */
export class GetPersonDetailUseCase {
  constructor(
    private resolvePersonExternalIdsUseCase: ResolvePersonExternalIdsUseCase,
    private getEnabledProvidersUseCase: GetEnabledProvidersForCapabilityUseCase,
    private logger: ILoggingService
  ) {}

  /**
   * Execute the use case to fetch all person detail data
   * @param person - The person to fetch details for
   * @returns Complete PersonDetailData with all fetched information
   */
  async execute(person: Person): Promise<PersonDetailData> {
    this.logger.info('Fetching complete person detail data', {
      personId: person.stableId,
      name: person.name,
    })

    // Step 1: Resolve external IDs (blocking - needed for all enrichment)
    this.logger.info('Step 1: Resolving external IDs', {
      personId: person.stableId,
    })

    const externalIdsResult = await this.resolvePersonExternalIdsUseCase.execute(person)

    if (!externalIdsResult.success) {
      this.logger.error('Failed to resolve external IDs', externalIdsResult.error as Error, {
        personId: person.stableId,
        reason: externalIdsResult.reason,
      })

      // Return minimal data structure on external IDs failure
      return {
        person,
        externalIds: person.externalIds,
        enrichments: {
          metadata: null,
          filmography: null,
          images: null,
        },
        providersUsed: {
          metadata: [],
          filmography: [],
          images: [],
        },
        errors: {
          metadata: externalIdsResult.error.message,
        },
      }
    }

    const externalIds = externalIdsResult.data

    this.logger.info('External IDs resolved', {
      personId: person.stableId,
      hasImdb: !!externalIds.imdb,
      hasTmdb: !!externalIds.tmdb,
      hasTrakt: !!externalIds.trakt,
    })

    // Step 2: Parallel fetch enriched metadata + filmography + images
    this.logger.info('Step 2: Fetching enriched data in parallel', {
      personId: person.stableId,
    })

    // Create person with resolved external IDs for capability calls
    const enrichedPerson = person.update({
      name: person.name,
      images: person.images,
      knownForDepartment: person.knownForDepartment,
    })

    // Use the enriched person with resolved IDs for all subsequent calls
    const personWithIds = new Person({
      externalIds,
      name: enrichedPerson.name,
      images: enrichedPerson.images,
      knownForDepartment: enrichedPerson.knownForDepartment,
      createdAt: enrichedPerson.createdAt,
      updatedAt: enrichedPerson.updatedAt,
    })

    const [metadataResult, filmographyResult, imagesResult] = await Promise.all([
      this.fetchMetadata(personWithIds),
      this.fetchFilmography(personWithIds),
      this.fetchImages(personWithIds),
    ])

    // Handle metadata result
    let metadata: Person | null = null
    let metadataProvidersUsed: string[] = []
    const errors: Record<string, string> = {}

    if (!metadataResult.success) {
      this.logger.warn('Failed to fetch person metadata', {
        personId: person.stableId,
        reason: metadataResult.reason,
        error: metadataResult.error.message,
      })
      errors.metadata = metadataResult.error.message
    } else {
      metadata = metadataResult.data
      metadataProvidersUsed = [metadataResult.providerId]
    }

    // Handle filmography result
    let filmography: Catalog[] | null = null
    let filmographyProvidersUsed: string[] = []

    if (!filmographyResult.success) {
      this.logger.warn('Failed to fetch person filmography', {
        personId: person.stableId,
        reason: filmographyResult.reason,
        error: filmographyResult.error.message,
      })
      errors.filmography = filmographyResult.error.message
    } else {
      filmography = filmographyResult.data
      filmographyProvidersUsed = [filmographyResult.providerId]
    }

    // Handle images result
    let images: PersonImage[] | null = null
    let imagesProvidersUsed: string[] = []

    if (!imagesResult.success) {
      this.logger.warn('Failed to fetch person images', {
        personId: person.stableId,
        reason: imagesResult.reason,
        error: imagesResult.error.message,
      })
      errors.images = imagesResult.error.message
    } else {
      images = imagesResult.data
      imagesProvidersUsed = [imagesResult.providerId]
    }

    this.logger.info('Person detail data fetching completed', {
      personId: person.stableId,
      hasMetadata: !!metadata,
      hasFilmography: !!filmography && filmography.length > 0,
      hasImages: !!images && images.length > 0,
    })

    // Step 3: Return combined PersonDetailData
    return {
      // Core data
      person,
      externalIds,

      // Enriched data
      enrichments: {
        metadata,
        filmography,
        images,
      },

      // Metadata
      providersUsed: {
        metadata: metadataProvidersUsed,
        filmography: filmographyProvidersUsed,
        images: imagesProvidersUsed,
      },
      errors,
    }
  }

  /**
   * Fetch enriched person metadata from enabled providers
   */
  private async fetchMetadata(person: Person): Promise<Result<Person>> {
    // Get enabled providers for metadata
    const providers = this.getEnabledProvidersUseCase.execute(CapabilityType.PEOPLE_METADATA)

    if (providers.length === 0) {
      return {
        success: false,
        error: new Error('No providers enabled for people metadata'),
        providerId: 'system',
        reason: 'unsupported',
      }
    }

    // Try each provider until one succeeds
    for (const provider of providers) {
      const capability = provider.getCapability<IPeopleMetadataCapability>(
        CapabilityType.PEOPLE_METADATA
      )

      if (!capability) continue

      try {
        const result = await capability.getPersonMetadata(person)
        if (result.success) {
          return result
        }
      } catch (error) {
        this.logger.warn('Provider threw error fetching person metadata', {
          providerId: provider.metadata.id,
          personId: person.stableId,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }

    return {
      success: false,
      error: new Error('All providers failed to fetch person metadata'),
      providerId: 'system',
      reason: 'api_error',
    }
  }

  /**
   * Fetch person filmography from enabled providers
   */
  private async fetchFilmography(person: Person): Promise<Result<Catalog[]>> {
    // Get enabled providers for filmography
    const providers = this.getEnabledProvidersUseCase.execute(CapabilityType.PEOPLE_FILMOGRAPHY)

    if (providers.length === 0) {
      return {
        success: false,
        error: new Error('No providers enabled for people filmography'),
        providerId: 'system',
        reason: 'unsupported',
      }
    }

    // Try each provider until one succeeds
    for (const provider of providers) {
      const capability = provider.getCapability<IPeopleFilmographyCapability>(
        CapabilityType.PEOPLE_FILMOGRAPHY
      )

      if (!capability) continue

      try {
        const result = await capability.getFilmography(person)
        if (result.success) {
          return result
        }
      } catch (error) {
        this.logger.warn('Provider threw error fetching person filmography', {
          providerId: provider.metadata.id,
          personId: person.stableId,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }

    return {
      success: false,
      error: new Error('All providers failed to fetch person filmography'),
      providerId: 'system',
      reason: 'api_error',
    }
  }

  /**
   * Fetch person images from enabled providers
   */
  private async fetchImages(person: Person): Promise<Result<PersonImage[]>> {
    // Get enabled providers for images
    const providers = this.getEnabledProvidersUseCase.execute(CapabilityType.PEOPLE_IMAGES)

    if (providers.length === 0) {
      return {
        success: false,
        error: new Error('No providers enabled for people images'),
        providerId: 'system',
        reason: 'unsupported',
      }
    }

    // Try each provider until one succeeds
    for (const provider of providers) {
      const capability = provider.getCapability<IPeopleImagesCapability>(
        CapabilityType.PEOPLE_IMAGES
      )

      if (!capability) continue

      try {
        const result = await capability.getImages(person)
        if (result.success) {
          return result
        }
      } catch (error) {
        this.logger.warn('Provider threw error fetching person images', {
          providerId: provider.metadata.id,
          personId: person.stableId,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }

    return {
      success: false,
      error: new Error('All providers failed to fetch person images'),
      providerId: 'system',
      reason: 'api_error',
    }
  }
}
