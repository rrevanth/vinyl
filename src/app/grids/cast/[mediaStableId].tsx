import type { Person } from '@/src/domain/entities/Person'
import type { PersonDetailData } from '@/src/domain/use-cases/people/GetPersonDetailUseCase'
import { t } from '@/src/presentation/shared/i18n'
import { CastGrid } from '@/src/presentation/shared/ui/organisms/CastGrid'
import { useQueryClient } from '@tanstack/react-query'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useCallback, useMemo } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { LinearGradient } from 'expo-linear-gradient'

interface CastMember {
  readonly person: Person
  readonly character?: string
}

interface CachedCastData {
  readonly castMembers: CastMember[]
  readonly mediaTitle?: string
}

export default function CastGridScreen() {
  const params = useLocalSearchParams<{ mediaStableId: string }>()
  const queryClient = useQueryClient()

  // Decode mediaStableId
  const mediaStableId = decodeURIComponent(params.mediaStableId)

  // Get cached cast data
  const cachedData = useMemo(() => {
    return queryClient.getQueryData<CachedCastData>(['cast-grid', mediaStableId])
  }, [queryClient, mediaStableId])

  const castMembers = useMemo(() => cachedData?.castMembers || [], [cachedData])
  const mediaTitle = cachedData?.mediaTitle

  const headerTitle = useMemo(() => {
    if (mediaTitle) {
      return `${mediaTitle} - ${t('media_detail.cast')}`
    }
    return t('media_detail.cast')
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

  // Transform to CastGrid format
  const gridItems = useMemo(() => {
    if (!castMembers) return []
    return castMembers.map((member) => ({
      person: member.person,
      character: member.character,
    }))
  }, [castMembers])

  // Handle person press
  const handlePressPerson = useCallback(
    (person: Person) => {
      // Pre-populate cache
      queryClient.setQueryData<PersonDetailData>(['person-detail', person.stableId], {
        person,
        externalIds: person.externalIds,
        enrichments: {
          metadata: null,
          filmography: null,
          images: null,
        },
        providersUsed: {
          metadata: [],
          filmography: [],
          images: [],
        },
        errors: {},
      })

      // Navigate to person detail
      const encodedStableId = encodeURIComponent(person.stableId)
      router.push(`/person/${encodedStableId}` as any)
    },
    [queryClient]
  )

  if (castMembers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Stack.Screen options={headerOptions} />
        <Text style={styles.emptyText}>{t('media_detail.no_cast')}</Text>
      </View>
    )
  }

  return (
    <>
      <Stack.Screen options={headerOptions} />
      <CastGrid items={gridItems} onPressPerson={handlePressPerson} />
    </>
  )
}

const styles = StyleSheet.create((theme) => ({
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
