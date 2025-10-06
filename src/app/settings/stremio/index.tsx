import { ScrollView, Pressable, Text, Alert, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { SettingsSection } from '@/src/features/settings/components/atoms/SettingsSection'
import { AddonCard } from '@/src/features/settings/components/atoms/AddonCard'
import { useStremioAddons } from '@/src/features/settings/hooks/useStremioAddons'
import { t } from '@/src/presentation/shared/i18n'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'

const StremioSettingsScreen = observer(() => {
  const router = useRouter()
  const {
    installedAddons,
    isLoading,
    toggleAddon,
    uninstallAddon,
    getConfigureUrl,
    clearCache,
  } = useStremioAddons()

  const handleToggleAddon = async (addonId: string, isEnabled: boolean) => {
    try {
      await toggleAddon(addonId, isEnabled)
    } catch (error) {
      Alert.alert(
        t('settings.stremio.toggle_failed'),
        error instanceof Error ? error.message : t('settings.stremio.toggle_failed_message')
      )
    }
  }

  const handleConfigureAddon = async (addon: StremioAddon) => {
    const configureUrl = getConfigureUrl(addon)
    if (!configureUrl) {
      Alert.alert(
        t('settings.stremio.configure_unavailable'),
        t('settings.stremio.configure_unavailable_message')
      )
      return
    }

    try {
      // Open configuration in browser
      await WebBrowser.openBrowserAsync(configureUrl)

      // Show info about reconfiguration
      Alert.alert(
        t('settings.stremio.configure_info_title'),
        t('settings.stremio.configure_info_message'),
        [{ text: t('settings.stremio.ok'), style: 'default' }]
      )
    } catch (error) {
      Alert.alert(
        t('settings.stremio.configure_failed'),
        error instanceof Error ? error.message : t('settings.stremio.configure_failed_message')
      )
    }
  }

  const handleUninstallAddon = async (addonId: string) => {
    const addon = installedAddons.find((a) => a.id === addonId)
    if (!addon) return

    Alert.alert(
      t('settings.stremio.uninstall_confirm_title'),
      t('settings.stremio.uninstall_confirm_message').replace('{name}', addon.getDisplayName()),
      [
        { text: t('settings.stremio.cancel'), style: 'cancel' },
        {
          text: t('settings.stremio.uninstall'),
          style: 'destructive',
          onPress: async () => {
            try {
              await uninstallAddon(addonId)
              Alert.alert(
                t('settings.stremio.uninstall_success'),
                t('settings.stremio.uninstall_success_message').replace('{name}', addon.getDisplayName())
              )
            } catch (error) {
              Alert.alert(
                t('settings.stremio.uninstall_failed'),
                error instanceof Error ? error.message : t('settings.stremio.uninstall_failed_message')
              )
            }
          },
        },
      ]
    )
  }

  const handleAddonPress = (addon: StremioAddon) => {
    router.push(`/settings/stremio/addon/${addon.id}`)
  }

  const handleBrowseAddons = () => {
    router.push('/settings/stremio/browse')
  }

  const handleInstallByUrl = () => {
    router.push('/settings/stremio/install')
  }

  const handleClearCache = () => {
    Alert.alert(
      t('settings.stremio.clear_cache_confirm_title'),
      t('settings.stremio.clear_cache_confirm_message'),
      [
        { text: t('settings.stremio.cancel'), style: 'cancel' },
        {
          text: t('settings.stremio.clear_cache'),
          style: 'destructive',
          onPress: async () => {
            try {
              await clearCache()
              Alert.alert(
                t('settings.stremio.clear_cache_success'),
                t('settings.stremio.clear_cache_success_message')
              )
            } catch (error) {
              Alert.alert(
                t('settings.stremio.clear_cache_failed'),
                error instanceof Error ? error.message : t('settings.stremio.clear_cache_failed_message')
              )
            }
          },
        },
      ]
    )
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Installed Addons Section */}
      <SettingsSection
        title={t('settings.stremio.installed_addons')}
        footer={t('settings.stremio.installed_addons_footer')}
      >
        {installedAddons.length > 0 ? (
          <View>
            {installedAddons.map((addon) => (
              <AddonCard
                key={addon.id}
                addon={addon}
                onToggle={handleToggleAddon}
                onConfigure={handleConfigureAddon}
                onUninstall={handleUninstallAddon}
                onPress={() => handleAddonPress(addon)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>{t('settings.stremio.no_addons_installed')}</Text>
            <Pressable
              style={({ pressed }) => [styles.emptyStateButton, pressed && styles.buttonPressed]}
              onPress={handleBrowseAddons}
              accessibilityRole="button"
              accessibilityLabel={t('settings.stremio.browse_addons')}
            >
              <Text style={styles.emptyStateButtonText}>{t('settings.stremio.browse_addons')}</Text>
            </Pressable>
          </View>
        )}
      </SettingsSection>

      {/* Actions Section */}
      <SettingsSection title={t('settings.stremio.actions')}>
        <Pressable
          style={({ pressed }) => [styles.actionButton, pressed && styles.buttonPressed]}
          onPress={handleBrowseAddons}
          accessibilityRole="button"
          accessibilityLabel={t('settings.stremio.browse_addons')}
        >
          <Text style={styles.actionButtonText}>{t('settings.stremio.browse_addons')}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            styles.actionButtonBorder,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleInstallByUrl}
          accessibilityRole="button"
          accessibilityLabel={t('settings.stremio.install_by_url')}
        >
          <Text style={styles.actionButtonText}>{t('settings.stremio.install_by_url')}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            styles.destructiveButton,
            styles.actionButtonBorder,
            pressed && styles.buttonPressed,
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handleClearCache}
          disabled={isLoading}
          accessibilityRole="button"
          accessibilityLabel={t('settings.stremio.clear_cache')}
          accessibilityState={{ disabled: isLoading }}
        >
          <Text style={styles.destructiveButtonText}>{t('settings.stremio.clear_cache')}</Text>
        </Pressable>
      </SettingsSection>
    </ScrollView>
  )
})

export default StremioSettingsScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  emptyState: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  emptyStateButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 44,
  },
  emptyStateButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
  actionButton: {
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  actionButtonBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  actionButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
  },
  destructiveButton: {
    backgroundColor: theme.colors.surface,
  },
  destructiveButtonText: {
    color: '#DC2626',
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
}))
