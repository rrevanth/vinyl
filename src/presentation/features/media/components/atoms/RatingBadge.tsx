import type { FC } from 'react'
import { memo } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { SymbolView } from 'expo-symbols'

type RatingSource = 'tmdb' | 'trakt' | 'imdb'

interface RatingBadgeProps {
  readonly source: RatingSource
  readonly rating: number
  readonly maxRating?: number
  readonly testID?: string
}

/**
 * Format rating based on source
 */
const formatRating = (source: RatingSource, rating: number, maxRating?: number): string => {
  switch (source) {
    case 'tmdb':
      // TMDB ratings are 0-10
      return `${(rating * 10).toFixed(0)}%`
    case 'trakt':
      // Trakt ratings are 0-100 (percentage)
      return `${rating.toFixed(0)}%`
    case 'imdb':
      // IMDb ratings are 0-10
      return maxRating ? `${rating.toFixed(1)}/${maxRating}` : `${rating.toFixed(1)}/10`
    default:
      return maxRating ? `${rating}/${maxRating}` : `${rating}`
  }
}

/**
 * Get source display name
 */
const getSourceName = (source: RatingSource): string => {
  switch (source) {
    case 'tmdb':
      return 'TMDB'
    case 'trakt':
      return 'Trakt'
    case 'imdb':
      return 'IMDb'
  }
}

const RatingBadgeComponent: FC<RatingBadgeProps> = ({ source, rating, maxRating, testID }) => {
  const formattedRating = formatRating(source, rating, maxRating)
  const sourceName = getSourceName(source)

  return (
    <View
      testID={testID}
      accessibilityRole="text"
      accessibilityLabel={`${sourceName} rating: ${formattedRating}`}
      style={[styles.container, styles[`container_${source}`]]}
    >
      <SymbolView
        name="star.fill"
        size={12}
        tintColor="#FFFFFF"
        style={styles.icon}
      />
      <Text style={styles.text}>
        {sourceName} {formattedRating}
      </Text>
    </View>
  )
}

export const RatingBadge = memo(RatingBadgeComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    gap: theme.spacing.xs,
  },
  container_tmdb: {
    backgroundColor: '#01B4E4', // TMDB brand color
  },
  container_trakt: {
    backgroundColor: '#ED1C24', // Trakt brand color
  },
  container_imdb: {
    backgroundColor: '#F5C518', // IMDb brand color
  },
  icon: {
    marginTop: 1, // Visual alignment
  },
  text: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    fontFamily: theme.fontFamily.primary,
  },
}))