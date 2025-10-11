import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { SettingsSection } from '../atoms/SettingsSection'
import { SettingsPickerRow } from '../atoms/SettingsPickerRow'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { IPreferencesService } from '@/src/domain/services/IPreferencesService'
import { VideoPlayerType } from '@/src/domain/entities/VideoPlayerType'
import { t } from '@/src/presentation/shared/i18n'

export const PlaybackSettings = observer(() => {
  const preferencesService = useService<IPreferencesService>(TOKENS.PreferencesService)

  const currentPlayer = preferencesService.getVideoPlayerPreference()

  // Define player options with platform availability
  const PLAYER_OPTIONS = [
    {
      label: t('settings.playback.player_rn_vlc'),
      value: VideoPlayerType.RN_VLC,
      available: true,
      recommended: true,
    },
    {
      label: t('settings.playback.player_external'),
      value: VideoPlayerType.EXTERNAL,
      available: true,
      recommended: false,
    },
  ]

  // Filter to only available options for the picker
  const availableOptions = PLAYER_OPTIONS.filter((option) => option.available).map(
    (option) => ({
      label: option.label,
      value: option.value,
    })
  )

  const handlePlayerChange = async (value: string) => {
    await preferencesService.setVideoPlayerPreference(value as VideoPlayerType)
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Video Player Section */}
      <SettingsSection
        title={t('settings.playback.video_player')}
        footer={t('settings.playback.video_player_description')}
      >
        <SettingsPickerRow
          title={t('settings.playback.video_player')}
          description={t('settings.playback.video_player_options')}
          currentValue={currentPlayer}
          options={availableOptions}
          onValueChange={handlePlayerChange}
          isLast
        />
      </SettingsSection>
    </ScrollView>
  )
})

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
}))

export type {}
