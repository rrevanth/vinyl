import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { t } from '@/src/presentation/shared/i18n'

const LibraryScreen = observer(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('library.title')}</Text>
    </View>
  )
})

export default LibraryScreen

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
