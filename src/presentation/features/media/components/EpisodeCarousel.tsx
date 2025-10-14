import type { FC } from 'react'
import { memo, useMemo, useRef, useCallback, useEffect } from 'react'
import { FlatList, Image, Pressable, Text, View } from 'react-native'
import type { ViewToken } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'
import type { Episode, Season } from '@/src/domain/capabilities/IMediaSeasonsCapability'
import type { SeriesWatchProgress } from '@/src/domain/capabilities/IMediaWatchProgressCapability'
import { selectedSeason$, setSelectedSeason } from '../stores/mediaUI.store'
import { t } from '@/src/presentation/shared/i18n'

interface EpisodeCarouselProps {
  readonly seasons: Season[]
  readonly watchProgress?: SeriesWatchProgress
  readonly onPressEpisode?: (episode: Episode) => void
  readonly onPressMore?: (episode: Episode) => void
}

/**
 * Episode with season metadata for multi-season display
 */
interface EpisodeWithSeason extends Episode {
  readonly seasonNumber: number
}

interface EpisodeCardProps {
  readonly episode: Episode
  readonly isWatched: boolean
  readonly onPress: () => void
  readonly onPressMore?: () => void
}

/**
 * Episode card for horizontal carousel
 * Netflix-style large cards with 16:9 aspect ratio
 */
const EpisodeCard: FC<EpisodeCardProps> = memo(({ episode, isWatched, onPress, onPressMore }) => {
  const durationText = useMemo(() => {
    if (!episode.runtime) return null
    return t('media_detail.episode_runtime').replace('{minutes}', episode.runtime.toString())
  }, [episode.runtime])

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.episodeCard,
        pressed && styles.episodeCardPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={t('media_detail.episode_number_title')
        .replace('{season}', episode.seasonNumber.toString())
        .replace('{episode}', episode.episodeNumber.toString())
        .replace('{title}', episode.name)}
      accessibilityState={{ checked: isWatched }}
    >
      {/* Episode Thumbnail with Gradient Overlay */}
      <View style={styles.thumbnailWrapper}>
        {episode.stillPath ? (
          <Image
            source={{ uri: episode.stillPath }}
            style={styles.thumbnail}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        ) : (
          <View style={styles.thumbnailPlaceholder}>
            <Text style={styles.episodeNumberLarge}>
              {episode.episodeNumber}
            </Text>
          </View>
        )}

        {/* Blur gradient overlay for text readability */}
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
          style={styles.gradient}
        />

        {/* Episode Number Badge */}
        <View style={styles.episodeNumberBadge}>
          <Text style={styles.episodeNumberBadgeText}>
            {t('media_detail.episode_badge').replace('{number}', episode.episodeNumber.toString())}
          </Text>
        </View>

        {/* Duration Badge */}
        {durationText && (
          <View style={styles.durationBadge}>
            <Text style={styles.durationBadgeText}>{durationText}</Text>
          </View>
        )}

        {/* Watched Badge */}
        {isWatched && (
          <View style={styles.watchedBadge}>
            <Text style={styles.watchedBadgeText}>✓</Text>
          </View>
        )}

        {/* Episode Info Overlay */}
        <View style={styles.infoOverlay}>
          <Text style={styles.episodeTitle} numberOfLines={2}>
            {episode.name}
          </Text>
          {episode.overview && (
            <Text style={styles.episodeOverview} numberOfLines={2}>
              {episode.overview}
            </Text>
          )}

          {/* Play button with runtime */}
          {episode.runtime && (
            <View style={styles.playRow}>
              <Text style={styles.playIcon}>▶</Text>
              <Text style={styles.runtimeText}>{episode.runtime}m</Text>
            </View>
          )}

          {/* More icon button */}
          {onPressMore && (
            <Pressable
              onPress={(e) => {
                e.stopPropagation()
                onPressMore()
              }}
              style={styles.moreIconButton}
              accessibilityRole="button"
              accessibilityLabel={t('media_detail.more_info')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  )
})

EpisodeCard.displayName = 'EpisodeCard'

/**
 * Horizontal episode carousel for TV series
 * Netflix-style scrolling with large episode cards
 * Features smart auto season switching as user scrolls
 */
const EpisodeCarouselComponent: FC<EpisodeCarouselProps> = observer(({
  seasons,
  watchProgress,
  onPressEpisode,
  onPressMore,
}) => {
  const selectedSeasonNumber = selectedSeason$.get()
  const flatListRef = useRef<FlatList<EpisodeWithSeason>>(null)
  const isUserScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Flatten all episodes from all seasons with season metadata
  const allEpisodes = useMemo<EpisodeWithSeason[]>(() => {
    return seasons.flatMap(season =>
      season.episodes.map(episode => ({
        ...episode,
        // Override seasonNumber to ensure it's from the season object
        seasonNumber: season.seasonNumber,
      }))
    )
  }, [seasons])

  // Find index of first episode in selected season for auto-scroll
  const selectedSeasonStartIndex = useMemo(() => {
    return allEpisodes.findIndex(ep => ep.seasonNumber === selectedSeasonNumber)
  }, [allEpisodes, selectedSeasonNumber])

  // Auto-scroll to selected season when changed externally (from SeasonSelector)
  useEffect(() => {
    if (selectedSeasonStartIndex !== -1 && flatListRef.current) {
      isUserScrollingRef.current = false // Mark as programmatic scroll
      flatListRef.current.scrollToIndex({
        index: selectedSeasonStartIndex,
        animated: true,
      })

      // Re-enable auto-switching after scroll animation completes
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = true
      }, 600) // Account for scroll animation duration
    }
  }, [selectedSeasonStartIndex])

  // Handle viewability change to detect season transitions
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    // Only auto-switch on user scroll, not programmatic
    if (!isUserScrollingRef.current) return
    if (viewableItems.length === 0) return

    // Get the most visible episode (first viewable item)
    const centerEpisode = viewableItems[0]?.item as EpisodeWithSeason | undefined
    if (!centerEpisode) return

    const episodeSeasonNumber = centerEpisode.seasonNumber

    // If different from current selected season, update store
    if (episodeSeasonNumber !== selectedSeasonNumber) {
      setSelectedSeason(episodeSeasonNumber)
    }
  }).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50, // Episode is "visible" when 50% shown
    minimumViewTime: 300, // Must be visible for 300ms to trigger change
  }).current

  // Handle scroll begin - enable auto-switching
  const handleScrollBeginDrag = useCallback(() => {
    isUserScrollingRef.current = true
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = null
    }
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Handle scroll to index failure (episode not in layout yet)
  const onScrollToIndexFailed = useCallback((info: {
    index: number
    highestMeasuredFrameIndex: number
    averageItemLength: number
  }) => {
    // Wait for layout to complete, then scroll again
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      })
    }, 100)
  }, [])

  if (allEpisodes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {t('media_detail.no_episodes')}
        </Text>
      </View>
    )
  }

  const renderEpisode = ({ item }: { item: EpisodeWithSeason }) => {
    // Find watch progress for this episode
    const seasonProgress = watchProgress?.seasons.find(
      (s) => s.number === item.seasonNumber
    )
    const episodeProgress = seasonProgress?.episodes.find(
      (ep) => ep.number === item.episodeNumber
    )
    const isWatched = episodeProgress?.completed ?? false

    return (
      <EpisodeCard
        episode={item}
        isWatched={isWatched}
        onPress={() => onPressEpisode?.(item)}
        onPressMore={onPressMore ? () => onPressMore(item) : undefined}
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={allEpisodes}
        renderItem={renderEpisode}
        keyExtractor={(item) => `${item.seasonNumber}-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        pagingEnabled={false}
        snapToAlignment="start"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollToIndexFailed={onScrollToIndexFailed}
        getItemLayout={(data, index) => ({
          length: CARD_WIDTH + CARD_SPACING,
          offset: (CARD_WIDTH + CARD_SPACING) * index,
          index,
        })}
      />
    </View>
  )
})

export const EpisodeCarousel = memo(EpisodeCarouselComponent)

// Card dimensions (16:9 aspect ratio)
const CARD_WIDTH = 300
const CARD_HEIGHT = 169
const CARD_SPACING = 16

const styles = StyleSheet.create((theme) => ({
  container: {
    marginVertical: theme.spacing.md,
  },
  listContent: {
    paddingHorizontal: theme.spacing.gutter,
  },
  emptyContainer: {
    paddingHorizontal: theme.spacing.gutter,
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
  },
  episodeCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: CARD_SPACING,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  episodeCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  thumbnailWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  episodeNumberLarge: {
    color: theme.colors.textTertiary,
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  episodeNumberBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  episodeNumberBadgeText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    textTransform: 'uppercase',
  },
  durationBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  durationBadgeText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  watchedBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  watchedBadgeText: {
    color: theme.colors.background,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.md,
  },
  episodeTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  episodeOverview: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.fontSize.sm * 1.3,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    marginBottom: theme.spacing.md,
  },
  playRow: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  playIcon: {
    color: theme.colors.imageText,
    fontSize: 14,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowRadius: 6,
  },
  runtimeText: {
    color: theme.colors.imageText,
    fontSize: 13,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowRadius: 6,
  },
  moreIconButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
}))