import type { Catalog } from '@/src/domain/entities/Catalog'
import type { Person } from '@/src/domain/entities/Person'
import { t } from '@/src/presentation/shared/i18n'
import { Ionicons } from '@expo/vector-icons'
import { LegendList } from '@legendapp/list'
import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import type { FC } from 'react'
import { memo, useCallback, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { CastCard } from '../atoms/CastCard'

interface CastSectionProps {
  readonly mediaStableId: string
  readonly catalogs: Catalog[]
  readonly onPressPerson?: (person: Person) => void
}

interface CastMember {
  readonly catalogItemId: string
  readonly person: Person
  readonly character?: string
}

const CastSectionComponent: FC<CastSectionProps> = ({
  mediaStableId,
  catalogs,
  onPressPerson,
}) => {
  const queryClient = useQueryClient()

  // Extract Person entities from catalog items and character information
  const castMembers = useMemo<CastMember[]>(() => {
    const members: CastMember[] = []

    for (const catalog of catalogs) {
      for (const item of catalog.items) {
        if (item.person) {
          // Use role field which contains character name for cast
          const character = item.role

          // Create robust unique key combining multiple identifiers
          const catalogItemId = [
            catalog.stableId,
            item.person.stableId,
            item.order?.toString() ?? '',
            item.stableId ?? '',
          ]
            .filter(Boolean)
            .join(':') || `cast-${members.length}`

          members.push({
            catalogItemId,
            person: item.person,
            character,
          })
        }
      }
    }

    // Limit to top 10 cast members for horizontal row
    return members.slice(0, 10)
  }, [catalogs])

  // All cast members for grid view (no limit)
  const allCastMembers = useMemo<{ person: Person; character?: string }[]>(() => {
    const members: { person: Person; character?: string }[] = []

    for (const catalog of catalogs) {
      for (const item of catalog.items) {
        if (item.person) {
          members.push({
            person: item.person,
            character: item.role,
          })
        }
      }
    }

    return members
  }, [catalogs])

  // Get media title from first catalog's context
  const mediaTitle = useMemo(() => {
    return catalogs[0]?.contextMedia?.title || ''
  }, [catalogs])

  // Handle title press - navigate to cast grid view
  const handlePressTitle = useCallback(() => {
    console.log('[CastSection] Title pressed, navigating to cast grid view')

    try {
      // Pre-populate cache with all cast members and media title
      queryClient.setQueryData(['cast-grid', mediaStableId], {
        castMembers: allCastMembers,
        mediaTitle,
      })

      // Navigate to cast grid view
      const encodedMediaStableId = encodeURIComponent(mediaStableId)
      router.push(`/grids/cast/${encodedMediaStableId}` as any)
    } catch (error) {
      console.error('[CastSection] Failed to navigate to cast grid view:', error)
    }
  }, [mediaStableId, allCastMembers, mediaTitle, queryClient])

  // Hide section if no cast members
  if (castMembers.length === 0) {
    return null
  }

  // Debug: Log cast member keys
  console.log('[CastSection] Cast member keys:', {
    catalogCount: catalogs.length,
    memberCount: castMembers.length,
    keys: castMembers.map(m => m.catalogItemId),
  })

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.titlePressable, pressed && styles.titlePressed]}
          onPress={handlePressTitle}
          accessibilityRole="button"
          accessibilityLabel={t('media_detail.see_all_cast')}
        >
          <Text style={styles.title}>{t('media_detail.cast')}</Text>
          <Ionicons name="chevron-forward" size={20} style={styles.chevronIcon} />
        </Pressable>
      </View>

      <LegendList
        horizontal
        data={castMembers}
        keyExtractor={(member) => member.catalogItemId}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CastCard
            person={item.person}
            character={item.character}
            onPress={onPressPerson ? () => onPressPerson(item.person) : undefined}
            testID={`cast-${item.catalogItemId}`}
          />
        )}
      />
    </View>
  )
}

export const CastSection = memo(CastSectionComponent)

const styles = StyleSheet.create((theme) => ({
  section: {
    marginBottom: theme.spacing.xl,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  titlePressable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    alignSelf: 'flex-start',
  },
  titlePressed: {
    opacity: 0.7,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize['2xl'],
    margin: theme.spacing.xs,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  chevronIcon: {
    color: theme.colors.textSecondary,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
  },
}))