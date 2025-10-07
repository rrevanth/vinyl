import type { Catalog } from '@/src/domain/entities/Catalog'
import type { ContinueWatchingItem } from '@/src/domain/capabilities/IMediaContinueWatchingCapability'
import type { Media } from '@/src/domain/entities/Media'
import type { UserPreferences } from '@/src/domain/entities/UserPreferences'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { ICacheService } from '@/src/domain/services/ICacheService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import type { IMediaContinueWatchingCapability } from '@/src/domain/capabilities/IMediaContinueWatchingCapability'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import { DomainError } from '@/src/domain/errors/DomainError'

/**
 * Response containing all homescreen data sections
 */
export interface HomescreenData {
  /** Hero section items for carousel/featured display */
  readonly heroItems: Media[]
  /** Continue watching items with progress information */
  readonly continueWatching: ContinueWatchingItem[]
  /** Ordered catalog sections based on user preferences */
  readonly catalogs: Catalog[]
  /** Cache status information for UI feedback */
  readonly cacheStatus: {
    readonly isStale: boolean
    readonly lastRefreshed: Date | null
  }
}

/**
 * Parameters for customizing homescreen data retrieval
 */
export interface GetHomescreenDataParams {
  /** Whether to force refresh cache and fetch fresh data */
  readonly forceRefresh?: boolean
  /** Maximum number of hero items to return */
  readonly heroLimit?: number
  /** Maximum number of continue watching items to return */
  readonly continueWatchingLimit?: number
  /** Maximum number of items per catalog */
  readonly itemsPerCatalog?: number
  /** Whether to include cache status in response */
  readonly includeCacheStatus?: boolean
}

/**
 * Use case that orchestrates fetching all homescreen data including hero section,
 * continue watching, and catalog sections. Handles provider capabilities, user
 * preferences, caching, and error recovery gracefully.
 * 
 * This use case coordinates multiple providers and capabilities to build a
 * comprehensive homescreen experience while respecting user preferences and
 * authentication status.
 */
export class GetHomescreenDataUseCase {
  constructor(
    private readonly providerRegistry: IProviderRegistry,
    private readonly userService: IUserService,
    private readonly cacheService: ICacheService,
    private readonly loggingService: ILoggingService
  ) {}

  /**
   * Execute the homescreen data retrieval process
   * 
   * @param params - Parameters for customizing data retrieval
   * @returns Complete homescreen data with all sections
   * @throws DomainError if critical data cannot be retrieved
   */
  async execute(params: GetHomescreenDataParams = {}): Promise<HomescreenData> {
    const startTime = Date.now()
    const userId = this.userService.getCurrentUser().id
    const userPreferences = this.userService.getCurrentUser().preferences
    
    try {
      this.loggingService.info('Starting homescreen data retrieval', {
        userId,
        params,
      })

      // Check cache first unless force refresh is requested
      const cachedData = params.forceRefresh
        ? null
        : await this.getCachedHomescreenData(userId, params)

      if (cachedData) {
        this.loggingService.info('Returning cached homescreen data', {
          userId,
          cacheAge: Date.now() - (cachedData.cacheStatus.lastRefreshed?.getTime() || 0),
        })
        return cachedData
      }

      // Fetch fresh data from providers
      const homescreenData = await this.fetchFreshHomescreenData(userPreferences, params)

      // Cache the fresh data
      await this.cacheHomescreenData(userId, homescreenData)

      const executionTime = Date.now() - startTime
      this.loggingService.info('Completed homescreen data retrieval', {
        userId,
        executionTime,
        heroCount: homescreenData.heroItems.length,
        continueWatchingCount: homescreenData.continueWatching.length,
        catalogCount: homescreenData.catalogs.length,
      })

      return homescreenData

    } catch (error) {
      this.loggingService.error('Failed to retrieve homescreen data', error as Error, {
        userId,
        params,
        executionTime: Date.now() - startTime,
      })

      // Try to return stale cache data as fallback
      const staleData = await this.getStaleHomescreenData(userId)
      if (staleData) {
        this.loggingService.info('Returning stale cache data as fallback', { userId })
        return {
          ...staleData,
          cacheStatus: {
            isStale: true,
            lastRefreshed: staleData.cacheStatus.lastRefreshed,
          },
        }
      }

      // If no cache available, return minimal working data
      return this.getMinimalHomescreenData()
    }
  }

  /**
   * Fetch fresh homescreen data from providers
   */
  private async fetchFreshHomescreenData(
    userPreferences: UserPreferences,
    params: GetHomescreenDataParams
  ): Promise<HomescreenData> {
    // Fetch data sections in parallel for performance
    const [heroItems, continueWatching, catalogs] = await Promise.allSettled([
      this.fetchHeroItems(userPreferences, params.heroLimit),
      this.fetchContinueWatching(userPreferences, params.continueWatchingLimit),
      this.fetchCatalogs(userPreferences, params.itemsPerCatalog),
    ])

    return {
      heroItems: heroItems.status === 'fulfilled' ? heroItems.value : [],
      continueWatching: continueWatching.status === 'fulfilled' ? continueWatching.value : [],
      catalogs: catalogs.status === 'fulfilled' ? catalogs.value : [],
      cacheStatus: {
        isStale: false,
        lastRefreshed: new Date(),
      },
    }
  }

  /**
   * Fetch hero section items based on user preferences
   */
  private async fetchHeroItems(
    userPreferences: UserPreferences,
    limit: number = 10
  ): Promise<Media[]> {
    if (!userPreferences.homescreen.heroEnabled) {
      return []
    }

    try {
      // Get providers that support catalog capability
      const catalogProviders = this.providerRegistry
        .getProvidersForCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG, true)

      if (catalogProviders.length === 0) {
        this.loggingService.warn('No catalog providers available for hero items')
        return []
      }

      // Fetch trending/popular catalogs for hero section
      const heroPromises = catalogProviders.map(async (provider) => {
        try {
          const catalogs = await provider.getCatalogs()
          // Look for trending, popular, or featured catalogs
          const heroCatalog = catalogs.find(catalog => 
            ['trending', 'popular', 'featured', 'top_rated'].includes(catalog.category.toLowerCase())
          )
          return heroCatalog?.items.slice(0, Math.ceil(limit / catalogProviders.length))
            .map(item => item.media)
            .filter((media): media is Media => media !== undefined) || []
        } catch (error) {
          this.loggingService.warn('Failed to fetch hero items from provider', {
            providerId: provider.metadata?.id,
            error: (error as Error).message,
          })
          return []
        }
      })

      const heroResults = await Promise.allSettled(heroPromises)
      const allHeroItems = heroResults
        .filter((result): result is PromiseFulfilledResult<Media[]> => result.status === 'fulfilled')
        .flatMap(result => result.value)

      // Remove duplicates and limit results
      const uniqueHeroItems = this.removeDuplicateMedia(allHeroItems)
      return uniqueHeroItems.slice(0, limit)

    } catch (error) {
      this.loggingService.error('Failed to fetch hero items', error as Error)
      return []
    }
  }

  /**
   * Fetch continue watching items if user is authenticated
   */
  private async fetchContinueWatching(
    userPreferences: UserPreferences,
    limit: number = 20
  ): Promise<ContinueWatchingItem[]> {
    if (!userPreferences.homescreen.showContinueWatching || !this.userService.hasTraktAuth()) {
      return []
    }

    try {
      // Get providers that support continue watching capability
      const continueWatchingProviders = this.providerRegistry
        .getProvidersForCapability<IMediaContinueWatchingCapability>(
          CapabilityType.MEDIA_CONTINUE_WATCHING,
          true
        )

      if (continueWatchingProviders.length === 0) {
        this.loggingService.info('No continue watching providers available')
        return []
      }

      // Use the first available provider (typically Trakt)
      const provider = continueWatchingProviders[0]
      
      if (provider.requiresAuth() && !this.userService.hasTraktAuth()) {
        this.loggingService.info('Continue watching requires authentication but user not authenticated')
        return []
      }

      const continueWatchingItems = await provider.getContinueWatching({ limit })
      
      // Sort by most recently watched
      return continueWatchingItems.sort((a, b) => 
        b.pausedAt.getTime() - a.pausedAt.getTime()
      )

    } catch (error) {
      this.loggingService.error('Failed to fetch continue watching items', error as Error)
      return []
    }
  }

  /**
   * Fetch catalog sections based on user preferences
   */
  private async fetchCatalogs(
    userPreferences: UserPreferences,
    itemsPerCatalog: number = 20
  ): Promise<Catalog[]> {
    try {
      // Get providers that support catalog capability
      const catalogProviders = this.providerRegistry
        .getProvidersForCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG, true)

      if (catalogProviders.length === 0) {
        this.loggingService.warn('No catalog providers available')
        return []
      }

      // Fetch catalogs from all providers
      const catalogPromises = catalogProviders.map(async (provider) => {
        try {
          const catalogs = await provider.getCatalogs()
          return catalogs.map(catalog => ({
            ...catalog,
            items: catalog.items.slice(0, itemsPerCatalog),
          }))
        } catch (error) {
          this.loggingService.warn('Failed to fetch catalogs from provider', {
            providerId: provider.metadata?.id,
            error: (error as Error).message,
          })
          return []
        }
      })

      const catalogResults = await Promise.allSettled(catalogPromises)
      const allCatalogs = catalogResults
        .filter((result): result is PromiseFulfilledResult<Catalog[]> => result.status === 'fulfilled')
        .flatMap(result => result.value)

      // Filter and order catalogs based on user preferences
      return this.filterAndOrderCatalogs(allCatalogs, userPreferences)

    } catch (error) {
      this.loggingService.error('Failed to fetch catalogs', error as Error)
      return []
    }
  }

  /**
   * Filter and order catalogs based on user preferences
   */
  private filterAndOrderCatalogs(
    catalogs: Catalog[],
    userPreferences: UserPreferences
  ): Catalog[] {
    const { selectedCatalogIds, catalogOrder } = userPreferences.homescreen

    // If no specific catalogs selected, return all with default ordering
    if (selectedCatalogIds.length === 0) {
      return catalogs.sort((a, b) => {
        // Default priority: trending > popular > top_rated > others
        const priorityOrder = ['trending', 'popular', 'top_rated']
        const aPriority = priorityOrder.indexOf(a.category.toLowerCase())
        const bPriority = priorityOrder.indexOf(b.category.toLowerCase())
        
        if (aPriority !== -1 && bPriority !== -1) {
          return aPriority - bPriority
        }
        if (aPriority !== -1) return -1
        if (bPriority !== -1) return 1
        return a.name.localeCompare(b.name)
      })
    }

    // Filter to selected catalogs only
    const selectedCatalogs = catalogs.filter(catalog =>
      selectedCatalogIds.includes(catalog.stableId)
    )

    // Order according to user preferences
    return selectedCatalogs.sort((a, b) => {
      const aIndex = catalogOrder.indexOf(a.stableId)
      const bIndex = catalogOrder.indexOf(b.stableId)
      
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      return a.name.localeCompare(b.name)
    })
  }

  /**
   * Remove duplicate media items based on stable ID
   */
  private removeDuplicateMedia(mediaItems: Media[]): Media[] {
    const seen = new Set<string>()
    return mediaItems.filter(media => {
      if (seen.has(media.stableId)) {
        return false
      }
      seen.add(media.stableId)
      return true
    })
  }

  /**
   * Get cached homescreen data if available and fresh
   */
  private async getCachedHomescreenData(
    userId: string,
    params: GetHomescreenDataParams
  ): Promise<HomescreenData | null> {
    try {
      const cacheKey = this.cacheService.keys.userPreferences(userId) + ':homescreen'
      const cachedData = await this.cacheService.get<HomescreenData>(cacheKey)
      
      if (cachedData && !cachedData.cacheStatus.isStale) {
        return cachedData
      }
      
      return null
    } catch (error) {
      this.loggingService.warn('Failed to retrieve cached homescreen data', {
        userId,
        error: (error as Error).message,
      })
      return null
    }
  }

  /**
   * Cache homescreen data for future use
   */
  private async cacheHomescreenData(
    userId: string,
    data: HomescreenData
  ): Promise<void> {
    try {
      const cacheKey = this.cacheService.keys.userPreferences(userId) + ':homescreen'
      await this.cacheService.set(cacheKey, data, {
        ttl: 10 * 60 * 1000, // 10 minutes
        persistent: true,
      })
    } catch (error) {
      this.loggingService.warn('Failed to cache homescreen data', {
        userId,
        error: (error as Error).message,
      })
    }
  }

  /**
   * Get stale cached data as fallback
   */
  private async getStaleHomescreenData(userId: string): Promise<HomescreenData | null> {
    try {
      const cacheKey = this.cacheService.keys.userPreferences(userId) + ':homescreen'
      return await this.cacheService.get<HomescreenData>(cacheKey)
    } catch (error) {
      this.loggingService.warn('Failed to retrieve stale homescreen data', {
        userId,
        error: (error as Error).message,
      })
      return null
    }
  }

  /**
   * Get minimal homescreen data when all else fails
   */
  private getMinimalHomescreenData(): HomescreenData {
    return {
      heroItems: [],
      continueWatching: [],
      catalogs: [],
      cacheStatus: {
        isStale: true,
        lastRefreshed: null,
      },
    }
  }
}