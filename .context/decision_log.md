# Decision Log

This file records architectural and implementation decisions for the VNYL project.

2025-10-03 16:24:39 - Decision log initialized.

---

## Architectural Decisions

### [2025-10-03 16:24:39] - CLEAN Architecture Pattern Adoption

**Decision:** Implement strict 3-layer CLEAN Architecture (Domain → Infrastructure → Presentation)

**Rationale:**
- Enforces clear separation of concerns
- Makes business logic testable and framework-independent
- Enables flexible infrastructure swapping (e.g., changing HTTP clients, storage solutions)
- Aligns with enterprise-grade mobile app best practices
- Facilitates parallel team development

**Implementation Details:**
- Domain layer contains pure business logic with zero external dependencies
- Infrastructure implements Domain contracts (repositories, services)
- Presentation consumes Domain through Dependency Injection
- All layers communicate through interfaces, not concrete implementations

**Impact:**
- Increased initial development time for proper abstraction
- Reduced technical debt and maintenance costs long-term
- Better testability and code quality

---

### [2025-10-03 16:24:39] - Dependency Injection Container Pattern

**Decision:** Use custom DI container with Symbol-based tokens for service resolution

**Rationale:**
- Avoids tight coupling between layers
- Enables easy mocking for unit tests
- Provides single source of truth for service instances
- TypeScript-friendly with Symbol tokens for type safety
- Lightweight compared to full DI frameworks

**Implementation Details:**
- Container class with `register()` and `resolve()` methods
- Symbol tokens defined in `infrastructure/di/tokens.ts`
- Services registered at app startup via `initializeContainer()`
- React hook `useService()` for component-level access

**Impact:**
- All service instantiation flows through container
- NO direct `new ServiceClass()` calls in codebase
- Must register services before app renders

---

### [2025-10-03 16:24:39] - Unistyles for Theme System

**Decision:** Use react-native-unistyles 3.0.13 for centralized theming

**Rationale:**
- Type-safe theme consumption
- Runtime theme switching (light/dark mode)
- Responsive breakpoints for adaptive layouts
- Performance-optimized with StyleSheet compilation
- Better DX than manual StyleSheet management

**Implementation Details:**
- Domain theme tokens (colors, spacing, typography) defined separately
- Presentation layer consumes theme via Unistyles
- Theme configuration in `presentation/theme/unistyles.ts`
- Supports light/dark mode with consistent design tokens

**Impact:**
- All components must use Unistyles hooks for styling
- No hardcoded colors or spacing values
- Theme changes propagate automatically across app

---

### [2025-10-03 16:24:39] - Native React Native Components Only

**Decision:** Build custom UI component library using ONLY React Native primitives

**Rationale:**
- Full control over component behavior and styling
- No dependency on third-party UI libraries
- Consistent with VNYL design requirements
- Better performance (no library overhead)
- Atomic Design methodology for scalability

**Implementation Details:**
- Atomic Design structure: atoms → molecules → organisms
- Base primitives: View, Text, Pressable, ScrollView, FlatList
- Custom implementations of Button, Input, Switch, etc.
- All components follow accessibility guidelines

**Impact:**
- More upfront development time to build components
- Complete design system ownership
- No breaking changes from external libraries

---

### [2025-10-03 16:24:39] - Legend State Ecosystem (Planned)

**Decision:** Adopt Legend State for reactive state management (NOT YET INSTALLED)

**Rationale:**
- Fine-grained reactivity with observables
- Excellent performance characteristics
- TypeScript-first design
- Persistence support out of the box
- Includes Motion (animations) and List (virtualization)

**Implementation Details (When Installed):**
- Feature stores for screen-specific state
- Global stores for app-wide state
- TanStack Query for server state
- Legend Motion for animations
- Legend List for virtualized lists

**Impact:**
- State management will be centralized and predictable
- Reduced re-renders with fine-grained subscriptions
- Ecosystem integration (State + Motion + List)

---

### [2025-10-03 16:24:39] - Expo Router File-Based Routing

**Decision:** Use Expo Router 6.0.10 for navigation with native tabs

**Rationale:**
- File system reflects app structure
- Type-safe navigation with automatic route typing
- Native tab bar implementation
- Deep linking support built-in
- Simplified navigation architecture

**Implementation Details:**
- Routes defined in `src/app/` directory structure
- Native tabs configured in `_layout.tsx`
- Four main tabs: Home, Search, Library, Settings
- Each tab has its own `_layout.tsx` for nested navigation

**Impact:**
- Navigation structure is immediately clear from file system
- Type safety prevents route naming errors
- Native platform UI for better UX

---

### [2025-10-03 16:24:39] - Bun Package Manager

**Decision:** Use Bun as package manager instead of npm/yarn

**Rationale:**
- Significantly faster install and run times
- Built-in TypeScript support
- Compatible with npm ecosystem
- Modern tooling with better DX
- Native test runner

**Implementation Details:**
- All package operations use `bun` command
- `bun.lock` for dependency locking
- Scripts in `package.json` use bun

**Impact:**
- Team must have Bun installed
- Faster CI/CD pipeline
- Improved development workflow speed

---

### [2025-10-03 16:24:39] - Stremio Integration Strategy (Planned)

**Decision:** Multi-addon aggregation with fault tolerance

**Rationale:**
- Users can install multiple Stremio addons
- Provides diverse content sources
- Enables community-driven extensibility
- Aligns with Stremio's decentralized philosophy
- Primary value proposition for stream discovery

**Implementation Details (Planned):**
- Separate domain for Stremio entities (Addon, Stream, Catalog)
- Repository pattern for addon management
- Circuit breaker pattern for unreliable addons
- Stream quality ranking algorithm
- Parallel queries with timeout handling

**Impact:**
- Complex error handling required
- Network resilience critical
- User addon management UI needed

---

2025-10-03 16:24:39 - Core architectural decisions documented.

---

### [2025-10-03 16:59:09] - Provider-Capability Architecture Pattern

**Decision:** Implement runtime provider registry with capability-based resolution and automatic fallback

**Rationale:**
- Maximum flexibility for adding new content sources (TMDB, Trakt, Stremio addons)
- Per-capability provider preferences enable fine-grained user control
- Automatic fallback ensures resilience when providers fail
- Each Stremio addon registers as independent provider with subset of capabilities
- Consistent domain entities via provider-specific mappers
- Plugin architecture enables community extensions

**Implementation Details:**

**Capability Interfaces** (Domain Layer):
```typescript
// src/domain/capabilities/
- IMediaMetadataCapability: get detailed media information
- IMediaCatalogsCapability: browse media by category
- IMediaSearchCapability: search for media content
- IMediaStreamsCapability: resolve playable stream URLs
- IMediaSubtitlesCapability: get subtitle files
- IPeopleMetadataCapability: get person information
- IPeopleSearchCapability: search for people
- IMediaListsCapability: get curated media lists
- IExternalIdsCapability: cross-reference between services
```

**Provider System** (Infrastructure Layer):
```typescript
interface IProvider {
  id: string
  name: string
  capabilities: CapabilityType[]
  priority: number
  isEnabled: boolean
}

interface IProviderRegistry {
  registerProvider(provider: IProvider): void
  getProvidersForCapability<T>(capability: CapabilityType): T[]
  getProviderById(id: string): IProvider | null
}
```

**Provider Implementations:**
- `TMDBProvider`: Static provider for media_metadata, media_catalogs, media_search, images, people_metadata
- `TraktProvider`: Static provider for media_lists, media_metadata, ratings
- `StremioAddonProvider`: Dynamic providers (one per installed addon) for media_streams, media_subtitles, stremio_addon_catalogs

**User Preferences:**
```typescript
interface ProviderPreferences {
  // Per-capability provider priorities
  media_metadata: string[]  // ['tmdb', 'trakt']
  media_streams: string[]   // ['addon_1', 'addon_2']
  // Fallback enabled by default
  enableFallback: boolean
}
```

**Use Case Resolution Pattern:**
```typescript
class GetMediaMetadataUseCase {
  constructor(
    private registry: IProviderRegistry,
    private preferences: UserPreferences
  ) {}
  
  async execute(mediaId: string): Promise<Media> {
    const providers = this.registry.getProvidersForCapability<IMediaMetadataCapability>('media_metadata')
    const preferredOrder = this.preferences.getProviderOrder('media_metadata')
    const sortedProviders = this.sortByPreference(providers, preferredOrder)
    
    // Automatic fallback
    for (const provider of sortedProviders) {
      try {
        return await provider.getMediaMetadata(mediaId)
      } catch (error) {
        this.logger.warn(`Provider ${provider.id} failed, trying next...`)
        continue
      }
    }
    
    throw new NotFoundError('No provider could resolve media metadata')
  }
}
```

**Stremio Addon Dynamic Registration:**
```typescript
// On app startup or when user installs addon:
const manifest = await fetchAddonManifest(addonUrl)
const addonProvider = new StremioAddonProvider(manifest, addonUrl)
providerRegistry.registerProvider(addonProvider)
// Addon capabilities determined from manifest.resources
```

**Impact:**
- Highly extensible architecture enabling unlimited content sources
- Complex fallback and error handling logic required
- Provider registry must be initialized before any use case execution
- Mappers ensure consistent domain entities across heterogeneous provider data formats
- Enables A/B testing different providers for same capability
- Future-proof for adding new capabilities and providers
