import React from 'react'
import { View, Text } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'
import { observer } from '@legendapp/state/react'

type IconName = keyof typeof Ionicons.glyphMap

interface EmptyStateProps {
  icon?: IconName
  title: string
  message?: string
  fullScreen?: boolean
}

export const EmptyState: React.FC<EmptyStateProps> = observer(({
  icon = 'file-tray-outline',
  title,
  message,
  fullScreen = false,
}) => {
  const { theme } = useUnistyles()

  return (
    <View style={fullScreen ? stylesheet.fullScreenContainer : stylesheet.container}>
      <View style={stylesheet.iconContainer}>
        <Ionicons name={icon} size={64} color={theme.colors.textTertiary} />
      </View>
      <Text style={stylesheet.title}>{title}</Text>
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
    paddingHorizontal: theme.spacing.xl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
  },
  message: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.fontSize.base * 1.5,
  },
}))
