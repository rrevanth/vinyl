import type { FC } from 'react'
import { memo, useMemo, useCallback, useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import type { Catalog, CatalogItem } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import { t } from '@/src/presentation/shared/i18n'
import { LegendList } from '@legendapp/list'
import { router } from 'expo-router'
import { useInfiniteCatalogItemsQuery } from '../queries/useInfiniteCatalogItemsQuery'
import { MediaPosterCard } from './MediaPosterCard'
import { useQueryClient } from '@tanstack/react-query'
import type { MediaDetailData } from '@/src/domain/use-cases/media/GetMediaDetailUseCase'

interface CatalogRowProps {
  readonly catalog: Catalog
  readonly onPressItem?: (media: Media) => void
}

const CatalogRowComponent: FC<CatalogRowProps> = ({ catalog, onPressItem: onPressItemProp }) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const queryClient = useQueryClient()

  // Use infinite query hook for pagination (TanStack Query as single source of truth)
  const infiniteQuery = useInfiniteCatalogItemsQuery(catalog)

  // Get the latest catalog from query pages (last page has accumulated items)
  const latestCatalog = useMemo(() => {
    const pages = infiniteQuery.data?.pages
    if (!pages || pages.length === 0) return catalog
    return pages[pages.length - 1]
  }, [infiniteQuery.data?.pages, catalog])

  // Get provider name from addon name if available, otherwise use providerId
  const providerName = latestCatalog.sourceInfo?.addonName || latestCatalog.providerId.toUpperCase()

  // Format display name: "Provider - Catalog Name"
  const displayName = `${providerName} - ${latestCatalog.name}`

  // Default navigation handler - pre-populate cache before navigating
  const handlePressItem = useCallback(
    (item: CatalogItem) => {
      const media = item.media
      if (!media) {
        console.warn('[CatalogRow] Ignoring press because catalog item is missing media', {
          catalogItemId: item.stableId,
          catalogId: latestCatalog.stableId,
        })
        return
      }

      console.log('[CatalogRow] Navigation triggered:', {
        stableId: media.stableId,
        title: media.title,
        type: media.type,
        catalogItemId: item.stableId,
      })

      if (onPressItemProp) {
        console.log('[CatalogRow] Using onPressItemProp')
        onPressItemProp(media)
        return
      }

      console.log('[CatalogRow] Pre-populating cache and navigating')

      try {
        // Pre-populate TanStack Query cache with Media object before navigation
        queryClient.setQueryData<MediaDetailData>(['media-detail', media.stableId], {
          media,
          externalIds: media.externalIds,
          // Other fields will be fetched by use case
          providersUsed: {},
          errors: {},
        })
        console.log('[CatalogRow] Media cached successfully')

        // Navigate with stableId only (Expo Router params only support primitives)
        // Encode the stableId to handle special characters like colons
        const encodedStableId = encodeURIComponent(media.stableId)
        const route = `/media/${encodedStableId}`
        console.log('[CatalogRow] Attempting navigation to:', route)
        console.log('[CatalogRow] Original stableId:', media.stableId)
        console.log('[CatalogRow] Encoded stableId:', encodedStableId)

        router.push(route as any)
        console.log('[CatalogRow] Navigation command sent')
      } catch (error) {
        console.error('[CatalogRow] Navigation failed:', error)
      }
    },
    [latestCatalog.stableId, onPressItemProp, queryClient]
  )

  // Get catalog items with media from latest catalog (directly from query, no store)
  const catalogItems = useMemo(() => {
    return latestCatalog.items.filter(item => !!item.media)
  }, [latestCatalog.items])

  // Debug logging for catalog items
  console.log('[CatalogRow] Rendering catalog items', {
    catalogId: latestCatalog.stableId,
    infiniteQueryPages: infiniteQuery.data?.pages?.length ?? 0,
    catalogItemsCount: catalogItems.length,
    latestCatalogItemCount: latestCatalog.items.length,
    infiniteQueryData: !!infiniteQuery.data,
    infiniteQueryPagesData: infiniteQuery.data?.pages?.map(page => ({
      itemCount: page.items.length,
      canLoadMore: page.canLoadMore()
    })),
    usingQueryData: true,
  })

  // Handle end reached for infinite scroll
  const handleEndReached = useCallback(async () => {
    console.log('[CatalogRow] onEndReached triggered', {
      catalogId: latestCatalog.stableId,
      canLoadMore: latestCatalog.canLoadMore(),
      isLoadingMore,
      isFetchingNextPage: infiniteQuery.isFetchingNextPage,
      hasNextPage: infiniteQuery.hasNextPage,
    })

    // Check if can load more and not already loading
    if (!latestCatalog.canLoadMore() || isLoadingMore || infiniteQuery.isFetchingNextPage) {
      console.log('[CatalogRow] Skipping load more', {
        canLoadMore: latestCatalog.canLoadMore(),
        isLoadingMore,
        isFetchingNextPage: infiniteQuery.isFetchingNextPage,
      })
      return
    }

    try {
      console.log('[CatalogRow] Starting to load more items')
      setIsLoadingMore(true)
      await infiniteQuery.fetchNextPage()
      console.log('[CatalogRow] Successfully loaded more items')
    } catch (error) {
      console.error('[CatalogRow] Failed to load more catalog items', error)
    } finally {
      setIsLoadingMore(false)
    }
  }, [latestCatalog, isLoadingMore, infiniteQuery])

  if (catalogItems.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={1}>
          {displayName}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('home.catalog_customize_accessibility').replace(
            '{name}',
            displayName
          )}
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionPressed]}
        >
          <Text style={styles.actionLabel}>{t('home.catalog_customize')}</Text>
        </Pressable>
      </View>

      <LegendList
        horizontal
        data={catalogItems}
        keyExtractor={(item) => item.stableId}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <MediaPosterCard
            media={item.media!}
            size="standard"
            onPress={() => handlePressItem(item)}
            testID={`catalog-${catalog.stableId}-${item.stableId}`}
          />
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          (isLoadingMore || infiniteQuery.isFetchingNextPage) && latestCatalog.canLoadMore() ? (
            <View style={styles.loadingFooter}>
              <ActivityIndicator
                size="small"
                color={styles.spinnerColor.color}
                accessibilityLabel={t('home.catalog_loading_more')}
              />
            </View>
          ) : infiniteQuery.isError ? (
            <View style={styles.errorFooter}>
              <Text style={styles.errorText}>{t('home.catalog_load_error')}</Text>
              <Pressable
                onPress={() => infiniteQuery.refetch()}
                style={({ pressed }) => [styles.retryButton, pressed && styles.retryPressed]}
                accessibilityRole="button"
                accessibilityLabel={t('home.catalog_retry')}
              >
                <Text style={styles.retryText}>{t('home.catalog_retry')}</Text>
              </Pressable>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export const CatalogRow = memo(CatalogRowComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing.xl,
  },
  headerRow: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
    flex: 1,
    marginRight: theme.spacing.md,
  },
  actionButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
  },
  actionPressed: {
    opacity: 0.85,
  },
  actionLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
  },
  spinnerColor: {
    color: theme.colors.primary,
  },
  loadingFooter: {
    paddingHorizontal: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
    height: 200,
  },
  errorFooter: {
    paddingHorizontal: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
    height: 200,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.xs,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  retryButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.primary,
  },
  retryPressed: {
    opacity: 0.85,
  },
  retryText: {
    color: theme.colors.background, // Use background color as inverse (white on primary)
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
}))
