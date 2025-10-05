import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { ToggleSwitch } from './ToggleSwitch'

interface SettingsToggleRowProps {
  title: string
  description?: string
  value: boolean
  onValueChange: (value: boolean) => void
  isLast?: boolean
}

export const SettingsToggleRow = observer<SettingsToggleRowProps>(
  ({ title, description, value, onValueChange, isLast = false }) => {
    return (
      <View style={[styles.container, !isLast && styles.separator]}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {description && <Text style={styles.description}>{description}</Text>}
          </View>
          <View style={styles.toggleContainer}>
            <ToggleSwitch
              value={value}
              onValueChange={onValueChange}
              accessibilityLabel={`Toggle ${title}`}
            />
          </View>
        </View>
      </View>
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
  toggleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export type { SettingsToggleRowProps }