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

  console.log('[StreamList] Rendering', {
    streamCount: streams.length,
    mediaStableId: media.stableId,
    hasSeasonNumber: seasonNumber !== undefined,
    hasEpisodeNumber: episodeNumber !== undefined,
  })

  return (
    <LegendList
      data={streams}
      keyExtractor={(item: Stream) => {
        // Ensure we always return a string key
        if (!item) return `stream-null-${Math.random()}`
        return item.id || `stream-${item.url?.substring(0, 20) || Math.random()}`
      }}
      renderItem={({ item }: { item: Stream }) => {
        // Safety check: ensure item exists
        if (!item) {
          console.error('[StreamList] Null item in renderItem')
          return null
        }
        
        return (
          <StreamCard
            stream={item}
            media={media}
            seasonNumber={seasonNumber}
            episodeNumber={episodeNumber}
          />
        )
      }}
      estimatedItemSize={120}
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
