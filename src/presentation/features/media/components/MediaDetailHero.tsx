import type { FC } from 'react'
import { memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
  type SharedValue,
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'
import type { Media } from '@/src/domain/entities/Media'

interface MediaDetailHeroProps {
  readonly media: Media
  readonly height?: number
  readonly scrollY?: SharedValue<number>
  readonly onPlay?: () => void
  readonly tagline?: string
  readonly genres?: string[]
  readonly certification?: string
  readonly runtime?: number
  readonly voteAverage?: number
  readonly voteCount?: number
}

// Animation constants
const SCALE_ZOOM_IN = 1.0
const SCALE_ZOOM_OUT = 0.85
const OPACITY_VISIBLE = 1.0
const OPACITY_FADED = 0.3
const FADE_THRESHOLD = 200
const ZOOM_THRESHOLD = 300
const PARALLAX_DISTANCE = 50

const MediaDetailHeroComponent: FC<MediaDetailHeroProps> = ({
  media,
  height = 600,
  scrollY,
  onPlay,
  tagline,
  genres = [],
  certification,
  runtime,
  voteAverage,
  voteCount,
}) => {
  const imageUrl = media.images.getBestBackdrop() ?? media.images.getBestPoster()
  const hasLogo = !!media.images.logo

  // Parallax animation for image (zoom out + fade)
  const imageAnimatedStyle = useAnimatedStyle(() => {
    'worklet'

    if (!scrollY) {
      return {
        transform: [{ scale: SCALE_ZOOM_IN }],
        opacity: OPACITY_VISIBLE,
      }
    }

    // Zoom out effect: Scale from 1.0 to 0.85
    const scale = interpolate(
      scrollY.value,
      [0, ZOOM_THRESHOLD],
      [SCALE_ZOOM_IN, SCALE_ZOOM_OUT],
      Extrapolate.CLAMP
    )

    // Fade effect: Opacity from 1.0 to 0.3
    const opacity = interpolate(
      scrollY.value,
      [0, FADE_THRESHOLD],
      [OPACITY_VISIBLE, OPACITY_FADED],
      Extrapolate.CLAMP
    )

    // Parallax translateY: Move up slower than scroll
    const translateY = interpolate(
      scrollY.value,
      [0, ZOOM_THRESHOLD],
      [0, -PARALLAX_DISTANCE],
      Extrapolate.CLAMP
    )

    return {
      transform: [{ scale }, { translateY }],
      opacity,
    }
  })

  // Parallax animation for content (slide up + fade)
  const contentAnimatedStyle = useAnimatedStyle(() => {
    'worklet'

    if (!scrollY) {
      return {
        transform: [{ translateY: 0 }],
        opacity: 1,
      }
    }

    // Slide up faster than scroll for dramatic effect
    const translateY = interpolate(
      scrollY.value,
      [0, 150],
      [0, -80],
      Extrapolate.CLAMP
    )

    // Fade out
    const opacity = interpolate(
      scrollY.value,
      [0, 150],
      [1, 0],
      Extrapolate.CLAMP
    )

    return {
      transform: [{ translateY }],
      opacity,
    }
  })

  // Build metadata
  const metadata: string[] = []
  if (media.year) metadata.push(media.year.toString())
  if (certification) metadata.push(certification)
  if (runtime) {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    if (hours > 0) {
      metadata.push(minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`)
    } else {
      metadata.push(`${minutes}m`)
    }
  }

  const metadataText = metadata.join(' • ')
  const genresText = genres.slice(0, 3).join(', ')

  return (
    <View style={[styles.container, { height }]}>
      {/* Background Image with Parallax */}
      <Animated.View style={[styles.imageContainer, imageAnimatedStyle]}>
        {imageUrl ? (
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image} 
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={200}
          />
        ) : (
          <View style={styles.placeholder} />
        )}
      </Animated.View>

      {/* Gradient Overlay */}
      <LinearGradient
        colors={[
          'transparent',
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.6)',
          'rgba(0,0,0,0.85)',
          'rgba(0,0,0,0.98)',
        ]}
        locations={[0, 0.2, 0.5, 0.75, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
        pointerEvents="none"
      />

      {/* Content with Parallax */}
      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        {hasLogo && media.images.logo ? (
          <Image 
            source={{ uri: media.images.logo }} 
            style={styles.logo} 
            contentFit="contain"
            cachePolicy="memory-disk"
            transition={200}
          />
        ) : (
          <Text style={styles.title} numberOfLines={2}>
            {media.title}
          </Text>
        )}

        {tagline ? <Text style={styles.tagline} numberOfLines={2}>{tagline}</Text> : null}

        {metadataText ? <Text style={styles.metadata}>{metadataText}</Text> : null}

        {genresText ? <Text style={styles.genres}>{genresText}</Text> : null}

        {voteAverage && voteAverage > 0 ? (
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={16} color="#FFC107" />
              <Text style={styles.ratingText}>{voteAverage.toFixed(1)}</Text>
            </View>
            {voteCount && voteCount > 0 ? (
              <Text style={styles.voteCount}>
                {voteCount.toLocaleString()} votes
              </Text>
            ) : null}
          </View>
        ) : null}

        {onPlay ? (
          <Pressable
            style={({ pressed }) => [styles.playButton, pressed && styles.playButtonPressed]}
            onPress={onPlay}
            accessibilityRole="button"
            accessibilityLabel="Play"
          >
            <Ionicons name="play" size={24} color="#000000" />
            <Text style={styles.playButtonText}>Play</Text>
          </Pressable>
        ) : null}
      </Animated.View>
    </View>
  )
}

export const MediaDetailHero = memo(MediaDetailHeroComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: theme.spacing.xl,
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
    backgroundColor: theme.colors.backgroundTertiary,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['3xl'],
    paddingTop: theme.spacing.xl,
    gap: theme.spacing.sm,
    alignItems: 'flex-start',
  },
  logo: {
    width: 240,
    height: 100,
    alignSelf: 'flex-start',
  },
  title: {
    color: '#FFFFFF',
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    textAlign: 'left',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  tagline: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: theme.fontSize.base,
    fontStyle: 'italic',
    textAlign: 'left',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  metadata: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  genres: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: theme.fontSize.sm,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.bold,
  },
  voteCount: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: theme.fontSize.sm,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    marginTop: theme.spacing.sm,
  },
  playButtonPressed: {
    opacity: 0.8,
  },
  playButtonText: {
    color: '#000000',
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
}))
