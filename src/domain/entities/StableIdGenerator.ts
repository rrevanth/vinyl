import type { ExternalIds } from './ExternalIds'

/**
 * Filters interface for catalog filtering
 * Used in stable ID generation to ensure unique IDs per filter combination
 */
export interface CatalogFilters {
  page?: number
  genre?: string[]
  year?: number
  rating?: string
  country?: string
  language?: string
  [key: string]: any
}

/**
 * Utility class for generating stable, unique IDs for efficient Legend List rendering
 * Ensures consistent IDs across app sessions and prevents rendering conflicts
 */
export class StableIdGenerator {
  /**
   * Generate stable ID for Media entities
   * Priority: IMDB > TMDB > Trakt > TVDB > Stremio > Fanart
   */
  static forMedia(externalIds: ExternalIds): string {
    if (externalIds.imdb) {
      return `media:imdb:${externalIds.imdb.id}`
    }
    if (externalIds.tmdb) {
      return `media:tmdb:${externalIds.tmdb.id}`
    }
    if (externalIds.trakt) {
      return `media:trakt:${externalIds.trakt.id}`
    }
    if (externalIds.tvdb) {
      return `media:tvdb:${externalIds.tvdb.id}`
    }
    if (externalIds.stremio) {
      const s = externalIds.stremio
      return `media:stremio:${s.addonId}:${s.catalogId}:${s.mediaId}`
    }
    if (externalIds.fanart) {
      return `media:fanart:${externalIds.fanart.id}`
    }

    throw new Error('No valid external ID found for stable ID generation')
  }

  /**
   * Generate stable ID for Person entities
   * Priority: IMDB > TMDB > Trakt > TVDB > Fanart
   */
  static forPerson(externalIds: ExternalIds): string {
    if (externalIds.imdb) {
      return `person:imdb:${externalIds.imdb.id}`
    }
    if (externalIds.tmdb) {
      return `person:tmdb:${externalIds.tmdb.id}`
    }
    if (externalIds.trakt) {
      return `person:trakt:${externalIds.trakt.id}`
    }
    if (externalIds.tvdb) {
      return `person:tvdb:${externalIds.tvdb.id}`
    }
    if (externalIds.fanart) {
      return `person:fanart:${externalIds.fanart.id}`
    }

    throw new Error('No valid external ID found for stable ID generation')
  }

  /**
   * Generate stable ID for Catalog entities
   * Includes provider context and catalog ID to avoid conflicts between providers
   */
  static forCatalog(
    providerId: string,
    catalogId: string,
    type: string,
    category: string,
    filters?: CatalogFilters
  ): string {
    const filterHash = filters ? this.hashFilters(filters) : 'default'
    return `catalog:${providerId}:${catalogId}:${type}:${category}:${filterHash}`
  }

  /**
   * Generate stable ID for CatalogItem entities
   * Includes position to make unique within catalog and prevent conflicts
   */
  static forCatalogItem(
    catalogStableId: string,
    itemStableId: string | null,
    index: number
  ): string {
    const itemId = itemStableId || `unknown:${index}`
    return `${catalogStableId}:item:${index}:${itemId}`
  }

  /**
   * Generate stable ID for Legend List rendering with additional context
   * Use when you need extra context to prevent conflicts in specific UI scenarios
   */
  static forListItem(listContext: string, itemStableId: string, index: number): string {
    return `${listContext}:${index}:${itemStableId}`
  }

  /**
   * Generate stable ID for enrichment data
   * Used for storing provider-specific enrichments in Legend State
   */
  static forEnrichment(mediaStableId: string, capability: string, providerId: string): string {
    return `enrichment:${mediaStableId}:${capability}:${providerId}`
  }

  /**
   * Generate a hash for filter objects to ensure stable IDs
   * Creates consistent hash regardless of key order
   */
  private static hashFilters(filters: CatalogFilters): string {
    // Convert filters to sorted key-value pairs for consistent hashing
    const sortedEntries = Object.entries(filters)
      .filter(([_, value]) => value !== undefined && value !== null)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}:${value.sort().join(',')}`
        }
        return `${key}:${value}`
      })
      .join('|')

    if (!sortedEntries) return 'empty'

    // Simple hash function for generating short, consistent hashes
    return this.simpleHash(sortedEntries)
  }

  /**
   * Simple hash function for generating consistent short hashes
   */
  private static simpleHash(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36)
  }

  /**
   * Validate that a stable ID is well-formed
   */
  static validate(stableId: string): boolean {
    // Basic validation - ensure it has at least type:provider:id structure
    const parts = stableId.split(':')
    return parts.length >= 3 && parts.every((part) => part.length > 0)
  }

  /**
   * Extract the entity type from a stable ID
   */
  static getEntityType(stableId: string): string | null {
    const parts = stableId.split(':')
    return parts.length > 0 ? parts[0] : null
  }

  /**
   * Extract the provider ID from a stable ID
   */
  static getProviderId(stableId: string): string | null {
    const parts = stableId.split(':')
    return parts.length > 1 ? parts[1] : null
  }
}
