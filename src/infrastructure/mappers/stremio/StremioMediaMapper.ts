import { Media, MediaImages } from '../../../domain/entities/Media'
import { ExternalIds, ExternalIdHelpers } from '../../../domain/entities/ExternalIds'
import type { StremioMetaPreview, StremioMeta } from '../../providers/stremio/types/responses'

/**
 * Mapper for converting Stremio meta objects to domain Media entities
 */
export class StremioMediaMapper {
  /**
   * Convert Stremio meta preview to Media entity (for catalog responses)
   */
  static fromMetaPreview(stremioMeta: StremioMetaPreview, addonId: string): Media {
    const externalIds = this.createExternalIds(stremioMeta.id, addonId)
    const year = this.extractYear(stremioMeta.releaseInfo)

    const images = new MediaImages({
      poster: stremioMeta.poster,
      posterThumbnail: stremioMeta.poster,
    })

    return new Media({
      externalIds,
      type: stremioMeta.type as 'movie' | 'series',
      title: stremioMeta.name,
      year,
      images,
    })
  }

  /**
   * Convert full Stremio meta to enriched Media entity (for meta responses)
   */
  static fromMeta(stremioMeta: StremioMeta, addonId: string): Media {
    const externalIds = this.createExternalIds(stremioMeta.id, addonId)
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
      type: stremioMeta.type as 'movie' | 'series',
      title: stremioMeta.name,
      year,
      images,
    })
  }

  /**
   * Convert array of Stremio meta previews to Media entities
   */
  static fromMetaPreviewArray(stremioMetas: StremioMetaPreview[], addonId: string): Media[] {
    return stremioMetas.map((meta) => this.fromMetaPreview(meta, addonId))
  }

  /**
   * Create ExternalIds from Stremio meta ID
   * Prioritizes IMDB ID if detected, falls back to Stremio-specific ID
   */
  private static createExternalIds(stremioId: string, addonId: string): ExternalIds {
    // Check if it's an IMDB ID
    if (stremioId.startsWith('tt')) {
      return ExternalIdHelpers.fromImdb(stremioId)
    }

    // Otherwise create Stremio-specific external ID
    return ExternalIdHelpers.fromStremio(
      addonId,
      'catalog', // Default catalog name
      'movie', // Default type, will be corrected by actual type
      stremioId,
      `stremio:${addonId}`
    )
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
