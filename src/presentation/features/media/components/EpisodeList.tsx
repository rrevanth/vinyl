import type { FC } from 'react'
import { memo, useMemo } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import type { Episode, Season } from '@/src/domain/capabilities/IMediaSeasonsCapability'
import type { SeriesWatchProgress } from '@/src/domain/capabilities/IMediaWatchProgressCapability'
import { selectedSeason$ } from '../stores/mediaUI.store'
import { t } from '@/src/presentation/shared/i18n'

interface EpisodeListProps {
  readonly seasons: Season[]
  readonly watchProgress?: SeriesWatchProgress
  readonly onPressEpisode?: (episode: Episode) => void
}

/**
 * Episode list for selected season with progress indicators
 * Observes Legend State for selected season
 */
const EpisodeListComponent: FC<EpisodeListProps> = observer(({
  seasons,
  watchProgress,
  onPressEpisode,
}) => {
  const selectedSeasonNumber = selectedSeason$.get()

  // Find selected season
  const selectedSeason = useMemo(
    () => seasons.find((s) => s.seasonNumber === selectedSeasonNumber),
    [seasons, selectedSeasonNumber]
  )

  // Get watch progress for selected season
  const seasonProgress = useMemo(
    () => watchProgress?.seasons.find((s) => s.number === selectedSeasonNumber),
    [watchProgress, selectedSeasonNumber]
  )

  if (!selectedSeason || selectedSeason.episodes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {t('media_detail.episodes')}: 0
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {selectedSeason.episodes.map((episode) => {
        const episodeProgress = seasonProgress?.episodes.find(
          (ep) => ep.number === episode.episodeNumber
        )
        const isWatched = episodeProgress?.completed ?? false

        return (
          <Pressable
            key={episode.id}
            onPress={() => onPressEpisode?.(episode)}
            style={({ pressed }) => [
              styles.episodeCard,
              pressed && styles.episodeCardPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={t('media_detail.episode_title')
              .replace('{season}', selectedSeasonNumber.toString())
              .replace('{episode}', episode.episodeNumber.toString())
              .replace('{title}', episode.name)}
            accessibilityState={{ checked: isWatched }}
          >
            {/* Episode Still / Thumbnail */}
            <View style={styles.thumbnailContainer}>
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
              {isWatched && (
                <View style={styles.watchedBadge}>
                  <Text style={styles.watchedBadgeText}>✓</Text>
                </View>
              )}
            </View>

            {/* Episode Info */}
            <View style={styles.infoContainer}>
              <View style={styles.headerRow}>
                <Text style={styles.episodeNumber}>
                  {t('media_detail.episode').replace('{number}', episode.episodeNumber.toString())}
                </Text>
                {episode.runtime && (
                  <Text style={styles.runtime}>
                    {t('media_detail.episode_runtime').replace('{minutes}', episode.runtime.toString())}
                  </Text>
                )}
              </View>

              <Text style={styles.episodeTitle} numberOfLines={2}>
                {episode.name}
              </Text>

              {episode.overview && (
                <Text style={styles.episodeOverview} numberOfLines={3}>
                  {episode.overview}
                </Text>
              )}

              {episode.voteAverage && (
                <View style={styles.ratingRow}>
                  <Text style={styles.rating}>
                    ⭐ {episode.voteAverage.toFixed(1)}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        )
      })}
    </View>
  )
})

export const EpisodeList = memo(EpisodeListComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  emptyContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
  },
  episodeCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  episodeCardPressed: {
    opacity: 0.9,
  },
  thumbnailContainer: {
    position: 'relative',
    width: 160,
    aspectRatio: 16 / 9,
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
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
  },
  watchedBadge: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  watchedBadgeText: {
    color: theme.colors.background,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
  },
  infoContainer: {
    flex: 1,
    padding: theme.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  episodeNumber: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    textTransform: 'uppercase',
  },
  runtime: {
    color: theme.colors.textTertiary,
    fontSize: theme.fontSize.xs,
  },
  episodeTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
  },
  episodeOverview: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.fontSize.sm * 1.4,
  },
  ratingRow: {
    marginTop: theme.spacing.xs,
  },
  rating: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xs,
  },
}))