# State Management Strategy

## Overview

This application uses a hybrid state management approach combining **Legend State** (for persisted and reactive UI state) with **TanStack Query** (for server state management). This document explains the architecture, patterns, and best practices.

---

## Architecture Layers

### 1. Legend State (Persisted) ✅

**Files:**
- `app.store.ts` - App-wide state, user state, user preferences
- Persisted using `persistObservable` with AsyncStorage

**State Structure:**

#### `appState$` - Application Settings
```typescript
{
  locale: SupportedLocale // 'en', 'es', etc.
}
```
- **Purpose**: App-wide settings that persist across sessions
- **Persistence**: ✅ Persisted to AsyncStorage (`appState`)
- **Usage**: `appState$.locale.get()`, `setLocale('en')`

#### `userState$` - User Authentication & Profile
```typescript
{
  currentUser: User // { id, email, isAnonymous, account: { trakt?, tmdb? } }
}
```
- **Purpose**: Current user session, authentication, linked accounts
- **Persistence**: ✅ Persisted to AsyncStorage (`userState`)
- **Usage**: `userState$.currentUser.get()`, `user$.get()`

#### `userPreferences$` - User Preferences & Provider Configs
```typescript
{
  ui: {
    theme: 'light' | 'dark' | 'system',
    gridViewMode: 'compact' | 'comfortable' | 'cozy',
    autoplayTrailers: boolean
  },
  tmdb: {
    apiKey: string,
    baseURL: string,
    imageBaseURL: string,
    language: string,
    region: string
  },
  trakt: {
    clientId: string,
    clientSecret: string,
    redirectUri: string
  },
  stremio: {
    transportUrl: string
  }
}
```
- **Purpose**: User-specific settings, provider configurations
- **Persistence**: ✅ Persisted to AsyncStorage (`userPreferences`)
- **Usage**: `userPreferences$.ui.theme.get()`, `tmdbConfig$.get()`

---

### 2. Legend State (Transient) ⚡

**Files:**
- `stremioAddons.store.ts` - Runtime cache of installed addons
- `oauth.store.ts` - OAuth flow state (CSRF protection)

**State Structure:**

#### `stremioAddons$` - Stremio Addons Cache (Runtime Only)
```typescript
{
  installed: StremioAddon[], // Loaded from StremioAddonStorage on mount
  browsing: StremioAddon[],  // Addons from catalog being browsed
  isLoading: boolean,        // Manual loading state (catalog browsing)
  error: string | null       // Manual error state (catalog browsing)
}
```
- **Purpose**: Runtime cache synced from TanStack Query/Infrastructure
- **Persistence**: ❌ **NOT persisted** (source of truth is `StremioAddonStorage`)
- **Why Transient**:
  - Prevents class method loss on deserialization
  - Avoids conflicts with infrastructure storage
  - Single source of truth (StremioAddonStorage)
  - Proper provider integration via StremioAddonRegistry
- **Usage**: `useSelector(() => stremioAddons$.installed.get())`

#### `oauthState$` - OAuth Flow State
```typescript
{
  pendingState: string | null // CSRF protection state
}
```
- **Purpose**: Temporary OAuth flow state for CSRF validation
- **Persistence**: ❌ **NOT persisted** (transient flow state)
- **Usage**: `setPendingOAuthState(state)`, `clearOAuthState()`

---

### 3. TanStack Query (Server State) 🌐

**Files:**
- All hooks in `src/features/settings/hooks/`
- TanStack Query client configured in DI container

**Purpose**: All API calls and server state management

**Features:**
- Automatic caching with configurable stale times
- Built-in loading/error states via `isPending`, `isError`, `error`
- Query invalidation for automatic refetch after mutations
- Request deduplication and background refetching

**Usage Patterns:**

#### Queries (Data Fetching)
```typescript
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['stremio-addons', userId],
  queryFn: () => getInstalledAddonsUseCase.execute(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
})
```

#### Mutations (Data Modification)
```typescript
const installMutation = useMutation({
  mutationFn: (manifestUrl: string) =>
    installAddonUseCase.execute(userId, manifestUrl),
  onSuccess: () => {
    // Update Legend State if needed
    queryClient.invalidateQueries({ queryKey: ['stremio-addons'] })
  }
})

// Usage
await installMutation.mutateAsync(manifestUrl)
const isLoading = installMutation.isPending
```

---

## Hook Analysis

### ✅ useTMDBAccount
**State Management:**
- ✅ Uses `useMutation` for validation operations
- ✅ Reads from `userPreferences$.tmdb` (persisted Legend State)
- ✅ Updates persisted state via setter functions
- ✅ No duplicate loading/error states

**Pattern:**
- Configuration stored in Legend State (persisted)
- API calls use TanStack Query mutations
- Immediate UI reactivity via Legend State observers

---

### ✅ useTraktAccount
**State Management:**
- ✅ Uses `useMutation` for connect/disconnect/refresh operations
- ✅ Reads from `userState$.currentUser.account.trakt` (persisted)
- ✅ Local `useState` only for OAuth-specific error messages (not covered by mutations)
- ✅ Combined loading state: `connectMutation.isPending || disconnectMutation.isPending || refreshTokenMutation.isPending`
- ✅ No duplicate server state

**Pattern:**
- OAuth flow partially handled outside mutations (WebBrowser interaction)
- Mutations handle token exchange, disconnect, refresh
- Loading state properly derived from mutations

---

### ⚠️ useStremioAddons
**State Management:**
- ✅ No manual loading/error states in hook
- ✅ Uses `stremioAddons$` transient store for reactive UI updates
- ❌ **Manual state management** in hook (should use TanStack Query)

**Current Pattern:**
```typescript
// Manual state updates
stremioAddons$.isLoading.set(true)
const addons = await addonsUseCase.getInstalledAddons(userId)
stremioAddons$.installed.set(addons)
stremioAddons$.isLoading.set(false)
```

**Improvement Opportunity:**
```typescript
// Should use TanStack Query for server operations
const { data: installedAddons, isLoading, refetch } = useQuery({
  queryKey: ['stremio-addons', userId],
  queryFn: () => addonsUseCase.getInstalledAddons(userId),
  staleTime: 5 * 60 * 1000,
})

// Sync to Legend State for reactive UI (if needed)
useEffect(() => {
  if (installedAddons) {
    stremioAddons$.installed.set(installedAddons)
  }
}, [installedAddons])
```

---

### ⚠️ useStremioAddonCatalog
**State Management:**
- ✅ No manual loading/error states in hook
- ✅ Uses `stremioAddons$.browsing` for catalog browsing state
- ❌ **Manual state management** in hook (should use TanStack Query)

**Current Pattern:**
```typescript
// Manual state updates
stremioAddons$.isLoading.set(true)
const addons = await catalogUseCase.browseAddonCatalog(catalogUrl)
stremioAddons$.browsing.set(addons)
stremioAddons$.isLoading.set(false)
```

**Note:** Catalog browsing is transient, so Legend State transient store is acceptable here. However, TanStack Query would provide better error handling and cache management.

---

### ✅ useAddonStats
**State Management:**
- ✅ Purely derived/computed state from `addonStats$` (computed from `stremioAddons$.installed`)
- ✅ No server calls, no loading states
- ✅ Reactive updates via `useSelector`

**Pattern:**
- Perfect example of derived state using Legend State `computed()`

---

### ✅ useSettings
**State Management:**
- ✅ Reads from persisted Legend State stores
- ✅ Direct setters for UI preferences
- ✅ Uses use case for cache management operations
- ✅ No duplicate states

**Pattern:**
- Configuration management with persisted state
- Simple getter/setter pattern for UI preferences

---

## Data Flow Patterns

### Pattern 1: Persisted Configuration (TMDB, Trakt Config)
```
User Input → Setter Function → Legend State (persisted) → UI Update (reactive)
                              ↓
                         API Validation (TanStack Query mutation)
```

### Pattern 2: Server Data with Transient Cache (Stremio Addons)
```
API Call (TanStack Query) → Use Case → Infrastructure Storage
                                            ↓
                              Legend State Transient (for reactivity) → UI
```

### Pattern 3: OAuth Flow
```
User Action → WebBrowser OAuth → Code → TanStack Query Mutation → Use Case
                                                                       ↓
                                                 Legend State (persisted) → UI
```

### Pattern 4: Derived State (Addon Stats)
```
Legend State (stremioAddons$.installed) → computed() → addonStats$ → UI (reactive)
```

---

## State Consistency Rules

### ✅ DO:
1. **Persist** user preferences, authentication, app settings
2. **Use TanStack Query** for all API calls and server data
3. **Use transient Legend State** only for runtime cache that needs reactivity
4. **Derive state** using `computed()` when possible
5. **Use `useSelector`** for reactive Legend State reads in components
6. **Combine loading states** from mutations: `mutation1.isPending || mutation2.isPending`
7. **Clear sources of truth**: One place owns the data

### ❌ DON'T:
1. **Persist** server data that has infrastructure storage (causes conflicts)
2. **Manually manage** loading/error states when using TanStack Query
3. **Duplicate** data in both Legend State and TanStack Query cache (choose one as source)
4. **Use `any`** type for errors
5. **Store** class instances in persisted Legend State (methods are lost)
6. **Mix** transient and persisted data in same observable

---

## Performance Optimization Checklist

### ✅ Implemented:
1. Legend State `computed()` for derived state (addon stats)
2. TanStack Query caching with stale times
3. `useSelector()` for fine-grained reactivity (only re-render on specific changes)
4. Transient stores for runtime cache (no serialization overhead)
5. AsyncStorage persistence for user data

### 🔄 Potential Improvements:
1. **useStremioAddons**: Migrate to TanStack Query for proper caching
2. **useStremioAddonCatalog**: Consider TanStack Query for catalog browsing with cache
3. **Add mutation error states**: Return `mutation.error` instead of local useState for errors
4. **Query stale times**: Review and configure per-resource:
   - User profile: 10 minutes
   - Addon list: 5 minutes
   - Catalog browsing: 1 minute (more dynamic)

---

## Race Condition Prevention

### Current Safeguards:
1. **OAuth CSRF Protection**: `pendingState` validation in `oauthState$`
2. **TanStack Query Request Deduplication**: Automatic (same queryKey = single request)
3. **Mutation onSuccess**: State updates only after successful API call
4. **useEffect Cleanup**: Proper cleanup in `useStremioAddons` initialization

### Potential Issues:
1. **Manual state updates** in `useStremioAddons` could race with TanStack Query if both are used
   - **Solution**: Migrate fully to TanStack Query or keep purely transient

---

## Testing Strategy

### Unit Tests:
- Test Legend State computeds independently
- Test use cases with mocked repositories
- Test mutation success/error handling

### Integration Tests:
- Test Legend State persistence/hydration
- Test TanStack Query cache invalidation
- Test state synchronization between Legend State and TanStack Query

---

## Migration Path (Optional Future Work)

### Phase 1: ✅ Completed (Phase 2 in refactoring plan)
- Migrate `useTraktAccount` to TanStack Query mutations
- Migrate `useTMDBAccount` to TanStack Query mutations

### Phase 2: 🔄 Optional (If needed for better patterns)
- Migrate `useStremioAddons` to TanStack Query for installed addons
- Keep transient Legend State for UI reactivity (sync from query)
- Consider TanStack Query for catalog browsing in `useStremioAddonCatalog`

---

## Summary

### State Ownership Matrix

| State Type | Owner | Persistence | Reactivity | Example |
|------------|-------|-------------|------------|---------|
| User Auth | Legend State | ✅ Persisted | ✅ Reactive | `userState$.currentUser` |
| User Preferences | Legend State | ✅ Persisted | ✅ Reactive | `userPreferences$.ui.theme` |
| App Settings | Legend State | ✅ Persisted | ✅ Reactive | `appState$.locale` |
| OAuth Flow State | Legend State | ❌ Transient | ✅ Reactive | `oauthState$.pendingState` |
| Stremio Addons | Infrastructure + Legend State | ❌ Transient | ✅ Reactive | `stremioAddons$.installed` |
| Addon Stats | Legend State `computed()` | ❌ Derived | ✅ Reactive | `addonStats$` |
| API Operations | TanStack Query | ❌ Transient Cache | ✅ Via hooks | `useMutation`, `useQuery` |

### Key Principles:
1. **Legend State Persisted**: User data that survives restarts
2. **Legend State Transient**: Runtime cache for UI reactivity (synced from server/infrastructure)
3. **TanStack Query**: Server state with automatic caching, loading, error management
4. **Computed**: Derived state from other observables
5. **Single Source of Truth**: Clear ownership for each piece of data

---

## Questions? Common Scenarios

### Q: Should I use Legend State or TanStack Query for API data?
**A:** TanStack Query for server operations. Optionally sync to transient Legend State if you need fine-grained reactivity.

### Q: When should I persist state?
**A:** Only for user preferences, authentication, and app settings that should survive app restarts.

### Q: How do I handle loading states?
**A:** Use TanStack Query's `isPending` and `isError`. Combine multiple mutations: `mutation1.isPending || mutation2.isPending`.

### Q: Should I store class instances in Legend State?
**A:** Only in **transient** state. Never persist class instances (methods are lost on deserialization).

### Q: How do I prevent race conditions?
**A:** Use TanStack Query (built-in deduplication), mutation `onSuccess` callbacks, and CSRF tokens for OAuth flows.

---

**Last Updated:** Phase 4 - State Management Optimization (2025)
