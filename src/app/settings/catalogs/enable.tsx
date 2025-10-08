import type { Catalog } from '@/src/domain/entities/Catalog'
import { useCatalogManagement } from '@/src/presentation/features/homescreen/hooks/useCatalogManagement'
import { t } from '@/src/presentation/shared/i18n'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from '@legendapp/state/react'
import { memo, useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Switch, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

interface ProviderSection {
  readonly providerId: string
  readonly providerName: string
  readonly catalogs: readonly Catalog[]
}

const CatalogsEnableScreen = () => {
  const { catalogs, selectedIds, isLoading, error, toggleCatalog } = useCatalogManagement()

  const [expandedProviders, setExpandedProviders] = useState<Set<string>>(new Set())

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])
  const catalogPreferences = useSelector(() => userPreferences$.catalogPreferences.get())

  // Group catalogs by provider
  const providerSections = useMemo(() => {
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

    return Object.values(grouped)
  }, [catalogs])

  // Toggle provider expansion
  const toggleProvider = useCallback((providerId: string) => {
    setExpandedProviders((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(providerId)) {
        newSet.delete(providerId)
      } else {
        newSet.add(providerId)
      }
      return newSet
    })
  }, [])

  // Toggle all catalogs for a provider
  const toggleAllCatalogs = useCallback(
    (providerId: string, providerCatalogs: Catalog[]) => {
      const providerCatalogIds = providerCatalogs.map((c) => c.stableId)
      const allSelected = providerCatalogIds.every((id) => selectedSet.has(id))

      if (allSelected) {
        // Deselect all
        providerCatalogIds.forEach((id) => {
          if (selectedSet.has(id)) {
            void toggleCatalog(id)
          }
        })
      } else {
        // Select all
        providerCatalogIds.forEach((id) => {
          if (!selectedSet.has(id)) {
            void toggleCatalog(id)
          }
        })
      }
    },
    [selectedSet, toggleCatalog]
  )

  if (isLoading && catalogs.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={styles.spinner.color} />
          <Text style={styles.loadingLabel}>{t('settings.catalogs.loading')}</Text>
        </View>
      </View>
    )
  }

  if (catalogs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="library-outline" size={64} color={styles.iconColor.color} />
        <Text style={styles.emptyText}>{t('settings.catalogs.no_catalogs_title')}</Text>
        <Text style={styles.emptySubtitle}>{t('settings.catalogs.no_catalogs_subtitle')}</Text>
      </View>
    )
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('settings.catalogs.enable_title')}</Text>
        <Text style={styles.headerDescription}>{t('settings.catalogs.enable_subtitle')}</Text>
      </View>

      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorTitle}>{t('settings.catalogs.error_title')}</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      ) : null}

      {/* Provider Sections */}
      {providerSections.map((section) => {
        const isExpanded = expandedProviders.has(section.providerId)
        const enabledCount = section.catalogs.filter((catalog) =>
          selectedSet.has(catalog.stableId)
        ).length
        const allEnabled = section.catalogs.every((catalog) => selectedSet.has(catalog.stableId))

        return (
          <View key={section.providerId} style={styles.providerSection}>
            {/* Provider Header */}
            <Pressable
              style={styles.providerHeader}
              onPress={() => toggleProvider(section.providerId)}
              accessibilityRole="button"
              accessibilityLabel={`${section.providerName}. ${isExpanded ? 'Collapse' : 'Expand'} section.`}
              accessibilityState={{ expanded: isExpanded }}
            >
              <View style={styles.providerHeaderLeft}>
                <Ionicons name="library-outline" size={24} color={styles.iconColor.color} />
                <Text style={styles.providerName}>{section.providerName}</Text>
                <Text style={styles.catalogCount}>
                  {enabledCount}/{section.catalogs.length}
                </Text>
              </View>
              <Ionicons
                name={isExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
                size={20}
                color={styles.chevronColor.color}
              />
            </Pressable>

            {/* Expanded Catalogs */}
            {isExpanded && (
              <View style={styles.catalogsContainer}>
                {/* Toggle All Button */}
                <Pressable
                  style={styles.toggleAllRow}
                  onPress={() => toggleAllCatalogs(section.providerId, [...section.catalogs])}
                  accessibilityRole="button"
                  accessibilityLabel={`Toggle all catalogs for ${section.providerName}`}
                >
                  <Text style={styles.toggleAllText}>{t('settings.catalogs.toggle_all')}</Text>
                  <Switch
                    value={allEnabled}
                    onValueChange={() =>
                      toggleAllCatalogs(section.providerId, [...section.catalogs])
                    }
                    accessibilityLabel="Toggle all"
                  />
                </Pressable>

                {/* Individual Catalog Toggles */}
                {section.catalogs.map((catalog) => {
                  const isSelected = selectedSet.has(catalog.stableId)
                  const customName = catalogPreferences[catalog.stableId]?.customName
                  const displayName = customName || `${section.providerName} - ${catalog.name}`

                  return (
                    <View key={catalog.stableId} style={styles.catalogRow}>
                      <View style={styles.catalogInfo}>
                        <Text style={styles.catalogName} numberOfLines={1}>
                          {displayName}
                        </Text>
                        <Text style={styles.catalogType} numberOfLines={1}>
                          {catalog.type}
                        </Text>
                      </View>
                      <Switch
                        value={isSelected}
                        onValueChange={() => toggleCatalog(catalog.stableId)}
                        accessibilityLabel={`${catalog.name} catalog`}
                      />
                    </View>
                  )
                })}
              </View>
            )}
          </View>
        )
      })}
    </ScrollView>
  )
}

export default memo(CatalogsEnableScreen)

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 80, // Extra space for tab bar
  },
  refresh: {
    tintColor: theme.colors.primary,
  },
  header: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  headerTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  headerDescription: {
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
    flex: 1,
    justifyContent: 'center',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  iconColor: {
    color: theme.colors.textSecondary,
  },
  emptyText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
  },
  providerSection: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  providerHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  providerName: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    flex: 1,
  },
  catalogCount: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },
  chevronColor: {
    color: theme.colors.textSecondary,
  },
  catalogsContainer: {
    paddingVertical: theme.spacing.sm,
  },
  toggleAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  toggleAllText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
  },
  catalogRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  catalogInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  catalogName: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
  },
  catalogType: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
}))
