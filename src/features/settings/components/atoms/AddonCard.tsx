import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import Ionicons from '@expo/vector-icons/Ionicons'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'
import { CapabilityBadge } from './CapabilityBadge'

interface AddonCardProps {
  addon: StremioAddon
  onInstall: (addonId: string) => void
  onPress: () => void
  isInstalled?: boolean
}

/**
 * Card component for browsing and installing addons
 * Displays logo, name, description, version, and install button
 */
export const AddonCard = observer<AddonCardProps>(
  ({ addon, onInstall, onPress, isInstalled = false }) => {
    const hasLogo = addon.manifest.logo && addon.manifest.logo.trim() !== ''

    return (
      <Pressable
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        onPress={onPress}
        accessibilityRole="button"
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          {hasLogo ? (
            <Image
              source={{ uri: addon.manifest.logo }}
              style={styles.logo}
              contentFit="cover"
              transition={200}
              placeholder={require('@/assets/images/icon.png')}
            />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Ionicons name="extension-puzzle-outline" size={32} color={styles.logoPlaceholderIcon.color} />
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name} numberOfLines={1}>
              {addon.manifest.name}
            </Text>
            <Text style={styles.version}>v{addon.manifest.version}</Text>
          </View>

          {/* Description */}
          {addon.manifest.description && (
            <Text style={styles.description} numberOfLines={2}>
              {addon.manifest.description}
            </Text>
          )}

          {/* Capabilities */}
          <View style={styles.capabilities}>
            {addon.capabilities.slice(0, 4).map((capability) => (
              <CapabilityBadge key={capability} capability={capability} size="sm" />
            ))}
            {addon.capabilities.length > 4 && (
              <View style={styles.moreBadge}>
                <Text style={styles.moreText}>+{addon.capabilities.length - 4}</Text>
              </View>
            )}
          </View>

          {/* Install Button */}
          <Pressable
            style={({ pressed }) => [
              styles.installButton,
              isInstalled && styles.installButtonDisabled,
              pressed && !isInstalled && styles.installButtonPressed,
            ]}
            onPress={(e) => {
              e.stopPropagation()
              if (!isInstalled) {
                onInstall(addon.manifest.id)
              }
            }}
            disabled={isInstalled}
            accessibilityRole="button"
            accessibilityLabel={isInstalled ? 'Already installed' : 'Install addon'}
            accessibilityState={{ disabled: isInstalled }}
          >
            <Ionicons
              name={isInstalled ? 'checkmark-circle' : 'download-outline'}
              size={20}
              color={isInstalled ? '#10B981' : '#FFFFFF'}
            />
            <Text style={[styles.installButtonText, isInstalled && styles.installButtonTextDisabled]}>
              {isInstalled ? 'Installed' : 'Install'}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    )
  }
)

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholderIcon: {
    color: theme.colors.textSecondary,
  },
  content: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.xs,
  },
  name: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    flex: 1,
  },
  version: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  capabilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  moreBadge: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  moreText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.medium,
  },
  installButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    minHeight: 44,
    marginTop: theme.spacing.xs,
  },
  installButtonPressed: {
    opacity: 0.8,
  },
  installButtonDisabled: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  installButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: '#FFFFFF',
  },
  installButtonTextDisabled: {
    color: '#10B981',
  },
}))

export type { AddonCardProps }
