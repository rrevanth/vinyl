import React from 'react'
import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface BadgeProps {
  label: string
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

export const Badge: React.FC<BadgeProps> = observer(({
  label,
  variant = 'primary',
  size = 'md',
}) => {

  return (
    <View style={stylesheet.badge(variant, size)}>
      <Text style={stylesheet.text(size)} numberOfLines={1}>
        {label}
      </Text>
    </View>
  )
})

const stylesheet = StyleSheet.create((theme) => ({
  badge: (variant: string, size: string) => ({
    backgroundColor:
      variant === 'primary' ? theme.colors.primary :
      variant === 'secondary' ? theme.colors.secondary :
      variant === 'success' ? theme.colors.success :
      variant === 'warning' ? theme.colors.warning :
      variant === 'error' ? theme.colors.error :
      variant === 'info' ? theme.colors.info :
      theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: size === 'sm' ? 4 : size === 'lg' ? 8 : 6,
    paddingHorizontal: size === 'sm' ? theme.spacing.sm : size === 'lg' ? theme.spacing.lg : theme.spacing.md,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  }),
  text: (size: string) => ({
    color: '#FFFFFF',
    fontSize: size === 'sm' ? theme.fontSize.xs : size === 'lg' ? theme.fontSize.base : theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  }),
}))
