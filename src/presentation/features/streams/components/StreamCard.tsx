import React, { useMemo } from 'react'
import { View, Text, Pressable } from 'react-native'
import { StyleSheet, withUnistyles } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'
import { observer } from '@legendapp/state/react'
import { useRouter } from 'expo-router'
import type { Stream } from '@/src/domain/entities/Stream'
import type { Media } from '@/src/domain/entities/Media'

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
    console.error('[formatBytes] Error formatting bytes:', error)
    return 'Unknown size'
  }
}

export const StreamCard: React.FC<StreamCardProps> = observer(({ stream, media, seasonNumber, episodeNumber }) => {
  const router = useRouter()

  // Safety check: ensure media is provided
  if (!media) {
    console.error('[StreamCard] Media prop is missing!')
    return null
  }

  // Log safely without triggering render errors
  if (__DEV__) {
    console.log('[StreamCard] Rendering with media:', {
      mediaStableId: media?.stableId,
      mediaTitle: media?.title,
      streamId: stream?.id,
    })
  }

  const handlePress = () => {
    if (!media) {
      console.warn('[StreamCard] ⚠️ Cannot navigate - no media provided')
      return
    }

    try {
      console.log('[StreamCard] Navigating to player with:', {
        streamId: stream.id,
        mediaStableId: media.stableId,
      })

      // Safely serialize media - use toJSON if available, otherwise serialize directly
      let mediaDataString: string
      try {
        mediaDataString = typeof media.toJSON === 'function' 
          ? JSON.stringify(media.toJSON()) 
          : JSON.stringify(media)
      } catch (jsonError) {
        console.error('[StreamCard] Failed to serialize media:', jsonError)
        // Fallback: create minimal serializable object
        mediaDataString = JSON.stringify({
          stableId: media.stableId,
          externalIds: media.externalIds,
          type: media.type,
          title: media.title,
          year: media.year,
          images: media.images || {},
          createdAt: media.createdAt || new Date(),
          updatedAt: media.updatedAt || new Date(),
        })
      }

      // Navigate with media data in params (NEW PATTERN)
      router.push({
        pathname: '/player/[streamId]',
        params: {
          streamId: stream.id,
          streamData: JSON.stringify(stream),
          mediaData: mediaDataString,
          ...(seasonNumber && { season: seasonNumber.toString() }),
          ...(episodeNumber && { episode: episodeNumber.toString() }),
          ...(media.images?.backdrop && { backdrop: media.images.backdrop }),
          ...(media.images?.logo && { logo: media.images.logo }),
        },
      })
    } catch (error) {
      console.error('[StreamCard] Navigation failed:', error)
    }
  }

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
