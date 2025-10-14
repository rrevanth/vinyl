import type { FC } from 'react'
import { Fragment, memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
  type SharedValue,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'
import type { Media } from '@/src/domain/entities/Media'
import type { EnrichedMedia } from '@/src/domain/entities/EnrichedMedia'
import { t } from '@/src/presentation/shared/i18n'

interface ParallaxHeroWithOverlayProps {
  readonly media: Media
  readonly enrichedData?: EnrichedMedia
  readonly height?: number
  readonly scrollY?: SharedValue<number>
  readonly onPlay?: () => void
  readonly onAddToList?: () => void
  readonly onShare?: () => void
  readonly onInfo?: () => void
  readonly isInList?: boolean
}

// Animation constants inspired by Nuvio implementation
const SCALE_ZOOM_IN = 1.0
const SCALE_ZOOM_OUT = 0.85
const OPACITY_VISIBLE = 1.0
const OPACITY_FADED = 0.3
const FADE_THRESHOLD = 200
const PARALLAX_DISTANCE = 50

/**
 * Rating Badge Component
 * Displays score with color coding based on rating percentage
 */
interface RatingBadgeProps {
  readonly score: number
  readonly maxScore?: number
}

const RatingBadge: FC<RatingBadgeProps> = ({ score, maxScore = 10 }) => {
  // Calculate percentage for color coding
  const percentage = (score / maxScore) * 100
  
  // Color based on score: Red (<40), Yellow (40-70), Green (>70)
  const getColor = () => {
    if (percentage >= 70) return '#4CAF50' // Green
    if (percentage >= 40) return '#FFC107' // Yellow
    return '#F44336' // Red
  }

  return (
    <View style={[ratingStyles.container, { borderColor: getColor() }]}>
      <Text style={[ratingStyles.score, { color: getColor() }]}>
        {score.toFixed(1)}
      </Text>
      <Text style={ratingStyles.maxScore}>/{maxScore}</Text>
    </View>
  )
}

const ratingStyles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1.5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  score: {
    fontSize: 16,
    fontWeight: '700',
  },
  maxScore: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.6)',
    marginLeft: 2,
  },
}))

/**
 * Action Button Component
 * Reusable button for hero actions (Play, Add to List, Share, Info)
 */
interface ActionButtonProps {
  readonly icon: string
  readonly label: string
  readonly onPress: () => void
  readonly variant?: 'primary' | 'secondary'
}

const ActionButton: FC<ActionButtonProps> = ({ icon, label, onPress, variant = 'secondary' }) => {
  const isPrimary = variant === 'primary'
  
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        actionButtonStyles.container,
        isPrimary && actionButtonStyles.primaryContainer,
        pressed && actionButtonStyles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Ionicons 
        name={icon as any} 
        size={isPrimary ? 24 : 20} 
        color={isPrimary ? '#000000' : '#FFFFFF'} 
      />
      {isPrimary && (
        <Text style={actionButtonStyles.primaryLabel}>{label}</Text>
      )}
    </Pressable>
  )
}

const actionButtonStyles = StyleSheet.create((theme) => ({
  container: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  primaryContainer: {
    width: 'auto',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 0,
  },
  primaryLabel: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
}))

/**
 * Enhanced parallax hero with metadata overlay
 * Features:
 * - Cinematic parallax zoom-out effect
 * - Simple gradient overlay for text readability (matching homescreen pattern)
 * - Complete metadata display (title, type/genres, synopsis, metadata)
 * - Integrated action buttons
 * - Expandable synopsis
 */
const ParallaxHeroWithOverlayComponent: FC<ParallaxHeroWithOverlayProps> = ({
  media,
  enrichedData,
  height = 700,
  scrollY,
  onPlay,
  onAddToList,
  onShare,
  onInfo,
  isInList = false,
}) => {
  // Get best available hero image (prefers backdrop, falls back to poster)
  const backdropUrl = media.images.getBestHeroImage()

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

  // Build primary metadata row (Year • Certification • Runtime)
  const primaryMetadata: string[] = []
  if (media.year) {
    primaryMetadata.push(media.year.toString())
  }
  if (enrichedData?.certification) {
    primaryMetadata.push(enrichedData.certification)
  }
  if (enrichedData?.runtime) {
    const hours = Math.floor(enrichedData.runtime / 60)
    const minutes = enrichedData.runtime % 60
    if (hours > 0) {
      primaryMetadata.push(minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`)
    } else {
      primaryMetadata.push(`${minutes}m`)
    }
  }

  // Build genres list (max 3)
  const genresList = enrichedData?.genres?.slice(0, 3).map(g => g.name) || []

  // Get rating score
  const hasRating = enrichedData?.voteAverage && enrichedData.voteAverage > 0

  // Get synopsis
  const synopsis = enrichedData?.overview || enrichedData?.tagline

  return (
    <View style={[styles.container, { height }]}>
      {/* Parallax Image with Cinematic Zoom-out */}
      <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
        {backdropUrl ? (
          <Image
            source={{ uri: backdropUrl }}
            style={styles.image}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
            accessibilityIgnoresInvertColors
          />
        ) : (
          <View style={styles.placeholder} />
        )}
      </Animated.View>

      {/* Bottom Gradient - Full coverage for better text readability */}
      <LinearGradient
        colors={[
          'transparent',
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.6)',
          'rgba(0,0,0,0.85)',
          'rgba(0,0,0,0.98)',
        ]}
        locations={[0, 0.2, 0.5, 0.75, 1]}
        style={styles.bottomGradient}
      />

      {/* Overlay Content - Left-aligned, bottom-positioned */}
      <View style={styles.overlayContent}>
        {/* Logo or Title */}
        {enrichedData?.media.images.logo ? (
          <Image
            source={{ uri: enrichedData.media.images.logo }}
            style={styles.logo}
            contentFit="contain"
            transition={200}
            cachePolicy="memory-disk"
            recyclingKey={media.stableId}
          />
        ) : (
          <Text style={styles.title} numberOfLines={2}>
            {media.title}
          </Text>
        )}

        {/* Primary Metadata Row (Year • Certification • Runtime) */}
        {primaryMetadata.length > 0 && (
          <View style={styles.primaryMetadataRow}>
            {primaryMetadata.map((item, index) => (
              <Fragment key={index}>
                <Text style={styles.metadataText}>{item}</Text>
                {index < primaryMetadata.length - 1 && (
                  <Text style={styles.metadataSeparator}>•</Text>
                )}
              </Fragment>
            ))}
          </View>
        )}

        {/* Genres Row */}
        {genresList.length > 0 && (
          <View style={styles.genresRow}>
            {genresList.map((genre, index) => (
              <Fragment key={index}>
                <Text style={styles.genreText}>{genre}</Text>
                {index < genresList.length - 1 && (
                  <Text style={styles.genreSeparator}>•</Text>
                )}
              </Fragment>
            ))}
          </View>
        )}

        {/* Rating Score */}
        {hasRating && (
          <View style={styles.ratingRow}>
            <RatingBadge score={enrichedData!.voteAverage!} />
            {enrichedData!.voteCount && enrichedData.voteCount > 0 && (
              <Text style={styles.voteCount}>
                {enrichedData.voteCount.toLocaleString()} {t('media_detail.votes')}
              </Text>
            )}
          </View>
        )}

        {/* Synopsis (Fixed 3 lines) */}
        {synopsis && (
          <Text style={styles.synopsis} numberOfLines={3} ellipsizeMode="tail">
            {synopsis}
          </Text>
        )}

        {/* Action Buttons Row */}
        <View style={styles.actionsRow}>
          {onPlay && (
            <ActionButton
              icon="play"
              label={t('media.actions.play')}
              onPress={onPlay}
              variant="primary"
            />
          )}
          {onAddToList && (
            <ActionButton
              icon={isInList ? "checkmark" : "add"}
              label={isInList ? t('media.actions.in_list') : t('media.actions.add_to_list')}
              onPress={onAddToList}
            />
          )}
          {onShare && (
            <ActionButton
              icon="share-outline"
              label={t('media.actions.share')}
              onPress={onShare}
            />
          )}
          {onInfo && (
            <ActionButton
              icon="information-circle-outline"
              label={t('media.actions.info')}
              onPress={onInfo}
            />
          )}
        </View>
      </View>
    </View>
  )
}

export const ParallaxHeroWithOverlay = memo(ParallaxHeroWithOverlayComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: theme.colors.background,
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
  // Bottom gradient covering full height for smooth transition
  bottomGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Content container - bottom-aligned with left alignment (Netflix/Disney+ style)
  overlayContent: {
    position: 'relative',
    zIndex: 10,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start', // Changed from center to flex-start
    paddingHorizontal: theme.spacing.gutter,
    paddingTop: theme.spacing['3xl'],
    paddingBottom: theme.spacing['3xl'],
    gap: theme.spacing.md,
  },
  logo: {
    width: 240,
    height: 100,
    alignSelf: 'flex-start', // Left-align logo
  },
  title: {
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    color: '#FFFFFF',
    lineHeight: theme.fontSize['4xl'] * 1.1,
    textAlign: 'left', // Changed from center
    maxWidth: '85%', // Prevent text from hitting edge
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },
  primaryMetadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  metadataText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  metadataSeparator: {
    fontSize: theme.fontSize.base,
    color: 'rgba(255, 255, 255, 0.6)',
    marginHorizontal: theme.spacing.xs,
  },
  genresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    flexWrap: 'wrap',
  },
  genreText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: 'rgba(255, 255, 255, 0.85)',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  genreSeparator: {
    fontSize: theme.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  voteCount: {
    fontSize: theme.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: theme.fontWeight.medium,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  synopsis: {
    fontSize: theme.fontSize.sm,
    lineHeight: theme.fontSize.sm * 1.5,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'left', // Changed from center
    maxWidth: '90%',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
}))
