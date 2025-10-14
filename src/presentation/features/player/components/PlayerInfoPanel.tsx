import React from 'react'
import { View, Text, Pressable, Animated } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'
import type { EnrichedMedia } from '@/src/domain/entities/EnrichedMedia'

interface PlayerInfoPanelProps {
  enrichedMedia: EnrichedMedia
  visible: boolean
  seasonNumber?: number
  episodeNumber?: number
  episodeTitle?: string
  onFromBeginning: () => void
}

export const PlayerInfoPanel: React.FC<PlayerInfoPanelProps> = observer(
  ({
    enrichedMedia,
    visible,
    seasonNumber,
    episodeNumber,
    episodeTitle,
    onFromBeginning,
  }) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: visible ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }, [visible, fadeAnim])

    if (!visible) return null

    const { media, overview, genres, runtime, certification } = enrichedMedia

    // Determine title to display
    const displayTitle = (() => {
      if (media.isSeries() && seasonNumber !== undefined && episodeNumber !== undefined) {
        return episodeTitle || `S${seasonNumber}E${episodeNumber}`
      }
      return media.title
    })()

    // Build metadata row
    const metadataItems = [
      genres?.[0]?.name,
      runtime ? `${runtime}min` : undefined,
      certification,
    ].filter(Boolean)

    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.content}>
          {/* Title */}
          <Text
            style={styles.title}
            numberOfLines={2}
            accessibilityRole="header"
          >
            {displayTitle}
          </Text>

          {/* Synopsis */}
          {overview && (
            <Text style={styles.synopsis} numberOfLines={4}>
              {overview}
            </Text>
          )}

          {/* Metadata Row */}
          {metadataItems.length > 0 && (
            <Text style={styles.metadata} numberOfLines={1}>
              {metadataItems.join(' • ')}
            </Text>
          )}

          {/* Action Button */}
          <View style={styles.buttonRow}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={onFromBeginning}
              accessibilityRole="button"
              accessibilityLabel="Play from beginning"
            >
              <Ionicons name="play" size={18} color="white" />
              <Text style={styles.buttonText}>From Beginning</Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    )
  }
)

const styles = StyleSheet.create(() => ({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 24,
  },
  content: {
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  synopsis: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22.5,
  },
  metadata: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  buttonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
}))
