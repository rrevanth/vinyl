# VNYL - Simplified State Management

## Overview

The state management has been **completely simplified** to use a single **Legend State store** that handles all app state including user data, preferences, theme, locale, and provider configurations.

## Single Store Architecture

### `src/presentation/shared/stores/app.store.ts`

- **✅ User State**: Authentication, profile data
- **✅ User Preferences**: Theme, settings, provider configs (TMDB, Trakt, Stremio)
- **✅ App State**: Current locale/language
- **✅ Theme Management**: Light/Dark/System with automatic Unistyles integration
- **✅ I18n Support**: Locale management with reactive updates
- **✅ Persistence**: Everything auto-persisted using Legend State + AsyncStorage

## Key Benefits

✅ **Single Source of Truth**: One store for all state  
✅ **Simplified**: No service layer complexity for basic state  
✅ **Reactive**: UI automatically updates when state changes  
✅ **Type-Safe**: Full TypeScript support throughout  
✅ **Persistent**: All preferences automatically saved  
✅ **Clean**: No redundant abstractions

## Usage Examples

### Single Hook for Everything

```typescript
import { useAppState } from '@/src/presentation/shared/hooks'

const {
  // Locale
  locale,
  setLocale,

  // Theme
  theme,
  setTheme,
  effectiveTheme$,

  // User
  user$,
  isAuthenticated$,

  // User service methods
  initializeUser,
  getCurrentUser,
} = useAppState()

// Change theme
setTheme('dark') // 'light' | 'dark' | 'system'

// Change language
setLocale('es') // Any of 9 supported languages

// Get current user
const user = user$.get()
const isAuth = isAuthenticated$.get()
```

### Reactive Components

```typescript
import { observer } from '@legendapp/state/react'
import { t } from '@/src/presentation/shared/i18n'

const MyComponent = observer(() => {
  const { effectiveTheme$ } = useAppState()
  const currentTheme = effectiveTheme$.get() // 'light' | 'dark'

  return <Text>{t('home.title')}</Text> // Auto-updates when locale changes
})
```

### Persistence

Everything persists automatically:

- **Theme preference** → Restored on app restart
- **Language choice** → Remembered across sessions
- **User data** → Automatically saved
- **Provider configs** → Persistent for infrastructure layer

## Supported Languages

- English (en) - Spanish (es) - French (fr)
- German (de) - Italian (it) - Portuguese (pt)
- Japanese (ja) - Chinese (zh) - Korean (ko)

## Architecture Benefits

### Before (Complicated)

```
❌ ThemeService + IThemeService
❌ I18nService + II18nService
❌ user.store.ts + app.store.ts
❌ useUser() + useApp() + useTheme() + useI18n()
❌ DI container complexity for simple state
```

### After (Simple)

```
✅ Single app.store.ts with Legend State
✅ Single useAppState() hook
✅ Direct Unistyles integration
✅ Simple translation helper t()
✅ No service layer for UI state
```

## File Structure

```
src/presentation/shared/
├── stores/
│   ├── app.store.ts     # Single store for everything
│   └── index.ts
├── i18n/
│   ├── translations.ts  # All translation strings
│   └── index.ts        # Translation helpers
└── hooks/
    ├── useAppState.ts  # Single comprehensive hook
    └── index.ts
```

## Migration Notes

- **Theme**: Moved from separate service back to user preferences (persisted)
- **Locale**: Simplified from service to direct Legend State
- **User Data**: Consolidated into single store
- **Hooks**: Single `useAppState()` replaces multiple hooks
- **Infrastructure**: Still gets provider configs from store (backward compatible)

### Internationalization

```typescript
import { t, setLocale } from '@/src/presentation/shared/i18n'

// Use translations
const title = t('home.title') // "Welcome to VNYL"
const searchLabel = t('navigation.search') // "Search"

// Change language
setLocale('es') // Spanish
setLocale('fr') // French
```

### Reactive Components

```typescript
import { observer } from '@legendapp/state/react'
import { t } from '@/src/presentation/shared/i18n'

const MyComponent = observer(() => {
  return <Text>{t('some.key')}</Text> // Auto-updates when locale changes
})
```

## Supported Languages

- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- Japanese (ja)
- Chinese (zh)
- Korean (ko)

## Removed Services

- ❌ `ThemeService` - Replaced with direct Unistyles integration
- ❌ `I18nService` - Replaced with Legend State + translation helper
- ❌ Redundant DI complexity for simple state management

## File Structure

```
src/presentation/shared/
├── stores/
│   ├── app.store.ts     # Theme + Locale state
│   ├── user.store.ts    # User + Preferences state
│   └── index.ts
├── i18n/
│   ├── translations.ts  # All translation strings
│   └── index.ts        # Translation helpers
└── hooks/
    ├── useApp.ts       # App state hook
    ├── useUser.ts      # User state hook
    └── index.ts
```
