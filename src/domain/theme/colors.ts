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
 * OLED-friendly with high contrast
 */
export const darkColors: ColorPalette = {
  // Primary - Brighter for dark backgrounds
  primary: '#8B5CF6', // violet-500
  primaryDark: '#6D28D9', // violet-700
  primaryLight: '#A78BFA', // violet-400

  // Secondary - Vibrant accent
  secondary: '#F87171', // red-400
  secondaryDark: '#DC2626', // red-600
  secondaryLight: '#FCA5A5', // red-300

  // Background - True black to dark gray
  background: '#000000',
  backgroundSecondary: '#0F0F0F',
  backgroundTertiary: '#1A1A1A',

  // Surface - Elevated elements
  surface: '#1A1A1A',
  surfaceElevated: '#262626',

  // Text - High contrast for dark mode
  text: '#F9FAFB', // gray-50
  textSecondary: '#D1D5DB', // gray-300
  textTertiary: '#6B7280', // gray-500
  textDisabled: '#4B5563', // gray-600

  // Borders - Visible but not harsh
  border: '#262626',
  borderLight: '#1A1A1A',
  borderFocus: '#8B5CF6',

  // Status colors - Adjusted for dark backgrounds
  error: '#F87171', // red-400
  errorLight: '#7F1D1D', // red-900
  success: '#4ADE80', // green-400
  successLight: '#14532D', // green-900
  warning: '#FB923C', // orange-400
  warningLight: '#7C2D12', // orange-900
  info: '#60A5FA', // blue-400
  infoLight: '#1E3A8A', // blue-900

  // Interactive states
  overlay: 'rgba(0, 0, 0, 0.7)',
  disabled: '#1A1A1A',

  // Special colors
  accent: '#F472B6', // pink-400
  highlight: '#78350F', // amber-900
};