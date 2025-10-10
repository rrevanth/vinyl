import React from 'react'
import { ScrollView, Text, Pressable } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { streamUI$ } from '../stores/streamUI.store'
import { useTranslations } from '@/src/presentation/shared/i18n'

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
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      accessibilityRole="tablist"
    >
      <Pressable
        style={({ pressed }) => [
          styles.chip,
          selectedProvider === 'all' && styles.chipSelected,
          pressed && styles.chipPressed,
        ]}
        onPress={() => handlePress('all')}
        accessibilityRole="tab"
        accessibilityState={{ selected: selectedProvider === 'all' }}
        accessibilityLabel={t.streams.all_providers}
      >
        <Text
          style={[
            styles.chipText,
            selectedProvider === 'all' && styles.chipTextSelected,
          ]}
        >
          {t.streams.all_providers}
        </Text>
      </Pressable>

      {providers.map((provider) => {
        const displayName = extractProviderName(provider)
        const isSelected = selectedProvider === provider

        return (
          <Pressable
            key={provider}
            style={({ pressed }) => [
              styles.chip,
              isSelected && styles.chipSelected,
              pressed && styles.chipPressed,
            ]}
            onPress={() => handlePress(provider)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={displayName}
          >
            <Text
              style={[
                styles.chipText,
                isSelected && styles.chipTextSelected,
              ]}
            >
              {displayName}
            </Text>
          </Pressable>
        )
      })}
    </ScrollView>
  )
})

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row' as const,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  chip: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    paddingVertical: 6,
    paddingHorizontal: theme.spacing.sm,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
  },
  chipPressed: {
    opacity: 0.7,
  },
  chipText: {
    fontSize: theme.fontSize.xs,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  chipTextSelected: {
    color: theme.colors.background,
  },
}))
