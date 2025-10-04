import type { QueryClient } from '@tanstack/react-query'
import type { ILoggingService } from '../../../../domain/services/ILoggingService'

/**
 * Unified cache management for Stremio TanStack Query caches
 *
 * Provides utilities for managing, monitoring, and clearing
 * both manifest and processed addon caches.
 */
export class StremioCacheManager {
  constructor(
    private readonly queryClient: QueryClient,
    private readonly logger: ILoggingService
  ) {}

  /**
   * Get comprehensive cache statistics
   */
  getCacheStats() {
    const queryCache = this.queryClient.getQueryCache()

    const manifestQueries = queryCache.findAll({
      queryKey: ['stremio', 'manifest'],
    })

    const processedQueries = queryCache.findAll({
      queryKey: ['stremio', 'processed-addon'],
    })

    const manifestStats = this.calculateQueryStats(manifestQueries, 'manifest')
    const processedStats = this.calculateQueryStats(processedQueries, 'processed')

    return {
      manifests: manifestStats,
      processedAddons: processedStats,
      total: {
        queryCount: manifestStats.queryCount + processedStats.queryCount,
        totalSize: manifestStats.totalSize + processedStats.totalSize,
        staleQueries: manifestStats.staleQueries + processedStats.staleQueries,
        errorQueries: manifestStats.errorQueries + processedStats.errorQueries,
      },
    }
  }

  /**
   * Clear all Stremio caches
   */
  async clearAllCaches(): Promise<void> {
    await this.queryClient.invalidateQueries({
      queryKey: ['stremio'],
    })

    this.logger.info('Cleared all Stremio TanStack Query caches')
  }

  /**
   * Clear only manifest caches
   */
  async clearManifestCaches(): Promise<void> {
    await this.queryClient.invalidateQueries({
      queryKey: ['stremio', 'manifest'],
    })

    this.logger.info('Cleared Stremio manifest caches')
  }

  /**
   * Clear only processed addon caches
   */
  async clearProcessedAddonCaches(): Promise<void> {
    await this.queryClient.invalidateQueries({
      queryKey: ['stremio', 'processed-addon'],
    })

    this.logger.info('Cleared Stremio processed addon caches')
  }

  /**
   * Force refresh of a specific addon's caches
   */
  async refreshAddon(transportUrl: string): Promise<void> {
    // Invalidate both manifest and processed data
    await this.queryClient.invalidateQueries({
      queryKey: ['stremio', 'manifest', transportUrl],
    })

    await this.queryClient.invalidateQueries({
      queryKey: ['stremio', 'processed-addon', transportUrl],
    })

    this.logger.debug(`Refreshed caches for addon: ${transportUrl}`)
  }

  /**
   * Remove stale cache entries
   */
  async cleanupStaleCaches(): Promise<number> {
    const queryCache = this.queryClient.getQueryCache()
    const staleQueries = queryCache.findAll({
      queryKey: ['stremio'],
      stale: true,
    })

    let removedCount = 0
    staleQueries.forEach((query) => {
      queryCache.remove(query)
      removedCount++
    })

    this.logger.info(`Cleaned up ${removedCount} stale Stremio cache entries`)
    return removedCount
  }

  /**
   * Get cache health information
   */
  getCacheHealth() {
    const stats = this.getCacheStats()
    const total = stats.total

    let status: 'healthy' | 'warning' | 'critical' = 'healthy'
    const issues: string[] = []

    // Check for high error rate
    const errorRate = total.queryCount > 0 ? total.errorQueries / total.queryCount : 0
    if (errorRate > 0.2) {
      status = 'critical'
      issues.push(`High error rate: ${(errorRate * 100).toFixed(1)}%`)
    } else if (errorRate > 0.1) {
      status = 'warning'
      issues.push(`Elevated error rate: ${(errorRate * 100).toFixed(1)}%`)
    }

    // Check for high stale rate
    const staleRate = total.queryCount > 0 ? total.staleQueries / total.queryCount : 0
    if (staleRate > 0.5) {
      if (status !== 'critical') status = 'warning'
      issues.push(`High stale rate: ${(staleRate * 100).toFixed(1)}%`)
    }

    // Check cache size (warn if > 10MB)
    const sizeMB = total.totalSize / (1024 * 1024)
    if (sizeMB > 10) {
      if (status !== 'critical') status = 'warning'
      issues.push(`Large cache size: ${sizeMB.toFixed(1)}MB`)
    }

    return {
      status,
      issues,
      stats: total,
      recommendations: this.generateRecommendations(status, issues),
    }
  }

  /**
   * Calculate statistics for a set of queries
   */
  private calculateQueryStats(queries: any[], type: string) {
    let totalSize = 0
    let staleQueries = 0
    let errorQueries = 0

    queries.forEach((query) => {
      const data = query.state.data
      if (data) {
        totalSize += JSON.stringify(data).length
      }

      if (query.isStale()) {
        staleQueries++
      }

      if (query.state.status === 'error') {
        errorQueries++
      }
    })

    return {
      queryCount: queries.length,
      totalSize,
      staleQueries,
      errorQueries,
      averageSize: queries.length > 0 ? totalSize / queries.length : 0,
    }
  }

  /**
   * Generate cache management recommendations
   */
  private generateRecommendations(status: string, issues: string[]): string[] {
    const recommendations: string[] = []

    if (issues.some((issue) => issue.includes('error rate'))) {
      recommendations.push('Check network connectivity and addon server availability')
      recommendations.push('Consider clearing caches to refresh failed requests')
    }

    if (issues.some((issue) => issue.includes('stale rate'))) {
      recommendations.push('Consider cleaning up stale cache entries')
      recommendations.push('Check if cache TTL settings are appropriate')
    }

    if (issues.some((issue) => issue.includes('cache size'))) {
      recommendations.push('Clear old cache entries to free up storage')
      recommendations.push('Consider reducing cache TTL for less frequently accessed data')
    }

    if (status === 'healthy' && recommendations.length === 0) {
      recommendations.push('Cache is performing well - no action needed')
    }

    return recommendations
  }
}
