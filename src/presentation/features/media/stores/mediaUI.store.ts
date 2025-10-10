import { observable } from '@legendapp/state'

/**
 * Minimal UI state for media detail screen
 * Only contains screen-specific UI preferences
 * All data and loading states are managed by TanStack Query
 */

/**
 * Currently selected season number for series
 */
export const selectedSeason$ = observable(1)

/**
 * Set the selected season
 */
export const setSelectedSeason = (seasonNumber: number): void => {
  selectedSeason$.set(seasonNumber)
}

/**
 * Reset to first season (used when navigating to new media)
 */
export const resetSelectedSeason = (): void => {
  selectedSeason$.set(1)
}
