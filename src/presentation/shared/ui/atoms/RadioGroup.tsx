import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'

interface RadioOption<T> {
  readonly value: T
  readonly label: string
  readonly description?: string
}

interface RadioGroupProps<T> {
  readonly options: readonly RadioOption<T>[]
  readonly value: T
  readonly onChange: (value: T) => void
  readonly accessibilityLabel: string
}

export const RadioGroup = observer(<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: RadioGroupProps<T>) => {
  const { theme } = useUnistyles()

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
              stylesheet.option,
              pressed && stylesheet.optionPressed,
            ]}
            onPress={() => onChange(option.value)}
            accessibilityRole="radio"
            accessibilityLabel={option.label}
            accessibilityState={{ selected: isSelected }}
          >
            <View
              style={[
                stylesheet.radio,
                isSelected && stylesheet.radioSelected,
              ]}
            >
              {isSelected && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={theme.colors.primary}
                />
              )}
              {!isSelected && (
                <Ionicons
                  name="ellipse-outline"
                  size={24}
                  color={theme.colors.border}
                />
              )}
            </View>
            <View style={stylesheet.textContainer}>
              <Text style={stylesheet.label}>{option.label}</Text>
              {option.description && (
                <Text style={stylesheet.description}>{option.description}</Text>
              )}
            </View>
          </Pressable>
        )
      })}
    </View>
  )
})

const stylesheet = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.xs,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    minHeight: 44,
  },
  optionPressed: {
    backgroundColor: theme.colors.surfaceElevated,
  },
  radio: {
    marginRight: theme.spacing.md,
  },
  radioSelected: {
    transform: [{ scale: 1.1 }],
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
  },
  description: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
}))
