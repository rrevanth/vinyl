import type { Catalog } from '@/src/domain/entities/Catalog'
import { CatalogRow } from '@/src/presentation/features/homescreen/components/CatalogRow'
import { ContinueWatchingRail } from '@/src/presentation/features/homescreen/components/ContinueWatchingRail'
import { HomescreenHero } from '@/src/presentation/features/homescreen/components/HomescreenHero'
import { useHomescreenData } from '@/src/presentation/features/homescreen/hooks/useHomescreenData'
import { t } from '@/src/presentation/shared/i18n'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { LegendList } from '@legendapp/list'
import { observer, useSelector } from '@legendapp/state/react'
import { Fragment, useCallback } from 'react'
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { StyleSheet } from 'react-native-unistyles'

// Create AnimatedLegendList component
const AnimatedLegendList = Animated.createAnimatedComponent(LegendList<Catalog>)

const HomeScreen = observer(() => {
  const {
    heroItems,
    continueWatching,
    catalogs,
    isLoading,
    isRefreshing,
    error,
    preferences,
    refresh,
  } = useHomescreenData()

  const showHero = preferences.heroEnabled && heroItems.length > 0
  const showContinueWatching = preferences.showContinueWatching && continueWatching.length > 0

  // Get catalog preferences outside of render functions for performance
  const catalogPreferences = useSelector(() => userPreferences$.catalogPreferences.get())

  // Track scroll position for hero parallax
  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

  // Create header component with Hero and Continue Watching
  const renderListHeader = useCallback(() => {
    if (!showHero && !showContinueWatching) {
      return null
    }

    return (
      <Fragment>
        {showHero ? <HomescreenHero items={heroItems} scrollY={scrollY} /> : null}
        {showContinueWatching ? <ContinueWatchingRail items={continueWatching} /> : null}
      </Fragment>
    )
  }, [showHero, showContinueWatching, heroItems, continueWatching, scrollY])

  // Render empty state
  const renderListEmpty = useCallback(() => {
    if (isLoading) {
      return null
    }

    // Check if no catalogs are enabled (different from no catalogs available)
    const enabledCatalogCount = Object.keys(catalogPreferences).length

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>
          {enabledCatalogCount === 0
            ? t('home.no_catalogs_enabled_title')
            : t('home.empty_state_title')}
        </Text>
        <Text style={styles.emptySubtitle}>
          {enabledCatalogCount === 0
            ? t('home.no_catalogs_enabled_subtitle')
            : t('home.empty_state_subtitle')}
        </Text>
      </View>
    )
  }, [isLoading, catalogPreferences])

  // Show loading state for initial load
  if (isLoading && catalogs.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={styles.spinner.color} />
          <Text style={styles.loadingLabel}>{t('home.loading')}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <AnimatedLegendList
        data={catalogs}
        keyExtractor={(catalog: Catalog) => catalog.stableId}
        renderItem={({ item: catalog }) => <CatalogRow catalog={catalog} />}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderListEmpty}
        contentContainerStyle={styles.listContent}
        contentInsetAdjustmentBehavior="never"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => refresh()}
            tintColor={styles.refreshControl.color}
            title={t('home.refresh_label')}
          />
        }
        estimatedItemSize={280}
        drawDistance={600}
      />

      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorTitle}>{t('home.error_title')}</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      ) : null}
    </View>
  )
})

export default HomeScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    paddingTop: 0, // No top padding for edge-to-edge hero
    paddingBottom: theme.spacing.xl, // Keep bottom padding for tab bar
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing['2xl'],
    gap: theme.spacing.sm,
  },
  spinner: {
    color: theme.colors.primary,
  },
  loadingLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  refreshControl: {
    color: theme.colors.primary,
  },
  emptyState: {
    paddingHorizontal: theme.spacing.gutter,
    paddingVertical: theme.spacing['3xl'],
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize['2xl'],
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
    textAlign: 'center',
    maxWidth: 400,
  },
  errorBanner: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.errorLight,
    shadowColor: theme.colors.overlay,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorTitle: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.primary,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
  },
  errorMessage: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
  },
}))
