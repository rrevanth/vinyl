import { ScrollView } from 'react-native'
import { router } from 'expo-router'
import { StyleSheet } from 'react-native-unistyles'
import { SettingsSection, SettingsRow } from '../../../../presentation/shared/components/settings'

export default function StremioSettingsScreen() {
  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <SettingsSection title="Addon Status">
        <SettingsRow title="3 addons installed" description="2 active, 1 disabled" />
      </SettingsSection>

      <SettingsSection title="Installed Addons">
        <SettingsRow
          title="Torrentio"
          description="Movies & TV shows • Last used: 5m ago"
          status="connected"
          onPress={() => router.push('/settings/providers/stremio/torrentio')}
        />
        <SettingsRow
          title="YTS"
          description="Movies only • Last used: 1h ago"
          status="connected"
          onPress={() => router.push('/settings/providers/stremio/yts')}
        />
        <SettingsRow
          title="PirateBay"
          description="Movies & TV shows • Disabled"
          status="error"
          onPress={() => router.push('/settings/providers/stremio/piratebay')}
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
