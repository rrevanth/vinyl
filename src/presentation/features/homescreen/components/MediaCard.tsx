import type { Media } from '@/src/domain/entities/Media'
import { observer } from '@legendapp/state/react'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import type { FC } from 'react'
import { Fragment, memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

interface MediaCardProps {
  readonly media?: Media
  readonly variant?: 'poster' | 'top10' | 'landscape' | 'square' | 'wide'
  readonly position?: number
  readonly subtext?: string
  readonly showTitle?: boolean
  readonly showMetadata?: boolean
  readonly showDescription?: boolean
  readonly onPress?: (media: Media) => void
  readonly testID?: string
  readonly style?: StyleProp<ViewStyle>
}

const MediaCardComponent: FC<MediaCardProps> = ({
  media,
  variant = 'poster',
  position,
  subtext,
  showTitle = false,
  showMetadata = false,
  showDescription = false,
  onPress,
  testID,
  style,
}) => {
  // Return null if no media provided
  if (!media) {
    return null
  }

  // Get appropriate image based on variant
  const image =
    variant === 'poster' || variant === 'top10'
      ? media.images.getBestPoster()
      : media.images.getBestBackdrop() || media.images.getBestPoster()

  // Format metadata
  const genres = (media as any).genres?.slice(0, 2).map((g: any) => g.name).join(', ')
  const rating = (media as any).certification || (media as any).voteAverage?.toFixed(1)
  const metadataParts = [media.year, rating, genres].filter(Boolean)
  const metadata = metadataParts.join(' • ')

  // Build accessibility label
  const accessibilityLabel = variant === 'top10' && position
    ? `Number ${position}, ${media.title}`
    : media.title

  // Apply variants to styles
  styles.useVariants({ variant })

  // Special rendering for top10 variant with dramatic number behind card
  if (variant === 'top10' && position !== undefined) {
    return (
      <Fragment>
        <View style={styles.top10Container}>
          {/* Rank number behind with dramatic glow */}
          <Text style={styles.top10NumberBehind}>{position}</Text>

          {/* Card on top */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            onPress={() => onPress?.(media)}
            style={({ pressed }) => [styles.top10Card, pressed && styles.pressed]}
            testID={testID}
          >
            <Image
              source={{ uri: image }}
              style={styles.image}
              contentFit="cover"
              transition={200}
            />
          </Pressable>
        </View>

        {/* External title like poster variant */}
        {showTitle && (
          <View style={styles.externalTitleContainer}>
            <Text style={styles.externalTitle} numberOfLines={2}>
              {media.title}
            </Text>
          </View>
        )}
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={() => onPress?.(media)}
        style={({ pressed }) => [styles.container, style, pressed && styles.pressed]}
        testID={testID}
      >
        <Image
          source={{ uri: image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />

        {/* Gradient overlay for variants with overlay content */}
        {(variant === 'landscape' || variant === 'square' || variant === 'wide') && (
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.85)']}
            style={styles.gradient}
          />
        )}

        {variant === 'landscape' && (
          <View style={styles.landscapeOverlay}>
            <Text style={styles.overlayTitle} numberOfLines={1}>
              {media.title}
            </Text>
            {showMetadata && metadata && (
              <Text style={styles.overlayMetadata} numberOfLines={1}>
                {metadata}
              </Text>
            )}
            {showDescription && (media as any).overview && (
              <Text style={styles.overlayDescription} numberOfLines={2}>
                {(media as any).overview}
              </Text>
            )}
          </View>
        )}

        {variant === 'square' && (
          <View style={styles.squareOverlay}>
            <Text style={styles.overlayTitle} numberOfLines={1}>
              {media.title}
            </Text>
            {showMetadata && metadata && (
              <Text style={styles.overlayMetadata} numberOfLines={1}>
                {metadata}
              </Text>
            )}
            {showDescription && (media as any).overview && (
              <Text style={styles.overlayDescription} numberOfLines={1}>
                {(media as any).overview}
              </Text>
            )}
          </View>
        )}

        {variant === 'wide' && (
          <View style={styles.wideOverlay}>
            <Text style={styles.overlayTitle} numberOfLines={1}>
              {media.title}
            </Text>
            {showMetadata && metadata && (
              <Text style={styles.overlayMetadata} numberOfLines={1}>
                {metadata}
              </Text>
            )}
            {subtext && (
              <Text style={styles.overlaySubtext} numberOfLines={1}>
                {subtext}
              </Text>
            )}
          </View>
        )}
      </Pressable>

      {/* External title for poster variant */}
      {variant === 'poster' && showTitle && (
        <View style={styles.externalTitleContainer}>
          <Text style={styles.externalTitle} numberOfLines={2}>
            {media.title}
          </Text>
        </View>
      )}
    </Fragment>
  )
}

export const MediaCard = memo(observer(MediaCardComponent))

const styles = StyleSheet.create((theme) => ({
  container: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    variants: {
      variant: {
        poster: {
          width: 152,
          height: 228,
        },
        top10: {
          width: 170,
          height: 255,
        },
        landscape: {
          width: 300,
          height: 169,
        },
        square: {
          width: 340,
          height: 340,
          borderRadius: theme.borderRadius.xl,
        },
        wide: {
          width: 280,
          height: 210,
        },
      },
    },
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    variants: {
      variant: {
        poster: {
          height: 0,
        },
        top10: {
          height: '40%',
        },
        landscape: {
          height: '60%',
        },
        square: {
          height: '50%',
        },
        wide: {
          height: '40%',
        },
      },
    },
  },
  // Top10 dramatic layout with number behind
  top10Container: {
    width: 230,
    height: 255,
    position: 'relative',
  },
  top10NumberBehind: {
    position: 'absolute',
    left: -45,
    top: 0,
    fontSize: 200,
    fontWeight: '800',
    color: theme.colors.text,
    opacity: 0.25,
    zIndex: 0,
    textShadowColor: theme.colors.background,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  top10Card: {
    width: 170,
    height: 255,
    marginLeft: 35,
    zIndex: 1,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  // Overlay containers
  landscapeOverlay: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    gap: 4,
  },
  squareOverlay: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    gap: 4,
  },
  wideOverlay: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    gap: 4,
  },
  // Overlay text styles
  overlayTitle: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  overlayMetadata: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  overlayDescription: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  overlaySubtext: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  // External title (poster variant)
  externalTitleContainer: {
    marginTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.micro,
  },
  externalTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    fontFamily: theme.fontFamily.primary,
  },
}))
