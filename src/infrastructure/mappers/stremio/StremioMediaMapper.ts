import { Media, MediaImages } from '../../../domain/entities/Media'
import { ExternalIds, StremioExternalId } from '../../../domain/entities/ExternalIds'
import type { StremioMetaPreview, StremioMeta } from '../../providers/stremio/types/responses'
import { StremioExternalIdParser } from '../../providers/stremio/utils/StremioExternalIdParser'

/**
 * Mapper for converting Stremio meta objects to domain Media entities
 */
export class StremioMediaMapper {
  /**
   * Convert Stremio meta preview to Media entity (for catalog responses)
   */
  static fromMetaPreview(
    stremioMeta: StremioMetaPreview,
    addonId: string,
    addonName: string,
    catalogId: string,
    catalogType: string,
    manifestUrl: string
  ): Media {
    // Create StremioExternalId with complete context
    const stremioId = new StremioExternalId(
      addonId,
      addonName,
      catalogId,
      catalogType,
      stremioMeta.type, // Original Stremio type preserved
      stremioMeta.id,
      `stremio:${addonId}`,
      manifestUrl
    )

    // Parse external IDs from Stremio ID
    const parsedIds = StremioExternalIdParser.parseExternalIds(stremioMeta.id, addonId)

    // Merge parsed IDs with Stremio ID
    let externalIds = new ExternalIds({ ...parsedIds, stremio: stremioId })

    // Normalize type for Media entity
    const normalizedType = this.normalizeType(stremioMeta.type)
    const year = this.extractYear(stremioMeta.releaseInfo)

    const images = new MediaImages({
      poster: stremioMeta.poster,
      posterThumbnail: stremioMeta.poster,
    })

    return new Media({
      externalIds,
      type: normalizedType,
      title: stremioMeta.name,
      year,
      images,
    })
  }

  /**
   * Convert full Stremio meta to enriched Media entity (for meta responses)
   */
  static fromMeta(
    stremioMeta: StremioMeta,
    addonId: string,
    addonName: string,
    catalogId: string,
    catalogType: string,
    manifestUrl: string
  ): Media {
    // Create StremioExternalId with complete context
    const stremioId = new StremioExternalId(
      addonId,
      addonName,
      catalogId,
      catalogType,
      stremioMeta.type, // Original Stremio type preserved
      stremioMeta.id,
      `stremio:${addonId}`,
      manifestUrl
    )

    // Parse external IDs from Stremio ID
    const parsedIds = StremioExternalIdParser.parseExternalIds(stremioMeta.id, addonId)

    // Merge parsed IDs with Stremio ID
    let externalIds = new ExternalIds({ ...parsedIds, stremio: stremioId })

    // Normalize type for Media entity
    const normalizedType = this.normalizeType(stremioMeta.type)
    const year = this.extractYear(stremioMeta.released || stremioMeta.releaseInfo)

    const images = new MediaImages({
      poster: stremioMeta.poster,
      backdrop: stremioMeta.background,
      logo: stremioMeta.logo,
      posterThumbnail: stremioMeta.poster,
      backdropThumbnail: stremioMeta.background,
    })

    return new Media({
      externalIds,
      type: normalizedType,
      title: stremioMeta.name,
      year,
      images,
    })
  }

  /**
   * Convert array of Stremio meta previews to Media entities
   */
  static fromMetaPreviewArray(
    stremioMetas: StremioMetaPreview[],
    addonId: string,
    addonName: string,
    catalogId: string,
    catalogType: string,
    manifestUrl: string
  ): Media[] {
    return stremioMetas.map((meta) =>
      this.fromMetaPreview(meta, addonId, addonName, catalogId, catalogType, manifestUrl)
    )
  }

  /**
   * Normalize Stremio type to Media type
   */
  private static normalizeType(stremioType: string): 'movie' | 'series' {
    const lower = stremioType.toLowerCase()

    if (['movie', 'movies', 'film', 'cinema'].includes(lower)) {
      return 'movie'
    }

    if (['series', 'show', 'shows', 'tv', 'channel', 'channels', 'anime'].includes(lower)) {
      return 'series'
    }

    // Default fallback
    return 'movie'
  }

  /**
   * Extract year from various date/release formats
   */
  private static extractYear(releaseInfo?: string): number | undefined {
    if (!releaseInfo) return undefined

    // Extract 4-digit year from various formats
    const yearMatch = releaseInfo.match(/(\d{4})/)
    return yearMatch ? parseInt(yearMatch[1]) : undefined
  }
}
