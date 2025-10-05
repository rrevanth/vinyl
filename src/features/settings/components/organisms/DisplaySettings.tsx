import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { SettingsSection } from '../atoms/SettingsSection'
import { SettingsPickerRow } from '../atoms/SettingsPickerRow'
import { SettingsToggleRow } from '../atoms/SettingsToggleRow'
import { useSettings } from '../../hooks/useSettings'
import { t, supportedLocales } from '@/src/presentation/shared/i18n'

export const DisplaySettings = observer(() => {
  const {
    getCurrentLocale,
    setAppLanguage,
    userPreferences$,
    setGridViewMode,
    setAutoplayTrailers,
  } = useSettings()

  const currentLocale = getCurrentLocale()
  const uiPrefs = userPreferences$.ui.get()

  // Dynamically generate language options from supported locales
  const LANGUAGE_OPTIONS = supportedLocales.map((locale) => ({
    label: locale === 'en' ? 'English' : locale === 'es' ? 'Español' : locale,
    value: locale,
  }))

  const GRID_OPTIONS = [
    { label: t('settings.display.grid_compact'), value: 'compact' },
    { label: t('settings.display.grid_comfortable'), value: 'comfortable' },
    { label: t('settings.display.grid_cozy'), value: 'cozy' },
  ]

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Language Section */}
      <SettingsSection title="Language">
        <SettingsPickerRow
          title={t('settings.display.app_language')}
          description="Changes the language of the app interface"
          currentValue={currentLocale}
          options={LANGUAGE_OPTIONS}
          onValueChange={(value) => setAppLanguage(value as typeof currentLocale)}
          isLast
        />
      </SettingsSection>

      {/* Display Section */}
      <SettingsSection
        title={t('settings.display.grid_view_mode')}
        footer="Adjusts how many items are displayed per row"
      >
        <SettingsPickerRow
          title={t('settings.display.grid_view_mode')}
          currentValue={uiPrefs.gridViewMode}
          options={GRID_OPTIONS}
          onValueChange={(value) => setGridViewMode(value as typeof uiPrefs.gridViewMode)}
          isLast
        />
      </SettingsSection>

      {/* Content Preferences */}
      <SettingsSection title="Content" footer="Control what content is displayed in the app">
        <SettingsToggleRow
          title={t('settings.display.autoplay_trailers')}
          description="Automatically play trailers when browsing content"
          value={uiPrefs.autoplayTrailers}
          onValueChange={setAutoplayTrailers}
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
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: theme.colors.primary,
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
}))

export type {}
