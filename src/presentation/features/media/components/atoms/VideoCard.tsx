import type { MediaVideo } from '@/src/domain/capabilities/IMediaVideosCapability'
import { t } from '@/src/presentation/shared/i18n'
import { BlurView } from 'expo-blur'
import type { FC } from 'react'
import { memo } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

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
        styles.cardWrapper,
        isLarge ? styles.cardWrapperLarge : styles.cardWrapperStandard,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.container}>
        {/* Thumbnail with overlay (play icon + runtime only) */}
        <View style={[styles.thumbnailContainer, isLarge ? styles.thumbnailLarge : styles.thumbnailStandard]}>
          {thumbnail ? (
            <Image source={{ uri: thumbnail }} style={styles.thumbnail} resizeMode="cover" />
          ) : (
            <View style={styles.placeholderThumbnail} />
          )}

          {/* Gradient blur overlay - layered for fade effect (strong bottom → transparent top) */}
          <BlurView intensity={80} tint="dark" style={styles.blurOverlayBottom} />
          <BlurView intensity={60} tint="dark" style={styles.blurOverlayMiddle} />
          <BlurView intensity={40} tint="dark" style={styles.blurOverlayTop} />

          {/* Play button with runtime (bottom left, matching episode cards) */}
          {video.size && (
            <View style={styles.playRow}>
              <Text style={styles.playIcon}>▶</Text>
              <Text style={styles.runtimeText}>{formatDuration(video.size)}</Text>
            </View>
          )}
        </View>

        {/* Title below card */}
        <Text style={styles.titleBelow} numberOfLines={2}>
          {video.name}
        </Text>
      </View>
    </Pressable>
  )
}

export const VideoCard = memo(VideoCardComponent)

const styles = StyleSheet.create((theme) => ({
  cardWrapper: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  cardWrapperStandard: {
    width: 280,
    marginRight: theme.spacing.md,
  },
  cardWrapperLarge: {
    width: 320,
    marginRight: theme.spacing.lg,
  },
  pressed: {
    opacity: 0.8,
  },
  container: {
    flex: 1,
  },
  thumbnailContainer: {
    position: 'relative',
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
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
  blurOverlayBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '20%',
    opacity: 0.4,
  },
  blurOverlayMiddle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    opacity: 0.3,
  },
  blurOverlayTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '80%',
    opacity: 0.2,
  },
  playRow: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  playIcon: {
    color: theme.colors.imageText,
    fontSize: 14,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowRadius: 6,
  },
  runtimeText: {
    color: theme.colors.imageText,
    fontSize: 13,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowRadius: 6,
  },
  titleBelow: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    marginTop: theme.spacing.sm,
    paddingHorizontal: 4,
  },
}))