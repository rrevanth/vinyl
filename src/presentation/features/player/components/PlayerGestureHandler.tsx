import React, { useRef } from 'react'
import { View, Animated } from 'react-native'
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler'
import { observer } from '@legendapp/state/react'

interface PlayerGestureHandlerProps {
  screenWidth: number
  screenHeight: number
  onVolumeChange: (delta: number) => void
  onBrightnessChange: (delta: number) => void
  onToggleControls: () => void
  children: React.ReactNode
}

export const PlayerGestureHandler: React.FC<PlayerGestureHandlerProps> = observer(({
  screenWidth,
  screenHeight,
  onVolumeChange,
  onBrightnessChange,
  onToggleControls,
  children,
}) => {
  // Debouncing refs - track last update time for 60fps
  const lastBrightnessUpdate = useRef<number>(0)
  const lastVolumeUpdate = useRef<number>(0)
  const DEBOUNCE_MS = 16 // 60fps = ~16ms per frame

  // Brightness gesture handler (left side)
  const onBrightnessGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: new Animated.Value(0) } }],
    {
      useNativeDriver: true,
      listener: (event: any) => {
        const now = Date.now()
        if (now - lastBrightnessUpdate.current < DEBOUNCE_MS) {
          return
        }
        lastBrightnessUpdate.current = now

        // Convert vertical translation to brightness delta
        // Negative translationY = swipe up = increase brightness
        const delta = -event.nativeEvent.translationY / screenHeight
        onBrightnessChange(delta)
      },
    }
  )

  // Volume gesture handler (right side)
  const onVolumeGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: new Animated.Value(0) } }],
    {
      useNativeDriver: true,
      listener: (event: any) => {
        const now = Date.now()
        if (now - lastVolumeUpdate.current < DEBOUNCE_MS) {
          return
        }
        lastVolumeUpdate.current = now

        // Convert vertical translation to volume delta
        // Negative translationY = swipe up = increase volume
        const delta = -event.nativeEvent.translationY / screenHeight
        onVolumeChange(delta)
      },
    }
  )

  // Calculate gesture area dimensions
  const gestureAreaTop = screenHeight * 0.15 // 15% margin from top
  const gestureAreaHeight = screenHeight * 0.7 // 70% middle portion
  const leftRightWidth = screenWidth * 0.4 // 40% for left/right
  const centerWidth = screenWidth * 0.2 // 20% for center

  return (
    <View style={{ flex: 1 }}>
      {/* Video player content */}
      {children}

      {/* Left side: Brightness control + Tap */}
      <PanGestureHandler
        onGestureEvent={onBrightnessGestureEvent}
        activeOffsetY={[-5, 5]}
        failOffsetX={[-20, 20]}
        shouldCancelWhenOutside={false}
        simultaneousHandlers={[]}
        maxPointers={1}
      >
        <TapGestureHandler
          onActivated={onToggleControls}
          shouldCancelWhenOutside={false}
          simultaneousHandlers={[]}
        >
          <View
            style={{
              position: 'absolute',
              top: gestureAreaTop,
              left: 0,
              width: leftRightWidth,
              height: gestureAreaHeight,
              zIndex: 10, // Higher z-index to capture gestures
            }}
          />
        </TapGestureHandler>
      </PanGestureHandler>

      {/* Right side: Volume control + Tap */}
      <PanGestureHandler
        onGestureEvent={onVolumeGestureEvent}
        activeOffsetY={[-5, 5]}
        failOffsetX={[-20, 20]}
        shouldCancelWhenOutside={false}
        simultaneousHandlers={[]}
        maxPointers={1}
      >
        <TapGestureHandler
          onActivated={onToggleControls}
          shouldCancelWhenOutside={false}
          simultaneousHandlers={[]}
        >
          <View
            style={{
              position: 'absolute',
              top: gestureAreaTop,
              right: 0,
              width: leftRightWidth,
              height: gestureAreaHeight,
              zIndex: 10, // Higher z-index to capture gestures
            }}
          />
        </TapGestureHandler>
      </PanGestureHandler>

      {/* Center area: Tap only (toggle controls) */}
      <TapGestureHandler
        onActivated={onToggleControls}
        shouldCancelWhenOutside={false}
        simultaneousHandlers={[]}
      >
        <View
          style={{
            position: 'absolute',
            top: gestureAreaTop,
            left: leftRightWidth, // Start after left gesture area
            width: centerWidth,
            height: gestureAreaHeight,
            zIndex: 5, // Lower z-index than sides
          }}
        />
      </TapGestureHandler>
    </View>
  )
})
