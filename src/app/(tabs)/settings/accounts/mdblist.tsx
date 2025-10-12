import { useState } from 'react'
import {
  ScrollView,
  Pressable,
  Text,
  View,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native'
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'
import { SettingsSection } from '@/src/features/settings/components/atoms/SettingsSection'
import { SettingsInfoRow } from '@/src/features/settings/components/atoms/SettingsInfoRow'
import { SettingsNavigationRow } from '@/src/features/settings/components/atoms/SettingsNavigationRow'
import { ConnectionStatus } from '@/src/features/settings/components/atoms/ConnectionStatus'
import { ErrorBanner } from '@/src/features/settings/components/atoms/ErrorBanner'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'

const MDBListAccountScreen = observer(() => {
  const mdblistAccount = userPreferences$.accounts.mdblist.get()
  const [apiKey, setApiKey] = useState(mdblistAccount?.apiKey || '')
  const [isLoading, setIsLoading] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dismissedError, setDismissedError] = useState(false)
  const [apiLimits, setApiLimits] = useState<{
    api_requests: number
    api_requests_count: number
    patron_status: string
  } | null>(null)

  const isConnected = Boolean(mdblistAccount?.apiKey)

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      Alert.alert('API Key Required', 'Please enter your MDBList API key to test the connection.')
      return
    }

    setIsTesting(true)
    setError(null)
    setDismissedError(false)
    setApiLimits(null)

    try {
      // Import the MDBListClient and test connection
      const { MDBListClient } = await import('@/src/infrastructure/api/mdblist/MDBListClient')
      const { MDBListConfigFactory } = await import(
        '@/src/infrastructure/factories/MDBListConfigFactory'
      )
      const { container } = await import('@/src/infrastructure/di/Container')
      const { TOKENS } = await import('@/src/infrastructure/di/tokens')
      const envService = container.resolve<
        import('@/src/domain/services/IEnvironmentService').IEnvironmentService
      >(TOKENS.EnvironmentService)
      const logger = container.resolve<
        import('@/src/domain/services/ILoggingService').ILoggingService
      >(TOKENS.LoggingService)
      const queueService = container.resolve<
        import('@/src/infrastructure/services/RequestQueueService').RequestQueueService
      >(TOKENS.RequestQueueService)

      const configFactory = new MDBListConfigFactory(envService)
      const client = new MDBListClient(configFactory, logger, queueService)

      // Update config with user-provided API key
      // We need to temporarily save it to trigger the config reload
      const previousConfig = userPreferences$.accounts.mdblist.get()
      userPreferences$.accounts.mdblist.set({
        apiKey: apiKey.trim(),
      })

      const result = await client.testConnection()

      if (result.success) {
        // Try to get API limits
        try {
          const limits = await client.getLimits()
          setApiLimits({
            api_requests: limits.api_requests,
            api_requests_count: limits.api_requests_count,
            patron_status: limits.patron_status,
          })
        } catch (limitsError) {
          // Non-critical error, connection still successful
          console.log('Could not fetch API limits:', limitsError)
        }

        Alert.alert(
          'Connection Successful',
          'Successfully connected to MDBList API. You can now save your settings.'
        )
      } else {
        // Restore previous config on failure
        userPreferences$.accounts.mdblist.set(previousConfig)
        setError(result.error || 'Connection failed')
        Alert.alert('Connection Failed', result.error || 'Unable to connect to MDBList')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      Alert.alert('Connection Failed', errorMessage)
    } finally {
      setIsTesting(false)
    }
  }

  const handleSave = async () => {
    if (!apiKey.trim()) {
      Alert.alert('API Key Required', 'Please enter your MDBList API key.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Save to preferences
      userPreferences$.accounts.mdblist.set({
        apiKey: apiKey.trim(),
      })

      Alert.alert('Settings Saved', 'Your MDBList API settings have been saved successfully.')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      Alert.alert('Save Failed', errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    Alert.alert(
      'Disconnect MDBList?',
      'This will remove your MDBList API key from the app. You can reconnect at any time.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: () => {
            userPreferences$.accounts.mdblist.set(undefined)
            setApiKey('')
            setApiLimits(null)
            Alert.alert('Disconnected', 'Your MDBList account has been disconnected.')
          },
        },
      ]
    )
  }

  const handleDismissError = () => {
    setDismissedError(true)
  }

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
          onRetry={handleTestConnection}
          retryLabel="Retry Connection"
        />
      )}

      {isConnected && <ConnectionStatus status="connected" message="API Key configured" />}

      <SettingsSection
        title="API Configuration"
        footer="Enter your MDBList API key to access aggregated ratings from multiple sources."
      >
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>API Key (Required)</Text>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter your MDBList API key"
            placeholderTextColor={UnistylesRuntime.getTheme().colors.textTertiary}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            accessibilityLabel="API Key"
          />
        </View>
      </SettingsSection>

      {apiLimits && (
        <SettingsSection title="API Usage">
          <SettingsInfoRow
            title="API Requests Used"
            value={`${apiLimits.api_requests_count} / ${apiLimits.api_requests}`}
          />
          <SettingsInfoRow title="Patron Status" value={apiLimits.patron_status} isLast />
        </SettingsSection>
      )}

      <SettingsSection>
        <Pressable
          style={({ pressed }) => [
            styles.testButton,
            pressed && styles.testButtonPressed,
            isTesting && styles.testButtonDisabled,
          ]}
          onPress={handleTestConnection}
          disabled={isTesting || !apiKey.trim()}
          accessibilityRole="button"
          accessibilityLabel="Test Connection"
          accessibilityState={{ disabled: isTesting || !apiKey.trim() }}
        >
          {isTesting ? (
            <ActivityIndicator size="small" color={UnistylesRuntime.getTheme().colors.primary} />
          ) : (
            <Ionicons
              name="checkmark-circle-outline"
              size={24}
              color={UnistylesRuntime.getTheme().colors.primary}
            />
          )}
          <Text style={styles.testButtonText}>
            {isTesting ? 'Testing Connection...' : 'Test Connection'}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
            isLoading && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={isLoading || !apiKey.trim()}
          accessibilityRole="button"
          accessibilityLabel="Save Settings"
          accessibilityState={{ disabled: isLoading || !apiKey.trim() }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Ionicons name="save-outline" size={24} color="#FFFFFF" />
          )}
          <Text style={styles.saveButtonText}>{isLoading ? 'Saving...' : 'Save Settings'}</Text>
        </Pressable>
      </SettingsSection>

      {isConnected && (
        <SettingsSection>
          <SettingsNavigationRow
            title="Disconnect"
            description="Remove MDBList API key from the app"
            onPress={handleDisconnect}
            isLast
          />
        </SettingsSection>
      )}

      <SettingsSection title="About MDBList">
        <SettingsInfoRow title="Service" value="Aggregated ratings provider" />
        <SettingsInfoRow title="API Version" value="v1" />
        <SettingsInfoRow
          title="Rating Sources"
          value="IMDb, TMDB, Trakt, Letterboxd, RT, Metacritic"
          isLast
        />
      </SettingsSection>
    </ScrollView>
  )
})

export default MDBListAccountScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  inputContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  inputLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    gap: theme.spacing.sm,
  },
  testButtonPressed: {
    backgroundColor: theme.colors.surfaceElevated,
  },
  testButtonDisabled: {
    opacity: 0.5,
  },
  testButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.primary,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  saveButtonPressed: {
    opacity: 0.8,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: '#FFFFFF',
  },
}))
