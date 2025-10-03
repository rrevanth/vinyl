# VNYL Atomic Design System

## Overview

This document outlines the atomic design system implemented for the VNYL React Native app. The design system follows Brad Frost's Atomic Design methodology, organizing components into atoms, molecules, and organisms.

## Architecture

```
src/presentation/shared/ui/
├── atoms/           # Basic building blocks
├── molecules/       # Simple groups of atoms
├── organisms/       # Complex UI components
└── index.ts        # Main exports
```

## Theme System

### Theme Factory Pattern

The theme system uses a factory pattern that supports both light and dark modes with comprehensive design tokens.

```typescript
import { useTheme, createTheme } from '@/src/presentation/shared/ui'

const { theme, isDark, setMode } = useTheme()
```

### Design Tokens

- **Colors**: Background, text, interactive, borders with semantic meaning
- **Spacing**: Consistent scale using `react-native-size-matters` for responsive design
- **Typography**: Hierarchical type scale with proper line heights and font weights
- **Border Radius**: Consistent corner radius values
- **Shadows**: Platform-appropriate elevation system
- **Hit Slop**: Accessibility-friendly touch targets

## Atoms

### Button

Versatile button component with multiple variants, sizes, and states.

```typescript
import { Button } from '@/src/presentation/shared/ui'

<Button
  title="Save Settings"
  variant="primary"    // primary, secondary, outline, danger, ghost
  size="md"           // sm, md, lg
  onPress={handleSave}
  loading={isLoading}
  disabled={!isValid}
  fullWidth
/>
```

**Features:**
- 5 visual variants with proper theming
- 3 size options with consistent spacing
- Loading state with activity indicator
- Accessibility support with proper roles and labels
- Icon support (left/right positioning)
- Proper press feedback with haptics

### Switch

Native switch component with proper theming and accessibility.

```typescript
import { Switch } from '@/src/presentation/shared/ui'

<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
  size="md"
  disabled={false}
  accessibilityLabel="Enable notifications"
/>
```

**Features:**
- Automatic theme color application
- Size variants with proper scaling
- Accessibility state management
- Disabled state handling

### Input

Comprehensive text input with validation states and proper accessibility.

```typescript
import { Input } from '@/src/presentation/shared/ui'

<Input
  variant="filled"      // default, filled, outlined
  size="md"            // sm, md, lg
  value={email}
  onChangeText={setEmail}
  placeholder="Enter email"
  error={emailError}
  leftIcon={<EmailIcon />}
  clearable
  keyboardType="email-address"
/>
```

**Features:**
- Multiple visual variants
- Validation state management (error, success, focused)
- Icon support (left/right)
- Clearable functionality
- Helper text and error messaging
- Proper keyboard types and input modes

### Typography (Text & Heading)

Semantic typography components with consistent styling.

```typescript
import { Text, Heading } from '@/src/presentation/shared/ui'

<Heading variant="h1" color="primary" align="center">
  Settings
</Heading>

<Text variant="body" color="secondary" numberOfLines={2}>
  Customize your VNYL experience with these preferences
</Text>
```

**Text Variants:**
- `body` - Default body text
- `bodyBold` - Bold body text
- `caption` - Smaller descriptive text
- `small` - Smallest text size

**Heading Variants:**
- `h1` - Main page titles
- `h2` - Section headers
- `h3` - Subsection headers

**Color Options:**
- `primary` - Main text color
- `secondary` - Muted text color
- `inverse` - High contrast text
- `error` - Error state text
- `success` - Success state text

## Molecules

### SettingRow

Flexible setting row component that combines multiple atoms into common settings patterns.

```typescript
import { SettingRow } from '@/src/presentation/shared/ui'

// Switch Row
<SettingRow
  label="Push Notifications"
  description="Get notified about new releases and price changes"
  variant="switch"
  switchProps={{
    value: notificationsEnabled,
    onValueChange: setNotificationsEnabled
  }}
/>

// Navigation Row
<SettingRow
  label="Export Data"
  description="Export your collection to CSV or JSON"
  variant="navigation"
  leftIcon={<ExportIcon />}
  onPress={handleExport}
/>

// Button Row
<SettingRow
  label="Advanced Settings"
  variant="button"
  buttonProps={{
    title: "Configure",
    onPress: handleConfigure,
    variant: "outline"
  }}
/>
```

**Variants:**
- `default` - Plain row with custom content
- `switch` - Row with toggle switch
- `button` - Row with action button
- `navigation` - Row with chevron for navigation

### FormField

Combines label, input, and validation messaging into a cohesive form element.

```typescript
import { FormField } from '@/src/presentation/shared/ui'

<FormField
  label="Email Address"
  value={email}
  onChangeText={setEmail}
  required
  error={emailError}
  helperText="We'll never share your email"
  keyboardType="email-address"
  layout="vertical"  // vertical, horizontal
/>
```

### SectionHeader

Consistent section header with optional action button.

```typescript
import { SectionHeader } from '@/src/presentation/shared/ui'

<SectionHeader
  title="Preferences"
  subtitle="Customize app behavior and notifications"
  action={{
    title: "Reset All",
    onPress: handleReset
  }}
/>
```

## Organisms

### SettingsSection

Complete settings section that combines header and content with proper spacing and dividers.

```typescript
import { SettingsSection } from '@/src/presentation/shared/ui'

<SettingsSection
  title="Preferences"
  description="Customize app behavior"
  headerAction={{
    title: "Reset",
    onPress: handleReset
  }}
  showTopDivider
  bottomMargin
>
  <SettingRow {...} />
  <SettingRow {...} />
  <SettingRow {...} />
</SettingsSection>
```

### PreferenceForm

Comprehensive form component with validation and submission handling.

```typescript
import { PreferenceForm } from '@/src/presentation/shared/ui'

const formFields = [
  {
    id: 'email',
    type: 'email',
    label: 'Email Address',
    value: email,
    required: true,
    validate: validateEmail
  },
  {
    id: 'notifications',
    type: 'switch',
    label: 'Push Notifications',
    value: notificationsEnabled
  }
]

<PreferenceForm
  title="Account Settings"
  fields={formFields}
  values={formValues}
  errors={formErrors}
  onFieldChange={handleFieldChange}
  onSubmit={handleSubmit}
  loading={isSubmitting}
  submitButtonTitle="Save Changes"
  showResetButton
/>
```

## Accessibility

All components include comprehensive accessibility support:

- **Proper Roles**: Button, switch, text input roles
- **State Management**: Disabled, loading, error states
- **Labels**: Descriptive accessibility labels
- **Hit Targets**: Minimum 44pt touch targets
- **Screen Reader**: Full screen reader compatibility
- **Keyboard Navigation**: Focus management and keyboard support

## Performance Optimizations

- **StyleSheet.create()**: All styles use React Native's optimized StyleSheet API
- **Theme Memoization**: Theme values are memoized to prevent unnecessary re-renders
- **Component Memoization**: Observer pattern with Legend State for fine-grained reactivity
- **Responsive Scaling**: Size-matters scaling for consistent appearance across devices

## Usage Examples

### Complete Settings Screen

```typescript
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  SettingsSection,
  SettingRow,
  Heading,
  Text,
  useTheme,
  createStyles
} from '@/src/presentation/shared/ui'

export default function SettingsScreen() {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Heading variant="h1">Settings</Heading>

        <SettingsSection title="Preferences">
          <SettingRow
            label="Dark Mode"
            description="Use dark appearance"
            variant="switch"
            switchProps={{
              value: darkMode,
              onValueChange: setDarkMode
            }}
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  )
}
```

### Custom Theme Integration

```typescript
import { ThemeProvider, createTheme } from '@/src/presentation/shared/ui'

// App root component
export default function App() {
  return (
    <ThemeProvider initialMode="dark">
      <YourAppContent />
    </ThemeProvider>
  )
}
```

## Integration Points

The atomic design system integrates seamlessly with:

- **Legend State**: Reactive state management with observer patterns
- **User Preferences**: Settings persistence and synchronization
- **Internationalization**: i18n support through translation keys
- **Form Validation**: Built-in validation patterns and error handling
- **Accessibility**: WCAG 2.1 AA compliance throughout

## Best Practices

1. **Always use the theme**: Never hardcode colors, spacing, or typography
2. **Compose atoms into molecules**: Build complex UIs through composition
3. **Accessibility first**: Include proper labels and roles from the start
4. **Consistent patterns**: Use established variants rather than custom styling
5. **Performance awareness**: Leverage StyleSheet.create() and memoization
6. **Type safety**: Utilize TypeScript interfaces for all props
7. **Responsive design**: Use theme spacing and size-matters scaling

## Future Enhancements

- **Animation system**: Micro-interactions and page transitions
- **Data visualization**: Chart and graph components
- **Advanced forms**: Multi-step forms and complex validation
- **Media components**: Image galleries and video players
- **Navigation patterns**: Tab bars and navigation headers
- **Feedback components**: Toast notifications and modal dialogs