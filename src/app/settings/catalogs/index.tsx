import { memo } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { useSelector } from '@legendapp/state/react'
import { router } from 'expo-router'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { t } from '@/src/presentation/shared/i18n'
import { SettingsNavigationRow } from '@/src/features/settings/components/atoms/SettingsNavigationRow'

const CatalogsIndexScreen = () => {
  const enabledCount = useSelector(
    () => userPreferences$.homescreen.selectedCatalogIds.get().length
  )

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('settings.catalogs.index_title')}</Text>
        <Text style={styles.subtitle}>{t('settings.catalogs.index_subtitle')}</Text>
      </View>

      <View style={styles.overviewCard}>
        <View style={styles.overviewContent}>
          <Text style={styles.overviewLabel}>{t('settings.catalogs.enabled_catalogs_label')}</Text>
          <Text style={styles.overviewValue}>{enabledCount}</Text>
        </View>
        <Text style={styles.overviewDescription}>
          {t('settings.catalogs.enabled_catalogs_description')}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.catalogs.management_section_title')}</Text>

        <View style={styles.navigationGroup}>
          <SettingsNavigationRow
            title={t('settings.catalogs.enable_disable_title')}
            description={t('settings.catalogs.enable_disable_description')}
            iconName="checkmark-circle-outline"
            onPress={() => {
              router.push('/settings/catalogs/enable')
            }}
          />
          <SettingsNavigationRow
            title={t('settings.catalogs.reorder_title')}
            description={t('settings.catalogs.reorder_description')}
            iconName="reorder-four-outline"
            onPress={() => {
              router.push('/settings/catalogs/reorder')
            }}
            isLast
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default memo(CatalogsIndexScreen)

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  overviewCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  overviewContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: theme.spacing.md,
  },
  overviewLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
  },
  overviewValue: {
    color: theme.colors.primary,
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
  },
  overviewDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    lineHeight: 20,
  },
  section: {
    gap: theme.spacing.md,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
  },
  navigationGroup: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
}))
