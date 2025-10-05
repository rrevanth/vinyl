import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { SettingsRow } from '../atoms/SettingsRow'
import type { ThemeMode } from '@/src/presentation/shared/stores/app.store'
import { t } from '@/src/presentation/shared/i18n'

interface ThemeSelectorProps {
  currentTheme: ThemeMode
  onThemeChange: (theme: ThemeMode) => void
}

const THEME_OPTIONS: { value: ThemeMode; labelKey: string }[] = [
  { value: 'light', labelKey: 'settings.appearance.theme_light' },
  { value: 'dark', labelKey: 'settings.appearance.theme_dark' },
  { value: 'system', labelKey: 'settings.appearance.theme_system' },
]

export const ThemeSelector = observer<ThemeSelectorProps>(({ currentTheme, onThemeChange }) => {
  return (
    <View style={styles.container}>
      {THEME_OPTIONS.map((option, index) => (
        <SettingsRow
          key={option.value}
          title={t(option.labelKey)}
          onPress={() => onThemeChange(option.value)}
          isLast={index === THEME_OPTIONS.length - 1}
        >
          <View
            style={[
              styles.radioButton,
              currentTheme === option.value && styles.radioButtonSelected,
            ]}
          >
            {currentTheme === option.value && <View style={styles.radioButtonInner} />}
          </View>
        </SettingsRow>
      ))}
    </View>
  )
})

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

export type { ThemeSelectorProps }
