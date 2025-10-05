import { ReactNode } from 'react'
import { Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface SettingsRowProps {
  title: string
  description?: string
  children?: ReactNode
  onPress?: () => void
  disabled?: boolean
  variant?: 'default' | 'danger' | 'accent'
  isLast?: boolean
}

export const SettingsRow = observer<SettingsRowProps>(
  ({ title, description, children, onPress, disabled = false, variant = 'default', isLast = false }) => {
    const Component = onPress ? Pressable : View

    return (
      <Component
        style={({ pressed }) => [
          styles.container,
          pressed && !disabled && styles.pressed,
          disabled && styles.disabled,
          variant === 'danger' && styles.dangerContainer,
          variant === 'accent' && styles.accentContainer,
          !isLast && styles.separator,
        ]}
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        accessibilityRole={onPress ? 'button' : 'none'}
        accessibilityState={{ disabled }}
      >
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                disabled && styles.titleDisabled,
                variant === 'danger' && styles.titleDanger,
                variant === 'accent' && styles.titleAccent,
              ]}
            >
              {title}
            </Text>
            {description && (
              <Text style={[styles.description, disabled && styles.descriptionDisabled]}>
                {description}
              </Text>
            )}
          </View>
          {children && <View style={styles.accessory}>{children}</View>}
        </View>
      </Component>
    )
  }
)

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    minHeight: 44, // Accessibility minimum
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  pressed: {
    backgroundColor: theme.colors.surfaceElevated,
  },
  disabled: {
    opacity: 0.5,
  },
  dangerContainer: {
    backgroundColor: theme.colors.errorLight,
  },
  accentContainer: {
    backgroundColor: theme.colors.infoLight,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
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
  titleDisabled: {
    color: theme.colors.textDisabled,
  },
  titleDanger: {
    color: theme.colors.error,
  },
  titleAccent: {
    color: theme.colors.primary,
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    lineHeight: 18,
  },
  descriptionDisabled: {
    color: theme.colors.textDisabled,
  },
  accessory: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export type { SettingsRowProps }
