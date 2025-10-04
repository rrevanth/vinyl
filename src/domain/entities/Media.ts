import type { ExternalIds } from './ExternalIds'
import { StableIdGenerator } from './StableIdGenerator'

/**
 * Images for media content with flexible quality options
 */
export class MediaImages {
  // Primary images for different UI contexts
  public readonly poster?: string // Vertical poster (2:3 ratio)
  public readonly backdrop?: string // Horizontal landscape (16:9 ratio)
  public readonly logo?: string // Transparent logo overlay

  // Alternative images
  public readonly posterAlternatives?: string[] // Multiple poster options
  public readonly backdropAlternatives?: string[] // Multiple backdrop options

  // Thumbnails for performance
  public readonly posterThumbnail?: string // Small poster for lists
  public readonly backdropThumbnail?: string // Small backdrop for cards

  // Quality indicators
  public readonly posterQuality?: 'low' | 'medium' | 'high' | 'original'
  public readonly backdropQuality?: 'low' | 'medium' | 'high' | 'original'

  constructor(
    data: Partial<{
      poster: string
      backdrop: string
      logo: string
      posterAlternatives: string[]
      backdropAlternatives: string[]
      posterThumbnail: string
      backdropThumbnail: string
      posterQuality: 'low' | 'medium' | 'high' | 'original'
      backdropQuality: 'low' | 'medium' | 'high' | 'original'
    }> = {}
  ) {
    this.poster = data.poster
    this.backdrop = data.backdrop
    this.logo = data.logo
    this.posterAlternatives = data.posterAlternatives
    this.backdropAlternatives = data.backdropAlternatives
    this.posterThumbnail = data.posterThumbnail
    this.backdropThumbnail = data.backdropThumbnail
    this.posterQuality = data.posterQuality
    this.backdropQuality = data.backdropQuality
  }

  /**
   * Get the best available poster URL
   */
  getBestPoster(): string | undefined {
    return this.poster || this.posterAlternatives?.[0] || this.posterThumbnail
  }

  /**
   * Get the best available backdrop URL
   */
  getBestBackdrop(): string | undefined {
    return this.backdrop || this.backdropAlternatives?.[0] || this.backdropThumbnail
  }

  /**
   * Check if any images are available
   */
  hasAnyImage(): boolean {
    return !!(
      this.poster ||
      this.backdrop ||
      this.logo ||
      this.posterAlternatives?.length ||
      this.backdropAlternatives?.length ||
      this.posterThumbnail ||
      this.backdropThumbnail
    )
  }
}

/**
 * Minimal Media entity optimized for TanStack Query caching
 * Contains only essential data needed for UI rendering and identification
 * Detailed enrichment data is managed separately in Legend State
 */
export class Media {
  // Stable Identity (REQUIRED for efficient Legend List rendering)
  public readonly stableId: string

  // Core Identity (REQUIRED for provider lookups)
  public readonly externalIds: ExternalIds
  public readonly type: 'movie' | 'series'

  // Basic Metadata (REQUIRED for UI display)
  public readonly title: string
  public readonly year?: number

  // Images (flexible for different UI contexts)
  public readonly images: MediaImages

  // Metadata tracking
  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor(data: {
    externalIds: ExternalIds
    type: 'movie' | 'series'
    title: string
    year?: number
    images?: MediaImages
    createdAt?: Date
    updatedAt?: Date
  }) {
    // Generate stable ID from external IDs
    this.stableId = StableIdGenerator.forMedia(data.externalIds)

    this.externalIds = data.externalIds
    this.type = data.type
    this.title = data.title
    this.year = data.year
    this.images = data.images || new MediaImages()

    const now = new Date()
    this.createdAt = data.createdAt || now
    this.updatedAt = data.updatedAt || now
  }

  /**
   * Create a new Media instance with updated data
   */
  update(
    updates: Partial<{
      title: string
      year: number
      images: MediaImages
    }>
  ): Media {
    return new Media({
      externalIds: this.externalIds,
      type: this.type,
      title: updates.title ?? this.title,
      year: updates.year ?? this.year,
      images: updates.images ?? this.images,
      createdAt: this.createdAt,
      updatedAt: new Date(),
    })
  }

  /**
   * Get display name for UI
   */
  getDisplayName(): string {
    return this.year ? `${this.title} (${this.year})` : this.title
  }

  /**
   * Check if this is a movie
   */
  isMovie(): boolean {
    return this.type === 'movie'
  }

  /**
   * Check if this is a series
   */
  isSeries(): boolean {
    return this.type === 'series'
  }
}
