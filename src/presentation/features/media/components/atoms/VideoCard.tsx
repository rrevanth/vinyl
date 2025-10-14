import type { FC } from 'react'
import { memo } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native-unistyles'
import type { MediaVideo } from '@/src/domain/capabilities/IMediaVideosCapability'
import { t } from '@/src/presentation/shared/i18n'

type VideoCardSize = 'standard' | 'large'

interface VideoCardProps {
  readonly video: MediaVideo
  readonly onPress: () => void
  readonly size?: VideoCardSize
  readonly testID?: string
}

/**
 * Format duration in seconds to MM:SS
 */
const formatDuration = (seconds?: number): string => {
  if (!seconds) return ''
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Get thumbnail URL for video (YouTube by default)
 */
const getVideoThumbnail = (video: MediaVideo): string | undefined => {
  if (video.site.toLowerCase() === 'youtube') {
    return `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`
  }
  return undefined
}

const VideoCardComponent: FC<VideoCardProps> = ({ video, onPress, size = 'standard', testID }) => {
  const thumbnail = getVideoThumbnail(video)
  const isLarge = size === 'large'

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={`${t('media.video.play')} ${video.name}`}
      accessibilityHint={t('media.video.play_hint')}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        isLarge ? styles.containerLarge : styles.containerStandard,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.thumbnailContainer, isLarge ? styles.thumbnailLarge : styles.thumbnailStandard]}>
        {thumbnail ? (
          <Image source={{ uri: thumbnail }} style={styles.thumbnail} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderThumbnail} />
        )}

        {/* Dark gradient overlay at bottom */}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1.0)']}
          style={styles.gradient}
          locations={[0.4, 1]}
        />

        {/* Bottom overlay with title, play icon and runtime */}
        <View style={styles.overlay}>
          <Text style={styles.title} numberOfLines={2}>
            {video.name}
          </Text>

          <View style={styles.controlsRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Play"
              onPress={onPress}
              style={styles.playButton}
            >
              <View style={styles.playIconCircle}>
                <Text style={styles.playIcon}>▶</Text>
              </View>
            </Pressable>
            {video.size && (
              <Text style={styles.runtimeText}>{formatDuration(video.size)}</Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export const VideoCard = memo(VideoCardComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
  },
  containerStandard: {
    width: 280,
    marginRight: theme.spacing.md,
  },
  containerLarge: {
    width: 320,
    marginRight: theme.spacing.lg,
  },
  pressed: {
    opacity: 0.8,
  },
  thumbnailContainer: {
    position: 'relative',
    backgroundColor: theme.colors.surfaceElevated,
  },
  thumbnailStandard: {
    width: 280,
    aspectRatio: 16 / 9,
  },
  thumbnailLarge: {
    width: 320,
    aspectRatio: 16 / 9,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  placeholderThumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.surfaceElevated,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '40%',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 60, // Space for title
  },
  title: {
    color: theme.colors.imageText,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginBottom: theme.spacing.sm,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: theme.colors.imageText,
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowRadius: 6,
    marginLeft: 2, // Optical alignment for play triangle
  },
  runtimeText: {
    color: theme.colors.imageText,
    fontSize: 13,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowRadius: 6,
  },
}))