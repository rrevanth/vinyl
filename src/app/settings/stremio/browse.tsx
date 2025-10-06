import { useState, useEffect } from 'react'
import { ScrollView, TextInput, Pressable, Text, View, Alert } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { AddonCatalogCard } from '@/src/features/settings/components/atoms/AddonCatalogCard'
import { useStremioAddonCatalog } from '@/src/features/settings/hooks/useStremioAddonCatalog'
import { useStremioAddons } from '@/src/features/settings/hooks/useStremioAddons'
import { t } from '@/src/presentation/shared/i18n'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'

// Default Stremio community addon catalog
const DEFAULT_CATALOG_URL = 'https://stremio-addons.netlify.app/index.json'

const CAPABILITY_FILTERS: { label: string; value: CapabilityType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Metadata', value: CapabilityType.MEDIA_METADATA },
  { label: 'Catalog', value: CapabilityType.MEDIA_CATALOG },
  { label: 'Streams', value: CapabilityType.MEDIA_STREAMS },
  { label: 'Subtitles', value: CapabilityType.MEDIA_SUBTITLES },
]

const BrowseAddonsScreen = observer(() => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCapability, setSelectedCapability] = useState<CapabilityType | 'all'>('all')

  const { browsingAddons, browseAddons, searchAddons, filterByCapability } = useStremioAddonCatalog()
  const { installedAddons, installAddon, uninstallAddon } = useStremioAddons()

  // Load catalog on mount
  useEffect(() => {
    browseAddons(DEFAULT_CATALOG_URL).catch((error) => {
      Alert.alert(
        t('settings.stremio.browse_failed'),
        error instanceof Error ? error.message : t('settings.stremio.browse_failed_message')
      )
    })
  }, [browseAddons])

  // Handle search
  useEffect(() => {
    if (searchQuery.trim()) {
      searchAddons(searchQuery).catch((error) => {
        console.error('Search failed:', error)
      })
    }
  }, [searchQuery, searchAddons])

  // Handle capability filter
  const handleCapabilityFilter = async (capability: CapabilityType | 'all') => {
    setSelectedCapability(capability)

    if (capability === 'all') {
      // Reload full catalog
      try {
        await browseAddons(DEFAULT_CATALOG_URL)
      } catch (error) {
        Alert.alert(
          t('settings.stremio.filter_failed'),
          error instanceof Error ? error.message : t('settings.stremio.filter_failed_message')
        )
      }
    } else {
      try {
        await filterByCapability(capability)
      } catch (error) {
        Alert.alert(
          t('settings.stremio.filter_failed'),
          error instanceof Error ? error.message : t('settings.stremio.filter_failed_message')
        )
      }
    }
  }

  const isAddonInstalled = (addonId: string): boolean => {
    return installedAddons.some((addon) => addon.id === addonId)
  }

  const handleInstallAddon = async (manifestUrl: string) => {
    try {
      await installAddon(manifestUrl)
      Alert.alert(
        t('settings.stremio.install_success'),
        t('settings.stremio.install_success_message')
      )
    } catch (error) {
      Alert.alert(
        t('settings.stremio.install_failed'),
        error instanceof Error ? error.message : t('settings.stremio.install_failed_message')
      )
    }
  }

  const handleUninstallAddon = async (addonId: string) => {
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
  }

  return (
    <View style={styles.container}>
      {/* Search Input */}
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

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContent}
      >
        {CAPABILITY_FILTERS.map((filter) => (
          <Pressable
            key={filter.value}
            style={({ pressed }) => [
              styles.filterChip,
              selectedCapability === filter.value && styles.filterChipActive,
              pressed && styles.filterChipPressed,
            ]}
            onPress={() => handleCapabilityFilter(filter.value)}
            accessibilityRole="button"
            accessibilityLabel={`Filter by ${filter.label}`}
            accessibilityState={{ selected: selectedCapability === filter.value }}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedCapability === filter.value && styles.filterChipTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Addon Catalog Cards */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {browsingAddons.length > 0 ? (
          browsingAddons.map((addon) => (
            <AddonCatalogCard
              key={addon.id}
              addon={addon}
              isInstalled={isAddonInstalled(addon.id)}
              onInstall={handleInstallAddon}
              onUninstall={handleUninstallAddon}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {searchQuery
                ? t('settings.stremio.no_search_results')
                : t('settings.stremio.no_addons_found')}
            </Text>
          </View>
        )}
      </ScrollView>
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
  filtersScroll: {
    paddingBottom: theme.spacing.sm,
  },
  filtersContent: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  filterChip: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 32,
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipPressed: {
    opacity: 0.8,
  },
  filterChipText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xl,
  },
  emptyState: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
}))
