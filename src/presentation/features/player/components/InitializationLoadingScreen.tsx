import React, { useEffect, useRef } from 'react'
import {
  View,
  Pressable,
  Animated,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet as UnistylesStyleSheet, useUnistyles } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface InitializationLoadingScreenProps {
  visible: boolean
  backdropUrl?: string
  logoUrl?: string
  title: string
  onClose: () => void
}

export const InitializationLoadingScreen: React.FC<InitializationLoadingScreenProps> = observer(({
  visible,
  backdropUrl,
  logoUrl,
  title,
  onClose,
}) => {
  const { theme } = useUnistyles()
  const styles = stylesheet

  // Animation values
  const backgroundFadeAnim = useRef(new Animated.Value(1)).current
  const backdropImageOpacityAnim = useRef(new Animated.Value(0)).current
  const logoScaleAnim = useRef(new Animated.Value(0.8)).current
  const logoOpacityAnim = useRef(new Animated.Value(0)).current
  const pulseAnim = useRef(new Animated.Value(1)).current

  const pulseAnimationRef = useRef<Animated.CompositeAnimation | null>(null)

  // Get screen dimensions
  const screenDimensions = Dimensions.get('window')

  // Prefetch and fade in backdrop image
  useEffect(() => {
    if (backdropUrl && visible) {
      // Reset opacity
      backdropImageOpacityAnim.setValue(0)

      // Prefetch the image
      Image.prefetch(backdropUrl)
        .then(() => {
          // Image loaded successfully, fade it in smoothly
          Animated.timing(backdropImageOpacityAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }).start()
        })
        .catch(() => {
          // Show backdrop anyway even if prefetch fails
          backdropImageOpacityAnim.setValue(1)
        })
    } else {
      backdropImageOpacityAnim.setValue(0)
    }
  }, [backdropUrl, visible, backdropImageOpacityAnim])

  // Logo entrance and pulse animation
  useEffect(() => {
    if (visible && logoUrl) {
      // Reset animation values
      logoScaleAnim.setValue(0.8)
      logoOpacityAnim.setValue(0)
      pulseAnim.setValue(1)

      // Logo entrance animation - optimized for faster appearance
      Animated.parallel([
        Animated.timing(logoOpacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(logoScaleAnim, {
          toValue: 1,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start()

      // Start continuous pulse animation
      const createPulseAnimation = () => {
        return Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      }

      pulseAnimationRef.current = Animated.loop(createPulseAnimation())
      pulseAnimationRef.current.start()
    }

    // Cleanup pulse animation
    return () => {
      if (pulseAnimationRef.current) {
        pulseAnimationRef.current.stop()
        pulseAnimationRef.current = null
      }
    }
  }, [visible, logoUrl, logoScaleAnim, logoOpacityAnim, pulseAnim])

  // Reset background fade when visibility changes
  useEffect(() => {
    if (visible) {
      backgroundFadeAnim.setValue(1)
    }
  }, [visible, backgroundFadeAnim])

  if (!visible) {
    return null
  }

  const hasLogo = !!logoUrl

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity: backgroundFadeAnim,
          width: screenDimensions.width,
          height: screenDimensions.height,
        },
      ]}
      pointerEvents="auto"
    >
      {/* Backdrop image */}
      {backdropUrl && (
        <Animated.Image
          source={{ uri: backdropUrl }}
          style={[
            StyleSheet.absoluteFill,
            {
              width: screenDimensions.width,
              height: screenDimensions.height,
              opacity: backdropImageOpacityAnim,
            },
          ]}
          resizeMode="cover"
        />
      )}

      {/* Gradient overlay for depth */}
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.6)',
          'rgba(0,0,0,0.8)',
          'rgba(0,0,0,0.9)',
        ]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Close button */}
      <Pressable
        style={styles.closeButton}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close player"
        accessibilityHint="Closes the video player and returns to previous screen"
      >
        <MaterialIcons name="close" size={24} color="#ffffff" />
      </Pressable>

      {/* Content - Logo or Loading indicator */}
      <View style={styles.content}>
        {hasLogo ? (
          <Animated.View
            style={{
              transform: [{ scale: Animated.multiply(logoScaleAnim, pulseAnim) }],
              opacity: logoOpacityAnim,
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: logoUrl }}
              style={{
                width: 300,
                height: 180,
                resizeMode: 'contain',
              }}
              accessibilityLabel={`${title} logo`}
            />
          </Animated.View>
        ) : (
          <ActivityIndicator
            size="large"
            color={theme.colors.primary}
            accessibilityLabel="Loading video player"
          />
        )}
      </View>
    </Animated.View>
  )
})

const stylesheet = UnistylesStyleSheet.create(() => ({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 3000,
    backgroundColor: '#000000',
  },
  closeButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
