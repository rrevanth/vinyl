import React, { useEffect, useMemo } from 'react'
import { View, Linking } from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native-unistyles'
import type { Stream } from '@/src/domain/entities/Stream'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { IPreferencesService } from '@/src/domain/services/IPreferencesService'
import { VideoPlayerType } from '@/src/domain/entities/VideoPlayerType'
import { RNVlcPlayer } from '@/src/presentation/features/player/components/RNVlcPlayer'
import { resetPlayerState, player$ } from '@/src/presentation/features/player/stores/player.store'
import { logger } from '@/src/presentation/shared/utils/logger'
import { deserializeMediaFromNav } from '@/src/presentation/shared/utils/navigationParams'
import { createMediaFromNavParams } from '@/src/presentation/shared/utils/createMediaFromNavParams'

export default function PlayerScreen() {
  const router = useRouter()
  const params = useLocalSearchParams<{
    streamId: string
    streamData: string
    mediaData: string
    season?: string
    episode?: string
    backdrop?: string
    logo?: string
  }>()

  const preferencesService = useService<IPreferencesService>(TOKENS.PreferencesService)

  // Parse stream from params
  const stream: Stream = useMemo(() => {
    const parsed = JSON.parse(params.streamData)
    logger.debug('[PlayerScreen] Stream details', {
      id: parsed.id,
      url: parsed.url,
      source: parsed.source,
      quality: parsed.quality,
      provider: parsed.provider,
      hasHeaders: !!parsed.headers,
      isTorrent: parsed.source === 'torrent' || !!parsed.infoHash,
    })

    if (parsed.source === 'torrent' || parsed.infoHash) {
      logger.warn(
        '[PlayerScreen] Torrent stream detected - expo-av cannot play torrent/magnet links'
      )
    }

    return parsed
  }, [params.streamData])

  // Parse media from optimized navigation params
  const navParams = useMemo(() => deserializeMediaFromNav(params.mediaData), [params.mediaData])

  const media = useMemo(() => createMediaFromNavParams(navParams), [navParams])

  logger.debug('[PlayerScreen] Media from params', {
    mediaStableId: media.stableId,
    mediaTitle: media.title,
  })

  // Parse season/episode if present
  const seasonNumber = params.season ? parseInt(params.season, 10) : undefined
  const episodeNumber = params.episode ? parseInt(params.episode, 10) : undefined

  // Check if user wants external player and handle it
  useEffect(() => {
    const handleExternalPlayer = async () => {
      const playerType = preferencesService.getVideoPlayerPreference()

      if (playerType === VideoPlayerType.EXTERNAL) {
        logger.info('[PlayerScreen] Opening stream in external player', { url: stream.url })
        try {
          const canOpen = await Linking.canOpenURL(stream.url)
          if (canOpen) {
            await Linking.openURL(stream.url)
            logger.info('[PlayerScreen] Successfully opened external player')
          } else {
            logger.error(
              '[PlayerScreen] Cannot open URL in external player',
              new Error('URL cannot be opened'),
              { url: stream.url }
            )
          }
          // Close player screen after opening external
          router.back()
        } catch (error) {
          logger.error('[PlayerScreen] Failed to open external player', error as Error)
          // Fallback: stay on screen, user can try again or go back
        }
      }
    }

    if (stream) {
      handleExternalPlayer()
    }
  }, [stream, router, preferencesService])

  // Store stream and media in player store for UI state management
  useEffect(() => {
    if (stream && media) {
      player$.currentStream.set(stream)
      player$.currentMedia.set(media)
      logger.debug('[PlayerScreen] Stored in player store', {
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

  if (!stream) {
    return null // Could add error screen
  }

  // Render VLC player (external player handled in useEffect above)
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar hidden />

      <RNVlcPlayer
        media={media}
        stream={stream}
        seasonNumber={seasonNumber}
        episodeNumber={episodeNumber}
        onClose={handleClose}
      />
    </View>
  )
}

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
}))
