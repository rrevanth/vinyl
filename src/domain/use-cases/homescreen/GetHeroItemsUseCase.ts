import type { Media } from '@/src/domain/entities/Media'
import type { UserPreferences } from '@/src/domain/entities/UserPreferences'
import type { CatalogFilters } from '@/src/domain/entities/StableIdGenerator'
import type { IProviderRegistry } from '@/src/domain/providers/IProviderRegistry'
import type { ICacheService } from '@/src/domain/services/ICacheService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { IMediaCatalogCapability } from '@/src/domain/capabilities/IMediaCatalogCapability'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import { DomainError } from '@/src/domain/errors/DomainError'

/**
 * Parameters for customizing hero items retrieval
 */
export interface GetHeroItemsParams {
  /** Maximum number of hero items to return */
  readonly limit?: number
  
  /** Specific content types to include */
  readonly contentTypes?: readonly ('movie' | 'series')[]
  
  /** Minimum rating threshold (0-10) */
  readonly minRating?: number
  
  /** Exclude adult content regardless of user preferences */
  readonly excludeAdult?: boolean
  
  /** Force fresh data fetch, bypassing cache */
  readonly forceRefresh?: boolean
  
  /** Specific catalog categories to prioritize for hero items */
  readonly preferredCategories?: readonly string[]
}

/**
 * Result containing hero items and metadata
 */
export interface GetHeroItemsResult {
  /** Selected hero items for display */
  readonly heroItems: Media[]
  
  /** Total number of available hero items across all sources */
  readonly totalAvailable: number
  
  /** Sources that contributed to hero items */
  readonly sources: readonly {
    readonly providerId: string
    readonly category: string
    readonly itemCount: number
  }[]
  
  /** Whether data was loaded from cache */
  readonly fromCache: boolean
  
  /** Cache expiration time */
  readonly expiresAt: Date | null
}

/**
 * Use case that fetches hero section items based on user preferences.
 * Combines trending/popular content from multiple providers and applies
 * intelligent filtering and selection for optimal hero section content.
 * 
 * This use case implements sophisticated logic for selecting the most
 * appropriate content for the hero section, considering user preferences,
 * content quality, and provider diversity.
 */
export class GetHeroItemsUseCase {
  constructor(
    private readonly providerRegistry: IProviderRegistry,
    private readonly userService: IUserService,
    private readonly cacheService: ICacheService,
    private readonly loggingService: ILoggingService
  ) {}

  /**
   * Get hero items based on user preferences and parameters
   * 
   * @param params - Parameters for customizing hero item selection
   * @returns Hero items result with selected media and metadata
   * @throws DomainError if hero items cannot be retrieved
   */
  async execute(params: GetHeroItemsParams = {}): Promise<GetHeroItemsResult> {
    const startTime = Date.now()
    const currentUser = this.userService.getCurrentUser()
    const userPreferences = currentUser.preferences
    
    try {
      this.loggingService.info('Getting hero items', {
        userId: currentUser.id,
        params,
      })

      // Check if hero section is enabled
      if (!userPreferences.homescreen.heroEnabled) {
        return this.getEmptyResult()
      }

      // Check cache first unless force refresh
      if (!params.forceRefresh) {
        const cachedResult = await this.getCachedHeroItems(currentUser.id, params)
        if (cachedResult) {
          this.loggingService.info('Returning cached hero items', {
            userId: currentUser.id,
            itemCount: cachedResult.heroItems.length,
          })
          return cachedResult
        }
      }

      // Fetch fresh hero items
      const heroResult = await this.fetchFreshHeroItems(userPreferences, params)

      // Cache the result
      await this.cacheHeroItems(currentUser.id, params, heroResult)

      const executionTime = Date.now() - startTime
      this.loggingService.info('Successfully retrieved hero items', {
        userId: currentUser.id,
        itemCount: heroResult.heroItems.length,
        sourceCount: heroResult.sources.length,
        fromCache: false,
        executionTime,
      })

      return heroResult

    } catch (error) {
      this.loggingService.error('Failed to get hero items', error as Error, {
        userId: currentUser.id,
        params,
        executionTime: Date.now() - startTime,
      })

      // Try to return cached fallback
      const fallbackResult = await this.getCachedHeroItems(currentUser.id, params, true)
      if (fallbackResult) {
        this.loggingService.info('Returning cached fallback hero items', {
          userId: currentUser.id,
        })
        return fallbackResult
      }

      // Return empty result as last resort
      return this.getEmptyResult()
    }
  }

  /**
   * Fetch fresh hero items from providers
   */
  private async fetchFreshHeroItems(
    userPreferences: UserPreferences,
    params: GetHeroItemsParams
  ): Promise<GetHeroItemsResult> {
    const limit = params.limit ?? 10
    const preferredCategories = params.preferredCategories ?? [
      'trending', 'popular', 'top_rated', 'featured'
    ]

    // Get catalog providers
    const catalogProviders = this.providerRegistry
      .getProvidersForCapability<IMediaCatalogCapability>(CapabilityType.MEDIA_CATALOG, true)

    if (catalogProviders.length === 0) {
      this.loggingService.warn('No catalog providers available for hero items')
      return this.getEmptyResult()
    }

    // Fetch hero candidates from all providers
    const heroPromises = catalogProviders.map(async (provider) => {
      try {
        return await this.getHeroCandidatesFromProvider(
          provider,
          preferredCategories,
          userPreferences,
          params
        )
      } catch (error) {
        this.loggingService.warn('Failed to get hero candidates from provider', {
          providerId: provider.metadata?.id,
          error: (error as Error).message,
        })
        return {
          items: [],
          sources: [],
        }
      }
    })

    const heroResults = await Promise.allSettled(heroPromises)
    const allCandidates: Media[] = []
    const allSources: Array<{ providerId: string; category: string; itemCount: number }> = []

    // Collect all candidates and sources
    heroResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        allCandidates.push(...result.value.items)
        allSources.push(...result.value.sources)
      }
    })

    // Apply intelligent selection algorithm
    const selectedHeroItems = this.selectBestHeroItems(
      allCandidates,
      limit,
      userPreferences,
      params
    )

    return {
      heroItems: selectedHeroItems,
      totalAvailable: allCandidates.length,
      sources: allSources,
      fromCache: false,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    }
  }

  /**
   * Get hero candidates from a specific provider
   */
  private async getHeroCandidatesFromProvider(
    provider: IMediaCatalogCapability,
    preferredCategories: readonly string[],
    userPreferences: UserPreferences,
    params: GetHeroItemsParams
  ): Promise<{ items: Media[]; sources: Array<{ providerId: string; category: string; itemCount: number }> }> {
    const catalogs = await provider.getCatalogs()
    const items: Media[] = []
    const sources: Array<{ providerId: string; category: string; itemCount: number }> = []

    for (const catalog of catalogs) {
      // Skip if category not in preferred list
      if (!preferredCategories.includes(catalog.category.toLowerCase())) {
        continue
      }

      // Skip if content type filter doesn't match
      if (params.contentTypes && params.contentTypes.length > 0) {
        if (!params.contentTypes.includes(catalog.type as 'movie' | 'series')) {
          continue
        }
      }

      // Extract media items from catalog
      const mediaItems = catalog.items
        .map(item => item.media)
        .filter((media): media is Media => media !== undefined)

      if (mediaItems.length > 0) {
        items.push(...mediaItems)
        sources.push({
          providerId: catalog.providerId,
          category: catalog.category,
          itemCount: mediaItems.length,
        })
      }
    }

    return { items, sources }
  }

  /**
   * Apply intelligent selection algorithm to choose best hero items
   */
  private selectBestHeroItems(
    candidates: Media[],
    limit: number,
    userPreferences: UserPreferences,
    params: GetHeroItemsParams
  ): Media[] {
    // Remove duplicates based on stable ID
    const uniqueCandidates = this.removeDuplicates(candidates)

    // Apply filters
    let filteredCandidates = this.applyFilters(uniqueCandidates, userPreferences, params)

    // Score and rank items
    const scoredItems = filteredCandidates.map(media => ({
      media,
      score: this.calculateHeroScore(media, userPreferences),
    }))

    // Sort by score (highest first)
    scoredItems.sort((a, b) => b.score - a.score)

    // Apply diversity filter to avoid too many items from same series/franchise
    const diverseItems = this.applyDiversityFilter(scoredItems.map(item => item.media))

    // Return top items up to limit
    return diverseItems.slice(0, limit)
  }

  /**
   * Remove duplicate media items
   */
  private removeDuplicates(candidates: Media[]): Media[] {
    const seen = new Set<string>()
    return candidates.filter(media => {
      if (seen.has(media.stableId)) {
        return false
      }
      seen.add(media.stableId)
      return true
    })
  }

  /**
   * Apply content filters based on user preferences and parameters
   */
  private applyFilters(
    candidates: Media[],
    userPreferences: UserPreferences,
    params: GetHeroItemsParams
  ): Media[] {
    return candidates.filter(media => {
      // Adult content filter
      const excludeAdult = params.excludeAdult ?? !userPreferences.ui.showAdultContent
      if (excludeAdult && media.adult) {
        return false
      }

      // Rating filter
      if (params.minRating !== undefined) {
        const rating = media.ratings?.average || 0
        if (rating < params.minRating) {
          return false
        }
      }

      // Content language filter (prefer user's content language)
      const preferredLanguage = userPreferences.ui.contentLanguage
      if (media.originalLanguage && 
          preferredLanguage && 
          !media.originalLanguage.toLowerCase().startsWith(preferredLanguage.split('-')[0].toLowerCase())) {
        // Still include but with lower priority (handled in scoring)
      }

      return true
    })
  }

  /**
   * Calculate hero score for ranking items
   */
  private calculateHeroScore(media: Media, userPreferences: UserPreferences): number {
    let score = 0

    // Base popularity score
    if (media.popularity) {
      score += Math.min(media.popularity / 1000, 10) // Cap at 10 points
    }

    // Rating boost
    if (media.ratings?.average) {
      score += media.ratings.average // 0-10 points
    }

    // Vote count consideration (more votes = more reliable)
    if (media.ratings?.voteCount) {
      score += Math.min(Math.log10(media.ratings.voteCount), 5) // Cap at 5 points
    }

    // Recent content boost
    if (media.releaseDate) {
      const yearsDiff = new Date().getFullYear() - new Date(media.releaseDate).getFullYear()
      if (yearsDiff <= 2) {
        score += 3 // Recent content bonus
      } else if (yearsDiff <= 5) {
        score += 1 // Somewhat recent bonus
      }
    }

    // Language preference bonus
    const preferredLanguage = userPreferences.ui.contentLanguage.split('-')[0].toLowerCase()
    if (media.originalLanguage?.toLowerCase().startsWith(preferredLanguage)) {
      score += 2
    }

    // Penalize items without poster images
    if (!media.posterPath) {
      score -= 5
    }

    // Penalize items without backdrop images (important for hero display)
    if (!media.backdropPath) {
      score -= 3
    }

    return score
  }

  /**
   * Apply diversity filter to avoid too many similar items
   */
  private applyDiversityFilter(items: Media[]): Media[] {
    const result: Media[] = []
    const franchiseCounts = new Map<string, number>()

    for (const media of items) {
      // Extract potential franchise identifier (first word of title)
      const franchiseKey = media.title.split(' ')[0].toLowerCase()
      const currentCount = franchiseCounts.get(franchiseKey) || 0

      // Allow max 2 items from same franchise in hero section
      if (currentCount < 2) {
        result.push(media)
        franchiseCounts.set(franchiseKey, currentCount + 1)
      }
    }

    return result
  }

  /**
   * Get cached hero items
   */
  private async getCachedHeroItems(
    userId: string,
    params: GetHeroItemsParams,
    allowStale: boolean = false
  ): Promise<GetHeroItemsResult | null> {
    try {
      const cacheKey = this.generateHeroCacheKey(userId, params)
      const cached = await this.cacheService.get<GetHeroItemsResult>(cacheKey)
      
      if (cached) {
        const isExpired = cached.expiresAt && new Date() > cached.expiresAt
        if (!isExpired || allowStale) {
          return {
            ...cached,
            fromCache: true,
          }
        }
      }

      return null
    } catch (error) {
      this.loggingService.warn('Failed to get cached hero items', {
        userId,
        error: (error as Error).message,
      })
      return null
    }
  }

  /**
   * Cache hero items result
   */
  private async cacheHeroItems(
    userId: string,
    params: GetHeroItemsParams,
    result: GetHeroItemsResult
  ): Promise<void> {
    try {
      const cacheKey = this.generateHeroCacheKey(userId, params)
      await this.cacheService.set(cacheKey, result, {
        ttl: 15 * 60 * 1000, // 15 minutes
        persistent: true,
      })
    } catch (error) {
      this.loggingService.warn('Failed to cache hero items', {
        userId,
        error: (error as Error).message,
      })
    }
  }

  /**
   * Generate cache key for hero items
   */
  private generateHeroCacheKey(userId: string, params: GetHeroItemsParams): string {
    const keyParts = [
      'hero',
      userId,
      params.limit || 'default',
      (params.contentTypes || []).sort().join(','),
      params.minRating || 'any',
      params.excludeAdult ? 'no-adult' : 'adult-ok',
      (params.preferredCategories || []).sort().join(','),
    ]
    return keyParts.join(':')
  }

  /**
   * Get empty result for when hero items cannot be retrieved
   */
  private getEmptyResult(): GetHeroItemsResult {
    return {
      heroItems: [],
      totalAvailable: 0,
      sources: [],
      fromCache: false,
      expiresAt: null,
    }
  }
}