import { BiographySection } from '@/src/presentation/features/people/components/BiographySection'
import { PersonalInfoSection } from '@/src/presentation/features/people/components/PersonalInfoSection'
import { PersonHero } from '@/src/presentation/features/people/components/PersonHero'
import { FilmographyCatalogRow } from '@/src/presentation/features/people/components/FilmographyCatalogRow'
import { usePersonDetail } from '@/src/presentation/features/people/hooks/usePersonDetail'
import { t } from '@/src/presentation/shared/i18n'
import { observer } from '@legendapp/state/react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useCallback, useMemo } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import type { Media } from '@/src/domain/entities/Media'
import { LinearGradient } from 'expo-linear-gradient'
import {
  deserializePersonFromNav,
  serializeMediaForNav,
} from '@/src/presentation/shared/utils/navigationParams'
import { createPersonFromNavParams } from '@/src/presentation/shared/utils/createPersonFromNavParams'

/**
 * Person Detail Screen
 * Dynamic route: /person/[stableId]
 *
 * NEW PATTERN:
 * - Person entity passed via router params (personData)
 * - Enrichments cached via TanStack Query (server state only)
 * - No cache dependency for Person entity (navigation state)
 *
 * Features:
 * - Person header with profile image and name
 * - Biography section
 * - Personal information (birthdate, birthplace, department)
 * - Filmography section with tab filtering (All, Movies, TV)
 */
const PersonDetailScreen = observer(() => {
  // Get route parameters and parse Person from lightweight params
  const params = useLocalSearchParams<{ stableId: string; personData: string }>()

  // Deserialize lightweight nav params
  const navParams = useMemo(() => deserializePersonFromNav(params.personData), [params.personData])

  // Create minimal Person entity for instant rendering
  const person = useMemo(() => createPersonFromNavParams(navParams), [navParams])

  const headerOptions = useMemo(
    () => ({
      headerShown: true,
      headerTransparent: true,
      headerBackButtonDisplayMode: 'minimal' as const,
      headerTitle: '',
      headerTintColor: '#FFFFFF',
      headerBackTitle: '',
      headerBackground: () => (
        <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']} style={{ flex: 1 }} />
      ),
    }),
    []
  )

  // Get enrichments from TanStack Query (Person comes from params)
  const { metadata, filmography, isLoading, error } = usePersonDetail(person)

  // Event handlers
  const handlePressMedia = useCallback(
    (media: Media) => {
      // Navigate with lightweight Media data (optimized for performance)
      router.push({
        pathname: '/media/[stableId]',
        params: {
          stableId: media.stableId,
          mediaData: serializeMediaForNav(media),
        },
      })
    },
    []
  )

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
        {/* Person Hero with Profile Image and Strong Overlay */}
        <PersonHero person={person} metadata={metadata} height={500} />

        {/* Personal Information Section */}
        {metadata && <PersonalInfoSection metadata={metadata} />}

        {/* Biography Section */}
        {metadata && <BiographySection metadata={metadata} />}

        {/* Filmography as Catalog Rows */}
        {filmography &&
          filmography.map((catalog) => (
            <FilmographyCatalogRow
              key={catalog.stableId}
              catalog={catalog}
              onPressMedia={handlePressMedia}
            />
          ))}

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
  bottomSpacer: {
    height: theme.spacing['2xl'],
  },
}))
