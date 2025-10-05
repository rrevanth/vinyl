import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { BottomSheetPicker } from './BottomSheetPicker'

interface SettingsPickerRowProps {
  title: string
  description?: string
  currentValue: string
  options: { label: string; value: string }[]
  onValueChange: (value: string) => void
  isLast?: boolean
}

export const SettingsPickerRow = observer<SettingsPickerRowProps>(
  ({ title, description, currentValue, options, onValueChange, isLast = false }) => {
    const [isPickerVisible, setIsPickerVisible] = useState(false)

    const currentOption = options.find((option) => option.value === currentValue)
    const currentLabel = currentOption?.label ?? currentValue

    const handlePress = () => {
      setIsPickerVisible(true)
    }

    const handleSelect = (value: string) => {
      onValueChange(value)
    }

    const handleClose = () => {
      setIsPickerVisible(false)
    }

    return (
      <>
        <Pressable
          style={({ pressed }) => [
            styles.container,
            pressed && styles.pressed,
            !isLast && styles.separator,
          ]}
          onPress={handlePress}
          accessibilityRole="button"
          accessibilityLabel={`${title}: ${currentLabel}`}
          accessibilityHint="Opens picker to select option"
        >
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              {description && <Text style={styles.description}>{description}</Text>}
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.currentValue}>{currentLabel}</Text>
              <Text style={styles.chevron}>↓</Text>
            </View>
          </View>
        </Pressable>

        <BottomSheetPicker
          visible={isPickerVisible}
          title={title}
          options={options}
          selectedValue={currentValue}
          onSelect={handleSelect}
          onClose={handleClose}
        />
      </>
    )
  }
)

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    minHeight: 56,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  pressed: {
    backgroundColor: theme.colors.surfaceElevated,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    lineHeight: 18,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  currentValue: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
  },
  chevron: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textTertiary,
    lineHeight: 20,
  },
}))

export type { SettingsPickerRowProps }