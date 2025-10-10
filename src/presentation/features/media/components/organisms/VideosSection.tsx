import type { FC } from 'react'
import { memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { LegendList } from '@legendapp/list'
import type { MediaVideo } from '@/src/domain/capabilities/IMediaVideosCapability'
import { t } from '@/src/presentation/shared/i18n'
import { VideoCard } from '../atoms/VideoCard'

interface VideosSectionProps {
  readonly videos: MediaVideo[]
  readonly onPressVideo?: (video: MediaVideo) => void
  readonly onPressSeeAll?: () => void
}

const VideosSectionComponent: FC<VideosSectionProps> = ({ videos, onPressVideo, onPressSeeAll }) => {
  // Hide section if no videos
  if (videos.length === 0) {
    return null
  }

  const showSeeAll = videos.length > 3 && onPressSeeAll

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('media_detail.trailers')}</Text>
        {showSeeAll && (
          <Pressable
            onPress={onPressSeeAll}
            accessibilityRole="button"
            accessibilityLabel={t('media_detail.see_all')}
            style={({ pressed }) => [styles.seeAllButton, pressed && styles.seeAllPressed]}
          >
            <Text style={styles.seeAllText}>{t('media_detail.see_all')}</Text>
          </Pressable>
        )}
      </View>

      <LegendList
        horizontal
        data={videos}
        keyExtractor={(video) => video.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            onPress={() => onPressVideo?.(item)}
            size="standard"
            testID={`video-${item.key}`}
          />
        )}
      />
    </View>
  )
}

export const VideosSection = memo(VideosSectionComponent)

const styles = StyleSheet.create((theme) => ({
  section: {
    marginBottom: theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  seeAllButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
  },
  seeAllPressed: {
    opacity: 0.85,
  },
  seeAllText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
  },
}))
