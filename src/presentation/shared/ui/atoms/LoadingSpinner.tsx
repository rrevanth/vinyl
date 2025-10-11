import React from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface LoadingSpinnerProps {
  size?: 'small' | 'large'
  message?: string
  fullScreen?: boolean
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = observer(({
  size = 'large',
  message,
  fullScreen = false,
}) => {
  const { theme } = useUnistyles()

  return (
    <View style={fullScreen ? stylesheet.fullScreenContainer : stylesheet.container}>
      <ActivityIndicator size={size} color={theme.colors.primary} />
      {message && (
        <Text style={stylesheet.message}>{message}</Text>
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
  },
  message: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
}))
