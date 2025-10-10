import React from 'react'
import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { LegendList } from '@legendapp/list'
import type { Stream } from '@/src/domain/entities/Stream'
import { StreamCard } from './StreamCard'
import { useTranslations } from '@/src/presentation/shared/i18n'

interface StreamListProps {
  streams: Stream[]
}

export const StreamList: React.FC<StreamListProps> = observer(({ streams }) => {
  const t = useTranslations()

  if (streams.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{t.streams.no_streams}</Text>
      </View>
    )
  }

  return (
    <LegendList
      data={streams}
      keyExtractor={(item: Stream) => item.id}
      renderItem={({ item }: { item: Stream }) => (
        <StreamCard stream={item} />
      )}
      estimatedItemSize={120}
      contentContainerStyle={styles.listContent}
    />
  )
})

const styles = StyleSheet.create((theme) => ({
  listContent: {
    paddingVertical: theme.spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: theme.spacing.xl,
  },
  emptyText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center' as const,
  },
}))
