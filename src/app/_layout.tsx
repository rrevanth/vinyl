// CRITICAL: Import Unistyles configuration FIRST before any other imports
// This ensures StyleSheet.configure() runs before any StyleSheet.create() calls
import '@/src/presentation/theme/unistyles'

// Import initialization function but DO NOT auto-run it
import { initializeContainer } from '@/src/infrastructure/di/initializeContainer'
import { QueryClientProvider } from '@tanstack/react-query'
import { container } from '@/src/infrastructure/di/Container'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { QueryClient } from '@tanstack/react-query'
import { isAppReady$ } from '@/src/presentation/shared/stores/initialization.store'
import { InitializationLoadingScreen } from '@/src/presentation/shared/components/InitializationLoadingScreen'
import { useGlobalQueryInvalidation } from '@/src/presentation/shared/hooks/useGlobalQueryInvalidation'
import { observer, useSelector } from '@legendapp/state/react'
import { Stack } from 'expo-router'
import { useEffect, useState } from 'react'

const RootLayout = observer(() => {
  const [containerReady, setContainerReady] = useState(false)
  const [initError, setInitError] = useState<Error | null>(null)

  // Initialize container once on mount
  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeContainer()
        setContainerReady(true)
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error))
        setInitError(err)
        console.error('Failed to initialize container', err)
      }
    }

    initialize()
  }, [])

  // Check if app initialization is complete
  const isReady = useSelector(() => isAppReady$.get())

  // Show error state if initialization failed (show loading screen but log error)
  if (initError) {
    console.error('Container initialization failed:', initError)
    return <InitializationLoadingScreen />
  }

  // Show loading screen until container is initialized
  if (!containerReady || !isReady) {
    return <InitializationLoadingScreen />
  }

  // Get QueryClient from DI container (now safe to access)
  const queryClient = container.resolve<QueryClient>(TOKENS.QueryClient)

  // App is ready - render main navigation with QueryClient context
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
})

// AppContent runs INSIDE QueryClientProvider so hooks can access QueryClient context
const AppContent = observer(() => {
  // Global query invalidation: Any UserPreferences change invalidates ALL queries
  // This ensures query results (catalogs, streams, etc.) always reflect current preferences
  // NOW safe to use because we're inside QueryClientProvider
  useGlobalQueryInvalidation()

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="media/[stableId]" />
      <Stack.Screen name="auth/callback" />
    </Stack>
  )
})

export default RootLayout
