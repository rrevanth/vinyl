import { TextInput, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface SettingsInputRowProps {
  title: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  isLast?: boolean
}

export const SettingsInputRow = observer<SettingsInputRowProps>(
  ({
    title,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    isLast = false,
  }) => {
    return (
      <View style={[styles.container, !isLast && styles.separator]}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            accessibilityLabel={title}
          />
        </View>
      </View>
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.md,
  },
  input: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
    textAlign: 'right',
    flex: 1,
    paddingVertical: theme.spacing.xs,
  },
}))

export type { SettingsInputRowProps }