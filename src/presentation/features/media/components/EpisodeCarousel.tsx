import type { Episode, Season } from '@/src/domain/capabilities/IMediaSeasonsCapability'
import type { SeriesWatchProgress } from '@/src/domain/capabilities/IMediaWatchProgressCapability'
import { t } from '@/src/presentation/shared/i18n'
import { Ionicons } from '@expo/vector-icons'
import { observer } from '@legendapp/state/react'
import { LinearGradient } from 'expo-linear-gradient'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native-unistyles'
import { LegendList } from '@legendapp/list'
import { selectedSeason$, setSelectedSeason } from '../stores/mediaUI.store'

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
 * Apple TV+ style large cards with blur overlay
 */
const EpisodeCard: FC<EpisodeCardProps> = memo(({ episode, isWatched, onPress, onPressMore }) => {
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
      {/* Episode Thumbnail with Blur Overlay */}
      <View style={styles.thumbnailWrapper}>
        {episode.stillPath ? (
          <Image
            source={{ uri: episode.stillPath }}
            style={styles.thumbnail}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
            recyclingKey={`${episode.seasonNumber}-${episode.episodeNumber}`}
            accessibilityIgnoresInvertColors
          />
        ) : (
          <View style={styles.thumbnailPlaceholder}>
            <Text style={styles.episodeNumberLarge}>
              {episode.episodeNumber}
            </Text>
          </View>
        )}

        {/* Gradient overlay for text readability (optimized performance) */}
        <LinearGradient
          colors={[
            'transparent',
            'rgba(0, 0, 0, 0.3)',
            'rgba(0, 0, 0, 0.6)',
            'rgba(0, 0, 0, 0.85)'
          ]}
          locations={[0, 0.3, 0.6, 1]}
          style={styles.gradientOverlay}
        />

        {/* Watched Badge */}
        {isWatched && (
          <View style={styles.watchedBadge}>
            <Text style={styles.watchedBadgeText}>✓</Text>
          </View>
        )}

        {/* Episode Info Overlay */}
        <View style={styles.infoOverlay}>
          <Text style={styles.episodeNumber}>
            EPISODE {episode.episodeNumber}
          </Text>
          <Text style={styles.episodeTitle} numberOfLines={1}>
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
  const listRef = useRef<any>(null)
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
    if (selectedSeasonStartIndex !== -1 && listRef.current) {
      isUserScrollingRef.current = false // Mark as programmatic scroll
      
      // LegendList uses scrollToIndex like FlatList
      listRef.current.scrollToIndex?.({
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
  const onViewableItemsChanged = useCallback((info: { viewableItems: any[]; changed: any[] }) => {
    // Only auto-switch on user scroll, not programmatic
    if (!isUserScrollingRef.current) return
    if (info.viewableItems.length === 0) return

    // Get the most visible episode (first viewable item)
    const centerEpisode = info.viewableItems[0]?.item as EpisodeWithSeason | undefined
    if (!centerEpisode) return

    const episodeSeasonNumber = centerEpisode.seasonNumber

    // If different from current selected season, update store
    if (episodeSeasonNumber !== selectedSeasonNumber) {
      setSelectedSeason(episodeSeasonNumber)
    }
  }, [selectedSeasonNumber])

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

  if (allEpisodes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {t('media_detail.no_episodes')}
        </Text>
      </View>
    )
  }

  const renderEpisode = useCallback(({ item }: { item: EpisodeWithSeason }) => {
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
  }, [watchProgress, onPressEpisode, onPressMore])

  return (
    <View style={styles.container}>
      <LegendList
        ref={listRef}
        data={allEpisodes}
        renderItem={renderEpisode}
        keyExtractor={(item) => `${item.seasonNumber}-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onScrollBeginDrag={handleScrollBeginDrag}
        estimatedItemSize={CARD_WIDTH}
        initialContainerPoolRatio={3}
        drawDistance={800}
        recycleItems={true}
        maintainVisibleContentPosition
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 300,
        }}
      />
    </View>
  )
})

export const EpisodeCarousel = memo(EpisodeCarouselComponent)

// Card dimensions
const CARD_WIDTH = 300
const CARD_HEIGHT = 220
const CARD_SPACING = 16

const styles = StyleSheet.create((theme) => ({
  container: {
    marginVertical: theme.spacing.md,
    height: CARD_HEIGHT, // CRITICAL: LegendList needs explicit height for horizontal lists
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
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
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
  episodeNumber: {
    color: theme.colors.text,
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: theme.spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
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
    marginBottom: theme.spacing.lg,
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
