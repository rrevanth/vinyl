import type { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { StyleSheet } from 'react-native-unistyles'

interface HeroHeaderProps {
  readonly userAvatar?: string
  readonly userName?: string
  readonly onUserPress?: () => void
}

export const HeroHeader: FC<HeroHeaderProps> = ({
  userAvatar,
  userName,
  onUserPress,
}) => {
  const getAvatarText = () => {
    if (userName) {
      return userName.charAt(0).toUpperCase()
    }
    return 'A' // Anonymous fallback
  }

  return (
    <View style={styles.container}>
      <Text style={styles.homeTitle}>Home</Text>

      <Pressable
        onPress={onUserPress}
        style={({ pressed }) => [
          styles.avatarButton,
          pressed && styles.avatarPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={userName ? `${userName} profile` : 'User profile'}
      >
        {userAvatar ? (
          <Image
            source={{ uri: userAvatar }}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
            accessibilityIgnoresInvertColors
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{getAvatarText()}</Text>
          </View>
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'absolute',
    top: 60, // Increased from 16 to account for status bar (44px) + spacing
    left: theme.spacing.gutter,
    right: theme.spacing.gutter,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },

  homeTitle: {
    color: theme.colors.imageText, // Always white
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    fontFamily: theme.fontFamily.heading,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  avatarButton: {
    // No additional styles, just for press handling
  },

  avatarPressed: {
    opacity: 0.7,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // Circular
    backgroundColor: theme.colors.backgroundTertiary, // Loading background
  },

  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20, // Circular
    backgroundColor: theme.colors.imageOverlay, // Semi-transparent dark
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.imageText, // White border
  },

  avatarText: {
    color: theme.colors.imageText, // White text
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
}))
