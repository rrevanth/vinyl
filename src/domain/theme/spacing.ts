/**
 * Spacing Scale - Consistent spacing system
 * Framework-agnostic spacing definitions following 8-point grid system
 */

export type SpacingScale = {
  // Micro spacing (1-4px)
  none: number;
  micro: number;

  // Standard spacing scale (8-point grid)
  xs: number; // 8px
  sm: number; // 12px
  md: number; // 16px
  lg: number; // 24px
  xl: number; // 32px
  '2xl': number; // 48px
  '3xl': number; // 64px
  '4xl': number; // 96px

  // Special spacing
  gutter: number; // Page margins
  containerPadding: number; // Container padding
  cardPadding: number; // Card internal padding
  inputHeight: number; // Standard input height
  touchTarget: number; // Minimum touch target (44px iOS, 48px Android)
  
  // Content-specific spacing
  rowSpacing: number; // Space between horizontal content rows
  sectionSpacing: number; // Space between major sections
  heroBottomPadding: number; // Space below hero sections
};

/**
 * Spacing values based on 8-point grid system
 * Ensures visual consistency and alignment across the app
 */
export const spacing: SpacingScale = {
  // Micro spacing
  none: 0,
  micro: 4,

  // Standard scale
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,

  // Special spacing for common use cases
  gutter: 20, // Increased page margins
  containerPadding: 20, // Container padding
  cardPadding: 16, // Card internal padding
  inputHeight: 48, // Standard input height
  touchTarget: 44, // Minimum touch target size (iOS guideline)
  
  // Content-specific spacing
  rowSpacing: 24, // Space between horizontal content rows
  sectionSpacing: 32, // Space between major sections
  heroBottomPadding: 24, // Space below hero sections
};

/**
 * Border radius scale
 */
export type BorderRadiusScale = {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  full: number;
};

export const borderRadius: BorderRadiusScale = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

/**
 * Elevation/Shadow scale
 * Values represent elevation levels, actual shadow implementation is framework-specific
 */
export type ElevationScale = {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export const elevation: ElevationScale = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 16,
};

/**
 * Shadow configurations for different UI elements
 * Provides consistent depth and elevation across the app
 */
export type ShadowConfig = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

export type ShadowScale = {
  card: ShadowConfig;
  cardHover: ShadowConfig;
  hero: ShadowConfig;
};

export const shadows: ShadowScale = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHover: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  hero: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 16,
  },
};