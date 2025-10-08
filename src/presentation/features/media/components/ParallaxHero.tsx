import type { FC } from 'react'
import { memo } from 'react'
import { Image, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native-unistyles'
import type { Media } from '@/src/domain/entities/Media'

interface ParallaxHeroProps {
  readonly media: Media
  readonly height?: number
  readonly onScroll?: (scrollY: number) => void
}

const PARALLAX_FACTOR = 0.5 // How much the image moves relative to scroll

/**
 * Parallax hero component with gradient overlay
 * Uses React Native Reanimated for smooth 60fps animations
 */
const ParallaxHeroComponent: FC<ParallaxHeroProps> = ({
  media,
  height = 500,
  onScroll,
}) => {
  const scrollY = useSharedValue(0)

  // Get best available backdrop image
  const backdropUrl = media.images.getBestBackdrop()

  // Animated style for parallax effect
  const animatedImageStyle = useAnimatedStyle(() => {
    // Interpolate scroll position to image transform
    const translateY = interpolate(
      scrollY.value,
      [0, height],
      [0, height * PARALLAX_FACTOR],
      'clamp'
    )

    // Scale up slightly for a more dramatic effect
    const scale = interpolate(
      scrollY.value,
      [-height, 0, height],
      [1.3, 1, 0.85],
      'clamp'
    )

    return {
      transform: [{ translateY }, { scale }],
    }
  })

  // Animated style for gradient overlay opacity
  const animatedGradientStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, height * 0.5], [1, 0.7], 'clamp')

    return {
      opacity,
    }
  })

  return (
    <View style={[styles.container, { height }]}>
      {/* Parallax Image */}
      <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
        {backdropUrl ? (
          <Image
            source={{ uri: backdropUrl }}
            style={styles.image}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        ) : (
          <View style={styles.placeholder} />
        )}
      </Animated.View>

      {/* Gradient Overlay */}
      <Animated.View style={[styles.gradientContainer, animatedGradientStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.9)']}
          locations={[0, 0.5, 1]}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  )
}

export const ParallaxHero = memo(ParallaxHeroComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.surface,
  },
  gradientContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80%',
  },
  gradient: {
    flex: 1,
  },
}))