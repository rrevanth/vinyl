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
    backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderWidth: selected ? 0 : 1,
    borderColor: theme.colors.border,
  }),
  chipPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  chipDisabled: {
    opacity: 0.5,
  },
  text: (selected: boolean) => ({
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: selected ? theme.colors.background : theme.colors.text,
  }),
}))
