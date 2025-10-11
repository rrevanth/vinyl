import React from 'react'
import { Pressable } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'
import { observer } from '@legendapp/state/react'

type IconName = keyof typeof Ionicons.glyphMap

interface IconButtonProps {
  icon: IconName
  onPress: () => void
  size?: number
  color?: string
  disabled?: boolean
  accessibilityLabel: string
  variant?: 'default' | 'filled' | 'outlined'
}

export const IconButton: React.FC<IconButtonProps> = observer(({
  icon,
  onPress,
  size = 24,
  color,
  disabled = false,
  accessibilityLabel,
  variant = 'default',
}) => {
  const { theme } = useUnistyles()
  const iconColor = color || theme.colors.text

  return (
    <Pressable
      style={({ pressed }) => [
        stylesheet.button(variant),
        pressed && !disabled && stylesheet.buttonPressed,
        disabled && stylesheet.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
    >
      <Ionicons name={icon} size={size} color={iconColor} />
    </Pressable>
  )
})

const stylesheet = StyleSheet.create((theme) => ({
  button: (variant: string) => ({
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    minHeight: 44,
    ...(variant === 'filled' && {
      backgroundColor: theme.colors.surface,
    }),
    ...(variant === 'outlined' && {
      borderWidth: 1,
      borderColor: theme.colors.border,
    }),
  }),
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  buttonDisabled: {
    opacity: 0.4,
  },
}))
