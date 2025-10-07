import { Fragment } from 'react'
import { observer } from '@legendapp/state/react'
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { t } from '@/src/presentation/shared/i18n'
import { HeroCarousel } from '@/src/presentation/features/homescreen/components/HeroCarousel'
import { ContinueWatchingRail } from '@/src/presentation/features/homescreen/components/ContinueWatchingRail'
import { CatalogRow } from '@/src/presentation/features/homescreen/components/CatalogRow'
import { useHomescreenData } from '@/src/presentation/features/homescreen/hooks/useHomescreenData'

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

  const showContinueWatching = preferences.showContinueWatching && continueWatching.length > 0

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => refresh()}
          tintColor={styles.refreshControl.color}
          title={t('home.refresh_label')}
        />
      }
    >
      <View style={styles.content}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={styles.spinner.color} />
            <Text style={styles.loadingLabel}>{t('home.loading')}</Text>
          </View>
        ) : (
          <Fragment>
            <HeroCarousel items={heroItems} />

            {showContinueWatching ? <ContinueWatchingRail items={continueWatching} /> : null}

            {catalogs.length > 0 ? (
              catalogs.map((catalog) => <CatalogRow key={catalog.stableId} catalog={catalog} />)
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>{t('home.empty_state_title')}</Text>
                <Text style={styles.emptySubtitle}>{t('home.empty_state_subtitle')}</Text>
              </View>
            )}
          </Fragment>
        )}

        {error ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorTitle}>{t('home.error_title')}</Text>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  )
})

export default HomeScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingVertical: theme.spacing.xl,
    gap: theme.spacing.xl,
  },
  loadingContainer: {
    paddingVertical: theme.spacing['2xl'],
    alignItems: 'center',
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
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'flex-start',
    gap: theme.spacing.xs,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  emptySubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  errorBanner: {
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.errorLight,
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
