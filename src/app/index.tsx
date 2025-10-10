import { useEffect } from 'react'
import { router } from 'expo-router'

export default function Index() {
  // Redirect to home tab by default using router.replace
  useEffect(() => {
    // Navigate to /home which will match (tabs)/home/index.tsx
    router.replace('/home')
  }, [])

  // Return null as we're redirecting immediately
  return null
}
