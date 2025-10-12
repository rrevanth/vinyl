import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { LegendList } from '@legendapp/list'
import type { Person } from '@/src/domain/entities/Person'
import { CastCard } from '@/src/presentation/features/media/components/atoms/CastCard'

interface CastGridItem {
  readonly person: Person
  readonly character?: string
}

interface CastGridProps {
  readonly items: CastGridItem[]
  readonly columns?: number
  readonly onPressPerson?: (person: Person) => void
  readonly testID?: string
}

const CastGridComponent: FC<CastGridProps> = ({
  items,
  columns = 4,
  onPressPerson,
  testID,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: CastGridItem }) => (
      <View style={styles.cardWrapper}>
        <CastCard
          person={item.person}
          character={item.character}
          onPress={onPressPerson ? () => onPressPerson(item.person) : undefined}
          testID={`cast-grid-${item.person.stableId}`}
        />
      </View>
    ),
    [onPressPerson]
  )

  const keyExtractor = useCallback(
    (item: CastGridItem, index: number) => `${item.person.stableId}-${index}`,
    []
  )

  return (
    <LegendList
      testID={testID}
      data={items}
      keyExtractor={keyExtractor}
      numColumns={columns}
      contentContainerStyle={styles.gridContent}
      columnWrapperStyle={styles.row}
      renderItem={renderItem}
    />
  )
}

export const CastGrid = memo(CastGridComponent)

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
    maxWidth: '23%', // Ensure 4 columns with space between
  },
}))
