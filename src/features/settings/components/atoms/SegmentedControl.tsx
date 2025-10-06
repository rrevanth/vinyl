import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface SegmentedControlOption {
  value: string
  label: string
}

interface SegmentedControlProps {
  options: SegmentedControlOption[]
  selectedValue: string
  onValueChange: (value: string) => void
  disabled?: boolean
}

/**
 * iOS-style segmented control for selecting between options
 * Mobile-first design with smooth animations
 */
export const SegmentedControl: React.FC<SegmentedControlProps> = observer(
  ({ options, selectedValue, onValueChange, disabled = false }) => {

    return (
      <View style={styles.container}>
        {options.map((option, index) => {
          const isSelected = option.value === selectedValue
          const isFirst = index === 0
          const isLast = index === options.length - 1

          return (
            <Pressable
              key={option.value}
              style={({ pressed }) => [
                styles.segment,
                isFirst && styles.segmentFirst,
                isLast && styles.segmentLast,
                isSelected && styles.segmentSelected,
                pressed && !disabled && styles.segmentPressed,
                disabled && styles.segmentDisabled,
              ]}
              onPress={() => !disabled && onValueChange(option.value)}
              disabled={disabled}
              accessibilityRole="button"
              accessibilityLabel={option.label}
              accessibilityState={{ selected: isSelected, disabled }}
            >
              <Text
                style={[styles.segmentText, isSelected && styles.segmentTextSelected]}
                numberOfLines={1}
              >
                {option.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    )
  }
)

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.md,
    padding: 2,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  segment: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.sm,
    minHeight: 44,
  },
  segmentFirst: {
    borderTopLeftRadius: theme.borderRadius.md,
    borderBottomLeftRadius: theme.borderRadius.md,
  },
  segmentLast: {
    borderTopRightRadius: theme.borderRadius.md,
    borderBottomRightRadius: theme.borderRadius.md,
  },
  segmentSelected: {
    backgroundColor: theme.colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentPressed: {
    opacity: 0.7,
  },
  segmentDisabled: {
    opacity: 0.5,
  },
  segmentText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textSecondary,
  },
  segmentTextSelected: {
    color: theme.colors.text,
    fontWeight: theme.fontWeight.semibold,
  },
}))

export type { SegmentedControlOption, SegmentedControlProps }
