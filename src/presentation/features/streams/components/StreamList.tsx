import React from 'react'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { LegendList } from '@legendapp/list'
import type { Stream } from '@/src/domain/entities/Stream'
import type { Media } from '@/src/domain/entities/Media'
import { StreamCard } from './StreamCard'
import { useTranslations } from '@/src/presentation/shared/i18n'
import { EmptyState } from '@/src/presentation/shared/ui'

interface StreamListProps {
  streams: Stream[]
  media: Media
  seasonNumber?: number
  episodeNumber?: number
}

export const StreamList: React.FC<StreamListProps> = observer(({ streams, media, seasonNumber, episodeNumber }) => {
  const t = useTranslations()

  // Safety check: ensure media is provided
  if (!media) {
    console.error('[StreamList] Media prop is missing!')
    return (
      <EmptyState
        icon="alert-circle-outline"
        title="Error"
        message="Media information is missing. Please go back and try again."
      />
    )
  }

  if (!streams || streams.length === 0) {
    return (
      <EmptyState
        icon="film-outline"
        title={t.streams.no_streams}
        message="Try selecting a different provider or check back later."
      />
    )
  }

  // Removed excessive logging for performance

  return (
    <LegendList
      data={streams}
      keyExtractor={(item: Stream) => item.id || `stream-${item.url}`}
      renderItem={({ item }: { item: Stream }) => (
        <StreamCard
          stream={item}
          media={media}
          seasonNumber={seasonNumber}
          episodeNumber={episodeNumber}
        />
      )}
      estimatedItemSize={120}
      initialContainerPoolRatio={3}
      drawDistance={500}
      contentContainerStyle={styles.listContent}
      maintainVisibleContentPosition
      recycleItems
    />
  )
})

const styles = StyleSheet.create((theme) => ({
  listContent: {
    paddingVertical: theme.spacing.sm,
  },
}))
