import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  Modal,
  Pressable,
  Animated,
  Easing,
} from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'

interface PlayerSettingsMenuProps {
  visible: boolean
  onClose: () => void
  onPlaybackSpeed: () => void
  onAudioTrack: () => void
  onSubtitles: () => void
}

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  onPress: () => void
  showSeparator?: boolean
}

const MenuItem: React.FC<MenuItemProps> = observer(({
  icon,
  label,
  onPress,
  showSeparator = true,
}) => {
  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.menuItem,
          pressed && styles.menuItemPressed,
        ]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <Ionicons name={icon} size={20} color="#FFFFFF" />
        <Text style={styles.menuItemLabel}>{label}</Text>
      </Pressable>
      {showSeparator && <View style={styles.separator} />}
    </>
  )
})

export const PlayerSettingsMenu: React.FC<PlayerSettingsMenuProps> = observer(({
  visible,
  onClose,
  onPlaybackSpeed,
  onAudioTrack,
  onSubtitles,
}) => {
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
        accessibilityLabel="Close settings menu"
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
          <MenuItem
            icon="speedometer"
            label="Playback Speed"
            onPress={onPlaybackSpeed}
          />
          <MenuItem
            icon="musical-notes"
            label="Audio Track"
            onPress={onAudioTrack}
          />
          <MenuItem
            icon="text"
            label="Subtitles"
            onPress={onSubtitles}
            showSeparator={false}
          />
        </Animated.View>
      </Pressable>
    </Modal>
  )
})

const styles = StyleSheet.create(() => ({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    padding: 12,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    gap: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  menuItemPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  menuItemLabel: {
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
}))
