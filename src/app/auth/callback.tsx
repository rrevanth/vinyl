import { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useTraktAccount } from '@/src/features/settings/hooks/useTraktAccount'

const AuthCallbackScreen = observer(() => {
  const router = useRouter()
  const { code, state } = useLocalSearchParams<{ code?: string; state?: string }>()
  const { handleOAuthCallback } = useTraktAccount()

  useEffect(() => {
    const handleCallback = async () => {
      if (code && state) {
        try {
          await handleOAuthCallback(code, state)
          router.replace('/settings/accounts/trakt')
        } catch (error) {
          console.error('OAuth callback failed:', error)
          router.replace('/settings/accounts')
        }
      } else {
        // No code or state, redirect back to accounts
        router.replace('/settings/accounts')
      }
    }

    handleCallback()
  }, [code, state, handleOAuthCallback, router])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
})

export default AuthCallbackScreen

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
}))
