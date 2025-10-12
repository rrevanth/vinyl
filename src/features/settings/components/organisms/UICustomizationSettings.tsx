import { ScrollView, View, Text } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { SettingsSection } from '../atoms/SettingsSection'
import { SegmentedControl } from '@/src/presentation/shared/ui/atoms/SegmentedControl'
import { ColorPicker } from '@/src/presentation/shared/ui/atoms/ColorPicker'
import { RadioGroup } from '@/src/presentation/shared/ui/atoms/RadioGroup'
import { ToggleSwitch } from '@/src/presentation/shared/ui/atoms/ToggleSwitch'
import { useUICustomization } from '../../hooks/useUICustomization'
import { useSettings } from '../../hooks/useSettings'
import { t } from '@/src/presentation/shared/i18n'
import type { UICustomizationPreferences } from '@/src/domain/entities/UICustomizationPreferences'

export const UICustomizationSettings = observer(() => {
  const {
    getUICustomization,
    setColorScheme,
    setLayoutDensity,
    setFontSize,
    setFontFamily,
    setAnimationsEnabled,
    setBorderRadius,
    setCardStyle,
  } = useUICustomization()

  const { getCurrentTheme, setThemeMode } = useSettings()

  const uiCustomization = getUICustomization()
  const currentTheme = getCurrentTheme()

  // Theme Options
  const THEME_OPTIONS = [
    { value: 'light', label: t('settings.ui_customization.theme_light') },
    { value: 'dark', label: t('settings.ui_customization.theme_dark') },
    { value: 'system', label: t('settings.ui_customization.theme_system') },
  ] as const

  // Color Scheme Options
  const COLOR_SCHEME_OPTIONS = [
    {
      value: 'default',
      label: t('settings.ui_customization.color_default'),
      primaryColor: '#5B21B6',
    },
    {
      value: 'purple',
      label: t('settings.ui_customization.color_purple'),
      primaryColor: '#9333EA',
    },
    {
      value: 'blue',
      label: t('settings.ui_customization.color_blue'),
      primaryColor: '#2563EB',
    },
    {
      value: 'green',
      label: t('settings.ui_customization.color_green'),
      primaryColor: '#059669',
    },
    {
      value: 'orange',
      label: t('settings.ui_customization.color_orange'),
      primaryColor: '#EA580C',
    },
  ] as const

  // Layout Density Options
  const LAYOUT_DENSITY_OPTIONS = [
    {
      value: 'compact',
      label: t('settings.ui_customization.density_compact'),
      description: t('settings.ui_customization.density_compact_desc'),
    },
    {
      value: 'comfortable',
      label: t('settings.ui_customization.density_comfortable'),
      description: t('settings.ui_customization.density_comfortable_desc'),
    },
    {
      value: 'spacious',
      label: t('settings.ui_customization.density_spacious'),
      description: t('settings.ui_customization.density_spacious_desc'),
    },
  ] as const

  // Font Size Options
  const FONT_SIZE_OPTIONS = [
    { value: 'small', label: t('settings.ui_customization.font_small') },
    { value: 'medium', label: t('settings.ui_customization.font_medium') },
    { value: 'large', label: t('settings.ui_customization.font_large') },
    { value: 'xlarge', label: t('settings.ui_customization.font_xlarge') },
  ] as const

  // Font Family Options
  const FONT_FAMILY_OPTIONS = [
    {
      value: 'system',
      label: t('settings.ui_customization.font_system'),
      description: t('settings.ui_customization.font_system_desc'),
    },
    {
      value: 'inter',
      label: t('settings.ui_customization.font_inter'),
      description: t('settings.ui_customization.font_inter_desc'),
    },
    {
      value: 'roboto',
      label: t('settings.ui_customization.font_roboto'),
      description: t('settings.ui_customization.font_roboto_desc'),
    },
  ] as const

  // Border Radius Options
  const BORDER_RADIUS_OPTIONS = [
    {
      value: 'none',
      label: t('settings.ui_customization.radius_none'),
      description: t('settings.ui_customization.radius_none_desc'),
    },
    {
      value: 'small',
      label: t('settings.ui_customization.radius_small'),
      description: t('settings.ui_customization.radius_small_desc'),
    },
    {
      value: 'medium',
      label: t('settings.ui_customization.radius_medium'),
      description: t('settings.ui_customization.radius_medium_desc'),
    },
    {
      value: 'large',
      label: t('settings.ui_customization.radius_large'),
      description: t('settings.ui_customization.radius_large_desc'),
    },
  ] as const

  // Card Style Options
  const CARD_STYLE_OPTIONS = [
    {
      value: 'flat',
      label: t('settings.ui_customization.card_flat'),
      description: t('settings.ui_customization.card_flat_desc'),
    },
    {
      value: 'elevated',
      label: t('settings.ui_customization.card_elevated'),
      description: t('settings.ui_customization.card_elevated_desc'),
    },
    {
      value: 'outlined',
      label: t('settings.ui_customization.card_outlined'),
      description: t('settings.ui_customization.card_outlined_desc'),
    },
  ] as const

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Preview Section */}
      <SettingsSection
        title={t('settings.ui_customization.preview_title')}
        footer={t('settings.ui_customization.preview_desc')}
      >
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>
            {t('settings.ui_customization.preview_sample_title')}
          </Text>
          <Text style={styles.previewBody}>
            {t('settings.ui_customization.preview_sample_body')}
          </Text>
        </View>
      </SettingsSection>

      {/* Theme & Colors Section */}
      <SettingsSection
        title={t('settings.ui_customization.theme_colors_title')}
        footer={t('settings.ui_customization.theme_colors_desc')}
      >
        <View style={styles.sectionContent}>
          <Text style={styles.sectionLabel}>
            {t('settings.ui_customization.theme_label')}
          </Text>
          <SegmentedControl
            options={THEME_OPTIONS}
            value={currentTheme}
            onChange={(value) => setThemeMode(value as 'light' | 'dark' | 'system')}
            accessibilityLabel={t('settings.ui_customization.theme_accessibility')}
          />
        </View>

        <View style={styles.sectionContent}>
          <Text style={styles.sectionLabel}>
            {t('settings.ui_customization.color_scheme_label')}
          </Text>
          <ColorPicker
            options={COLOR_SCHEME_OPTIONS}
            value={uiCustomization.colorScheme}
            onChange={(value) => setColorScheme(value as UICustomizationPreferences['colorScheme'])}
            accessibilityLabel={t('settings.ui_customization.color_scheme_accessibility')}
          />
        </View>
      </SettingsSection>

      {/* Layout & Spacing Section */}
      <SettingsSection
        title={t('settings.ui_customization.layout_spacing_title')}
        footer={t('settings.ui_customization.layout_spacing_desc')}
      >
        <View style={styles.sectionContent}>
          <Text style={styles.sectionLabel}>
            {t('settings.ui_customization.layout_density_label')}
          </Text>
          <RadioGroup
            options={LAYOUT_DENSITY_OPTIONS}
            value={uiCustomization.layoutDensity}
            onChange={(value) => setLayoutDensity(value as UICustomizationPreferences['layoutDensity'])}
            accessibilityLabel={t('settings.ui_customization.layout_density_accessibility')}
          />
        </View>
      </SettingsSection>

      {/* Typography Section */}
      <SettingsSection
        title={t('settings.ui_customization.typography_title')}
        footer={t('settings.ui_customization.typography_desc')}
      >
        <View style={styles.sectionContent}>
          <Text style={styles.sectionLabel}>
            {t('settings.ui_customization.font_size_label')}
          </Text>
          <SegmentedControl
            options={FONT_SIZE_OPTIONS}
            value={uiCustomization.fontSize}
            onChange={(value) => setFontSize(value as UICustomizationPreferences['fontSize'])}
            accessibilityLabel={t('settings.ui_customization.font_size_accessibility')}
          />
        </View>

        <View style={styles.sectionContent}>
          <Text style={styles.sectionLabel}>
            {t('settings.ui_customization.font_family_label')}
          </Text>
          <RadioGroup
            options={FONT_FAMILY_OPTIONS}
            value={uiCustomization.fontFamily}
            onChange={(value) => setFontFamily(value as UICustomizationPreferences['fontFamily'])}
            accessibilityLabel={t('settings.ui_customization.font_family_accessibility')}
          />
        </View>
      </SettingsSection>

      {/* Visual Effects Section */}
      <SettingsSection
        title={t('settings.ui_customization.visual_effects_title')}
        footer={t('settings.ui_customization.visual_effects_desc')}
      >
        <View style={styles.sectionContent}>
          <ToggleSwitch
            value={uiCustomization.animationsEnabled}
            onValueChange={setAnimationsEnabled}
            label={t('settings.ui_customization.animations_label')}
            description={t('settings.ui_customization.animations_desc')}
            accessibilityLabel={t('settings.ui_customization.animations_accessibility')}
          />
        </View>

        <View style={styles.sectionContent}>
          <Text style={styles.sectionLabel}>
            {t('settings.ui_customization.border_radius_label')}
          </Text>
          <RadioGroup
            options={BORDER_RADIUS_OPTIONS}
            value={uiCustomization.borderRadius}
            onChange={(value) => setBorderRadius(value as UICustomizationPreferences['borderRadius'])}
            accessibilityLabel={t('settings.ui_customization.border_radius_accessibility')}
          />
        </View>
      </SettingsSection>

      {/* Card & Component Styles Section */}
      <SettingsSection
        title={t('settings.ui_customization.card_styles_title')}
        footer={t('settings.ui_customization.card_styles_desc')}
      >
        <View style={styles.sectionContent}>
          <Text style={styles.sectionLabel}>
            {t('settings.ui_customization.card_style_label')}
          </Text>
          <RadioGroup
            options={CARD_STYLE_OPTIONS}
            value={uiCustomization.cardStyle}
            onChange={(value) => setCardStyle(value as UICustomizationPreferences['cardStyle'])}
            accessibilityLabel={t('settings.ui_customization.card_style_accessibility')}
          />
        </View>
      </SettingsSection>
    </ScrollView>
  )
})

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  previewCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  previewBody: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  sectionContent: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
}))

export type {}
