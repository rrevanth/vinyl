import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import type { Season } from '@/src/domain/capabilities/IMediaSeasonsCapability'
import { mediaDetail$, setSelectedSeason } from '../stores/mediaDetail.store'
import { t } from '@/src/presentation/shared/i18n'

interface SeasonSelectorProps {
  readonly seasons: Season[]
}

/**
 * Horizontal season selector for series
 * Updates Legend State store on selection
 */
const SeasonSelectorComponent: FC<SeasonSelectorProps> = observer(({ seasons }) => {
  const selectedSeason = mediaDetail$.selectedSeason.get()

  const handleSelectSeason = useCallback((seasonNumber: number) => {
    setSelectedSeason(seasonNumber)
  }, [])

  if (seasons.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('media_detail.seasons')}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {seasons.map((season) => {
          const isSelected = season.seasonNumber === selectedSeason

          return (
            <Pressable
              key={season.id}
              onPress={() => handleSelectSeason(season.seasonNumber)}
              style={({ pressed }) => [
                styles.seasonButton,
                isSelected && styles.seasonButtonSelected,
                pressed && styles.seasonButtonPressed,
              ]}
              accessibilityRole="tab"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={t('media_detail.season').replace(
                '{number}',
                season.seasonNumber.toString()
              )}
            >
              <Text
                style={[
                  styles.seasonButtonText,
                  isSelected && styles.seasonButtonTextSelected,
                ]}
              >
                {season.name || t('media_detail.season').replace('{number}', season.seasonNumber.toString())}
              </Text>
              <Text
                style={[
                  styles.episodeCount,
                  isSelected && styles.episodeCountSelected,
                ]}
              >
                {t('media_detail.episode_count').replace('{count}', season.episodeCount.toString())}
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
})

export const SeasonSelector = memo(SeasonSelectorComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingVertical: theme.spacing.lg,
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  seasonButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    minWidth: 120,
    alignItems: 'center',
  },
  seasonButtonSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  seasonButtonPressed: {
    opacity: 0.85,
  },
  seasonButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
  seasonButtonTextSelected: {
    color: theme.colors.background,
  },
  episodeCount: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
    marginTop: theme.spacing.micro,
  },
  episodeCountSelected: {
    color: theme.colors.background,
    opacity: 0.9,
  },
}))