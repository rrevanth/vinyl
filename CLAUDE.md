# VNYL App - Claude Development Guide

## Quick Reference

### Essential Workflow
1. **Analysis**: Understand requirements (Sequential MCP for complex architecture only)
2. **Planning**: Use TodoWrite for >3 step operations
3. **Implementation**: Execute with parallel operations where possible
4. **Validation**: `bun typecheck && bun lint` (REQUIRED after every change)
5. **Testing**: Verify functionality in development environment

### MCP Server Usage
- **Context7**: Official React Native/Expo documentation (primary resource)
- **Sequential**: Multi-step reasoning, architecture decisions (use sparingly)

---

## Technology Stack

### Core Technologies
- **Expo 54** with latest features
- **React Native** with TypeScript strict mode
- **Bun** package manager (required for all commands)
- **Legend State** observable state management with persistence
- **TanStack Query** data fetching with cache persistence
- **Axios** with Bearer token authentication and retry
- **Unistyles** centralized theme system with responsive design
- **Expo Localization** with comprehensive i18n support

### Development Standards
- **Native Components Only**: View, Text, Pressable, StyleSheet.create()
- **Theme System**: Unistyles for centralized styling with light/dark mode
- **@ Import Pattern**: All internal imports use @ aliases
- **CLEAN Architecture**: Domain → Infrastructure → Presentation
- **Agent Workflows**: TodoWrite for complex tasks, validation gates required

---

## CLEAN Architecture

### Naming Conventions

**Interfaces**:
- **Option 1**: Use `I` prefix → `IUserRepository`, `IStorageService`
- **Option 2**: Use `.interface.ts` suffix → `UserRepository` in `user-repository.interface.ts`

**Concrete Implementations**:
- **Use normal names without `Impl` suffix** → `UserRepository`, `StorageService`
- Place in separate files from interfaces

**Examples**:
```typescript
// ✅ CORRECT - I prefix pattern
// domain/repositories/IUserRepository.ts
export interface IUserRepository {
  findById(id: string): Promise<User | null>
}

// infrastructure/repositories/UserRepository.ts
export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    // Implementation
  }
}

// ✅ CORRECT - .interface.ts suffix pattern
// domain/repositories/user-repository.interface.ts
export interface UserRepository {
  findById(id: string): Promise<User | null>
}

// infrastructure/repositories/user-repository.ts
export class UserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    // Implementation
  }
}

// ❌ WRONG - Using Impl suffix
export class UserRepositoryImpl implements IUserRepository {
  // Don't use Impl suffix
}
```

---

### 3-Layer Architecture Structure

```
src/
├── domain/              # Business Logic & Application Layer
│   ├── entities/        # Core business objects
│   ├── repositories/    # Repository interfaces (I prefix or .interface.ts)
│   ├── services/        # Service interfaces (I prefix or .interface.ts)
│   ├── use-cases/       # Application-specific business rules
│   └── errors/          # Domain-specific error types
│
├── infrastructure/      # External Dependencies & Data Access
│   ├── api/            # HTTP clients (Axios, fetch, etc.)
│   ├── storage/        # Persistence implementations
│   ├── services/       # Service implementations (normal names)
│   ├── di/             # Dependency injection container
│   └── mappers/        # External data → Domain entity transformation
│
└── presentation/       # UI & User Interaction
    ├── features/       # Feature-based screens/modules
    ├── shared/
    │   ├── ui/         # Reusable UI components
    │   ├── stores/     # Application state management
    │   ├── hooks/      # Custom React hooks
    │   └── navigation/ # Navigation configuration
    └── providers/      # React context providers
```

---

### Core Principles

#### 1. Dependency Rule
Dependencies flow inward, never outward:
- Infrastructure → Domain ✅
- Presentation → Domain ✅
- Domain → Nothing ✅

#### 2. Domain Independence
Business logic has zero framework dependencies:
- No React imports in Domain layer
- No HTTP client imports in Domain layer
- No storage library imports in Domain layer

#### 3. Interface Segregation
Define contracts in Domain, implement in Infrastructure:
- Repository interfaces in Domain
- Service interfaces in Domain
- Implementations in Infrastructure

#### 4. Dependency Injection Everywhere
**CRITICAL**: Use DI container for all service resolution:
- ✅ Register all services in DI container at app startup
- ✅ Use cases receive dependencies through constructor
- ✅ Components access services via DI hooks
- ✅ Never instantiate services directly with `new`
- ✅ Never import service implementations in Presentation layer

```typescript
// ❌ WRONG - Direct instantiation
const storage = new StorageService()

// ✅ CORRECT - DI container resolution
const storage = container.resolve<IStorageService>(TOKENS.StorageService)

// ✅ CORRECT - React hook wrapper
const storage = useService<IStorageService>(TOKENS.StorageService)
```

#### 5. Pass Complete Objects, Not IDs
**CRITICAL**: Always pass complete data objects between layers and screens:

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

**Benefits**:
- Immediate access to data without re-fetching
- Complete context available in destination
- Reduced API calls and loading states
- Simpler state management
- Can fallback to stores for very large objects if needed

---

### Layer Responsibilities

#### 1. Domain Layer (Core Business Logic)

**Entities**: Pure business objects with validation logic
```typescript
// ✅ Pure business entity
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly preferences: UserPreferences
  ) {
    this.validateEmail(email)
  }

  private validateEmail(email: string): void {
    if (!email.includes('@')) {
      throw new DomainError('Invalid email format')
    }
  }
}
```

**Repository Interfaces**: Data access contracts
```typescript
// ✅ Interface with I prefix
export interface IUserRepository {
  findById(id: string): Promise<User | null>
  save(user: User): Promise<void>
  delete(id: string): Promise<void>
}
```

**Service Interfaces**: External service contracts
```typescript
export interface IStorageService {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T): Promise<void>
  remove(key: string): Promise<void>
}

export interface ILoggingService {
  info(message: string, context?: object): void
  error(message: string, error: Error, context?: object): void
  warn(message: string, context?: object): void
}

export interface IThemeService {
  getThemeMode(): Promise<'light' | 'dark'>
  setThemeMode(mode: 'light' | 'dark'): Promise<void>
}

export interface II18nService {
  getLocale(): Promise<string>
  setLocale(locale: string): Promise<void>
}
```

**Use Cases**: Single-responsibility application logic
```typescript
// ✅ Use case coordinates domain operations
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

**Domain Errors**: Business-specific error types
```typescript
export class DomainError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DomainError'
  }
}

export class NotFoundError extends DomainError {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export class ValidationError extends DomainError {
  constructor(
    message: string,
    public readonly field: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message: string) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}
```

---

#### 2. Infrastructure Layer (External Dependencies)

**API Clients**: HTTP communication with Bearer auth
```typescript
// ✅ Concrete implementation with normal name (no Impl suffix)
export class HttpClient {
  private client: AxiosInstance

  constructor(
    private baseURL: string,
    private getAuthToken: () => string | null
  ) {
    this.setupAxios()
  }

  private setupAxios(): void {
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
    })

    // Request interceptor for Bearer auth
    this.client.interceptors.request.use((config) => {
      const token = this.getAuthToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          throw new UnauthorizedError('Authentication required')
        }
        throw error
      }
    )

    // Setup axios-retry for resilience
    axiosRetry(this.client, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
    })
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await this.client.get(endpoint)
    return response.data
  }
}
```

**Repository Implementations**: Data access logic
```typescript
// ✅ Normal name, no Impl suffix
export class UserRepository implements IUserRepository {
  constructor(
    private httpClient: HttpClient,
    private mapper: UserMapper
  ) {}

  async findById(id: string): Promise<User | null> {
    try {
      const data = await this.httpClient.get(`/users/${id}`)
      return this.mapper.toDomain(data) // Return complete User object
    } catch (error) {
      if (error instanceof NotFoundError) return null
      throw error
    }
  }

  async save(user: User): Promise<void> {
    const payload = this.mapper.toAPI(user)
    await this.httpClient.post('/users', payload)
  }
}
```

**Core Services**: Generic infrastructure services

**StorageService**: Persistent data storage
```typescript
export class StorageService implements IStorageService {
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      throw new InfrastructureError('Storage read failed', error as Error)
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      throw new InfrastructureError('Storage write failed', error as Error)
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      throw new InfrastructureError('Storage remove failed', error as Error)
    }
  }
}
```

**LoggingService**: Structured logging
```typescript
export class LoggingService implements ILoggingService {
  info(message: string, context?: object): void {
    if (__DEV__) {
      console.log(`[INFO] ${message}`, context)
    }
    // Send to remote logging service (Sentry, etc.)
  }

  error(message: string, error: Error, context?: object): void {
    console.error(`[ERROR] ${message}`, error, context)
    // Send to error tracking service
  }

  warn(message: string, context?: object): void {
    if (__DEV__) {
      console.warn(`[WARN] ${message}`, context)
    }
  }
}
```

**ThemeService**: Theme management
```typescript
export class ThemeService implements IThemeService {
  constructor(private storage: IStorageService) {}

  async getThemeMode(): Promise<'light' | 'dark'> {
    const mode = await this.storage.get<'light' | 'dark'>('theme_mode')
    return mode ?? 'light'
  }

  async setThemeMode(mode: 'light' | 'dark'): Promise<void> {
    await this.storage.set('theme_mode', mode)
  }
}
```

**I18nService**: Internationalization
```typescript
export class I18nService implements II18nService {
  constructor(private storage: IStorageService) {}

  async getLocale(): Promise<string> {
    const locale = await this.storage.get<string>('locale')
    return locale ?? 'en'
  }

  async setLocale(locale: string): Promise<void> {
    await this.storage.set('locale', locale)
  }
}
```

**DI Container**: Service registration and resolution
```typescript
export class Container {
  private services = new Map<symbol, any>()

  register<T>(token: symbol, factory: () => T): void {
    this.services.set(token, factory())
  }

  resolve<T>(token: symbol): T {
    const service = this.services.get(token)
    if (!service) {
      throw new Error(`Service not registered: ${token.toString()}`)
    }
    return service
  }
}

// Token definitions
export const TOKENS = {
  StorageService: Symbol('StorageService'),
  LoggingService: Symbol('LoggingService'),
  ThemeService: Symbol('ThemeService'),
  I18nService: Symbol('I18nService'),
  HttpClient: Symbol('HttpClient'),
}

// Container initialization
export const container = new Container()

export function initializeContainer(): void {
  // Register core services (normal names, no Impl suffix)
  container.register(TOKENS.StorageService, () => new StorageService())
  container.register(TOKENS.LoggingService, () => new LoggingService())

  // Inject dependencies
  const storage = container.resolve<IStorageService>(TOKENS.StorageService)
  container.register(TOKENS.ThemeService, () => new ThemeService(storage))
  container.register(TOKENS.I18nService, () => new I18nService(storage))

  // Register HTTP client
  container.register(TOKENS.HttpClient, () =>
    new HttpClient('https://api.example.com', () => getAuthToken())
  )
}
```

**React Hook for DI**:
```typescript
// ✅ Presentation layer hook for service access
export function useService<T>(token: symbol): T {
  return container.resolve<T>(token)
}

// Usage in components
const storage = useService<IStorageService>(TOKENS.StorageService)
const logger = useService<ILoggingService>(TOKENS.LoggingService)
```

**Mappers**: Data transformation
```typescript
// ✅ Normal name for mapper
export class UserMapper {
  toDomain(data: any): User {
    return new User(
      data.id,
      data.email,
      this.mapPreferences(data.preferences)
    )
  }

  toAPI(user: User): any {
    return {
      id: user.id,
      email: user.email,
      preferences: user.preferences,
    }
  }

  private mapPreferences(data: any): UserPreferences {
    // Transform complete preference object
    return new UserPreferences(
      data.theme,
      data.locale,
      data.notifications
    )
  }
}
```

---

#### 3. Presentation Layer (UI & State)

**Feature-Based Organization**:
```
presentation/features/
├── home/
│   ├── HomeScreen.tsx
│   ├── home.store.ts          # Feature-specific state (optional)
│   ├── useHomeData.ts         # Feature hooks
│   └── components/            # Feature-specific components
├── settings/
│   ├── SettingsScreen.tsx
│   ├── settings.store.ts
│   └── components/
```

**State Management Strategy** (Hybrid Approach):

**Global Stores** (shared application state):
```typescript
// presentation/shared/stores/user.store.ts
export const user$ = observable<User | null>(null)

// presentation/shared/stores/preferences.store.ts
export const preferences$ = observable({
  theme: 'light' as 'light' | 'dark',
  locale: 'en',
  notifications: true,
})
```

**Feature Stores** (screen-specific state):
```typescript
// presentation/features/search/search.store.ts
export const search$ = observable({
  query: '',
  filters: [],
  isLoading: false,
  results: [] as SearchResult[], // Complete objects, not IDs
})
```

**API State Management** (TanStack Query for caching):
```typescript
// ✅ Use cases with TanStack Query
const { data: user, isLoading } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => getUserProfileUseCase.execute(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
})

// Pass complete user object to child components
<UserProfile user={user} />

// Navigate with complete object
navigation.navigate('Detail', { user })
```

**Atomic Design System**:
```
presentation/shared/ui/
├── atoms/        # Basic elements (Button, Input, Text)
├── molecules/    # Simple compositions (FormField, Card)
└── organisms/    # Complex components (Form, Section)
```

**Component Pattern with Complete Objects**:
```typescript
// ✅ CORRECT - Accept complete object
interface UserProfileProps {
  user: User  // Complete object with all data
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  // All user data immediately available
  return (
    <View>
      <Text>{user.email}</Text>
      <Text>{user.preferences.theme}</Text>
    </View>
  )
}

// ❌ WRONG - Accept only ID, requires re-fetching
interface UserProfileProps {
  userId: string  // Need to fetch user data
}
```

---

### Data Flow Pattern

**Standard Flow**:
```
User Interaction (UI Component)
    ↓
Feature Store (optional, UI state)
    ↓
Use Case (business logic)
    ↓
Repository Interface (contract)
    ↓
Repository Implementation (Infrastructure)
    ↓
HTTP Client / Storage
    ↓
External System (API, Database)
    ↓
Return complete objects up the chain
```

**With TanStack Query** (Server State):
```
UI Component
    ↓
TanStack Query (caching + loading states)
    ↓
Use Case (business logic)
    ↓
Repository → HTTP Client → API
    ↓
Return complete entity objects
```

---

### Error Handling Strategy

#### Domain Errors (Business Logic)
```typescript
// domain/errors/domain-errors.ts
export class DomainError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DomainError'
  }
}

export class NotFoundError extends DomainError {}
export class ValidationError extends DomainError {
  constructor(message: string, public field: string) {
    super(message)
  }
}
export class UnauthorizedError extends DomainError {}
```

#### Infrastructure Errors (External Systems)
```typescript
// infrastructure/errors/infrastructure-errors.ts
export class InfrastructureError extends Error {
  constructor(
    message: string,
    public readonly cause?: Error
  ) {
    super(message)
    this.name = 'InfrastructureError'
  }
}

export class NetworkError extends InfrastructureError {}
export class StorageError extends InfrastructureError {}
```

#### Error Handling in Use Cases
```typescript
export class UpdateUserUseCase {
  constructor(
    private repository: IUserRepository,
    private logger: ILoggingService
  ) {}

  async execute(user: User): Promise<void> {
    try {
      // Validate in domain
      if (!user.email.includes('@')) {
        throw new ValidationError('Invalid email', 'email')
      }

      // Save via repository
      await this.repository.save(user)
    } catch (error) {
      // Log with context
      this.logger.error('User update failed', error as Error, {
        userId: user.id,
      })

      // Re-throw for UI layer
      throw error
    }
  }
}
```

#### Error Handling in Presentation
```typescript
// TanStack Query error handling
const { data, error, isError } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => getUserProfileUseCase.execute(userId),
  retry: (failureCount, error) => {
    // Don't retry on domain errors
    if (error instanceof ValidationError) return false
    if (error instanceof NotFoundError) return false
    // Retry on infrastructure errors
    return failureCount < 3
  },
})

if (isError) {
  if (error instanceof NotFoundError) {
    return <NotFoundMessage />
  }
  if (error instanceof ValidationError) {
    return <ValidationMessage field={error.field} message={error.message} />
  }
  return <GenericErrorMessage />
}
```

#### Error Boundaries (React)
```typescript
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const logger = container.resolve<ILoggingService>(TOKENS.LoggingService)
    logger.error('React error boundary caught error', error, {
      componentStack: errorInfo.componentStack,
    })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallbackScreen error={this.state.error} />
    }
    return this.props.children
  }
}
```

---

### Critical Decision Points

#### 1. State Management Boundaries

| State Type | Layer | Technology | Example |
|------------|-------|------------|---------|
| UI State | Presentation | Legend State (feature stores) | Search filters, form state |
| Server State | Presentation | TanStack Query | API data, caching |
| App State | Presentation | Legend State (global stores) | User, preferences |
| Business Logic | Domain | Use Cases | Validation, calculations |

#### 2. Object vs ID Passing

| Scenario | Approach | Reason |
|----------|----------|--------|
| Navigation | Pass complete object | Immediate access, no loading |
| Props | Pass complete object | Full context available |
| Use Case params | Pass complete object | Preserves all data |
| Very large objects | Use store reference | Memory optimization if needed |

#### 3. DI Container Usage

| Component | Registration | Resolution |
|-----------|--------------|------------|
| Services | At app startup | Via DI container |
| Repositories | At app startup | Via DI container |
| Use Cases | On-demand or at startup | Via DI container |
| Components | Never | Use `useService()` hook |

---

### Best Practices

**✅ DO:**
- Use `I` prefix for interfaces OR `.interface.ts` suffix
- Use normal names for implementations (no `Impl` suffix)
- Use DI container for ALL service instantiation
- Pass complete objects between layers and screens
- Keep Domain layer framework-agnostic
- Define interfaces in Domain, implement in Infrastructure
- Throw domain-specific errors from Use Cases
- Handle errors gracefully in Presentation layer
- Use TanStack Query for server state (API caching)
- Use Legend State for UI and app state
- Register all services at app startup
- Access services via `useService()` hook in components

**❌ DON'T:**
- Use `Impl` suffix for implementations
- Import React in Domain layer
- Import HTTP clients in Domain layer
- Instantiate services with `new` keyword
- Pass only IDs when full objects are available
- Access storage directly in Use Cases
- Call APIs directly from UI components
- Mix business logic with UI logic
- Catch errors and hide them without logging
- Use `any` type for error handling
- Create circular dependencies between layers

---

### Testing Strategy

**Domain Layer** (Unit Tests):
```typescript
describe('GetUserProfileUseCase', () => {
  it('should return complete user when found', async () => {
    const mockUser = new User('1', 'test@example.com', mockPreferences)
    const mockRepo = {
      findById: jest.fn().mockResolvedValue(mockUser)
    }
    const mockLogger = {
      error: jest.fn(),
      info: jest.fn(),
    }

    const useCase = new GetUserProfileUseCase(mockRepo, mockLogger)
    const result = await useCase.execute('1')

    expect(result).toBe(mockUser) // Complete object returned
    expect(result.email).toBe('test@example.com')
  })

  it('should throw NotFoundError when user not found', async () => {
    const mockRepo = { findById: jest.fn().mockResolvedValue(null) }
    const useCase = new GetUserProfileUseCase(mockRepo, mockLogger)

    await expect(useCase.execute('1')).rejects.toThrow(NotFoundError)
  })
})
```

**Infrastructure Layer** (Integration Tests):
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

**Presentation Layer** (Component Tests):
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

## Agent-Driven Development Workflow

### CRITICAL: Always Use Agents for Changes

**MANDATORY REQUIREMENT**: All code changes MUST be executed through specialized agents using the Task tool.

**Why Use Agents:**
- Specialized expertise for each domain (backend, frontend, refactoring, testing, etc.)
- Better quality through focused analysis and implementation
- Parallel execution capabilities for complex tasks
- Systematic approach with built-in validation
- Context preservation and error recovery

**When to Use Agents:**
```typescript
// ✅ ALWAYS use Task tool with appropriate agent
Task({
  subagent_type: 'backend-architect',    // For Domain/Infrastructure layers
  subagent_type: 'frontend-architect',   // For Presentation/UI components
  subagent_type: 'refactoring-expert',   // For code cleanup
  subagent_type: 'quality-engineer',     // For testing
  subagent_type: 'security-engineer',    // For security reviews
  description: 'Implement user authentication',
  prompt: 'Create authentication use case with proper error handling in TypeScript...'
})

// ❌ NEVER make changes directly without agents
Write({ file_path: '...', content: '...' })  // Wrong approach
Edit({ file_path: '...', ... })              // Wrong approach
```

**Agent Selection Guide (TypeScript/React Native):**

| Task Type | Agent | Use Case |
|-----------|-------|----------|
| Domain Layer | backend-architect | Entities, use cases, repository interfaces |
| Infrastructure Layer | backend-architect | API clients, storage, services, DI container |
| Presentation/UI | frontend-architect | React Native components, screens, hooks |
| State Management | frontend-architect | Legend State stores, TanStack Query setup |
| Code Cleanup | refactoring-expert | Improving code quality, reducing debt |
| Testing | quality-engineer | Unit tests, integration tests |
| Architecture Design | system-architect | System design, layer structure, patterns |
| Security | security-engineer | Auth, validation, error handling |
| Bug Fixing | root-cause-analyst | Debugging, investigation, error analysis |
| Performance | performance-engineer | Optimization, profiling, bottleneck removal |

**Exception**: Only use direct tools (Read, Edit, Write) for:
- Configuration file updates (tsconfig.json, package.json, etc.)
- Simple formatting fixes
- Documentation updates

---

### Pre-Analysis Validation

**ALWAYS start every development session with:**
```bash
# 1. Check git state
git status && git branch

# 2. Verify TypeScript compilation
bun typecheck

# 3. Verify ESLint rules
bun lint
```

**Never proceed with changes if:**
- You're on `main`/`master` branch (create feature branch first)
- TypeScript errors exist
- ESLint errors exist

---

### Complex Task Pattern (>3 steps)

**Required workflow for multi-step operations:**

```typescript
// 1. ANALYZE (if complex architecture/requirements)
//    Use Sequential MCP sparingly for deep analysis
//    Most tasks can be done with native reasoning

// 2. PLAN with TodoWrite
const todos = [
  { content: "Create user entity", status: "pending", activeForm: "Creating user entity" },
  { content: "Implement repository interface", status: "pending", activeForm: "Implementing repository interface" },
  { content: "Add use case logic", status: "pending", activeForm: "Adding use case logic" },
  { content: "Validate with typecheck and lint", status: "pending", activeForm: "Validating with typecheck and lint" }
]

// 3. EXECUTE with parallel operations where possible
await Promise.allSettled([
  Read({ file_path: '/path1' }),
  Read({ file_path: '/path2' }),
  Read({ file_path: '/path3' })
])

// 4. VALIDATE after EVERY change (CRITICAL)
// NEVER skip this step
// NEVER take shortcuts to make validation pass
await execAsync('bun typecheck && bun lint')

// 5. FIX issues properly
// If validation fails, fix the root cause
// Do not:
//   - Add @ts-ignore or @ts-expect-error
//   - Disable ESLint rules
//   - Use 'any' type to bypass errors
//   - Comment out failing code

// 6. RE-VALIDATE until clean
await execAsync('bun typecheck && bun lint')
```

---

### Validation Gates (CRITICAL)

**After every code change, you MUST:**

```bash
# Run validation
bun typecheck && bun lint

# If errors exist, fix them properly:
# ✅ DO: Fix type errors with proper types
# ✅ DO: Fix ESLint errors by following the rule
# ✅ DO: Refactor code to meet standards

# ❌ DON'T: Use @ts-ignore or @ts-expect-error
# ❌ DON'T: Use 'any' type to bypass errors
# ❌ DON'T: Disable ESLint rules
# ❌ DON'T: Comment out failing code
# ❌ DON'T: Skip validation to save time
```

**Auto-fix when possible:**
```bash
# Fix auto-fixable ESLint issues
bun lint --fix

# But always verify the fixes are correct
bun typecheck && bun lint
```

---

### Documentation Sources

When you need documentation or implementation patterns:

**1. Internal Documentation** (@docs/ folder)
```
docs/
├── documentation/
│   ├── legend.state.md       # Legend State patterns
│   ├── tanstack-query.md     # TanStack Query usage
│   ├── legend-motion.md      # Animation patterns
│   ├── legend-list.md        # List virtualization
│   └── unistyles.md          # Unistyles theming
├── atomic-design-system.md   # UI component patterns
└── stremio-understanding-summary.md  # Stremio integration
```

**2. Context7 MCP** (Official documentation)
- Use for React Native official docs
- Use for Expo official docs
- Use for library-specific API references

**3. LLM-Optimized Documentation**
- **Unistyles**: https://www.unistyl.es/llms-full.txt
- **Expo**: https://docs.expo.dev/llms-full.txt

**Priority order:**
1. Check @docs/ for internal patterns first
2. Use LLM-optimized docs (Unistyles, Expo URLs)
3. Use Context7 MCP for other official documentation

---

### Tool Selection Strategy

| Task Type | Tool | When to Use |
|-----------|------|-------------|
| Simple changes | Native reasoning | Most day-to-day tasks |
| Complex architecture | Sequential MCP (sparingly) | Multi-layer design decisions |
| Official docs | Context7 MCP | React Native, Expo, library APIs |
| Internal patterns | @docs/ folder | Project-specific conventions |
| Multi-file edits | Parallel operations | Independent file changes |
| Validation | Bash | After every code change |

---

### Complete Development Example

```typescript
// EXAMPLE: Adding a new feature

// 1. PRE-ANALYSIS
git status && git branch  // ✅ On feature branch
bun typecheck && bun lint // ✅ No existing errors

// 2. PLAN with TodoWrite
TodoWrite({
  todos: [
    { content: "Create Media entity", status: "in_progress", activeForm: "Creating Media entity" },
    { content: "Define IMediaRepository interface", status: "pending", activeForm: "Defining IMediaRepository interface" },
    { content: "Implement MediaRepository", status: "pending", activeForm: "Implementing MediaRepository" },
    { content: "Create GetMediaDetailsUseCase", status: "pending", activeForm: "Creating GetMediaDetailsUseCase" },
    { content: "Validate with typecheck and lint", status: "pending", activeForm: "Validating with typecheck and lint" }
  ]
})

// 3. EXECUTE
// Create entity
Write({ file_path: '/src/domain/entities/Media.ts', content: '...' })

// Validate immediately
execAsync('bun typecheck && bun lint')
// ✅ Passes

// Mark todo complete, move to next
TodoWrite({
  todos: [
    { content: "Create Media entity", status: "completed", activeForm: "Creating Media entity" },
    { content: "Define IMediaRepository interface", status: "in_progress", activeForm: "Defining IMediaRepository interface" },
    // ... rest
  ]
})

// Continue with next task
Write({ file_path: '/src/domain/repositories/IMediaRepository.ts', content: '...' })

// Validate immediately
execAsync('bun typecheck && bun lint')
// ❌ Type error: Missing import

// FIX properly (don't use @ts-ignore)
Edit({
  file_path: '/src/domain/repositories/IMediaRepository.ts',
  old_string: 'export interface IMediaRepository',
  new_string: 'import { Media } from "@/src/domain/entities/Media"\n\nexport interface IMediaRepository'
})

// RE-VALIDATE
execAsync('bun typecheck && bun lint')
// ✅ Passes

// 4. FINAL VALIDATION
execAsync('bun typecheck && bun lint')
// ✅ All checks pass

// 5. MARK ALL COMPLETE
TodoWrite({
  todos: [
    { content: "Create Media entity", status: "completed", activeForm: "Creating Media entity" },
    { content: "Define IMediaRepository interface", status: "completed", activeForm: "Defining IMediaRepository interface" },
    { content: "Implement MediaRepository", status: "completed", activeForm: "Implementing MediaRepository" },
    { content: "Create GetMediaDetailsUseCase", status: "completed", activeForm: "Creating GetMediaDetailsUseCase" },
    { content: "Validate with typecheck and lint", status: "completed", activeForm: "Validating with typecheck and lint" }
  ]
})
```

---

### Common Validation Failures & Proper Fixes

**Type Error: Property doesn't exist**
```typescript
// ❌ WRONG - Using @ts-ignore
// @ts-ignore
const name = user.name

// ✅ CORRECT - Optional chaining
const name = user?.name ?? 'Unknown'
```

**ESLint Error: Unused variable**
```typescript
// ❌ WRONG - Disable ESLint
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unused = getValue()

// ✅ CORRECT - Remove or use the variable
// Option 1: Remove if truly unused
// Option 2: Prefix with underscore if intentionally unused
const _unused = getValue()
```

**Type Error: Implicit any**
```typescript
// ❌ WRONG - Use any type
const data: any = await fetchData()

// ✅ CORRECT - Define proper type
interface ApiResponse {
  id: string
  name: string
}
const data: ApiResponse = await fetchData()
```

---

### Best Practices

**✅ DO:**
- Run `bun typecheck && bun lint` after every code change
- Fix validation errors properly at the root cause
- Use TodoWrite for tasks with >3 steps
- Check @docs/ folder before searching external docs
- Use proper TypeScript types, never `any`
- Follow ESLint rules, don't disable them
- Create feature branches for all work
- Mark todos as complete immediately after finishing

**❌ DON'T:**
- Skip validation to save time
- Use @ts-ignore or @ts-expect-error as shortcuts
- Disable ESLint rules to bypass errors
- Use `any` type to avoid type errors
- Work directly on main/master branch
- Leave validation until the end
- Batch multiple todo completions
- Take shortcuts to make tests pass

---

## Critical Development Standards

### Required Import Pattern

**ALWAYS use @ imports for internal modules:**

```typescript
// ✅ CORRECT - @ imports for all internal modules
import { useTheme } from '@/src/presentation/shared/ui'
import { container } from '@/src/infrastructure/di/container'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { User } from '@/src/domain/entities/User'

// ❌ FORBIDDEN - Relative imports
import { useTheme } from '../../../shared/ui'
import { container } from '../../infrastructure/di/container'
```

**Benefits:**
- Clear module boundaries
- Easy refactoring
- No brittle relative paths
- Better IDE autocomplete

---

### Required Validation Gates

**MUST PASS before any commit or task completion:**

```bash
# Critical validation command
bun typecheck && bun lint

# Auto-fix when possible
bun lint --fix

# Verify fixes are correct
bun typecheck && bun lint
```

**Never:**
- Use `@ts-ignore` or `@ts-expect-error` to bypass errors
- Use `any` type to avoid type checking
- Disable ESLint rules without justification
- Skip validation to save time

---

### Native React Native Components (ENFORCED)

**Only use React Native primitives - NO external UI libraries:**

```typescript
// ✅ ALLOWED - Native React Native components
import { View, Text, Pressable, ScrollView, FlatList } from 'react-native'

// ❌ FORBIDDEN - External UI libraries
import { Button } from 'react-native-elements'
import { Card } from 'react-native-paper'
import { Input } from '@rneui/themed'
```

---

### Theme System with Unistyles

**Use Unistyles for centralized theming:**

```typescript
// ✅ CORRECT - Unistyles with theme
import { createStyleSheet, useStyles } from 'react-native-unistyles'

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  const { styles, theme } = useStyles(stylesheet)

  return (
    <Pressable
      style={styles.button(variant)}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const stylesheet = createStyleSheet((theme) => ({
  button: (variant: string) => ({
    backgroundColor: variant === 'primary'
      ? theme.colors.primary
      : theme.colors.secondary,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
  }),
  text: {
    color: theme.colors.textInverse,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  }
}))
```

**Theme structure:**
```typescript
export const lightTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    text: '#000000',
    textInverse: '#FFFFFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    body: { fontSize: 16, lineHeight: 24 },
    heading: { fontSize: 24, lineHeight: 32 },
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
  }
}
```

---

### UI Component Standards

**Follow Atomic Design principles:**

```
src/presentation/shared/ui/
├── atoms/        # Button, Input, Text, Switch
├── molecules/    # FormField, Card, ListItem
└── organisms/    # Form, Section, Header
```

**Example: Button Component (Atom)**

```typescript
import React from 'react'
import { Pressable, Text, ActivityIndicator } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

export const Button: React.FC<ButtonProps> = observer(({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
}) => {
  const { styles, theme } = useStyles(stylesheet)

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button(variant, size, fullWidth),
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
        <ActivityIndicator color={theme.colors.textInverse} />
      ) : (
        <Text style={styles.text(size)}>{title}</Text>
      )}
    </Pressable>
  )
})

const stylesheet = createStyleSheet((theme) => ({
  button: (variant: string, size: string, fullWidth: boolean) => ({
    backgroundColor:
      variant === 'primary' ? theme.colors.primary :
      variant === 'secondary' ? theme.colors.secondary :
      'transparent',
    borderWidth: variant === 'outline' ? 1 : 0,
    borderColor: variant === 'outline' ? theme.colors.primary : 'transparent',
    borderRadius: theme.radius.md,
    paddingVertical:
      size === 'sm' ? theme.spacing.xs :
      size === 'lg' ? theme.spacing.md :
      theme.spacing.sm,
    paddingHorizontal:
      size === 'sm' ? theme.spacing.sm :
      size === 'lg' ? theme.spacing.lg :
      theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : 'auto',
  }),
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: (size: string) => ({
    color: theme.colors.textInverse,
    fontSize:
      size === 'sm' ? theme.typography.body.fontSize - 2 :
      size === 'lg' ? theme.typography.body.fontSize + 2 :
      theme.typography.body.fontSize,
    fontWeight: '600',
  }),
}))
```

**Example: Card Component (Molecule)**

```typescript
import React from 'react'
import { View, Pressable } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { observer } from '@legendapp/state/react'

interface CardProps {
  children: React.ReactNode
  variant?: 'elevated' | 'outlined' | 'filled'
  onPress?: () => void
}

export const Card: React.FC<CardProps> = observer(({
  children,
  variant = 'elevated',
  onPress,
}) => {
  const { styles } = useStyles(stylesheet)
  const Component = onPress ? Pressable : View

  return (
    <Component
      style={({ pressed }) => [
        styles.card(variant),
        onPress && pressed && styles.pressed,
      ]}
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
    >
      {children}
    </Component>
  )
})

const stylesheet = createStyleSheet((theme) => ({
  card: (variant: string) => ({
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    ...(variant === 'elevated' && {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    }),
    ...(variant === 'outlined' && {
      borderWidth: 1,
      borderColor: theme.colors.border,
    }),
  }),
  pressed: {
    opacity: 0.95,
  },
}))
```

---

### Internationalization (i18n)

**NO hardcoded text - always use translation keys:**

```typescript
import { useTranslation } from '@/src/presentation/shared/i18n'

// ✅ CORRECT - Translation keys with snake_case
const { t } = useTranslation()
<Text>{t('settings.theme.dark_mode')}</Text>
<Text>{t('settings.display.font_size')}</Text>

// ❌ FORBIDDEN - Hardcoded text
<Text>Dark Mode</Text>
<Text>Font Size</Text>
```

**Translation structure:**
```typescript
// translations/en.ts
export const en = {
  settings: {
    theme: {
      dark_mode: 'Dark Mode',
      light_mode: 'Light Mode',
      system_default: 'System Default',
    },
    display: {
      font_size: 'Font Size',
      compact_mode: 'Compact Mode',
    }
  }
}
```

---

### Design System Reference

**Check @designs/ folder for:**
- UI component designs and specifications
- Layout patterns and spacing
- Color schemes and theming
- Typography scales
- Animation patterns
- User flow mockups

**Also reference:**
- `@docs/atomic-design-system.md` - Component architecture
- `@docs/documentation/unistyles.md` - Theme system patterns
- https://www.unistyl.es/llms-full.txt - Unistyles official docs

---

### Accessibility Requirements

**All interactive components MUST have:**

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

**Minimum touch target: 44pt**

```typescript
const stylesheet = createStyleSheet((theme) => ({
  button: {
    minHeight: 44,
    minWidth: 44,
    // ... rest of styles
  }
}))
```

---

### State Management Patterns

**Legend State for reactive UI:**

```typescript
import { observable } from '@legendapp/state'
import { observer } from '@legendapp/state/react'

// Feature store
export const search$ = observable({
  query: '',
  isLoading: false,
  results: [] as Media[],
})

// Component
export const SearchScreen = observer(() => {
  const query = search$.query.get()

  return (
    <Input
      value={query}
      onChangeText={(text) => search$.query.set(text)}
    />
  )
})
```

**TanStack Query for API caching:**

```typescript
import { useQuery } from '@tanstack/react-query'

export const useMediaDetails = (mediaId: string) => {
  return useQuery({
    queryKey: ['media', mediaId],
    queryFn: () => getMediaDetailsUseCase.execute(mediaId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Usage
const { data: media, isLoading } = useMediaDetails(id)
```

---

### Performance Optimization

**Use Legend List for virtualized lists:**

```typescript
import { List } from '@legendapp/list'

// ✅ CORRECT - Virtualized list
<List
  data={items}
  renderItem={({ item }) => <MediaCard media={item} />}
  estimatedItemSize={200}
/>

// ❌ AVOID - FlatList directly (Legend List is optimized)
<FlatList
  data={items}
  renderItem={({ item }) => <MediaCard media={item} />}
/>
```

**Use Legend Motion for animations:**

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

### Error Handling Patterns

**Always check error types:**

```typescript
// ✅ CORRECT - Type-safe error handling
try {
  const result = await someOperation()
} catch (error) {
  if (error instanceof Error) {
    logger.error('Operation failed', error, { context })
  } else {
    logger.error('Unknown error', new Error(String(error)), { context })
  }
}

// ❌ WRONG - Assuming error.message exists
try {
  const result = await someOperation()
} catch (error) {
  console.log(error.message) // Type error in strict mode
}
```

---

### Quick Reference Checklist

**Before committing:**
- [ ] All imports use @ pattern
- [ ] `bun typecheck` passes
- [ ] `bun lint` passes
- [ ] No external UI libraries used
- [ ] All text uses i18n keys (snake_case)
- [ ] Components use Unistyles theme
- [ ] Accessibility props added
- [ ] Error handling is type-safe
- [ ] Complete objects passed (not just IDs)
- [ ] Services accessed via DI container

---

## Summary

This guide establishes the foundation for building a maintainable, scalable React Native application using:

- **CLEAN Architecture** for clear separation of concerns
- **Dependency Injection** for flexible service management
- **Native Components** with Unistyles theming
- **Type Safety** with TypeScript strict mode
- **Quality Gates** with automated validation
- **Agent-Driven Development** with systematic workflows

Follow these patterns consistently for efficient, high-quality development.