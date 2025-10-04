/**
 * Unistyles Configuration
 * Presentation layer theme integration
 *
 * This module configures react-native-unistyles to consume the domain theme,
 * providing type-safe styling throughout the application with responsive breakpoints.
 *
 * Architecture: Presentation Layer (consumes Domain Theme)
 */

import { StyleSheet } from 'react-native-unistyles'
import { lightTheme, darkTheme } from '../../domain/theme'

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
    initialTheme: 'light',
  },
})

/**
 * Export for app initialization
 */
export { themes, breakpoints }
