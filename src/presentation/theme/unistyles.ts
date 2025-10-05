/**
 * Unistyles Configuration
 * Presentation layer theme integration
 *
 * This module configures react-native-unistyles to consume the domain theme,
 * providing type-safe styling throughout the application with responsive breakpoints.
 *
 * Architecture: Presentation Layer (consumes Domain Theme)
 */

import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles'
import { darkTheme, lightTheme } from '../../domain/theme'
import { userPreferences$ } from '../shared/stores/app.store'
import type { GridLayoutConfig, GridViewMode } from '../../domain/theme'

/**
 * Responsive breakpoints for adaptive layouts
 * Following mobile-first design principles
 */
const breakpoints = {
  xs: 0, // Small phones (portrait)
  sm: 360, // Standard phones (portrait)
  md: 768, // Tablets (portrait) / Large phones (landscape)
  lg: 1024, // Tablets (landscape) / Small desktops
  xl: 1280, // Large desktops
} as const

/**
 * Theme configuration for Unistyles
 * Maps domain themes to Unistyles theme system
 */
const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const

/**
 * TypeScript declarations for type-safe theme usage
 * Extends Unistyles types with our theme structure
 */
type AppBreakpoints = typeof breakpoints
type AppThemes = typeof themes

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
}

/**
 * Initialize Unistyles with themes and breakpoints
 * This must be called before any component uses the theme
 */
StyleSheet.configure({
  themes,
  breakpoints,
  settings: {
    // adaptiveThemes: true,
    initialTheme: "light"
  },
})

/**
 * Export for app initialization
 */
export { breakpoints, themes }

/**
 * Grid Layout Hook
 * Provides reactive access to current grid layout configuration
 * based on user preferences
 *
 * IMPORTANT: Components using this hook must be wrapped with `observer()`
 * from '@legendapp/state/react' to make it reactive.
 *
 * @returns Current grid layout configuration
 *
 * @example
 * ```tsx
 * import { observer } from '@legendapp/state/react'
 *
 * export const MyComponent = observer(() => {
 *   const gridLayout = useGridLayout()
 *   console.log(gridLayout.columns) // 3 (for comfortable mode)
 * })
 * ```
 */
export const useGridLayout = (): GridLayoutConfig => {
  // Get current grid mode from user preferences
  // This is reactive when used within observer() wrapped components
  const gridMode: GridViewMode = userPreferences$.ui.gridViewMode.get()

  // Access the current theme from UnistylesRuntime
  const currentTheme = UnistylesRuntime.themeName === 'dark' ? darkTheme : lightTheme
  return currentTheme.gridLayout[gridMode]
}


