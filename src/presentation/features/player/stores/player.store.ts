import { observable } from '@legendapp/state'
import type { AudioTrack } from '@/src/domain/entities/AudioTrack'
import type { SubtitleTrack } from '@/src/domain/entities/SubtitleTrack'
import type { Stream } from '@/src/domain/entities/Stream'
import type { Media } from '@/src/domain/entities/Media'

interface PlayerState {
  // Current playback context
  currentStream: Stream | null
  currentMedia: Media | null

  // Playback state
  isPlaying: boolean
  currentTime: number
  duration: number
  buffering: boolean

  // UI state
  showControls: boolean
  controlsTimeout: NodeJS.Timeout | null

  // Volume
  volume: number
  muted: boolean

  // Tracks
  audioTracks: AudioTrack[]
  subtitleTracks: SubtitleTrack[]
  selectedAudioTrack: number | null
  selectedSubtitleTrack: number | null

  // Display
  resizeMode: 'contain' | 'cover' | 'stretch'

  // Modals
  showAudioModal: boolean
  showSubtitleModal: boolean

  // Error state
  error: string | null
}

export const player$ = observable<PlayerState>({
  // Current playback context
  currentStream: null,
  currentMedia: null,

  // Playback state
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  buffering: false,

  // UI state
  showControls: true,
  controlsTimeout: null,

  // Volume
  volume: 1.0,
  muted: false,

  // Tracks
  audioTracks: [],
  subtitleTracks: [],
  selectedAudioTrack: null,
  selectedSubtitleTrack: null,

  // Display
  resizeMode: 'contain',

  // Modals
  showAudioModal: false,
  showSubtitleModal: false,

  // Error state
  error: null,
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
