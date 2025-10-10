import { BiographySection } from '@/src/presentation/features/people/components/BiographySection'
import { FilmographySection } from '@/src/presentation/features/people/components/FilmographySection'
import { PersonalInfoSection } from '@/src/presentation/features/people/components/PersonalInfoSection'
import { usePersonDetail } from '@/src/presentation/features/people/hooks/usePersonDetail'
import { t } from '@/src/presentation/shared/i18n'
import { observer } from '@legendapp/state/react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useCallback, useMemo } from 'react'
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import type { Media } from '@/src/domain/entities/Media'
import { useQueryClient } from '@tanstack/react-query'
import type { MediaDetailData } from '@/src/domain/use-cases/media/GetMediaDetailUseCase'

/**
 * Person Detail Screen
 * Dynamic route: /person/[stableId]
 *
 * Pattern:
 * - Get stableId from route params
 * - TanStack Query cache holds person data keyed by stableId
 * - Pre-populate cache before navigation for instant loads
 * - Back navigation works because each stableId has separate cache entry
 *
 * Features:
 * - Person header with profile image and name
 * - Biography section
 * - Personal information (birthdate, birthplace, department)
 * - Filmography section with tab filtering (All, Movies, TV)
 */
const PersonDetailScreen = observer(() => {
  // Get route parameters
  const { stableId: encodedStableId } = useLocalSearchParams<{ stableId: string }>()
  const stableId = encodedStableId ? decodeURIComponent(encodedStableId) : ''
  const queryClient = useQueryClient()
  const { theme } = useUnistyles()

  const headerOptions = useMemo(
    () => ({
      headerShown: true,
      headerTransparent: true,
      headerBackButtonDisplayMode: 'minimal' as const,
      headerTitle: '',
      headerTintColor: theme.colors.text,
      headerBackTitle: '',
    }),
    [theme.colors.text]
  )

  // Get all data from TanStack Query
  const { person, metadata, filmography, isLoading, error } = usePersonDetail(stableId)

  // Event handlers
  const handlePressMedia = useCallback((media: Media) => {
    // Pre-populate cache with Media object before navigation
    queryClient.setQueryData<MediaDetailData>(['media-detail', media.stableId], {
      media: media,
      externalIds: media.externalIds,
      // Other fields will be fetched by use case
      providersUsed: {},
      errors: {},
    })

    // Navigate to media detail
    router.push(`/media/${encodeURIComponent(media.stableId)}`)
  }, [queryClient])

  // Loading state
  if (!person || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Stack.Screen options={headerOptions} />
        <ActivityIndicator size="large" color={styles.primaryColor.color} />
        <Text style={styles.loadingText}>{t('person_detail.loading')}</Text>
      </View>
    )
  }

  // Error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen options={headerOptions} />
        <Text style={styles.errorText}>{t('person_detail.error_loading')}</Text>
        <Text style={styles.errorDetails}>{error}</Text>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.retryButton, pressed && styles.retryButtonPressed]}
          accessibilityRole="button"
          accessibilityLabel={t('media_detail.retry')}
        >
          <Text style={styles.retryButtonText}>{t('common.close')}</Text>
        </Pressable>
      </View>
    )
  }

  const profileImage = person.images.getBestProfile()

  return (
    <View style={styles.container}>
      {/* Configure Stack Screen */}
      <Stack.Screen options={headerOptions} />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Person Header */}
        <View style={styles.header}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
              resizeMode="cover"
              accessible
              accessibilityLabel={person.name}
            />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.profileInitial}>
                {person.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}

          <View style={styles.headerInfo}>
            <Text
              style={styles.name}
              numberOfLines={2}
              accessibilityRole="header"
              accessibilityLabel={person.name}
            >
              {person.name}
            </Text>

            {person.knownForDepartment && (
              <Text style={styles.department}>{person.knownForDepartment}</Text>
            )}
          </View>
        </View>

        {/* Personal Information Section */}
        {metadata && <PersonalInfoSection metadata={metadata} />}

        {/* Biography Section */}
        {metadata && <BiographySection metadata={metadata} />}

        {/* Filmography Section */}
        {filmography && <FilmographySection filmography={filmography} onPressMedia={handlePressMedia} />}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  )
})

export default PersonDetailScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
    marginTop: theme.spacing.md,
  },
  primaryColor: {
    color: theme.colors.primary,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  errorDetails: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  retryButtonPressed: {
    opacity: 0.85,
  },
  retryButtonText: {
    color: theme.colors.background,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 100, // Account for transparent header
    paddingBottom: theme.spacing.xl,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.surfaceElevated,
    marginBottom: theme.spacing.md,
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  profileInitial: {
    color: theme.colors.text,
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
  },
  headerInfo: {
    alignItems: 'center',
  },
  name: {
    color: theme.colors.text,
    fontSize: theme.fontSize['2xl'],
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  department: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
  },
  bottomSpacer: {
    height: theme.spacing['2xl'],
  },
}))
