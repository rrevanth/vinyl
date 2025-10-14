import { memo, useEffect, type FC } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native-unistyles'

interface HeroPaginationIndicatorProps {
  readonly isActive: boolean
  readonly scale?: number
  readonly duration?: number
}

export const HeroPaginationIndicator: FC<HeroPaginationIndicatorProps> = memo(
  ({ isActive, scale = 1, duration = 4000 }) => {
    const progress = useSharedValue(0)

    useEffect(() => {
      if (isActive) {
        // Reset to 0 first
        progress.value = 0
        // Animate to 100% over duration
        progress.value = withTiming(1, {
          duration,
        })
      } else {
        // Reset immediately when not active
        progress.value = 0
      }
    }, [isActive, duration, progress])

    const animatedStyle = useAnimatedStyle(() => ({
      width: `${progress.value * 100}%`,
    }))

    if (isActive) {
      // Active state: bar with fill animation
      return (
        <View
          style={styles.barContainer(scale)}
          accessibilityRole="progressbar"
          accessibilityLabel="Hero carousel progress"
        >
          <Animated.View style={[styles.fill, animatedStyle]} />
        </View>
      )
    }

    // Inactive state: dot
    return (
      <View
        style={styles.dot(scale)}
        accessibilityRole="button"
        accessibilityLabel="Hero carousel indicator"
      />
    )
  }
)

HeroPaginationIndicator.displayName = 'HeroPaginationIndicator'

const styles = StyleSheet.create((theme) => ({
  dot: (scale: number) => ({
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ scale }],
  }),
  barContainer: (scale: number) => ({
    width: 24,
    height: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Track
    borderRadius: 7,
    overflow: 'hidden',
    transform: [{ scale }],
  }),
  fill: {
    height: '100%',
    backgroundColor: theme.colors.imageText, // Solid white fill
    borderRadius: 7,
  },
}))
