import { EpisodeCarousel } from '@/src/presentation/features/media/components/EpisodeCarousel'
import { ParallaxHeroWithOverlay } from '@/src/presentation/features/media/components/ParallaxHeroWithOverlay'
import { SeasonSelector } from '@/src/presentation/features/media/components/SeasonSelector'
import { VideosSection } from '@/src/presentation/features/media/components/organisms/VideosSection'
import { CastSection } from '@/src/presentation/features/media/components/organisms/CastSection'
import { RecommendationsRow } from '@/src/presentation/features/media/components/RecommendationsRow'
import {
  VideosSectionSkeleton,
  CastSectionSkeleton,
  RecommendationsSkeleton,
  EpisodesSkeleton,
} from '@/src/presentation/features/media/components/skeletons'
import { useMediaEnrichments } from '@/src/presentation/features/media/hooks/useMediaEnrichments'
import { Media } from '@/src/domain/entities/Media'
import type { Person } from '@/src/domain/entities/Person'
import { observer } from '@legendapp/state/react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useCallback, useMemo } from 'react'
import {
  deserializeMediaFromNav,
  serializeMediaForNav,
  serializePersonForNav,
} from '@/src/presentation/shared/utils/navigationParams'
import { createMediaFromNavParams } from '@/src/presentation/shared/utils/createMediaFromNavParams'
import { logger } from '@/src/presentation/shared/utils/logger'
import { View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { StyleSheet } from 'react-native-unistyles'
import type { MediaVideo } from '@/src/domain/capabilities/IMediaVideosCapability'
import type { Episode } from '@/src/domain/capabilities/IMediaSeasonsCapability'
import { LinearGradient } from 'expo-linear-gradient'

/**
 * Media Detail Screen
 * Dynamic route: /media/[stableId]
 *
 * NEW PATTERN:
 * - Media entity passed via router params (mediaData)
 * - Enrichments cached via TanStack Query (server state only)
 * - No cache dependency for Media entity (navigation state)
 *
 * Features:
 * - Parallax hero with gradient overlay and backdrop
 * - Comprehensive data loading via GetMediaEnrichmentsUseCase
 * - Action buttons (Play, Add to Watchlist, etc.)
 * - Enhanced metadata with ratings, runtime, genres
 * - Videos section (trailers, clips, behind-the-scenes)
 * - Cast section with people catalogs
 * - Season selector and episode list (series only)
 * - Recommendations section with related media
 */
const MediaDetailScreen = observer(() => {
  // Get route parameters and parse Media from lightweight params
  const params = useLocalSearchParams<{ stableId: string; mediaData: string }>()

  // Deserialize lightweight nav params
  const navParams = useMemo(() => deserializeMediaFromNav(params.mediaData), [params.mediaData])

  // Create minimal Media entity for instant rendering
  const media = useMemo(() => createMediaFromNavParams(navParams), [navParams])

  const headerOptions = useMemo(
    () => ({
      headerShown: true,
      headerTransparent: true,
      headerBackButtonDisplayMode: 'minimal' as const,
      headerTitle: '',
      headerTintColor: '#FFFFFF',
      headerBackTitle: '',
      headerBackground: () => (
        <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']} style={{ flex: 1 }} />
      ),
    }),
    []
  )

  // Get enrichments from TanStack Query (Media comes from params)
  const {
    isLoading,
    enrichedData,
    videos,
    peopleCatalogs,
    seasons,
    recommendationCatalogs,
    watchProgress,
  } = useMediaEnrichments(media)

  // Shared value for scroll position to drive parallax animations
  const scrollY = useSharedValue(0)

  // Animated scroll handler for smooth 60fps parallax
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

  // Enrichments are destructured from useMediaEnrichments hook above

  // Event handlers
  const handlePlay = useCallback(() => {
    // Use enriched media with complete externalIds if available
    const mediaToPass = enrichedData?.media || media

    router.push({
      pathname: '/streams/[mediaStableId]',
      params: {
        mediaStableId: media.stableId,
        mediaData: serializeMediaForNav(mediaToPass),
      },
    })
  }, [media, enrichedData])

  const handlePressVideo = useCallback((video: MediaVideo) => {
    // TODO: Open video player
    logger.debug('Video pressed', { videoId: video.id })
  }, [])

  const handlePressRecommendation = useCallback((recommendedMedia: Media) => {
    // Navigate with lightweight Media data (optimized for performance)
    router.push({
      pathname: '/media/[stableId]',
      params: {
        stableId: recommendedMedia.stableId,
        mediaData: serializeMediaForNav(recommendedMedia),
      },
    })
  }, [])

  const handlePressEpisodeMore = useCallback((episode: Episode) => {
    // TODO: Navigate to episode detail screen or expand inline
    // For now, just log for future implementation
    logger.debug('[MediaDetailScreen] Episode MORE pressed', {
      title: episode.name,
      season: episode.seasonNumber,
      episode: episode.episodeNumber,
    })
  }, [])

  const handlePressPerson = useCallback((person: Person) => {
    // Navigate with lightweight Person data (optimized for performance)
    router.push({
      pathname: '/person/[stableId]',
      params: {
        stableId: person.stableId,
        personData: serializePersonForNav(person),
      },
    })
  }, [])

  const handleAddToList = useCallback(() => {
    // TODO: Implement add to watchlist functionality
    logger.debug('Add to list pressed', { mediaId: media.stableId })
  }, [media])

  const handleShare = useCallback(() => {
    // TODO: Implement share functionality
    logger.debug('Share pressed', { mediaId: media.stableId })
  }, [media])

  const handleInfo = useCallback(() => {
    // TODO: Navigate to detailed info screen or expand info section
    logger.debug('Info pressed', { mediaId: media.stableId })
  }, [media])

  // TODO: Check if media is in user's library/watchlist
  const isInLibrary = false // Replace with actual state check

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
        {/* Parallax Hero with Overlay - includes title, metadata, synopsis, and actions */}
        <ParallaxHeroWithOverlay
          media={media}
          enrichedData={enrichedData}
          scrollY={scrollY}
          onPlay={handlePlay}
          onAddToList={handleAddToList}
          onShare={handleShare}
          onInfo={handleInfo}
          isInList={isInLibrary}
        />

        {/* Episodes Section (Series only) */}
        {media.isSeries() && (
          <>
            {isLoading ? (
              <EpisodesSkeleton />
            ) : seasons && seasons.length > 0 ? (
              <>
                <SeasonSelector seasons={seasons} />
                <EpisodeCarousel
                  seasons={seasons}
                  watchProgress={watchProgress?.series}
                  onPressEpisode={(episode) => {
                    // Use enriched media with complete externalIds if available
                    const mediaToPass = enrichedData?.media || media

                    router.push({
                      pathname: '/streams/[mediaStableId]',
                      params: {
                        mediaStableId: media.stableId,
                        mediaData: serializeMediaForNav(mediaToPass),
                        season: episode.seasonNumber.toString(),
                        episode: episode.episodeNumber.toString(),
                      },
                    })
                  }}
                  onPressMore={handlePressEpisodeMore}
                />
              </>
            ) : null}
          </>
        )}

        {/* Videos Section (Trailers) */}
        {isLoading ? (
          <VideosSectionSkeleton />
        ) : videos && videos.length > 0 ? (
          <VideosSection videos={videos} onPressVideo={handlePressVideo} />
        ) : null}

        {/* Cast Section */}
        {isLoading ? (
          <CastSectionSkeleton />
        ) : peopleCatalogs && peopleCatalogs.length > 0 ? (
          <CastSection 
            mediaStableId={media.stableId} 
            catalogs={peopleCatalogs}
            onPressPerson={handlePressPerson}
          />
        ) : null}

        {/* Recommendations - Use RecommendationsRow for proper pagination */}
        {isLoading ? (
          <RecommendationsSkeleton />
        ) : recommendationCatalogs && recommendationCatalogs.length > 0 ? (
          <>
            {recommendationCatalogs.map((catalog) => (
              <RecommendationsRow
                key={catalog.stableId}
                catalog={catalog}
                onPressItem={handlePressRecommendation}
              />
            ))}
          </>
        ) : null}

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
  bottomSpacer: {
    height: theme.spacing['2xl'],
  },
}))
