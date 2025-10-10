import React, { useRef, useState, useEffect } from 'react'
import { View, Pressable, Text, StyleSheet as RNStyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { VLCPlayer } from 'react-native-vlc-media-player'
import type { OnProgressEventProps, VideoInfo, SimpleCallbackEventProps } from 'react-native-vlc-media-player'
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
  const [seekPosition, setSeekPosition] = useState<number>(0)
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([])
  const [subtitleTracks, setSubtitleTracks] = useState<SubtitleTrack[]>([])
  const [selectedAudioTrack, setSelectedAudioTrack] = useState<number | null>(null)
  const [selectedSubtitleTrack, setSelectedSubtitleTrack] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

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
    })
    return unsubscribe
  }, [])

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

    // Cleanup: VLC player handles cleanup automatically on unmount
    // No manual stopPlayer() call needed as it causes unmounted component errors
    return () => {
      console.log('[RNVlcPlayer] Component unmounting')
    }
  }, [stream])

  const handleError = (event: SimpleCallbackEventProps) => {
    console.error('[RNVlcPlayer] Playback error:', event)
    setError('Failed to play video. The stream may be unavailable or incompatible.')
  }

  const handleProgress = (event: OnProgressEventProps) => {
    const eventCurrentTime = event.currentTime
    const eventDuration = event.duration

    // Update local state
    setCurrentTime(eventCurrentTime)
    setDuration(eventDuration)

    // Scrobble to services (Trakt if authenticated)
    handleProgressUpdate(eventCurrentTime, eventDuration)

    // Save local watch progress
    saveProgress(eventCurrentTime, eventDuration)

    // Log playback progress periodically (every 30 seconds)
    const currentTimeRounded = Math.floor(eventCurrentTime)
    if (currentTimeRounded % 30 === 0) {
      console.log('[RNVlcPlayer] Playback progress:', {
        positionSeconds: currentTimeRounded,
        duration: Math.floor(eventDuration),
        progressPercent: eventDuration > 0 ? Math.round((eventCurrentTime / eventDuration) * 100) : 0,
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
    setDuration(event.duration)

    // Map VLC audio tracks to domain entities
    const mappedAudioTracks: AudioTrack[] = event.audioTracks.map((track) => ({
      id: track.id,
      name: track.name || `Track ${track.id}`,
      language: undefined, // VLC doesn't expose language in track info
      codec: undefined, // VLC doesn't expose codec in track info
    }))
    setAudioTracks(mappedAudioTracks)

    // Map VLC subtitle tracks to domain entities
    const mappedSubtitleTracks: SubtitleTrack[] = event.textTracks.map((track) => ({
      id: track.id,
      name: track.name || `Subtitle ${track.id}`,
      language: undefined, // VLC doesn't expose language in track info
      format: undefined, // VLC doesn't expose format in track info
    }))
    setSubtitleTracks(mappedSubtitleTracks)

    // Resume from saved progress after load
    const savedTime = await loadProgress()
    if (savedTime && playerRef.current && event.duration > 0) {
      // Calculate position as fraction (0-1)
      const position = savedTime / event.duration
      console.log('[RNVlcPlayer] Seeking to saved position:', position)
      setSeekPosition(position)
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

  // Control handlers
  const handleSkip = (seconds: number) => {
    if (playerRef.current && duration > 0) {
      const newTime = Math.max(0, Math.min(currentTime + seconds, duration))
      const position = newTime / duration
      setSeekPosition(position)
      setControlsVisible(true)
    }
  }

  const handleSeek = (time: number) => {
    if (playerRef.current && duration > 0) {
      const position = time / duration
      setSeekPosition(position)
      setCurrentTime(time)
    }
  }

  const handleVideoPress = () => {
    setControlsVisible(!player$.showControls.get())
  }

  const handleAudioTrackSelect = (trackId: number | null) => {
    setSelectedAudioTrack(trackId)
  }

  const handleSubtitleTrackSelect = (trackId: number | null) => {
    setSelectedSubtitleTrack(trackId)
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
      {/* VLC Player with tap gesture */}
      <Pressable style={styles.playerContainer} onPress={handleVideoPress}>
        <VLCPlayer
          ref={playerRef}
          source={vlcSource}
          style={styles.player}
          autoplay={true}
          paused={paused}
          seek={seekPosition}
          audioTrack={selectedAudioTrack ?? -1}
          textTrack={selectedSubtitleTrack ?? -1}
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
