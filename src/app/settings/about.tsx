import { ScrollView, Text } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { SettingsSection, SettingsRow } from '../../presentation/shared/components/settings'

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <SettingsSection title="App Information">
        <SettingsRow title="Version" rightElement={<Text style={styles.infoValue}>1.0.0</Text>} />
        <SettingsRow title="Build" rightElement={<Text style={styles.infoValue}>1</Text>} />
      </SettingsSection>

      <SettingsSection title="Data Sources & Thanks">
        <SettingsRow
          title="The Movie Database (TMDB)"
          description="This product uses the TMDB API but is not endorsed or certified by TMDB."
        />
        <SettingsRow
          title="Stremio"
          description="Built on Stremio addon ecosystem. Content provided by community developers."
        />
      </SettingsSection>

      <SettingsSection title="Support & Legal">
        <SettingsRow
          title="Privacy Policy"
          onPress={() => {
            // TODO: Open privacy policy
            console.log('Opening Privacy Policy')
          }}
        />
        <SettingsRow
          title="Terms of Service"
          onPress={() => {
            // TODO: Open terms of service
            console.log('Opening Terms of Service')
          }}
        />
        <SettingsRow
          title="Report Issue on GitHub"
          onPress={() => {
            // TODO: Open GitHub issues
            console.log('Opening GitHub Issues')
          }}
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
  infoValue: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
}))
