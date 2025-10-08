import type { Catalog } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import { setMedia } from '@/src/presentation/features/media/stores/mediaDetail.store'
import { t } from '@/src/presentation/shared/i18n'
import { mediaLibrary$ } from '@/src/presentation/shared/stores/mediaLibrary.store'
import { LegendList } from '@legendapp/list'
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

  // Use infinite query hook for pagination
  const infiniteQuery = useInfiniteCatalogItemsQuery(catalog)

  // Get provider name from addon name if available, otherwise use providerId
  const providerName = catalog.sourceInfo?.addonName || catalog.providerId.toUpperCase()

  // Format display name: "Provider - Catalog Name"
  const displayName = `${providerName} - ${catalog.name}`

  // Default navigation handler - store media object before navigating
  const handlePressItem = useCallback((media: Media) => {
    console.log('[CatalogRow] Navigation triggered:', {
      stableId: media.stableId,
      title: media.title,
      type: media.type,
    })

    if (onPressItemProp) {
      onPressItemProp(media)
    } else {
      // Store media object in store before navigation
      setMedia(media)

      // Navigate with stableId only (Expo Router params only support primitives)
      router.push(`/media/${media.stableId}` as any)
    }
  }, [onPressItemProp])

  // Use items from infinite query's latest page if available, otherwise use catalog prop
  // The latest page contains all accumulated items from previous pages
  const catalogToRender = infiniteQuery.data?.pages[infiniteQuery.data.pages.length - 1] ?? catalog

  // Keep full CatalogItem objects to preserve unique item.stableId
  const catalogItems = catalogToRender.items.filter(item => !!item.media)

  // Handle end reached for infinite scroll
  const handleEndReached = useCallback(async () => {
    // Check if can load more and not already loading
    if (!catalog.canLoadMore() || isLoadingMore || infiniteQuery.isFetchingNextPage) {
      return
    }

    try {
      setIsLoadingMore(true)
      await infiniteQuery.fetchNextPage()
    } catch (error) {
      console.error('Failed to load more catalog items', error)
    } finally {
      setIsLoadingMore(false)
    }
  }, [catalog, isLoadingMore, infiniteQuery])

  // Update store when new data arrives
  useEffect(() => {
    if (infiniteQuery.data?.pages) {
      const latestPage = infiniteQuery.data.pages[infiniteQuery.data.pages.length - 1]
      if (latestPage && latestPage.stableId === catalog.stableId) {
        // Update the catalog in the displayed store
        const displayedCatalogs = mediaLibrary$.catalogs.displayed.get()
        const catalogIndex = displayedCatalogs.findIndex(c => c.stableId === catalog.stableId)

        if (catalogIndex !== -1) {
          const updatedCatalogs = [...displayedCatalogs]
          updatedCatalogs[catalogIndex] = latestPage
          mediaLibrary$.catalogs.displayed.set(updatedCatalogs)
        }
      }
    }
  }, [infiniteQuery.data, catalog.stableId])

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
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          (isLoadingMore || infiniteQuery.isFetchingNextPage) && catalog.canLoadMore() ? (
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
