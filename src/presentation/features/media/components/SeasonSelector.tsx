import type { FC } from 'react'
import { memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { Ionicons } from '@expo/vector-icons'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { observer } from '@legendapp/state/react'
import type { Season } from '@/src/domain/capabilities/IMediaSeasonsCapability'
import { selectedSeason$, setSelectedSeason } from '../stores/mediaUI.store'
import { t } from '@/src/presentation/shared/i18n'

interface SeasonSelectorProps {
  readonly seasons: Season[]
}

/**
 * Simple dropdown season selector using native ActionSheet
 * - Shows current season with chevron-down icon
 * - Opens native action sheet for season selection
 * - Only visible when 2+ seasons available
 */
const SeasonSelectorComponent: FC<SeasonSelectorProps> = observer(({ seasons }) => {
  const selectedSeason = selectedSeason$.get()
  const { showActionSheetWithOptions } = useActionSheet()

  const handleOpenActionSheet = () => {
    const options = [
      ...seasons.map((s) =>
        t('media_detail.season').replace('{number}', s.seasonNumber.toString())
      ),
      t('common.cancel'),
    ]
    const cancelButtonIndex = options.length - 1

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: t('media_detail.select_season'),
      },
      (buttonIndex) => {
        if (buttonIndex !== undefined && buttonIndex !== cancelButtonIndex) {
          setSelectedSeason(seasons[buttonIndex].seasonNumber)
        }
      }
    )
  }

  // No seasons or single season - no selector needed
  if (seasons.length === 0 || seasons.length === 1) {
    return null
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleOpenActionSheet}
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
        <Ionicons name="chevron-down" size={20} style={styles.chevronIcon} />
      </Pressable>
    </View>
  )
})

export const SeasonSelector = memo(SeasonSelectorComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 44, // iOS minimum touch target
  },
  dropdownButtonPressed: {
    opacity: 0.7,
  },
  dropdownText: {
    fontSize: theme.fontSize.base,
    fontFamily: theme.fontFamily.primary,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  chevronIcon: {
    color: theme.colors.text,
  },
}))
