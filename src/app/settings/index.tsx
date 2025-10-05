import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { t } from '@/src/presentation/shared/i18n'

const SettingsScreen = observer(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('settings.title')}</Text>
    </View>
  )
})

export default SettingsScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.semibold,
  },
}))
