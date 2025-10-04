import { View, Text, Pressable } from 'react-native'
import { type ReactNode } from 'react'
import { StyleSheet } from 'react-native-unistyles'
import { StatusDot, type StatusType } from './StatusDot'

interface SettingsRowProps {
  title: string
  description?: string
  onPress?: () => void
  rightElement?: ReactNode
  status?: StatusType
  disabled?: boolean
  variant?: 'default' | 'destructive'
  showArrow?: boolean
}

export function SettingsRow({
  title,
  description,
  onPress,
  rightElement,
  status,
  disabled = false,
  variant = 'default',
  showArrow = true,
}: SettingsRowProps) {
  const isInteractive = Boolean(onPress) && !disabled

  const content = (
    <View style={[styles.container, disabled && styles.disabled]}>
      <View style={styles.leftContent}>
        {status && (
          <View style={styles.statusContainer}>
            <StatusDot status={status} size="small" />
          </View>
        )}
        <View style={styles.textContent}>
          <Text style={[styles.title, styles[variant]]}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </View>

      <View style={styles.rightContent}>
        {rightElement}
        {isInteractive && showArrow && <Text style={styles.arrow}>›</Text>}
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
    // No additional styles - let container handle layout
  },

  pressed: {
    opacity: 0.7,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    minHeight: 56, // Standard touch target
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },

  disabled: {
    opacity: 0.5,
  },

  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusContainer: {
    marginRight: theme.spacing[3],
  },

  textContent: {
    flex: 1,
  },

  title: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    lineHeight: theme.lineHeight.normal,
  },

  // Variants
  default: {
    color: theme.colors.text,
  },

  destructive: {
    color: theme.colors.error,
  },

  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: theme.lineHeight.relaxed,
    marginTop: theme.spacing[1],
  },

  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },

  arrow: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textTertiary,
    fontWeight: theme.fontWeight.medium,
  },
}))
