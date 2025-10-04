import { View, Text, Pressable } from 'react-native'
import { type ReactNode } from 'react'
import { StyleSheet } from 'react-native-unistyles'
import { StatusDot, type StatusType } from './StatusDot'

interface SettingsRowProps {
  title: string
  description?: string
  onPress?: () => void
  rightElement?: ReactNode
  disabled?: boolean
  status?: StatusType
  variant?: 'default' | 'destructive'
  showChevron?: boolean
}

export function SettingsRow({
  title,
  description,
  onPress,
  rightElement,
  disabled = false,
  status,
  variant = 'default',
  showChevron = true,
}: SettingsRowProps) {
  const isInteractive = Boolean(onPress && !disabled)

  const content = (
    <View style={[styles.container, disabled && styles.disabled]}>
      <View style={styles.leftSection}>
        {status && (
          <View style={styles.statusContainer}>
            <StatusDot status={status} size="medium" />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.title, styles[variant], disabled && styles.disabledText]}>
            {title}
          </Text>
          {description && (
            <Text style={[styles.description, disabled && styles.disabledText]}>{description}</Text>
          )}
        </View>
      </View>

      <View style={styles.rightSection}>
        {rightElement}
        {isInteractive && showChevron && (
          <Text style={[styles.chevron, disabled && styles.disabledText]}>›</Text>
        )}
      </View>
    </View>
  )

  if (isInteractive) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    )
  }

  return content
}

const styles = StyleSheet.create((theme) => ({
  pressable: {
    // No additional styling for pressable wrapper
  },

  pressed: {
    opacity: 0.6,
  },

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

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  statusContainer: {
    marginRight: theme.spacing[3],
  },

  textContainer: {
    flex: 1,
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

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },

  chevron: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textTertiary,
    fontWeight: theme.fontWeight.medium,
  },

  // Variants
  default: {
    // Default text color
  },

  destructive: {
    color: theme.colors.error,
  },

  disabledText: {
    color: theme.colors.textTertiary,
  },
}))
