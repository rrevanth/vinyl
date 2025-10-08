import { memo, useMemo, useState } from 'react'
import { ActivityIndicator, Pressable, RefreshControl, SectionList, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { useSelector } from '@legendapp/state/react'
import { useCatalogManagement } from '@/src/presentation/features/homescreen/hooks/useCatalogManagement'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { t } from '@/src/presentation/shared/i18n'
import type { Catalog } from '@/src/domain/entities/Catalog'
import { CatalogSettingsRow } from '@/src/presentation/features/homescreen/components/CatalogSettingsRow'

interface ProviderSection {
  readonly providerId: string
  readonly providerName: string
  readonly catalogs: readonly Catalog[]
}

const CatalogsEnableScreen = () => {
  const { catalogs, selectedIds, isLoading, error, toggleCatalog, refresh } = useCatalogManagement()

  const [collapsedProviders, setCollapsedProviders] = useState<Set<string>>(new Set())

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])
  const catalogCustomNames = useSelector(() => userPreferences$.homescreen.catalogCustomNames.get())

  // Group catalogs by provider
  const sections = useMemo(() => {
    const grouped = catalogs.reduce<Record<string, ProviderSection>>((acc, catalog) => {
      const providerId = catalog.providerId
      if (!acc[providerId]) {
        // For Stremio addons, try to extract addon name from sourceInfo
        const addonName = catalog.sourceInfo?.addonName
        const providerName = addonName || providerId.toUpperCase()

        acc[providerId] = {
          providerId,
          providerName,
          catalogs: [],
        }
      }
      acc[providerId] = {
        ...acc[providerId],
        catalogs: [...acc[providerId].catalogs, catalog],
      }
      return acc
    }, {})

    return Object.values(grouped).map((section) => ({
      title: `${section.providerName} (${section.catalogs.length})`,
      providerId: section.providerId,
      data: collapsedProviders.has(section.providerId) ? [] : section.catalogs,
    }))
  }, [catalogs, collapsedProviders])

  const toggleProvider = (providerId: string) => {
    setCollapsedProviders((prev) => {
      const next = new Set(prev)
      if (next.has(providerId)) {
        next.delete(providerId)
      } else {
        next.add(providerId)
      }
      return next
    })
  }

  const renderSectionHeader = ({ section }: { section: { title: string; providerId: string } }) => {
    const isCollapsed = collapsedProviders.has(section.providerId)

    return (
      <Pressable
        style={({ pressed }) => [styles.sectionHeader, pressed && styles.sectionHeaderPressed]}
        onPress={() => toggleProvider(section.providerId)}
        accessibilityRole="button"
        accessibilityState={{ expanded: !isCollapsed }}
        accessibilityLabel={`${section.title}, ${isCollapsed ? 'collapsed' : 'expanded'}`}
      >
        <Text style={styles.collapseIcon}>{isCollapsed ? '▶' : '▼'}</Text>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </Pressable>
    )
  }

  const renderItem = ({ item: catalog }: { item: Catalog }) => {
    const isSelected = selectedSet.has(catalog.stableId)
    const customName = catalogCustomNames[catalog.stableId]

    return (
      <CatalogSettingsRow
        catalog={catalog}
        customName={customName}
        isSelected={isSelected}
        onToggle={() => {
          void toggleCatalog(catalog.stableId)
        }}
      />
    )
  }

  const renderListHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{t('settings.catalogs.enable_title')}</Text>
        <Text style={styles.subtitle}>{t('settings.catalogs.enable_subtitle')}</Text>
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

      {catalogs.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionDescription}>
            {t('settings.catalogs.enable_section_description')}
          </Text>
        </View>
      ) : null}
    </>
  )

  const renderListEmpty = () =>
    catalogs.length === 0 && !isLoading ? (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>{t('settings.catalogs.empty_state_title')}</Text>
        <Text style={styles.emptySubtitle}>{t('settings.catalogs.empty_state_subtitle')}</Text>
      </View>
    ) : null

  return (
    <SectionList
      style={styles.container}
      contentContainerStyle={styles.content}
      sections={sections}
      keyExtractor={(item) => item.stableId}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      ListHeaderComponent={renderListHeader}
      ListEmptyComponent={renderListEmpty}
      stickySectionHeadersEnabled={false}
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
    />
  )
}

export default memo(CatalogsEnableScreen)

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  refresh: {
    tintColor: theme.colors.primary,
  },
  header: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
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
    marginBottom: theme.spacing.lg,
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
    marginBottom: theme.spacing.lg,
  },
  spinner: {
    color: theme.colors.primary,
  },
  loadingLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  sectionDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    gap: theme.spacing.sm,
  },
  sectionHeaderPressed: {
    opacity: 0.7,
  },
  collapseIcon: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
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
