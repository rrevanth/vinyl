import { ScrollView, Pressable, Text, View, Image, Alert, ActivityIndicator, Switch } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { Ionicons } from '@expo/vector-icons'
import { SettingsSection } from '@/src/features/settings/components/atoms/SettingsSection'
import { CapabilityBadge } from '@/src/features/settings/components/atoms/CapabilityBadge'
import { useStremioAddons } from '@/src/features/settings/hooks/useStremioAddons'
import { t } from '@/src/presentation/shared/i18n'

const AddonDetailsScreen = observer(() => {
  const router = useRouter()
  const params = useLocalSearchParams<{ addonId: string }>()
  const addonId = params.addonId

  const {
    installedAddons,
    isLoading,
    toggleAddon,
    refreshAddon,
    uninstallAddon,
    getConfigureUrl,
  } = useStremioAddons()

  // Find addon from installed addons
  const addon = installedAddons.find((a) => a.id === addonId)

  if (!addon) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{t('settings.stremio.addon_not_found')}</Text>
        <Pressable
          style={({ pressed }) => [styles.backButton, pressed && styles.buttonPressed]}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel={t('settings.stremio.go_back')}
        >
          <Text style={styles.backButtonText}>{t('settings.stremio.go_back')}</Text>
        </Pressable>
      </View>
    )
  }

  const handleToggle = async (value: boolean) => {
    try {
      await toggleAddon(addon.id, value)
    } catch (error) {
      Alert.alert(
        t('settings.stremio.toggle_failed'),
        error instanceof Error ? error.message : t('settings.stremio.toggle_failed_message')
      )
    }
  }

  const handleConfigure = async () => {
    const configureUrl = getConfigureUrl(addon)
    if (!configureUrl) {
      Alert.alert(
        t('settings.stremio.configure_unavailable'),
        t('settings.stremio.configure_unavailable_message')
      )
      return
    }

    try {
      await WebBrowser.openBrowserAsync(configureUrl)

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

  const handleRefresh = async () => {
    try {
      await refreshAddon(addon.id)
      Alert.alert(
        t('settings.stremio.refresh_success'),
        t('settings.stremio.refresh_success_message')
      )
    } catch (error) {
      Alert.alert(
        t('settings.stremio.refresh_failed'),
        error instanceof Error ? error.message : t('settings.stremio.refresh_failed_message')
      )
    }
  }

  const handleUninstall = () => {
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
              await uninstallAddon(addon.id)
              Alert.alert(
                t('settings.stremio.uninstall_success'),
                t('settings.stremio.uninstall_success_message').replace('{name}', addon.getDisplayName()),
                [
                  {
                    text: t('settings.stremio.ok'),
                    onPress: () => {
                      router.back()
                    },
                  },
                ]
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={styles.hero}>
        {addon.logo ? (
          <Image source={{ uri: addon.logo }} style={styles.logo} resizeMode="contain" />
        ) : (
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoPlaceholderText}>{addon.name.charAt(0).toUpperCase()}</Text>
          </View>
        )}

        <Text style={styles.name}>{addon.getDisplayName()}</Text>
        <Text style={styles.version}>v{addon.version}</Text>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>
            {addon.isEnabled ? t('settings.stremio.enabled') : t('settings.stremio.disabled')}
          </Text>
          {isLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Switch
              value={addon.isEnabled}
              onValueChange={handleToggle}
              accessibilityLabel={`${addon.isEnabled ? t('settings.stremio.disable') : t('settings.stremio.enable')} ${addon.name}`}
            />
          )}
        </View>
      </View>

      {/* Sticky Action Bar */}
      <View style={styles.actionBar}>
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.buttonPressed,
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handleRefresh}
          disabled={isLoading}
          accessibilityRole="button"
          accessibilityLabel={t('settings.stremio.refresh_manifest')}
        >
          <Ionicons name="refresh-outline" size={24} style={styles.actionIcon} />
          <Text style={styles.actionButtonText}>{t('settings.stremio.refresh_manifest')}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            styles.destructiveButton,
            pressed && styles.buttonPressed,
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handleUninstall}
          disabled={isLoading}
          accessibilityRole="button"
          accessibilityLabel={t('settings.stremio.uninstall')}
        >
          <Ionicons name="trash-outline" size={24} style={styles.destructiveIcon} />
          <Text style={styles.destructiveButtonText}>{t('settings.stremio.uninstall')}</Text>
        </Pressable>
      </View>

      {/* Show addon catalogs this addon provides */}
      {addon.manifest.addonCatalogs && addon.manifest.addonCatalogs.length > 0 && (
        <SettingsSection title={t('settings.stremio.provides_catalogs')}>
          <View style={styles.catalogsList}>
            {addon.manifest.addonCatalogs.map((cat) => (
              <View key={`${cat.type}-${cat.id}`} style={styles.catalogItem}>
                <Text style={styles.catalogName}>{cat.name}</Text>
                <Text style={styles.catalogType}>({cat.type})</Text>
              </View>
            ))}
          </View>
        </SettingsSection>
      )}

      {/* Capabilities Section */}
      {addon.capabilities.length > 0 && (
        <SettingsSection title={t('settings.stremio.capabilities')}>
          <View style={styles.capabilitiesGrid}>
            {addon.capabilities.map((capability) => (
              <View key={capability} style={styles.capabilityItem}>
                <CapabilityBadge capability={capability} size="md" />
              </View>
            ))}
          </View>
        </SettingsSection>
      )}

      {/* Information Section */}
      <SettingsSection title={t('settings.stremio.information')}>
        <View style={styles.infoContainer}>
          {addon.description && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('settings.stremio.description_label')}</Text>
              <Text style={styles.infoValue}>{addon.description}</Text>
            </View>
          )}

          {addon.supportedTypes.length > 0 && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('settings.stremio.supported_types')}</Text>
              <Text style={styles.infoValue}>{addon.supportedTypes.join(', ')}</Text>
            </View>
          )}

          {addon.supportedIdPrefixes && addon.supportedIdPrefixes.length > 0 && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('settings.stremio.id_prefixes')}</Text>
              <Text style={styles.infoValue}>{addon.supportedIdPrefixes.join(', ')}</Text>
            </View>
          )}

          {addon.manifest.catalogs && addon.manifest.catalogs.length > 0 && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('settings.stremio.catalogs')}</Text>
              <Text style={styles.infoValue}>
                {addon.manifest.catalogs.map((c: { name?: string; type: string }) => c.name || c.type).join(', ')}
              </Text>
            </View>
          )}
        </View>
      </SettingsSection>

      {/* Configuration Section */}
      {addon.isConfigurable && (
        <SettingsSection
          title={t('settings.stremio.configuration')}
          footer={t('settings.stremio.configuration_footer')}
        >
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleConfigure}
            accessibilityRole="button"
            accessibilityLabel={t('settings.stremio.open_configuration')}
          >
            <Text style={styles.actionButtonText}>{t('settings.stremio.open_configuration')}</Text>
          </Pressable>
        </SettingsSection>
      )}
    </ScrollView>
  )
})

export default AddonDetailsScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingBottom: theme.spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  emptyText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  backButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 44,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
  // Hero Section
  hero: {
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    gap: theme.spacing.xs,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
  },
  logoPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  logoPlaceholderText: {
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textSecondary,
  },
  name: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  version: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing.sm,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  toggleLabel: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  // Sticky Action Bar
  actionBar: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
    gap: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  actionIcon: {
    color: theme.colors.text,
  },
  destructiveIcon: {
    color: '#DC2626',
  },
  actionButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
  },
  destructiveButton: {
    backgroundColor: theme.colors.surface,
  },
  destructiveButtonText: {
    color: '#DC2626',
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  // Capabilities Grid (2 columns)
  capabilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  capabilityItem: {
    width: '48%', // 2 columns with gap
  },
  // Information Section
  infoContainer: {
    padding: theme.spacing.md,
  },
  infoRow: {
    marginBottom: theme.spacing.md,
  },
  infoLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    lineHeight: 22,
  },
  // Addon Catalogs
  catalogsList: {
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  catalogItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.xs,
  },
  catalogName: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  catalogType: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
}))
