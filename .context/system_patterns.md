# System Patterns

This file documents recurring patterns and standards used in the VNYL project.

2025-10-03 16:25:17 - System patterns documentation initialized.

---

## Coding Patterns

### @ Import Pattern (MANDATORY)
**Pattern:** ALL internal imports MUST use @ aliases, never relative paths

```typescript
// ✅ CORRECT
import { User } from '@/src/domain/entities/User'
import { container } from '@/src/infrastructure/di/container'
import { Button } from '@/src/presentation/shared/ui/atoms/Button'

// ❌ FORBIDDEN
import { User } from '../../../domain/entities/User'
import { container } from '../../infrastructure/di/container'
```

**Benefits:**
- Clear module boundaries
- Refactoring-friendly
- Better IDE autocomplete
- No brittle relative paths

---

### Service Access via DI Container (MANDATORY)
**Pattern:** NEVER instantiate services directly; always use DI container

```typescript
// ❌ WRONG - Direct instantiation
const storage = new StorageService()

// ✅ CORRECT - DI container resolution
const storage = container.resolve<IStorageService>(TOKENS.StorageService)

// ✅ CORRECT - React hook wrapper
const storage = useService<IStorageService>(TOKENS.StorageService)
```

**Benefits:**
- Testability (easy mocking)
- Single source of truth for instances
- Loose coupling between layers
- Flexible service swapping

---

### Pass Complete Objects, Not IDs (MANDATORY)
**Pattern:** Always pass complete data objects between layers and screens

```typescript
// ❌ WRONG - Passing only ID requires re-fetching
navigation.navigate('Detail', { id: user.id })

// ✅ CORRECT - Pass complete object for immediate access
navigation.navigate('Detail', { user: user })

// ❌ WRONG - Passing subset loses context
function updateUser(userId: string, email: string) {
  // Missing other user data
}

// ✅ CORRECT - Pass complete entity preserves context
function updateUser(user: User) {
  // All user data available
}
```

**Benefits:**
- Immediate data access without loading states
- Complete context in destination
- Reduced API calls
- Simpler state management

---

### Validation Gates (MANDATORY)
**Pattern:** Run `bun typecheck && bun lint` after EVERY code change

```bash
# REQUIRED after any file modification
bun typecheck && bun lint

# Auto-fix when possible
bun lint --fix

# Re-validate after fixes
bun typecheck && bun lint
```

**Forbidden Shortcuts:**
- ❌ Using `@ts-ignore` or `@ts-expect-error`
- ❌ Using `any` type to bypass errors
- ❌ Disabling ESLint rules
- ❌ Commenting out failing code
- ❌ Skipping validation to save time

**Benefits:**
- Catches errors early
- Maintains code quality
- Prevents technical debt
- Ensures team consistency

---

### i18n Translation Keys (MANDATORY)
**Pattern:** NO hardcoded text; all UI strings use translation keys with snake_case

```typescript
// ❌ FORBIDDEN - Hardcoded text
<Text>Dark Mode</Text>
<Text>Font Size</Text>

// ✅ CORRECT - Translation keys
const { t } = useTranslation()
<Text>{t('settings.theme.dark_mode')}</Text>
<Text>{t('settings.display.font_size')}</Text>
```

**Translation File Structure:**
```typescript
// translations/en.ts
export const en = {
  settings: {
    theme: {
      dark_mode: 'Dark Mode',
      light_mode: 'Light Mode',
    },
    display: {
      font_size: 'Font Size',
    }
  }
}
```

**Benefits:**
- Multi-language support
- Centralized string management
- Easy translation updates
- Consistent terminology

---

### Native React Native Components Only (MANDATORY)
**Pattern:** Build with React Native primitives; NO external UI libraries

```typescript
// ✅ ALLOWED - Native React Native components
import { View, Text, Pressable, ScrollView, FlatList } from 'react-native'

// ❌ FORBIDDEN - External UI libraries
import { Button } from 'react-native-elements'
import { Card } from 'react-native-paper'
import { Input } from '@rneui/themed'
```

**Benefits:**
- Full control over behavior
- No external breaking changes
- Better performance
- Consistent design system

---

## Architectural Patterns

### CLEAN Architecture Layer Boundaries
**Pattern:** Dependencies flow inward, never outward

```
Presentation → Domain ✅
Infrastructure → Domain ✅
Domain → Infrastructure ❌
Domain → Presentation ❌
```

**Layer Rules:**
- **Domain**: Zero framework dependencies (no React, no HTTP, no storage)
- **Infrastructure**: Implements Domain interfaces
- **Presentation**: Consumes Domain through DI

---

### Repository Pattern
**Pattern:** Data access through repository interfaces

```typescript
// Domain - Define contract
export interface IUserRepository {
  findById(id: string): Promise<User | null>
  save(user: User): Promise<void>
}

// Infrastructure - Implement contract
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

---

### Use Case Pattern
**Pattern:** Single-responsibility business logic coordination

```typescript
export class GetUserProfileUseCase {
  constructor(
    private userRepository: IUserRepository,
    private logger: ILoggingService
  ) {}

  async execute(userId: string): Promise<User> {
    try {
      const user = await this.userRepository.findById(userId)
      if (!user) {
        throw new NotFoundError('User not found')
      }
      return user // Return complete object, not just ID
    } catch (error) {
      this.logger.error('Failed to get user profile', error as Error, { userId })
      throw error
    }
  }
}
```

---

### Error Handling Strategy
**Pattern:** Typed errors from Domain, handled gracefully in Presentation

```typescript
// Domain errors
export class DomainError extends Error {}
export class NotFoundError extends DomainError {}
export class ValidationError extends DomainError {}

// Infrastructure errors
export class InfrastructureError extends Error {}
export class NetworkError extends InfrastructureError {}

// Presentation handling with TanStack Query
const { data, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => getUserProfileUseCase.execute(userId),
  retry: (failureCount, error) => {
    // Don't retry domain errors
    if (error instanceof ValidationError) return false
    if (error instanceof NotFoundError) return false
    // Retry infrastructure errors
    return failureCount < 3
  },
})

if (error instanceof NotFoundError) {
  return <NotFoundMessage />
}
```

---

## Testing Patterns

### Domain Layer Unit Tests
**Pattern:** Test pure business logic with mocked dependencies

```typescript
describe('GetUserProfileUseCase', () => {
  it('should return complete user when found', async () => {
    const mockUser = new User('1', 'test@example.com', mockPreferences)
    const mockRepo = {
      findById: jest.fn().mockResolvedValue(mockUser)
    }
    
    const useCase = new GetUserProfileUseCase(mockRepo, mockLogger)
    const result = await useCase.execute('1')
    
    expect(result).toBe(mockUser) // Complete object returned
    expect(result.email).toBe('test@example.com')
  })
})
```

---

### Infrastructure Layer Integration Tests
**Pattern:** Test actual implementations with mocked external systems

```typescript
describe('UserRepository', () => {
  it('should return complete user entity from API', async () => {
    const mockClient = {
      get: jest.fn().mockResolvedValue(apiUserData)
    }
    const repository = new UserRepository(mockClient, new UserMapper())
    
    const user = await repository.findById('1')
    
    expect(user).toBeInstanceOf(User)
    expect(user?.email).toBe('test@example.com')
  })
})
```

---

### Presentation Layer Component Tests
**Pattern:** Test UI with complete data objects

```typescript
describe('UserProfile', () => {
  it('should display user data from complete object', () => {
    const user = new User('1', 'test@example.com', mockPreferences)
    
    const { getByText } = render(<UserProfile user={user} />)
    
    expect(getByText('test@example.com')).toBeTruthy()
  })
})
```

---

## Accessibility Patterns

### Minimum Requirements (MANDATORY)
**Pattern:** All interactive components must have proper accessibility props

```typescript
<Pressable
  accessibilityRole="button"           // ✅ Required
  accessibilityLabel="Save settings"   // ✅ Required
  accessibilityState={{ disabled }}    // ✅ For state
  accessibilityHint="Saves your preferences" // Optional
>
  <Text>Save</Text>
</Pressable>
```

**Touch Targets:**
- Minimum 44pt height and width
- Apply to all interactive elements

---

## Performance Patterns

### Virtualized Lists
**Pattern:** Use Legend List for large datasets

```typescript
import { List } from '@legendapp/list'

// ✅ CORRECT - Virtualized list
<List
  data={items}
  renderItem={({ item }) => <MediaCard media={item} />}
  estimatedItemSize={200}
/>
```

---

### Animations
**Pattern:** Use Legend Motion for performant animations

```typescript
import { Motion } from '@legendapp/motion'

<Motion.View
  initial={{ opacity: 0, translateY: 20 }}
  animate={{ opacity: 1, translateY: 0 }}
  transition={{ type: 'spring' }}
>
  {children}
</Motion.View>
```

---

2025-10-03 16:25:17 - Core system patterns documented for consistent development.