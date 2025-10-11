import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { streamUI$ } from '../stores/streamUI.store'
import { useTranslations } from '@/src/presentation/shared/i18n'
import { Chip } from '@/src/presentation/shared/ui'

interface ProviderFilterChipsProps {
  providers: string[]
}

export const ProviderFilterChips: React.FC<ProviderFilterChipsProps> = observer(({ providers }) => {
  const t = useTranslations()
  const selectedProvider = streamUI$.selectedProvider.get()

  const extractProviderName = (provider: string): string => {
    const parts = provider.split('|')
    if (parts.length > 1) {
      return parts[1] || provider
    }
    return provider
  }

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

        {providers.map((provider) => {
          const displayName = extractProviderName(provider)
          const isSelected = selectedProvider === provider

          return (
            <Chip
              key={provider}
              label={displayName}
              selected={isSelected}
              onPress={() => handlePress(provider)}
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
