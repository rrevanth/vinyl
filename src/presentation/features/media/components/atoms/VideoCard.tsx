import type { FC } from 'react'
import { memo } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { SymbolView } from 'expo-symbols'
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
    return `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`
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

        {/* Play icon overlay */}
        <View style={styles.playOverlay}>
          <View style={styles.playIconContainer}>
            <SymbolView name="play.fill" size={isLarge ? 32 : 24} tintColor="#FFFFFF" />
          </View>
        </View>

        {/* Duration badge */}
        {video.size && (
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{formatDuration(video.size)}</Text>
          </View>
        )}
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, isLarge && styles.titleLarge]} numberOfLines={2}>
          {video.name}
        </Text>
        <Text style={styles.subtitle}>
          {video.type} • {video.site}
        </Text>
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
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  textContainer: {
    padding: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.fontFamily.primary,
    fontWeight: theme.fontWeight.medium,
    fontSize: theme.fontSize.sm,
  },
  titleLarge: {
    fontSize: theme.fontSize.lg,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
    textTransform: 'capitalize',
  },
}))