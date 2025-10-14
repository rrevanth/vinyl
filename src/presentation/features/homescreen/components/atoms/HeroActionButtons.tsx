import type { Media } from '@/src/domain/entities/Media'
import { Ionicons } from '@expo/vector-icons'
import type { FC } from 'react'
import { memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

interface HeroActionButtonsProps {
  readonly media: Media
  readonly onPlay?: () => void
  readonly onAddToWatchlist?: () => void
  readonly isInWatchlist?: boolean
}

const HeroActionButtonsComponent: FC<HeroActionButtonsProps> = ({
  media,
  onPlay,
  onAddToWatchlist,
  isInWatchlist = false,
}) => {
  const playLabel = media.type === 'movie' ? 'Play Movie' : 'Play Series'
  const watchlistIcon = isInWatchlist ? 'checkmark' : 'add'
  const watchlistLabel = isInWatchlist ? 'In Watchlist' : 'Watchlist'
  
  return (
    <View style={styles.container}>
      {/* Primary Play Button (Apple TV style - white background) */}
      {onPlay && (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.playButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={onPlay}
          accessibilityRole="button"
          accessibilityLabel={playLabel}
        >
          <Ionicons name="play" size={20} color="#000000" />
          <Text style={styles.playButtonText}>{playLabel}</Text>
        </Pressable>
      )}
      
      {/* Secondary Watchlist Button (Apple TV style - transparent with border) */}
      {onAddToWatchlist && (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.watchlistButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={onAddToWatchlist}
          accessibilityRole="button"
          accessibilityLabel={watchlistLabel}
        >
          <Ionicons name={watchlistIcon} size={24} color="#FFFFFF" />
        </Pressable>
      )}
    </View>
  )
}

export const HeroActionButtons = memo(HeroActionButtonsComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 40,
    minHeight: 48,
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  // Play Button - White solid (Apple TV primary style)
  playButton: {
    backgroundColor: '#FFFFFF',
    minWidth: 140,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  // Watchlist Button - Transparent with white border (Apple TV secondary style)
  watchlistButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: 16,
    minWidth: 48,
  },
  watchlistButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
}))
