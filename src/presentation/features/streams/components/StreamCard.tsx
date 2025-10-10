import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useQueryClient } from '@tanstack/react-query'
import type { Stream } from '@/src/domain/entities/Stream'
import type { Media } from '@/src/domain/entities/Media'

interface StreamCardProps {
  stream: Stream
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
      },
    })
  }
  const extractProviderName = (provider: string): string => {
    // Extract readable name from provider URL or identifier
    const parts = provider.split('|')
    if (parts.length > 1) {
      return parts[1] || provider
    }
    return provider
  }

  // Format description by replacing \n with actual line breaks
  const formatDescription = (text?: string): string => {
    if (!text) return ''
    return text.replace(/\\n/g, '\n').replace(/\n/g, '\n')
  }

  const displayName = stream.name || stream.quality || 'Stream'
  const providerName = extractProviderName(stream.provider)
  const formattedDescription = formatDescription(stream.description)

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${displayName} from ${providerName}`}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {displayName}
          </Text>
          <View style={styles.providerBadge}>
            <Text style={styles.providerBadgeText} numberOfLines={1}>
              {providerName}
            </Text>
          </View>
        </View>
        {formattedDescription && (
          <Text style={styles.description} numberOfLines={4}>
            {formattedDescription}
          </Text>
        )}
      </View>
    </Pressable>
  )
})

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    marginHorizontal: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  content: {
    gap: theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start' as const,
    gap: theme.spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: theme.fontSize.lg,
    fontWeight: '700' as const,
    color: theme.colors.text,
  },
  providerBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  providerBadgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: '600' as const,
    color: theme.colors.background,
  },
  description: {
    fontSize: theme.fontSize.sm,
    lineHeight: theme.fontSize.sm * 1.4,
    color: theme.colors.textSecondary,
  },
}))
