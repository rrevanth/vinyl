import type { FC } from 'react'
import { memo, useMemo, useCallback, useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import type { Catalog, CatalogItem } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import { t } from '@/src/presentation/shared/i18n'
import { LegendList } from '@legendapp/list'
import { router } from 'expo-router'
import { useInfiniteRecommendationsQuery } from '../queries/useInfiniteRecommendationsQuery'
import { MediaCard } from '@/src/presentation/features/homescreen/components/MediaCard'
import { observer } from '@legendapp/state/react'
import { logger } from '@/src/presentation/shared/utils/logger'
import { serializeMediaForNav } from '@/src/presentation/shared/utils/navigationParams'

interface RecommendationsRowProps {
  readonly catalog: Catalog
  readonly onPressItem?: (media: Media) => void
}

const RecommendationsRowComponent: FC<RecommendationsRowProps> = ({
  catalog,
  onPressItem: onPressItemProp,
}) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Use infinite query hook for pagination (TanStack Query as single source of truth)
  const infiniteQuery = useInfiniteRecommendationsQuery(catalog)

  // Always use poster variant for recommendations
  const variant = 'poster'

  // Get the latest catalog from query pages (last page has accumulated items)
  const latestCatalog = useMemo(() => {
    const pages = infiniteQuery.data?.pages
    if (!pages || pages.length === 0) return catalog
    return pages[pages.length - 1]
  }, [infiniteQuery.data?.pages, catalog])

  // Get provider name from addon name if available, otherwise use providerId
  const providerName = latestCatalog.sourceInfo?.addonName || latestCatalog.providerId.toUpperCase()

  // Format subtitle: Provider · Type
  const mediaType = latestCatalog.type.charAt(0).toUpperCase() + latestCatalog.type.slice(1)
  const subtitleText = `${providerName} · ${mediaType}`

  // Use catalog name as display title (no "Top 10 in" prefix)
  const displayTitle = latestCatalog.name

  // Format display name for navigation: "Provider - Catalog Name"
  const displayName = `${providerName} - ${latestCatalog.name}`

  // Handle title press - navigate to recommendations grid
  const handlePressTitle = useCallback(() => {
    logger.debug('[RecommendationsRow] Title pressed, navigating to recommendations grid')

    try {
      // Navigate to recommendations grid (not catalog grid!)
      const encodedCatalogId = encodeURIComponent(latestCatalog.stableId)
      const encodedName = encodeURIComponent(displayName)
      router.push(`/grids/recommendations/${encodedCatalogId}?name=${encodedName}` as any)
    } catch (error) {
      logger.error('[RecommendationsRow] Failed to navigate to recommendations grid', error as Error)
    }
  }, [latestCatalog, displayName])

  // Default navigation handler - pre-populate cache before navigating
  const handlePressItem = useCallback(
    (item: CatalogItem) => {
      const media = item.media
      if (!media) {
        logger.warn('[RecommendationsRow] Ignoring press because catalog item is missing media', {
          catalogItemId: item.stableId,
          catalogId: latestCatalog.stableId,
        })
        return
      }

      logger.debug('[RecommendationsRow] Navigation triggered', {
        stableId: media.stableId,
        title: media.title,
        type: media.type,
        catalogItemId: item.stableId,
      })

      if (onPressItemProp) {
        logger.debug('[RecommendationsRow] Using onPressItemProp')
        onPressItemProp(media)
        return
      }

      logger.debug('[RecommendationsRow] Navigating with Media data in params (NEW PATTERN)')

      try {
        // Navigate with lightweight Media data (optimized for performance)
        router.push({
          pathname: '/media/[stableId]',
          params: {
            stableId: media.stableId,
            mediaData: serializeMediaForNav(media) // Much smaller payload
          }
        })
        logger.debug('[RecommendationsRow] Navigation command sent')
      } catch (error) {
        logger.error('[RecommendationsRow] Navigation failed', error as Error)
      }
    },
    [latestCatalog.stableId, onPressItemProp]
  )

  // Get catalog items with media from latest catalog (directly from query, no store)
  const catalogItems = useMemo(() => {
    return latestCatalog.items.filter((item) => !!item.media)
  }, [latestCatalog.items])

  // Debug logging for catalog items
  logger.debug('[RecommendationsRow] Rendering recommendation items', {
    catalogId: latestCatalog.stableId,
    infiniteQueryPages: infiniteQuery.data?.pages?.length ?? 0,
    catalogItemsCount: catalogItems.length,
    latestCatalogItemCount: latestCatalog.items.length,
    infiniteQueryData: !!infiniteQuery.data,
    infiniteQueryPagesData: infiniteQuery.data?.pages?.map((page) => ({
      itemCount: page.items.length,
      canLoadMore: page.canLoadMore(),
    })),
    usingQueryData: true,
  })

  // Handle end reached for infinite scroll
  const handleEndReached = useCallback(async () => {
    logger.debug('[RecommendationsRow] onEndReached triggered', {
      catalogId: latestCatalog.stableId,
      canLoadMore: latestCatalog.canLoadMore(),
      isLoadingMore,
      isFetchingNextPage: infiniteQuery.isFetchingNextPage,
      hasNextPage: infiniteQuery.hasNextPage,
    })

    // Check if can load more and not already loading
    if (!latestCatalog.canLoadMore() || isLoadingMore || infiniteQuery.isFetchingNextPage) {
      logger.debug('[RecommendationsRow] Skipping load more', {
        canLoadMore: latestCatalog.canLoadMore(),
        isLoadingMore,
        isFetchingNextPage: infiniteQuery.isFetchingNextPage,
      })
      return
    }

    try {
      logger.debug('[RecommendationsRow] Starting to load more items')
      setIsLoadingMore(true)
      await infiniteQuery.fetchNextPage()
      logger.debug('[RecommendationsRow] Successfully loaded more items')
    } catch (error) {
      logger.error('[RecommendationsRow] Failed to load more recommendations', error as Error)
    } finally {
      setIsLoadingMore(false)
    }
  }, [latestCatalog, isLoadingMore, infiniteQuery])

  if (catalogItems.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={handlePressTitle}
          accessibilityRole="button"
          accessibilityLabel={t('home.catalog_view_all_accessibility').replace(
            '{name}',
            displayTitle
          )}
          style={({ pressed }) => pressed && styles.headerPressed}
        >
          <View style={styles.titleRow}>
            <Text style={styles.title}>{displayTitle}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
          <Text style={styles.subtitle}>{subtitleText}</Text>
        </Pressable>
      </View>

      <LegendList
        horizontal
        data={catalogItems}
        keyExtractor={(item) => item.stableId}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <MediaCard
            media={item.media!}
            variant={variant}
            position={undefined}
            showTitle={true}
            showMetadata={false}
            showDescription={false}
            onPress={() => handlePressItem(item)}
            testID={`recommendation-${catalog.stableId}-${item.stableId}`}
          />
        )}
        estimatedItemSize={152}
        initialContainerPoolRatio={3}
        drawDistance={800}
        recycleItems
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

export const RecommendationsRow = memo(observer(RecommendationsRowComponent))

const styles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing.rowSpacing,
    height: 228 + 40, // Poster height + title height
  },
  headerContainer: {
    paddingHorizontal: theme.spacing.gutter,
    marginBottom: theme.spacing.md,
  },
  headerPressed: {
    opacity: 0.7,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.bold,
  },
  chevron: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  listContent: {
    paddingHorizontal: theme.spacing.gutter,
    gap: theme.spacing.md,
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
    color: theme.colors.background,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
}))
