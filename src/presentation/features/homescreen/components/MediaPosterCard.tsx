import type { FC } from 'react'
import { memo } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import type { Media } from '@/src/domain/entities/Media'
import { t } from '@/src/presentation/shared/i18n'

type MediaPosterCardSize = 'standard' | 'compact'

interface MediaPosterCardProps {
  readonly media: Media
  readonly size?: MediaPosterCardSize
  readonly onPress?: (media: Media) => void
  readonly testID?: string
}

const MediaPosterCardComponent: FC<MediaPosterCardProps> = ({
  media,
  size = 'standard',
  onPress,
  testID,
}) => {
  const poster = media.images.getBestPoster()

  return (
    <Pressable
      testID={testID}
      accessibilityRole={onPress ? 'button' : 'image'}
      accessibilityLabel={media.getDisplayName()}
      onPress={() => onPress?.(media)}
      style={({ pressed }) => [styles.card, styles[size], pressed && styles.pressed]}
    >
      {poster ? (
        <Image
          source={{ uri: poster }}
          style={styles.image}
          resizeMode="cover"
          accessible
          accessibilityLabel={media.getDisplayName()}
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText} numberOfLines={2}>
            {t('home.missing_artwork')}
          </Text>
        </View>
      )}

      <View style={styles.captionContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {media.title}
        </Text>
        {media.year ? (
          <Text style={styles.subtitle}>{media.year}</Text>
        ) : null}
      </View>
    </Pressable>
  )
}

export const MediaPosterCard = memo(MediaPosterCardComponent)

const styles = StyleSheet.create((theme) => ({
  card: {
    width: 152,
    marginRight: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
    // Enhanced shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  standard: {
    width: 152,
  },
  compact: {
    width: 120,
  },
  pressed: {
    transform: [{ scale: 0.95 }],
    // Enhanced shadow on press
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 2 / 3,
    backgroundColor: theme.colors.backgroundTertiary,
  },
  placeholder: {
    width: '100%',
    aspectRatio: 2 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.backgroundTertiary,
  },
  placeholderText: {
    textAlign: 'center',
    color: theme.colors.textTertiary,
    fontSize: theme.fontSize.sm,
  },
  captionContainer: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.backgroundTertiary,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.fontFamily.primary,
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.fontSize.sm * 1.4,
  },
  subtitle: {
    color: theme.colors.textTertiary,
    fontSize: theme.fontSize.xs,
  },
}))
