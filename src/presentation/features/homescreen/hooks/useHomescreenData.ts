import { useCallback, useEffect, useState } from 'react'
import { useSelector } from '@legendapp/state/react'
import { mediaLibrary$ } from '@/src/presentation/shared/stores/mediaLibrary.store'
import { userPreferences$ } from '@/src/presentation/shared/stores/app.store'
import { useService } from '@/src/infrastructure/di/useService'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import type { GetHomescreenDataUseCase } from '@/src/domain/use-cases/homescreen/GetHomescreenDataUseCase'
import type { RefreshHomescreenUseCase } from '@/src/domain/use-cases/homescreen/RefreshHomescreenUseCase'
import type { Media } from '@/src/domain/entities/Media'
import type { ContinueWatchingItem } from '@/src/domain/capabilities/IMediaContinueWatchingCapability'
import type { Catalog } from '@/src/domain/entities/Catalog'
import type { HomescreenPreferences } from '@/src/domain/entities/UserPreferences'

interface UseHomescreenDataResult {
  readonly heroItems: Media[]
  readonly continueWatching: ContinueWatchingItem[]
  readonly catalogs: Catalog[]
  readonly isLoading: boolean
  readonly isRefreshing: boolean
  readonly error: string | null
  readonly preferences: HomescreenPreferences
  refresh(): Promise<void>
}

export const useHomescreenData = (): UseHomescreenDataResult => {
  const getHomescreenDataUseCase = useService<GetHomescreenDataUseCase>(
    TOKENS.GetHomescreenDataUseCase
  )
  const refreshHomescreenUseCase = useService<RefreshHomescreenUseCase>(
    TOKENS.RefreshHomescreenUseCase
  )

  const heroItems = useSelector(() => mediaLibrary$.hero.items.get())
  const continueWatching = useSelector(() => mediaLibrary$.continueWatching.items.get())
  const catalogs = useSelector(() => mediaLibrary$.catalogs.displayed.get())
  const preferences = useSelector(() => userPreferences$.homescreen.get())

  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getHomescreenDataUseCase.execute({
        heroLimit: 10,
        continueWatchingLimit: 12,
        itemsPerCatalog: preferences.itemsPerRow * 4,
      })

      mediaLibrary$.hero.items.set(data.heroItems)
      mediaLibrary$.continueWatching.items.set(data.continueWatching)
      mediaLibrary$.catalogs.available.set(data.catalogs)
      mediaLibrary$.catalogs.displayed.set(data.catalogs)
      mediaLibrary$.ui.lastRefresh.set(data.cacheStatus.lastRefreshed)
    } catch (loadError) {
      setError((loadError as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [getHomescreenDataUseCase, preferences])

  useEffect(() => {
    void load()
  }, [load])

  const refresh = useCallback(async () => {
    setIsRefreshing(true)
    setError(null)

    try {
      const result = await refreshHomescreenUseCase.execute()
      mediaLibrary$.hero.items.set(result.data.heroItems)
      mediaLibrary$.continueWatching.items.set(result.data.continueWatching)
      mediaLibrary$.catalogs.available.set(result.data.catalogs)
      mediaLibrary$.catalogs.displayed.set(result.data.catalogs)
      mediaLibrary$.ui.lastRefresh.set(result.data.cacheStatus.lastRefreshed)
    } catch (refreshError) {
      setError((refreshError as Error).message)
    } finally {
      setIsRefreshing(false)
    }
  }, [refreshHomescreenUseCase])

  return {
    heroItems,
    continueWatching,
    catalogs,
    isLoading,
    isRefreshing,
    error,
    preferences,
    refresh,
  }
}
