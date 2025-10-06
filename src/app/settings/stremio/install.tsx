import { useState } from 'react'
import { ScrollView, TextInput, Pressable, Text, View, Alert, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { SettingsSection } from '@/src/features/settings/components/atoms/SettingsSection'
import { CapabilityBadge } from '@/src/features/settings/components/atoms/CapabilityBadge'
import { useStremioAddons } from '@/src/features/settings/hooks/useStremioAddons'
import { useStremioAddonCatalog } from '@/src/features/settings/hooks/useStremioAddonCatalog'
import { t } from '@/src/presentation/shared/i18n'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'

const InstallAddonScreen = observer(() => {
  const router = useRouter()
  const [manifestUrl, setManifestUrl] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [isInstalling, setIsInstalling] = useState(false)
  const [previewAddon, setPreviewAddon] = useState<StremioAddon | null>(null)

  const { installAddon, getConfigureUrl } = useStremioAddons()
  const { previewAddon: previewAddonFromCatalog } = useStremioAddonCatalog()

  const handleValidateUrl = async () => {
    if (!manifestUrl.trim()) {
      Alert.alert(
        t('settings.stremio.validation_error'),
        t('settings.stremio.manifest_url_required')
      )
      return
    }

    try {
      setIsValidating(true)
      setPreviewAddon(null)

      const addon = await previewAddonFromCatalog(manifestUrl.trim())

      if (!addon) {
        throw new Error(t('settings.stremio.invalid_manifest'))
      }

      setPreviewAddon(addon)
    } catch (error) {
      Alert.alert(
        t('settings.stremio.validation_failed'),
        error instanceof Error ? error.message : t('settings.stremio.validation_failed_message')
      )
      setPreviewAddon(null)
    } finally {
      setIsValidating(false)
    }
  }

  const handleOpenConfiguration = async () => {
    if (!previewAddon) return

    const configureUrl = getConfigureUrl(previewAddon)
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
        t('settings.stremio.configure_and_install_message'),
        [{ text: t('settings.stremio.ok'), style: 'default' }]
      )
    } catch (error) {
      Alert.alert(
        t('settings.stremio.configure_failed'),
        error instanceof Error ? error.message : t('settings.stremio.configure_failed_message')
      )
    }
  }

  const handleInstall = async () => {
    if (!previewAddon) return

    try {
      setIsInstalling(true)

      await installAddon(manifestUrl.trim())

      Alert.alert(
        t('settings.stremio.install_success'),
        t('settings.stremio.install_success_message'),
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
        t('settings.stremio.install_failed'),
        error instanceof Error ? error.message : t('settings.stremio.install_failed_message')
      )
    } finally {
      setIsInstalling(false)
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* URL Input Section */}
      <SettingsSection
        title={t('settings.stremio.manifest_url')}
        footer={t('settings.stremio.manifest_url_footer')}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('settings.stremio.manifest_url_placeholder')}
            placeholderTextColor="#999999"
            value={manifestUrl}
            onChangeText={setManifestUrl}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="url"
            keyboardType="url"
            returnKeyType="done"
            onSubmitEditing={handleValidateUrl}
            accessibilityLabel={t('settings.stremio.manifest_url')}
          />

          <Pressable
            style={({ pressed }) => [
              styles.validateButton,
              pressed && styles.buttonPressed,
              (isValidating || !manifestUrl.trim()) && styles.buttonDisabled,
            ]}
            onPress={handleValidateUrl}
            disabled={isValidating || !manifestUrl.trim()}
            accessibilityRole="button"
            accessibilityLabel={t('settings.stremio.validate_url')}
            accessibilityState={{ disabled: isValidating || !manifestUrl.trim() }}
          >
            {isValidating ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.validateButtonText}>{t('settings.stremio.validate_url')}</Text>
            )}
          </Pressable>
        </View>
      </SettingsSection>

      {/* Preview Section */}
      {previewAddon && (
        <SettingsSection title={t('settings.stremio.addon_preview')}>
          <View style={styles.previewContainer}>
            <Text style={styles.previewName}>{previewAddon.getDisplayName()}</Text>
            <Text style={styles.previewVersion}>v{previewAddon.version}</Text>

            {previewAddon.description && (
              <Text style={styles.previewDescription}>{previewAddon.description}</Text>
            )}

            {/* Capability Badges */}
            {previewAddon.capabilities.length > 0 && (
              <View style={styles.badgesContainer}>
                <Text style={styles.badgesLabel}>{t('settings.stremio.capabilities')}</Text>
                <View style={styles.badges}>
                  {previewAddon.capabilities.map((capability) => (
                    <CapabilityBadge key={capability} capability={capability} size="sm" />
                  ))}
                </View>
              </View>
            )}

            {/* Supported Types */}
            {previewAddon.supportedTypes.length > 0 && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t('settings.stremio.supported_types')}</Text>
                <Text style={styles.infoValue}>{previewAddon.supportedTypes.join(', ')}</Text>
              </View>
            )}

            {/* ID Prefixes */}
            {previewAddon.supportedIdPrefixes && previewAddon.supportedIdPrefixes.length > 0 && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t('settings.stremio.id_prefixes')}</Text>
                <Text style={styles.infoValue}>{previewAddon.supportedIdPrefixes.join(', ')}</Text>
              </View>
            )}

            {/* Install Button */}
            <Pressable
              style={({ pressed }) => [
                styles.installButton,
                pressed && styles.buttonPressed,
                isInstalling && styles.buttonDisabled,
              ]}
              onPress={handleInstall}
              disabled={isInstalling}
              accessibilityRole="button"
              accessibilityLabel={t('settings.stremio.install_addon')}
              accessibilityState={{ disabled: isInstalling }}
            >
              {isInstalling ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.installButtonText}>{t('settings.stremio.install_addon')}</Text>
              )}
            </Pressable>
          </View>
        </SettingsSection>
      )}

      {/* Configuration Help */}
      {previewAddon && previewAddon.isConfigurable && (
        <SettingsSection
          title={t('settings.stremio.configuration_required')}
          footer={t('settings.stremio.configuration_required_footer')}
        >
          <Pressable
            style={({ pressed }) => [
              styles.configureButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleOpenConfiguration}
            accessibilityRole="button"
            accessibilityLabel={t('settings.stremio.open_configuration')}
          >
            <Text style={styles.configureButtonText}>{t('settings.stremio.open_configuration')}</Text>
          </Pressable>
        </SettingsSection>
      )}
    </ScrollView>
  )
})

export default InstallAddonScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  inputContainer: {
    padding: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
    minHeight: 44,
  },
  validateButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  validateButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
  previewContainer: {
    padding: theme.spacing.md,
  },
  previewName: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  previewVersion: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing.md,
  },
  previewDescription: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  badgesContainer: {
    marginBottom: theme.spacing.md,
  },
  badgesLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  infoRow: {
    marginBottom: theme.spacing.sm,
  },
  infoLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  installButton: {
    backgroundColor: '#5B21B6',
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    marginTop: theme.spacing.md,
  },
  installButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
  configureButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    marginHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  configureButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
}))
