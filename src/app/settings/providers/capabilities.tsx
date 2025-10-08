import { useState, useCallback } from 'react'
import { ScrollView, Text, View, Pressable, Switch, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { GetAllProvidersWithCapabilitiesUseCase } from '@/src/domain/use-cases/providers/GetAllProvidersWithCapabilitiesUseCase'
import type { UpdateProviderCapabilitiesUseCase } from '@/src/domain/use-cases/providers/UpdateProviderCapabilitiesUseCase'
import { CapabilityType } from '@/src/domain/capabilities/CapabilityType'
import { t } from '@/src/presentation/shared/i18n'

const ProviderCapabilitiesScreen = observer(() => {
  const getAllProvidersUseCase = useService<GetAllProvidersWithCapabilitiesUseCase>(
    TOKENS.GetAllProvidersWithCapabilitiesUseCase
  )
  const updateCapabilitiesUseCase = useService<UpdateProviderCapabilitiesUseCase>(
    TOKENS.UpdateProviderCapabilitiesUseCase
  )

  // Get all providers with their capabilities
  const providersData = getAllProvidersUseCase.execute()

  // Local state for capability toggles (optimistic UI)
  const [localEnabledCapabilities, setLocalEnabledCapabilities] = useState<
    Record<string, CapabilityType[]>
  >(() => {
    const initial: Record<string, CapabilityType[]> = {}
    providersData.forEach(({ provider, enabledCapabilities }) => {
      initial[provider.metadata.id] = [...enabledCapabilities]
    })
    return initial
  })

  const [isSaving, setIsSaving] = useState(false)
  const [expandedProviders, setExpandedProviders] = useState<Set<string>>(new Set())

  // Toggle individual capability for a provider
  const toggleCapability = useCallback((providerId: string, capability: CapabilityType) => {
    setLocalEnabledCapabilities((prev) => {
      const current = prev[providerId] || []
      const isEnabled = current.includes(capability)

      return {
        ...prev,
        [providerId]: isEnabled
          ? current.filter((c) => c !== capability)
          : [...current, capability],
      }
    })
  }, [])

  // Toggle all capabilities for a provider
  const toggleAllCapabilities = useCallback(
    (providerId: string, supportedCapabilities: CapabilityType[]) => {
      setLocalEnabledCapabilities((prev) => {
        const current = prev[providerId] || []
        const allEnabled = supportedCapabilities.every((cap) => current.includes(cap))

        return {
          ...prev,
          [providerId]: allEnabled ? [] : [...supportedCapabilities],
        }
      })
    },
    []
  )

  // Toggle provider expansion
  const toggleProvider = useCallback((providerId: string) => {
    setExpandedProviders((prev) => {
      const next = new Set(prev)
      if (next.has(providerId)) {
        next.delete(providerId)
      } else {
        next.add(providerId)
      }
      return next
    })
  }, [])

  // Save all changes
  const handleSave = useCallback(async () => {
    try {
      setIsSaving(true)

      // Save each provider's capabilities
      await Promise.all(
        providersData.map(({ provider }) =>
          updateCapabilitiesUseCase.execute(
            provider.metadata.id,
            localEnabledCapabilities[provider.metadata.id] || []
          )
        )
      )

      console.log('Capabilities saved successfully')
    } catch (error) {
      console.error('Failed to save capabilities:', error)
    } finally {
      setIsSaving(false)
    }
  }, [providersData, localEnabledCapabilities, updateCapabilitiesUseCase])

  // Helper to get capability display name
  const getCapabilityDisplayName = (capability: CapabilityType): string => {
    // Convert enum to readable format
    return capability.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  }

  if (providersData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cube-outline" size={64} color={styles.iconColor.color} />
        <Text style={styles.emptyText}>
          {t('settings.providers.capabilities.no_providers')}
        </Text>
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
        <Text style={styles.headerTitle}>{t('settings.providers.capabilities.title')}</Text>
        <Text style={styles.headerDescription}>
          {t('settings.providers.capabilities.description')}
        </Text>
      </View>

      {/* Provider Sections */}
      {providersData.map(({ provider, supportedCapabilities }) => {
        const isExpanded = expandedProviders.has(provider.metadata.id)
        const enabledCaps = localEnabledCapabilities[provider.metadata.id] || []
        const allEnabled = supportedCapabilities.every((cap) => enabledCaps.includes(cap))

        return (
          <View key={provider.metadata.id} style={styles.providerSection}>
            {/* Provider Header */}
            <Pressable
              style={styles.providerHeader}
              onPress={() => toggleProvider(provider.metadata.id)}
              accessibilityRole="button"
              accessibilityLabel={`${provider.metadata.name}. ${isExpanded ? 'Collapse' : 'Expand'} section.`}
              accessibilityState={{ expanded: isExpanded }}
            >
              <View style={styles.providerHeaderLeft}>
                <Ionicons name="cube-outline" size={24} color={styles.iconColor.color} />
                <Text style={styles.providerName}>{provider.metadata.name}</Text>
                <Text style={styles.capabilityCount}>
                  {enabledCaps.length}/{supportedCapabilities.length}
                </Text>
              </View>
              <Ionicons
                name={isExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
                size={20}
                color={styles.chevronColor.color}
              />
            </Pressable>

            {/* Expanded Capabilities */}
            {isExpanded && (
              <View style={styles.capabilitiesContainer}>
                {/* Toggle All Button */}
                <Pressable
                  style={styles.toggleAllRow}
                  onPress={() =>
                    toggleAllCapabilities(provider.metadata.id, supportedCapabilities)
                  }
                  accessibilityRole="button"
                  accessibilityLabel={`Toggle all capabilities for ${provider.metadata.name}`}
                >
                  <Text style={styles.toggleAllText}>
                    {t('settings.providers.capabilities.toggle_all')}
                  </Text>
                  <Switch
                    value={allEnabled}
                    onValueChange={() =>
                      toggleAllCapabilities(provider.metadata.id, supportedCapabilities)
                    }
                    accessibilityLabel="Toggle all"
                  />
                </Pressable>

                {/* Individual Capability Toggles */}
                {supportedCapabilities.map((capability) => {
                  const isEnabled = enabledCaps.includes(capability)

                  return (
                    <View key={capability} style={styles.capabilityRow}>
                      <Text style={styles.capabilityName}>
                        {getCapabilityDisplayName(capability)}
                      </Text>
                      <Switch
                        value={isEnabled}
                        onValueChange={() => toggleCapability(provider.metadata.id, capability)}
                        accessibilityLabel={`${getCapabilityDisplayName(capability)} capability`}
                      />
                    </View>
                  )
                })}
              </View>
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
          accessibilityLabel={t('settings.providers.capabilities.save')}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>
              {t('settings.providers.capabilities.save')}
            </Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  )
})

export default ProviderCapabilitiesScreen

const styles = StyleSheet.create((theme) => ({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.xl,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.lg,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
  },
  iconColor: {
    color: theme.colors.textSecondary,
  },
  providerSection: {
    marginBottom: theme.spacing.lg,
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  providerHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: theme.spacing.sm,
  },
  providerName: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.heading,
    fontWeight: theme.fontWeight.semibold,
    flex: 1,
  },
  capabilityCount: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  chevronColor: {
    color: theme.colors.textTertiary,
  },
  capabilitiesContainer: {
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  toggleAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  toggleAllText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
  capabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
  },
  capabilityName: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    flex: 1,
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