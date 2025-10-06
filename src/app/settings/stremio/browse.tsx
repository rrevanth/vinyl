import React, { useState, useEffect, useCallback } from 'react'
import { View, TextInput, Text, ActivityIndicator, RefreshControl, Linking, Alert, ScrollView, Pressable } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { LegendList } from '@legendapp/list'
import { AddonCatalogCard } from '@/src/features/settings/components/atoms/AddonCatalogCard'
import { useStremioAddonCatalog } from '@/src/features/settings/hooks/useStremioAddonCatalog'
import { useStremioAddons } from '@/src/features/settings/hooks/useStremioAddons'
import { t } from '@/src/presentation/shared/i18n'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'

// Helper to create unique key for StremioAddon
// Use transportUrl as it's guaranteed unique (we deduplicate by it)
const createAddonUniqueKey = (addon: StremioAddon): string => {
  return addon.transportUrl
}

const BrowseAddonsScreen = observer(() => {
  const [searchQuery, setSearchQuery] = useState('')
  const [resourceFilter, setResourceFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [allAddons, setAllAddons] = useState<StremioAddon[]>([])

  const { getAddonCatalogsFromInstalledAddons, browseSpecificAddonCatalog } =
    useStremioAddonCatalog()

  const { installedAddons, installAddon, uninstallAddon } = useStremioAddons()

  // Load ALL addons from ALL catalog sources on mount
  const loadAllAddons = useCallback(async () => {
    setIsLoading(true)

    try {
      // Get all catalog source addons from installed addons
      const catalogSources = await getAddonCatalogsFromInstalledAddons(installedAddons)

      if (catalogSources.length === 0) {
        setAllAddons([])
        return
      }

      const fetchedAddons: StremioAddon[] = []

      // Fetch from each catalog source
      for (const source of catalogSources) {
        for (const catalog of source.catalogs) {
          try {
            const result = await browseSpecificAddonCatalog(
              source.transportUrl,
              catalog.type,
              catalog.id
            )

            if (result.success && result.addons) {
              fetchedAddons.push(...result.addons)
            }
          } catch (error) {
            console.error('Failed to fetch catalog:', error)
            // Continue with other catalogs
          }
        }
      }

      // Deduplicate by transportUrl (unique identifier)
      const uniqueAddons = Array.from(
        new Map(fetchedAddons.map((addon) => [addon.transportUrl, addon])).values()
      )

      setAllAddons(uniqueAddons)
    } catch (error) {
      console.error('Failed to load addons:', error)
      setAllAddons([])
    } finally {
      setIsLoading(false)
    }
  }, [installedAddons, getAddonCatalogsFromInstalledAddons, browseSpecificAddonCatalog])

  // Load addons on mount
  useEffect(() => {
    loadAllAddons()
  }, [loadAllAddons])

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await loadAllAddons()
    setIsRefreshing(false)
  }, [loadAllAddons])

  // Filter addons by search query and resource type
  const filteredAddons = allAddons.filter((addon) => {
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const matchesName = addon.name.toLowerCase().includes(query)
      const matchesDescription = addon.description?.toLowerCase().includes(query)
      const matchesId = addon.id.toLowerCase().includes(query)

      if (!matchesName && !matchesDescription && !matchesId) {
        return false
      }
    }

    // Resource filter
    if (resourceFilter !== 'all') {
      const hasResource = addon.manifest.resources.some((resource) => {
        if (typeof resource === 'string') {
          return resource.toLowerCase() === resourceFilter.toLowerCase()
        }
        return resource.name.toLowerCase() === resourceFilter.toLowerCase()
      })

      if (!hasResource) {
        return false
      }
    }

    return true
  })

  // Check if addon is installed
  const isAddonInstalled = useCallback(
    (addonId: string): boolean => {
      return installedAddons.some((addon) => addon.id === addonId)
    },
    [installedAddons]
  )

  // Handle install addon
  const handleInstallAddon = useCallback(
    async (manifestUrl: string) => {
      try {
        await installAddon(manifestUrl)
        Alert.alert(t('settings.stremio.install_success'), t('settings.stremio.install_success_message'))
      } catch (error) {
        Alert.alert(
          t('settings.stremio.install_failed'),
          error instanceof Error ? error.message : t('settings.stremio.install_failed_message')
        )
      }
    },
    [installAddon]
  )

  // Handle uninstall addon
  const handleUninstallAddon = useCallback(
    async (addonId: string) => {
      const addon = installedAddons.find((a) => a.id === addonId)
      if (!addon) return

      Alert.alert(
        t('settings.stremio.uninstall_confirm_title'),
        t('settings.stremio.uninstall_confirm_message').replace('{name}', addon.getDisplayName()),
        [
          { text: t('settings.stremio.cancel'), style: 'cancel' },
          {
            text: t('settings.stremio.uninstall'),
            style: 'destructive',
            onPress: async () => {
              try {
                await uninstallAddon(addonId)
                Alert.alert(
                  t('settings.stremio.uninstall_success'),
                  t('settings.stremio.uninstall_success_message').replace('{name}', addon.getDisplayName())
                )
              } catch (error) {
                Alert.alert(
                  t('settings.stremio.uninstall_failed'),
                  error instanceof Error ? error.message : t('settings.stremio.uninstall_failed_message')
                )
              }
            },
          },
        ]
      )
    },
    [installedAddons, uninstallAddon]
  )

  // Handle configure addon
  const handleConfigureAddon = useCallback((configureUrl: string) => {
    Linking.openURL(configureUrl).catch((error) => {
      console.error('Failed to open configure URL:', error)
      Alert.alert(t('settings.stremio.configure_failed'), t('settings.stremio.configure_failed_message'))
    })
  }, [])

  // Render addon item
  const renderAddonItem = useCallback(
    ({ item }: { item: StremioAddon }) => (
      <AddonCatalogCard
        addon={item}
        isInstalled={isAddonInstalled(item.id)}
        onInstall={handleInstallAddon}
        onUninstall={handleUninstallAddon}
        onConfigure={handleConfigureAddon}
      />
    ),
    [isAddonInstalled, handleInstallAddon, handleUninstallAddon, handleConfigureAddon]
  )

  // Unique key extractor - transportUrl is guaranteed unique after deduplication
  const keyExtractor = useCallback((item: StremioAddon) => createAddonUniqueKey(item), [])

  // Show empty state if no catalog sources
  if (!isLoading && allAddons.length === 0 && installedAddons.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>{t('settings.stremio.no_catalog_sources')}</Text>
          <Text style={styles.emptyStateMessage}>
            {t('settings.stremio.no_catalog_sources_message')}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('settings.stremio.search_addons')}
          placeholderTextColor="#999999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          accessibilityLabel={t('settings.stremio.search_addons')}
        />
      </View>

      {/* Resource Filter */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {[
            { value: 'all', label: t('settings.stremio.all_resources') },
            { value: 'stream', label: t('settings.stremio.streams') },
            { value: 'meta', label: t('settings.stremio.metadata') },
            { value: 'catalog', label: t('settings.stremio.catalogs') },
            { value: 'subtitles', label: t('settings.stremio.subtitles') },
          ].map((option, index) => (
            <Pressable
              key={option.value}
              style={({ pressed }) => [
                styles.filterChip,
                resourceFilter === option.value && styles.filterChipActive,
                pressed && styles.filterChipPressed,
                index === 0 && styles.filterChipFirst,
              ]}
              onPress={() => setResourceFilter(option.value)}
              accessibilityRole="button"
              accessibilityLabel={option.label}
              accessibilityState={{ selected: resourceFilter === option.value }}
            >
              <Text
                style={[
                  styles.filterChipText,
                  resourceFilter === option.value && styles.filterChipTextActive,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Addon List */}
      {isLoading && !isRefreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>{t('settings.stremio.loading_addons')}</Text>
        </View>
      ) : filteredAddons.length > 0 ? (
        <LegendList
          key={`${searchQuery}-${resourceFilter}`}
          data={filteredAddons}
          renderItem={renderAddonItem}
          estimatedItemSize={200}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#007AFF"
              title={t('settings.stremio.pull_to_refresh')}
            />
          }
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateMessage}>
            {searchQuery || resourceFilter !== 'all'
              ? t('settings.stremio.no_addons_match_filter')
              : t('settings.stremio.no_addons_found')}
          </Text>
        </View>
      )}
    </View>
  )
})

export default BrowseAddonsScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  searchInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 44,
  },
  filterContainer: {
    paddingBottom: theme.spacing.md,
  },
  filterScroll: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  filterChip: {
    paddingVertical: theme.spacing.xs + 2,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceElevated,
    marginRight: theme.spacing.xs,
  },
  filterChipFirst: {
    marginLeft: 0,
  },
  filterChipActive: {
    backgroundColor: '#5B21B6',
  },
  filterChipPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  filterChipText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  loadingText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  emptyStateTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  emptyStateMessage: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
}))
