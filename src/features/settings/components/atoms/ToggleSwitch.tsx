import { Pressable } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated'
import { useEffect } from 'react'

interface ToggleSwitchProps {
  value: boolean
  onValueChange: (value: boolean) => void
  disabled?: boolean
  accessibilityLabel?: string
}

export const ToggleSwitch = observer<ToggleSwitchProps>(
  ({ value, onValueChange, disabled = false, accessibilityLabel }) => {
    const animationValue = useSharedValue(value ? 1 : 0)

    useEffect(() => {
      animationValue.value = withTiming(value ? 1 : 0, { duration: 200 })
    }, [value, animationValue])

    const trackStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        animationValue.value,
        [0, 1],
        ['#E5E7EB', '#5B21B6'] // gray-200 to primary
      )

      return {
        backgroundColor: disabled ? '#F3F4F6' : backgroundColor,
      }
    })

    const thumbStyle = useAnimatedStyle(() => {
      const translateX = interpolate(animationValue.value, [0, 1], [2, 22])

      return {
        transform: [{ translateX }],
      }
    })

    const handlePress = () => {
      if (!disabled) {
        onValueChange(!value)
      }
    }

    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={[styles.container, disabled && styles.containerDisabled]}
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled }}
        accessibilityLabel={accessibilityLabel}
      >
        <Animated.View style={[styles.track, trackStyle]}>
          <Animated.View style={[styles.thumb, thumbStyle]} />
        </Animated.View>
      </Pressable>
    )
  }
)

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: theme.spacing.xs,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    position: 'relative',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
}))

export type { ToggleSwitchProps }
