# Stremio Catalog Diagnostic Script

Standalone diagnostic tool that inspects storage and identifies why Stremio catalogs aren't showing up on the homescreen.

## Features

- No React Native dependencies - runs standalone with Bun
- Reads storage dump from JSON file
- Fetches addon manifests from remote URLs
- Validates stableId format and compares with user preferences
- Identifies catalog ID mismatches and capability issues

## Usage

### Step 1: Create Storage Dump

Add this code to any screen in your app (e.g., Settings screen):

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage'

const dumpStorage = async () => {
  const keys = await AsyncStorage.getAllKeys()
  const items = await AsyncStorage.multiGet(keys)
  const data = Object.fromEntries(items)
  console.log(JSON.stringify(data, null, 2))
}

// Add button to trigger dump
<Button title="Dump Storage" onPress={dumpStorage} />
```

### Step 2: Save Storage Dump

1. Run the app and tap "Dump Storage"
2. Copy the console output (should be JSON)
3. Save to `scripts/storage-dump.json`

### Step 3: Run Diagnostic Script

```bash
# Default: looks for scripts/storage-dump.json
bun run scripts/test-stremio-catalogs.ts

# Custom path:
bun run scripts/test-stremio-catalogs.ts /path/to/storage.json
```

## Output

The script will:

1. List all storage keys
2. Check installed Stremio addons
3. Fetch addon manifests from remote URLs
4. Generate expected catalog stableIds
5. Compare with user preferences
6. Identify mismatches and issues

## Example Output

```
🔍 Starting Stremio Catalog Diagnostics (Standalone Mode)...

🔑 === ALL STORAGE KEYS ===
Total keys: 5

📺 Stremio-related keys:
   - stremio_user_preferences_anonymous-user-abc123

👤 User-related keys:
   - user_preferences

🔍 === STREMIO ADDON STORAGE CHECK ===

📂 Found Stremio storage key: stremio_user_preferences_anonymous-user-abc123
   User ID: anonymous-user-abc123

📦 Storage Data:
   Total Addons: 2
   Enabled Addons: 2

📺 Installed Addons:
   ✅ TMDB Catalogs (org.stremio.tmdbcatalogs)
      Transport URL: https://tmdb.addon.strem.io
      Capabilities: MEDIA_CATALOG
      Supported Types: movie, series
      Enabled: true

🌐 === ADDON MANIFEST CHECK ===

   Fetching: TMDB Catalogs
   URL: https://tmdb.addon.strem.io/manifest.json
   ✅ Manifest loaded
      Resources: catalog
      Types: movie, series
      Catalogs: 6
      Catalog Details:
         - Trending (top, type: movie)
         - Popular (popular, type: movie)

🧩 === EXPECTED CATALOG STABLE IDS ===

   Addon: TMDB Catalogs
      ✅ catalog:stremio:org.stremio.tmdbcatalogs:movie:top
      ✅ catalog:stremio:org.stremio.tmdbcatalogs:movie:popular

📊 Total Expected Catalog IDs: 6

🎯 === USER PREFERENCES CHECK ===

📝 Selected Catalog IDs: 8
   📺 catalog:stremio:org.stremio.tmdbcatalogs:movie:top
   🎬 catalog:trakt:trending:movie

⚠️  === MISMATCH ANALYSIS ===

🔍 Stremio Catalog ID Comparison:

   ✅ Perfect match! All selected Stremio catalogs are valid

✅ Diagnostics Complete

📊 SUMMARY:
   User ID: anonymous-user-abc123
   Installed Addons: 2
   Enabled Addons: 2
   Manifests Fetched: 2
   Expected Catalog IDs: 6
   Selected Catalog IDs: 8
   Catalog Order Defined: Yes
```

## Common Issues Detected

### No Addons Installed
```
❌ CRITICAL: No Stremio addons installed
   User needs to install addons from the settings screen
```

### Addons Disabled
```
❌ CRITICAL: All Stremio addons are disabled
   User needs to enable addons from the settings screen
```

### Catalog ID Mismatch
```
❌ Selected IDs NOT found in addon manifests:
      - catalog:stremio:old.addon.id:movie:top
   Possible causes:
   - Addon was uninstalled but IDs remain in preferences
   - StableId format mismatch in generation logic
```

### Missing Catalog Capability
```
⚠️  WARNING: Addons without MEDIA_CATALOG capability:
   - My Addon (com.example.addon)
     Capabilities: MEDIA_STREAMS
   Note: These addons will not provide catalogs
```

## Technical Details

### Storage Keys

- **Stremio Addons**: `stremio_user_preferences_{userId}`
- **User Preferences**: `user_preferences`

### StableId Format

```
catalog:stremio:{addonId}:{catalogType}:{catalogId}
```

Example:
```
catalog:stremio:org.stremio.tmdbcatalogs:movie:popular
```

### Expected Flow

1. Addon installed → StremioAddonStorage creates entry
2. StremioAddonRegistry registers provider
3. Provider exposes MEDIA_CATALOG capability
4. Capability generates catalogs with stableIds
5. GetHomescreenDataUseCase filters by selectedCatalogIds
6. Matching catalogs displayed on homescreen

### Debugging Checklist

- [ ] Addon installed in storage
- [ ] Addon enabled (`isEnabled: true`)
- [ ] Addon has MEDIA_CATALOG capability
- [ ] Manifest fetches successfully
- [ ] Manifest has `catalogs` array
- [ ] StableId format matches expectations
- [ ] StableId present in `selectedCatalogIds` (or empty for "show all")
- [ ] Provider registered in ProviderRegistry
- [ ] GetHomescreenDataUseCase receives catalogs

## Limitations

- Requires manual storage dump (no direct AsyncStorage access)
- Only validates storage structure and manifest data
- Does not test runtime provider initialization
- Does not test actual catalog item fetching

For runtime diagnostics, use the app's built-in logging with `setLogLevel('debug')`.