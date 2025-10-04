import { ScrollView, Text } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { SettingsSection, SettingsRow } from '../../../../presentation/shared/components/settings'

export default function TMDBSettingsScreen() {
  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <SettingsSection title="Connection Status">
        <SettingsRow
          title="Connected"
          description="Using default API key from environment"
          status="connected"
        />
      </SettingsSection>

      <SettingsSection title="Configuration">
        <SettingsRow
          title="API Key"
          description="Default API key (from environment)"
          rightElement={<Text style={styles.configValue}>Default</Text>}
        />
        <SettingsRow
          title="Language"
          description="English (US)"
          rightElement={<Text style={styles.configValue}>en-US</Text>}
        />
        <SettingsRow
          title="Region"
          description="United States"
          rightElement={<Text style={styles.configValue}>US</Text>}
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
  configValue: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
}))
