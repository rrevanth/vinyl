import type { StremioAddon } from '@/src/domain/entities/StremioAddon'
import { observer } from '@legendapp/state/react'
import { Image } from 'expo-image'
import { useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Switch, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { CapabilityBadge } from './CapabilityBadge'
import { StatusDot } from './StatusDot'

interface AddonCatalogCardProps {
  addon: StremioAddon
  isInstalled: boolean
  onInstall: (manifestUrl: string) => Promise<void>
  onUninstall: (addonId: string) => Promise<void>
  onConfigure: (configureUrl: string) => void
  onToggle?: (addonId: string, enabled: boolean) => void
  showToggle?: boolean
  onPress?: () => void
}

/**
 * Card component for browsing/discovering Stremio addons in the catalog
 */
export const AddonCatalogCard = observer<AddonCatalogCardProps>(
  ({ addon, isInstalled, onInstall, onUninstall, onConfigure, onToggle, showToggle, onPress }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleAction = async () => {
      try {
        setIsLoading(true)
        if (isInstalled) {
          await onUninstall(addon.id)
        } else {
          await onInstall(addon.transportUrl)
        }
      } catch (error) {
        console.error(`Failed to ${isInstalled ? 'uninstall' : 'install'} addon:`, error)
      } finally {
        setIsLoading(false)
      }
    }

    const handleConfigure = () => {
      // Build configure URL by replacing manifest.json with configure
      let configureUrl = addon.transportUrl
      if (configureUrl.endsWith('/manifest.json')) {
        configureUrl = configureUrl.replace(/\/manifest\.json$/, '/configure')
      } else if (configureUrl.endsWith('.json')) {
        configureUrl = configureUrl.replace(/\.json$/, '/configure')
      } else {
        configureUrl = `${configureUrl}/configure`
      }
      onConfigure(configureUrl)
    }

    // Button visibility logic
    const showConfigureButton = addon.isConfigurable
    const showUninstallButton = isInstalled
    const showInstallButton = !isInstalled && !addon.configurationRequired

    // Status logic for installed addons
    const getStatus = (): 'connected' | 'warning' | 'error' | 'disabled' => {
      if (!isInstalled) return 'disabled'
      if (!addon.isEnabled) return 'disabled'
      if (addon.isReadyToUse()) return 'connected'
      return 'warning'
    }

    return (
      <Pressable
        style={({ pressed }) => [styles.container, pressed && onPress && styles.pressed]}
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole="button"
        accessibilityLabel={`${addon.name} addon`}
        accessibilityHint={onPress ? 'Tap to preview addon details' : undefined}
      >
        {/* Top Row: Logo + Name */}
        <View style={styles.topRow}>
          {addon.logo ? (
            <Image
              source={{ uri: addon.logo }}
              style={styles.logo}
              contentFit="contain"
              transition={200}
            />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoPlaceholderText}>
                {addon.name?.charAt(0)?.toUpperCase() || '?'}
              </Text>
            </View>
          )}
          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {addon.name || 'Unknown Addon'}
            </Text>
            <View style={styles.versionRow}>
              {isInstalled && <StatusDot status={getStatus()} size="sm" />}
              <Text style={styles.version}>v{addon.version || '1.0.0'}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        {addon.description && (
          <Text style={styles.description} numberOfLines={2}>
            {addon.description}
          </Text>
        )}

        {/* Capability Badges */}
        {addon.capabilities.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.badgesScroll}
            contentContainerStyle={styles.badgesContent}
          >
            {addon.capabilities.map((capability) => (
              <CapabilityBadge key={capability} capability={capability} size="sm" />
            ))}
          </ScrollView>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          {showConfigureButton && (
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                styles.configureButton,
                (showUninstallButton || showInstallButton) ? styles.halfButton : styles.fullButton,
                pressed && styles.actionButtonPressed,
              ]}
              onPress={handleConfigure}
              accessibilityRole="button"
              accessibilityLabel={`Configure ${addon.name}`}
            >
              <Text style={styles.configureButtonText}>Configure</Text>
            </Pressable>
          )}
          {showUninstallButton && (
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                styles.uninstallButton,
                showConfigureButton ? styles.halfButton : styles.fullButton,
                pressed && styles.actionButtonPressed,
                isLoading && styles.actionButtonDisabled,
              ]}
              onPress={handleAction}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel={`Uninstall ${addon.name}`}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={styles.buttonTextColor.color} />
              ) : (
                <Text style={styles.uninstallButtonText}>Uninstall</Text>
              )}
            </Pressable>
          )}
          {showInstallButton && (
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                styles.installButton,
                showConfigureButton ? styles.halfButton : styles.fullButton,
                pressed && styles.actionButtonPressed,
                isLoading && styles.actionButtonDisabled,
              ]}
              onPress={handleAction}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel={`Install ${addon.name}`}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={styles.buttonTextColor.color} />
              ) : (
                <Text style={styles.installButtonText}>Install</Text>
              )}
            </Pressable>
          )}
        </View>

        {/* Toggle Switch Row (when installed and showToggle is true) */}
        {isInstalled && showToggle && onToggle && (
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>
              {addon.isEnabled ? 'Enabled' : 'Disabled'}
            </Text>
            <Switch
              value={addon.isEnabled}
              onValueChange={(value) => onToggle(addon.id, value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={addon.isEnabled ? '#007AFF' : '#f4f3f4'}
              accessibilityRole="switch"
              accessibilityLabel={addon.isEnabled ? 'Disable addon' : 'Enable addon'}
            />
          </View>
        )}
      </Pressable>
    )
  }
)

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pressed: {
    backgroundColor: theme.colors.surfaceElevated,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
  },
  logoPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  logoPlaceholderText: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textSecondary,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: 2,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  version: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textTertiary,
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: theme.spacing.sm,
  },
  badgesScroll: {
    marginBottom: theme.spacing.md,
  },
  badgesContent: {
    gap: theme.spacing.xs,
    paddingRight: theme.spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    width: '100%',
  },
  halfButton: {
    flex: 1,
  },
  fullButton: {
    flex: 1,
  },
  actionButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  actionButtonPressed: {
    opacity: 0.8,
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  installButton: {
    backgroundColor: theme.colors.primary,
  },
  installButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  uninstallButton: {
    backgroundColor: theme.colors.error,
  },
  uninstallButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  configureButton: {
    backgroundColor: theme.colors.warning,
  },
  configureButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  buttonTextColor: {
    color: theme.colors.text,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  toggleLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textSecondary,
  },
}))

export type { AddonCatalogCardProps }
