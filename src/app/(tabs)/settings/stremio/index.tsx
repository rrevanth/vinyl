import { View, Pressable, Text, Alert } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { LegendList } from '@legendapp/list'
import { SettingsSection } from '@/src/features/settings/components/atoms/SettingsSection'
import { StremioSummaryCard } from '@/src/features/settings/components/atoms/StremioSummaryCard'
import { AddonCatalogCard } from '@/src/features/settings/components/atoms/AddonCatalogCard'
import { useStremioAddons } from '@/src/features/settings/hooks/useStremioAddons'
import { useAddonStats } from '@/src/features/settings/hooks/useAddonStats'
import { t } from '@/src/presentation/shared/i18n'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'

const StremioSettingsScreen = observer(() => {
  const router = useRouter()
  const { installedAddons, toggleAddon, uninstallAddon } = useStremioAddons()

  // Use reactive stats hook (fixes catalog count bug)
  const { totalInstalled, activeAddons, totalCatalogs, workingAddons } = useAddonStats()

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
            } catch (error) {
              Alert.alert(
                t('settings.stremio.uninstall_failed'),
                error instanceof Error
                  ? error.message
                  : t('settings.stremio.uninstall_failed_message')
              )
            }
          },
        },
      ]
    )
  }

  const handleAddonPress = (addonId: string) => {
    router.push(`/settings/stremio/addon/${addonId}`)
  }

  const handleBrowseAddons = () => {
    router.push('/settings/stremio/browse')
  }

  const handleInstallByUrl = () => {
    router.push('/settings/stremio/install')
  }

  const handleConfigureAddon = (configureUrl: string) => {
    // Open configure URL in browser
    import('expo-web-browser').then((WebBrowser) => {
      WebBrowser.openBrowserAsync(configureUrl).catch((error) => {
        console.error('Failed to open configure URL:', error)
        Alert.alert(
          t('settings.stremio.configure_failed'),
          t('settings.stremio.configure_failed_message')
        )
      })
    })
  }

  const renderAddonItem = ({ item }: { item: StremioAddon }) => (
    <AddonCatalogCard
      addon={item}
      isInstalled={true}
      onInstall={async () => {}} // Not used for installed addons
      onUninstall={handleUninstallAddon}
      onConfigure={handleConfigureAddon}
      onToggle={handleToggleAddon}
      showToggle={true}
      onPress={() => handleAddonPress(item.id)}
    />
  )

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="extension-puzzle-outline" size={48} style={styles.emptyStateIcon} />
      <Text style={styles.emptyStateText}>{t('settings.stremio.no_addons_installed')}</Text>
      <Text style={styles.emptyStateSubtext}>
        {t('settings.stremio.no_addons_installed_subtext')}
      </Text>
    </View>
  )

  return (
    <LegendList
      data={installedAddons}
      estimatedItemSize={200}
      keyExtractor={(item) => item.id}
      renderItem={renderAddonItem}
      ListHeaderComponent={
        <View>
          {/* Summary Card */}
          <View style={styles.summaryContainer}>
            <StremioSummaryCard
              totalInstalled={totalInstalled}
              activeAddons={activeAddons}
              totalCatalogs={totalCatalogs}
              workingAddons={workingAddons}
            />
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <Pressable
              style={({ pressed }) => [styles.quickActionButton, pressed && styles.buttonPressed]}
              onPress={handleBrowseAddons}
              accessibilityRole="button"
              accessibilityLabel={t('settings.stremio.browse_addons')}
            >
              <Ionicons name="search-outline" size={24} style={styles.quickActionIcon} />
              <Text style={styles.quickActionText}>{t('settings.stremio.browse_addons')}</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.quickActionButton, pressed && styles.buttonPressed]}
              onPress={handleInstallByUrl}
              accessibilityRole="button"
              accessibilityLabel={t('settings.stremio.install_by_url')}
            >
              <Ionicons name="link-outline" size={24} style={styles.quickActionIcon} />
              <Text style={styles.quickActionText}>{t('settings.stremio.install_by_url')}</Text>
            </Pressable>
          </View>

          {/* Installed Addons Header */}
          <SettingsSection
            title={t('settings.stremio.installed_addons')}
            footer={
              installedAddons.length > 0 ? t('settings.stremio.installed_addons_footer') : undefined
            }
          >
            {installedAddons.length === 0 && renderEmptyState()}
          </SettingsSection>
        </View>
      }
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    />
  )
})

export default StremioSettingsScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  summaryContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
    gap: theme.spacing.xs,
  },
  quickActionIcon: {
    color: '#FFFFFF',
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  emptyState: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
  },
  emptyStateIcon: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    opacity: 0.5,
  },
  emptyStateText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
  },
  emptyStateSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
}))
