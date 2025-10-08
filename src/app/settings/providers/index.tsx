import { ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { router } from 'expo-router'
import { SettingsSection } from '@/src/features/settings/components/atoms/SettingsSection'
import { SettingsNavigationRow } from '@/src/features/settings/components/atoms/SettingsNavigationRow'
import { t } from '@/src/presentation/shared/i18n'

/**
 * Providers Settings Screen
 *
 * Main hub for managing data providers:
 * - Provider priorities (order for each capability)
 * - (Future: Installed providers, Add providers, etc.)
 */
const ProvidersSettingsScreen = observer(() => {
  const navigateToPriorities = () => {
    router.push('/settings/providers/priorities')
  }

  const navigateToCapabilities = () => {
    router.push('/settings/providers/capabilities')
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('settings.providers.title')}</Text>
        <Text style={styles.headerDescription}>
          {t('settings.providers.description')}
        </Text>
      </View>

      {/* Provider Management Section */}
      <SettingsSection title={t('settings.providers.management')}>
        <SettingsNavigationRow
          iconName="toggle-outline"
          title={t('settings.providers.capabilities.title')}
          description={t('settings.providers.capabilities.description')}
          onPress={navigateToCapabilities}
        />
        <SettingsNavigationRow
          iconName="swap-vertical-outline"
          title={t('settings.providers.priorities.title')}
          description={t('settings.providers.priorities.description')}
          onPress={navigateToPriorities}
        />
        {/* Future: Add Providers, Manage Installed Providers, etc. */}
      </SettingsSection>
    </ScrollView>
  )
})

export default ProvidersSettingsScreen

const styles = StyleSheet.create((theme) => ({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  headerTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize['2xl'],
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.sm,
  },
  headerDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
    lineHeight: theme.fontSize.base * 1.5,
  },
}))
