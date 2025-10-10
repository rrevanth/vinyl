import type { FC } from 'react'
import { memo } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import type { Person } from '@/src/domain/entities/Person'
import { t } from '@/src/presentation/shared/i18n'

interface PersonalInfoSectionProps {
  readonly metadata: Person
}

/**
 * Personal info section displaying birthdate, birthplace, and department
 * Follows app design standards with Unistyles theming
 *
 * Note: metadata is a Person entity with enriched data
 */
const PersonalInfoSectionComponent: FC<PersonalInfoSectionProps> = ({ metadata }) => {
  // Person entity currently has knownForDepartment
  // Future enrichment will add birthday, birthplace, etc.
  const { knownForDepartment } = metadata

  // Hide section if no personal info available
  if (!knownForDepartment) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text
        style={styles.label}
        accessibilityRole="header"
      >
        {t('person_detail.personal_info')}
      </Text>

      <View style={styles.infoContainer}>
        {/* Department */}
        {knownForDepartment && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('person_detail.department')}</Text>
            <Text style={styles.infoValue}>{knownForDepartment}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export const PersonalInfoSection = memo(PersonalInfoSectionComponent)

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
    marginBottom: theme.spacing.md,
  },
  infoContainer: {
    gap: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    flex: 1,
  },
  infoValue: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    flex: 2,
    textAlign: 'right',
  },
}))
