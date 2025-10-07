import type { Catalog } from '@/src/domain/entities/Catalog'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { ICacheService } from '@/src/domain/services/ICacheService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import { NotFoundError } from '@/src/domain/errors/NotFoundError'
import { DomainError } from '@/src/domain/errors/DomainError'
import { ValidationError } from '@/src/domain/errors/ValidationError'

/**
 * Parameters for loading more catalog items
 */
export interface LoadMoreCatalogItemsParams {
  /** Stable ID of the catalog to load more items for */
  readonly catalogStableId: string
  
  /** Whether to force refresh and bypass cache */
  readonly forceRefresh?: boolean
  
  /** Custom page size override (if provider supports it) */
  readonly pageSize?: number
}

/**
 * Result of loading more catalog items
 */
export interface LoadMoreCatalogItemsResult {
  /** Updated catalog with new items appended */
  readonly updatedCatalog: Catalog
  
  /** Number of new items loaded */
  readonly newItemsCount: number
  
  /** Whether there are more items available to load */
  readonly hasMoreItems: boolean
  
  /** Whether data was loaded from cache */
  readonly fromCache: boolean
  
  /** Load time in milliseconds */
  readonly loadTime: number
}

/**
 * Use case that handles loading more items for a specific catalog (pagination).
 * Uses the existing Catalog.appendItems() method and manages caching for
 * optimal performance and user experience.
 * 
 * This use case coordinates with the appropriate provider to fetch additional
 * catalog items while maintaining pagination state and cache consistency.
 */
export class LoadMoreCatalogItemsUseCase {
  constructor(
    private readonly providerRegistry: IProviderRegistry,
    private readonly cacheService: ICacheService,
    private readonly loggingService: ILoggingService
  ) {}

  /**
   * Load more items for the specified catalog
   * 
   * @param params - Parameters specifying which catalog and how to load
   * @returns Result containing updated catalog and loading metadata
   * @throws NotFoundError if catalog or provider not found
   * @throws ValidationError if catalog cannot load more items
   * @throws DomainError if loading fails
   */
  async execute(params: LoadMoreCatalogItemsParams): Promise<LoadMoreCatalogItemsResult> {
    const startTime = Date.now()
    
    try {
      this.loggingService.info('Loading more catalog items', {
        catalogStableId: params.catalogStableId,
        forceRefresh: params.forceRefresh,
        pageSize: params.pageSize,
      })

      // Get the current catalog
      const currentCatalog = await this.getCurrentCatalog(params.catalogStableId, params.forceRefresh)
      
      if (!currentCatalog) {
        throw new NotFoundError(`Catalog not found: ${params.catalogStableId}`)
      }

      // Validate that more items can be loaded
      if (!currentCatalog.canLoadMore()) {
        throw new ValidationError(
          `No more items available for catalog: ${currentCatalog.name}`,
          'pagination'
        )
      }

      // Find the provider for this catalog
      const provider = this.findProviderForCatalog(currentCatalog)
      if (!provider) {
        throw new NotFoundError(
          `Provider not found for catalog: ${currentCatalog.providerId}`
        )
      }

      // Check cache for next page unless force refresh
      let updatedCatalog: Catalog
      let fromCache = false

      if (!params.forceRefresh) {
        const cachedNextPage = await this.getCachedNextPage(currentCatalog)
        if (cachedNextPage) {
          updatedCatalog = cachedNextPage
          fromCache = true
        }
      }

      // Load fresh data if not cached
      if (!fromCache) {
        updatedCatalog = await this.loadFreshItems(provider, currentCatalog)
        
        // Cache the updated catalog
        await this.cacheUpdatedCatalog(updatedCatalog)
      }

      const loadTime = Date.now() - startTime
      const newItemsCount = updatedCatalog.getItemCount() - currentCatalog.getItemCount()

      this.loggingService.info('Successfully loaded more catalog items', {
        catalogStableId: params.catalogStableId,
        newItemsCount,
        totalItems: updatedCatalog.getItemCount(),
        hasMoreItems: updatedCatalog.canLoadMore(),
        fromCache,
        loadTime,
      })

      return {
        updatedCatalog,
        newItemsCount,
        hasMoreItems: updatedCatalog.canLoadMore(),
        fromCache,
        loadTime,
      }

    } catch (error) {
      this.loggingService.error('Failed to load more catalog items', error as Error, {
        catalogStableId: params.catalogStableId,
        loadTime: Date.now() - startTime,
      })

      if (error instanceof NotFoundError || error instanceof ValidationError) {
        throw error
      }

      throw new DomainError('Failed to load more catalog items')
    }
  }

  /**
   * Get the current catalog from cache or providers
   */
  private async getCurrentCatalog(
    stableId: string,
    forceRefresh: boolean
  ): Promise<Catalog | null> {
    try {
      // Try cache first unless force refresh
      if (!forceRefresh) {
        const cachedCatalog = await this.getCachedCatalog(stableId)
        if (cachedCatalog) {
          return cachedCatalog
        }
      }

      // If not in cache, search through all provider catalogs
      const catalogProviders = this.providerRegistry
        .getProvidersForCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG, true)

      for (const provider of catalogProviders) {
        try {
          const catalogs = await provider.getCatalogs()
          const foundCatalog = catalogs.find(catalog => catalog.stableId === stableId)
          if (foundCatalog) {
            // Cache the found catalog
            await this.cacheCatalog(foundCatalog)
            return foundCatalog
          }
        } catch (error) {
          this.loggingService.warn('Failed to fetch catalogs from provider', {
            providerId: provider.metadata?.id,
            error: (error as Error).message,
          })
          // Continue with next provider
        }
      }

      return null

    } catch (error) {
      this.loggingService.error('Failed to get current catalog', error as Error, {
        stableId,
      })
      return null
    }
  }

  /**
   * Find the provider that can handle this catalog
   */
  private findProviderForCatalog(catalog: Catalog): IMediaCatalogCapability | null {
    const providers = this.providerRegistry
      .getProvidersForCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG, true)

    // Find provider by ID
    for (const provider of providers) {
      try {
        if (provider.metadata?.id === catalog.providerId) {
          return provider
        }
      } catch (error) {
        this.loggingService.warn('Error checking provider metadata', {
          error: (error as Error).message,
        })
      }
    }

    return null
  }

  /**
   * Load fresh items from the provider
   */
  private async loadFreshItems(
    provider: IMediaCatalogCapability,
    currentCatalog: Catalog
  ): Promise<Catalog> {
    try {
      // Use the provider's loadMoreItems method
      const updatedCatalog = await provider.loadMoreItems(currentCatalog)
      
      // Validate that new items were actually loaded
      if (updatedCatalog.getItemCount() <= currentCatalog.getItemCount()) {
        this.loggingService.warn('Provider returned same or fewer items', {
          catalogId: currentCatalog.stableId,
          previousCount: currentCatalog.getItemCount(),
          newCount: updatedCatalog.getItemCount(),
        })
      }

      return updatedCatalog

    } catch (error) {
      this.loggingService.error('Provider failed to load more items', error as Error, {
        catalogId: currentCatalog.stableId,
        providerId: currentCatalog.providerId,
      })
      throw error
    }
  }

  /**
   * Get cached catalog by stable ID
   */
  private async getCachedCatalog(stableId: string): Promise<Catalog | null> {
    try {
      const cacheKey = this.cacheService.keys.catalog(stableId)
      return await this.cacheService.getCatalog<Catalog>(stableId)
    } catch (error) {
      this.loggingService.warn('Failed to get cached catalog', {
        stableId,
        error: (error as Error).message,
      })
      return null
    }
  }

  /**
   * Get cached next page for catalog if available
   */
  private async getCachedNextPage(catalog: Catalog): Promise<Catalog | null> {
    try {
      const nextPage = catalog.paginationInfo.currentPage + 1
      const cacheKey = this.cacheService.keys.catalog(
        catalog.stableId,
        nextPage,
        catalog.filters
      )
      
      const cachedNextPageCatalog = await this.cacheService.getCatalog<Catalog>(
        catalog.stableId,
        nextPage,
        catalog.filters
      )

      if (cachedNextPageCatalog) {
        // Merge the cached next page with current catalog
        return catalog.appendItems(
          cachedNextPageCatalog.items,
          cachedNextPageCatalog.paginationInfo
        )
      }

      return null
    } catch (error) {
      this.loggingService.warn('Failed to get cached next page', {
        catalogId: catalog.stableId,
        error: (error as Error).message,
      })
      return null
    }
  }

  /**
   * Cache a catalog
   */
  private async cacheCatalog(catalog: Catalog): Promise<void> {
    try {
      await this.cacheService.cacheCatalog(
        catalog.stableId,
        catalog,
        catalog.paginationInfo.currentPage,
        catalog.filters
      )
    } catch (error) {
      this.loggingService.warn('Failed to cache catalog', {
        catalogId: catalog.stableId,
        error: (error as Error).message,
      })
      // Don't throw - caching failure shouldn't break the main operation
    }
  }

  /**
   * Cache the updated catalog with new items
   */
  private async cacheUpdatedCatalog(catalog: Catalog): Promise<void> {
    try {
      // Cache the complete updated catalog
      await this.cacheCatalog(catalog)

      // Also cache just the new page data for efficient future access
      const currentPageItems = catalog.items.slice(
        Math.max(0, catalog.items.length - 20) // Assume last 20 items are new
      )
      
      if (currentPageItems.length > 0) {
        const pageOnlyCatalog = new Catalog({
          id: catalog.id,
          providerId: catalog.providerId,
          type: catalog.type,
          category: catalog.category,
          name: catalog.name,
          description: catalog.description,
          items: currentPageItems,
          sourceInfo: catalog.sourceInfo,
          paginationInfo: catalog.paginationInfo,
          contextMedia: catalog.contextMedia,
          contextPerson: catalog.contextPerson,
          filters: catalog.filters,
          createdAt: catalog.createdAt,
          expiresAt: catalog.expiresAt,
        })

        await this.cacheService.cacheCatalog(
          catalog.stableId,
          pageOnlyCatalog,
          catalog.paginationInfo.currentPage,
          catalog.filters
        )
      }

    } catch (error) {
      this.loggingService.warn('Failed to cache updated catalog', {
        catalogId: catalog.stableId,
        error: (error as Error).message,
      })
      // Don't throw - caching failure shouldn't break the main operation
    }
  }
}