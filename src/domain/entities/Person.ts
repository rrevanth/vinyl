import { ExternalIds } from './ExternalIds'
import { StableIdGenerator } from './StableIdGenerator'

/**
 * Images for people with different contexts
 */
export class PersonImages {
  // Primary images
  public readonly profile?: string // Main profile photo
  public readonly headshot?: string // Professional headshot

  // Alternative images
  public readonly profileAlternatives?: string[] // Multiple profile options

  // Thumbnails for performance
  public readonly profileThumbnail?: string // Small profile for lists

  // Quality indicators
  public readonly profileQuality?: 'low' | 'medium' | 'high' | 'original'

  constructor(
    data: Partial<{
      profile: string
      headshot: string
      profileAlternatives: string[]
      profileThumbnail: string
      profileQuality: 'low' | 'medium' | 'high' | 'original'
    }> = {}
  ) {
    this.profile = data.profile
    this.headshot = data.headshot
    this.profileAlternatives = data.profileAlternatives
    this.profileThumbnail = data.profileThumbnail
    this.profileQuality = data.profileQuality
  }

  /**
   * Get the best available profile URL
   */
  getBestProfile(): string | undefined {
    return this.profile || this.headshot || this.profileAlternatives?.[0] || this.profileThumbnail
  }

  /**
   * Check if any images are available
   */
  hasAnyImage(): boolean {
    return !!(
      this.profile ||
      this.headshot ||
      this.profileAlternatives?.length ||
      this.profileThumbnail
    )
  }

  /**
   * Serialize to JSON for cache persistence
   */
  toJSON() {
    return {
      profile: this.profile,
      headshot: this.headshot,
      profileAlternatives: this.profileAlternatives,
      profileThumbnail: this.profileThumbnail,
      profileQuality: this.profileQuality,
    }
  }

  /**
   * Deserialize from JSON to restore class instance with methods
   */
  static fromJSON(data: any): PersonImages {
    return new PersonImages(data)
  }
}

/**
 * Minimal Person entity optimized for TanStack Query caching
 * Contains only essential data needed for UI rendering and identification
 * Detailed enrichment data (biography, filmography) is managed separately in Legend State
 */
export class Person {
  // Stable Identity (REQUIRED for efficient Legend List rendering)
  public readonly stableId: string

  // Core Identity (REQUIRED for provider lookups)
  public readonly externalIds: ExternalIds

  // Basic Metadata (REQUIRED for UI display)
  public readonly name: string

  // Images (flexible for different UI contexts)
  public readonly images: PersonImages

  // Professional info
  public readonly knownForDepartment?: string // 'Acting', 'Directing', 'Writing', etc.

  // Metadata tracking
  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor(data: {
    externalIds: ExternalIds
    name: string
    images?: PersonImages
    knownForDepartment?: string
    createdAt?: Date
    updatedAt?: Date
  }) {
    // Generate stable ID from external IDs
    this.stableId = StableIdGenerator.forPerson(data.externalIds)

    this.externalIds = data.externalIds
    this.name = data.name
    this.images = data.images || new PersonImages()
    this.knownForDepartment = data.knownForDepartment

    const now = new Date()
    this.createdAt = data.createdAt || now
    this.updatedAt = data.updatedAt || now
  }

  /**
   * Create a new Person instance with updated data
   */
  update(
    updates: Partial<{
      name: string
      images: PersonImages
      knownForDepartment: string
    }>
  ): Person {
    return new Person({
      externalIds: this.externalIds,
      name: updates.name ?? this.name,
      images: updates.images ?? this.images,
      knownForDepartment: updates.knownForDepartment ?? this.knownForDepartment,
      createdAt: this.createdAt,
      updatedAt: new Date(),
    })
  }

  /**
   * Get display name with department if available
   */
  getDisplayName(): string {
    return this.knownForDepartment ? `${this.name} (${this.knownForDepartment})` : this.name
  }

  /**
   * Check if this person is primarily an actor
   */
  isActor(): boolean {
    return this.knownForDepartment === 'Acting'
  }

  /**
   * Check if this person is primarily a director
   */
  isDirector(): boolean {
    return this.knownForDepartment === 'Directing'
  }

  /**
   * Check if this person is primarily a writer
   */
  isWriter(): boolean {
    return this.knownForDepartment === 'Writing'
  }

  /**
   * Serialize to JSON for cache persistence
   * Converts nested entities and Dates to JSON-safe format
   */
  toJSON() {
    return {
      stableId: this.stableId,
      externalIds: this.externalIds.toJSON(),
      name: this.name,
      images: this.images.toJSON(),
      knownForDepartment: this.knownForDepartment,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    }
  }

  /**
   * Deserialize from JSON to restore class instance with methods
   * Reconstructs nested PersonImages and ExternalIds instances
   */
  static fromJSON(data: any): Person {
    return new Person({
      externalIds: ExternalIds.fromJSON(data.externalIds),
      name: data.name,
      images: PersonImages.fromJSON(data.images),
      knownForDepartment: data.knownForDepartment,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    })
  }
}
