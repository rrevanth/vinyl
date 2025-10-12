import { useCallback, useMemo } from 'react'
import { View, Text } from 'react-native'
import { Stack, useLocalSearchParams, router } from 'expo-router'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import { useQueryClient } from '@tanstack/react-query'
import type { Media } from '@/src/domain/entities/Media'
import type { MediaDetailData } from '@/src/domain/use-cases/media/GetMediaDetailUseCase'
import { MediaGrid } from '@/src/presentation/shared/ui/organisms/MediaGrid'
import { t } from '@/src/presentation/shared/i18n'

interface CachedRecommendationsData {
  readonly recommendations: Media[]
  readonly mediaTitle?: string
}

export default function RecommendationsGridScreen() {
  const params = useLocalSearchParams<{ mediaStableId: string }>()
  const queryClient = useQueryClient()
  const { theme } = useUnistyles()

  // Decode mediaStableId
  const mediaStableId = decodeURIComponent(params.mediaStableId)

  // Get cached recommendations data
  const cachedData = useMemo(() => {
    return queryClient.getQueryData<CachedRecommendationsData>([
      'recommendations-grid',
      mediaStableId,
    ])
  }, [queryClient, mediaStableId])

  const recommendations = cachedData?.recommendations || []
  const mediaTitle = cachedData?.mediaTitle

  const headerTitle = useMemo(() => {
    if (mediaTitle) {
      return `${mediaTitle} - ${t('media_detail.recommendations')}`
    }
    return t('media_detail.recommendations')
  }, [mediaTitle])

  const headerOptions = useMemo(
    () => ({
      headerShown: true,
      headerTransparent: true,
      headerBackButtonDisplayMode: 'minimal' as const,
      headerTitle,
      headerTintColor: theme.colors.text,
      headerBackTitle: '',
    }),
    [headerTitle, theme.colors.text]
  )

  // Handle media press
  const handlePressMedia = useCallback(
    (media: Media) => {
      // Pre-populate cache
      queryClient.setQueryData<MediaDetailData>(['media-detail', media.stableId], {
        media,
        externalIds: media.externalIds,
        providersUsed: {},
        errors: {},
      })

      // Navigate to media detail
      const encodedStableId = encodeURIComponent(media.stableId)
      router.push(`/media/${encodedStableId}` as any)
    },
    [queryClient]
  )

  if (recommendations.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Stack.Screen options={headerOptions} />
        <Text style={styles.emptyText}>{t('media_detail.no_recommendations')}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={headerOptions} />
      <MediaGrid items={recommendations} columns={3} onPressItem={handlePressMedia} />
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.gutter,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
    textAlign: 'center',
  },
}))
