import React, { useMemo } from 'react'
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
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
  const { streams, providers, isLoading } = useMediaStreams(
    media!,
    seasonNumber,
    episodeNumber
  )

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
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{t.streams.error_no_media}</Text>
        </View>
      </View>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={headerOptions} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>{t.streams.loading}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={headerOptions} />
      <ProviderFilterChips providers={providers} />
      <ScrollView style={styles.scrollView}>
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
  scrollView: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  loadingText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center' as const,
  },
  errorText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.error,
    textAlign: 'center' as const,
    fontWeight: '600' as const,
  },
  errorDetails: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center' as const,
  },
}))
