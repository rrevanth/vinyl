import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import type { Catalog } from '@/src/domain/entities/Catalog'
import { Catalog as CatalogEntity } from '@/src/domain/entities/Catalog'
import { StableIdGenerator } from '@/src/domain/entities/StableIdGenerator'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { StremioMediaMapper } from '@/src/infrastructure/mappers/stremio/StremioMediaMapper'
import type { StremioAddonClient } from '@/src/infrastructure/providers/stremio/clients/StremioAddonClient'

/**
 * Provides media catalogs backed by a specific Stremio addon.
 * Each addon can expose multiple catalog endpoints and we transform them into domain Catalog entities.
 */
export class StremioMediaCatalogCapability implements IMediaCatalogCapability {
  constructor(
    private readonly addon: StremioAddon,
    private readonly addonClient: StremioAddonClient,
    private readonly logger: ILoggingService
  ) {}

  async getCatalogs(): Promise<Catalog[]> {
    const catalogDefinitions = this.addon.manifest.catalogs ?? []

    if (catalogDefinitions.length === 0) {
      return []
    }

    const catalogs = await Promise.all(
      catalogDefinitions.map(async (definition) => {
        try {
          const response = await this.addonClient.getCatalog(definition.type, definition.id)
          const metas = response.metas ?? []

          if (metas.length === 0) {
            return null
          }

          const normalizedMetas = metas
            .map((meta) => {
              const normalizedType = this.normalizeType(meta.type ?? definition.type)
              if (!normalizedType) {
                return null
              }

              return {
                ...meta,
                type: normalizedType,
              }
            })
            .filter(
              (meta): meta is typeof metas[number] & { type: 'movie' | 'series' } => meta !== null
            )

          if (normalizedMetas.length === 0) {
            return null
          }

          const mediaItems = StremioMediaMapper.fromMetaPreviewArray(normalizedMetas, this.addon.id)
          const catalogStableId = StableIdGenerator.forCatalog(
            this.addon.id,
            this.deriveCatalogType(normalizedMetas),
            `${definition.type}-${definition.id}`
          )

          const items = mediaItems.map((media, index) => ({
            stableId: StableIdGenerator.forCatalogItem(catalogStableId, media.stableId, index),
            media,
          }))

          return new CatalogEntity({
            id: `${this.addon.id}-${definition.type}-${definition.id}`,
            providerId: this.addon.id,
            type: this.deriveCatalogType(normalizedMetas),
            category: definition.id,
            name: definition.name || `${this.addon.name} · ${definition.id}`,
            description: `${definition.name || definition.id} catalog from ${this.addon.name}`,
            items,
            sourceInfo: {
              addonId: this.addon.id,
              manifestUrl: this.addon.transportUrl,
              originalUrl: definition.id,
            },
            paginationInfo: {
              currentPage: 1,
              totalPages: 1,
              hasMore: false,
            },
          })
        } catch (error) {
          this.logger.warn('Failed to fetch Stremio addon catalog', {
            addonId: this.addon.id,
            catalogType: definition.type,
            catalogId: definition.id,
            error: error instanceof Error ? error.message : String(error),
          })
          return null
        }
      })
    )

    return catalogs.filter((catalog): catalog is Catalog => catalog !== null)
  }

  // Stremio catalog endpoints do not provide pagination metadata; return original catalog untouched.
  async loadMoreItems(catalog: Catalog): Promise<Catalog> {
    this.logger.debug('Stremio catalogs do not support pagination yet', {
      catalogId: catalog.id,
    })
    return catalog
  }

  private normalizeType(type?: string): 'movie' | 'series' | null {
    if (!type) {
      return null
    }

    const lower = type.toLowerCase()
    if (['movie', 'movies', 'film'].includes(lower)) {
      return 'movie'
    }

    if (['series', 'show', 'shows', 'tv'].includes(lower)) {
      return 'series'
    }

    return null
  }

  private deriveCatalogType(
    metas: { type: 'movie' | 'series' }[]
  ): 'movie' | 'series' | 'mixed' {
    const hasMovie = metas.some((meta) => meta.type === 'movie')
    const hasSeries = metas.some((meta) => meta.type === 'series')

    if (hasMovie && hasSeries) {
      return 'mixed'
    }

    return hasMovie ? 'movie' : 'series'
  }
}
