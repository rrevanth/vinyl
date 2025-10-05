/**
 * Theme - Main theme composition
 * Framework-agnostic theme system following CLEAN architecture
 *
 * This module combines all theme primitives (colors, spacing, typography)
 * into cohesive light and dark themes.
 */

import { lightColors, darkColors, type ColorPalette } from './colors';
import {
  spacing,
  borderRadius,
  elevation,
  type SpacingScale,
  type BorderRadiusScale,
  type ElevationScale
} from './spacing';
import {
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  typography,
  type FontFamily,
  type FontWeight,
  type FontSize,
  type LineHeight,
  type LetterSpacing,
  type TypographyVariants,
} from './typography';
import {
  gridLayout,
  type GridViewMode,
  type GridLayoutConfig,
  type GridLayoutScale,
} from './grid';

/**
 * Complete theme structure
 */
export type Theme = {
  colors: ColorPalette;
  spacing: SpacingScale;
  borderRadius: BorderRadiusScale;
  elevation: ElevationScale;
  fontFamily: FontFamily;
  fontWeight: FontWeight;
  fontSize: FontSize;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  typography: TypographyVariants;
  gridLayout: GridLayoutScale;
};

/**
 * Light theme configuration
 * Optimized for bright environments and accessibility
 */
export const lightTheme: Theme = {
  colors: lightColors,
  spacing,
  borderRadius,
  elevation,
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  typography,
  gridLayout,
};

/**
 * Dark theme configuration
 * OLED-friendly with high contrast for low-light environments
 */
export const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  borderRadius,
  elevation,
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  typography,
  gridLayout,
};

/**
 * Export individual theme parts for flexibility
 */
export {
  // Colors
  lightColors,
  darkColors,
  type ColorPalette,

  // Spacing
  spacing,
  borderRadius,
  elevation,
  type SpacingScale,
  type BorderRadiusScale,
  type ElevationScale,

  // Typography
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  typography,
  type FontFamily,
  type FontWeight,
  type FontSize,
  type LineHeight,
  type LetterSpacing,
  type TypographyVariants,

  // Grid Layout
  gridLayout,
  type GridViewMode,
  type GridLayoutConfig,
  type GridLayoutScale,
};

/**
 * Default export - light theme
 */
export default lightTheme;