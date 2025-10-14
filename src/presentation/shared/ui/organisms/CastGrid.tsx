import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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
  columns,
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
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <LegendList
        testID={testID}
        data={items}
        keyExtractor={keyExtractor}
        numColumns={columns || 3}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.row}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

export const CastGrid = memo(CastGridComponent)

const styles = StyleSheet.create((theme, rt) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  gridContent: {
    paddingHorizontal: theme.spacing.gutter,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing['2xl'],
    gap: theme.spacing.md, // Vertical spacing between rows
  },
  row: {
    justifyContent: 'flex-start',
    gap: theme.spacing.md, // Horizontal spacing between items
  },
  cardWrapper: {
    alignItems: 'center',
  },
}))
