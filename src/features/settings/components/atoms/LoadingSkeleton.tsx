import React from 'react'
import { View, Animated } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface LoadingSkeletonProps {
  variant?: 'listItem' | 'card'
  count?: number
}

/**
 * Skeleton loading state component with animated shimmer effect
 * Matches dimensions of actual items for smooth transitions
 */
export const LoadingSkeleton = observer<LoadingSkeletonProps>(
  ({ variant = 'listItem', count = 3 }) => {
    return (
      <View style={styles.container}>
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonItem key={index} variant={variant} delay={index * 100} />
        ))}
      </View>
    )
  }
)

const SkeletonItem: React.FC<{ variant: 'listItem' | 'card'; delay: number }> = observer(
  ({ variant }) => {
    const isCard = variant === 'card'

    return (
      <View style={isCard ? styles.cardContainer : styles.listItemContainer}>
        {/* Logo Skeleton */}
        <ShimmerBox
          width={isCard ? 80 : 48}
          height={isCard ? 80 : 48}
          borderRadius={12}
        />

        {/* Content Skeleton */}
        <View style={styles.content}>
          {/* Name and Version */}
          <View style={styles.row}>
            <ShimmerBox width="60%" height={18} borderRadius={4} />
            <ShimmerBox width={40} height={14} borderRadius={4} />
          </View>

          {/* Description (card only) */}
          {isCard && (
            <View style={styles.descriptionContainer}>
              <ShimmerBox width="100%" height={14} borderRadius={4} />
              <ShimmerBox width="80%" height={14} borderRadius={4} />
            </View>
          )}

          {/* Capabilities */}
          <View style={styles.capabilitiesRow}>
            <ShimmerBox width={60} height={24} borderRadius={6} />
            <ShimmerBox width={50} height={24} borderRadius={6} />
            <ShimmerBox width={70} height={24} borderRadius={6} />
          </View>

          {/* Install Button (card only) */}
          {isCard && <ShimmerBox width="100%" height={44} borderRadius={8} />}
        </View>

        {/* Actions (list item only) */}
        {!isCard && (
          <View style={styles.actions}>
            <ShimmerBox width={40} height={40} borderRadius={20} />
          </View>
        )}
      </View>
    )
  }
)

const ShimmerBox: React.FC<{
  width: number | string
  height: number
  borderRadius: number
}> = observer(({ width, height, borderRadius }) => {
  const opacity = React.useRef(new Animated.Value(0.3)).current

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [opacity])

  return (
    <Animated.View
      style={[
        styles.shimmerBox,
        {
          height,
          borderRadius,
          opacity,
        },
        typeof width === 'number' ? { width } : { width: width as `${number}%` },
      ]}
    />
  )
})

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.sm,
  },
  listItemContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    minHeight: 60,
  },
  cardContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  content: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  descriptionContainer: {
    gap: 4,
  },
  capabilitiesRow: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  shimmerBox: {
    backgroundColor: theme.colors.border,
  },
}))

export type { LoadingSkeletonProps }
