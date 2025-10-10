import { useCallback, useRef } from 'react'
import type { Media } from '@/src/domain/entities/Media'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { IStorageService } from '@/src/domain/services/IStorageService'

interface WatchProgressData {
  currentTime: number
  duration: number
  timestamp: number
  seasonNumber?: number
  episodeNumber?: number
}

/**
 * Hook for managing local watch progress storage
 * Saves playback position and allows resuming from where user left off
 */
export const useWatchProgress = (
  media: Media | null,
  seasonNumber?: number,
  episodeNumber?: number
) => {
  const storage = useService<IStorageService>(TOKENS.StorageService)
  const lastSaveTimeRef = useRef<number>(0)

  /**
   * Generate storage key for watch progress
   */
  const getStorageKey = useCallback((): string | null => {
    if (!media) return null

    const baseKey = `watch-progress:${media.stableId}`

    if (seasonNumber !== undefined && episodeNumber !== undefined) {
      return `${baseKey}:s${seasonNumber}e${episodeNumber}`
    }

    return baseKey
  }, [media, seasonNumber, episodeNumber])

  /**
   * Save watch progress (throttled to every 10 seconds)
   */
  const saveProgress = useCallback(
    async (currentTime: number, duration: number) => {
      const key = getStorageKey()
      if (!key) return

      // Throttle saves to every 10 seconds
      const now = Date.now()
      const timeSinceLastSave = now - lastSaveTimeRef.current
      if (timeSinceLastSave < 10000) return

      const progressData: WatchProgressData = {
        currentTime,
        duration,
        timestamp: now,
        seasonNumber,
        episodeNumber,
      }

      try {
        await storage.set(key, progressData)
        lastSaveTimeRef.current = now
      } catch (error) {
        console.warn('[useWatchProgress] Failed to save progress:', error)
      }
    },
    [getStorageKey, storage, seasonNumber, episodeNumber]
  )

  /**
   * Load saved watch progress
   * @returns Current time in seconds if progress exists and is recent (< 7 days old)
   */
  const loadProgress = useCallback(async (): Promise<number | null> => {
    const key = getStorageKey()
    if (!key) return null

    try {
      const saved = await storage.get<WatchProgressData>(key)
      if (!saved) return null

      // Check if progress is recent (< 7 days)
      const age = Date.now() - saved.timestamp
      const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 days
      if (age > maxAge) {
        // Progress is too old, ignore it
        return null
      }

      // Don't resume if already near the end (> 95%)
      const progress = (saved.currentTime / saved.duration) * 100
      if (progress > 95) {
        return null
      }

      return saved.currentTime
    } catch (error) {
      console.warn('[useWatchProgress] Failed to load progress:', error)
      return null
    }
  }, [getStorageKey, storage])

  /**
   * Clear watch progress
   */
  const clearProgress = useCallback(async () => {
    const key = getStorageKey()
    if (!key) return

    try {
      await storage.remove(key)
    } catch (error) {
      console.warn('[useWatchProgress] Failed to clear progress:', error)
    }
  }, [getStorageKey, storage])

  return {
    saveProgress,
    loadProgress,
    clearProgress,
  }
}
