import type { Media } from '@/src/domain/entities/Media'
import { t } from '@/src/presentation/shared/i18n'
import { RatingBadge } from '@/src/presentation/shared/ui/badges'
import { PillButton } from '@/src/presentation/shared/ui/buttons'
import { HeroPaginationIndicator } from '@/src/presentation/shared/ui/progress'
import { LegendList } from '@legendapp/list'
import { LinearGradient } from 'expo-linear-gradient'
import { memo, useCallback, useEffect, useRef, useState, type FC } from 'react'
import { Dimensions, ImageBackground, Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native-unistyles'
import { HeroHeader } from './HeroHeader'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface HeroCarouselProps {
  readonly items: Media[]
  readonly onPressItem?: (media: Media) => void

  // Optional configuration
  readonly showTagline?: boolean
  readonly showRating?: boolean
  readonly showMetadata?: boolean
  readonly showButton?: boolean
  readonly showPagination?: boolean

  // Optional enriched data for additional metadata
  readonly enrichedData?: Map<
    string,
    {
      tagline?: string
      genres?: { id: string; name: string }[]
      certification?: string
    }
  >

  // Tagline customization
  readonly taglineText?: string

  // Button customization
  readonly buttonText?: string
  readonly buttonVariant?: 'primary' | 'secondary' | 'ghost'

  // Header overlay
  readonly userAvatar?: string
  readonly userName?: string
  readonly onUserPress?: () => void
}

const HeroCarouselComponent: FC<HeroCarouselProps> = ({
  items,
  onPressItem,
  showTagline = false,
  showRating = false,
  showMetadata = true,
  showButton = true,
  showPagination = true,
  enrichedData,
  taglineText,
  buttonText,
  buttonVariant = 'primary',
  userAvatar,
  userName,
  onUserPress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const listRef = useRef<any>(null)
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (isPaused || items.length <= 1) return

    timerRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % items.length
      setCurrentIndex(nextIndex)

      // Scroll to next item
      listRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      })
    }, 4000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentIndex, isPaused, items.length])

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        const index = items.findIndex(
          (item) => item.stableId === viewableItems[0].item.stableId
        )
        if (index !== -1) {
          setCurrentIndex(index)
        }
      }
    },
    [items]
  )

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  }

  // Helper to calculate scale based on distance from active indicator
  const getIndicatorScale = (distance: number): number => {
    if (distance === 0) return 1 // Active bar
    if (distance === 1) return 1 // Adjacent dots (full size)
    if (distance === 2) return 0.8
    if (distance === 3) return 0.6
    return 0.4 // Far edges (4+)
  }

  // Pause on touch
  const handleTouchStart = () => {
    setIsPaused(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // Resume after touch ends
  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsPaused(false)
    }, 3000) // Resume after 3s of no interaction
  }

  if (items.length === 0) {
    return null
  }

  return (
    <View
      style={styles.container}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <LegendList
        ref={listRef}
        horizontal
        data={items}
        keyExtractor={(item) => item.stableId}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        pagingEnabled
        snapToInterval={SCREEN_WIDTH}
        decelerationRate="fast"
        estimatedItemSize={SCREEN_WIDTH}
        initialContainerPoolRatio={2}
        drawDistance={SCREEN_WIDTH * 2}
        recycleItems
        renderItem={({ item }) => {
          const backdrop = item.images.getBestBackdrop() ?? item.images.getBestPoster()
          const logo = item.images.logo
          const enriched = enrichedData?.get(item.stableId)
          const interactive = typeof onPressItem === 'function'

          const metadataText = getMetadataText(item, enriched)
          const displayTagline = taglineText ?? enriched?.tagline

          return (
            <Pressable
              key={item.stableId}
              testID={`hero-item-${item.stableId}`}
              onPress={() => onPressItem?.(item)}
              style={styles.card}
              accessibilityRole={interactive ? 'button' : 'image'}
              accessibilityLabel={t('home.hero_card_accessibility').replace(
                '{title}',
                item.getDisplayName()
              )}
            >
              <ImageBackground
                source={backdrop ? { uri: backdrop } : undefined}
                style={styles.backdrop}
                imageStyle={styles.backdropImage}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={[
                    'transparent',
                    'rgba(0, 0, 0, 0.2)',
                    'rgba(0, 0, 0, 0.5)',
                    'rgba(0, 0, 0, 0.8)',
                  ]}
                  locations={[0, 0.3, 0.6, 1]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.gradient}
                />

                <LinearGradient
                  colors={[
                    'rgba(0, 0, 0, 0.7)',
                    'rgba(0, 0, 0, 0.3)',
                    'transparent',
                  ]}
                  locations={[0, 0.5, 1]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.topGradient}
                />

                <View style={styles.centeredContent}>
                  {showTagline && displayTagline ? (
                    <Text style={styles.tagline}>{displayTagline}</Text>
                  ) : null}

                  {logo ? (
                    <Image 
                      source={{ uri: logo }} 
                      style={styles.logo} 
                      contentFit="contain"
                      transition={200}
                      cachePolicy="memory-disk"
                      recyclingKey={item.stableId}
                    />
                  ) : (
                    <Text style={styles.title} numberOfLines={2}>
                      {item.title}
                    </Text>
                  )}

                  {showMetadata ? (
                    <View style={styles.metadataRow}>
                      <Text style={styles.metadata}>{metadataText}</Text>
                      {showRating && enriched?.certification ? (
                        <RatingBadge
                          rating={enriched.certification}
                          variant="outlined"
                          size="sm"
                        />
                      ) : null}
                    </View>
                  ) : null}

                  {showButton ? (
                    <PillButton
                      title={buttonText ?? 'Play'}
                      onPress={() => onPressItem?.(item)}
                      variant={buttonVariant}
                      size="md"
                    />
                  ) : null}
                </View>
              </ImageBackground>
            </Pressable>
          )
        }}
      />

      {/* Header overlay */}
      <HeroHeader
        userAvatar={userAvatar}
        userName={userName}
        onUserPress={onUserPress}
      />

      {/* Pagination indicators at bottom */}
      {showPagination && items.length > 1 ? (
        <View style={styles.paginationIndicators}>
          {items.map((_, index) => {
            const distance = Math.abs(index - currentIndex)
            // Only show indicators within 3 positions of active (max 7 visible: active + 3 on each side)
            if (distance > 3) return null

            return (
              <HeroPaginationIndicator
                key={index}
                isActive={index === currentIndex}
                scale={getIndicatorScale(distance)}
                duration={4000}
              />
            )
          })}
        </View>
      ) : null}
    </View>
  )
}

export const HeroCarousel = memo(HeroCarouselComponent)

// Helper function - updated to show genres
const getMetadataText = (
  media: Media,
  enriched?: { genres?: { name: string }[] }
): string => {
  const type = media.type === 'series' ? 'TV Show' : 'Movie'
  const genres = enriched?.genres?.slice(0, 2).map((g) => g.name).join(', ')

  return genres ? `${type} • ${genres}` : type
}

const styles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing.sectionSpacing,
  },
  listContent: {
    // No padding for full bleed
  },
  card: {
    width: SCREEN_WIDTH,
    height: 600,
    borderRadius: 0, // Full bleed
    overflow: 'hidden',
    backgroundColor: theme.colors.backgroundTertiary,
  },
  backdrop: {
    flex: 1,
  },
  backdropImage: {
    borderRadius: 0,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%', // Increased from 60% for better text coverage
  },
  topGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '40%', // Increased from 30% for better header visibility
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'flex-end', // Changed from 'center' to 'flex-end'
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['3xl'], // More bottom padding
    gap: theme.spacing.md,
    zIndex: 1,
  },
  tagline: {
    color: theme.colors.imageText,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    textAlign: 'center',
    opacity: 0.9,
  },
  logo: {
    width: 280,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    color: theme.colors.imageText,
    fontFamily: theme.fontFamily.heading,
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
    lineHeight: theme.fontSize['4xl'] * 1.2,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  metadata: {
    color: theme.colors.imageText,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    textAlign: 'center',
  },
  // Pagination indicators at bottom
  paginationIndicators: {
    position: 'absolute',
    bottom: theme.spacing.lg, // Moved closer to bottom (was '3xl')
    left: theme.spacing.gutter,
    right: theme.spacing.gutter,
    flexDirection: 'row',
    justifyContent: 'center', // Center indicators horizontally
    gap: theme.spacing.xs,
    zIndex: 9,
  },
}))
