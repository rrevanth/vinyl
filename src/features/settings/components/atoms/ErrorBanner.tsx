import { View, Text, Pressable } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'

interface ErrorBannerProps {
  message: string
  onDismiss?: () => void
  onRetry?: () => void
  retryLabel?: string
}

export const ErrorBanner = observer<ErrorBannerProps>(({
  message,
  onDismiss,
  onRetry,
  retryLabel = 'Retry',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainRow}>
        <Ionicons name="alert-circle" size={20} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.message}>{message}</Text>
        {onDismiss && (
          <Pressable
            onPress={onDismiss}
            style={styles.dismissButton}
            accessibilityRole="button"
            accessibilityLabel="Dismiss error"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close" size={20} color="#FFFFFF" />
          </Pressable>
        )}
      </View>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          style={styles.retryButton}
          accessibilityRole="button"
          accessibilityLabel={retryLabel}
        >
          <Text style={styles.retryText}>{retryLabel}</Text>
        </Pressable>
      )}
    </View>
  )
})

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: '#EF4444', // red-500
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  message: {
    flex: 1,
    fontSize: theme.fontSize.base,
    color: '#FFFFFF',
    fontWeight: theme.fontWeight.medium,
  },
  dismissButton: {
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.xs,
  },
  retryButton: {
    marginTop: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    alignSelf: 'flex-start',
  },
  retryText: {
    fontSize: theme.fontSize.sm,
    color: '#FFFFFF',
    fontWeight: theme.fontWeight.semibold,
  },
}))

export type { ErrorBannerProps }
