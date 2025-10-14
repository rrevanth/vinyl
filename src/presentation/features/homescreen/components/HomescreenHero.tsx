import type { Media } from '@/src/domain/entities/Media'
import { memo, useCallback, useEffect, useRef, useState, type FC } from 'react'
import { Dimensions, FlatList, Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  type SharedValue,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native-unistyles'
import { HeroHeader } from './HeroHeader'
import { HeroPaginationIndicator } from '@/src/presentation/shared/ui/progress'
import { HeroBadge } from './atoms/HeroBadge'
import { MetadataRow } from './atoms/MetadataRow'
import { HeroActionButtons } from './atoms/HeroActionButtons'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const HERO_HEIGHT = 600
const AUTO_ROTATE_INTERVAL = 4000

interface HomescreenHeroProps {
  readonly items: Media[]
  readonly onPressItem?: (media: Media) => void
  readonly userAvatar?: string
  readonly userName?: string
  readonly onUserPress?: () => void
  readonly scrollY?: SharedValue<number>
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<Media>)

const HomescreenHeroComponent: FC<HomescreenHeroProps> = ({
  items,
  onPressItem,
  userAvatar,
  userName,
  onUserPress,
  scrollY,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList<Media>>(null)
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const scrollX = useSharedValue(0)

  // Auto-rotate carousel
  useEffect(() => {
    if (items.length <= 1) return

    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % items.length
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        })
        return nextIndex
      })
    }, AUTO_ROTATE_INTERVAL)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [items.length])

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
  })

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index)
      }
    },
    []
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

  const renderItem = useCallback(
    ({ item, index }: { item: Media; index: number }) => {
      const imageUrl = item.images.getBestBackdrop() ?? item.images.getBestPoster()
      const hasLogo = !!item.images.logo

      return (
        <HeroCard
          item={item}
          index={index}
          scrollX={scrollX}
          scrollY={scrollY}
          imageUrl={imageUrl}
          hasLogo={hasLogo}
          onPress={() => onPressItem?.(item)}
          onPlay={() => onPressItem?.(item)}
          onAddToWatchlist={() => {
            console.log('Add to watchlist:', item.title)
          }}
          isInWatchlist={false}
        />
      )
    },
    [onPressItem, scrollX, scrollY]
  )

  const renderPagination = useCallback(() => {
    if (items.length <= 1) return null

    return (
      <View style={styles.paginationContainer}>
        {items.map((_, index) => {
          const distance = Math.abs(index - currentIndex)
          // Only show indicators within 3 positions of active (max 7 visible: active + 3 on each side)
          if (distance > 3) return null

          return (
            <HeroPaginationIndicator
              key={index}
              isActive={index === currentIndex}
              scale={getIndicatorScale(distance)}
              duration={AUTO_ROTATE_INTERVAL}
            />
          )
        })}
      </View>
    )
  }, [items, currentIndex])

  if (items.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        ref={flatListRef}
        data={items}
        keyExtractor={(item: Media) => item.stableId}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
        decelerationRate="fast"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      <HeroHeader
        userAvatar={userAvatar}
        userName={userName}
        onUserPress={onUserPress}
      />

      {renderPagination()}
    </View>
  )
}

export const HomescreenHero = memo(HomescreenHeroComponent)

// Separate component for each card with parallax effect
interface HeroCardProps {
  item: Media
  index: number
  scrollX: SharedValue<number>
  scrollY?: SharedValue<number>
  imageUrl: string | null | undefined
  hasLogo: boolean
  onPress: () => void
  onPlay?: () => void
  onAddToWatchlist?: () => void
  isInWatchlist?: boolean
}

const HeroCard: FC<HeroCardProps> = memo(({ item, index, scrollX, scrollY, imageUrl, hasLogo, onPress, onPlay, onAddToWatchlist, isInWatchlist }) => {
  // Parallax animation for image (zoom and fade)
  const imageAnimatedStyle = useAnimatedStyle(() => {
    // Only vertical parallax (page scroll) - no horizontal animation
    if (!scrollY) {
      return {
        transform: [{ scale: 1 }],
        opacity: 1,
      }
    }

    // Zoom in effect: 1.0 → 1.15 over 300px
    const scale = interpolate(
      scrollY.value,
      [0, 300],
      [1.0, 1.15],
      Extrapolate.CLAMP
    )

    // Fade out: 1.0 → 0 over 250px
    const opacity = interpolate(
      scrollY.value,
      [0, 250],
      [1.0, 0],
      Extrapolate.CLAMP
    )

    return {
      transform: [{ scale }],
      opacity,
    }
  })

  // Parallax animation for content (slide up when leaving)
  const contentAnimatedStyle = useAnimatedStyle(() => {
    // Only vertical parallax (page scroll) - no horizontal animation
    if (!scrollY) {
      return {
        transform: [{ translateY: 0 }],
        opacity: 1,
      }
    }

    // Slide up faster: 0 → -100px over 200px
    const translateY = interpolate(
      scrollY.value,
      [0, 200],
      [0, -100],
      Extrapolate.CLAMP
    )

    // Fade out: 1.0 → 0 over 200px
    const opacity = interpolate(
      scrollY.value,
      [0, 200],
      [1.0, 0],
      Extrapolate.CLAMP
    )

    return {
      transform: [{ translateY }],
      opacity,
    }
  })

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={item.title}
    >
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

      {/* Bottom gradient */}
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
        style={styles.bottomGradient}
        pointerEvents="none"
      />

      {/* Top gradient */}
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'transparent']}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.topGradient}
        pointerEvents="none"
      />

      {/* Content with parallax */}
      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        {/* Optional Badge */}
        {item.badge && <HeroBadge badge={item.badge} />}
        
        {/* Logo or Title */}
        {hasLogo && item.images.logo ? (
          <Image 
            source={{ uri: item.images.logo }} 
            style={styles.logo} 
            contentFit="contain"
            cachePolicy="memory-disk"
            transition={200}
          />
        ) : (
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
        )}
        
        {/* Metadata Row (Year, Runtime, Certification, Rating) */}
        <MetadataRow
          year={item.year}
          certification={item.certification}
          runtime={item.runtime}
          voteAverage={item.rating?.average}
          voteCount={item.rating?.count}
        />
        
        {/* Genres */}
        {item.genres && item.genres.length > 0 && (
          <View style={styles.genresRow}>
            <Text style={styles.genres} numberOfLines={1}>
              {item.genres.slice(0, 3).map(g => g.name).join(' • ')}
            </Text>
          </View>
        )}
        
        {/* Overview */}
        {item.overview && (
          <Text style={styles.overview} numberOfLines={3}>
            {item.overview}
          </Text>
        )}
        
        {/* Action Buttons */}
        <HeroActionButtons
          media={item}
          onPlay={onPlay}
          onAddToWatchlist={onAddToWatchlist}
          isInWatchlist={isInWatchlist}
        />
      </Animated.View>
    </Pressable>
  )
})

HeroCard.displayName = 'HeroCard'

const styles = StyleSheet.create((theme) => ({
  container: {
    height: HERO_HEIGHT,
    marginBottom: theme.spacing.xl,
  },
  card: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
    position: 'relative',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
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
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['3xl'],
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  logo: {
    width: 240,
    height: 100,
    alignSelf: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    maxWidth: '85%',
  },
  genresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  genres: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  overview: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.regular,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: '90%',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    zIndex: 10,
  },
}))
