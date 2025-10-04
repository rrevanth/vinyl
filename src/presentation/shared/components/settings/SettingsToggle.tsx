import { View, Text, Switch } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

interface SettingsToggleProps {
  title: string
  description?: string
  value: boolean
  onValueChange: (value: boolean) => void
  disabled?: boolean
}

export function SettingsToggle({
  title,
  description,
  value,
  onValueChange,
  disabled = false,
}: SettingsToggleProps) {
  return (
    <View style={[styles.container, disabled && styles.disabled]}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, disabled && styles.disabledText]}>{title}</Text>
        {description && (
          <Text style={[styles.description, disabled && styles.disabledText]}>{description}</Text>
        )}
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: undefined, // Use system default
          true: undefined, // Use system default
        }}
        thumbColor={undefined} // Use system default
      />
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },

  disabled: {
    opacity: 0.5,
  },

  textContainer: {
    flex: 1,
    marginRight: theme.spacing[3],
  },

  title: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing[0.5],
  },

  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: theme.lineHeight.relaxed,
  },

  disabledText: {
    color: theme.colors.textTertiary,
  },
}))
