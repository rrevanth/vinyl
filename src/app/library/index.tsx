import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Library</Text>
    </View>
  )
}

const styles = StyleSheet.create((theme, rt) => ({
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
