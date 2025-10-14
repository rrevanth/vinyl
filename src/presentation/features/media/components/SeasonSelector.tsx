import type { FC } from 'react'
import { memo, useState, useRef } from 'react'
import { Animated, Easing, Pressable, ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'
import { observer } from '@legendapp/state/react'
import type { Season } from '@/src/domain/capabilities/IMediaSeasonsCapability'
import { selectedSeason$, setSelectedSeason } from '../stores/mediaUI.store'
import { t } from '@/src/presentation/shared/i18n'

interface SeasonSelectorProps {
  readonly seasons: Season[]
}

/**
 * Season selector with dropdown picker
 * - Shows current season with chevron-down icon
 * - Opens dropdown below button for season selection
 * - Only visible when 2+ seasons available
 */
const SeasonSelectorComponent: FC<SeasonSelectorProps> = observer(({ seasons }) => {
  const selectedSeason = selectedSeason$.get()
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const opacityAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current

  const handleToggleDropdown = () => {
    if (isDropdownVisible) {
      // Close animation
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 150,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => setIsDropdownVisible(false))
    } else {
      // Open animation
      setIsDropdownVisible(true)
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start()
    }
  }

  const handleSelectSeason = (seasonNumber: number) => {
    setSelectedSeason(seasonNumber)
    handleToggleDropdown()
  }

  // No seasons or single season - no selector needed
  if (seasons.length === 0 || seasons.length === 1) {
    return null
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleToggleDropdown}
        style={({ pressed }) => [
          styles.dropdownButton,
          pressed && styles.dropdownButtonPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={t('media_detail.season').replace(
          '{number}',
          selectedSeason.toString()
        )}
        accessibilityHint={t('media_detail.select_season')}
      >
        <Text style={styles.dropdownText}>
          {t('media_detail.season').replace('{number}', selectedSeason.toString())}
        </Text>
        <Ionicons 
          name={isDropdownVisible ? "chevron-up" : "chevron-down"} 
          size={20} 
          style={styles.chevronIcon} 
        />
      </Pressable>

      {isDropdownVisible && (
        <Animated.View
          style={[
            styles.dropdownMenu,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <ScrollView style={styles.seasonList} bounces={false}>
            {seasons.map((season, index) => {
              const isSelected = season.seasonNumber === selectedSeason
              const seasonLabel = t('media_detail.season').replace(
                '{number}',
                season.seasonNumber.toString()
              )

              return (
                <View key={season.seasonNumber}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.seasonItem,
                      pressed && styles.seasonItemPressed,
                    ]}
                    onPress={() => handleSelectSeason(season.seasonNumber)}
                    accessibilityRole="button"
                    accessibilityLabel={seasonLabel}
                    accessibilityState={{ selected: isSelected }}
                  >
                    <View style={styles.seasonInfo}>
                      <Text style={styles.seasonTitle}>{seasonLabel}</Text>
                      {season.episodeCount ? (
                        <Text style={styles.episodeCount}>
                          {season.episodeCount} {season.episodeCount === 1 ? 'Episode' : 'Episodes'}
                        </Text>
                      ) : null}
                    </View>
                    {isSelected ? (
                      <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                    ) : null}
                  </Pressable>
                  {index < seasons.length - 1 && <View style={styles.separator} />}
                </View>
              )
            })}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  )
})

export const SeasonSelector = memo(SeasonSelectorComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    position: 'relative',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 100, // Pill shape
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minHeight: 36,
    alignSelf: 'flex-start',
  },
  dropdownButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  dropdownText: {
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.primary,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginRight: theme.spacing.xs,
  },
  chevronIcon: {
    color: theme.colors.text,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 56, // Below the button
    left: theme.spacing.lg,
    width: 240,
    maxHeight: 280,
    backgroundColor: 'rgba(28, 28, 30, 0.95)',
    borderRadius: 24, // More rounded
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
    zIndex: 1000,
  },
  seasonList: {
    maxHeight: 280,
  },
  seasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  seasonItemPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  seasonInfo: {
    flex: 1,
    gap: 2,
  },
  seasonTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: '#FFFFFF',
  },
  episodeCount: {
    fontSize: theme.fontSize.xs,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: theme.spacing.lg,
  },
}))
