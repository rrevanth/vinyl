import type { FC } from 'react'
import { memo, useMemo } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { LegendList } from '@legendapp/list'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { Person } from '@/src/domain/entities/Person'
import { t } from '@/src/presentation/shared/i18n'
import { CastCard } from '../atoms/CastCard'

interface CastSectionProps {
  readonly catalogs: Catalog[]
  readonly onPressPerson?: (person: Person) => void
}

interface CastMember {
  readonly catalogItemId: string
  readonly person: Person
  readonly character?: string
}

const CastSectionComponent: FC<CastSectionProps> = ({ catalogs, onPressPerson }) => {
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

    // Limit to top 10 cast members
    return members.slice(0, 10)
  }, [catalogs])

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
        <Text style={styles.title}>{t('media_detail.cast')}</Text>
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
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
  },
}))