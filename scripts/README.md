# Diagnostic Scripts

## test-stremio-catalogs.ts

Comprehensive diagnostic script for testing the complete Stremio catalog flow.

### Purpose

Tests the entire Stremio catalog integration from initialization to homescreen display, helping identify issues in the catalog flow.

### What it Tests

1. **Initialization Check**
   - StremioInitializationService initialization status
   - StremioAddonRegistry active providers
   - Cache statistics

2. **Provider Registry Check**
   - All registered providers (TMDB, Trakt, Stremio)
   - Provider status (ENABLED/DISABLED/ERROR)
   - MEDIA_CATALOG capability support

3. **Catalog Metadata Check (Page 0)**
   - Fast catalog metadata fetch (no items)
   - Catalog stableIds from all providers
   - Provider capability detection

4. **Catalog Items Check (Page 1)**
   - Full catalog fetch with items
   - Item counts and sample data
   - Error handling for each catalog

5. **User Preferences Check**
   - Selected catalog IDs
   - Catalog order configuration
   - Stremio catalog selection status

6. **GetHomescreenDataUseCase Simulation**
   - Complete homescreen data fetch
   - Catalog filtering and sorting
   - Stremio catalog inclusion verification

7. **Issue Analysis**
   - Automatic detection of common issues
   - Root cause suggestions
   - Configuration validation

### Usage

```bash
# Run the diagnostic script
bun run scripts/test-stremio-catalogs.ts
```

### Example Output

```
🔍 Starting Stremio Catalog Diagnostics...

======================================================================
👤 Current User: anon_1234567890
======================================================================

🔍 === STREMIO INITIALIZATION CHECK ===
✅ StremioInitializationService initialized for user: anon_1234567890

📊 Cache Statistics:
  Manifests: { hits: 0, misses: 0, size: 0 }
  Processed Addons: { hits: 0, misses: 0, size: 0 }

🔌 === PROVIDER REGISTRY CHECK ===

📋 Total Providers: 3
  - TMDB: 1
  - Trakt: 0
  - Stremio: 2

📺 Stremio Providers:
  ✅ Cinemeta (stremio:com.linvo.cinemeta)
     Status: ENABLED
     Capabilities: MEDIA_CATALOG, MEDIA_METADATA

📚 MEDIA_CATALOG Capabilities: 3

📚 === CATALOG METADATA CHECK (Page 0) ===

Querying 3 catalog capabilities...

  ✅ tmdb: 5 catalogs
     - Popular Movies (catalog:tmdb:popular:movie:...)
     - Top Rated TV (catalog:tmdb:top_rated:tv:...)

  ✅ stremio:com.linvo.cinemeta: 2 catalogs
     - Trending Movies (catalog:stremio:com.linvo.cinemeta:...)

📊 Total Catalogs Discovered: 7

🎯 === USER PREFERENCES CHECK ===

📝 Selected Catalog IDs: 0
  ⚠️  No catalogs selected (will show all)

📊 Catalog Order: 0
  ⚠️  No custom order defined

🏠 === GET HOMESCREEN DATA USE CASE SIMULATION ===

🔄 Executing GetHomescreenDataUseCase...

📊 Results:
  Hero Items: 5
  Continue Watching: 0
  Catalogs: 7

📚 Returned Catalogs:
  🎬 Popular Movies (catalog:tmdb:popular:movie:...)
     Items: 10
  📺 Trending Movies (catalog:stremio:com.linvo.cinemeta:...)
     Items: 10

  ✅ Stremio catalogs present: 2

⚠️  === ISSUE ANALYSIS ===

✅ No critical issues detected!

======================================================================
✅ Diagnostics Complete
```

### Common Issues Detected

The script automatically identifies these common problems:

1. **No Stremio Providers Registered**
   - Possible causes: Initialization failed, no addons installed
   - Solution: Check StremioInitializationService, install addons

2. **No Catalogs Discovered**
   - Possible causes: Provider capabilities not working, manifest fetch failures
   - Solution: Check network connectivity, addon configurations

3. **Stremio Catalogs Not in Homescreen Result**
   - Possible causes: StableId mismatch, filtering logic issue
   - Solution: Check catalog filtering in GetHomescreenDataUseCase

4. **Selected Catalogs Not Returned**
   - Possible causes: StableId format mismatch, capability query failure
   - Solution: Verify stableId format consistency

### Integration with Development Workflow

Use this script to:

- **Debug catalog flow issues**: Identify where catalogs are lost in the flow
- **Verify Stremio integration**: Ensure Stremio providers are working correctly
- **Test user preferences**: Validate catalog selection and ordering
- **Validate changes**: Run after modifying catalog-related code

### Related Files

- `/src/infrastructure/services/StremioInitializationService.ts`
- `/src/infrastructure/providers/stremio/StremioAddonRegistry.ts`
- `/src/domain/use-cases/homescreen/GetHomescreenDataUseCase.ts`
- `/src/infrastructure/providers/ProviderRegistry.ts`