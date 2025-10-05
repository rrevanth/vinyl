import { Pressable, Text, View } from 'react-native'
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { Ionicons } from '@expo/vector-icons'

interface SettingsNavigationRowProps {
  title: string
  description?: string
  iconName?: keyof typeof Ionicons.glyphMap
  iconFamily?: 'Ionicons'
  onPress: () => void
  isLast?: boolean
}

export const SettingsNavigationRow = observer<SettingsNavigationRowProps>(
  ({ title, description, iconName, iconFamily = 'Ionicons', onPress, isLast = false }) => {
    const IconComponent = iconFamily === 'Ionicons' ? Ionicons : Ionicons
    const iconColor = UnistylesRuntime.getTheme().colors.textSecondary

    return (
      <Pressable
        style={({ pressed }) => [
          styles.container,
          pressed && styles.pressed,
          !isLast && styles.separator,
        ]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityHint={description ?? `Navigate to ${title}`}
      >
        <View style={styles.content}>
          {iconName && (
            <View style={styles.iconContainer}>
              <IconComponent name={iconName} size={24} color={iconColor} />
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {description && <Text style={styles.description}>{description}</Text>}
          </View>
          <Text style={styles.chevron}>→</Text>
        </View>
      </Pressable>
    )
  }
)

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    minHeight: 56,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  pressed: {
    backgroundColor: theme.colors.surfaceElevated,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: theme.spacing.md,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    lineHeight: 18,
  },
  chevron: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.textTertiary,
    fontWeight: theme.fontWeight.light,
  },
}))

export type { SettingsNavigationRowProps }