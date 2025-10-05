import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { SettingsSection } from '../atoms/SettingsSection'
import { SettingsPickerRow } from '../atoms/SettingsPickerRow'
import { useSettings } from '../../hooks/useSettings'
import { t } from '@/src/presentation/shared/i18n'

export const AppearanceSettings = observer(() => {
  const { getCurrentTheme, setThemeMode } = useSettings()

  const currentTheme = getCurrentTheme()

  const THEME_OPTIONS = [
    { label: t('settings.appearance.theme_light'), value: 'light' },
    { label: t('settings.appearance.theme_dark'), value: 'dark' },
    { label: t('settings.appearance.theme_system'), value: 'system' },
  ]

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SettingsSection
        title={t('settings.appearance.title')}
        footer={
          t('settings.appearance.theme_system') +
          ' automatically adjusts based on your device settings.'
        }
      >
        <SettingsPickerRow
          title={t('settings.appearance.title')}
          currentValue={currentTheme}
          options={THEME_OPTIONS}
          onValueChange={(value) => setThemeMode(value as typeof currentTheme)}
          isLast
        />
      </SettingsSection>
    </ScrollView>
  )
})

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
}))

export type {}
