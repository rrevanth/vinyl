import type { IMediaRepository } from '@/src/domain/repositories/IMediaRepository'
import type { Media } from '@/src/domain/entities'
import { mediaCache$ } from '@/src/presentation/shared/stores/app.store'

/**
 * MediaRepository implementation
 * Handles media entity persistence using Legend State observables
 * Provides caching and retrieval for media data
 */
export class MediaRepository implements IMediaRepository {
  /**
   * Get media by stable ID
   * Returns media entity from cache
   */
  async getMedia(stableId: string): Promise<Media | null> {
    const mediaCache = mediaCache$.get()
    return mediaCache[stableId] ?? null
  }

  /**
   * Save media entity
   * Stores complete media object in cache
   */
  async saveMedia(media: Media): Promise<void> {
    const currentCache = mediaCache$.get()
    mediaCache$.set({
      ...currentCache,
      [media.stableId]: media,
    })
  }

  /**
   * Save multiple media entities
   * Batch operation for storing multiple media objects
   */
  async saveMediaBatch(mediaList: Media[]): Promise<void> {
    const currentCache = mediaCache$.get()
    const updates: Record<string, Media> = {}

    mediaList.forEach((media) => {
      updates[media.stableId] = media
    })

    mediaCache$.set({
      ...currentCache,
      ...updates,
    })
  }

  /**
   * Search media by query
   * Returns matching media from cache
   * Searches title only
   */
  async searchMedia(query: string): Promise<Media[]> {
    const mediaCache = mediaCache$.get()
    const lowerQuery = query.toLowerCase()

    return Object.values(mediaCache).filter((media) =>
      media.title.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * Get recently viewed media
   * Returns media sorted by last viewed timestamp
   * Note: Requires viewedAt timestamp to be tracked in Media entity
   */
  async getRecentlyViewed(limit: number = 20): Promise<Media[]> {
    const mediaCache = mediaCache$.get()

    // Filter media with viewedAt timestamp and sort by recency
    // Note: This assumes Media entity has a viewedAt field
    // If not present, returns empty array
    const mediaWithTimestamp = Object.values(mediaCache).filter(
      (media) => (media as any).viewedAt
    )

    const sorted = mediaWithTimestamp.sort((a, b) => {
      const aTime = (a as any).viewedAt || 0
      const bTime = (b as any).viewedAt || 0
      return bTime - aTime
    })

    return sorted.slice(0, limit)
  }

  /**
   * Mark media as viewed
   * Updates last viewed timestamp
   * Note: Currently stores timestamp in cache metadata
   * TODO: Add viewedAt field to Media entity if needed
   */
  async markAsViewed(stableId: string): Promise<void> {
    const media = await this.getMedia(stableId)
    if (!media) return

    // For now, just update the media in cache to refresh updatedAt
    // Future: Add viewedAt field to Media entity
    const updatedMedia = media.update({})
    await this.saveMedia(updatedMedia)
  }

  /**
   * Clear media cache
   * Removes all cached media data
   */
  async clearMediaCache(): Promise<void> {
    mediaCache$.set({})
  }

  /**
   * Get media by external ID
   * Lookup media using TMDB, IMDB, or other external IDs
   */
  async getMediaByExternalId(
    externalIdType: string,
    externalId: string
  ): Promise<Media | null> {
    const mediaCache = mediaCache$.get()

    // Search through all cached media for matching external ID
    const media = Object.values(mediaCache).find((m) => {
      const externalIds = m.externalIds
      if (!externalIds) return false

      // Check different external ID types
      switch (externalIdType.toLowerCase()) {
        case 'tmdb':
          return externalIds.tmdb?.id === externalId
        case 'imdb':
          return externalIds.imdb?.id === externalId
        case 'tvdb':
          return externalIds.tvdb?.id === externalId
        case 'trakt':
          return externalIds.trakt?.id === externalId
        default:
          return false
      }
    })

    return media ?? null
  }
}
