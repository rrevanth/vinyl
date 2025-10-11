import React from 'react'
import { View, Text, Pressable, Animated, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Slider from '@react-native-community/slider'
import { Ionicons } from '@expo/vector-icons'
import { observer } from '@legendapp/state/react'
import { StyleSheet } from 'react-native-unistyles'
import type { Media } from '@/src/domain/entities/Media'
import type { Stream } from '@/src/domain/entities/Stream'
import { player$, togglePlayback, cycleResizeMode } from '@/src/presentation/features/player/stores/player.store'

interface PlayerControlsProps {
  media: Media
  stream: Stream
  seasonNumber?: number
  episodeNumber?: number
  episodeTitle?: string
  playerBackend?: 'react-native-video' | 'expo-libvlc' | 'vlc'
  buffered?: number
  playbackSpeed?: number
  onClose: () => void
  onSkip: (seconds: number) => void
  onSeek: (time: number) => void
  onCyclePlaybackSpeed?: () => void
  onShowSourcesModal?: () => void
}

export const PlayerControls: React.FC<PlayerControlsProps> = observer(({
  media,
  stream,
  seasonNumber,
  episodeNumber,
  episodeTitle,
  playerBackend,
  buffered = 0,
  playbackSpeed = 1.0,
  onClose,
  onSkip,
  onSeek,
  onCyclePlaybackSpeed,
  onShowSourcesModal,
}) => {
  const showControls = player$.showControls.get()
  const isPlaying = player$.isPlaying.get()
  const currentTime = player$.currentTime.get()
  const duration = player$.duration.get()
  const resizeMode = player$.resizeMode.get()
  const isBuffering = player$.isBuffering.get()

  // Format time as MM:SS or HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Build title string with year
  const getTitleWithYear = (): string => {
    return media.year ? `${media.title} (${media.year})` : media.title
  }

  // Build episode string for series
  const getEpisodeInfo = (): string | null => {
    if (media.type === 'series' && seasonNumber !== undefined && episodeNumber !== undefined) {
      const baseInfo = `S${seasonNumber}E${episodeNumber}`
      return episodeTitle ? `${baseInfo} • ${episodeTitle}` : baseInfo
    }
    return null
  }

  // Get player backend display name
  const getPlayerBackendName = (): string => {
    if (!playerBackend) return ''

    switch (playerBackend) {
      case 'expo-libvlc':
        return 'VLC'
      case 'react-native-video':
        return 'ExoPlayer'
      case 'vlc':
        return 'VLC'
      default:
        return playerBackend
    }
  }

  if (!showControls) {
    return null
  }

  return (
    <Animated.View style={styles.overlay}>
      {/* Top gradient with header */}
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent']}
        style={styles.topGradient}
      >
        <View style={styles.header}>
          <View style={styles.titleSection}>
            {/* Main title with year */}
            <Text style={styles.title} numberOfLines={1}>
              {getTitleWithYear()}
            </Text>

            {/* Episode info for series */}
            {getEpisodeInfo() && (
              <Text style={styles.episodeInfo} numberOfLines={1}>
                {getEpisodeInfo()}
              </Text>
            )}

            {/* Metadata row: stream provider and quality */}
            <View style={styles.metadataRow}>
              {stream.name && (
                <Text style={styles.providerText}>via {stream.name}</Text>
              )}
              {stream.quality && (
                <Text style={styles.qualityBadge}>{stream.quality}</Text>
              )}
            </View>

            {/* Player backend indicator */}
            {playerBackend && (
              <Text style={styles.backendText}>{getPlayerBackendName()}</Text>
            )}
          </View>

          <Pressable
            onPress={onClose}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Close player"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </Pressable>
        </View>
      </LinearGradient>

      {/* Center controls */}
      <View style={styles.centerControls}>
        {/* Skip back button with text overlay */}
        <Pressable
          onPress={() => onSkip(-10)}
          style={styles.skipButton}
          accessibilityRole="button"
          accessibilityLabel="Skip back 10 seconds"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.skipButtonContent}>
            <Ionicons name="play-back" size={40} color="#FFFFFF" />
            <Text style={styles.skipText}>10</Text>
          </View>
        </Pressable>

        {/* Play/Pause button */}
        <Pressable
          onPress={togglePlayback}
          style={styles.playButton}
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={48}
            color="#FFFFFF"
          />
        </Pressable>

        {/* Skip forward button with text overlay */}
        <Pressable
          onPress={() => onSkip(10)}
          style={styles.skipButton}
          accessibilityRole="button"
          accessibilityLabel="Skip forward 10 seconds"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.skipButtonContent}>
            <Ionicons name="play-forward" size={40} color="#FFFFFF" />
            <Text style={styles.skipText}>10</Text>
          </View>
        </Pressable>
      </View>

      {/* Bottom gradient with progress and controls */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.bottomGradient}
      >
        {/* Progress slider with buffered indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>

          <View style={styles.sliderWrapper}>
            {/* Buffered progress indicator */}
            {buffered > 0 && (
              <View
                style={[
                  styles.bufferedIndicator,
                  { width: `${(buffered / duration) * 100}%` },
                ]}
              />
            )}

            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration || 1}
              value={currentTime}
              onValueChange={onSeek}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255,255,255,0.3)"
              thumbTintColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
              disabled={isBuffering}
            />
          </View>

          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>

        {/* Control buttons row */}
        <View style={styles.controlsRow}>
          {/* Resize mode */}
          <Pressable
            onPress={cycleResizeMode}
            style={styles.bottomButton}
            accessibilityRole="button"
            accessibilityLabel={`Resize mode: ${resizeMode}`}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="resize" size={20} color="#FFFFFF" />
            <Text style={styles.bottomButtonText}>
              {resizeMode === 'contain' ? 'Fit' : resizeMode === 'cover' ? 'Fill' : 'Stretch'}
            </Text>
          </Pressable>

          {/* Playback speed (hide on iOS) */}
          {Platform.OS !== 'ios' && onCyclePlaybackSpeed && (
            <Pressable
              onPress={onCyclePlaybackSpeed}
              style={styles.bottomButton}
              accessibilityRole="button"
              accessibilityLabel={`Playback speed: ${playbackSpeed}x`}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="speedometer" size={20} color="#FFFFFF" />
              <Text style={styles.bottomButtonText}>{playbackSpeed}x</Text>
            </Pressable>
          )}

          {/* Audio tracks */}
          <Pressable
            onPress={() => player$.showAudioModal.set(true)}
            style={styles.bottomButton}
            accessibilityRole="button"
            accessibilityLabel="Audio tracks"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="musical-notes" size={20} color="#FFFFFF" />
            <Text style={styles.bottomButtonText}>Audio</Text>
          </Pressable>

          {/* Subtitles */}
          <Pressable
            onPress={() => player$.showSubtitleModal.set(true)}
            style={styles.bottomButton}
            accessibilityRole="button"
            accessibilityLabel="Subtitles"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="text" size={20} color="#FFFFFF" />
            <Text style={styles.bottomButtonText}>Subtitles</Text>
          </Pressable>

          {/* Change source (optional) */}
          {onShowSourcesModal && (
            <Pressable
              onPress={onShowSourcesModal}
              style={styles.bottomButton}
              accessibilityRole="button"
              accessibilityLabel="Change source"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
              <Text style={styles.bottomButtonText}>More</Text>
            </Pressable>
          )}
        </View>
      </LinearGradient>
    </Animated.View>
  )
})

const styles = StyleSheet.create((theme) => ({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  topGradient: {
    paddingTop: theme.spacing.xl + 10,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  titleSection: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: theme.fontSize.lg * 1.3,
  },
  episodeInfo: {
    fontSize: theme.fontSize.base,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
    lineHeight: theme.fontSize.base * 1.3,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  providerText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
  },
  qualityBadge: {
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: theme.borderRadius.sm,
  },
  backendText: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.6)',
    marginTop: theme.spacing.xs,
  },
  closeButton: {
    padding: theme.spacing.sm,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xl * 2,
  },
  skipButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonContent: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    position: 'absolute',
    fontSize: theme.fontSize.xs,
    fontWeight: '700',
    color: '#FFFFFF',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -6 }, { translateY: -6 }],
  },
  playButton: {
    padding: theme.spacing.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
    minWidth: 80,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomGradient: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl + 10,
    paddingTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  sliderWrapper: {
    flex: 1,
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
  bufferedIndicator: {
    position: 'absolute',
    left: 0,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 2,
    zIndex: 0,
  },
  slider: {
    width: '100%',
    height: 40,
    zIndex: 1,
  },
  timeText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: '#FFFFFF',
    minWidth: 50,
    textAlign: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.lg,
    flexWrap: 'wrap',
  },
  bottomButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    minWidth: 44,
    minHeight: 44,
    paddingHorizontal: theme.spacing.xs,
  },
  bottomButtonText: {
    fontSize: theme.fontSize.xs,
    fontWeight: '500',
    color: '#FFFFFF',
  },
}))
