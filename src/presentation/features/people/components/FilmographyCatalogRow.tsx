import type { FC } from 'react'
import { memo, useMemo, useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import type { Catalog, CatalogItem } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import { LegendList } from '@legendapp/list'
import { router } from 'expo-router'
import { MediaCard } from '@/src/presentation/features/homescreen/components/MediaCard'
import { useQueryClient } from '@tanstack/react-query'
import type { MediaDetailData } from '@/src/domain/use-cases/media/GetMediaDetailUseCase'

interface FilmographyCatalogRowProps {
  readonly catalog: Catalog
  readonly onPressMedia?: (media: Media) => void
}

const FilmographyCatalogRowComponent: FC<FilmographyCatalogRowProps> = ({ catalog, onPressMedia }) => {
  const queryClient = useQueryClient()

  // Get catalog type (capitalize first letter)
  const catalogType = catalog.type.charAt(0).toUpperCase() + catalog.type.slice(1)

  // Handle title press - navigate to filmography grid view
  const handlePressTitle = useCallback(() => {
    console.log('[FilmographyCatalogRow] Title pressed, navigating to filmography grid view')

    try {
      // Pre-populate cache with catalog data
      queryClient.setQueryData(['filmography-grid', catalog.stableId], {
        catalog: catalog,
      })

      // Navigate to filmography grid view
      const encodedCatalogId = encodeURIComponent(catalog.stableId)
      const encodedName = encodeURIComponent(catalog.name)
      router.push(`/grids/filmography/${encodedCatalogId}?name=${encodedName}` as any)
    } catch (error) {
      console.error('[FilmographyCatalogRow] Failed to navigate to filmography grid view:', error)
    }
  }, [catalog, queryClient])

  // Default navigation handler - pre-populate cache before navigating
  const handlePressItem = useCallback(
    (item: CatalogItem) => {
      const media = item.media
      if (!media) {
        console.warn('[FilmographyCatalogRow] Ignoring press because catalog item is missing media', {
          catalogItemId: item.stableId,
          catalogId: catalog.stableId,
        })
        return
      }

      console.log('[FilmographyCatalogRow] Navigation triggered:', {
        stableId: media.stableId,
        title: media.title,
        type: media.type,
        catalogItemId: item.stableId,
      })

      if (onPressMedia) {
        console.log('[FilmographyCatalogRow] Using onPressMedia callback')
        onPressMedia(media)
        return
      }

      console.log('[FilmographyCatalogRow] Pre-populating cache and navigating')

      try {
        // Pre-populate TanStack Query cache with Media object before navigation
        queryClient.setQueryData<MediaDetailData>(['media-detail', media.stableId], {
          media,
          externalIds: media.externalIds,
          // Other fields will be fetched by use case
          providersUsed: {},
          errors: {},
        })
        console.log('[FilmographyCatalogRow] Media cached successfully')

        // Navigate with stableId only (Expo Router params only support primitives)
        // Encode the stableId to handle special characters like colons
        const encodedStableId = encodeURIComponent(media.stableId)
        const route = `/media/${encodedStableId}`
        console.log('[FilmographyCatalogRow] Attempting navigation to:', route)
        console.log('[FilmographyCatalogRow] Original stableId:', media.stableId)
        console.log('[FilmographyCatalogRow] Encoded stableId:', encodedStableId)

        router.push(route as any)
        console.log('[FilmographyCatalogRow] Navigation command sent')
      } catch (error) {
        console.error('[FilmographyCatalogRow] Navigation failed:', error)
      }
    },
    [catalog.stableId, onPressMedia, queryClient]
  )

  // Get catalog items with media (filter out items without media)
  const catalogItems = useMemo(() => {
    return catalog.items.filter(item => !!item.media)
  }, [catalog.items])

  // Don't render if no items with media
  if (catalogItems.length === 0) {
    return null
  }

  // Debug logging for catalog items
  console.log('[FilmographyCatalogRow] Rendering filmography catalog items', {
    catalogId: catalog.stableId,
    catalogName: catalog.name,
    catalogType: catalog.type,
    catalogItemsCount: catalogItems.length,
    totalItems: catalog.items.length,
  })

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={handlePressTitle}
          accessibilityRole="button"
          accessibilityLabel={`View all ${catalog.name}`}
          style={({ pressed }) => pressed && styles.headerPressed}
        >
          <View style={styles.titleRow}>
            <Text style={styles.title}>{catalog.name}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
          <Text style={styles.subtitle}>{catalogType}</Text>
        </Pressable>
      </View>

      <LegendList
        horizontal
        data={catalogItems}
        keyExtractor={(item, index) => {
          // Create robust unique key from multiple sources
          const key = [
            catalog.stableId,
            item.media?.stableId,
            item.order?.toString(),
            item.stableId,
            index.toString(),
          ]
            .filter(Boolean)
            .join(':') || `filmography-item-${index}`

          return key
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <MediaCard
            media={item.media!}
            variant="poster"
            showTitle={true}
            showMetadata={false}
            onPress={() => handlePressItem(item)}
            testID={`filmography-${catalog.stableId}-${index}`}
          />
        )}
      />
    </View>
  )
}

export const FilmographyCatalogRow = memo(FilmographyCatalogRowComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing.rowSpacing,
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
}))
