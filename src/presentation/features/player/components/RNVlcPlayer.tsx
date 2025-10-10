import React, { useRef, useState, useEffect } from 'react'
import { View, Pressable, Text, StyleSheet as RNStyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { VLCPlayer } from 'react-native-vlc-media-player'
import type { OnProgressEventProps, VideoInfo, SimpleCallbackEventProps } from 'react-native-vlc-media-player'
import type { Media } from '@/src/domain/entities/Media'
import type { Stream } from '@/src/domain/entities/Stream'
import { usePlayerScrobbling } from '../hooks/usePlayerScrobbling'
import { useWatchProgress } from '../hooks/useWatchProgress'

interface RNVlcPlayerProps {
  media: Media
  stream: Stream
  seasonNumber?: number
  episodeNumber?: number
  onClose: () => void
}

export const RNVlcPlayer: React.FC<RNVlcPlayerProps> = ({
  media,
  stream,
  seasonNumber,
  episodeNumber,
  onClose,
}) => {
  const playerRef = useRef<VLCPlayer>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [paused, setPaused] = useState(false)

  // Scrobbling hook (Trakt integration)
  const { handleProgressUpdate, handleStop } = usePlayerScrobbling(
    media,
    seasonNumber,
    episodeNumber
  )

  // Watch progress hook (local storage)
  const { saveProgress, loadProgress } = useWatchProgress(media, seasonNumber, episodeNumber)

  // Load saved watch progress and resume
  useEffect(() => {
    const resumeProgress = async () => {
      const savedTime = await loadProgress()
      if (savedTime && playerRef.current && isLoaded) {
        console.log('[RNVlcPlayer] Resuming from:', savedTime, 'seconds')
        // VLC seek expects position as fraction (0-1)
        // We'll use the onLoad callback to seek after getting duration
      }
    }

    resumeProgress()
  }, [loadProgress, isLoaded])

  // Debug logging on mount
  useEffect(() => {
    console.log('[RNVlcPlayer] Component mounted')
    console.log('[RNVlcPlayer] Stream URL:', stream.url)
    console.log('[RNVlcPlayer] Stream source:', stream.source)
    console.log('[RNVlcPlayer] Stream headers:', stream.headers || 'none')

    // Capture ref value for cleanup
    const playerElement = playerRef.current

    // Cleanup: stop scrobbling when component unmounts
    return () => {
      const cleanup = async () => {
        // Stop the player
        if (playerElement) {
          playerElement.stopPlayer()
        }
      }
      cleanup()
    }
  }, [stream, handleStop])

  const handleError = (event: SimpleCallbackEventProps) => {
    console.error('[RNVlcPlayer] Playback error:', event)
    setError('Failed to play video. The stream may be unavailable or incompatible.')
  }

  const handleProgress = (event: OnProgressEventProps) => {
    const currentTime = event.currentTime
    const duration = event.duration

    // Scrobble to services (Trakt if authenticated)
    handleProgressUpdate(currentTime, duration)

    // Save local watch progress
    saveProgress(currentTime, duration)

    // Log playback progress periodically (every 30 seconds)
    const currentTimeRounded = Math.floor(currentTime)
    if (currentTimeRounded % 30 === 0) {
      console.log('[RNVlcPlayer] Playback progress:', {
        positionSeconds: currentTimeRounded,
        duration: Math.floor(duration),
        progressPercent: duration > 0 ? Math.round((currentTime / duration) * 100) : 0,
        currentTime: event.currentTime,
        remainingTime: event.remainingTime,
        positionFraction: event.position,
      })
    }
  }

  const handleLoad = async (event: VideoInfo) => {
    console.log('[RNVlcPlayer] ✅ Video loaded successfully')
    console.log('[RNVlcPlayer] Video info:', {
      duration: event.duration,
      videoSize: event.videoSize,
      audioTracks: event.audioTracks.length,
      textTracks: event.textTracks.length,
    })
    setIsLoaded(true)

    // Resume from saved progress after load
    const savedTime = await loadProgress()
    if (savedTime && playerRef.current && event.duration > 0) {
      // Calculate position as fraction (0-1)
      const position = savedTime / event.duration
      console.log('[RNVlcPlayer] Seeking to saved position:', position)
      playerRef.current.seek(position)
    }
  }

  const handleStopped = async (event: SimpleCallbackEventProps) => {
    console.log('[RNVlcPlayer] Playback stopped:', event)
    // Final scrobble on stop
    await handleStop(0, 0)
  }

  const handleEnd = async (event: SimpleCallbackEventProps) => {
    console.log('[RNVlcPlayer] Playback ended:', event)
    // Final scrobble on completion
    await handleStop(0, 0)
  }

  const handleBuffering = (event: SimpleCallbackEventProps) => {
    console.log('[RNVlcPlayer] Buffering...', event)
  }

  const handlePaused = (event: SimpleCallbackEventProps) => {
    console.log('[RNVlcPlayer] Paused:', event)
    setPaused(true)
  }

  const handlePlaying = (event: { duration: number; target: number; seekable: boolean }) => {
    console.log('[RNVlcPlayer] Playing:', event)
    setPaused(false)
  }

  // Build VLC source with headers
  const vlcSource = {
    uri: stream.url,
    initOptions: [
      '--network-caching=1500', // 1.5s cache for network streams
      '--no-audio-time-stretch', // Disable audio time stretching
      '--avcodec-fast', // Enable fast decoding
    ],
  }

  // Add custom headers if present
  if (stream.headers) {
    // VLC expects headers in the format: :http-user-agent=...
    Object.entries(stream.headers).forEach(([key, value]) => {
      if (key.toLowerCase() === 'user-agent') {
        vlcSource.initOptions?.push(`--http-user-agent=${value}`)
      } else if (key.toLowerCase() === 'referer') {
        vlcSource.initOptions?.push(`--http-referrer=${value}`)
      }
      // VLC has limited header support, other headers may not work
    })
  }

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
      <Pressable style={styles.closeButtonOverlay} onPress={onClose}>
        <Ionicons name="close-circle" size={40} color="white" />
      </Pressable>

      {/* VLC Player */}
      <VLCPlayer
        ref={playerRef}
        source={vlcSource}
        style={styles.player}
        autoplay={true}
        paused={paused}
        playInBackground={true}
        resizeMode="contain"
        onProgress={handleProgress}
        onLoad={handleLoad}
        onError={handleError}
        onStopped={handleStopped}
        onEnd={handleEnd}
        onBuffering={handleBuffering}
        onPaused={handlePaused}
        onPlaying={handlePlaying}
      />
    </View>
  )
}

const styles = RNStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  player: {
    flex: 1,
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
    fontWeight: '700',
  },
  errorDetails: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
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
    fontWeight: '600',
  },
})
