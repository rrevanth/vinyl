import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'
import { observer } from '@legendapp/state/react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useQueryClient } from '@tanstack/react-query'
import type { Stream } from '@/src/domain/entities/Stream'
import type { Media } from '@/src/domain/entities/Media'
import { Badge } from '@/src/presentation/shared/ui'

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
        ...(media.images.backdrop && { backdrop: media.images.backdrop }),
        ...(media.images.logo && { logo: media.images.logo }),
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
  
  // Check for problematic audio codecs in stream name/description
  const hasProblematicAudio = (
    displayName.toLowerCase().includes('truehd') ||
    displayName.toLowerCase().includes('dts-hd') ||
    displayName.toLowerCase().includes('dts:x') ||
    displayName.toLowerCase().includes('atmos') ||
    formattedDescription.toLowerCase().includes('truehd') ||
    formattedDescription.toLowerCase().includes('dts-hd')
  )

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${displayName} from ${providerName}`}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Ionicons name="play-circle" size={24} color={styles.playIcon.color} />
            <Text style={styles.title} numberOfLines={2}>
              {displayName}
            </Text>
          </View>
          <Badge label={providerName} variant="primary" size="sm" />
        </View>
        {(stream.quality || hasProblematicAudio) && (
          <View style={styles.metadataRow}>
            {stream.quality && (
              <Badge label={stream.quality} variant="info" size="sm" />
            )}
            {stream.source && (
              <Badge
                label={stream.source.toUpperCase()}
                variant="secondary"
                size="sm"
              />
            )}
            {hasProblematicAudio && (
              <Badge
                label="⚠️ HD AUDIO"
                variant="warning"
                size="sm"
              />
            )}
          </View>
        )}
        {formattedDescription && (
          <Text style={styles.description} numberOfLines={3}>
            {formattedDescription}
          </Text>
        )}
      </View>
    </Pressable>
  )
})

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.colors.backgroundTertiary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.gutter,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  pressed: {
    opacity: 1,
    transform: [{ scale: 0.98 }],
    borderColor: theme.colors.primary,
    borderWidth: 2,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  content: {
    gap: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start' as const,
    gap: theme.spacing.sm,
  },
  titleRow: {
    flex: 1,
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
  playIcon: {
    color: theme.colors.primary,
  },
  metadataRow: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    flexWrap: 'wrap' as const,
  },
  description: {
    fontSize: theme.fontSize.sm,
    lineHeight: theme.fontSize.sm * 1.6,
    color: theme.colors.textSecondary,
  },
}))
