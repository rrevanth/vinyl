import type { FC } from 'react'
import { memo } from 'react'
import { StyleSheet } from 'react-native-unistyles'
import type { Person } from '@/src/domain/entities/Person'

interface BiographySectionProps {
  readonly metadata: Person
}

/**
 * Biography section displaying person biography with proper text formatting
 * Follows app design standards with Unistyles theming
 *
 * Note: metadata is a Person entity with enriched data (biography, birthdate, etc.)
 */
const BiographySectionComponent: FC<BiographySectionProps> = () => {
  // Person entity doesn't have biography field yet, so this is placeholder
  // When TMDB provider implements IPeopleMetadataCapability, it will enrich Person with biography
  // For now, we'll just not render anything if no biography exists
  return null

  // Future implementation when Person has biography:
  // const biography = metadata.biography
  // if (!biography) return null
  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.label}>{t('person_detail.biography')}</Text>
  //     <Text style={styles.text}>{biography}</Text>
  //   </View>
  // )
}

export const BiographySection = memo(BiographySectionComponent)

// Styles will be used when component is fully implemented
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.sm,
  },
  text: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
    lineHeight: theme.fontSize.base * 1.5,
  },
}))
