import { useEffect } from 'react'
import { useSelector } from '@legendapp/state/react'
import { userState$ } from '@/src/presentation/shared/stores/app.store'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { StremioInitializationService } from '@/src/infrastructure/services/StremioInitializationService'

/**
 * Hook to initialize Stremio system for authenticated user
 *
 * Call this hook once at app startup (e.g., in root layout or after authentication)
 * It will automatically initialize Stremio when user is authenticated
 *
 * Features:
 * - Automatic initialization when user ID changes
 * - Prevents duplicate initialization
 * - Proper cleanup on unmount
 * - Progress tracked in initialization store
 *
 * Usage:
 * ```tsx
 * // In root layout or main app component
 * function App() {
 *   useStremioInitialization()
 *   return <AppContent />
 * }
 * ```
 */
export const useStremioInitialization = (): void => {
  const stremioInitService = useService<StremioInitializationService>(
    TOKENS.StremioInitializationService
  )
  const currentUserId = useSelector(() => userState$.currentUser.id.get())

  useEffect(() => {
    if (!currentUserId) {
      return
    }

    // Initialize Stremio - progress tracked in StremioInitializationService
    stremioInitService.initialize(currentUserId).catch((error) => {
      console.warn('Stremio initialization failed', error)
    })

    return () => {
      stremioInitService.shutdown(currentUserId).catch((error) => {
        console.warn('Stremio shutdown failed', error)
      })
    }
  }, [currentUserId, stremioInitService])
}