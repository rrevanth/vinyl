import type { FC } from 'react'
import { memo, useState, useCallback } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'
import type { Person } from '@/src/domain/entities/Person'
import { t } from '@/src/presentation/shared/i18n'

// Extended metadata type for future enrichments
type PersonMetadata = Person & {
  birthdate?: string
  birthplace?: string
  biography?: string
}

interface PersonHeroProps {
  readonly person: Person
  readonly metadata?: PersonMetadata | null
  readonly height?: number
}

/**
 * Dramatic full-screen hero for person detail pages
 * Features:
 * - Profile image background with fallback to initials
 * - Simple gradient overlays for text readability
 * - Center-aligned content with person name, department, personal info
 * - Expandable biography snippet (2 lines → full text)
 * - Professional typography with strong text shadows
 */
const PersonHeroComponent: FC<PersonHeroProps> = ({
  person,
  metadata,
  height = 500,
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

  return (
    <View style={[styles.container, { height }]}>
      {/* Profile Image or Placeholder */}
      {profileUrl ? (
        <Image
          source={{ uri: profileUrl }}
          style={styles.image}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.initials}>{getInitials(person.name)}</Text>
        </View>
      )}

      {/* Bottom Gradient - Simple approach matching media hero */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.95)']}
        locations={[0, 0.2, 1]}
        style={styles.bottomGradient}
      />

      {/* Top Gradient - Only when biography exists */}
      {metadata?.biography && (
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          locations={[0, 1]}
          style={styles.topGradient}
        />
      )}

      {/* Overlay Content - Bottom-aligned, center-aligned horizontally */}
      <View style={styles.overlayContent}>
        {/* Person Name */}
        <Text style={styles.name} numberOfLines={2}>
          {person.name}
        </Text>

        {/* Known For Department */}
        {person.knownForDepartment && (
          <Text style={styles.department}>{person.knownForDepartment}</Text>
        )}

        {/* Personal Info Badges */}
        {metadata && (metadata.birthdate || metadata.birthplace) && (
          <View style={styles.badges}>
            {metadata.birthdate && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{formatDate(metadata.birthdate)}</Text>
              </View>
            )}
            {metadata.birthplace && (
              <View style={styles.badge}>
                <Text style={styles.badgeText} numberOfLines={1}>
                  {metadata.birthplace}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Biography Snippet (2 lines, expandable) */}
        {metadata?.biography && (
          <View style={styles.biographyContainer}>
            <Text
              style={styles.biography}
              numberOfLines={biographyExpanded ? undefined : 2}
              ellipsizeMode="tail"
            >
              {metadata.biography}
            </Text>
            {!biographyExpanded && metadata.biography.length > 150 && (
              <Pressable
                onPress={toggleBiography}
                accessibilityRole="button"
                accessibilityLabel={t('media_detail.see_all')}
                style={styles.moreButton}
              >
                <Text style={styles.moreButtonText}>
                  {t('media_detail.see_all').toUpperCase()}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#FFFFFF" />
              </Pressable>
            )}
            {biographyExpanded && (
              <Pressable
                onPress={toggleBiography}
                accessibilityRole="button"
                accessibilityLabel={t('common.close')}
                style={styles.moreButton}
              >
                <Text style={styles.moreButtonText}>{t('common.close').toUpperCase()}</Text>
                <Ionicons name="chevron-up" size={16} color="#FFFFFF" />
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
    marginBottom: theme.spacing.xl,
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
  // Bottom gradient covering 80% height
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80%',
  },
  // Top gradient covering 30% height (for biography readability)
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  // Content container - bottom-aligned with center alignment
  overlayContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['3xl'],
    gap: theme.spacing.md,
  },
  name: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: '#FFFFFF',
    lineHeight: theme.lineHeight.tight,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  department: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  badges: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    maxWidth: 200,
  },
  badgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  biographyContainer: {
    gap: theme.spacing.xs,
    alignItems: 'center',
  },
  biography: {
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.loose,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingTop: theme.spacing.xs,
  },
  moreButtonText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: '#FFFFFF',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
}))
