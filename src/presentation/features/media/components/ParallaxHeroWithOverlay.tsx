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

  // Get synopsis
  const synopsis = enrichedData?.overview || enrichedData?.tagline

  // Determine subtext (show tagline if different from overview)
  const subtext =
    enrichedData?.tagline && enrichedData.tagline !== enrichedData.overview
      ? enrichedData.tagline
      : null

  // Format type and genres
  const typeLabel = media.type === 'series' ? 'TV Show' : 'Movie'
  const genres = enrichedData?.genres?.map((g) => g.name) || []
  const typeGenresText =
    genres.length > 0 ? `${typeLabel} · ${genres.join(', ')}` : typeLabel

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

      {/* Dark scrim for better text contrast */}
      <View style={styles.scrim} />

      {/* Bottom Gradient - Simple approach matching homescreen */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.98)']}
        locations={[0, 0.3, 1]}
        style={styles.bottomGradient}
      />

      {/* Top Gradient - Only when subtext exists */}
      {subtext && (
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          locations={[0, 1]}
          style={styles.topGradient}
        />
      )}

      {/* Overlay Content - Bottom-aligned, center-aligned horizontally */}
      <View style={styles.overlayContent}>
        {/* Optional Subtext (Tagline if different from overview) */}
        {subtext && (
          <Text style={styles.subtext} numberOfLines={1}>
            {subtext.toUpperCase()}
          </Text>
        )}

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {media.title}
        </Text>

        {/* Type · Genres Row */}
        <View style={styles.typeGenresRow}>
          <Text style={styles.typeGenreText}>{typeGenresText}</Text>
        </View>

        {/* Play Button */}
        <View style={styles.actionsContainer}>
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

        {/* Synopsis (2 lines, expandable) */}
        {synopsis && (
          <View style={styles.synopsisContainer}>
            <Text
              style={styles.synopsis}
              numberOfLines={synopsisExpanded ? undefined : 2}
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
  scrim: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  // Bottom gradient covering 90% height
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '90%',
  },
  // Top gradient covering 30% height (for subtext readability)
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  // Content container - bottom-aligned with center alignment
  overlayContent: {
    position: 'relative',
    zIndex: 10,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing['3xl'], // Add top padding for breathing room
    paddingBottom: theme.spacing['4xl'],
    gap: theme.spacing.lg, // Increase from md to lg for better spacing
  },
  subtext: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
    color: '#FFFFFF',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  title: {
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    color: '#FFFFFF',
    lineHeight: theme.lineHeight.tight,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },
  typeGenresRow: {
    width: '100%', // Use full width
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap', // Allow wrapping for long genre lists
    gap: theme.spacing.xs, // Add gap between items
  },
  typeGenreText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  actionsContainer: {
    width: '100%', // Use full width
    alignItems: 'center',
  },
  synopsisContainer: {
    width: '100%', // Use full width available
    gap: theme.spacing.xs,
    alignItems: 'center',
  },
  synopsis: {
    width: '100%', // Use full width
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.loose,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
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
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  metadata: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
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
  pillButtonIconColor: {
    color: theme.colors.buttonPrimaryText,
  },
}))
