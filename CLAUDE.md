# VNYL App - Claude Development Guide

## Quick Reference

### Essential Workflow
1. **Analysis**: Understand requirements (native reasoning for most tasks)
2. **Planning**: TodoWrite for >3 step operations
3. **Implementation**: Use agents for ALL code changes
4. **Validation**: `bun typecheck && bun lint` (REQUIRED after every change)
5. **Testing**: Verify in development environment

### MCP Usage
- **Context7**: Official React Native/Expo docs (primary resource)
- **Sequential**: Multi-step reasoning (use sparingly for complex architecture)

### Critical Commands
```bash
# Validation (REQUIRED after every change)
bun typecheck && bun lint

# Development builds
npx expo run:ios       # iOS simulator
npx expo run:android   # Android emulator

# Device builds
eas build --platform ios --profile development
eas build --platform android --profile development
```

---

## Technology Stack

### Core
- **Expo 54** with latest features
- **React Native** with TypeScript strict mode
- **Bun** package manager (all commands)
- **Legend State** observable state + persistence
- **TanStack Query** data fetching + cache
- **Axios** Bearer auth + retry
- **Unistyles v3** centralized theming
- **Expo Localization** i18n support

### Standards
- **Native Components Only**: View, Text, Pressable
- **@ Import Pattern**: All internal imports use @ aliases
- **CLEAN Architecture**: Domain → Infrastructure → Presentation
- **Agent-Driven Development**: ALL code changes through agents

---

## CLEAN Architecture

### Structure
```
src/
├── domain/              # Business Logic
│   ├── entities/        # Core business objects
│   ├── repositories/    # Repository interfaces (I prefix)
│   ├── services/        # Service interfaces (I prefix)
│   ├── use-cases/       # Application business rules
│   └── errors/          # Domain error types
│
├── infrastructure/      # External Dependencies
│   ├── api/            # HTTP clients
│   ├── storage/        # Persistence
│   ├── services/       # Service implementations
│   ├── di/             # Dependency injection
│   └── mappers/        # Data transformation
│
└── presentation/       # UI Layer
    ├── features/       # Feature-based screens
    ├── shared/
    │   ├── ui/         # Reusable components
    │   ├── stores/     # State management
    │   ├── hooks/      # Custom hooks
    │   └── navigation/ # Navigation config
    └── providers/      # React context
```

### Naming Conventions

**Interfaces**: Use `I` prefix
```typescript
// ✅ CORRECT
export interface IUserRepository {
  findById(id: string): Promise<User | null>
}
```

**Implementations**: Normal names (no `Impl` suffix)
```typescript
// ✅ CORRECT
export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    // Implementation
  }
}

// ❌ WRONG
export class UserRepositoryImpl implements IUserRepository {}
```

### Core Principles

1. **Dependency Rule**: Dependencies flow inward only
   - Infrastructure → Domain ✅
   - Presentation → Domain ✅
   - Domain → Nothing ✅

2. **Domain Independence**: Zero framework dependencies
   - No React in Domain layer
   - No HTTP client in Domain layer
   - No storage library in Domain layer

3. **Dependency Injection Everywhere**
   ```typescript
   // ❌ WRONG - Direct instantiation
   const storage = new StorageService()

   // ✅ CORRECT - DI container
   const storage = container.resolve<IStorageService>(TOKENS.StorageService)

   // ✅ CORRECT - React hook
   const storage = useService<IStorageService>(TOKENS.StorageService)
   ```

4. **Pass Complete Objects, Not IDs**
   ```typescript
   // ❌ WRONG
   navigation.navigate('Detail', { id: user.id })

   // ✅ CORRECT
   navigation.navigate('Detail', { user: user })
   ```

### Layer Examples

#### Domain Layer

**Entity**:
```typescript
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly preferences: UserPreferences
  ) {
    if (!email.includes('@')) {
      throw new ValidationError('Invalid email', 'email')
    }
  }
}
```

**Repository Interface**:
```typescript
export interface IUserRepository {
  findById(id: string): Promise<User | null>
  save(user: User): Promise<void>
}
```

**Use Case**:
```typescript
export class GetUserProfileUseCase {
  constructor(
    private userRepository: IUserRepository,
    private logger: ILoggingService
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new NotFoundError('User not found')
    return user // Complete object
  }
}
```

#### Infrastructure Layer

**Repository Implementation**:
```typescript
export class UserRepository implements IUserRepository {
  constructor(
    private httpClient: HttpClient,
    private mapper: UserMapper
  ) {}

  async findById(id: string): Promise<User | null> {
    const data = await this.httpClient.get(`/users/${id}`)
    return this.mapper.toDomain(data)
  }
}
```

**DI Container**:
```typescript
export const TOKENS = {
  StorageService: Symbol('StorageService'),
  LoggingService: Symbol('LoggingService'),
  HttpClient: Symbol('HttpClient'),
}

export const container = new Container()

export function initializeContainer(): void {
  container.register(TOKENS.StorageService, () => new StorageService())
  container.register(TOKENS.LoggingService, () => new LoggingService())

  const storage = container.resolve<IStorageService>(TOKENS.StorageService)
  container.register(TOKENS.ThemeService, () => new ThemeService(storage))
}
```

**React Hook for DI**:
```typescript
export function useService<T>(token: symbol): T {
  return container.resolve<T>(token)
}

// Usage
const storage = useService<IStorageService>(TOKENS.StorageService)
```

#### Presentation Layer

**State Management**:
```typescript
// Global store
export const user$ = observable<User | null>(null)

// Feature store
export const search$ = observable({
  query: '',
  results: [] as Media[], // Complete objects
})

// TanStack Query for API
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => getUserProfileUseCase.execute(userId),
  staleTime: 5 * 60 * 1000,
})
```

### Error Handling

**Domain Errors**:
```typescript
export class DomainError extends Error {}
export class NotFoundError extends DomainError {}
export class ValidationError extends DomainError {
  constructor(message: string, public field: string) {
    super(message)
  }
}
export class UnauthorizedError extends DomainError {}
```

**In Presentation**:
```typescript
const { data, error, isError } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => getUserProfileUseCase.execute(userId),
  retry: (failureCount, error) => {
    if (error instanceof ValidationError) return false
    return failureCount < 3
  },
})

if (isError) {
  if (error instanceof NotFoundError) return <NotFoundMessage />
  if (error instanceof ValidationError) {
    return <ValidationMessage field={error.field} />
  }
  return <GenericErrorMessage />
}
```

---

## Unistyles v3 Best Practices

### Basic Usage

**Import**:
```typescript
import { StyleSheet } from 'react-native-unistyles'
```

**No hooks needed** - styles are directly usable:
```typescript
// ✅ v3 API
const styles = StyleSheet.create((theme, rt) => ({
  container: {
    backgroundColor: theme.colors.background,
    paddingTop: rt.insets.top, // Runtime access
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
  }
}))

// Usage - direct access
<View style={styles.container}>
  <Text style={styles.text}>Hello</Text>
</View>
```

### Variants

Built-in variant system for flexible component styling:

```typescript
const styles = StyleSheet.create((theme) => ({
  button: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    variants: {
      variant: {
        primary: {
          backgroundColor: theme.colors.primary
        },
        secondary: {
          backgroundColor: theme.colors.secondary
        },
        outline: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.primary,
        }
      },
      size: {
        sm: {
          padding: theme.spacing.sm,
          minHeight: 36,
        },
        md: {
          padding: theme.spacing.md,
          minHeight: 44,
        },
        lg: {
          padding: theme.spacing.lg,
          minHeight: 52,
        }
      }
    }
  }
}))

// Usage
<Pressable
  style={styles.button.useVariants({
    variant: 'primary',
    size: 'lg'
  })}
>
  <Text>Save</Text>
</Pressable>
```

### Compound Variants

Apply styles when multiple conditions are met:

```typescript
const styles = StyleSheet.create((theme) => ({
  button: {
    padding: theme.spacing.md,
    variants: {
      variant: {
        primary: { backgroundColor: theme.colors.primary },
        secondary: { backgroundColor: theme.colors.secondary },
      },
      disabled: {
        true: { opacity: 0.5 },
        false: { opacity: 1 },
      }
    },
    compoundVariants: [
      {
        variant: 'primary',
        disabled: true,
        styles: {
          backgroundColor: theme.colors.disabled,
        }
      }
    ]
  }
}))
```

### Dynamic Functions

Computed styles based on props:

```typescript
const styles = StyleSheet.create((theme) => ({
  container: (isActive: boolean) => ({
    backgroundColor: isActive
      ? theme.colors.primary
      : theme.colors.background,
    borderWidth: isActive ? 2 : 1,
  })
}))

// Usage
<View style={styles.container(isActive)} />
```

### withUnistyles

Wrap third-party components for theme/runtime access:

```typescript
import { withUnistyles } from 'react-native-unistyles'

// Auto-mapping for style/contentContainerStyle
const StyledScrollView = withUnistyles(ScrollView)

// Usage
<StyledScrollView
  contentContainerStyle={styles.scrollContent}
/>

// Custom mapping
const ThemedButton = withUnistyles(Button, (theme, rt) => ({
  color: theme.colors.primary,
  tintColor: theme.colors.accent,
}))
```

### Theme Configuration

```typescript
// unistyles.ts
import { StyleSheet } from 'react-native-unistyles'

const lightTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    text: '#000000',
  },
  spacing: {
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32,
  },
  typography: {
    body: { fontSize: 16, lineHeight: 24 },
    heading: { fontSize: 24, lineHeight: 32 },
  },
  radius: {
    sm: 4, md: 8, lg: 12,
  }
}

const darkTheme = {
  colors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    text: '#FFFFFF',
  },
  spacing: lightTheme.spacing,
  typography: lightTheme.typography,
  radius: lightTheme.radius,
}

StyleSheet.configure({
  themes: { light: lightTheme, dark: darkTheme },
  settings: {
    initialTheme: 'light'
  }
})

// TypeScript types
type AppThemes = typeof { light: typeof lightTheme, dark: typeof darkTheme }

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}
```

---

## UI Component Example

### Button Component (Atom)

```typescript
import React from 'react'
import { Pressable, Text, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = observer(({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button.useVariants({ variant, size }),
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.text.useVariants({ size })}>
          {title}
        </Text>
      )}
    </Pressable>
  )
})

const styles = StyleSheet.create((theme) => ({
  button: {
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      variant: {
        primary: { backgroundColor: theme.colors.primary },
        secondary: { backgroundColor: theme.colors.secondary },
        outline: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.primary,
        }
      },
      size: {
        sm: {
          padding: theme.spacing.sm,
          minHeight: 36,
        },
        md: {
          padding: theme.spacing.md,
          minHeight: 44,
        },
        lg: {
          padding: theme.spacing.lg,
          minHeight: 52,
        }
      }
    }
  },
  text: {
    fontWeight: '600',
    variants: {
      size: {
        sm: { fontSize: 14 },
        md: { fontSize: 16 },
        lg: { fontSize: 18 },
      }
    }
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
}))
```

---

## Agent-Driven Development

### CRITICAL: Always Use Agents

**MANDATORY**: ALL code changes through agents using Task tool.

**Agent Selection**:

| Task Type | Agent | Use Case |
|-----------|-------|----------|
| Domain Layer | backend-architect | Entities, use cases, interfaces |
| Infrastructure | backend-architect | API, storage, services, DI |
| Presentation/UI | frontend-architect | Components, screens, hooks |
| State Management | frontend-architect | Legend State, TanStack Query |
| Code Cleanup | refactoring-expert | Quality improvements |
| Testing | quality-engineer | Unit/integration tests |
| Architecture | system-architect | System design, patterns |
| Security | security-engineer | Auth, validation |
| Bug Fixing | root-cause-analyst | Debugging, investigation |
| Performance | performance-engineer | Optimization |

**Example**:
```typescript
Task({
  subagent_type: 'frontend-architect',
  description: 'Create Button component with variants',
  prompt: 'Build Button component using Unistyles v3 variants API...'
})
```

**Exceptions** (direct tools allowed):
- Config file updates (tsconfig.json, package.json)
- Simple formatting fixes
- Documentation updates

### Workflow Pattern

```typescript
// 1. PRE-ANALYSIS
git status && git branch  // ✅ On feature branch
bun typecheck && bun lint // ✅ No errors

// 2. PLAN with TodoWrite (>3 steps)
TodoWrite({
  todos: [
    { content: "Create entity", status: "in_progress", activeForm: "Creating entity" },
    { content: "Define interface", status: "pending", activeForm: "Defining interface" },
    { content: "Validate", status: "pending", activeForm: "Validating" }
  ]
})

// 3. EXECUTE via agents
Task({
  subagent_type: 'backend-architect',
  description: 'Create user entity',
  prompt: '...'
})

// 4. VALIDATE immediately
execAsync('bun typecheck && bun lint')

// 5. FIX properly (no shortcuts)
// - No @ts-ignore
// - No 'any' types
// - No disabled ESLint rules

// 6. RE-VALIDATE until clean
execAsync('bun typecheck && bun lint')
```

---

## Critical Standards

### Import Pattern (REQUIRED)

```typescript
// ✅ CORRECT - @ imports
import { useTheme } from '@/src/presentation/shared/ui'
import { container } from '@/src/infrastructure/di/container'
import { User } from '@/src/domain/entities/User'

// ❌ FORBIDDEN - Relative imports
import { useTheme } from '../../../shared/ui'
```

### Validation Gates (REQUIRED)

```bash
# MUST PASS before commit
bun typecheck && bun lint

# Auto-fix when possible
bun lint --fix

# Verify fixes
bun typecheck && bun lint
```

**Never**:
- Use `@ts-ignore` or `@ts-expect-error`
- Use `any` type
- Disable ESLint rules
- Skip validation

### Native Components (ENFORCED)

```typescript
// ✅ ALLOWED
import { View, Text, Pressable, ScrollView, FlatList } from 'react-native'

// ❌ FORBIDDEN
import { Button } from 'react-native-elements'
import { Card } from 'react-native-paper'
```

### Internationalization (REQUIRED)

```typescript
// ✅ CORRECT - Translation keys
const { t } = useTranslation()
<Text>{t('settings.theme.dark_mode')}</Text>

// ❌ FORBIDDEN - Hardcoded text
<Text>Dark Mode</Text>
```

### Accessibility (REQUIRED)

```typescript
<Pressable
  accessibilityRole="button"           // ✅ Required
  accessibilityLabel="Save settings"   // ✅ Required
  accessibilityState={{ disabled }}    // ✅ For state
  accessibilityHint="Saves preferences" // Optional
>
  <Text>Save</Text>
</Pressable>
```

**Minimum touch target: 44pt**

---

## Expo Essentials

### Edge-to-Edge Layout

Use `react-native-safe-area-context` for proper safe areas:

```typescript
import { SafeAreaView } from 'react-native-safe-area-context'

// Wrap screen content
<SafeAreaView style={{ flex: 1 }}>
  <Text>Content in safe area</Text>
</SafeAreaView>

// Or use hook
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const insets = useSafeAreaInsets()
<View style={{ paddingTop: insets.top }}>
  <Text>Content with safe insets</Text>
</View>
```

### Development Builds

```bash
# Simulator/Emulator
npx expo run:ios
npx expo run:android

# Physical devices
eas build --platform ios --profile development
eas build --platform android --profile development
```

### SafeAreaProvider Setup

Add to root component:

```typescript
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  return (
    <SafeAreaProvider>
      {/* App content */}
    </SafeAreaProvider>
  )
}
```

---

## Documentation Sources

**Priority order**:

1. **Internal docs** (@docs/ folder):
   - `docs/documentation/legend.state.md`
   - `docs/documentation/tanstack-query.md`
   - `docs/documentation/unistyles.md`
   - `docs/atomic-design-system.md`

2. **LLM-optimized docs**:
   - Unistyles: https://www.unistyl.es/llms-full.txt
   - Expo: https://docs.expo.dev/llms-full.txt

3. **Context7 MCP**: Official React Native/Expo docs

---

## Quick Checklist

**Before committing**:
- [ ] All imports use @ pattern
- [ ] `bun typecheck` passes
- [ ] `bun lint` passes
- [ ] No external UI libraries
- [ ] All text uses i18n keys (snake_case)
- [ ] Unistyles v3 API (no v2 patterns)
- [ ] Accessibility props added
- [ ] Error handling type-safe
- [ ] Complete objects passed (not IDs)
- [ ] Services via DI container
- [ ] Safe areas handled properly
- [ ] Changes made via agents

---

## Best Practices Summary

**✅ DO:**
- Use agents for ALL code changes
- Use Unistyles v3 API (StyleSheet.create, variants, withUnistyles)
- Pass complete objects between layers
- Handle safe areas with SafeAreaView or insets
- Run validation after every change
- Use @ imports exclusively
- Access services via DI container
- Add accessibility props to interactive elements

**❌ DON'T:**
- Use Unistyles v2 patterns (createStyleSheet, useStyles)
- Skip validation gates
- Use @ts-ignore or any types
- Pass only IDs when objects available
- Import relative paths
- Hardcode text strings
- Make direct code changes without agents
- Work on main/master branch
