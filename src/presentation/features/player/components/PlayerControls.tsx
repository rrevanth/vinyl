import React from 'react'
import { View, Text, Pressable, Animated, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Slider from '@react-native-community/slider'
import { Ionicons } from '@expo/vector-icons'
import { observer } from '@legendapp/state/react'
import { StyleSheet } from 'react-native-unistyles'
import type { Media } from '@/src/domain/entities/Media'
import type { Stream } from '@/src/domain/entities/Stream'
import { player$, togglePlayback, toggleInfoPanel, toggleSettingsMenu, setPlaybackSpeed, toggleMute } from '@/src/presentation/features/player/stores/player.store'
import { PlayerInfoPanel } from './PlayerInfoPanel'
import { PlayerSettingsMenu } from './PlayerSettingsMenu'
import { PlaybackSpeedModal } from './PlaybackSpeedModal'

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
  onFromBeginning?: () => void
  onGoToShow?: () => void
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
  onFromBeginning,
  onGoToShow,
}) => {
  const showControls = player$.showControls.get()
  const isPlaying = player$.isPlaying.get()
  const currentTime = player$.currentTime.get()
  const duration = player$.duration.get()
  const isBuffering = player$.isBuffering.get()
  const isMuted = player$.muted.get()

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
          {/* Close button - left */}
          <Pressable
            onPress={onClose}
            style={styles.topIconButton}
            accessibilityRole="button"
            accessibilityLabel="Close player"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </Pressable>

          {/* Volume button - right */}
          <Pressable
            onPress={toggleMute}
            style={styles.topIconButton}
            accessibilityRole="button"
            accessibilityLabel={isMuted ? "Unmute" : "Mute"}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name={isMuted ? "volume-mute" : "volume-high"} size={24} color="#FFFFFF" />
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

      {/* Bottom gradient with title, progress and controls */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.bottomGradient}
      >
        {/* Title and metadata - moved from top */}
        <View style={styles.bottomTitleSection}>
          <Text style={styles.bottomTitle} numberOfLines={1}>
            {getTitleWithYear()}
          </Text>

          {getEpisodeInfo() && (
            <Text style={styles.bottomEpisodeInfo} numberOfLines={1}>
              {getEpisodeInfo()}
            </Text>
          )}

          <View style={styles.metadataRow}>
            {stream.name && (
              <Text style={styles.providerText}>via {stream.name}</Text>
            )}
            {stream.quality && (
              <Text style={styles.qualityBadge}>{stream.quality}</Text>
            )}
          </View>
        </View>

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
          {/* Info button - pill shaped */}
          <Pressable
            onPress={toggleInfoPanel}
            style={[
              styles.infoButton,
              player$.showInfoPanel.get() && styles.infoButtonSelected
            ]}
            accessibilityRole="button"
            accessibilityLabel="Info"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={[
              styles.infoButtonText,
              player$.showInfoPanel.get() && styles.infoButtonTextSelected
            ]}>
              Info
            </Text>
          </Pressable>

          {/* Settings button */}
          <Pressable
            onPress={toggleSettingsMenu}
            style={styles.bottomIconButton}
            accessibilityRole="button"
            accessibilityLabel="Settings"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="options" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </LinearGradient>

      {/* Info Panel */}
      <PlayerInfoPanel
        enrichedMedia={{ media }}
        visible={player$.showInfoPanel.get()}
        seasonNumber={seasonNumber}
        episodeNumber={episodeNumber}
        episodeTitle={episodeTitle}
        onFromBeginning={onFromBeginning || (() => {})}
      />

      {/* Settings Menu */}
      <PlayerSettingsMenu
        visible={player$.showSettingsMenu.get()}
        onClose={toggleSettingsMenu}
        onPlaybackSpeed={() => {
          toggleSettingsMenu()
          player$.showSpeedModal.set(true)
        }}
        onAudioTrack={() => {
          toggleSettingsMenu()
          player$.showAudioModal.set(true)
        }}
        onSubtitles={() => {
          toggleSettingsMenu()
          player$.showSubtitleModal.set(true)
        }}
      />

      {/* Playback Speed Modal */}
      <PlaybackSpeedModal
        visible={player$.showSpeedModal.get()}
        currentSpeed={player$.playbackSpeed.get()}
        onClose={() => player$.showSpeedModal.set(false)}
        onSelectSpeed={(speed) => {
          setPlaybackSpeed(speed)
          onCyclePlaybackSpeed?.()
          player$.showSpeedModal.set(false)
        }}
      />
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
    alignItems: 'center',
  },
  topIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
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
  bottomTitleSection: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  bottomTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomEpisodeInfo: {
    fontSize: theme.fontSize.sm,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
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
  },
  infoButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 40,
    justifyContent: 'center',
  },
  infoButtonSelected: {
    backgroundColor: '#FFFFFF',
  },
  infoButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoButtonTextSelected: {
    color: '#000000',
  },
  bottomIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
