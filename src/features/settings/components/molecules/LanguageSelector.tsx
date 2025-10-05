import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { SettingsRow } from '../atoms/SettingsRow'
import type { SupportedLocale } from '@/src/presentation/shared/stores/app.store'

interface LanguageSelectorProps {
  currentLanguage: SupportedLocale
  onLanguageChange: (language: SupportedLocale) => void
}

const LANGUAGE_OPTIONS: { value: SupportedLocale; nativeName: string; englishName: string }[] = [
  { value: 'en', nativeName: 'English', englishName: 'English' },
  { value: 'es', nativeName: 'Español', englishName: 'Spanish' },
  { value: 'fr', nativeName: 'Français', englishName: 'French' },
  { value: 'de', nativeName: 'Deutsch', englishName: 'German' },
  { value: 'it', nativeName: 'Italiano', englishName: 'Italian' },
  { value: 'pt', nativeName: 'Português', englishName: 'Portuguese' },
  { value: 'ja', nativeName: '日本語', englishName: 'Japanese' },
  { value: 'zh', nativeName: '中文', englishName: 'Chinese' },
  { value: 'ko', nativeName: '한국어', englishName: 'Korean' },
]

export const LanguageSelector = observer<LanguageSelectorProps>(
  ({ currentLanguage, onLanguageChange }) => {
    return (
      <View style={styles.container}>
        {LANGUAGE_OPTIONS.map((option, index) => (
          <SettingsRow
            key={option.value}
            title={option.nativeName}
            description={option.englishName}
            onPress={() => onLanguageChange(option.value)}
            isLast={index === LANGUAGE_OPTIONS.length - 1}
          >
            <View
              style={[
                styles.radioButton,
                currentLanguage === option.value && styles.radioButtonSelected,
              ]}
            >
              {currentLanguage === option.value && <View style={styles.radioButtonInner} />}
            </View>
          </SettingsRow>
        ))}
      </View>
    )
  }
)

const styles = StyleSheet.create((theme) => ({
  container: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
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

export type { LanguageSelectorProps }
