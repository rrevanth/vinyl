import { Redirect } from 'expo-router'

export default function Index() {
  // Redirect to home tab by default
  return <Redirect href="/home" />
}
