import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { Skeleton } from '@/src/presentation/shared/ui/atoms/Skeleton'

/**
 * Skeleton loading state for Recommendations Section
 * Mimics the layout of RecommendationsRow component
 */
export const RecommendationsSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Section Title */}
      <View style={styles.header}>
        <Skeleton width={160} height={24} borderRadius={4} />
      </View>

      {/* Horizontal ScrollView Skeleton */}
      <View style={styles.scrollContent}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} style={styles.mediaCard}>
            {/* Poster Image */}
            <Skeleton width={140} height={210} borderRadius={8} />
            {/* Title */}
            <Skeleton width="100%" height={16} borderRadius={4} />
            {/* Year */}
            <Skeleton width="50%" height={14} borderRadius={4} />
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
  header: {
    paddingHorizontal: theme.spacing.gutter,
    marginBottom: theme.spacing.md,
  },
  scrollContent: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.gutter,
    gap: theme.spacing.md,
  },
  mediaCard: {
    width: 140,
    gap: theme.spacing.sm,
  },
}))
