import { memo } from 'react'
import { Modal, Pressable, ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'
import { t } from '@/src/presentation/shared/i18n'

interface PlaybackSpeedModalProps {
  readonly visible: boolean
  readonly currentSpeed: number
  onClose(): void
  onSelectSpeed(speed: number): void
}

const PLAYBACK_SPEEDS = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0]

export const PlaybackSpeedModal = memo<PlaybackSpeedModalProps>(
  observer(({ visible, currentSpeed, onClose, onSelectSpeed }) => {
    const handleSelectSpeed = (speed: number) => {
      onSelectSpeed(speed)
      onClose()
    }

    const renderSpeedItem = (speed: number) => {
      const isSelected = speed === currentSpeed

      return (
        <Pressable
          key={speed}
          style={({ pressed }) => [
            styles.speedItem,
            pressed && styles.speedItemPressed,
            isSelected && styles.speedItemSelected,
          ]}
          onPress={() => handleSelectSpeed(speed)}
          accessibilityRole="button"
          accessibilityLabel={`${speed}x`}
          accessibilityState={{ selected: isSelected }}
        >
          <View style={styles.speedInfo}>
            <Text style={[styles.speedTitle, isSelected && styles.speedTitleSelected]}>
              {speed.toFixed(2)}x
            </Text>
          </View>

          {isSelected ? (
            <Ionicons name="checkmark-circle" size={24} color={styles.checkmark.color} />
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
        accessibilityLabel={t('player.playback_speed')}
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
              <Text style={styles.title}>{t('player.playback_speed')}</Text>
            </View>

            <ScrollView style={styles.speedList} bounces={false}>
              {PLAYBACK_SPEEDS.map((speed) => renderSpeedItem(speed))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    )
  })
)

PlaybackSpeedModal.displayName = 'PlaybackSpeedModal'

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
  speedList: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  speedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
    minHeight: 60,
  },
  speedItemPressed: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  speedItemSelected: {
    backgroundColor: theme.colors.primaryLight,
    opacity: 0.15,
  },
  speedInfo: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  speedTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
  },
  speedTitleSelected: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold,
  },
  checkmark: {
    color: theme.colors.primary,
  },
}))
