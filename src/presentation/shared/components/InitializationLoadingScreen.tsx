import React, { useEffect } from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated'
import { SymbolView } from 'expo-symbols'

/**
 * Heartbeat Icon Component
 * V-shaped SF Symbol with heartbeat animation
 */
const HeartbeatIcon: React.FC = () => {
  const scale = useSharedValue(1)

  useEffect(() => {
    // Heartbeat sequence: beat -> pause -> beat -> rest
    scale.value = withRepeat(
      withSequence(
        // First beat
        withTiming(1.2, { duration: 200 }),
        withTiming(1.0, { duration: 200 }),
        // Brief pause
        withDelay(100, withTiming(1.0, { duration: 0 })),
        // Second beat
        withTiming(1.2, { duration: 200 }),
        withTiming(1.0, { duration: 200 }),
        // Longer rest
        withDelay(800, withTiming(1.0, { duration: 0 }))
      ),
      -1, // Infinite repeat
      false
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={animatedStyle}>
      <SymbolView
        name="chevron.down"
        size={100}
        type="hierarchical"
        tintColor="#8B5CF6"
        animationSpec={{
          effect: {
            type: 'pulse',
          },
        }}
        fallback={
          <View style={styles.fallbackIcon}>
            <View style={styles.chevronLeft} />
            <View style={styles.chevronRight} />
          </View>
        }
      />
    </Animated.View>
  )
}

/**
 * Initialization Loading Screen
 *
 * Minimal, professional loading screen with:
 * - V-shaped SF Symbol icon (chevron.down)
 * - Heartbeat animation (scale pulse)
 * - Centered layout
 * - Clean design
 */
export const InitializationLoadingScreen: React.FC = observer(() => {
  return (
    <View style={styles.container}>
      <HeartbeatIcon />
    </View>
  )
})

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  // Fallback chevron for non-iOS platforms
  fallbackIcon: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  chevronLeft: {
    width: 0,
    height: 0,
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderTopWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: theme.colors.primary,
    transform: [{ rotate: '45deg' }],
    marginRight: -10,
  },
  chevronRight: {
    width: 0,
    height: 0,
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderTopWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: theme.colors.primary,
    transform: [{ rotate: '-45deg' }],
    marginLeft: -10,
  },
}))