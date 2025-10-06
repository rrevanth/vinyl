// CRITICAL: Import Unistyles configuration FIRST before any other imports
// This ensures StyleSheet.configure() runs before any StyleSheet.create() calls
import '@/src/presentation/theme/unistyles'

// Now safe to import DI container and other dependencies
import { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { StyleSheet, withUnistyles } from 'react-native-unistyles'
import { initializeContainer } from '@/src/infrastructure/di/initializeContainer'
import { t } from '@/src/presentation/shared/i18n'
import { observer } from '@legendapp/state/react'
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs'
import { QueryClientProvider } from '@tanstack/react-query'
import { container } from '@/src/infrastructure/di/Container'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { QueryClient } from '@tanstack/react-query'

// Theme the native tabs with Unistyles
const ThemedNativeTabs = withUnistyles(NativeTabs, (theme) => ({
  tintColor: theme.colors.primary,
}))

// Loading screen component with Unistyles
const LoadingScreen = withUnistyles(
  () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  ),
  (theme) => ({
    backgroundColor: theme.colors.background,
    color: theme.colors.primary,
  })
)

const RootLayout = observer(() => {
  const [isContainerReady, setIsContainerReady] = useState(false)

  useEffect(() => {
    let isMounted = true

    const initialize = async () => {
      try {
        console.log('[App] Starting async initialization...')
        // Wait for AsyncStorage to load, then initialize DI container
        await initializeContainer()
        console.log('[App] Initialization complete')

        if (isMounted) {
          setIsContainerReady(true)
        }
      } catch (error) {
        console.error('[App] Failed to initialize container:', error)
        // Still set ready to prevent infinite loading
        if (isMounted) {
          setIsContainerReady(true)
        }
      }
    }

    initialize()

    return () => {
      isMounted = false
    }
  }, [])

  // Show loading screen while waiting for AsyncStorage + DI container
  if (!isContainerReady) {
    return <LoadingScreen />
  }

  // Get QueryClient from DI container (only after initialization)
  const queryClient = container.resolve<QueryClient>(TOKENS.QueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemedNativeTabs>
        <NativeTabs.Trigger name="home">
          <Icon sf="house.fill" drawable="home" />
          <Label>{t('navigation.home')}</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="search">
          <Icon sf="magnifyingglass" drawable="search" />
          <Label>{t('navigation.search')}</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="library">
          <Icon sf="square.stack.fill" drawable="library" />
          <Label>{t('navigation.library')}</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
          <Icon sf="gear" drawable="settings" />
          <Label>{t('navigation.settings')}</Label>
        </NativeTabs.Trigger>
      </ThemedNativeTabs>
    </QueryClientProvider>
  )
})

const styles = StyleSheet.create((theme) => ({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
}))

export default RootLayout
