import type { FC } from 'react'
import { Fragment, memo } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'

interface MetadataRowProps {
  readonly year?: number
  readonly certification?: string
  readonly runtime?: number
  readonly voteAverage?: number
  readonly voteCount?: number
}

const MetadataRowComponent: FC<MetadataRowProps> = ({
  year,
  certification,
  runtime,
  voteAverage,
  voteCount,
}) => {
  const metadata: string[] = []
  
  if (year) metadata.push(year.toString())
  if (certification) metadata.push(certification)
  if (runtime) {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    if (hours > 0) {
      metadata.push(minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`)
    } else {
      metadata.push(`${minutes}m`)
    }
  }
  
  const hasRating = voteAverage && voteAverage > 0
  
  return (
    <View style={styles.container}>
      {/* Primary Metadata */}
      {metadata.length > 0 && (
        <View style={styles.metadataRow}>
          {metadata.map((item, index) => (
            <Fragment key={index}>
              <Text style={styles.metadataText}>{item}</Text>
              {index < metadata.length - 1 && (
                <Text style={styles.separator}>•</Text>
              )}
            </Fragment>
          ))}
        </View>
      )}
      
      {/* Rating */}
      {hasRating && (
        <View style={styles.ratingContainer}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color="#FFC107" />
            <Text style={styles.ratingText}>{voteAverage.toFixed(1)}</Text>
          </View>
          {voteCount && voteCount > 0 && (
            <Text style={styles.voteCount}>
              ({voteCount.toLocaleString()})
            </Text>
          )}
        </View>
      )}
    </View>
  )
}

export const MetadataRow = memo(MetadataRowComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    flexWrap: 'wrap',
  },
  metadataText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  separator: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    marginHorizontal: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  voteCount: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
}))
