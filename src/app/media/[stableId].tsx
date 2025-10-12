import { EpisodeCarousel } from '@/src/presentation/features/media/components/EpisodeCarousel'
import { MetadataSection } from '@/src/presentation/features/media/components/MetadataSection'
import { ParallaxHero } from '@/src/presentation/features/media/components/ParallaxHero'
import { SeasonSelector } from '@/src/presentation/features/media/components/SeasonSelector'
import { ActionButtonRow } from '@/src/presentation/features/media/components/molecules/ActionButtonRow'
import { VideosSection } from '@/src/presentation/features/media/components/organisms/VideosSection'
import { CastSection } from '@/src/presentation/features/media/components/organisms/CastSection'
import { RecommendationsSection } from '@/src/presentation/features/media/components/organisms/RecommendationsSection'
import { useMediaDetail } from '@/src/presentation/features/media/hooks/useMediaDetail'
import { t } from '@/src/presentation/shared/i18n'
import { observer } from '@legendapp/state/react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useCallback, useMemo } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import type { MediaVideo } from '@/src/domain/capabilities/IMediaVideosCapability'
import type { Media } from '@/src/domain/entities/Media'
import { useQueryClient } from '@tanstack/react-query'
import type { MediaDetailData } from '@/src/domain/use-cases/media/GetMediaDetailUseCase'

/**
 * Media Detail Screen
 * Dynamic route: /media/[stableId]
 *
 * Pattern:
 * - Get stableId from route params
 * - TanStack Query cache holds all data keyed by stableId
 * - Pre-populate cache before navigation for instant loads
 * - Back navigation works because each stableId has separate cache entry
 *
 * Features:
 * - Parallax hero with gradient overlay and backdrop
 * - Comprehensive data loading via GetMediaDetailUseCase
 * - Action buttons (Play, Add to Watchlist, etc.)
 * - Enhanced metadata with ratings, runtime, genres
 * - Videos section (trailers, clips, behind-the-scenes)
 * - Cast section with people catalogs
 * - Season selector and episode list (series only)
 * - Recommendations section with related media
 */
const MediaDetailScreen = observer(() => {
  // Get route parameters
  const { stableId: encodedStableId } = useLocalSearchParams<{ stableId: string }>()
  const stableId = encodedStableId ? decodeURIComponent(encodedStableId) : ''
  const queryClient = useQueryClient()
  const { theme } = useUnistyles()

  const headerOptions = useMemo(
    () => ({
      headerShown: true,
      headerTransparent: true,
      headerBackButtonDisplayMode: 'minimal' as const,
      headerTitle: '',
      headerTintColor: theme.colors.text,
      headerBackTitle: '',
    }),
    [theme.colors.text]
  )

  // Get all data from TanStack Query cache
  const { data, media, isLoading, error } = useMediaDetail(stableId)

  // Shared value for scroll position to drive parallax animations
  const scrollY = useSharedValue(0)

  // Animated scroll handler for smooth 60fps parallax
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

  // Extract enriched data from use case response
  const enrichedData = data?.enrichedMedia
  const videos = data?.videos
  const peopleCatalogs = data?.peopleCatalogs
  const seasons = data?.seasons
  const recommendationCatalogs = data?.recommendationCatalogs
  const watchProgress = data?.watchProgress

  // Event handlers
  const handlePlay = useCallback(() => {
    router.push(`/streams/${encodeURIComponent(media!.stableId)}`)
  }, [media])

  const handlePressVideo = useCallback((video: MediaVideo) => {
    // TODO: Open video player
    console.log('Video pressed', video.id)
  }, [])

  const handlePressRecommendation = useCallback(
    (recommendedMedia: Media) => {
      // Pre-populate cache with Media object before navigation
      queryClient.setQueryData<MediaDetailData>(['media-detail', recommendedMedia.stableId], {
        media: recommendedMedia,
        externalIds: recommendedMedia.externalIds,
        // Other fields will be fetched by use case
        providersUsed: {},
        errors: {},
      })

      // Navigate to new media detail
      router.push(`/media/${encodeURIComponent(recommendedMedia.stableId)}`)
    },
    [queryClient]
  )

  // Loading state
  if (!media || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Stack.Screen options={headerOptions} />
        <ActivityIndicator size="large" color={styles.primaryColor.color} />
        <Text style={styles.loadingText}>{t('media_detail.loading')}</Text>
      </View>
    )
  }

  // Error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen options={headerOptions} />
        <Text style={styles.errorText}>{t('media_detail.error_loading')}</Text>
        <Text style={styles.errorDetails}>{error}</Text>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.retryButton, pressed && styles.retryButtonPressed]}
          accessibilityRole="button"
          accessibilityLabel={t('media_detail.retry')}
        >
          <Text style={styles.retryButtonText}>{t('common.close')}</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Configure Stack Screen */}
      <Stack.Screen options={headerOptions} />

      {/* Scrollable Content with Animated Scroll Handler */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Parallax Hero with Backdrop and Cinematic Zoom-out */}
        <ParallaxHero media={media} height={500} scrollY={scrollY} />

        {/* Action Buttons */}
        <ActionButtonRow media={media} onPlay={handlePlay} />

        {/* Enhanced Metadata Section */}
        {enrichedData && <MetadataSection enrichedData={enrichedData} />}

        {/* Videos Section (Trailers, Clips, etc.) */}
        {videos && videos.length > 0 && (
          <VideosSection videos={videos} onPressVideo={handlePressVideo} />
        )}

        {/* Cast Section */}
        {peopleCatalogs && peopleCatalogs.length > 0 && (
          <CastSection mediaStableId={stableId} catalogs={peopleCatalogs} />
        )}

        {/* Season Selector (Series only) */}
        {media.isSeries() && seasons && seasons.length > 0 && <SeasonSelector seasons={seasons} />}

        {/* Episode Carousel (Series only) */}
        {media.isSeries() && seasons && seasons.length > 0 && (
          <>
            {isLoading ? (
              <View style={styles.episodesLoadingContainer}>
                <ActivityIndicator size="small" color={styles.primaryColor.color} />
                <Text style={styles.loadingText}>{t('media_detail.loading')}</Text>
              </View>
            ) : (
              <EpisodeCarousel
                seasons={seasons}
                watchProgress={watchProgress?.series}
                onPressEpisode={(episode) => {
                  router.push(
                    `/streams/${encodeURIComponent(media.stableId)}?season=${episode.seasonNumber}&episode=${episode.episodeNumber}`
                  )
                }}
              />
            )}
          </>
        )}

        {/* Recommendations Section */}
        {recommendationCatalogs && recommendationCatalogs.length > 0 && (
          <RecommendationsSection
            mediaStableId={stableId}
            catalogs={recommendationCatalogs}
            onPressMedia={handlePressRecommendation}
          />
        )}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>
    </View>
  )
})

export default MediaDetailScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
    marginTop: theme.spacing.md,
  },
  primaryColor: {
    color: theme.colors.primary,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  errorDetails: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  retryButtonPressed: {
    opacity: 0.85,
  },
  retryButtonText: {
    color: theme.colors.background,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
  episodesLoadingContainer: {
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  },
  bottomSpacer: {
    height: theme.spacing['2xl'],
  },
}))
