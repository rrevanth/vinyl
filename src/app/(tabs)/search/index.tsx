import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { t } from '@/src/presentation/shared/i18n'

const SearchScreen = observer(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('search.title')}</Text>
      <Text style={styles.subtitle}>{t('search.subtitle')}</Text>
    </View>
  )
})

export default SearchScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
}))
