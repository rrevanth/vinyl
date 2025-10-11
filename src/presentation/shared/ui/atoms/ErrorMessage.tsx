import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'
import { observer } from '@legendapp/state/react'

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
  retryLabel?: string
  fullScreen?: boolean
}

export const ErrorMessage: React.FC<ErrorMessageProps> = observer(({
  title = 'Error',
  message,
  onRetry,
  retryLabel = 'Try Again',
  fullScreen = false,
}) => {
  const { theme } = useUnistyles()

  return (
    <View style={fullScreen ? stylesheet.fullScreenContainer : stylesheet.container}>
      <Ionicons name="alert-circle" size={48} color={theme.colors.error} />
      <Text style={stylesheet.title}>{title}</Text>
      <Text style={stylesheet.message}>{message}</Text>
      {onRetry && (
        <Pressable
          style={({ pressed }) => [
            stylesheet.retryButton,
            pressed && stylesheet.retryButtonPressed,
          ]}
          onPress={onRetry}
          accessibilityRole="button"
          accessibilityLabel={retryLabel}
        >
          <Text style={stylesheet.retryButtonText}>{retryLabel}</Text>
        </Pressable>
      )}
    </View>
  )
})

const stylesheet = StyleSheet.create((theme) => ({
  container: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.error,
    textAlign: 'center',
  },
  message: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.fontSize.base * 1.5,
  },
  retryButton: {
    marginTop: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    minWidth: 120,
    alignItems: 'center',
  },
  retryButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  retryButtonText: {
    color: theme.colors.background,
    fontSize: theme.fontSize.base,
    fontWeight: '600',
  },
}))
