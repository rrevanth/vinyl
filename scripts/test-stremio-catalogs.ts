#!/usr/bin/env bun

/**
 * Standalone Stremio Catalog Diagnostic Script
 *
 * Directly inspects storage and diagnoses why Stremio catalogs aren't showing up
 * on the homescreen. No React Native dependencies.
 *
 * IMPORTANT: This script expects you to have run the app at least once to create storage.
 * It will look for storage JSON file at: storage-dump.json (created manually)
 *
 * To create storage dump from app:
 * 1. Add this to a screen:
 *    const dumpStorage = async () => {
 *      const keys = await AsyncStorage.getAllKeys()
 *      const items = await AsyncStorage.multiGet(keys)
 *      const data = Object.fromEntries(items)
 *      console.log(JSON.stringify(data, null, 2))
 *    }
 * 2. Copy the console output to scripts/storage-dump.json
 * 3. Run this script: bun run scripts/test-stremio-catalogs.ts
 *
 * Usage:
 *   bun run scripts/test-stremio-catalogs.ts [path-to-storage-dump.json]
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

// ============================================================================
// Type Definitions
// ============================================================================

interface UserInstalledAddon {
  addonId: string
  name: string
  version: string
  transportUrl: string
  installedAt: Date | string
  lastUpdated: Date | string
  isEnabled: boolean
  capabilities: string[]
  supportedTypes: string[]
  supportedIdPrefixes: string[]
  userConfig: {
    priority: number
    categories: string[]
    customName?: string
  }
}

interface StremioUserPreferences {
  installedAddons: Record<string, UserInstalledAddon>
  lastSync?: Date | string
}

interface HomescreenPreferences {
  selectedCatalogIds: string[]
  catalogOrder: string[]
  catalogCustomNames: Record<string, string>
  heroEnabled: boolean
}

interface UserPreferences {
  homescreen: HomescreenPreferences
}

interface StremioManifest {
  id: string
  name: string
  version: string
  resources: string[]
  types: string[]
  catalogs?: Array<{
    id: string
    type: string
    name: string
  }>
}

// ============================================================================
// Mock Storage (reads from JSON file)
// ============================================================================

class MockStorage {
  private data: Record<string, string> = {}

  constructor(filePath: string) {
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, 'utf-8')
      this.data = JSON.parse(content)
      console.log(`✅ Loaded storage from: ${filePath}`)
      console.log(`   Keys found: ${Object.keys(this.data).length}`)
    } else {
      console.log(`❌ Storage file not found: ${filePath}`)
      console.log(`\nTo create storage dump:`)
      console.log(`1. Add this code to a screen in your app:`)
      console.log(`   const dumpStorage = async () => {`)
      console.log(`     const keys = await AsyncStorage.getAllKeys()`)
      console.log(`     const items = await AsyncStorage.multiGet(keys)`)
      console.log(`     const data = Object.fromEntries(items)`)
      console.log(`     console.log(JSON.stringify(data, null, 2))`)
      console.log(`   }`)
      console.log(`2. Copy console output to: ${filePath}`)
      console.log(`3. Run this script again\n`)
    }
  }

  getItem(key: string): string | null {
    return this.data[key] || null
  }

  getAllKeys(): string[] {
    return Object.keys(this.data)
  }
}

// ============================================================================
// Diagnostic Functions
// ============================================================================

function listAllStorageKeys(storage: MockStorage): void {
  console.log('\n🔑 === ALL STORAGE KEYS ===')

  const keys = storage.getAllKeys()
  console.log(`\nTotal keys: ${keys.length}`)

  if (keys.length === 0) {
    console.log('⚠️  No storage keys found')
    return
  }

  const stremioKeys = keys.filter(k => k.includes('stremio'))
  const userKeys = keys.filter(k => k.includes('user') || k.includes('preferences'))
  const otherKeys = keys.filter(k => !k.includes('stremio') && !k.includes('user') && !k.includes('preferences'))

  if (stremioKeys.length > 0) {
    console.log('\n📺 Stremio-related keys:')
    stremioKeys.forEach(k => console.log(`   - ${k}`))
  }

  if (userKeys.length > 0) {
    console.log('\n👤 User-related keys:')
    userKeys.forEach(k => console.log(`   - ${k}`))
  }

  if (otherKeys.length > 0 && otherKeys.length < 20) {
    console.log('\n🔧 Other keys:')
    otherKeys.forEach(k => console.log(`   - ${k}`))
  } else if (otherKeys.length >= 20) {
    console.log(`\n🔧 Other keys: ${otherKeys.length} (too many to list)`)
  }
}

function checkStremioAddonStorage(storage: MockStorage): {
  installedCount: number
  enabledCount: number
  addons: UserInstalledAddon[]
  userIdUsed: string | null
} {
  console.log('\n🔍 === STREMIO ADDON STORAGE CHECK ===')

  // Try to find Stremio preferences key (format: stremio_user_preferences_{userId})
  const keys = storage.getAllKeys()
  const stremioKeys = keys.filter(k => k.startsWith('stremio_user_preferences_'))

  if (stremioKeys.length === 0) {
    console.log('❌ No Stremio preferences found in storage')
    console.log(`   Expected key pattern: stremio_user_preferences_{userId}`)
    console.log(`   Available keys: ${keys.join(', ')}`)
    return { installedCount: 0, enabledCount: 0, addons: [], userIdUsed: null }
  }

  // Use first matching key
  const stremioKey = stremioKeys[0]
  const userId = stremioKey.replace('stremio_user_preferences_', '')
  console.log(`\n📂 Found Stremio storage key: ${stremioKey}`)
  console.log(`   User ID: ${userId}`)

  const data = storage.getItem(stremioKey)
  if (!data) {
    console.log('❌ Storage key exists but contains no data')
    return { installedCount: 0, enabledCount: 0, addons: [], userIdUsed: userId }
  }

  try {
    const prefs: StremioUserPreferences = JSON.parse(data)
    const addons = Object.values(prefs.installedAddons)
    const enabledAddons = addons.filter(a => a.isEnabled)

    console.log(`\n📦 Storage Data:`)
    console.log(`   Total Addons: ${addons.length}`)
    console.log(`   Enabled Addons: ${enabledAddons.length}`)

    if (addons.length > 0) {
      console.log('\n📺 Installed Addons:')
      for (const addon of addons) {
        const statusEmoji = addon.isEnabled ? '✅' : '⏸️'
        console.log(`   ${statusEmoji} ${addon.name} (${addon.addonId})`)
        console.log(`      Transport URL: ${addon.transportUrl}`)
        console.log(`      Capabilities: ${addon.capabilities.join(', ') || 'none'}`)
        console.log(`      Supported Types: ${addon.supportedTypes.join(', ') || 'none'}`)
        console.log(`      Enabled: ${addon.isEnabled}`)
      }
    }

    return {
      installedCount: addons.length,
      enabledCount: enabledAddons.length,
      addons: enabledAddons,
      userIdUsed: userId,
    }
  } catch (error) {
    console.error('❌ Failed to parse Stremio storage:', error)
    return { installedCount: 0, enabledCount: 0, addons: [], userIdUsed: userId }
  }
}

async function fetchAddonManifests(addons: UserInstalledAddon[]): Promise<Map<string, StremioManifest>> {
  console.log('\n🌐 === ADDON MANIFEST CHECK ===')

  const manifests = new Map<string, StremioManifest>()

  for (const addon of addons) {
    try {
      console.log(`\n   Fetching: ${addon.name}`)
      console.log(`   URL: ${addon.transportUrl}/manifest.json`)

      const response = await fetch(`${addon.transportUrl}/manifest.json`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        console.log(`   ❌ HTTP ${response.status}: ${response.statusText}`)
        continue
      }

      const manifest: StremioManifest = await response.json()
      manifests.set(addon.addonId, manifest)

      console.log(`   ✅ Manifest loaded`)
      console.log(`      Resources: ${manifest.resources?.join(', ') || 'none'}`)
      console.log(`      Types: ${manifest.types?.join(', ') || 'none'}`)
      console.log(`      Catalogs: ${manifest.catalogs?.length || 0}`)

      if (manifest.catalogs && manifest.catalogs.length > 0) {
        console.log(`      Catalog Details:`)
        for (const catalog of manifest.catalogs) {
          console.log(`         - ${catalog.name} (${catalog.id}, type: ${catalog.type})`)
        }
      }
    } catch (error) {
      console.log(`   ❌ Failed to fetch manifest:`, error instanceof Error ? error.message : String(error))
    }
  }

  console.log(`\n📊 Manifests loaded: ${manifests.size}/${addons.length}`)

  return manifests
}

function generateExpectedCatalogStableIds(
  addons: UserInstalledAddon[],
  manifests: Map<string, StremioManifest>
): string[] {
  console.log('\n🧩 === EXPECTED CATALOG STABLE IDS ===')

  const stableIds: string[] = []

  for (const addon of addons) {
    const manifest = manifests.get(addon.addonId)
    if (!manifest || !manifest.catalogs) {
      console.log(`   ⚠️  No catalogs for addon: ${addon.name}`)
      continue
    }

    console.log(`\n   Addon: ${addon.name}`)
    for (const catalog of manifest.catalogs) {
      // Stable ID format: catalog:stremio:{addonId}:{catalogType}:{catalogId}
      const stableId = `catalog:stremio:${addon.addonId}:${catalog.type}:${catalog.id}`
      stableIds.push(stableId)
      console.log(`      ✅ ${stableId}`)
    }
  }

  console.log(`\n📊 Total Expected Catalog IDs: ${stableIds.length}`)

  return stableIds
}

function checkUserPreferences(storage: MockStorage): {
  selectedCatalogIds: string[]
  catalogOrder: string[]
} {
  console.log('\n🎯 === USER PREFERENCES CHECK ===')

  const data = storage.getItem('user_preferences')

  if (!data) {
    console.log('⚠️  No user preferences found in storage')
    console.log('   Expected behavior: All catalogs should be shown')
    return { selectedCatalogIds: [], catalogOrder: [] }
  }

  try {
    const prefs: UserPreferences = JSON.parse(data)
    const { selectedCatalogIds, catalogOrder } = prefs.homescreen

    console.log(`\n📝 Selected Catalog IDs: ${selectedCatalogIds.length}`)
    if (selectedCatalogIds.length > 0) {
      selectedCatalogIds.forEach((id) => {
        const isStremio = id.startsWith('catalog:stremio:')
        const emoji = isStremio ? '📺' : '🎬'
        console.log(`   ${emoji} ${id}`)
      })
    } else {
      console.log('   ⚠️  No catalogs selected (will show all)')
    }

    console.log(`\n📊 Catalog Order: ${catalogOrder.length}`)
    if (catalogOrder.length > 0) {
      catalogOrder.forEach((id, index) => {
        console.log(`   ${index + 1}. ${id}`)
      })
    } else {
      console.log('   ⚠️  No custom order defined')
    }

    return { selectedCatalogIds, catalogOrder }
  } catch (error) {
    console.error('❌ Failed to parse user preferences:', error)
    return { selectedCatalogIds: [], catalogOrder: [] }
  }
}

function analyzeMismatch(
  expectedStableIds: string[],
  selectedCatalogIds: string[],
  addons: UserInstalledAddon[]
): void {
  console.log('\n⚠️  === MISMATCH ANALYSIS ===')

  let issuesFound = false

  // Check 1: No addons installed
  if (addons.length === 0) {
    console.log('\n❌ CRITICAL: No Stremio addons installed')
    console.log('   User needs to install addons from the settings screen')
    issuesFound = true
  }

  // Check 2: No enabled addons
  const enabledCount = addons.filter(a => a.isEnabled).length
  if (enabledCount === 0) {
    console.log('\n❌ CRITICAL: All Stremio addons are disabled')
    console.log('   User needs to enable addons from the settings screen')
    issuesFound = true
  }

  // Check 3: No catalogs discovered
  if (expectedStableIds.length === 0) {
    console.log('\n❌ CRITICAL: No catalogs discovered from addon manifests')
    console.log('   Possible causes:')
    console.log('   - Addon manifests have no "catalogs" property')
    console.log('   - Manifest fetch failures')
    console.log('   - Invalid addon configurations')
    issuesFound = true
  }

  // Check 4: Catalog ID mismatch
  if (selectedCatalogIds.length > 0) {
    const selectedStremioIds = selectedCatalogIds.filter(id => id.startsWith('catalog:stremio:'))

    if (selectedStremioIds.length > 0) {
      console.log('\n🔍 Stremio Catalog ID Comparison:')

      // Find missing from expected
      const missingFromExpected = selectedStremioIds.filter(id => !expectedStableIds.includes(id))
      if (missingFromExpected.length > 0) {
        console.log('\n   ❌ Selected IDs NOT found in addon manifests:')
        missingFromExpected.forEach(id => console.log(`      - ${id}`))
        console.log('   Possible causes:')
        console.log('   - Addon was uninstalled but IDs remain in preferences')
        console.log('   - StableId format mismatch in generation logic')
        issuesFound = true
      }

      // Find missing from selected
      const missingFromSelected = expectedStableIds.filter(id => !selectedCatalogIds.includes(id))
      if (missingFromSelected.length > 0) {
        console.log('\n   ⚠️  Expected IDs NOT in selected list:')
        missingFromSelected.forEach(id => console.log(`      - ${id}`))
        console.log('   Expected behavior: These should be auto-added when addons are installed')
      }

      // Perfect match
      if (missingFromExpected.length === 0 && missingFromSelected.length === 0) {
        console.log('\n   ✅ Perfect match! All selected Stremio catalogs are valid')
      }
    }
  } else {
    console.log('\n⚠️  INFO: No catalogs selected in user preferences')
    console.log('   Expected behavior: All discovered catalogs should be shown')
  }

  // Check 5: Addon capability issues
  const addonsWithoutCatalogCapability = addons.filter(
    addon => !addon.capabilities.includes('MEDIA_CATALOG')
  )

  if (addonsWithoutCatalogCapability.length > 0) {
    console.log('\n⚠️  WARNING: Addons without MEDIA_CATALOG capability:')
    addonsWithoutCatalogCapability.forEach(addon => {
      console.log(`   - ${addon.name} (${addon.addonId})`)
      console.log(`     Capabilities: ${addon.capabilities.join(', ') || 'none'}`)
    })
    console.log('   Note: These addons will not provide catalogs')
  }

  if (!issuesFound) {
    console.log('\n✅ No critical issues detected!')
  }
}

// ============================================================================
// Main Diagnostic Flow
// ============================================================================

async function main() {
  console.log('🔍 Starting Stremio Catalog Diagnostics (Standalone Mode)...\n')
  console.log('=' .repeat(70))

  // Parse command-line argument for storage file path
  const args = process.argv.slice(2)
  const storagePath = args[0] || join(process.cwd(), 'scripts', 'storage-dump.json')

  console.log(`📂 Storage file: ${storagePath}\n`)

  // Load storage
  const storage = new MockStorage(storagePath)

  if (storage.getAllKeys().length === 0) {
    console.log('\n' + '='.repeat(70))
    console.log('❌ No storage data found. Cannot proceed.')
    console.log('='.repeat(70))
    return
  }

  try {
    // 1. List all storage keys for debugging
    listAllStorageKeys(storage)

    // 2. Check Stremio addon storage
    const { installedCount, enabledCount, addons, userIdUsed } = checkStremioAddonStorage(storage)

    if (installedCount === 0) {
      console.log('\n' + '='.repeat(70))
      console.log('❌ No Stremio addons found. Cannot proceed with further diagnostics.')
      console.log('   Please install addons from the settings screen first.')
      console.log('='.repeat(70))
      return
    }

    // 3. Fetch addon manifests
    const manifests = await fetchAddonManifests(addons)

    // 4. Generate expected catalog stable IDs
    const expectedStableIds = generateExpectedCatalogStableIds(addons, manifests)

    // 5. Check user preferences
    const { selectedCatalogIds, catalogOrder } = checkUserPreferences(storage)

    // 6. Analyze mismatches
    analyzeMismatch(expectedStableIds, selectedCatalogIds, addons)

    console.log('\n' + '='.repeat(70))
    console.log('✅ Diagnostics Complete\n')

    // Summary
    console.log('📊 SUMMARY:')
    console.log(`   User ID: ${userIdUsed}`)
    console.log(`   Installed Addons: ${installedCount}`)
    console.log(`   Enabled Addons: ${enabledCount}`)
    console.log(`   Manifests Fetched: ${manifests.size}`)
    console.log(`   Expected Catalog IDs: ${expectedStableIds.length}`)
    console.log(`   Selected Catalog IDs: ${selectedCatalogIds.length}`)
    console.log(`   Catalog Order Defined: ${catalogOrder.length > 0 ? 'Yes' : 'No'}`)
  } catch (error) {
    console.error('\n❌ FATAL ERROR during diagnostics:', error)
    process.exit(1)
  }
}

// Run diagnostics
main().catch((error) => {
  console.error('❌ Unhandled error:', error)
  process.exit(1)
})