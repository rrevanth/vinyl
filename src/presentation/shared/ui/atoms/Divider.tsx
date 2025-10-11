import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
}

export const Divider: React.FC<DividerProps> = observer(({
  orientation = 'horizontal',
  spacing = 'md',
}) => {

  return (
    <View style={stylesheet.container(orientation, spacing)}>
      <View style={stylesheet.line(orientation)} />
    </View>
  )
})

const stylesheet = StyleSheet.create((theme) => ({
  container: (orientation: string, spacing: string) => ({
    ...(orientation === 'horizontal' ? {
      paddingVertical:
        spacing === 'none' ? 0 :
        spacing === 'sm' ? theme.spacing.xs :
        spacing === 'lg' ? theme.spacing.lg :
        theme.spacing.md,
    } : {
      paddingHorizontal:
        spacing === 'none' ? 0 :
        spacing === 'sm' ? theme.spacing.xs :
        spacing === 'lg' ? theme.spacing.lg :
        theme.spacing.md,
    }),
  }),
  line: (orientation: string) => ({
    backgroundColor: theme.colors.border,
    ...(orientation === 'horizontal' ? {
      height: 1,
      width: '100%',
    } : {
      width: 1,
      height: '100%',
    }),
  }),
}))
