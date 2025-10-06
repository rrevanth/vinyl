import { useEffect } from 'react'
import { ScrollView, Pressable, Text, Alert } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observable } from '@legendapp/state'
import { observer } from '@legendapp/state/react'
import { SettingsSection } from '@/src/features/settings/components/atoms/SettingsSection'
import { SettingsConfigRow } from '@/src/features/settings/components/atoms/SettingsConfigRow'
import { SettingsPickerRow } from '@/src/features/settings/components/atoms/SettingsPickerRow'
import { ConnectionStatus } from '@/src/features/settings/components/atoms/ConnectionStatus'
import { useTMDBAccount } from '@/src/features/settings/hooks/useTMDBAccount'
import { t } from '@/src/presentation/shared/i18n'
import type { TMDBConfig } from '@/src/domain/entities/UserPreferences'

const TMDB_LANGUAGE_OPTIONS = [
  { label: 'English', value: 'en-US' },
  { label: 'Español', value: 'es-ES' },
  { label: 'Français', value: 'fr-FR' },
  { label: 'Deutsch', value: 'de-DE' },
  { label: 'Italiano', value: 'it-IT' },
  { label: 'Português', value: 'pt-BR' },
  { label: '日本語', value: 'ja-JP' },
]

const TMDB_REGION_OPTIONS = [
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Canada', value: 'CA' },
  { label: 'Australia', value: 'AU' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Spain', value: 'ES' },
  { label: 'Italy', value: 'IT' },
  { label: 'Japan', value: 'JP' },
  { label: 'Brazil', value: 'BR' },
]

// Default values (from environment or fallback)
const DEFAULT_BASE_URL = 'https://api.themoviedb.org/3'
const DEFAULT_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'

// Local state for pending changes
const pendingChanges$ = observable({
  apiKey: {
    isCustom: false,
    value: '',
  },
  baseURL: {
    isCustom: false,
    value: '',
  },
  imageBaseURL: {
    isCustom: false,
    value: '',
  },
  language: '',
  region: '',
})

const connectionStatus$ = observable<'idle' | 'validating' | 'connected' | 'error'>('idle')
const connectionMessage$ = observable<string>('')
const isValidating$ = observable<boolean>(false)

const TMDBSettingsScreen = observer(() => {
  const { config, validateAndSave, validateConnection } = useTMDBAccount()

  // Initialize pending changes from current config and validate connection
  useEffect(() => {
    if (!config) return

    pendingChanges$.apiKey.isCustom.set(Boolean(config.apiKey))
    pendingChanges$.apiKey.value.set(config.apiKey)
    pendingChanges$.baseURL.isCustom.set(config.baseURL !== DEFAULT_BASE_URL)
    pendingChanges$.baseURL.value.set(config.baseURL)
    pendingChanges$.imageBaseURL.isCustom.set(config.imageBaseURL !== DEFAULT_IMAGE_BASE_URL)
    pendingChanges$.imageBaseURL.value.set(config.imageBaseURL)
    pendingChanges$.language.set(config.language)
    pendingChanges$.region.set(config.region)

    // Always check connection with effective config (custom > env > default)
    const checkConnection = async () => {
      try {
        const result = await validateConnection()
        if (result.success) {
          connectionStatus$.set('connected')
          connectionMessage$.set('')
        } else {
          connectionStatus$.set('error')
          connectionMessage$.set(result.error || 'Connection failed')
        }
      } catch (error) {
        // Silently handle connection check errors
        connectionStatus$.set('error')
        const errorMessage = error instanceof Error ? error.message : 'Connection check failed'
        connectionMessage$.set(errorMessage)
      }
    }

    checkConnection()
  }, [config, validateConnection])

  const handleValidateAndSave = async () => {
    isValidating$.set(true)

    // Build config to validate
    const configToValidate: Partial<TMDBConfig> = {
      apiKey: pendingChanges$.apiKey.isCustom.get() ? pendingChanges$.apiKey.value.get() : '',
      baseURL: pendingChanges$.baseURL.isCustom.get()
        ? pendingChanges$.baseURL.value.get()
        : DEFAULT_BASE_URL,
      imageBaseURL: pendingChanges$.imageBaseURL.isCustom.get()
        ? pendingChanges$.imageBaseURL.value.get()
        : DEFAULT_IMAGE_BASE_URL,
      language: pendingChanges$.language.get(),
      region: pendingChanges$.region.get(),
    }

    const result = await validateAndSave(configToValidate)

    isValidating$.set(false)

    if (result.success) {
      // Update connection status with effective config
      const connectionResult = await validateConnection()
      if (connectionResult.success) {
        connectionStatus$.set('connected')
        connectionMessage$.set('')
      }

      Alert.alert(
        t('settings.accounts.tmdb.connection_success'),
        t('settings.accounts.tmdb.validation_success')
      )
    } else {
      // Show error via Alert with user-friendly message
      Alert.alert(
        'Invalid Configuration',
        'Please check your settings and try again.'
      )
    }
  }

  const connectionStatus = connectionStatus$.get()
  const connectionMessage = connectionMessage$.get()
  const isValidating = isValidating$.get()

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ConnectionStatus
        status={connectionStatus === 'idle' ? 'disconnected' : connectionStatus}
        message={connectionMessage}
      />

      <SettingsSection
        title={t('settings.accounts.tmdb.api_configuration')}
        footer={t('settings.accounts.tmdb.api_configuration_footer')}
      >
        <SettingsConfigRow
          label={t('settings.accounts.tmdb.api_key')}
          defaultValue={t('settings.accounts.tmdb.using_default_api_key')}
          customValue={pendingChanges$.apiKey.value.get()}
          isCustom={pendingChanges$.apiKey.isCustom.get()}
          onToggleCustom={(useCustom) => {
            pendingChanges$.apiKey.isCustom.set(useCustom)
            if (!useCustom) {
              pendingChanges$.apiKey.value.set('') // Use default/env when toggling off
            } else {
              pendingChanges$.apiKey.value.set('') // Start empty for custom input
            }
          }}
          onCustomValueChange={(value) => pendingChanges$.apiKey.value.set(value)}
          placeholder={t('settings.accounts.tmdb.custom_api_key')}
          secureTextEntry
        />
        <SettingsConfigRow
          label={t('settings.accounts.tmdb.base_url')}
          defaultValue={DEFAULT_BASE_URL}
          customValue={pendingChanges$.baseURL.value.get()}
          isCustom={pendingChanges$.baseURL.isCustom.get()}
          onToggleCustom={(useCustom) => {
            pendingChanges$.baseURL.isCustom.set(useCustom)
            if (!useCustom) {
              pendingChanges$.baseURL.value.set(DEFAULT_BASE_URL) // Reset to default
            } else {
              pendingChanges$.baseURL.value.set('') // Start EMPTY for custom
            }
          }}
          onCustomValueChange={(value) => pendingChanges$.baseURL.value.set(value)}
          placeholder={DEFAULT_BASE_URL}
        />
        <SettingsConfigRow
          label={t('settings.accounts.tmdb.image_base_url')}
          defaultValue={DEFAULT_IMAGE_BASE_URL}
          customValue={pendingChanges$.imageBaseURL.value.get()}
          isCustom={pendingChanges$.imageBaseURL.isCustom.get()}
          onToggleCustom={(useCustom) => {
            pendingChanges$.imageBaseURL.isCustom.set(useCustom)
            if (!useCustom) {
              pendingChanges$.imageBaseURL.value.set(DEFAULT_IMAGE_BASE_URL) // Reset to default
            } else {
              pendingChanges$.imageBaseURL.value.set('') // Start EMPTY for custom
            }
          }}
          onCustomValueChange={(value) => pendingChanges$.imageBaseURL.value.set(value)}
          placeholder={DEFAULT_IMAGE_BASE_URL}
          isLast
        />
      </SettingsSection>

      <SettingsSection
        title={t('settings.accounts.tmdb.preferences')}
        footer={t('settings.accounts.tmdb.preferences_footer')}
      >
        <SettingsPickerRow
          title={t('settings.accounts.tmdb.language')}
          currentValue={pendingChanges$.language.get()}
          options={TMDB_LANGUAGE_OPTIONS}
          onValueChange={(value) => pendingChanges$.language.set(value)}
        />
        <SettingsPickerRow
          title={t('settings.accounts.tmdb.region')}
          currentValue={pendingChanges$.region.get()}
          options={TMDB_REGION_OPTIONS}
          onValueChange={(value) => pendingChanges$.region.set(value)}
          isLast
        />
      </SettingsSection>

      <SettingsSection>
        <Pressable
          style={({ pressed }) => [
            styles.validateButton,
            pressed && styles.validateButtonPressed,
            isValidating && styles.validateButtonDisabled,
          ]}
          onPress={handleValidateAndSave}
          disabled={isValidating}
          accessibilityRole="button"
          accessibilityLabel={t('settings.accounts.tmdb.validate_and_save')}
          accessibilityState={{ disabled: isValidating }}
        >
          <Text style={styles.validateButtonText}>
            {isValidating
              ? t('settings.accounts.tmdb.validating')
              : t('settings.accounts.tmdb.validate_and_save')}
          </Text>
        </Pressable>
      </SettingsSection>
    </ScrollView>
  )
})

export default TMDBSettingsScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  validateButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // Accessibility minimum
  },
  validateButtonPressed: {
    opacity: 0.8,
  },
  validateButtonDisabled: {
    opacity: 0.5,
  },
  validateButtonText: {
    color: '#FFFFFF', // White text on primary button
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
}))
