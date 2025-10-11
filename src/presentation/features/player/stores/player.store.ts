import { observable } from '@legendapp/state'
import type { AudioTrack } from '@/src/domain/entities/AudioTrack'
import type { SubtitleTrack } from '@/src/domain/entities/SubtitleTrack'
import type { Stream } from '@/src/domain/entities/Stream'
import type { Media } from '@/src/domain/entities/Media'

interface PlayerState {
  // Current playback context
  currentStream: Stream | null
  currentMedia: Media | null

  // Player backend selection
  playerBackend: 'react-native-video' | 'expo-libvlc'

  // Playback state
  isPlaying: boolean
  currentTime: number
  duration: number
  buffering: boolean
  isInitializing: boolean
  isBuffering: boolean

  // UI state
  showControls: boolean
  controlsTimeout: NodeJS.Timeout | null

  // Volume and brightness
  volume: number
  muted: boolean
  brightness: number

  // Overlay visibility
  showVolumeOverlay: boolean
  showBrightnessOverlay: boolean

  // Tracks
  audioTracks: AudioTrack[]
  subtitleTracks: SubtitleTrack[]
  selectedAudioTrack: number | null
  selectedSubtitleTrack: number | null

  // Display
  resizeMode: 'contain' | 'cover' | 'stretch'
  zoomScale: number

  // Modals
  showAudioModal: boolean
  showSubtitleModal: boolean

  // Error state
  error: string | null

  // Control visibility timeout
  controlsTimeoutId: NodeJS.Timeout | null
}

export const player$ = observable<PlayerState>({
  // Current playback context
  currentStream: null,
  currentMedia: null,

  // Player backend selection
  playerBackend: 'react-native-video',

  // Playback state
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  buffering: false,
  isInitializing: true,
  isBuffering: false,

  // UI state
  showControls: true,
  controlsTimeout: null,

  // Volume and brightness
  volume: 1.0,
  muted: false,
  brightness: 1.0,

  // Overlay visibility
  showVolumeOverlay: false,
  showBrightnessOverlay: false,

  // Tracks
  audioTracks: [],
  subtitleTracks: [],
  selectedAudioTrack: null,
  selectedSubtitleTrack: null,

  // Display
  resizeMode: 'contain',
  zoomScale: 1.0,

  // Modals
  showAudioModal: false,
  showSubtitleModal: false,

  // Error state
  error: null,

  // Control visibility timeout
  controlsTimeoutId: null,
})

// Helper functions for state updates
export function resetPlayerState(): void {
  player$.currentStream.set(null)
  player$.currentMedia.set(null)
  player$.isPlaying.set(false)
  player$.currentTime.set(0)
  player$.duration.set(0)
  player$.buffering.set(false)
  player$.showControls.set(true)
  player$.audioTracks.set([])
  player$.subtitleTracks.set([])
  player$.selectedAudioTrack.set(null)
  player$.selectedSubtitleTrack.set(null)
  player$.error.set(null)
}

export function togglePlayback(): void {
  player$.isPlaying.set(!player$.isPlaying.get())
}

export function toggleControls(): void {
  player$.showControls.set(!player$.showControls.get())
}

export function setControlsVisible(visible: boolean): void {
  player$.showControls.set(visible)

  if (visible) {
    // Clear existing timeout
    const timeout = player$.controlsTimeout.get()
    if (timeout) clearTimeout(timeout)

    // Set new timeout to hide controls after 3 seconds
    const newTimeout = setTimeout(() => {
      if (player$.isPlaying.get()) {
        player$.showControls.set(false)
      }
    }, 3000)

    player$.controlsTimeout.set(newTimeout)
  }
}

export function cycleResizeMode(): void {
  const modes: ('contain' | 'cover' | 'stretch')[] = ['contain', 'cover', 'stretch']
  const current = player$.resizeMode.get()
  const currentIndex = modes.indexOf(current)
  const nextIndex = (currentIndex + 1) % modes.length
  player$.resizeMode.set(modes[nextIndex])
}

// Volume control
export function setVolume(volume: number): void {
  player$.volume.set(Math.max(0, Math.min(1, volume)))
  player$.showVolumeOverlay.set(true)
}

export function hideVolumeOverlay(): void {
  player$.showVolumeOverlay.set(false)
}

// Brightness control
export function setBrightness(brightness: number): void {
  player$.brightness.set(Math.max(0, Math.min(1, brightness)))
  player$.showBrightnessOverlay.set(true)
}

export function hideBrightnessOverlay(): void {
  player$.showBrightnessOverlay.set(false)
}

// Player backend
export function setPlayerBackend(backend: 'react-native-video' | 'expo-libvlc'): void {
  player$.playerBackend.set(backend)
}

// Initialization state
export function setInitializing(isInitializing: boolean): void {
  player$.isInitializing.set(isInitializing)
}

export function setBuffering(isBuffering: boolean): void {
  player$.isBuffering.set(isBuffering)
}

// Zoom scale
export function setZoomScale(scale: number): void {
  player$.zoomScale.set(scale)
}

// Controls visibility with auto-hide
export function setControlsVisibleWithTimeout(): void {
  // Clear existing timeout
  const existingTimeout = player$.controlsTimeoutId.get()
  if (existingTimeout) {
    clearTimeout(existingTimeout)
  }

  // Show controls
  player$.showControls.set(true)

  // Set new timeout to hide after 5 seconds
  const timeoutId = setTimeout(() => {
    player$.showControls.set(false)
    player$.controlsTimeoutId.set(null)
  }, 5000)

  player$.controlsTimeoutId.set(timeoutId)
}
