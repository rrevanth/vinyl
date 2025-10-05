import { ReactNode } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

interface SettingsSectionProps {
  title?: string
  footer?: string
  children: ReactNode
}

export const SettingsSection = ({ title, footer, children }: SettingsSectionProps) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.content}>{children}</View>
      {footer && <Text style={styles.footer}>{footer}</Text>}
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  content: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  footer: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textTertiary,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    lineHeight: 18,
  },
}))

export type { SettingsSectionProps }
