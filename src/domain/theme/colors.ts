/**
 * Color Palette - Apple TV+ Inspired Monotone Design
 * Pure color definitions following Apple's Human Interface Guidelines
 * Framework-agnostic color system following CLEAN architecture
 *
 * Design Philosophy:
 * - Monotone grayscale aesthetic with Apple System Blue as the only color accent
 * - High contrast for readability on large screens
 * - OLED-optimized dark theme with pure blacks
 * - Theme-flipping button colors (white in dark, dark in light)
 * - Theme-independent image overlays (always white text on dark gradients)
 * - Consistent with iOS/tvOS design language
 */

export type ColorPalette = {
  // Primary - Apple System Blue (only color accent)
  primary: string;
  primaryDark: string;
  primaryLight: string;

  // Secondary - Subtle gray for compatibility
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;

  // Backgrounds - Pure monotone grayscale
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;

  // Surface colors
  surface: string;
  surfaceElevated: string;

  // Text - High contrast grayscale
  text: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;

  // Button-specific tokens (flip between themes)
  buttonPrimary: string;
  buttonPrimaryText: string;
  buttonSecondary: string;
  buttonSecondaryText: string;
  buttonGhost: string;
  buttonGhostText: string;

  // Image overlay tokens (theme-independent)
  imageOverlay: string; // Dark overlay for images
  imageGradient: string; // Gradient overlay (dark to transparent)
  imageText: string; // Always white regardless of theme

  // Progress/Continue Watching
  progressBackground: string;
  progressForeground: string;
  progressText: string;

  // Border colors
  border: string;
  borderLight: string;
  borderFocus: string;

  // Status colors - Muted, not vibrant
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

  // Special colors - Keep for compatibility
  accent: string;
  highlight: string;
};

/**
 * Light theme color palette
 * Clean minimal design with dark buttons and light backgrounds
 * High contrast for readability in bright environments
 */
export const lightColors: ColorPalette = {
  // Primary - Apple System Blue
  primary: '#007AFF', // iOS light mode blue
  primaryDark: '#0051D5',
  primaryLight: '#409CFF',

  // Secondary - Subtle gray (not colorful)
  secondary: '#8E8E93', // iOS secondary gray
  secondaryDark: '#636366',
  secondaryLight: '#AEAEB2',

  // Backgrounds - Soft whites and light grays
  background: '#FFFFFF', // Pure white
  backgroundSecondary: '#F2F2F7', // Apple's secondary background
  backgroundTertiary: '#FFFFFF', // White for cards

  // Surface
  surface: '#FFFFFF',
  surfaceElevated: '#F2F2F7',

  // Text - High contrast darks and grays
  text: '#000000', // Pure black
  textSecondary: '#3C3C43', // iOS label secondary (60% opacity black)
  textTertiary: '#8E8E93', // iOS label tertiary (30% opacity black)
  textDisabled: '#C7C7CC', // iOS separator

  // Buttons - DARK buttons in light theme
  buttonPrimary: '#1C1C1E', // Dark gray/black button
  buttonPrimaryText: '#FFFFFF', // White text on dark
  buttonSecondary: 'rgba(0, 0, 0, 0.06)', // Translucent dark
  buttonSecondaryText: '#000000',
  buttonGhost: 'transparent',
  buttonGhostText: '#000000',

  // Image overlays - Always dark gradient with white text
  imageOverlay: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  imageGradient: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
  imageText: '#FFFFFF', // Always white on images

  // Progress bars
  progressBackground: 'rgba(0, 0, 0, 0.1)', // Subtle dark
  progressForeground: '#000000', // Dark progress
  progressText: '#FFFFFF', // White text on progress

  // Borders
  border: '#C6C6C8', // iOS separator opaque
  borderLight: '#E5E5EA',
  borderFocus: '#007AFF',

  // Status - Muted, not vibrant
  error: '#FF3B30', // iOS red
  errorLight: 'rgba(255, 59, 48, 0.1)',
  success: '#34C759', // iOS green
  successLight: 'rgba(52, 199, 89, 0.1)',
  warning: '#FF9500', // iOS orange
  warningLight: 'rgba(255, 149, 0, 0.1)',
  info: '#007AFF',
  infoLight: 'rgba(0, 122, 255, 0.1)',

  // Interactive states
  overlay: 'rgba(0, 0, 0, 0.5)',
  disabled: '#E5E5EA',

  // Special colors
  accent: '#007AFF',
  highlight: 'rgba(0, 122, 255, 0.1)',
};

/**
 * Dark theme color palette
 * Apple TV+ aesthetic - OLED-friendly with cinematic contrast
 * Pure blacks with white buttons for premium feel
 */
export const darkColors: ColorPalette = {
  // Primary - Apple System Blue
  primary: '#0A84FF', // iOS dark mode blue
  primaryDark: '#0066CC',
  primaryLight: '#409CFF',

  // Secondary - Subtle gray (not colorful)
  secondary: '#8E8E93', // iOS secondary gray
  secondaryDark: '#636366',
  secondaryLight: '#AEAEB2',

  // Backgrounds - Pure blacks and soft grays for OLED
  background: '#000000', // Pure black for OLED
  backgroundSecondary: '#1C1C1E', // Apple's secondary background
  backgroundTertiary: '#2C2C2E', // Apple's tertiary background

  // Surface
  surface: '#1C1C1E',
  surfaceElevated: '#2C2C2E',

  // Text - High contrast whites and grays
  text: '#FFFFFF', // Pure white
  textSecondary: '#EBEBF5', // iOS label secondary (60% opacity white)
  textTertiary: '#48484A', // iOS label tertiary (30% opacity white)
  textDisabled: '#3A3A3C', // iOS separator

  // Buttons - WHITE buttons in dark theme (premium feel)
  buttonPrimary: '#FFFFFF', // White button
  buttonPrimaryText: '#000000', // Black text on white
  buttonSecondary: 'rgba(255, 255, 255, 0.15)', // Translucent white
  buttonSecondaryText: '#FFFFFF',
  buttonGhost: 'transparent',
  buttonGhostText: '#FFFFFF',

  // Image overlays - Always dark gradient with white text
  imageOverlay: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  imageGradient: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
  imageText: '#FFFFFF', // Always white on images

  // Progress bars
  progressBackground: 'rgba(255, 255, 255, 0.2)', // Subtle white
  progressForeground: '#FFFFFF', // Bright white
  progressText: '#FFFFFF',

  // Borders
  border: '#38383A', // iOS separator opaque
  borderLight: '#2C2C2E',
  borderFocus: '#0A84FF',

  // Status - Muted, not vibrant
  error: '#FF453A', // iOS red
  errorLight: 'rgba(255, 69, 58, 0.2)',
  success: '#32D74B', // iOS green
  successLight: 'rgba(50, 215, 75, 0.2)',
  warning: '#FF9F0A', // iOS orange
  warningLight: 'rgba(255, 159, 10, 0.2)',
  info: '#0A84FF',
  infoLight: 'rgba(10, 132, 255, 0.2)',

  // Interactive states
  overlay: 'rgba(0, 0, 0, 0.85)',
  disabled: '#3A3A3C',

  // Special colors
  accent: '#0A84FF',
  highlight: 'rgba(10, 132, 255, 0.2)',
};
