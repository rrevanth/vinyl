import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { ILoggingService } from '@/src/domain/services/ILoggingService'

/**
 * Granular query invalidation on UserPreferences changes
 *
 * Invalidates only affected queries based on which preference changed.
 * This prevents unnecessary refetching and significantly improves performance.
 */
export const useGlobalQueryInvalidation = () => {
  const queryClient = useQueryClient()
  const logger = useService<ILoggingService>(TOKENS.LoggingService)

  useEffect(() => {
    // Catalog preferences - only invalidate catalog and homescreen queries
    const unsubCatalogPrefs = userPreferences$.catalogPreferences.onChange(() => {
      logger.info('Catalog preferences changed, invalidating catalog queries')
      queryClient.invalidateQueries({ queryKey: ['catalog'] })
      queryClient.invalidateQueries({ queryKey: ['homescreen'] })
    })

    // Provider-related preferences - invalidate all data queries
    // Note: These properties may not exist on userPreferences$, so we skip them if not present
    const unsubProviderPrefs = userPreferences$.onChange((changedProps) => {
      // Check if any provider-related preference changed
      if (changedProps && ('providerPriorities' in changedProps || 'providerCapabilities' in changedProps)) {
        logger.info('Provider settings changed, invalidating data queries')
        queryClient.invalidateQueries({ 
          predicate: (query) => {
            const key = query.queryKey[0]
            return key === 'catalog' || key === 'media' || key === 'homescreen' || key === 'streams'
          }
        })
      }
    })

    // UI preferences - no invalidation needed (visual only)
    const unsubUIPrefs = userPreferences$.ui.onChange(() => {
      logger.debug('UI preferences changed, no query invalidation needed')
    })

    // Homescreen preferences - only invalidate homescreen
    const unsubHomescreenPrefs = userPreferences$.homescreen.onChange(() => {
      logger.info('Homescreen preferences changed, invalidating homescreen queries')
      queryClient.invalidateQueries({ queryKey: ['homescreen'] })
    })

    // Account settings - invalidate all queries (new auth tokens, etc.)
    const unsubAccountPrefs = userPreferences$.accounts.onChange(() => {
      logger.info('Account settings changed, invalidating all queries')
      queryClient.invalidateQueries()
    })

    return () => {
      unsubCatalogPrefs()
      unsubProviderPrefs()
      unsubUIPrefs()
      unsubHomescreenPrefs()
      unsubAccountPrefs()
    }
  }, [queryClient, logger])
}
