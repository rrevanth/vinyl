import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { LegendList } from '@legendapp/list'
import type { Media } from '@/src/domain/entities/Media'
import { MediaPosterCard } from '@/src/presentation/features/homescreen/components/MediaPosterCard'

interface MediaGridProps {
  readonly items: Media[]
  readonly columns?: number
  readonly onPressItem?: (media: Media) => void
  readonly onEndReached?: () => void
  readonly isLoadingMore?: boolean
  readonly testID?: string
}

const MediaGridComponent: FC<MediaGridProps> = ({
  items,
  columns = 3,
  onPressItem,
  onEndReached,
  isLoadingMore = false,
  testID,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: Media }) => (
      <View style={styles.cardWrapper}>
        <MediaPosterCard
          media={item}
          size="standard"
          onPress={onPressItem ? () => onPressItem(item) : undefined}
          testID={`grid-${item.stableId}`}
        />
      </View>
    ),
    [onPressItem]
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
      columnWrapperStyle={styles.row}
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
  row: {
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  cardWrapper: {
    flex: 1,
    maxWidth: '31%', // Ensure 3 columns with space between
  },
  loadingFooter: {
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  },
}))
