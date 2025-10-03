/**
 * Typography System - Pure typography definitions
 * Framework-agnostic type scale following CLEAN architecture
 */

/**
 * Font family definitions
 * These are logical names that map to actual fonts in the presentation layer
 */
export type FontFamily = {
  primary: string; // Main UI font
  heading: string; // Display/heading font
  mono: string; // Monospace for code
};

export const fontFamily: FontFamily = {
  primary: 'Inter', // Clean, modern sans-serif for body text
  heading: 'Poppins', // Stronger personality for headings
  mono: 'monospace', // System monospace fallback
};

/**
 * Font weights
 */
export type FontWeight = {
  light: '300';
  regular: '400';
  medium: '500';
  semibold: '600';
  bold: '700';
  extrabold: '800';
};

export const fontWeight: FontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

/**
 * Font size scale
 * Based on modular scale (1.25 ratio)
 */
export type FontSize = {
  xs: number; // 12px
  sm: number; // 14px
  base: number; // 16px
  lg: number; // 18px
  xl: number; // 20px
  '2xl': number; // 24px
  '3xl': number; // 30px
  '4xl': number; // 36px
  '5xl': number; // 48px
};

export const fontSize: FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
};

/**
 * Line height scale
 * Relative values for better readability
 */
export type LineHeight = {
  tight: number; // 1.2
  normal: number; // 1.5
  relaxed: number; // 1.75
  loose: number; // 2
};

export const lineHeight: LineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
};

/**
 * Letter spacing (tracking)
 * In pixels for precise control
 */
export type LetterSpacing = {
  tighter: number; // -0.05
  tight: number; // -0.025
  normal: number; // 0
  wide: number; // 0.025
  wider: number; // 0.05
  widest: number; // 0.1
};

export const letterSpacing: LetterSpacing = {
  tighter: -0.05,
  tight: -0.025,
  normal: 0,
  wide: 0.025,
  wider: 0.05,
  widest: 0.1,
};

/**
 * Typography variants - Semantic text styles
 * These combine font properties into reusable text styles
 */
export type TypographyVariant = {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  letterSpacing: number;
};

export type TypographyVariants = {
  // Headings
  h1: TypographyVariant;
  h2: TypographyVariant;
  h3: TypographyVariant;
  h4: TypographyVariant;

  // Body text
  body: TypographyVariant;
  bodyLarge: TypographyVariant;
  bodySmall: TypographyVariant;

  // UI elements
  button: TypographyVariant;
  caption: TypographyVariant;
  label: TypographyVariant;
  overline: TypographyVariant;
};

export const typography: TypographyVariants = {
  // Headings - Using heading font with tight line height
  h1: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize['5xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Body text - Using primary font with comfortable line height
  body: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  bodyLarge: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  // UI elements - Optimized for specific use cases
  button: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.wide,
  },
  caption: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  label: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
  overline: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.widest,
  },
};