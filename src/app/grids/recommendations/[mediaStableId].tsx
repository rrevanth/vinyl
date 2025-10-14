import { useCallback, useMemo } from 'react'
import { View, Text } from 'react-native'
import { Stack, useLocalSearchParams, router } from 'expo-router'
import { StyleSheet } from 'react-native-unistyles'
import { useQueryClient } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import type { Media } from '@/src/domain/entities/Media'
import type { MediaDetailData } from '@/src/domain/use-cases/media/GetMediaDetailUseCase'
import { MediaGrid } from '@/src/presentation/shared/ui/organisms/MediaGrid'
import { t } from '@/src/presentation/shared/i18n'

interface CachedRecommendationsData {
  readonly recommendations: Media[]
  readonly mediaTitle?: string
}

/**
 * Hash-based function to consistently assign random variant per grid screen.
 * Same screen always gets same variant for consistency across sessions.
 */
const getRandomGridVariant = (seed: string): 'poster' | 'landscape' => {
  const variants = ['poster', 'landscape'] as const
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash = hash & hash
  }
  return variants[Math.abs(hash) % 2]
}

export default function RecommendationsGridScreen() {
  const params = useLocalSearchParams<{ mediaStableId: string }>()
  const queryClient = useQueryClient()

  // Decode mediaStableId
  const mediaStableId = decodeURIComponent(params.mediaStableId)

  // Get consistent variant for this recommendations grid
  const variant = useMemo(() => getRandomGridVariant(mediaStableId), [mediaStableId])

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
      headerTintColor: '#FFFFFF',
      headerBackTitle: '',
      headerBackground: () => (
        <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']} style={{ flex: 1 }} />
      ),
    }),
    [headerTitle]
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
      <MediaGrid
        items={recommendations}
        variant={variant}
        columns={variant === 'landscape' ? 2 : 3}
        onPressItem={handlePressMedia}
      />
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
