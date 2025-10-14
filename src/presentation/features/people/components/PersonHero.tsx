import type { FC } from 'react'
import { memo, useState, useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'
import type { Person } from '@/src/domain/entities/Person'
import { t } from '@/src/presentation/shared/i18n'

// Extended metadata type for future enrichments
type PersonMetadata = Person & {
  birthdate?: string
  deathdate?: string
  birthplace?: string
  biography?: string
  homepage?: string
}

interface PersonHeroProps {
  readonly person: Person
  readonly metadata?: PersonMetadata | null
  readonly height?: number
}

/**
 * Redesigned person hero with gradient overlay
 * Features:
 * - Full-screen profile image background
 * - Strong gradient overlay for readability (similar to media hero)
 * - Biography displayed prominently with expand/collapse
 * - Personal information (birthdate, birthplace) as metadata badges
 * - Center-aligned layout for consistency with media hero
 */
const PersonHeroComponent: FC<PersonHeroProps> = ({
  person,
  metadata,
  height = 600,
}) => {
  const [biographyExpanded, setBiographyExpanded] = useState(false)

  // Get best available profile image
  const profileUrl = person.images.getBestProfile()

  // Toggle biography expansion
  const toggleBiography = useCallback(() => {
    setBiographyExpanded((prev) => !prev)
  }, [])

  // Generate initials for placeholder
  const getInitials = (name: string): string => {
    const words = name.trim().split(/\s+/)
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase()
    }
    return words
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase()
  }

  // Format date for display
  const formatDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  // Calculate age or format life span
  const getAgeOrLifespan = (): string | null => {
    if (!metadata?.birthdate) return null

    const birthYear = new Date(metadata.birthdate).getFullYear()
    
    if (metadata.deathdate) {
      const deathYear = new Date(metadata.deathdate).getFullYear()
      return `${birthYear} - ${deathYear}`
    }

    const currentYear = new Date().getFullYear()
    const age = currentYear - birthYear
    return `${age} years old`
  }

  const lifespan = getAgeOrLifespan()

  return (
    <View style={[styles.container, { height }]}>
      {/* Profile Image or Placeholder */}
      {profileUrl ? (
        <Image
          source={{ uri: profileUrl }}
          style={styles.image}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={200}
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.initials}>{getInitials(person.name)}</Text>
        </View>
      )}

      {/* Strong gradient overlay for readability (similar to media hero) */}
      <LinearGradient
        colors={[
          'transparent',
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.6)',
          'rgba(0,0,0,0.85)',
          'rgba(0,0,0,0.98)',
        ]}
        locations={[0, 0.2, 0.5, 0.75, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.bottomGradient}
        pointerEvents="none"
      />

      {/* Top gradient for additional readability */}
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'transparent']}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.topGradient}
        pointerEvents="none"
      />

      {/* Content - Center-aligned at bottom */}
      <View style={styles.content}>
        {/* Person Name */}
        <Text style={styles.name} numberOfLines={2}>
          {person.name}
        </Text>

        {/* Known For Department */}
        {person.knownForDepartment && (
          <Text style={styles.department}>{person.knownForDepartment}</Text>
        )}

        {/* Metadata Row: Birthdate, Age/Lifespan, Birthplace */}
        {metadata && (metadata.birthdate || metadata.birthplace) && (
          <View style={styles.metadataRow}>
            {metadata.birthdate && (
              <>
                <Text style={styles.metadataText}>{formatDate(metadata.birthdate)}</Text>
                {(lifespan || metadata.birthplace) && <Text style={styles.separator}>•</Text>}
              </>
            )}
            {lifespan && (
              <>
                <Text style={styles.metadataText}>{lifespan}</Text>
                {metadata.birthplace && <Text style={styles.separator}>•</Text>}
              </>
            )}
            {metadata.birthplace && (
              <Text style={styles.metadataText} numberOfLines={1}>
                {metadata.birthplace}
              </Text>
            )}
          </View>
        )}

        {/* Biography - Expandable */}
        {metadata?.biography && (
          <View style={styles.biographyContainer}>
            <Text
              style={styles.biography}
              numberOfLines={biographyExpanded ? undefined : 3}
            >
              {metadata.biography}
            </Text>
            {metadata.biography.length > 200 && (
              <Pressable
                onPress={toggleBiography}
                accessibilityRole="button"
                accessibilityLabel={biographyExpanded ? t('common.close') : t('media_detail.see_all')}
                style={({ pressed }) => [
                  styles.expandButton,
                  pressed && styles.expandButtonPressed,
                ]}
              >
                <Text style={styles.expandButtonText}>
                  {biographyExpanded ? t('common.show_less').toUpperCase() : t('media_detail.see_all').toUpperCase()}
                </Text>
                <Ionicons
                  name={biographyExpanded ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color="#FFFFFF"
                />
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  )
}

export const PersonHero = memo(PersonHeroComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: theme.colors.background,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: theme.fontSize['5xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  // Bottom gradient covering 70% height
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  // Top gradient covering 30% height
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  // Content container - bottom-aligned, center-aligned horizontally
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['3xl'],
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  name: {
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    maxWidth: '90%',
  },
  department: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  metadataText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  separator: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    marginHorizontal: 4,
  },
  biographyContainer: {
    gap: theme.spacing.xs,
    alignItems: 'center',
    maxWidth: '90%',
  },
  biography: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.regular,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  expandButtonPressed: {
    opacity: 0.7,
  },
  expandButtonText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: '#FFFFFF',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
}))
