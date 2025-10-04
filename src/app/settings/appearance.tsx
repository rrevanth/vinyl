import { ScrollView } from 'react-native'
import { useObservable } from '@legendapp/state/react'
import { StyleSheet } from 'react-native-unistyles'
import {
  SettingsSection,
  SettingsToggle,
  ThemeDropdown,
} from '../../presentation/shared/components/settings'
import { userPreferences$ } from '../../presentation/shared/stores/user.store'

export default function AppearanceScreen() {
  const uiPrefs = useObservable(userPreferences$.ui)

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    userPreferences$.ui.theme.set(theme)
  }

  const handleAutoplayTrailersToggle = (value: boolean) => {
    userPreferences$.ui.autoplayTrailers.set(value)
  }

  const handleAdultContentToggle = (value: boolean) => {
    userPreferences$.ui.showAdultContent.set(value)
  }

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <SettingsSection title="Theme">
        <ThemeDropdown value={uiPrefs.theme.get()} onValueChange={handleThemeChange} />
      </SettingsSection>

      <SettingsSection title="Display Options">
        <SettingsToggle
          title="Autoplay Trailers"
          description="Automatically play video trailers when browsing"
          value={uiPrefs.autoplayTrailers.get()}
          onValueChange={handleAutoplayTrailersToggle}
        />
        <SettingsToggle
          title="Show Adult Content"
          description="Include adult-rated content in search and recommendations"
          value={uiPrefs.showAdultContent.get()}
          onValueChange={handleAdultContentToggle}
        />
      </SettingsSection>
    </ScrollView>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing[4],
  },
}))
