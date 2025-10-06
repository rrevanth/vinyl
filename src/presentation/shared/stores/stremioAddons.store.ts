import { observable, computed } from '@legendapp/state'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'

/**
 * Addon statistics interface
 */
export interface AddonStats {
  totalInstalled: number
  activeAddons: number
  totalCatalogs: number
  workingAddons: number
}

/**
 * Stremio addons state interface
 * Manages both installed addons and browsing catalog
 */
interface StremioAddonsState {
  installed: StremioAddon[]
  browsing: StremioAddon[]
  isLoading: boolean
  error: string | null
}

/**
 * Global state for Stremio addons (transient runtime cache only)
 *
 * IMPORTANT: This is NOT persisted. Source of truth is StremioAddonStorage.
 * - Installed: Loaded from infrastructure on mount (via StremioAddonsUseCase)
 * - Browsing: Addons from catalog being browsed (always transient)
 *
 * Benefits of transient state:
 * - No class method loss on deserialization
 * - No conflicts with infrastructure storage
 * - Single source of truth (StremioAddonStorage)
 * - Proper provider integration via StremioAddonRegistry
 */
export const stremioAddons$ = observable<StremioAddonsState>({
  installed: [],
  browsing: [],
  isLoading: false,
  error: null,
})

/**
 * Computed addon statistics
 * Automatically recalculates when installed addons change
 * Uses getTotalCatalogCount() to include both catalogs and addonCatalogs
 */
export const addonStats$ = computed<AddonStats>(() => {
  const installed = stremioAddons$.installed.get()

  return {
    totalInstalled: installed.length,
    activeAddons: installed.filter((addon) => addon.isEnabled).length,
    totalCatalogs: installed
      .filter((addon) => addon.isEnabled)
      .reduce((sum, addon) => sum + addon.getTotalCatalogCount(), 0),
    workingAddons: installed.filter((addon) => addon.isReadyToUse()).length,
  }
})
