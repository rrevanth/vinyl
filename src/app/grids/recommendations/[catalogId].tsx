import { useCallback, useMemo, useState } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { Stack, useLocalSearchParams, router } from 'expo-router'
import { StyleSheet } from 'react-native-unistyles'
import { useQueryClient } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import type { MediaDetailData } from '@/src/domain/use-cases/media/GetMediaDetailUseCase'
import { MediaGrid } from '@/src/presentation/shared/ui/organisms/MediaGrid'
import { useInfiniteRecommendationsCatalogQuery } from '@/src/presentation/features/media/queries/useInfiniteRecommendationsCatalogQuery'
import { t } from '@/src/presentation/shared/i18n'

interface CachedRecommendationsCatalogData {
  readonly catalog: Catalog
}

export default function RecommendationsGridScreen() {
  const params = useLocalSearchParams<{ catalogId: string; name?: string }>()
  const queryClient = useQueryClient()
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Decode catalogId
  const catalogId = decodeURIComponent(params.catalogId)
  const catalogName = params.name ? decodeURIComponent(params.name) : undefined

  // Get cached catalog data
  const cachedData = useMemo(() => {
    return queryClient.getQueryData<CachedRecommendationsCatalogData>([
      'recommendations-grid',
      catalogId,
    ])
  }, [queryClient, catalogId])

  const catalog = cachedData?.catalog

  // Use infinite query hook
  const {
    items,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteRecommendationsCatalogQuery(catalog!)

  const headerTitle = catalogName || catalog?.name || t('media_detail.recommendations')

  const headerOptions = useMemo(
    () => ({
      headerShown: true,
      headerTransparent: true,
      headerBackButtonDisplayMode: 'minimal' as const,
      headerTitle,
      headerTintColor: '#FFFFFF',
      headerBackTitle: '',
      headerBackground: () => (
        <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']} style={{ flex: 1 }} />
      ),
    }),
    [headerTitle]
  )

  // Handle infinite scroll
  const handleEndReached = useCallback(async () => {
    if (!hasNextPage || isLoadingMore || isFetchingNextPage) {
      return
    }

    try {
      setIsLoadingMore(true)
      await fetchNextPage()
    } catch (error) {
      console.error('[RecommendationsGrid] Failed to load more', error)
    } finally {
      setIsLoadingMore(false)
    }
  }, [hasNextPage, isLoadingMore, isFetchingNextPage, fetchNextPage])

  // Handle media press
  const handlePressMedia = useCallback(
    (media: Media) => {
      // Pre-populate cache
      queryClient.setQueryData<MediaDetailData>(['media-detail', media.stableId], {
        media,
        externalIds: media.externalIds,
        providersUsed: {},
        errors: {},
      })

      // Navigate to media detail
      const encodedStableId = encodeURIComponent(media.stableId)
      router.push(`/media/${encodedStableId}` as any)
    },
    [queryClient]
  )

  if (!catalog) {
    return (
      <View style={styles.emptyContainer}>
        <Stack.Screen options={headerOptions} />
        <Text style={styles.emptyText}>{t('media_detail.no_recommendations')}</Text>
      </View>
    )
  }

  if (isLoading && items.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Stack.Screen options={headerOptions} />
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen options={headerOptions} />
        <Text style={styles.errorText}>{t('media_detail.recommendations_load_error')}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={headerOptions} />
      <MediaGrid
        items={items}
        variant="poster"
        columns={3}
        onPressItem={handlePressMedia}
        onEndReached={handleEndReached}
        isLoadingMore={isLoadingMore || isFetchingNextPage}
      />
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.gutter,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.gutter,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.base,
    textAlign: 'center',
  },
}))
