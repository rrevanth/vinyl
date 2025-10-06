import { useState } from 'react'
import { ScrollView, Pressable, Text, View, Alert, ActivityIndicator } from 'react-native'
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'
import { SettingsSection } from '@/src/features/settings/components/atoms/SettingsSection'
import { SettingsInfoRow } from '@/src/features/settings/components/atoms/SettingsInfoRow'
import { SettingsNavigationRow } from '@/src/features/settings/components/atoms/SettingsNavigationRow'
import { ConnectionStatus } from '@/src/features/settings/components/atoms/ConnectionStatus'
import { ErrorBanner } from '@/src/features/settings/components/atoms/ErrorBanner'
import { useTraktAccount } from '@/src/features/settings/hooks/useTraktAccount'
import { t } from '@/src/presentation/shared/i18n'

const TraktAccountScreen = observer(() => {
  const { isConnected, account, isLoading, error, startOAuthFlow, disconnect } = useTraktAccount()
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!isConnected) {
    const shouldShowError = error && !dismissedError

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
      </ScrollView>
    )
  }

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
}))
