import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native-unistyles'

interface SkeletonProps {
  readonly width?: number | string
  readonly height: number
  readonly borderRadius?: number
  readonly style?: any
}

/**
 * Skeleton loading component with shimmer animation
 * Used for optimistic UI while content loads
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height,
  borderRadius,
  style,
}) => {
  const shimmer = useSharedValue(0)

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false
    )
  }, [shimmer])

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      shimmer.value,
      [0, 0.5, 1],
      [0.3, 0.6, 0.3]
    )

    return {
      opacity,
    }
  })

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Animated.View style={[styles.shimmer, animatedStyle]} />
    </View>
  )
}

/**
 * Skeleton for text lines
 */
interface SkeletonTextProps {
  readonly lines?: number
  readonly lastLineWidth?: string
  readonly lineHeight?: number
  readonly gap?: number
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 1,
  lastLineWidth = '70%',
  lineHeight = 16,
  gap = 8,
}) => {
  return (
    <View style={{ gap }}>
      {Array.from({ length: lines }).map((_, index) => {
        const isLastLine = index === lines - 1
        const width = isLastLine && lines > 1 ? lastLineWidth : '100%'
        
        return (
          <Skeleton
            key={index}
            width={width}
            height={lineHeight}
            borderRadius={4}
          />
        )
      })}
    </View>
  )
}

/**
 * Skeleton for circular elements (avatars, profile pics)
 */
interface SkeletonCircleProps {
  readonly size: number
}

export const SkeletonCircle: React.FC<SkeletonCircleProps> = ({ size }) => {
  return (
    <Skeleton
      width={size}
      height={size}
      borderRadius={size / 2}
    />
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.backgroundSecondary,
    overflow: 'hidden',
  },
  shimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.backgroundTertiary,
  },
}))
