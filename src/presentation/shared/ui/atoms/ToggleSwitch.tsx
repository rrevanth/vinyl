import React from 'react'
import { View, Text, Switch } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface ToggleSwitchProps {
  readonly value: boolean
  readonly onValueChange: (value: boolean) => void
  readonly label: string
  readonly description?: string
  readonly accessibilityLabel: string
  readonly accessibilityHint?: string
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = observer(({
  value,
  onValueChange,
  label,
  description,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const { theme } = useUnistyles()

  return (
    <View style={stylesheet.container}>
      <View style={stylesheet.textContainer}>
        <Text style={stylesheet.label}>{label}</Text>
        {description && (
          <Text style={stylesheet.description}>{description}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: theme.colors.disabled,
          true: theme.colors.primary,
        }}
        thumbColor={theme.colors.background}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
      />
    </View>
  )
})

const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    minHeight: 44,
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
}))
