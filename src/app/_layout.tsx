// CRITICAL: Import Unistyles configuration FIRST before any other imports
// This ensures StyleSheet.configure() runs before any StyleSheet.create() calls
import '@/src/presentation/theme/unistyles'

// Now safe to import DI container and other dependencies
import '@/src/infrastructure/di/initializeContainer'
import { t } from '@/src/presentation/shared/i18n'
import { observer, useSelector } from '@legendapp/state/react'
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs'
import { withUnistyles } from 'react-native-unistyles'
import { useStremioInitialization } from '@/src/presentation/shared/hooks/useStremioInitialization'
import { QueryClientProvider } from '@tanstack/react-query'
import { container } from '@/src/infrastructure/di/Container'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { QueryClient } from '@tanstack/react-query'
import { isAppReady$ } from '@/src/presentation/shared/stores/initialization.store'
import { InitializationLoadingScreen } from '@/src/presentation/shared/components/InitializationLoadingScreen'

// Theme the native tabs with Unistyles
const ThemedNativeTabs = withUnistyles(NativeTabs, (theme) => ({
  tintColor: theme.colors.primary,
}))

const RootLayout = observer(() => {
  // Initialize Stremio system for authenticated user
  useStremioInitialization()

  // Check if app initialization is complete
  const isReady = useSelector(() => isAppReady$.get())

  // Get QueryClient from DI container
  const queryClient = container.resolve<QueryClient>(TOKENS.QueryClient)

  // Show loading screen until all initialization is complete
  if (!isReady) {
    return <InitializationLoadingScreen />
  }

  // App is ready - render main navigation
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

export default RootLayout
