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

  if (streams.length === 0) {
    return (
      <EmptyState
        icon="film-outline"
        title={t.streams.no_streams}
        message="Try selecting a different provider or check back later."
      />
    )
  }

  return (
    <LegendList
      data={streams}
      keyExtractor={(item: Stream) => item.id || `stream-${Math.random()}`}
      renderItem={({ item }: { item: Stream }) => (
        <StreamCard
          stream={item}
          media={media}
          seasonNumber={seasonNumber}
          episodeNumber={episodeNumber}
        />
      )}
      estimatedItemSize={120}
      contentContainerStyle={styles.listContent}
    />
  )
})

const styles = StyleSheet.create((theme) => ({
  listContent: {
    paddingVertical: theme.spacing.sm,
  },
}))
