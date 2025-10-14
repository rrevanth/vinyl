/**
 * PillButton Component
 * Reusable pill-shaped button with theme-flipping colors
 *
 * Features:
 * - Three variants: primary, secondary, ghost
 * - Three sizes: sm, md, lg
 * - Optional icon support
 * - Theme-aware colors (flip between light/dark themes)
 * - Full accessibility support
 * - Unistyles v3 with variants API
 */

import type { FC, ReactNode } from 'react'
import { Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export interface PillButtonProps {
  readonly title: string
  readonly onPress: () => void
  readonly icon?: ReactNode
  readonly variant?: 'primary' | 'secondary' | 'ghost'
  readonly size?: 'sm' | 'md' | 'lg'
  readonly disabled?: boolean
}

export const PillButton: FC<PillButtonProps> = ({
  title,
  onPress,
  icon,
  variant = 'primary',
  size = 'md',
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        stylesheet.button(variant, size),
        pressed && stylesheet.pressed,
        disabled && stylesheet.disabled,
      ]}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
    >
      {icon ? <View style={stylesheet.iconContainer}>{icon}</View> : null}
      <Text style={stylesheet.text(variant, size)}>{title}</Text>
    </Pressable>
  )
}

const stylesheet = StyleSheet.create((theme) => ({
  button: (variant: 'primary' | 'secondary' | 'ghost', size: 'sm' | 'md' | 'lg') => {
    const variantStyles = {
      primary: {
        backgroundColor: theme.colors.buttonPrimary,
      },
      secondary: {
        backgroundColor: theme.colors.buttonSecondary,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: theme.colors.imageText,
      },
    }

    const sizeStyles = {
      sm: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
      },
      md: {
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.md,
      },
      lg: {
        paddingHorizontal: theme.spacing['2xl'],
        paddingVertical: theme.spacing.lg,
      },
    }

    return {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.full,
      gap: theme.spacing.sm,
      ...variantStyles[variant],
      ...sizeStyles[size],
    }
  },
  text: (variant: 'primary' | 'secondary' | 'ghost', size: 'sm' | 'md' | 'lg') => {
    const variantStyles = {
      primary: {
        color: theme.colors.buttonPrimaryText,
      },
      secondary: {
        color: theme.colors.buttonSecondaryText,
      },
      ghost: {
        color: theme.colors.imageText,
      },
    }

    const sizeStyles = {
      sm: { fontSize: theme.fontSize.xs },
      md: { fontSize: theme.fontSize.base },
      lg: { fontSize: theme.fontSize.lg },
    }

    return {
      fontWeight: theme.fontWeight.semibold,
      ...variantStyles[variant],
      ...sizeStyles[size],
    }
  },
  iconContainer: {
    // Icon styling container
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
}))
