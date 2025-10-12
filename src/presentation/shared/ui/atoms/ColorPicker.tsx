import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'

interface ColorOption {
  readonly value: string
  readonly label: string
  readonly primaryColor: string
  readonly secondaryColor?: string
}

interface ColorPickerProps {
  readonly options: readonly ColorOption[]
  readonly value: string
  readonly onChange: (value: string) => void
  readonly accessibilityLabel: string
}

export const ColorPicker: React.FC<ColorPickerProps> = observer(({
  options,
  value,
  onChange,
  accessibilityLabel,
}) => {
  return (
    <View
      style={stylesheet.container}
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
    >
      {options.map((option) => {
        const isSelected = option.value === value

        return (
          <Pressable
            key={option.value}
            style={({ pressed }) => [
              stylesheet.colorOption,
              isSelected && stylesheet.colorOptionSelected,
              pressed && !isSelected && stylesheet.colorOptionPressed,
            ]}
            onPress={() => onChange(option.value)}
            accessibilityRole="radio"
            accessibilityLabel={option.label}
            accessibilityState={{ selected: isSelected }}
          >
            <View
              style={[
                stylesheet.colorSwatch,
                { backgroundColor: option.primaryColor },
              ]}
            >
              {isSelected && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color="#FFFFFF"
                />
              )}
            </View>
            <Text style={stylesheet.colorLabel}>{option.label}</Text>
          </Pressable>
        )
      })}
    </View>
  )
})

const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  colorOption: {
    alignItems: 'center',
    gap: theme.spacing.xs,
    minWidth: 70,
  },
  colorOptionSelected: {
    transform: [{ scale: 1.05 }],
  },
  colorOptionPressed: {
    opacity: 0.7,
  },
  colorSwatch: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.text,
    textAlign: 'center',
  },
}))
