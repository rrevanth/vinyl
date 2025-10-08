import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import type { Catalog } from '@/src/domain/entities/Catalog'
import { Catalog as CatalogEntity } from '@/src/domain/entities/Catalog'
import { StableIdGenerator, type CatalogFilters } from '@/src/domain/entities/StableIdGenerator'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { StremioMediaMapper } from '@/src/infrastructure/mappers/stremio/StremioMediaMapper'
import type { StremioAddonClient } from '@/src/infrastructure/providers/stremio/clients/StremioAddonClient'
import type { StremioCatalog } from '@/src/infrastructure/providers/stremio/types/manifest'

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

  async getCatalogs(filters?: CatalogFilters): Promise<Catalog[]> {
    const catalogDefinitions = this.addon.manifest.catalogs ?? []

    this.logger.info('StremioMediaCatalogCapability.getCatalogs called', {
      addonId: this.addon.id,
      addonName: this.addon.name,
      catalogCount: catalogDefinitions.length,
      page: filters?.page ?? 'unspecified',
      limit: filters?.limit,
    })

    if (catalogDefinitions.length === 0) {
      this.logger.warn('No catalog definitions found in addon manifest', {
        addonId: this.addon.id,
        addonName: this.addon.name,
      })
      return []
    }

    // Log each catalog definition
    catalogDefinitions.forEach((definition, index) => {
      this.logger.debug('Catalog definition found', {
        addonId: this.addon.id,
        index,
        catalogType: definition.type,
        catalogId: definition.id,
        catalogName: definition.name,
      })
    })

    // Page 0 = metadata-only mode (no API calls for items)
    if (filters?.page === 0) {
      this.logger.info('Page 0 requested - returning metadata-only catalogs', {
        addonId: this.addon.id,
        addonName: this.addon.name,
        catalogCount: catalogDefinitions.length,
      })

      const metadataCatalogs = catalogDefinitions.map((definition) => {
        const catalog = this.createMetadataCatalog(definition)
        this.logger.debug('Created metadata catalog', {
          addonId: this.addon.id,
          catalogStableId: catalog.stableId,
          catalogName: catalog.name,
          catalogType: catalog.type,
        })
        return catalog
      })

      this.logger.info('Returning metadata catalogs', {
        addonId: this.addon.id,
        count: metadataCatalogs.length,
        stableIds: metadataCatalogs.map((c) => c.stableId),
      })

      return metadataCatalogs
    }

    // Page 1+ = fetch items from API
    this.logger.info('Fetching catalog items from addon API', {
      addonId: this.addon.id,
      addonName: this.addon.name,
      catalogCount: catalogDefinitions.length,
      page: filters?.page,
      limit: filters?.limit,
    })

    const catalogs = await Promise.all(
      catalogDefinitions.map(async (definition) => {
        try {
          this.logger.debug('Fetching catalog from addon API', {
            addonId: this.addon.id,
            catalogType: definition.type,
            catalogId: definition.id,
            catalogName: definition.name,
          })

          const response = await this.addonClient.getCatalog(definition.type, definition.id)
          const metas = response.metas ?? []

          this.logger.debug('API response received', {
            addonId: this.addon.id,
            catalogType: definition.type,
            catalogId: definition.id,
            metasCount: metas.length,
          })

          if (metas.length === 0) {
            this.logger.warn('CRITICAL: Empty metas array - catalog will be filtered out!', {
              addonId: this.addon.id,
              catalogType: definition.type,
              catalogId: definition.id,
              catalogName: definition.name,
            })
            return null
          }

          const normalizedMetas = metas
            .map((meta) => {
              const normalizedType = this.normalizeType(meta.type ?? definition.type)
              if (!normalizedType) {
                this.logger.debug('Meta type could not be normalized - skipping', {
                  addonId: this.addon.id,
                  catalogType: definition.type,
                  catalogId: definition.id,
                  metaType: meta.type,
                  metaId: meta.id,
                })
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

          this.logger.debug('Normalized metas', {
            addonId: this.addon.id,
            catalogType: definition.type,
            catalogId: definition.id,
            originalCount: metas.length,
            normalizedCount: normalizedMetas.length,
          })

          if (normalizedMetas.length === 0) {
            this.logger.warn('CRITICAL: All metas filtered out during normalization!', {
              addonId: this.addon.id,
              catalogType: definition.type,
              catalogId: definition.id,
              originalMetasCount: metas.length,
            })
            return null
          }

          const mediaItems = StremioMediaMapper.fromMetaPreviewArray(normalizedMetas, this.addon.id)
          const catalogId = `${this.addon.id}-${definition.type}-${definition.id}`
          const catalogStableId = StableIdGenerator.forCatalog(
            this.addon.id,
            catalogId,
            this.deriveCatalogType(normalizedMetas),
            `${definition.type}-${definition.id}`
          )

          this.logger.info('Created catalog with items', {
            addonId: this.addon.id,
            catalogType: definition.type,
            catalogId: definition.id,
            catalogName: definition.name,
            stableId: catalogStableId,
            itemCount: mediaItems.length,
          })

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
              addonName: this.addon.name,
              manifestUrl: this.addon.transportUrl,
              catalogDefinition: definition,
            },
            paginationInfo: {
              currentPage: 1,
              totalPages: 1,
              hasMore: false,
            },
          })
        } catch (error) {
          this.logger.error('Failed to fetch Stremio addon catalog', error as Error, {
            addonId: this.addon.id,
            addonName: this.addon.name,
            catalogType: definition.type,
            catalogId: definition.id,
            catalogName: definition.name,
          })
          return null
        }
      })
    )

    const validCatalogs = catalogs.filter((catalog): catalog is Catalog => catalog !== null)

    this.logger.info('Returning catalogs with items', {
      addonId: this.addon.id,
      addonName: this.addon.name,
      totalDefinitions: catalogDefinitions.length,
      validCatalogsCount: validCatalogs.length,
      filteredOutCount: catalogDefinitions.length - validCatalogs.length,
      stableIds: validCatalogs.map((c) => c.stableId),
    })

    return validCatalogs
  }

  // Stremio catalog endpoints do not provide pagination metadata; return original catalog untouched.
  async loadMoreItems(catalog: Catalog): Promise<Catalog> {
    this.logger.debug('Stremio catalogs do not support pagination yet', {
      catalogId: catalog.id,
    })
    return catalog
  }

  private createMetadataCatalog(definition: StremioCatalog): Catalog {
    // Derive type from manifest definition instead of defaulting to mixed
    const normalizedType = this.normalizeType(definition.type)
    const catalogType = normalizedType || 'mixed' // Fallback to mixed only if type unknown

    return new CatalogEntity({
      id: `${this.addon.id}-${definition.type}-${definition.id}`,
      providerId: this.addon.id,
      type: catalogType,
      category: definition.id,
      name: definition.name || `${this.addon.name} · ${definition.id}`,
      description: `${definition.name || definition.id} catalog from ${this.addon.name}`,
      items: [], // Empty items for metadata-only mode
      sourceInfo: {
        addonId: this.addon.id,
        addonName: this.addon.name,
        manifestUrl: this.addon.transportUrl,
        catalogDefinition: definition,
      },
      paginationInfo: {
        currentPage: 0,
        totalPages: 1,
        hasMore: true,
      },
    })
  }

  private normalizeType(type?: string): 'movie' | 'series' | null {
    if (!type) {
      return null
    }

    const lower = type.toLowerCase()
    if (['movie', 'movies', 'film', 'cinema'].includes(lower)) {
      return 'movie'
    }

    if (['series', 'show', 'shows', 'tv', 'channel', 'channels'].includes(lower)) {
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
