import type { FC } from 'react'
import { memo } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { SymbolView } from 'expo-symbols'
import type { Person } from '@/src/domain/entities/Person'
import { t } from '@/src/presentation/shared/i18n'

interface CastCardProps {
  readonly person: Person
  readonly character?: string
  readonly onPress?: () => void
  readonly testID?: string
}

const CastCardComponent: FC<CastCardProps> = ({ person, character, onPress, testID }) => {
  const profileImage = person.images.getBestProfile()
  const hasPress = !!onPress

  const Component = hasPress ? Pressable : View

  return (
    <Component
      testID={testID}
      accessibilityRole={hasPress ? 'button' : undefined}
      accessibilityLabel={
        character
          ? `${person.name}, ${t('media.cast.as')} ${character}`
          : person.name
      }
      accessibilityHint={hasPress ? t('media.cast.view_details_hint') : undefined}
      onPress={onPress}
      style={({ pressed }: { pressed?: boolean }) => [
        styles.container,
        hasPress && pressed && styles.pressed,
      ]}
    >
      <View style={styles.imageContainer}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={styles.image}
            resizeMode="cover"
            accessible={false}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <SymbolView
              name="person.circle.fill"
              size={48}
              tintColor={styles.placeholderIcon.color}
            />
          </View>
        )}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {person.name}
        </Text>
        {character && (
          <Text style={styles.character} numberOfLines={2}>
            {character}
          </Text>
        )}
      </View>
    </Component>
  )
}

export const CastCard = memo(CastCardComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: 'center',
    width: 100,
    marginRight: theme.spacing.md,
  },
  pressed: {
    opacity: 0.7,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: theme.colors.surfaceElevated,
    marginBottom: theme.spacing.sm,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceElevated,
  },
  placeholderIcon: {
    color: theme.colors.textTertiary,
  },
  textContainer: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  name: {
    color: theme.colors.text,
    fontFamily: theme.fontFamily.primary,
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.sm,
    textAlign: 'center',
  },
  character: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
    textAlign: 'center',
  },
}))