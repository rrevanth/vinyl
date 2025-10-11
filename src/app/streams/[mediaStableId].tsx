import React, { useMemo } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { useQueryClient } from '@tanstack/react-query'
import type { Media } from '@/src/domain/entities/Media'
import { useMediaStreams } from '@/src/presentation/features/streams/hooks/useMediaStreams'
import { StreamList } from '@/src/presentation/features/streams/components/StreamList'
import { ProviderFilterChips } from '@/src/presentation/features/streams/components/ProviderFilterChips'
import { streamUI$ } from '@/src/presentation/features/streams/stores/streamUI.store'
import { useTranslations } from '@/src/presentation/shared/i18n'
import { LoadingSpinner, ErrorMessage } from '@/src/presentation/shared/ui'

export default observer(function StreamScreen() {
  const { theme } = useUnistyles()
  const t = useTranslations()
  const params = useLocalSearchParams<{
    mediaStableId: string
    season?: string
    episode?: string
  }>()
  const queryClient = useQueryClient()

  // Header configuration matching media detail pattern
  const headerOptions = useMemo(
    () => ({
      headerShown: true,
      headerTransparent: true,
      headerBackButtonDisplayMode: 'minimal' as const,
      headerTitle: '',
      headerTintColor: theme.colors.text,
      headerBackTitle: '',
    }),
    [theme.colors.text]
  )

  // Decode stableId and parse optional params
  const stableId = decodeURIComponent(params.mediaStableId)
  const seasonNumber = params.season ? parseInt(params.season, 10) : undefined
  const episodeNumber = params.episode ? parseInt(params.episode, 10) : undefined

  // Get media from cache
  const media = queryClient.getQueryData<Media>(['media-detail', stableId])

  // Fetch streams
  const { streams, providers, isLoading } = useMediaStreams(media!, seasonNumber, episodeNumber)

  // Get selected provider outside of useMemo to avoid complex dependency
  const selectedProvider = streamUI$.selectedProvider.get()

  // Filter streams by selected provider
  const filteredStreams = useMemo(() => {
    if (selectedProvider === 'all') return streams
    return streams.filter((stream) => stream.provider === selectedProvider)
  }, [streams, selectedProvider])

  // Error state: No media in cache
  if (!media) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={headerOptions} />
        <ErrorMessage
          title={t.streams.error_no_media}
          message="Please go back and try again."
          fullScreen
        />
      </View>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={headerOptions} />
        <LoadingSpinner message={t.streams.loading} fullScreen />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={headerOptions} />

      {/* Media Info Header */}
      <View style={styles.mediaHeader}>
        <Text style={styles.mediaTitle} numberOfLines={2}>
          {media.title}
        </Text>
        {seasonNumber !== undefined && episodeNumber !== undefined && (
          <Text style={styles.episodeInfo}>
            Season {seasonNumber} · Episode {episodeNumber}
          </Text>
        )}
      </View>

      {/* Provider Filter */}
      <ProviderFilterChips providers={providers} />

      {/* Stream List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <StreamList streams={filteredStreams} />
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  mediaHeader: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: 80, // Account for transparent header
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  mediaTitle: {
    fontSize: theme.fontSize.xl * 1.2,
    fontWeight: '700' as const,
    color: theme.colors.text,
  },
  episodeInfo: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    fontWeight: '500' as const,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
}))
