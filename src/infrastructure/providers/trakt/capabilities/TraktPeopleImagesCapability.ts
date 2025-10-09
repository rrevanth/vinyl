import type { IPeopleImagesCapability, PersonImage } from '@/src/domain/capabilities/IPeopleImagesCapability'
import type { Person } from '@/src/domain/entities/Person'
import type { TraktDetailCache } from '@/src/infrastructure/providers/trakt/cache/TraktDetailCache'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { PersonImageType } from '@/src/domain/capabilities/IPeopleImagesCapability'
import { ok, fail, type Result } from '@/src/domain/types/Result'

/**
 * Trakt People Images Capability
 *
 * Provides profile photos and headshots for people using Trakt's image data.
 * Extracts images from cached person details.
 */
export class TraktPeopleImagesCapability implements IPeopleImagesCapability {
  constructor(
    private readonly detailCache: TraktDetailCache,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get images for a person (profile photos, headshots)
   */
  async getImages(person: Person): Promise<Result<PersonImage[]>> {
    const traktId = this.extractTraktId(person)
    if (!traktId) {
      this.logger.warn(`No Trakt ID found for person: ${person.name}`)
      return fail(new Error(`No Trakt ID found for person: ${person.name}`), 'trakt', 'missing_id')
    }

    try {
      // Get person details from cache (includes images)
      const traktPerson = await this.detailCache.getOrFetchPersonDetails(traktId)

      const images: PersonImage[] = []

      // Process headshot images from Trakt
      if (traktPerson.images?.headshot && traktPerson.images.headshot.length > 0) {
        traktPerson.images.headshot.forEach((imageUrl, index) => {
          // Ensure URL is absolute
          const fullUrl = imageUrl.startsWith('http') ? imageUrl : `https://${imageUrl}`

          // Create PersonImage object
          images.push({
            filePath: fullUrl,
            imageType: PersonImageType.HEADSHOT,
            aspectRatio: 0.667, // Standard headshot ratio (2:3)
            width: 300, // Trakt typically provides this size
            height: 450,
            voteAverage: 0, // Trakt doesn't provide vote data for images
            voteCount: 0,
            language: undefined, // Trakt doesn't specify image language
          })
        })
      }

      this.logger.debug(`Retrieved ${images.length} images for person ${traktId}`, {
        name: traktPerson.name,
      })

      return ok(images, 'trakt', { cached: false })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get images for person: ${person.name}`, err)
      return fail(err, 'trakt', 'api_error')
    }
  }

  /**
   * Extract Trakt ID from person's external IDs
   */
  private extractTraktId(person: Person): number | null {
    if (person.externalIds.trakt?.id) {
      const id = parseInt(person.externalIds.trakt.id)
      if (!isNaN(id)) {
        return id
      }
    }

    this.logger.warn(`No Trakt ID found for person: ${person.name}`)
    return null
  }
}