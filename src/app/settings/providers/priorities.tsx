import { CapabilityType, getAllCapabilityTypes } from '@/src/domain/capabilities/CapabilityType'
import type { ProviderPriorities } from '@/src/domain/entities/UserPreferences'
import type { IProvider } from '@/src/domain/providers/IProvider'
import type { IUserService } from '@/src/domain/services/IUserService'
import type { GetEnabledProvidersForCapabilityUseCase } from '@/src/domain/use-cases/providers/GetEnabledProvidersForCapabilityUseCase'
import type { SaveProviderPrioritiesUseCase } from '@/src/domain/use-cases/providers/SaveProviderPrioritiesUseCase'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { useService } from '@/src/infrastructure/di/useService'
import { t } from '@/src/presentation/shared/i18n'
import { Ionicons } from '@expo/vector-icons'
import { observer } from '@legendapp/state/react'
import { useCallback, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native'
import DraggableFlatList, {
  ScaleDecorator,
  type RenderItemParams,
} from 'react-native-draggable-flatlist'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native-unistyles'

// Helper to convert capability enum to display name
const getCapabilityDisplayName = (capability: CapabilityType): string => {
  return capability
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Capability icon mapping
const CAPABILITY_ICONS: Record<string, string> = {
  // Media capabilities
  [CapabilityType.MEDIA_CATALOG]: 'grid-outline',
  [CapabilityType.MEDIA_METADATA]: 'document-text-outline',
  [CapabilityType.MEDIA_SEARCH]: 'search-outline',
  [CapabilityType.MEDIA_RECOMMENDATIONS]: 'bulb-outline',
  [CapabilityType.MEDIA_VIDEOS]: 'film-outline',
  [CapabilityType.MEDIA_SEASONS]: 'tv-outline',
  [CapabilityType.MEDIA_EXTERNAL_IDS]: 'link-outline',
  [CapabilityType.MEDIA_IMAGES]: 'image-outline',
  [CapabilityType.MEDIA_RATINGS]: 'star-outline',
  [CapabilityType.MEDIA_REVIEWS]: 'chatbubble-outline',
  [CapabilityType.MEDIA_PEOPLE]: 'people-outline',
  [CapabilityType.MEDIA_STREAMS]: 'play-circle-outline',
  [CapabilityType.MEDIA_SUBTITLES]: 'text-outline',
  [CapabilityType.MEDIA_LISTS]: 'list-outline',
  [CapabilityType.MEDIA_LISTS_SEARCH]: 'search-circle-outline',

  // Trakt auth-gated capabilities
  [CapabilityType.MEDIA_CONTINUE_WATCHING]: 'time-outline',
  [CapabilityType.MEDIA_WATCH_PROGRESS]: 'analytics-outline',
  [CapabilityType.MEDIA_WATCHLIST]: 'bookmark-outline',
  [CapabilityType.MEDIA_SCROBBLING]: 'sync-outline',

  // Stremio-specific
  [CapabilityType.STREMIO_ADDON_CATALOG]: 'cube-outline',

  // People capabilities
  [CapabilityType.PEOPLE_FILMOGRAPHY]: 'film-outline',
  [CapabilityType.PEOPLE_METADATA]: 'person-outline',
  [CapabilityType.PEOPLE_SEARCH]: 'search-outline',
  [CapabilityType.PEOPLE_EXTERNAL_IDS]: 'link-outline',
  [CapabilityType.PEOPLE_IMAGES]: 'image-outline',
  [CapabilityType.PEOPLE_CATALOGS]: 'albums-outline',
}

// Generate capabilities array from enum
const CAPABILITIES = getAllCapabilityTypes().map((type) => ({
  type,
  key: type, // Use the enum value directly as the key
  icon: CAPABILITY_ICONS[type] || 'help-circle-outline', // Fallback icon
}))

const ProviderPrioritiesScreen = observer(() => {
  const userService = useService<IUserService>(TOKENS.UserService)
  const getEnabledProvidersUseCase = useService<GetEnabledProvidersForCapabilityUseCase>(
    TOKENS.GetEnabledProvidersForCapabilityUseCase
  )
  const saveProviderPrioritiesUseCase = useService<SaveProviderPrioritiesUseCase>(
    TOKENS.SaveProviderPrioritiesUseCase
  )

  const [isSaving, setIsSaving] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [priorities, setPriorities] = useState<ProviderPriorities>(() => {
    // Initialize with current priorities from user preferences
    const prefs = userService.getCurrentUserPreferences()
    return prefs.providers.priorities
  })

  // Toggle section expansion
  const toggleSection = useCallback((key: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }, [])

  // Update priority order for a capability
  const updatePriority = useCallback((capabilityKey: string, newOrder: IProvider[]) => {
    setPriorities((prev) => ({
      ...prev,
      [capabilityKey]: newOrder.map((p) => p.metadata.id),
    }))
  }, [])

  // Save priorities to user preferences
  const handleSave = useCallback(async () => {
    try {
      setIsSaving(true)
      await saveProviderPrioritiesUseCase.execute(priorities)
      // Success feedback (you can add toast/snackbar here)
      console.log('Priorities saved successfully')
    } catch (error) {
      console.error('Failed to save priorities:', error)
      // Error feedback (you can add toast/snackbar here)
    } finally {
      setIsSaving(false)
    }
  }, [priorities, saveProviderPrioritiesUseCase])

  // Render provider item with drag handle
  const renderProviderItem = useCallback(
    ({ item, drag, isActive, getIndex }: RenderItemParams<IProvider>) => {
      const index = getIndex()
      const priority = index !== undefined ? index + 1 : 0

      return (
        <ScaleDecorator>
          <Pressable
            onLongPress={drag}
            disabled={isActive}
            style={[styles.providerItem, isActive && styles.providerItemActive]}
            accessibilityRole="button"
            accessibilityLabel={`${item.metadata.name}, priority ${priority}. Long press to reorder.`}
          >
            <View style={styles.providerInfo}>
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>#{priority}</Text>
              </View>
              <Text style={styles.providerName}>{item.metadata.name}</Text>
            </View>
            <Text style={styles.dragHandle}>⋮⋮</Text>
          </Pressable>
        </ScaleDecorator>
      )
    },
    []
  )

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('settings.providers.priorities.title')}</Text>
          <Text style={styles.headerDescription}>
            {t('settings.providers.priorities.drag_to_reorder')}
          </Text>
        </View>

        {/* Capability Sections */}
        {CAPABILITIES.map((capability) => {
          const providers = getEnabledProvidersUseCase.execute(capability.type)

          // Skip if no enabled providers for this capability
          if (providers.length === 0) {
            return null
          }

          // Get current order from priorities or use default order
          // Only access priorities if the key exists in ProviderPriorities type
          const priorityKey = capability.key
          const priorityValue = (priorities as any)[priorityKey] as string[] | undefined
          const orderedProviders =
            priorityValue
              ?.map((id: string) => providers.find((p: IProvider) => p.metadata.id === id))
              .filter((p): p is IProvider => !!p) ?? providers

          const isExpanded = expandedSections.has(capability.key)

          return (
            <View key={capability.key} style={styles.capabilitySection}>
              <Pressable
                style={styles.capabilityHeader}
                onPress={() => toggleSection(capability.key)}
                accessibilityRole="button"
                accessibilityLabel={`${getCapabilityDisplayName(capability.type)}. ${isExpanded ? 'Collapse' : 'Expand'} section.`}
                accessibilityState={{ expanded: isExpanded }}
              >
                <Ionicons name={capability.icon as any} size={24} color={styles.iconColor.color} />
                <Text style={styles.capabilityTitle}>
                  {getCapabilityDisplayName(capability.type)}
                </Text>
                <Ionicons
                  name={isExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
                  size={20}
                  color={styles.chevronColor.color}
                />
              </Pressable>

              {isExpanded && (
                <DraggableFlatList
                  data={orderedProviders}
                  keyExtractor={(provider) => provider.metadata.id}
                  renderItem={renderProviderItem}
                  onDragEnd={({ data }: { data: IProvider[] }) => updatePriority(priorityKey, data)}
                  scrollEnabled={false}
                />
              )}
            </View>
          )
        })}

        {/* Save Button */}
        <View style={styles.saveContainer}>
          <Pressable
            onPress={handleSave}
            disabled={isSaving}
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.saveButtonPressed,
              isSaving && styles.saveButtonDisabled,
            ]}
            accessibilityRole="button"
            accessibilityLabel={t('settings.providers.priorities.save')}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>{t('settings.providers.priorities.save')}</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  )
})

export default ProviderPrioritiesScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing['2xl'],
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  headerTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize['2xl'],
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.sm,
  },
  headerDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.base,
    lineHeight: theme.fontSize.base * 1.5,
  },
  capabilitySection: {
    marginBottom: theme.spacing.xl,
  },
  capabilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  capabilityTitle: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
  },
  iconColor: {
    color: theme.colors.textSecondary,
  },
  chevronColor: {
    color: theme.colors.textTertiary,
  },
  providerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  providerItemActive: {
    backgroundColor: theme.colors.primary,
    opacity: 0.9,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  priorityBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  priorityText: {
    color: theme.colors.background,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
  },
  providerName: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
  },
  dragHandle: {
    color: theme.colors.textTertiary,
    fontSize: theme.fontSize.xl,
  },
  saveContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  saveButtonPressed: {
    opacity: 0.85,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: theme.colors.background,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
}))
