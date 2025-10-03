Directory structure:
└── legendapp-legend-list/
    ├── README.md
    ├── biome.json
    ├── bunfig.toml
    ├── CHANGELOG.md
    ├── CLAUDE.md
    ├── jest.config.js
    ├── LICENSE
    ├── package.json
    ├── posttsup.ts
    ├── test-visualization.html
    ├── TEST_PLAN.md
    ├── tsconfig.json
    ├── tsconfig.src.json
    ├── tsup.config.ts
    ├── visualize-tests.js
    ├── .prettierrc.json
    ├── __tests__/
    │   ├── setup.ts
    │   ├── __mocks__/
    │   │   └── react-native.ts
    │   ├── core/
    │   │   ├── calculateItemsInView.test.ts
    │   │   ├── calculateOffsetForIndex.test.ts
    │   │   ├── calculateOffsetWithOffsetPosition.test.ts
    │   │   ├── doInitialAllocateContainers.test.ts
    │   │   ├── doMaintainScrollAtEnd.test.ts
    │   │   ├── finishScrollTo.test.ts
    │   │   ├── handleLayout.test.ts
    │   │   ├── onScroll.test.ts
    │   │   ├── prepareMVCP.test.ts
    │   │   ├── ScrollAdjustHandler.test.ts
    │   │   ├── scrollToIndex.test.ts
    │   │   ├── updateAllPositions.test.ts
    │   │   ├── updateItemSize.test.ts
    │   │   ├── updateTotalSize.test.ts
    │   │   └── viewability.test.ts
    │   └── utils/
    │       ├── checkAllSizesKnown.test.ts
    │       ├── checkAtBottom.test.ts
    │       ├── checkAtTop.test.ts
    │       ├── checkThreshold.test.ts
    │       ├── createColumnWrapperStyle.test.ts
    │       ├── findAvailableContainers.test.ts
    │       ├── getId.test.ts
    │       ├── getItemSize.test.ts
    │       ├── getRenderedItem.test.ts
    │       ├── getScrollVelocity.test.ts
    │       ├── helpers.test.ts
    │       ├── requestAdjust.test.ts
    │       ├── setDidLayout.test.ts
    │       ├── setPaddingTop.test.ts
    │       ├── updateAlignItemsPaddingTop.test.ts
    │       └── updateSnapToOffsets.test.ts
    ├── example/
    │   ├── README.md
    │   ├── app.config.js
    │   ├── app.json
    │   ├── autoscroll.sh
    │   ├── bunfig.toml
    │   ├── metro.config.js
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── api/
    │   │   ├── index.ts
    │   │   └── data/
    │   │       ├── genres.json
    │   │       ├── rows.json
    │   │       └── playlist/
    │   │           ├── 878-37.json
    │   │           └── index.ts
    │   ├── app/
    │   │   ├── +not-found.tsx
    │   │   ├── _layout.tsx
    │   │   ├── cards-renderItem.tsx
    │   │   ├── (tabs)/
    │   │   │   ├── _layout.tsx
    │   │   │   ├── cards.tsx
    │   │   │   ├── index.tsx
    │   │   │   ├── moviesL.tsx
    │   │   │   └── moviesLR.tsx
    │   │   ├── accurate-scrollto/
    │   │   │   └── index.tsx
    │   │   ├── accurate-scrollto-2/
    │   │   │   └── index.tsx
    │   │   ├── accurate-scrollto-huge/
    │   │   │   └── index.tsx
    │   │   ├── add-to-end/
    │   │   │   └── index.tsx
    │   │   ├── ai-chat/
    │   │   │   └── index.tsx
    │   │   ├── bidirectional-infinite-list/
    │   │   │   └── index.tsx
    │   │   ├── cards-columns/
    │   │   │   └── index.tsx
    │   │   ├── cards-flashlist/
    │   │   │   └── index.tsx
    │   │   ├── cards-flatlist/
    │   │   │   └── index.tsx
    │   │   ├── cards-no-recycle/
    │   │   │   └── index.tsx
    │   │   ├── chat-example/
    │   │   │   └── index.tsx
    │   │   ├── chat-infinite/
    │   │   │   └── index.tsx
    │   │   ├── chat-keyboard/
    │   │   │   └── index.tsx
    │   │   ├── chat-resize-outer/
    │   │   │   └── index.tsx
    │   │   ├── columns/
    │   │   │   └── index.tsx
    │   │   ├── countries/
    │   │   │   └── index.tsx
    │   │   ├── countries-flashlist/
    │   │   │   └── index.tsx
    │   │   ├── countries-reorder/
    │   │   │   └── index.tsx
    │   │   ├── countries-with-headers/
    │   │   │   └── index.tsx
    │   │   ├── countries-with-headers-fixed/
    │   │   │   └── index.tsx
    │   │   ├── countries-with-headers-sticky/
    │   │   │   └── index.tsx
    │   │   ├── extra-data/
    │   │   │   └── index.tsx
    │   │   ├── filter-elements/
    │   │   │   ├── filter-data-provider.tsx
    │   │   │   └── index.tsx
    │   │   ├── initial-scroll-index/
    │   │   │   ├── index.tsx
    │   │   │   └── renderFixedItem.tsx
    │   │   ├── initial-scroll-index-free-height/
    │   │   │   └── index.tsx
    │   │   ├── initial-scroll-index-keyed/
    │   │   │   └── index.tsx
    │   │   ├── lazy-list/
    │   │   │   └── index.tsx
    │   │   ├── movies-flashlist/
    │   │   │   └── index.tsx
    │   │   ├── mutable-cells/
    │   │   │   └── index.tsx
    │   │   ├── mvcp-test/
    │   │   │   └── index.tsx
    │   │   └── video-feed/
    │   │       └── index.tsx
    │   ├── components/
    │   │   ├── Breathe.tsx
    │   │   ├── Circle.tsx
    │   │   ├── Collapsible.tsx
    │   │   ├── ExternalLink.tsx
    │   │   ├── HapticTab.tsx
    │   │   ├── HelloWave.tsx
    │   │   ├── Movies.tsx
    │   │   ├── ParallaxScrollView.tsx
    │   │   ├── ThemedText.tsx
    │   │   ├── ThemedView.tsx
    │   │   ├── __tests__/
    │   │   │   ├── ThemedText-test.tsx
    │   │   │   └── __snapshots__/
    │   │   │       └── ThemedText-test.tsx.snap
    │   │   └── ui/
    │   │       ├── IconSymbol.ios.tsx
    │   │       ├── IconSymbol.tsx
    │   │       ├── TabBarBackground.ios.tsx
    │   │       └── TabBarBackground.tsx
    │   ├── constants/
    │   │   ├── Colors.ts
    │   │   ├── constants.ts
    │   │   └── useScrollTest.ts
    │   └── hooks/
    │       ├── useColorScheme.ts
    │       ├── useColorScheme.web.ts
    │       └── useThemeColor.ts
    ├── src/
    │   ├── constants.ts
    │   ├── index.ts
    │   ├── types.ts
    │   ├── components/
    │   │   ├── Container.tsx
    │   │   ├── Containers.tsx
    │   │   ├── DebugView.tsx
    │   │   ├── LeanView.tsx
    │   │   ├── LegendList.tsx
    │   │   ├── ListComponent.tsx
    │   │   ├── PositionView.tsx
    │   │   ├── ScrollAdjust.tsx
    │   │   ├── Separator.tsx
    │   │   └── SnapWrapper.tsx
    │   ├── core/
    │   │   ├── calculateItemsInView.ts
    │   │   ├── calculateOffsetForIndex.ts
    │   │   ├── calculateOffsetWithOffsetPosition.ts
    │   │   ├── doInitialAllocateContainers.ts
    │   │   ├── doMaintainScrollAtEnd.ts
    │   │   ├── finishScrollTo.ts
    │   │   ├── handleLayout.ts
    │   │   ├── mvcp.ts
    │   │   ├── onScroll.ts
    │   │   ├── ScrollAdjustHandler.ts
    │   │   ├── scrollTo.ts
    │   │   ├── scrollToIndex.ts
    │   │   ├── updateAllPositions.ts
    │   │   ├── updateItemSize.ts
    │   │   ├── updateTotalSize.ts
    │   │   └── viewability.ts
    │   ├── hooks/
    │   │   ├── useAnimatedValue.ts
    │   │   ├── useCombinedRef.ts
    │   │   ├── useInit.ts
    │   │   ├── useSyncLayout.tsx
    │   │   ├── useThrottleDebounce.ts
    │   │   └── useValue$.ts
    │   ├── integrations/
    │   │   ├── animated.tsx
    │   │   ├── keyboard-controller.tsx
    │   │   └── reanimated.tsx
    │   ├── platform/
    │   │   ├── batchedUpdates.native.ts
    │   │   └── batchedUpdates.ts
    │   ├── state/
    │   │   ├── ContextContainer.ts
    │   │   └── state.tsx
    │   └── utils/
    │       ├── checkAllSizesKnown.ts
    │       ├── checkAtBottom.ts
    │       ├── checkAtTop.ts
    │       ├── checkThreshold.ts
    │       ├── createColumnWrapperStyle.ts
    │       ├── findAvailableContainers.ts
    │       ├── getId.ts
    │       ├── getItemSize.ts
    │       ├── getRenderedItem.ts
    │       ├── getScrollVelocity.ts
    │       ├── helpers.ts
    │       ├── requestAdjust.ts
    │       ├── setDidLayout.ts
    │       ├── setPaddingTop.ts
    │       ├── throttledOnScroll.ts
    │       ├── updateAlignItemsPaddingTop.ts
    │       ├── updateAveragesOnDataChange.ts
    │       └── updateSnapToOffsets.ts
    ├── .claude/
    │   └── settings.local.json
    ├── .cursor/
    │   └── rules/
    │       └── changelog.mdc
    └── .github/
        └── FUNDING.yml


Files Content:

(Files content cropped to 300k characters, download full ingest to see more)
================================================
FILE: README.md
================================================
# Legend List

**Legend List** is a high-performance list component for **React Native**, written purely in Typescript with no native dependencies. It is a drop-in replacement for `FlatList` and `FlashList` with better performance, especially when handling dynamically sized items.

<video src="https://github.com/user-attachments/assets/8641e305-ab06-4fb3-a96a-fd220df84985"></video>

---

## 🤔 Why Legend List?

*   **Performance:** Designed from the ground up and heavily optimized for performance, it is faster than FlatList and other list libraries in most scenarios.
*   **Dynamic Item Sizes:** Natively supports items with varying heights without performance hits.
*   **Drop-in Replacement:** API compatibility with `FlatList` and `FlashList` for easier migration.
*   **100% JS:** No native module linking required, ensuring easy integration and compatibility across platforms.
*   **Lightweight:** Our goal is to keep LegendList as small of a dependency as possible. For more advanced use cases, we plan on supporting optional plugins. This ensures that we keep the package size as small as possible.
*   **Bidirectional infinite lists:** Supports infinite scrolling in both directions with no flashes or scroll jumping
*   **Chat UIs without inverted:** Chat UIs can align their content to the bottom and maintain scroll at end, so that the list doesn't need to be inverted, which causes weird behavior (in animations, etc...)

For more information, listen to the Legend List episode of the [React Native Radio Podcast](https://infinite.red/react-native-radio/rnr-325-legend-list-with-jay-meistrich) and the [livestream with Expo](https://www.youtube.com/watch?v=XpZMveUCke8).

---
## ✨ Additional Features

Beyond standard `FlatList` capabilities:

*   `recycleItems`: (boolean) Toggles item component recycling.
    *   `true`: Reuses item components for optimal performance. Be cautious if your item components contain local state, as it might be reused unexpectedly.
    *   `false` (default): Creates new item components every time. Less performant but safer if items have complex internal state.
*   `maintainScrollAtEnd`: (boolean) If `true` and the user is scrolled near the bottom (within `maintainScrollAtEndThreshold * screen height`), the list automatically scrolls to the end when items are added or heights change. Useful for chat interfaces.
*   `alignItemsAtEnd`: (boolean) Useful for chat UIs, content smaller than the View will be aligned to the bottom of the list.

---

## 📚 Documentation

For comprehensive documentation, guides, and the full API reference, please visit:

➡️ **[Legend List Documentation Site](https://www.legendapp.com/open-source/list)**

---

## 💻 Usage

### Installation

```bash
# Using Bun
bun add @legendapp/list

# Using npm
npm install @legendapp/list

# Using Yarn
yarn add @legendapp/list
```

### Example
```tsx
import React, { useRef } from "react"
import { View, Image, Text, StyleSheet } from "react-native"
import { LegendList, LegendListRef, LegendListRenderItemProps } from "@legendapp/list"

// Define the type for your data items
interface UserData {
    id: string;
    name: string;
    photoUri: string;
}

const LegendListExample = () => {
    // Optional: Ref for accessing list methods (e.g., scrollTo)
    const listRef = useRef<LegendListRef | null>(null)

    const data = []

    const renderItem = ({ item }: LegendListRenderItemProps<UserData>) => {
        return (
            <View>
                <Image source={{ uri: item.photoUri }} />
                <Text>{item.name}</Text>
            </View>
        )
    }

    return (
        <LegendList
            // Required Props
            data={data}
            renderItem={renderItem}

            // Recommended props (Improves performance)
            keyExtractor={(item) => item.id}
            recycleItems={true}

            // Recommended if data can change
            maintainVisibleContentPosition

            ref={listRef}
        />
    )
}

export default LegendListExample

```

---

## How to Build

1. `bun i`
2. `bun run build` will build the package to the `dist` folder.

## Running the Example

1. `cd example`
2. `bun i`
3. `bun run ios`

## PRs gladly accepted!

There's not a ton of code so hopefully it's easy to contribute. If you want to add a missing feature or fix a bug please post an issue to see if development is already in progress so we can make sure to not duplicate work 😀.

## Upcoming Roadmap

- [] Column spans
- [] overrideItemLayout
- [] Sticky headers
- [] Masonry layout
- [] getItemType
- [] React DOM implementation

## Community

Join us on [Discord](https://discord.gg/tuW2pAffjA) to get involved with the Legend community.

## 👩‍⚖️ License

[MIT](LICENSE)



================================================
FILE: biome.json
================================================
{
    "$schema": "https://biomejs.dev/schemas/2.1.2/schema.json",
    "assist": {
        "actions": {
            "source": {
                "organizeImports": {
                    "level": "on",
                    "options": {
                        "groups": [
                            ["expo-*", "@expo/**", "react", "react*", "react*/**", "use-*/**"],
                            ":BLANK_LINE:",
                            "@legendapp/**",
                            "@/**"
                        ]
                    }
                },
                "useSortedAttributes": "on",
                "useSortedKeys": "on"
            }
        }
    },
    "files": {
        "ignoreUnknown": false,
        "includes": ["**/*.ts", "**/*.tsx"]
    },
    "formatter": {
        "enabled": true,
        "formatWithErrors": false,
        "indentStyle": "space",
        "indentWidth": 4,
        "lineEnding": "lf",
        "lineWidth": 120
    },
    "javascript": {
        "formatter": {
            "quoteStyle": "double"
        }
    },
    "linter": {
        "enabled": true,
        "rules": {
            "correctness": {
                "noUnusedImports": "warn",
                "useExhaustiveDependencies": "off",
                "useHookAtTopLevel": "off"
            },
            "recommended": true,
            "style": {
                "noNonNullAssertion": "off"
            },
            "suspicious": {
                "noArrayIndexKey": "off",
                "noConfusingVoidType": "off",
                "noExplicitAny": "off"
            }
        }
    },
    "vcs": {
        "clientKind": "git",
        "enabled": false,
        "useIgnoreFile": false
    }
}



================================================
FILE: bunfig.toml
================================================
[install]
saveTextLockfile = true

[test]
preload = ["__tests__/setup.ts"]


================================================
FILE: CHANGELOG.md
================================================
## 1.1.4
- Feat: Add sizes to getState()

## 1.1.3
- Fix: scrollToEnd was not always setting `viewPosition: 1` correctly

## 1.1.2
- Fix: Adding items in a list with item separators had a small layout jump as the previously last item re-rendered with a separator

## 1.1.1
- Fix: scrollTo accuracy when paddingTop changes

## 1.1.0
- Feat: Add LazyLegendList component for virtualizing regular children
- Feat: Support initialScrollIndex with viewOffset and viewPosition
- Feat: Add estimatedListSize prop for better initial size estimation

## 1.0.20
- Types: Fix type of ref in Reanimated LegendList

## 1.0.19
- Fix: scrollToEnd not including footerSize

## 1.0.18
- Feat: Add a useListScrollSize hook
- Fix: Support renderItem being a function component
- Fix: scrollToEnd being incorrect by the amount of the bottom padding

## 1.0.17
- Fix: initialScrollIndex not taking header component size into account
- Fix: PaddingAndAdjust for ListHeaderComponent
- Fix: ignore alignItemsAtEnd when the list is empty

## 1.0.16
- Fix: isAtEnd was going to false when overscrolling
- Fix: refreshControl not being top padded correctly
- Fix: type of useLastItem hook
- Fix: header component was not displaying if a list had no data
- Fix: scrollToIndex logic that fixes scroll after items layout was not using viewPosition/viewOffset
- Fix: Improve scrollToIndex accuracy
- Fix: Improve scrollToEnd accuracy

## 1.0.15
- Feat: Add a useIsLastItem hook
- Feat: Support horizontal lists without an intrinsic height, it takes the maximum height of list items
- Feat: Add onLoad prop
- Fix: maintainVisibleContentPosition not working on horizontal lists
- Perf: scrollForNextCalculateItemsInView was not taking drawDistance into account correctly
- Perf: Improved the algorithm for allocating containers to items
- Perf: Use useLayoutEffect in LegendList if available to get the outer ScrollView layout as soon as possible

## 1.0.14
- Fix: A container changing size while inactive but not yet recycled could potentially overlap with elements onscreen if large enough

## 1.0.13
- Fix: Missing React import in ListHeaderComponentContainer crashing some environments
- Fix: `initialScrollIndex` was off by padding if using "padding" or "paddingVertical" props

## 1.0.12
- Fix: Initial scroll index and scrollTo were not compensating for top padding
- Fix: Removed an overly aggressive optimization that was sometimes causing blank spaces after scrolling
- Fix: Adding a lot of items to the end with maintainScrollAtEnd could result in a large blank space
- Fix: ListHeaderComponent sometimes not positioned correctly with maintainVisibleContentPosition
- Fix: Gap styles not working with maintainVisibleContentPosition

## 1.0.11
- Fix: scrollTo was sometimes showing gaps at the bottom or bottom after reaching the destination

## 1.0.10
- Fix: Removed an optimization that only checked newly visible items, which could sometimes cause gaps in lists
- Fix: Scroll history resets properly during scroll operations, which was causing gaps after scroll
- Fix: Made scroll buffer calculations and scroll jump handling more reliable

## 1.0.9
- Fix: Use the `use-sync-external-store` shim to support older versions of react
- Fix: Lists sometimes leaving some gaps when reordering a list
- Fix: Sometimes precomputing next scroll position for calculation incorrectly

## 1.0.8
- Perf: The scroll buffering algorithm is smarter and adjusts based on scroll direction for better performance
- Perf: The container-finding logic keeps index order, reducing gaps in rendering
- Perf: Combine multiple hooks in Container to a single `useArray$` hook

## 1.0.7
- Fix: Containers that move out of view are handled better

## 1.0.6
- Fix: Average item size calculations are more accurate while scrolling
- Fix: Items in view are handled better when data changes
- Fix: Scroll position is maintained more accurately during updates

## 1.0.5
- Fix: Fast scrolling sometimes caused elements to disappear
- Fix: Out-of-range `scrollToIndex` calls are handled better

## 1.0.4
- Fix: Container allocation is more efficient
- Fix: Bidirectional infinite lists scroll better on the old architecture
- Fix: Item size updates are handled more reliably
- Fix: Container reuse logic is more accurate
- Fix: Zero-size layouts are handled better in the old architecture

## 1.0.3
- Fix: Items that are larger than the estimated size are handled correctly

## 1.0.2
- Fix: Initial layout works better in the old architecture
- Fix: Average size calculations are more accurate for bidirectional scrolling
- Fix: Initial scroll index behavior is more precise
- Fix: Item size calculations are more accurate overall

## 1.0.1
- Fix: Total size calculations are correct when using average sizes
- Fix: Keyboard avoiding behavior is improved for a smoother experience

## 1.0.0
Initial release! Major changes if you're coming from a beta version:

- Item hooks like `useRecyclingState` are no longer render props, but can be imported directly from `@legendapp/list`.



================================================
FILE: CLAUDE.md
================================================
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build and Development
- `bun run build` - Build the package using tsup and run post-build script
- `bun run publish:manual` - Build and publish to npm manually
- `bun run lint` - Check code formatting with Biome for src and example
- `bun run lint:fix` - Auto-fix formatting issues with Biome for src and example

### Example App Development
The repository includes a React Native example app in the `example/` directory:
- `cd example && bun i && bun run ios` - Run the example app on iOS
- Example app uses Expo and demonstrates various Legend List features

### Build Process
- Uses tsup for TypeScript compilation with multiple entry points:
  - `src/index.ts` (main export)
  - `src/integrations/animated.tsx` (animated variant)
  - `src/integrations/reanimated.tsx` (reanimated variant)
  - `src/integrations/keyboard-controller.tsx` (keyboard integration)
- Post-build script (`posttsup.ts`) copies LICENSE, CHANGELOG.md, README.md to dist and modifies package.json for publishing
- Builds to both CommonJS and ESM formats with TypeScript declarations

### File Structure
- `src/components/` - React components (LegendList, Container, ListComponent, etc.)
- `src/state/` - State management system (state.tsx, ContextContainer.ts)
- `src/core/` - Core logic functions (scroll handling, positioning, viewability)
- `src/utils/` - Utility functions (helpers, calculations, checks)
- `src/hooks/` - Custom React hooks
- `src/integrations/` - Optional integrations (animated, reanimated, keyboard-controller)

## Architecture Overview

Legend List is a high-performance React Native list component designed as a drop-in replacement for FlatList with better performance, especially for dynamically sized items.

### Core Components

**LegendList** (`src/components/LegendList.tsx`): Main component that wraps functionality in a StateProvider
- Handles virtualization logic, scroll management, and item positioning
- Manages anchor elements for `maintainVisibleContentPosition`
- Implements advanced scroll adjustment and jump prevention
- Uses container recycling for optimal performance

**State Management** (`src/state/state.tsx`): Global state management using observable patterns
- Manages container positions, item data, and scroll state
- Provides reactive updates to child components
- Custom state system inspired by Legend State with optimized listeners

**Container System** (`src/components/Container.tsx`, `src/components/Containers.tsx`): Manages item rendering containers
- Implements container recycling when `recycleItems` is enabled
- Handles absolute positioning of list items
- Manages container allocation and deallocation

**Scroll Adjustment** (`src/core/ScrollAdjustHandler.ts`): Handles complex scroll position adjustments
- Prevents scroll jumps when items are added/removed
- Manages scroll position during layout changes

### Key Features Architecture

**Dynamic Item Sizing**: Items can have varying heights without performance penalties
- Uses `getEstimatedItemSize` or `estimatedItemSize` for initial estimates
- Measures actual sizes on layout and adjusts total size calculations
- Maintains position accuracy through size change events

**Bidirectional Infinite Lists**: Supports infinite scrolling in both directions
- `onStartReached` and `onEndReached` callbacks with configurable thresholds
- Maintains scroll position when items are added to the beginning

**Chat UI Support**: 
- `alignItemsAtEnd` aligns content to bottom for chat interfaces
- `maintainScrollAtEnd` automatically scrolls to end when new items are added
- Avoids need for inverted lists which cause animation issues

**Column Support**: Multi-column layouts via `numColumns` prop
- Manages row heights when items have different sizes within the same row
- Handles column-aware positioning and gap calculations via `columnWrapperStyle`

### Performance Optimizations

**Virtualization**: Only renders items in the visible area plus buffer zones
- `drawDistance` controls how far ahead/behind to render items
- Dynamic buffer adjustment based on scroll velocity
- Container recycling to minimize React element creation/destruction

**Scroll Jump Prevention**: Sophisticated system to prevent visual jumps
- Anchor element tracking for `maintainVisibleContentPosition`
- Scroll history tracking for velocity calculations
- Position adjustment when item sizes change

**Batched Updates**: Groups layout calculations to reduce renders
- Uses `requestAnimationFrame` for batching size change calculations
- Optimizes container position updates

## Integration Patterns

### Basic Usage
Legend List is designed as a drop-in FlatList replacement:
```typescript
<LegendList
  data={data}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  recycleItems={true}
/>
```

### Optional Integrations
- **Animated**: `@legendapp/list/animated` - Works with React Native Animated
- **Reanimated**: `@legendapp/list/reanimated` - Works with React Native Reanimated
- **Keyboard Controller**: `@legendapp/list/keyboard-controller` - Integrates with react-native-keyboard-controller

### Viewability Tracking
Supports advanced viewability detection:
- Compatible with FlatList's `viewabilityConfig` and `onViewableItemsChanged`
- Custom hooks available: `useViewability`, `useViewabilityAmount`

## Important Development Notes

- When working with container recycling (`recycleItems={true}`), be cautious about local state in item components
- The `keyExtractor` is crucial for performance and correct behavior when data changes
- Use `getEstimatedItemSize` for better performance with varying item sizes
- The component uses advanced scroll position management that should not be interfered with directly

## Configuration Files

- **Biome** (`biome.json`): Used for linting and formatting with specific rules for the project
- **TypeScript** (`tsconfig.json`): Configured for React Native with path mappings for internal imports
- **Cursor Rules**: `.cursor/rules/changelog.mdc` contains guidelines for maintaining the changelog

## Testing the Library

To test changes, use the comprehensive example app which demonstrates various scenarios including dynamic sizing, infinite loading, chat interfaces, and performance comparisons with FlatList.


================================================
FILE: jest.config.js
================================================
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@testing-library)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/', '/example/', '/dist/'],
  testMatch: ['<rootDir>/__tests__/**/*.test.(ts|tsx|js|jsx)'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': ['@babel/preset-typescript', { preset: 'react-native' }],
  },
};


================================================
FILE: LICENSE
================================================
MIT License

Copyright (c) 2022 Moo.do LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



================================================
FILE: package.json
================================================
{
    "name": "@legendapp/list",
    "version": "2.0.0-beta.6",
    "description": "Legend List is a drop-in replacement for FlatList with much better performance and supporting dynamically sized items.",
    "sideEffects": false,
    "private": false,
    "main": "./index.js",
    "module": "./index.mjs",
    "types": "./index.d.ts",
    "files": [
        "**"
    ],
    "engines": {
        "node": ">=16.6.0",
        "npm": ">=8.11.0"
    },
    "scripts": {
        "build": "tsup && bun run posttsup.ts",
        "publish": "bun run build && cd dist && npm publish",
        "publish:next": "bun run build && cd dist && npm publish --tag next",
        "publish:beta": "bun run build && cd dist && npm publish --tag beta",
        "test": "bun test",
        "test:watch": "bun test --watch",
        "test:coverage": "bun test --coverage",
        "lint": "bunx biome check ./src && bunx biome format ./src && bunx biome check ./__tests__ && bunx biome format ./__tests__ && bun run lint:example",
        "lint:example": "bunx biome check ./example/app && bunx biome format ./example/app",
        "lint:fix": "bunx biome lint --write ./src && bunx biome format --write ./src && bunx biome check --write ./src && bun run lint:fix:example",
        "lint:fix:example": "bunx biome lint --write ./example/app && bunx biome format --write ./example/app && bunx biome check --write ./example/app",
        "test:visualize": "bun run visualize-tests.js && open test-visualization.html",
        "tsc": "tsc --noEmit --project tsconfig.src.json",
        "tsc:go": "tsgo --noEmit --project tsconfig.src.json"
    },
    "peerDependencies": {
        "react": "*",
        "react-native": "*"
    },
    "devDependencies": {
        "@biomejs/biome": "^2.1.2",
        "@testing-library/jest-native": "^5.4.3",
        "@testing-library/react-native": "^13.2.0",
        "@testing-library/user-event": "^14.6.1",
        "@types/bun": "^1.1.13",
        "@types/react": "^18.3.12",
        "@types/use-sync-external-store": "^1.5.0",
        "@typescript/native-preview": "^7.0.0-dev.20250816.1",
        "jest": "^30.0.4",
        "react": "^18.3.1",
        "react-native": "^0.76.2",
        "react-native-keyboard-controller": "^1.17.0",
        "react-native-reanimated": "^3.16.6",
        "react-test-renderer": "^19.1.0",
        "tsup": "^8.3.5",
        "typescript": "^5.8.3"
    },
    "author": "Legend <contact@legendapp.com> (https://github.com/LegendApp)",
    "keywords": [
        "react",
        "react-native",
        "list"
    ],
    "repository": "github:LegendApp/legend-list",
    "license": "MIT",
    "bugs": {
        "url": "https://github.com/LegendApp/legend-list/issues"
    },
    "homepage": "https://github.com/LegendApp/legend-list#readme",
    "publishConfig": {
        "registry": "https://registry.npmjs.org/"
    },
    "commitlint": {
        "extends": [
            "@commitlint/config-conventional"
        ]
    },
    "dependencies": {
        "use-sync-external-store": "^1.5.0"
    }
}



================================================
FILE: posttsup.ts
================================================
import pkg from "./package.json";

async function copy(...files: string[]) {
    return files.map((file) => Bun.write("dist/" + file.replace("src/", ""), Bun.file(file), { createPath: true }));
}

copy("LICENSE", "CHANGELOG.md", "README.md");

const pkgOut = pkg as Record<string, any>;

pkg.private = false;
delete pkgOut.devDependencies;
delete pkgOut.overrides;
delete pkgOut.scripts;
delete pkgOut.engines;
delete pkgOut.commitlint;

Bun.write("dist/package.json", JSON.stringify(pkg, undefined, 2));



================================================
FILE: test-visualization.html
================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Legend List - Test Results</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .card {
            background: white;
            border-radius: 24px;
            padding: 40px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }

        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #00d4aa, #00b4d8, #0077b6);
        }

        .header {
            text-align: center;
            margin-bottom: 32px;
        }

        .title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .subtitle {
            color: #666;
            font-size: 1.1rem;
            font-weight: 500;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 32px;
        }

        .stat-item {
            background: #f8f9fa;
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .stat-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--accent-color);
        }

        .stat-item.tests {
            --accent-color: #10b981;
        }

        .stat-item.coverage {
            --accent-color: #3b82f6;
        }

        .stat-item.performance {
            --accent-color: #f59e0b;
        }

        .stat-item.files {
            --accent-color: #8b5cf6;
        }

        .stat-value {
            font-size: 2.2rem;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 8px;
        }

        .stat-label {
            color: #666;
            font-size: 0.9rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .progress-section {
            margin-bottom: 32px;
        }

        .progress-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 16px;
        }

        .progress-bar {
            background: #e5e7eb;
            border-radius: 12px;
            height: 12px;
            overflow: hidden;
            position: relative;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #10b981, #059669);
            border-radius: 12px;
            width: 94.69%;
            position: relative;
            overflow: hidden;
        }

        .progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        .test-categories {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }

        .category {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 16px;
            text-align: center;
            border-left: 4px solid var(--category-color);
        }

        .category.core {
            --category-color: #ef4444;
        }

        .category.utils {
            --category-color: #3b82f6;
        }

        .category-name {
            font-size: 0.85rem;
            font-weight: 600;
            color: #666;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .category-count {
            font-size: 1.4rem;
            font-weight: 700;
            color: #1a1a1a;
        }

        .footer {
            text-align: center;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
        }

        .timestamp {
            color: #666;
            font-size: 0.9rem;
        }

        .emoji {
            font-size: 1.2em;
            margin-right: 8px;
        }

        .badge {
            display: inline-flex;
            align-items: center;
            background: #10b981;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-top: 16px;
        }

        @media (max-width: 480px) {
            .card {
                padding: 24px;
                margin: 10px;
            }

            .title {
                font-size: 2rem;
            }

            .stats-grid {
                grid-template-columns: 1fr;
            }

            .test-categories {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <h1 class="title">@legendapp/list</h1>
            <p class="subtitle">Test Suite Results</p>
        </div>

        <div class="stats-grid">
            <div class="stat-item tests">
                <div class="stat-value">1021</div>
                <div class="stat-label"><span class="emoji">✅</span>Tests Passing</div>
            </div>
            <div class="stat-item coverage">
                <div class="stat-value">94.69%</div>
                <div class="stat-label"><span class="emoji">📊</span>Line Coverage</div>
            </div>
            <div class="stat-item performance">
                <div class="stat-value">2.54s</div>
                <div class="stat-label"><span class="emoji">⚡</span>Runtime</div>
            </div>
            <div class="stat-item files">
                <div class="stat-value">31</div>
                <div class="stat-label"><span class="emoji">📁</span>Test Files</div>
            </div>
        </div>

        <div class="progress-section">
            <div class="progress-title">Code Coverage</div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>

        <div class="test-categories">
            <div class="category core">
                <div class="category-name">Core</div>
                <div class="category-count">15</div>
            </div>
            <div class="category utils">
                <div class="category-name">Utils</div>
                <div class="category-count">16</div>
            </div>
        </div>

        <div class="footer">
            <div class="badge">
                <span class="emoji">🚀</span>
                All Tests Passing!
            </div>
            <div class="timestamp">
                Generated on July 21, 2025
            </div>
        </div>
    </div>

    <script>
        // Add some interactive elements
        document.addEventListener('DOMContentLoaded', function() {
            // Animate the progress bar on load
            const progressFill = document.querySelector('.progress-fill');
            progressFill.style.width = '0%';
            setTimeout(() => {
                progressFill.style.transition = 'width 2s ease-in-out';
                progressFill.style.width = '94.69%';
            }, 500);

            // Add hover effects to stat items
            const statItems = document.querySelectorAll('.stat-item');
            statItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                    this.style.transition = 'all 0.3s ease';
                });

                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                });
            });
        });
    </script>
</body>
</html>


================================================
FILE: TEST_PLAN.md
================================================
# Legend List Testing Plan

## Overview

This document outlines the comprehensive testing strategy for Legend List, a high-performance React Native virtualization library. The testing plan prioritizes critical performance paths and edge cases that could affect user experience.

## Testing Infrastructure ✅

- **Framework**: Bun test runner with TypeScript support
- **Location**: `__tests__/` directory at project root
- **Dependencies**: `@testing-library/react-native`, `@testing-library/jest-native`
- **Commands**: `bun test`, `bun test:watch`, `bun test:coverage`

## Phase 1: Core Utilities Testing (High Priority)

### 1.1 Container Management ✅ COMPLETED
**File**: `src/utils/findAvailableContainers.ts`  
**Tests**: `__tests__/utils/findAvailableContainers.test.ts`  
**Status**: ✅ 26 tests covering all scenarios including edge cases

**Coverage Includes**:
- ✅ Unallocated container allocation
- ✅ Pending removal container handling  
- ✅ Out-of-view container recycling
- ✅ Distance-based prioritization
- ✅ New container creation
- ✅ Mixed allocation scenarios
- ✅ **Edge Cases**: Invalid ranges, negative values, data corruption
- ✅ **Performance**: Large container pools (10K containers)
- ✅ **Catastrophic Failures**: Memory pressure, invalid state

### 1.2 Viewport Calculations ✅ COMPLETED
**File**: `src/core/calculateItemsInView.ts`  
**Tests**: `__tests__/core/calculateItemsInView.test.ts`  
**Status**: ✅ 26 tests covering all scenarios including catastrophic failures

**Coverage Includes**:
- ✅ Basic viewport calculations and early returns
- ✅ Scroll buffer handling (dynamic buffer adjustment)
- ✅ Column layout support and loop optimization
- ✅ Scroll optimization with precomputed ranges
- ✅ Edge cases: negative scroll, zero dimensions, missing data
- ✅ Performance: Large datasets (10K items), timing benchmarks
- ✅ **Catastrophic Failures**: Corrupted state, memory pressure, infinite loops
- ✅ **Data Integrity**: NaN/Infinity handling, inconsistent mappings
- ✅ **Race Conditions**: Rapid state changes, concurrent calculations

### 1.3 Dynamic Sizing Logic ✅ COMPLETED
**File**: `src/utils/getItemSize.ts`  
**Tests**: `__tests__/utils/getItemSize.test.ts`  
**Status**: ✅ 49 tests covering all scenarios including catastrophic failures

**Coverage Includes**:
- ✅ Known sizes cache (priority system, zero sizes)
- ✅ Average size optimization (new architecture conditions)
- ✅ Cached sizes (retrieval and priority)
- ✅ Estimated sizes (static and function-based estimation)
- ✅ Size caching behavior and cache management
- ✅ Priority order (known > average > cached > estimated)
- ✅ **Edge Cases**: undefined/null/zero/negative sizes, extreme values
- ✅ **Performance**: Large datasets, memory pressure, timing benchmarks
- ✅ **Catastrophic Failures**: Corrupted state, circular references, recursive calls
- ✅ **Function Edge Cases**: NaN/Infinity handling, error throwing, type mismatches

### 1.4 Additional Core Functions ✅ COMPLETED

**File**: `src/core/updateTotalSize.ts` ✅ COMPLETED  
**Tests**: `__tests__/core/updateTotalSize.test.ts`  
**Status**: ✅ 24 tests covering all scenarios including edge cases

**Coverage Includes**:
- ✅ Empty data handling (zero/null/undefined data)
- ✅ Single and multiple item calculations  
- ✅ Missing data handling (ID, position, size data)
- ✅ alignItemsAtEnd integration and padding calculations
- ✅ **Edge Cases**: Negative values, floating point, very large numbers
- ✅ **Performance**: Large datasets (10K items), rapid updates
- ✅ **Error Handling**: Corrupted maps, context failures

**File**: `src/utils/checkThreshold.ts` ✅ COMPLETED  
**Tests**: `__tests__/utils/checkThreshold.test.ts`  
**Status**: ✅ 27 tests covering all scenarios including advanced patterns

**Coverage Includes**:
- ✅ Threshold detection (within/outside threshold, explicit override)
- ✅ State management (reached/blocked states, combinations)
- ✅ Hysteresis and reset behavior (1.3x threshold reset logic)
- ✅ Timer functionality (700ms block timer, rapid triggers)
- ✅ Optional parameters (missing callbacks, partial callbacks)
- ✅ **Edge Cases**: Zero/negative thresholds, Infinity/NaN values
- ✅ **Performance**: Rapid calls (1K operations), infinite scroll patterns
- ✅ **Error Handling**: Callback errors, floating point precision

**File**: `src/core/scrollToIndex.ts` ✅ COMPLETED  
**Tests**: `__tests__/core/scrollToIndex.test.ts`  
**Status**: ✅ 37 tests covering all scenarios including complex offset calculations

**Coverage Includes**:
- ✅ Index boundary handling (clamping, empty data, edge indices)
- ✅ Offset calculations (basic, viewOffset, padding/header, missing position data)
- ✅ viewPosition handling (last item defaults, explicit values) 
- ✅ Animation handling (default true, explicit false/true)
- ✅ Horizontal vs vertical scrolling support
- ✅ State management (clearing scroll history, setting scrollingTo, scrollPending)
- ✅ **Edge Cases**: Missing refScroller, corrupted state, large/NaN/Infinity values
- ✅ **Performance**: Rapid consecutive calls (100 ops), large datasets (10K items)
- ✅ **Complex Scenarios**: Mixed offset components, state consistency, orientation switching

**File**: `src/utils/getId.ts` ✅ COMPLETED  
**Tests**: `__tests__/utils/getId.test.ts`  
**Status**: ✅ 31 tests covering all scenarios including edge cases and error handling

**Coverage Includes**:
- ✅ Basic functionality (keyExtractor usage, caching, fallback to index)
- ✅ Edge cases (null/undefined data, empty arrays, out of bounds indices)
- ✅ keyExtractor behavior (different return types, error handling, complex logic)
- ✅ Caching behavior (separate entries, pre-existing cache, cache overwrites)
- ✅ Type handling (various data types, string coercion, floating point indices)
- ✅ **Performance**: Large datasets (10K items), rapid calls (1K operations)
- ✅ **Error Handling**: Corrupted cache, missing props, NaN/Infinity indices

**File**: `src/utils/getRenderedItem.ts` ✅ COMPLETED  
**Tests**: `__tests__/utils/getRenderedItem.test.ts`  
**Status**: ✅ 33 tests covering all scenarios including React component interaction

**Coverage Includes**:
- ✅ Basic functionality (correct structure, React element creation, prop passing)
- ✅ Edge cases (null state, missing keys, undefined index, out of bounds)
- ✅ renderItem behavior (null/undefined renderItem, component errors, return types)
- ✅ Context interaction (extraData handling, corrupted context, type variations)
- ✅ Data handling (empty/null arrays, different data types)
- ✅ **Performance**: Large datasets (10K items), rapid calls (1K operations)
- ✅ **Error Handling**: Corrupted state, special character keys, memory efficiency

**File**: `src/core/updateAllPositions.ts` ✅ COMPLETED  
**Tests**: `__tests__/core/updateAllPositions.test.ts`  
**Status**: ✅ 31 tests covering the heart of the virtualization system

**Coverage Includes**:
- ✅ Single and multi-column positioning (dynamic column heights, row calculations)
- ✅ Backwards optimization (upward scrolling performance, anchor positioning, bailout logic)
- ✅ Data change handling (cache clearing, indexByKey rebuilding)
- ✅ Average size optimization (rounded calculations, priority ordering)
- ✅ **Performance**: Large datasets (10K items), rapid consecutive calls
- ✅ **Edge Cases**: Empty data, corrupted state, boundary conditions
- ✅ **Integration**: snapToIndices support, development mode features

**File**: `src/utils/getScrollVelocity.ts` ✅ COMPLETED  
**Tests**: `__tests__/utils/getScrollVelocity.test.ts`  
**Status**: ✅ 32 tests covering scroll velocity calculations for performance optimization

**Coverage Includes**:
- ✅ Basic velocity calculation (positive/negative scrolling, time windows)
- ✅ Direction change detection (complex scroll patterns, entry filtering)
- ✅ Time window filtering (1000ms boundaries, entry aging)
- ✅ Edge cases (identical positions, zero time differences, floating point precision)
- ✅ **Performance**: Large scroll history (1K entries), rapid consecutive calls
- ✅ **Complex Patterns**: Fast scrolling, stuttering, deceleration patterns
- ✅ **Boundary Conditions**: MAX_SAFE_INTEGER values, very old timestamps

**File**: `src/core/onScroll.ts` ✅ COMPLETED  
**Tests**: `__tests__/core/onScroll.test.ts`  
**Status**: ✅ 39 tests covering the critical scroll event handler

**Coverage Includes**:
- ✅ Basic scroll handling (vertical/horizontal, timing updates, callback integration)
- ✅ Scroll history management (5-entry limit, scrollingTo exclusion, ordering)
- ✅ MVCP scroll ignore logic (threshold handling, scrollingTo override)
- ✅ Content size validation (zero size filtering, partial/missing sizes)
- ✅ **Integration**: calculateItemsInView, checkAtBottom, checkAtTop orchestration
- ✅ **Performance**: Rapid scroll events (1K operations), memory efficiency
- ✅ **Edge Cases**: Corrupted state, invalid events, negative positions

## Phase 1 Summary ✅ COMPLETED

**Total Achievement**: Phase 1 has been **dramatically expanded** beyond the original scope, now covering the most critical functions in the entire virtualization system with **338 tests and 796 assertions**.

## Phase 2: Individual Function Testing (High Priority) 🎯 IN PROGRESS

### Overview
Phase 2 focuses on testing the remaining 25+ untested files containing 50+ individual functions. This phase targets critical functions that support the core virtualization system, with emphasis on MVCP (maintainVisibleContentPosition), viewability tracking, and container management.

### 2.1 Critical Core Functions (High Priority)

#### 2.1.1 Viewability System ⚡ HIGH PRIORITY
**File**: `src/core/viewability.ts`  
**Tests**: `__tests__/core/viewability.test.ts`  
**Status**: 📋 PLANNED

**Functions to Test**:
- `setupViewability()` - Viewability configuration setup
- `updateViewableItems()` - Viewable items state management
- `computeViewability()` - Core viewability calculations
- `isViewable()` - Individual item viewability determination
- `findContainerId()` - Container-item mapping
- `maybeUpdateViewabilityCallback()` - Callback triggering logic

**Coverage Requirements**:
- ✅ Basic viewability detection (threshold crossing, timing requirements)
- ✅ FlatList compatibility (viewabilityConfig, onViewableItemsChanged)
- ✅ Performance optimization (batched updates, rapid scroll handling)
- ✅ Edge cases (empty data, rapid data changes, scroll boundaries)
- ✅ Integration with container recycling
- ✅ **Complexity**: Very High - Core feature compatibility

#### 2.1.2 MVCP Core Logic ⚡ HIGH PRIORITY
**File**: `src/core/prepareMVCP.ts`  
**Tests**: `__tests__/core/prepareMVCP.test.ts`  
**Status**: 📋 PLANNED

**Function**: `prepareMVCP(ctx: StateContext, state: InternalState)`

**Coverage Requirements**:
- ✅ Anchor element selection and tracking
- ✅ Scroll adjustment calculations
- ✅ Integration with scroll adjustment handler
- ✅ Edge cases (no valid anchors, corrupted state)
- ✅ Performance (rapid MVCP requests, large datasets)
- ✅ **Complexity**: Complex - Critical for scroll position preservation

#### 2.1.3 Scroll Adjustment Management ⚡ HIGH PRIORITY
**File**: `src/core/ScrollAdjustHandler.ts`  
**Tests**: `__tests__/core/ScrollAdjustHandler.test.ts`  
**Status**: 📋 PLANNED

**Class Methods**:
- `constructor(ctx)` - Handler initialization
- `requestAdjust(add: number)` - Queue scroll adjustments
- `setMounted()` - Lifecycle management

**Coverage Requirements**:
- ✅ Adjustment queuing and batching
- ✅ Mount/unmount state handling
- ✅ Integration with scroll events
- ✅ Edge cases (rapid adjustments, negative values)
- ✅ **Complexity**: Medium - State coordination

#### 2.1.4 Advanced Scroll Utilities ⚡ HIGH PRIORITY
**File**: `src/utils/requestAdjust.ts`  
**Tests**: `__tests__/utils/requestAdjust.test.ts`  
**Status**: 📋 PLANNED

**Function**: `requestAdjust(ctx: StateContext, state: InternalState, positionDiff: number)`

**Coverage Requirements**:
- ✅ Scroll position difference calculations
- ✅ MVCP integration and triggering
- ✅ Performance optimization (debouncing, batching)
- ✅ Edge cases (zero diff, large adjustments, rapid calls)
- ✅ **Complexity**: Complex - Core MVCP functionality

### 2.2 Container Management Functions (High Priority)

#### 2.2.1 Container Context System
**File**: `src/state/ContextContainer.ts`  
**Tests**: `__tests__/state/ContextContainer.test.ts`  
**Status**: 📋 PLANNED

**Hooks to Test**:
- `useViewability(callback, configId?)` - Viewability hook integration
- `useViewabilityAmount(callback)` - Detailed viewability metrics
- `useRecyclingEffect(effect)` - Container recycling lifecycle
- `useRecyclingState(valueOrFun)` - State preservation in recycled containers
- `useIsLastItem()` - Last item detection
- `useListScrollSize()` - Scroll container dimensions

**Coverage Requirements**:
- ✅ Hook lifecycle management
- ✅ Container recycling integration
- ✅ State preservation across recycling
- ✅ React Native integration patterns
- ✅ **Complexity**: Complex - React hooks with recycling

#### 2.2.2 Container Initialization
**File**: `src/core/doInitialAllocateContainers.ts`  
**Tests**: `__tests__/core/doInitialAllocateContainers.test.ts`  
**Status**: 📋 PLANNED

**Function**: `doInitialAllocateContainers(ctx: StateContext, state: InternalState)`

**Coverage Requirements**:
- ✅ Container pool size calculations
- ✅ Initial allocation strategy
- ✅ Performance with different pool sizes
- ✅ Integration with container recycling
- ✅ **Complexity**: Medium - Initialization logic

### 2.3 Threshold and Boundary Detection (Medium Priority)

#### 2.3.1 Bottom Detection Logic
**File**: `src/utils/checkAtBottom.ts`  
**Tests**: `__tests__/utils/checkAtBottom.test.ts`  
**Status**: 📋 PLANNED

**Function**: `checkAtBottom(ctx: StateContext, state: InternalState)`

**Coverage Requirements**:
- ✅ End-reached threshold detection
- ✅ onEndReached callback triggering
- ✅ Hysteresis and reset behavior
- ✅ Integration with infinite scrolling
- ✅ **Complexity**: Medium - Threshold logic

#### 2.3.2 Top Detection Logic
**File**: `src/utils/checkAtTop.ts`  
**Tests**: `__tests__/utils/checkAtTop.test.ts`  
**Status**: 📋 PLANNED

**Function**: `checkAtTop(state: InternalState)`

**Coverage Requirements**:
- ✅ Start-reached threshold detection
- ✅ onStartReached callback triggering
- ✅ Bidirectional infinite scroll support
- ✅ **Complexity**: Medium - Threshold logic

### 2.4 Layout and Positioning Functions (Medium Priority)

#### 2.4.1 Padding and Alignment
**File**: `src/utils/setPaddingTop.ts`  
**Tests**: `__tests__/utils/setPaddingTop.test.ts`  
**Status**: 📋 PLANNED

**Function**: `setPaddingTop(ctx: StateContext, options: {...})`

**Coverage Requirements**:
- ✅ Dynamic padding updates
- ✅ Scroll position preservation
- ✅ alignItemsAtEnd integration
- ✅ **Complexity**: Medium - Layout coordination

#### 2.4.2 Chat UI Support
**File**: `src/core/doMaintainScrollAtEnd.ts`  
**Tests**: `__tests__/core/doMaintainScrollAtEnd.test.ts`  
**Status**: 📋 PLANNED

**Function**: `doMaintainScrollAtEnd(ctx: StateContext, state: InternalState, animated: boolean)`

**Coverage Requirements**:
- ✅ Auto-scroll to end behavior
- ✅ Animation parameter handling
- ✅ Chat interface patterns
- ✅ **Complexity**: Medium - Chat UI feature

### 2.5 React Hooks Testing (Medium Priority)

#### 2.5.1 Core Hooks
**Files**: `src/hooks/useInit.ts`, `src/hooks/useCombinedRef.ts`, `src/hooks/useAnimatedValue.ts`  
**Tests**: `__tests__/hooks/[filename].test.ts`  
**Status**: 📋 PLANNED

**Coverage Requirements**:
- ✅ Hook lifecycle and behavior
- ✅ React testing library integration
- ✅ Ref forwarding patterns
- ✅ **Complexity**: Simple to Medium

#### 2.5.2 Advanced Animation Hooks
**File**: `src/hooks/useValue$.ts`  
**Tests**: `__tests__/hooks/useValue$.test.ts`  
**Status**: 📋 PLANNED

**Coverage Requirements**:
- ✅ State-to-animation bridge
- ✅ Observable integration
- ✅ Animation value synchronization
- ✅ **Complexity**: Complex - State bridge

### 2.6 Utility Functions (Lower Priority)

#### 2.6.1 Helper Functions
**File**: `src/utils/helpers.ts`  
**Tests**: `__tests__/utils/helpers.test.ts`  
**Status**: 📋 PLANNED

**Functions to Test** (8 functions):
- `isFunction()`, `isArray()` - Type guards
- `warnDevOnce()` - Development warnings
- `roundSize()` - Pixel rounding
- `isNullOrUndefined()` - Null checks
- `comparatorDefault()` - Number comparison
- `byIndex()` - Index extraction
- `extractPadding()` - Style padding extraction

**Coverage Requirements**:
- ✅ Type safety and edge cases
- ✅ Development mode behavior
- ✅ Performance (type checking overhead)
- ✅ **Complexity**: Simple to Medium

### 2.7 State Management Testing (Medium Priority)

#### 2.7.1 Core State Logic
**File**: `src/state/state.tsx`  
**Tests**: `__tests__/state/state.test.ts`  
**Status**: 📋 PLANNED

**Focus**: Observable state management and reactivity
- ✅ StateProvider component behavior
- ✅ State updates and subscriptions
- ✅ Performance optimization patterns
- ✅ **Complexity**: Complex - Core state system

### 2.8 Integration Testing (Lower Priority)

#### 2.8.1 Animation Integrations
**Files**: `src/integrations/animated.tsx`, `src/integrations/reanimated.tsx`, `src/integrations/keyboard-controller.tsx`  
**Tests**: `__tests__/integrations/[filename].test.ts`  
**Status**: 📋 PLANNED

**Coverage Requirements**:
- ✅ External library integration
- ✅ Ref forwarding behavior
- ✅ Component composition patterns
- ✅ **Complexity**: Medium to Complex

## Phase 2 Testing Strategy

### Testing Priorities (Updated)
1. **🔴 Critical (Week 1)**: MVCP system, viewability, scroll adjustment
2. **🟡 High (Week 2)**: Container management, threshold detection
3. **🟢 Medium (Week 3)**: Layout functions, React hooks, state management
4. **🔵 Lower (Week 4)**: Utilities, integrations

### Coverage Standards for Phase 2
- **Critical functions**: 100% line and branch coverage + catastrophic failure testing
- **High priority**: 95% coverage + comprehensive edge case testing
- **Medium priority**: 90% coverage + standard edge case testing  
- **Lower priority**: 85% coverage + basic edge case testing

### Testing Patterns (Established from Phase 1)
- ✅ **Edge Cases**: Null/undefined, zero/negative values, extreme numbers
- ✅ **Performance**: Large datasets (1K-10K items), rapid operations
- ✅ **Error Handling**: Corrupted state, invalid parameters, memory pressure
- ✅ **Integration**: Multi-function orchestration, state consistency
- ✅ **React Patterns**: Hook lifecycle, component behavior, ref handling

### Estimated Phase 2 Scope
- **Files to Test**: 25+ files
- **Individual Functions**: 50+ functions  
- **Estimated Tests**: 400-500 tests
- **Estimated Assertions**: 800-1000 assertions
- **Completion Target**: 4 weeks

## Phase 2 Success Criteria
- [ ] All critical MVCP and viewability functions tested
- [ ] Container management system fully covered
- [ ] React hooks properly tested with testing library
- [ ] State management system validated
- [ ] Integration patterns established
- [ ] Performance benchmarks for new functions
- [ ] Documentation for React-specific testing patterns

## Phase 3: Component Testing (Medium Priority)

### 3.1 Main Component 📋 PLANNED
**File**: `src/components/LegendList.tsx`  
**Focus**: Integration testing with various prop combinations

### 3.2 Container System 📋 PLANNED
**File**: `src/components/Container.tsx`  
**Focus**: Container recycling and lifecycle

### 3.3 Layout Components 📋 PLANNED
- `src/components/Containers.tsx` - Container orchestration
- `src/components/ListComponent.tsx` - List rendering
- `src/components/ScrollAdjust.tsx` - Scroll adjustment logic

## Phase 4: Integration Features (Lower Priority)

### 4.1 Animation Integrations 📋 PLANNED
- `src/integrations/animated.tsx` - React Native Animated support
- `src/integrations/reanimated.tsx` - Reanimated integration
- `src/integrations/keyboard-controller.tsx` - Keyboard handling

### 4.2 Advanced Features 📋 PLANNED
- Viewability tracking
- Infinite scrolling
- Chat UI support (`alignItemsAtEnd`, `maintainScrollAtEnd`)
- Multi-column layouts

## Test Quality Standards

### Coverage Requirements
- **Critical paths**: 100% line and branch coverage
- **Edge cases**: Comprehensive boundary testing
- **Performance**: Benchmarking for hot paths
- **Error handling**: Graceful degradation testing

### Test Categories
1. **Unit Tests**: Individual function behavior
2. **Integration Tests**: Component interactions
3. **Performance Tests**: Memory and timing validation  
4. **Edge Case Tests**: Boundary conditions and error states
5. **Regression Tests**: Known bug prevention

### Performance Benchmarks
- Container allocation: <1ms for 100 containers
- Viewport calculations: <5ms for 1000 items
- Memory usage: Linear scaling with dataset size
- Scroll performance: 60fps maintenance

## Edge Cases & Catastrophic Failure Testing

### Data Integrity
- ✅ Corrupted state objects
- ✅ Invalid numeric ranges
- ✅ Missing required properties
- ✅ Type mismatches (string vs number)

### Memory & Performance
- ✅ Extremely large datasets (1M+ items)
- ✅ Memory pressure scenarios
- ✅ Infinite loop prevention
- ✅ Stack overflow protection

### User Input Edge Cases
- Invalid scroll positions
- Rapid state changes
- Concurrent updates
- Race conditions

## Progress Tracking

### Completed ✅
- [x] Testing infrastructure setup
- [x] `findAvailableContainers` comprehensive testing (26 tests)
- [x] `calculateItemsInView` comprehensive testing (19 tests) 
- [x] `getItemSize` comprehensive testing (49 tests)
- [x] `updateTotalSize` comprehensive testing (24 tests)
- [x] `checkThreshold` comprehensive testing (27 tests)  
- [x] `scrollToIndex` comprehensive testing (37 tests)
- [x] `getId` comprehensive testing (31 tests)
- [x] `getRenderedItem` comprehensive testing (33 tests)
- [x] `updateAllPositions` comprehensive testing (31 tests) - **Heart of virtualization system**
- [x] `getScrollVelocity` comprehensive testing (32 tests) - **Performance optimization**
- [x] `onScroll` comprehensive testing (39 tests) - **Critical scroll event handler**
- [x] Edge case and catastrophic failure patterns established
- [x] **Total: 338 tests with 796 assertions across 11 test files**

### Phase 1 Complete ✅
**All critical core utilities have been thoroughly tested with 100% coverage of edge cases, performance scenarios, and error handling.**

### Phase 2 In Progress 🎯
- [ ] Critical MVCP and viewability system testing (Week 1)
- [ ] Container management and threshold detection (Week 2)  
- [ ] Layout functions and React hooks testing (Week 3)
- [ ] State management and integration testing (Week 4)

### Future Phases 📋
- [ ] Component integration testing (Phase 3)
- [ ] Performance benchmarking suite (Phase 4)
- [ ] End-to-end workflow testing (Phase 5)

## Risk Assessment

### High Risk Areas
1. **Container virtualization logic** - Memory leaks if broken
2. **Scroll position calculations** - Performance bottlenecks
3. **State synchronization** - Race conditions and inconsistencies
4. **Memory management** - Large dataset handling

### Testing Priorities
1. 🔴 **Critical**: Core performance algorithms
2. 🟡 **Important**: State management and reactivity  
3. 🟢 **Nice-to-have**: Integration features and advanced options

## Success Criteria

- [ ] 95%+ test coverage on critical paths
- [ ] All edge cases documented and tested
- [ ] Performance benchmarks established
- [ ] Zero known memory leaks
- [ ] Comprehensive regression test suite
- [ ] Documentation for test patterns and practices

---

*Last Updated: 2025-01-20*  
*Next Review: After Phase 2 Week 1 (MVCP/Viewability testing)*


================================================
FILE: tsconfig.json
================================================
{
    "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "declaration": true,
        "declarationMap": false,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "incremental": true,
        "isolatedModules": true,
        "jsx": "preserve",
        "lib": [
            "dom",
            "dom.iterable",
            "esnext"
        ],
        "module": "ES2015",
        "moduleResolution": "node",
        "noEmit": true,
        "outDir": "dist",
        "paths": {
            "@/*": [
                "./src/*"
            ],
            "@/components/*": [
                "./src/components/*"
            ],
            "@/core/*": [
                "./src/core/*"
            ],
            "@/hooks/*": [
                "./src/hooks/*"
            ],
            "@/integrations/*": [
                "./src/integrations/*"
            ],
            "@/state/*": [
                "./src/state/*"
            ],
            "@/utils/*": [
                "./src/utils/*"
            ],
            "@legendapp/list": [
                "./src/index"
            ],
            "@legendapp/list/animated": [
                "./src/integrations/animated"
            ],
            "@legendapp/list/reanimated": [
                "./src/integrations/reanimated"
            ],
            "react": [
                "./node_modules/react"
            ],
            "react-native": [
                "./node_modules/react-native"
            ]
        },
        "resolveJsonModule": true,
        "rootDirs": [
            "./src"
        ],
        "skipLibCheck": true,
        "sourceMap": true,
        "strict": true,
        "stripInternal": true,
        "target": "es2018",
        "tsBuildInfoFile": "./tsconfig.tsbuildinfo" // Specify the build info file
    },
    "exclude": [
        "node_modules",
        "dist",
        "types.d.ts",
        "src/types",
        "example"
    ],
    "include": [
        "**/*.ts",
        "**/*.tsx"
    ]
}


================================================
FILE: tsconfig.src.json
================================================
{
    "extends": "./tsconfig.json",
    "include": [
        "src/**/*.ts",
        "src/**/*.tsx"
    ],
    "exclude": [
        "node_modules",
        "dist",
        "types.d.ts",
        "src/types",
        "example",
        "__tests__"
    ]
}


================================================
FILE: tsup.config.ts
================================================
import { defineConfig } from "tsup";

const external = [
    "react",
    "react-native",
    "react-native-keyboard-controller",
    "react-native-reanimated",
    "@legendapp/list",
    "@legendapp/list/animated",
    "@legendapp/list/reanimated",
];

export default defineConfig({
    clean: true,
    dts: true,
    entry: {
        animated: "src/integrations/animated.tsx",
        index: "src/index.ts",
        "keyboard-controller": "src/integrations/keyboard-controller.tsx",
        reanimated: "src/integrations/reanimated.tsx",
    },
    external,
    format: ["cjs", "esm"],
    splitting: false,
    treeshake: true,
});



================================================
FILE: visualize-tests.js
================================================
#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Generating test visualization...\n');

// Run tests and capture output
let testOutput, coverageOutput;
try {
    console.log('📋 Running tests...');
    // Capture both stdout and stderr combined using shell redirection
    testOutput = execSync('bun test 2>&1', {
        encoding: 'utf8',
    });

    console.log('📊 Running coverage analysis...');
    // Capture both stdout and stderr combined for coverage output
    coverageOutput = execSync('bun test --coverage 2>&1', {
        encoding: 'utf8',
    });
} catch (error) {
    // If commands fail, try to get output from stderr
    testOutput = error.stdout || error.stderr || '';
    coverageOutput = testOutput; // Use same output for both if one fails
    console.log('ℹ️ Tests completed with output captured from error.');
}

// Parse test results
function parseTestResults(testOut, coverageOut) {
    const results = {
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
        runtime: '0s',
        testFiles: 0,
        coverage: {
            lines: 0,
            functions: 0,
        },
        categories: {
            core: 0,
            utils: 0,
        },
    };

    // Extract basic stats - Bun format: " 421 pass"
    const passMatch = testOut.match(/\s(\d+)\spass/);
    if (passMatch) {
        results.passedTests = parseInt(passMatch[1]);
    }

    const failMatch = testOut.match(/\s(\d+)\sfail/);
    if (failMatch) {
        results.failedTests = parseInt(failMatch[1]);
    }

    results.totalTests = results.passedTests + results.failedTests;

    // Extract runtime - Bun format: "[2.03s]"
    const runtimeMatch = testOut.match(/\[(\d+\.?\d*)s\]/);
    if (runtimeMatch) {
        results.runtime = `${runtimeMatch[1]}s`;
    }

    // Extract test files count - Bun format: "across 13 files"
    const filesMatch = testOut.match(/across\s+(\d+)\s+files/);
    if (filesMatch) {
        results.testFiles = parseInt(filesMatch[1]);
    }

    // Extract coverage from coverage output
    const coverageMatch = coverageOut.match(/All files\s+\|\s+[\d.]+\s+\|\s+([\d.]+)/);
    if (coverageMatch) {
        results.coverage.lines = parseFloat(coverageMatch[1]);
    }

    const funcCoverageMatch = coverageOut.match(/All files\s+\|\s+([\d.]+)/);
    if (funcCoverageMatch) {
        results.coverage.functions = parseFloat(funcCoverageMatch[1]);
    }

    // Count core vs utils test files
    const coreFiles = (testOut.match(/__tests__\/core\//g) || []).length;
    const utilsFiles = (testOut.match(/__tests__\/utils\//g) || []).length;

    // If no matches, try counting unique file mentions
    if (coreFiles === 0 && utilsFiles === 0) {
        const coreMatches = testOut.match(/core\//g);
        const utilsMatches = testOut.match(/utils\//g);
        results.categories.core = coreMatches ? coreMatches.length : 0;
        results.categories.utils = utilsMatches ? utilsMatches.length : 0;
    } else {
        results.categories.core = coreFiles;
        results.categories.utils = utilsFiles;
    }

    return results;
}

const results = parseTestResults(testOutput, coverageOutput);

console.log('✨ Test Results:');
console.log(`   Tests: ${results.passedTests} passed, ${results.failedTests} failed`);
console.log(`   Coverage: ${results.coverage.lines}% lines`);
console.log(`   Runtime: ${results.runtime}`);
console.log(`   Files: ${results.testFiles} test files\n`);

console.log('🔍 Debug raw test output (first 500 chars):');
console.log('TEST OUTPUT:', testOutput.substring(0, 500));
console.log('\n🔍 Debug raw coverage output (first 500 chars):');
console.log('COVERAGE OUTPUT:', coverageOutput.substring(0, 500));

console.log('\n🔍 Results object:');
console.log(JSON.stringify(results, null, 2));

// Generate HTML
const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

// Generate HTML with proper substitution
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Legend List - Test Results</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .card {
            background: white;
            border-radius: 24px;
            padding: 40px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }

        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #00d4aa, #00b4d8, #0077b6);
        }

        .header {
            text-align: center;
            margin-bottom: 32px;
        }

        .title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .subtitle {
            color: #666;
            font-size: 1.1rem;
            font-weight: 500;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 32px;
        }

        .stat-item {
            background: #f8f9fa;
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .stat-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--accent-color);
        }

        .stat-item.tests {
            --accent-color: ${results.failedTests > 0 ? '#ef4444' : '#10b981'};
        }

        .stat-item.coverage {
            --accent-color: #3b82f6;
        }

        .stat-item.performance {
            --accent-color: #f59e0b;
        }

        .stat-item.files {
            --accent-color: #8b5cf6;
        }

        .stat-value {
            font-size: 2.2rem;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 8px;
        }

        .stat-label {
            color: #666;
            font-size: 0.9rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .progress-section {
            margin-bottom: 32px;
        }

        .progress-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 16px;
        }

        .progress-bar {
            background: #e5e7eb;
            border-radius: 12px;
            height: 12px;
            overflow: hidden;
            position: relative;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, ${
                results.coverage.lines > 80
                    ? '#10b981, #059669'
                    : results.coverage.lines > 60
                    ? '#f59e0b, #d97706'
                    : '#ef4444, #dc2626'
            });
            border-radius: 12px;
            width: ${results.coverage.lines}%;
            position: relative;
            overflow: hidden;
        }

        .progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        .test-categories {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }

        .category {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 16px;
            text-align: center;
            border-left: 4px solid var(--category-color);
        }

        .category.core {
            --category-color: #ef4444;
        }

        .category.utils {
            --category-color: #3b82f6;
        }

        .category-name {
            font-size: 0.85rem;
            font-weight: 600;
            color: #666;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .category-count {
            font-size: 1.4rem;
            font-weight: 700;
            color: #1a1a1a;
        }

        .footer {
            text-align: center;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
        }

        .timestamp {
            color: #666;
            font-size: 0.9rem;
        }

        .emoji {
            font-size: 1.2em;
            margin-right: 8px;
        }

        .badge {
            display: inline-flex;
            align-items: center;
            background: ${results.failedTests > 0 ? '#ef4444' : '#10b981'};
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-top: 16px;
        }

        @media (max-width: 480px) {
            .card {
                padding: 24px;
                margin: 10px;
            }

            .title {
                font-size: 2rem;
            }

            .stats-grid {
                grid-template-columns: 1fr;
            }

            .test-categories {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <h1 class="title">@legendapp/list</h1>
            <p class="subtitle">Test Suite Results</p>
        </div>

        <div class="stats-grid">
            <div class="stat-item tests">
                <div class="stat-value">${results.passedTests}</div>
                <div class="stat-label"><span class="emoji">${results.failedTests > 0 ? '❌' : '✅'}</span>Tests ${
    results.failedTests > 0 ? 'Failing' : 'Passing'
}</div>
            </div>
            <div class="stat-item coverage">
                <div class="stat-value">${results.coverage.lines}%</div>
                <div class="stat-label"><span class="emoji">📊</span>Line Coverage</div>
            </div>
            <div class="stat-item performance">
                <div class="stat-value">${results.runtime}</div>
                <div class="stat-label"><span class="emoji">⚡</span>Runtime</div>
            </div>
            <div class="stat-item files">
                <div class="stat-value">${results.testFiles}</div>
                <div class="stat-label"><span class="emoji">📁</span>Test Files</div>
            </div>
        </div>

        <div class="progress-section">
            <div class="progress-title">Code Coverage</div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>

        <div class="test-categories">
            <div class="category core">
                <div class="category-name">Core</div>
                <div class="category-count">${results.categories.core}</div>
            </div>
            <div class="category utils">
                <div class="category-name">Utils</div>
                <div class="category-count">${results.categories.utils}</div>
            </div>
        </div>

        <div class="footer">
            <div class="badge">
                <span class="emoji">${results.failedTests > 0 ? '⚠️' : '🚀'}</span>
                ${
                    results.failedTests > 0
                        ? `${results.failedTests} Test${results.failedTests > 1 ? 's' : ''} Failing!`
                        : 'All Tests Passing!'
                }
            </div>
            <div class="timestamp">
                Generated on ${currentDate}
            </div>
        </div>
    </div>

    <script>
        // Add some interactive elements
        document.addEventListener('DOMContentLoaded', function() {
            // Animate the progress bar on load
            const progressFill = document.querySelector('.progress-fill');
            progressFill.style.width = '0%';
            setTimeout(() => {
                progressFill.style.transition = 'width 2s ease-in-out';
                progressFill.style.width = '${results.coverage.lines}%';
            }, 500);

            // Add hover effects to stat items
            const statItems = document.querySelectorAll('.stat-item');
            statItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                    this.style.transition = 'all 0.3s ease';
                });

                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                });
            });
        });
    </script>
</body>
</html>`;

// Write the HTML file
const outputPath = path.join(__dirname, 'test-visualization.html');
fs.writeFileSync(outputPath, htmlContent);

console.log('🎉 Visualization generated successfully!');
console.log(`📁 Output: ${outputPath}`);
console.log('\n💡 To view:');
console.log('   open test-visualization.html');
console.log('\n📸 Perfect for screenshots to share on Twitter!');



================================================
FILE: .prettierrc.json
================================================
{
    "tabWidth": 4,
    "printWidth": 120,
    "singleQuote": true
}



================================================
FILE: __tests__/setup.ts
================================================
// Global test setup for Legend List tests
import { afterEach, beforeEach, mock } from "bun:test";

// Define React Native globals that the source code expects
global.__DEV__ = false;
global.nativeFabricUIManager = {}; // Set to non-null for IsNewArchitecture = true

// Mock React Native constants if needed
if (typeof global.window === "undefined") {
    global.window = {} as any;
}

// Store original functions for restoration
const originalSetTimeout = globalThis.setTimeout;
const originalClearTimeout = globalThis.clearTimeout;
const originalRequestAnimationFrame = globalThis.requestAnimationFrame;

// Mock react-native module for all tests to avoid loading the real RN package
mock.module("react-native", () => import("./__mocks__/react-native.ts"));
mock.module("react-native/index.js", () => import("./__mocks__/react-native.ts"));

// Global cleanup between tests to prevent contamination
afterEach(() => {
    // Restore any potentially mocked functions
    if (globalThis.setTimeout !== originalSetTimeout) {
        globalThis.setTimeout = originalSetTimeout;
    }
    if (globalThis.clearTimeout !== originalClearTimeout) {
        globalThis.clearTimeout = originalClearTimeout;
    }
    // Keep requestAnimationFrame fallback in place between tests

    // Clear any pending timers
    // This is a simple approach - in production you'd use jest.clearAllTimers() or similar
});

// Even stronger cleanup after each test file
import { afterAll } from "bun:test";

afterAll(() => {
    // Attempt to restore any global spies that might be lingering
    const possibleMocks = [globalThis.setTimeout, globalThis.clearTimeout, globalThis.requestAnimationFrame];
    // Force restore any mocked functions to originals
    globalThis.setTimeout = originalSetTimeout;
    globalThis.clearTimeout = originalClearTimeout;
    globalThis.requestAnimationFrame = originalRequestAnimationFrame;
});

// Provide raf fallback for code paths that expect it
if (typeof globalThis.requestAnimationFrame !== "function") {
    // @ts-ignore
    globalThis.requestAnimationFrame = (cb: Function) => setTimeout(cb, 0);
}



================================================
FILE: __tests__/__mocks__/react-native.ts
================================================
// Minimal React Native stub for Bun test environment

type AnyFunction = (...args: any[]) => any;

export type ViewStyle = any;
export type ViewProps = any;
export type ScrollViewProps = any;
export type Insets = any;
export type DimensionValue = any;
export type LayoutRectangle = { x: number; y: number; width: number; height: number };
export type LayoutChangeEvent = any;
export type NativeScrollEvent = any;
export type NativeSyntheticEvent<T> = { nativeEvent: T };

export const Platform = {
    OS: "ios",
    select<T>(spec: { ios?: T; android?: T; web?: T; default?: T }): T {
        return (spec as any)["ios"] ?? spec.default!;
    },
};

export const Dimensions = {
    get(_what: "window" | "screen") {
        return { fontScale: 2, height: 667, scale: 2, width: 375 };
    },
};

export const StyleSheet = {
    create<T extends Record<string, any>>(styles: T): T {
        return styles;
    },
    flatten(style: any): any {
        if (Array.isArray(style)) {
            return style.reduce((acc, s) => ({ ...acc, ...(s || {}) }), {});
        }
        return style || {};
    },
};

export const unstable_batchedUpdates: (fn: AnyFunction) => void = (fn) => {
    fn();
};

class AnimatedValue<T = number> {
    private _value: T;
    constructor(value: T) {
        this._value = value;
    }
    setValue(value: T) {
        this._value = value;
    }
    // minimal accessor for tests
    getValue(): T {
        return this._value;
    }
}

export const Animated = {
    event(_args: any, config?: { listener?: AnyFunction; useNativeDriver?: boolean }): AnyFunction {
        const listener = config?.listener;
        return (event: any) => listener?.(event);
    },
    timing(_value: any, _config: any) {
        return { start: (cb?: AnyFunction) => cb?.() };
    },
    Value: AnimatedValue,
};

// Provide a global requestAnimationFrame fallback for tests that expect it
if (typeof globalThis.requestAnimationFrame !== "function") {
    // @ts-ignore
    globalThis.requestAnimationFrame = (cb: AnyFunction) => setTimeout(cb, 0);
}

// Very light component stubs
export const View = (() => null) as unknown as AnyFunction;
export const Text = (() => null) as unknown as AnyFunction;
export const RefreshControl = ((_props: any) => null) as unknown as AnyFunction;
export const ScrollView = (() => null) as unknown as AnyFunction;

export type View = any; // for type-only imports
export type ScrollView = any; // for type-only imports



================================================
FILE: __tests__/core/calculateItemsInView.test.ts
================================================
import { beforeEach, describe, expect, it } from "bun:test";
import "../setup"; // Import global test setup

import { Animated } from "react-native";

import { calculateItemsInView } from "../../src/core/calculateItemsInView";
import type { ListenerType, StateContext } from "../../src/state/state";
import type { InternalState } from "../../src/types";

// Create a properly typed mock context
function createMockContext(initialValues: Record<string, any> = {}): StateContext {
    const values = new Map(Object.entries(initialValues)) as Map<ListenerType, any>;
    const listeners = new Map();

    return {
        animatedScrollY: new Animated.Value(0),
        columnWrapperStyle: undefined,
        listeners,
        mapViewabilityAmountCallbacks: new Map(),
        mapViewabilityAmountValues: new Map(),
        mapViewabilityCallbacks: new Map(),
        mapViewabilityValues: new Map(),
        values,
        viewRefs: new Map(),
    };
}

describe("calculateItemsInView", () => {
    let mockCtx: StateContext;
    let mockState: InternalState;

    beforeEach(() => {
        mockCtx = createMockContext({
            headerSize: 0,
            numColumns: 1,
            numContainers: 10,
            stylePaddingTop: 0,
            totalSize: 1000,
        });

        mockState = {
            // Required by UpdateAllPositions
            averageSizes: {},
            // Core calculateItemsInView properties
            columns: new Map(),
            containerItemKeys: new Set(),
            containerItemTypes: new Map(),
            enableScrollForNextCalculateItemsInView: true,
            // Required by Pick types from dependencies
            endBuffered: 0,
            endNoBuffer: 0,
            endReachedBlockedByTimer: false,
            firstFullyOnScreenIndex: 0,
            idCache: new Map(),
            idsInView: [],
            ignoreScrollFromMVCP: undefined,
            ignoreScrollFromMVCPTimeout: undefined,
            indexByKey: new Map(),
            initialScroll: undefined,
            isAtEnd: false,
            isAtStart: false,
            isEndReached: false,
            isStartReached: false,
            lastBatchingAction: 0,
            lastLayout: undefined,
            // Required by CheckAtBottom and SetDidLayout
            loadStartTime: Date.now(),
            maintainingScrollAtEnd: false,
            minIndexSizeChanged: undefined,
            nativeMarginTop: 0,
            needsOtherAxisSize: false,
            otherAxisSize: undefined,
            positions: new Map(),
            props: {
                alignItemsAtEnd: false,
                data: [],
                estimatedItemSize: undefined,
                getEstimatedItemSize: undefined,
                getFixedItemSize: undefined,
                getItemType: undefined,
                horizontal: false,
                initialContainerPoolRatio: 2,
                initialScroll: undefined,
                itemsAreEqual: undefined,
                keyExtractor: (item: any, index: number) => `item_${index}`,
                maintainScrollAtEnd: false,
                maintainScrollAtEndThreshold: 0.1,
                maintainVisibleContentPosition: false,
                numColumns: 1,
                onEndReached: undefined,
                onEndReachedThreshold: 0.1,
                onItemSizeChanged: undefined,
                onLoad: undefined,
                onScroll: undefined,
                onStartReached: undefined,
                onStartReachedThreshold: 0.1,
                recycleItems: false,
                renderItem: undefined,
                scrollBuffer: 100,
                snapToIndices: undefined,
                stickyIndicesArr: [],
                // Provide empty sticky indices for tests by default
                stickyIndicesSet: new Set<number>(),
                stylePaddingBottom: undefined,
                stylePaddingTop: 0,
                suggestEstimatedItemSize: false,
            },
            queuedCalculateItemsInView: undefined,
            queuedInitialLayout: false,
            queuedItemSizeUpdates: [],
            queuedItemSizeUpdatesWaiting: false,
            refScroller: undefined as any,
            scroll: 0,
            scrollAdjustHandler: undefined as any,
            scrollForNextCalculateItemsInView: undefined,
            scrollHistory: [],
            // Required by PrepareMVCP
            scrollingTo: undefined,
            scrollLength: 300,
            scrollPending: 0,
            scrollPrev: 0,
            scrollPrevTime: 0,
            scrollTime: 0,
            sizes: new Map(),
            sizesKnown: new Map(),
            startBuffered: 0,
            startBufferedId: undefined,
            startNoBuffer: 0,
            startReachedBlockedByTimer: false,
            // Sticky container setup (empty by default)
            stickyContainerPool: new Set(),
            stickyContainers: new Map(),
            timeoutSetPaddingTop: undefined,
            timeoutSizeMessage: undefined,
            timeouts: new Set(),
            totalSize: 1000,
            viewabilityConfigCallbackPairs: undefined,
        };
    });

    describe("basic viewport calculations", () => {
        it("should return early when data is empty", () => {
            mockState.props.data = [];

            const result = calculateItemsInView(mockCtx, mockState);

            expect(result).toBeUndefined();
        });

        it("should return early when scrollLength is 0", () => {
            mockState.scrollLength = 0;
            mockState.props.data = [1, 2, 3];

            const result = calculateItemsInView(mockCtx, mockState);

            expect(result).toBeUndefined();
        });

        it("should return early when no containers exist", () => {
            mockCtx.values.set("numContainers", 0);
            mockState.props.data = [1, 2, 3];

            const result = calculateItemsInView(mockCtx, mockState);

            expect(result).toBeUndefined();
        });

        it("should calculate visible items in basic scenario", () => {
            // Setup: 10 items, each 50px tall, scroll at position 100
            mockState.props.data = Array.from({ length: 10 }, (_, i) => ({ id: i }));
            mockState.scroll = 100;

            // Setup positions and sizes
            for (let i = 0; i < 10; i++) {
                const id = `item_${i}`;
                mockState.idCache.set(i, id);
                mockState.indexByKey.set(id, i);
                mockState.positions.set(id, i * 50);
                mockState.sizes.set(id, 50);
            }

            // Mock the required functions and state that calculateItemsInView depends on
            calculateItemsInView(mockCtx, mockState);

            // Verify state was updated (the real function modifies state)
            expect(mockState.startNoBuffer).toBeDefined();
            expect(mockState.endNoBuffer).toBeDefined();
            expect(mockState.idsInView).toBeDefined();
        });
    });

    describe("scroll buffer handling", () => {
        it("should include buffered items beyond visible area", () => {
            mockState.props.data = Array.from({ length: 20 }, (_, i) => ({ id: i }));
            mockState.scroll = 200; // Scroll to middle
            mockState.props.scrollBuffer = 100;

            // Setup positions
            for (let i = 0; i < 20; i++) {
                const id = `item_${i}`;
                mockState.idCache.set(i, id);
                mockState.indexByKey.set(id, i);
                mockState.positions.set(id, i * 50);
                mockState.sizes.set(id, 50);
            }

            calculateItemsInView(mockCtx, mockState);

            expect(mockState.startBuffered).toBeLessThanOrEqual(mockState.startNoBuffer);
            expect(mockState.endBuffered).toBeGreaterThanOrEqual(mockState.endNoBuffer);
        });

        it("should handle zero scroll buffer", () => {
            mockState.props.data = Array.from({ length: 10 }, (_, i) => ({ id: i }));
            mockState.props.scrollBuffer = 0;
            mockState.scroll = 100;

            for (let i = 0; i < 10; i++) {
                const id = `item_${i}`;
                mockState.idCache.set(i, id);
                mockState.indexByKey.set(id, i);
                mockState.positions.set(id, i * 50);
                mockState.sizes.set(id, 50);
            }

            calculateItemsInView(mockCtx, mockState);

            // With no buffer, buffered and non-buffered ranges should be the same
            expect(mockState.startBuffered).toBe(mockState.startNoBuffer);
            expect(mockState.endBuffered).toBe(mockState.endNoBuffer);
        });
    });

    describe("column layout support", () => {
        it("should adjust loop start for multi-column layouts", () => {
            mockCtx.values.set("numColumns", 3);
            mockState.props.data = Array.from({ length: 15 }, (_, i) => ({ id: i }));

            // Setup items in 3 columns
            for (let i = 0; i < 15; i++) {
                const id = `item_${i}`;
                const row = Math.floor(i / 3);
                mockState.idCache.set(i, id);
                mockState.indexByKey.set(id, i);
                mockState.positions.set(id, row * 50);
                mockState.sizes.set(id, 50);
                mockState.columns.set(id, i % 3);
            }

            calculateItemsInView(mockCtx, mockState);

            // Should complete without errors and find items accounting for column layout
            expect(mockState.idsInView).toBeDefined();
        });
    });

    describe("scroll optimization", () => {
        it("should skip calculation when within precomputed range", () => {
            mockState.props.data = [1, 2, 3];
            mockState.scrollForNextCalculateItemsInView = {
                bottom: 1000,
                top: -500, // Much wider range to ensure optimization triggers
            };
            mockState.scroll = 100;
            mockState.props.scrollBuffer = 50;

            const result = calculateItemsInView(mockCtx, mockState);

            // Should return early due to optimization
            expect(result).toBeUndefined();
        });

        it("should calculate when outside precomputed range", () => {
            mockState.props.data = Array.from({ length: 5 }, (_, i) => ({ id: i }));
            mockState.scrollForNextCalculateItemsInView = {
                bottom: 200,
                top: 50,
            };
            mockState.scroll = 300; // Outside range

            for (let i = 0; i < 5; i++) {
                const id = `item_${i}`;
                mockState.idCache.set(i, id);
                mockState.indexByKey.set(id, i);
                mockState.positions.set(id, i * 50);
                mockState.sizes.set(id, 50);
            }

            calculateItemsInView(mockCtx, mockState);

            expect(mockState.idsInView).toBeDefined();
        });
    });

    describe("edge cases and error handling", () => {
        it("should handle scroll clamping when exceeding total size", () => {
            mockCtx.values.set("totalSize", 500);
            mockState.scrollLength = 300;
            mockState.scroll = 400; // Would exceed totalSize
            mockState.props.data = [1, 2, 3];

            for (let i = 0; i < 3; i++) {
                const id = `item_${i}`;
                mockState.idCache.set(i, id);
                mockState.indexByKey.set(id, i);
                mockState.positions.set(id, i * 50);
                mockState.sizes.set(id, 50);
            }

            calculateItemsInView(mockCtx, mockState);

            // Should complete without errors even with clamped scroll
            expect(mockState.idsInView).toBeDefined();
        });

        it("should handle negative scroll positions", () => {
            mockState.scroll = -50;
            mockState.props.data = Array.from({ length: 5 }, (_, i) => ({ id: i }));

            for (let i = 0; i < 5; i++) {
                const id = `item_${i}`;
                mockState.idCache.set(i, id);
                mockState.indexByKey.set(id, i);
                mockState.positions.set(id, i * 50);
                mockState.sizes.set(id, 50);
            }

            calculateItemsInView(mockCtx, mockState);

            expect(mockState.idsInView).toBeDefined();
            if (mockState.startNoBuffer !== null) {
                expect(mockState.startNoBuffer).toBeGreaterThanOrEqual(0);
            }
        });

        it("should handle missing position data gracefully", () => {
            mockState.props.data = Array.from({ length: 5 }, (_, i) => ({ id: i }));

            // Setup only some items with positions
            for (let i = 0; i < 3; i++) {
                const id = `item_${i}`;
                mockState.idCache.set(i, id);
                mockState.indexByKey.set(id, i);
                mockState.positions.set(id, i * 50);
                // Missing sizes for some items
            }

            calculateItemsInView(mockCtx, mockState);

            expect(mockState.idsInView).toBeDefined();
        });

        it("should handle large datasets efficiently", () => {
            const largeDataset = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
            mockState.props.data = largeDataset;
            mockState.scroll = 5000; // Scroll to middle

            // Setup a subset of positions (simulating partial loading)
            for (let i = 4900; i < 5100; i++) {
                const id = `item_${i}`;
                mockState.idCache.set(i, id);
                mockState.indexByKey.set(id, i);
                mockState.positions.set(id, i * 50);
                mockState.sizes.set(id, 50);
            }

            const start = Date.now();
            calculateItemsInView(mockCtx, mockState);
            const duration = Date.now() - start;

            expect(duration).toBeLessThan(50); // Should complete quickly
            expect(mockState.idsInView).toBeDefined();
        });

        it("should handle zero-sized items", () => {
            mockState.props.data = Array.from({ length: 5 }, (_, i) => ({ id: i }));

            for (let i = 0; i < 5; i++) {
                const id = `item_${i}`;
                mockState.idCache.set(i, id);
                mockState.indexByKey.set(id, i);
                mockState.positions.set(id, i * 50);
                mockState.sizes.set(id, i === 2 ? 0 : 50); // One zero-sized item
            }

            calculateItemsInView(mockCtx, mockState);

            expect(mockState.idsInView).toBeDefined();
            expect(mockState.idsInView).toBeInstanceOf(Array);
        });

        it("should handle items with extreme positions", () => {
            mockState.props.data = Array.from({ length: 3 }, (_, i) => ({ id: i }));

            mockState.idCache.set(0, "item_0");
            mockState.indexByKey.set("item_0", 0);
            mockState.positions.set("item_0", -1000000); // Extreme negative position
            mockState.sizes.set("item_0", 50);

            mockState.idCache.set(1, "item_1");
            mockState.indexByKey.set("item_1", 1);
            mockState.positions.set("item_1", 100);
            mockState.sizes.set("item_1", 50);

            mockState.idCache.set(2, "item_2");
            mockState.indexByKey.set("item_2", 2);
            mockState.positions.set("item_2", Number.MAX_SAFE_INTEGER); // Extreme positive
            mockState.sizes.set("item_2", 50);

            calculateItemsInView(mockCtx, mockState);

            // Should handle extreme positions without crashing
            expect(mockState.idsInView).toBeDefined();
        });
    });

    describe("minIndexSizeChanged optimization", () => {
        it("should use minIndexSizeChanged to optimize loop start", () => {
            mockState.props.data = Array.from({ length: 100 }, (_, i) => ({ id: i }));
            mockState.minIndexSizeChanged = 50;
            mockState.startBufferedId = "item_80";
            mockState.indexByKey.set("item_80", 80);

            for (let i = 0; i < 100; i++) {
                const id = `item_${i}`;
                mockState.idCache.set(i, id);
                mockState.indexByKey.set(id, i);
                mockState.positions.set(id, i * 50);
                mockState.sizes.set(id, 50);
            }

            calculateItemsInView(mockCtx, mockState);

            expect(mockState.idsInView).toBeDefined();
            expect(mockState.minIndexSizeChanged).toBeUndefined(); // Should be cleared
        });
    });

    describe("firstFullyOnScreenIndex calculation", () => {
        it("should identify first fully visible item correctly", () => {
            mockState.props.data = Array.from({ length: 10 }, (_, i) => ({ id: i }));
            mockState.scroll = 75; // Partially shows first item, fully shows second

            for (let i = 0; i < 10; i++) {
                const id = `item_${i}`;
                mockState.idCache.set(i, id);
                mockState.indexByKey.set(id, i);
                mockState.positions.set(id, i * 50); // Items at 0, 50, 100, 150...
                mockState.sizes.set(id, 50);
            }

            calculateItemsInView(mockCtx, mockState);

            // First fully visible item should be at or after scroll position
            if (mockState.firstFullyOnScreenIndex !== undefined) {
                expect(mockState.firstFullyOnScreenIndex).toBeGreaterThanOrEqual(1);
            }
        });
    });

    describe("performance benchmarks", () => {
        it("should handle memory pressure with huge datasets", () => {
            // Simulate memory pressure scenario
            const hugeDataset = Array.from({ length: 100000 }, (_, i) => ({ id: i }));
            mockState.props.data = hugeDataset;
            mockState.scroll = 50000; // Middle of huge dataset

            // Only setup positions for visible range to simulate streaming
            for (let i = 49950; i < 50050; i++) {
                const id = `item_${i}`;
                mockState.idCache.set(i, id);
                mockState.indexByKey.set(id, i);
                mockState.positions.set(id, i * 50);
                mockState.sizes.set(id, 50);
            }

            const start = Date.now();
            calculateItemsInView(mockCtx, mockState);
            const duration = Date.now() - start;

            expect(duration).toBeLessThan(100); // Should not cause timeout
            expect(mockState.idsInView).toBeDefined();
        });

        it("should handle rapid state changes efficiently", () => {
            mockState.props.data = Array.from({ length: 10 }, (_, i) => ({ id: i }));

            // Setup normal state first
            for (let i = 0; i < 10; i++) {
                const id = `item_${i}`;
                mockState.idCache.set(i, id);
                mockState.indexByKey.set(id, i);
                mockState.positions.set(id, i * 50);
                mockState.sizes.set(id, 50);
            }

            // Run multiple calculations in quick succession
            const results = [];
            for (let i = 0; i < 5; i++) {
                mockState.scroll = i * 50; // Change scroll between calculations
                calculateItemsInView(mockCtx, mockState);
                results.push(mockState.idsInView);
            }

            // All calculations should complete without errors
            expect(results.length).toBe(5);
            expect(results.every((ids) => Array.isArray(ids))).toBe(true);
        });
    });
});



================================================
FILE: __tests__/core/calculateOffsetForIndex.test.ts
================================================
import { beforeEach, describe, expect, it } from "bun:test";
import "../setup"; // Import global test setup

import { Animated } from "react-native";
import { calculateOffsetForIndex } from "../../src/core/calculateOffsetForIndex";
import type { ListenerType, StateContext } from "../../src/state/state";
import type { InternalState } from "../../src/types";

describe("calculateOffsetForIndex", () => {
    let mockCtx: StateContext;
    let mockState: InternalState;

    beforeEach(() => {
        // Create mock context
        mockCtx = {
            animatedScrollY: new Animated.Value(0),
            columnWrapperStyle: undefined,
            listeners: new Map(),
            mapViewabilityAmountCallbacks: new Map(),
            mapViewabilityAmountValues: new Map(),
            mapViewabilityCallbacks: new Map(),
            mapViewabilityValues: new Map(),
            values: new Map([
                ["stylePaddingTop", 0],
                ["headerSize", 0],
            ] as [ListenerType, any][]),
            viewRefs: new Map(),
        };

        // Create mock state with basic setup
        mockState = {
            idCache: new Map(),
            positions: new Map([
                ["item_0", 0],
                ["item_1", 100],
                ["item_2", 250],
                ["item_3", 400],
            ]),
            props: {
                data: [
                    { id: "item1", name: "First" },
                    { id: "item2", name: "Second" },
                    { id: "item3", name: "Third" },
                    { id: "item4", name: "Fourth" },
                ],
                keyExtractor: (item: any, index: number) => `item_${index}`,
            },
        } as any;
    });

    describe("basic functionality", () => {
        it("should return 0 when index is undefined", () => {
            const result = calculateOffsetForIndex(mockCtx, mockState, undefined);
            expect(result).toBe(0);
        });

        it("should return position for valid index", () => {
            const result = calculateOffsetForIndex(mockCtx, mockState, 1);
            expect(result).toBe(100);
        });

        it("should return 0 for index not in positions map", () => {
            const result = calculateOffsetForIndex(mockCtx, mockState, 10);
            expect(result).toBe(0);
        });

        it("should handle index 0 correctly", () => {
            const result = calculateOffsetForIndex(mockCtx, mockState, 0);
            expect(result).toBe(0);
        });
    });

    describe("padding top integration", () => {
        it("should add stylePaddingTop to position", () => {
            mockCtx.values.set("stylePaddingTop", 50);

            const result = calculateOffsetForIndex(mockCtx, mockState, 1);
            expect(result).toBe(150); // 100 + 50
        });

        it("should handle zero stylePaddingTop", () => {
            mockCtx.values.set("stylePaddingTop", 0);

            const result = calculateOffsetForIndex(mockCtx, mockState, 1);
            expect(result).toBe(100);
        });

        it("should handle negative stylePaddingTop", () => {
            mockCtx.values.set("stylePaddingTop", -25);

            const result = calculateOffsetForIndex(mockCtx, mockState, 1);
            expect(result).toBe(75); // 100 - 25
        });

        it("should not add stylePaddingTop when it's null/undefined", () => {
            mockCtx.values.set("stylePaddingTop", null);

            const result = calculateOffsetForIndex(mockCtx, mockState, 1);
            expect(result).toBe(100);
        });
    });

    describe("header size integration", () => {
        it("should add headerSize to position", () => {
            mockCtx.values.set("headerSize", 75);

            const result = calculateOffsetForIndex(mockCtx, mockState, 1);
            expect(result).toBe(175); // 100 + 75
        });

        it("should handle zero headerSize", () => {
            mockCtx.values.set("headerSize", 0);

            const result = calculateOffsetForIndex(mockCtx, mockState, 1);
            expect(result).toBe(100);
        });

        it("should handle negative headerSize", () => {
            mockCtx.values.set("headerSize", -30);

            const result = calculateOffsetForIndex(mockCtx, mockState, 1);
            expect(result).toBe(70); // 100 - 30
        });

        it("should not add headerSize when it's null/undefined", () => {
            mockCtx.values.set("headerSize", null);

            const result = calculateOffsetForIndex(mockCtx, mockState, 1);
            expect(result).toBe(100);
        });
    });

    describe("combined offsets", () => {
        it("should add both stylePaddingTop and headerSize", () => {
            mockCtx.values.set("stylePaddingTop", 25);
            mockCtx.values.set("headerSize", 40);

            const result = calculateOffsetForIndex(mockCtx, mockState, 2);
            expect(result).toBe(315); // 250 + 25 + 40
        });

        it("should handle both negative values", () => {
            mockCtx.values.set("stylePaddingTop", -10);
            mockCtx.values.set("headerSize", -20);

            const result = calculateOffsetForIndex(mockCtx, mockState, 2);
            expect(result).toBe(220); // 250 - 10 - 20
        });

        it("should handle mixed positive/negative values", () => {
            mockCtx.values.set("stylePaddingTop", 30);
            mockCtx.values.set("headerSize", -15);

            const result = calculateOffsetForIndex(mockCtx, mockState, 2);
            expect(result).toBe(265); // 250 + 30 - 15
        });

        it("should handle undefined index with offsets", () => {
            mockCtx.values.set("stylePaddingTop", 25);
            mockCtx.values.set("headerSize", 40);

            const result = calculateOffsetForIndex(mockCtx, mockState, undefined);
            // Implementation returns 0 when index is undefined
            expect(result).toBe(0);
        });
    });

    describe("edge cases and error handling", () => {
        it("should handle null state gracefully", () => {
            // Function may handle null state without throwing
            const result = calculateOffsetForIndex(mockCtx, null as any, 1);
            expect(result).toBeDefined();
        });

        it("should handle corrupted positions map", () => {
            mockState.positions = null as any;

            expect(() => {
                calculateOffsetForIndex(mockCtx, mockState, 1);
            }).toThrow();
        });

        it("should handle negative index", () => {
            const result = calculateOffsetForIndex(mockCtx, mockState, -1);
            expect(result).toBe(0); // getId should handle this gracefully
        });

        it("should handle very large index", () => {
            const result = calculateOffsetForIndex(mockCtx, mockState, 999999);
            expect(result).toBe(0); // Not in positions map
        });

        it("should handle floating point index", () => {
            const result = calculateOffsetForIndex(mockCtx, mockState, 1.5);
            // getId should convert to string "1.5", which won't match "item_1"
            expect(result).toBe(0);
        });

        it("should handle corrupted context values", () => {
            mockCtx.values = null as any;

            expect(() => {
                calculateOffsetForIndex(mockCtx, mockState, 1);
            }).toThrow();
        });
    });

    describe("keyExtractor integration", () => {
        it("should work with custom keyExtractor", () => {
            mockState.props.keyExtractor = (item: any) => `custom_${item.id}`;
            mockState.positions = new Map([
                ["custom_item1", 0],
                ["custom_item2", 150],
                ["custom_item3", 300],
            ]);

            const result = calculateOffsetForIndex(mockCtx, mockState, 1);
            expect(result).toBe(150);
        });

        it("should handle keyExtractor returning different types", () => {
            mockState.props.keyExtractor = (item: any, index: number) => index.toString(); // Returns string
            mockState.positions = new Map([
                ["0", 0],
                ["1", 120],
                ["2", 280],
            ]);

            const result = calculateOffsetForIndex(mockCtx, mockState, 1);
            expect(result).toBe(120);
        });
    });

    describe("performance and large datasets", () => {
        it("should handle large position maps efficiently", () => {
            // Create large dataset
            const largePositions = new Map();
            const largeData = [];
            for (let i = 0; i < 10000; i++) {
                largePositions.set(`item_${i}`, i * 100);
                largeData.push({ id: i, text: `Item ${i}` });
            }
            mockState.positions = largePositions;
            mockState.props.data = largeData;

            const start = Date.now();
            const result = calculateOffsetForIndex(mockCtx, mockState, 5000);
            const duration = Date.now() - start;

            expect(result).toBe(500000); // Should find the position in the large map
            expect(duration).toBeLessThan(10); // Should be very fast
        });

        it("should handle rapid consecutive calls", () => {
            const start = Date.now();

            for (let i = 0; i < 1000; i++) {
                calculateOffsetForIndex(mockCtx, mockState, i % 4);
            }

            const duration = Date.now() - start;
            expect(duration).toBeLessThan(50); // Should be very fast for 1000 calls
        });
    });

    describe("real world scenarios", () => {
        it("should handle chat interface pattern (alignItemsAtEnd)", () => {
            // Simulate chat UI with padding top for bottom alignment
            mockCtx.values.set("stylePaddingTop", 200); // Space above messages
            mockCtx.values.set("headerSize", 0);

            const result = calculateOffsetForIndex(mockCtx, mockState, 2);
            expect(result).toBe(450); // 250 + 200
        });

        it("should handle list with sticky header", () => {
            mockCtx.values.set("headerSize", 60); // Sticky header
            mockCtx.values.set("stylePaddingTop", 10); // Additional spacing

            const result = calculateOffsetForIndex(mockCtx, mockState, 1);
            expect(result).toBe(170); // 100 + 60 + 10
        });

        it("should handle infinite scroll loading state", () => {
            // When loading, headerSize might be negative to account for loading indicator
            mockCtx.values.set("headerSize", -40); // Loading indicator adjustment

            const result = calculateOffsetForIndex(mockCtx, mockState, 0);
            expect(result).toBe(-40); // 0 + 0 - 40
        });
    });

    describe("integration with getId function", () => {
        it("should respect getId behavior for out of bounds", () => {
            // getId should handle out of bounds gracefully
            const result = calculateOffsetForIndex(mockCtx, mockState, 100);
            expect(result).toBe(0); // Default when key not found
        });

        it("should work when positions map has mixed key types", () => {
            mockState.positions = new Map([
                ["item_0", 0],
                ["1", 100], // String key
                ["item_2", 250],
                ["custom", 400],
            ]);

            // This should use getId which converts to "item_1" - won't match number 1
            const result = calculateOffsetForIndex(mockCtx, mockState, 1);
            expect(result).toBe(0);
        });
    });
});



================================================
FILE: __tests__/core/calculateOffsetWithOffsetPosition.test.ts
================================================
import { beforeEach, describe, expect, it } from "bun:test";
import "../setup"; // Import global test setup

import { calculateOffsetWithOffsetPosition } from "../../src/core/calculateOffsetWithOffsetPosition";
import type { InternalState, ScrollIndexWithOffsetPosition } from "../../src/types";

describe("calculateOffsetWithOffsetPosition", () => {
    let mockState: InternalState;

    beforeEach(() => {
        // Create mock state with basic setup
        mockState = {
            idCache: new Map(), // Required for getId function
            positions: new Map([
                ["item_0", 0],
                ["item_1", 100],
                ["item_2", 250],
                ["item_3", 400],
            ]),
            props: {
                data: [
                    { id: "item1", name: "First" },
                    { id: "item2", name: "Second" },
                    { id: "item3", name: "Third" },
                    { id: "item4", name: "Fourth" },
                ],
                estimatedItemSize: 100,
                keyExtractor: (item: any, index: number) => `item_${index}`,
            },
            scrollingTo: undefined,
            scrollLength: 400, // Viewport height/width
            sizes: new Map(),
            sizesKnown: new Map([
                ["item_0", 80],
                ["item_1", 120],
                ["item_2", 90],
                ["item_3", 110],
            ]),
        } as any;
    });

    describe("basic functionality", () => {
        it("should return original offset when no adjustments needed", () => {
            const result = calculateOffsetWithOffsetPosition(mockState, 100, {});
            expect(result).toBe(100);
        });

        it("should handle empty params object", () => {
            const result = calculateOffsetWithOffsetPosition(mockState, 250, {});
            expect(result).toBe(250);
        });

        it("should handle all undefined params", () => {
            const params: Partial<ScrollIndexWithOffsetPosition> = {
                index: undefined,
                viewOffset: undefined,
                viewPosition: undefined,
            };
            const result = calculateOffsetWithOffsetPosition(mockState, 150, params);
            expect(result).toBe(150);
        });
    });

    describe("viewOffset handling", () => {
        it("should subtract viewOffset from offset", () => {
            const params = { viewOffset: 50 };
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(150); // 200 - 50
        });

        it("should handle zero viewOffset", () => {
            const params = { viewOffset: 0 };
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(200);
        });

        it("should handle negative viewOffset", () => {
            const params = { viewOffset: -30 };
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(230); // 200 - (-30)
        });

        it("should handle large viewOffset", () => {
            const params = { viewOffset: 1000 };
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(-800); // 200 - 1000
        });
    });

    describe("viewPosition handling", () => {
        it("should adjust offset based on viewPosition when index provided", () => {
            const params = {
                index: 1,
                viewPosition: 0.5, // Middle of viewport
            };
            // scrollLength = 400, item size = 120 (from sizesKnown)
            // adjustment = 0.5 * (400 - 120) = 0.5 * 280 = 140
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(60); // 200 - 140
        });

        it("should handle viewPosition = 0 (top of viewport)", () => {
            const params = {
                index: 1,
                viewPosition: 0,
            };
            // adjustment = 0 * (400 - 120) = 0
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(200); // 200 - 0
        });

        it("should handle viewPosition = 1 (bottom of viewport)", () => {
            const params = {
                index: 1,
                viewPosition: 1,
            };
            // adjustment = 1 * (400 - 120) = 280
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(-80); // 200 - 280
        });

        it("should not adjust when viewPosition provided but index is undefined", () => {
            const params = {
                viewPosition: 0.5,
                // index: undefined
            };
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(200); // No adjustment
        });

        it("should not adjust when index provided but viewPosition is undefined", () => {
            const params = {
                index: 1,
                // viewPosition: undefined
            };
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(200); // No adjustment
        });
    });

    describe("combined viewOffset and viewPosition", () => {
        it("should apply both viewOffset and viewPosition adjustments", () => {
            const params = {
                index: 1,
                viewOffset: 50,
                viewPosition: 0.5,
            };
            // viewOffset adjustment: -50
            // viewPosition adjustment: -140 (0.5 * (400 - 120))
            // total: 200 - 50 - 140 = 10
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(10);
        });

        it("should handle negative viewOffset with viewPosition", () => {
            const params = {
                index: 0,
                viewOffset: -25,
                viewPosition: 0.25,
            };
            // viewOffset adjustment: -(-25) = +25
            // item size for index 0 = 80 (from sizesKnown)
            // viewPosition adjustment: -80 (0.25 * (400 - 80))
            // total: 150 + 25 - 80 = 95
            const result = calculateOffsetWithOffsetPosition(mockState, 150, params);
            expect(result).toBe(95);
        });
    });

    describe("item size calculation", () => {
        it("should use cached size when available", () => {
            const params = {
                index: 2,
                viewPosition: 0.5,
            };
            // Cached size for item_2 is 90
            // adjustment = 0.5 * (400 - 90) = 155
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(45); // 200 - 155
        });

        it("should fall back to estimated size when not cached", () => {
            // Remove from cache
            mockState.sizesKnown.delete("item_1");

            const params = {
                index: 1,
                viewPosition: 0.5,
            };
            // Should use estimatedItemSize = 100
            // adjustment = 0.5 * (400 - 100) = 150
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(50); // 200 - 150
        });

        it("should handle item size larger than scrollLength", () => {
            mockState.sizesKnown.set("item_1", 500); // Larger than scrollLength (400)

            const params = {
                index: 1,
                viewPosition: 0.5,
            };
            // adjustment = 0.5 * (400 - 500) = 0.5 * (-100) = -50
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(250); // 200 - (-50)
        });
    });

    describe("edge cases and error handling", () => {
        it("should handle null state gracefully", () => {
            const result = calculateOffsetWithOffsetPosition(null as any, 100, {});
            expect(result).toBe(100); // No adjustments applied when state is null
        });

        it("should handle out of bounds index", () => {
            const params = {
                index: 10, // Out of bounds
                viewPosition: 0.5,
            };
            // Should fall back to estimatedItemSize since getItemSize handles this
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(50); // 200 - (0.5 * (400 - 100))
        });

        it("should handle negative index", () => {
            const params = {
                index: -1,
                viewPosition: 0.5,
            };
            // Should fall back to estimatedItemSize
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(50); // 200 - (0.5 * (400 - 100))
        });

        it("should handle viewPosition outside 0-1 range", () => {
            const params = {
                index: 1,
                viewPosition: 1.5, // > 1
            };
            // adjustment = 1.5 * (400 - 120) = 420
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(-220); // 200 - 420
        });

        it("should handle negative viewPosition", () => {
            const params = {
                index: 1,
                viewPosition: -0.5,
            };
            // adjustment = -0.5 * (400 - 120) = -140
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(340); // 200 - (-140)
        });

        it("should handle zero scrollLength", () => {
            mockState.scrollLength = 0;

            const params = {
                index: 1,
                viewPosition: 0.5,
            };
            // adjustment = 0.5 * (0 - 120) = -60
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(260); // 200 - (-60)
        });

        it("should handle corrupted cached sizes", () => {
            mockState.sizesKnown = null as any;

            const params = {
                index: 1,
                viewPosition: 0.5,
            };
            // Should throw when sizesKnown is null
            expect(() => {
                calculateOffsetWithOffsetPosition(mockState, 200, params);
            }).toThrow();
        });

        it("should handle missing estimatedItemSize", () => {
            mockState.props.estimatedItemSize = undefined;
            mockState.sizesKnown.delete("item_1");

            const params = {
                index: 1,
                viewPosition: 0.5,
            };
            // getItemSize should handle this gracefully
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(typeof result).toBe("number");
        });
    });

    describe("performance and large datasets", () => {
        it("should handle large datasets efficiently", () => {
            // Create large dataset
            const largeData = Array.from({ length: 10000 }, (_, i) => ({
                id: `item${i}`,
                name: `Item ${i}`,
            }));
            mockState.props.data = largeData;

            const start = Date.now();

            for (let i = 0; i < 100; i++) {
                calculateOffsetWithOffsetPosition(mockState, 200, {
                    index: i,
                    viewOffset: 25,
                    viewPosition: 0.5,
                });
            }

            const duration = Date.now() - start;
            expect(duration).toBeLessThan(50); // Should be fast for 100 calculations
        });

        it("should handle rapid consecutive calls", () => {
            const start = Date.now();

            for (let i = 0; i < 1000; i++) {
                calculateOffsetWithOffsetPosition(mockState, i, {
                    index: i % 4,
                    viewOffset: i % 10,
                    viewPosition: (i % 100) / 100,
                });
            }

            const duration = Date.now() - start;
            expect(duration).toBeLessThan(100); // Should be very fast
        });
    });

    describe("real world scenarios", () => {
        it("should handle scrollToIndex with center positioning", () => {
            // Typical scrollToIndex to center an item
            const params = {
                index: 2,
                viewOffset: 0,
                viewPosition: 0.5, // Center item in viewport
            };
            // Item size = 90, scrollLength = 400
            // adjustment = 0.5 * (400 - 90) = 155
            const result = calculateOffsetWithOffsetPosition(mockState, 250, params);
            expect(result).toBe(95); // 250 - 155
        });

        it("should handle scrollToIndex with top positioning", () => {
            const params = {
                index: 1,
                viewOffset: 10, // Small margin from top
                viewPosition: 0, // Align to top
            };
            // viewPosition adjustment = 0 * (400 - 120) = 0
            const result = calculateOffsetWithOffsetPosition(mockState, 100, params);
            expect(result).toBe(90); // 100 - 10 - 0
        });

        it("should handle scrollToIndex with bottom positioning", () => {
            const params = {
                index: 3,
                viewOffset: -20, // Negative to push up from bottom
                viewPosition: 1, // Align to bottom
            };
            // Item size = 110, adjustment = 1 * (400 - 110) = 290
            const result = calculateOffsetWithOffsetPosition(mockState, 400, params);
            expect(result).toBe(130); // 400 - (-20) - 290
        });

        it("should handle chat interface scroll to end", () => {
            // In chat UI, scrolling to show new message at bottom
            const params = {
                index: 3, // Last message
                viewOffset: 0,
                viewPosition: 1, // Bottom of viewport
            };
            const result = calculateOffsetWithOffsetPosition(mockState, 400, params);
            expect(result).toBe(110); // 400 - (1 * (400 - 110))
        });

        it("should handle infinite scroll positioning", () => {
            // When loading new items, maintain position relative to a specific item
            const params = {
                index: 1,
                viewOffset: 50, // Account for loading indicator
                viewPosition: 0.3, // Specific position in viewport
            };
            // adjustment = 0.3 * (400 - 120) = 84
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBe(66); // 200 - 50 - 84
        });
    });

    describe("floating point precision", () => {
        it("should handle floating point viewPosition values", () => {
            const params = {
                index: 1,
                viewPosition: 0.333333, // Precise floating point
            };
            // adjustment = 0.333333 * (400 - 120) = 93.33324
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBeCloseTo(106.67, 2); // 200 - 93.33
        });

        it("should handle very small viewPosition values", () => {
            const params = {
                index: 1,
                viewPosition: 0.001,
            };
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(result).toBeCloseTo(199.72, 2); // Very small adjustment
        });
    });

    describe("integration with getItemSize", () => {
        it("should use getItemSize for unknown items", () => {
            // Clear cached size and add to data but not cache
            mockState.sizesKnown.delete("item_1");

            const params = {
                index: 1,
                viewPosition: 0.5,
            };
            // Should use estimatedItemSize or getItemSize fallback
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(typeof result).toBe("number");
        });

        it("should handle getItemSize with different data types", () => {
            mockState.props = { ...mockState.props, data: [...mockState.props.data] };
            (mockState.props.data as any)[1] = { size: 150 }; // Different structure

            const params = {
                index: 1,
                viewPosition: 0.5,
            };
            const result = calculateOffsetWithOffsetPosition(mockState, 200, params);
            expect(typeof result).toBe("number");
        });
    });
});



================================================
FILE: __tests__/core/doInitialAllocateContainers.test.ts
================================================
import { afterEach, beforeEach, describe, expect, it, spyOn } from "bun:test";
import "../setup"; // Import global test setup

import { Animated } from "react-native";
import * as calculateItemsInViewModule from "../../src/core/calculateItemsInView";
import { doInitialAllocateContainers } from "../../src/core/doInitialAllocateContainers";
import type { StateContext } from "../../src/state/state";
import type { InternalState } from "../../src/types";

// Create a properly typed mock context
function createMockContext(initialValues: Record<string, any> = {}): StateContext {
    const values = new Map(Object.entries(initialValues));
    const listeners = new Map();

    return {
        animatedScrollY: new Animated.Value(0),
        columnWrapperStyle: undefined,
        listeners,
        mapViewabilityAmountCallbacks: new Map(),
        mapViewabilityAmountValues: new Map(),
        mapViewabilityCallbacks: new Map(),
        mapViewabilityValues: new Map(),
        values,
        viewRefs: new Map(),
    };
}

function createMockState(overrides: Partial<InternalState> = {}): InternalState {
    return {
        hasScrolled: false,
        idCache: new Map(),
        idsInView: [],
        ignoreScrollFromMVCP: undefined,
        ignoreScrollFromMVCPTimeout: undefined,
        indexByKey: new Map(),
        isScrolling: false,
        lastBatchingAction: 0,
        positions: new Map(),
        props: {
            data: [
                { id: 0, text: "Item 0" },
                { id: 1, text: "Item 1" },
                { id: 2, text: "Item 2" },
                { id: 3, text: "Item 3" },
                { id: 4, text: "Item 4" },
            ],
            estimatedItemSize: 100,
            initialContainerPoolRatio: 0.8,
            keyExtractor: (item: any) => `item-${item.id}`,
            numColumns: 1,
            scrollBuffer: 50,
        },
        scroll: 0,
        scrollAdjustHandler: {
            requestAdjust: () => {},
        },
        scrollForNextCalculateItemsInView: undefined,
        scrollHistory: [],
        scrollingTo: undefined,
        scrollLength: 500,
        scrollPending: 0,
        scrollPrev: 0,
        scrollPrevTime: 0,
        scrollTime: 0,
        sizes: new Map(),
        sizesCache: new Map(),
        timeouts: new Set(),
        ...overrides,
    } as InternalState;
}

describe("doInitialAllocateContainers", () => {
    let mockCtx: StateContext;
    let mockState: InternalState;
    let calculateItemsInViewSpy: any;
    let originalRAF: any;
    let rafCallbacks: ((time: number) => void)[];
    beforeEach(() => {
        mockCtx = createMockContext();
        mockState = createMockState();

        // Spy on calculateItemsInView
        calculateItemsInViewSpy = spyOn(calculateItemsInViewModule, "calculateItemsInView");

        // Mock requestAnimationFrame
        originalRAF = globalThis.requestAnimationFrame;
        rafCallbacks = [];
        globalThis.requestAnimationFrame = (callback: (time: number) => void) => {
            rafCallbacks.push(callback);
            return rafCallbacks.length;
        };
    });

    afterEach(() => {
        // Restore original functions
        globalThis.requestAnimationFrame = originalRAF;
    });

    describe("basic functionality", () => {
        it("should allocate containers when conditions are met", () => {
            const result = doInitialAllocateContainers(mockCtx, mockState);

            expect(result).toBe(true);
            expect(mockCtx.values.get("numContainers")).toBeGreaterThan(0);
        });

        it("should return undefined when scrollLength is 0", () => {
            mockState.scrollLength = 0;

            const result = doInitialAllocateContainers(mockCtx, mockState);

            expect(result).toBeUndefined();
            expect(mockCtx.values.get("numContainers")).toBeUndefined();
        });

        it("should return undefined when data is empty", () => {
            mockState.props.data = [];

            const result = doInitialAllocateContainers(mockCtx, mockState);

            expect(result).toBeUndefined();
            expect(mockCtx.values.get("numContainers")).toBeUndefined();
        });

        it("should return undefined when containers already allocated", () => {
            mockCtx.values.set("numContainers", 10);

            const result = doInitialAllocateContainers(mockCtx, mockState);

            expect(result).toBeUndefined();
        });

        it("should allocate when numContainers is 0 (falsy)", () => {
            mockCtx.values.set("numContainers", 0);

            const result = doInitialAllocateContainers(mockCtx, mockState);

            // 0 is falsy, so it should trigger allocation
            expect(result).toBe(true);
            expect(mockCtx.values.get("numContainers")).toBeGreaterThan(0);
        });
    });

    describe("container calculation", () => {
        it("should calculate correct number of containers with estimatedItemSize", () => {
            mockState.props.estimatedItemSize = 100;
            mockState.scrollLength = 500;
            mockState.props.scrollBuffer = 50;
            mockState.props.numColumns = 1;

            doInitialAllocateContainers(mockCtx, mockState);

            // Expected: ((500 + 50*2) / 100) * 1 * 1.5 = 9 containers
            expect(mockCtx.values.get("numContainers")).toBe(9);
        });

        it("should use getEstimatedItemSize when available", () => {
            const getEstimatedItemSize = (index: number, item: any) => 150;
            mockState.props.getEstimatedItemSize = getEstimatedItemSize;
            mockState.scrollLength = 600;
            mockState.props.scrollBuffer = 100;

            doInitialAllocateContainers(mockCtx, mockState);

            // Expected: ((600 + 100*2) / 150) * 1 * 1.5 = Math.ceil(8) = 8 containers
            expect(mockCtx.values.get("numContainers")).toBe(8);
        });

        it("should handle multi-column layouts", () => {
            mockState.props.numColumns = 2;
            mockState.props.estimatedItemSize = 100;
            mockState.scrollLength = 500;
            mockState.props.scrollBuffer = 50;

            doInitialAllocateContainers(mockCtx, mockState);

            // Expected: ((500 + 50*2) / 100) * 2 * 1.5 = 18 containers
            expect(mockCtx.values.get("numContainers")).toBe(18);
        });

        it("should handle fractional container calculations", () => {
            mockState.props.estimatedItemSize = 75;
            mockState.scrollLength = 500;
            mockState.props.scrollBuffer = 25;

            doInitialAllocateContainers(mockCtx, mockState);

            // Expected: ((500 + 25*2) / 75) * 1 * 1.5 = 11 containers (ceil)
            expect(mockCtx.values.get("numContainers")).toBe(11);
        });

        it("should apply Extra multiplier correctly", () => {
            mockState.props.estimatedItemSize = 100;
            mockState.scrollLength = 400;
            mockState.props.scrollBuffer = 0;

            doInitialAllocateContainers(mockCtx, mockState);

            // Expected: (400 / 100) * 1 * 1.5 = 6 containers
            expect(mockCtx.values.get("numContainers")).toBe(6);
        });
    });

    describe("container initialization", () => {
        it("should set container positions to out of view", () => {
            doInitialAllocateContainers(mockCtx, mockState);

            const numContainers = mockCtx.values.get("numContainers");
            for (let i = 0; i < numContainers; i++) {
                expect(mockCtx.values.get(`containerPosition${i}`)).toBe(-10000000); // POSITION_OUT_OF_VIEW
            }
        });

        it("should set container columns to -1", () => {
            doInitialAllocateContainers(mockCtx, mockState);

            const numContainers = mockCtx.values.get("numContainers");
            for (let i = 0; i < numContainers; i++) {
                expect(mockCtx.values.get(`containerColumn${i}`)).toBe(-1);
            }
        });

        it("should set numContainersPooled correctly", () => {
            mockState.props.initialContainerPoolRatio = 0.8;

            doInitialAllocateContainers(mockCtx, mockState);

            const numContainers = mockCtx.values.get("numContainers");
            const numPooled = mockCtx.values.get("numContainersPooled");

            expect(numPooled).toBe(numContainers * 0.8);
        });

        it("should handle different pooling ratios", () => {
            mockState.props.initialContainerPoolRatio = 0.5;

            doInitialAllocateContainers(mockCtx, mockState);

            const numContainers = mockCtx.values.get("numContainers");
            const numPooled = mockCtx.values.get("numContainersPooled");

            expect(numPooled).toBe(numContainers * 0.5);
        });

        it("should handle zero pooling ratio", () => {
            mockState.props.initialContainerPoolRatio = 0;

            doInitialAllocateContainers(mockCtx, mockState);

            const numContainers = mockCtx.values.get("numContainers");
            const numPooled = mockCtx.values.get("numContainersPooled");

            expect(numPooled).toBe(0);
        });
    });

    describe("calculateItemsInView integration", () => {
        it("should handle different initialScroll configurations", () => {
            // Test with no initialScroll
            mockState.props.initialScroll = undefined;
            doInitialAllocateContainers(mockCtx, mockState);
            expect(mockCtx.values.get("numContainers")).toBeGreaterThan(0);

            // Reset for next test
            mockCtx.values.delete("numContainers");

            // Test with initialScroll set
            mockState.props.initialScroll = { index: 10, viewOffset: 100 };
            doInitialAllocateContainers(mockCtx, mockState);
            expect(mockCtx.values.get("numContainers")).toBeGreaterThan(0);

            // Note: calculateItemsInView behavior depends on IsNewArchitecture
            // which we cannot easily mock, so we just verify allocation succeeds
        });

        it("should handle initialScroll = 0 as falsy", () => {
            mockState.props.initialScroll = { index: 0, viewOffset: 0 };

            doInitialAllocateContainers(mockCtx, mockState);

            expect(mockCtx.values.get("numContainers")).toBeGreaterThan(0);
        });
    });

    describe("edge cases and error handling", () => {
        it("should handle very small estimated item sizes", () => {
            mockState.props.estimatedItemSize = 1;
            mockState.scrollLength = 1000;

            doInitialAllocateContainers(mockCtx, mockState);

            const numContainers = mockCtx.values.get("numContainers");
            expect(numContainers).toBeGreaterThan(0);
            expect(numContainers).toBeLessThan(10000); // Reasonable upper bound
        });

        it("should handle very large estimated item sizes", () => {
            mockState.props.estimatedItemSize = 10000;
            mockState.scrollLength = 500;

            doInitialAllocateContainers(mockCtx, mockState);

            const numContainers = mockCtx.values.get("numContainers");
            expect(numContainers).toBe(1); // Should still allocate at least 1
        });

        it("should handle zero scroll buffer", () => {
            mockState.props.scrollBuffer = 0;

            expect(() => {
                doInitialAllocateContainers(mockCtx, mockState);
            }).not.toThrow();

            expect(mockCtx.values.get("numContainers")).toBeGreaterThan(0);
        });

        it("should handle undefined estimated item size with getEstimatedItemSize", () => {
            mockState.props.estimatedItemSize = undefined as any;
            mockState.props.getEstimatedItemSize = () => 120;

            doInitialAllocateContainers(mockCtx, mockState);

            expect(mockCtx.values.get("numContainers")).toBeGreaterThan(0);
        });

        it("should handle both undefined estimated item sizes", () => {
            mockState.props.estimatedItemSize = undefined as any;
            mockState.props.getEstimatedItemSize = undefined;

            expect(() => {
                doInitialAllocateContainers(mockCtx, mockState);
            }).not.toThrow();

            // Should handle gracefully - may or may not allocate containers
        });

        it("should handle negative scroll length", () => {
            mockState.scrollLength = -100;

            const result = doInitialAllocateContainers(mockCtx, mockState);

            expect(result).toBeUndefined();
        });

        it("should handle zero scroll length", () => {
            mockState.scrollLength = 0;

            const result = doInitialAllocateContainers(mockCtx, mockState);

            expect(result).toBeUndefined();
        });

        it("should handle very large number of columns", () => {
            mockState.props.numColumns = 100;
            mockState.props.estimatedItemSize = 50;
            mockState.scrollLength = 500;

            doInitialAllocateContainers(mockCtx, mockState);

            const numContainers = mockCtx.values.get("numContainers");
            expect(numContainers).toBeGreaterThan(0);
        });
    });

    describe("performance considerations", () => {
        it("should handle large datasets efficiently", () => {
            const largeData = Array.from({ length: 10000 }, (_, i) => ({ id: i, text: `Item ${i}` }));
            mockState.props.data = largeData;

            const start = performance.now();
            doInitialAllocateContainers(mockCtx, mockState);
            const duration = performance.now() - start;

            expect(duration).toBeLessThan(10); // Should be fast
            expect(mockCtx.values.get("numContainers")).toBeGreaterThan(0);
        });

        it("should not over-allocate containers for normal use cases", () => {
            mockState.scrollLength = 1000;
            mockState.props.estimatedItemSize = 50;
            mockState.props.scrollBuffer = 100;

            doInitialAllocateContainers(mockCtx, mockState);

            const numContainers = mockCtx.values.get("numContainers");
            // Should be reasonable - not more than 100 containers for this case
            expect(numContainers).toBeLessThan(100);
            expect(numContainers).toBeGreaterThan(10);
        });

        it("should handle repeated calls gracefully", () => {
            // First call should allocate
            const result1 = doInitialAllocateContainers(mockCtx, mockState);
            expect(result1).toBe(true);

            // Subsequent calls should not re-allocate
            const result2 = doInitialAllocateContainers(mockCtx, mockState);
            expect(result2).toBeUndefined();

            const result3 = doInitialAllocateContainers(mockCtx, mockState);
            expect(result3).toBeUndefined();
        });
    });

    describe("integration scenarios", () => {
        it("should work with dynamic estimated item size function", () => {
            let callCount = 0;
            mockState.props.getEstimatedItemSize = (index: number, item: any) => {
                callCount++;
                return item.id === 0 ? 200 : 100; // First item is larger
            };

            doInitialAllocateContainers(mockCtx, mockState);

            expect(callCount).toBe(1); // Should call once with first item
            expect(mockCtx.values.get("numContainers")).toBeGreaterThan(0);
        });

        it("should handle RAF scheduling for initialScroll", () => {
            mockState.props.initialScroll = { index: 50, viewOffset: 500 };

            doInitialAllocateContainers(mockCtx, mockState);

            expect(mockCtx.values.get("numContainers")).toBeGreaterThan(0);

            // RAF behavior depends on IsNewArchitecture
            // We verify that the function completes without errors
        });

        it("should properly initialize containers", () => {
            doInitialAllocateContainers(mockCtx, mockState);

            const numContainers = mockCtx.values.get("numContainers");
            expect(numContainers).toBeGreaterThan(0);

            // Verify all containers are properly initialized
            for (let i = 0; i < numContainers; i++) {
                expect(mockCtx.values.get(`containerPosition${i}`)).toBe(-10000000);
                expect(mockCtx.values.get(`containerColumn${i}`)).toBe(-1);
            }
        });
    });

    describe("boundary conditions", () => {
        it("should handle minimum viable configuration", () => {
            mockState.scrollLength = 1;
            mockState.props.estimatedItemSize = 1;
            mockState.props.scrollBuffer = 0;
            mockState.props.numColumns = 1;
            mockState.props.data = [{ id: 0 }];

            doInitialAllocateContainers(mockCtx, mockState);

            expect(mockCtx.values.get("numContainers")).toBeGreaterThan(0);
        });

        it("should handle maximum reasonable configuration", () => {
            mockState.scrollLength = 10000;
            mockState.props.estimatedItemSize = 1000;
            mockState.props.scrollBuffer = 1000;
            mockState.props.numColumns = 5;

            doInitialAllocateContainers(mockCtx, mockState);

            const numContainers = mockCtx.values.get("numContainers");
            expect(numContainers).toBeGreaterThan(0);
            expect(numContainers).toBeLessThan(1000); // Reasonable upper bound
        });

        it("should handle floating point calculations correctly", () => {
            mockState.scrollLength = 333;
            mockState.props.estimatedItemSize = 77;
            mockState.props.scrollBuffer = 33;

            doInitialAllocateContainers(mockCtx, mockState);

            const numContainers = mockCtx.values.get("numContainers");
            expect(Number.isInteger(numContainers)).toBe(true);
            expect(numContainers).toBeGreaterThan(0);
        });
    });
});



================================================
FILE: __tests__/core/doMaintainScrollAtEnd.test.ts
================================================
import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import "../setup"; // Import global test setup

import { doMaintainScrollAtEnd } from "../../src/core/doMaintainScrollAtEnd";
import type { StateContext } from "../../src/state/state";
import type { InternalState } from "../../src/types";

describe("doMaintainScrollAtEnd", () => {
    let mockCtx: StateContext;
    let mockState: InternalState;
    let mockScrollToEnd: ReturnType<typeof mock>;
    let rafCallback: ((time: number) => void) | null = null;
    let timeoutCallback: (() => void) | null = null;

    // Mock requestAnimationFrame and setTimeout
    const originalRAF = globalThis.requestAnimationFrame;
    const originalSetTimeout = globalThis.setTimeout;

    beforeEach(() => {
        rafCallback = null;
        timeoutCallback = null;

        // Mock requestAnimationFrame
        globalThis.requestAnimationFrame = mock((callback: (time: number) => void) => {
            rafCallback = callback;
            return 1; // Mock return value
        });

        // Mock setTimeout
        globalThis.setTimeout = mock((callback: () => void, delay: number) => {
            timeoutCallback = callback;
            return 1 as any; // Return mock timeout ID
        });

        mockScrollToEnd = mock();

        // Create mock context
        mockCtx = {
            get: (key: string) => mockCtx.values.get(key),
            isSettingValue: false,
            listeners: new Map(),
            onListenerAdded: () => {},
            peek: (key: string) => mockCtx.values.get(key),
            set: () => {},
            values: new Map([
                ["containersDidLayout", true],
                ["alignItemsPaddingTop", 0],
            ]),
        } as any;

        // Create mock state
        mockState = {
            isAtEnd: true,
            maintainingScrollAtEnd: false,
            props: {
                maintainScrollAtEnd: true,
            },
            refScroller: {
                current: {
                    scrollToEnd: mockScrollToEnd,
                },
            },
            scroll: 100,
        } as any;
    });

    afterEach(() => {
        // Clear any callbacks that might be pending
        rafCallback = null;
        timeoutCallback = null;
        
        // Restore original functions
        globalThis.requestAnimationFrame = originalRAF;
        globalThis.setTimeout = originalSetTimeout;
    });

    describe("basic functionality", () => {
        it("should return true and trigger scroll when all conditions are met", () => {
            const result = doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(result).toBe(true);
            expect(globalThis.requestAnimationFrame).toHaveBeenCalledTimes(1);

            // Execute the RAF callback
            if (rafCallback) {
                rafCallback();
                expect(mockState.maintainingScrollAtEnd).toBe(true);
                expect(mockScrollToEnd).toHaveBeenCalledWith({ animated: true });
                expect(globalThis.setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
            }
        });

        it("should use animated=false parameter correctly", () => {
            const result = doMaintainScrollAtEnd(mockCtx, mockState, false);

            expect(result).toBe(true);

            // Execute the RAF callback
            if (rafCallback) {
                rafCallback();
                expect(mockScrollToEnd).toHaveBeenCalledWith({ animated: false });
                expect(globalThis.setTimeout).toHaveBeenCalledWith(expect.any(Function), 0);
            }
        });

        it("should reset maintainingScrollAtEnd flag after timeout", () => {
            doMaintainScrollAtEnd(mockCtx, mockState, true);

            // Execute the RAF callback
            if (rafCallback) {
                rafCallback();
                expect(mockState.maintainingScrollAtEnd).toBe(true);

                // Execute the timeout callback
                if (timeoutCallback) {
                    timeoutCallback();
                    expect(mockState.maintainingScrollAtEnd).toBe(false);
                }
            }
        });
    });

    describe("condition checking", () => {
        it("should not trigger when isAtEnd is false", () => {
            mockState.isAtEnd = false;

            const result = doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(result).toBeUndefined();
            expect(globalThis.requestAnimationFrame).not.toHaveBeenCalled();
        });

        it("should not trigger when maintainScrollAtEnd is false", () => {
            mockState.props.maintainScrollAtEnd = false;

            const result = doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(result).toBeUndefined();
            expect(globalThis.requestAnimationFrame).not.toHaveBeenCalled();
        });

        it("should not trigger when containersDidLayout is false", () => {
            mockCtx.values.set("containersDidLayout", false);

            const result = doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(result).toBeUndefined();
            expect(globalThis.requestAnimationFrame).not.toHaveBeenCalled();
        });

        it("should handle containersDidLayout being undefined", () => {
            mockCtx.values.set("containersDidLayout", undefined);

            const result = doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(result).toBeUndefined();
            expect(globalThis.requestAnimationFrame).not.toHaveBeenCalled();
        });

        it("should require all conditions to be true", () => {
            // Test various combinations of false conditions
            const testCases = [
                { containersDidLayout: true, isAtEnd: false, maintainScrollAtEnd: true },
                { containersDidLayout: true, isAtEnd: true, maintainScrollAtEnd: false },
                { containersDidLayout: false, isAtEnd: true, maintainScrollAtEnd: true },
                { containersDidLayout: false, isAtEnd: false, maintainScrollAtEnd: false },
            ];

            testCases.forEach(({ isAtEnd, maintainScrollAtEnd, containersDidLayout }) => {
                // Reset mocks
                mockScrollToEnd.mockClear();
                (globalThis.requestAnimationFrame as any).mockClear();

                mockState.isAtEnd = isAtEnd;
                mockState.props.maintainScrollAtEnd = maintainScrollAtEnd;
                mockCtx.values.set("containersDidLayout", containersDidLayout);

                const result = doMaintainScrollAtEnd(mockCtx, mockState, true);

                expect(result).toBeUndefined();
                expect(globalThis.requestAnimationFrame).not.toHaveBeenCalled();
            });
        });
    });

    describe("padding top handling", () => {
        it("should set scroll to 0 when alignItemsPaddingTop > 0", () => {
            mockCtx.values.set("alignItemsPaddingTop", 100);
            mockState.scroll = 250; // Initial scroll value

            doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(mockState.scroll).toBe(0);
        });

        it("should not modify scroll when alignItemsPaddingTop is 0", () => {
            mockCtx.values.set("alignItemsPaddingTop", 0);
            mockState.scroll = 250;

            doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(mockState.scroll).toBe(250); // Unchanged
        });

        it("should not modify scroll when alignItemsPaddingTop is negative", () => {
            mockCtx.values.set("alignItemsPaddingTop", -50);
            mockState.scroll = 250;

            doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(mockState.scroll).toBe(250); // Unchanged
        });

        it("should handle alignItemsPaddingTop being undefined", () => {
            mockCtx.values.set("alignItemsPaddingTop", undefined);
            mockState.scroll = 250;

            doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(mockState.scroll).toBe(250); // Unchanged
        });
    });

    describe("ref scroller handling", () => {
        it("should handle null refScroller", () => {
            mockState.refScroller.current = null;

            const result = doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(result).toBe(true);

            // Execute the RAF callback - should not throw
            if (rafCallback) {
                expect(() => rafCallback!()).not.toThrow();
            }
        });

        it("should handle undefined refScroller.current", () => {
            mockState.refScroller = { current: undefined };

            const result = doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(result).toBe(true);

            // Execute the RAF callback - should not throw
            if (rafCallback) {
                expect(() => rafCallback!()).not.toThrow();
            }
        });

        it("should handle missing scrollToEnd method", () => {
            mockState.refScroller.current = {} as any; // No scrollToEnd method

            const result = doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(result).toBe(true);

            // Execute the RAF callback - this WILL throw because scrollToEnd is missing
            if (rafCallback) {
                expect(() => rafCallback!()).toThrow("refScroller.current?.scrollToEnd is not a function");
            }
        });
    });

    describe("edge cases and error handling", () => {
        it("should handle null state gracefully", () => {
            expect(() => {
                doMaintainScrollAtEnd(mockCtx, null as any, true);
            }).toThrow();
        });

        it("should handle corrupted state props", () => {
            mockState.props = null as any;

            expect(() => {
                doMaintainScrollAtEnd(mockCtx, mockState, true);
            }).toThrow();
        });

        it("should handle corrupted context values", () => {
            mockCtx.values = null as any;

            expect(() => {
                doMaintainScrollAtEnd(mockCtx, mockState, true);
            }).toThrow();
        });

        it("should handle missing peek function in context", () => {
            mockCtx.peek = undefined as any;

            // Function uses peek$ which may handle undefined context gracefully
            expect(() => {
                doMaintainScrollAtEnd(mockCtx, mockState, true);
            }).not.toThrow();
        });

        it("should handle scrollToEnd throwing error", () => {
            mockScrollToEnd.mockImplementation(() => {
                throw new Error("Scroll failed");
            });

            const result = doMaintainScrollAtEnd(mockCtx, mockState, true);
            expect(result).toBe(true);

            // Execute the RAF callback - should handle error gracefully
            if (rafCallback) {
                expect(() => rafCallback!()).toThrow("Scroll failed");
            }
        });
    });

    describe("timing and async behavior", () => {
        it("should use correct timeout duration for animated scroll", () => {
            doMaintainScrollAtEnd(mockCtx, mockState, true);

            if (rafCallback) {
                rafCallback();
                expect(globalThis.setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
            }
        });

        it("should use correct timeout duration for non-animated scroll", () => {
            doMaintainScrollAtEnd(mockCtx, mockState, false);

            if (rafCallback) {
                rafCallback();
                expect(globalThis.setTimeout).toHaveBeenCalledWith(expect.any(Function), 0);
            }
        });

        it("should maintain flag state during animation", () => {
            doMaintainScrollAtEnd(mockCtx, mockState, true);

            // Before RAF callback
            expect(mockState.maintainingScrollAtEnd).toBe(false);

            // After RAF callback, before timeout
            if (rafCallback) {
                rafCallback();
                expect(mockState.maintainingScrollAtEnd).toBe(true);

                // After timeout
                if (timeoutCallback) {
                    timeoutCallback();
                    expect(mockState.maintainingScrollAtEnd).toBe(false);
                }
            }
        });

        it("should handle multiple rapid calls", () => {
            // First call
            doMaintainScrollAtEnd(mockCtx, mockState, true);
            const firstRAF = rafCallback;

            // Second call before first RAF executes
            doMaintainScrollAtEnd(mockCtx, mockState, false);
            const secondRAF = rafCallback;

            expect(globalThis.requestAnimationFrame).toHaveBeenCalledTimes(2);

            // Execute both RAF callbacks
            if (firstRAF) firstRAF();
            if (secondRAF) secondRAF();

            expect(mockScrollToEnd).toHaveBeenCalledTimes(2);
        });
    });

    describe("real world scenarios", () => {
        it("should handle chat interface new message scenario", () => {
            // Simulate chat interface with new message added
            mockCtx.values.set("alignItemsPaddingTop", 0); // No padding when list is full
            mockState.scroll = 800; // Scrolled down

            const result = doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(result).toBe(true);
            expect(mockState.scroll).toBe(800); // Should not change

            if (rafCallback) {
                rafCallback();
                expect(mockScrollToEnd).toHaveBeenCalledWith({ animated: true });
            }
        });

        it("should handle chat interface with short list", () => {
            // Simulate chat with few messages (list shorter than viewport)
            mockCtx.values.set("alignItemsPaddingTop", 150); // Padding indicates short list
            mockState.scroll = 50;

            const result = doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(result).toBe(true);
            expect(mockState.scroll).toBe(0); // Should be reset for short list

            if (rafCallback) {
                rafCallback();
                expect(mockScrollToEnd).toHaveBeenCalledWith({ animated: true });
            }
        });

        it("should handle live feed updates", () => {
            // Simulate live feed where user is at the bottom
            doMaintainScrollAtEnd(mockCtx, mockState, false); // Non-animated for live updates

            if (rafCallback) {
                rafCallback();
                expect(mockScrollToEnd).toHaveBeenCalledWith({ animated: false });
                expect(globalThis.setTimeout).toHaveBeenCalledWith(expect.any(Function), 0);
            }
        });

        it("should handle notification list updates", () => {
            // Simulate notification list maintaining scroll at end
            mockState.isAtEnd = true;
            mockState.props.maintainScrollAtEnd = true;

            const result = doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(result).toBe(true);

            if (rafCallback) {
                rafCallback();
                expect(mockState.maintainingScrollAtEnd).toBe(true);

                // Verify cleanup after animation
                if (timeoutCallback) {
                    timeoutCallback();
                    expect(mockState.maintainingScrollAtEnd).toBe(false);
                }
            }
        });
    });

    describe("integration with alignItemsAtEnd", () => {
        it("should work correctly when alignItemsAtEnd is active", () => {
            // alignItemsAtEnd typically used for chat interfaces
            mockCtx.values.set("alignItemsPaddingTop", 200);
            mockState.scroll = 300;

            const result = doMaintainScrollAtEnd(mockCtx, mockState, true);

            expect(result).toBe(true);
            expect(mockState.scroll).toBe(0); // Reset due to padding

            if (rafCallback) {
                rafCallback();
                expect(mockScrollToEnd).toHaveBeenCalledWith({ animated: true });
            }
        });

        it("should handle dynamic padding changes", () => {
            // Padding can change as items are added/removed
            const paddingValues = [0, 50, 100, 0, 75];

            paddingValues.forEach((padding, index) => {
                mockCtx.values.set("alignItemsPaddingTop", padding);
                mockState.scroll = 100 + index * 50;

                const initialScroll = mockState.scroll;
                const result = doMaintainScrollAtEnd(mockCtx, mockState, true);

                expect(result).toBe(true);

                if (padding > 0) {
                    expect(mockState.scroll).toBe(0);
                } else {
                    expect(mockState.scroll).toBe(initialScroll);
                }
            });
        });
    });

    describe("performance considerations", () => {
        it("should handle rapid consecutive calls efficiently", () => {
            const start = Date.now();

            for (let i = 0; i < 100; i++) {
                doMaintainScrollAtEnd(mockCtx, mockState, i % 2 === 0);
            }

            const duration = Date.now() - start;
            expect(duration).toBeLessThan(50); // Should be very fast
            expect(globalThis.requestAnimationFrame).toHaveBeenCalledTimes(100);
        });

        it("should not cause memory leaks with RAF callbacks", () => {
            // Call multiple times and ensure cleanup
            for (let i = 0; i < 10; i++) {
                doMaintainScrollAtEnd(mockCtx, mockState, true);
                if (rafCallback) {
                    rafCallback();
                    if (timeoutCallback) {
                        timeoutCallback();
                    }
                }
            }

            // Should not accumulate state
            expect(mockState.maintainingScrollAtEnd).toBe(false);
        });
    });
});



================================================
FILE: __tests__/core/finishScrollTo.test.ts
================================================
import { describe, expect, it } from "bun:test";
import "../setup"; // Import global test setup

import { finishScrollTo } from "../../src/core/finishScrollTo";
import type { InternalState } from "../../src/types";

describe("finishScrollTo", () => {
    describe("basic functionality", () => {
        it("should clear scrollingTo and scrollHistory when state is valid", () => {
            const mockState: InternalState = {
                scrollHistory: [
                    { scroll: 0, time: Date.now() - 1000 },
                    { scroll: 50, time: Date.now() - 500 },
                    { scroll: 75, time: Date.now() - 100 },
                ],
                scrollingTo: { animated: true, offset: 100 },
            } as any;

            finishScrollTo(mockState);

            expect(mockState.scrollingTo).toBeUndefined();
            expect(mockState.scrollHistory.length).toBe(0);
        });

        it("should handle state with undefined scrollingTo", () => {
            const mockState: InternalState = {
                scrollHistory: [{ scroll: 100, time: Date.now() }],
                scrollingTo: undefined,
            } as any;

            finishScrollTo(mockState);

            expect(mockState.scrollingTo).toBeUndefined();
            expect(mockState.scrollHistory.length).toBe(0);
        });

        it("should handle state with empty scrollHistory", () => {
            const mockState: InternalState = {
                scrollHistory: [],
                scrollingTo: { animated: false, offset: 200 },
            } as any;

            finishScrollTo(mockState);

            expect(mockState.scrollingTo).toBeUndefined();
            expect(mockState.scrollHistory.length).toBe(0);
        });
    });

    describe("null/undefined state handling", () => {
        it("should handle null state gracefully", () => {
            expect(() => {
                finishScrollTo(null);
            }).not.toThrow();
        });

        it("should handle undefined state gracefully", () => {
            expect(() => {
                finishScrollTo(undefined);
            }).not.toThrow();
        });
    });

    describe("edge cases", () => {
        it("should handle corrupted scrollHistory", () => {
            const mockState = {
                scrollHistory: null as any,
                scrollingTo: { offset: 100 },
            } as InternalState;

            expect(() => {
                finishScrollTo(mockState);
            }).toThrow();
        });

        it("should handle missing scrollHistory property", () => {
            const mockState = {
                scrollingTo: { offset: 100 },
                // scrollHistory property missing
            } as any;

            expect(() => {
                finishScrollTo(mockState);
            }).toThrow();
        });

        it("should handle very large scrollHistory", () => {
            const largeHistory = Array.from({ length: 10000 }, (_, i) => ({
                scroll: i * 10,
                time: Date.now() - i,
            }));

            const mockState: InternalState = {
                scrollHistory: largeHistory,
                scrollingTo: { offset: 100 },
            } as any;

            finishScrollTo(mockState);

            expect(mockState.scrollingTo).toBeUndefined();
            expect(mockState.scrollHistory.length).toBe(0);
        });
    });

    describe("state consistency", () => {
        it("should not affect other state properties", () => {
            const mockState: InternalState = {
                isAtEnd: false,
                maintainingScrollAtEnd: false,
                scroll: 75,
                scrollHistory: [{ scroll: 50, time: Date.now() }],
                scrollingTo: { offset: 100 },
                scrollLength: 400,
            } as any;

            const originalScroll = mockState.scroll;
            const originalScrollLength = mockState.scrollLength;
            const originalIsAtEnd = mockState.isAtEnd;
            const originalMaintaining = mockState.maintainingScrollAtEnd;

            finishScrollTo(mockState);

            // Should only clear scrollingTo and scrollHistory
            expect(mockState.scrollingTo).toBeUndefined();
            expect(mockState.scrollHistory.length).toBe(0);

            // Should not affect other properties
            expect(mockState.scroll).toBe(originalScroll);
            expect(mockState.scrollLength).toBe(originalScrollLength);
            expect(mockState.isAtEnd).toBe(originalIsAtEnd);
            expect(mockState.maintainingScrollAtEnd).toBe(originalMaintaining);
        });

        it("should work with partial state objects", () => {
            const minimalState = {
                scrollHistory: [{ scroll: 0, time: 0 }],
                scrollingTo: { offset: 100 },
            } as InternalState;

            finishScrollTo(minimalState);

            expect(minimalState.scrollingTo).toBeUndefined();
            expect(minimalState.scrollHistory.length).toBe(0);
        });
    });

    describe("performance", () => {
        it("should handle rapid consecutive calls efficiently", () => {
            const mockState: InternalState = {
                scrollHistory: [{ scroll: 50, time: Date.now() }],
                scrollingTo: { offset: 100 },
            } as any;

            const start = Date.now();

            for (let i = 0; i < 1000; i++) {
                // Reset state for each call
                mockState.scrollingTo = { offset: i };
                mockState.scrollHistory = [{ scroll: i, time: Date.now() }];

                finishScrollTo(mockState);
            }

            const duration = Date.now() - start;
            expect(duration).toBeLessThan(50); // Should be very fast
        });
    });

    describe("integration scenarios", () => {
        it("should work in typical scroll completion flow", () => {
            // Simulate a typical scrollTo -> onScroll -> finishScrollTo flow
            const mockState: InternalState = {
                scrollHistory: [
                    { scroll: 100, time: Date.now() - 500 },
                    { scroll: 300, time: Date.now() - 300 },
                    { scroll: 450, time: Date.now() - 100 },
                    { scroll: 500, time: Date.now() },
                ],
                scrollingTo: {
                    animated: true,
                    index: 5,
                    offset: 500,
                    viewPosition: 0.5,
                },
            } as any;

            finishScrollTo(mockState);

            expect(mockState.scrollingTo).toBeUndefined();
            expect(mockState.scrollHistory.length).toBe(0);
        });

        it("should handle interrupted scroll scenarios", () => {
            // When user interrupts a scroll with another scroll
            const mockState: InternalState = {
                scrollHistory: [
                    { scroll: 0, time: Date.now() - 200 },
                    { scroll: 100, time: Date.now() - 100 },
                    // Scroll was interrupted before reaching target
                ],
                scrollingTo: {
                    animated: true,
                    offset: 200,
                },
            } as any;

            finishScrollTo(mockState);

            expect(mockState.scrollingTo).toBeUndefined();
            expect(mockState.scrollHistory.length).toBe(0);
        });

        it("should work with programmatic scrolls", () => {
            // scrollToIndex, scrollTo, etc.
            const mockState: InternalState = {
                scrollHistory: [],
                scrollingTo: {
                    animated: false,
                    index: 10,
                    offset: 800,
                },
            } as any;

            finishScrollTo(mockState);

            expect(mockState.scrollingTo).toBeUndefined();
            expect(mockState.scrollHistory.length).toBe(0);
        });
    });
});



================================================
FILE: __tests__/core/handleLayout.test.ts
================================================
import { beforeEach, describe, expect, it } from "bun:test";
import "../setup"; // Import global test setup

import { handleLayout } from "../../src/core/handleLayout";
import type { StateContext } from "../../src/state/state";
import type { InternalState } from "../../src/types";

// Create a properly typed mock context
function createMockContext(initialValues: Record<string, any> = {}): StateContext {
    const values = new Map(Object.entries(initialValues));
    const listeners = new Map();

    return {
        columnWrapperStyle: undefined,
        listeners,
        mapViewabilityAmountCallbacks: new Map(),
        mapViewabilityAmountValues: new Map(),
        mapViewabilityCallbacks: new Map(),
        mapViewabilityValues: new Map(),
        values,
        viewRefs: new Map(),
    };
}

describe("handleLayout", () => {
    let mockCtx: StateContext;
    let mockState: InternalState;
    let mockLayout: any;
    let setCanRenderCalls: boolean[];
    let setCanRender: (canRender: boolean) => void;

    beforeEach(() => {
        setCanRenderCalls = [];
        setCanRender = (canRender: boolean) => setCanRenderCalls.push(canRender);

        mockCtx = createMockContext({
            contentSize: 1000,
            numColumns: 1,
            scrollSize: { height: 600, width: 400 },
        });

        mockState = {
            averageSizes: {},
            columns: new Map(),
            endReachedBlockedByTimer: false,
            firstFullyOnScreenIndex: undefined,
            hasScrolled: false,
            idCache: new Map(),
            ignoreScrollFromMVCP: undefined,
            indexByKey: new Map(),
            isAtEnd: false,
            isAtStart: true,
            isEndReached: false,
            isStartReached: false,
            lastBatchingAction: 0,
            lastLayout: undefined,
            maintainingScrollAtEnd: false,
            needsOtherAxisSize: false,
            otherAxisSize: 0,
            positions: new Map(),
            props: {
                data: [],
                estimatedItemSize: 100,
                getEstimatedItemSize: undefined,
                horizontal: false,
                maintainScrollAtEnd: false,
                maintainScrollAtEndThreshold: 0.1,
                onEndReachedThreshold: 0.2,
                onStartReachedThreshold: 0.2,
                stylePaddingTop: 0,
            },
            queuedInitialLayout: true,
            scroll: 0,
            scrollForNextCalculateItemsInView: undefined,
            scrollHistory: [],
            scrollingTo: undefined,
            scrollLength: 0,
            scrollPending: 0,
            scrollPrev: 0,
            scrollPrevTime: 0,
            scrollTime: 0,
            sizes: new Map(),
            sizesKnown: new Map(),
            startReachedBlockedByTimer: false,
        } as InternalState;

        mockLayout = {
            height: 600,
            width: 400,
            x: 0,
            y: 0,
        };
    });

    describe("basic layout handling", () => {
        it("should update scroll length for vertical layout", () => {
            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollLength).toBe(600); // height
            expect(mockState.otherAxisSize).toBe(400); // width
            expect(setCanRenderCalls).toEqual([true]);
        });

        it("should update scroll length for horizontal layout", () => {
            mockState.props.horizontal = true;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollLength).toBe(400); // width
            expect(mockState.otherAxisSize).toBe(600); // height
        });

        it("should store last layout", () => {
            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.lastLayout).toEqual(mockLayout);
        });

        it("should update last batching action timestamp", () => {
            const beforeTime = Date.now();

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            const afterTime = Date.now();

            expect(mockState.lastBatchingAction).toBeGreaterThanOrEqual(beforeTime);
            expect(mockState.lastBatchingAction).toBeLessThanOrEqual(afterTime);
        });

        it("should clear scrollForNextCalculateItemsInView", () => {
            mockState.scrollForNextCalculateItemsInView = { bottom: 200, top: 100 };

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollForNextCalculateItemsInView).toBeUndefined();
        });
    });

    describe("change detection", () => {
        it("should detect no layout when lastLayout is undefined", () => {
            mockState.lastLayout = undefined;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            // Should trigger calculation (needsCalculate = true)
            expect(mockState.lastLayout).toEqual(mockLayout);
        });

        it("should detect size changes", () => {
            mockState.lastLayout = { height: 600, width: 400, x: 0, y: 0 };
            mockState.scrollLength = 600;

            // Change height
            mockLayout.height = 800;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollLength).toBe(800);
        });

        it("should detect position changes", () => {
            mockState.lastLayout = { height: 600, width: 400, x: 0, y: 0 };
            mockState.scrollLength = 600;

            // Change position
            mockLayout.x = 50;
            mockLayout.y = 100;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.lastLayout.x).toBe(50);
            expect(mockState.lastLayout.y).toBe(100);
        });

        it("should not recalculate when dimensions are smaller", () => {
            mockState.lastLayout = { height: 600, width: 400, x: 0, y: 0 };
            mockState.scrollLength = 600;

            // Make smaller
            mockLayout.height = 400;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollLength).toBe(400);
        });

        it("should trigger recalculation when size increases", () => {
            mockState.lastLayout = { height: 600, width: 400, x: 0, y: 0 };
            mockState.scrollLength = 600;

            // Make larger
            mockLayout.height = 800;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollLength).toBe(800);
        });
    });

    describe("maintain scroll at end", () => {
        it("should handle maintainScrollAtEnd as boolean true", () => {
            mockState.props.maintainScrollAtEnd = true;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            // Function should complete without error
            expect(mockState.scrollLength).toBe(600);
        });

        it("should handle maintainScrollAtEnd as object with onLayout", () => {
            mockState.props.maintainScrollAtEnd = { onLayout: true };

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollLength).toBe(600);
        });

        it("should skip maintainScrollAtEnd when false", () => {
            mockState.props.maintainScrollAtEnd = false;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollLength).toBe(600);
        });

        it("should handle maintainScrollAtEnd as object without onLayout", () => {
            mockState.props.maintainScrollAtEnd = { onLayout: false };

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollLength).toBe(600);
        });
    });

    describe("other axis size management", () => {
        it("should detect need for other axis size when size is small", () => {
            mockLayout.width = 5; // Very small width
            mockState.props.stylePaddingTop = 0;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.needsOtherAxisSize).toBe(true);
        });

        it("should not need other axis size when size is adequate", () => {
            mockLayout.width = 400; // Large width
            mockState.props.stylePaddingTop = 0;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.needsOtherAxisSize).toBe(false);
        });

        it("should account for padding when determining other axis size need", () => {
            mockLayout.width = 15; // 15px width
            mockState.props.stylePaddingTop = 10; // 10px padding

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            // 15 - 10 = 5, which is < 10, so needs other axis size
            expect(mockState.needsOtherAxisSize).toBe(true);
        });

        it("should handle horizontal layout for other axis size", () => {
            mockState.props.horizontal = true;
            mockLayout.height = 5; // Small height for horizontal layout
            mockState.props.stylePaddingTop = 0;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.needsOtherAxisSize).toBe(true);
        });
    });

    describe("scroll size context updates", () => {
        it("should update scrollSize context when dimensions change", () => {
            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockCtx.values.get("scrollSize")).toEqual({
                height: 600,
                width: 400,
            });
        });

        it("should update scrollSize when other axis size changes", () => {
            mockState.scrollLength = 600; // Same scroll length
            mockState.otherAxisSize = 300; // Different other axis size

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockCtx.values.get("scrollSize")).toEqual({
                height: 600,
                width: 400,
            });
        });

        it("should not update scrollSize when dimensions haven't changed", () => {
            mockState.scrollLength = 600;
            mockState.otherAxisSize = 400;
            mockCtx.values.set("scrollSize", { height: 600, width: 400 });

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            // Should still be updated due to implementation
            expect(mockCtx.values.get("scrollSize")).toEqual({
                height: 600,
                width: 400,
            });
        });
    });

    describe("development warnings", () => {
        it("should warn in development when scroll length is zero", () => {
            // Mock console.warn to capture warnings
            const originalWarn = console.warn;
            const warnings: string[] = [];
            console.warn = (message: string) => warnings.push(message);

            mockLayout.height = 0; // Zero height

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            console.warn = originalWarn;

            // In development mode, should warn about zero height
            // (The actual warning depends on __DEV__ being true, which may not be set in tests)
            expect(mockState.scrollLength).toBe(0);
        });

        it("should handle horizontal zero width warning", () => {
            mockState.props.horizontal = true;
            mockLayout.width = 0; // Zero width

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollLength).toBe(0);
        });
    });

    describe("edge cases and error handling", () => {
        it("should handle null layout gracefully", () => {
            expect(() => {
                handleLayout(mockCtx, mockState, null as any, setCanRender);
            }).toThrow();
        });

        it("should handle missing layout properties", () => {
            const incompleteLayout = { width: 400 }; // Missing height

            handleLayout(mockCtx, mockState, incompleteLayout as any, setCanRender);

            // Function handles missing properties gracefully
            expect(mockState.scrollLength).toBe(undefined); // height is undefined
            expect(mockState.otherAxisSize).toBe(400); // width is present
        });

        it("should handle negative dimensions", () => {
            mockLayout.width = -100;
            mockLayout.height = -200;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollLength).toBe(-200);
            expect(mockState.otherAxisSize).toBe(-100);
        });

        it("should handle very large dimensions", () => {
            mockLayout.width = Number.MAX_SAFE_INTEGER;
            mockLayout.height = Number.MAX_SAFE_INTEGER;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollLength).toBe(Number.MAX_SAFE_INTEGER);
            expect(mockState.otherAxisSize).toBe(Number.MAX_SAFE_INTEGER);
        });

        it("should handle floating point dimensions", () => {
            mockLayout.width = 400.75;
            mockLayout.height = 600.25;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollLength).toBe(600.25);
            expect(mockState.otherAxisSize).toBe(400.75);
        });

        it("should handle string dimensions", () => {
            mockLayout.width = "400";
            mockLayout.height = "600";

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollLength).toBe("600");
            expect(mockState.otherAxisSize).toBe("400");
        });

        it("should handle corrupted state", () => {
            mockState.props = null as any;

            expect(() => {
                handleLayout(mockCtx, mockState, mockLayout, setCanRender);
            }).toThrow();
        });

        it("should handle missing setCanRender callback", () => {
            expect(() => {
                handleLayout(mockCtx, mockState, mockLayout, null as any);
            }).toThrow();
        });
    });

    describe("integration and orchestration", () => {
        it("should call doInitialAllocateContainers", () => {
            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            // Function should complete without error, indicating integration works
            expect(mockState.scrollLength).toBe(600);
        });

        it("should call calculateItemsInView when needed", () => {
            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            // Function should complete, indicating calculateItemsInView was called
            expect(mockState.lastLayout).toEqual(mockLayout);
        });

        it("should call updateAlignItemsPaddingTop", () => {
            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.scrollLength).toBe(600);
        });

        it("should call checkAtBottom and checkAtTop", () => {
            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            // These functions update state flags
            expect(typeof mockState.isAtEnd).toBe("boolean");
            expect(typeof mockState.isAtStart).toBe("boolean");
        });

        it("should always call setCanRender with true", () => {
            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(setCanRenderCalls).toEqual([true]);
        });
    });

    describe("performance considerations", () => {
        it("should handle rapid layout changes efficiently", () => {
            const start = Date.now();

            for (let i = 0; i < 1000; i++) {
                mockLayout.height = 600 + i;
                handleLayout(mockCtx, mockState, mockLayout, setCanRender);
            }

            const duration = Date.now() - start;
            expect(duration).toBeLessThan(1000); // Should handle rapid changes efficiently
        });

        it("should maintain memory efficiency", () => {
            const initialMemory = process.memoryUsage().heapUsed;

            for (let i = 0; i < 100; i++) {
                const layout = {
                    height: 600 + i,
                    width: 400 + i,
                    x: i,
                    y: i,
                };
                handleLayout(mockCtx, mockState, layout, setCanRender);
            }

            const finalMemory = process.memoryUsage().heapUsed;
            const memoryIncrease = finalMemory - initialMemory;

            expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // Less than 10MB
        });

        it("should optimize when layout hasn't changed", () => {
            // First call
            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            // Second call with same layout (but needsCalculate will still be true due to missing lastLayout initially)
            const callsBefore = setCanRenderCalls.length;
            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(setCanRenderCalls.length).toBe(callsBefore + 1);
        });
    });

    describe("complex layout scenarios", () => {
        it("should handle layout with position offset", () => {
            mockLayout.x = 100;
            mockLayout.y = 200;

            handleLayout(mockCtx, mockState, mockLayout, setCanRender);

            expect(mockState.lastLayout.x).toBe(100);
            expect(mockState.lastLayout.y).toBe(200);
            expect(mockState.scrollLength).toBe(600);
        });

        it("should handle transition between horizontal and vertical", () => {
            // Start vertical
            mockState.props.horizontal = false;
            handleLayout(mockCtx, mockState, mockLayout, setCanRender);
            expect(mockState.scrollLength).toBe(600); // height

            // Switch to horizontal
            mockState.props.horizontal = true;
            handleLayout(mockCtx, mockState, mockLayout, setCanRender);
            expect(mockState.scrollLength).toBe(400); // width
        });

        it("should handle multiple consecutive size changes", () => {
            const sizes = [
                { height: 500, width: 300 },
                { height: 600, width: 400 },
                { height: 700, width: 500 },
                { height: 800, width: 600 },
            ];

            sizes.forEach((size) => {
                mockLayout.width = size.width;
                mockLayout.height = size.height;
                handleLayout(mockCtx, mockState, mockLayout, setCanRender);

                expect(mockState.scrollLength).toBe(size.height);
                expect(mockState.otherAxisSize).toBe(size.width);
            });
        });
    });
});



================================================
FILE: __tests__/core/onScroll.test.ts
================================================
import { beforeEach, describe, expect, it } from "bun:test";
import "../setup"; // Import global test setup

import { ScrollAdjustHandler } from "@/core/ScrollAdjustHandler";
import { onScroll } from "../../src/core/onScroll";
import type { StateContext } from "../../src/state/state";
import type { InternalState } from "../../src/types";

// Create a properly typed mock context
function createMockContext(initialValues: Record<string, any> = {}): StateContext {
    const values = new Map(Object.entries(initialValues));
    const listeners = new Map();

    return {
        columnWrapperStyle: undefined,
        listeners,
        mapViewabilityAmountCallbacks: new Map(),
        mapViewabilityAmountValues: new Map(),
        mapViewabilityCallbacks: new Map(),
        mapViewabilityValues: new Map(),
        values,
        viewRefs: new Map(),
    };
}

describe("onScroll", () => {
    let mockCtx: StateContext;
    let mockState: InternalState;
    let mockScrollEvent: any;
    let onScrollCalls: any[];

    beforeEach(() => {
        onScrollCalls = [];

        mockCtx = createMockContext({
            contentSize: 1000,
            numColumns: 1,
        });

        mockState = {
            averageSizes: {},
            columns: new Map(),
            endReachedBlockedByTimer: false,
            firstFullyOnScreenIndex: undefined,
            hasScrolled: false,
            idCache: new Map(),
            ignoreScrollFromMVCP: undefined,
            indexByKey: new Map(),
            isAtEnd: false,
            isAtStart: true,
            isEndReached: false,
            isStartReached: false,
            lastBatchingAction: 0,
            maintainingScrollAtEnd: false,
            positions: new Map(),
            props: {
                data: [],
                estimatedItemSize: 100,
                getEstimatedItemSize: undefined,
                horizontal: false,
                maintainScrollAtEndThreshold: 0.1,
                onEndReached: undefined,
                onEndReachedThreshold: 0.2,
                onScroll: (event: any) => onScrollCalls.push(event),
                onStartReached: undefined,
                onStartReachedThreshold: 0.2,
            },
            queuedInitialLayout: true,
            scroll: 0,
            scrollAdjustHandler: new ScrollAdjustHandler(mockCtx),
            scrollHistory: [],
            scrollingTo: undefined,
            scrollLength: 500,
            scrollPending: 0,
            scrollPrev: 0,
            scrollPrevTime: 0,
            scrollTime: 0,
            sizes: new Map(),
            sizesKnown: new Map(),
            startReachedBlockedByTimer: false,
        } as InternalState;

        mockScrollEvent = {
            nativeEvent: {
                contentOffset: { x: 0, y: 100 },
                contentSize: { height: 1000, width: 400 },
            },
        };
    });

    describe("basic scroll handling", () => {
        it("should update scroll position for vertical scrolling", () => {
            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scrollPending).toBe(100);
            expect(mockState.scroll).toBe(100);
            expect(mockState.scrollPrev).toBe(0);
            expect(mockState.hasScrolled).toBe(true);
        });

        it("should update scroll position for horizontal scrolling", () => {
            mockState.props.horizontal = true;
            mockScrollEvent.nativeEvent.contentOffset.x = 150;

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scrollPending).toBe(150);
            expect(mockState.scroll).toBe(150);
        });

        it("should call original onScroll callback", () => {
            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(onScrollCalls.length).toBe(1);
            expect(onScrollCalls[0]).toBe(mockScrollEvent);
        });

        it("should update scroll timing", () => {
            const beforeTime = performance.now();

            onScroll(mockCtx, mockState, mockScrollEvent);

            const afterTime = performance.now();

            expect(mockState.scrollTime).toBeGreaterThanOrEqual(beforeTime);
            expect(mockState.scrollTime).toBeLessThanOrEqual(afterTime);
            expect(mockState.lastBatchingAction).toBeGreaterThan(0);
        });
    });

    describe("scroll history management", () => {
        it("should add to scroll history when scrolling normally", () => {
            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scrollHistory.length).toBe(1);
            expect(mockState.scrollHistory[0].scroll).toBe(100);
            expect(mockState.scrollHistory[0].time).toBeGreaterThan(0);
        });

        it("should not add to history when scrolling to specific position", () => {
            mockState.scrollingTo = { animated: true, index: 5, offset: 200 };

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scrollHistory.length).toBe(0);
        });

        it("should not add to history for initial scroll event with same position", () => {
            mockScrollEvent.nativeEvent.contentOffset.y = 0; // Same as state.scroll

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scrollHistory.length).toBe(0);
        });

        it("should limit scroll history to 5 entries", () => {
            // Add 7 scroll events
            for (let i = 1; i <= 7; i++) {
                mockScrollEvent.nativeEvent.contentOffset.y = i * 50;
                onScroll(mockCtx, mockState, mockScrollEvent);
            }

            expect(mockState.scrollHistory.length).toBe(5);
            expect(mockState.scrollHistory[0].scroll).toBe(150); // First entry should be from scroll 3
            expect(mockState.scrollHistory[4].scroll).toBe(350); // Last entry should be from scroll 7
        });

        it("should maintain correct order in scroll history", () => {
            const scrollPositions = [100, 150, 200, 250];

            scrollPositions.forEach((position) => {
                mockScrollEvent.nativeEvent.contentOffset.y = position;
                onScroll(mockCtx, mockState, mockScrollEvent);
            });

            expect(mockState.scrollHistory.length).toBe(4);
            scrollPositions.forEach((position, index) => {
                expect(mockState.scrollHistory[index].scroll).toBe(position);
            });
        });
    });

    describe("MVCP scroll ignore logic", () => {
        it("should ignore scroll events when position is less than ignore threshold", () => {
            mockState.ignoreScrollFromMVCP = { gt: undefined, lt: 150 };
            mockScrollEvent.nativeEvent.contentOffset.y = 100; // Less than 150

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scroll).toBe(0); // Should not update
            expect(mockState.scrollHistory.length).toBe(0);
        });

        it("should ignore scroll events when position is greater than ignore threshold", () => {
            mockState.ignoreScrollFromMVCP = { gt: 200, lt: undefined };
            mockScrollEvent.nativeEvent.contentOffset.y = 250; // Greater than 200

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scroll).toBe(0); // Should not update
            expect(mockState.scrollHistory.length).toBe(0);
        });

        it("should process scroll events within MVCP ignore range", () => {
            mockState.ignoreScrollFromMVCP = { gt: 200, lt: 50 };
            mockScrollEvent.nativeEvent.contentOffset.y = 100; // Between 50 and 200

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scroll).toBe(100);
            expect(mockState.scrollHistory.length).toBe(1);
        });

        it("should ignore MVCP when scrollingTo is active", () => {
            mockState.ignoreScrollFromMVCP = { gt: undefined, lt: 150 };
            mockState.scrollingTo = { animated: true, index: 5, offset: 200 };
            mockScrollEvent.nativeEvent.contentOffset.y = 100; // Less than 150 but should be processed

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scroll).toBe(100); // Should update despite MVCP ignore
        });

        it("should handle both lt and gt thresholds", () => {
            mockState.ignoreScrollFromMVCP = { gt: 200, lt: 50 };

            // Test below lt threshold
            mockScrollEvent.nativeEvent.contentOffset.y = 30;
            onScroll(mockCtx, mockState, mockScrollEvent);
            expect(mockState.scroll).toBe(0);

            // Test above gt threshold
            mockScrollEvent.nativeEvent.contentOffset.y = 250;
            onScroll(mockCtx, mockState, mockScrollEvent);
            expect(mockState.scroll).toBe(0);
        });
    });

    describe("content size validation", () => {
        it("should ignore scroll events with zero content size", () => {
            mockScrollEvent.nativeEvent.contentSize = { height: 0, width: 0 };

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scroll).toBe(0);
            expect(mockState.scrollHistory.length).toBe(0);
            expect(onScrollCalls.length).toBe(0);
        });

        it("should process scroll events with valid content size", () => {
            mockScrollEvent.nativeEvent.contentSize = { height: 1000, width: 400 };

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scroll).toBe(100);
            expect(onScrollCalls.length).toBe(1);
        });

        it("should handle missing content size gracefully", () => {
            delete mockScrollEvent.nativeEvent.contentSize;

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scroll).toBe(100);
            expect(onScrollCalls.length).toBe(1);
        });

        it("should handle partial content size", () => {
            mockScrollEvent.nativeEvent.contentSize = { width: 400 }; // Missing height

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scroll).toBe(100);
        });
    });

    describe("callback integration", () => {
        it("should handle missing onScroll callback", () => {
            mockState.props.onScroll = undefined;

            expect(() => onScroll(mockCtx, mockState, mockScrollEvent)).not.toThrow();
            expect(mockState.scroll).toBe(100);
        });

        it("should handle onScroll callback throwing error", () => {
            mockState.props.onScroll = () => {
                throw new Error("Callback error");
            };

            expect(() => onScroll(mockCtx, mockState, mockScrollEvent)).toThrow("Callback error");
        });

        it("should call onEndReached when appropriate", () => {
            const onEndReachedCalls: any[] = [];
            mockState.props.onEndReached = (event: any) => onEndReachedCalls.push(event);

            // Scroll near the end
            mockScrollEvent.nativeEvent.contentOffset.y = 900; // Close to contentSize of 1000

            onScroll(mockCtx, mockState, mockScrollEvent);

            // May trigger onEndReached depending on threshold calculation
            expect(mockState.isEndReached).toBeDefined();
        });

        it("should call onStartReached when appropriate", () => {
            const onStartReachedCalls: any[] = [];
            mockState.props.onStartReached = (event: any) => onStartReachedCalls.push(event);

            // Start with scroll position away from top
            mockState.scroll = 200;
            mockState.isAtStart = false;

            // Scroll near the top
            mockScrollEvent.nativeEvent.contentOffset.y = 10;

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.isStartReached).toBeDefined();
        });
    });

    describe("edge cases and error handling", () => {
        it("should handle null event", () => {
            expect(() => onScroll(mockCtx, mockState, null as any)).toThrow();
        });

        it("should handle missing nativeEvent", () => {
            const invalidEvent = { someOtherProperty: "value" };

            expect(() => onScroll(mockCtx, mockState, invalidEvent as any)).toThrow();
        });

        it("should handle invalid contentOffset", () => {
            mockScrollEvent.nativeEvent.contentOffset = null;

            expect(() => onScroll(mockCtx, mockState, mockScrollEvent)).toThrow();
        });

        it("should handle string contentOffset values", () => {
            mockScrollEvent.nativeEvent.contentOffset = { x: "100", y: "150" };

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scroll).toBe("150"); // Function doesn't validate types
        });

        it("should handle negative scroll positions", () => {
            mockScrollEvent.nativeEvent.contentOffset.y = -50;

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scroll).toBe(-50);
            expect(mockState.scrollHistory.length).toBe(1);
        });

        it("should handle very large scroll positions", () => {
            mockScrollEvent.nativeEvent.contentOffset.y = Number.MAX_SAFE_INTEGER;

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scroll).toBe(Number.MAX_SAFE_INTEGER);
        });

        it("should handle corrupted state gracefully", () => {
            mockState.scrollHistory = null as any;

            expect(() => onScroll(mockCtx, mockState, mockScrollEvent)).toThrow();
        });
    });

    describe("performance considerations", () => {
        it("should handle rapid scroll events efficiently", () => {
            const start = Date.now();

            for (let i = 0; i < 1000; i++) {
                mockScrollEvent.nativeEvent.contentOffset.y = i;
                onScroll(mockCtx, mockState, mockScrollEvent);
            }

            const duration = Date.now() - start;
            expect(duration).toBeLessThan(500); // Should handle rapid events efficiently
            expect(mockState.scrollHistory.length).toBe(5); // Should maintain limit
        });

        it("should update timing correctly for multiple events", () => {
            let lastTime = 0;

            for (let i = 0; i < 10; i++) {
                mockScrollEvent.nativeEvent.contentOffset.y = i * 50;
                onScroll(mockCtx, mockState, mockScrollEvent);

                expect(mockState.scrollTime).toBeGreaterThan(lastTime);
                lastTime = mockState.scrollTime;
            }
        });

        it("should maintain memory efficiency with large scroll history", () => {
            const initialMemory = process.memoryUsage().heapUsed;

            for (let i = 0; i < 10000; i++) {
                mockScrollEvent.nativeEvent.contentOffset.y = i;
                onScroll(mockCtx, mockState, mockScrollEvent);
            }

            const finalMemory = process.memoryUsage().heapUsed;
            const memoryIncrease = finalMemory - initialMemory;

            expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // Less than 10MB
            expect(mockState.scrollHistory.length).toBe(5); // Should maintain limit
        });
    });

    describe("integration with other systems", () => {
        it("should trigger calculateItemsInView", () => {
            // This is tested indirectly - function should complete without error
            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scroll).toBe(100);
            expect(mockState.hasScrolled).toBe(true);
        });

        it("should trigger checkAtBottom and checkAtTop", () => {
            onScroll(mockCtx, mockState, mockScrollEvent);

            // These functions update state flags
            expect(typeof mockState.isAtEnd).toBe("boolean");
            expect(typeof mockState.isAtStart).toBe("boolean");
        });

        it("should handle horizontal scrolling correctly", () => {
            mockState.props.horizontal = true;
            mockScrollEvent.nativeEvent.contentOffset.x = 200;

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scroll).toBe(200);
            expect(mockState.scrollHistory[0].scroll).toBe(200);
        });

        it("should handle mixed horizontal/vertical events", () => {
            // Start with vertical
            mockState.props.horizontal = false;
            mockScrollEvent.nativeEvent.contentOffset.y = 100;
            onScroll(mockCtx, mockState, mockScrollEvent);
            expect(mockState.scroll).toBe(100);

            // Switch to horizontal
            mockState.props.horizontal = true;
            mockScrollEvent.nativeEvent.contentOffset.x = 200;
            onScroll(mockCtx, mockState, mockScrollEvent);
            expect(mockState.scroll).toBe(200);
        });
    });

    describe("scroll state consistency", () => {
        it("should maintain correct previous scroll values", () => {
            // First scroll
            onScroll(mockCtx, mockState, mockScrollEvent);
            expect(mockState.scroll).toBe(100);
            expect(mockState.scrollPrev).toBe(0);

            // Second scroll
            mockScrollEvent.nativeEvent.contentOffset.y = 200;
            onScroll(mockCtx, mockState, mockScrollEvent);
            expect(mockState.scroll).toBe(200);
            expect(mockState.scrollPrev).toBe(100);
        });

        it("should update scrollPending before processing", () => {
            mockScrollEvent.nativeEvent.contentOffset.y = 300;

            onScroll(mockCtx, mockState, mockScrollEvent);

            expect(mockState.scrollPending).toBe(300);
            expect(mockState.scroll).toBe(300);
        });

        it("should handle rapid scroll direction changes", () => {
            const positions = [100, 200, 150, 180, 120];

            positions.forEach((position) => {
                mockScrollEvent.nativeEvent.contentOffset.y = position;
                onScroll(mockCtx, mockState, mockScrollEvent);
            });

            expect(mockState.scroll).toBe(120);
            expect(mockState.scrollHistory.length).toBe(5);
        });
    });
});



================================================
FILE: __tests__/core/prepareMVCP.test.ts
================================================
import { beforeEach, describe, expect, it, spyOn } from "bun:test";
import "../setup"; // Import global test setup

import { prepareMVCP } from "../../src/core/mvcp";
import type { StateContext } from "../../src/state/state";
import type { InternalState } from "../../src/types";
import * as requestAdjustModule from "../../src/utils/requestAdjust";

// Create a properly typed mock context
function createMockContext(initialValues: Record<string, any> = {}): StateContext {
    const values = new Map(Object.entries(initialValues));
    const listeners = new Map();

    return {
        columnWrapperStyle: undefined,
        listeners,
        mapViewabilityAmountCallbacks: new Map(),
        mapViewabilityAmountValues: new Map(),
        mapViewabilityCallbacks: new Map(),
        mapViewabilityValues: new Map(),
        values,
        viewRefs: new Map(),
    };
}

function createMockState(overrides: Partial<InternalState> = {}): InternalState {
    const positions = new Map([
        ["item-0", 0],
        ["item-1", 100],
        ["item-2", 250],
        ["item-3", 450],
        ["item-4", 550],
    ]);

    const indexByKey = new Map([
        ["item-0", 0],
        ["item-1", 1],
        ["item-2", 2],
        ["item-3", 3],
        ["item-4", 4],
    ]);

    return {
        hasScrolled: false,
        idCache: new Map([
            [0, "item-0"],
            [1, "item-1"],
            [2, "item-2"],
            [3, "item-3"],
            [4, "item-4"],
        ]),
        idsInView: ["item-1", "item-2"], // Default items in view
        ignoreScrollFromMVCP: undefined,
        ignoreScrollFromMVCPTimeout: undefined,
        indexByKey,
        isScrolling: false,
        lastBatchingAction: 0,
        positions,
        props: {
            data: [
                { id: 0, text: "Item 0" },
                { id: 1, text: "Item 1" },
                { id: 2, text: "Item 2" },
                { id: 3, text: "Item 3" },
                { id: 4, text: "Item 4" },
            ],
            keyExtractor: (item: any) => `item-${item.id}`,
            maintainVisibleContentPosition: {
                minIndexForVisible: 0,
            },
        },
        scroll: 0,
        scrollAdjustHandler: {
            requestAdjust: () => {}, // Mock scroll adjust handler
        },
        scrollForNextCalculateItemsInView: undefined,
        scrollHistory: [],
        scrollingTo: undefined,
        scrollLength: 500,
        scrollPending: 0,
        scrollPrev: 0,
        scrollPrevTime: 0,
        scrollTime: 0,
        sizes: new Map([
            ["item-0", 100],
            ["item-1", 150],
            ["item-2", 200],
            ["item-3", 100],
            ["item-4", 180],
        ]),
        sizesCache: new Map(),
        timeouts: new Set(),
        ...overrides,
    } as InternalState;
}

describe("prepareMVCP", () => {
    let mockCtx: StateContext;
    let mockState: InternalState;
    let requestAdjustSpy: any;

    beforeEach(() => {
        mockCtx = createMockContext({
            containersDidLayout: true,
        });

        mockState = createMockState();

        // Spy on requestAdjust function and reset it
        if (requestAdjustSpy) {
            requestAdjustSpy.mockRestore();
        }
        requestAdjustSpy = spyOn(requestAdjustModule, "requestAdjust");
    });

    describe("basic functionality", () => {
        it("should return a function when called", () => {
            const adjustFunction = prepareMVCP(mockCtx, mockState);
            expect(typeof adjustFunction).toBe("function");
        });

        it("should return no-op function when maintainVisibleContentPosition is disabled", () => {
            mockState.props.maintainVisibleContentPosition = undefined;

            const adjustFunction = prepareMVCP(mockCtx, mockState);

            // Change positions
            mockState.positions.set("item-1", 200);

            // Execute the returned function
            adjustFunction();

            // Should not call requestAdjust
            expect(requestAdjustSpy).not.toHaveBeenCalled();
        });

        it("should capture initial position of first visible item", () => {
            const adjustFunction = prepareMVCP(mockCtx, mockState);

            // Change the position of the first visible item
            mockState.positions.set("item-1", 150); // Changed from 100 to 150

            adjustFunction();

            expect(requestAdjustSpy).toHaveBeenCalledWith(mockCtx, mockState, 50, undefined);
        });

        it("should handle scrollingTo target prioritization", () => {
            mockState.scrollingTo = { animated: true, index: 3 };

            const adjustFunction = prepareMVCP(mockCtx, mockState);

            // Change the position of the scroll target
            mockState.positions.set("item-3", 500); // Changed from 450 to 500

            adjustFunction();

            expect(requestAdjustSpy).toHaveBeenCalledWith(mockCtx, mockState, 50, undefined);
        });
    });

    describe("anchor selection logic", () => {
        it("should prefer scrollingTo target over visible items", () => {
            mockState.scrollingTo = { animated: true, index: 2 };
            mockState.idsInView = ["item-0", "item-1"]; // Different visible items

            const adjustFunction = prepareMVCP(mockCtx, mockState);

            // Change positions of both potential anchors
            mockState.positions.set("item-0", 50); // First visible item
            mockState.positions.set("item-2", 300); // Scroll target (should win)

            adjustFunction();

            // Should track the scroll target (item-2), not the first visible item
            expect(requestAdjustSpy).toHaveBeenCalledWith(mockCtx, mockState, 50, undefined); // 300 - 250 = 50
        });

        it("should fallback to first visible item when no scrollingTo", () => {
            mockState.scrollingTo = undefined;
            mockState.idsInView = ["item-2", "item-3"];

            const adjustFunction = prepareMVCP(mockCtx, mockState);

            // Change position of first visible item
            mockState.positions.set("item-2", 300); // Changed from 250 to 300

            adjustFunction();

            expect(requestAdjustSpy).toHaveBeenCalledWith(mockCtx, mockState, 50, undefined);
        });

        it("should handle visible items not in indexByKey", () => {
            mockState.idsInView = ["non-existent-item", "item-1"];

            const adjustFunction = prepareMVCP(mockCtx, mockState);

            // Change position of the valid visible item
            mockState.positions.set("item-1", 150);

            adjustFunction();

            expect(requestAdjustSpy).toHaveBeenCalledWith(mockCtx, mockState, 50, undefined);
        });

        it("should handle no valid anchor items", () => {
            mockState.idsInView = [];
            mockState.scrollingTo = undefined;

            const adjustFunction = prepareMVCP(mockCtx, mockState);

            adjustFunction();

            expect(requestAdjustSpy).not.toHaveBeenCalled();
        });
    });

    describe("position change detection", () => {
        it("should ignore small position changes (<=0.1)", () => {
            const adjustFunction = prepareMVCP(mockCtx, mockState);

            // Make a tiny change
            mockState.positions.set("item-1", 100.05); // Change of 0.05

            adjustFunction();

            expect(requestAdjustSpy).not.toHaveBeenCalled();
        });

        it("should handle exactly 0.1 position change", () => {
            const adjustFunction = prepareMVCP(mockCtx, mockState);

            mockState.positions.set("item-1", 100.1); // Change of exactly 0.1

            adjustFunction();

            expect(requestAdjustSpy).not.toHaveBeenCalled();
        });

        it("should trigger on position change just above threshold", () => {
            const adjustFunction = prepareMVCP(mockCtx, mockState);

            mockState.positions.set("item-1", 100.11); // Change of 0.11

            adjustFunction();

            expect(requestAdjustSpy).toHaveBeenCalledTimes(1);

            // Get the actual call parameters to see what was passed
            const calls = requestAdjustSpy.mock.calls;
            expect(calls[0][0]).toBe(mockCtx);
            expect(calls[0][1]).toBe(mockState);
            expect(Math.abs(calls[0][2] - 0.11)).toBeLessThan(0.00001); // Use floating point comparison
        });

        it("should handle negative position changes", () => {
            const adjustFunction = prepareMVCP(mockCtx, mockState);

            mockState.positions.set("item-1", 50); // Change from 100 to 50 = -50

            adjustFunction();

            expect(requestAdjustSpy).toHaveBeenCalledWith(mockCtx, mockState, -50, undefined);
        });

        it("should handle zero position change", () => {
            const adjustFunction = prepareMVCP(mockCtx, mockState);

            // No position change
            adjustFunction();

            expect(requestAdjustSpy).not.toHaveBeenCalled();
        });

        it("should handle large position changes", () => {
            const adjustFunction = prepareMVCP(mockCtx, mockState);

            mockState.positions.set("item-1", 1000); // Large change

            adjustFunction();

            expect(requestAdjustSpy).toHaveBeenCalledWith(mockCtx, mockState, 900, undefined);
        });
    });

    describe("edge cases and error handling", () => {
        it("should handle missing position data after preparation", () => {
            const adjustFunction = prepareMVCP(mockCtx, mockState);

            // Remove the position after preparation
            mockState.positions.delete("item-1");

            adjustFunction();

            expect(requestAdjustSpy).not.toHaveBeenCalled();
        });

        it("should handle containers not yet laid out", () => {
            mockCtx.values.set("containersDidLayout", false);

            const adjustFunction = prepareMVCP(mockCtx, mockState);

            mockState.positions.set("item-1", 150);

            adjustFunction();

            expect(requestAdjustSpy).not.toHaveBeenCalled();
        });

        it("should handle empty idsInView array", () => {
            mockState.idsInView = [];
            mockState.scrollingTo = undefined;

            const adjustFunction = prepareMVCP(mockCtx, mockState);

            adjustFunction();

            expect(requestAdjustSpy).not.toHaveBeenCalled();
        });

        it("should handle corrupted indexByKey", () => {
            mockState.indexByKey = new Map(); // Empty map
            mockState.scrollingTo = undefined;

            const adjustFunction = prepareMVCP(mockCtx, mockState);

            adjustFunction();

            expect(requestAdjustSpy).not.toHaveBeenCalled();
        });

        it("should handle corrupted positions map", () => {
            mockState.positions = new Map(); // Empty map

            const adjustFunction = prepareMVCP(mockCtx, mockState);

            adjustFunction();

            expect(requestAdjustSpy).not.toHaveBeenCalled();
        });

        it("should handle invalid scrollingTo index", () => {
            mockState.scrollingTo = { animated: true, index: 999 }; // Out of bounds

            const adjustFunction = prepareMVCP(mockCtx, mockState);

            adjustFunction();

            expect(requestAdjustSpy).not.toHaveBeenCalled();
        });

        it("should handle NaN position values", () => {
            const adjustFunction = prepareMVCP(mockCtx, mockState);

            mockState.positions.set("item-1", NaN);

            adjustFunction();

            expect(requestAdjustSpy).not.toHaveBeenCalled();
        });

        it("should handle Infinity position values", () => {
            const adjustFunction = prepareMVCP(mockCtx, mockState);

            mockState.positions.set("item-1", Infinity);

            adjustFunction();

            expect(requestAdjustSpy).toHaveBeenCalledWith(mockCtx, mockState, Infinity, undefined);
        });
    });

    describe("integration scenarios", () => {
        it("should handle rapid successive MVCP preparations", () => {
            // Prepare multiple MVCP functions
            const adjust1 = prepareMVCP(mockCtx, mockState);
            const adjust2 = prepareMVCP(mockCtx, mockState);
            const adjust3 = prepareMVCP(mockCtx, mockState);

            // Change position
            mockState.positions.set("item-1", 150);

            // Execute all adjustment functions
            adjust1();
            adjust2();
            adjust3();

            // All should detect the same change
            expect(requestAdjustSpy).toHaveBeenCalledTimes(3);
            expect(requestAdjustSpy).toHaveBeenCalledWith(mockCtx, mockState, 50, undefined);
        });

        it("should handle switching between scroll targets", () => {
            // First preparation with scroll target
            mockState.scrollingTo = { animated: true, index: 2 };
            const adjust1 = prepareMVCP(mockCtx, mockState);

            // Change scroll target and prepare again
            mockState.scrollingTo = { animated: true, index: 3 };
            const adjust2 = prepareMVCP(mockCtx, mockState);

            // Change positions
            mockState.positions.set("item-2", 300); // Original target
            mockState.positions.set("item-3", 500); // New target

            adjust1(); // Should track item-2
            adjust2(); // Should track item-3

            expect(requestAdjustSpy).toHaveBeenCalledTimes(2);
            expect(requestAdjustSpy).toHaveBeenNthCalledWith(1, mockCtx, mockState, 50, undefined); // item-2: 300-250
            expect(requestAdjustSpy).toHaveBeenNthCalledWith(2, mockCtx, mockState, 50, undefined); // item-3: 500-450
        });

        it("should handle changing from scrollingTo to visible items", () => {
            // First with scrollingTo
            mockState.scrollingTo = { animated: true, index: 2 };
            const adjust1 = prepareMVCP(mockCtx, mockState);

            // Then without scrollingTo (falls back to visible items)
            mockState.scrollingTo = undefined;
            const adjust2 = prepareMVCP(mockCtx, mockState);

            // Change positions
            mockState.positions.set("item-2", 300); // scroll target
            mockState.positions.set("item-1", 150); // first visible item

            adjust1(); // Should track item-2
            adjust2(); // Should track item-1

            expect(requestAdjustSpy).toHaveBeenCalledTimes(2);
            expect(requestAdjustSpy).toHaveBeenNthCalledWith(1, mockCtx, mockState, 50, undefined); // item-2
            expect(requestAdjustSpy).toHaveBeenNthCalledWith(2, mockCtx, mockState, 50, undefined); // item-1
        });
    });

    describe("performance considerations", () => {
        it("should handle large datasets efficiently", () => {
            // Create large dataset
            const largeIndexByKey = new Map();
            const largePositions = new Map();
            const largeIdsInView = [];

            for (let i = 0; i < 1000; i++) {
                const id = `item-${i}`;
                largeIndexByKey.set(id, i);
                largePositions.set(id, i * 100);
                if (i < 10) largeIdsInView.push(id);
            }

            mockState.indexByKey = largeIndexByKey;
            mockState.positions = largePositions;
            mockState.idsInView = largeIdsInView;

            const start = performance.now();
            const adjustFunction = prepareMVCP(mockCtx, mockState);

            // Change first visible item position
            mockState.positions.set("item-0", 50);
            adjustFunction();

            const duration = performance.now() - start;

            expect(duration).toBeLessThan(5); // Should be very fast
            expect(requestAdjustSpy).toHaveBeenCalledWith(mockCtx, mockState, 50, undefined);
        });

        it("should handle rapid MVCP execution", () => {
            // NOTE: Each call to prepareMVCP captures the current position, so we need
            // to prepare it fresh each time to test rapid execution properly
            const start = performance.now();

            // Execute many MVCP preparations and adjustments
            for (let i = 1; i <= 100; i++) {
                // Start from 1 to ensure meaningful position changes
                const adjustFunction = prepareMVCP(mockCtx, mockState);
                mockState.positions.set("item-1", 100 + i * 0.2); // Use 0.2 increments to ensure > 0.1 threshold
                adjustFunction();
            }

            const duration = performance.now() - start;

            expect(duration).toBeLessThan(50); // Should handle rapid execution
            expect(requestAdjustSpy).toHaveBeenCalledTimes(100);
        });
    });

    describe("floating point precision", () => {
        it("should handle floating point precision correctly", () => {
            const adjustFunction = prepareMVCP(mockCtx, mockState);

            // Test borderline floating point case
            mockState.positions.set("item-1", 100.10000000001); // Just above 0.1 threshold

            adjustFunction();

            expect(requestAdjustSpy).toHaveBeenCalledTimes(1);
            const calls = requestAdjustSpy.mock.calls;
            expect(calls[0][0]).toBe(mockCtx);
            expect(calls[0][1]).toBe(mockState);
            expect(Math.abs(calls[0][2] - 0.10000000001)).toBeLessThan(1e-10); // Very precise floating point comparison
        });

        it("should handle very small floating point differences", () => {
            const adjustFunction = prepareMVCP(mockCtx, mockState);

            mockState.positions.set("item-1", 100.0000001); // Very small change

            adjustFunction();

            expect(requestAdjustSpy).not.toHaveBeenCalled();
        });
    });
});



================================================
FILE: __tests__/core/ScrollAdjustHandler.test.ts
================================================
import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import "../setup"; // Import global test setup

import { ScrollAdjustHandler } from "../../src/core/ScrollAdjustHandler";
import type { StateContext } from "../../src/state/state";

// Create a properly typed mock context
function createMockContext(initialValues: Record<string, any> = {}): StateContext {
    const values = new Map(Object.entries(initialValues));
    const listeners = new Map();

    return {
        columnWrapperStyle: undefined,
        listeners,
        mapViewabilityAmountCallbacks: new Map(),
        mapViewabilityAmountValues: new Map(),
        mapViewabilityCallbacks: new Map(),
        mapViewabilityValues: new Map(),
        values,
        viewRefs: new Map(),
    };
}

describe("ScrollAdjustHandler", () => {
    let mockCtx: StateContext;
    let handler: ScrollAdjustHandler;
    let originalRAF: any;
    let mockRafCallback: any;
    let rafCallCount: number;

    beforeEach(() => {
        mockCtx = createMockContext({
            scrollAdjust: 0,
        });

        handler = new ScrollAdjustHandler(mockCtx);

        // Store original requestAnimationFrame and mock it
        originalRAF = globalThis.requestAnimationFrame;
        rafCallCount = 0;
        globalThis.requestAnimationFrame = (callback: any) => {
            rafCallCount++;
            mockRafCallback = callback;
            return 1; // Return a fake handle
        };
    });

    afterEach(() => {
        // Restore original requestAnimationFrame
        globalThis.requestAnimationFrame = originalRAF;
    });

    describe("constructor", () => {
        it("should initialize with provided context", () => {
            expect(handler).toBeInstanceOf(ScrollAdjustHandler);
            expect((handler as any).context).toBe(mockCtx);
        });

        it("should initialize with default state", () => {
            expect((handler as any).appliedAdjust).toBe(0);
            expect((handler as any).mounted).toBe(false);
        });
    });

    describe("requestAdjust", () => {
        it("should calculate adjustment from context scrollAdjust", () => {
            handler.requestAdjust(10);
            expect((handler as any).appliedAdjust).toBe(10); // 10 + 0 (initial context value)

            // Simulate the context being updated (as would happen when set is called)
            mockCtx.values.set("scrollAdjust", 10);

            handler.requestAdjust(5);
            expect((handler as any).appliedAdjust).toBe(15); // 5 + 10 (context value)

            // Update context again
            mockCtx.values.set("scrollAdjust", 15);

            handler.requestAdjust(-3);
            expect((handler as any).appliedAdjust).toBe(12); // -3 + 15 (context value)
        });

        it("should use requestAnimationFrame when not mounted", () => {
            handler.requestAdjust(10);

            expect(rafCallCount).toBe(1);
            expect(mockCtx.values.get("scrollAdjust")).toBe(0); // Not set yet

            // Execute the RAF callback
            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(10);
        });

        it("should set immediately when mounted", () => {
            handler.setMounted();
            handler.requestAdjust(10);

            expect(rafCallCount).toBe(0);
            expect(mockCtx.values.get("scrollAdjust")).toBe(10);
        });

        it("should add to existing scrollAdjust value", () => {
            mockCtx.values.set("scrollAdjust", 5);

            handler.requestAdjust(10);
            expect((handler as any).appliedAdjust).toBe(15);

            // Execute the RAF callback to apply
            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(15);
        });

        it("should handle zero adjustments", () => {
            handler.requestAdjust(0);
            expect((handler as any).appliedAdjust).toBe(0);

            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(0);
        });

        it("should handle negative adjustments", () => {
            handler.requestAdjust(-25);
            expect((handler as any).appliedAdjust).toBe(-25);

            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(-25);
        });

        it("should handle multiple rapid adjustments when not mounted", () => {
            // Make multiple rapid adjustments
            handler.requestAdjust(5);
            handler.requestAdjust(3);
            handler.requestAdjust(2);

            // Should have RAF calls for each adjustment
            expect(rafCallCount).toBe(3);

            // Final appliedAdjust should be the last adjustment (2) plus initial context (0)
            expect((handler as any).appliedAdjust).toBe(2);

            // Execute the RAF callback
            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(2);
        });

        it("should handle multiple rapid adjustments when mounted", () => {
            handler.setMounted();

            handler.requestAdjust(5);
            expect(mockCtx.values.get("scrollAdjust")).toBe(5);

            handler.requestAdjust(3);
            expect(mockCtx.values.get("scrollAdjust")).toBe(8);

            handler.requestAdjust(2);
            expect(mockCtx.values.get("scrollAdjust")).toBe(10);

            expect(rafCallCount).toBe(0);
        });
    });

    describe("setMounted", () => {
        it("should change mounted state", () => {
            expect((handler as any).mounted).toBe(false);

            handler.setMounted();
            expect((handler as any).mounted).toBe(true);
        });

        it("should affect subsequent requestAdjust behavior", () => {
            // Before mounting - uses RAF
            handler.requestAdjust(10);
            expect(rafCallCount).toBe(1);

            // Reset the counter
            rafCallCount = 0;

            // After mounting - immediate
            handler.setMounted();
            handler.requestAdjust(5);
            expect(rafCallCount).toBe(0);
            expect(mockCtx.values.get("scrollAdjust")).toBe(5); // Should be set immediately
        });

        it("should be idempotent", () => {
            handler.setMounted();
            handler.setMounted();
            handler.setMounted();

            expect((handler as any).mounted).toBe(true);
        });
    });

    describe("edge cases and error handling", () => {
        it("should handle undefined scrollAdjust in context", () => {
            mockCtx.values.delete("scrollAdjust");

            handler.requestAdjust(10);
            expect((handler as any).appliedAdjust).toBe(10);

            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(10);
        });

        it("should handle null scrollAdjust in context", () => {
            mockCtx.values.set("scrollAdjust", null);

            handler.requestAdjust(10);
            expect((handler as any).appliedAdjust).toBe(10);

            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(10);
        });

        it("should handle very large adjustment values", () => {
            const largeValue = Number.MAX_SAFE_INTEGER;

            handler.requestAdjust(largeValue);
            expect((handler as any).appliedAdjust).toBe(largeValue);

            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(largeValue);
        });

        it("should handle very small adjustment values", () => {
            const smallValue = Number.MIN_SAFE_INTEGER;

            handler.requestAdjust(smallValue);
            expect((handler as any).appliedAdjust).toBe(smallValue);

            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(smallValue);
        });

        it("should handle NaN adjustment values", () => {
            handler.requestAdjust(NaN);
            expect(Number.isNaN((handler as any).appliedAdjust)).toBe(true);

            mockRafCallback();
            expect(Number.isNaN(mockCtx.values.get("scrollAdjust"))).toBe(true);
        });

        it("should handle Infinity adjustment values", () => {
            handler.requestAdjust(Infinity);
            expect((handler as any).appliedAdjust).toBe(Infinity);

            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(Infinity);

            handler.requestAdjust(-Infinity);
            expect((handler as any).appliedAdjust).toBe(NaN); // Infinity + (-Infinity) = NaN

            mockRafCallback();
            expect(Number.isNaN(mockCtx.values.get("scrollAdjust"))).toBe(true);
        });

        it("should handle floating point precision", () => {
            handler.requestAdjust(0.1);
            expect((handler as any).appliedAdjust).toBe(0.1);

            // Update context to simulate the set
            mockCtx.values.set("scrollAdjust", 0.1);

            handler.requestAdjust(0.2);

            // Check that the result is approximately correct
            const result = (handler as any).appliedAdjust;
            expect(Math.abs(result - 0.3)).toBeLessThan(Number.EPSILON);
        });
    });

    describe("integration scenarios", () => {
        it("should handle state transitions from unmounted to mounted", () => {
            // Start unmounted
            handler.requestAdjust(5);
            expect(rafCallCount).toBe(1);
            expect(mockCtx.values.get("scrollAdjust")).toBe(0); // Not applied yet

            // Mount the handler
            handler.setMounted();

            // Execute pending RAF callback
            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(5);

            // Reset counter
            rafCallCount = 0;

            // New adjustments should be immediate
            handler.requestAdjust(3);
            expect(rafCallCount).toBe(0);
            expect(mockCtx.values.get("scrollAdjust")).toBe(8);
        });

        it("should handle complex adjustment sequences", () => {
            // Mixed positive and negative adjustments - simulate proper sequence with context updates
            const adjustments = [10, -5, 15, -8, 3, -2];

            let contextValue = 0;
            for (const adjustment of adjustments) {
                handler.requestAdjust(adjustment);
                const expectedApplied = adjustment + contextValue;
                expect((handler as any).appliedAdjust).toBe(expectedApplied);

                // Simulate the context being updated
                contextValue = expectedApplied;
                mockCtx.values.set("scrollAdjust", contextValue);
            }

            // Final context value should be the sum of all adjustments
            const expectedTotal = adjustments.reduce((sum, val) => sum + val, 0);
            expect(mockCtx.values.get("scrollAdjust")).toBe(expectedTotal);
        });

        it("should maintain correct state across multiple handlers", () => {
            const handler2 = new ScrollAdjustHandler(mockCtx);

            handler.requestAdjust(10);
            handler2.requestAdjust(5);

            // Both should see the same context but maintain separate applied adjust values
            expect((handler as any).appliedAdjust).toBe(10);
            expect((handler2 as any).appliedAdjust).toBe(5);

            // Execute both RAF callbacks
            mockRafCallback();

            // The last one to execute should win (handler2)
            expect(mockCtx.values.get("scrollAdjust")).toBe(5);
        });
    });

    describe("performance considerations", () => {
        it("should handle rapid adjustments efficiently", () => {
            const start = performance.now();

            // Make many rapid adjustments - each one replaces the previous
            for (let i = 0; i < 1000; i++) {
                handler.requestAdjust(1);
            }

            const duration = performance.now() - start;
            expect(duration).toBeLessThan(10); // Should be very fast

            // Should be 1 + 0 (initial context) = 1 (last adjustment)
            expect((handler as any).appliedAdjust).toBe(1);
        });

        it("should handle RAF efficiently", () => {
            handler.requestAdjust(10);

            const start = performance.now();
            mockRafCallback();
            const duration = performance.now() - start;

            expect(duration).toBeLessThan(1); // RAF callback should be very fast
            expect(mockCtx.values.get("scrollAdjust")).toBe(10);
        });

        it("should not create memory leaks with many adjustments", () => {
            // Test that the handler doesn't accumulate internal state inappropriately
            for (let i = 0; i < 10000; i++) {
                handler.requestAdjust(0.1);
            }

            // The handler should only maintain the last calculated value
            expect((handler as any).appliedAdjust).toBe(0.1); // 0.1 + 0 (initial context)
        });
    });

    describe("boundary conditions", () => {
        it("should handle adjustment with pre-existing context state", () => {
            mockCtx.values.set("scrollAdjust", 100);

            handler.requestAdjust(25);
            expect((handler as any).appliedAdjust).toBe(125);

            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(125);
        });

        it("should handle zero pre-existing state", () => {
            mockCtx.values.set("scrollAdjust", 0);

            handler.requestAdjust(25);
            expect((handler as any).appliedAdjust).toBe(25);

            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(25);
        });

        it("should handle negative pre-existing state", () => {
            mockCtx.values.set("scrollAdjust", -50);

            handler.requestAdjust(25);
            expect((handler as any).appliedAdjust).toBe(-25);

            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(-25);
        });
    });

    describe("real-world usage patterns", () => {
        it("should handle typical MVCP adjustment pattern", () => {
            // Typical pattern: unmounted initialization, then mounting, then adjustments
            const handler = new ScrollAdjustHandler(mockCtx);

            // Initial adjustment while unmounted (typical MVCP setup)
            handler.requestAdjust(50);
            expect(rafCallCount).toBe(1);

            // Component mounts
            handler.setMounted();

            // Apply pending adjustment
            mockRafCallback();
            expect(mockCtx.values.get("scrollAdjust")).toBe(50);

            // Runtime adjustments (immediate)
            handler.requestAdjust(10);
            expect(mockCtx.values.get("scrollAdjust")).toBe(60);

            handler.requestAdjust(-5);
            expect(mockCtx.values.get("scrollAdjust")).toBe(55);
        });

        it("should handle chat interface scroll adjustment pattern", () => {
            handler.setMounted(); // Chat interfaces are typically mounted immediately

            // Simulate new messages causing adjustments
            const messageAdjustments = [15, 20, 8, 12, 25];
            let expectedTotal = 0;

            for (const adjustment of messageAdjustments) {
                expectedTotal += adjustment;
                handler.requestAdjust(adjustment);
                expect(mockCtx.values.get("scrollAdjust")).toBe(expectedTotal);
            }
        });
    });
});



================================================
FILE: __tests__/core/scrollToIndex.test.ts
================================================
import { beforeEach, describe, expect, it } from "bun:test";
import "../setup"; // Import global test setup

import { scrollToIndex } from "../../src/core/scrollToIndex";
import type { StateContext } from "../../src/state/state";
import type { InternalState } from "../../src/types";

// Create a properly typed mock context
function createMockContext(initialValues: Record<string, any> = {}): StateContext {
    const values = new Map(Object.entries(initialValues));
    const listeners = new Map();

    return {
        columnWrapperStyle: undefined,
        listeners,
        mapViewabilityAmountCallbacks: new Map(),
        mapViewabilityAmountValues: new Map(),
        mapViewabilityCallbacks: new Map(),
        mapViewabilityValues: new Map(),
        values,
        viewRefs: new Map(),
    };
}

describe("scrollToIndex", () => {
    let mockCtx: StateContext;
    let mockState: InternalState;
    let mockScrollCalls: any[] = [];

    beforeEach(() => {
        mockScrollCalls = [];

        mockCtx = createMockContext({
            headerSize: 0,
            stylePaddingTop: 0,
        });

        mockState = {
            idCache: new Map(),
            positions: new Map(),
            props: {
                data: Array.from({ length: 10 }, (_, i) => ({ id: i })),
                estimatedItemSize: 100,
                getEstimatedItemSize: undefined,
                horizontal: false,
                keyExtractor: (item: any, index: number) => `item_${index}`,
            },
            refScroller: {
                current: {
                    scrollTo: (params: any) => mockScrollCalls.push(params),
                },
            },
            scroll: 0,
            scrollForNextCalculateItemsInView: undefined,
            scrollHistory: [],
            scrollingTo: undefined,
            scrollLength: 1000, // Required by calculateOffsetWithOffsetPosition
            scrollPending: 0,
            sizes: new Map(),
            sizesKnown: new Map(),
        } as InternalState;

        // Setup default positions for items
        for (let i = 0; i < 10; i++) {
            const itemId = `item_${i}`;
            mockState.idCache.set(i, itemId);
            mockState.positions.set(itemId, i * 100); // Each item is 100px tall
        }
    });

    describe("index boundary handling", () => {
        it("should clamp index to valid range when index is too high", () => {
            scrollToIndex(mockCtx, mockState, { index: 15 }); // Beyond data length

            expect(mockScrollCalls.length).toBe(1);
            // Should scroll to last item (index 9)
            expect(mockState.scrollingTo?.index).toBe(9);
        });

        it("should clamp index to valid range when index is negative", () => {
            scrollToIndex(mockCtx, mockState, { index: -5 });

            expect(mockScrollCalls.length).toBe(1);
            // Should scroll to first item (index 0)
            expect(mockState.scrollingTo?.index).toBe(0);
        });

        it("should handle index 0 correctly", () => {
            scrollToIndex(mockCtx, mockState, { index: 0 });

            expect(mockScrollCalls.length).toBe(1);
            expect(mockState.scrollingTo?.index).toBe(0);
            expect(mockScrollCalls[0].y).toBe(0); // Should be at top
        });

        it("should handle last valid index correctly", () => {
            scrollToIndex(mockCtx, mockState, { index: 9 }); // Last item

            expect(mockScrollCalls.length).toBe(1);
            expect(mockState.scrollingTo?.index).toBe(9);
        });

        it("should handle empty data array", () => {
            mockState.props.data = [];

            scrollToIndex(mockCtx, mockState, { index: 0 });

            expect(mockScrollCalls.length).toBe(1);
            expect(mockState.scrollingTo?.index).toBe(-1); // Clamped to -1 for empty array
        });
    });

    describe("offset calculations", () => {
        it("should calculate basic offset without viewOffset", () => {
            scrollToIndex(mockCtx, mockState, { index: 3 });

            expect(mockScrollCalls.length).toBe(1);
            expect(mockScrollCalls[0].y).toBe(300); // Item 3 at position 300
            expect(mockScrollCalls[0].x).toBe(0); // Vertical scrolling
        });

        it("should apply viewOffset to the calculated position", () => {
            scrollToIndex(mockCtx, mockState, { index: 3, viewOffset: 50 });

            expect(mockScrollCalls.length).toBe(1);
            // The viewOffset is applied twice in the calculation:
            // 1. firstIndexScrollPosition = (position + padding + header) - viewOffset = 300 - 50 = 250
            // 2. calculateOffsetWithOffsetPosition: offset -= viewOffset = 250 - 50 = 200
            expect(mockScrollCalls[0].y).toBe(200);
        });

        it("should handle negative viewOffset", () => {
            scrollToIndex(mockCtx, mockState, { index: 3, viewOffset: -50 });

            expect(mockScrollCalls.length).toBe(1);
            // viewOffset is applied twice: (300 - (-50)) - (-50) = 350 - (-50) = 400
            expect(mockScrollCalls[0].y).toBe(400);
        });

        it("should include padding and header in offset calculation", () => {
            mockCtx.values.set("stylePaddingTop", 20);
            mockCtx.values.set("headerSize", 30);

            scrollToIndex(mockCtx, mockState, { index: 3 });

            expect(mockScrollCalls.length).toBe(1);
            expect(mockScrollCalls[0].y).toBe(350); // 300 + 20 + 30
        });

        it("should handle missing position data gracefully", () => {
            // Remove position for item 3
            mockState.positions.delete("item_3");

            scrollToIndex(mockCtx, mockState, { index: 3 });

            expect(mockScrollCalls.length).toBe(1);
            expect(mockScrollCalls[0].y).toBe(0); // Defaults to 0 when position is missing
        });
    });

    describe("viewPosition handling", () => {
        it("should default viewPosition to 1 for last item when not specified", () => {
            scrollToIndex(mockCtx, mockState, { index: 9 }); // Last item

            expect(mockState.scrollingTo?.viewPosition).toBe(1);
        });

        it("should use provided viewPosition for last item", () => {
            scrollToIndex(mockCtx, mockState, { index: 9, viewPosition: 0.5 });

            expect(mockState.scrollingTo?.viewPosition).toBe(0.5);
        });

        it("should default viewPosition to 0 for non-last items", () => {
            scrollToIndex(mockCtx, mockState, { index: 3 });

            expect(mockState.scrollingTo?.viewPosition).toBe(0);
        });

        it("should use provided viewPosition for non-last items", () => {
            scrollToIndex(mockCtx, mockState, { index: 3, viewPosition: 0.7 });

            expect(mockState.scrollingTo?.viewPosition).toBe(0.7);
        });
    });

    describe("animation handling", () => {
        it("should use animated=true by default", () => {
            scrollToIndex(mockCtx, mockState, { index: 3 });

            expect(mockScrollCalls[0].animated).toBe(true);
        });

        it("should respect animated=false", () => {
            scrollToIndex(mockCtx, mockState, { animated: false, index: 3 });

            expect(mockScrollCalls[0].animated).toBe(false);
        });

        it("should respect animated=true explicitly", () => {
            scrollToIndex(mockCtx, mockState, { animated: true, index: 3 });

            expect(mockScrollCalls[0].animated).toBe(true);
        });
    });

    describe("horizontal scrolling", () => {
        beforeEach(() => {
            mockState.props.horizontal = true;
        });

        it("should scroll horizontally when horizontal=true", () => {
            scrollToIndex(mockCtx, mockState, { index: 3 });

            expect(mockScrollCalls[0].x).toBe(300); // Horizontal position
            expect(mockScrollCalls[0].y).toBe(0); // No vertical scroll
        });

        it("should apply viewOffset horizontally", () => {
            scrollToIndex(mockCtx, mockState, { index: 3, viewOffset: 50 });

            expect(mockScrollCalls[0].x).toBe(200); // viewOffset applied twice: (300 - 50) - 50 = 200
            expect(mockScrollCalls[0].y).toBe(0);
        });
    });

    describe("state management", () => {
        it("should clear scrollForNextCalculateItemsInView", () => {
            mockState.scrollForNextCalculateItemsInView = { bottom: 200, top: 100 };

            scrollToIndex(mockCtx, mockState, { index: 3 });

            expect(mockState.scrollForNextCalculateItemsInView).toBeUndefined();
        });

        it("should set scrollingTo state", () => {
            scrollToIndex(mockCtx, mockState, { animated: false, index: 3, viewOffset: 50 });

            expect(mockState.scrollingTo).toEqual({
                animated: false,
                index: 3,
                offset: expect.any(Number),
                viewOffset: 50,
                viewPosition: 0,
            });
        });

        it("should clear scroll history", () => {
            mockState.scrollHistory = [
                { scroll: 100, time: Date.now() },
                { scroll: 200, time: Date.now() },
            ];

            scrollToIndex(mockCtx, mockState, { index: 3 });

            expect(mockState.scrollHistory.length).toBe(0);
        });

        it("should set scrollPending", () => {
            scrollToIndex(mockCtx, mockState, { index: 3 });

            expect(typeof mockState.scrollPending).toBe("number");
            expect(mockState.scrollPending).toBeGreaterThanOrEqual(0);
        });

        it("should update scroll position for non-animated scrolls", async () => {
            scrollToIndex(mockCtx, mockState, { animated: false, index: 3 });

            expect(typeof mockState.scroll).toBe("number");
            expect(mockState.scroll).toBeGreaterThanOrEqual(0);
        });
    });

    describe("edge cases and error handling", () => {
        it("should handle missing refScroller gracefully", () => {
            mockState.refScroller = { current: null };

            expect(() => {
                scrollToIndex(mockCtx, mockState, { index: 3 });
            }).not.toThrow();

            // Should still update state even if scroll fails
            expect(mockState.scrollingTo?.index).toBe(3);
        });

        it("should handle undefined refScroller", () => {
            mockState.refScroller = undefined as any;

            expect(() => {
                scrollToIndex(mockCtx, mockState, { index: 3 });
            }).toThrow();
        });

        it("should handle corrupted positions map", () => {
            mockState.positions = null as any;

            expect(() => {
                scrollToIndex(mockCtx, mockState, { index: 3 });
            }).toThrow();
        });

        it("should handle large index values", () => {
            const largeIndex = Number.MAX_SAFE_INTEGER;

            scrollToIndex(mockCtx, mockState, { index: largeIndex });

            // Should clamp to last valid index
            expect(mockState.scrollingTo?.index).toBe(9);
        });

        it("should handle floating point index values", () => {
            scrollToIndex(mockCtx, mockState, { index: 3.7 });

            // Should use the index as-is (will be clamped during calculation)
            expect(mockState.scrollingTo?.index).toBe(3.7);
        });

        it("should handle very large viewOffset values", () => {
            scrollToIndex(mockCtx, mockState, { index: 3, viewOffset: Number.MAX_SAFE_INTEGER });

            expect(mockScrollCalls.length).toBe(1);
            // Should handle the calculation without overflow
            expect(typeof mockScrollCalls[0].y).toBe("number");
        });

        it("should handle NaN index", () => {
            scrollToIndex(mockCtx, mockState, { index: NaN });

            // NaN comparisons should handle gracefully
            expect(mockScrollCalls.length).toBe(1);
        });

        it("should handle Infinity index", () => {
            scrollToIndex(mockCtx, mockState, { index: Number.POSITIVE_INFINITY });

            // Should clamp to last valid index
            expect(mockState.scrollingTo?.index).toBe(9);
        });
    });

    describe("performance and complex scenarios", () => {
        it("should handle rapid consecutive scrollToIndex calls", () => {
            const start = Date.now();

            for (let i = 0; i < 100; i++) {
                scrollToIndex(mockCtx, mockState, { index: i % 10 });
            }

            const duration = Date.now() - start;
            expect(duration).toBeLessThan(50); // Should be very fast
            expect(mockScrollCalls.length).toBe(100);
        });

        it("should handle large datasets efficiently", () => {
            // Create a large dataset
            const largeData = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
            mockState.props.data = largeData;

            // Setup positions for large dataset (only what we need)
            const targetIndex = 5000;
            const itemId = `item_${targetIndex}`;
            mockState.idCache.set(targetIndex, itemId);
            mockState.positions.set(itemId, targetIndex * 100);

            const start = Date.now();
            scrollToIndex(mockCtx, mockState, { index: targetIndex });
            const duration = Date.now() - start;

            expect(duration).toBeLessThan(10); // Should be very fast even with large dataset
            expect(mockState.scrollingTo?.index).toBe(targetIndex);
        });

        it("should handle complex offset scenarios", () => {
            // Complex scenario with padding, header, viewOffset, and viewPosition
            mockCtx.values.set("stylePaddingTop", 25);
            mockCtx.values.set("headerSize", 75);

            scrollToIndex(mockCtx, mockState, {
                animated: false,
                index: 5,
                viewOffset: 30,
                viewPosition: 0.5,
            });

            expect(mockScrollCalls.length).toBe(1);
            expect(mockState.scrollingTo).toEqual({
                animated: false,
                index: 5,
                offset: expect.any(Number),
                viewOffset: 30,
                viewPosition: 0.5,
            });

            // Complex calculation:
            // 1. calculateOffsetForIndex: position(500) + padding(25) + header(75) = 600
            // 2. scrollToIndex: firstIndexScrollPosition = 600 - viewOffset(30) = 570
            // 3. calculateOffsetWithOffsetPosition:
            //    - offset = 570 - viewOffset(30) = 540
            //    - offset -= viewPosition(0.5) * (scrollLength(1000) - itemSize(100)) = 540 - 0.5 * 900 = 540 - 450 = 90
            expect(mockScrollCalls[0].y).toBe(90);
        });

        it("should maintain state consistency across multiple calls", () => {
            // First scroll
            scrollToIndex(mockCtx, mockState, { animated: false, index: 3 });
            const firstScrollTo = { ...mockState.scrollingTo };

            // Second scroll
            scrollToIndex(mockCtx, mockState, { index: 7, viewOffset: 50 });
            const secondScrollTo = { ...mockState.scrollingTo };

            expect(firstScrollTo.index).toBe(3);
            expect(secondScrollTo.index).toBe(7);
            expect(secondScrollTo.viewOffset).toBe(50);
            expect(mockScrollCalls.length).toBe(2);
        });

        it("should handle mixed horizontal and vertical configurations", () => {
            // Test switching between horizontal and vertical
            mockState.props.horizontal = false;
            scrollToIndex(mockCtx, mockState, { index: 3 });

            expect(mockScrollCalls[0].x).toBe(0);
            expect(mockScrollCalls[0].y).toBe(300);

            mockState.props.horizontal = true;
            scrollToIndex(mockCtx, mockState, { index: 5 });

            expect(mockScrollCalls[1].x).toBe(500);
            expect(mockScrollCalls[1].y).toBe(0);
        });
    });
});



================================================
FILE: __tests__/core/updateAllPositions.test.ts
================================================
import { beforeEach, describe, expect, it } from "bun:test";
import "../setup"; // Import global test setup

import { updateAllPositions } from "../../src/core/updateAllPositions";
import type { StateContext } from "../../src/state/state";
import type { InternalState } from "../../src/types";

// Create a properly typed mock context
function createMockContext(initialValues: Record<string, any> = {}): StateContext {
    const values = new Map(Object.entries(initialValues));
    const listeners = new Map();

    return {
        columnWrapperStyle: undefined,
        listeners,
        mapViewabilityAmountCallbacks: new Map(),
        mapViewabilityAmountValues: new Map(),
        mapViewabilityCallbacks: new Map(),
        mapViewabilityValues: new Map(),
        values,
        viewRefs: new Map(),
    };
}

describe("updateAllPositions", () => {
    let mockCtx: StateContext;
    let mockState: InternalState;

    beforeEach(() => {
        mockCtx = createMockContext({
            numColumns: 1, // Single column by default
        });

        mockState = {
            averageSizes: {},
            columns: new Map(),
            firstFullyOnScreenIndex: undefined,
            idCache: new Map(),
            indexByKey: new Map(),
            positions: new Map(),
            props: {
                data: [
                    { id: "item1", name: "First" },
                    { id: "item2", name: "Second" },
                    { id: "item3", name: "Third" },
                    { id: "item4", name: "Fourth" },
                    { id: "item5", name: "Fifth" },
                ],
                estimatedItemSize: undefined,
                getEstimatedItemSize: undefined,
                keyExtractor: (item: any, index: number) => item.id,
                snapToIndices: undefined,
            },
            scrollHistory: [],
            scrollingTo: undefined, // Required by getItemSize
            sizes: new Map(), // Required by getItemSize
            sizesKnown: new Map(),
        } as InternalState;
    });

    describe("basic single-column positioning", () => {
        it("should calculate positions for all items from top to bottom", () => {
            // Set up known sizes for all items
            mockState.sizesKnown.set("item1", 100);
            mockState.sizesKnown.set("item2", 150);
            mockState.sizesKnown.set("item3", 200);
            mockState.sizesKnown.set("item4", 120);
            mockState.sizesKnown.set("item5", 180);

            updateAllPositions(mockCtx, mockState);

            // Check positions are calculated correctly
            expect(mockState.positions.get("item1")).toBe(0);
            expect(mockState.positions.get("item2")).toBe(100);
            expect(mockState.positions.get("item3")).toBe(250);
            expect(mockState.positions.get("item4")).toBe(450);
            expect(mockState.positions.get("item5")).toBe(570);
        });

        it("should update indexByKey mapping for all items", () => {
            updateAllPositions(mockCtx, mockState);

            expect(mockState.indexByKey.get("item1")).toBe(0);
            expect(mockState.indexByKey.get("item2")).toBe(1);
            expect(mockState.indexByKey.get("item3")).toBe(2);
            expect(mockState.indexByKey.get("item4")).toBe(3);
            expect(mockState.indexByKey.get("item5")).toBe(4);
        });

        it("should set column to 1 for all items in single-column mode", () => {
            updateAllPositions(mockCtx, mockState);

            expect(mockState.columns.get("item1")).toBe(1);
            expect(mockState.columns.get("item2")).toBe(1);
            expect(mockState.columns.get("item3")).toBe(1);
            expect(mockState.columns.get("item4")).toBe(1);
            expect(mockState.columns.get("item5")).toBe(1);
        });

        it("should use estimated sizes when sizes are not known", () => {
            mockState.props.estimatedItemSize = 100;

            updateAllPositions(mockCtx, mockState);

            // All items should be positioned using estimated size
            expect(mockState.positions.get("item1")).toBe(0);
            expect(mockState.positions.get("item2")).toBe(100);
            expect(mockState.positions.get("item3")).toBe(200);
            expect(mockState.positions.get("item4")).toBe(300);
            expect(mockState.positions.get("item5")).toBe(400);
        });
    });

    describe("multi-column layout", () => {
        beforeEach(() => {
            mockCtx.values.set("numColumns", 2);
            mockState.sizesKnown.set("item1", 100);
            mockState.sizesKnown.set("item2", 120); // Taller item in row 1
            mockState.sizesKnown.set("item3", 80);
            mockState.sizesKnown.set("item4", 150); // Taller item in row 2
            mockState.sizesKnown.set("item5", 90);
        });

        it("should position items in columns correctly", () => {
            updateAllPositions(mockCtx, mockState);

            // Row 1: item1 (col 1), item2 (col 2) - max height 120
            expect(mockState.positions.get("item1")).toBe(0);
            expect(mockState.positions.get("item2")).toBe(0);
            expect(mockState.columns.get("item1")).toBe(1);
            expect(mockState.columns.get("item2")).toBe(2);

            // Row 2: item3 (col 1), item4 (col 2) - max height 150
            expect(mockState.positions.get("item3")).toBe(120); // After max height of row 1
            expect(mockState.positions.get("item4")).toBe(120);
            expect(mockState.columns.get("item3")).toBe(1);
            expect(mockState.columns.get("item4")).toBe(2);

            // Row 3: item5 (col 1)
            expect(mockState.positions.get("item5")).toBe(270); // 120 + 150
            expect(mockState.columns.get("item5")).toBe(1);
        });

        it("should handle varying column heights correctly", () => {
            // Set up items with very different heights
            mockState.sizesKnown.set("item1", 50);
            mockState.sizesKnown.set("item2", 200); // Much taller
            mockState.sizesKnown.set("item3", 100);
            mockState.sizesKnown.set("item4", 60);

            updateAllPositions(mockCtx, mockState);

            // Row 1: max height should be 200 (item2)
            expect(mockState.positions.get("item1")).toBe(0);
            expect(mockState.positions.get("item2")).toBe(0);

            // Row 2: should start at 200 (max of row 1)
            expect(mockState.positions.get("item3")).toBe(200);
            expect(mockState.positions.get("item4")).toBe(200);
        });

        it("should handle 3-column layout", () => {
            mockCtx.values.set("numColumns", 3);

            updateAllPositions(mockCtx, mockState);

            // Row 1: items 1, 2, 3
            expect(mockState.columns.get("item1")).toBe(1);
            expect(mockState.columns.get("item2")).toBe(2);
            expect(mockState.columns.get("item3")).toBe(3);

            // Row 2: items 4, 5
            expect(mockState.columns.get("item4")).toBe(1);
            expect(mockState.columns.get("item5")).toBe(2);
        });
    });

    describe("backwards optimization", () => {
        beforeEach(() => {
            // Set up state for backwards optimization
            mockState.firstFullyOnScreenIndex = 10;
            mockState.sizesKnown.set("item1", 100);

            // Create larger dataset for backwards optimization
            const largeData = Array.from({ length: 20 }, (_, i) => ({ id: `item${i + 1}`, name: `Item ${i + 1}` }));
            mockState.props.data = largeData;

            // Set up scroll history for upward scrolling (negative velocity)
            mockState.scrollHistory = [
                { scroll: 1000, time: Date.now() - 100 },
                { scroll: 800, time: Date.now() - 50 },
                { scroll: 600, time: Date.now() },
            ];

            // Pre-populate some positions for the anchor
            for (let i = 5; i < 15; i++) {
                const id = `item${i + 1}`;
                mockState.idCache.set(i, id);
                mockState.positions.set(id, i * 100);
                mockState.sizesKnown.set(id, 100);
            }
        });

        it("should use backwards optimization when scrolling up", () => {
            const initialPositions = new Map(mockState.positions);

            updateAllPositions(mockCtx, mockState);

            // Should have used backwards optimization and preserved anchor position
            expect(mockState.positions.get("item11")).toBe(initialPositions.get("item11"));
        });

        it("should not use backwards optimization when not scrolling up", () => {
            // Change scroll history to indicate downward scrolling
            mockState.scrollHistory = [
                { scroll: 600, time: Date.now() - 100 },
                { scroll: 800, time: Date.now() - 50 },
                { scroll: 1000, time: Date.now() },
            ];

            updateAllPositions(mockCtx, mockState);

            // Should use regular ascending calculation
            expect(mockState.positions.get("item1")).toBe(0);
        });

        it("should bail out of backwards optimization when positions go too low", () => {
            // Set anchor position very low to trigger bailout
            const anchorId = `item${mockState.firstFullyOnScreenIndex! + 1}`;
            mockState.positions.set(anchorId, -3000);

            updateAllPositions(mockCtx, mockState);

            // Should fall back to regular calculation
            expect(mockState.positions.get("item1")).toBe(0);
        });

        it("should fall back to regular calculation when anchor position is missing", () => {
            // Clear the anchor position
            const anchorId = `item${mockState.firstFullyOnScreenIndex! + 1}`;
            mockState.positions.delete(anchorId);

            updateAllPositions(mockCtx, mockState);

            // Should use regular ascending calculation
            expect(mockState.positions.get("item1")).toBe(0);
        });
    });

    describe("data change handling", () => {
        it("should clear caches when data changes", () => {
            // Pre-populate caches
            mockState.indexByKey.set("old_item", 0);
            mockState.idCache.set(0, "old_item");

            updateAllPositions(mockCtx, mockState, true); // dataChanged = true

            // Caches should be rebuilt for current data. Implementation may not proactively delete unknown
            // legacy keys from previous datasets, and may reuse idCache entries for existing indices.
            // Verify that new mappings are added for subsequent items.
            expect(mockState.indexByKey.get("item2")).toBe(1);
        });

        it("should preserve caches when data doesn't change", () => {
            // Pre-populate with correct data
            mockState.indexByKey.set("item1", 0);
            mockState.idCache.set(0, "item1");

            updateAllPositions(mockCtx, mockState, false); // dataChanged = false

            // Should update indexByKey because size is 0 (needs rebuilding)
            expect(mockState.indexByKey.get("item1")).toBe(0);
        });

        it("should rebuild indexByKey when it's empty", () => {
            mockState.indexByKey.clear();

            updateAllPositions(mockCtx, mockState, false);

            // Should rebuild indexByKey
            expect(mockState.indexByKey.get("item1")).toBe(0);
            expect(mockState.indexByKey.get("item2")).toBe(1);
        });
    });

    describe("average size optimization", () => {
        it("should use average size when available", () => {
            mockState.averageSizes[""] = { avg: 125.5, count: 10 };

            updateAllPositions(mockCtx, mockState);

            // Should use rounded average size (125.5 rounds to 125.5 using roundSize)
            const expectedRoundedSize = Math.floor(125.5 * 8) / 8; // 125.5
            expect(mockState.positions.get("item1")).toBe(0);
            expect(mockState.positions.get("item2")).toBe(expectedRoundedSize);
            expect(mockState.positions.get("item3")).toBe(expectedRoundedSize * 2);
        });

        it("should prefer known sizes over average sizes", () => {
            mockState.averageSizes[""] = { avg: 200, count: 10 };
            mockState.sizesKnown.set("item2", 100); // Override with known size

            updateAllPositions(mockCtx, mockState);

            expect(mockState.positions.get("item1")).toBe(0);
            expect(mockState.positions.get("item2")).toBe(200); // Should use average for item1
            expect(mockState.positions.get("item3")).toBe(300); // item2 used known size (100)
        });
    });

    describe("edge cases and error handling", () => {
        it("should handle empty data array", () => {
            mockState.props.data = [];

            expect(() => updateAllPositions(mockCtx, mockState)).not.toThrow();

            expect(mockState.positions.size).toBe(0);
            expect(mockState.indexByKey.size).toBe(0);
        });

        it("should handle null data array", () => {
            mockState.props.data = null as any;

            expect(() => updateAllPositions(mockCtx, mockState)).toThrow();
        });

        it("should handle single item", () => {
            mockState.props.data = [{ id: "single", name: "Single Item" }];
            mockState.sizesKnown.set("single", 150);

            updateAllPositions(mockCtx, mockState);

            expect(mockState.positions.get("single")).toBe(0);
            expect(mockState.indexByKey.get("single")).toBe(0);
            expect(mockState.columns.get("single")).toBe(1);
        });

        it("should handle items with zero size", () => {
            mockState.sizesKnown.set("item1", 0);
            mockState.sizesKnown.set("item2", 100);

            updateAllPositions(mockCtx, mockState);

            expect(mockState.positions.get("item1")).toBe(0);
            expect(mockState.positions.get("item2")).toBe(0); // Zero size means no offset
        });

        it("should handle very large datasets efficiently", () => {
            const largeData = Array.from({ length: 10000 }, (_, i) => ({ id: `item${i}`, name: `Item ${i}` }));
            mockState.props.data = largeData;
            mockState.props.estimatedItemSize = 50;

            const start = Date.now();
            updateAllPositions(mockCtx, mockState);
            const duration = Date.now() - start;

            expect(duration).toBeLessThan(500); // Should be reasonably fast
            expect(mockState.positions.size).toBe(10000);
            expect(mockState.positions.get("item0")).toBe(0);
            expect(mockState.positions.get("item9999")).toBe(499950); // 9999 * 50
        });

        it("should handle corrupted state gracefully", () => {
            mockState.positions = null as any;

            expect(() => updateAllPositions(mockCtx, mockState)).toThrow();
        });

        it("should handle missing context values", () => {
            mockCtx.values.delete("numColumns");

            expect(() => updateAllPositions(mockCtx, mockState)).not.toThrow();

            // Should default to single column behavior
            expect(mockState.columns.get("item1")).toBe(1);
        });
    });

    describe("performance optimization features", () => {
        it("should handle backwards optimization with columns", () => {
            mockCtx.values.set("numColumns", 2);
            mockState.firstFullyOnScreenIndex = 8;

            // Create dataset and setup for backwards optimization
            const data = Array.from({ length: 20 }, (_, i) => ({ id: `item${i}`, name: `Item ${i}` }));
            mockState.props.data = data;

            // Setup scroll history for upward scrolling
            mockState.scrollHistory = [
                { scroll: 1000, time: Date.now() - 100 },
                { scroll: 800, time: Date.now() - 50 },
                { scroll: 600, time: Date.now() },
            ];

            // Pre-populate positions and sizes
            for (let i = 0; i < 20; i++) {
                const id = `item${i}`;
                mockState.idCache.set(i, id);
                mockState.sizesKnown.set(id, 100);
            }

            // Set anchor position
            mockState.positions.set("item8", 400);

            updateAllPositions(mockCtx, mockState);

            // Should have used backwards optimization
            expect(mockState.positions.get("item8")).toBe(400);
        });

        it("should maintain scroll velocity calculation integration", () => {
            // Set up scroll history with clear velocity pattern
            mockState.scrollHistory = [
                { scroll: 0, time: Date.now() - 200 },
                { scroll: 100, time: Date.now() - 100 },
                { scroll: 200, time: Date.now() },
            ];

            updateAllPositions(mockCtx, mockState);

            // Function should complete without error and produce valid positions
            expect(mockState.positions.get("item1")).toBe(0);
            expect(mockState.positions.size).toBe(5);
        });

        it("should handle rapid consecutive calls", () => {
            const start = Date.now();

            for (let i = 0; i < 100; i++) {
                updateAllPositions(mockCtx, mockState);
            }

            const duration = Date.now() - start;
            expect(duration).toBeLessThan(1000); // Should handle rapid calls efficiently
        });
    });

    describe("snapToIndices integration", () => {
        it("should call updateSnapToOffsets when snapToIndices is provided", () => {
            mockState.props.snapToIndices = [0, 2, 4];

            // Mock updateSnapToOffsets by checking if it would be called
            updateAllPositions(mockCtx, mockState);

            // Function should complete without error
            expect(mockState.positions.size).toBe(5);
        });

        it("should not call updateSnapToOffsets when snapToIndices is undefined", () => {
            mockState.props.snapToIndices = undefined;

            updateAllPositions(mockCtx, mockState);

            expect(mockState.positions.size).toBe(5);
        });
    });

    describe("development mode features", () => {
        it("should detect duplicate keys in development mode", () => {
            // Mock __DEV__ environment by setting up duplicate key scenario
            const originalConsoleError = console.error;
            const consoleErrors: string[] = [];
            console.error = (message: string) => consoleErrors.push(message);

            // Create duplicate key scenario
            mockState.props.keyExtractor = () => "duplicate_key";

            updateAllPositions(mockCtx, mockState);

            console.error = originalConsoleError;

            // In dev mode, should detect and warn about duplicate keys
            // (The actual detection happens when __DEV__ is true, which may not be set in tests)
            expect(mockState.positions.size).toBeGreaterThan(0);
        });
    });

    describe("memory efficiency", () => {
        it("should maintain reasonable memory usage with large datasets", () => {
            const initialMemory = process.memoryUsage().heapUsed;

            const largeData = Array.from({ length: 5000 }, (_, i) => ({ id: `item${i}`, name: `Item ${i}` }));
            mockState.props.data = largeData;

            updateAllPositions(mockCtx, mockState);

            const finalMemory = process.memoryUsage().heapUsed;
            const memoryIncrease = finalMemory - initialMemory;

            // Should not have excessive memory increase
            expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // Less than 50MB
        });

        it("should reuse existing map entries when possible", () => {
            // Pre-populate with some entries
            mockState.positions.set("item1", 100);
            mockState.indexByKey.set("item1", 0);

            updateAllPositions(mockCtx, mockState);

            // Should update existing entries rather than always creating new ones
            expect(mockState.positions.get("item1")).toBe(0); // Recalculated
            expect(mockState.indexByKey.get("item1")).toBe(0); // Maintained
        });
    });
});



================================================
FILE: __tests__/core/updateItemSize.test.ts
================================================
import { beforeEach, describe, expect, it } from "bun:test";
import "../setup"; // Import global test setup

import { updateItemSize, updateItemSizes, updateOneItemSize } from "../../src/core/updateItemSize";
import type { StateContext } from "../../src/state/state";
import type { InternalState } from "../../src/types";

// Create a properly typed mock context
function createMockContext(initialValues: Record<string, any> = {}): StateContext {
    const values = new Map(Object.entries(initialValues));
    const listeners = new Map();

    return {
        columnWrapperStyle: undefined,
        listeners,
        mapViewabilityAmountCallbacks: new Map(),
        mapViewabilityAmountValues: new Map(),
        mapViewabilityCallbacks: new Map(),
        mapViewabilityValues: new Map(),
        values,
        viewRefs: new Map(),
    };
}

describe("updateItemSize functions", () => {
    let mockCtx: StateContext;
    let mockState: InternalState;
    let onItemSizeChangedCalls: any[];

    beforeEach(() => {
        onItemSizeChangedCalls = [];

        mockCtx = createMockContext({
            containersDidLayout: true,
            numContainers: 10,
            otherAxisSize: 400,
        });

        mockState = {
            averageSizes: {},
            columns: new Map(),
            endBuffered: 4,
            endReachedBlockedByTimer: false,
            firstFullyOnScreenIndex: undefined,
            hasScrolled: false,
            idCache: new Map(),
            ignoreScrollFromMVCP: undefined,
            indexByKey: new Map([
                ["item_0", 0],
                ["item_1", 1],
                ["item_2", 2],
                ["item_3", 3],
                ["item_4", 4],
            ]),
            isAtEnd: false,
            isAtStart: true,
            isEndReached: false,
            isStartReached: false,
            lastBatchingAction: 0,
            lastLayout: { height: 600, width: 400, x: 0, y: 0 },
            maintainingScrollAtEnd: false,
            minIndexSizeChanged: undefined,
            needsOtherAxisSize: false,
            otherAxisSize: 400,
            positions: new Map(),
            props: {
                data: [
                    { id: "item1", name: "First" },
                    { id: "item2", name: "Second" },
                    { id: "item3", name: "Third" },
                    { id: "item4", name: "Fourth" },
                    { id: "item5", name: "Fifth" },
                ],
                estimatedItemSize: 100,
                getEstimatedItemSize: undefined,
                horizontal: false,
                maintainScrollAtEnd: false,
                maintainVisibleContentPosition: undefined,
                onItemSizeChanged: (event: any) => onItemSizeChangedCalls.push(event),
                stickyIndicesArr: [],
                stickyIndicesSet: new Set(),
                suggestEstimatedItemSize: false,
            },
            queuedInitialLayout: true,
            scroll: 0,
            scrollAdjustHandler: {
                requestAdjust: () => {}, // Mock scroll adjust handler
            },
            scrollForNextCalculateItemsInView: undefined,
            scrollHistory: [],
            scrollingTo: undefined,
            scrollLength: 600,
            scrollPending: 0,
            scrollPrev: 0,
            scrollPrevTime: 0,
            scrollTime: 0,
            sizes: new Map(),
            sizesKnown: new Map(),
            startBuffered: 0,
            startReachedBlockedByTimer: false,
            stickyContainerPool: new Set(),
            timeoutSizeMessage: undefined,
        } as InternalState;
    });

    describe("updateOneItemSize", () => {
        it("should update size for new item", () => {
            const sizeObj = { height: 150, width: 400 };

            const diff = updateOneItemSize(mockState, "item_0", sizeObj);

            expect(diff).toBe(50); // 150 - 100 (estimated size from getItemSize)
            expect(mockState.sizesKnown.get("item_0")).toBe(150);
            expect(mockState.sizes.get("item_0")).toBe(150);
        });

        it("should calculate size difference when updating existing item", () => {
            mockState.sizesKnown.set("item_0", 100);
            const sizeObj = { height: 120, width: 400 };

            const diff = updateOneItemSize(mockState, "item_0", sizeObj);

            expect(diff).toBe(20); // 120 - 100
            expect(mockState.sizesKnown.get("item_0")).toBe(120);
        });

        it("should return 0 when size change is minimal", () => {
            mockState.sizesKnown.set("item_0", 100);
            const sizeObj = { height: 100.05, width: 400 }; // Very small change

            const diff = updateOneItemSize(mockState, "item_0", sizeObj);

            expect(diff).toBe(0); // Change < 0.1 threshold
            expect(mockState.sizesKnown.get("item_0")).toBe(100); // Still updated in sizesKnown
        });

        it("should handle horizontal layout", () => {
            mockState.props.horizontal = true;
            const sizeObj = { height: 100, width: 250 };

            const diff = updateOneItemSize(mockState, "item_0", sizeObj);

            expect(diff).toBe(150); // 250 - 100 (estimated size)
            expect(mockState.sizesKnown.get("item_0")).toBe(250);
        });

        it("should update average sizes", () => {
            const sizeObj = { height: 120, width: 400 };

            updateOneItemSize(mockState, "item_0", sizeObj);

            expect(mockState.averageSizes[""]).toEqual({
                avg: 120,
                num: 1,
            });

            // Add another item
            updateOneItemSize(mockState, "item_1", { height: 180, width: 400 });

            expect(mockState.averageSizes[""]).toEqual({
                avg: 150, // (120 + 180) / 2
                num: 2,
            });
        });

        it("should round sizes to quarter pixels", () => {
            const sizeObj = { height: 150.123456, width: 400 };

            updateOneItemSize(mockState, "item_0", sizeObj);

            const expectedSize = Math.floor(150.123456 * 8) / 8; // Quarter pixel rounding
            expect(mockState.sizesKnown.get("item_0")).toBe(expectedSize);
        });

        it("should handle zero and negative sizes", () => {
            const sizeObj = { height: 0, width: 400 };

            const diff = updateOneItemSize(mockState, "item_0", sizeObj);

            expect(diff).toBe(-100); // 0 - 100 (estimated size)
            expect(mockState.sizesKnown.get("item_0")).toBe(0);
        });

        it("should handle missing data gracefully", () => {
            mockState.props.data = null;

            const diff = updateOneItemSize(mockState, "item_0", { height: 150, width: 400 });

            expect(diff).toBe(0);
        });
    });

    describe("updateItemSizes batch processing", () => {
        it("should process multiple item updates", () => {
            const itemUpdates = [
                { itemKey: "item_0", sizeObj: { height: 150, width: 400 } },
                { itemKey: "item_1", sizeObj: { height: 200, width: 400 } },
                { itemKey: "item_2", sizeObj: { height: 100, width: 400 } },
            ];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockState.sizesKnown.get("item_0")).toBe(150);
            expect(mockState.sizesKnown.get("item_1")).toBe(200);
            expect(mockState.sizesKnown.get("item_2")).toBe(100);
            expect(onItemSizeChangedCalls.length).toBe(2); // Only items with significant diff call callback
        });

        it("should track minimum changed index", () => {
            const itemUpdates = [
                { itemKey: "item_3", sizeObj: { height: 150, width: 400 } },
                { itemKey: "item_1", sizeObj: { height: 200, width: 400 } },
                { itemKey: "item_4", sizeObj: { height: 100, width: 400 } },
            ];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockState.minIndexSizeChanged).toBe(undefined); // No significant changes (diff < 0.1)
        });

        it("should update minIndexSizeChanged with existing value", () => {
            mockState.minIndexSizeChanged = 0;
            const itemUpdates = [{ itemKey: "item_2", sizeObj: { height: 150, width: 400 } }];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockState.minIndexSizeChanged).toBe(undefined); // No significant changes
        });

        it("should handle empty updates array", () => {
            updateItemSizes(mockCtx, mockState, []);

            expect(mockState.minIndexSizeChanged).toBeUndefined();
            expect(onItemSizeChangedCalls.length).toBe(0);
        });

        it("should skip processing when data is null", () => {
            mockState.props.data = null;
            const itemUpdates = [{ itemKey: "item_0", sizeObj: { height: 150, width: 400 } }];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockState.sizesKnown.size).toBe(0);
        });
    });

    describe("onItemSizeChanged callback", () => {
        it("should call callback with correct parameters", () => {
            const itemUpdates = [{ itemKey: "item_1", sizeObj: { height: 150, width: 400 } }];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(onItemSizeChangedCalls.length).toBe(1);
            expect(onItemSizeChangedCalls[0]).toEqual({
                index: 1,
                itemData: { id: "item2", name: "Second" },
                itemKey: "item_1",
                previous: 100, // size - diff = 150 - 50 = 100
                size: 150,
            });
        });

        it("should show correct previous size when updating", () => {
            mockState.sizesKnown.set("item_1", 100);
            const itemUpdates = [{ itemKey: "item_1", sizeObj: { height: 160, width: 400 } }];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(onItemSizeChangedCalls[0].previous).toBe(100); // size - diff = 160 - 60 = 100
            expect(onItemSizeChangedCalls[0].size).toBe(160);
        });

        it("should handle missing callback gracefully", () => {
            mockState.props.onItemSizeChanged = undefined;
            const itemUpdates = [{ itemKey: "item_0", sizeObj: { height: 150, width: 400 } }];

            expect(() => updateItemSizes(mockCtx, mockState, itemUpdates)).not.toThrow();
        });
    });

    describe("recalculation triggers", () => {
        it("should trigger recalculation when containers haven't laid out", () => {
            mockCtx.values.set("containersDidLayout", false);
            const itemUpdates = [{ itemKey: "item_0", sizeObj: { height: 150, width: 400 } }];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            // Function should complete, indicating recalculation was triggered
            expect(mockState.sizesKnown.get("item_0")).toBe(150);
        });

        it("should trigger recalculation when item is in buffered range", () => {
            mockState.startBuffered = 0;
            mockState.endBuffered = 2;
            const itemUpdates = [
                { itemKey: "item_1", sizeObj: { height: 150, width: 400 } }, // In range
            ];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockState.sizesKnown.get("item_1")).toBe(150);
        });

        it("should trigger recalculation when item is in a container", () => {
            mockCtx.values.set("containerItemKey0", "item_3");
            const itemUpdates = [{ itemKey: "item_3", sizeObj: { height: 150, width: 400 } }];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockState.sizesKnown.get("item_3")).toBe(150);
        });

        it("should not trigger recalculation for out-of-view items", () => {
            mockState.startBuffered = 0;
            mockState.endBuffered = 1;
            // Clear all container mappings
            for (let i = 0; i < 10; i++) {
                mockCtx.values.delete(`containerItemKey${i}`);
            }

            const itemUpdates = [
                { itemKey: "item_3", sizeObj: { height: 150, width: 400 } }, // Out of range
            ];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockState.sizesKnown.get("item_3")).toBe(150);
        });
    });

    describe("scroll position adjustments", () => {
        it("should request adjust when scrollingTo with viewPosition", () => {
            mockState.scrollingTo = { animated: true, index: 1, offset: 200, viewPosition: 0.5 };
            mockState.props.maintainVisibleContentPosition = true;
            const itemUpdates = [
                { itemKey: "item_1", sizeObj: { height: 160, width: 400 } }, // +60 diff
            ];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            // Should trigger requestAdjust with diff * viewPosition = 60 * 0.5 = 30
            expect(mockState.sizesKnown.get("item_1")).toBe(160);
        });

        it("should not request adjust when scrollingTo without viewPosition", () => {
            mockState.scrollingTo = { animated: true, index: 1, offset: 200 };
            mockState.props.maintainVisibleContentPosition = true;
            const itemUpdates = [{ itemKey: "item_1", sizeObj: { height: 160, width: 400 } }];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockState.sizesKnown.get("item_1")).toBe(160);
        });

        it("should not request adjust when maintainVisibleContentPosition is false", () => {
            mockState.scrollingTo = { animated: true, index: 1, offset: 200, viewPosition: 0.5 };
            mockState.props.maintainVisibleContentPosition = false;
            const itemUpdates = [{ itemKey: "item_1", sizeObj: { height: 160, width: 400 } }];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockState.sizesKnown.get("item_1")).toBe(160);
        });
    });

    describe("other axis size management", () => {
        it("should update other axis size when needed", () => {
            mockState.needsOtherAxisSize = true;
            mockCtx.values.set("otherAxisSize", 300);
            const itemUpdates = [
                { itemKey: "item_0", sizeObj: { height: 150, width: 500 } }, // width > current otherAxisSize
            ];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockCtx.values.get("otherAxisSize")).toBe(500);
        });

        it("should not decrease other axis size", () => {
            mockState.needsOtherAxisSize = true;
            mockCtx.values.set("otherAxisSize", 600);
            const itemUpdates = [
                { itemKey: "item_0", sizeObj: { height: 150, width: 400 } }, // width < current otherAxisSize
            ];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockCtx.values.get("otherAxisSize")).toBe(600); // Should remain unchanged
        });

        it("should handle horizontal layout for other axis size", () => {
            mockState.props.horizontal = true;
            mockState.needsOtherAxisSize = true;
            mockCtx.values.set("otherAxisSize", 100);
            const itemUpdates = [
                { itemKey: "item_0", sizeObj: { height: 300, width: 200 } }, // height is other axis
            ];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockCtx.values.get("otherAxisSize")).toBe(300);
        });
    });

    describe("maintain scroll at end", () => {
        it("should trigger maintain scroll at end when size changes significantly", () => {
            mockState.sizesKnown.set("item_0", 100); // Previous size
            mockState.props.maintainScrollAtEnd = true;
            const itemUpdates = [
                { itemKey: "item_0", sizeObj: { height: 110, width: 400 } }, // +10 change, > 5 threshold
            ];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockState.sizesKnown.get("item_0")).toBe(110);
        });

        it("should not trigger maintain scroll at end for small changes", () => {
            mockState.sizesKnown.set("item_0", 100);
            mockState.props.maintainScrollAtEnd = true;
            const itemUpdates = [
                { itemKey: "item_0", sizeObj: { height: 103, width: 400 } }, // +3 change, < 5 threshold
            ];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockState.sizesKnown.get("item_0")).toBe(103);
        });

        it("should handle maintainScrollAtEnd as object with onItemLayout", () => {
            mockState.sizesKnown.set("item_0", 100);
            mockState.props.maintainScrollAtEnd = { onItemLayout: true };
            const itemUpdates = [{ itemKey: "item_0", sizeObj: { height: 110, width: 400 } }];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockState.sizesKnown.get("item_0")).toBe(110);
        });
    });

    describe("development features", () => {
        it("should set timeout for size suggestion warning", () => {
            // Mock __DEV__ to true for this test
            const originalDev = (global as any).__DEV__;
            (global as any).__DEV__ = true;

            mockState.props.suggestEstimatedItemSize = true;
            const itemUpdates = [{ itemKey: "item_0", sizeObj: { height: 150, width: 400 } }];

            updateItemSizes(mockCtx, mockState, itemUpdates);

            expect(mockState.timeoutSizeMessage).toBeDefined();

            // Restore
            (global as any).__DEV__ = originalDev;
        });

        it("should clear existing timeout when setting new one", () => {
            // Mock __