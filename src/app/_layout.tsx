// CRITICAL: Import Unistyles configuration FIRST before any other imports
// This ensures StyleSheet.configure() runs before any StyleSheet.create() calls
import '@/src/presentation/theme/unistyles'

// Import initialization function but DO NOT auto-run it
import { initializeContainer } from '@/src/infrastructure/di/initializeContainer'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import type { Persister } from '@tanstack/react-query-persist-client'
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
    let isCancelled = false

    const initialize = async () => {
      if (isCancelled) return

      try {
        await initializeContainer()
        if (!isCancelled) {
          setContainerReady(true)
        }
      } catch (error) {
        if (!isCancelled) {
          const err = error instanceof Error ? error : new Error(String(error))
          setInitError(err)
          console.error('Failed to initialize container', err)
        }
      }
    }

    initialize()

    // Cleanup function for React StrictMode
    return () => {
      isCancelled = true
    }
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

  // Get QueryClient and Persister from DI container (now safe to access)
  const queryClient = container.resolve<QueryClient>(TOKENS.QueryClient)
  const persister = container.resolve<Persister>(TOKENS.QueryPersister)

  // App is ready - render main navigation with QueryClient context and cache persistence
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        // Cache has been restored from AsyncStorage
        console.log('[CACHE] Persisted cache restored from AsyncStorage')
      }}
    >
      <AppContent />
    </PersistQueryClientProvider>
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
