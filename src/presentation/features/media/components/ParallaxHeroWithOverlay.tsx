import type { FC } from 'react'
import { memo, useState, useCallback } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
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
import { PillButton } from '@/src/presentation/shared/ui/buttons'

interface ParallaxHeroWithOverlayProps {
  readonly media: Media
  readonly enrichedData?: EnrichedMedia
  readonly height?: number
  readonly scrollY?: SharedValue<number>
  readonly onPlay?: () => void
  readonly onAddToLibrary?: () => void
  readonly onShare?: () => void
}

// Animation constants inspired by Nuvio implementation
const SCALE_ZOOM_IN = 1.0
const SCALE_ZOOM_OUT = 0.85
const OPACITY_VISIBLE = 1.0
const OPACITY_FADED = 0.3
const FADE_THRESHOLD = 200
const PARALLAX_DISTANCE = 50

/**
 * Enhanced parallax hero with metadata overlay
 * Features:
 * - Cinematic parallax zoom-out effect
 * - Strong gradient overlay for text readability
 * - Complete metadata display (episode info, title, ratings, synopsis)
 * - Integrated action buttons
 * - Expandable synopsis
 */
const ParallaxHeroWithOverlayComponent: FC<ParallaxHeroWithOverlayProps> = ({
  media,
  enrichedData,
  height = 600,
  scrollY,
  onPlay,
  onAddToLibrary,
  onShare,
}) => {
  const [synopsisExpanded, setSynopsisExpanded] = useState(false)

  // Get best available backdrop image
  const backdropUrl = media.images.getBestBackdrop()

  // Toggle synopsis expansion
  const toggleSynopsis = useCallback(() => {
    setSynopsisExpanded((prev) => !prev)
  }, [])

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

  // Format runtime
  const runtime = enrichedData?.runtime
    ? t('media_detail.runtime_minutes').replace('{minutes}', enrichedData.runtime.toString())
    : null

  // Format rating(s)
  const ratings = []
  if (enrichedData?.voteAverage) {
    ratings.push({ value: enrichedData.voteAverage.toFixed(1) })
  }

  // Get synopsis
  const synopsis = enrichedData?.overview || enrichedData?.tagline

  // Format current episode badge for series
  const currentEpisodeBadge =
    media.type === 'series' && enrichedData?.lastEpisodeToAir
      ? `${t('media_detail.season_short').replace('{number}', enrichedData.lastEpisodeToAir.seasonNumber.toString())}, ${t('media_detail.episode_badge').replace('{number}', enrichedData.lastEpisodeToAir.episodeNumber.toString())} · ${enrichedData.lastEpisodeToAir.name}`
      : null

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

      {/* Strong Gradient Overlay for Text Readability */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.95)']}
        locations={[0, 0.3, 1]}
        style={styles.gradient}
      />

      {/* Overlay Content */}
      <View style={styles.overlayContent}>
        {/* Current Episode Badge (Series Only) */}
        {currentEpisodeBadge && (
          <Text style={styles.episodeBadge} numberOfLines={1}>
            {currentEpisodeBadge.toUpperCase()}
          </Text>
        )}

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {media.title}
        </Text>

        {/* Metadata Row (Year · Runtime · Certification) */}
        <View style={styles.metadataRow}>
          {media.year && <Text style={styles.metadata}>{media.year}</Text>}
          {runtime && (
            <>
              <Text style={styles.separator}>·</Text>
              <Text style={styles.metadata}>{runtime}</Text>
            </>
          )}
          {enrichedData?.certification && (
            <>
              <Text style={styles.separator}>·</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{enrichedData.certification}</Text>
              </View>
            </>
          )}
        </View>

        {/* Ratings Row */}
        {ratings.length > 0 && (
          <View style={styles.ratingsRow}>
            {ratings.map((rating, index) => (
              <View key={index} style={styles.ratingItem}>
                <Ionicons name="star" size={14} color="#FFFFFF" />
                <Text style={styles.rating}>{rating.value}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Synopsis with More Button */}
        {synopsis && (
          <View style={styles.synopsisContainer}>
            <Text
              style={styles.synopsis}
              numberOfLines={synopsisExpanded ? undefined : 3}
              ellipsizeMode="tail"
            >
              {synopsis}
            </Text>
            {!synopsisExpanded && synopsis.length > 150 && (
              <Pressable
                onPress={toggleSynopsis}
                accessibilityRole="button"
                accessibilityLabel={t('media_detail.see_all')}
                style={styles.moreButton}
              >
                <Text style={styles.moreButtonText}>{t('media_detail.see_all').toUpperCase()}</Text>
                <Ionicons name="chevron-down" size={16} color="#FFFFFF" />
              </Pressable>
            )}
            {synopsisExpanded && (
              <Pressable
                onPress={toggleSynopsis}
                accessibilityRole="button"
                accessibilityLabel={t('common.close')}
                style={styles.moreButton}
              >
                <Text style={styles.moreButtonText}>{t('common.close').toUpperCase()}</Text>
                <Ionicons name="chevron-up" size={16} color="#FFFFFF" />
              </Pressable>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {/* Primary Play Button */}
          {onPlay && (
            <PillButton
              title={t('media.actions.play')}
              onPress={onPlay}
              variant="primary"
              size="md"
              icon={<Ionicons name="play" size={20} color={styles.pillButtonIconColor.color} />}
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
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  overlayContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['3xl'],
    paddingTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  episodeBadge: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: '#FFFFFF',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  title: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: '#FFFFFF',
    lineHeight: theme.lineHeight.tight,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    flexWrap: 'wrap',
  },
  metadata: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  separator: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    opacity: 0.6,
  },
  badge: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
  },
  badgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
  },
  ratingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  rating: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  synopsisContainer: {
    gap: theme.spacing.xs,
  },
  synopsis: {
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.relaxed,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingTop: theme.spacing.xs,
  },
  moreButtonText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
    color: '#FFFFFF',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  actionsContainer: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  pillButtonIconColor: {
    color: theme.colors.buttonPrimaryText,
  },
}))
