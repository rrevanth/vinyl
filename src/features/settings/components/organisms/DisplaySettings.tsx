import { ScrollView, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { SettingsSection } from '../atoms/SettingsSection'
import { SettingsRow } from '../atoms/SettingsRow'
import { ToggleSwitch } from '../atoms/ToggleSwitch'
import { LanguageSelector } from '../molecules/LanguageSelector'
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

  const GRID_OPTIONS = [
    { value: 'compact', labelKey: 'settings.display.grid_compact' },
    { value: 'comfortable', labelKey: 'settings.display.grid_comfortable' },
    { value: 'cozy', labelKey: 'settings.display.grid_cozy' },
  ] as const

  const CONTENT_LANGUAGES = [
    { value: 'en-US', label: 'English' },
    { value: 'es-ES', label: 'Español' },
    { value: 'fr-FR', label: 'Français' },
    { value: 'de-DE', label: 'Deutsch' },
    { value: 'it-IT', label: 'Italiano' },
    { value: 'pt-PT', label: 'Português' },
    { value: 'ja-JP', label: '日本語' },
    { value: 'zh-CN', label: '中文' },
    { value: 'ko-KR', label: '한국어' },
  ]

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* App Language */}
      <SettingsSection
        title={t('settings.display.app_language')}
        footer="Changes the language of the app interface."
      >
        <LanguageSelector currentLanguage={currentLocale} onLanguageChange={setAppLanguage} />
      </SettingsSection>

      {/* Content Language */}
      <SettingsSection
        title={t('settings.display.content_language')}
        footer="Preferred language for movie and TV show metadata."
      >
        {CONTENT_LANGUAGES.map((lang, index) => (
          <SettingsRow
            key={lang.value}
            title={lang.label}
            onPress={() => setContentLanguage(lang.value)}
            isLast={index === CONTENT_LANGUAGES.length - 1}
          >
            <View
              style={[
                styles.radioButton,
                uiPrefs.contentLanguage === lang.value && styles.radioButtonSelected,
              ]}
            >
              {uiPrefs.contentLanguage === lang.value && <View style={styles.radioButtonInner} />}
            </View>
          </SettingsRow>
        ))}
      </SettingsSection>

      {/* Grid View Mode */}
      <SettingsSection
        title={t('settings.display.grid_view_mode')}
        footer="Adjusts how many items are displayed per row."
      >
        {GRID_OPTIONS.map((option, index) => (
          <SettingsRow
            key={option.value}
            title={t(option.labelKey)}
            onPress={() => setGridViewMode(option.value)}
            isLast={index === GRID_OPTIONS.length - 1}
          >
            <View
              style={[
                styles.radioButton,
                uiPrefs.gridViewMode === option.value && styles.radioButtonSelected,
              ]}
            >
              {uiPrefs.gridViewMode === option.value && <View style={styles.radioButtonInner} />}
            </View>
          </SettingsRow>
        ))}
      </SettingsSection>

      {/* Content Preferences */}
      <SettingsSection title="Content" footer="Control what content is displayed in the app.">
        <SettingsRow
          title={t('settings.display.adult_content')}
          description="Show movies and TV shows with adult content ratings"
        >
          <ToggleSwitch
            value={uiPrefs.showAdultContent}
            onValueChange={setShowAdultContent}
            accessibilityLabel="Toggle adult content"
          />
        </SettingsRow>

        <SettingsRow
          title={t('settings.display.autoplay_trailers')}
          description="Automatically play trailers when browsing content"
          isLast
        >
          <ToggleSwitch
            value={uiPrefs.autoplayTrailers}
            onValueChange={setAutoplayTrailers}
            accessibilityLabel="Toggle autoplay trailers"
          />
        </SettingsRow>
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
