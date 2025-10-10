import type { FC } from 'react'
import { memo, useMemo } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { LegendList } from '@legendapp/list'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import { t } from '@/src/presentation/shared/i18n'
import { MediaPosterCard } from '@/src/presentation/features/homescreen/components/MediaPosterCard'

interface RecommendationsSectionProps {
  readonly catalogs: Catalog[]
  readonly onPressMedia?: (media: Media) => void
}

const RecommendationsSectionComponent: FC<RecommendationsSectionProps> = ({ catalogs, onPressMedia }) => {
  // Extract Media entities from catalog items
  const recommendations = useMemo<Media[]>(() => {
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

  // Hide section if no recommendations
  if (recommendations.length === 0) {
    return null
  }

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('media_detail.more_like_this')}</Text>
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
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
  },
}))