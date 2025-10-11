import React, { useRef, useState, useEffect } from 'react'
import { View, Pressable, Text, StyleSheet as RNStyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LibVlcPlayerView } from 'expo-libvlc-player'
import type { Media } from '@/src/domain/entities/Media'
import type { Stream } from '@/src/domain/entities/Stream'
import type { AudioTrack } from '@/src/domain/entities/AudioTrack'
import type { SubtitleTrack } from '@/src/domain/entities/SubtitleTrack'
import { usePlayerScrobbling } from '../hooks/usePlayerScrobbling'
import { useWatchProgress } from '../hooks/useWatchProgress'
import { PlayerControls } from './PlayerControls'
import { AudioTrackModal } from './AudioTrackModal'
import { SubtitleTrackModal } from './SubtitleTrackModal'
import { player$, setControlsVisible } from '../stores/player.store'

interface RNVlcPlayerProps {
  media: Media
  stream: Stream
  seasonNumber?: number
  episodeNumber?: number
  onClose: () => void
}

// Helper function to create VLC options following Nuvio approach
// Uses MINIMAL configuration to avoid codec conflicts with TrueHD/DTS-HD streams
// Philosophy: Let VLC use its battle-tested defaults instead of over-configuring
const createVlcOptions = (streamHeaders?: Record<string, string>) => {
  // MINIMAL CONFIGURATION (Nuvio approach)
  // Let VLC use its defaults which work better for TrueHD/DTS-HD
  const initOptions = [
    '--network-caching=2000', // Balanced caching (Nuvio uses 2000ms)
    '--http-reconnect', // Auto-reconnect on network issues
    '--clock-jitter=0', // Stable clock timing
    '--sout-mux-caching=2000', // Stream output mux caching
  ]

  // Add custom headers if provided
  if (streamHeaders) {
    Object.entries(streamHeaders).forEach(([key, value]) => {
      if (key.toLowerCase() === 'user-agent') {
        initOptions.push(`--http-user-agent=${value}`)
      } else if (key.toLowerCase() === 'referer') {
        initOptions.push(`--http-referrer=${value}`)
      }
    })
  }

  return initOptions
}

/**
 * VLC Configuration Philosophy
 *
 * This implementation follows the Nuvio approach: MINIMAL configuration with expo-libvlc-player.
 *
 * Comparison:
 * - Stremio iOS (v1.0.67): 0 init options → plays everything
 * - Nuvio (expo-libvlc): 4 init options → reliable playback
 * - Previous VNYL: 14+ init options → codec conflicts
 * - Current VNYL: 4 init options → maximum compatibility
 *
 * Removed options that caused issues:
 * - --avcodec-fast, --avcodec-skiploopfilter, --avcodec-skip-frame, --avcodec-skip-idct
 * - --no-audio-time-stretch, --audio-desync=0
 * - --file-caching, --live-caching
 * - --avcodec-hw=any, --codec=avcodec (let VLC decide)
 * - --adaptive-logic=highest
 *
 * Result: Let VLC's battle-tested defaults handle codec selection and decoding.
 */

// Component WITHOUT observer wrapper to prevent object freezing
const RNVlcPlayerComponent: React.FC<RNVlcPlayerProps> = ({
  media,
  stream,
  seasonNumber,
  episodeNumber,
  onClose,
}) => {
  const playerRef = useRef<any>(null) // expo-libvlc-player ref type
  const [error, setError] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [paused, setPaused] = useState(false)
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([])
  const [subtitleTracks, setSubtitleTracks] = useState<SubtitleTrack[]>([])
  const [selectedAudioTrack, setSelectedAudioTrack] = useState<number | null>(null)
  const [selectedSubtitleTrack, setSelectedSubtitleTrack] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const lastLoggedTime = useRef(0)

  // Scrobbling hook (Trakt integration)
  const { handleProgressUpdate, handleStop } = usePlayerScrobbling(
    media,
    seasonNumber,
    episodeNumber
  )

  // Watch progress hook (local storage)
  const { saveProgress, loadProgress } = useWatchProgress(media, seasonNumber, episodeNumber)

  // Sync player state to global store
  useEffect(() => {
    player$.isPlaying.set(!paused)
    player$.currentTime.set(currentTime)
    player$.duration.set(duration)
    player$.audioTracks.set(audioTracks)
    player$.subtitleTracks.set(subtitleTracks)
    player$.selectedAudioTrack.set(selectedAudioTrack)
    player$.selectedSubtitleTrack.set(selectedSubtitleTrack)
  }, [paused, currentTime, duration, audioTracks, subtitleTracks, selectedAudioTrack, selectedSubtitleTrack])

  // Sync playback state from store back to VLC player
  useEffect(() => {
    const unsubscribe = player$.isPlaying.onChange((value) => {
      setPaused(!value)
      // Control VLC player via ref methods
      if (playerRef.current) {
        if (value) {
          playerRef.current.play?.()
        } else {
          playerRef.current.pause?.()
        }
      }
    })
    return unsubscribe
  }, [])

  // Load saved watch progress and resume
  useEffect(() => {
    const resumeProgress = async () => {
      const savedTime = await loadProgress()
      if (savedTime && playerRef.current && isLoaded && duration > 0) {
        console.log('[RNVlcPlayer] Resuming from:', savedTime, 'seconds')
        const position = savedTime / duration // expo-libvlc-player uses 0.0 to 1.0
        // Use proper play + seek pattern
        playerRef.current.play?.()
        setTimeout(() => {
          playerRef.current?.seek?.(position)
        }, 100) // Small delay to ensure player is ready
      }
    }

    if (isLoaded && duration > 0) {
      resumeProgress()
    }
  }, [loadProgress, isLoaded, duration])

  // Debug logging on mount
  useEffect(() => {
    console.log('[RNVlcPlayer] Component mounted')
    console.log('[RNVlcPlayer] Stream URL:', stream.url)
    console.log('[RNVlcPlayer] Stream source:', stream.source)

    // Capture values in closure for cleanup
    const finalCurrentTime = currentTime
    const finalDuration = duration

    return () => {
      console.log('[RNVlcPlayer] Component unmounting')
      // expo-libvlc-player handles cleanup automatically
      // Final scrobble (use captured values from closure)
      handleStop(finalCurrentTime, finalDuration).catch((err) => {
        console.log('[RNVlcPlayer] Error in final scrobble:', err)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream.url, stream.source]) // Only re-run if stream changes

  const handleError = (event: any) => {
    console.error('[RNVlcPlayer] Playback error:', event)

    const errorMessage = typeof event === 'string' ? event : JSON.stringify(event)
    const isCodecError =
      errorMessage.toLowerCase().includes('codec') || errorMessage.toLowerCase().includes('decode')

    if (isCodecError) {
      // Try switching audio track if multiple tracks exist
      if (audioTracks.length > 1 && selectedAudioTrack !== 1) {
        console.log('[RNVlcPlayer] Codec error detected. Switching to audio track 1...')
        setSelectedAudioTrack(1)
        setTimeout(() => {
          if (error) {
            setError(
              'This stream has an incompatible audio codec. VLC tried switching to track 1 (AC3/AAC). If playback still fails, try selecting a different audio track manually or use a different stream.'
            )
          }
        }, 2000)
        return
      }

      setError(
        'Audio codec incompatibility detected. VLC is configured for maximum compatibility but this stream requires specific codec support. Try selecting a different audio track or use a different stream source.'
      )
    } else {
      setError('Failed to play video. The stream may be unavailable, expired, or incompatible.')
    }
  }

  const handleProgress = (event: { position: number }) => {
    // expo-libvlc-player returns position as fraction (0.0 to 1.0)
    const position = event.position
    const eventCurrentTime = position * duration
    const eventDuration = duration

    // Update local state
    setCurrentTime(eventCurrentTime)

    // Scrobble to services (Trakt if authenticated)
    handleProgressUpdate(eventCurrentTime, eventDuration)

    // Save local watch progress (throttled internally)
    saveProgress(eventCurrentTime, eventDuration)

    // Only log if values actually changed (reduce console spam)
    // Log every 30 seconds
    const currentTimeRounded = Math.floor(eventCurrentTime)
    if (currentTimeRounded % 30 === 0 && currentTimeRounded !== lastLoggedTime.current) {
      lastLoggedTime.current = currentTimeRounded
      console.log('[RNVlcPlayer] Playback progress:', {
        positionSeconds: currentTimeRounded,
        duration: Math.floor(eventDuration),
        progressPercent: eventDuration > 0 ? Math.round((eventCurrentTime / eventDuration) * 100) : 0,
      })
    }
  }

  const handleLoad = async (event: any) => {
    console.log('[RNVlcPlayer] ✅ Video loaded successfully (onFirstPlay)')
    console.log('[RNVlcPlayer] Video info:', {
      length: event.length,
      width: event.width,
      height: event.height,
      tracks: event.tracks,
    })
    setIsLoaded(true)

    // expo-libvlc-player returns length in milliseconds
    const durationSeconds = (event.length ?? 0) / 1000
    setDuration(durationSeconds)

    // Map VLC audio tracks to domain entities (from tracks.audio)
    const vlcAudioTracks = event.tracks?.audio ?? []
    const mappedAudioTracks: AudioTrack[] = vlcAudioTracks.map((track: any) => ({
      id: track.id,
      name: track.name || `Track ${track.id}`,
      language: undefined, // VLC doesn't expose language in track info
      codec: undefined, // VLC doesn't expose codec in track info
    }))
    setAudioTracks(mappedAudioTracks)

    // Auto-select compatible audio track (Nuvio approach)
    // Always prefer track 1 over track 0 to avoid TrueHD issues
    if (mappedAudioTracks.length > 0) {
      const defaultTrack = mappedAudioTracks.length > 1 ? 1 : 0
      console.log(
        `[RNVlcPlayer] Auto-selecting audio track ${defaultTrack} (total tracks: ${mappedAudioTracks.length})`
      )
      setSelectedAudioTrack(defaultTrack)
    }

    // Map VLC subtitle tracks to domain entities (from tracks.subtitle)
    const vlcSubtitleTracks = event.tracks?.subtitle ?? []
    const mappedSubtitleTracks: SubtitleTrack[] = vlcSubtitleTracks.map((track: any) => ({
      id: track.id,
      name: track.name || `Subtitle ${track.id}`,
      language: undefined, // VLC doesn't expose language in track info
      format: undefined, // VLC doesn't expose format in track info
    }))
    setSubtitleTracks(mappedSubtitleTracks)

    // Resume will be handled by separate useEffect
    // This ensures tracks are available before seeking
  }

  const handleEnd = async () => {
    console.log('[RNVlcPlayer] Playback ended (onEndReached)')
    setPaused(true) // Update paused state
    await handleStop(currentTime, duration)
  }

  const handlePaused = () => {
    console.log('[RNVlcPlayer] Paused')
    setPaused(true)
  }

  const handlePlaying = () => {
    console.log('[RNVlcPlayer] Playing')
    setPaused(false)
    setIsLoaded(true) // Set loaded when playing starts
  }

  // Control handlers
  const handleSkip = (seconds: number) => {
    if (playerRef.current && duration > 0) {
      const newTime = Math.max(0, Math.min(currentTime + seconds, duration))
      const position = newTime / duration // expo-libvlc-player uses 0.0 to 1.0
      playerRef.current.seek?.(position)
      setCurrentTime(newTime)
      setControlsVisible(true)
    }
  }

  const handleSeek = (time: number) => {
    if (playerRef.current && duration > 0) {
      const position = time / duration // expo-libvlc-player uses 0.0 to 1.0
      playerRef.current.seek?.(position)
      setCurrentTime(time)
    }
  }

  const handleVideoPress = () => {
    setControlsVisible(!player$.showControls.get())
  }

  const handleAudioTrackSelect = (trackId: number | null) => {
    setSelectedAudioTrack(trackId)
    // VLC accepts -1 for disable, or track id
    // No need to call setNativeProps, state change triggers prop update
  }

  const handleSubtitleTrackSelect = (trackId: number | null) => {
    setSelectedSubtitleTrack(trackId)
    // VLC accepts -1 for disable, or track id
    // No need to call setNativeProps, state change triggers prop update
  }

  // Create VLC options - must be created fresh each render
  const vlcOptions = createVlcOptions(stream.headers)

  // Log configuration once on mount
  useEffect(() => {
    console.log('[RNVlcPlayer] VLC source configuration:', {
      uri: stream.url.substring(0, 100) + '...',
      optionsCount: vlcOptions.length,
      hasHeaders: !!stream.headers,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream.url, stream.headers]) // Only log on stream change

  if (error) {
    const isCodecError = error.toLowerCase().includes('codec') || error.toLowerCase().includes('truehd') || error.toLowerCase().includes('dts')
    const isLoadError = error.toLowerCase().includes('unavailable') || error.toLowerCase().includes('load')
    
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons 
            name={isLoadError ? 'cloud-offline' : 'alert-circle'} 
            size={48} 
            color="#FF3B30" 
          />
          <Text style={styles.errorText}>
            {isCodecError ? 'Audio Codec Not Supported' : 
             isLoadError ? 'Stream Unavailable' : 'Playback Error'}
          </Text>
          <Text style={styles.errorDetails}>{error}</Text>
          
          <View style={styles.suggestionBox}>
            <Ionicons name="information-circle" size={24} color="#007AFF" />
            <Text style={styles.suggestionText}>
              {isCodecError && audioTracks.length > 1 ? (
                `This stream has ${audioTracks.length} audio tracks. Try:\n• Selecting a different audio track\n• Using a different stream`
              ) : isLoadError ? (
                'The stream may have expired or requires re-authentication. Try:\n• Going back and selecting the stream again\n• Trying a different stream source'
              ) : (
                'VLC encountered an error playing this stream. Try:\n• Going back and selecting the stream again\n• Using a different stream\n• Restarting the app'
              )}
            </Text>
          </View>
          
          <View style={styles.buttonRow}>
            <Pressable 
              style={[styles.closeButton, styles.secondaryButton]} 
              onPress={onClose}
            >
              <Text style={[styles.closeButtonText, styles.secondaryButtonText]}>
                Go Back
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* VLC Player with tap gesture */}
      <Pressable style={styles.playerContainer} onPress={handleVideoPress}>
        <LibVlcPlayerView
          ref={playerRef}
          style={styles.player}
          source={stream.url}
          options={vlcOptions}
          autoplay={true}
          tracks={{
            audio: selectedAudioTrack ?? -1,
            subtitle: selectedSubtitleTrack ?? -1,
          }}
          onFirstPlay={handleLoad}
          onPlaying={handlePlaying}
          onPaused={handlePaused}
          onPositionChanged={handleProgress}
          onEndReached={handleEnd}
          onEncounteredError={handleError}
        />
      </Pressable>

      {/* Player Controls */}
      <PlayerControls
        media={media}
        stream={stream}
        seasonNumber={seasonNumber}
        episodeNumber={episodeNumber}
        onClose={onClose}
        onSkip={handleSkip}
        onSeek={handleSeek}
      />

      {/* Audio Track Modal */}
      <AudioTrackModal
        visible={player$.showAudioModal.get()}
        onClose={() => player$.showAudioModal.set(false)}
        onSelectTrack={handleAudioTrackSelect}
      />

      {/* Subtitle Track Modal */}
      <SubtitleTrackModal
        visible={player$.showSubtitleModal.get()}
        onClose={() => player$.showSubtitleModal.set(false)}
        onSelectTrack={handleSubtitleTrackSelect}
      />
    </View>
  )
}

const styles = RNStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  playerContainer: {
    flex: 1,
  },
  player: {
    flex: 1,
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
    lineHeight: 20,
  },
  suggestionBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  suggestionText: {
    flex: 1,
    color: '#E0E0E0',
    fontSize: 13,
    lineHeight: 20,
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 12,
  },
  closeButton: {
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
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonText: {
    color: 'white',
  },
})

// Export WITHOUT observer wrapper to prevent object freezing
// VLC library needs mutable source object
// Controls components can still use observer for their own state
export const RNVlcPlayer: React.FC<RNVlcPlayerProps> = RNVlcPlayerComponent
