import { View, Text, Pressable } from 'react-native'
import { useState } from 'react'
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles'

type ThemeOption = 'light' | 'dark' | 'system'

interface ThemeDropdownProps {
  value: ThemeOption
  onValueChange: (theme: ThemeOption) => void
  disabled?: boolean
}

const THEME_OPTIONS: Array<{ value: ThemeOption; label: string; description: string }> = [
  { value: 'light', label: 'Light Theme', description: 'Always use light appearance' },
  { value: 'dark', label: 'Dark Theme', description: 'Always use dark appearance' },
  { value: 'system', label: 'Follow System', description: 'Match device appearance settings' },
]

export function ThemeDropdown({ value, onValueChange, disabled = false }: ThemeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = THEME_OPTIONS.find((option) => option.value === value) || THEME_OPTIONS[0]

  const handleSelect = (theme: ThemeOption) => {
    onValueChange(theme)
    setIsOpen(false)

    // Apply theme immediately using UnistylesRuntime
    if (theme === 'system') {
      UnistylesRuntime.setAdaptiveThemes(true)
    } else {
      UnistylesRuntime.setAdaptiveThemes(false)
      UnistylesRuntime.setTheme(theme)
    }
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => !disabled && setIsOpen(!isOpen)}
        style={[styles.trigger, disabled && styles.disabled]}
        disabled={disabled}
      >
        <View style={styles.triggerContent}>
          <View style={styles.selectedInfo}>
            <Text style={[styles.selectedLabel, disabled && styles.disabledText]}>
              {selectedOption.label}
            </Text>
            <Text style={[styles.selectedDescription, disabled && styles.disabledText]}>
              {selectedOption.description}
            </Text>
          </View>
          <Text
            style={[styles.chevron, disabled && styles.disabledText, isOpen && styles.chevronOpen]}
          >
            ▼
          </Text>
        </View>
      </Pressable>

      {isOpen && (
        <View style={styles.dropdown}>
          {THEME_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => handleSelect(option.value)}
              style={[styles.option, option.value === value && styles.selectedOption]}
            >
              <View style={styles.optionContent}>
                <Text
                  style={[styles.optionLabel, option.value === value && styles.selectedOptionText]}
                >
                  {option.label}
                </Text>
                <Text
                  style={[
                    styles.optionDescription,
                    option.value === value && styles.selectedOptionDescription,
                  ]}
                >
                  {option.description}
                </Text>
              </View>
              {option.value === value && <Text style={styles.checkmark}>✓</Text>}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'relative',
  },

  trigger: {
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },

  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  disabled: {
    opacity: 0.5,
  },

  selectedInfo: {
    flex: 1,
  },

  selectedLabel: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing[0.5],
  },

  selectedDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },

  chevron: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textTertiary,
    marginLeft: theme.spacing[2],
    transform: [{ rotate: '0deg' }],
  },

  chevronOpen: {
    transform: [{ rotate: '180deg' }],
  },

  dropdown: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing[1],
    marginHorizontal: theme.spacing[4],
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },

  selectedOption: {
    backgroundColor: theme.colors.primaryLight,
    opacity: 0.1,
  },

  optionContent: {
    flex: 1,
  },

  optionLabel: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing[0.5],
  },

  optionDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },

  selectedOptionText: {
    color: theme.colors.primary,
  },

  selectedOptionDescription: {
    color: theme.colors.primary,
    opacity: 0.8,
  },

  checkmark: {
    fontSize: theme.fontSize.base,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.bold,
    marginLeft: theme.spacing[2],
  },

  disabledText: {
    color: theme.colors.textTertiary,
  },
}))
