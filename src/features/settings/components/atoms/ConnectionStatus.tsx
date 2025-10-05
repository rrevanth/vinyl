import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface ConnectionStatusProps {
  status: 'connected' | 'validating' | 'error' | 'disconnected'
  message?: string
}

export const ConnectionStatus = observer<ConnectionStatusProps>(({ status, message }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return styles.statusConnected
      case 'validating':
        return styles.statusValidating
      case 'error':
        return styles.statusError
      case 'disconnected':
        return styles.statusDisconnected
      default:
        return styles.statusDisconnected
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Connected'
      case 'validating':
        return 'Validating...'
      case 'error':
        return 'Connection Error'
      case 'disconnected':
        return 'Not Configured'
      default:
        return 'Unknown'
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusRow}>
        <View style={[styles.statusDot, getStatusColor()]} />
        <Text style={styles.statusText}>{getStatusText()}</Text>
      </View>
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  )
})

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusConnected: {
    backgroundColor: '#10B981', // green
  },
  statusValidating: {
    backgroundColor: '#F59E0B', // yellow/orange
  },
  statusError: {
    backgroundColor: '#EF4444', // red
  },
  statusDisconnected: {
    backgroundColor: theme.colors.border, // gray
  },
  statusText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  message: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
}))

export type { ConnectionStatusProps }