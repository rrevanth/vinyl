import React, { memo, useEffect, useRef } from 'react'
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'
import { player$ } from '../stores/player.store'
import type { SubtitleTrack } from '@/src/domain/entities/SubtitleTrack'

interface SubtitleTrackModalProps {
  readonly visible: boolean
  onClose(): void
  onSelectTrack(trackId: number | null): void
  onShowSettings(): void
}

const SubtitleTrackModalComponent: React.FC<SubtitleTrackModalProps> = ({
  visible,
  onClose,
  onSelectTrack,
  onShowSettings,
}) => {
  const subtitleTracks = player$.subtitleTracks.get()
  const selectedTrackId = player$.selectedSubtitleTrack.get()

  const opacityAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 100,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [visible, opacityAnim, scaleAnim])

  const handleSelectTrack = (trackId: number | null) => {
    onSelectTrack(trackId)
    onClose()
  }

  const handleBack = () => {
    onClose()
    onShowSettings()
  }

  const renderTrackItem = (track: SubtitleTrack | null, showSeparator: boolean) => {
    const isSelected = track ? track.id === selectedTrackId : selectedTrackId === null
    const isNone = track === null
    const trackName = isNone ? 'None' : track.name
    const key = track?.id ?? 'none'

    return (
      <React.Fragment key={key}>
        <Pressable
          style={({ pressed }) => [
            styles.trackItem,
            pressed && styles.trackItemPressed,
          ]}
          onPress={() => handleSelectTrack(track?.id ?? null)}
          accessibilityRole="button"
          accessibilityLabel={trackName}
          accessibilityState={{ selected: isSelected }}
        >
          <Text style={styles.trackTitle}>{trackName}</Text>
          {isSelected ? (
            <Ionicons name="checkmark" size={20} color="#FFFFFF" />
          ) : null}
        </Pressable>
        {showSeparator && <View style={styles.separator} />}
      </React.Fragment>
    )
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        style={styles.overlay}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close subtitle menu"
      >
        <Animated.View
          style={[
            styles.menuContainer,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={handleBack}
              accessibilityRole="button"
              accessibilityLabel="Back to settings"
            >
              <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.title}>Subtitles</Text>
          </View>

          <ScrollView style={styles.trackList} bounces={false}>
            {subtitleTracks.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No subtitle tracks</Text>
              </View>
            ) : (
              <>
                {renderTrackItem(null, true)}
                {subtitleTracks.map((track, index) =>
                  renderTrackItem(track, index < subtitleTracks.length - 1)
                )}
              </>
            )}
          </ScrollView>
        </Animated.View>
      </Pressable>
    </Modal>
  )
}

export const SubtitleTrackModal = memo(observer(SubtitleTrackModalComponent))

SubtitleTrackModal.displayName = 'SubtitleTrackModal'

const styles = StyleSheet.create(() => ({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 220,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    padding: 12,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginBottom: 8,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginRight: 40,
  },
  trackList: {
    maxHeight: 200,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  trackItemPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  trackTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 4,
  },
  emptyState: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
}))
