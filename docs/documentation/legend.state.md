Directory structure:
└── legendapp-legend-state/
    ├── README.md
    ├── babel.ts
    ├── bunfig.toml
    ├── CHANGELOG.md
    ├── index.ts
    ├── jest.config.json
    ├── lefthook.yml
    ├── LICENSE
    ├── package.json
    ├── posttsup.ts
    ├── react-native.ts
    ├── react-web.ts
    ├── react.ts
    ├── sync.ts
    ├── trace.ts
    ├── tsconfig.esm.json
    ├── tsconfig.json
    ├── tsup.config.ts
    ├── .babelrc
    ├── .eslintignore
    ├── .eslintrc.js
    ├── .prettierignore
    ├── .prettierrc.json
    ├── benchmarks/
    │   ├── README.md
    │   ├── data/
    │   │   ├── smallNumberArray.json
    │   │   └── smallObjectSmallArray.json
    │   └── micro-optimizations/
    │       └── loops/
    │           ├── bench.sh
    │           ├── forEach.js
    │           └── forLoop.js
    ├── docs/
    │   └── README.md
    ├── examples/
    │   └── middleware.ts
    ├── src/
    │   ├── batching.ts
    │   ├── computed.ts
    │   ├── createObservable.ts
    │   ├── event.ts
    │   ├── globals.ts
    │   ├── helpers.ts
    │   ├── is.ts
    │   ├── linked.ts
    │   ├── middleware.ts
    │   ├── observable.ts
    │   ├── ObservableHint.ts
    │   ├── observableInterfaces.ts
    │   ├── ObservablePrimitive.ts
    │   ├── observableTypes.ts
    │   ├── observe.ts
    │   ├── onChange.ts
    │   ├── proxy.ts
    │   ├── setupTracking.ts
    │   ├── syncState.ts
    │   ├── tracking.ts
    │   ├── trackSelector.ts
    │   ├── when.ts
    │   ├── as/
    │   │   ├── arrayAsRecord.ts
    │   │   ├── arrayAsSet.ts
    │   │   ├── arrayAsString.ts
    │   │   ├── numberAsString.ts
    │   │   ├── recordAsArray.ts
    │   │   ├── recordAsString.ts
    │   │   ├── setAsArray.ts
    │   │   ├── setAsString.ts
    │   │   ├── stringAsArray.ts
    │   │   ├── stringAsNumber.ts
    │   │   ├── stringAsRecord.ts
    │   │   └── stringAsSet.ts
    │   ├── babel/
    │   │   └── index.ts
    │   ├── config/
    │   │   ├── configureLegendState.ts
    │   │   ├── enable$GetSet.ts
    │   │   ├── enable_PeekAssign.ts
    │   │   ├── enableReactComponents.ts
    │   │   ├── enableReactNativeComponents.ts
    │   │   ├── enableReactTracking.ts
    │   │   └── enableReactUse.ts
    │   ├── helpers/
    │   │   ├── pageHash.ts
    │   │   ├── pageHashParams.ts
    │   │   ├── time.ts
    │   │   ├── trackHistory.ts
    │   │   └── undoRedo.ts
    │   ├── persist-plugins/
    │   │   ├── async-storage.ts
    │   │   ├── expo-sqlite.ts
    │   │   ├── indexeddb.ts
    │   │   ├── local-storage.ts
    │   │   └── mmkv.ts
    │   ├── react/
    │   │   ├── Computed.tsx
    │   │   ├── configureReactive.ts
    │   │   ├── For.tsx
    │   │   ├── Memo.tsx
    │   │   ├── react-globals.ts
    │   │   ├── reactInterfaces.ts
    │   │   ├── reactive-observer.tsx
    │   │   ├── Reactive.tsx
    │   │   ├── Show.tsx
    │   │   ├── Switch.tsx
    │   │   ├── useComputed.ts
    │   │   ├── useEffectOnce.ts
    │   │   ├── useIsMounted.ts
    │   │   ├── useMount.ts
    │   │   ├── useObservable.ts
    │   │   ├── useObservableReducer.ts
    │   │   ├── useObservableState.ts
    │   │   ├── useObserve.ts
    │   │   ├── useObserveEffect.ts
    │   │   ├── usePauseProvider.tsx
    │   │   ├── useSelector.ts
    │   │   ├── useUnmount.ts
    │   │   └── useWhen.ts
    │   ├── react-hooks/
    │   │   ├── createObservableHook.ts
    │   │   ├── useHover.ts
    │   │   ├── useMeasure.ts
    │   │   └── useObservableNextRouter.ts
    │   ├── react-reactive/
    │   │   ├── Components.ts
    │   │   ├── enableReactComponents.ts
    │   │   ├── enableReactive.native.ts
    │   │   ├── enableReactive.ts
    │   │   ├── enableReactive.web.ts
    │   │   └── enableReactNativeComponents.ts
    │   ├── react-web/
    │   │   └── $React.tsx
    │   ├── sync/
    │   │   ├── activateSyncedNode.ts
    │   │   ├── configureObservableSync.ts
    │   │   ├── configureSynced.ts
    │   │   ├── persistTypes.ts
    │   │   ├── retry.ts
    │   │   ├── revertChanges.ts
    │   │   ├── synced.ts
    │   │   ├── syncHelpers.ts
    │   │   ├── syncTypes.ts
    │   │   ├── transformObjectFields.ts
    │   │   └── waitForSet.ts
    │   ├── sync-plugins/
    │   │   ├── crud.ts
    │   │   ├── fetch.ts
    │   │   ├── firebase.ts
    │   │   ├── keel.ts
    │   │   ├── supabase.ts
    │   │   ├── tanstack-query.ts
    │   │   └── tanstack-react-query.ts
    │   ├── trace/
    │   │   ├── traceHelpers.ts
    │   │   ├── useTraceListeners.ts
    │   │   ├── useTraceUpdates.ts
    │   │   ├── useVerifyNotTracking.ts
    │   │   └── useVerifyOneRender.ts
    │   └── types/
    │       ├── babel.d.ts
    │       ├── reactive-native.d.ts
    │       └── reactive-web.d.ts
    ├── testbundles/
    │   ├── bundlecore.js
    │   ├── bundlereact.js
    │   └── bundlesync.js
    ├── tests/
    │   ├── babel.test.ts
    │   ├── computed-old.test.ts
    │   ├── computed-persist.test.ts
    │   ├── happydom.ts
    │   ├── helpers.test.ts
    │   ├── history.test.ts
    │   ├── keel.test.ts
    │   ├── mapset.test.ts
    │   ├── middleware.test.ts
    │   ├── perf.test.ts
    │   ├── persist-indexeddb.test.ts
    │   ├── persist-localstorage.test.ts
    │   ├── persist.test.ts
    │   ├── sync.test.ts
    │   ├── synced.test.ts
    │   ├── testglobals.ts
    │   ├── tracking.test.ts
    │   ├── transform.test.ts
    │   └── types.test.ts
    └── .github/
        ├── FUNDING.yml
        └── workflows/
            └── checks.yml


Files Content:

(Files content cropped to 300k characters, download full ingest to see more)
================================================
FILE: README.md
================================================
# Legend-State

Legend-State is a super fast all-in-one state and sync library that lets you write less code to make faster apps. Legend-State has four primary goals:

### 1. 🦄 As easy as possible to use

There is no boilerplate and there are no contexts, actions, reducers, dispatchers, sagas, thunks, or epics. It doesn't modify your data at all, and you can just call `get()` to get the raw data and `set()` to change it.

In React components you can call `use()` on any observable to get the raw data and automatically re-render whenever it changes.

```jsx
import { observable, observe } from "@legendapp/state"
import { observer } from "@legendapp/state/react"

const settings$ = observable({ theme: 'dark' })

// get returns the raw data
settings$.theme.get() // 'dark'
// set sets
settings$.theme.set('light')

// Computed observables with just a function
const isDark$ = observable(() => settings$.theme.get() === 'dark')

// observing contexts re-run when tracked observables change
observe(() => {
  console.log(settings$.theme.get())
})

const Component = observer(function Component() {
    const theme = state$.settings.theme.get()

    return <div>Theme: {theme}</div>
})
```

### 2. ⚡️ The fastest React state library

Legend-State beats every other state library on just about every metric and is so optimized for arrays that it even beats vanilla JS on the "swap" and "replace all rows" benchmarks. At only `4kb` and with the massive reduction in boilerplate code, you'll have big savings in file size too.

<p>
    <img src="https://www.legendapp.com/img/dev/state/times.png" />
</p>

See [Fast 🔥](https://www.legendapp.com/open-source/state/v3/intro/fast/) for more details of why Legend-State is so fast.

### 3. 🔥 Fine-grained reactivity for minimal renders

Legend-State lets you make your renders super fine-grained, so your apps will be much faster because React has to do less work. The best way to be fast is to render less, less often.

```jsx
function FineGrained() {
    const count$ = useObservable(0)

    useInterval(() => {
        count$.set(v => v + 1)
    }, 600)

    // The text updates itself so the component doesn't re-render
    return (
        <div>
            Count: <Memo>{count$}</Memo>
        </div>
    )
}
```

### 4. 💾 Powerful sync and persistence

Legend-State includes a powerful [sync and persistence system](../../usage/persist-sync). It easily enables local-first apps by optimistically applying all changes locally first, retrying changes even after restart until they eventually sync, and syncing minimal diffs. We use Legend-State as the sync systems in [Legend](https://legendapp.com) and [Bravely](https://bravely.io), so it is by necessity very full featured while being simple to set up.

Local persistence plugins for the browser and React Native are included, with sync plugins for [Keel](https://www.keel.so), [Supabase](https://www.supabase.com), [TanStack Query](https://tanstack.com/query), and `fetch`.

```js
const state$ = observable({
    users: syncedKeel({
        list: queries.getUsers,
        create: mutations.createUsers,
        update: mutations.updateUsers,
        delete: mutations.deleteUsers,
        persist: { name: 'users', retrySync: true },
        debounceSet: 500,
        retry: {
            infinite: true,
        },
        changesSince: 'last-sync',
    }),
    // direct link to my user within the users observable
    me: () => state$.users['myuid']
})

observe(() => {
    // get() activates through to state$.users and starts syncing.
    // it updates itself and re-runs observers when name changes
    const name = me$.name.get()
})

// Setting a value goes through to state$.users and saves update to server
me$.name.set('Annyong')
```

## Install

`bun add @legendapp/state` or `npm install @legendapp/state` or `yarn add @legendapp/state`

## Highlights

- ✨ Super easy to use 😌
- ✨ Super fast ⚡️
- ✨ Super small at 4kb 🐥
- ✨ Fine-grained reactivity 🔥
- ✨ No boilerplate
- ✨ Designed for maximum performance and scalability
- ✨ React components re-render only on changes
- ✨ Very strongly typed with TypeScript
- ✨ Persistence plugins for automatically saving/loading from storage
- ✨ State can be global or within components

[Read more](https://www.legendapp.com/open-source/state/v3/intro/why/) about why Legend-State might be right for you.

## Documentation

See [the documentation site](https://www.legendapp.com/open-source/state/).

## Community

Join us on [Discord](https://discord.gg/5CBaNtADNX) to get involved with the Legend community.

## 👩‍⚖️ License

[MIT](LICENSE)

---

Legend-State is created and maintained by [Jay Meistrich](https://github.com/jmeistrich) with [Legend](https://www.legendapp.com) and [Bravely](https://www.bravely.io).

<p>
    <a href="https://www.legendapp.com"><img src="https://www.legendapp.com/img/LogoTextOnWhite.png" height="56" alt="Legend" /></a>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <a href="https://www.bravely.io"><img src="https://www.legendapp.com/img/bravely-logo.png" height="56" alt="Bravely" /></a>
</p>



================================================
FILE: babel.ts
================================================
import babel from './src/babel';
export default babel;



================================================
FILE: bunfig.toml
================================================
[install]
saveTextLockfile = true


================================================
FILE: CHANGELOG.md
================================================
## 3.0.0-alpha.1
- Fix: The new undoRedo helper was not exported correctly, moved it to `/helpers`
- Fix: IndexedDB plugin was not saving primitives properly when combined with `itemID` option

## 3.0.0-alpha.0
See https://www.legendapp.com/open-source/state/v3/other/migrating/ for details
- Types: Rewritten from scratch to be much better
- Feat: computed/proxy are now just functions
- Feat: New synced with much improved sync/persist functionality
- Feat: New sync plugins for Keel, Supabase, TanStack Query, fetch
- Removed: Old persist system, persistObservable, usePersistedObservable, etc...
- Change: useObservable with a function parameter is now reactive like useComputed was. So use peek() when accessing observables inside it if you want it to be just an initial value and not be reactive.
- Change: Computeds now only re-compute themselves when observed. This may cause some migration issues if your computeds had side effects, as they will not re-run when dependencies change unless being observed.
- Removed:  lockObservable - With the new method of computeds it's not possible to modify the types to be readonly, so we removed this feature.
- Change: set and toggle return void: They had previously returned the observable in order to allow chaining, but it caused unintended side effects, so they now return void.
- Change: `onSet` was renamed to `onAfterSet` for clarity
- Removed: The concept of "after batch" - it was generally unreliable because batches can run recursively
- Renamed: `enableDirectAccess()` to `enable$GetSet()` and `enableDirectPeek()` to `enable_PeekAssign()` for clarity

## 2.1.14
- Fix: Improved and better tested babel plugin - By @hzoo https://github.com/LegendApp/legend-state/pull/270
- Fix: useSelector with an observable was ignoring suspense option - By @lishine https://github.com/LegendApp/legend-state/pull/291
- Feat: An undoRedo helper to add undo/redo functionality to an observable

## 2.1.13
- Fix: Not persisting Map/Set correctly if at root of observable

## 2.1.12
- Fix: useSelector only short-circuits creating a hook if parameter is an observable, fixing useSelector re-rendering when its return value hadn't changed

## 2.1.11
- Fix: Recent useSelector optimizations causing some issuesin dev strict mode

## 2.1.10
- Fix: Types of observer

## 2.1.9
- Fix: useSelector was creating too many listeners

## 2.1.8
- Fix: array includes was not working correctly

## 2.1.7
- Fix: typescript errors when external imports are not available

## 2.1.6
- Fix: changed type imports from external packages to fail gracefully if they don't exist in node

## 2.1.5
- Fix: Dates were being considered as objects and were sometimes not being considered changed

## 2.1.4
- Fix: observe not running reaction if selector is an object or array

## 2.1.3
- Fix: An occasional error in sync get function

## 2.1.2
- Fix: Local cache was not saving Map/Set correctly

## 2.1.1
- Feat: usePauseProvider to pause/resume all updates under a context

## 2.0.3
- Feat: support persistence with no get
- Fix: errors in observer components getting swallowed

# 2.0.2
- Fix: persistence was not adding clearLocal to the new state node
- Fix: removed clearing ref from useObserve - it was causing fast refresh bugs and wasn't really necessary
- Package: Added react as an optional peerDependency
- Change: promise/persisted state key to support _state so it doesn't break user data with state keys, will slowly migrate to that

## 2.0.0

### Breaking
- Change: Setting a promise into an observable now creates a child prop `state` which is not in the raw data and is only accessible through the observable containing `{ isLoaded, error }`
- Change: Renamed some parameters in `persistObservable` and `configureObservablePersistence`
- Change: `afterBatch` removed and functionality merged into `batch`
- Removed: `/react-components` exports
- Removed: `enableLegendStateReact`
- Removed: `eachValues` prop from `For`
- Deprecated: `enableReactDirectRender`
- Deprecated: Reactive props ending in $ in favor of starting with $

### Improvements
- Docs: Brand new docs site at https://legendapp.com/open-source/state with better design, navigation sidebar, search
- Feat: Remote persistence with plugins for `fetch`, TanStack-Query, and Firebase Realtime Database
- Feat: `enableReactTracking({ auto: true })` to make components automatically track `get()` calls on observables
- Feat: `useWhen` and `useWhenReady` hooks
- Feat: `computed` can be set or assigned into an observable after creation
- Perf: Observable nodes activate lazily so creating or setting large objects is much faster
- Fix: Misc bugs with mergeIntoObservable
- Fix: Reactive.FlatList $data prop was not working

See https://legendapp.com/open-source/legend-state-v2/ for more details.

## 1.11.3

- Fix: computed was not activating if its value started as undefined

## 1.11.2

- Fix: useSelector was always re-rendering even if the returned value didn't change

## 1.11.1

- Removed the deprecation warning about reactive props since that might affect a lot of people and we can migrate that more slowly.

## 1.11.0

- This version displays deprecation warnings to prepare for version 2.0 release which will remove the deprecated features. See https://legendapp.com/open-source/state/migrating/ for details on migration or disabling the warning.

## 1.10.3

- Fix: Reactive elements were not supporting observable children

## 1.10.2

- Types: Improve types of useObservableQuery - By @bram209 https://github.com/LegendApp/legend-state/pull/182

## 1.10.1

- Types: Types of Map and Set were not correct if at the root of an observable
- Fix: `size` property of Map was not an observable

## 1.10.0

- Feat: `proxy` supports three modes like computed: proxy to a computed plain object, proxy to an observable, proxy to a two-way computed
- Feat: `proxy` sets raw values on parents and notifies when proxied children change
- Fix: optimize batching so that modifying a child after modifying its parent merges into the existing change rather than creating a new change
- Fix: `Show` was not passing value to children when children is a function

## 1.9.0

- Feat: Nested computeds set their value on the raw object so that `get()` on the parent will include the values of child computeds

## 1.8.1

- Feat: Added findIDKey and optimized to internal
- Fix: Added more safety around dev-only assertions because they were throwing errors in some build systems

## 1.8.0

- Feat: Support Suspense with `useSelector(state, { suspend: true })` or `state.use({ suspend: true })`

## 1.7.3

- Types: Improved types of proxy so it can have complex mapped types

## 1.7.2

- Fix: opaqueObject was not blocking looping through objects in constructor https://github.com/LegendApp/legend-state/issues/163

## 1.7.1

Fix: the change to add SessionStorage was crashing when run server-side in Next.js

## 1.7.0

- Feat: Add `ObservablePersistSessionStorage`. -By @minorgod https://github.com/LegendApp/legend-state/pull/164

## 1.6.4

- Types: `Selector` now allows `ObservableEvent`
- Types: `ObservableWriteable` was not exactly correct after the change to add Promise to `set`

## 1.6.3

- Fix: `useObservableNextRouter` was throwing warnings on some route changes
- Fix: `enableDirectPeek` set now matches normal set behavior with promise and function extraction and all
- Types: Package is now built in TypeScript strict mode

## 1.6.2

- Types: Improved types of Computed, Memo, and the babel transform
- Types: Improved handling of null and undefined in observables

## 1.6.1

- Types: Improve handling of optional properties in observable constructor
- Types: Add missing Promise type in set function

## 1.6.0

- Feat: `set` automatically unwraps promises

## 1.5.1

- Fix: Optional properties in observables were causing TS warnings

## 1.5.0

- Feat: add Reactive components, with configuration for React and React Native, to replace Legend components
- Fix: Improved types of useObservableQuery -By @sheldon-welinga https://github.com/LegendApp/legend-state/pull/146
- Fix: babel transform was breaking Memo/Computed with observable child

## 1.4.0

- Feat: Returning an observable in a computed creates a two-way link to the target observable.
- Feat: `computed` is supported as a child of an observable
- Feat: `proxy` is like a `computed` but given a key, usable by indexing into an object with a string key
- Feat: Functions and computeds in the hierarchy of the constructing object in an observable are extracted into observable metadata so that setting the observable does not delete them.
- Feat: `Memo` and `Computed` support observables as children
- Feat: `reactiveComponents` makes multiple reactive components at once from the children of the target object
- Feat: Reactive components and `reactive` makes children reactive if it's a functions
- Fix: `useObserve` updates the compute and set functions when re-run
- Fix: Direct setting with `_` was not working with falsy values
- Change: Reactive props will now start with `$` instead of ending with `$`. Both work for now, but `prop$` will be deprecated in a later version.
- Perf: `useSelector` skips creating a hook if it's inside an `observer`

## 1.3.6

- Fix: Setting a primitive observable to the same value was still notifying listeners

## 1.3.5

- Fix: array.find was returning `[]` instead of `undefined` when it found no matches

## 1.3.4

- Feat: (experimental) `enableDirectPeek` enables a property on observables named _ as a shorthand for peek(), and assigning to it modifies the underlying object without notifying listeners of changes.

## 1.3.2

- Fix: `reactive` was not working with some external packages like NativeBase

## 1.3.0

See [https://legendapp.com/open-source/state/experiments/](https://legendapp.com/open-source/state/experiments/) for details about the new features in this version.

- Feat: Ability to globally add functions/properties to observables
- Feat: (experimental) `enableDirectAccess` enables a property on observables named $ as a shorthand for get/set
- Feat: (experimental) `enableReactUse` enables a `use()` function on all observables to get the value of an observable and track it for changes within a React component
- Feat: (experimental) `enableReactDirectRender` replaces `enableLegendStateReact` (will be deprecated in a later version)
- Fix: `afterBatch` was running after all recursive batches rather than just the current batch
- Fix: Circular reference detection was failing on null values

## 1.2.11

- Fix: detection of circular references was having false positives if references existed in multiple places in the hierarchy
- Fix: Crash in proxy trap with nested calls to assign (part 2)

## 1.2.10

- Fix: Crash in proxy trap with nested calls to assign

## 1.2.9

- Perf: A small optimization in For to skip Object.assign if there's no itemProps
- Perf: Change merge of pending data on load to use setAtPath instead of mergeIntoObservable
- Misc: Add some warnings when setting an observable directly

## 1.2.8

- Fix: Remove peerDependencies which was causing issues in some environments

## 1.2.7

- Fix: Potential crash in persistence if pathTypes comes from persistence undefined

## 1.2.6

- Fix: _arr in fieldTransforms not working for strings

## 1.2.5

- Fix: peerDependencies to make next optional

## 1.2.4

- Types: Fix types of Switch so that it works better with booleans

## 1.2.3

- Types: Fix types of Map get so that it returns an Observable of the correct type

## 1.2.2

- Fix: When persisting, changes to a node are ignored if a later change modifies a parent node (as can happen when deleting nodes)

## 1.2.1

- Feat: Support Map in the For component
- Change: TrackingType "optimize" parameter is changed to a symbol to avoid conflict with Map get. It will still work for now, but please `import { optimize } from "@legendapp/state"` and use that instead.
- Change: The For component's `eachValues` prop is deprecated in favor of just working with the `each` prop. It will still work for now, but please change `eachValues` to `each`.

## 1.2.0

- Feat: Added support for observable Map, WeakMap, Set, WeakSet

## 1.1.0

- Perf: Listeners are batched uniquely so that each listener will fire only once for all of the changes within a batch
- Change: Array filter and find return the observable instead of the raw data.

## 1.0.0

After an unexpectly large number of changes while in RC, 1.0 includes tons of improvements and fixes that can broadly be categorized as:

- Improved persistence plugin system
- Added two-way `computed`
- Performance improvements
- A few minor breaking changes - see https://legendapp.com/open-source/state/migrating/

See https://legendapp.com/open-source/legend-state-v1/ for more details.

## 1.0.0-rc.34

- Fix: Reactive FlatList `data$` prop was not working correctly #66

## 1.0.0-rc.33

- Perf: Improve performance of arrays
- Perf: Improve performance of useSelector when passing an observable directly
- Perf: Improve performance of the For component

## 1.0.0-rc.32

- Change: `useObserve` runs the function less often
- Change: `when` checks truthiness instead of readiness. Use `whenReady` if you want empty objects and arrays to not count.
- Change: `afterBatch` runs after the batch instead of at the end of a batch, which is more useful
- Perf: Changes are internally batched by node instead of by listener, resulting in fewer `onChange` calls

## 1.0.0-rc.31

- Feat: Add a sortValues function to For for use with eachValues

## 1.0.0-rc.30

- Feat: Add support for a _keyExtractor field to return an arbitrary key value on arrays
- Change: internals is exported as an object instead of a separate export path

## 1.0.0-rc.29

- Fix: Prevent batches from running recursively
- Fix: The second "reaction" paremeter in `observe` sometimes had an incorrect `previous` value

## 1.0.0-rc.27

- Fix: `getPrevious()` in onChange was sometimes incorrect during a batch

## 1.0.0-rc.26

- Perf: Removed IndexedDB preloader because it's actually slower because of the time it takes to copy the data across the Web Worker bridge

## 1.0.0-rc.23

- Perf: Miscellaneous micro-optimizing

## 1.0.0-rc.22

- Feat: Add a useObservableNextRouter hook for Next.js
- Perf: Persistence plugins queue into a microtask to bundle saves together

## 1.0.0-rc.21

- Feat: Added `eachValues` prop to For to map the values of an object

## 1.0.0-rc.20

- Fix: useSelector now uses useSyncExternalStore under the hood to support Suspense better

## 1.0.0-rc.19

- Fix: mergeIntoObservable was sometimes deleting undefined fields

## 1.0.0-rc.17

- Perf: Sped up IndexedDB plugin and removed the preloader because it was actually slower

## 1.0.0-rc.16

- Fix: Fast Refresh sometimes resetting observables -By @GiFarina

## 1.0.0-rc.14

- Perf: Running notifications in large objects sped up

## 1.0.0-rc.10

- Fix: `afterBatch` was not working correctly if run from within a batch

## 1.0.0-rc.4

- Feature: Added two way `computed`

## 1.0.0-rc.2

- Feature: `batch` has a new `onComplete `batch(callback, onComplete)` parameter to run a function after the batch commits. This can be useful for cleaning up a temporary state while batching.
- Fix: onChange with `initial` option fires immediately rather than going through batching process
- Fix: Applying pending changes on load was writing back to local persistence unnecessarily
- Perf: Improve performance of `mergeIntoObservable` by just doing a `set` if a target property is empty and doesn't need merging logic
- Perf: Improve persistence overall by using more targeted approaches than `mergeIntoObservable`

## 1.0.0-rc.1

- Fix: Incrementing a value from 0 with a function (`value.set((prev) => prev + 1)`) was not firing a callback the first time


## 1.0.0-rc.0

- Breaking: `onChange` function changed to take an options object as a second parameter with a new `initial` option that makes it fire immediately with the current value.
- Breaking: `onChange` callback receives an object parameter instead of many arguments. This adds more flexibility for callers who care about different values in the change object.
- Fix: `mergeIntoObservable` was not working correctly in some edge cases.
- Fix: IndexedDB persistence improved for many edge cases, with some fixes and performance improvements
- Fix: Persistence layers overall improved with more stability and better performance

## 0.23.1

- Fix: Not notifying on change of dates

## 0.23.0

- Breaking: Improved the criteria of when to notify up parents for changes on objects to run only when something inside it has changed, so setting/assigning the same object onto itself will not notify. It's unlikely but possible that may be a breaking change for you if you depended on things re-computing/re-rendering even if nothing changed.
- Breaking: Removed automatically treating DOM nodes and React elements as opaque objects - it added most likely unnecessary extra code and is easily solved in a more generic way. If you're storing those in observables, wrap them in `opaqueObject(...)`.
- Feature: Added `is*` functions to export
- Perf: Batching was never clearing its safety timeouts, so thousands of changes at once could have been slow

### Persistence
- Breaking: Changed ignoreKeys to be an array to be easier to use
- Breaking: Remove the flexibility for saving arrays and basic objects (can do that with itemID now).
- Feature: IndexedDB supports adjustData, prefixID, itemID, fieldTransforms
- Fix: IndexedDB `loadTable` not being considered loaded if no data was available
- Fix: Tons of miscellaneous IndexedDB fixes

## 0.22.5

### Persistence
- Fix: There was no way to subscribe to updates of dateModified

## 0.22.4

- Change: When returns the value directly, rather than a Promise, if it's already resolved on the first run

### Persistence
- Fix: mergeIntoObservable not working if source object has only symbol keys

## 0.22.3

- Fix: Not notifying on array change with the same length but ids added or removed

## 0.22.2

### Persistence
- Fix: IndexedDB preloader not loading correctly if it has to await the promise

## 0.22.1

### Persistence
- Fix: Changes deep in an object were not saving to IndexedDB correctly
- Fix: Metadata not saving properly from remote changes

## 0.22.0

- Breaking: Local Storage is no longer used as default persistence (to reduce build size for those not using it). Please configure persistence at the beginning of your application: https://legendapp.com/open-source/state/persistence/
- Breaking: Moved persist plugins to /persist-plugins export path
- Breaking: Internals of persistence plugins were changed to better support async loading and metadata. If you had made your own persistence plugin the changes should be straightforward, or create an Issue and we'll help migrate it.
- Breaking: `when` behavior tweaked to not be triggered by empty objects or empty arrays
- Feature: `ObservablePersistIndexedDB` for persisting to IndexedDB
- Fix: `useObserveEffect` not working right in React StrictMode
- Types: Improved typing of `For`

## 0.21.18

- Fix: `getObservableIndex` not working on index 0
- Fix: `useObserve` not working properly in StrictMode in React 18

## 0.21.17

- Fix: `useObservableQuery` was causing re-renders when using mutation

## 0.21.16

- Fix: `useObservableQuery` still not working right in StrictMode

## 0.21.15

- Fix: `useObservableQuery` not working in StrictMode

## 0.21.14

- Feat: Added `useObserveEffect`
- Fix: Added useReducer overriding to `createObservableHook`

## 0.21.13

- Feat: Added a `usePersistedObservable` hook
- Feat: Added an optional second parameter to observe for an untracked callback function
- Feat: Added helpers: `pageHash` and `pageHashParams` (replaces `useHash`)
- Fix: `useObservableQuery` was sometimes not working because it was not loading the correct Context
- Types: Improved types for strict mode

## 0.21.12

- Feat: For remote persistence plugins: Add options to disable local or remote sync, support loading remote even if there's no local

## 0.21.11

- Feat: Added useObservableQuery hook
- Feat: Added local persistence options, starting with mmkv configuration
- Change: Removed persist option from useObservable. It was a bad idea - it imported the whole /persist export. A better solution will come in an update soon.

## 0.21.10

- Fix: `createObservableHook` was not working with initialState as a function
- Perf: Reduce number of renders by not notifying if setting with an unchanged object or array

## 0.21.9

- Fix: A circular import warning in the react export

## 0.21.8

- Fix: `useSelector` was not cleaning up when components when components re-rendered from a source other than observables
- Types: Improved types for strict mode https://github.com/LegendApp/legend-state/pull/56

## 0.21.7

- Feat: Added another way to use the `Switch` component, with multiple `Show` children, that renders the first `Show` that matches
- Types: Improved types for strict mode https://github.com/LegendApp/legend-state/pull/52

## 0.21.6

- Feat: Added `opaqueObject` to make an element in an observable act as a primitive, not proxying its properties or notifying for changes.
- Feat: Added some helpers: `observableFetch`, `currentTime`, `currentDay`
- Feat: Added some hooks: `useFetch`, `useHash`, `useHover`, `useIsMounted`, `useMeasure`

## 0.21.5

- Feat: Add `getObservableIndex` function to use with the observable argument to `For`

## 0.21.4

- Fix: `reactive` was overriding the given function, causing problems if wrapping an external component and conditionally rendering the original component
- Fix: `useObservableReducer` was not working with non-function arguments

## 0.21.3

- Fix: History not saving the initial object creation
- Fix: Crash when modifying an array was that included as initial value to an observable

## 0.21.2

- Fix: React Native Switch was not two-way binding properly

## 0.21.1

- Feat: Added a deps array to useComputed so it can be updated if dependencies change
- Feat: Added reactive types for SVGs

## 0.21.0

See https://legendapp.com/open-source/state/migrating for more details.

- Breaking: Changed observable `onChange` callback to take an array of changes rather than a single changed value because batched changes were only showing the most recently changed child value.
- Breaking: Rename react-components export from legend to Legend
- Feat: `trackHistory` creates an observable that tracks a version history of a target observable
- Feat: persistObservable caches pending changes offline so if they're not successfully saved remotely, it attempts to sync them after remote persistence is loaded
- Feat: Allow mergeIntoObservables to delete by using a symbol

## 0.20.5

- Fix: Types of React Native components were not supporting refs properly

## 0.20.4

- Fix: Reactive components not forwarding refs properly

## 0.20.3

- Fix: Tracing functions crashing if component is not an observer

## 0.20.2

- Fix: mergeIntoObservable was overwriting object children with undefined values

## 0.20.1

- Fix: `observer` was not auto-memoizing after the rewrite in 0.20.0
- Fix: `For` which a child function auto-observes

## 0.20.0

- Breaking: Changed behavior of `observe` and `useObserve` so that they have a callback parameter, useful for observing an event and doing something only when it changes. It also has a new `previous` parameter to compare to the previous run which depends on a return value, so the previous behavior using the return value is moved into the callback parameter. If you were returning false to cancel observing, you can now use `e.cancel = true`. And if you were returning a cleanup function you can use `e.onCleanup = () => ...`. It also adds a `num` param to know how many times it's run.
- Breaking: Renamed event `dispatch` to `fire`
- Breaking: Removed deprecated hooking into internal dispatcher
- Breaking: Removed deprecated Bindable components
- Feat: Added a callback parameter to `useObserve`, useful for observing an event and doing something only when it changes
- Feat: Added useMount and useUnmount lifecycle hooks to encourage getting away from useEffect
- Feat: `useObserve` has a second callback parameter which will run after the selector. This can be useful for passing an `observable` or `event` as the first parameter.
- Fix: `reactive` and `observe` components were sometimes not retaining their static properties (like id). They now use a Proxy wrapper instead of an HOC, which reduces component tree depth and avoids any other bugs from wrapping components and forwarding refs.
- Fix: `event` was not working correctly in selectors
- Fix: The two-way binding components are always controlled, even if the `value$` is undefined
- Types: Improved types of `computed` and `useComponent` to accept a Promise

## 0.19.8

- Fix: Reactive components were sometimes not working in React Native https://github.com/LegendApp/legend-state/issues/32

## 0.19.7

- Feat: Added `itemProps` to `For` component to pass extra props to items
- Fix: Setter functions on primitives are auto-bound so you can pass them to event handlers
- Fix: Directly rendering primitive observables was erroring in getNode sometimes

## 0.19.6

- Feat: Observable booleans have a `toggle()` function
- Perf: Observable primities are a simple function instead of a class, reducing code size and should be a bit faster
- Types: Improved typings of For component

## 0.19.5

- Fix: Persisting primitives

## 0.19.4

- Feat: Added `useObservableReducer` hook, which is the same as `useReducer` but it updates an observable rather than triggering a render https://github.com/LegendApp/legend-state/issues/20

## 0.19.3

- Fix: Fast Refresh not disposing `observe()` correctly https://github.com/LegendApp/legend-state/issues/25
- Fix: React hooks error in Show when toggling if it has a children function
- Types: Improved types of For to handle computed observables better
- Types: Improved types of useObservable to support Promises

## 0.19.2

- Feat: `createObservableHook` for converting other hooks that use `useState` to return an observable

## 0.19.1

- Feat: Support two-way binding multiple props, starting with checked$ on input

## 0.19.0

This is a big one, with a breaking change to stop observing all React components automatically. See https://legendapp.com/open-source/state/migrating for more details.

- Breaking: No longer observing all React components automatically. Please use `observer` or `useSelector` for observable tracking.
- Breaking: Primitives no longer have `value` - use the standard `get()` or `set()` instead
- Breaking: Removed `get(false)` in favor of `peek()`
- Deprecated: Bindable components will be phased out in favor of new reactive components. Import `{ legend }` on web or `{ Legend }` on react-native instead of Bindable.
- Feat: Added `observer` HOC component
- Feat: `reactive` components that let you pass an observable or selector to any prop [reactive-props](https://legendapp.com/open-source/state/reactive-props)
- Feat: `useSelector` has options to control how often it renders and to reuse forceRender functions
- Fix: Improved types for TypeScript strict mode
- Fix: Local storage persistence removes item if undefined
- Fix: Rendering multiple obseravbles inside one element had key collision issues

## 0.18.8
- Fix: Array move detection further improved

## 0.18.7
- Feat: `observe` function can return false to prevent tracking
- Fix: Tracking was sometimes getting out of order with nested components and computed
- Fix: useSelector was triggering renders multiple times
- Fix: Array move detection was incorrect on inserts

## 0.18.6
- Fix: React-specific props were creating proxies unnecessarily

## 0.18.4
- Fix: Fast refresh issues with bindable components

## 0.18.3
- Fix: Fast refresh issues with direct rendering

## 0.18.2
- Fix: Rendering directly to JSX was not activating computeds
- Types: Improved typing of observable and useObservable to more correctly narrow down complex types

## 0.18.1
- Fix: Crash in Switch component in development

## 0.18.0
- Breaking: Renamed tracing functions to `use*` to match hook naming
- Fix: Improved automatic React hooking into dispatcher to not need a `useEffect` and more dependably cleanup
- Fix: Better handling JSX and DOM elements in observables
- Fix: Tracing functions were not always working correctly
- Fix: Errors building in Next.js
- Fix: Typing of Show component with Babel plugin enabled
- Feat: Support `computed` with a Promise

## 0.17.6
- Fix: React behavior disabled until it's activated by React rendering it

## 0.17.5
- Fix: Missing export of `useSelector`

## 0.17.4
- Fix: Improve `observe()` disposing

## 0.17.3
- Fix: Undefined observables were not rendering directly in React properly
- Fix: `observe()` was not updating listeners on each run

## 0.17.2
- Fix: Typo in mergeIntoObservable

## 0.17.1
- Fix: Wrapped React hook injection in try/catch because it was sometimes causing errors like when hydrating in Next.js

## 0.17.0

This is a big one, with mainly a breaking change to how primitives work, so see https://legendapp.com/open-source/state/migrating for more details.

- Breaking: Primitives in state are now returned as observable objects like everything else, and you can use `get()` or `.value` to access/modify the value
- Breaking: Removed `obs()` function
- Breaking: `set()` no longer has a keyed version because it's not needed now that we can dot through undefined nodes
- Breaking: Renamed `useComputed` to `useSelector`
- Feature: Because primitives are returned as observables, we can now dot through undefined nodes
- Feature: Added `peek()` function, which is the same as `get(false)`
- Feature: `useComputed` returns a `computed` observable
- Feature: `useObserve` creates an `observe` context
- Feature: `computed` is now lazy and won't activate until its value is accessed for the first time
- Feature: `Show` has a `wrap` prop to wrap children, for example with <AnimatePresence>
- Feature: Allow observable with no parameters, initialized to undefined
- Feature: `verifyNotTracking()` to make sure that components never re-render
- Perf: Observables created as primitives use a class instead of a Proxy, to speed up the scenario of using tons of primitive observables
- Perf: Listeners that don't care about the value (like observe and React components) skip passing all the parameters to callbacks
- Fix: The new `enableLegendStateReact()` is more stable and works better with nested components
- Fix: Rendering observables directly is more stable, especially in React Native
- Fix: Modifying listeners in an `observe` was sometimes causing infinite loops

## 0.16.1
- Fix: A component going from tracking nodes to not tracking nodes was causing errors

## 0.16.0

See https://legendapp.com/open-source/state/migrating for more details.

- Breaking: Removed `observer` HOC
- Feat: No longer need `observer` HOC - Call `enableLegendStateReact()` at the beginning of your app, and then all components automatically observe any accessed state
- Feat: `when` callback receives the current value as the parameter
- Feat: Add join to array functions that create shallow listeners

## 0.15.3
- Feat: Observables can easily switch back and forth between being an object or a primitive, and observable primitives have less overhead

## 0.15.2
- Fix: Crash when creating an observable starting undefined

## 0.15.1
- Fix: Assigning an object with function children

## 0.15.0

This is a big one with many breaking (but good) changes, so see https://legendapp.com/open-source/state/migrating for more details. We're making a lot of breaking changes all once so it's not too impactful.

- Breaking: There are now three levels of safety: Unsafe, Default, Safe. "Default" is new and allows direct assignment to primitives but prevents directly assigning to everything else. The previous default behavior was "Unsafe" so you may see errors if you were directly assigning to objects/arrays/etc... Replace those with `.set(...)` or pass in `false` as the second parameter to `observable` to go back to "Unsafe" mode.
- Breaking: Renamed `ref()` to `obs()`
- Breaking: The array optimizations are now opt-in, because they can potentially have some unexpected behavior if modifying the DOM externally. You can enable them by using the `For` component with the `optimized` prop.
- Breaking: Replaced `shallow` with a `Tracking` namespace, to add Optimized tracking. Change `shallow` to `Tracking.shallow` to get the previous behavior, or `Tracking.optimized` on an array to get the optimized behavior.
- Breaking: Changed `observableBatcher` to export the batching functions directly instead of as a namespace
- Breaking: Removed `onChangeShallow`, `onTrue`, `onEquals`, and `onHasValue` in favor of the new `effect` and `when` which automatically track any accessed observables.
- Breaking: Renamed primitive observables' wrapping value from `current` to `value`.
- Breaking: Renamed `observableComputed` to `computed` and `observableEvent` to `event`.
- Breaking: Renamed the bindable components from `LS` to `Bindable` and they now export from '@legendapp/state/react-components' or '@legendapp/state/react-native-components'
- Feat: Observable primitives can be rendered directly in React
- Feat: Added `observe`, which can run arbitrary code while tracking all accessed observables.
- Feat: Added `when`, which can run functions when the predicate returns a truthy value.
- Feat: Added `Switch` component
- Feat: Support creating an observable with a Promise as a value, which will update itself when the promise resolves.
- Feat: A `lockObservable` function to prevent writes
- Fix: Observables with arrays at the root were not notifying listeners properly
- Fix: Accessing `current` (now `value`) on a primitive observable was not tracking as expected
- Fix: Improve types of Memo/Computed/Show components so that they require functions by default, and are expanded to not need functions when referencing the babel types.

## 0.14.5
- Feat: Allow passing observables directly to Show
- Fix: Usage of old observe() when if prop is an observable

## 0.14.4
- Fix: Some issues in remote persistence plugins (not yet released)

## 0.14.3
- Fix: Some issues in remote persistence plugins (not yet released)

## 0.14.2
- Fix: Old versions of React Native were crashing because of using `React.` without importing it

## 0.14.1
- Fix: `For` component with children re-renders with the latest children correctly

## 0.14.0
- Feature: A `For` component for easy rendering with array optimizations
- Fix: Improve performance of observer
- Fix: Support `_id` or `__id` field names for array optimizations
- Fix: Mixing shallow and non-shallow listeners in a component could have not mixed correctly

## 0.13.2
- Types: Renamed exported types for improved clarity

## 0.13.1
- Fix: Exported components were losing className/style when not using bind prop

## 0.13.0
- Breaking Change: Removed observe() and prop(), favoring get() and ref(). get() tracks by default and ref() does not.
- Feat: Support ref to a path on an undefined value
- Fix: A crash when calling get() on an observable with undefined parents
- Types: Enforce bind prop to not be a primitive

## 0.12.1
- Types: Improved types of exported components

## 0.12.0
- Feat: Allow direct assignment, with warnings to catch accidental errors, and an optional "safe" mode
- Feat: input components with `bind` prop that automatically binds an observable to value and onChange
- Feat: Support keyed ref: `obs.ref('key')`
- Feat: `onChange` has a `runImmediately` option
- Fix: `.ref()` and `.get()` inside an `observer` do reference counting so they don't untrack too aggressively
- Fix: `delete()` was notifying listeners with the value undefined, but the key not yet deleted
- Fix: `observer` was sometimes missing updates occurring between render and mount

## 0.11.0-beta.7
- Fix: New set option with function parameter was breaking persistence
- Fix: Component useEffect was getting called before observer could listen for changes

## 0.11.0-beta.6
- Fix: Babel plugin adds imports only once, only if not already imported

## 0.11.0-beta.5
- Feat: `set()` can take a function to easily compute it relative to the previous value

## 0.11.0-beta.4
- Feat: Added `traceListeners` and `traceUpdates` functions (exported from @legendapp/state/trace). Call them within an observer. `traceListeners` logs the path of all tracked observables, while `traceUpdates` logs details of each observable change that causes a render.

## 0.11.0-beta.3
- Fix: observer was not working the first time in StrictMode
- Fix: observer was not cleaning up old listeners when the the tracked observables changed



================================================
FILE: index.ts
================================================
export * from './src/ObservableHint';
export { isObserved, shouldIgnoreUnobserved } from './src/ObservableObject';
export { batch, beginBatch, endBatch } from './src/batching';
export { computed } from './src/computed';
export { event } from './src/event';
export { isObservable } from './src/globals';
export {
    applyChange,
    applyChanges,
    computeSelector,
    constructObjectWithPath,
    deconstructObjectWithPath,
    getObservableIndex,
    isObservableValueReady,
    mergeIntoObservable,
    opaqueObject,
    setAtPath,
    setSilently,
} from './src/helpers';
export {
    hasOwnProperty,
    isArray,
    isBoolean,
    isDate,
    isEmpty,
    isFunction,
    isMap,
    isNullOrUndefined,
    isNumber,
    isObject,
    isPlainObject,
    isPrimitive,
    isPromise,
    isSet,
    isString,
    isSymbol,
} from './src/is';
export { linked } from './src/linked';
export { observable, observablePrimitive } from './src/observable';
export type * from './src/observableInterfaces';
export * from './src/observableTypes';
export { observe } from './src/observe';
export { proxy } from './src/proxy';
export { syncState } from './src/syncState';
export { trackSelector } from './src/trackSelector';
export { when, whenReady } from './src/when';

/** @internal */
export { beginTracking, endTracking, tracking, updateTracking } from './src/tracking';
/** @internal */
export { setupTracking } from './src/setupTracking';
/** @internal */
export { findIDKey, getNode, getNodeValue, optimized, symbolDelete } from './src/globals';
/** @internal */
export { ObservablePrimitiveClass } from './src/ObservablePrimitive';

// Internal:
import {
    deactivateNode,
    get,
    getProxy,
    observableFns,
    observableProperties,
    peek,
    reactivateNode,
    set,
} from './src/ObservableObject';
import { createPreviousHandler } from './src/batching';
import {
    clone,
    ensureNodeValue,
    findIDKey,
    getChildNode,
    getKeys,
    getNode,
    getNodeValue,
    getPathType,
    globalState,
    optimized,
    safeParse,
    safeStringify,
    setNodeValue,
    symbolDelete,
    symbolLinked,
} from './src/globals';
import { deepMerge, getValueAtPath, initializePathType, setAtPath } from './src/helpers';
import { tracking } from './src/tracking';
import { ObservablePrimitiveClass } from './src/ObservablePrimitive';
import { registerMiddleware } from './src/middleware';

export const internal = {
    createPreviousHandler,
    clone,
    deactivateNode,
    deepMerge,
    ensureNodeValue,
    findIDKey,
    get,
    getChildNode,
    getKeys,
    getNode,
    getNodeValue,
    getPathType,
    getProxy,
    getValueAtPath,
    globalState,
    initializePathType,
    ObservablePrimitiveClass,
    observableProperties,
    observableFns,
    optimized,
    peek,
    reactivateNode,
    registerMiddleware,
    safeParse,
    safeStringify,
    set,
    setAtPath,
    setNodeValue,
    symbolLinked,
    symbolDelete,
    tracking,
};



================================================
FILE: jest.config.json
================================================
{
    "preset": "ts-jest",
    "testEnvironment": "node",
    "modulePathIgnorePatterns": ["<rootDir>/dist"],
    "moduleNameMapper": {
        "@legendapp/state/sync-plugins/crud": "<rootDir>/src/sync-plugins/crud",
        "@legendapp/state/sync": "<rootDir>/sync",
        "@legendapp/state/config/configureLegendState": "<rootDir>/src/config/configureLegendState",
        "@legendapp/state": "<rootDir>/index"
    },
    "transform": {
        "^.+\\.tsx?$": ["ts-jest", { "tsconfig": { "jsx": "react" } }]
    }
}


================================================
FILE: lefthook.yml
================================================
[Empty file]


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
    "name": "@legendapp/state",
    "version": "3.0.0-beta.32",
    "description": "legend-state",
    "sideEffects": false,
    "private": true,
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
        "build": "npm run lint:check && npm run format:check && bun buntestsilent && bunx tsup && bun run posttsup.ts",
        "test": "jest",
        "preversion": "npm run buntestsilent",
        "postversion": "npm run build && git push --follow-tags",
        "jestclear": "jest --clearCache",
        "publish:manual": "npm run build && cd dist && npm publish",
        "publish:minor": "npm version minor && cd dist && npm publish",
        "publish:alpharelease": "npm version prerelease --preid=alpha && cd dist && npm publish --tag alpha",
        "publish:betarelease": "npm version prerelease --preid=beta && cd dist && npm publish --tag beta",
        "publish:nextrelease": "npm version prerelease --preid=next && cd dist && npm publish --tag next",
        "publish:patch": "npm version patch && cd dist && npm publish",
        "publish:premajor": "npm version premajor --preid=next && cd dist && npm publish --tag next",
        "publish:preminor": "npm version preminor --preid=next && cd dist && npm publish --tag next",
        "publish:prepatch": "npm version prepatch --preid=next && cd dist && npm publish --tag next",
        "publish:rcrelease": "npm version prerelease --preid=rc && cd dist && npm publish --tag rc",
        "checksize:core": "npx esbuild ./testbundles/bundlecore.js --bundle --outfile=temp-built.js --minify && gzip temp-built.js && stat -f%z ./temp-built.js.gz && rm temp-built.js.*",
        "checksize:react": "npx esbuild ./testbundles/bundlereact.js --bundle --outfile=temp-built.js --minify --external:react --external:@legendapp/state && gzip temp-built.js && stat -f%z ./temp-built.js.gz && rm temp-built.js.*",
        "checksize:sync": "npx esbuild ./testbundles/bundlesync.js --bundle --outfile=temp-built.js --minify --external:sync --external:@legendapp/state && gzip temp-built.js && stat -f%z ./temp-built.js.gz && rm temp-built.js.*",
        "checksize": "npm run checksize:core && npm run checksize:react && npm run checksize:sync",
        "lint:write": "eslint ./src ./tests --fix --ext .ts,.tsx",
        "lint:check": "eslint ./src ./tests --ext .ts,.tsx",
        "format:write": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\"",
        "format:check": "prettier --check \"src/**/*.{js,jsx,ts,tsx}\"",
        "release": "release-it",
        "typecheck": "tsc --noEmit",
        "buntest": "bun test --timeout 50",
        "buntestsilent": "bun test --timeout 50 > /dev/null 2>&1",
        "upgrade": "bunx npm-check-updates@latest --interactive --format group -p bun"
    },
    "lsexports": [
        ".",
        "sync",
        "react",
        "react-native",
        "react-web",
        "trace",
        "babel",
        "react-reactive/*",
        "as/*",
        "config/*",
        "helpers/*",
        "persist-plugins/*",
        "sync-plugins/*",
        "react-hooks/*"
    ],
    "devDependencies": {
        "@babel/preset-env": "^7.24.7",
        "@babel/preset-react": "^7.24.7",
        "@babel/types": "^7.24.6",
        "@commitlint/config-conventional": "^19.2.2",
        "@evilmartians/lefthook": "^1.6.13",
        "@happy-dom/global-registrator": "^14.12.0",
        "@jest/globals": "^29.7.0",
        "@react-native-async-storage/async-storage": "^1.23.1",
        "@release-it/conventional-changelog": "^8.0.1",
        "@supabase/supabase-js": "^2.43.4",
        "@swc/cli": "^0.3.12",
        "@swc/core": "^1.5.7",
        "@tanstack/react-query": "^5.40.0",
        "@testing-library/jest-dom": "^6.4.5",
        "@testing-library/react": "^15.0.7",
        "@types/bun": "^1.1.3",
        "@types/jest": "^29.5.12",
        "@types/react": "^18.3.3",
        "@types/react-dom": "^18.3.0",
        "@types/react-native": "^0.72.8",
        "@types/use-sync-external-store": "^0.0.6",
        "@typescript-eslint/eslint-plugin": "^7.11.0",
        "@typescript-eslint/parser": "^7.11.0",
        "babel-jest": "^29.7.0",
        "babel-plugin-tester": "^11.0.4",
        "commitlint": "^19.3.0",
        "eslint": "^8.45.0",
        "eslint-plugin-react": "^7.32.2",
        "eslint-plugin-react-hooks": "^4.6.2",
        "expect-type": "^0.19.0",
        "expo-sqlite": "^15.0.6",
        "fake-indexeddb": "^6.0.0",
        "firebase": "^10.12.2",
        "jest": "^29.7.0",
        "jest-environment-jsdom": "^29.7.0",
        "json": "^11.0.0",
        "next": "^14",
        "prettier": "^3.4.2",
        "react": "18.3.1",
        "react-native": "^0.74.1",
        "react-native-mmkv": "^2.12.2",
        "react-test-renderer": "^18.3.1",
        "release-it": "^17.3.0",
        "ts-jest": "^29.1.4",
        "tslib": "^2.6.2",
        "tsup": "^8.0.2",
        "typescript": "^5.7.2"
    },
    "dependencies": {
        "use-sync-external-store": "^1.2.2"
    },
    "peerDependencies": {
        "expo-sqlite": "^15.0.0"
    },
    "peerDependenciesMeta": {
        "expo-sqlite": {
            "optional": true
        }
    },
    "overrides": {
        "react": "18.3.1"
    },
    "author": "Legend <contact@legendapp.com> (https://github.com/LegendApp)",
    "keywords": [
        "react",
        "react-native",
        "state",
        "hooks",
        "proxy"
    ],
    "repository": {
        "type": "git",
        "url": "git+https://github.com/LegendApp/legend-state.git"
    },
    "license": "MIT",
    "bugs": {
        "url": "https://github.com/LegendApp/legend-state/issues"
    },
    "homepage": "https://github.com/LegendApp/legend-state#readme",
    "publishConfig": {
        "registry": "https://registry.npmjs.org/"
    },
    "commitlint": {
        "extends": [
            "@commitlint/config-conventional"
        ]
    }
}



================================================
FILE: posttsup.ts
================================================
import path from 'node:path';
import fs from 'node:fs';
import pkg from './package.json';

async function copy(...files: string[]) {
    return files.map((file) => Bun.write('dist/' + file.replace('src/', ''), Bun.file(file), { createPath: true }));
}

copy(
    'LICENSE',
    'CHANGELOG.md',
    'README.md',
    'src/types/babel.d.ts',
    'src/types/reactive-native.d.ts',
    'src/types/reactive-web.d.ts',
);

const lsexports = pkg.lsexports;
const exports: Record<string, string | { import?: string; require?: string; types: string }> = {
    './package.json': './package.json',
    './babel': './babel.js',
    './types/babel': {
        types: './types/babel.d.ts',
    },
    './types/reactive-web': {
        types: './types/reactive-web.d.ts',
    },
    './types/reactive-native': {
        types: './types/reactive-native.d.ts',
    },
};
function addExport(key: string, file: string) {
    exports[key] = {
        import: `./${file}.mjs`,
        require: `./${file}.js`,
        types: `./${file}.d.ts`,
    };
}
lsexports.forEach((exp) => {
    if (exp.endsWith('/*')) {
        const p = exp.replace('/*', '');
        const files = fs.readdirSync(path.join('src', p));

        files.forEach((filename) => {
            const file = filename.replace(/\.[^/.]+$/, '');
            if (!file.startsWith('_')) {
                addExport(`${file === '.' ? '' : './'}${p}/${file}`, `${p}/${file}`);
            }
        });
    } else {
        addExport(exp === '.' ? exp : './' + exp, exp === '.' ? 'index' : exp);
    }
});

const pkgOut = pkg as Record<string, any>;

pkg.private = false;
pkgOut.exports = exports;
delete pkgOut.lsexports;
delete pkgOut.devDependencies;
delete pkgOut.overrides;
delete pkgOut.scripts;
delete pkgOut.engines;

Bun.write('dist/package.json', JSON.stringify(pkg, undefined, 2));

async function fix_To$(path: string) {
    const pathOld = path.replace('$', '_');
    await Bun.write(path, Bun.file(pathOld));
    fs.unlinkSync(pathOld);
}
fix_To$('dist/config/enable$GetSet.d.ts');
fix_To$('dist/config/enable$GetSet.d.mts');



================================================
FILE: react-native.ts
================================================
export * from './src/react-reactive/Components';



================================================
FILE: react-web.ts
================================================
export { $React } from './src/react-web/$React';



================================================
FILE: react.ts
================================================
export * from './src/react/Computed';
export * from './src/react/For';
export { usePauseProvider } from './src/react/usePauseProvider';
export * from './src/react/Memo';
export { Reactive } from './src/react/Reactive';
export type { IReactive } from './src/react/Reactive';
export * from './src/react/Show';
export * from './src/react/Switch';
export * from './src/react/reactInterfaces';
export * from './src/react/reactive-observer';
export * from './src/react/useComputed';
export * from './src/react/useEffectOnce';
export * from './src/react/useIsMounted';
export * from './src/react/useMount';
export * from './src/react/useObservable';
export * from './src/react/useObservableReducer';
export * from './src/react/useObserve';
export * from './src/react/useObserveEffect';
export * from './src/react/useSelector';
export * from './src/react/useUnmount';
export * from './src/react/useWhen';
export { configureReactive } from './src/react/configureReactive';



================================================
FILE: sync.ts
================================================
import type { SyncedOptionsGlobal } from './src/sync/syncTypes';
export { configureObservableSync } from './src/sync/configureObservableSync';
export * from './src/sync/persistTypes';
export * from './src/sync/syncHelpers';
export { mapSyncPlugins, onChangeRemote, syncObservable } from './src/sync/syncObservable';
export * from './src/sync/syncTypes';
export { synced } from './src/sync/synced';
export * from './src/sync/configureSynced';
export { createRevertChanges } from './src/sync/revertChanges';

import { waitForSet } from './src/sync/waitForSet';
import { observableSyncConfiguration } from './src/sync/configureObservableSync';
import { runWithRetry } from './src/sync/retry';
export const internal: {
    observableSyncConfiguration: SyncedOptionsGlobal;
    waitForSet: typeof waitForSet;
    runWithRetry: typeof runWithRetry;
} = {
    observableSyncConfiguration,
    waitForSet,
    runWithRetry,
};



================================================
FILE: trace.ts
================================================
export * from './src/trace/useTraceListeners';
export * from './src/trace/useTraceUpdates';
export * from './src/trace/useVerifyNotTracking';
export * from './src/trace/useVerifyOneRender';



================================================
FILE: tsconfig.esm.json
================================================
{
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "module": "ES2015",
        "outDir": "dist/esm"
    }
}


================================================
FILE: tsconfig.json
================================================
{
    "compilerOptions": {
        "outDir": "dist",
        "target": "es2018",
        "module": "ES2015",
        "lib": [
            "dom",
            "dom.iterable",
            "esnext"
        ],
        "skipLibCheck": true,
        "strict": true,
        "allowSyntheticDefaultImports": true,
        "forceConsistentCasingInFileNames": true,
        "incremental": true,
        "tsBuildInfoFile": "./tsconfig.tsbuildinfo", // Specify the build info file
        "esModuleInterop": true,
        "moduleResolution": "node",
        "isolatedModules": true,
        "jsx": "preserve",
        "stripInternal": true,
        "baseUrl": ".",
        "rootDirs": [
            "./src",
        ],
        "declaration": true,
        "declarationMap": false,
        "sourceMap": true,
        "paths": {
            "react": [
                "node_modules/react"
            ],
            "react-native": [
                "node_modules/react-native"
            ],
            "react-native-mmkv": [
                "node_modules/react-native-mmkv"
            ],
            "next": [
                "node_modules/next"
            ],
            "next/router": [
                "node_modules/next/router"
            ],
            "@babel/types": [
                "node_modules/@babel/types"
            ],
            "@tanstack/react-query": [
                "node_modules/@tanstack/react-query"
            ],
            "firebase/auth": [
                "node_modules/firebase/auth"
            ],
            "firebase/database": [
                "node_modules/firebase/database"
            ],
            "@legendapp/state": [
                "index"
            ],
            "@legendapp/state/config/*": [
                "src/config/*"
            ],
            "@legendapp/state/persist": [
                "persist"
            ],
            "@legendapp/state/sync": [
                "sync"
            ],
            "@legendapp/state/react": [
                "react"
            ],
            "@legendapp/state/helpers/fetch": [
                "src/helpers/fetch"
            ],
            "@legendapp/state/sync-plugins/crud": [
                "src/sync-plugins/crud"
            ],
            "@legendapp/state/sync-plugins/tanstack-query": [
                "src/sync-plugins/tanstack-query"
            ],
            "@legendapp/state/react-reactive/enableReactive": [
                "src/react-reactive/enableReactive"
            ],
            "@legendapp/state/react-reactive/enableReactComponents": [
                "src/react-reactive/enableReactComponents"
            ],
            "@legendapp/state/react-reactive/enableReactNativeComponents": [
                "src/react-reactive/enableReactNativeComponents"
            ]
        },
        "resolveJsonModule": true,
        "noEmit": true
    },
    "include": [
        "**/*.ts",
        "**/*.tsx"
    ],
    "exclude": [
        "node_modules",
        "dist",
        "types.d.ts",
        "src/types"
    ],
}


================================================
FILE: tsup.config.ts
================================================
import path from 'node:path';
import fs from 'node:fs';
import { defineConfig } from 'tsup';
// @ts-expect-error It says import assertions don't work, but they do
import pkg from './package.json' assert { type: 'json' };

const Exclude = new Set(['.DS_Store']);

const external = [
    '@babel/types',
    'next',
    'next/router',
    'react',
    'react-native',
    'react-native-mmkv',
    '@react-native-async-storage/async-storage',
    '@tanstack/react-query',
    '@tanstack/query-core',
    '@legendapp/state',
    '@legendapp/state/config',
    '@legendapp/state/persist',
    '@legendapp/state/sync',
    '@legendapp/state/sync-plugins/crud',
    '@legendapp/state/sync-plugins/tanstack-query',
    '@legendapp/state/react',
    '@legendapp/state/helpers/fetch',
    '@legendapp/state/react-reactive/enableReactive',
    'firebase/auth',
    'firebase/database',
];

const keys = pkg['lsexports']
    .filter((exp) => !exp.endsWith('.d.ts'))
    .flatMap((exp) => {
        if (exp === '.') {
            exp = 'index';
        }
        if (exp.endsWith('/*')) {
            const expPath = exp.replace('/*', '');

            const files = fs.readdirSync(path.join('src', expPath));
            const mapped = files.map((file) => !Exclude.has(file) && `src/${expPath}/${file}`);
            return mapped;
        } else {
            return exp + '.ts';
        }
    }) as string[];

const entry: Record<string, string> = {};
keys.forEach((key) => {
    entry[key.replace('src/', '').replace('.ts', '')] = key;
});

export default defineConfig({
    entry,
    format: ['cjs', 'esm'],
    external,
    dts: true,
    treeshake: true,
    splitting: false,
    clean: true,
});



================================================
FILE: .babelrc
================================================
{
    "presets": [
        "es2015",
        "react"
    ]
}


================================================
FILE: .eslintignore
================================================
benchmarks/*


================================================
FILE: .eslintrc.js
================================================
// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off', // Since we dont use strictNullChecks
        'react/prop-types': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/ban-types': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};



================================================
FILE: .prettierignore
================================================
# Ignore artifacts:
node_modules
.vscode

# Ignore files
*.json


================================================
FILE: .prettierrc.json
================================================
{
    "tabWidth": 4,
    "printWidth": 120,
    "singleQuote": true
}



================================================
FILE: benchmarks/README.md
================================================
# Legend-State Benchmarks

Legend-state seeks to be the fastest React state management library.  Achieving this requires numerous optimizations which we put in the following categories:

- Architecture Optimizations: Optimizations related to the core design of Legend-state (i.e. how `Proxy` is used)
- Micro-optimizations: Optimizations related to JavaScript primitives (iteration, Object types, etc.)
- Array Optimizations: Optimizations related to the efficient rendering of large lists of data.

## Running Benchmarks

We use [hyperfine](https://github.com/sharkdp/hyperfine) for running benchmarks.  You will need this installed in order to run the benchmark script.

All benchmarked optimizations will have a directory within the relevant optimization category directory (i.e. `architecture-optimizations`, `micro-optimizations`, `array-optimizations`).  Each optimization directory will have a list of JavaScript files that each implement an approach and then a `bench.sh` that uses `hyperfine` to run the benchmark.

You can inspect in the data used for benchmarking in the `data` directory.

After installing `hyperfine` it should be as simple as a `bench.sh` script to see the results of a benchmark.



================================================
FILE: benchmarks/data/smallNumberArray.json
================================================
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599,600,601,602,603,604,605,606,607,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,626,627,628,629,630,631,632,633,634,635,636,637,638,639,640,641,642,643,644,645,646,647,648,649,650,651,652,653,654,655,656,657,658,659,660,661,662,663,664,665,666,667,668,669,670,671,672,673,674,675,676,677,678,679,680,681,682,683,684,685,686,687,688,689,690,691,692,693,694,695,696,697,698,699,700,701,702,703,704,705,706,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745,746,747,748,749,750,751,752,753,754,755,756,757,758,759,760,761,762,763,764,765,766,767,768,769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841,842,843,844,845,846,847,848,849,850,851,852,853,854,855,856,857,858,859,860,861,862,863,864,865,866,867,868,869,870,871,872,873,874,875,876,877,878,879,880,881,882,883,884,885,886,887,888,889,890,891,892,893,894,895,896,897,898,899,900,901,902,903,904,905,906,907,908,909,910,911,912,913,914,915,916,917,918,919,920,921,922,923,924,925,926,927,928,929,930,931,932,933,934,935,936,937,938,939,940,941,942,943,944,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,962,963,964,965,966,967,968,969,970,971,972,973,974,975,976,977,978,979,980,981,982,983,984,985,986,987,988,989,990,991,992,993,994,995,996,997,998,999]


================================================
FILE: benchmarks/data/smallObjectSmallArray.json
================================================
[{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"},{"name":"John Doe","age":42,"gender":"male"}]


================================================
FILE: benchmarks/micro-optimizations/loops/bench.sh
================================================
hyperfine --warmup 3 "DATA='../../data/smallNumberArray' node forLoop.js" "DATA='../../data/smallNumberArray' node forEach.js"
echo ""
echo ""
echo ""
hyperfine --warmup 3 "DATA='../../data/largeNumberArray' node forLoop.js" "DATA='../../data/largeNumberArray' node forEach.js"
echo ""
echo ""
echo ""
hyperfine --warmup 3 "DATA='../../data/smallObjectSmallArray' node forLoop.js" "DATA='../../data/smallObjectSmallArray' node forEach.js"
echo ""
echo ""
echo ""
hyperfine --warmup 3 "DATA='../../data/largeObjectSmallArray' node forLoop.js" "DATA='../../data/largeObjectSmallArray' node forEach.js"


================================================
FILE: benchmarks/micro-optimizations/loops/forEach.js
================================================
const data = require(process.env.DATA);

const noOp = () => {};

data.forEach(noOp);



================================================
FILE: benchmarks/micro-optimizations/loops/forLoop.js
================================================
const data = require(process.env.DATA);

for (let i = 0; i < data.length; i++) {
    continue;
}



================================================
FILE: docs/README.md
================================================
See the docs repo: https://github.com/legendapp/legend-docs



================================================
FILE: examples/middleware.ts
================================================
import { observable, registerMiddleware, MiddlewareEvent, MiddlewareHandler } from '../index';

// Import necessary types
import type { NodeInfo } from '../src/observableInterfaces';

// Create an observable store for our examples
const store = observable({ count: 0, user: { name: 'John' } });
// Get the root node for middleware registration
const rootNode = (store as any).__node as NodeInfo;

// Example 1: Register for listener-added events on the root node
const listenersAddedHandler = registerMiddleware(rootNode, 'listener-added', (event: MiddlewareEvent) => {
    console.log('Listener added to node:', event.node);
});

// Example 2: Register for listener-removed events on the root node
const listenersRemovedHandler = registerMiddleware(rootNode, 'listener-removed', (event: MiddlewareEvent) => {
    console.log('Listener removed from node:', event.node);
});

// Example 3: Register for listeners-cleared events on the root node
const listenersClearedHandler = registerMiddleware(rootNode, 'listeners-cleared', (event: MiddlewareEvent) => {
    console.log('All listeners cleared from node:', event.node);
});

// Example 4: Register for a specific event type on a specific node - Listener Added
function createListenerAddedLogger(node: NodeInfo) {
    return registerMiddleware(
        node,
        'listener-added',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (() => {
            console.log(`[${new Date().toISOString()}] Listener added to node`);
        }) as MiddlewareHandler,
    );
}

// Example 5: Register handlers for multiple specific event types
function createListenerTracker(node: NodeInfo) {
    let stats = {
        listenersAdded: 0,
        listenersRemoved: 0,
        nodesCleared: 0,
    };

    const addHandler = registerMiddleware(
        node,
        'listener-added',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (() => {
            stats.listenersAdded++;
            console.log(`Listener added to node`);
        }) as MiddlewareHandler,
    );

    const removeHandler = registerMiddleware(
        node,
        'listener-removed',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (() => {
            stats.listenersRemoved++;
            console.log(`Listener removed from node`);
        }) as MiddlewareHandler,
    );

    const clearHandler = registerMiddleware(
        node,
        'listeners-cleared',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (() => {
            stats.nodesCleared++;
            console.log(`All listeners cleared from node`);
        }) as MiddlewareHandler,
    );

    return {
        getStats: () => ({ ...stats }),
        reset: () => {
            stats = { listenersAdded: 0, listenersRemoved: 0, nodesCleared: 0 };
        },
        unregister: () => {
            addHandler();
            removeHandler();
            clearHandler();
        },
    };
}

// Example 6: Demonstrating the listeners-cleared event
function demonstrateListenersCleared() {
    console.log('\n--- Demonstrating listeners-cleared event ---');

    // Create a specific node for this example
    const demoNode = (store.count as any).__node as NodeInfo;

    // Register a handler specifically for the listeners-cleared event
    const clearedHandler = registerMiddleware(
        demoNode,
        'listeners-cleared',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_event: MiddlewareEvent) => {
            console.log(`CLEARED EVENT: All listeners have been removed from node at ${new Date().toISOString()}`);
        },
    );

    console.log('Adding first listener...');
    const unsubscribe1 = store.count.onChange(({ value }) => console.log('First listener:', value));

    console.log('Adding second listener...');
    const unsubscribe2 = store.count.onChange(({ value }) => console.log('Second listener:', value));

    console.log('Removing first listener...');
    unsubscribe1();

    console.log('Removing second listener (should trigger listeners-cleared)...');
    unsubscribe2();

    // Clean up the middleware handler
    clearedHandler();
    console.log('--- End of listeners-cleared demo ---\n');
}

// Example 7: Demonstrating microtask batching behavior
function demonstrateMicrotaskBatching() {
    console.log('\n--- Demonstrating microtask batching ---');

    // Create a specific node for this example
    const demoNode = (store.user.name as any).__node as NodeInfo;

    // Register handlers for all event types
    const eventLog: string[] = [];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const addedHandler = registerMiddleware(demoNode, 'listener-added', (event: MiddlewareEvent) => {
        eventLog.push(`Added listener at ${new Date().toISOString()}`);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const removedHandler = registerMiddleware(demoNode, 'listener-removed', (event: MiddlewareEvent) => {
        eventLog.push(`Removed listener at ${new Date().toISOString()}`);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const clearedHandler = registerMiddleware(demoNode, 'listeners-cleared', (event: MiddlewareEvent) => {
        eventLog.push(`Cleared listeners at ${new Date().toISOString()}`);
    });

    console.log('Adding and immediately removing a listener (should not trigger any events):');
    const unsubscribe = store.user.name.onChange(({ value }) => console.log('Temp listener:', value));
    unsubscribe(); // Immediately unsubscribe

    console.log('Adding a persistent listener:');
    const persistentUnsubscribe = store.user.name.onChange(({ value }) => console.log('Persistent listener:', value));

    // Use a setTimeout to see what events were actually dispatched after the microtask
    setTimeout(() => {
        console.log('Events that occurred (should only show Added listener):');
        eventLog.forEach((log) => console.log(` - ${log}`));
        eventLog.length = 0; // Clear the log

        console.log('Now removing the persistent listener:');
        persistentUnsubscribe();

        // Use another setTimeout to see what events were dispatched
        setTimeout(() => {
            console.log('Events that occurred after removing persistent listener:');
            eventLog.forEach((log) => console.log(` - ${log}`));

            // Clean up
            addedHandler();
            removedHandler();
            clearedHandler();
            console.log('--- End of microtask batching demo ---\n');
        }, 0);
    }, 0);
}

// Example 8: Registering middleware on different nodes in the tree
function exampleMultiNodeMiddleware() {
    // Get nodes for different parts of the store
    const countNode = (store.count as any).__node as NodeInfo;
    const userNode = (store.user as any).__node as NodeInfo;

    // Register middleware specific to the count node
    const countLogger = createListenerAddedLogger(countNode);

    // Register middleware specific to the user node
    const userTracker = createListenerTracker(userNode);

    // Now events will only be dispatched to the appropriate node's middleware

    // Add a listener to count
    const countUnsubscribe = store.count.onChange(({ value }) => console.log('Count is now:', value));

    // Add a listener to user.name
    const nameUnsubscribe = store.user.name.onChange(({ value }) => console.log('Name is now:', value));

    // Only count middleware would have been triggered for the count listener
    // Only user middleware would have been triggered for the name listener

    console.log('User node stats:', userTracker.getStats()); // Should show no listeners on user node

    // Clean up
    countUnsubscribe();
    nameUnsubscribe();
    countLogger();
    userTracker.unregister();
}

// Example 9: Usage in an application
function exampleUsage() {
    // Register node-specific middleware
    const addedLogger = createListenerAddedLogger(rootNode);
    const listenerTracker = createListenerTracker(rootNode);

    // Add a listener
    const unsubscribe = store.count.onChange(({ value }) => {
        console.log('Count changed:', value);
    });

    // Change values
    store.count.set(1);
    store.count.set(2);
    store.user.name.set('Alice');

    // Get stats from middleware after a microtask
    setTimeout(() => {
        console.log('Listener stats:', listenerTracker.getStats());

        // Remove listener
        unsubscribe();

        // Change more values
        store.count.set(3);

        // Get updated stats after another microtask
        setTimeout(() => {
            console.log('Updated listener stats:', listenerTracker.getStats());

            // Demonstrate the listeners-cleared event
            demonstrateListenersCleared();

            // Demonstrate batching behavior
            demonstrateMicrotaskBatching();

            // Demonstrate multi-node middleware
            exampleMultiNodeMiddleware();

            // Clean up all middleware
            addedLogger();
            listenerTracker.unregister();
            listenersAddedHandler();
            listenersRemovedHandler();
            listenersClearedHandler();
        }, 0);
    }, 0);
}

// Run the example
exampleUsage();



================================================
FILE: src/batching.ts
================================================
import { clone, getChildNode, getNodeValue, getPathType, globalState, optimized } from './globals';
import { applyChanges } from './helpers';
import type { Change, ListenerFn, ListenerParams, NodeInfo, TypeAtPath } from './observableInterfaces';

interface BatchItem {
    value: any;
    prev: any;
    level: number;
    isFromPersist: boolean;
    isFromSync: boolean;
    whenOptimizedOnlyIf?: boolean;
}
interface ChangeInBatch {
    value: any;
    level: number;
    isFromPersist: boolean;
    isFromSync: boolean;
    whenOptimizedOnlyIf?: boolean;
    changes: Change[];
}
let timeout: ReturnType<typeof setTimeout> | undefined;
let numInBatch = 0;
let isRunningBatch = false;
let didDelayEndBatch = false;
let _batchMap = new Map<NodeInfo, BatchItem>();

function onActionTimeout() {
    if (_batchMap.size > 0) {
        if (process.env.NODE_ENV === 'development') {
            console.error(
                'Forcibly completing observableBatcher because end() was never called. This may be due to an uncaught error between begin() and end().',
            );
        }
        endBatch(/*force*/ true);
    }
}

export function isArraySubset<T>(mainArr: T[], subsetArr: T[]) {
    for (let i = 0; i < mainArr.length; i++) {
        if (mainArr[i] !== subsetArr[i]) {
            return false;
        }
    }

    return true;
}

function createPreviousHandlerInner(value: any, changes: Change[]) {
    try {
        // Clones the current state and inject the previous data at the changed path
        return applyChanges(value ? clone(value) : {}, changes, true);
    } catch {
        return undefined;
    }
}

export function createPreviousHandler(value: any, changes: Change[]) {
    // Create a function that generates the previous state
    // We don't want to always do this because cloning is expensive
    // so it's better to run on demand.
    return function () {
        return createPreviousHandlerInner(value, changes);
    };
}

export function notify(node: NodeInfo, value: any, prev: any, level: number, whenOptimizedOnlyIf?: boolean) {
    // Run immediate listeners if there are any
    const changesInBatch = new Map<NodeInfo, ChangeInBatch>();
    computeChangesRecursive(
        changesInBatch,
        node,
        /*loading*/ !!globalState.isLoadingLocal,
        /*remote*/ !!globalState.isLoadingRemote,
        value,
        [],
        [],
        value,
        prev,
        /*immediate*/ true,
        level,
        whenOptimizedOnlyIf,
    );

    // Update the current batch
    const existing = _batchMap.get(node);
    if (existing) {
        // Check that value is still different from prev as it could have been reverted during the batch,
        // then don't need to notify for it
        if (existing.prev === value) {
            _batchMap.delete(node);
        } else {
            existing.value = value;
        }
        // TODO: level, whenOptimizedOnlyIf
    } else {
        _batchMap.set(node, {
            value,
            prev,
            level,
            whenOptimizedOnlyIf,
            isFromSync: !!globalState.isLoadingRemote,
            isFromPersist: !!globalState.isLoadingLocal,
        });
    }

    if (changesInBatch.size) {
        batchNotifyChanges(changesInBatch, /*immediate*/ true);
    }

    // If not in a batch run it immediately
    if (numInBatch <= 0) {
        runBatch();
    }
}

function computeChangesAtNode(
    changesInBatch: Map<NodeInfo, ChangeInBatch>,
    node: NodeInfo,
    isFromPersist: boolean,
    isFromSync: boolean,
    value: any,
    path: string[],
    pathTypes: TypeAtPath[],
    valueAtPath: any,
    prevAtPath: any,
    immediate: boolean,
    level: number,
    whenOptimizedOnlyIf?: boolean,
) {
    // If there are listeners at this node compute the changes that need to be run
    if (immediate ? node.listenersImmediate : node.listeners) {
        const change: Change = {
            path,
            pathTypes,
            valueAtPath,
            prevAtPath,
        };

        const changeInBatch = changesInBatch.get(node);
        // If the node itself has been changed then we can ignore all the child changes
        if (changeInBatch && path.length > 0) {
            const { changes } = changeInBatch;
            if (!isArraySubset(changes[0].path, change.path)) {
                changes.push(change);
                // This fixes shallow listeners because an earlier change may have come from setting a child
                changeInBatch.level = Math.min(changeInBatch.level, level);
                changeInBatch.whenOptimizedOnlyIf ||= whenOptimizedOnlyIf;
            }
        } else {
            changesInBatch.set(node, {
                level,
                value,
                isFromSync,
                isFromPersist,
                whenOptimizedOnlyIf,
                changes: [change],
            });
        }
    }
}

function computeChangesRecursive(
    changesInBatch: Map<NodeInfo, ChangeInBatch>,
    node: NodeInfo,
    loading: boolean,
    remote: boolean,
    value: any,
    path: string[],
    pathTypes: TypeAtPath[],
    valueAtPath: any,
    prevAtPath: any,
    immediate: boolean,
    level: number,
    whenOptimizedOnlyIf?: boolean,
) {
    // Do the compute at this node
    computeChangesAtNode(
        changesInBatch,
        node,
        loading,
        remote,
        value,
        path,
        pathTypes,
        valueAtPath,
        prevAtPath,
        immediate,
        level,
        whenOptimizedOnlyIf,
    );
    if (node.linkedFromNodes) {
        for (const linkedFromNode of node.linkedFromNodes) {
            const childNode = getNodeAtPath(linkedFromNode, path);
            computeChangesRecursive(
                changesInBatch,
                childNode,
                loading,
                remote,
                valueAtPath,
                [],
                [],
                valueAtPath,
                prevAtPath,
                immediate,
                0,
                whenOptimizedOnlyIf,
            );
        }
    }
    // If not root notify up through parents
    if (node.parent) {
        const parent = node.parent;
        if (parent) {
            const parentValue = getNodeValue(parent);
            computeChangesRecursive(
                changesInBatch,
                parent,
                loading,
                remote,
                parentValue,
                [node.key].concat(path),
                [getPathType(value)].concat(pathTypes),
                valueAtPath,
                prevAtPath,
                immediate,
                level + 1,
                whenOptimizedOnlyIf,
            );
        }
    }
}

function batchNotifyChanges(changesInBatch: Map<NodeInfo, ChangeInBatch>, immediate: boolean) {
    const listenersNotified = new Set<ListenerFn>();
    // For each change in the batch, notify all of the listeners
    changesInBatch.forEach(({ changes, level, value, isFromPersist, isFromSync, whenOptimizedOnlyIf }, node) => {
        const listeners = immediate ? node.listenersImmediate : node.listeners;
        if (listeners) {
            let listenerParams: ListenerParams | undefined;
            // Need to convert to an array here instead of using a for...of loop because listeners can change while iterating
            const arr = Array.from(listeners);
            for (let i = 0; i < arr.length; i++) {
                const listenerFn = arr[i];
                const { track, noArgs, listener } = listenerFn;
                if (!listenersNotified.has(listener)) {
                    const ok =
                        track === true ? level <= 0 : track === optimized ? whenOptimizedOnlyIf && level <= 0 : true;

                    // Notify if listener is not shallow or if this is the first level
                    if (ok) {
                        // Create listenerParams if not already created
                        if (!noArgs && !listenerParams) {
                            listenerParams = {
                                value,
                                isFromPersist,
                                isFromSync,
                                getPrevious: createPreviousHandler(value, changes),
                                changes,
                            };
                        }

                        if (!track) {
                            listenersNotified.add(listener);
                        }

                        listener(listenerParams!);
                    }
                }
            }
        }
    });
}

export function runBatch() {
    const dirtyNodes = Array.from(globalState.dirtyNodes);
    globalState.dirtyNodes.clear();
    dirtyNodes.forEach((node) => {
        const dirtyFn = node.dirtyFn;
        if (dirtyFn) {
            node.dirtyFn = undefined;
            dirtyFn();
        }
    });
    // Save batch locally and reset _batchMap first because a new batch could begin while looping over callbacks.
    // This can happen with computeds for example.
    const map = _batchMap;
    _batchMap = new Map();
    const changesInBatch = new Map<NodeInfo, ChangeInBatch>();
    // First compute all of the changes at each node. It's important to do this first before
    // running all the notifications because createPreviousHandler depends on knowing
    // all of the changes happening at the node.
    map.forEach(({ value, prev, level, isFromPersist, isFromSync, whenOptimizedOnlyIf }, node) => {
        computeChangesRecursive(
            changesInBatch,
            node,
            isFromPersist,
            isFromSync,
            value,
            [],
            [],
            value,
            prev,
            false,
            level,
            whenOptimizedOnlyIf,
        );
    });

    // Once all changes are computed, notify all listeners for each node with the computed changes.
    if (changesInBatch.size) {
        batchNotifyChanges(changesInBatch, false);
    }
}

export function batch(fn: () => void) {
    beginBatch();
    try {
        fn();
    } finally {
        endBatch();
    }
}
export function beginBatch() {
    numInBatch++;
    if (!timeout) {
        timeout = setTimeout(onActionTimeout, 0);
    }
}
export function endBatch(force?: boolean) {
    numInBatch--;

    if (numInBatch <= 0 || force) {
        if (isRunningBatch) {
            // Don't want to run multiple endBatches recursively, so just note that an endBatch
            // was delayed so that the top level endBatch will run endBatch again after it's done.
            didDelayEndBatch = true;
        } else {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }
            numInBatch = 0;

            isRunningBatch = true;

            runBatch();

            isRunningBatch = false;

            // If an endBatch was delayed run it now
            if (didDelayEndBatch) {
                didDelayEndBatch = false;
                endBatch(true);
            }
        }
    }
}

function getNodeAtPath(obj: NodeInfo, path: string[]): NodeInfo {
    let o: NodeInfo = obj;
    for (let i = 0; i < path.length; i++) {
        const p = path[i];
        o = getChildNode(o, p);
    }

    return o;
}



================================================
FILE: src/computed.ts
================================================
import { linked } from './linked';
import { observable } from './observable';
import type { LinkedOptions } from './observableInterfaces';
import { Observable, ObservableParam, RecursiveValueOrFunction } from './observableTypes';

export function computed<T>(get: () => RecursiveValueOrFunction<T>): Observable<T>;
export function computed<T, T2 = T>(
    get: (() => RecursiveValueOrFunction<T>) | RecursiveValueOrFunction<T>,
    set: (value: T2) => void,
): Observable<T>;
export function computed<T, T2 = T>(
    get: (() => T | Promise<T>) | ObservableParam<T> | LinkedOptions<T>,
    set?: (value: T2) => void,
): Observable<T> {
    return observable(
        set ? linked({ get: get as LinkedOptions['get'], set: ({ value }: any) => set(value) }) : get,
    ) as any;
}



================================================
FILE: src/createObservable.ts
================================================
import { isObservable, setNodeValue } from './globals';
import { isActualPrimitive, isFunction, isPromise } from './is';
import type { ClassConstructor, NodeInfo, ObservableRoot } from './observableInterfaces';
import { Observable, ObservablePrimitive } from './observableTypes';

export function createObservable<T>(
    value: T | undefined,
    makePrimitive: boolean,
    extractPromise: Function,
    createObject: Function,
    createPrimitive?: Function,
): Observable<T> {
    if (isObservable(value)) {
        return value as Observable<T>;
    }
    const valueIsPromise = isPromise<T>(value);
    const valueIsFunction = isFunction(value);

    const root: ObservableRoot = {
        _: value,
    };

    let node: NodeInfo = {
        root,
        lazy: true,
        numListenersRecursive: 0,
    };

    if (valueIsFunction) {
        node = Object.assign(() => {}, node);
        node.lazyFn = value;
    }

    const prim = makePrimitive || isActualPrimitive(value);

    const obs = prim
        ? (new (createPrimitive as ClassConstructor<T>)(node) as ObservablePrimitive<T>)
        : (createObject(node) as Observable<T>);

    if (valueIsPromise) {
        setNodeValue(node, undefined);
        extractPromise(node, value);
    }

    return obs as any;
}



================================================
FILE: src/event.ts
================================================
import { getNode, symbolGetNode } from './globals';
import { observable } from './observable';
import type { ObservableEvent } from './observableInterfaces';

export function event(): ObservableEvent {
    // event simply wraps around a number observable
    // which increments its value to dispatch change events
    const obs = observable(0);
    const node = getNode(obs);
    node.isEvent = true;

    return {
        fire: function () {
            // Notify increments the value so that the observable changes
            obs.set((v) => v + 1);
        },
        on: function (cb: () => void) {
            return obs.onChange(cb);
        },
        get: function () {
            // Return the value so that when will be truthy
            return obs.get();
        },
        // @ts-expect-error eslint doesn't like adding symbols to the object but this does work
        [symbolGetNode]: node,
    };
}



================================================
FILE: src/globals.ts
================================================
import { isArray, isChildNode, isDate, isFunction, isMap, isObject, isSet } from './is';
import type { NodeInfo, ObservableEvent, TypeAtPath, UpdateFn } from './observableInterfaces';
import type { Observable, ObservableParam } from './observableTypes';

type GlobalState = {
    isLoadingLocal: boolean;
    isLoadingRemote: boolean;
    activateSyncedNode: (node: NodeInfo, newValue: any) => { update: UpdateFn; value: any };
    pendingNodes: Map<NodeInfo, () => void>;
    dirtyNodes: Set<NodeInfo>;
    replacer: ((this: any, key: string, value: any) => any) | undefined;
    reviver: ((this: any, key: string, value: any) => any) | undefined;
};

export const symbolToPrimitive = Symbol.toPrimitive;
export const symbolIterator = Symbol.iterator;
export const symbolGetNode = Symbol('getNode');
export const symbolDelete = /* @__PURE__ */ Symbol('delete');
export const symbolOpaque = Symbol('opaque');
export const symbolPlain = Symbol('plain');
export const optimized = Symbol('optimized');
export const symbolLinked = Symbol('linked');

export const globalState: GlobalState = {
    pendingNodes: new Map<NodeInfo, () => void>(),
    dirtyNodes: new Set<NodeInfo>(),
} as GlobalState;

export function isHintOpaque(value: any) {
    // React elements have $$typeof and should be treated as opaque
    return value && (value[symbolOpaque] || value['$$typeof']);
}
export function isHintPlain(value: any) {
    return value && value[symbolPlain];
}

export function getPathType(value: any): TypeAtPath {
    return isArray(value) ? 'array' : isMap(value) ? 'map' : value instanceof Set ? 'set' : 'object';
}

function replacer(key: string, value: any) {
    if (isMap(value)) {
        return {
            __LSType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else if (value instanceof Set) {
        return {
            __LSType: 'Set',
            value: Array.from(value), // or with spread: value: [...value]
        };
    } else if (globalState.replacer) {
        value = globalState.replacer(key, value);
    }
    return value;
}

const ISO8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
function reviver(key: string, value: any) {
    if (value) {
        if (typeof value === 'string' && ISO8601.test(value)) {
            return new Date(value);
        }
        if (typeof value === 'object') {
            if (value.__LSType === 'Map') {
                return new Map(value.value);
            } else if (value.__LSType === 'Set') {
                return new Set(value.value);
            }
        }
        if (globalState.reviver) {
            value = globalState.reviver(key, value);
        }
    }
    return value;
}

export function safeStringify(value: any) {
    return value ? JSON.stringify(value, replacer) : value;
}
export function safeParse(value: any) {
    return value ? JSON.parse(value, reviver) : value;
}
export function clone<T>(value: T) {
    return safeParse(safeStringify(value));
}

export function isObservable(value$: any): value$ is Observable {
    return !!value$ && !!value$[symbolGetNode as any];
}

export function getNode(value$: ObservableParam): NodeInfo {
    return value$ && (value$ as any)[symbolGetNode];
}

export function isEvent(value$: any): value$ is ObservableEvent {
    return value$ && (value$[symbolGetNode as any] as NodeInfo)?.isEvent;
}

export function setNodeValue(node: NodeInfo, newValue: any) {
    const parentNode = node.parent ?? node;
    const key = node.parent ? node.key : '_';

    const isDelete = newValue === symbolDelete;
    if (isDelete) newValue = undefined;

    // Get the value of the parent
    const parentValue = node.parent ? ensureNodeValue(parentNode) : parentNode.root;

    const useSetFn = isSet(parentValue);
    const useMapFn = isMap(parentValue);

    // Save the previous value first
    const prevValue = useSetFn ? key : useMapFn ? parentValue.get(key) : parentValue[key];

    const isFunc = isFunction(newValue);

    // Compute newValue if newValue is a function or an observable
    newValue = !parentNode.isAssigning && isFunc && !isFunction(prevValue) ? newValue(prevValue) : newValue;

    if (newValue !== prevValue) {
        try {
            parentNode.isSetting = (parentNode.isSetting || 0) + 1;

            // Save the new value
            if (isDelete) {
                if (useMapFn || useSetFn) {
                    parentValue.delete(key);
                } else {
                    delete parentValue[key];
                }
            } else {
                if (useSetFn) {
                    parentValue.add(newValue);
                } else if (useMapFn) {
                    parentValue.set(key, newValue);
                } else {
                    parentValue[key] = newValue;
                }
            }
        } finally {
            parentNode.isSetting!--;
        }
    }

    return { prevValue, newValue, parentValue };
}

const arrNodeKeys: string[] = [];
export function getNodeValue(node: NodeInfo): any {
    let count = 0;
    let n: NodeInfo = node;
    while (isChildNode(n)) {
        arrNodeKeys[count++] = n.key;
        n = n.parent;
    }
    let child = node.root._;
    for (let i = count - 1; child && i >= 0; i--) {
        const key = arrNodeKeys[i] as any;
        child = key !== 'size' && (isMap(child) || child instanceof WeakMap) ? child.get(key) : child[key];
    }
    return child;
}

export function getChildNode(node: NodeInfo, key: string, asFunction?: Function): NodeInfo {
    // Get the child by key
    let child = node.children?.get(key);

    // Create the child node if it doesn't already exist
    if (!child) {
        child = {
            root: node.root,
            parent: node,
            key,
            lazy: true,
            numListenersRecursive: 0,
        };
        // Lookup functions are bound with the child key
        if (node.lazyFn?.length === 1) {
            asFunction = node.lazyFn.bind(node, key);
        }
        if (isFunction(asFunction)) {
            child = Object.assign(() => {}, child);
            child.lazyFn = asFunction;
        }
        if (!node.children) {
            node.children = new Map();
        }
        node.children.set(key, child);
    }

    return child;
}

export function ensureNodeValue(node: NodeInfo) {
    let value = getNodeValue(node);
    if (!value || isFunction(value)) {
        if (isChildNode(node)) {
            const parent = ensureNodeValue(node.parent);
            value = parent[node.key] = {};
        } else {
            value = node.root._ = {};
        }
    }
    return value;
}

export function findIDKey(obj: unknown | undefined, node: NodeInfo): string | ((value: any) => string) | undefined {
    let idKey: string | ((value: any) => string) | undefined = isObservable(obj)
        ? undefined
        : isObject(obj)
          ? 'id' in obj
              ? 'id'
              : 'key' in obj
                ? 'key'
                : '_id' in obj
                  ? '_id'
                  : '__id' in obj
                    ? '__id'
                    : undefined
          : undefined;

    if (!idKey && node.parent) {
        const k = node.key + '_keyExtractor';
        const keyExtractor =
            (node.functions?.get(k) as (value: any) => string) ??
            (getNodeValue(node.parent)[node.key + '_keyExtractor'] as (value: any) => string);
        if (keyExtractor && isFunction(keyExtractor)) {
            idKey = keyExtractor;
        }
    }

    return idKey;
}

export function extractFunction(node: NodeInfo, key: string, fnOrComputed: Function): void;
export function extractFunction(node: NodeInfo, key: string, fnOrComputed: Observable): void;
export function extractFunction(node: NodeInfo, key: string, fnOrComputed: Function | Observable): void {
    if (!node.functions) {
        node.functions = new Map();
    }

    node.functions.set(key, fnOrComputed);
}
export function equals(a: unknown, b: unknown) {
    return a === b || (isDate(a) && isDate(b) && +a === +b);
}
export function getKeys(
    obj: Record<any, any> | Array<any> | undefined,
    isArr: boolean,
    isMap: boolean,
    isSet: boolean,
): string[] {
    return isArr
        ? (undefined as any)
        : obj
          ? isSet
              ? Array.from(obj as Set<any>)
              : isMap
                ? Array.from(obj.keys())
                : Object.keys(obj)
          : [];
}



================================================
FILE: src/helpers.ts
================================================
import { beginBatch, endBatch } from './batching';
import { getNode, isObservable, setNodeValue, symbolDelete, symbolOpaque } from './globals';
import {
    hasOwnProperty,
    isArray,
    isEmpty,
    isFunction,
    isMap,
    isNumber,
    isObject,
    isPlainObject,
    isPrimitive,
    isSet,
} from './is';
import type { Change, GetOptions, ObserveEvent, OpaqueObject, Selector, TypeAtPath } from './observableInterfaces';
import type { ObservableParam } from './observableTypes';

export function computeSelector<T>(
    selector: Selector<T>,
    getOptions?: GetOptions,
    e?: ObserveEvent<T>,
    retainObservable?: boolean,
): T {
    let c = selector as any;
    if (!isObservable(c) && isFunction(c)) {
        c = e ? c(e) : c();
    }

    return isObservable(c) && !retainObservable ? c.get(getOptions) : c;
}

export function getObservableIndex(value$: ObservableParam): number {
    const node = getNode(value$);
    const n = +node.key! as number;
    return isNumber(n) ? n : -1;
}

export function opaqueObject<T extends object>(value: T): OpaqueObject<T> {
    if (process.env.NODE_ENV === 'development') {
        console.warn('[legend-state]: In version 3.0 opaqueObject is moved to ObservableHint.opaque');
    }
    if (value) {
        (value as OpaqueObject<T>)[symbolOpaque] = true;
    }
    return value as OpaqueObject<T>;
}

const getValueAtPathReducer = (o: any, p: any) => o && o[p];
export function getValueAtPath(obj: Record<string, any>, path: string[]): any {
    return path.reduce(getValueAtPathReducer, obj);
}

export function setAtPath<T extends object>(
    obj: T,
    path: string[],
    pathTypes: TypeAtPath[],
    value: any,
    mode?: 'set' | 'merge',
    fullObj?: T,
    restore?: (path: string[], value: any) => void,
) {
    let p: string | undefined = undefined;
    let o: Record<string, any> = obj;
    if (path.length > 0) {
        let oFull: Record<string, any> | undefined = fullObj;
        for (let i = 0; i < path.length; i++) {
            p = path[i];
            const map = isMap(o);
            let child = o ? (map ? o.get(p) : o[p]) : undefined;
            const fullChild = oFull ? (map ? oFull.get(p) : oFull[p]) : undefined;
            if (child === symbolDelete) {
                // If this was previously deleted, restore it
                if (oFull) {
                    if (map) {
                        o.set(p, fullChild);
                    } else {
                        o[p] = fullChild;
                    }
                    restore?.(path.slice(0, i + 1), fullChild);
                }
                return obj;
            } else if (child === undefined && value === undefined && i === path.length - 1) {
                // If setting undefined and the key is undefined, no need to initialize or set it
                return obj;
            } else if (i < path.length - 1 && (child === undefined || child === null)) {
                child = initializePathType(pathTypes[i]);
                if (isMap(o)) {
                    o.set(p, child);
                } else {
                    o[p] = child;
                }
            }
            if (i < path.length - 1) {
                o = child;
                if (oFull) {
                    oFull = fullChild;
                }
            }
        }
    }

    // Don't set if the value is the same. This prevents creating a new key
    // when setting undefined on an object without this key
    if (p === undefined) {
        if (mode === 'merge') {
            obj = deepMerge(obj, value);
        } else {
            obj = value;
        }
    } else {
        if (mode === 'merge') {
            o[p] = deepMerge(o[p], value);
        } else if (isMap(o)) {
            o.set(p, value);
        } else {
            o[p] = value;
        }
    }

    return obj;
}
export function mergeIntoObservable<T extends ObservableParam<any>>(target: T, ...sources: any[]): T {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        if (!isObservable(target)) {
            console.error('[legend-state] should only use mergeIntoObservable with observables');
        }
    }
    beginBatch();
    for (let i = 0; i < sources.length; i++) {
        _mergeIntoObservable(target, sources[i], 0);
    }
    endBatch();
    return target;
}
function _mergeIntoObservable<T extends ObservableParam<Record<string, any>>>(
    target: T,
    source: any,
    levelsDeep: number,
): T {
    if (isObservable(source)) {
        source = source.peek();
    }
    const targetValue = target.peek();

    const isTargetArr = isArray(targetValue);
    const isTargetObj = !isTargetArr && isObject(targetValue);

    const isSourceMap = isMap(source);
    const isSourceSet = isSet(source);

    if (isSourceSet && isSet(targetValue)) {
        target.set(new Set([...source, ...targetValue]));
    } else if ((isTargetObj && isObject(source)) || (isTargetArr && targetValue.length > 0)) {
        const keys: string[] = isSourceMap || isSourceSet ? Array.from(source.keys()) : Object.keys(source);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const sourceValue = isSourceSet
                ? key
                : isSourceMap
                  ? (source as Map<any, any>).get(key)
                  : (source as Record<string, any>)[key];
            if (sourceValue === symbolDelete) {
                (target as any)[key].delete();
            } else {
                const isObj = isObject(sourceValue);
                const isArr = !isObj && isArray(sourceValue);
                const targetChild = (target as Record<string, any>)[key];

                if ((isObj || isArr) && targetChild) {
                    if (levelsDeep > 0 && isEmpty(sourceValue)) {
                        targetChild.set(sourceValue);
                    }
                    _mergeIntoObservable(targetChild, sourceValue, levelsDeep + 1);
                } else {
                    targetChild.set(sourceValue);
                }
            }
        }
    } else if (source !== undefined) {
        target.set(source);
    }

    return target;
}
export function constructObjectWithPath(path: string[], pathTypes: TypeAtPath[], value: any): object {
    let out;
    if (path.length > 0) {
        let o: Record<string, any> = (out = {});
        for (let i = 0; i < path.length; i++) {
            const p = path[i];
            o[p] = i === path.length - 1 ? value : initializePathType(pathTypes[i]);
            o = o[p];
        }
    } else {
        out = value;
    }

    return out;
}
export function deconstructObjectWithPath(path: string[], pathTypes: TypeAtPath[], value: any): object {
    let o = value;
    for (let i = 0; i < path.length; i++) {
        const p = path[i];
        o = o ? o[p] : initializePathType(pathTypes[i]);
    }

    return o;
}
export function isObservableValueReady(value: any) {
    return !!value && ((!isObject(value) && !isArray(value)) || !isEmpty(value));
}

export function setSilently(value$: ObservableParam, newValue: any) {
    const node = getNode(value$);
    return setNodeValue(node, newValue).newValue;
}

export function initializePathType(pathType: TypeAtPath): any {
    switch (pathType) {
        case 'array':
            return [];
        case 'map':
            return new Map();
        case 'set':
            return new Set();
        case 'object':
        default:
            return {};
    }
}
export function applyChange<T extends object>(value: T, change: Change, applyPrevious?: boolean): T {
    const { path, valueAtPath, prevAtPath, pathTypes } = change;
    return setAtPath(value, path as string[], pathTypes, applyPrevious ? prevAtPath : valueAtPath);
}
export function applyChanges<T extends object>(value: T, changes: Change[], applyPrevious?: boolean): T {
    for (let i = 0; i < changes.length; i++) {
        value = applyChange(value, changes[i], applyPrevious);
    }
    return value;
}
export function deepMerge<T>(target: T, ...sources: any[]): T {
    if (isPrimitive(target)) {
        return sources[sources.length - 1];
    }

    let result: T = (isArray(target) ? [...target] : { ...target }) as T;

    for (let i = 0; i < sources.length; i++) {
        const obj2 = sources[i];
        if (isPlainObject(obj2) || isArray(obj2)) {
            const objTarget = obj2 as Record<string, any>;
            for (const key in objTarget) {
                if (hasOwnProperty.call(objTarget, key)) {
                    if (
                        objTarget[key] instanceof Object &&
                        !isObservable(objTarget[key]) &&
                        Object.keys(objTarget[key]).length > 0
                    ) {
                        (result as any)[key] = deepMerge(
                            (result as any)[key] || (isArray((objTarget as any)[key]) ? [] : {}),
                            (objTarget as any)[key],
                        );
                    } else {
                        (result as any)[key] = objTarget[key];
                    }
                }
            }
        } else {
            result = obj2;
        }
    }

    return result;
}



================================================
FILE: src/is.ts
================================================
import type { ChildNodeInfo, NodeInfo } from './observableInterfaces';

export const hasOwnProperty = Object.prototype.hasOwnProperty;

export function isArray(obj: unknown): obj is Array<any> {
    return Array.isArray(obj);
}
export function isString(obj: unknown): obj is string {
    return typeof obj === 'string';
}
export function isObject(obj: unknown): obj is Record<any, any> {
    return !!obj && typeof obj === 'object' && !(obj instanceof Date) && !isArray(obj);
}
export function isPlainObject(obj: unknown): obj is Record<any, any> {
    return isObject(obj) && obj.constructor === Object;
}
export function isFunction(obj: unknown): obj is Function {
    return typeof obj === 'function';
}
export function isPrimitive(arg: unknown): arg is string | number | bigint | boolean | symbol {
    const type = typeof arg;
    return arg !== undefined && (isDate(arg) || (type !== 'object' && type !== 'function'));
}
export function isDate(obj: unknown): obj is Date {
    return obj instanceof Date;
}
export function isSymbol(obj: unknown): obj is symbol {
    return typeof obj === 'symbol';
}
export function isBoolean(obj: unknown): obj is boolean {
    return typeof obj === 'boolean';
}
export function isPromise<T>(obj: unknown): obj is Promise<T> {
    return obj instanceof Promise;
}
export function isMap(obj: unknown): obj is Map<any, any> {
    return obj instanceof Map || obj instanceof WeakMap;
}
export function isSet(obj: unknown): obj is Set<any> {
    return obj instanceof Set || obj instanceof WeakSet;
}
export function isNumber(obj: unknown): obj is number {
    const n = obj as number;
    return typeof n === 'number' && n - n < 1;
}
export function isEmpty(obj: object): boolean {
    // Looping and returning false on the first property is faster than Object.keys(obj).length === 0
    // https://jsbench.me/qfkqv692c8
    if (!obj) return false;
    if (isArray(obj)) return obj.length === 0;
    if (isMap(obj) || isSet(obj)) return obj.size === 0;
    for (const key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
export function isNullOrUndefined(value: any): value is undefined | null {
    return value === undefined || value === null;
}
const setPrimitives = new Set(['boolean', 'string', 'number']);
/** @internal */
export function isActualPrimitive(arg: unknown): arg is boolean | string | number {
    return setPrimitives.has(typeof arg);
}
/** @internal */
export function isChildNode(node: NodeInfo): node is ChildNodeInfo {
    return !!node.parent;
}



================================================
FILE: src/linked.ts
================================================
import { symbolLinked } from './globals';
import { isFunction } from './is';
import type { Linked, LinkedOptions } from './observableInterfaces';

export function linked<T>(params: LinkedOptions<T> | (() => T), options?: LinkedOptions<T>): Linked<T> {
    if (isFunction(params)) {
        params = { get: params };
    }
    if (options) {
        params = { ...params, ...options };
    }
    const ret = function () {
        return { [symbolLinked]: params };
    };
    ret.prototype[symbolLinked] = params;
    return ret as Linked<T>;
}



================================================
FILE: src/middleware.ts
================================================
import type { NodeInfo, NodeListener } from './observableInterfaces';

// Types for middleware events and handlers
export type MiddlewareEventType = 'listener-added' | 'listener-removed' | 'listeners-cleared';

export interface MiddlewareEvent {
    type: MiddlewareEventType;
    node: NodeInfo;
    listener?: NodeListener; // Optional because listeners-cleared event doesn't have a specific listener
    timestamp: number;
}

// Generic middleware handler that can handle specific event types
export type MiddlewareHandler = (event: MiddlewareEvent) => void;

// Store middleware handlers in a WeakMap keyed by node
const nodeMiddlewareHandlers = new WeakMap<NodeInfo, Map<MiddlewareEventType, Set<MiddlewareHandler>>>();

// Queued events - use arrays instead of Sets for better performance in this case
const queuedNodes: NodeInfo[] = [];
const queuedListeners: (NodeListener | undefined)[] = [];
const queuedTypes: MiddlewareEventType[] = [];
let queueSize = 0;
let isMicrotaskScheduled = false;

/**
 * Register a middleware handler for a specific node and event type
 * @param node The node to register the middleware handler for
 * @param type The event type to handle
 * @param handler The middleware handler function
 * @returns A function to remove the handler
 */
export function registerMiddleware(node: NodeInfo, type: MiddlewareEventType, handler: MiddlewareHandler): () => void {
    // Get or create handlers map for this node
    let handlersMap = nodeMiddlewareHandlers.get(node);
    if (!handlersMap) {
        handlersMap = new Map();
        nodeMiddlewareHandlers.set(node, handlersMap);
    }

    // Get or create handlers set for this event type
    let handlers = handlersMap.get(type);
    if (!handlers) {
        handlers = new Set();
        handlersMap.set(type, handlers);
    }

    // Add handler to the set
    handlers.add(handler);

    // Return a function to remove the handler
    return () => {
        const handlersMap = nodeMiddlewareHandlers.get(node);
        if (!handlersMap) return;

        const handlers = handlersMap.get(type);
        if (!handlers) return;

        handlers.delete(handler);

        // Cleanup empty sets and maps
        if (handlers.size === 0) {
            handlersMap.delete(type);
            if (handlersMap.size === 0) {
                nodeMiddlewareHandlers.delete(node);
            }
        }
    };
}

/**
 * Queue a middleware event for a specific node to be processed in a microtask
 * @param node The node to queue the event for
 * @param listener The listener that was added or removed (optional for listeners-cleared)
 * @param type The type of event
 */
export function dispatchMiddlewareEvent(
    node: NodeInfo,
    listener: NodeListener | undefined,
    type: MiddlewareEventType,
): void {
    // Fast path: Skip if there are no handlers for this node or event type
    const handlersMap = nodeMiddlewareHandlers.get(node);
    if (!handlersMap || !handlersMap.has(type)) {
        return;
    }

    // Check if handlers exist (avoid empty sets)
    const handlers = handlersMap.get(type);
    if (!handlers || handlers.size === 0) {
        return;
    }

    // Queue the event in parallel arrays for better performance
    queuedNodes[queueSize] = node;
    queuedListeners[queueSize] = listener;
    queuedTypes[queueSize] = type;
    queueSize++;

    // Schedule microtask if not already scheduled
    if (!isMicrotaskScheduled) {
        isMicrotaskScheduled = true;
        queueMicrotask(processQueuedEvents);
    }
}

// Reusable event object to avoid allocation during processing
const eventObj: MiddlewareEvent = {
    type: 'listener-added',
    node: null as any,
    listener: undefined,
    timestamp: 0,
};

/**
 * Process all queued middleware events in a microtask
 * Using a single function for validation and processing improves performance
 */
function processQueuedEvents(): void {
    isMicrotaskScheduled = false;

    // Use performance.now() if available for more precise timing
    const timestamp = typeof performance !== 'undefined' ? performance.now() : Date.now();
    eventObj.timestamp = timestamp;

    // Process each queued event
    for (let i = 0; i < queueSize; i++) {
        const node = queuedNodes[i];
        const listener = queuedListeners[i];
        const type = queuedTypes[i];

        // Fast check for handlers without re-fetching from WeakMap if possible
        const handlersMap = nodeMiddlewareHandlers.get(node);
        if (!handlersMap) continue;

        const handlers = handlersMap.get(type);
        if (!handlers || handlers.size === 0) continue;

        // Get node's listener sets - avoid creating empty sets
        const nodeListeners = node.listeners;
        const nodeListenersImmediate = node.listenersImmediate;

        if (!nodeListeners && !nodeListenersImmediate) {
            continue;
        }

        // Validate event based on type (optimized validation logic)
        let isValid = false;

        // Use cached string constants for faster comparison
        if (type === 'listener-added') {
            isValid = !!nodeListeners?.has(listener!) || !!nodeListenersImmediate?.has(listener!);
        } else if (type === 'listener-removed') {
            isValid = !nodeListeners?.has(listener!) && !nodeListenersImmediate?.has(listener!);
        } else {
            // type === 'listener-cleared'
            isValid = !nodeListeners?.size && !nodeListenersImmediate?.size;
        }

        // Only dispatch if the event is valid
        if (isValid) {
            // Update properties of the reused event object
            eventObj.type = type;
            eventObj.node = node;
            eventObj.listener = listener;

            // Iterator optimization for Sets
            const iterableHandlers = Array.from(handlers);
            for (let j = 0; j < iterableHandlers.length; j++) {
                try {
                    iterableHandlers[j](eventObj);
                } catch (error) {
                    console.error(`Error in middleware handler for ${type}:`, error);
                }
            }
        }
    }

    // Clear the queue by resetting size rather than reallocating arrays
    queueSize = 0;
}



================================================
FILE: src/observable.ts
================================================
import { extractPromise, getProxy } from './ObservableObject';
import { ObservablePrimitiveClass } from './ObservablePrimitive';
import { createObservable } from './createObservable';
import type { Observable, ObservablePrimitive, RecursiveValueOrFunction } from './observableTypes';

export function observable<T>(): Observable<T | undefined>;
export function observable<T>(
    value: Promise<RecursiveValueOrFunction<T>> | (() => RecursiveValueOrFunction<T>) | RecursiveValueOrFunction<T>,
): Observable<T>;
export function observable<T>(value: T): Observable<T>;
export function observable<T>(value?: T): Observable<any> {
    return createObservable(value, false, extractPromise, getProxy, ObservablePrimitiveClass) as any;
}

export function observablePrimitive<T>(value: Promise<T>): ObservablePrimitive<T>;
export function observablePrimitive<T>(value?: T): ObservablePrimitive<T>;
export function observablePrimitive<T>(value?: T | Promise<T>): ObservablePrimitive<T> {
    return createObservable(value, true, extractPromise, getProxy, ObservablePrimitiveClass) as any;
}



================================================
FILE: src/ObservableHint.ts
================================================
import { symbolOpaque, symbolPlain } from './globals';
import type { OpaqueObject, PlainObject } from './observableInterfaces';

function addSymbol<T>(value: object, symbol: symbol) {
    if (value) {
        Object.defineProperty(value, symbol, {
            value: true,
            enumerable: false,
            writable: true,
            configurable: true,
        });
    }
    return value as T;
}

export const ObservableHint = {
    opaque: function opaqueObject<T extends object>(value: T): OpaqueObject<T> {
        return addSymbol(value, symbolOpaque);
    },
    plain: function plainObject<T extends object>(value: T): PlainObject<T> {
        return addSymbol(value, symbolPlain);
    },
    function: function plainObject<T extends object>(value: T): PlainObject<T> {
        return addSymbol(value, symbolPlain);
    },
};



================================================
FILE: src/observableInterfaces.ts
================================================
import type { symbolOpaque, symbolPlain } from './globals';
import type { Observable, ObservableParam } from './observableTypes';

export type TrackingType = undefined | true | symbol; // true === shallow

export interface GetOptions {
    shallow?: boolean;
}

export type OpaqueObject<T> = T & { [symbolOpaque]: true };
export type PlainObject<T> = T & { [symbolPlain]: true };

export interface ListenerParams<T = any> {
    value: T;
    getPrevious: () => T;
    changes: Change[];
    isFromSync: boolean;
    isFromPersist: boolean;
}

export type ListenerFn<T = any> = (params: ListenerParams<T>) => void;

export interface ObservableEvent {
    fire(): void;
    on(cb?: () => void): ObservableListenerDispose;
    get(): void;
}

export type TypeAtPath = 'object' | 'array' | 'map' | 'set';

export interface Change {
    path: string[];
    pathTypes: TypeAtPath[];
    valueAtPath: any;
    prevAtPath: any;
}

export type RecordValue<T> = T extends Record<string, infer t> ? t : never;
export type ArrayValue<T> = T extends Array<infer t> ? t : never;
export type ObservableValue<T> = T extends Observable<infer t> ? t : never;

export type Selector<T> = ObservableParam<T> | ObservableEvent | (() => ObservableParam<T>) | (() => T) | T;

export type ClassConstructor<I, Args extends any[] = any[]> = new (...args: Args) => I;
export type ObservableListenerDispose = () => void;

export interface ObservableRoot {
    // Observable root value is set on a child of the object so the reference to the root never changes
    _: any;
    set?: (value: any) => void;
    isLoadingLocal?: boolean;
}

export type Primitive = boolean | string | number | Date;
export type NotPrimitive<T> = T extends Primitive ? never : T;

export interface NodeListener {
    track: TrackingType;
    noArgs?: boolean;
    listener: ListenerFn;
}
export interface TrackingState {
    nodes?: Map<NodeInfo, TrackingNode>;
    traceListeners?: (nodes: Map<NodeInfo, TrackingNode>) => void;
    traceUpdates?: (fn: Function) => Function;
}

interface BaseNodeInfo {
    children?: Map<string, ChildNodeInfo>;
    proxy?: object;
    root: ObservableRoot;
    listeners?: Set<NodeListener>;
    listenersImmediate?: Set<NodeListener>;
    isEvent?: boolean;
    linkedToNode?: NodeInfo;
    linkedToNodeDispose?: () => void;
    activatedObserveDispose?: () => void;
    linkedFromNodes?: Set<NodeInfo>;
    isSetting?: number;
    isAssigning?: number;
    isComputing?: boolean;
    parentOther?: NodeInfo;
    functions?: Map<string, Function | Observable<any>>;
    lazy?: boolean;
    lazyFn?: Function;
    needsExtract?: boolean;
    numListenersRecursive: number;
    state?: Observable<ObservableSyncState>;
    activated?: boolean;
    isPlain?: boolean;
    recursivelyAutoActivated?: boolean;
    activationState?: LinkedOptions & {
        onError?: () => void;
        onChange: (params: UpdateFnParams) => void | Promise<void>;
    };
    dirtyFn?: () => void;
    dirtyChildren?: Set<NodeInfo>;
    numGets?: number;
    getNumResolved?: number;
}

export interface RootNodeInfo extends BaseNodeInfo {
    parent?: undefined;
    key?: undefined;
}

export interface ChildNodeInfo extends BaseNodeInfo {
    parent: NodeInfo;
    key: string;
}

export type NodeInfo = RootNodeInfo | ChildNodeInfo;

export interface TrackingNode {
    node: NodeInfo;
    track: TrackingType;
    num: number;
}
export interface ObserveEvent<T> {
    num: number;
    previous?: T | undefined;
    cancel?: boolean;
    onCleanup?: () => void;
}
export interface ObserveEventCallback<T> {
    num: number;
    previous?: T | undefined;
    value?: T;
    cancel: boolean;
    nodes: Map<NodeInfo, TrackingNode> | undefined;
    refresh: () => void;
    onCleanup?: () => void;
    onCleanupReaction?: () => void;
}

export type SetParams<T> = ListenerParams<T extends Promise<infer t> ? t : T>;

export type WaitForSet<T> =
    | ((params: WaitForSetFnParams<T>) => any)
    | Promise<any>
    | ObservableParam<any>
    | ObservableEvent
    | ObservableParam<any>[]
    | ObservableEvent[];

export interface LinkedOptions<T = any> {
    get?: () => Promise<T> | T;
    set?: (params: SetParams<T>) => void | Promise<any>;
    waitFor?: Selector<unknown>;
    waitForSet?: WaitForSet<T>;
    initial?: (() => T) | T;
    activate?: 'auto' | 'lazy';
}

export interface WaitForSetFnParams<T = any> {
    value: T;
    changes: Change[];
}

export type GetMode = 'set' | 'assign' | 'merge' | 'append' | 'prepend';
export interface UpdateFnParams<T = any> {
    value: T;
    mode?: GetMode;
    lastSync?: number | undefined;
    changes?: Change[];
}
export interface UpdateSetFnParams<T = any> extends UpdateFnParams<T> {
    lastSync?: never;
}
export type UpdateFn<T = any> = (params: UpdateFnParams<T>) => void;
export type UpdateSetFn<T = any> = (params: UpdateSetFnParams<T>) => void;
export type Linked<T> = T;

export interface ObserveOptions {
    immediate?: boolean; // Ignore batching and run immediately
    /* @internal */
    fromComputed?: boolean;
}
export interface ObservableSyncStateBase {
    isPersistLoaded: boolean;
    isPersistEnabled: boolean;
    isSyncEnabled: boolean;
    lastSync?: number;
    syncCount?: number;
    isGetting?: boolean;
    isSetting?: boolean;
    numPendingGets?: number;
    numPendingSets?: number;
    sync: () => Promise<void>;
    getPendingChanges: () =>
        | Record<
              string,
              {
                  p: any;
                  v?: any;
              }
          >
        | undefined;
    resetPersistence: () => Promise<void>;
    reset: () => Promise<void>;
    /* @internal */
    numPendingLocalLoads?: number;
    numPendingRemoteLoads?: number;
    // TODOV3 Remove
    clearPersist: () => Promise<void>;
}
export interface ObservableState {
    isLoaded: boolean;
    error?: Error;
}
export type ObservableSyncState = ObservableState & ObservableSyncStateBase;
export interface RetryOptions {
    infinite?: boolean;
    times?: number;
    delay?: number;
    backoff?: 'constant' | 'exponential';
    maxDelay?: number;
}



================================================
FILE: src/ObservablePrimitive.ts
================================================
import { set, get, peek, flushPending } from './ObservableObject';
import { symbolGetNode } from './globals';
import { isBoolean } from './is';
import type { NodeInfo, TrackingType } from './observableInterfaces';
import type { ObservablePrimitive, ObservableBoolean } from './observableTypes';
import { onChange } from './onChange';

interface ObservablePrimitiveState {
    _node: NodeInfo;
    toggle: () => void;
}

const fns: (keyof ObservableBoolean)[] = ['get', 'set', 'peek', 'onChange', 'toggle'];

export function ObservablePrimitiveClass<T>(this: ObservablePrimitive<T> & ObservablePrimitiveState, node: NodeInfo) {
    this._node = node;

    // Bind to this
    for (let i = 0; i < fns.length; i++) {
        const key: keyof typeof this = fns[i];
        this[key] = (this[key] as Function).bind(this);
    }
}

// Add observable functions to prototype
function proto(key: string, fn: Function) {
    ObservablePrimitiveClass.prototype[key] = function (...args: any[]) {
        return fn.call(this, this._node, ...args);
    };
}
proto('peek', (node: NodeInfo) => {
    flushPending();
    return peek(node);
});
proto('get', (node: NodeInfo, options?: TrackingType) => {
    flushPending();
    return get(node, options);
});
proto('set', set);
proto('onChange', onChange);

// Getters
Object.defineProperty(ObservablePrimitiveClass.prototype, symbolGetNode, {
    configurable: true,
    get() {
        return this._node;
    },
});

ObservablePrimitiveClass.prototype.toggle = function (): void {
    const value = this.peek();
    if (value === undefined || value === null || isBoolean(value)) {
        this.set(!value);
    } else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        throw new Error('[legend-state] Cannot toggle a non-boolean value');
    }
};
ObservablePrimitiveClass.prototype.delete = function () {
    this.set(undefined);

    return this;
};



================================================
FILE: src/observableTypes.ts
================================================
import type { GetOptions, ListenerFn, TrackingType } from './observableInterfaces';

type Primitive = string | number | boolean | symbol | bigint | undefined | null | Date;
type ArrayOverrideFnNames =
    | 'find'
    | 'findIndex'
    | 'every'
    | 'some'
    | 'filter'
    | 'reduce'
    | 'reduceRight'
    | 'forEach'
    | 'map'
    | 'sort';

type RemoveIndex<T> = {
    [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

type BuiltIns = String | Boolean | Number | Date | Error | RegExp | Array<any> | Function | Promise<any>;

type IsUserDefinedObject<T> =
    // Only objects that are not function or arrays or instances of BuiltIns.
    T extends Function | BuiltIns | any[] ? false : T extends object ? true : false;

export type RemoveObservables<T> =
    T extends ImmutableObservableBase<infer t>
        ? t
        : T extends ImmutableObservableBase<infer t>[]
          ? t[]
          : IsUserDefinedObject<T> extends true
            ? {
                  [K in keyof T]: RemoveObservables<T[K]>;
              }
            : T extends ImmutableObservableBase<infer TObs>
              ? TObs
              : T extends () => infer TRet
                ? RemoveObservables<TRet> & T
                : T extends (key: infer TKey extends string | number) => infer TRet
                  ? Record<TKey, RemoveObservables<TRet>> & T
                  : T;

interface ObservableArray<T, U>
    extends ObservablePrimitive<T>,
        Pick<Array<Observable<U>>, ArrayOverrideFnNames>,
        Omit<RemoveIndex<Array<U>>, ArrayOverrideFnNames> {}

export interface ObservableObjectFns<T> {
    assign(value: Partial<T>): Observable<T>;
}

interface ObservableObjectFunctions<T = Record<string, any>> extends ObservablePrimitive<T>, ObservableObjectFns<T> {}

type MapKey<T extends Map<any, any> | WeakMap<any, any>> = Parameters<T['has']>[0];
type MapValue<T extends Map<any, any> | WeakMap<any, any>> = ReturnType<T['get']>;
export type ObservableMap<T extends Map<any, any> | WeakMap<any, any>> = Omit<T, 'get' | 'size' | 'set'> &
    Omit<ObservablePrimitive<T>, 'get' | 'size'> &
    Record<MapKey<T>, Observable<MapValue<T>>> & {
        get(key: Parameters<T['get']>[0]): Observable<Parameters<T['set']>[1]>;
        get(): T;
        size: number;
        set(key: MapKey<T>, value: MapValue<T>): Observable<T>;
        assign(
            value: Record<MapKey<T>, MapValue<T>> | Map<MapKey<T>, MapValue<T>> | WeakMap<MapKey<T>, MapValue<T>>,
        ): Observable<T>;
    };

type SetValue<T extends Set<any> | WeakSet<any>> = Parameters<T['has']>[0];

type ObservableSet<T extends Set<any> | WeakSet<any>> = Omit<T, 'size' | 'add'> &
    Omit<ObservablePrimitive<T>, 'size'> & { size: number; add: (value: SetValue<T>) => Observable<T> };

export interface ObservableBoolean extends ObservablePrimitive<boolean> {
    toggle(): void;
}

export interface ObservablePrimitive<T> extends ImmutableObservableBase<T>, MutableObservableBase<T> {}
type ObservableAny = Partial<ObservableObjectFns<any>> & ObservablePrimitive<any> & Record<string, any>;

interface ImmutableObservableSimple<T> {
    peek(): T;
    get(trackingType?: any): any;
    onChange(cb: ListenerFn<T>, options?: any): () => void;
}
export interface ImmutableObservableBase<T> extends ImmutableObservableSimple<T> {
    peek(): RemoveObservables<T>;
    peek(): T; // This is just to match the Simple base type
    get(trackingType?: TrackingType | GetOptions): RemoveObservables<T>;
    onChange(
        cb: ListenerFn<T>,
        options?: { trackingType?: TrackingType; initial?: boolean; immediate?: boolean; noArgs?: boolean },
    ): () => void;
}

interface MutableObservableSimple {
    set(value: any): void;
    delete(): void;
}
interface MutableObservableBase<T> extends MutableObservableSimple {
    set(value: (prev: RemoveObservables<T>) => RemoveObservables<T>): void;
    set(value: Observable<RemoveObservables<T>>): void;
    set(value: RecursiveValueOrFunction<T>): void;
    set(value: Promise<RemoveObservables<T>>): void;
    set(value: RemoveObservables<T>): void;
    delete(): void;
}

type UndefinedIf<T, U> = U extends true ? T | undefined : T;

type IsNullable<T> = undefined extends T ? true : null extends T ? true : false;

type NonObservable = Function | Observable;
type NonObservableKeys<T> = {
    [K in keyof T]-?: IsStrictAny<T[K]> extends true
        ? never
        : T[K] extends undefined | null
          ? never
          : NonNullable<T[K]> extends NonObservable
            ? K
            : never;
}[keyof T];
type ObservableProps<T> =
    NonObservableKeys<NonNullable<T>> extends never
        ? T
        : RestoreNullability<T, Omit<NonNullable<T>, NonObservableKeys<NonNullable<T>>>>;

type NonObservableProps<T> = RestoreNullability<
    T,
    NullablePropsIf<Pick<NonNullable<T>, NonObservableKeys<NonNullable<T>>>, IsNullable<T>>
>;
type NullablePropsIf<T, U> = {
    [K in keyof T]: UndefinedIf<T[K], U>;
};

type RestoreNullability<Source, Target> =
    IsNullable<Source> extends true ? Target | Extract<Source, null | undefined> : Target;

type ObservableChildren<T, Nullable = IsNullable<T>> = {
    [K in keyof T]-?: Observable<UndefinedIf<T[K], Nullable>>;
};
type ObservableFunctionChildren<T> = {
    [K in keyof T]-?: T[K] extends Observable
        ? T[K]
        : T[K] extends (key: infer Key extends string | number) => Promise<infer t> | infer t
          ? IsLookupFunction<T[K]> extends true
              ? Observable<Record<Key, t>> & T[K]
              : t extends void
                ? T[K]
                : t extends Observable
                  ? t
                  : Observable<t> & (() => t)
          : T[K] & Observable<T[K]>;
};

type IsStrictAny<T> = 0 extends 1 & T ? true : false;

export type ObservableObject<T> = ObservableObjectFunctions<ObservableProps<T> & NonObservableProps<T>> &
    ObservableChildren<ObservableProps<T>> &
    ObservableFunctionChildren<NonObservableProps<T>>;

type ObservableFunction<T> = T extends () => infer t ? t | (() => t) : T;

// Check if the function type T has one lookup parameter
type IsLookupFunction<T> = T extends (...args: infer P) => any
    ? P extends { length: 1 }
        ? P[0] extends string | ObservablePrimitive<string> | number | ObservablePrimitive<number>
            ? true
            : false
        : false
    : false;

// : [T] extends [(key: infer K extends string) => infer t]
// ? // ?  HasParams<T> extends true ? Observable<Record<K, t>>
type ObservableNode<T, NT = NonNullable<T>> = [NT] extends [never] // means that T is ONLY undefined or null
    ? ObservablePrimitive<T>
    : IsStrictAny<T> extends true
      ? ObservableAny
      : [T] extends [Promise<infer t>]
        ? ObservableNode<t>
        : [T] extends [(key: infer K extends string) => infer t]
          ? [t] extends [ImmutableObservableBase<any>]
              ? IsLookupFunction<T> extends true
                  ? Observable<Record<K, t>>
                  : t
              : IsLookupFunction<T> extends true
                ? Observable<Record<K, t>> & T
                : Observable<ObservableFunction<t>>
          : [NT] extends [ImmutableObservableBase<any>]
            ? NT
            : [NT] extends [Primitive]
              ? [NT] extends [boolean]
                  ? ObservableBoolean
                  : ObservablePrimitive<T>
              : NT extends Map<any, any> | WeakMap<any, any>
                ? ObservableMap<NT>
                : NT extends Set<infer U>
                  ? ObservableSet<Set<UndefinedIf<U, IsNullable<T>>>>
                  : NT extends WeakSet<any>
                    ? ObservableSet<NT> // TODO what to do here with nullable? WeakKey is type object | symbol
                    : NT extends Array<infer U>
                      ? ObservableArray<T, U> & ObservableChildren<T>
                      : ObservableObject<T> & {};

// Note: The {} makes intellisense display observables as Observable instead of all the subtypes
export type Observable<T = any> = ObservableNode<T> & {};

export type ObservableParam<T = any> = ImmutableObservableSimple<T> & MutableObservableSimple;

type FixExpanded<T> = [T] extends [boolean] ? boolean : T;

// Allow input types to have functions in them
type ValueOrFunction<T> = [T] extends [Function]
    ? T
    :
          | T
          | ImmutableObservableBase<FixExpanded<T> | T>
          | Promise<FixExpanded<T> | T>
          | (() => FixExpanded<T> | T | Promise<FixExpanded<T> | T> | ImmutableObservableBase<FixExpanded<T> | T>);

type ValueOrFunctionKeys<T> = {
    [K in keyof T]: RecursiveValueOrFunction<T[K]>;
};

export type RecursiveValueOrFunction<T> = T extends Function
    ? T
    : T extends object
      ?
            | ((key: string) => any)
            | Promise<ValueOrFunctionKeys<T>>
            | ValueOrFunctionKeys<T>
            | ImmutableObservableBase<T>
            | (() => T | Promise<T> | ValueOrFunctionKeys<T> | Promise<ValueOrFunctionKeys<T>> | Observable<T>)
      : ValueOrFunction<T>;



================================================
FILE: src/observe.ts
================================================
import { beginBatch, endBatch } from './batching';
import { isEvent } from './globals';
import { isFunction } from './is';
import type { ObserveEvent, ObserveEventCallback, ObserveOptions, Selector } from './observableInterfaces';
import { trackSelector } from './trackSelector';

export function observe<T>(run: (e: ObserveEvent<T>) => T | void, options?: ObserveOptions): () => void;
export function observe<T>(
    selector: Selector<T> | ((e: ObserveEvent<T>) => any),
    reaction?: (e: ObserveEventCallback<T>) => any,
    options?: ObserveOptions,
): () => void;
export function observe<T>(
    selectorOrRun: Selector<T> | ((e: ObserveEvent<T>) => any),
    reactionOrOptions?: ((e: ObserveEventCallback<T>) => any) | ObserveOptions,
    options?: ObserveOptions,
) {
    let reaction: (e: ObserveEventCallback<T>) => any;
    if (isFunction(reactionOrOptions)) {
        reaction = reactionOrOptions;
    } else {
        options = reactionOrOptions;
    }
    let dispose: (() => void) | undefined;
    let isRunning = false;
    const e: ObserveEventCallback<T> = { num: 0 } as ObserveEventCallback<T>;
    // Wrap it in a function so it doesn't pass all the arguments to run()
    const update = function () {
        if (isRunning) {
            // Prevent observe from triggering itself when it activates a node
            return;
        }

        if (e.onCleanup) {
            e.onCleanup();
            e.onCleanup = undefined;
        }

        isRunning = true;

        // Run in a batch so changes don't happen until we're done tracking here
        beginBatch();

        // Run the function/selector
        delete e.value;

        // Dispose listeners from previous run
        dispose?.();

        const {
            dispose: _dispose,
            value,
            nodes,
        } = trackSelector(selectorOrRun as Selector<T>, update, undefined, e, options);
        dispose = _dispose;

        e.value = value;
        e.nodes = nodes;
        e.refresh = update;

        if (e.onCleanupReaction) {
            e.onCleanupReaction();
            e.onCleanupReaction = undefined;
        }

        endBatch();

        isRunning = false;

        // Call the reaction if there is one and the value changed
        if (
            reaction &&
            (options?.fromComputed ||
                ((e.num > 0 || !isEvent(selectorOrRun as any)) &&
                    (e.previous !== e.value || typeof e.value === 'object')))
        ) {
            reaction(e);
        }

        // Update the previous value
        e.previous = e.value;

        // Increment the counter
        e.num++;
    };

    update();

    // Return function calling dispose because dispose may be changed in update()
    return () => {
        e.onCleanup?.();
        e.onCleanup = undefined;
        e.onCleanupReaction?.();
        e.onCleanupReaction = undefined;
        dispose?.();
    };
}



================================================
FILE: src/onChange.ts
================================================
import { getNodeValue } from './globals';
import { deconstructObjectWithPath } from './helpers';
import { dispatchMiddlewareEvent } from './middleware';
import type { ListenerFn, ListenerParams, NodeInfo, NodeListener, TrackingType } from './observableInterfaces';

export function onChange(
    node: NodeInfo,
    callback: ListenerFn,
    options: { trackingType?: TrackingType; initial?: boolean; immediate?: boolean; noArgs?: boolean } = {},
    fromLinks?: Set<NodeInfo>,
): () => void {
    const { initial, immediate, noArgs } = options;
    const { trackingType } = options;

    let listeners = immediate ? node.listenersImmediate : node.listeners;
    if (!listeners) {
        listeners = new Set();
        if (immediate) {
            node.listenersImmediate = listeners;
        } else {
            node.listeners = listeners;
        }
    }

    const listener: NodeListener = {
        listener: callback,
        track: trackingType,
        noArgs,
    };

    listeners.add(listener);

    if (initial) {
        const value = getNodeValue(node);
        callback({
            value,
            isFromPersist: true,
            isFromSync: false,
            changes: [
                {
                    path: [],
                    pathTypes: [],
                    prevAtPath: value,
                    valueAtPath: value,
                },
            ],
            getPrevious: () => undefined,
        });
    }

    let extraDisposes: (() => void)[];

    function addLinkedNodeListeners(childNode: NodeInfo, cb: ListenerFn = callback, from?: NodeInfo) {
        // Don't add listeners for the same node more than once
        if (!fromLinks?.has(childNode)) {
            fromLinks ||= new Set();
            fromLinks.add(from || node);
            cb ||= callback;
            const childOptions: Parameters<typeof onChange>[2] = {
                trackingType: true,
                ...options,
            };
            // onChange for the linked node
            extraDisposes = [...(extraDisposes || []), onChange(childNode, cb as ListenerFn, childOptions, fromLinks)];
        }
    }

    // Add listeners for linked to nodes
    if (node.linkedToNode) {
        addLinkedNodeListeners(node.linkedToNode);
    }

    // Add listeners for linked from nodes
    node.linkedFromNodes?.forEach((linkedFromNode) => addLinkedNodeListeners(linkedFromNode));

    // Go up through the parents and add listeners for linked from nodes
    node.numListenersRecursive++;
    let parent = node.parent;
    let pathParent: string[] = [node!.key!];

    while (parent) {
        if (parent.linkedFromNodes) {
            for (const linkedFromNode of parent.linkedFromNodes) {
                if (!fromLinks?.has(linkedFromNode)) {
                    const cb = createCb(linkedFromNode, pathParent, callback);
                    addLinkedNodeListeners(linkedFromNode, cb, parent);
                }
            }
        }
        parent.numListenersRecursive++;

        pathParent = [parent!.key!, ...pathParent];
        parent = parent.parent;
    }

    // Queue middleware event for listener added
    dispatchMiddlewareEvent(node, listener, 'listener-added');

    return () => {
        // Remove the listener from the set
        listeners.delete(listener);

        // Clean up linked node listeners
        extraDisposes?.forEach((fn) => fn());

        // Update listener counts up the tree
        let parent = node;
        while (parent) {
            parent.numListenersRecursive--;
            parent = parent.parent!;
        }

        // Queue middleware event for listener removed
        dispatchMiddlewareEvent(node, listener, 'listener-removed');

        // If there are no more listeners in this set, queue the listeners-cleared event
        if (listeners.size === 0) {
            dispatchMiddlewareEvent(node, undefined, 'listeners-cleared');
        }
    };
}

function createCb(linkedFromNode: NodeInfo, path: string[], callback: ListenerFn) {
    // Create a callback for a path that calls it with the current value at the path
    let prevAtPath = deconstructObjectWithPath(path, [], getNodeValue(linkedFromNode));

    return function ({ value: valueA, isFromPersist, isFromSync }: ListenerParams<any>) {
        const valueAtPath = deconstructObjectWithPath(path, [], valueA);
        if (valueAtPath !== prevAtPath) {
            callback({
                value: valueAtPath,
                isFromPersist,
                isFromSync,
                changes: [
                    {
                        path: [],
                        pathTypes: [],
                        prevAtPath,
                        valueAtPath,
                    },
                ],
                getPrevious: () => prevAtPath,
            });
        }
        prevAtPath = valueAtPath;
    };
}



================================================
FILE: src/proxy.ts
================================================
import { linked } from './linked';
import { observable } from './observable';
import { Observable, ObservableParam } from './observableTypes';

// Deprecated. Remove in v4

export function proxy<T, T2 = T>(
    get: (key: string) => T,
    set: (key: string, value: T2) => void,
): Observable<Record<string, T>>;
export function proxy<T extends Record<string, any>>(
    get: <K extends keyof T>(key: K) => ObservableParam<T[K]>,
): Observable<T>;
export function proxy<T>(get: (key: string) => ObservableParam<T>): Observable<Record<string, T>>;
export function proxy<T>(get: (key: string) => T): Observable<Record<string, T>>;
export function proxy<T extends Record<string, any>, T2 = T>(
    get: (key: any) => ObservableParam<any>,
    set?: (key: any, value: T2) => void,
): any {
    return observable((key: string) =>
        set
            ? linked({
                  get: () => get(key),
                  set: ({ value }) => set(key, value as any),
              })
            : get(key),
    );
}



================================================
FILE: src/setupTracking.ts
================================================
import type { ListenerFn, NodeInfo, TrackingNode } from './observableInterfaces';
import { onChange } from './onChange';

export function setupTracking(
    nodes: Map<NodeInfo, TrackingNode> | undefined,
    update: ListenerFn,
    noArgs?: boolean,
    immediate?: boolean,
) {
    let listeners: (() => void)[] | undefined = [];

    // Listen to tracked nodes
    nodes?.forEach((tracked) => {
        const { node, track } = tracked;
        listeners!.push(onChange(node, update, { trackingType: track, immediate, noArgs }));
    });

    return () => {
        if (listeners) {
            for (let i = 0; i < listeners.length; i++) {
                listeners[i]();
            }
            listeners = undefined;
        }
    };
}



================================================
FILE: src/syncState.ts
================================================
import type { ObservableSyncState } from './observableInterfaces';
import { getNode } from './globals';
import { observable } from './observable';
import type { ObservableParam } from './observableTypes';
import { ObservableHint } from './ObservableHint';
import { when } from './when';

export function syncState(obs: ObservableParam) {
    const node = getNode(obs);
    if (!node.state) {
        node.state = observable<ObservableSyncState>(
            ObservableHint.plain({
                isPersistLoaded: false,
                isLoaded: false,
                isPersistEnabled: true,
                isSyncEnabled: true,
                isGetting: false,
                isSetting: false,
                numPendingGets: 0,
                numPendingSets: 0,
                syncCount: 0,
                resetPersistence: undefined as unknown as () => Promise<void>,
                reset: () => Promise.resolve(),
                sync: () => {
                    // sync() may be called before peek/get so check to see if it should activate
                    obs.peek();

                    // If it's now activating, it should return a promise that resolves when it's loaded
                    if (node.state?.isGetting.peek()) {
                        return when(node.state.isLoaded) as any;
                    }

                    return Promise.resolve();
                },
                getPendingChanges: () => ({}),
                // TODOV3 remove
                clearPersist: undefined as unknown as () => Promise<void>,
            }),
        );
    }
    return node.state!;
}



================================================
FILE: src/tracking.ts
================================================
import type { NodeInfo, TrackingState, TrackingType } from './observableInterfaces';

let trackCount = 0;
const trackingQueue: (TrackingState | undefined)[] = [];

export const tracking = {
    current: undefined as TrackingState | undefined,
};

export function beginTracking() {
    // Keep a copy of the previous tracking context so it can be restored
    // when this context is complete
    trackingQueue.push(tracking.current);
    trackCount++;
    tracking.current = {};
}
export function endTracking() {
    // Restore the previous tracking context
    trackCount--;
    if (trackCount < 0) {
        trackCount = 0;
    }
    tracking.current = trackingQueue.pop();
}

export function updateTracking(node: NodeInfo, track?: TrackingType) {
    if (trackCount) {
        const tracker = tracking.current;
        if (tracker) {
            if (!tracker.nodes) {
                tracker.nodes = new Map();
            }

            const existing = tracker.nodes.get(node);
            if (existing) {
                existing.track = existing.track || track;
                existing.num++;
            } else {
                tracker.nodes.set(node, { node, track, num: 1 });
            }
        }
    }
}



================================================
FILE: src/trackSelector.ts
================================================
import { computeSelector } from './helpers';
import type { ObserveOptions, ListenerParams, ObserveEvent, Selector, GetOptions } from './observableInterfaces';
import { setupTracking } from './setupTracking';
import { beginTracking, endTracking, tracking } from './tracking';

export function trackSelector<T>(
    selector: Selector<T>,
    update: (params: ListenerParams) => void,
    getOptions?: GetOptions,
    observeEvent?: ObserveEvent<T>,
    observeOptions?: ObserveOptions,
    createResubscribe?: boolean,
) {
    let dispose: undefined | (() => void);
    let resubscribe: (() => () => void) | undefined;
    let updateFn = update;

    beginTracking();
    const value = selector
        ? computeSelector(selector, getOptions, observeEvent, observeOptions?.fromComputed)
        : selector;
    const tracker = tracking.current;
    const nodes = tracker!.nodes;
    endTracking();

    if ((process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') && tracker && nodes) {
        tracker.traceListeners?.(nodes);
        if (tracker.traceUpdates) {
            updateFn = tracker.traceUpdates(update) as () => void;
        }
        // Clear tracing so it doesn't leak to other components
        tracker.traceListeners = undefined;
        tracker.traceUpdates = undefined;
    }

    if (!observeEvent?.cancel) {
        // Do tracing if it was requested

        // useSyncExternalStore doesn't subscribe until after the component mount.
        // We want to subscribe immediately so we don't miss any updates
        dispose = setupTracking(nodes, updateFn, false, observeOptions?.immediate);
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
            resubscribe = createResubscribe
                ? () => {
                      dispose?.();
                      dispose = setupTracking(nodes, updateFn);
                      return dispose;
                  }
                : undefined;
        }
    }

    return { nodes, value, dispose, resubscribe };
}



================================================
FILE: src/when.ts
================================================
import { isObservable } from './globals';
import { computeSelector, isObservableValueReady } from './helpers';
import { isArray, isFunction, isPromise } from './is';
import type { ObserveEvent, Selector } from './observableInterfaces';
import { observe } from './observe';

// Modify the _when function
function _when<T, T2>(predicate: Selector<T> | Selector<T>[], effect?: (value: T) => T2, checkReady?: boolean): any {
    // If predicate is a regular Promise skip all the observable stuff
    if (isPromise<T>(predicate)) {
        return effect ? predicate.then(effect) : (predicate as any);
    }

    const isPredicateArray = isArray(predicate);

    let value: T | undefined;
    let effectValue: T2 | undefined;

    // Create a wrapping fn that calls the effect if predicate returns true
    function run(e: ObserveEvent<T>) {
        const ret = isPredicateArray ? predicate.map((p) => computeSelector(p)) : computeSelector(predicate);

        if (isPromise(ret)) {
            value = ret as any;
            // We want value to be the Promise but return undefined
            // so it doesn't run the effect with the Promise as the value
            return undefined;
        } else {
            let isOk: any = true;
            if (isArray(ret)) {
                for (let i = 0; i < ret.length; i++) {
                    let item = ret[i];
                    if (isObservable(item)) {
                        item = computeSelector(item);
                    } else if (isFunction(item)) {
                        item = item();
                    }
                    isOk = isOk && !!(checkReady ? isObservableValueReady(item) : item);
                }
            } else {
                isOk = checkReady ? isObservableValueReady(ret) : ret;
            }
            if (isOk) {
                value = ret as T;

                // Set cancel so that observe does not track anymore
                e.cancel = true;
            }
        }

        return value;
    }
    function doEffect() {
        // If value is truthy then run the effect
        effectValue = effect?.(value!);
    }
    // Run in an observe
    observe(run, doEffect);

    // If first run resulted in a truthy value just return it.
    // It will have set e.cancel so no need to dispose
    if (isPromise<T>(value)) {
        return effect ? value.then(effect) : (value as any);
    } else if (value !== undefined) {
        return effect ? effectValue : Promise.resolve(value);
    } else {
        // Wrap it in a promise
        const promise = new Promise<T2>((resolve) => {
            if (effect) {
                const originalEffect = effect;
                effect = ((value: T) => {
                    const effectValue = originalEffect(value);
                    resolve(isPromise(effectValue) ? effectValue.then((value) => value as T2) : effectValue);
                }) as any;
            } else {
                effect = resolve as any;
            }
        });

        return promise;
    }
}

export function when<T, T2>(predicate: Promise<T>, effect: (value: T) => T2): Promise<T2>;
export function when<T, T2>(predicate: Selector<T>[], effect: (value: T[]) => T2): Promise<T2>;
export function when<T, T2>(predicate: Selector<T>, effect: (value: T) => T2): Promise<T2>;
export function when<T>(predicate: Selector<T>[]): Promise<T[]>;
export function when<T>(predicate: Selector<T>): Promise<T>;
export function when<T, T2>(predicate: Selector<T>, effect?: (value: T) => T2): Promise<T | T2> {
    return _when<T, T2>(predicate, effect, false);
}

export function whenReady<T, T2>(predicate: Promise<T>, effect: (value: T) => T2): Promise<T2>;
export function whenReady<T, T2>(predicate: Selector<T>[], effect: (value: T[]) => T2): Promise<T2[]>;
export function whenReady<T, T2>(predicate: Selector<T>, effect: (value: T) => T2): Promise<T2>;
export function whenReady<T>(predicate: Selector<T>[]): Promise<T[]>;
export function whenReady<T>(predicate: Selector<T>): Promise<T>;
export function whenReady<T, T2>(predicate: Selector<T>, effect?: (value: T) => T2): Promise<T | T2> {
    return _when<T, T2>(predicate, effect, true);
}



================================================
FILE: src/as/arrayAsRecord.ts
================================================
import { Linked, ObservableParam, linked } from '@legendapp/state';

export function arrayAsRecord<T, TKey extends keyof T>(
    arr$: ObservableParam<T[]>,
    keyField: TKey = 'id' as TKey,
): Linked<Record<string, T>> {
    return linked({
        get: () => {
            const record = {};
            const value = arr$.get();
            for (let i = 0; i < value.length; i++) {
                const v = value[i];
                const child = v[keyField];
                (record as any)[child[keyField]] = child;
            }
            return record;
        },
        set: ({ value }) => {
            if (value) {
                arr$.set(Object.values(value));
            } else {
                arr$.set(value);
            }
        },
    });
}



================================================
FILE: src/as/arrayAsSet.ts
================================================
import { Linked, ObservableParam, linked } from '@legendapp/state';

export function arrayAsSet<T>(arr$: ObservableParam<T[]>): Linked<Set<T>> {
    return linked({
        get: () => new Set<T>(arr$.get()),
        set: ({ value }) => arr$.set(Array.from(value)),
    });
}



================================================
FILE: src/as/arrayAsString.ts
================================================
import { Linked, ObservableParam, linked } from '@legendapp/state';

export function arrayAsString<T extends any[]>(arr$: ObservableParam<T>): Linked<string> {
    return linked({
        get: () => JSON.stringify(arr$?.get()),
        set: ({ value }) => arr$.set(JSON.parse(value || '[]')),
    });
}



================================================
FILE: src/as/numberAsString.ts
================================================
import { Linked, ObservableParam, linked } from '@legendapp/state';

export function numberAsString(num$: ObservableParam<number>): Linked<string> {
    return linked({
        get: () => num$.get() + '',
        set: ({ value }) => num$?.set(+value),
    });
}



================================================
FILE: src/as/recordAsArray.ts
================================================
import { Linked, ObservableParam, linked } from '@legendapp/state';

export function recordAsArray<T, TKey extends keyof T>(
    record$: ObservableParam<Record<string | number, T>>,
    keyField: TKey = 'id' as TKey,
): Linked<T[]> {
    return linked({
        get: () => Object.values(record$),
        set: ({ value }) => {
            if (value) {
                const record = {};
                for (let i = 0; i < value.length; i++) {
                    const v = value[i];
                    const child = v[keyField];
                    (record as any)[child[keyField]] = child;
                }
                record$.set(record);
            } else {
                record$.set(value);
            }
        },
    });
}



================================================
FILE: src/as/recordAsString.ts
================================================
import { Linked, ObservableParam, linked } from '@legendapp/state';

export function recordAsString(record$: ObservableParam<Record<any, any>>): Linked<string> {
    return linked({
        get: () => JSON.stringify(record$.get()),
        set: ({ value }) => record$?.set(JSON.parse(value || '{}')),
    });
}



================================================
FILE: src/as/setAsArray.ts
================================================
import { Linked, ObservableParam, linked } from '@legendapp/state';

export function setAsArray<T>(set$: ObservableParam<Set<T>>): Linked<T[]> {
    return linked({
        get: () => Array.from<T>(set$?.get()),
        set: ({ value }) => set$.set(new Set<T>(value)),
    });
}



================================================
FILE: src/as/setAsString.ts
================================================
import { Linked, ObservableParam, linked } from '@legendapp/state';

export function setAsString(set$: ObservableParam<Set<any>>): Linked<string> {
    return linked({
        get: () => JSON.stringify(Array.from(set$?.get())),
        set: ({ value }) => set$.set(new Set<string>(JSON.parse(value || '[]'))),
    });
}



================================================
FILE: src/as/stringAsArray.ts
================================================
import { Linked, ObservableParam, linked } from '@legendapp/state';

export function stringAsArray<T>(str$: ObservableParam<string>): Linked<T[]> {
    return linked({
        get: () => JSON.parse(str$?.get() || '[]') as T[],
        set: ({ value }) => str$?.set(JSON.stringify(value)),
    });
}



================================================
FILE: src/as/stringAsNumber.ts
================================================
import { Linked, ObservableParam, isNumber, linked } from '@legendapp/state';

export function stringAsNumber(num$: ObservableParam<string>): Linked<number> {
    return linked({
        get: () => {
            const num = +num$.get();
            return isNumber(num) ? +num : 0;
        },
        set: ({ value }) => num$?.set(value + ''),
    });
}



================================================
FILE: src/as/stringAsRecord.ts
================================================
import { Linked, ObservableParam, linked } from '@legendapp/state';

export function stringAsRecord<T extends Record<string, any>>(str$: ObservableParam<string>): Linked<T> {
    return linked({
        get: () => {
            return JSON.parse(str$?.get() || '{}') as T;
        },
        set: ({ value }) => str$?.set(JSON.stringify(value)),
    });
}



================================================
FILE: src/as/stringAsSet.ts
================================================
import { Linked, ObservableParam, linked } from '@legendapp/state';

export function stringAsSet<T>(str$: ObservableParam<string>): Linked<Set<T>> {
    return linked({
        get: () => new Set<T>(JSON.parse(str$?.get() || '[]')),
        set: ({ value }) => str$?.set(JSON.stringify(Array.from(value))),
    });
}



================================================
FILE: src/babel/index.ts
================================================
import {
    arrowFunctionExpression,
    jsxClosingElement,
    jsxClosingFragment,
    jsxElement,
    jsxExpressionContainer,
    jsxFragment,
    jsxIdentifier,
    jsxOpeningElement,
    jsxOpeningFragment,
} from '@babel/types';

export default function () {
    let hasLegendImport = false;
    return {
        visitor: {
            ImportDeclaration: {
                enter(path: { node: any; replaceWith: (param: any) => any; skip: () => void }) {
                    if (path.node.source.value === '@legendapp/state/react') {
                        const specifiers = path.node.specifiers;
                        for (let i = 0; i < specifiers.length; i++) {
                            const s = specifiers[i].imported.name;
                            if (!hasLegendImport && (s === 'Computed' || s === 'Memo' || s === 'Show')) {
                                hasLegendImport = true;
                                break;
                            }
                        }
                    }
                },
            },
            JSXElement: {
                enter(path: {
                    node: any;
                    replaceWith: (param: any) => any;
                    skip: () => void;
                    traverse: (path: any) => any;
                }) {
                    if (!hasLegendImport) {
                        return;
                    }

                    const openingElement = path.node.openingElement;
                    const name = openingElement.name.name;

                    if (name === 'Computed' || name === 'Memo' || name === 'Show') {
                        const children = removeEmptyText(path.node.children);
                        if (children.length === 0) return;

                        if (
                            children[0].type === 'JSXElement' ||
                            (children[0].type === 'JSXExpressionContainer' &&
                                children[0].expression.type !== 'ArrowFunctionExpression' &&
                                children[0].expression.type !== 'FunctionExpression' &&
                                children[0].expression.type !== 'MemberExpression' &&
                                children[0].expression.type !== 'Identifier')
                        ) {
                            const attrs = openingElement.attributes;
                            path.replaceWith(
                                jsxElement(
                                    jsxOpeningElement(jsxIdentifier(name), attrs),
                                    jsxClosingElement(jsxIdentifier(name)),
                                    [jsxExpressionContainer(arrowFunctionExpression([], maybeWrapFragment(children)))],
                                ),
                            );
                        }
                    }
                },
            },
        },
    };
}

function maybeWrapFragment(children: any[]) {
    if (children.length === 1 && children[0].type == 'JSXElement') return children[0];
    if (children.length === 1 && children[0].type == 'JSXExpressionContainer') return children[0].expression;
    return jsxFragment(jsxOpeningFragment(), jsxClosingFragment(), children);
}

function removeEmptyText(nodes: any[]) {
    return nodes.filter((node) => !(node.type === 'JSXText' && node.value.trim().length === 0));
}



================================================
FILE: src/config/configureLegendState.ts
================================================
import { internal } from '@legendapp/state';
import type { NodeInfo } from '@legendapp/state';

const { globalState, observableProperties: _observableProperties, observableFns, ObservablePrimitiveClass } = internal;

export function configureLegendState({
    observableFunctions,
    observableProperties,
    jsonReplacer,
    jsonReviver,
}: {
    observableFunctions?: Record<string, (node: NodeInfo, ...args: any[]) => any>;
    observableProperties?: Record<string, { get: (node: NodeInfo) => any; set: (node: NodeInfo, value: any) => any }>;
    jsonReplacer?: (this: any, key: string, value: any) => any;
    jsonReviver?: (this: any, key: string, value: any) => any;
}) {
    if (observableFunctions) {
        for (const key in observableFunctions) {
            const fn = observableFunctions[key];
            observableFns.set(key, fn);
            ObservablePrimitiveClass.prototype[key] = function (...args: any[]) {
                return fn.call(this, this._node, ...args);
            };
        }
    }
    if (observableProperties) {
        for (const key in observableProperties) {
            const fns = observableProperties[key];
            _observableProperties.set(key, fns);
            Object.defineProperty(ObservablePrimitiveClass.prototype, key, {
                configurable: true,
                get() {
                    return fns.get.call(this, this._node);
                },
                set(value: any) {
                    return fns.set.call(this, this._node, value);
                },
            });
        }
    }
    if (jsonReplacer) {
        globalState.replacer = jsonReplacer;
    }
    if (jsonReviver) {
        globalState.reviver = jsonReviver;
    }
}



================================================
FILE: src/config/enable$GetSet.ts
================================================
import { internal } from '@legendapp/state';
import { configureLegendState } from '@legendapp/state/config/configureLegendState';

export function enable$GetSet() {
    configureLegendState({
        observableProperties: {
            $: {
                get(node) {
                    return internal.get(node);
                },
                set(node, value) {
                    internal.set(node, value);
                },
            },
        },
    });
}
// TODOv4 deprecate
export const enableDirectAccess = enable$GetSet;

// Types:

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ImmutableObservableBase } from '@legendapp/state';

declare module '@legendapp/state' {
    interface ImmutableObservableBase<T> {
        get $(): T;
        set $(value: T | null | undefined);
    }
}



================================================
FILE: src/config/enable_PeekAssign.ts
================================================
import { internal } from '@legendapp/state';
import { configureLegendState } from '@legendapp/state/config/configureLegendState';

export function enable_PeekAssign() {
    configureLegendState({
        observableProperties: {
            _: {
                get(node) {
                    return internal.peek(node);
                },
                set(node, value) {
                    internal.setNodeValue(node, value);
                },
            },
        },
    });
}

// TODOv4 deprecate
export const enableDirectAccess = enable_PeekAssign;

// Types:

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ImmutableObservableBase } from '@legendapp/state';

declare module '@legendapp/state' {
    interface ImmutableObservableBase<T> {
        get _(): T;
        set _(value: T | null | undefined);
    }
}



================================================
FILE: src/config/enableReactComponents.ts
================================================
import { BindKeys, FCReactiveObject, configureReactive } from '@legendapp/state/react';

// TODOV3 Remove this

export function enableReactComponents() {
    const bindInfo: BindKeys = {
        value: { handler: 'onChange', getValue: (e: any) => e.target.value, defaultValue: '' },
    };
    const bindInfoInput: BindKeys = Object.assign(
        { checked: { handler: 'onChange', getValue: (e: { target: { checked: boolean } }) => e.target.checked } },
        bindInfo,
    );
    configureReactive({
        binders: {
            input: bindInfoInput,
            textarea: bindInfo,
            select: bindInfo,
        },
    });
}

// Types:

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { IReactive } from '@legendapp/state/react';

declare module '@legendapp/state/react' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IReactive extends FCReactiveObject<JSX.IntrinsicElements> {}
}



================================================
FILE: src/config/enableReactNativeComponents.ts
================================================
import { useRef } from 'react';
import type { Observable } from '@legendapp/state';
import { FCReactive, FCReactiveObject, configureReactive, useSelector } from '@legendapp/state/react';
import {
    ActivityIndicator,
    ActivityIndicatorProps,
    Button,
    ButtonProps,
    FlatList,
    FlatListProps,
    Image,
    ImageProps,
    Pressable,
    PressableProps,
    ScrollView,
    ScrollViewProps,
    SectionList,
    SectionListProps,
    Switch,
    SwitchProps,
    Text,
    TextInput,
    TextInputProps,
    TextProps,
    TouchableWithoutFeedback,
    TouchableWithoutFeedbackProps,
    View,
    ViewProps,
} from 'react-native';

// TODOV3 Remove this

export function enableReactNativeComponents() {
    configureReactive({
        components: {
            ActivityIndicator: ActivityIndicator,
            Button: Button,
            FlatList: FlatList,
            Image: Image,
            Pressable: Pressable,
            ScrollView: ScrollView,
            SectionList: SectionList,
            Switch: Switch,
            Text: Text,
            TextInput: TextInput,
            TouchableWithoutFeedback: TouchableWithoutFeedback,
            View: View,
        },
        binders: {
            TextInput: {
                value: {
                    handler: 'onChange',
                    getValue: (e: any) => e.nativeEvent.text,
                    defaultValue: '',
                },
            },
            Switch: {
                value: {
                    handler: 'onValueChange',
                    getValue: (e: any) => e,
                    defaultValue: false,
                },
            },
            FlatList: {
                data: {
                    selector: (propsOut: Record<string, any>, p: Observable<any>) => {
                        const state = useRef(0);
                        // Increment renderNum whenever the array changes shallowly
                        const [renderNum, value] = useSelector(() => [state.current++, p.get(true)]);

                        // Set extraData to renderNum so that it will re-render when renderNum changes.
                        // This is necessary because the observable array is mutable so changes to it
                        // won't trigger re-renders by default.
                        propsOut.extraData = renderNum;

                        return value;
                    },
                },
            },
        },
    });
}

// Types:

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { IReactive } from '@legendapp/state/react';

declare module '@legendapp/state/react' {
    interface IReactive extends FCReactiveObject<JSX.IntrinsicElements> {
        ActivityIndicator: FCReactive<ActivityIndicator, ActivityIndicatorProps>;
        Button: FCReactive<Button, ButtonProps>;
        FlatList: FCReactive<FlatList, FlatListProps<any>>;
        Image: FCReactive<Image, ImageProps>;
        Pressable: FCReactive<typeof Pressable, PressableProps>;
        ScrollView: FCReactive<ScrollView, ScrollViewProps>;
        SectionList: FCReactive<SectionList, SectionListProps<any>>;
        Switch: FCReactive<Switch, SwitchProps>;
        Text: FCReactive<Text, TextProps>;
        TextInput: FCReactive<TextInput, TextInputProps>;
        TouchableWithoutFeedback: FCReactive<TouchableWithoutFeedback, TouchableWithoutFeedbackProps>;
        View: FCReactive<View, ViewProps>;
    }
}



================================================
FILE: src/config/enableReactTracking.ts
================================================
import { type GetOptions, internal, isObject, tracking, type NodeInfo, type TrackingType } from '@legendapp/state';
import { configureLegendState } from '@legendapp/state/config/configureLegendState';
import { UseSelectorOptions, useSelector } from '@legendapp/state/react';
import { createContext, useContext } from 'react';
// @ts-expect-error Internals
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED as ReactInternals } from 'react';

interface ReactTrackingOptions {
    auto?: boolean; // Make all get() calls act as useSelector() hooks
    warnUnobserved?: boolean; // Warn if get() is used outside of an observer
    warnMissingUse?: boolean; // Warn if get() is used in a component
}

export function enableReactTracking({ auto, warnUnobserved, warnMissingUse }: ReactTrackingOptions) {
    const { get } = internal;

    if (auto || (process.env.NODE_ENV === 'development' && (warnUnobserved || warnMissingUse))) {
        const ReactRenderContext = createContext(0);

        const isInRender = () => {
            // If we're already tracking then we definitely don't need useSelector
            try {
                // If there's no dispatcher we're definitely not in React
                // This is an optimization to not need to run useContext. If in a future React version
                // this works differently we can change it or just remove it.
                const dispatcher = ReactInternals.ReactCurrentDispatcher.current;
                if (dispatcher) {
                    // If there's a dispatcher then we may be inside of a hook.
                    // Attempt a useContext hook, which will throw an error if outside of render.
                    useContext(ReactRenderContext);
                    return true;
                }
            } catch {} // eslint-disable-line no-empty
            return false;
        };

        const isObserved = () => {
            // If we're already tracking then we definitely don't need useSelector
            return !!tracking.current;
        };

        const needsSelector = () => {
            // If we're already tracking then we definitely don't need useSelector
            if (!isObserved()) {
                return isInRender();
            }
            return false;
        };

        configureLegendState({
            observableFunctions: {
                get: (node: NodeInfo, options?: TrackingType | (GetOptions & UseSelectorOptions)) => {
                    if (process.env.NODE_ENV === 'development' && warnMissingUse) {
                        if (isInRender()) {
                            if (isObserved()) {
                                console.warn(
                                    '[legend-state] Detected a `get()` call in an observer component. It is recommended to use the `use$` hook instead to be compatible with React Compiler: https://legendapp.com/open-source/state/v3/react/react-api/#use$',
                                );
                            } else {
                                console.warn(
                                    '[legend-state] Detected a `get()` call in a component. You likely want to use the `use$` hook to be reactive to it changing, or change `get()` to `peek()` to get the value without tracking: https://legendapp.com/open-source/state/v3/react/react-api/#use$',
                                );
                            }
                        }
                    } else if (needsSelector()) {
                        if (auto) {
                            return useSelector(() => get(node, options), isObject(options) ? options : undefined);
                        } else if (process.env.NODE_ENV === 'development' && warnUnobserved) {
                            console.warn(
                                '[legend-state] Detected a `get()` call in an unobserved component. You may want to wrap it in observer: https://legendapp.com/open-source/state/v3/react/react-api/#observer',
                            );
                        }
                    }
                    return get(node, options);
                },
            },
        });
    }
}



================================================
FILE: src/config/enableReactUse.ts
================================================
import { internal, NodeInfo } from '@legendapp/state';
import { configureLegendState } from '@legendapp/state/config/configureLegendState';
import { useSelector, UseSelectorOptions } from '@legendapp/state/react';

// TODO: Deprecated, remove in v4
let didWarn = false;

export function enableReactUse() {
    configureLegendState({
        observableFunctions: {
            use: (node: NodeInfo, options?: UseSelectorOptions) => {
                if (process.env.NODE_ENV === 'development' && !didWarn) {
                    didWarn = true;
                    console.warn(
                        '[legend-state] enableReactUse() is deprecated. Please switch to using get() with observer, which is safer and more efficient. See https://legendapp.com/open-source/state/v3/react/react-api/',
                    );
                }
                return useSelector(internal.getProxy(node), options);
            },
        },
    });
}

// Types:

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ImmutableObservableBase } from '@legendapp/state';

declare module '@legendapp/state' {
    interface ImmutableObservableBase<T> {
        use(options?: UseSelectorOptions): T;
    }
}



================================================
FILE: src/helpers/pageHash.ts
================================================
import { observable, Observable } from '@legendapp/state';

interface Options {
    setter: 'pushState' | 'replaceState' | 'hash';
}
let _options: Options = { setter: 'hash' };

function configurePageHash(options: Options) {
    _options = options;
}

const hasWindow = typeof window !== 'undefined';
const pageHash: Observable<string> = observable(hasWindow ? window.location.hash.slice(1) : '');

if (hasWindow) {
    let isSetting = false;
    // Set the page hash when the observable changes
    pageHash.onChange(({ value }) => {
        if (!isSetting) {
            const hash = '#' + value;
            const setter = _options?.setter || 'hash';
            if (setter === 'pushState') {
                history.pushState(null, null as any, hash);
            } else if (setter === 'replaceState') {
                history.replaceState(null, null as any, hash);
            } else {
                location.hash = hash;
            }
        }
    });
    // Update the observable whenever the hash changes
    const cb = () => {
        isSetting = true;
        pageHash.set(window.location.hash.slice(1));
        isSetting = false;
    };
    // Subscribe to window hashChange event
    window.addEventListener('hashchange', cb);
}

export { configurePageHash, pageHash };



================================================
FILE: src/helpers/pageHashParams.ts
================================================
import { observable, Observable } from '@legendapp/state';

interface Options {
    setter: 'pushState' | 'replaceState' | 'hash';
}
let _options: Options = { setter: 'hash' };

function configurePageHashParams(options: Options) {
    _options = options;
}

function toParams(str: string) {
    const ret: Record<string, string> = {};
    const searchParams = new URLSearchParams(str);
    for (const [key, value] of searchParams) {
        ret[key] = value;
    }
    return ret;
}
function toString(params: Record<string, string>) {
    return new URLSearchParams(params).toString().replace(/=$/, '');
}

const hasWindow = typeof window !== 'undefined';
const pageHashParams: Observable<Record<string, string>> = observable(
    hasWindow ? toParams(window.location.hash.slice(1)) : {},
);

if (hasWindow) {
    let isSetting = false;
    // Set the page hash when the observable changes
    pageHashParams.onChange(({ value }) => {
        if (!isSetting) {
            const hash = '#' + toString(value);
            const setter = _options?.setter || 'hash';
            if (setter === 'pushState') {
                history.pushState(null, null as any, hash);
            } else if (setter === 'replaceState') {
                history.replaceState(null, null as any, hash);
            } else {
                location.hash = hash;
            }
        }
    });
    // Update the observable whenever the hash changes
    const cb = () => {
        isSetting = true;
        pageHashParams.set(toParams(window.location.hash.slice(1)));
        isSetting = false;
    };
    // Subscribe to window hashChange event
    window.addEventListener('hashchange', cb);
}

export { configurePageHashParams, pageHashParams };



================================================
FILE: src/helpers/time.ts
================================================
import { observable } from '@legendapp/state';

const MSPerMinute = 60000;

function clearTime(date: Date | number) {
    date = new Date(date);
    date.setHours(0, 0, 0, 0);
    return date;
}

let time = new Date();
const currentTime = observable(time);
const currentDay = observable(clearTime(time));
const timeToSecond = (60 - time.getSeconds() + 1) * 1000;
function update() {
    const now = new Date();
    currentTime.set(now);

    if (now.getDate() !== time.getDate()) {
        currentDay.set(clearTime(now));
    }

    time = now;
}
setTimeout(() => {
    update();
    setInterval(update, MSPerMinute);
}, timeToSecond);

export { currentTime, currentDay };



================================================
FILE: src/helpers/trackHistory.ts
================================================
import { ObservableParam, constructObjectWithPath, mergeIntoObservable, observable } from '@legendapp/state';

// This type is purely for documentation.
type TimestampAsString = string;

export function trackHistory<T>(
    value$: ObservableParam<T>,
    targetObservable?: ObservableParam<Record<TimestampAsString, Partial<T>>>,
): ObservableParam<Record<TimestampAsString, any>> {
    const history = targetObservable ?? observable<Record<TimestampAsString, Partial<T>>>();

    value$.onChange(({ isFromPersist, isFromSync, changes }) => {
        // Don't save history if this is a remote change.
        // History will be saved remotely by the client making the local change.
        if (!isFromPersist && !isFromSync) {
            const time: TimestampAsString = Date.now().toString();

            // Save to history observable by date, with the previous value
            for (let i = 0; i < changes.length; i++) {
                const { path, prevAtPath, pathTypes } = changes[i];

                const obj = constructObjectWithPath(path, pathTypes, prevAtPath);
                mergeIntoObservable((history as any)[time], obj);
            }
        }
    });

    return history as any;
}



================================================
FILE: src/helpers/undoRedo.ts
================================================
import { type ObservablePrimitive, internal, observable } from '@legendapp/state';

type UndoRedoOptions = {
    limit?: number;
};

/**
 * Usage:
 *
 * Use this function to add undo/redo functionality to an observable.
 *
 * You can monitor how many undos or redos are available to enable/disable undo/redo
 * UI elements with undo$ and redo$.
 *
 * If you undo and then make a change, it'll delete any redos and add the change, as expected.
 *
 * If you don't pass in a limit, it will keep all history. This means it can grow indefinitely.
 *
 * ```typescript
 * const obs$ = observable({ test: 'hi', test2: 'a' });
 * const { undo, redo, undos$, redos$, getHistory } = undoRedo(obs$, { limit: 40 });
 * obs$.test.set('hello');
 * undo();
 * redo();
 * // observables for # of undos/redos available
 * undos$.get();
 * redos$.get();
 * ```
 */
export function undoRedo<T>(obs$: ObservablePrimitive<T>, options?: UndoRedoOptions) {
    let history = [] as T[];
    let historyPointer = 0;
    let restoringFromHistory = false;

    const undos$ = observable(0);
    const redos$ = observable(0);

    function updateUndoRedo() {
        undos$.set(historyPointer);
        redos$.set(history.length - historyPointer - 1);
    }

    obs$.onChange(({ getPrevious }) => {
        // Don't save history if we're restoring from history.
        if (restoringFromHistory) return;

        // Don't save history if this is a remote change.
        // History will be saved remotely by the client making the local change.
        if (internal.globalState.isLoadingRemote || internal.globalState.isLoadingLocal) return;

        // if the history array is empty, grab the previous value as the initial value
        if (!history.length) {
            const previous = getPrevious();
            if (previous) history.push(internal.clone(previous));
            historyPointer = 0;
        }

        // We're just going to store a copy of the whole object every time it changes.
        const snapshot = internal.clone(obs$.get());

        if (options?.limit) {
            // limit means the number of undos
            history = history.slice(Math.max(0, history.length - options.limit));
        } else {
            history = history.slice(0, historyPointer + 1);
        }

        // we add another history item, which is limit + 1 -- but it's the current one
        history.push(snapshot);

        // We're going to keep a pointer to the current history state.
        // This way, we can undo to many previous states, and redo.
        historyPointer = history.length - 1;

        updateUndoRedo();
    });

    return {
        undo() {
            if (historyPointer > 0) {
                historyPointer--;

                const snapshot = internal.clone(history[historyPointer]);
                restoringFromHistory = true;
                obs$.set(snapshot);
                restoringFromHistory = false;
            } else {
                console.warn('Already at the beginning of undo history');
            }

            updateUndoRedo();
        },
        redo() {
            if (historyPointer < history.length - 1) {
                historyPointer++;

                const snapshot = internal.clone(history[historyPointer]);
                restoringFromHistory = true;
                obs$.set(snapshot);
                restoringFromHistory = false;
            } else {
                console.warn('Already at the end of undo history');
            }

            updateUndoRedo();
        },
        undos$: undos$,
        redos$: redos$,
        getHistory: () => history,
    };
}



================================================
FILE: src/persist-plugins/async-storage.ts
================================================
import type { Change } from '@legendapp/state';
import { applyChanges, internal, isArray } from '@legendapp/state';
import type {
    ObservablePersistAsyncStoragePluginOptions,
    ObservablePersistPlugin,
    ObservablePersistPluginOptions,
    PersistMetadata,
} from '@legendapp/state/sync';
import type { AsyncStorageStatic } from '@react-native-async-storage/async-storage';

const MetadataSuffix = '__m';

let AsyncStorage: AsyncStorageStatic;

const { safeParse, safeStringify } = internal;

export class ObservablePersistAsyncStorage implements ObservablePersistPlugin {
    private data: Record<string, any> = {};
    private configuration: ObservablePersistAsyncStoragePluginOptions;

    constructor(configuration: ObservablePersistAsyncStoragePluginOptions) {
        this.configuration = configuration;
    }
    public async initialize(configOptions: ObservablePersistPluginOptions) {
        const storageConfig = this.configuration || configOptions.asyncStorage;

        let tables: readonly string[] = [];
        if (storageConfig) {
            AsyncStorage = storageConfig.AsyncStorage;
            const { preload } = storageConfig;
            try {
                if (preload === true) {
                    // If preloadAllKeys, load all keys and preload tables on startup
                    tables = await AsyncStorage.getAllKeys();
                } else if (isArray(preload)) {
                    // If preloadKeys, preload load the tables on startup
                    const metadataTables = preload.map((table) =>
                        table.endsWith(MetadataSuffix) ? undefined : table + MetadataSuffix,
                    );
                    tables = [...preload, ...(metadataTables.filter(Boolean) as string[])];
                }
                if (tables) {
                    const values = await AsyncStorage.multiGet(tables);

                    values.forEach(([table, value]) => {
                        this.data[table] = value ? safeParse(value) : undefined;
                    });
                }
            } catch (e) {
                console.error('[legend-state] ObservablePersistAsyncStorage failed to initialize', e);
            }
        } else {
            console.error('[legend-state] Missing asyncStorage configuration');
        }
    }
    public loadTable(table: string): void | Promise<void> {
        if (this.data[table] === undefined) {
            return AsyncStorage.multiGet([table, table + MetadataSuffix])
                .then((values) => {
                    try {
                        values.forEach(([table, value]) => {
                            this.data[table] = value ? safeParse(value) : undefined;
                        });
                    } catch (err) {
                        console.error('[legend-state] ObservablePersistLocalAsyncStorage failed to parse', table, err);
                    }
                })
                .catch((err: Error) => {
                    if (err?.message !== 'window is not defined') {
                        console.error('[legend-state] AsyncStorage.multiGet failed', table, err);
                    }
                });
        }
    }
    // Gets
    public getTable(table: string, init: object) {
        return this.data[table] ?? init ?? {};
    }
    public getMetadata(table: string): PersistMetadata {
        return this.getTable(table + MetadataSuffix, {});
    }
    // Sets
    public set(table: string, changes: Change[]): Promise<void> {
        if (!this.data[table]) {
            this.data[table] = {};
        }

        this.data[table] = applyChanges(this.data[table], changes);
        return this.save(table);
    }
    public setMetadata(table: string, metadata: PersistMetadata) {
        return this.setValue(table + MetadataSuffix, metadata);
    }
    public async deleteTable(table: string) {
        return AsyncStorage.removeItem(table);
    }
    public deleteMetadata(table: string) {
        return this.deleteTable(table + MetadataSuffix);
    }
    // Private
    private async setValue(table: string, value: any) {
        this.data[table] = value;
        await this.save(table);
    }
    private async save(table: string) {
        const v = this.data[table];

        if (v !== undefined && v !== null) {
            return AsyncStorage.setItem(table, safeStringify(v));
        } else {
            return AsyncStorage.removeItem(table);
        }
    }
}

export function observablePersistAsyncStorage(configuration: ObservablePersistAsyncStoragePluginOptions) {
    return new ObservablePersistAsyncStorage(configuration);
}



================================================
FILE: src/persist-plugins/expo-sqlite.ts
================================================
import type { Change } from '@legendapp/state';
import { applyChanges, internal } from '@legendapp/state';
import type { ObservablePersistPlugin, PersistMetadata } from '@legendapp/state/sync';
import type { SQLiteStorage } from 'expo-sqlite/kv-store';

const { safeParse, safeStringify } = internal;

const MetadataSuffix = '__m';

export class ObservablePersistSqlite implements ObservablePersistPlugin {
    private data: Record<string, any> = {};
    private storage: SQLiteStorage;
    constructor(storage: SQLiteStorage) {
        if (!storage) {
            console.error(
                '[legend-state] ObservablePersistSqlite failed to initialize. You need to pass the SQLiteStorage instance.',
            );
        }
        this.storage = storage;
    }
    public getTable(table: string, init: any) {
        if (!this.storage) return undefined;
        if (this.data[table] === undefined) {
            try {
                const value = this.storage.getItemSync(table);
                this.data[table] = value ? safeParse(value) : init;
            } catch {
                console.error('[legend-state] ObservablePersistSqlite failed to parse', table);
            }
        }
        return this.data[table];
    }
    public getMetadata(table: string): PersistMetadata {
        return this.getTable(table + MetadataSuffix, {});
    }
    public set(table: string, changes: Change[]): void {
        if (!this.data[table]) {
            this.data[table] = {};
        }
        this.data[table] = applyChanges(this.data[table], changes);
        this.save(table);
    }
    public setMetadata(table: string, metadata: PersistMetadata) {
        table = table + MetadataSuffix;
        this.data[table] = metadata;
        this.save(table);
    }
    public deleteTable(table: string) {
        if (!this.storage) return undefined;
        delete this.data[table];
        this.storage.removeItemSync(table);
    }
    public deleteMetadata(table: string) {
        this.deleteTable(table + MetadataSuffix);
    }
    // Private
    private save(table: string) {
        if (!this.storage) return undefined;

        const v = this.data[table];

        if (v !== undefined && v !== null) {
            this.storage.setItemSync(table, safeStringify(v));
        } else {
            this.storage.removeItemSync(table);
        }
    }
}

export function observablePersistSqlite(storage: SQLiteStorage) {
    return new ObservablePersistSqlite(storage);
}



================================================
FILE: src/persist-plugins/indexeddb.ts
================================================
import type { Change, Observable } from '@legendapp/state';
import type {
    ObservablePersistPluginOptions,
    ObservablePersistPlugin,
    PersistMetadata,
    PersistOptions,
    ObservablePersistIndexedDBPluginOptions,
} from '@legendapp/state/sync';
import { isPrimitive, isPromise, observable, setAtPath, when } from '@legendapp/state';

const MetadataSuffix = '__legend_metadata';
const PrimitiveName = '__legend_primitive';

function requestToPromise(request: IDBRequest) {
    return new Promise<void>((resolve) => (request.onsuccess = () => resolve()));
}

export class ObservablePersistIndexedDB implements ObservablePersistPlugin {
    private tableData: Record<string, any> = {};
    private tableMetadata: Record<string, any> = {};
    private tablesAdjusted: Map<string, Observable<boolean>> = new Map();
    private db: IDBDatabase | undefined;
    private isSaveTaskQueued = false;
    private pendingSaves = new Map<
        PersistOptions,
        Record<string, { tableName: string; tablePrev?: any; items: Set<string> }>
    >();
    private promisesQueued: (() => void)[] = [];
    private configuration: ObservablePersistIndexedDBPluginOptions;

    constructor(configuration: ObservablePersistIndexedDBPluginOptions) {
        this.configuration = configuration;
        this.doSave = this.doSave.bind(this);
    }
    public async initialize(configOptions: ObservablePersistPluginOptions) {
        const config = this.configuration || configOptions.indexedDB;
        if (typeof indexedDB === 'undefined') return;
        if (process.env.NODE_ENV === 'development' && !config) {
            console.error('[legend-state] Must configure ObservablePersistIndexedDB');
        }

        const { databaseName, version, tableNames } = config;
        const openRequest = indexedDB.open(databaseName, version);

        openRequest.onerror = () => {
            console.error('[legend-state] ObservablePersistIndexedDB load error', openRequest.error);
        };

        openRequest.onupgradeneeded = (event) => {
            const db = openRequest.result;
            const { tableNames, deleteTableNames, onUpgradeNeeded } = config!;
            // let the user take care of adding new, deleting old object stores or transforming data between versions if wanted
            if (onUpgradeNeeded) {
                onUpgradeNeeded(event);
            } else {
                // Delete all tables explicitly specified
                deleteTableNames?.forEach((table) => {
                    if (db.objectStoreNames.contains(table)) {
                        db.deleteObjectStore(table);
                    }
                });

                // Create a table for each name with "id" as the key
                tableNames.forEach((table) => {
                    if (!db.objectStoreNames.contains(table)) {
                        db.createObjectStore(table, {
                            keyPath: 'id',
                        });
                    }
                });
            }
        };

        return new Promise<void>((resolve) => {
            openRequest.onsuccess = async () => {
                this.db = openRequest.result;

                // Load each table
                const objectStoreNames = this.db.objectStoreNames;
                const tables = tableNames.filter((table) => objectStoreNames.contains(table));
                try {
                    const transaction = this.db.transaction(tables, 'readonly');

                    await Promise.all(tables.map((table) => this.initTable(table, transaction)));
                } catch (err) {
                    console.error('[legend-state] Error loading IndexedDB', err);
                }

                resolve();
            };
        });
    }
    public loadTable(table: string, config: PersistOptions): void | Promise<void> {
        if (!this.db) {
            throw new Error(
                '[legend-state] ObservablePersistIndexedDB loading without being initialized. This may happen when running outside of a browser.',
            );
        }

        if (!this.tableData[table]) {
            const transaction = this.db!.transaction(table, 'readonly');

            return this.initTable(table, transaction).then(() => this.loadTable(table, config));
        }

        const prefix = config.indexedDB?.prefixID;

        if (prefix) {
            const tableName = prefix ? table + '/' + prefix : table;
            if (this.tablesAdjusted.has(tableName)) {
                const promise = when(this.tablesAdjusted.get(tableName)!);
                if (isPromise(promise)) {
                    return promise as unknown as Promise<void>;
                }
            } else {
                const obsLoaded = observable(false);
                this.tablesAdjusted.set(tableName, obsLoaded);
                const data = this.getTable(table, {}, config);
                let hasPromise = false;
                let promises: Promise<any>[];
                if (data) {
                    const keys = Object.keys(data);
                    promises = keys.map(async (key) => {
                        const value = data[key];

                        if (isPromise(value)) {
                            hasPromise = true;
                            return value.then(() => {
                                data[key] = value;
                            });
                        } else {
                            data[key] = value;
                        }
                    });
                }
                if (hasPromise) {
                    return Promise.all(promises!).then(() => {
                        obsLoaded.set(true);
                    });
                } else {
                    obsLoaded.set(true);
                }
            }
        }
    }
    public getTable(table: string, init: object, config: PersistOptions) {
        const configIDB = config.indexedDB;
        const prefix = configIDB?.prefixID;
        const data = this.tableData[prefix ? table + '/' + prefix : table];
        if (data && configIDB?.itemID) {
            return data[configIDB.itemID];
        } else {
            return data;
        }
    }
    public getMetadata(table: string, config: PersistOptions) {
        const { tableName } = this.getMetadataTableName(table, config);
        return this.tableMetadata[tableName];
    }
    public async setMetadata(table: string, metadata: PersistMetadata, config: PersistOptions) {
        const { tableName, tableNameBase } = this.getMetadataTableName(table, config);
        // Assign new metadata into the table, and make sure it has the id
        this.tableMetadata[tableName] = Object.assign(metadata, {
            id: tableNameBase + MetadataSuffix,
        });
        this.tableMetadata[tableName] = metadata;
        const store = this.transactionStore(table);
        return store.put(metadata);
    }
    public async deleteMetadata(table: string, config: PersistOptions): Promise<void> {
        const { tableName, tableNameBase } = this.getMetadataTableName(table, config);
        delete this.tableMetadata[tableName];
        const store = this.transactionStore(table);
        const key = tableNameBase + MetadataSuffix;
        store.delete(key);
    }
    public async set(table: string, changes: Change[], config: PersistOptions) {
        if (typeof indexedDB === 'undefined') return;

        if (!this.pendingSaves.has(config)) {
            this.pendingSaves.set(config, {});
        }
        const pendingSaves = this.pendingSaves.get(config)!;

        const realTable = table;
        const prefixID = config.indexedDB?.prefixID;
        if (prefixID) {
            table += '/' + prefixID;
        }
        const prev = this.tableData[table];

        const itemID = config.indexedDB?.itemID;

        if (!pendingSaves[table]) {
            pendingSaves[table] = { tableName: realTable, items: new Set() };
        }

        const pendingTable = pendingSaves[table];

        // Combine changes into a minimal set of saves
        for (let i = 0; i < changes.length; i++) {
            // eslint-disable-next-line prefer-const
            let { path, valueAtPath, pathTypes } = changes[i];
            if (itemID) {
                path = [itemID].concat(path as string[]);
                pathTypes.splice(0, 0, 'object');
            }
            if (path.length > 0) {
                // If change is deep in an object save it to IDB by the first key
                const key = path[0] as string;
                if (!this.tableData[table]) {
                    this.tableData[table] = {};
                }
                this.tableData[table] = setAtPath(this.tableData[table], path as string[], pathTypes, valueAtPath);
                pendingTable.items.add(key);
            } else {
                // Set the whole table
                this.tableData[table] = valueAtPath;
                pendingTable.tablePrev = prev || {};
                break;
            }
        }

        return new Promise<void>((resolve) => {
            this.promisesQueued.push(resolve);

            if (!this.isSaveTaskQueued) {
                this.isSaveTaskQueued = true;
                queueMicrotask(this.doSave);
            }
        });
    }
    private async doSave() {
        this.isSaveTaskQueued = false;
        const promisesQueued = this.promisesQueued;
        this.promisesQueued = [];
        const promises: Promise<IDBRequest>[] = [];
        let lastPut: IDBRequest | undefined;
        this.pendingSaves.forEach((pendingSaves, config) => {
            Object.keys(pendingSaves).forEach((table) => {
                const pendingTable = pendingSaves[table];
                const { tablePrev, items, tableName } = pendingTable;
                const store = this.transactionStore(tableName);
                const tableValue = this.tableData[table];
                if (tablePrev) {
                    promises.push(this._setTable(table, tablePrev, tableValue, store, config));
                } else {
                    items.forEach((key) => {
                        lastPut = this._setItem(table, key, tableValue[key], store, config);
                    });
                }

                // Clear pending saves
                items.clear();
                delete pendingTable.tablePrev;
            });
        });
        this.pendingSaves.clear();

        // setTable awaits multiple sets and deletes so we need to await that to get
        // the lastPut from it.
        if (promises.length) {
            const puts = await Promise.all(promises);
            lastPut = puts[puts.length - 1];
        }

        if (lastPut) {
            await requestToPromise(lastPut);
        }

        promisesQueued.forEach((resolve) => resolve());
    }
    public async deleteTable(table: string, config: PersistOptions): Promise<void> {
        const configIDB = config.indexedDB;
        const prefixID = configIDB?.prefixID;
        const tableName = prefixID ? table + '/' + prefixID : table;
        let data = this.tableData[tableName];
        const itemID = configIDB?.itemID;
        if (data && configIDB?.itemID) {
            const dataTemp = data[itemID!];
            delete data[itemID!];
            data = dataTemp;
        } else {
            delete this.tableData[tableName];
            delete this.tableData[tableName + '_transformed'];
        }

        if (typeof indexedDB === 'undefined') return;

        this.deleteMetadata(table, config);

        if (data) {
            const store = this.transactionStore(table);
            let result: Promise<any>;
            if (!prefixID && !itemID) {
                result = requestToPromise(store.clear());
            } else {
                const keys = Object.keys(data);
                result = Promise.all(
                    keys.map((key) => {
                        if (prefixID) {
                            key = prefixID + '/' + key;
                        }
                        return requestToPromise(store.delete(key));
                    }),
                );
            }
            // Clear the table from IDB
            return result;
        }
    }
    // Private
    private getMetadataTableName(table: string, config: PersistOptions) {
        const configIDB = config.indexedDB;
        let name = '';
        if (configIDB) {
            const { prefixID, itemID } = configIDB;

            if (itemID) {
                name = itemID;
            }
            if (prefixID) {
                name = prefixID + (name ? '/' + name : '');
            }
        }

        return { tableNameBase: name, tableName: name ? table + '/' + name : table };
    }
    private initTable(table: string, transaction: IDBTransaction): Promise<void> {
        const store = transaction.objectStore(table);
        const allRequest = store.getAll();

        if (!this.tableData[table]) {
            this.tableData[table] = {};
        }
        return new Promise((resolve) => {
            allRequest.onsuccess = () => {
                const arr = allRequest.result;
                let metadata: PersistMetadata;
                if (!this.tableData[table]) {
                    this.tableData[table] = {};
                }
                for (let i = 0; i < arr.length; i++) {
                    const val = arr[i];

                    // In case id is a number convert it to a string
                    if (!val.id.includes) {
                        val.id = val.id + '';
                    }

                    if (val.id.endsWith(MetadataSuffix)) {
                        const id = val.id.replace(MetadataSuffix, '');
                        // Save this as metadata
                        delete val.id;
                        metadata = val;
                        const tableName = id ? table + '/' + id : table;
                        this.tableMetadata[tableName] = metadata;
                    } else {
                        let tableName = table;

                        if (val.id.includes('/')) {
                            const [prefix, id] = val.id.split('/');
                            tableName += '/' + prefix;
                            val.id = id;
                        }

                        const id = val.id;

                        const outValue = val[PrimitiveName] !== undefined ? val[PrimitiveName] : val;

                        if (!this.tableData[tableName]) {
                            this.tableData[tableName] = {};
                        }
                        this.tableData[tableName][id] = outValue;
                    }
                }
                resolve();
            };
        });
    }
    private transactionStore(table: string) {
        const transaction = this.db!.transaction(table, 'readwrite');
        return transaction.objectStore(table);
    }
    private _setItem(table: string, key: string, value: any, store: IDBObjectStore, config: PersistOptions) {
        if (!value) {
            if (this.tableData[table]) {
                delete this.tableData[table][key];
            }
            return store.delete(key);
        } else {
            if (isPrimitive(value)) {
                value = { [PrimitiveName]: value };
            }

            if (value.id === undefined) {
                // If value does not have its own ID, assign it the key from the Record
                value.id = key;
            }

            if (config) {
                if (!this.tableData[table]) {
                    this.tableData[table] = {};
                }
                this.tableData[table][key] = value;

                const didClone = false;

                const prefixID = config.indexedDB?.prefixID;
                if (prefixID) {
                    if (didClone) {
                        value.id = prefixID + '/' + value.id;
                    } else {
                        value = Object.assign({}, value, {
                            id: prefixID + '/' + value.id,
                        });
                    }
                }
            }

            return store.put(value);
        }
    }
    private async _setTable(
        table: string,
        prev: object,
        value: Record<string, any>,
        store: IDBObjectStore,
        config: PersistOptions,
    ) {
        const keys = Object.keys(value);
        let lastSet: IDBRequest | undefined;
        // Do a set for each key in the object
        const sets = await Promise.all(
            keys.map((key) => {
                const val = value[key];
                return this._setItem(table, key, val, store, config);
            }),
        );
        lastSet = sets[sets.length - 1];

        // Delete keys that are no longer in the object
        if (prev) {
            const keysOld = Object.keys(prev);
            const deletes = (
                await Promise.all(
                    keysOld.map((key) => {
                        if (value[key] === undefined) {
                            return this._setItem(table, key, null, store, config);
                        }
                    }),
                )
            ).filter((a) => !!a);
            if (deletes.length > 0) {
                lastSet = deletes[deletes.length - 1];
            }
        }
        return lastSet!;
    }
}

export function observablePersistIndexedDB(configuration: ObservablePersistIndexedDBPluginOptions) {
    return new ObservablePersistIndexedDB(configuration);
}



================================================
FILE: src/persist-plugins/local-storage.ts
================================================
import type { Change } from '@legendapp/state';
import { applyChanges, internal } from '@legendapp/state';
import type { ObservablePersistPlugin, PersistMetadata } from '@legendapp/state/sync';

const { safeParse, safeStringify } = internal;

const MetadataSuffix = '__m';

export class ObservablePersistLocalStorageBase implements ObservablePersistPlugin {
    private data: Record<string, any> = {};
    private storage: Storage | undefined;
    constructor(storage: Storage | undefined) {
        this.storage = storage;
    }
    public getTable(table: string, init: any) {
        if (!this.storage) return undefined;
        if (this.data[table] === undefined) {
            try {
                const value = this.storage.getItem(table);
                this.data[table] = value ? safeParse(value) : init;
            } catch {
                console.error('[legend-state] ObservablePersistLocalStorageBase failed to parse', table);
            }
        }
        return this.data[table];
    }
    public getMetadata(table: string): PersistMetadata {
        return this.getTable(table + MetadataSuffix, {});
    }
    public set(table: string, changes: Change[]): void {
        if (!this.data[table]) {
            this.data[table] = {};
        }
        this.data[table] = applyChanges(this.data[table], changes);
        this.save(table);
    }
    public setMetadata(table: string, metadata: PersistMetadata) {
        table = table + MetadataSuffix;
        this.data[table] = metadata;
        this.save(table);
    }
    public deleteTable(table: string) {
        if (!this.storage) return undefined;
        delete this.data[table];
        this.storage.removeItem(table);
    }
    public deleteMetadata(table: string) {
        this.deleteTable(table + MetadataSuffix);
    }
    // Private
    private save(table: string) {
        if (!this.storage) return undefined;

        const v = this.data[table];

        if (v !== undefined && v !== null) {
            this.storage.setItem(table, safeStringify(v));
        } else {
            this.storage.removeItem(table);
        }
    }
}
export class ObservablePersistLocalStorage extends ObservablePersistLocalStorageBase {
    constructor() {
        super(
            typeof localStorage !== 'undefined'
                ? localStorage
                : process.env.NODE_ENV === 'test'
                  ? // @ts-expect-error This is ok to do in jest
                    globalThis._testlocalStorage
                  : undefined,
        );
    }
}
export class ObservablePersistSessionStorage extends ObservablePersistLocalStorageBase {
    constructor() {
        super(
            typeof sessionStorage !== 'undefined'
                ? sessionStorage
                : process.env.NODE_ENV === 'test'
                  ? // @ts-expect-error This is ok to do in jest
                    globalThis._testlocalStorage
                  : undefined,
        );
    }
}



================================================
FILE: src/persist-plugins/mmkv.ts
================================================
import type { Change } from '@legendapp/state';
import { internal, setAtPath } from '@legendapp/state';
import type { ObservablePersistPlugin, PersistMetadata, PersistOptions } from '@legendapp/state/sync';
import { MMKV, MMKVConfiguration } from 'react-native-mmkv';

const symbolDefault = Symbol();
const MetadataSuffix = '__m';

const { safeParse, safeStringify } = internal;

export class ObservablePersistMMKV implements ObservablePersistPlugin {
    private data: Record<string, any> = {};
    private storages = new Map<symbol | string, MMKV>([
        [
            symbolDefault,
            new MMKV({
                id: `obsPersist`,
            }),
        ],
    ]);
    private configuration: MMKVConfiguration;

    constructor(configuration: MMKVConfiguration) {
        this.configuration = configuration;
    }
    // Gets
    public getTable<T = any>(table: string, init: object, config: PersistOptions): T {
        const storage = this.getStorage(config);
        if (this.data[table] === undefined) {
            try {
                const value = storage.getString(table);
                this.data[table] = value ? safeParse(value) : init;
            } catch {
                console.error('[legend-state] MMKV failed to parse', table);
            }
        }
        return this.data[table];
    }
    public getMetadata(table: string, config: PersistOptions): PersistMetadata {
        return this.getTable(table + MetadataSuffix, {}, config);
    }
    // Sets
    public set(table: string, changes: Change[], config: PersistOptions) {
        if (!this.data[table]) {
            this.data[table] = {};
        }
        for (let i = 0; i < changes.length; i++) {
            const { path, valueAtPath, pathTypes } = changes[i];
            this.data[table] = setAtPath(this.data[table], path as string[], pathTypes, valueAtPath);
        }
        this.save(table, config);
    }
    public setMetadata(table: string, metadata: PersistMetadata, config: PersistOptions) {
        return this.setValue(table + MetadataSuffix, metadata, config);
    }
    public deleteTable(table: string, config: PersistOptions): void {
        const storage = this.getStorage(config);
        delete this.data[table];
        storage.delete(table);
    }
    public deleteMetadata(table: string, config: PersistOptions) {
        this.deleteTable(table + MetadataSuffix, config);
    }
    // Private
    private getStorage(config: PersistOptions): MMKV {
        const configuration = config.mmkv || this.configuration;
        if (configuration) {
            const key = JSON.stringify(configuration);
            let storage = this.storages.get(key);
            if (!storage) {
                storage = new MMKV(configuration);
                this.storages.set(key, storage);
            }
            return storage;
        } else {
            return this.storages.get(symbolDefault)!;
        }
    }
    private async setValue(table: string, value: any, config: PersistOptions) {
        this.data[table] = value;
        this.save(table, config);
    }
    private save(table: string, config: PersistOptions) {
        const storage = this.getStorage(config);
        const v = this.data[table];
        if (v !== undefined) {
            try {
                storage.set(table, safeStringify(v));
            } catch (err) {
                console.error(err);
            }
        } else {
            storage.delete(table);
        }
    }
}

export function observablePersistMMKV(configuration: MMKVConfiguration) {
    return new ObservablePersistMMKV(configuration);
}



================================================
FILE: src/react/Computed.tsx
================================================
import { computeSelector } from '@legendapp/state';
import { ReactElement, ReactNode } from 'react';
import type { ObservableParam } from '@legendapp/state';
import { useSelector } from './useSelector';

export function Computed({ children }: { children: ObservableParam | (() => ReactNode) }): ReactElement {
    return useSelector(() => computeSelector(computeSelector(children)), { skipCheck: true }) as ReactElement;
}



================================================
FILE: src/react/configureReactive.ts
================================================
import { ComponentClass, FC } from 'react';
import { BindKeys } from './reactInterfaces';

export const ReactiveFns = new Map<string, FC | ComponentClass>();
export const ReactiveFnBinders = new Map<string, BindKeys>();

export function configureReactive({
    components,
    binders,
}: {
    components?: Record<string, FC | ComponentClass<any>>;
    binders?: Record<string, BindKeys>;
}) {
    if (components) {
        for (const key in components) {
            ReactiveFns.set(key, components[key]);
        }
    }
    if (binders) {
        for (const key in binders) {
            ReactiveFnBinders.set(key, binders[key]);
        }
    }
}



================================================
FILE: src/react/For.tsx
================================================
import type { Observable, ObservableObject, ObservableParam } from '@legendapp/state';
import { internal, isArray, isFunction, isMap } from '@legendapp/state';
import { FC, ReactElement, createElement, memo, useMemo, useRef } from 'react';
import { observer } from './reactive-observer';
import { useSelector } from './useSelector';
const { findIDKey, getNode, optimized } = internal;

const autoMemoCache = new Map<FC<any>, FC<any>>();

type ForItemProps<T, TProps = {}> = {
    item$: Observable<T>;
    id?: string;
} & TProps;

export function For<T, TProps>({
    each,
    optimized: isOptimized,
    item,
    itemProps,
    sortValues,
    children,
}: {
    each?: ObservableParam<T[] | Record<any, T> | Map<any, T>>;
    optimized?: boolean;
    item?: FC<ForItemProps<T, TProps>>;
    itemProps?: TProps;
    sortValues?: (A: T, B: T, AKey: string, BKey: string) => number;
    children?: (value: Observable<T>, id: string | undefined) => ReactElement;
}): ReactElement | null {
    if (!each) return null;

    // Get the raw value with a shallow listener so this list only re-renders
    // when the array length changes
    const value = useSelector(() => each!.get(isOptimized ? optimized : true));

    // The child function gets wrapped in a memoized observer component
    if (!item && children) {
        // Update the ref so the generated component uses the latest function
        const refChildren = useRef<(value: Observable<T>, id: string | undefined) => ReactElement>();
        refChildren.current = children;

        item = useMemo(() => observer(({ item$, id }) => refChildren.current!(item$, id)), []);
    } else {
        // @ts-expect-error $$typeof is private
        if (item.$$typeof !== Symbol.for('react.memo')) {
            let memod = autoMemoCache.get(item!);
            if (!memod) {
                memod = memo(item!);
                autoMemoCache.set(item!, memod);
            }
            item = memod;
        }
    }

    // This early out needs to be after any hooks
    if (!value) return null;

    // Create the child elements
    const out: ReactElement[] = [];

    const isArr = isArray(value);

    if (isArr) {
        // Get the appropriate id field
        const v0 = value[0] as any;
        const node = getNode(each!);
        const length = (value as any[]).length;

        const idField =
            length > 0
                ? (node && findIDKey(v0, node)) ||
                  (v0.id !== undefined ? 'id' : v0.key !== undefined ? 'key' : undefined)
                : undefined;

        const isIdFieldFunction = isFunction(idField);

        for (let i = 0; i < length; i++) {
            if (value[i]) {
                const val = value[i];
                const key = (isIdFieldFunction ? idField(val) : (val as Record<string, any>)[idField as string]) ?? i;
                const item$ = (each as Observable<any[]>)[i];
                // TODOV3 Remove item
                const props: ForItemProps<any> & { key: string; item: Observable<any> } = {
                    key,
                    id: key,
                    item$,
                    item: item$,
                };

                out.push(createElement(item as FC, itemProps ? Object.assign(props, itemProps) : props));
            }
        }
    } else {
        // Render the values of the object / Map
        const asMap = isMap(value);
        const keys = asMap ? Array.from(value.keys()) : Object.keys(value);
        if (sortValues) {
            keys.sort((A, B) => sortValues(asMap ? value.get(A)! : value[A], asMap ? value.get(B)! : value[B], A, B));
        }
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (asMap ? value.get(key) : value[key]) {
                const item$ = asMap ? each!.get(key) : (each as ObservableObject<Record<string, any>>)[key];
                const props: ForItemProps<any> & { key: string; item: Observable<any> } = {
                    key,
                    id: key,
                    item$,
                    item: item$,
                };
                out.push(createElement(item as FC, itemProps ? Object.assign(props, itemProps) : props));
            }
        }
    }

    return out as unknown as ReactElement;
}



================================================
FILE: src/react/Memo.tsx
================================================
import { memo, ReactElement, NamedExoticComponent, ComponentProps } from 'react';
import { Computed } from './Computed';

type ComputedWithMemo = (params: {
    children: ComponentProps<typeof Computed>['children'];
    scoped?: boolean;
}) => ReactElement;

export const Memo = memo(Computed as ComputedWithMemo, (prev, next) =>
    next.scoped ? prev.children === next.children : true,
) as NamedExoticComponent<{
    children: any;
    scoped?: boolean;
}>;



================================================
FILE: src/react/react-globals.ts
================================================
export const reactGlobals = {
    inObserver: false,
};



================================================
FILE: src/react/reactInterfaces.ts
================================================
import type { GetOptions, Observable, Selector } from '@legendapp/state';
import type { FC, LegacyRef, ReactNode } from 'react';

export type ShapeWithNew$<T> = Partial<Omit<T, 'children'>> & {
    [K in keyof T as K extends `$${string & K}` ? K : `$${string & K}`]?: Selector<T[K]>;
} & { children?: Selector<ReactNode> };

export interface BindKey<P, K extends keyof P = keyof P> {
    handler?: K;
    getValue?: P[K] extends infer T
        ? T extends (...args: any) => any
            ? (params: Parameters<T>[0]) => any
            : (e: any) => any
        : (e: any) => any;
    defaultValue?: any;
    selector?: (propsOut: Record<string, any>, p: Observable<any>) => any;
}

export type BindKeys<P = any, K extends keyof P = keyof P> = Partial<Record<K, BindKey<P>>>;

export type FCReactiveObject<T> = {
    [K in keyof T]: FC<ShapeWithNew$<T[K]>>;
};

export type FCReactive<P, P2> = P &
    FC<
        ShapeWithNew$<P2> & {
            ref?: LegacyRef<P> | undefined;
        }
    >;

export interface UseSelectorOptions extends GetOptions {
    suspense?: boolean;
    skipCheck?: boolean;
}



================================================
FILE: src/react/reactive-observer.tsx
================================================
import * as React from 'react';
import { isFunction, isObservable, Selector } from '@legendapp/state';
import { ChangeEvent, ComponentClass, FC, forwardRef, memo, useCallback } from 'react';
import { reactGlobals } from './react-globals';
import type { BindKeys } from './reactInterfaces';
import { useSelector } from './useSelector';

export type ShapeWithPick$<T, T2 extends keyof T = keyof T> = Partial<T> & {
    [K in T2 as K extends `$${string & K}` ? K : `$${string & K}`]?: Selector<T[K]>;
};
export type ShapeWith$<T> = Partial<T> & {
    [K in keyof T as K extends `$${string & K}` ? K : `$${string & K}`]?: Selector<T[K]>;
};
export type ObjectShapeWith$<T> = {
    [K in keyof T]: T[K] extends FC<infer P> ? FC<ShapeWith$<P>> : T[K];
};
export type ExtractFCPropsType<T> = T extends FC<infer P> ? P : never;

export type ReactifyProps<T, K extends keyof T> = Omit<T, K> & {
    [P in K]: Selector<T[P]>;
};

// Extracting the forwardRef inspired by https://github.com/mobxjs/mobx/blob/main/packages/mobx-react-lite/src/observer.ts
export const hasSymbol = /* @__PURE__ */ typeof Symbol === 'function' && Symbol.for;

let didWarnProps = false;

// TODOV2: Change bindKeys to an options object, where one of the options is "convertChildren" so that behavior can be optional
function createReactiveComponent<P = object>(
    component: FC<P> | ComponentClass<P>,
    observe: boolean,
    reactive?: boolean,
    keysReactive?: (string | number | symbol)[] | undefined | null,
    // TODO: I don't like this any type but not sure how to fix it. It's internal so not a big deal.
    bindKeys?: BindKeys<any>,
) {
    const ReactForwardRefSymbol = hasSymbol
        ? Symbol.for('react.forward_ref')
        : // eslint-disable-next-line react/display-name, @typescript-eslint/no-unused-vars
          typeof forwardRef === 'function' && forwardRef((props: any) => null)['$$typeof'];

    const ReactMemoSymbol = hasSymbol
        ? Symbol.for('react.memo')
        : // eslint-disable-next-line react/display-name, @typescript-eslint/no-unused-vars
          typeof forwardRef === 'function' && memo((props) => null)['$$typeof'];

    // If this component is already reactive bail out early
    // This can happen with Fast Refresh.
    if ((component as any)['__legend_proxied']) return component;

    let useForwardRef = false;
    let useMemo = false;
    let render = component;

    // Unwrap memo on the component
    if (ReactMemoSymbol && (render as any)['$$typeof'] === ReactMemoSymbol && (render as any)['type']) {
        useMemo = true;
        render = (render as any)['type'];
    }
    // Unwrap forwardRef on the component
    if (ReactForwardRefSymbol && (render as any)['$$typeof'] === ReactForwardRefSymbol) {
        useForwardRef = true;
        render = (render as any)['render'];
        if (process.env.NODE_ENV === 'development' && typeof render !== 'function') {
            throw new Error(`[legend-state] \`render\` property of ForwardRef was not a function`);
        }
    }

    const keysReactiveSet = keysReactive ? new Set(keysReactive) : undefined;

    const proxyHandler: ProxyHandler<any> = {
        apply(target, thisArg, argArray) {
            // If this is a reactive component, convert all props ending in $
            // to regular props and set up a useSelector listener
            if (reactive) {
                const props = argArray[0];
                const propsOut = {} as Record<string, any>;
                const keys = Object.keys(props);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const p = props[key];

                    const isReactiveKey = keysReactiveSet && keysReactiveSet.has(key);

                    // Convert children if it's a function
                    if (key === 'children' && (isFunction(p) || isObservable(p))) {
                        props[key] = useSelector(p, { skipCheck: true });
                    }
                    // Convert reactive props
                    else if (isReactiveKey || key.startsWith('$') || key.endsWith('$')) {
                        // TODOV3 Add this warning
                        // TODOV4 Remove the deprecated endsWith option
                        if (process.env.NODE_ENV === 'development' && !didWarnProps && key.endsWith('$')) {
                            didWarnProps = true;
                            console.warn(
                                `[legend-state] Reactive props were changed to start with $ instead of end with $ in version 2.0. So please change ${key} to $${key.replace(
                                    '$',
                                    '',
                                )}. See https://legendapp.com/open-source/state/migrating for more details.`,
                            );
                        }
                        const k = isReactiveKey ? key : key.endsWith('$') ? key.slice(0, -1) : key.slice(1);
                        // Return raw value and listen to the selector for changes

                        const bind = bindKeys?.[k as keyof P];
                        const shouldBind = bind && isObservable(p);

                        propsOut[k] = shouldBind && bind?.selector ? bind.selector(propsOut, p) : useSelector(p);

                        // If this key is one of the bind keys set up a two-way binding
                        if (shouldBind) {
                            // Use the bind's defaultValue if value is undefined
                            if (bind.defaultValue !== undefined && propsOut[k] === undefined) {
                                propsOut[k] = bind.defaultValue;
                            }

                            if (bind.handler && bind.getValue) {
                                // Hook up the change handler
                                const handlerFn = (e: ChangeEvent) => {
                                    p.set(bind.getValue!(e));
                                    props[bind.handler!]?.(e);
                                };

                                (propsOut[bind.handler as string] as any) =
                                    // If in development mode, don't memoize the handler. fix fast refresh bug
                                    process.env.NODE_ENV === 'development'
                                        ? handlerFn
                                        : useCallback(handlerFn, [props[bind.handler], bindKeys]);
                            }
                        }

                        if (!isReactiveKey) {
                            // Delete the reactive key
                            delete propsOut[key];
                        }
                    } else if (propsOut[key] === undefined) {
                        propsOut[key] = p;
                    }
                }
                argArray[0] = propsOut;
            }

            // If observing wrap the whole render in a useSelector to listen to it
            if (observe) {
                return useSelector(
                    () => {
                        reactGlobals.inObserver = true;
                        try {
                            return Reflect.apply(target, thisArg, argArray);
                        } finally {
                            reactGlobals.inObserver = false;
                        }
                    },
                    { skipCheck: true },
                );
            } else {
                return Reflect.apply(target, thisArg, argArray);
            }
        },
    };

    const proxy = new Proxy(render, proxyHandler);

    let ret;

    if (useForwardRef) {
        ret = forwardRef(proxy);
        (ret as any)['__legend_proxied'] = true;
    } else {
        ret = proxy;
    }

    return observe || useMemo ? memo(ret) : ret;
}

export function observer<P extends FC<any>>(component: P): P {
    return createReactiveComponent(component, true);
}

// With empty keys
export function reactive<T extends object>(
    component: React.ComponentClass<T>,
    keys: undefined | null,
    bindKeys?: BindKeys<T>,
): React.FC<ShapeWith$<T>>;
export function reactive<T extends object>(
    component: React.FC<T>,
    keys: undefined | null,
    bindKeys?: BindKeys<T>,
): React.FC<ShapeWith$<T>>;
export function reactive<T extends object>(
    component: React.ForwardRefExoticComponent<T>,
    keys: undefined | null,
    bindKeys?: BindKeys<T>,
): React.ForwardRefExoticComponent<ShapeWith$<T>>;
// With keys
export function reactive<T extends object, K extends keyof T>(
    component: React.FC<T>,
    keys: K[] | (keyof T)[],
    bindKeys?: BindKeys<T, K>,
): React.FC<ReactifyProps<T, K>>;
export function reactive<T extends object, K extends keyof T>(
    component: React.ForwardRefExoticComponent<T>,
    keys: K[] | (keyof T)[],
    bindKeys?: BindKeys<T, K>,
): React.ForwardRefExoticComponent<ReactifyProps<T, K>>;
// Without keys
export function reactive<T extends object>(component: React.ComponentClass<T>): React.ComponentClass<ShapeWith$<T>>;
export function reactive<T extends object>(component: React.FC<T>): React.FC<ShapeWith$<T>>;
export function reactive<T extends object>(
    component: React.ForwardRefExoticComponent<T>,
): React.ForwardRefExoticComponent<ShapeWith$<T>>;
// Implementation
export function reactive<T extends object, K extends keyof T>(
    component: React.FC<T> | React.ForwardRefExoticComponent<T> | React.ComponentClass<T>,
    keys?: K[] | undefined | null,
    bindKeys?: BindKeys<T, K>,
): React.FC<ReactifyProps<T, K>> | React.ForwardRefExoticComponent<ReactifyProps<T, K>> | React.ComponentClass<T> {
    return createReactiveComponent(component, false, true, keys, bindKeys);
}

// With empty keys
export function reactiveObserver<T extends object>(
    component: React.FC<T>,
    keys: undefined | null,
    bindKeys?: BindKeys<T>,
): React.FC<ShapeWith$<T>>;
export function reactiveObserver<T extends object>(
    component: React.ForwardRefExoticComponent<T>,
    keys: undefined | null,
    bindKeys?: BindKeys<T>,
): React.ForwardRefExoticComponent<ShapeWith$<T>>;
// With keys
export function reactiveObserver<T extends object, K extends keyof T>(
    component: React.FC<T>,
    keys: K[] | (keyof T)[],
    bindKeys?: BindKeys<T, K>,
): React.FC<ReactifyProps<T, K>>;
export function reactiveObserver<T extends object, K extends keyof T>(
    component: React.ForwardRefExoticComponent<T>,
    keys: K[] | (keyof T)[],
    bindKeys?: BindKeys<T, K>,
): React.ForwardRefExoticComponent<ReactifyProps<T, K>>;
// Without keys
export function reactiveObserver<T extends object>(component: React.FC<T>): React.FC<ShapeWith$<T>>;
export function reactiveObserver<T extends object>(
    component: React.ForwardRefExoticComponent<T>,
): React.ForwardRefExoticComponent<ShapeWith$<T>>;
// Implementation
export function reactiveObserver<T extends object, K extends keyof T>(
    component: React.FC<T> | React.ForwardRefExoticComponent<T>,
    keys?: K[] | undefined | null,
    bindKeys?: BindKeys<T, K>,
): React.FC<ReactifyProps<T, K>> | React.ForwardRefExoticComponent<ReactifyProps<T, K>> {
    return createReactiveComponent(component, true, true, keys, bindKeys);
}

export function reactiveComponents<P extends Record<string, any>>(components: P): ObjectShapeWith$<P> {
    return new Proxy(
        {},
        {
            get(target: Record<string, any>, p: string) {
                if (!target[p] && components[p]) {
                    target[p] = createReactiveComponent(components[p], false, true) as FC<ShapeWith$<P>>;
                }

                return target[p];
            },
        },
    ) as ObjectShapeWith$<P>;
}



================================================
FILE: src/react/Reactive.tsx
================================================
import { isEmpty, isFunction } from '@legendapp/state';
import { enableReactive } from '@legendapp/state/react-reactive/enableReactive';
import { FC, createElement, forwardRef } from 'react';
import { configureReactive, ReactiveFnBinders, ReactiveFns } from './configureReactive';
import { reactive } from './reactive-observer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IReactive {}

export const Reactive: IReactive = new Proxy(
    {},
    {
        get(target: Record<string, FC>, p: string) {
            if (!target[p]) {
                const Component = ReactiveFns.get(p) || p;

                // Create a wrapper around createElement with the string so we can proxy it
                // eslint-disable-next-line react/display-name
                const render = forwardRef((props, ref) => {
                    const propsOut = { ...props } as any;
                    if (ref && (isFunction(ref) || !isEmpty(ref))) {
                        propsOut.ref = ref;
                    }
                    return createElement(Component, propsOut);
                });

                target[p] = reactive(render, [], ReactiveFnBinders.get(p));
            }
            return target[p];
        },
    },
) as unknown as IReactive;

if (process.env.NODE_ENV !== 'test') {
    enableReactive(configureReactive);
}



================================================
FILE: src/react/Show.tsx
================================================
import type { Observable, Selector } from '@legendapp/state';
import { isFunction, isObservableValueReady } from '@legendapp/state';
import { FC, ReactElement, ReactNode, createElement } from 'react';
import { useSelector } from './useSelector';

interface PropsIf<T> {
    if: Selector<T>;
    ifReady?: never;
}
interface PropsIfReady<T> {
    if?: never;
    ifReady: Selector<T>;
}

interface PropsBase<T> {
    else?: ReactNode | (() => ReactNode);
    $value?: Observable<T>;
    wrap?: FC<{ children: ReactNode }>;
    children: ReactNode | ((value?: T) => ReactNode);
}

type Props<T> = PropsBase<T> & (PropsIf<T> | PropsIfReady<T>);

export function Show<T>(props: Props<T>): ReactElement;
export function Show<T>({ if: if_, ifReady, else: else_, $value, wrap, children }: Props<T>): ReactElement {
    const value = useSelector(if_ ?? ifReady);
    const show = ifReady !== undefined ? isObservableValueReady(value) : value;
    const child = useSelector(
        show
            ? isFunction(children)
                ? () => children($value ? $value.get() : value)
                : (children as any)
            : (else_ ?? null),
        { skipCheck: true },
    );

    return wrap ? createElement(wrap, undefined, child) : child;
}



================================================
FILE: src/react/Switch.tsx
================================================
import type { Selector } from '@legendapp/state';
import { ReactElement, ReactNode } from 'react';
import { useSelector } from './useSelector';

export function Switch<T extends object>({
    value,
    children,
}: {
    value?: Selector<T>;
    children: Partial<Record<keyof T | 'null' | 'undefined' | 'default', () => ReactNode>>;
}): ReactElement | null;
export function Switch<T extends string | number | symbol>({
    value,
    children,
}: {
    value?: Selector<T | undefined | null>;
    children: Partial<Record<T | 'null' | 'undefined' | 'default', () => ReactNode>>;
}): ReactElement | null;
export function Switch<T extends boolean>({
    value,
    children,
}: {
    value?: Selector<T | undefined | null>;
    children: Partial<Record<'false' | 'true' | 'null' | 'undefined' | 'default', () => ReactNode>>;
}): ReactElement | null;
export function Switch<T>({
    value,
    children,
}: {
    value?: Selector<T>;
    children: Partial<Record<'undefined' | 'default', () => ReactNode>>;
}): ReactElement | null;
export function Switch<T>({
    value,
    children,
}: {
    value?: Selector<T>;
    children: Partial<Record<any, () => ReactNode>>;
}): ReactNode {
    // Select from an object of cases
    const child = children[useSelector(value)!];
    return (child ? child() : children['default']?.()) ?? null;
}



================================================
FILE: src/react/useComputed.ts
================================================
import { isArray, linked, Observable, ObservableParam } from '@legendapp/state';
import { useObservable } from './useObservable';

// TODO: Deprecate this?
export function useComputed<T>(get: () => T | Promise<T>): Observable<T>;
export function useComputed<T>(get: () => T | Promise<T>, deps: any[]): Observable<T>;
export function useComputed<T, T2 = T>(
    get: (() => T | Promise<T>) | ObservableParam<T>,
    set: (value: T2) => void,
): Observable<T>;
export function useComputed<T, T2 = T>(
    get: (() => T | Promise<T>) | ObservableParam<T>,
    set: (value: T2) => void,
    deps: any[],
): Observable<T>;
export function useComputed<T, T2 = T>(
    get: (() => T | Promise<T>) | ObservableParam<T>,
    set?: ((value: T2) => void) | any[],
    deps?: any[],
): Observable<T> {
    if (!deps && isArray(set)) {
        deps = set;
        set = undefined;
    }
    return useObservable<T>(
        set ? (linked({ get: get as () => T, set: ({ value }) => (set as (value: any) => void)(value) }) as any) : get,
        deps,
    );
}



================================================
FILE: src/react/useEffectOnce.ts
================================================
import { isFunction } from '@legendapp/state';
import { useEffect, useRef } from 'react';

export const useEffectOnce = (effect: () => void | (() => void), deps: any[]) => {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        const refDispose = useRef<{ dispose?: void | (() => void); num: number }>({ num: 0 });

        useEffect(() => {
            // This is a hack to work around StrictMode running effects twice.
            // On the first run it returns a cleanup function that queues the dispose function
            // in a microtask. This way it will run at the end of the frame after StrictMode's second
            // run of the effect. If it's run a second time then the microtasked dispose will do nothing,
            // but the effect will return the dispose again so that when it actually unmounts it will dispose.
            // If not in StrictMode, then the dispose function will run in the microtask.
            // It's possible that this is not safe in 100% of cases, but I'm not sure what the
            // dangerous cases would be. The side effect is that the listener is still active
            // until the end of the frame, but that's probably not a problem.
            const { current } = refDispose;
            current.num++;
            const dispose = () => {
