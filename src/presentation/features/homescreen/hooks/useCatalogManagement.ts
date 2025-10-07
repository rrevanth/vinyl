import { useCallback, useEffect, useState } from 'react'
import { useSelector } from '@legendapp/state/react'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { mediaLibrary$ } from '@/src/presentation/shared/stores/mediaLibrary.store'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { GetAvailableCatalogsUseCase } from '@/src/domain/use-cases/homescreen/GetAvailableCatalogsUseCase'
import type { ManageCatalogUseCase } from '@/src/domain/use-cases/homescreen/ManageCatalogUseCase'
import type { UpdateHomescreenPreferencesUseCase } from '@/src/domain/use-cases/homescreen/UpdateHomescreenPreferencesUseCase'
import type { GetHomescreenDataUseCase } from '@/src/domain/use-cases/homescreen/GetHomescreenDataUseCase'

interface UseCatalogManagementResult {
  readonly catalogs: Catalog[]
  readonly selectedIds: readonly string[]
  readonly isLoading: boolean
  readonly error: string | null
  toggleCatalog(catalogId: string): Promise<void>
  refresh(): Promise<void>
}

export const useCatalogManagement = (): UseCatalogManagementResult => {
  const getAvailableCatalogsUseCase = useService<GetAvailableCatalogsUseCase>(
    TOKENS.GetAvailableCatalogsUseCase
  )
  const manageCatalogUseCase = useService<ManageCatalogUseCase>(TOKENS.ManageCatalogUseCase)
  const updateHomescreenPreferencesUseCase = useService<UpdateHomescreenPreferencesUseCase>(
    TOKENS.UpdateHomescreenPreferencesUseCase
  )
  const getHomescreenDataUseCase = useService<GetHomescreenDataUseCase>(
    TOKENS.GetHomescreenDataUseCase
  )

  const selectedIds = useSelector(() => userPreferences$.homescreen.selectedCatalogIds.get())

  const [catalogs, setCatalogs] = useState<Catalog[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadCatalogs = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await getAvailableCatalogsUseCase.execute()
      setCatalogs(result)
      mediaLibrary$.catalogs.available.set(result)
    } catch (loadError) {
      setError((loadError as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [getAvailableCatalogsUseCase])

  useEffect(() => {
    void loadCatalogs()
  }, [loadCatalogs])

  const toggleCatalog = useCallback(
    async (catalogId: string) => {
      try {
        await manageCatalogUseCase.execute({
          operation: 'toggle',
          catalogId,
        })

        // Ensure homescreen preferences stay consistent with catalog order list
        const updatedPreferences = userPreferences$.homescreen.get()
        if (updatedPreferences.catalogOrder.length === 0 && updatedPreferences.selectedCatalogIds.length > 0) {
          await updateHomescreenPreferencesUseCase.execute({
            catalogs: {
              catalogOrder: updatedPreferences.selectedCatalogIds,
            },
          })
        }

        // Refresh cached homescreen data so the main screen reflects changes
        const data = await getHomescreenDataUseCase.execute({
          heroLimit: 10,
          continueWatchingLimit: 12,
          itemsPerCatalog: updatedPreferences.itemsPerRow * 4,
        })
        mediaLibrary$.hero.items.set(data.heroItems)
        mediaLibrary$.continueWatching.items.set(data.continueWatching)
        mediaLibrary$.catalogs.displayed.set(data.catalogs)
      } catch (toggleError) {
        setError((toggleError as Error).message)
      }
    },
    [getHomescreenDataUseCase, manageCatalogUseCase, updateHomescreenPreferencesUseCase]
  )

  return {
    catalogs,
    selectedIds,
    isLoading,
    error,
    toggleCatalog,
    refresh: loadCatalogs,
  }
}
