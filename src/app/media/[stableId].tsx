import { EpisodeList } from '@/src/presentation/features/media/components/EpisodeList'
import { MetadataSection } from '@/src/presentation/features/media/components/MetadataSection'
import { ParallaxHero } from '@/src/presentation/features/media/components/ParallaxHero'
import { SeasonSelector } from '@/src/presentation/features/media/components/SeasonSelector'
import { useMediaDetail } from '@/src/presentation/features/media/hooks/useMediaDetail'
import {
  clearMediaDetail,
  mediaDetail$,
} from '@/src/presentation/features/media/stores/mediaDetail.store'
import { t } from '@/src/presentation/shared/i18n'
import { observer } from '@legendapp/state/react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

/**
 * Media Detail Screen
 * Dynamic route: /media/[stableId]
 * Gets Media object from store (set by navigation from CatalogRow)
 *
 * Features:
 * - Parallax hero with gradient overlay
 * - Progressive data loading (IDs → Metadata → Progress → Seasons)
 * - Season selector for series
 * - Episode list with watch progress
 */
const MediaDetailScreen = observer(() => {
  // Get route parameters
  const { stableId: encodedStableId } = useLocalSearchParams<{ stableId: string }>()
  const stableId = encodedStableId ? decodeURIComponent(encodedStableId) : null

  // Get Media object from store (set before navigation)
  const media = mediaDetail$.media.get()
  const catalogItem = mediaDetail$.catalogItem.get()
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

  console.log('[MediaDetailScreen] Component rendered', {
    encodedStableId,
    stableId,
    hasMedia: !!media,
    mediaStableId: media?.stableId,
    mediaTitle: media?.title,
    stableIdMatch: media?.stableId === stableId,
    hasCatalogItem: !!catalogItem,
    catalogItemStableId: catalogItem?.stableId,
  })

  // Clear store on unmount
  useEffect(() => {
    console.log('[MediaDetailScreen] Component mounted')
    return () => {
      console.log('[MediaDetailScreen] Component unmounting, clearing store')
      clearMediaDetail()
    }
  }, [])

  // Progressive loading hook
  const { enrichedData, watchProgress, seasons, isLoading, isLoadingSeasons, error } =
    useMediaDetail(media!)

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

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Parallax Hero */}
        <ParallaxHero media={media} height={500} />

        {/* Metadata Section */}
        {enrichedData && <MetadataSection enrichedData={enrichedData} />}

        {/* Season Selector (Series only) */}
        {media.isSeries() && seasons && seasons.length > 0 && <SeasonSelector seasons={seasons} />}

        {/* Episode List (Series only) */}
        {media.isSeries() && seasons && seasons.length > 0 && (
          <>
            {isLoadingSeasons ? (
              <View style={styles.episodesLoadingContainer}>
                <ActivityIndicator size="small" color={styles.primaryColor.color} />
                <Text style={styles.loadingText}>{t('media_detail.loading')}</Text>
              </View>
            ) : (
              <EpisodeList seasons={seasons} watchProgress={watchProgress?.series} />
            )}
          </>
        )}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
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
