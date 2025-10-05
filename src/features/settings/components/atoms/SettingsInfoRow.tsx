import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface SettingsInfoRowProps {
  title: string
  value: string
  isLast?: boolean
}

export const SettingsInfoRow = observer<SettingsInfoRowProps>(
  ({ title, value, isLast = false }) => {
    return (
      <View style={[styles.container, !isLast && styles.separator]}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
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
  title: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    flex: 1,
  },
  value: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'right',
  },
}))

export type { SettingsInfoRowProps }