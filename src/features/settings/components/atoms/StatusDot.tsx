import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface StatusDotProps {
  status: 'connected' | 'warning' | 'error' | 'disabled'
  size?: 'sm' | 'md'
}

/**
 * Small status indicator dot
 * Used for inline status on cards
 */
export const StatusDot = observer<StatusDotProps>(({ status, size = 'sm' }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return styles.statusConnected
      case 'warning':
        return styles.statusWarning
      case 'error':
        return styles.statusError
      case 'disabled':
        return styles.statusDisabled
      default:
        return styles.statusDisabled
    }
  }

  const getSizeStyle = () => {
    return size === 'sm' ? styles.dotSmall : styles.dotMedium
  }

  return <View style={[styles.dot, getSizeStyle(), getStatusColor()]} />
})

const styles = StyleSheet.create((theme) => ({
  dot: {
    borderRadius: 999, // Fully round
  },
  dotSmall: {
    width: 8,
    height: 8,
  },
  dotMedium: {
    width: 12,
    height: 12,
  },
  statusConnected: {
    backgroundColor: theme.colors.success,
  },
  statusWarning: {
    backgroundColor: theme.colors.warning,
  },
  statusError: {
    backgroundColor: theme.colors.error,
  },
  statusDisabled: {
    backgroundColor: theme.colors.border,
  },
}))

export type { StatusDotProps }
