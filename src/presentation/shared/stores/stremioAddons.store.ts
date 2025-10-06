import { observable } from '@legendapp/state'
import type { StremioAddon } from '@/src/domain/entities/StremioAddon'

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
 * Global state for Stremio addons
 * Installed: User's installed and configured addons
 * Browsing: Addons from catalog being browsed
 */
export const stremioAddons$ = observable<StremioAddonsState>({
  installed: [],
  browsing: [],
  isLoading: false,
  error: null,
})
