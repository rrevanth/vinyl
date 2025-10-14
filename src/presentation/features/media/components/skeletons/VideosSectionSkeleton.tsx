import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { Skeleton } from '@/src/presentation/shared/ui/atoms/Skeleton'

/**
 * Skeleton loading state for Videos Section
 * Mimics the layout of VideosSection component
 */
export const VideosSectionSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Section Title */}
      <View style={styles.header}>
        <Skeleton width={120} height={24} borderRadius={4} />
      </View>

      {/* Horizontal ScrollView Skeleton */}
      <View style={styles.scrollContent}>
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} style={styles.videoCard}>
            {/* Video Thumbnail */}
            <Skeleton width={280} height={158} borderRadius={8} />
            {/* Video Title */}
            <View style={styles.videoInfo}>
              <Skeleton width="100%" height={16} borderRadius={4} />
              <Skeleton width="60%" height={14} borderRadius={4} />
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
  header: {
    paddingHorizontal: theme.spacing.gutter,
    marginBottom: theme.spacing.md,
  },
  scrollContent: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.gutter,
    gap: theme.spacing.md,
  },
  videoCard: {
    width: 280,
    gap: theme.spacing.sm,
  },
  videoInfo: {
    gap: theme.spacing.xs,
  },
}))
