import type { Catalog } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import { setMedia } from '@/src/presentation/features/media/stores/mediaDetail.store'
import { t } from '@/src/presentation/shared/i18n'
import { mediaLibrary$ } from '@/src/presentation/shared/stores/mediaLibrary.store'
import { LegendList } from '@legendapp/list'
import { useSelector } from '@legendapp/state/react'
import { router } from 'expo-router'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { useInfiniteCatalogItemsQuery } from '../queries/useInfiniteCatalogItemsQuery'
import { MediaPosterCard } from './MediaPosterCard'

interface CatalogRowProps {
  readonly catalog: Catalog
  readonly onPressItem?: (media: Media) => void
}

const CatalogRowComponent: FC<CatalogRowProps> = ({ catalog, onPressItem: onPressItemProp }) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Get the latest catalog from the store to ensure we have the most up-to-date data
  const latestCatalog = useSelector(() => {
    const displayedCatalogs = mediaLibrary$.catalogs.displayed.get()
    return displayedCatalogs.find(c => c.stableId === catalog.stableId) ?? catalog
  })

  // Use infinite query hook for pagination with the latest catalog
  // Force re-initialization when catalog changes by using a key
  const infiniteQuery = useInfiniteCatalogItemsQuery(latestCatalog)

  // Get provider name from addon name if available, otherwise use providerId
  const providerName = latestCatalog.sourceInfo?.addonName || latestCatalog.providerId.toUpperCase()

  // Format display name: "Provider - Catalog Name"
  const displayName = `${providerName} - ${latestCatalog.name}`

  // Default navigation handler - store media object before navigating
  const handlePressItem = useCallback((media: Media) => {
    console.log('[CatalogRow] Navigation triggered:', {
      stableId: media.stableId,
      title: media.title,
      type: media.type,
    })

    if (onPressItemProp) {
      console.log('[CatalogRow] Using onPressItemProp')
      onPressItemProp(media)
    } else {
      console.log('[CatalogRow] Storing media in store and navigating')
      
      try {
        // Store media object in store before navigation
        setMedia(media)
        console.log('[CatalogRow] Media stored in store successfully')

        // Navigate with stableId only (Expo Router params only support primitives)
        const route = `/media/${media.stableId}`
        console.log('[CatalogRow] Attempting navigation to:', route)
        
        router.push(route as any)
        console.log('[CatalogRow] Navigation command sent')
      } catch (error) {
        console.error('[CatalogRow] Navigation failed:', error)
      }
    }
  }, [onPressItemProp])

  // Always use the latest catalog from the store to ensure we have the most up-to-date data
  // The infinite query is used for triggering loadMore, but the store has the accumulated data
  const catalogItems = latestCatalog.items.filter(item => !!item.media)

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
    usingStoreData: true
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

  // Update store when new data arrives
  useEffect(() => {
    if (infiniteQuery.data?.pages) {
      const latestPage = infiniteQuery.data.pages[infiniteQuery.data.pages.length - 1]
      if (latestPage && latestPage.stableId === latestCatalog.stableId) {
        // Update the catalog in the displayed store
        const displayedCatalogs = mediaLibrary$.catalogs.displayed.get()
        const catalogIndex = displayedCatalogs.findIndex(c => c.stableId === latestCatalog.stableId)

        if (catalogIndex !== -1) {
          const updatedCatalogs = [...displayedCatalogs]
          updatedCatalogs[catalogIndex] = latestPage
          mediaLibrary$.catalogs.displayed.set(updatedCatalogs)
          
          console.log('[CatalogRow] Updated store with new catalog data', {
            catalogId: latestPage.stableId,
            itemCount: latestPage.getItemCount(),
            canLoadMore: latestPage.canLoadMore(),
          })
        }
      }
    }
  }, [infiniteQuery.data, latestCatalog.stableId])

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
            onPress={handlePressItem}
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
