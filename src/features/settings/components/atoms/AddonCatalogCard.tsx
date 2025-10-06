import { useState } from 'react'
import { Pressable, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'
import { CapabilityBadge } from './CapabilityBadge'

interface AddonCatalogCardProps {
  addon: StremioAddon
  isInstalled: boolean
  onInstall: (manifestUrl: string) => Promise<void>
  onUninstall: (addonId: string) => Promise<void>
  onPress?: () => void
}

/**
 * Card component for browsing/discovering Stremio addons in the catalog
 */
export const AddonCatalogCard = observer<AddonCatalogCardProps>(
  ({ addon, isInstalled, onInstall, onUninstall, onPress }) => {
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
            <Image source={{ uri: addon.logo }} style={styles.logo} resizeMode="contain" />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoPlaceholderText}>{addon.name.charAt(0).toUpperCase()}</Text>
            </View>
          )}
          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {addon.name}
            </Text>
            <Text style={styles.version}>v{addon.version}</Text>
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

        {/* Install/Uninstall Button */}
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            isInstalled ? styles.uninstallButton : styles.installButton,
            pressed && styles.actionButtonPressed,
            isLoading && styles.actionButtonDisabled,
          ]}
          onPress={handleAction}
          disabled={isLoading}
          accessibilityRole="button"
          accessibilityLabel={`${isInstalled ? 'Uninstall' : 'Install'} ${addon.name}`}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={isInstalled ? styles.uninstallButtonText : styles.installButtonText}>
              {isInstalled ? 'Uninstall' : 'Install'}
            </Text>
          )}
        </Pressable>

        {/* Optional indicators */}
        {addon.isConfigurable && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Configurable</Text>
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
    shadowColor: '#000',
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
    backgroundColor: '#5B21B6', // Primary purple
  },
  installButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: '#FFFFFF',
  },
  uninstallButton: {
    backgroundColor: '#DC2626', // Destructive red
  },
  uninstallButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: '#FFFFFF',
  },
  badge: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  badgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textSecondary,
  },
}))

export type { AddonCatalogCardProps }
