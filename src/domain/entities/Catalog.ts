import type { Media } from './Media'
import type { Person } from './Person'
import type { CatalogFilters } from './StableIdGenerator'
import { StableIdGenerator } from './StableIdGenerator'

/**
 * Source information for catalogs (flexible object for provider-specific data)
 */
export interface CatalogSourceInfo {
  originalUrl?: string // Original API endpoint
  apiVersion?: string // Provider API version
  totalCount?: number // Total items available
  lastUpdated?: Date // When provider last updated this catalog

  // Stremio-specific
  addonId?: string // For Stremio catalogs
  manifestUrl?: string // Addon manifest

  // TMDB-specific
  region?: string // For region-specific catalogs
  language?: string // Content language

  // Trakt-specific
  period?: string // 'daily', 'weekly', 'monthly', 'yearly', 'all'

  // Provider-specific extensions
  [key: string]: any // Allow providers to add custom fields
}

/**
 * Pagination information for catalogs (flexible for different pagination strategies)
 */
export interface CatalogPaginationInfo {
  currentPage: number
  totalPages?: number
  hasMore: boolean

  // Token-based pagination (e.g., some APIs)
  nextPageToken?: string
  previousPageToken?: string

  // Offset-based pagination (e.g., TMDB)
  offset?: number
  limit?: number

  // Skip-based pagination (e.g., Stremio)
  skip?: number

  // Provider-specific pagination data
  [key: string]: any // Flexible for different pagination strategies
}

/**
 * Individual item within a catalog
 */
export interface CatalogItem {
  stableId: string // For efficient Legend List rendering
  media?: Media // For media catalogs
  person?: Person // For people catalogs
  position?: number // Position in list/ranking

  // For people catalogs (cast/crew/filmography)
  role?: string // Character name, job title
  department?: string // 'Acting', 'Directing', 'Production', etc.
  order?: number // Billing order for cast
}

/**
 * Catalog entity representing collections of media or people
 * Used for all list-based content: catalogs, recommendations, cast, filmography, etc.
 */
export class Catalog {
  // Stable Identity (REQUIRED for efficient Legend List rendering)
  public readonly stableId: string

  // Identity
  public readonly id: string // Provider's catalog ID
  public readonly providerId: string // Which provider returned this catalog

  // Classification
  public readonly type: 'movie' | 'series' | 'person' | 'mixed'
  public readonly category: string // 'trending', 'popular', 'recommendations', 'cast', 'directed'
  public readonly name: string
  public readonly description?: string

  // Content
  public readonly items: CatalogItem[]

  // Structured information objects
  public readonly sourceInfo: CatalogSourceInfo
  public readonly paginationInfo: CatalogPaginationInfo

  // Context (for recommendations/filmography)
  public readonly contextMedia?: Media // For recommendations: "Recommended based on X"
  public readonly contextPerson?: Person // For filmography: "Movies directed by X"

  // Filters applied
  public readonly filters?: CatalogFilters

  // Metadata
  public readonly createdAt: Date
  public readonly expiresAt?: Date // Cache expiration

  constructor(data: {
    id: string
    providerId: string
    type: 'movie' | 'series' | 'person' | 'mixed'
    category: string
    name: string
    description?: string
    items?: CatalogItem[]
    sourceInfo?: CatalogSourceInfo
    paginationInfo?: CatalogPaginationInfo
    contextMedia?: Media
    contextPerson?: Person
    filters?: CatalogFilters
    createdAt?: Date
    expiresAt?: Date
  }) {
    // Generate stable ID
    this.stableId = StableIdGenerator.forCatalog(
      data.providerId,
      data.id,
      data.type,
      data.category,
      data.filters
    )

    this.id = data.id
    this.providerId = data.providerId
    this.type = data.type
    this.category = data.category
    this.name = data.name
    this.description = data.description
    this.items = data.items || []
    this.sourceInfo = data.sourceInfo || {}
    this.paginationInfo = data.paginationInfo || {
      currentPage: 0,
      hasMore: false,
    }
    this.contextMedia = data.contextMedia
    this.contextPerson = data.contextPerson
    this.filters = data.filters
    this.createdAt = data.createdAt || new Date()
    this.expiresAt = data.expiresAt
  }

  /**
   * Create a new Catalog instance with additional items (for loadMore)
   */
  appendItems(newItems: CatalogItem[], newPaginationInfo: CatalogPaginationInfo): Catalog {
    // Generate stable IDs for new items
    const itemsWithStableIds = newItems.map((item, index) => ({
      ...item,
      stableId:
        item.stableId ||
        StableIdGenerator.forCatalogItem(
          this.stableId,
          item.media?.stableId || item.person?.stableId || null,
          this.items.length + index
        ),
    }))

    return new Catalog({
      id: this.id,
      providerId: this.providerId,
      type: this.type,
      category: this.category,
      name: this.name,
      description: this.description,
      items: [...this.items, ...itemsWithStableIds],
      sourceInfo: this.sourceInfo,
      paginationInfo: newPaginationInfo,
      contextMedia: this.contextMedia,
      contextPerson: this.contextPerson,
      filters: this.filters,
      createdAt: this.createdAt,
      expiresAt: this.expiresAt,
    })
  }

  /**
   * Create a new Catalog instance with updated pagination info
   */
  updatePagination(newPaginationInfo: CatalogPaginationInfo): Catalog {
    return new Catalog({
      id: this.id,
      providerId: this.providerId,
      type: this.type,
      category: this.category,
      name: this.name,
      description: this.description,
      items: this.items,
      sourceInfo: this.sourceInfo,
      paginationInfo: newPaginationInfo,
      contextMedia: this.contextMedia,
      contextPerson: this.contextPerson,
      filters: this.filters,
      createdAt: this.createdAt,
      expiresAt: this.expiresAt,
    })
  }

  /**
   * Check if this catalog has expired
   */
  isExpired(): boolean {
    return this.expiresAt ? new Date() > this.expiresAt : false
  }

  /**
   * Check if more items can be loaded
   */
  canLoadMore(): boolean {
    return this.paginationInfo.hasMore
  }

  /**
   * Get the total number of items
   */
  getItemCount(): number {
    return this.items.length
  }

  /**
   * Check if this is a media catalog
   */
  isMediaCatalog(): boolean {
    return this.type === 'movie' || this.type === 'series' || this.type === 'mixed'
  }

  /**
   * Check if this is a people catalog
   */
  isPeopleCatalog(): boolean {
    return this.type === 'person'
  }

  /**
   * Get display name with context
   */
  getDisplayName(): string {
    if (this.contextMedia) {
      return `${this.name} - ${this.contextMedia.title}`
    }
    if (this.contextPerson) {
      return `${this.name} - ${this.contextPerson.name}`
    }
    return this.name
  }
}
