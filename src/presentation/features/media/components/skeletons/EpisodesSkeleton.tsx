import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { Skeleton } from '@/src/presentation/shared/ui/atoms/Skeleton'

/**
 * Skeleton loading state for Episodes Section
 * Mimics the layout of EpisodeCarousel component
 */
export const EpisodesSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Season Selector Skeleton */}
      <View style={styles.seasonSelector}>
        <Skeleton width={150} height={40} borderRadius={20} />
      </View>

      {/* Episode List Skeleton */}
      <View style={styles.episodeList}>
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} style={styles.episodeCard}>
            {/* Episode Thumbnail */}
            <Skeleton width={140} height={80} borderRadius={8} />
            {/* Episode Info */}
            <View style={styles.episodeInfo}>
              <Skeleton width="90%" height={18} borderRadius={4} />
              <Skeleton width="100%" height={14} borderRadius={4} />
              <Skeleton width="70%" height={14} borderRadius={4} />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.spacing.xl,
  },
  seasonSelector: {
    paddingHorizontal: theme.spacing.gutter,
    marginBottom: theme.spacing.md,
  },
  episodeList: {
    paddingHorizontal: theme.spacing.gutter,
    gap: theme.spacing.md,
  },
  episodeCard: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  episodeInfo: {
    flex: 1,
    gap: theme.spacing.xs,
    justifyContent: 'center',
  },
}))
