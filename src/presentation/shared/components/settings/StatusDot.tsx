import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export type StatusType = 'connected' | 'warning' | 'error' | 'loading'

interface StatusDotProps {
  status: StatusType
  size?: 'small' | 'medium' | 'large'
}

export function StatusDot({ status, size = 'medium' }: StatusDotProps) {
  return <View style={[styles.dot, styles[size], styles[status]]} />
}

const styles = StyleSheet.create((theme) => ({
  dot: {
    borderRadius: theme.borderRadius.full,
  },

  // Sizes - theme-agnostic spacing
  small: {
    width: theme.spacing[2],
    height: theme.spacing[2],
  },
  medium: {
    width: theme.spacing[3],
    height: theme.spacing[3],
  },
  large: {
    width: theme.spacing[4],
    height: theme.spacing[4],
  },

  // Status colors - semantic theme colors
  connected: {
    backgroundColor: theme.colors.success,
  },
  warning: {
    backgroundColor: theme.colors.warning,
  },
  error: {
    backgroundColor: theme.colors.error,
  },
  loading: {
    backgroundColor: theme.colors.textTertiary,
  },
}))
