import type { FC } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export interface RatingBadgeProps {
  readonly rating: string
  readonly variant?: 'outlined' | 'filled'
  readonly size?: 'sm' | 'md'
}

export const RatingBadge: FC<RatingBadgeProps> = ({
  rating,
  variant = 'outlined',
  size = 'sm',
}) => {
  return (
    <View style={stylesheet.badge(variant, size)}>
      <Text style={stylesheet.text(size)}>{rating}</Text>
    </View>
  )
}

const stylesheet = StyleSheet.create((theme) => ({
  badge: (variant: 'outlined' | 'filled', size: 'sm' | 'md') => ({
    borderRadius: theme.borderRadius.full,
    borderWidth: 1.5,
    alignSelf: 'flex-start',
    backgroundColor: variant === 'outlined' ? 'transparent' : theme.colors.imageOverlay,
    borderColor: theme.colors.imageText,
    paddingHorizontal: size === 'sm' ? 8 : 12,
    paddingVertical: size === 'sm' ? 4 : 6,
  }),
  text: (size: 'sm' | 'md') => ({
    color: theme.colors.imageText,
    fontWeight: theme.fontWeight.bold,
    textTransform: 'uppercase',
    fontSize: size === 'sm' ? 10 : 12,
  }),
}))
