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

const FanartAccountScreen = observer(() => {
  const fanartAccount = userPreferences$.accounts.fanart.get()
  const [apiKey, setApiKey] = useState(fanartAccount?.apiKey || '')
  const [clientKey, setClientKey] = useState(fanartAccount?.clientKey || '')
  const [isLoading, setIsLoading] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dismissedError, setDismissedError] = useState(false)

  const isConnected = Boolean(fanartAccount?.apiKey)

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      Alert.alert('API Key Required', 'Please enter your Fanart.tv API key to test the connection.')
      return
    }

    setIsTesting(true)
    setError(null)
    setDismissedError(false)

    try {
      // Import the FanartClient and test connection
      const { FanartClient } = await import('@/src/infrastructure/api/fanart/FanartClient')
      const { FanartConfigFactory } = await import(
        '@/src/infrastructure/factories/FanartConfigFactory'
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

      const configFactory = new FanartConfigFactory(envService)
      const client = new FanartClient(configFactory, logger, queueService)

      // Update config with user-provided keys
      client.updateConfig(apiKey.trim(), clientKey.trim() || undefined)

      const result = await client.testConnection()

      if (result.success) {
        Alert.alert(
          'Connection Successful',
          'Successfully connected to Fanart.tv API. You can now save your settings.'
        )
      } else {
        setError(result.error || 'Connection failed')
        Alert.alert('Connection Failed', result.error || 'Unable to connect to Fanart.tv')
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
      Alert.alert('API Key Required', 'Please enter your Fanart.tv API key.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Save to preferences
      userPreferences$.accounts.fanart.set({
        apiKey: apiKey.trim(),
        clientKey: clientKey.trim() || undefined,
      })

      Alert.alert('Settings Saved', 'Your Fanart.tv API settings have been saved successfully.')
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
      'Disconnect Fanart.tv?',
      'This will remove your Fanart.tv API key from the app. You can reconnect at any time.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: () => {
            userPreferences$.accounts.fanart.set(undefined)
            setApiKey('')
            setClientKey('')
            Alert.alert('Disconnected', 'Your Fanart.tv account has been disconnected.')
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
        footer="Enter your Fanart.tv API key to access high-quality images. Optionally add a client key for personal API access."
      >
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>API Key (Required)</Text>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter your Fanart.tv API key"
            placeholderTextColor={UnistylesRuntime.getTheme().colors.textTertiary}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            accessibilityLabel="API Key"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Client Key (Optional)</Text>
          <TextInput
            style={styles.input}
            value={clientKey}
            onChangeText={setClientKey}
            placeholder="Enter your personal client key"
            placeholderTextColor={UnistylesRuntime.getTheme().colors.textTertiary}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            accessibilityLabel="Client Key"
          />
          <Text style={styles.inputHint}>
            Personal API key for end users. Learn more at fanart.tv
          </Text>
        </View>
      </SettingsSection>

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
            description="Remove Fanart.tv API key from the app"
            onPress={handleDisconnect}
            isLast
          />
        </SettingsSection>
      )}

      <SettingsSection title="About Fanart.tv">
        <SettingsInfoRow title="Service" value="High-quality images provider" />
        <SettingsInfoRow title="API Version" value="v3" />
        <SettingsInfoRow title="Image Types" value="HD Logos, Clearart, Backgrounds" isLast />
      </SettingsSection>
    </ScrollView>
  )
})

export default FanartAccountScreen

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
  inputHint: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textTertiary,
    marginTop: theme.spacing.xs,
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
