import type { MediaVideo } from '@/src/domain/capabilities/IMediaVideosCapability'
import { t } from '@/src/presentation/shared/i18n'
import { Ionicons } from '@expo/vector-icons'
import { LegendList } from '@legendapp/list'
import type { FC } from 'react'
import { memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
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
        <Pressable
          style={({ pressed }) => [styles.titlePressable, pressed && styles.titlePressed]}
          onPress={onPressSeeAll || (() => {})}
          disabled={!showSeeAll}
          accessibilityRole="button"
          accessibilityLabel={t('media_detail.see_all_videos')}
        >
          <Text style={styles.title}>{t('media_detail.trailers')}</Text>
          {showSeeAll && (
            <Ionicons name="chevron-forward" size={20} color={styles.chevronIcon.color} />
          )}
        </Pressable>
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
    fontSize: theme.fontSize['2xl'],
    margin: theme.spacing.xs,
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
