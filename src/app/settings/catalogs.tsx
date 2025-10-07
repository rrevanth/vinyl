import { memo, useMemo } from 'react'
import { ActivityIndicator, RefreshControl, ScrollView, Switch, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { useCatalogManagement } from '@/src/presentation/features/homescreen/hooks/useCatalogManagement'
import { t } from '@/src/presentation/shared/i18n'

const CatalogSettingsScreen = () => {
  const { catalogs, selectedIds, isLoading, error, toggleCatalog, refresh } = useCatalogManagement()

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            void refresh()
          }}
          tintColor={styles.refresh.tintColor}
          title={t('settings.catalogs.refresh_label')}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>{t('settings.catalogs.title')}</Text>
        <Text style={styles.subtitle}>{t('settings.catalogs.subtitle')}</Text>
      </View>

      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorTitle}>{t('settings.catalogs.error_title')}</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      ) : null}

      {isLoading && catalogs.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={styles.spinner.color} />
          <Text style={styles.loadingLabel}>{t('settings.catalogs.loading')}</Text>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.catalogs.catalog_section_title')}</Text>
        <Text style={styles.sectionDescription}>
          {t('settings.catalogs.catalog_section_description')}
        </Text>
      </View>

      {catalogs.map((catalog, index) => {
        const isSelected = selectedSet.has(catalog.stableId)

        return (
          <View key={`${catalog.stableId}-${index}`} style={styles.catalogRow}>
            <View style={styles.catalogMeta}>
              <Text style={styles.catalogTitle} numberOfLines={1}>
                {catalog.name}
              </Text>
              <Text style={styles.catalogSubtitle} numberOfLines={1}>
                {catalog.providerId} · {catalog.category}
              </Text>
            </View>
            <Switch
              value={isSelected}
              onValueChange={() => {
                void toggleCatalog(catalog.stableId)
              }}
              accessibilityLabel={t('settings.catalogs.catalog_toggle_accessibility').replace(
                '{name}',
                catalog.name
              )}
            />
          </View>
        )
      })}

      {catalogs.length === 0 && !isLoading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>{t('settings.catalogs.empty_state_title')}</Text>
          <Text style={styles.emptySubtitle}>{t('settings.catalogs.empty_state_subtitle')}</Text>
        </View>
      ) : null}
    </ScrollView>
  )
}

export default memo(CatalogSettingsScreen)

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  refresh: {
    tintColor: theme.colors.primary,
  },
  header: {
    gap: theme.spacing.xs,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  errorBanner: {
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.errorLight,
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  errorTitle: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  },
  errorMessage: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
  },
  loadingContainer: {
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
  section: {
    gap: theme.spacing.xs,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  sectionDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  catalogRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  catalogMeta: {
    flex: 1,
    marginRight: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  catalogTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
  },
  catalogSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.xs,
  },
  emptyState: {
    paddingVertical: theme.spacing.xl,
    gap: theme.spacing.xs,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
  },
  emptySubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
}))
