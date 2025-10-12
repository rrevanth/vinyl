import React from 'react'
import { Pressable, Text } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface ChipProps {
  label: string
  selected?: boolean
  onPress?: () => void
  disabled?: boolean
}

export const Chip: React.FC<ChipProps> = observer(({
  label,
  selected = false,
  onPress,
  disabled = false,
}) => {

  return (
    <Pressable
      style={({ pressed }) => [
        stylesheet.chip(selected),
        pressed && !disabled && stylesheet.chipPressed,
        disabled && stylesheet.chipDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={label}
    >
      <Text style={stylesheet.text(selected)}>{label}</Text>
    </Pressable>
  )
})

const stylesheet = StyleSheet.create((theme) => ({
  chip: (selected: boolean) => ({
    backgroundColor: selected ? theme.colors.primary : theme.colors.backgroundTertiary,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderWidth: selected ? 0 : 1.5,
    borderColor: theme.colors.border,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: selected ? theme.colors.primary : '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: selected ? 0.3 : 0.1,
    shadowRadius: selected ? 6 : 4,
    elevation: selected ? 4 : 2,
  }),
  chipPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  chipDisabled: {
    opacity: 0.5,
  },
  text: (selected: boolean) => ({
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: selected ? '#FFFFFF' : theme.colors.text,
    letterSpacing: 0.3,
  }),
}))
