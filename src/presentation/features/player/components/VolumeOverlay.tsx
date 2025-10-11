import React from 'react'
import { View, Text, Animated } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native-unistyles'

interface VolumeOverlayProps {
  visible: boolean
  volume: number // 0.0 to 1.0
  opacity: Animated.Value
}

const DOT_COUNT = 16
const PROGRESS_BAR_WIDTH = 80
const PROGRESS_BAR_HEIGHT = 6
const DOT_SIZE = 1.5

export const VolumeOverlay: React.FC<VolumeOverlayProps> = ({
  visible,
  volume,
  opacity,
}) => {
  if (!visible) {
    return null
  }

  const getVolumeIcon = (): keyof typeof MaterialIcons.glyphMap => {
    if (volume === 0) return 'volume-off'
    if (volume < 0.3) return 'volume-mute'
    if (volume < 0.7) return 'volume-down'
    return 'volume-up'
  }

  const isMuted = volume === 0
  const iconColor = isMuted ? '#FF6B6B' : '#FFFFFF'
  const fillColor = isMuted ? '#FF6B6B' : '#E50914'
  const percentage = Math.round(volume * 100)

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.overlay}>
        <MaterialIcons
          name={getVolumeIcon()}
          size={24}
          color={iconColor}
          style={styles.icon}
        />

        {/* Horizontal Dotted Progress Bar */}
        <View style={styles.progressBarContainer}>
          {/* Dotted background */}
          <View style={styles.dotsContainer}>
            {Array.from({ length: DOT_COUNT }, (_, i) => (
              <View key={i} style={styles.dot} />
            ))}
          </View>

          {/* Progress fill */}
          <View
            style={[
              styles.progressFill,
              {
                width: `${percentage}%`,
                backgroundColor: fillColor,
                shadowColor: fillColor,
              },
            ]}
          />
        </View>

        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create(() => ({
  container: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -60, // Half of overlay width
    marginTop: -60, // Half of overlay height
    zIndex: 1000,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: 120,
    height: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  icon: {
    marginBottom: 8,
  },
  progressBarContainer: {
    width: PROGRESS_BAR_WIDTH,
    height: PROGRESS_BAR_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 8,
  },
  dotsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: DOT_SIZE / 2,
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: PROGRESS_BAR_HEIGHT,
    borderRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  percentageText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
}))
