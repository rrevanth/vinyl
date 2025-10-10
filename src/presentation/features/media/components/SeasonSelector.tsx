import type { FC } from 'react'
import { memo, useCallback, useRef, useEffect, forwardRef } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated'
import { observer } from '@legendapp/state/react'
import type { Season } from '@/src/domain/capabilities/IMediaSeasonsCapability'
import { selectedSeason$, setSelectedSeason } from '../stores/mediaUI.store'
import { t } from '@/src/presentation/shared/i18n'

interface SeasonSelectorProps {
  readonly seasons: Season[]
}

/**
 * Horizontal season selector with two layout modes:
 * - Segmented Control (≤5 seasons): Evenly distributed buttons
 * - Scrollable Tabs (>5 seasons): Horizontal scrolling with rounded pills
 *
 * Features smooth spring animations for selection state transitions
 */
const SeasonSelectorComponent: FC<SeasonSelectorProps> = observer(({ seasons }) => {
  const selectedSeason = selectedSeason$.get()
  const scrollViewRef = useRef<ScrollView>(null)

  // Determine layout mode based on season count
  const useSegmentedControl = seasons.length <= 5

  const handleSelectSeason = useCallback((seasonNumber: number, index: number) => {
    setSelectedSeason(seasonNumber)

    // Auto-scroll to selected season in scrollable mode
    if (!useSegmentedControl && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: Math.max(0, index * 120 - 100),
        animated: true,
      })
    }
  }, [useSegmentedControl])

  if (seasons.length === 0) {
    return null
  }

  // Single season - no selector needed
  if (seasons.length === 1) {
    return null
  }

  return (
    <View style={styles.container}>
      {useSegmentedControl ? (
        <SegmentedSeasonControl
          seasons={seasons}
          selectedSeason={selectedSeason}
          onSelectSeason={handleSelectSeason}
        />
      ) : (
        <ScrollableSeasonTabs
          ref={scrollViewRef}
          seasons={seasons}
          selectedSeason={selectedSeason}
          onSelectSeason={handleSelectSeason}
        />
      )}
    </View>
  )
})

/**
 * Segmented Control Mode (≤5 seasons)
 * Evenly distributed season buttons with clean iOS-style aesthetic
 */
interface SegmentedSeasonControlProps {
  seasons: Season[]
  selectedSeason: number
  onSelectSeason: (seasonNumber: number, index: number) => void
}

const SegmentedSeasonControl: FC<SegmentedSeasonControlProps> = memo(({
  seasons,
  selectedSeason,
  onSelectSeason,
}) => {
  return (
    <View style={styles.segmentedContainer}>
      {seasons.map((season, index) => {
        const isSelected = season.seasonNumber === selectedSeason

        return (
          <AnimatedSeasonButton
            key={season.id}
            season={season}
            isSelected={isSelected}
            onPress={() => onSelectSeason(season.seasonNumber, index)}
            isSegmented
          />
        )
      })}
    </View>
  )
})

SegmentedSeasonControl.displayName = 'SegmentedSeasonControl'

/**
 * Scrollable Tabs Mode (>5 seasons)
 * Horizontal ScrollView with pill-style season tabs
 */
interface ScrollableSeasonTabsProps {
  seasons: Season[]
  selectedSeason: number
  onSelectSeason: (seasonNumber: number, index: number) => void
}

const ScrollableSeasonTabs = forwardRef<ScrollView, ScrollableSeasonTabsProps>(
  ({ seasons, selectedSeason, onSelectSeason }, ref) => {
    return (
      <ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollableContent}
      >
        {seasons.map((season, index) => {
          const isSelected = season.seasonNumber === selectedSeason

          return (
            <AnimatedSeasonButton
              key={season.id}
              season={season}
              isSelected={isSelected}
              onPress={() => onSelectSeason(season.seasonNumber, index)}
              isSegmented={false}
            />
          )
        })}
      </ScrollView>
    )
  }
)

ScrollableSeasonTabs.displayName = 'ScrollableSeasonTabs'

/**
 * Animated Season Button
 * Smooth spring animation for selection state changes
 */
interface AnimatedSeasonButtonProps {
  season: Season
  isSelected: boolean
  onPress: () => void
  isSegmented: boolean
}

const AnimatedSeasonButton: FC<AnimatedSeasonButtonProps> = ({
  season,
  isSelected,
  onPress,
  isSegmented,
}) => {
  const { theme } = useUnistyles()
  const animatedValue = useSharedValue(isSelected ? 1 : 0)

  // Extract theme colors for use in animated styles
  const colors = {
    transparent: 'transparent',
    primary: theme.colors.primary,
    border: theme.colors.border,
    textSecondary: theme.colors.textSecondary,
    text: theme.colors.text,
  }

  useEffect(() => {
    animatedValue.value = withSpring(isSelected ? 1 : 0, {
      damping: 20,
      stiffness: 300,
    })
  }, [isSelected, animatedValue])

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedValue.value,
        [0, 1],
        [colors.transparent, colors.primary]
      ),
      borderColor: interpolateColor(
        animatedValue.value,
        [0, 1],
        [colors.border, colors.primary]
      ),
      transform: [
        {
          scale: withSpring(isSelected ? 1 : 0.98, {
            damping: 20,
            stiffness: 300,
          }),
        },
      ],
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        animatedValue.value,
        [0, 1],
        [colors.textSecondary, colors.text]
      ),
    }
  })

  return (
    <Pressable
      onPress={onPress}
      style={isSegmented ? styles.segmentedButton : styles.scrollableButton}
      accessibilityRole="tab"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={t('media_detail.season').replace(
        '{number}',
        season.seasonNumber.toString()
      )}
    >
      <Animated.View style={[styles.buttonInner, animatedButtonStyle]}>
        <Animated.Text style={[styles.seasonText, animatedTextStyle]}>
          {isSegmented
            ? t('media_detail.season').replace('{number}', season.seasonNumber.toString())
            : t('media_detail.season_short').replace('{number}', season.seasonNumber.toString())}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  )
}

export const SeasonSelector = memo(SeasonSelectorComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingVertical: theme.spacing.lg,
  },
  // Segmented Control Styles (≤5 seasons)
  segmentedContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  segmentedButton: {
    flex: 1,
    minHeight: 44, // iOS minimum touch target
  },
  // Scrollable Tabs Styles (>5 seasons)
  scrollableContent: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  scrollableButton: {
    minHeight: 44, // iOS minimum touch target
    minWidth: 100,
  },
  // Shared Button Inner Styles
  buttonInner: {
    flex: 1,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seasonText: {
    fontSize: theme.fontSize.base,
    fontFamily: theme.fontFamily.primary,
    fontWeight: theme.fontWeight.semibold,
  },
}))
