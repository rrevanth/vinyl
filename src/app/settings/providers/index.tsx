import { ScrollView } from 'react-native'
import { router } from 'expo-router'
import { StyleSheet } from 'react-native-unistyles'
import { SettingsSection, SettingsRow } from '../../../presentation/shared/components/settings'

export default function ProvidersScreen() {
  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <SettingsSection title="Active Providers">
        <SettingsRow
          title="TMDB"
          description="Movie & TV metadata, images and information"
          status="connected"
          onPress={() => router.push('/settings/providers/tmdb')}
        />
        <SettingsRow
          title="Stremio"
          description="Community addons and streaming sources"
          status="warning"
          onPress={() => router.push('/settings/providers/stremio')}
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
