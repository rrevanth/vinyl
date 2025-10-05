import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { SettingsSection } from '../atoms/SettingsSection'
import { SettingsPickerRow } from '../atoms/SettingsPickerRow'
import { SettingsToggleRow } from '../atoms/SettingsToggleRow'
import { useSettings } from '../../hooks/useSettings'
import { t } from '@/src/presentation/shared/i18n'

export const DisplaySettings = observer(() => {
  const {
    getCurrentLocale,
    setAppLanguage,
    userPreferences$,
    setContentLanguage,
    setGridViewMode,
    setShowAdultContent,
    setAutoplayTrailers,
  } = useSettings()

  const currentLocale = getCurrentLocale()
  const uiPrefs = userPreferences$.ui.get()

  const LANGUAGE_OPTIONS = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Français', value: 'fr' },
    { label: 'Deutsch', value: 'de' },
    { label: 'Italiano', value: 'it' },
    { label: 'Português', value: 'pt' },
    { label: '日本語', value: 'ja' },
    { label: '中文', value: 'zh' },
    { label: '한국어', value: 'ko' },
  ]

  const CONTENT_LANGUAGE_OPTIONS = [
    { label: 'English', value: 'en-US' },
    { label: 'Español', value: 'es-ES' },
    { label: 'Français', value: 'fr-FR' },
    { label: 'Deutsch', value: 'de-DE' },
    { label: 'Italiano', value: 'it-IT' },
    { label: 'Português', value: 'pt-PT' },
    { label: '日本語', value: 'ja-JP' },
    { label: '中文', value: 'zh-CN' },
    { label: '한국어', value: 'ko-KR' },
  ]

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
        />
        <SettingsPickerRow
          title={t('settings.display.content_language')}
          description="Preferred language for movie and TV show metadata"
          currentValue={uiPrefs.contentLanguage}
          options={CONTENT_LANGUAGE_OPTIONS}
          onValueChange={setContentLanguage}
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
          title={t('settings.display.adult_content')}
          description="Show movies and TV shows with adult content ratings"
          value={uiPrefs.showAdultContent}
          onValueChange={setShowAdultContent}
        />
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
