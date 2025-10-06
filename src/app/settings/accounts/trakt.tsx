import { useState, useEffect } from 'react'
import { ScrollView, Pressable, Text, View, Alert, ActivityIndicator } from 'react-native'
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles'
import { observable } from '@legendapp/state'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'
import { SettingsSection } from '@/src/features/settings/components/atoms/SettingsSection'
import { SettingsInfoRow } from '@/src/features/settings/components/atoms/SettingsInfoRow'
import { SettingsNavigationRow } from '@/src/features/settings/components/atoms/SettingsNavigationRow'
import { SettingsConfigRow } from '@/src/features/settings/components/atoms/SettingsConfigRow'
import { ConnectionStatus } from '@/src/features/settings/components/atoms/ConnectionStatus'
import { ErrorBanner } from '@/src/features/settings/components/atoms/ErrorBanner'
import { useTraktAccount } from '@/src/features/settings/hooks/useTraktAccount'
import { t } from '@/src/presentation/shared/i18n'
import type { TraktConfig } from '@/src/domain/entities/UserPreferences'

// Default values
const DEFAULT_BASE_URL = 'https://api.trakt.tv'

// Local state for pending configuration changes
const pendingChanges$ = observable({
  baseUrl: {
    isCustom: false,
    value: '',
  },
  clientId: {
    isCustom: false,
    value: '',
  },
  clientSecret: {
    isCustom: false,
    value: '',
  },
})

const isSaving$ = observable<boolean>(false)

const TraktAccountScreen = observer(() => {
  const { isConnected, account, isLoading, error, startOAuthFlow, disconnect, config, saveConfig } = useTraktAccount()
  const [dismissedError, setDismissedError] = useState(false)

  const handleConnect = async () => {
    setDismissedError(false)
    await startOAuthFlow()
  }

  const handleDismissError = () => {
    setDismissedError(true)
  }

  const handleDisconnect = () => {
    Alert.alert(
      t('settings.accounts.trakt.disconnect_confirm_title'),
      t('settings.accounts.trakt.disconnect_confirm_message'),
      [
        {
          text: t('settings.accounts.trakt.cancel'),
          style: 'cancel',
        },
        {
          text: t('settings.accounts.trakt.disconnect'),
          style: 'destructive',
          onPress: async () => {
            try {
              await disconnect()
              Alert.alert(
                t('settings.accounts.trakt.disconnected'),
                t('settings.accounts.trakt.disconnected_message')
              )
            } catch (error) {
              Alert.alert(
                t('settings.accounts.trakt.disconnect_failed'),
                error instanceof Error ? error.message : 'Unknown error'
              )
            }
          },
        },
      ]
    )
  }

  const handleSaveConfig = async () => {
    isSaving$.set(true)

    // Build config to save
    const configToSave: Partial<TraktConfig> = {
      baseUrl: pendingChanges$.baseUrl.isCustom.get()
        ? pendingChanges$.baseUrl.value.get()
        : DEFAULT_BASE_URL,
      clientId: pendingChanges$.clientId.isCustom.get() ? pendingChanges$.clientId.value.get() : '',
      clientSecret: pendingChanges$.clientSecret.isCustom.get()
        ? pendingChanges$.clientSecret.value.get()
        : '',
    }

    const result = await saveConfig(configToSave)

    isSaving$.set(false)

    if (result.success) {
      Alert.alert(
        t('settings.accounts.trakt.config_saved'),
        t('settings.accounts.trakt.config_saved_message')
      )
    } else {
      Alert.alert('Invalid Configuration', result.error || 'Please check your settings and try again.')
    }
  }

  // Initialize pending changes from current config
  useEffect(() => {
    if (!config) return

    pendingChanges$.baseUrl.isCustom.set(config.baseUrl !== DEFAULT_BASE_URL)
    pendingChanges$.baseUrl.value.set(config.baseUrl || DEFAULT_BASE_URL)
    pendingChanges$.clientId.isCustom.set(Boolean(config.clientId))
    pendingChanges$.clientId.value.set(config.clientId || '')
    pendingChanges$.clientSecret.isCustom.set(Boolean(config.clientSecret))
    pendingChanges$.clientSecret.value.set(config.clientSecret || '')
  }, [config])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!isConnected) {
    const shouldShowError = error && !dismissedError
    const isSaving = isSaving$.get()

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {shouldShowError && (
          <ErrorBanner
            message={error}
            onDismiss={handleDismissError}
            onRetry={handleConnect}
            retryLabel={t('settings.accounts.trakt.retry_oauth')}
          />
        )}

        <SettingsSection
          title={t('settings.accounts.trakt.connect_title')}
          footer={t('settings.accounts.trakt.connect_footer')}
        >
          <Pressable
            style={({ pressed }) => [
              styles.connectButton,
              pressed && styles.connectButtonPressed,
              isLoading && styles.connectButtonDisabled,
            ]}
            onPress={handleConnect}
            disabled={isLoading}
            accessibilityRole="button"
            accessibilityLabel={
              error ? t('settings.accounts.trakt.retry_oauth') : t('settings.accounts.trakt.sign_in')
            }
            accessibilityState={{ disabled: isLoading }}
          >
            <Ionicons
              name="git-network-outline"
              size={24}
              color={UnistylesRuntime.getTheme().colors.primary}
            />
            <Text style={styles.connectText}>
              {isLoading
                ? t('settings.accounts.trakt.oauth_in_progress')
                : error
                  ? t('settings.accounts.trakt.retry_oauth')
                  : t('settings.accounts.trakt.sign_in')}
            </Text>
          </Pressable>
        </SettingsSection>

        <SettingsSection
          title={t('settings.accounts.trakt.api_configuration')}
          footer={t('settings.accounts.trakt.api_configuration_footer')}
        >
          <SettingsConfigRow
            label={t('settings.accounts.trakt.base_url')}
            defaultValue={DEFAULT_BASE_URL}
            customValue={pendingChanges$.baseUrl.value.get()}
            isCustom={pendingChanges$.baseUrl.isCustom.get()}
            onToggleCustom={(useCustom) => {
              pendingChanges$.baseUrl.isCustom.set(useCustom)
              if (!useCustom) {
                pendingChanges$.baseUrl.value.set(DEFAULT_BASE_URL)
              } else {
                pendingChanges$.baseUrl.value.set('')
              }
            }}
            onCustomValueChange={(value) => pendingChanges$.baseUrl.value.set(value)}
            placeholder={DEFAULT_BASE_URL}
          />
          <SettingsConfigRow
            label={t('settings.accounts.trakt.client_id')}
            defaultValue={t('settings.accounts.trakt.using_env_client_id')}
            customValue={pendingChanges$.clientId.value.get()}
            isCustom={pendingChanges$.clientId.isCustom.get()}
            onToggleCustom={(useCustom) => {
              pendingChanges$.clientId.isCustom.set(useCustom)
              if (!useCustom) {
                pendingChanges$.clientId.value.set('')
              } else {
                pendingChanges$.clientId.value.set('')
              }
            }}
            onCustomValueChange={(value) => pendingChanges$.clientId.value.set(value)}
            placeholder={t('settings.accounts.trakt.custom_client_id')}
          />
          <SettingsConfigRow
            label={t('settings.accounts.trakt.client_secret')}
            defaultValue={t('settings.accounts.trakt.using_env_client_secret')}
            customValue={pendingChanges$.clientSecret.value.get()}
            isCustom={pendingChanges$.clientSecret.isCustom.get()}
            onToggleCustom={(useCustom) => {
              pendingChanges$.clientSecret.isCustom.set(useCustom)
              if (!useCustom) {
                pendingChanges$.clientSecret.value.set('')
              } else {
                pendingChanges$.clientSecret.value.set('')
              }
            }}
            onCustomValueChange={(value) => pendingChanges$.clientSecret.value.set(value)}
            placeholder={t('settings.accounts.trakt.custom_client_secret')}
            secureTextEntry
            isLast
          />
        </SettingsSection>

        <SettingsSection>
          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.saveButtonPressed,
              isSaving && styles.saveButtonDisabled,
            ]}
            onPress={handleSaveConfig}
            disabled={isSaving}
            accessibilityRole="button"
            accessibilityLabel={t('settings.accounts.trakt.save_config')}
            accessibilityState={{ disabled: isSaving }}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? t('settings.accounts.trakt.saving') : t('settings.accounts.trakt.save_config')}
            </Text>
          </Pressable>
        </SettingsSection>
      </ScrollView>
    )
  }

  const isSaving = isSaving$.get()

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ConnectionStatus
        status="connected"
        message={account?.username ? `@${account.username}` : undefined}
      />

      <SettingsSection title={t('settings.accounts.trakt.account_info')}>
        <SettingsInfoRow
          title={t('settings.accounts.trakt.username')}
          value={`@${account?.username}`}
        />
        <SettingsInfoRow
          title={t('settings.accounts.trakt.user_id')}
          value={account?.userId || ''}
          isLast
        />
      </SettingsSection>

      <SettingsSection>
        <SettingsNavigationRow
          title={t('settings.accounts.trakt.disconnect')}
          description={t('settings.accounts.trakt.disconnect_description')}
          onPress={handleDisconnect}
          isLast
        />
      </SettingsSection>

      <SettingsSection
        title={t('settings.accounts.trakt.api_configuration')}
        footer={t('settings.accounts.trakt.api_configuration_footer')}
      >
        <SettingsConfigRow
          label={t('settings.accounts.trakt.base_url')}
          defaultValue={DEFAULT_BASE_URL}
          customValue={pendingChanges$.baseUrl.value.get()}
          isCustom={pendingChanges$.baseUrl.isCustom.get()}
          onToggleCustom={(useCustom) => {
            pendingChanges$.baseUrl.isCustom.set(useCustom)
            if (!useCustom) {
              pendingChanges$.baseUrl.value.set(DEFAULT_BASE_URL)
            } else {
              pendingChanges$.baseUrl.value.set('')
            }
          }}
          onCustomValueChange={(value) => pendingChanges$.baseUrl.value.set(value)}
          placeholder={DEFAULT_BASE_URL}
        />
        <SettingsConfigRow
          label={t('settings.accounts.trakt.client_id')}
          defaultValue={t('settings.accounts.trakt.using_env_client_id')}
          customValue={pendingChanges$.clientId.value.get()}
          isCustom={pendingChanges$.clientId.isCustom.get()}
          onToggleCustom={(useCustom) => {
            pendingChanges$.clientId.isCustom.set(useCustom)
            if (!useCustom) {
              pendingChanges$.clientId.value.set('')
            } else {
              pendingChanges$.clientId.value.set('')
            }
          }}
          onCustomValueChange={(value) => pendingChanges$.clientId.value.set(value)}
          placeholder={t('settings.accounts.trakt.custom_client_id')}
        />
        <SettingsConfigRow
          label={t('settings.accounts.trakt.client_secret')}
          defaultValue={t('settings.accounts.trakt.using_env_client_secret')}
          customValue={pendingChanges$.clientSecret.value.get()}
          isCustom={pendingChanges$.clientSecret.isCustom.get()}
          onToggleCustom={(useCustom) => {
            pendingChanges$.clientSecret.isCustom.set(useCustom)
            if (!useCustom) {
              pendingChanges$.clientSecret.value.set('')
            } else {
              pendingChanges$.clientSecret.value.set('')
            }
          }}
          onCustomValueChange={(value) => pendingChanges$.clientSecret.value.set(value)}
          placeholder={t('settings.accounts.trakt.custom_client_secret')}
          secureTextEntry
          isLast
        />
      </SettingsSection>

      <SettingsSection>
        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
            isSaving && styles.saveButtonDisabled,
          ]}
          onPress={handleSaveConfig}
          disabled={isSaving}
          accessibilityRole="button"
          accessibilityLabel={t('settings.accounts.trakt.save_config')}
          accessibilityState={{ disabled: isSaving }}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? t('settings.accounts.trakt.saving') : t('settings.accounts.trakt.save_config')}
          </Text>
        </Pressable>
      </SettingsSection>
    </ScrollView>
  )
})

export default TraktAccountScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    gap: theme.spacing.sm,
  },
  connectButtonPressed: {
    backgroundColor: theme.colors.surfaceElevated,
  },
  connectButtonDisabled: {
    opacity: 0.5,
  },
  connectText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.primary,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  saveButtonPressed: {
    opacity: 0.8,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
}))
