import { useCallback } from 'react'
import { useAppState } from '@/src/presentation/shared/hooks/useAppState'
import type { UICustomizationPreferences } from '@/src/domain/entities/UICustomizationPreferences'

export const useUICustomization = () => {
  const { userPreferences$ } = useAppState()

  // Get current UI customization preferences
  const getUICustomization = useCallback((): UICustomizationPreferences => {
    return userPreferences$.uiCustomization.get()
  }, [userPreferences$])

  // Theme & Colors
  const setColorScheme = useCallback(
    (colorScheme: UICustomizationPreferences['colorScheme']) => {
      userPreferences$.uiCustomization.colorScheme.set(colorScheme)
    },
    [userPreferences$]
  )

  // Layout & Spacing
  const setLayoutDensity = useCallback(
    (density: UICustomizationPreferences['layoutDensity']) => {
      userPreferences$.uiCustomization.layoutDensity.set(density)
    },
    [userPreferences$]
  )

  // Typography
  const setFontSize = useCallback(
    (size: UICustomizationPreferences['fontSize']) => {
      userPreferences$.uiCustomization.fontSize.set(size)
    },
    [userPreferences$]
  )

  const setFontFamily = useCallback(
    (family: UICustomizationPreferences['fontFamily']) => {
      userPreferences$.uiCustomization.fontFamily.set(family)
    },
    [userPreferences$]
  )

  // Visual Effects
  const setAnimationsEnabled = useCallback(
    (enabled: boolean) => {
      userPreferences$.uiCustomization.animationsEnabled.set(enabled)
    },
    [userPreferences$]
  )

  const setBorderRadius = useCallback(
    (radius: UICustomizationPreferences['borderRadius']) => {
      userPreferences$.uiCustomization.borderRadius.set(radius)
    },
    [userPreferences$]
  )

  const setCardStyle = useCallback(
    (style: UICustomizationPreferences['cardStyle']) => {
      userPreferences$.uiCustomization.cardStyle.set(style)
    },
    [userPreferences$]
  )

  return {
    getUICustomization,
    setColorScheme,
    setLayoutDensity,
    setFontSize,
    setFontFamily,
    setAnimationsEnabled,
    setBorderRadius,
    setCardStyle,
  }
}
