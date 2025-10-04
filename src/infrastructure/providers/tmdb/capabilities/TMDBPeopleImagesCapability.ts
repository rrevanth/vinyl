import type {
  IPeopleImagesCapability,
  PersonImage,
} from '../../../../domain/capabilities/IPeopleImagesCapability'
import type { Person } from '../../../../domain/entities/Person'
import type { TMDBDetailCache } from '../cache/TMDBDetailCache'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'

/**
 * TMDB People Images Capability
 *
 * Extracts person images from cached person details including profile photos
 * and tagged images from movies/shows they've appeared in.
 */
export class TMDBPeopleImagesCapability implements IPeopleImagesCapability {
  constructor(
    private readonly cache: TMDBDetailCache,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get images for a person
   */
  async getImages(person: Person): Promise<PersonImage[]> {
    try {
      // Extract TMDB ID from person's external IDs
      const tmdbId = this.extractTMDBId(person)
      if (!tmdbId) {
        throw new Error(`No TMDB ID found for person: ${person.name}`)
      }

      // Get cached person details with images
      const personDetails = await this.cache.getOrFetchPersonDetails(tmdbId)

      // Extract and map images from TMDB response
      const personImages = this.mapTMDBImagesToPersonImages(personDetails)

      this.logger.debug(`Retrieved ${personImages.length} images for person ${tmdbId}`, {
        name: person.name,
        profileCount: personImages.filter((img) => img.imageType === 'profile').length,
        taggedImageCount: personImages.filter((img) => img.imageType !== 'profile').length,
      })

      return personImages
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Failed to get images for person: ${person.name}`, err)
      throw err
    }
  }

  /**
   * Map TMDB person response to PersonImage array
   */
  private mapTMDBImagesToPersonImages(tmdbPerson: any): PersonImage[] {
    const images: PersonImage[] = []

    // Process profile images
    if (tmdbPerson.images?.profiles) {
      const profileImages = tmdbPerson.images.profiles.map((profile: any) => ({
        aspectRatio: profile.aspect_ratio,
        height: profile.height,
        width: profile.width,
        language: profile.iso_639_1,
        filePath: this.buildImageUrl(profile.file_path, 'original'),
        voteAverage: profile.vote_average,
        voteCount: profile.vote_count,
        imageType: 'profile' as const,
      }))
      images.push(...profileImages)
    }

    // Process tagged images
    if (tmdbPerson.tagged_images?.results) {
      const taggedImages = tmdbPerson.tagged_images.results.map((taggedImage: any) => ({
        aspectRatio: taggedImage.aspect_ratio,
        height: taggedImage.height,
        width: taggedImage.width,
        language: taggedImage.iso_639_1,
        filePath: this.buildImageUrl(taggedImage.file_path, 'original'),
        voteAverage: taggedImage.vote_average,
        voteCount: taggedImage.vote_count,
        imageType: 'candid' as const, // Tagged images are usually candid shots
      }))
      images.push(...taggedImages)
    }

    return images
  }

  /**
   * Build full image URL with TMDB base URL
   */
  private buildImageUrl(imagePath: string, size: string): string {
    if (!imagePath) return ''
    const baseUrl = 'https://image.tmdb.org/t/p/'
    return `${baseUrl}${size}${imagePath}`
  }

  /**
   * Extract TMDB ID from person's external IDs
   */
  private extractTMDBId(person: Person): number | null {
    if (person.externalIds.tmdb?.id) {
      const id = parseInt(person.externalIds.tmdb.id)
      if (!isNaN(id)) {
        return id
      }
    }

    this.logger.warn(`No TMDB ID found for person: ${person.name}`)
    return null
  }
}
