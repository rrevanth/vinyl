import { View, Text } from 'react-native'
import { type ReactNode } from 'react'
import { StyleSheet } from 'react-native-unistyles'

interface SettingsSectionProps {
  title?: string
  description?: string
  children: ReactNode
  variant?: 'default' | 'compact'
}

export function SettingsSection({
  title,
  description,
  children,
  variant = 'default',
}: SettingsSectionProps) {
  return (
    <View style={[styles.container, styles[variant]]}>
      {title && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      )}
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing[6],
  },

  // Variants
  default: {
    // Standard spacing
  },
  compact: {
    marginBottom: theme.spacing[4],
  },

  header: {
    marginBottom: theme.spacing[3],
  },

  title: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: theme.letterSpacing.wide,
    marginBottom: theme.spacing[1],
  },

  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textTertiary,
    lineHeight: theme.lineHeight.relaxed,
  },

  content: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
}))
