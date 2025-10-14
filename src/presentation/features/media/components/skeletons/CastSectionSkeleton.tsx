import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { Skeleton, SkeletonCircle } from '@/src/presentation/shared/ui/atoms/Skeleton'

/**
 * Skeleton loading state for Cast Section
 * Mimics the layout of CastSection component
 */
export const CastSectionSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Section Title */}
      <View style={styles.header}>
        <Skeleton width={80} height={24} borderRadius={4} />
      </View>

      {/* Horizontal ScrollView Skeleton */}
      <View style={styles.scrollContent}>
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} style={styles.castCard}>
            {/* Profile Image */}
            <SkeletonCircle size={100} />
            {/* Name */}
            <Skeleton width="100%" height={16} borderRadius={4} />
            {/* Character */}
            <Skeleton width="80%" height={14} borderRadius={4} />
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
  castCard: {
    width: 100,
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
}))
