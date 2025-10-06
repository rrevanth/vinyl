import { useState } from 'react'
import { Pressable, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native'
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'
import { CapabilityBadge } from './CapabilityBadge'
import { ToggleSwitch } from './ToggleSwitch'

interface AddonCardProps {
  addon: StremioAddon
  onToggle: (addonId: string, isEnabled: boolean) => Promise<void>
  onConfigure?: (addon: StremioAddon) => void
  onUninstall: (addonId: string) => Promise<void>
  onPress?: () => void
}

/**
 * Card component for displaying installed Stremio addon with all info and controls
 */
export const AddonCard = observer<AddonCardProps>(
  ({ addon, onToggle, onConfigure, onUninstall, onPress }) => {
    const [isToggling, setIsToggling] = useState(false)
    const [isUninstalling, setIsUninstalling] = useState(false)

    const handleToggle = async (value: boolean) => {
      try {
        setIsToggling(true)
        await onToggle(addon.id, value)
      } catch (error) {
        console.error('Failed to toggle addon:', error)
      } finally {
        setIsToggling(false)
      }
    }

    const handleConfigure = () => {
      if (onConfigure && addon.isConfigurable) {
        onConfigure(addon)
      }
    }

    const handleUninstall = async () => {
      try {
        setIsUninstalling(true)
        await onUninstall(addon.id)
      } catch (error) {
        console.error('Failed to uninstall addon:', error)
        setIsUninstalling(false)
      }
    }

    const iconColor = UnistylesRuntime.getTheme().colors.textSecondary

    return (
      <Pressable
        style={({ pressed }) => [styles.container, pressed && onPress && styles.pressed]}
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole="button"
        accessibilityLabel={`${addon.name} addon`}
        accessibilityHint={onPress ? 'Tap to view addon details' : undefined}
      >
        {/* Top Row: Logo + Name/Version + Toggle */}
        <View style={styles.topRow}>
          <View style={styles.headerLeft}>
            {addon.logo ? (
              <Image source={{ uri: addon.logo }} style={styles.logo} resizeMode="contain" />
            ) : (
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoPlaceholderText}>{addon.name.charAt(0).toUpperCase()}</Text>
              </View>
            )}
            <View style={styles.nameContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {addon.getDisplayName()}
              </Text>
              <Text style={styles.version}>v{addon.version}</Text>
            </View>
          </View>

          <View style={styles.toggleContainer}>
            {isToggling ? (
              <ActivityIndicator size="small" color={iconColor} />
            ) : (
              <ToggleSwitch
                value={addon.isEnabled}
                onValueChange={handleToggle}
                accessibilityLabel={`${addon.isEnabled ? 'Disable' : 'Enable'} ${addon.name}`}
              />
            )}
          </View>
        </View>

        {/* Description (if available) */}
        {addon.description && (
          <Text style={styles.description} numberOfLines={2}>
            {addon.description}
          </Text>
        )}

        {/* Middle: Capability Badges */}
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

        {/* Bottom: Action Buttons */}
        <View style={styles.actionsRow}>
          {addon.isConfigurable && (
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                styles.configureButton,
                pressed && styles.actionButtonPressed,
              ]}
              onPress={handleConfigure}
              accessibilityRole="button"
              accessibilityLabel={`Configure ${addon.name}`}
            >
              <Text style={styles.configureButtonText}>Configure</Text>
            </Pressable>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              styles.uninstallButton,
              pressed && styles.actionButtonPressed,
              isUninstalling && styles.actionButtonDisabled,
            ]}
            onPress={handleUninstall}
            disabled={isUninstalling}
            accessibilityRole="button"
            accessibilityLabel={`Uninstall ${addon.name}`}
          >
            {isUninstalling ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.uninstallButtonText}>Uninstall</Text>
            )}
          </Pressable>
        </View>
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
  },
  pressed: {
    backgroundColor: theme.colors.surfaceElevated,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: theme.spacing.md,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  logoPlaceholderText: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textSecondary,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: 2,
  },
  version: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textTertiary,
  },
  toggleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 52,
    minHeight: 32,
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: theme.spacing.sm,
  },
  badgesScroll: {
    marginBottom: theme.spacing.sm,
  },
  badgesContent: {
    gap: theme.spacing.xs,
    paddingRight: theme.spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  actionButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  actionButtonPressed: {
    opacity: 0.8,
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  configureButton: {
    backgroundColor: theme.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  configureButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  uninstallButton: {
    backgroundColor: '#DC2626', // Destructive red
  },
  uninstallButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: '#FFFFFF',
  },
}))

export type { AddonCardProps }
