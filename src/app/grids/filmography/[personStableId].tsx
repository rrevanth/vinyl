import { useCallback, useMemo, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Stack, useLocalSearchParams, router } from 'expo-router'
import { StyleSheet } from 'react-native-unistyles'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { Media } from '@/src/domain/entities/Media'
import { MediaGrid } from '@/src/presentation/shared/ui/organisms/MediaGrid'
import { t } from '@/src/presentation/shared/i18n'
import { 
  deserializeFilmographyData,
  serializeMediaForNav 
} from '@/src/presentation/shared/utils/navigationParams'
import { createMediaFromNavParams } from '@/src/presentation/shared/utils/createMediaFromNavParams'

type FilmographyTab = 'all' | 'movies' | 'tv'

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

export default function FilmographyGridScreen() {
  const params = useLocalSearchParams<{ 
    personStableId: string
    name: string
    filmographyData: string 
  }>()
  const [selectedTab, setSelectedTab] = useState<FilmographyTab>('all')
  const insets = useSafeAreaInsets()

  // Decode personStableId
  const personStableId = decodeURIComponent(params.personStableId)
  const personName = params.name ? decodeURIComponent(params.name) : ''

  // Get consistent variant for this filmography grid
  const variant = useMemo(() => getRandomGridVariant(personStableId), [personStableId])

  // Deserialize filmography data and create Media entities
  const filmography = useMemo(() => {
    if (!params.filmographyData) return []
    
    try {
      const filmographyItems = deserializeFilmographyData(params.filmographyData)
      return filmographyItems.map(item => ({
        media: createMediaFromNavParams(item.media),
        role: item.role
      }))
    } catch (error) {
      console.error('[FilmographyGrid] Failed to deserialize filmography data:', error)
      return []
    }
  }, [params.filmographyData])

  const headerOptions = useMemo(
    () => ({
      headerShown: true,
      headerTransparent: true,
      headerBackButtonDisplayMode: 'minimal' as const,
      headerTitle: personName || t('person_detail.filmography'),
      headerTintColor: '#FFFFFF',
      headerBackTitle: '',
      headerBackground: () => (
        <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']} style={{ flex: 1 }} />
      ),
    }),
    [personName]
  )

  // Filter items based on selected tab
  const filteredItems = useMemo(() => {
    if (!filmography) return []

    const filtered = filmography.filter((item) => {
      if (selectedTab === 'movies') {
        return item.media.isMovie()
      }
      if (selectedTab === 'tv') {
        return item.media.isSeries()
      }
      return true // 'all'
    })

    // Sort by year (newest first)
    return filtered
      .map((item) => item.media)
      .sort((a, b) => {
        const yearA = a.year || 0
        const yearB = b.year || 0
        return yearB - yearA
      })
  }, [filmography, selectedTab])

  // Handle media press
  const handlePressMedia = useCallback(
    (media: Media) => {
      // Navigate with serialized media data
      router.push({
        pathname: '/media/[stableId]',
        params: {
          stableId: media.stableId,
          mediaData: serializeMediaForNav(media)
        }
      } as any)
    },
    []
  )

  if (filmography.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Stack.Screen options={headerOptions} />
        <Text style={styles.emptyText}>{t('person_detail.no_filmography')}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={headerOptions} />

      {/* Tab selector - positioned below header with safe area */}
      <View style={[styles.tabsContainer, { paddingTop: insets.top + 60 }]}>
        <View style={styles.tabs}>
          <Pressable
            style={({ pressed }) => [
              styles.tab,
              selectedTab === 'all' && styles.tabActive,
              pressed && styles.tabPressed,
            ]}
            onPress={() => setSelectedTab('all')}
            accessibilityRole="button"
            accessibilityLabel={t('person_detail.all')}
            accessibilityState={{ selected: selectedTab === 'all' }}
          >
            <Text style={[styles.tabText, selectedTab === 'all' && styles.tabTextActive]}>
              {t('person_detail.all')}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.tab,
              selectedTab === 'movies' && styles.tabActive,
              pressed && styles.tabPressed,
            ]}
            onPress={() => setSelectedTab('movies')}
            accessibilityRole="button"
            accessibilityLabel={t('person_detail.movies')}
            accessibilityState={{ selected: selectedTab === 'movies' }}
          >
            <Text style={[styles.tabText, selectedTab === 'movies' && styles.tabTextActive]}>
              {t('person_detail.movies')}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.tab,
              selectedTab === 'tv' && styles.tabActive,
              pressed && styles.tabPressed,
            ]}
            onPress={() => setSelectedTab('tv')}
            accessibilityRole="button"
            accessibilityLabel={t('person_detail.tv')}
            accessibilityState={{ selected: selectedTab === 'tv' }}
          >
            <Text style={[styles.tabText, selectedTab === 'tv' && styles.tabTextActive]}>
              {t('person_detail.tv')}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Grid using MediaGrid component (matches catalog grid) */}
      <MediaGrid
        items={filteredItems}
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
  tabsContainer: {
    paddingHorizontal: theme.spacing.gutter,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  tabs: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  tab: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
  },
  tabActive: {
    backgroundColor: theme.colors.primary,
  },
  tabPressed: {
    opacity: 0.8,
  },
  tabText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },
  tabTextActive: {
    color: theme.colors.background,
  },
}))
