import type { FC } from 'react'
import { memo, useMemo, useCallback } from 'react'
import { Text, View, Pressable } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'
import { LegendList } from '@legendapp/list'
import { router } from 'expo-router'
import { useQueryClient } from '@tanstack/react-query'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import { t } from '@/src/presentation/shared/i18n'
import { MediaPosterCard } from '@/src/presentation/features/homescreen/components/MediaPosterCard'

interface RecommendationsSectionProps {
  readonly mediaStableId: string
  readonly catalogs: Catalog[]
  readonly onPressMedia?: (media: Media) => void
}

const RecommendationsSectionComponent: FC<RecommendationsSectionProps> = ({
  mediaStableId,
  catalogs,
  onPressMedia,
}) => {
  const queryClient = useQueryClient()

  // Extract Media entities from catalog items (limited for horizontal row)
  const recommendations = useMemo<Media[]>(() => {
    const mediaList: Media[] = []

    for (const catalog of catalogs) {
      for (const item of catalog.items) {
        if (item.media) {
          mediaList.push(item.media)
        }
      }
    }

    // Limit to 10 for horizontal row
    return mediaList.slice(0, 10)
  }, [catalogs])

  // All recommendations for grid view (no limit)
  const allRecommendations = useMemo<Media[]>(() => {
    const mediaList: Media[] = []

    for (const catalog of catalogs) {
      for (const item of catalog.items) {
        if (item.media) {
          mediaList.push(item.media)
        }
      }
    }

    return mediaList
  }, [catalogs])

  // Get media title from first catalog's context
  const mediaTitle = useMemo(() => {
    return catalogs[0]?.contextMedia?.title || ''
  }, [catalogs])

  // Handle title press - navigate to recommendations grid view
  const handlePressTitle = useCallback(() => {
    console.log('[RecommendationsSection] Title pressed, navigating to recommendations grid view')

    try {
      // Pre-populate cache with all recommendations and media title
      queryClient.setQueryData(['recommendations-grid', mediaStableId], {
        recommendations: allRecommendations,
        mediaTitle,
      })

      // Navigate to recommendations grid view
      const encodedMediaStableId = encodeURIComponent(mediaStableId)
      router.push(`/grids/recommendations/${encodedMediaStableId}` as any)
    } catch (error) {
      console.error('[RecommendationsSection] Failed to navigate to recommendations grid view:', error)
    }
  }, [mediaStableId, allRecommendations, mediaTitle, queryClient])

  // Hide section if no recommendations
  if (recommendations.length === 0) {
    return null
  }

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.titlePressable, pressed && styles.titlePressed]}
          onPress={handlePressTitle}
          accessibilityRole="button"
          accessibilityLabel={t('media_detail.see_all_recommendations')}
        >
          <Text style={styles.title}>{t('media_detail.more_like_this')}</Text>
          <Ionicons name="chevron-forward" size={20} style={styles.chevronIcon} />
        </Pressable>
      </View>

      <LegendList
        horizontal
        data={recommendations}
        keyExtractor={(media) => media.stableId}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <MediaPosterCard
            media={item}
            size="standard"
            onPress={onPressMedia ? () => onPressMedia(item) : undefined}
            testID={`recommendation-${item.stableId}`}
          />
        )}
      />
    </View>
  )
}

export const RecommendationsSection = memo(RecommendationsSectionComponent)

const styles = StyleSheet.create((theme) => ({
  section: {
    marginBottom: theme.spacing.xl,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  titlePressable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    alignSelf: 'flex-start',
  },
  titlePressed: {
    opacity: 0.7,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  chevronIcon: {
    color: theme.colors.textSecondary,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
  },
}))