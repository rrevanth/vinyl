import { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'

interface SettingsConfigRowProps {
  label: string
  defaultValue: string
  customValue?: string
  isCustom: boolean
  onToggleCustom: (useCustom: boolean) => void
  onCustomValueChange: (value: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  isLast?: boolean
}

export const SettingsConfigRow = observer<SettingsConfigRowProps>(({
  label,
  defaultValue,
  customValue = '',
  isCustom,
  onToggleCustom,
  onCustomValueChange,
  placeholder,
  secureTextEntry = false,
  isLast = false,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const displayValue = isCustom ? 'Using custom value' : `Using default: ${defaultValue}`

  return (
    <View style={[styles.container, !isLast && styles.separator]}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Pressable
          style={({ pressed }) => [
            styles.toggleButton,
            pressed && styles.toggleButtonPressed,
          ]}
          onPress={() => onToggleCustom(!isCustom)}
          accessibilityRole="button"
          accessibilityLabel={isCustom ? 'Use default value' : 'Customize value'}
        >
          <Text style={styles.toggleText}>
            {isCustom ? 'Use Default' : 'Customize'}
          </Text>
          <Ionicons
            name={isCustom ? 'close-circle-outline' : 'create-outline'}
            size={16}
            color="#007AFF" // iOS system blue
          />
        </Pressable>
      </View>

      <Text style={styles.displayValue}>{displayValue}</Text>

      {isCustom && (
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            value={customValue}
            onChangeText={onCustomValueChange}
            placeholder={placeholder || `Enter custom ${label.toLowerCase()}`}
            placeholderTextColor="#8E8E93" // iOS system gray
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            accessibilityLabel={`Custom ${label}`}
          />
        </View>
      )}
    </View>
  )
})

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  label: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    minHeight: 32, // Accessibility minimum for interactive element
  },
  toggleButtonPressed: {
    backgroundColor: theme.colors.surfaceElevated,
  },
  toggleText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.primary,
  },
  displayValue: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  inputContainer: {
    marginTop: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    minHeight: 44, // Accessibility minimum
  },
  inputFocused: {
    borderColor: theme.colors.primary,
  },
}))

export type { SettingsConfigRowProps }