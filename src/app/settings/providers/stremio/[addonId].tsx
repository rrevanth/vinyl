import { ScrollView, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native-unistyles'
import {
  SettingsSection,
  SettingsRow,
  SettingsToggle,
} from '../../../../presentation/shared/components/settings'

export default function AddonSettingsScreen() {
  const { addonId } = useLocalSearchParams<{ addonId: string }>()

  // Mock data - this would come from the addon registry
  const addonInfo = {
    name:
      addonId === 'torrentio'
        ? 'Torrentio'
        : addonId === 'yts'
          ? 'YTS'
          : addonId === 'piratebay'
            ? 'PirateBay'
            : 'Unknown Addon',
    enabled: addonId !== 'piratebay',
    version: '1.0.0',
    url: `https://${addonId}.strem.io/manifest.json`,
  }

  const handleToggleEnabled = (value: boolean) => {
    // TODO: Implement addon enable/disable logic
    console.log(`Toggle ${addonId} to ${value ? 'enabled' : 'disabled'}`)
  }

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <SettingsSection title="Addon Status">
        <SettingsToggle
          title="Enable Addon Provider"
          description="Allow this addon to provide streaming sources"
          value={addonInfo.enabled}
          onValueChange={handleToggleEnabled}
        />
      </SettingsSection>

      <SettingsSection title="Addon Information">
        <SettingsRow
          title="Name"
          rightElement={<Text style={styles.infoValue}>{addonInfo.name}</Text>}
        />
        <SettingsRow
          title="Version"
          rightElement={<Text style={styles.infoValue}>{addonInfo.version}</Text>}
        />
        <SettingsRow title="URL" description={addonInfo.url} />
      </SettingsSection>

      <SettingsSection title="Test Connection">
        <SettingsRow
          title="Test Addon Connection"
          description="Verify the addon is responding properly"
          onPress={() => {
            // TODO: Implement test connection logic
            console.log(`Testing connection to ${addonId}`)
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
