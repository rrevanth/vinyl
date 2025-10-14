import { useCallback, useMemo, useState } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { Stack, useLocalSearchParams, router } from 'expo-router'
import { StyleSheet } from 'react-native-unistyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useQueryClient } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import { MediaGrid } from '@/src/presentation/shared/ui/organisms/MediaGrid'
import { useInfiniteRecommendationsCatalogQuery } from '@/src/presentation/features/media/queries/useInfiniteRecommendationsCatalogQuery'
import { t } from '@/src/presentation/shared/i18n'
import { serializeMediaForNav } from '@/src/presentation/shared/utils/navigationParams'

interface CachedRecommendationsCatalogData {
  readonly catalog: Catalog
}

export default function RecommendationsGridScreen() {
  const params = useLocalSearchParams<{ catalogId: string; name?: string }>()
  const queryClient = useQueryClient()
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const insets = useSafeAreaInsets()

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

  // Handle media press
  const handlePressMedia = useCallback(
    (media: Media) => {
      // Navigate with serialized media data
      router.push({
        pathname: '/media/[stableId]',
        params: {
          stableId: media.stableId,
          mediaData: serializeMediaForNav(media)
        }
      } as any)
    },
    []
  )

  // Show empty state if no catalog
  if (!catalog) {
    return (
      <View style={styles.emptyContainer}>
        <Stack.Screen options={headerOptions} />
        <Text style={styles.emptyText}>{t('media_detail.no_recommendations')}</Text>
      </View>
    )
  }

  // Use infinite query hook - only after we have catalog
  return <RecommendationsGridContent 
    catalog={catalog}
    headerOptions={headerOptions}
    handlePressMedia={handlePressMedia}
    isLoadingMore={isLoadingMore}
    setIsLoadingMore={setIsLoadingMore}
    insets={insets}
  />
}

// Separate component to ensure hook is only called when catalog exists
function RecommendationsGridContent({ 
  catalog, 
  headerOptions, 
  handlePressMedia,
  isLoadingMore,
  setIsLoadingMore,
  insets
}: {
  catalog: Catalog
  headerOptions: any
  handlePressMedia: (media: Media) => void
  isLoadingMore: boolean
  setIsLoadingMore: (loading: boolean) => void
  insets: { top: number; bottom: number; left: number; right: number }
}) {
  const { items, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteRecommendationsCatalogQuery(catalog)

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
  }, [hasNextPage, isLoadingMore, isFetchingNextPage, fetchNextPage, setIsLoadingMore])

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
      <View style={{ paddingTop: insets.top }}>
        <MediaGrid
          items={items}
          variant="poster"
          columns={3}
          onPressItem={handlePressMedia}
          onEndReached={handleEndReached}
          isLoadingMore={isLoadingMore || isFetchingNextPage}
        />
      </View>
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
