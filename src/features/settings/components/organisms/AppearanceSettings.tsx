import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { SettingsSection } from '../atoms/SettingsSection'
import { ThemeSelector } from '../molecules/ThemeSelector'
import { useSettings } from '../../hooks/useSettings'
import { t } from '@/src/presentation/shared/i18n'

export const AppearanceSettings = observer(() => {
  const { getCurrentTheme, setThemeMode } = useSettings()

  const currentTheme = getCurrentTheme()

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
        <ThemeSelector currentTheme={currentTheme} onThemeChange={setThemeMode} />
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
