import { useCallback, useMemo, useState } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { Stack, useLocalSearchParams, router } from 'expo-router'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import { useQueryClient } from '@tanstack/react-query'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import type { MediaDetailData } from '@/src/domain/use-cases/media/GetMediaDetailUseCase'
import { MediaGrid } from '@/src/presentation/shared/ui/organisms/MediaGrid'
import { useInfiniteCatalogItemsQuery } from '@/src/presentation/features/homescreen/queries/useInfiniteCatalogItemsQuery'
import { t } from '@/src/presentation/shared/i18n'

export default function CatalogGridScreen() {
  const params = useLocalSearchParams<{ catalogId: string; name?: string }>()
  const queryClient = useQueryClient()
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const { theme } = useUnistyles()

  // Decode catalogId
  const catalogId = decodeURIComponent(params.catalogId)
  const displayName = params.name ? decodeURIComponent(params.name) : t('home.catalog_default_name')

  const headerOptions = useMemo(
    () => ({
      headerShown: true,
      headerTransparent: true,
      headerBackButtonDisplayMode: 'minimal' as const,
      headerTitle: displayName,
      headerTintColor: theme.colors.text,
      headerBackTitle: '',
    }),
    [displayName, theme.colors.text]
  )

  // Get cached catalog data
  const cachedData = queryClient.getQueryData<{ catalog: Catalog }>(['catalog-grid', catalogId])
  const catalog = cachedData?.catalog

  // Use infinite query for pagination
  const infiniteQuery = useInfiniteCatalogItemsQuery(catalog!)

  // Get latest catalog with accumulated items
  const latestCatalog = useMemo(() => {
    const pages = infiniteQuery.data?.pages
    if (!pages || pages.length === 0) return catalog
    return pages[pages.length - 1]
  }, [infiniteQuery.data?.pages, catalog])

  // Extract media items
  const items = useMemo(() => {
    if (!latestCatalog) return []
    return latestCatalog.items
      .map((item) => item.media)
      .filter((media): media is Media => !!media)
  }, [latestCatalog])

  // Handle infinite scroll
  const handleEndReached = useCallback(async () => {
    if (!latestCatalog?.canLoadMore() || isLoadingMore || infiniteQuery.isFetchingNextPage) {
      return
    }

    try {
      setIsLoadingMore(true)
      await infiniteQuery.fetchNextPage()
    } catch (error) {
      console.error('[CatalogGrid] Failed to load more', error)
    } finally {
      setIsLoadingMore(false)
    }
  }, [latestCatalog, isLoadingMore, infiniteQuery])

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

      // Navigate to detail
      const encodedStableId = encodeURIComponent(media.stableId)
      router.push(`/media/${encodedStableId}` as any)
    },
    [queryClient]
  )

  if (!catalog || infiniteQuery.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Stack.Screen options={headerOptions} />
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (infiniteQuery.isError) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen options={headerOptions} />
        <Text style={styles.errorText}>{t('home.catalog_load_error')}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={headerOptions} />
      <MediaGrid
        items={items}
        columns={3}
        onPressItem={handlePressMedia}
        onEndReached={handleEndReached}
        isLoadingMore={isLoadingMore || infiniteQuery.isFetchingNextPage}
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
