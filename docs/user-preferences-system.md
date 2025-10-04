# User & UserPreferences System Implementation

## Overview

This implementation provides a comprehensive user management and preferences system for the VNYL app, built with CLEAN Architecture principles and Legend State for reactive state management.

## Architecture

### Domain Layer
- **User Entity** (`src/domain/entities/User.ts`): Immutable user data with authentication states
- **UserPreferences Entity** (`src/domain/entities/UserPreferences.ts`): Comprehensive app settings and API configurations  
- **IUserService Interface** (`src/domain/services/IUserService.ts`): Service contract for user operations

### Infrastructure Layer
- **UserService** (`src/infrastructure/services/UserService.ts`): Implementation of user management logic
- **DI Container Registration**: Automatic service registration with dependency injection

### Presentation Layer
- **Legend State Stores** (`src/presentation/shared/stores/user.store.ts`): Reactive observables with AsyncStorage persistence
- **useUser Hook** (`src/presentation/shared/hooks/useUser.ts`): React hook for component integration

## Key Features

### 🔐 **Authentication States**
- Anonymous users (default) with persistent UUID
- Authenticated users with Trakt integration
- Seamless upgrade from anonymous → authenticated

### ⚙️ **Comprehensive Preferences**
- **API Configurations**: TMDB, Trakt, Stremio settings
- **UI Preferences**: Theme, language, content filters
- **Playback Settings**: Quality, subtitles, autoplay
- **Provider Priorities**: Metadata and stream source ordering

### 📱 **Reactive State Management**
- Legend State observables for automatic UI updates
- AsyncStorage persistence with automatic serialization
- Computed observables for derived state (isAuthenticated, etc.)

### 🏗️ **CLEAN Architecture Integration**
- Domain entities are framework-agnostic
- Service interfaces enable testability
- DI container manages all dependencies

## Usage Examples

### Initialize User on App Startup
\`\`\`typescript
// In your app's _layout.tsx
import { useUser } from '@/src/presentation/shared/hooks'

export default function RootLayout() {
  const { initializeUser } = useUser()
  
  useEffect(() => {
    initializeUser()
  }, [])
  
  return <Slot />
}
\`\`\`

### Reactive UI Updates
\`\`\`typescript
// In any component
import { useUser } from '@/src/presentation/shared/hooks'

function UserProfile() {
  const { isAuthenticated$, currentTheme$, user$ } = useUser()
  
  // These will automatically update when state changes
  const isAuth = isAuthenticated$.get()
  const theme = currentTheme$.get()
  const user = user$.get()
  
  return (
    <View>
      <Text>Status: {isAuth ? 'Logged In' : 'Anonymous'}</Text>
      <Text>Theme: {theme}</Text>
    </View>
  )
}
\`\`\`

### Update Preferences
\`\`\`typescript
const { updatePreferences } = useUser()

await updatePreferences({
  ui: {
    theme: 'dark',
    language: 'es',
    autoplayTrailers: false,
  },
  tmdb: {
    language: 'es-ES',
    region: 'ES',
  }
})
// UI automatically updates, changes persisted to AsyncStorage
\`\`\`

### Trakt Authentication
\`\`\`typescript
const { loginWithTrakt } = useUser()

await loginWithTrakt({
  username: 'user123',
  userId: 'abc123',
  accessToken: 'token...',
  refreshToken: 'refresh...',
  expiresAt: Date.now() + 86400000,
})
// User upgraded from anonymous to authenticated
\`\`\`

## Integration with TMDB Client

The UserPreferences system is designed to be the single source of truth for all API configurations:

\`\`\`typescript
// Future TMDB client implementation
import { tmdbConfig$ } from '@/src/presentation/shared/stores'

export class TMDBClient {
  constructor() {
    // Reactive configuration - updates when user changes settings
    this.config = tmdbConfig$.get()
    
    // Listen for config changes
    tmdbConfig$.onChange(() => {
      this.config = tmdbConfig$.get()
      // Reinitialize client with new settings
    })
  }
}
\`\`\`

## Storage Keys

The system uses these AsyncStorage keys with `@vnyl:` prefix:
- `@vnyl:userState` - Current user and authentication state
- `@vnyl:userPreferences` - All app preferences and API configurations

## Benefits

✅ **Single Source of Truth** - All settings centralized in UserPreferences  
✅ **Reactive Updates** - UI automatically reflects preference changes  
✅ **Auto-Persistence** - All changes saved to AsyncStorage automatically  
✅ **Type Safety** - Full TypeScript coverage with strict typing  
✅ **Testable** - Clean interfaces enable easy mocking  
✅ **Session Management** - Proper anonymous ↔ authenticated flows  
✅ **TMDB Ready** - Configuration structure ready for API clients