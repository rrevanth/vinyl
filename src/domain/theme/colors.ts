/**
 * Color Palette - Pure color definitions
 * Framework-agnostic color system following CLEAN architecture
 */

export type ColorPalette = {
  // Primary colors
  primary: string;
  primaryDark: string;
  primaryLight: string;

  // Secondary colors
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;

  // Background colors
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;

  // Surface colors
  surface: string;
  surfaceElevated: string;

  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;

  // Border colors
  border: string;
  borderLight: string;
  borderFocus: string;

  // Status colors
  error: string;
  errorLight: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  info: string;
  infoLight: string;

  // Interactive states
  overlay: string;
  disabled: string;

  // Special colors
  accent: string;
  highlight: string;
};

/**
 * Light theme color palette
 * Modern, accessible colors optimized for mobile apps
 */
export const lightColors: ColorPalette = {
  // Primary - Deep indigo/purple for music/vinyl aesthetic
  primary: '#5B21B6', // violet-800
  primaryDark: '#4C1D95', // violet-900
  primaryLight: '#7C3AED', // violet-600

  // Secondary - Warm accent
  secondary: '#DC2626', // red-600
  secondaryDark: '#B91C1C', // red-700
  secondaryLight: '#EF4444', // red-500

  // Background - Clean white to light gray
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB', // gray-50
  backgroundTertiary: '#F3F4F6', // gray-100

  // Surface - Elevated elements
  surface: '#FFFFFF',
  surfaceElevated: '#F9FAFB',

  // Text - High contrast for accessibility
  text: '#111827', // gray-900
  textSecondary: '#4B5563', // gray-600
  textTertiary: '#9CA3AF', // gray-400
  textDisabled: '#D1D5DB', // gray-300

  // Borders - Subtle to strong
  border: '#E5E7EB', // gray-200
  borderLight: '#F3F4F6', // gray-100
  borderFocus: '#5B21B6',

  // Status colors - Standard semantic colors
  error: '#DC2626', // red-600
  errorLight: '#FEE2E2', // red-100
  success: '#16A34A', // green-600
  successLight: '#DCFCE7', // green-100
  warning: '#EA580C', // orange-600
  warningLight: '#FFEDD5', // orange-100
  info: '#2563EB', // blue-600
  infoLight: '#DBEAFE', // blue-100

  // Interactive states
  overlay: 'rgba(0, 0, 0, 0.5)',
  disabled: '#F3F4F6',

  // Special colors
  accent: '#EC4899', // pink-500
  highlight: '#FEF3C7', // amber-100
};

/**
 * Dark theme color palette
 * Modern streaming aesthetic - OLED-friendly with cinematic contrast
 */
export const darkColors: ColorPalette = {
  // Primary - Rich purple/violet (cinematic accent)
  primary: '#9333EA', // Vibrant purple
  primaryDark: '#7C3AED', // Darker purple
  primaryLight: '#A855F7', // Lighter purple

  // Secondary - Warm accent
  secondary: '#F59E0B', // Amber/gold accent
  secondaryDark: '#D97706',
  secondaryLight: '#FBBF24',

  // Background - True blacks for OLED
  background: '#000000', // Pure black for OLED
  backgroundSecondary: '#0A0A0A', // Slightly elevated
  backgroundTertiary: '#141414', // Card backgrounds

  // Surface - Elevated elements
  surface: '#1A1A1A', // Cards, modals
  surfaceElevated: '#232323', // Elevated cards

  // Text - High contrast for readability
  text: '#FFFFFF', // Pure white
  textSecondary: '#A1A1A1', // Gray-400
  textTertiary: '#737373', // Gray-500
  textDisabled: '#525252', // Gray-600

  // Borders - Subtle but visible
  border: '#292929', // Subtle borders
  borderLight: '#1F1F1F', // Even more subtle
  borderFocus: '#9333EA', // Primary color

  // Status colors
  error: '#EF4444',
  errorLight: '#7F1D1D',
  success: '#10B981',
  successLight: '#064E3B',
  warning: '#F59E0B',
  warningLight: '#78350F',
  info: '#3B82F6',
  infoLight: '#1E3A8A',

  // Interactive states
  overlay: 'rgba(0, 0, 0, 0.85)', // Darker overlay
  disabled: '#1A1A1A',

  // Special colors
  accent: '#EC4899', // Pink accent
  highlight: '#FBBF24', // Amber highlight
};