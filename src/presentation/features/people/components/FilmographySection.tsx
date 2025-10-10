import type { FC } from 'react'
import { memo, useMemo } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { LegendList } from '@legendapp/list'
import { observer } from '@legendapp/state/react'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { Media } from '@/src/domain/entities/Media'
import { t } from '@/src/presentation/shared/i18n'
import { personUI$ } from '../stores/personUI.store'

interface FilmographySectionProps {
  readonly filmography: Catalog[]
  readonly onPressMedia?: (media: Media) => void
}

interface FilmographyItem {
  readonly key: string
  readonly media: Media
  readonly role?: string
  readonly order?: number
}

/**
 * Filmography section displaying person's cast and crew work
 * Includes tab filtering for All, Movies, TV
 * Uses horizontal scrolling card layout
 *
 * Note: filmography is an array of Catalog entities containing media items
 */
const FilmographySectionComponent: FC<FilmographySectionProps> = observer(({ filmography, onPressMedia }) => {
  const selectedTab = personUI$.selectedFilmographyTab.get()

  // Extract media items from catalogs and filter based on selected tab
  const items = useMemo<FilmographyItem[]>(() => {
    const mediaItems: FilmographyItem[] = []

    for (const catalog of filmography) {
      for (const item of catalog.items) {
        if (item.media) {
          // Use role field if available (character for cast, job for crew)
          const role = item.role

          // Create robust unique key with index for guaranteed uniqueness
          const key = [
            catalog.stableId,
            item.media.stableId,
            item.order?.toString() ?? '',
            item.stableId ?? '',
            mediaItems.length.toString(), // Add unique index to prevent collisions
          ]
            .filter(Boolean)
            .join(':') || `filmography-${mediaItems.length}`

          mediaItems.push({
            key,
            media: item.media,
            role,
            order: item.order,
          })
        }
      }
    }

    // Filter by type
    const filtered = mediaItems.filter((item) => {
      if (selectedTab === 'movies') {
        return item.media.isMovie()
      }
      if (selectedTab === 'tv') {
        return item.media.isSeries()
      }
      return true // 'all'
    })

    // Sort by year (newest first)
    return filtered.sort((a, b) => {
      const yearA = a.media.year || 0
      const yearB = b.media.year || 0
      return yearB - yearA
    })
  }, [filmography, selectedTab])

  // Hide section if no items
  if (items.length === 0) {
    return null
  }

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('person_detail.known_for')}</Text>

        {/* Tab selector */}
        <View style={styles.tabs}>
          <Pressable
            style={({ pressed }) => [
              styles.tab,
              selectedTab === 'all' && styles.tabActive,
              pressed && styles.tabPressed,
            ]}
            onPress={() => personUI$.selectedFilmographyTab.set('all')}
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
            onPress={() => personUI$.selectedFilmographyTab.set('movies')}
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
            onPress={() => personUI$.selectedFilmographyTab.set('tv')}
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

      <LegendList
        horizontal
        data={items}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const poster = item.media.images.getBestPoster()
          const year = item.media.year

          return (
            <Pressable
              accessibilityRole={onPressMedia ? 'button' : 'image'}
              accessibilityLabel={item.media.getDisplayName()}
              onPress={() => onPressMedia?.(item.media)}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
              {poster ? (
                <Image
                  source={{ uri: poster }}
                  style={styles.image}
                  resizeMode="cover"
                  accessible
                  accessibilityLabel={item.media.getDisplayName()}
                />
              ) : (
                <View style={styles.placeholder}>
                  <Text style={styles.placeholderText} numberOfLines={2}>
                    {t('home.missing_artwork')}
                  </Text>
                </View>
              )}

              <View style={styles.captionContainer}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {item.media.title}
                </Text>
                {year && <Text style={styles.cardSubtitle}>{year}</Text>}
                {item.role && (
                  <Text style={styles.cardRole} numberOfLines={1}>
                    {item.role}
                  </Text>
                )}
              </View>
            </Pressable>
          )
        }}
      />
    </View>
  )
})

export const FilmographySection = memo(FilmographySectionComponent)

const styles = StyleSheet.create((theme) => ({
  section: {
    marginBottom: theme.spacing.xl,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.md,
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
  listContent: {
    paddingHorizontal: theme.spacing.lg,
  },
  card: {
    width: 120,
    marginRight: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    aspectRatio: 2 / 3,
    backgroundColor: theme.colors.surfaceElevated,
  },
  placeholder: {
    width: '100%',
    aspectRatio: 2 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surfaceElevated,
  },
  placeholderText: {
    textAlign: 'center',
    color: theme.colors.textTertiary,
    fontSize: theme.fontSize.xs,
  },
  captionContainer: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  cardTitle: {
    color: theme.colors.text,
    fontFamily: theme.fontFamily.primary,
    fontWeight: theme.fontWeight.medium,
    fontSize: theme.fontSize.sm,
  },
  cardSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
  },
  cardRole: {
    color: theme.colors.textTertiary,
    fontSize: theme.fontSize.xs,
    fontStyle: 'italic',
  },
}))
