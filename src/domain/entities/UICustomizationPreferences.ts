/**
 * UI Customization Preferences
 * Comprehensive user interface customization options
 */

export interface UICustomizationPreferences {
  // Theme & Colors
  readonly theme: 'light' | 'dark' | 'system'
  readonly colorScheme: 'default' | 'purple' | 'blue' | 'green' | 'orange'

  // Layout & Spacing
  readonly layoutDensity: 'compact' | 'comfortable' | 'spacious'
  readonly gridViewMode: 'compact' | 'comfortable' | 'cozy'

  // Typography
  readonly fontSize: 'small' | 'medium' | 'large' | 'xlarge'
  readonly fontFamily: 'system' | 'inter' | 'roboto'

  // Visual Effects
  readonly animationsEnabled: boolean
  readonly borderRadius: 'none' | 'small' | 'medium' | 'large'
  readonly cardStyle: 'flat' | 'elevated' | 'outlined'

  // Locale & Language
  readonly locale: string
  readonly contentLanguage: string

  // Content
  readonly autoplayTrailers: boolean
  readonly showAdultContent: boolean
}

export const createDefaultUICustomizationPreferences = (): UICustomizationPreferences => ({
  // Theme & Colors
  theme: 'system',
  colorScheme: 'default',

  // Layout & Spacing
  layoutDensity: 'comfortable',
  gridViewMode: 'comfortable',

  // Typography
  fontSize: 'medium',
  fontFamily: 'system',

  // Visual Effects
  animationsEnabled: true,
  borderRadius: 'medium',
  cardStyle: 'elevated',

  // Locale & Language
  locale: 'en',
  contentLanguage: 'en-US',

  // Content
  autoplayTrailers: true,
  showAdultContent: false,
})

/**
 * Maps layoutDensity to spacing multipliers
 */
export const getSpacingMultiplier = (density: UICustomizationPreferences['layoutDensity']): number => {
  switch (density) {
    case 'compact':
      return 0.75
    case 'comfortable':
      return 1.0
    case 'spacious':
      return 1.25
    default:
      return 1.0
  }
}

/**
 * Maps fontSize to scale multipliers
 */
export const getFontSizeMultiplier = (size: UICustomizationPreferences['fontSize']): number => {
  switch (size) {
    case 'small':
      return 0.875
    case 'medium':
      return 1.0
    case 'large':
      return 1.125
    case 'xlarge':
      return 1.25
    default:
      return 1.0
  }
}

/**
 * Maps borderRadius to pixel values
 */
export const getBorderRadiusValue = (radius: UICustomizationPreferences['borderRadius']): number => {
  switch (radius) {
    case 'none':
      return 0
    case 'small':
      return 4
    case 'medium':
      return 8
    case 'large':
      return 16
    default:
      return 8
  }
}
