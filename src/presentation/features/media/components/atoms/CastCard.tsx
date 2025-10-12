import type { FC } from 'react'
import { memo } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { SymbolView } from 'expo-symbols'
import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import type { Person } from '@/src/domain/entities/Person'
import type { PersonDetailData } from '@/src/domain/use-cases/people/GetPersonDetailUseCase'
import { t } from '@/src/presentation/shared/i18n'

interface CastCardProps {
  readonly person: Person
  readonly character?: string
  readonly onPress?: () => void
  readonly testID?: string
}

const CastCardComponent: FC<CastCardProps> = ({ person, character, onPress, testID }) => {
  const profileImage = person.images.getBestProfile()
  const queryClient = useQueryClient()

  const handlePress = () => {
    if (onPress) {
      onPress()
      return
    }

    // Pre-populate TanStack Query cache with Person object before navigation
    queryClient.setQueryData<PersonDetailData>(['person-detail', person.stableId], {
      person,
      externalIds: person.externalIds,
      enrichments: {
        metadata: null,
        filmography: null,
        images: null,
      },
      providersUsed: {
        metadata: [],
        filmography: [],
        images: [],
      },
      errors: {},
    })

    // Navigate with encoded stableId for URL safety
    const encodedStableId = encodeURIComponent(person.stableId)
    router.push(`/person/${encodedStableId}` as any)
  }

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={
        character
          ? `${person.name}, ${t('media.cast.as')} ${character}`
          : person.name
      }
      accessibilityHint={t('media.cast.view_details_hint')}
      onPress={handlePress}
      style={({ pressed }: { pressed?: boolean }) => [
        styles.container,
        pressed && styles.pressed,
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
    </Pressable>
  )
}

export const CastCard = memo(CastCardComponent)

const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: 'center',
    width: 110,
    marginRight: theme.spacing.md,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  imageContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: 'hidden',
    backgroundColor: theme.colors.backgroundTertiary,
    marginBottom: theme.spacing.sm,
    borderWidth: 2,
    borderColor: theme.colors.border,
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
    backgroundColor: theme.colors.backgroundTertiary,
  },
  placeholderIcon: {
    color: theme.colors.textTertiary,
  },
  textContainer: {
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
  },
  name: {
    color: theme.colors.text,
    fontFamily: theme.fontFamily.primary,
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.sm,
    textAlign: 'center',
  },
  character: {
    color: theme.colors.textTertiary,
    fontSize: theme.fontSize.xs,
    textAlign: 'center',
  },
}))