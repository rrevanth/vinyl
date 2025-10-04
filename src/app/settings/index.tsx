import { ScrollView } from 'react-native'
import { router } from 'expo-router'
import { StyleSheet } from 'react-native-unistyles'
import { SettingsSection, SettingsRow } from '../../presentation/shared/components/settings'

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <SettingsSection title="Appearance & Display">
        <SettingsRow
          title="Theme & Display"
          description="Theme, language and display options"
          onPress={() => router.push('/settings/appearance')}
        />
      </SettingsSection>

      <SettingsSection title="Data & Providers">
        <SettingsRow
          title="Data Providers"
          description="TMDB and Stremio configuration"
          onPress={() => router.push('/settings/providers')}
        />
      </SettingsSection>

      <SettingsSection title="Support & Information">
        <SettingsRow
          title="About VNYL"
          description="App info, data sources and legal"
          onPress={() => router.push('/settings/about')}
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
