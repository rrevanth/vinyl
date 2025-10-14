import type { Person } from '@/src/domain/entities/Person'
import { t } from '@/src/presentation/shared/i18n'
import { CastGrid } from '@/src/presentation/shared/ui/organisms/CastGrid'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useCallback, useMemo } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { LinearGradient } from 'expo-linear-gradient'
import { 
  deserializeCastData, 
  serializePersonForNav 
} from '@/src/presentation/shared/utils/navigationParams'
import { createPersonFromNavParams } from '@/src/presentation/shared/utils/createPersonFromNavParams'

export default function CastGridScreen() {
  const params = useLocalSearchParams<{ 
    mediaStableId: string
    mediaTitle?: string
    castData: string 
  }>()

  // Decode params
  const mediaTitle = params.mediaTitle ? decodeURIComponent(params.mediaTitle) : ''

  // Deserialize cast data and create Person entities
  const castMembers = useMemo(() => {
    if (!params.castData) return []
    
    try {
      const castItems = deserializeCastData(params.castData)
      return castItems.map(item => ({
        person: createPersonFromNavParams(item.person),
        character: item.character
      }))
    } catch (error) {
      console.error('[CastGrid] Failed to deserialize cast data:', error)
      return []
    }
  }, [params.castData])

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
      // Navigate with serialized person data
      router.push({
        pathname: '/person/[stableId]',
        params: {
          stableId: person.stableId,
          personData: serializePersonForNav(person)
        }
      } as any)
    },
    []
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
