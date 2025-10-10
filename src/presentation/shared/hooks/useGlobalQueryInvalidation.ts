import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

/**
 * Global query invalidation on UserPreferences changes
 *
 * Invalidates ALL TanStack Query cache whenever any user preference changes.
 * This ensures query results (catalogs, streams, etc.) always reflect current
 * preferences without manual invalidation in each mutation.
 */
export const useGlobalQueryInvalidation = () => {
  const queryClient = useQueryClient()
  const logger = useService<ILoggingService>(TOKENS.LoggingService)

  useEffect(() => {
    const unsubscribe = userPreferences$.onChange(() => {
      logger.info('Preferences changed, invalidating all queries')
      queryClient.invalidateQueries()
    })

    return () => unsubscribe()
  }, [queryClient, logger])
}
