import type { FC } from 'react'
import { memo } from 'react'
import { Image, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
  type SharedValue,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native-unistyles'
import type { Media } from '@/src/domain/entities/Media'

interface ParallaxHeroProps {
  readonly media: Media
  readonly height?: number
  readonly scrollY?: SharedValue<number>
}

// Animation constants inspired by Nuvio implementation
const SCALE_ZOOM_IN = 1.0
const SCALE_ZOOM_OUT = 0.85
const OPACITY_VISIBLE = 1.0
const OPACITY_FADED = 0.3
const FADE_THRESHOLD = 200
const PARALLAX_DISTANCE = 50

/**
 * Parallax hero component with cinematic zoom-out effect
 * Uses React Native Reanimated for smooth 60fps animations
 *
 * Features:
 * - Zoom-out effect: Scale from 1.0 to 0.85 as user scrolls
 * - Fade effect: Opacity from 1.0 to 0.3 for smooth transition
 * - Parallax translateY: Image moves up slower than scroll
 * - Gradient overlay: Always visible for text readability
 */
const ParallaxHeroComponent: FC<ParallaxHeroProps> = ({
  media,
  height = 500,
  scrollY,
}) => {
  // Get best available backdrop image
  const backdropUrl = media.images.getBestBackdrop()

  // Cinematic animated style for zoom-out parallax effect
  const animatedImageStyle = useAnimatedStyle(() => {
    'worklet'

    // If no scrollY provided, return static style
    if (!scrollY) {
      return {
        transform: [{ scale: SCALE_ZOOM_IN }],
        opacity: OPACITY_VISIBLE,
      }
    }

    // Zoom-out effect: Scale from 1.0 to 0.85 (300px range)
    const scale = interpolate(
      scrollY.value,
      [0, 300],
      [SCALE_ZOOM_IN, SCALE_ZOOM_OUT],
      Extrapolate.CLAMP
    )

    // Fade effect: Opacity from 1.0 to 0.3 (200px range)
    const opacity = interpolate(
      scrollY.value,
      [0, FADE_THRESHOLD],
      [OPACITY_VISIBLE, OPACITY_FADED],
      Extrapolate.CLAMP
    )

    // Parallax translateY: Move up slower than scroll
    const translateY = interpolate(
      scrollY.value,
      [0, 300],
      [0, -PARALLAX_DISTANCE],
      Extrapolate.CLAMP
    )

    return {
      transform: [{ scale }, { translateY }],
      opacity,
    }
  })

  // Gradient overlay remains visible at constant opacity
  const gradientStyle = useAnimatedStyle(() => ({
    opacity: 1, // Always visible for text contrast
  }))

  return (
    <View style={[styles.container, { height }]}>
      {/* Parallax Image with Cinematic Zoom-out */}
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

      {/* Gradient Overlay - Always Visible */}
      <Animated.View style={[styles.gradientContainer, gradientStyle]}>
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