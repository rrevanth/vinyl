import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import type { ProviderInfo } from '@/src/domain/capabilities/IMediaStreamsCapability'
import { streamUI$ } from '../stores/streamUI.store'
import { useTranslations } from '@/src/presentation/shared/i18n'
import { Chip } from '@/src/presentation/shared/ui'

interface ProviderFilterChipsProps {
  providers: ProviderInfo[]
}

export const ProviderFilterChips: React.FC<ProviderFilterChipsProps> = observer(({ providers }) => {
  const t = useTranslations()
  const selectedProvider = streamUI$.selectedProvider.get()

  // Deduplicate providers by ID and filter out invalid providers
  const uniqueProviders = React.useMemo(() => {
    const seen = new Set<string>()
    return providers.filter((provider) => {
      // Filter out providers with invalid data
      if (!provider?.id || !provider?.name) return false
      if (seen.has(provider.id)) return false
      seen.add(provider.id)
      return true
    })
  }, [providers])

  const handlePress = (providerId: string) => {
    streamUI$.selectedProvider.set(providerId)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Providers</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        accessibilityRole="tablist"
      >
        <Chip
          label={t.streams.all_providers}
          selected={selectedProvider === 'all'}
          onPress={() => handlePress('all')}
        />

        {uniqueProviders.map((provider) => {
          const isSelected = selectedProvider === provider.id
          const displayName = provider.name || provider.id || 'Unknown Provider' // Triple fallback

          return (
            <Chip
              key={provider.id}
              label={displayName}
              selected={isSelected}
              onPress={() => handlePress(provider.id)}
            />
          )
        })}
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600' as const,
    color: theme.colors.textSecondary,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
    textTransform: 'uppercase' as const,
  },
  scrollContent: {
    flexDirection: 'row' as const,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.xs,
  },
}))
