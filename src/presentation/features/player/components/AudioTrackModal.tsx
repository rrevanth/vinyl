import { memo } from 'react'
import { Modal, Pressable, ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'
import { player$ } from '../stores/player.store'
import { t } from '@/src/presentation/shared/i18n'
import type { AudioTrack } from '@/src/domain/entities/AudioTrack'

interface AudioTrackModalProps {
  readonly visible: boolean
  onClose(): void
  onSelectTrack(trackId: number | null): void
}

export const AudioTrackModal = memo<AudioTrackModalProps>(
  observer(({ visible, onClose, onSelectTrack }) => {
    const audioTracks = player$.audioTracks.get()
    const selectedTrackId = player$.selectedAudioTrack.get()

    const handleSelectTrack = (trackId: number | null) => {
      onSelectTrack(trackId)
      onClose()
    }

    const renderTrackItem = (track: AudioTrack | null) => {
      const isSelected = track ? track.id === selectedTrackId : selectedTrackId === null
      const isDefault = track === null

      return (
        <Pressable
          key={track?.id ?? 'default'}
          style={({ pressed }) => [
            styles.trackItem,
            pressed && styles.trackItemPressed,
            isSelected && styles.trackItemSelected,
          ]}
          onPress={() => handleSelectTrack(track?.id ?? null)}
          accessibilityRole="button"
          accessibilityLabel={isDefault ? t('player.default') : track?.name}
          accessibilityState={{ selected: isSelected }}
        >
          <View style={styles.trackInfo}>
            <Text style={[styles.trackTitle, isSelected && styles.trackTitleSelected]}>
              {isDefault ? t('player.default') : track?.name}
            </Text>
            {track?.language ? (
              <Text style={styles.trackMeta}>
                {track.language}
                {track.codec ? ` • ${track.codec}` : ''}
              </Text>
            ) : null}
          </View>

          {isSelected ? (
            <Ionicons name="checkmark" size={24} color={styles.checkmark.color} />
          ) : null}
        </Pressable>
      )
    }

    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
        accessibilityLabel={t('player.audio_tracks')}
      >
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityLabel={t('player.close')}
        >
          <Pressable
            style={styles.bottomSheet}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.header}>
              <View style={styles.handle} />
              <Text style={styles.title}>{t('player.audio_tracks')}</Text>
            </View>

            <ScrollView style={styles.trackList} bounces={false}>
              {audioTracks.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>{t('player.no_audio_tracks')}</Text>
                </View>
              ) : (
                <>
                  {renderTrackItem(null)}
                  {audioTracks.map((track) => renderTrackItem(track))}
                </>
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    )
  })
)

AudioTrackModal.displayName = 'AudioTrackModal'

const styles = StyleSheet.create((theme) => ({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    maxHeight: '80%',
    paddingBottom: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.textTertiary,
    borderRadius: 2,
    marginBottom: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  trackList: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
    minHeight: 60,
  },
  trackItemPressed: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  trackItemSelected: {
    backgroundColor: theme.colors.primaryLight,
    opacity: 0.15,
  },
  trackInfo: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  trackTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
  },
  trackTitleSelected: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold,
  },
  trackMeta: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  checkmark: {
    color: theme.colors.primary,
  },
  emptyState: {
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
  },
}))
