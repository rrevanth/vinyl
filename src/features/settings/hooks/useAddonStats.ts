import { useSelector } from '@legendapp/state/react'
import { addonStats$ } from '@/src/presentation/shared/stores/stremioAddons.store'
import type { AddonStats } from '@/src/presentation/shared/stores/stremioAddons.store'

/**
 * Hook for accessing Stremio addon statistics
 *
 * Returns reactive statistics about installed addons:
 * - totalInstalled: Total number of installed addons
 * - activeAddons: Number of enabled addons
 * - totalCatalogs: Total catalog count across all enabled addons
 * - workingAddons: Number of addons that are ready to use
 *
 * The statistics automatically update when addons change.
 *
 * Usage:
 * ```tsx
 * const { totalInstalled, activeAddons, totalCatalogs, workingAddons } = useAddonStats()
 *
 * return (
 *   <View>
 *     <Text>Total Addons: {totalInstalled}</Text>
 *     <Text>Active Addons: {activeAddons}</Text>
 *     <Text>Total Catalogs: {totalCatalogs}</Text>
 *     <Text>Working Addons: {workingAddons}</Text>
 *   </View>
 * )
 * ```
 */
export const useAddonStats = (): AddonStats => {
  return useSelector(addonStats$)
}
