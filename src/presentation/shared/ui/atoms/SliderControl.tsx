import React from 'react'
import { View, Text } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import Slider from '@react-native-community/slider'

interface SliderControlProps {
  readonly value: number
  readonly onValueChange: (value: number) => void
  readonly minimumValue: number
  readonly maximumValue: number
  readonly step?: number
  readonly label: string
  readonly formatValue?: (value: number) => string
  readonly accessibilityLabel: string
}

export const SliderControl: React.FC<SliderControlProps> = observer(({
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  step = 1,
  label,
  formatValue,
  accessibilityLabel,
}) => {
  const { theme } = useUnistyles()

  const displayValue = formatValue ? formatValue(value) : value.toString()

  return (
    <View style={stylesheet.container}>
      <View style={stylesheet.header}>
        <Text style={stylesheet.label}>{label}</Text>
        <Text style={stylesheet.value}>{displayValue}</Text>
      </View>
      <Slider
        style={stylesheet.slider}
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.border}
        thumbTintColor={theme.colors.primary}
        accessibilityLabel={accessibilityLabel}
        accessibilityValue={{ text: displayValue }}
      />
    </View>
  )
})

const stylesheet = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
}))
