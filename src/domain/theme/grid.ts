/**
 * Grid Layout Configuration
 * Framework-agnostic grid system for responsive layouts
 *
 * This module defines grid layout configurations for different view modes,
 * providing consistent spacing and column counts across the app.
 */

/**
 * Grid view mode types
 */
export type GridViewMode = 'compact' | 'comfortable' | 'cozy'

/**
 * Grid layout configuration for a specific view mode
 */
export interface GridLayoutConfig {
  readonly columns: number
  readonly itemSpacing: number
  readonly itemAspectRatio: number
}

/**
 * Grid layout configurations mapped by view mode
 */
export type GridLayoutScale = {
  readonly [K in GridViewMode]: GridLayoutConfig
}

/**
 * Grid layout scale
 * Defines column count, spacing, and aspect ratio for each view mode
 */
export const gridLayout: GridLayoutScale = {
  compact: {
    columns: 4,
    itemSpacing: 8,
    itemAspectRatio: 0.67, // Standard poster aspect ratio (2:3)
  },
  comfortable: {
    columns: 3,
    itemSpacing: 12,
    itemAspectRatio: 0.67,
  },
  cozy: {
    columns: 2,
    itemSpacing: 16,
    itemAspectRatio: 0.67,
  },
} as const
