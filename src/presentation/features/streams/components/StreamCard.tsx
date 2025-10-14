import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { StyleSheet, withUnistyles } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'
import { observer } from '@legendapp/state/react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useQueryClient } from '@tanstack/react-query'
import type { Stream } from '@/src/domain/entities/Stream'
import type { Media } from '@/src/domain/entities/Media'

// Create themed Ionicons component using Unistyles v3 API
const ThemedIonicons = withUnistyles(Ionicons, (theme) => ({
  color: theme.colors.text,
}))

interface StreamCardProps {
  stream: Stream
}

const formatBytes = (bytes: number): string => {
  if (bytes >= 1073741824) {
    return `${(bytes / 1073741824).toFixed(2)} GB`
  }
  return `${(bytes / 1048576).toFixed(2)} MB`
}

export const StreamCard: React.FC<StreamCardProps> = observer(({ stream }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useLocalSearchParams<{
    mediaStableId: string
    season?: string
    episode?: string
  }>()

  // Decode stableId to match cache key
  const decodedStableId = decodeURIComponent(params.mediaStableId)

  // Get media from cache (should be available from useMediaStreams)
  const media = queryClient.getQueryData<Media>(['media-detail', decodedStableId])

  console.log('[StreamCard] Media lookup:', {
    cacheKey: decodedStableId,
    mediaFound: !!media,
    mediaStableId: media?.stableId,
    mediaTitle: media?.title,
  })

  const handlePress = () => {
    if (!media) {
      console.warn('[StreamCard] ⚠️ Cannot navigate - no media found in cache')
      return
    }

    console.log('[StreamCard] Navigating to player with:', {
      streamId: stream.id,
      mediaStableId: media.stableId,
    })

    // Navigate with media.stableId directly (guaranteed to exist)
    router.push({
      pathname: '/player/[streamId]',
      params: {
        streamId: stream.id,
        streamData: JSON.stringify(stream),
        mediaStableId: media.stableId, // Use media.stableId directly
        ...(params.season && { season: params.season }),
        ...(params.episode && { episode: params.episode }),
        ...(media.images.backdrop && { backdrop: media.images.backdrop }),
        ...(media.images.logo && { logo: media.images.logo }),
      },
    })
  }

  // Ensure we have valid string values
  const displayName = stream.name?.trim() || 'Stream'
  const displayDescription = stream.description?.trim() || null

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
        {displayDescription && (
          <Text style={styles.description}>
            {displayDescription}
          </Text>
        )}

        {/* File size */}
        {stream.size && (
          <Text style={styles.fileSize}>
            {formatBytes(stream.size)}
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
