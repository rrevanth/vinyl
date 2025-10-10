import { observable } from '@legendapp/state'

/**
 * Person UI Store
 * Contains UI-only state for person detail screen
 *
 * Pattern:
 * - TanStack Query holds all data (single source of truth)
 * - This store only holds UI interaction state
 */
export const personUI$ = observable({
  // Selected filmography tab (all, movies, tv)
  selectedFilmographyTab: 'all' as 'all' | 'movies' | 'tv',
})
