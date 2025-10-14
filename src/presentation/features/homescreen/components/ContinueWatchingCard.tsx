import type { FC } from 'react'
import { Fragment, memo } from 'react'
import { ImageBackground, Pressable, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native-unistyles'
import type { ContinueWatchingItem } from '@/src/domain/capabilities/IMediaContinueWatchingCapability'

interface ContinueWatchingCardProps {
  readonly item: ContinueWatchingItem
  readonly variant?: 'landscape' | 'standard' | 'poster'
  readonly onPress?: (item: ContinueWatchingItem) => void
  readonly onMorePress?: (item: ContinueWatchingItem) => void
  readonly showExternalMetadata?: boolean
}

const ContinueWatchingCardComponent: FC<ContinueWatchingCardProps> = ({
  item,
  variant = 'landscape',
  onPress,
  onMorePress,
  showExternalMetadata = false,
}) => {
  // Get appropriate image based on variant
  const image =
    variant === 'poster'
      ? item.media.images.getBestPoster()
      : item.media.images.getBestBackdrop()

  // Calculate runtime in minutes (assuming item.media has runtime property)
  const runtime = (item.media as any).runtime

  // Determine if episode info should be displayed
  const showEpisodeInfo = item.type === 'episode' && item.episode

  // Format episode info
  const episodeInfo = showEpisodeInfo
    ? `S${item.episode!.season}, E${item.episode!.number}`
    : undefined

  // Build accessibility label
  const accessibilityLabel = showEpisodeInfo
    ? `Continue watching ${item.media.title}, Season ${item.episode!.season}, Episode ${item.episode!.number}`
    : `Continue watching ${item.media.title}`

  const isPosterVariant = variant === 'poster'

  // Apply variants to styles
  styles.useVariants({ variant })

  return (
    <Fragment>
      <Pressable
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityLabel={accessibilityLabel}
        onPress={() => onPress?.(item)}
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      >
        <ImageBackground
          source={{ uri: image }}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          {/* Dark gradient overlay at bottom 60% */}
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1.0)']}
            style={styles.gradient}
            locations={[0.4, 1]}
          />

          {/* Three-dot menu (top-right) */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="More options"
            onPress={() => onMorePress?.(item)}
            style={styles.moreButton}
          >
            <Text style={styles.moreIcon}>···</Text>
          </Pressable>

          {/* Overlay content */}
          {isPosterVariant ? (
            // Poster layout: Play + progress on first line, metadata on second line
            <View style={styles.posterOverlay}>
              {/* First line: Play button and progress */}
              <View style={styles.posterPlayRow}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Play"
                  onPress={() => onPress?.(item)}
                  style={styles.playButton}
                >
                  <View style={styles.playIconCircle}>
                    <Text style={styles.playIcon}>▶</Text>
                  </View>
                </Pressable>
                <View style={styles.posterProgressContainer}>
                  <ProgressBar progress={item.progress} />
                </View>
              </View>

              {/* Second line: Metadata */}
              <View style={styles.posterMetadataRow}>
                {episodeInfo && <Text style={styles.episodeText}>{episodeInfo}</Text>}
                {episodeInfo && runtime && <Text style={styles.separator}> • </Text>}
                {runtime && <Text style={styles.runtimeText}>{runtime}m</Text>}
              </View>
            </View>
          ) : (
            // Landscape/Standard layout - Apple TV+ design
            <View style={styles.overlay}>
              {/* Bottom row with all controls */}
              <View style={styles.controlsRow}>
                {/* Play button */}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Play"
                  onPress={() => onPress?.(item)}
                  style={styles.playButton}
                >
                  <View style={styles.playIconCircle}>
                    <Text style={styles.playIcon}>▶</Text>
                  </View>
                </Pressable>

                {/* Small progress bar next to play */}
                <View style={styles.compactProgressContainer}>
                  <ProgressBar progress={item.progress} />
                </View>

                {/* Episode info in center */}
                <View style={styles.metadataCenter}>
                  {episodeInfo && <Text style={styles.episodeText}>{episodeInfo}</Text>}
                  {episodeInfo && runtime && <Text style={styles.separator}> • </Text>}
                  {runtime && <Text style={styles.runtimeText}>{runtime}m</Text>}
                </View>
              </View>
            </View>
          )}
        </ImageBackground>
      </Pressable>

      {/* Optional external metadata below card */}
      {showExternalMetadata && (
        <View style={styles.externalMetadata}>
          <Text style={styles.mediaTitle} numberOfLines={1}>
            {item.media.title}
          </Text>
          {showEpisodeInfo && (
            <Text style={styles.episodeInfoExternal}>
              {episodeInfo}
            </Text>
          )}
        </View>
      )}
    </Fragment>
  )
}

// Progress bar sub-component
const ProgressBar: FC<{ progress: number }> = ({ progress }) => (
  <View style={styles.progressTrack}>
    <View style={[styles.progressFill, { width: `${progress}%` }]} />
  </View>
)

export const ContinueWatchingCard = memo(ContinueWatchingCardComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    borderRadius: theme.borderRadius.md, // Rounded corners matching Apple TV+ design
    overflow: 'hidden',
    variants: {
      variant: {
        landscape: {
          width: 300,
          height: 169, // 16:9 aspect ratio
        },
        standard: {
          width: 200,
          height: 150, // 4:3 aspect ratio
        },
        poster: {
          width: 150,
          height: 225, // 2:3 aspect ratio
        },
      },
    },
  },
  pressed: {
    opacity: 0.9,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '40%',
  },
  moreButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreIcon: {
    color: theme.colors.imageText,
    fontSize: 24,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowRadius: 6,
    letterSpacing: 2,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  // Horizontal row for all controls (Apple TV+ design)
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: theme.colors.imageText,
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowRadius: 6,
    marginLeft: 2, // Optical alignment for play triangle
  },
  // Compact progress bar container (Apple TV+ design)
  compactProgressContainer: {
    width: 70, // Small, compact size
  },
  // Center metadata (episode + runtime, Apple TV+ design)
  metadataCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  episodeText: {
    color: theme.colors.imageText,
    fontSize: 13,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowRadius: 6,
  },
  runtimeText: {
    color: theme.colors.imageText,
    fontSize: 13,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowRadius: 6,
  },
  progressTrack: {
    height: 4,
    backgroundColor: theme.colors.imageOverlay,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // White progress bar matching Apple TV+ design
    borderRadius: 2,
  },
  // Poster variant specific styles
  posterOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 8,
  },
  posterPlayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  posterProgressContainer: {
    flex: 1,
  },
  posterMetadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    color: theme.colors.imageText,
    fontSize: 13,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowRadius: 6,
  },
  // External metadata (below card, optional)
  externalMetadata: {
    marginTop: theme.spacing.xs,
    gap: theme.spacing.micro,
  },
  mediaTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    fontFamily: theme.fontFamily.primary,
  },
  episodeInfoExternal: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.regular,
  },
}))
