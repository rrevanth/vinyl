import type { FC } from 'react'
import { memo } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import type { EnrichedMedia } from '@/src/domain/entities/EnrichedMedia'
import { t } from '@/src/presentation/shared/i18n'

interface MetadataSectionProps {
  readonly enrichedData: EnrichedMedia
}

/**
 * Metadata section displaying title, year, rating, genres, and synopsis
 * Follows app design standards with Unistyles theming
 */
const MetadataSectionComponent: FC<MetadataSectionProps> = ({ enrichedData }) => {
  const { media } = enrichedData

  // Format runtime
  const runtime = enrichedData.runtime
    ? t('media_detail.runtime_minutes').replace('{minutes}', enrichedData.runtime.toString())
    : null

  // Format release date
  const releaseDate = enrichedData.releaseDate
    ? new Date(enrichedData.releaseDate).getFullYear()
    : media.year

  // Format genres
  const genres = enrichedData.genres?.map((g) => g.name).join(', ')

  // Format rating
  const rating = enrichedData.voteAverage
    ? `${enrichedData.voteAverage.toFixed(1)}/10`
    : null

  const certification = enrichedData.certification

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text
        style={styles.title}
        numberOfLines={2}
        accessibilityRole="header"
        accessibilityLabel={media.title}
      >
        {media.title}
      </Text>

      {/* Tagline (if available) */}
      {enrichedData.tagline && (
        <Text style={styles.tagline} numberOfLines={2}>
          {enrichedData.tagline}
        </Text>
      )}

      {/* Metadata Row: Year • Runtime • Rating • Certification */}
      <View style={styles.metadataRow}>
        {releaseDate && <Text style={styles.metadataText}>{releaseDate}</Text>}

        {releaseDate && runtime && <Text style={styles.separator}>•</Text>}
        {runtime && <Text style={styles.metadataText}>{runtime}</Text>}

        {runtime && certification && <Text style={styles.separator}>•</Text>}
        {certification && (
          <View style={styles.certificationBadge}>
            <Text style={styles.certificationText}>{certification}</Text>
          </View>
        )}

        {(runtime || certification) && rating && <Text style={styles.separator}>•</Text>}
        {rating && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>⭐ {rating}</Text>
          </View>
        )}
      </View>

      {/* Genres */}
      {genres && (
        <View style={styles.genresContainer}>
          <Text style={styles.genresLabel}>{t('media_detail.genres')}:</Text>
          <Text style={styles.genresText}>{genres}</Text>
        </View>
      )}

      {/* Synopsis */}
      <View style={styles.synopsisContainer}>
        <Text style={styles.synopsisLabel}>{t('media_detail.synopsis')}</Text>
        <Text style={styles.synopsisText}>
          {enrichedData.overview || t('media_detail.no_synopsis')}
        </Text>
      </View>
    </View>
  )
}

export const MetadataSection = memo(MetadataSectionComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize['2xl'],
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.sm,
  },
  tagline: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
    fontStyle: 'italic',
    marginBottom: theme.spacing.md,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.lg,
  },
  metadataText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },
  separator: {
    color: theme.colors.textTertiary,
    fontSize: theme.fontSize.sm,
    marginHorizontal: theme.spacing.xs,
  },
  certificationBadge: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
  },
  certificationText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  ratingBadge: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
  },
  ratingText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  genresLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    marginRight: theme.spacing.xs,
  },
  genresText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    flex: 1,
  },
  synopsisContainer: {
    marginTop: theme.spacing.sm,
  },
  synopsisLabel: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.sm,
  },
  synopsisText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
    lineHeight: theme.fontSize.base * 1.5,
  },
}))