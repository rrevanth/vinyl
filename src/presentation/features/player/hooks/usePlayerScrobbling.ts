import { useCallback, useRef, useEffect } from 'react'
import type { Media } from '@/src/domain/entities/Media'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { ScrobbleMediaUseCase } from '@/src/domain/use-cases/media/ScrobbleMediaUseCase'

/**
 * Hook for managing playback scrobbling to services like Trakt
 * Automatically tracks watch progress and marks content as watched
 */
export const usePlayerScrobbling = (
  media: Media | null,
  seasonNumber?: number,
  episodeNumber?: number
) => {
  const scrobbleUseCase = useService<ScrobbleMediaUseCase>(TOKENS.ScrobbleMediaUseCase)

  // Track scrobble state
  const lastScrobbleTimeRef = useRef<number>(0)
  const hasScrobbledCompleteRef = useRef<boolean>(false)
  const hasScrobbledStartRef = useRef<boolean>(false)

  // Reset scrobble state when media changes
  useEffect(() => {
    lastScrobbleTimeRef.current = 0
    hasScrobbledCompleteRef.current = false
    hasScrobbledStartRef.current = false
  }, [media?.stableId, seasonNumber, episodeNumber])

  /**
   * Handle playback progress updates
   * Scrobbles at intervals and marks as watched when reaching threshold
   */
  const handleProgressUpdate = useCallback(
    async (currentTime: number, duration: number) => {
      if (!media || duration === 0) return

      const progress = (currentTime / duration) * 100
      const episodeInfo =
        seasonNumber !== undefined && episodeNumber !== undefined
          ? { season: seasonNumber, episode: episodeNumber }
          : undefined

      // Initial scrobble when playback starts (>1% progress)
      if (progress > 1 && !hasScrobbledStartRef.current) {
        await scrobbleUseCase.start(media, progress, episodeInfo)
        hasScrobbledStartRef.current = true
        lastScrobbleTimeRef.current = Date.now()
        return
      }

      // Periodic scrobble updates every 30 seconds
      const now = Date.now()
      const timeSinceLastScrobble = now - lastScrobbleTimeRef.current
      const shouldScrobble = timeSinceLastScrobble >= 30000 // 30 seconds

      if (shouldScrobble && hasScrobbledStartRef.current) {
        await scrobbleUseCase.pause(media, progress, episodeInfo)
        lastScrobbleTimeRef.current = now
      }

      // Mark as watched when reaching 90% completion
      if (progress >= 90 && !hasScrobbledCompleteRef.current) {
        await scrobbleUseCase.stop(media, progress, episodeInfo)
        hasScrobbledCompleteRef.current = true
      }
    },
    [media, seasonNumber, episodeNumber, scrobbleUseCase]
  )

  /**
   * Handle playback start
   */
  const handlePlay = useCallback(async () => {
    if (!media) return

    const episodeInfo =
      seasonNumber !== undefined && episodeNumber !== undefined
        ? { season: seasonNumber, episode: episodeNumber }
        : undefined

    if (!hasScrobbledStartRef.current) {
      await scrobbleUseCase.start(media, 0, episodeInfo)
      hasScrobbledStartRef.current = true
      lastScrobbleTimeRef.current = Date.now()
    }
  }, [media, seasonNumber, episodeNumber, scrobbleUseCase])

  /**
   * Handle playback pause
   */
  const handlePause = useCallback(
    async (currentTime: number, duration: number) => {
      if (!media || !hasScrobbledStartRef.current) return

      const progress = duration > 0 ? (currentTime / duration) * 100 : 0
      const episodeInfo =
        seasonNumber !== undefined && episodeNumber !== undefined
          ? { season: seasonNumber, episode: episodeNumber }
          : undefined

      await scrobbleUseCase.pause(media, progress, episodeInfo)
    },
    [media, seasonNumber, episodeNumber, scrobbleUseCase]
  )

  /**
   * Handle playback stop/close
   */
  const handleStop = useCallback(
    async (currentTime: number, duration: number) => {
      if (!media || !hasScrobbledStartRef.current) return

      const progress = duration > 0 ? (currentTime / duration) * 100 : 0
      const episodeInfo =
        seasonNumber !== undefined && episodeNumber !== undefined
          ? { season: seasonNumber, episode: episodeNumber }
          : undefined

      // Only scrobble stop if we haven't already marked as complete
      if (!hasScrobbledCompleteRef.current) {
        await scrobbleUseCase.stop(media, progress, episodeInfo)
      }
    },
    [media, seasonNumber, episodeNumber, scrobbleUseCase]
  )

  return {
    handleProgressUpdate,
    handlePlay,
    handlePause,
    handleStop,
  }
}
