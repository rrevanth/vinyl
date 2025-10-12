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
    padding: theme.spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing['2xl'],
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: theme.colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  title: {
    fontSize: theme.fontSize['2xl'],
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  message: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.fontSize.base * 1.6,
    maxWidth: 400,
  },
}))
