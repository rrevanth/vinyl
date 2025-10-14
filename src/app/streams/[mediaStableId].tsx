import React, { useMemo } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { useMediaStreams } from '@/src/presentation/features/streams/hooks/useMediaStreams'
import { StreamList } from '@/src/presentation/features/streams/components/StreamList'
import { ProviderFilterChips } from '@/src/presentation/features/streams/components/ProviderFilterChips'
import { streamUI$ } from '@/src/presentation/features/streams/stores/streamUI.store'
import { useTranslations } from '@/src/presentation/shared/i18n'
import { LoadingSpinner } from '@/src/presentation/shared/ui'
import { LinearGradient } from 'expo-linear-gradient'
import { deserializeMediaFromNav } from '@/src/presentation/shared/utils/navigationParams'
import { createMediaFromNavParams } from '@/src/presentation/shared/utils/createMediaFromNavParams'

export default observer(function StreamScreen() {
  const t = useTranslations()
  const params = useLocalSearchParams<{
    mediaStableId: string
    mediaData: string
    season?: string
    episode?: string
  }>()

  // Header configuration matching media detail pattern
  const headerOptions = useMemo(
    () => ({
      headerShown: true,
      headerTransparent: true,
      headerBackButtonDisplayMode: 'minimal' as const,
      headerTitle: '',
      headerTintColor: '#FFFFFF',
      headerBackTitle: '',
      headerBackground: () => (
        <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']} style={{ flex: 1 }} />
      ),
    }),
    []
  )

  // Parse Media from params and decode optional params
  const navParams = useMemo(() => deserializeMediaFromNav(params.mediaData), [params.mediaData])

  const media = useMemo(() => createMediaFromNavParams(navParams), [navParams])

  const seasonNumber = params.season ? parseInt(params.season, 10) : undefined
  const episodeNumber = params.episode ? parseInt(params.episode, 10) : undefined

  // Fetch streams (Media is guaranteed from params)
  const {
    streams: streams$,
    providers: providers$,
    isLoading: isLoading$,
  } = useMediaStreams(media, seasonNumber, episodeNumber)

  // Get reactive values from observables
  const streams = streams$.get()
  const providers = providers$.get()
  const isLoading = isLoading$.get()

  // Get selected provider
  const selectedProvider = streamUI$.selectedProvider.get()

  // Calculate provider stream counts (memoized for performance)
  const providerCounts = useMemo(() => {
    const counts = new Map<string, number>()
    streams.forEach((stream) => {
      const current = counts.get(stream.provider) || 0
      counts.set(stream.provider, current + 1)
    })
    return counts
  }, [streams])

  // Filter streams by selected provider (memoized for performance)
  const filteredStreams = useMemo(() => {
    if (selectedProvider === 'all') return streams
    return streams.filter((stream) => stream.provider === selectedProvider)
  }, [streams, selectedProvider])

  // Loading state (Media is always available from params)
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
        <Text style={styles.resourceCount}>
          {selectedProvider === 'all'
            ? `${streams.length} ${streams.length === 1 ? 'Resource' : 'Resources'} Found`
            : `${filteredStreams.length} of ${streams.length} Resources`}
        </Text>
      </View>

      {/* Provider Filter with counts */}
      <ProviderFilterChips
        providers={providers}
        providerCounts={providerCounts}
        totalCount={streams.length}
      />

      {/* Stream List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <StreamList
          streams={filteredStreams}
          media={media}
          seasonNumber={seasonNumber}
          episodeNumber={episodeNumber}
        />
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
  resourceCount: {
    fontSize: theme.fontSize.sm,
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
