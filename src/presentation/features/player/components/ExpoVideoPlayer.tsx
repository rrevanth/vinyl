import React, { useState, useEffect } from 'react'
import { View, Pressable, Text } from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native-unistyles'
import type { Media } from '@/src/domain/entities/Media'
import type { Stream } from '@/src/domain/entities/Stream'
import { usePlayerScrobbling } from '../hooks/usePlayerScrobbling'
import { useWatchProgress } from '../hooks/useWatchProgress'

interface ExpoVideoPlayerProps {
  media: Media
  stream: Stream
  seasonNumber?: number
  episodeNumber?: number
  onClose: () => void
}

export const ExpoVideoPlayer: React.FC<ExpoVideoPlayerProps> = ({
  media,
  stream,
  seasonNumber,
  episodeNumber,
  onClose,
}) => {
  const [error, setError] = useState<string | null>(null)

  // Scrobbling hook (Trakt integration)
  const { handleProgressUpdate, handleStop } = usePlayerScrobbling(
    media,
    seasonNumber,
    episodeNumber
  )

  // Watch progress hook (local storage)
  const { saveProgress, loadProgress } = useWatchProgress(media, seasonNumber, episodeNumber)

  // Create video player instance with source
  const player = useVideoPlayer(
    {
      uri: stream.url,
      headers: stream.headers,
    },
    (player) => {
      // Setup function called when player is ready
      player.loop = false
      player.audioMixingMode = 'duckOthers' // Lower other apps' volume, play in silent mode
      player.staysActiveInBackground = true // Continue playing in background
      player.showNowPlayingNotification = true // Show now playing notification
      player.play()
    }
  )

  // Debug logging on mount
  useEffect(() => {
    console.log('[ExpoVideoPlayer] Component mounted')
    console.log('[ExpoVideoPlayer] Audio mode: duckOthers, background playback: enabled')
  }, [])

  // Load saved watch progress and resume
  useEffect(() => {
    const resumeProgress = async () => {
      const savedTime = await loadProgress()
      if (savedTime && player) {
        console.log('[ExpoVideoPlayer] Resuming from:', savedTime, 'seconds')
        player.currentTime = savedTime
      }
    }

    resumeProgress()
  }, [loadProgress, player])

  // Log stream details
  useEffect(() => {
    console.log('[ExpoVideoPlayer] Stream URL:', stream.url)
    console.log('[ExpoVideoPlayer] Stream source:', stream.source)
    console.log('[ExpoVideoPlayer] Stream headers:', stream.headers || 'none')

    if (stream.source === 'torrent' || stream.infoHash) {
      console.error('[ExpoVideoPlayer] ❌ Cannot play torrent streams with expo-video')
      setError('Torrent streams are not supported. Please select a direct stream.')
    }
  }, [stream])

  // Monitor playback status for scrobbling and progress saving
  useEffect(() => {
    if (!player) return

    let progressInterval: NodeJS.Timeout | null = null

    const startMonitoring = () => {
      progressInterval = setInterval(() => {
        const currentTime = player.currentTime
        const duration = player.duration

        if (duration > 0) {
          // Scrobble to services (Trakt if authenticated)
          handleProgressUpdate(currentTime, duration)

          // Save local watch progress
          saveProgress(currentTime, duration)

          // Log playback progress periodically (every 30 seconds)
          const currentTimeRounded = Math.floor(currentTime)
          if (currentTimeRounded % 30 === 0 && player.playing) {
            console.log('[ExpoVideoPlayer] Playback progress:', {
              position: currentTimeRounded,
              duration: Math.floor(duration),
              progress: Math.round((currentTime / duration) * 100),
              isPlaying: player.playing,
            })
          }
        }
      }, 1000) // Check every second
    }

    startMonitoring()

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval)
      }
    }
  }, [player, handleProgressUpdate, saveProgress])

  // Cleanup: stop scrobbling when component unmounts
  useEffect(() => {
    return () => {
      const cleanup = async () => {
        if (player) {
          const currentTime = player.currentTime
          const duration = player.duration
          await handleStop(currentTime, duration)
        }
      }
      cleanup()
    }
  }, [player, handleStop])

  // Handle player errors (VideoView doesn't have onError prop, monitor player.status instead)
  useEffect(() => {
    if (!player) return

    // Monitor player status for errors
    const checkInterval = setInterval(() => {
      if (player.status === 'error') {
        console.error('[ExpoVideoPlayer] Playback error detected')
        setError('An error occurred during playback. Please try again.')
      }
    }, 1000)

    return () => clearInterval(checkInterval)
  }, [player])

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#FF3B30" />
          <Text style={styles.errorText}>Playback Error</Text>
          <Text style={styles.errorDetails}>{error}</Text>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Close button overlay */}
      <Pressable
        style={styles.closeButtonOverlay}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close player"
      >
        <Ionicons name="close-circle" size={40} color="white" />
      </Pressable>

      {/* Video player */}
      <VideoView
        player={player}
        style={styles.video}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls
        contentFit="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  closeButtonOverlay: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 18,
    fontWeight: '700' as const,
  },
  errorDetails: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center' as const,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600' as const,
  },
})
