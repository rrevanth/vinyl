// CRITICAL: Import Unistyles configuration FIRST before any other imports
// This ensures StyleSheet.configure() runs before any StyleSheet.create() calls
import '@/src/presentation/theme/unistyles'

// Now safe to import DI container and other dependencies
import '@/src/infrastructure/di/initializeContainer'
import { useStremioInitialization } from '@/src/presentation/shared/hooks/useStremioInitialization'
import { QueryClientProvider } from '@tanstack/react-query'
import { container } from '@/src/infrastructure/di/Container'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { QueryClient } from '@tanstack/react-query'
import { isAppReady$ } from '@/src/presentation/shared/stores/initialization.store'
import { InitializationLoadingScreen } from '@/src/presentation/shared/components/InitializationLoadingScreen'
import { observer, useSelector } from '@legendapp/state/react'
import { Stack } from 'expo-router'

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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="media/[stableId]" />
        <Stack.Screen name="auth/callback" />
      </Stack>
    </QueryClientProvider>
  )
})

export default RootLayout
