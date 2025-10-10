import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native-unistyles'
import { useQueryClient } from '@tanstack/react-query'
import type { Media } from '@/src/domain/entities/Media'
import type { Stream } from '@/src/domain/entities/Stream'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { GetVideoPlayerUseCase } from '@/src/domain/use-cases/player/GetVideoPlayerUseCase'
import { VideoPlayerType } from '@/src/domain/entities/VideoPlayerType'
import { ExpoVideoPlayer } from '@/src/presentation/features/player/components/ExpoVideoPlayer'
import { RNVlcPlayer } from '@/src/presentation/features/player/components/RNVlcPlayer'
import { resetPlayerState, player$ } from '@/src/presentation/features/player/stores/player.store'

export default function PlayerScreen() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useLocalSearchParams<{
    streamId: string
    streamData: string
    mediaStableId: string
    season?: string
    episode?: string
  }>()

  const getVideoPlayerUseCase = useService<GetVideoPlayerUseCase>(TOKENS.GetVideoPlayerUseCase)

  // Parse stream from params
  const stream: Stream = useMemo(() => {
    const parsed = JSON.parse(params.streamData)
    console.log('[PlayerScreen] Stream details:', {
      id: parsed.id,
      url: parsed.url,
      source: parsed.source,
      quality: parsed.quality,
      provider: parsed.provider,
      hasHeaders: !!parsed.headers,
      isTorrent: parsed.source === 'torrent' || !!parsed.infoHash,
    })

    if (parsed.source === 'torrent' || parsed.infoHash) {
      console.warn('[PlayerScreen] ⚠️ Torrent stream detected - expo-av cannot play torrent/magnet links')
    }

    return parsed
  }, [params.streamData])

  // Get media from cache (should be available from useMediaStreams)
  const media = queryClient.getQueryData<Media>(['media-detail', params.mediaStableId])

  console.log('[PlayerScreen] Media from cache:', {
    cacheKey: params.mediaStableId,
    mediaFound: !!media,
    mediaStableId: media?.stableId,
    mediaTitle: media?.title,
  })

  // Parse season/episode if present
  const seasonNumber = params.season ? parseInt(params.season, 10) : undefined
  const episodeNumber = params.episode ? parseInt(params.episode, 10) : undefined

  // Determine which player to use
  const playerType = useMemo(() => {
    const player = getVideoPlayerUseCase.execute()
    console.log('[PlayerScreen] Selected player:', player)
    return player
  }, [getVideoPlayerUseCase])

  // Store stream and media in player store for UI state management
  useEffect(() => {
    if (stream && media) {
      player$.currentStream.set(stream)
      player$.currentMedia.set(media)
      console.log('[PlayerScreen] Stored in player store:', {
        stream: stream.id,
        media: media.stableId,
      })
    }
  }, [stream, media])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      resetPlayerState()
    }
  }, [])

  // Handle close
  const handleClose = () => {
    router.back()
  }

  if (!media || !stream) {
    return null // Could add error screen
  }

  // Render appropriate player based on user preference
  const renderPlayer = () => {
    if (playerType === VideoPlayerType.EXPO_VIDEO) {
      return (
        <ExpoVideoPlayer
          stream={stream}
          media={media}
          seasonNumber={seasonNumber}
          episodeNumber={episodeNumber}
          onClose={handleClose}
        />
      )
    }

    if (playerType === VideoPlayerType.RN_VLC) {
      return (
        <RNVlcPlayer
          stream={stream}
          media={media}
          seasonNumber={seasonNumber}
          episodeNumber={episodeNumber}
          onClose={handleClose}
        />
      )
    }

    // Unsupported player type fallback
    console.error('[PlayerScreen] Unsupported player type:', playerType)
    return null
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar hidden />

      {renderPlayer()}
    </View>
  )
}

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
}))
