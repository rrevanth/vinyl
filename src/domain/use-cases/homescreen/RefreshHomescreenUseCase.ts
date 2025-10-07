import type { HomescreenData } from './GetHomescreenDataUseCase'
import type { GetHomescreenDataUseCase } from './GetHomescreenDataUseCase'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { ICacheService } from '@/src/domain/services/ICacheService'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'
import { DomainError } from '@/src/domain/errors/DomainError'

/**
 * Parameters for homescreen refresh operation
 */
export interface RefreshHomescreenParams {
  /** Whether to invalidate all homescreen-related cache */
  readonly invalidateCache?: boolean
  
  /** Specific sections to refresh (if empty, refreshes all) */
  readonly sections?: readonly ('hero' | 'continueWatching' | 'catalogs')[]
  
  /** Whether to force refresh even if recent data exists */
  readonly force?: boolean
  
  /** Timeout for refresh operation in milliseconds */
  readonly timeout?: number
}

/**
 * Result of homescreen refresh operation
 */
export interface RefreshHomescreenResult {
  /** Refreshed homescreen data */
  readonly data: HomescreenData
  
  /** Sections that were actually refreshed */
  readonly refreshedSections: readonly ('hero' | 'continueWatching' | 'catalogs')[]
  
  /** Whether any cache was invalidated */
  readonly cacheInvalidated: boolean
  
  /** Refresh operation timing */
  readonly timing: {
    readonly startTime: Date
    readonly endTime: Date
    readonly durationMs: number
  }
  
  /** Any errors that occurred during refresh (non-blocking) */
  readonly errors: readonly {
    readonly section: string
    readonly error: string
    readonly recoverable: boolean
  }[]
  
  /** Success status */
  readonly success: boolean
}

/**
 * Use case that handles pull-to-refresh functionality for the homescreen.
 * Coordinates cache invalidation and fresh data fetching while providing
 * detailed feedback about the refresh operation status and performance.
 * 
 * This use case implements intelligent refresh logic that can target specific
 * sections, handle partial failures gracefully, and provide comprehensive
 * feedback for UI state management.
 */
export class RefreshHomescreenUseCase {
  constructor(
    private readonly getHomescreenDataUseCase: GetHomescreenDataUseCase,
    private readonly userService: IUserService,
    private readonly cacheService: ICacheService,
    private readonly loggingService: ILoggingService
  ) {}

  /**
   * Execute homescreen refresh operation
   * 
   * @param params - Parameters controlling refresh behavior
   * @returns Result containing refreshed data and operation metadata
   * @throws DomainError if refresh operation fails completely
   */
  async execute(params: RefreshHomescreenParams = {}): Promise<RefreshHomescreenResult> {
    const startTime = new Date()
    const userId = this.userService.getCurrentUser().id
    const timeout = params.timeout ?? 30000 // 30 seconds default
    const errors: Array<{ section: string; error: string; recoverable: boolean }> = []

    try {
      this.loggingService.info('Starting homescreen refresh', {
        userId,
        params,
      })

      // Create timeout promise for the entire operation
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Refresh operation timed out')), timeout)
      })

      // Execute refresh with timeout
      const refreshPromise = this.executeRefreshOperation(params, userId, errors)
      const result = await Promise.race([refreshPromise, timeoutPromise])

      const endTime = new Date()
      const durationMs = endTime.getTime() - startTime.getTime()

      this.loggingService.info('Completed homescreen refresh', {
        userId,
        durationMs,
        errorCount: errors.length,
        success: result.success,
      })

      return {
        ...result,
        timing: {
          startTime,
          endTime,
          durationMs,
        },
        errors,
      }

    } catch (error) {
      const endTime = new Date()
      const durationMs = endTime.getTime() - startTime.getTime()

      this.loggingService.error('Homescreen refresh failed', error as Error, {
        userId,
        durationMs,
        params,
      })

      // Try to return cached data as fallback
      const fallbackData = await this.getFallbackData(userId)

      return {
        data: fallbackData,
        refreshedSections: [],
        cacheInvalidated: false,
        timing: {
          startTime,
          endTime,
          durationMs,
        },
        errors: [
          ...errors,
          {
            section: 'overall',
            error: (error as Error).message,
            recoverable: false,
          },
        ],
        success: false,
      }
    }
  }

  /**
   * Execute the actual refresh operation
   */
  private async executeRefreshOperation(
    params: RefreshHomescreenParams,
    userId: string,
    errors: Array<{ section: string; error: string; recoverable: boolean }>
  ): Promise<Omit<RefreshHomescreenResult, 'timing' | 'errors'>> {
    let cacheInvalidated = false

    // Invalidate cache if requested
    if (params.invalidateCache) {
      try {
        await this.invalidateHomescreenCache(userId, params.sections)
        cacheInvalidated = true
        this.loggingService.info('Invalidated homescreen cache', { userId })
      } catch (error) {
        errors.push({
          section: 'cache',
          error: `Failed to invalidate cache: ${(error as Error).message}`,
          recoverable: true,
        })
      }
    }

    // Determine if refresh is needed
    if (!params.force && !params.invalidateCache) {
      const recentDataExists = await this.hasRecentData(userId)
      if (recentDataExists) {
        this.loggingService.info('Recent data exists, skipping refresh', { userId })
        
        // Get existing data without forcing refresh
        const data = await this.getHomescreenDataUseCase.execute({
          forceRefresh: false,
        })

        return {
          data,
          refreshedSections: [],
          cacheInvalidated: false,
          success: true,
        }
      }
    }

    // Fetch fresh homescreen data
    try {
      const data = await this.getHomescreenDataUseCase.execute({
        forceRefresh: true, // Always force refresh for explicit refresh operations
        heroLimit: 10,
        continueWatchingLimit: 20,
        itemsPerCatalog: 20,
        includeCacheStatus: true,
      })

      // Determine which sections were actually refreshed
      const refreshedSections = this.determineRefreshedSections(data, params.sections)

      return {
        data,
        refreshedSections,
        cacheInvalidated,
        success: true,
      }

    } catch (error) {
      this.loggingService.error('Failed to fetch fresh homescreen data', error as Error, {
        userId,
      })

      errors.push({
        section: 'data',
        error: `Failed to fetch data: ${(error as Error).message}`,
        recoverable: false,
      })

      // Try to get cached data as fallback
      const fallbackData = await this.getFallbackData(userId)

      return {
        data: fallbackData,
        refreshedSections: [],
        cacheInvalidated,
        success: false,
      }
    }
  }

  /**
   * Invalidate homescreen cache for specific sections or all
   */
  private async invalidateHomescreenCache(
    userId: string,
    sections?: readonly ('hero' | 'continueWatching' | 'catalogs')[]
  ): Promise<void> {
    const promises: Promise<void>[] = []

    if (!sections || sections.length === 0) {
      // Invalidate all homescreen cache
      promises.push(
        this.cacheService.invalidatePattern(`*${userId}*homescreen*`),
        this.cacheService.invalidatePattern(`*hero*${userId}*`),
        this.cacheService.invalidatePattern(`*continueWatching*${userId}*`),
        this.cacheService.invalidatePattern(`*catalog*`)
      )
    } else {
      // Invalidate specific sections
      for (const section of sections) {
        switch (section) {
          case 'hero':
            promises.push(this.cacheService.invalidatePattern(`*hero*${userId}*`))
            break
          case 'continueWatching':
            promises.push(this.cacheService.invalidatePattern(`*continueWatching*${userId}*`))
            break
          case 'catalogs':
            promises.push(this.cacheService.invalidatePattern(`*catalog*`))
            break
        }
      }
    }

    await Promise.allSettled(promises)
  }

  /**
   * Check if recent data exists in cache
   */
  private async hasRecentData(userId: string): Promise<boolean> {
    try {
      const cacheKey = this.cacheService.keys.userPreferences(userId) + ':homescreen'
      const cachedData = await this.cacheService.get(cacheKey)
      
      if (!cachedData) {
        return false
      }

      // Check if data is recent (less than 5 minutes old)
      const dataTimestamp = (cachedData as any)?.cacheStatus?.lastRefreshed
      if (dataTimestamp) {
        const age = Date.now() - new Date(dataTimestamp).getTime()
        return age < 5 * 60 * 1000 // 5 minutes
      }

      return false
    } catch (error) {
      this.loggingService.warn('Failed to check for recent data', {
        userId,
        error: (error as Error).message,
      })
      return false
    }
  }

  /**
   * Determine which sections were actually refreshed based on data
   */
  private determineRefreshedSections(
    data: HomescreenData,
    requestedSections?: readonly ('hero' | 'continueWatching' | 'catalogs')[]
  ): readonly ('hero' | 'continueWatching' | 'catalogs')[] {
    const refreshed: ('hero' | 'continueWatching' | 'catalogs')[] = []

    // If no specific sections requested, assume all were refreshed
    if (!requestedSections || requestedSections.length === 0) {
      if (data.heroItems.length > 0) refreshed.push('hero')
      if (data.continueWatching.length > 0) refreshed.push('continueWatching')
      if (data.catalogs.length > 0) refreshed.push('catalogs')
      return refreshed
    }

    // Check requested sections that have data
    for (const section of requestedSections) {
      switch (section) {
        case 'hero':
          if (data.heroItems.length > 0) refreshed.push('hero')
          break
        case 'continueWatching':
          if (data.continueWatching.length > 0) refreshed.push('continueWatching')
          break
        case 'catalogs':
          if (data.catalogs.length > 0) refreshed.push('catalogs')
          break
      }
    }

    return refreshed
  }

  /**
   * Get fallback data when refresh fails
   */
  private async getFallbackData(userId: string): Promise<HomescreenData> {
    try {
      // Try to get any cached data, even if stale
      const cacheKey = this.cacheService.keys.userPreferences(userId) + ':homescreen'
      const cachedData = await this.cacheService.get<HomescreenData>(cacheKey)
      
      if (cachedData) {
        this.loggingService.info('Using cached fallback data', { userId })
        return {
          ...cachedData,
          cacheStatus: {
            isStale: true,
            lastRefreshed: cachedData.cacheStatus.lastRefreshed,
          },
        }
      }

      // If no cache available, return minimal data
      this.loggingService.warn('No fallback data available, returning empty state', { userId })
      return {
        heroItems: [],
        continueWatching: [],
        catalogs: [],
        cacheStatus: {
          isStale: true,
          lastRefreshed: null,
        },
      }

    } catch (error) {
      this.loggingService.error('Failed to get fallback data', error as Error, { userId })
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
}