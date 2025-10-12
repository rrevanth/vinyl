import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface SegmentOption<T> {
  readonly value: T
  readonly label: string
}

interface SegmentedControlProps<T> {
  readonly options: readonly SegmentOption<T>[]
  readonly value: T
  readonly onChange: (value: T) => void
  readonly accessibilityLabel: string
}

export const SegmentedControl = observer(<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: SegmentedControlProps<T>) => {
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
              stylesheet.segment,
              isSelected && stylesheet.segmentSelected,
              pressed && !isSelected && stylesheet.segmentPressed,
            ]}
            onPress={() => onChange(option.value)}
            accessibilityRole="radio"
            accessibilityLabel={option.label}
            accessibilityState={{ selected: isSelected }}
          >
            <Text
              style={[
                stylesheet.segmentText,
                isSelected && stylesheet.segmentTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
})

const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  segmentSelected: {
    backgroundColor: theme.colors.primary,
  },
  segmentPressed: {
    backgroundColor: theme.colors.surfaceElevated,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
  },
  segmentTextSelected: {
    color: theme.colors.background,
  },
}))
