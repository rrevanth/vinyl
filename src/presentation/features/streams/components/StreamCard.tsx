import React, { useMemo } from 'react'
import { View, Text, Pressable } from 'react-native'
import { StyleSheet, withUnistyles } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import type { Stream } from '@/src/domain/entities/Stream'
import type { Media } from '@/src/domain/entities/Media'
import { logger } from '@/src/presentation/shared/utils/logger'
import { serializeMediaForNav } from '@/src/presentation/shared/utils/navigationParams'

// Create themed Ionicons component using Unistyles v3 API
const ThemedIonicons = withUnistyles(Ionicons, (theme) => ({
  color: theme.colors.text,
}))

interface StreamCardProps {
  stream: Stream
  media: Media
  seasonNumber?: number
  episodeNumber?: number
}

const formatBytes = (bytes: number): string => {
  try {
    if (typeof bytes !== 'number' || isNaN(bytes) || bytes < 0) {
      return 'Unknown size'
    }
    if (bytes >= 1073741824) {
      return `${(bytes / 1073741824).toFixed(2)} GB`
    }
    if (bytes >= 1048576) {
      return `${(bytes / 1048576).toFixed(2)} MB`
    }
    return `${(bytes / 1024).toFixed(2)} KB`
  } catch (error) {
    logger.error('[formatBytes] Error formatting bytes', error as Error)
    return 'Unknown size'
  }
}

const StreamCardComponent: React.FC<StreamCardProps> = ({ stream, media, seasonNumber, episodeNumber }) => {
  const router = useRouter()

  // Removed logging to improve performance

  // Ensure we have valid string values - defensively handle all potential non-string values
  const displayName = useMemo(() => {
    if (!stream.name || typeof stream.name !== 'string') return 'Stream'
    const trimmed = stream.name.trim()
    return trimmed.length > 0 ? trimmed : 'Stream'
  }, [stream.name])

  const displayDescription = useMemo(() => {
    if (!stream.description || typeof stream.description !== 'string') return null
    const trimmed = stream.description.trim()
    // Return null if empty string to avoid rendering empty text
    return trimmed.length > 0 ? trimmed : null
  }, [stream.description])

  const displaySize = useMemo(() => {
    if (!stream.size || typeof stream.size !== 'number' || isNaN(stream.size)) return null
    return formatBytes(stream.size)
  }, [stream.size])

  // Safety check: ensure media is provided (after hooks)
  if (!media) {
    logger.error('[StreamCard] Media prop is missing', new Error('Media prop is missing'))
    return null
  }

  const handlePress = () => {
    if (!media) {
      logger.warn('[StreamCard] Cannot navigate - no media provided')
      return
    }

    try {
      logger.debug('[StreamCard] Navigating to player', {
        streamId: stream.id,
        mediaStableId: media.stableId,
      })

      // Navigate with optimized media data (NEW PATTERN)
      router.push({
        pathname: '/player/[streamId]',
        params: {
          streamId: stream.id,
          streamData: JSON.stringify(stream),
          mediaData: serializeMediaForNav(media),
          ...(seasonNumber && { season: seasonNumber.toString() }),
          ...(episodeNumber && { episode: episodeNumber.toString() }),
          ...(media.images?.backdrop && { backdrop: media.images.backdrop }),
          ...(media.images?.logo && { logo: media.images.logo }),
        },
      })
    } catch (error) {
      logger.error('[StreamCard] Navigation failed', error as Error)
    }
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={displayName}
    >
      <View style={styles.content}>
        {/* Title with play icon */}
        <View style={styles.titleRow}>
          <ThemedIonicons name="play-circle" size={20} />
          <Text style={styles.title}>{displayName}</Text>
        </View>

        {/* Description (multiline, preserve formatting) */}
        {displayDescription && displayDescription.length > 0 && (
          <Text style={styles.description}>
            {displayDescription}
          </Text>
        )}

        {/* File size */}
        {displaySize && displaySize.length > 0 && (
          <Text style={styles.fileSize}>
            {displaySize}
          </Text>
        )}
      </View>
    </Pressable>
  )
}

// Memoize the component to prevent unnecessary re-renders
// Only re-render if stream.id or media.stableId changes
export const StreamCard = React.memo(StreamCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.stream.id === nextProps.stream.id &&
    prevProps.media.stableId === nextProps.media.stableId &&
    prevProps.seasonNumber === nextProps.seasonNumber &&
    prevProps.episodeNumber === nextProps.episodeNumber
  )
})

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Subtle transparent tint for dark mode
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.gutter,
    borderWidth: 2, // Increased for better visibility
    borderColor: theme.colors.border,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  content: {
    gap: theme.spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center' as const,
    gap: theme.spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: theme.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.text,
    lineHeight: theme.fontSize.base * 1.5,
  },
  description: {
    fontSize: theme.fontSize.sm,
    lineHeight: theme.fontSize.sm * 1.6,
    color: theme.colors.textSecondary,
  },
  fileSize: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary, // Improved from textTertiary for better visibility
    fontWeight: '600' as const, // Increased from '500' for more prominence
  },
}))
