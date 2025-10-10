import React from 'react'
import { View, Text, Pressable, Animated } from 'react-native'
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
  onClose: () => void
  onSkip: (seconds: number) => void
  onSeek: (time: number) => void
}

export const PlayerControls: React.FC<PlayerControlsProps> = observer(({
  media,
  stream,
  seasonNumber,
  episodeNumber,
  onClose,
  onSkip,
  onSeek,
}) => {
  const showControls = player$.showControls.get()
  const isPlaying = player$.isPlaying.get()
  const currentTime = player$.currentTime.get()
  const duration = player$.duration.get()
  const resizeMode = player$.resizeMode.get()

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

  // Build title string
  const getTitle = (): string => {
    if (media.type === 'series' && seasonNumber !== undefined && episodeNumber !== undefined) {
      return `${media.title} - S${seasonNumber}E${episodeNumber}`
    }
    return media.year ? `${media.title} (${media.year})` : media.title
  }

  // Get resize mode icon
  const getResizeModeIcon = (): keyof typeof Ionicons.glyphMap => {
    switch (resizeMode) {
      case 'contain':
        return 'contract-outline'
      case 'cover':
        return 'expand-outline'
      case 'stretch':
        return 'resize-outline'
      default:
        return 'contract-outline'
    }
  }

  if (!showControls) {
    return null
  }

  return (
    <Animated.View style={styles.overlay}>
      {/* Top gradient with header */}
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}
        style={styles.topGradient}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {getTitle()}
            </Text>
            {stream.quality && (
              <Text style={styles.quality}>{stream.quality}</Text>
            )}
          </View>
          <Pressable
            onPress={onClose}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Close player"
          >
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </Pressable>
        </View>
      </LinearGradient>

      {/* Center controls */}
      <View style={styles.centerControls}>
        <Pressable
          onPress={() => onSkip(-10)}
          style={styles.controlButton}
          accessibilityRole="button"
          accessibilityLabel="Skip back 10 seconds"
        >
          <Ionicons name="play-back" size={40} color="#FFFFFF" />
        </Pressable>

        <Pressable
          onPress={togglePlayback}
          style={styles.playButton}
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={48}
            color="#FFFFFF"
          />
        </Pressable>

        <Pressable
          onPress={() => onSkip(10)}
          style={styles.controlButton}
          accessibilityRole="button"
          accessibilityLabel="Skip forward 10 seconds"
        >
          <Ionicons name="play-forward" size={40} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Bottom gradient with progress and controls */}
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
        style={styles.bottomGradient}
      >
        {/* Progress slider */}
        <View style={styles.progressContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime}
            onValueChange={onSeek}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="rgba(255,255,255,0.3)"
            thumbTintColor="#FFFFFF"
          />
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>

        {/* Control buttons row */}
        <View style={styles.controlsRow}>
          <Pressable
            onPress={cycleResizeMode}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel={`Resize mode: ${resizeMode}`}
          >
            <Ionicons name={getResizeModeIcon()} size={24} color="#FFFFFF" />
          </Pressable>

          <Pressable
            onPress={() => player$.showAudioModal.set(true)}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Audio tracks"
          >
            <Ionicons name="musical-notes" size={24} color="#FFFFFF" />
          </Pressable>

          <Pressable
            onPress={() => player$.showSubtitleModal.set(true)}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Subtitles"
          >
            <Ionicons name="text" size={24} color="#FFFFFF" />
          </Pressable>
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
    paddingTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  quality: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: theme.borderRadius.sm,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xl,
  },
  controlButton: {
    padding: theme.spacing.md,
  },
  playButton: {
    padding: theme.spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
  },
  bottomGradient: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  timeText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: '#FFFFFF',
    minWidth: 50,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xl,
  },
  iconButton: {
    padding: theme.spacing.sm,
  },
}))
