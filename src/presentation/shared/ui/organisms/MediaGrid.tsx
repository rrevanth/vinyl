import type { Media } from '@/src/domain/entities/Media'
import { MediaCard } from '@/src/presentation/features/homescreen/components/MediaCard'
import { LegendList } from '@legendapp/list'
import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

interface MediaGridProps {
  readonly items: Media[]
  readonly columns?: number
  readonly variant?: 'poster' | 'landscape'
  readonly onPressItem?: (media: Media) => void
  readonly onEndReached?: () => void
  readonly isLoadingMore?: boolean
  readonly testID?: string
}

const MediaGridComponent: FC<MediaGridProps> = ({
  items,
  columns = 3,
  variant = 'poster',
  onPressItem,
  onEndReached,
  isLoadingMore = false,
  testID,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: Media }) => (
      <View style={styles.cardWrapperStyle(variant)}>
        <MediaCard
          media={item}
          variant={variant}
          showTitle={variant === 'landscape'}
          showMetadata={variant === 'landscape'}
          showDescription={false}
          onPress={onPressItem ? () => onPressItem(item) : undefined}
          style={styles.cardStyle(variant)}
          testID={`grid-${item.stableId}`}
        />
      </View>
    ),
    [variant, onPressItem]
  )

  const keyExtractor = useCallback((item: Media, index: number) => `${item.stableId}-${index}`, [])

  const ListFooterComponent = useCallback(() => {
    if (!isLoadingMore) return null
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="large" />
      </View>
    )
  }, [isLoadingMore])

  return (
    <LegendList
      testID={testID}
      data={items}
      keyExtractor={keyExtractor}
      numColumns={columns}
      contentContainerStyle={styles.gridContent}
      columnWrapperStyle={styles.columnWrapperStyle(variant)}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={ListFooterComponent}
    />
  )
}

export const MediaGrid = memo(MediaGridComponent)

const styles = StyleSheet.create((theme) => ({
  gridContent: {
    paddingHorizontal: theme.spacing.gutter,
    paddingVertical: theme.spacing.lg,
  },
  loadingFooter: {
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  },
  cardStyle: (variant: 'poster' | 'landscape') => ({
    width: variant === 'landscape' ? 160 : 100,
    height: variant === 'landscape' ? 90 : 150,
    aspectRatio: variant === 'landscape' ? 16 / 9 : 2 / 3,
  }),
  cardWrapperStyle: (variant: 'poster' | 'landscape') => ({
    flex: 1,
  }),
  columnWrapperStyle: (variant: 'poster' | 'landscape') => ({
    justifyContent: 'space-between' as const,
    gap: variant === 'landscape' ? theme.spacing.md : theme.spacing.sm,
    marginBottom: variant === 'landscape' ? theme.spacing.md : theme.spacing.sm,
  }),
}))
