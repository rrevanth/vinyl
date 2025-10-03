Directory structure:
└── docs/
    ├── config.json
    ├── eslint/
    │   ├── eslint-plugin-query.md
    │   ├── exhaustive-deps.md
    │   ├── infinite-query-property-order.md
    │   ├── no-rest-destructuring.md
    │   ├── no-unstable-deps.md
    │   ├── no-void-query-fn.md
    │   └── stable-query-client.md
    ├── framework/
    │   ├── angular/
    │   │   ├── angular-httpclient-and-other-data-fetching-clients.md
    │   │   ├── devtools.md
    │   │   ├── installation.md
    │   │   ├── overview.md
    │   │   ├── quick-start.md
    │   │   ├── typescript.md
    │   │   ├── zoneless.md
    │   │   ├── guides/
    │   │   │   ├── background-fetching-indicators.md
    │   │   │   ├── caching.md
    │   │   │   ├── default-query-function.md
    │   │   │   ├── dependent-queries.md
    │   │   │   ├── disabling-queries.md
    │   │   │   ├── does-this-replace-client-state.md
    │   │   │   ├── filters.md
    │   │   │   ├── important-defaults.md
    │   │   │   ├── infinite-queries.md
    │   │   │   ├── initial-query-data.md
    │   │   │   ├── invalidations-from-mutations.md
    │   │   │   ├── mutation-options.md
    │   │   │   ├── mutations.md
    │   │   │   ├── network-mode.md
    │   │   │   ├── optimistic-updates.md
    │   │   │   ├── paginated-queries.md
    │   │   │   ├── parallel-queries.md
    │   │   │   ├── placeholder-query-data.md
    │   │   │   ├── queries.md
    │   │   │   ├── query-cancellation.md
    │   │   │   ├── query-functions.md
    │   │   │   ├── query-invalidation.md
    │   │   │   ├── query-keys.md
    │   │   │   ├── query-options.md
    │   │   │   ├── query-retries.md
    │   │   │   ├── scroll-restoration.md
    │   │   │   └── window-focus-refetching.md
    │   │   └── reference/
    │   │       ├── index.md
    │   │       ├── functions/
    │   │       │   ├── infinitequeryoptions.md
    │   │       │   ├── injectinfinitequery.md
    │   │       │   ├── injectisfetching.md
    │   │       │   ├── injectismutating.md
    │   │       │   ├── injectisrestoring.md
    │   │       │   ├── injectmutation.md
    │   │       │   ├── injectmutationstate.md
    │   │       │   ├── injectqueries.md
    │   │       │   ├── injectquery.md
    │   │       │   ├── injectqueryclient.md
    │   │       │   ├── mutationoptions.md
    │   │       │   ├── provideisrestoring.md
    │   │       │   ├── providequeryclient.md
    │   │       │   ├── providetanstackquery.md
    │   │       │   ├── queryfeature.md
    │   │       │   ├── queryoptions.md
    │   │       │   └── withdevtools.md
    │   │       ├── interfaces/
    │   │       │   ├── basemutationnarrowing.md
    │   │       │   ├── basequerynarrowing.md
    │   │       │   ├── createbasequeryoptions.md
    │   │       │   ├── createinfinitequeryoptions.md
    │   │       │   ├── createmutationoptions.md
    │   │       │   ├── createqueryoptions.md
    │   │       │   ├── devtoolsoptions.md
    │   │       │   ├── injectinfinitequeryoptions.md
    │   │       │   ├── injectisfetchingoptions.md
    │   │       │   ├── injectismutatingoptions.md
    │   │       │   ├── injectmutationoptions.md
    │   │       │   ├── injectmutationstateoptions.md
    │   │       │   ├── injectqueryoptions.md
    │   │       │   └── queryfeature.md
    │   │       ├── type-aliases/
    │   │       │   ├── createbasemutationresult.md
    │   │       │   ├── createbasequeryresult.md
    │   │       │   ├── createinfinitequeryresult.md
    │   │       │   ├── createmutateasyncfunction.md
    │   │       │   ├── createmutatefunction.md
    │   │       │   ├── createmutationresult.md
    │   │       │   ├── createqueryresult.md
    │   │       │   ├── definedcreateinfinitequeryresult.md
    │   │       │   ├── definedcreatequeryresult.md
    │   │       │   ├── definedinitialdatainfiniteoptions.md
    │   │       │   ├── definedinitialdataoptions.md
    │   │       │   ├── developertoolsfeature.md
    │   │       │   ├── persistqueryclientfeature.md
    │   │       │   ├── queriesoptions.md
    │   │       │   ├── queriesresults.md
    │   │       │   ├── queryfeaturekind.md
    │   │       │   ├── queryfeatures.md
    │   │       │   ├── undefinedinitialdatainfiniteoptions.md
    │   │       │   ├── undefinedinitialdataoptions.md
    │   │       │   ├── unusedskiptokeninfiniteoptions.md
    │   │       │   └── unusedskiptokenoptions.md
    │   │       └── variables/
    │   │           └── queryfeatures.md
    │   ├── react/
    │   │   ├── comparison.md
    │   │   ├── devtools.md
    │   │   ├── graphql.md
    │   │   ├── installation.md
    │   │   ├── overview.md
    │   │   ├── quick-start.md
    │   │   ├── react-native.md
    │   │   ├── typescript.md
    │   │   ├── videos.md
    │   │   ├── community/
    │   │   │   ├── community-projects.md
    │   │   │   └── tkdodos-blog.md
    │   │   ├── guides/
    │   │   │   ├── advanced-ssr.md
    │   │   │   ├── background-fetching-indicators.md
    │   │   │   ├── caching.md
    │   │   │   ├── default-query-function.md
    │   │   │   ├── dependent-queries.md
    │   │   │   ├── disabling-queries.md
    │   │   │   ├── does-this-replace-client-state.md
    │   │   │   ├── filters.md
    │   │   │   ├── important-defaults.md
    │   │   │   ├── infinite-queries.md
    │   │   │   ├── initial-query-data.md
    │   │   │   ├── invalidations-from-mutations.md
    │   │   │   ├── migrating-to-react-query-3.md
    │   │   │   ├── migrating-to-react-query-4.md
    │   │   │   ├── migrating-to-v5.md
    │   │   │   ├── mutations.md
    │   │   │   ├── network-mode.md
    │   │   │   ├── optimistic-updates.md
    │   │   │   ├── paginated-queries.md
    │   │   │   ├── parallel-queries.md
    │   │   │   ├── placeholder-query-data.md
    │   │   │   ├── prefetching.md
    │   │   │   ├── queries.md
    │   │   │   ├── query-cancellation.md
    │   │   │   ├── query-functions.md
    │   │   │   ├── query-invalidation.md
    │   │   │   ├── query-keys.md
    │   │   │   ├── query-options.md
    │   │   │   ├── query-retries.md
    │   │   │   ├── render-optimizations.md
    │   │   │   ├── request-waterfalls.md
    │   │   │   ├── scroll-restoration.md
    │   │   │   ├── ssr.md
    │   │   │   ├── suspense.md
    │   │   │   ├── testing.md
    │   │   │   ├── updates-from-mutation-responses.md
    │   │   │   └── window-focus-refetching.md
    │   │   ├── plugins/
    │   │   │   ├── broadcastQueryClient.md
    │   │   │   ├── createAsyncStoragePersister.md
    │   │   │   ├── createPersister.md
    │   │   │   ├── createSyncStoragePersister.md
    │   │   │   └── persistQueryClient.md
    │   │   └── reference/
    │   │       ├── hydration.md
    │   │       ├── infiniteQueryOptions.md
    │   │       ├── mutationOptions.md
    │   │       ├── QueryClientProvider.md
    │   │       ├── QueryErrorResetBoundary.md
    │   │       ├── queryOptions.md
    │   │       ├── useInfiniteQuery.md
    │   │       ├── useIsFetching.md
    │   │       ├── useIsMutating.md
    │   │       ├── useMutation.md
    │   │       ├── useMutationState.md
    │   │       ├── usePrefetchInfiniteQuery.md
    │   │       ├── usePrefetchQuery.md
    │   │       ├── useQueries.md
    │   │       ├── useQuery.md
    │   │       ├── useQueryClient.md
    │   │       ├── useQueryErrorResetBoundary.md
    │   │       ├── useSuspenseInfiniteQuery.md
    │   │       ├── useSuspenseQueries.md
    │   │       └── useSuspenseQuery.md
    │   ├── solid/
    │   │   ├── devtools.md
    │   │   ├── installation.md
    │   │   ├── overview.md
    │   │   ├── quick-start.md
    │   │   ├── typescript.md
    │   │   ├── community/
    │   │   │   ├── community-projects.md
    │   │   │   └── tkdodos-blog.md
    │   │   ├── guides/
    │   │   │   ├── advanced-ssr.md
    │   │   │   ├── background-fetching-indicators.md
    │   │   │   ├── caching.md
    │   │   │   ├── default-query-function.md
    │   │   │   ├── dependent-queries.md
    │   │   │   ├── disabling-queries.md
    │   │   │   ├── does-this-replace-client-state.md
    │   │   │   ├── filters.md
    │   │   │   ├── important-defaults.md
    │   │   │   ├── infinite-queries.md
    │   │   │   ├── initial-query-data.md
    │   │   │   ├── invalidations-from-mutations.md
    │   │   │   ├── mutations.md
    │   │   │   ├── network-mode.md
    │   │   │   ├── optimistic-updates.md
    │   │   │   ├── paginated-queries.md
    │   │   │   ├── parallel-queries.md
    │   │   │   ├── placeholder-query-data.md
    │   │   │   ├── prefetching.md
    │   │   │   ├── queries.md
    │   │   │   ├── query-cancellation.md
    │   │   │   ├── query-functions.md
    │   │   │   ├── query-invalidation.md
    │   │   │   ├── query-keys.md
    │   │   │   ├── query-options.md
    │   │   │   ├── query-retries.md
    │   │   │   ├── request-waterfalls.md
    │   │   │   ├── scroll-restoration.md
    │   │   │   ├── ssr.md
    │   │   │   ├── suspense.md
    │   │   │   ├── testing.md
    │   │   │   ├── updates-from-mutation-responses.md
    │   │   │   └── window-focus-refetching.md
    │   │   ├── plugins/
    │   │   │   ├── broadcastQueryClient.md
    │   │   │   └── createPersister.md
    │   │   └── reference/
    │   │       ├── hydration.md
    │   │       ├── infiniteQueryOptions.md
    │   │       ├── queryOptions.md
    │   │       ├── useInfiniteQuery.md
    │   │       ├── useIsFetching.md
    │   │       ├── useIsMutating.md
    │   │       ├── useMutation.md
    │   │       ├── useMutationState.md
    │   │       ├── useQueries.md
    │   │       └── useQuery.md
    │   ├── svelte/
    │   │   ├── devtools.md
    │   │   ├── installation.md
    │   │   ├── overview.md
    │   │   ├── reactivity.md
    │   │   ├── ssr.md
    │   │   └── reference/
    │   │       ├── index.md
    │   │       ├── functions/
    │   │       │   ├── createinfinitequery.md
    │   │       │   ├── createmutation.md
    │   │       │   ├── createqueries.md
    │   │       │   ├── createquery.md
    │   │       │   ├── getisrestoringcontext.md
    │   │       │   ├── getqueryclientcontext.md
    │   │       │   ├── infinitequeryoptions.md
    │   │       │   ├── queryoptions.md
    │   │       │   ├── setisrestoringcontext.md
    │   │       │   ├── setqueryclientcontext.md
    │   │       │   ├── usehydrate.md
    │   │       │   ├── useisfetching.md
    │   │       │   ├── useismutating.md
    │   │       │   ├── useisrestoring.md
    │   │       │   ├── usemutationstate.md
    │   │       │   └── usequeryclient.md
    │   │       ├── type-aliases/
    │   │       │   ├── createbasemutationresult.md
    │   │       │   ├── createbasequeryoptions.md
    │   │       │   ├── createbasequeryresult.md
    │   │       │   ├── createinfinitequeryoptions.md
    │   │       │   ├── createinfinitequeryresult.md
    │   │       │   ├── createmutateasyncfunction.md
    │   │       │   ├── createmutatefunction.md
    │   │       │   ├── createmutationoptions.md
    │   │       │   ├── createmutationresult.md
    │   │       │   ├── createqueryoptions.md
    │   │       │   ├── createqueryresult.md
    │   │       │   ├── definedcreatebasequeryresult.md
    │   │       │   ├── definedcreatequeryresult.md
    │   │       │   ├── definedinitialdataoptions.md
    │   │       │   ├── hydrationboundary.md
    │   │       │   ├── mutationstateoptions.md
    │   │       │   ├── queriesoptions.md
    │   │       │   ├── queriesresults.md
    │   │       │   ├── storeorval.md
    │   │       │   └── undefinedinitialdataoptions.md
    │   │       └── variables/
    │   │           └── hydrationboundary.md
    │   └── vue/
    │       ├── devtools.md
    │       ├── graphql.md
    │       ├── installation.md
    │       ├── overview.md
    │       ├── quick-start.md
    │       ├── reactivity.md
    │       ├── typescript.md
    │       ├── community/
    │       │   ├── community-projects.md
    │       │   └── tkdodos-blog.md
    │       ├── guides/
    │       │   ├── background-fetching-indicators.md
    │       │   ├── caching.md
    │       │   ├── custom-client.md
    │       │   ├── default-query-function.md
    │       │   ├── dependent-queries.md
    │       │   ├── disabling-queries.md
    │       │   ├── does-this-replace-client-state.md
    │       │   ├── filters.md
    │       │   ├── important-defaults.md
    │       │   ├── infinite-queries.md
    │       │   ├── initial-query-data.md
    │       │   ├── invalidations-from-mutations.md
    │       │   ├── migrating-to-v5.md
    │       │   ├── mutations.md
    │       │   ├── network-mode.md
    │       │   ├── optimistic-updates.md
    │       │   ├── paginated-queries.md
    │       │   ├── parallel-queries.md
    │       │   ├── placeholder-query-data.md
    │       │   ├── prefetching.md
    │       │   ├── queries.md
    │       │   ├── query-cancellation.md
    │       │   ├── query-functions.md
    │       │   ├── query-invalidation.md
    │       │   ├── query-keys.md
    │       │   ├── query-options.md
    │       │   ├── query-retries.md
    │       │   ├── scroll-restoration.md
    │       │   ├── ssr.md
    │       │   ├── suspense.md
    │       │   ├── testing.md
    │       │   ├── updates-from-mutation-responses.md
    │       │   └── window-focus-refetching.md
    │       ├── plugins/
    │       │   ├── broadcastQueryClient.md
    │       │   └── createPersister.md
    │       └── reference/
    │           ├── hydration.md
    │           ├── infiniteQueryOptions.md
    │           ├── queryOptions.md
    │           ├── useInfiniteQuery.md
    │           ├── useIsFetching.md
    │           ├── useIsMutating.md
    │           ├── useMutation.md
    │           ├── useMutationState.md
    │           ├── useQueries.md
    │           ├── useQuery.md
    │           └── useQueryClient.md
    └── reference/
        ├── focusManager.md
        ├── InfiniteQueryObserver.md
        ├── MutationCache.md
        ├── notifyManager.md
        ├── onlineManager.md
        ├── QueriesObserver.md
        ├── QueryCache.md
        ├── QueryClient.md
        ├── QueryObserver.md
        └── streamedQuery.md


Files Content:

(Files content cropped to 300k characters, download full ingest to see more)
================================================
FILE: docs/config.json
================================================
{
  "$schema": "https://raw.githubusercontent.com/TanStack/tanstack.com/main/tanstack-docs-config.schema.json",
  "docSearch": {
    "appId": "20TOVD6LOE",
    "apiKey": "35bc6c51aa322700d1383e17c4f669f4",
    "indexName": "tanstackquery"
  },
  "sections": [
    {
      "label": "Getting Started",
      "children": [],
      "frameworks": [
        {
          "label": "react",
          "children": [
            {
              "label": "Overview",
              "to": "framework/react/overview"
            },
            {
              "label": "Installation",
              "to": "framework/react/installation"
            },
            {
              "label": "Quick Start",
              "to": "framework/react/quick-start"
            },
            {
              "label": "Devtools",
              "to": "framework/react/devtools"
            },
            {
              "label": "Videos & Talks",
              "to": "framework/react/videos"
            },
            {
              "label": "Comparison",
              "to": "framework/react/comparison"
            },
            {
              "label": "TypeScript",
              "to": "framework/react/typescript"
            },
            {
              "label": "GraphQL",
              "to": "framework/react/graphql"
            },
            {
              "label": "React Native",
              "to": "framework/react/react-native"
            }
          ]
        },
        {
          "label": "solid",
          "children": [
            {
              "label": "Overview",
              "to": "framework/solid/overview"
            },
            {
              "label": "Quick Start",
              "to": "framework/solid/quick-start"
            },
            {
              "label": "Installation",
              "to": "framework/solid/installation"
            },
            {
              "label": "Devtools",
              "to": "framework/solid/devtools"
            },
            {
              "label": "TypeScript",
              "to": "framework/solid/typescript"
            }
          ]
        },
        {
          "label": "vue",
          "children": [
            {
              "label": "Overview",
              "to": "framework/vue/overview"
            },
            {
              "label": "Installation",
              "to": "framework/vue/installation"
            },
            {
              "label": "Quick Start",
              "to": "framework/vue/quick-start"
            },
            {
              "label": "Devtools",
              "to": "framework/vue/devtools"
            },
            {
              "label": "TypeScript",
              "to": "framework/vue/typescript"
            },
            {
              "label": "Reactivity",
              "to": "framework/vue/reactivity"
            },
            {
              "label": "GraphQL",
              "to": "framework/vue/graphql"
            }
          ]
        },
        {
          "label": "svelte",
          "children": [
            {
              "label": "Overview",
              "to": "framework/svelte/overview"
            },
            {
              "label": "Installation",
              "to": "framework/svelte/installation"
            },
            {
              "label": "Devtools",
              "to": "framework/svelte/devtools"
            },
            {
              "label": "SSR & SvelteKit",
              "to": "framework/svelte/ssr"
            },
            {
              "label": "Reactivity",
              "to": "framework/svelte/reactivity"
            }
          ]
        },
        {
          "label": "angular",
          "children": [
            {
              "label": "Overview",
              "to": "framework/angular/overview"
            },
            {
              "label": "Installation",
              "to": "framework/angular/installation"
            },
            {
              "label": "Quick Start",
              "to": "framework/angular/quick-start"
            },
            {
              "label": "Angular HttpClient and other data fetching clients",
              "to": "framework/angular/angular-httpclient-and-other-data-fetching-clients"
            },
            {
              "label": "Devtools",
              "to": "framework/angular/devtools"
            },
            {
              "label": "TypeScript",
              "to": "framework/angular/typescript"
            },
            {
              "label": "Zoneless",
              "to": "framework/angular/zoneless"
            }
          ]
        }
      ]
    },
    {
      "label": "Guides & Concepts",
      "children": [],
      "frameworks": [
        {
          "label": "react",
          "children": [
            {
              "label": "Important Defaults",
              "to": "framework/react/guides/important-defaults"
            },
            {
              "label": "Queries",
              "to": "framework/react/guides/queries"
            },
            {
              "label": "Query Keys",
              "to": "framework/react/guides/query-keys"
            },
            {
              "label": "Query Functions",
              "to": "framework/react/guides/query-functions"
            },
            {
              "label": "Query Options",
              "to": "framework/react/guides/query-options"
            },
            {
              "label": "Network Mode",
              "to": "framework/react/guides/network-mode"
            },
            {
              "label": "Parallel Queries",
              "to": "framework/react/guides/parallel-queries"
            },
            {
              "label": "Dependent Queries",
              "to": "framework/react/guides/dependent-queries"
            },
            {
              "label": "Background Fetching Indicators",
              "to": "framework/react/guides/background-fetching-indicators"
            },
            {
              "label": "Window Focus Refetching",
              "to": "framework/react/guides/window-focus-refetching"
            },
            {
              "label": "Disabling/Pausing Queries",
              "to": "framework/react/guides/disabling-queries"
            },
            {
              "label": "Query Retries",
              "to": "framework/react/guides/query-retries"
            },
            {
              "label": "Paginated Queries",
              "to": "framework/react/guides/paginated-queries"
            },
            {
              "label": "Infinite Queries",
              "to": "framework/react/guides/infinite-queries"
            },
            {
              "label": "Initial Query Data",
              "to": "framework/react/guides/initial-query-data"
            },
            {
              "label": "Placeholder Query Data",
              "to": "framework/react/guides/placeholder-query-data"
            },
            {
              "label": "Mutations",
              "to": "framework/react/guides/mutations"
            },
            {
              "label": "Query Invalidation",
              "to": "framework/react/guides/query-invalidation"
            },
            {
              "label": "Invalidation from Mutations",
              "to": "framework/react/guides/invalidations-from-mutations"
            },
            {
              "label": "Updates from Mutation Responses",
              "to": "framework/react/guides/updates-from-mutation-responses"
            },
            {
              "label": "Optimistic Updates",
              "to": "framework/react/guides/optimistic-updates"
            },
            {
              "label": "Query Cancellation",
              "to": "framework/react/guides/query-cancellation"
            },
            {
              "label": "Scroll Restoration",
              "to": "framework/react/guides/scroll-restoration"
            },
            {
              "label": "Filters",
              "to": "framework/react/guides/filters"
            },
            {
              "label": "Performance & Request Waterfalls",
              "to": "framework/react/guides/request-waterfalls"
            },
            {
              "label": "Prefetching & Router Integration",
              "to": "framework/react/guides/prefetching"
            },
            {
              "label": "Server Rendering & Hydration",
              "to": "framework/react/guides/ssr"
            },
            {
              "label": "Advanced Server Rendering",
              "to": "framework/react/guides/advanced-ssr"
            },
            {
              "label": "Caching",
              "to": "framework/react/guides/caching"
            },
            {
              "label": "Render Optimizations",
              "to": "framework/react/guides/render-optimizations"
            },
            {
              "label": "Default Query Fn",
              "to": "framework/react/guides/default-query-function"
            },
            {
              "label": "Suspense",
              "to": "framework/react/guides/suspense"
            },
            {
              "label": "Testing",
              "to": "framework/react/guides/testing"
            },
            {
              "label": "Does this replace [Redux, MobX, etc]?",
              "to": "framework/react/guides/does-this-replace-client-state"
            },
            {
              "label": "Migrating to v3",
              "to": "framework/react/guides/migrating-to-react-query-3"
            },
            {
              "label": "Migrating to v4",
              "to": "framework/react/guides/migrating-to-react-query-4"
            },
            {
              "label": "Migrating to v5",
              "to": "framework/react/guides/migrating-to-v5"
            }
          ]
        },
        {
          "label": "solid",
          "children": [
            {
              "label": "Important Defaults",
              "to": "framework/solid/guides/important-defaults"
            },
            {
              "label": "Queries",
              "to": "framework/solid/guides/queries"
            },
            {
              "label": "Query Keys",
              "to": "framework/solid/guides/query-keys"
            },
            {
              "label": "Query Functions",
              "to": "framework/solid/guides/query-functions"
            },
            {
              "label": "Query Options",
              "to": "framework/solid/guides/query-options"
            },
            {
              "label": "Network Mode",
              "to": "framework/solid/guides/network-mode"
            },
            {
              "label": "Parallel Queries",
              "to": "framework/solid/guides/parallel-queries"
            },
            {
              "label": "Dependent Queries",
              "to": "framework/solid/guides/dependent-queries"
            },
            {
              "label": "Background Fetching Indicators",
              "to": "framework/solid/guides/background-fetching-indicators"
            },
            {
              "label": "Window Focus Refetching",
              "to": "framework/solid/guides/window-focus-refetching"
            },
            {
              "label": "Disabling/Pausing Queries",
              "to": "framework/solid/guides/disabling-queries"
            },
            {
              "label": "Query Retries",
              "to": "framework/solid/guides/query-retries"
            },
            {
              "label": "Paginated Queries",
              "to": "framework/solid/guides/paginated-queries"
            },
            {
              "label": "Infinite Queries",
              "to": "framework/solid/guides/infinite-queries"
            },
            {
              "label": "Initial Query Data",
              "to": "framework/solid/guides/initial-query-data"
            },
            {
              "label": "Placeholder Query Data",
              "to": "framework/solid/guides/placeholder-query-data"
            },
            {
              "label": "Mutations",
              "to": "framework/solid/guides/mutations"
            },
            {
              "label": "Query Invalidation",
              "to": "framework/solid/guides/query-invalidation"
            },
            {
              "label": "Invalidation from Mutations",
              "to": "framework/solid/guides/invalidations-from-mutations"
            },
            {
              "label": "Updates from Mutation Responses",
              "to": "framework/solid/guides/updates-from-mutation-responses"
            },
            {
              "label": "Optimistic Updates",
              "to": "framework/solid/guides/optimistic-updates"
            },
            {
              "label": "Query Cancellation",
              "to": "framework/solid/guides/query-cancellation"
            },
            {
              "label": "Scroll Restoration",
              "to": "framework/solid/guides/scroll-restoration"
            },
            {
              "label": "Filters",
              "to": "framework/solid/guides/filters"
            },
            {
              "label": "Request Waterfalls",
              "to": "framework/solid/guides/request-waterfalls"
            },
            {
              "label": "Prefetching",
              "to": "framework/solid/guides/prefetching"
            },
            {
              "label": "SSR",
              "to": "framework/solid/guides/ssr"
            },
            {
              "label": "Advanced SSR",
              "to": "framework/solid/guides/advanced-ssr"
            },
            {
              "label": "Caching",
              "to": "framework/solid/guides/caching"
            },
            {
              "label": "Default Query Fn",
              "to": "framework/solid/guides/default-query-function"
            },
            {
              "label": "Suspense",
              "to": "framework/solid/guides/suspense"
            },
            {
              "label": "Testing",
              "to": "framework/solid/guides/testing"
            },
            {
              "label": "Does this replace state managers?",
              "to": "framework/solid/guides/does-this-replace-client-state"
            }
          ]
        },
        {
          "label": "vue",
          "children": [
            {
              "label": "Important Defaults",
              "to": "framework/vue/guides/important-defaults"
            },
            {
              "label": "Queries",
              "to": "framework/vue/guides/queries"
            },
            {
              "label": "Query Keys",
              "to": "framework/vue/guides/query-keys"
            },
            {
              "label": "Query Functions",
              "to": "framework/vue/guides/query-functions"
            },
            {
              "label": "Query Options",
              "to": "framework/vue/guides/query-options"
            },
            {
              "label": "Network Mode",
              "to": "framework/vue/guides/network-mode"
            },
            {
              "label": "Parallel Queries",
              "to": "framework/vue/guides/parallel-queries"
            },
            {
              "label": "Dependent Queries",
              "to": "framework/vue/guides/dependent-queries"
            },
            {
              "label": "Background Fetching Indicators",
              "to": "framework/vue/guides/background-fetching-indicators"
            },
            {
              "label": "Window Focus Refetching",
              "to": "framework/vue/guides/window-focus-refetching"
            },
            {
              "label": "Disabling/Pausing Queries",
              "to": "framework/vue/guides/disabling-queries"
            },
            {
              "label": "Query Retries",
              "to": "framework/vue/guides/query-retries"
            },
            {
              "label": "Paginated Queries",
              "to": "framework/vue/guides/paginated-queries"
            },
            {
              "label": "Infinite Queries",
              "to": "framework/vue/guides/infinite-queries"
            },
            {
              "label": "Initial Query Data",
              "to": "framework/vue/guides/initial-query-data"
            },
            {
              "label": "Placeholder Query Data",
              "to": "framework/vue/guides/placeholder-query-data"
            },
            {
              "label": "Mutations",
              "to": "framework/vue/guides/mutations"
            },
            {
              "label": "Query Invalidation",
              "to": "framework/vue/guides/query-invalidation"
            },
            {
              "label": "Invalidation from Mutations",
              "to": "framework/vue/guides/invalidations-from-mutations"
            },
            {
              "label": "Updates from Mutation Responses",
              "to": "framework/vue/guides/updates-from-mutation-responses"
            },
            {
              "label": "Optimistic Updates",
              "to": "framework/vue/guides/optimistic-updates"
            },
            {
              "label": "Query Cancellation",
              "to": "framework/vue/guides/query-cancellation"
            },
            {
              "label": "Scroll Restoration",
              "to": "framework/vue/guides/scroll-restoration"
            },
            {
              "label": "Filters",
              "to": "framework/vue/guides/filters"
            },
            {
              "label": "Prefetching",
              "to": "framework/vue/guides/prefetching"
            },
            {
              "label": "SSR & Nuxt",
              "to": "framework/vue/guides/ssr"
            },
            {
              "label": "Caching",
              "to": "framework/vue/guides/caching"
            },
            {
              "label": "Default Query Fn",
              "to": "framework/vue/guides/default-query-function"
            },
            {
              "label": "Suspense",
              "to": "framework/vue/guides/suspense"
            },
            {
              "label": "Testing",
              "to": "framework/vue/guides/testing"
            },
            {
              "label": "Custom Client",
              "to": "framework/vue/guides/custom-client"
            },
            {
              "label": "Does this replace [Vuex, Pinia]?",
              "to": "framework/vue/guides/does-this-replace-client-state"
            },
            {
              "label": "Migrating to v5",
              "to": "framework/vue/guides/migrating-to-v5"
            }
          ]
        },
        {
          "label": "angular",
          "children": [
            {
              "label": "Important Defaults",
              "to": "framework/angular/guides/important-defaults"
            },
            {
              "label": "Queries",
              "to": "framework/angular/guides/queries"
            },
            {
              "label": "Query Keys",
              "to": "framework/angular/guides/query-keys"
            },
            {
              "label": "Query Functions",
              "to": "framework/angular/guides/query-functions"
            },
            {
              "label": "Query Options",
              "to": "framework/angular/guides/query-options"
            },
            {
              "label": "Network Mode",
              "to": "framework/angular/guides/network-mode"
            },
            {
              "label": "Parallel Queries",
              "to": "framework/angular/guides/parallel-queries"
            },
            {
              "label": "Dependent Queries",
              "to": "framework/angular/guides/dependent-queries"
            },
            {
              "label": "Background Fetching Indicators",
              "to": "framework/angular/guides/background-fetching-indicators"
            },
            {
              "label": "Window Focus Refetching",
              "to": "framework/angular/guides/window-focus-refetching"
            },
            {
              "label": "Disabling/Pausing Queries",
              "to": "framework/angular/guides/disabling-queries"
            },
            {
              "label": "Query Retries",
              "to": "framework/angular/guides/query-retries"
            },
            {
              "label": "Paginated Queries",
              "to": "framework/angular/guides/paginated-queries"
            },
            {
              "label": "Infinite Queries",
              "to": "framework/angular/guides/infinite-queries"
            },
            {
              "label": "Initial Query Data",
              "to": "framework/angular/guides/initial-query-data"
            },
            {
              "label": "Placeholder Query Data",
              "to": "framework/angular/guides/placeholder-query-data"
            },
            {
              "label": "Mutations",
              "to": "framework/angular/guides/mutations"
            },
            {
              "label": "Mutation Options",
              "to": "framework/angular/guides/mutation-options"
            },
            {
              "label": "Query Invalidation",
              "to": "framework/angular/guides/query-invalidation"
            },
            {
              "label": "Invalidation from Mutations",
              "to": "framework/angular/guides/invalidations-from-mutations"
            },
            {
              "label": "Optimistic Updates",
              "to": "framework/angular/guides/optimistic-updates"
            },
            {
              "label": "Query Cancellation",
              "to": "framework/angular/guides/query-cancellation"
            },
            {
              "label": "Scroll Restoration",
              "to": "framework/angular/guides/scroll-restoration"
            },
            {
              "label": "Filters",
              "to": "framework/angular/guides/filters"
            },
            {
              "label": "Caching",
              "to": "framework/angular/guides/caching"
            },
            {
              "label": "Default Query Fn",
              "to": "framework/angular/guides/default-query-function"
            },
            {
              "label": "Does this replace state managers?",
              "to": "framework/angular/guides/does-this-replace-client-state"
            }
          ]
        }
      ]
    },
    {
      "label": "API Reference",
      "children": [
        {
          "label": "QueryClient",
          "to": "reference/QueryClient"
        },
        {
          "label": "QueryCache",
          "to": "reference/QueryCache"
        },
        {
          "label": "MutationCache",
          "to": "reference/MutationCache"
        },
        {
          "label": "QueryObserver",
          "to": "reference/QueryObserver"
        },
        {
          "label": "InfiniteQueryObserver",
          "to": "reference/InfiniteQueryObserver"
        },
        {
          "label": "QueriesObserver",
          "to": "reference/QueriesObserver"
        },
        {
          "label": "streamedQuery",
          "to": "reference/streamedQuery"
        },
        {
          "label": "focusManager",
          "to": "reference/focusManager"
        },
        {
          "label": "onlineManager",
          "to": "reference/onlineManager"
        },
        {
          "label": "notifyManager",
          "to": "reference/notifyManager"
        }
      ],
      "frameworks": [
        {
          "label": "react",
          "children": [
            {
              "label": "useQuery",
              "to": "framework/react/reference/useQuery"
            },
            {
              "label": "useQueries",
              "to": "framework/react/reference/useQueries"
            },
            {
              "label": "useInfiniteQuery",
              "to": "framework/react/reference/useInfiniteQuery"
            },
            {
              "label": "useMutation",
              "to": "framework/react/reference/useMutation"
            },
            {
              "label": "useIsFetching",
              "to": "framework/react/reference/useIsFetching"
            },
            {
              "label": "useIsMutating",
              "to": "framework/react/reference/useIsMutating"
            },
            {
              "label": "useMutationState",
              "to": "framework/react/reference/useMutationState"
            },
            {
              "label": "useSuspenseQuery",
              "to": "framework/react/reference/useSuspenseQuery"
            },
            {
              "label": "useSuspenseInfiniteQuery",
              "to": "framework/react/reference/useSuspenseInfiniteQuery"
            },
            {
              "label": "useSuspenseQueries",
              "to": "framework/react/reference/useSuspenseQueries"
            },
            {
              "label": "QueryClientProvider",
              "to": "framework/react/reference/QueryClientProvider"
            },
            {
              "label": "useQueryClient",
              "to": "framework/react/reference/useQueryClient"
            },
            {
              "label": "queryOptions",
              "to": "framework/react/reference/queryOptions"
            },
            {
              "label": "infiniteQueryOptions",
              "to": "framework/react/reference/infiniteQueryOptions"
            },
            {
              "label": "mutationOptions",
              "to": "framework/react/reference/mutationOptions"
            },
            {
              "label": "usePrefetchQuery",
              "to": "framework/react/reference/usePrefetchQuery"
            },
            {
              "label": "usePrefetchInfiniteQuery",
              "to": "framework/react/reference/usePrefetchInfiniteQuery"
            },
            {
              "label": "QueryErrorResetBoundary",
              "to": "framework/react/reference/QueryErrorResetBoundary"
            },
            {
              "label": "useQueryErrorResetBoundary",
              "to": "framework/react/reference/useQueryErrorResetBoundary"
            },
            {
              "label": "hydration",
              "to": "framework/react/reference/hydration"
            }
          ]
        },
        {
          "label": "vue",
          "children": [
            {
              "label": "useQuery",
              "to": "framework/vue/reference/useQuery"
            },
            {
              "label": "useQueries",
              "to": "framework/vue/reference/useQueries"
            },
            {
              "label": "useInfiniteQuery",
              "to": "framework/vue/reference/useInfiniteQuery"
            },
            {
              "label": "useMutation",
              "to": "framework/vue/reference/useMutation"
            },
            {
              "label": "useIsFetching",
              "to": "framework/vue/reference/useIsFetching"
            },
            {
              "label": "useIsMutating",
              "to": "framework/vue/reference/useIsMutating"
            },
            {
              "label": "useMutationState",
              "to": "framework/vue/reference/useMutationState"
            },
            {
              "label": "useQueryClient",
              "to": "framework/vue/reference/useQueryClient"
            },
            {
              "label": "queryOptions",
              "to": "framework/vue/reference/queryOptions"
            },
            {
              "label": "infiniteQueryOptions",
              "to": "framework/vue/reference/infiniteQueryOptions"
            },
            {
              "label": "hydration",
              "to": "framework/vue/reference/hydration"
            }
          ]
        },
        {
          "label": "solid",
          "children": [
            {
              "label": "useQuery",
              "to": "framework/solid/reference/useQuery"
            },
            {
              "label": "useQueries",
              "to": "framework/solid/reference/useQueries"
            },
            {
              "label": "useInfiniteQuery",
              "to": "framework/solid/reference/useInfiniteQuery"
            },
            {
              "label": "useMutation",
              "to": "framework/solid/reference/useMutation"
            },
            {
              "label": "useIsFetching",
              "to": "framework/solid/reference/useIsFetching"
            },
            {
              "label": "useIsMutating",
              "to": "framework/solid/reference/useIsMutating"
            },
            {
              "label": "useMutationState",
              "to": "framework/solid/reference/useMutationState"
            },
            {
              "label": "queryOptions",
              "to": "framework/solid/reference/queryOptions"
            },
            {
              "label": "infiniteQueryOptions",
              "to": "framework/solid/reference/infiniteQueryOptions"
            },
            {
              "label": "hydration",
              "to": "framework/solid/reference/hydration"
            }
          ]
        },
        {
          "label": "svelte",
          "children": [
            {
              "label": "Svelte Reference",
              "to": "framework/svelte/reference/index"
            },
            {
              "label": "Functions / createQuery",
              "to": "framework/svelte/reference/functions/createquery"
            },
            {
              "label": "Functions / createMutation",
              "to": "framework/svelte/reference/functions/createmutation"
            }
          ]
        },
        {
          "label": "angular",
          "children": [
            {
              "label": "Angular Reference",
              "to": "framework/angular/reference/index"
            },
            {
              "label": "Functions / injectQuery",
              "to": "framework/angular/reference/functions/injectquery"
            },
            {
              "label": "Functions / injectMutation",
              "to": "framework/angular/reference/functions/injectmutation"
            }
          ]
        }
      ]
    },
    {
      "label": "ESLint",
      "children": [
        {
          "label": "ESLint Plugin Query",
          "to": "eslint/eslint-plugin-query"
        },
        {
          "label": "Exhaustive Deps",
          "to": "eslint/exhaustive-deps"
        },
        {
          "label": "Stable Query Client",
          "to": "eslint/stable-query-client"
        },
        {
          "label": "No Rest Destructuring",
          "to": "eslint/no-rest-destructuring"
        },
        {
          "label": "No Unstable Deps",
          "to": "eslint/no-unstable-deps"
        },
        {
          "label": "Infinite Query Property Order",
          "to": "eslint/infinite-query-property-order"
        }
      ]
    },
    {
      "label": "Community Resources",
      "children": [],
      "frameworks": [
        {
          "label": "react",
          "children": [
            {
              "label": "TkDodo's Blog",
              "to": "framework/react/community/tkdodos-blog"
            },
            {
              "label": "Community Projects",
              "to": "framework/react/community/community-projects"
            }
          ]
        },
        {
          "label": "solid",
          "children": [
            {
              "label": "TkDodo's Blog",
              "to": "framework/solid/community/tkdodos-blog"
            },
            {
              "label": "Community Projects",
              "to": "framework/solid/community/community-projects"
            }
          ]
        },
        {
          "label": "vue",
          "children": [
            {
              "label": "TkDodo's Blog",
              "to": "framework/vue/community/tkdodos-blog"
            },
            {
              "label": "Community Projects",
              "to": "framework/vue/community/community-projects"
            }
          ]
        }
      ]
    },
    {
      "label": "Examples",
      "children": [],
      "frameworks": [
        {
          "label": "react",
          "children": [
            {
              "label": "Simple",
              "to": "framework/react/examples/simple"
            },
            {
              "label": "Basic",
              "to": "framework/react/examples/basic"
            },
            {
              "label": "Basic w/ GraphQL-Request",
              "to": "framework/react/examples/basic-graphql-request"
            },
            {
              "label": "Auto Refetching / Polling / Realtime",
              "to": "framework/react/examples/auto-refetching"
            },
            {
              "label": "Optimistic Updates (UI)",
              "to": "framework/react/examples/optimistic-updates-ui"
            },
            {
              "label": "Optimistic Updates (Cache)",
              "to": "framework/react/examples/optimistic-updates-cache"
            },
            {
              "label": "Pagination",
              "to": "framework/react/examples/pagination"
            },
            {
              "label": "Load-More & Infinite Scroll",
              "to": "framework/react/examples/load-more-infinite-scroll"
            },
            {
              "label": "Infinite query with Max pages",
              "to": "framework/react/examples/infinite-query-with-max-pages"
            },
            {
              "label": "Suspense",
              "to": "framework/react/examples/suspense"
            },
            {
              "label": "Default Query Function",
              "to": "framework/react/examples/default-query-function"
            },
            {
              "label": "Playground",
              "to": "framework/react/examples/playground"
            },
            {
              "label": "Prefetching",
              "to": "framework/react/examples/prefetching"
            },
            {
              "label": "Star Wars",
              "to": "framework/react/examples/star-wars"
            },
            {
              "label": "Rick And Morty",
              "to": "framework/react/examples/rick-morty"
            },
            {
              "label": "Next.js Pages",
              "to": "framework/react/examples/nextjs"
            },
            {
              "label": "Next.js app with prefetching",
              "to": "framework/react/examples/nextjs-app-prefetching"
            },
            {
              "label": "Next.js app with streaming",
              "to": "framework/react/examples/nextjs-suspense-streaming"
            },
            {
              "label": "React Native",
              "to": "framework/react/examples/react-native"
            },
            {
              "label": "React Router",
              "to": "framework/react/examples/react-router"
            },
            {
              "label": "Offline Queries and Mutations",
              "to": "framework/react/examples/offline"
            },
            {
              "label": "Algolia",
              "to": "framework/react/examples/algolia"
            },
            {
              "label": "Shadow DOM",
              "to": "framework/react/examples/shadow-dom"
            },
            {
              "label": "Devtools Embedded Panel",
              "to": "framework/react/examples/devtools-panel"
            },
            {
              "label": "Chat example (streaming)",
              "to": "framework/react/examples/chat"
            }
          ]
        },
        {
          "label": "solid",
          "children": [
            {
              "label": "Simple",
              "to": "framework/solid/examples/simple"
            },
            {
              "label": "Basic",
              "to": "framework/solid/examples/basic"
            },
            {
              "label": "Basic w/ GraphQL-Request",
              "to": "framework/solid/examples/basic-graphql-request"
            },
            {
              "label": "Default Query Function",
              "to": "framework/solid/examples/default-query-function"
            },
            {
              "label": "Solid Start",
              "to": "framework/solid/examples/solid-start-streaming"
            },
            {
              "label": "Astro",
              "to": "framework/solid/examples/astro"
            }
          ]
        },
        {
          "label": "vue",
          "children": [
            {
              "label": "Basic",
              "to": "framework/vue/examples/basic"
            },
            {
              "label": "Vue 2.6",
              "to": "framework/vue/examples/2.6-basic"
            },
            {
              "label": "Nuxt 3",
              "to": "framework/vue/examples/nuxt3"
            },
            {
              "label": "Persister",
              "to": "framework/vue/examples/persister"
            }
          ]
        },
        {
          "label": "svelte",
          "children": [
            {
              "label": "Simple",
              "to": "framework/svelte/examples/simple"
            },
            {
              "label": "Basic",
              "to": "framework/svelte/examples/basic"
            },
            {
              "label": "Auto Refetching / Polling / Realtime",
              "to": "framework/svelte/examples/auto-refetching"
            },
            {
              "label": "SSR",
              "to": "framework/svelte/examples/ssr"
            },
            {
              "label": "Optimistic Updates",
              "to": "framework/svelte/examples/optimistic-updates"
            },
            {
              "label": "Playground",
              "to": "framework/svelte/examples/playground"
            },
            {
              "label": "Star Wars",
              "to": "framework/svelte/examples/star-wars"
            },
            {
              "label": "Infinite Queries",
              "to": "framework/svelte/examples/load-more-infinite-scroll"
            }
          ]
        },
        {
          "label": "angular",
          "children": [
            {
              "label": "Simple",
              "to": "framework/angular/examples/simple"
            },
            {
              "label": "Basic",
              "to": "framework/angular/examples/basic"
            },
            {
              "label": "Auto Refetching / Polling / Realtime",
              "to": "framework/angular/examples/auto-refetching"
            },
            {
              "label": "Optimistic Updates",
              "to": "framework/angular/examples/optimistic-updates"
            },
            {
              "label": "Pagination",
              "to": "framework/angular/examples/pagination"
            },
            {
              "label": "Infinite query with maxPages",
              "to": "framework/angular/examples/infinite-query-with-max-pages"
            },
            {
              "label": "Angular Router",
              "to": "framework/angular/examples/router"
            },
            {
              "label": "RxJS autocomplete",
              "to": "framework/angular/examples/rxjs"
            },
            {
              "label": "Query options from a service",
              "to": "framework/angular/examples/query-options-from-a-service"
            },
            {
              "label": "Devtools embedded panel",
              "to": "framework/angular/examples/devtools-panel"
            }
          ]
        }
      ]
    },
    {
      "label": "Plugins",
      "children": [],
      "frameworks": [
        {
          "label": "react",
          "children": [
            {
              "label": "persistQueryClient",
              "to": "framework/react/plugins/persistQueryClient"
            },
            {
              "label": "createSyncStoragePersister",
              "to": "framework/react/plugins/createSyncStoragePersister"
            },
            {
              "label": "createAsyncStoragePersister",
              "to": "framework/react/plugins/createAsyncStoragePersister"
            },
            {
              "label": "broadcastQueryClient (Experimental)",
              "to": "framework/react/plugins/broadcastQueryClient"
            },
            {
              "label": "createPersister (Experimental)",
              "to": "framework/react/plugins/createPersister"
            }
          ]
        },
        {
          "label": "solid",
          "children": [
            {
              "label": "broadcastQueryClient (Experimental)",
              "to": "framework/solid/plugins/broadcastQueryClient"
            },
            {
              "label": "createPersister (Experimental)",
              "to": "framework/solid/plugins/createPersister"
            }
          ]
        },
        {
          "label": "vue",
          "children": [
            {
              "label": "broadcastQueryClient (Experimental)",
              "to": "framework/vue/plugins/broadcastQueryClient"
            },
            {
              "label": "createPersister (Experimental)",
              "to": "framework/vue/plugins/createPersister"
            }
          ]
        }
      ]
    }
  ],
  "users": [
    "Google",
    "Walmart",
    "Facebook",
    "PayPal",
    "Amazon",
    "American Express",
    "Microsoft",
    "Target",
    "Ebay",
    "Autodesk",
    "CarFAX",
    "Docusign",
    "HP",
    "MLB",
    "Volvo",
    "Ocado",
    "UPC.ch",
    "EFI.com",
    "ReactBricks",
    "Nozzle.io",
    "Uber"
  ]
}



================================================
FILE: docs/eslint/eslint-plugin-query.md
================================================
---
id: eslint-plugin-query
title: ESLint Plugin Query
---

TanStack Query comes with its own ESLint plugin. This plugin is used to enforce best practices and to help you avoid common mistakes.

## Installation

The plugin is a separate package that you need to install:

```bash
npm i -D @tanstack/eslint-plugin-query
```

or

```bash
pnpm add -D @tanstack/eslint-plugin-query
```

or

```bash
yarn add -D @tanstack/eslint-plugin-query
```

or

```bash
bun add -D @tanstack/eslint-plugin-query
```

## Flat Config (`eslint.config.js`)

### Recommended setup

To enable all of the recommended rules for our plugin, add the following config:

```js
import pluginQuery from '@tanstack/eslint-plugin-query'

export default [
  ...pluginQuery.configs['flat/recommended'],
  // Any other config...
]
```

### Custom setup

Alternatively, you can load the plugin and configure only the rules you want to use:

```js
import pluginQuery from '@tanstack/eslint-plugin-query'

export default [
  {
    plugins: {
      '@tanstack/query': pluginQuery,
    },
    rules: {
      '@tanstack/query/exhaustive-deps': 'error',
    },
  },
  // Any other config...
]
```

## Legacy Config (`.eslintrc`)

### Recommended setup

To enable all of the recommended rules for our plugin, add `plugin:@tanstack/query/recommended` in extends:

```json
{
  "extends": ["plugin:@tanstack/query/recommended"]
}
```

### Custom setup

Alternatively, add `@tanstack/query` to the plugins section, and configure the rules you want to use:

```json
{
  "plugins": ["@tanstack/query"],
  "rules": {
    "@tanstack/query/exhaustive-deps": "error"
  }
}
```

## Rules

- [@tanstack/query/exhaustive-deps](../exhaustive-deps.md)
- [@tanstack/query/no-rest-destructuring](../no-rest-destructuring.md)
- [@tanstack/query/stable-query-client](../stable-query-client.md)
- [@tanstack/query/no-unstable-deps](../no-unstable-deps.md)
- [@tanstack/query/infinite-query-property-order](../infinite-query-property-order.md)
- [@tanstack/query/no-void-query-fn](../no-void-query-fn.md)



================================================
FILE: docs/eslint/exhaustive-deps.md
================================================
---
id: exhaustive-deps
title: Exhaustive dependencies for query keys
---

Query keys should be seen like a dependency array to your query function: Every variable that is used inside the queryFn should be added to the query key.
This makes sure that queries are cached independently and that queries are refetched automatically when the variables changes.

## Rule Details

Examples of **incorrect** code for this rule:

```tsx
/* eslint "@tanstack/query/exhaustive-deps": "error" */

useQuery({
  queryKey: ['todo'],
  queryFn: () => api.getTodo(todoId),
})

const todoQueries = {
  detail: (id) => ({ queryKey: ['todo'], queryFn: () => api.getTodo(id) }),
}
```

Examples of **correct** code for this rule:

```tsx
useQuery({
  queryKey: ['todo', todoId],
  queryFn: () => api.getTodo(todoId),
})

const todoQueries = {
  detail: (id) => ({ queryKey: ['todo', id], queryFn: () => api.getTodo(id) }),
}
```

## When Not To Use It

If you don't care about the rules of the query keys, then you will not need this rule.

## Attributes

- [x] ✅ Recommended
- [x] 🔧 Fixable



================================================
FILE: docs/eslint/infinite-query-property-order.md
================================================
---
id: infinite-query-property-order
title: Ensure correct order of inference sensitive properties for infinite queries
---

For the following functions, the property order of the passed in object matters due to type inference:

- `useInfiniteQuery`
- `useSuspenseInfiniteQuery`
- `infiniteQueryOptions`

The correct property order is as follows:

- `queryFn`
- `getPreviousPageParam`
- `getNextPageParam`

All other properties are insensitive to the order as they do not depend on type inference.

## Rule Details

Examples of **incorrect** code for this rule:

```tsx
/* eslint "@tanstack/query/infinite-query-property-order": "warn" */
import { useInfiniteQuery } from '@tanstack/react-query'

const query = useInfiniteQuery({
  queryKey: ['projects'],
  getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
  queryFn: async ({ pageParam }) => {
    const response = await fetch(`/api/projects?cursor=${pageParam}`)
    return await response.json()
  },
  initialPageParam: 0,
  getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  maxPages: 3,
})
```

Examples of **correct** code for this rule:

```tsx
/* eslint "@tanstack/query/infinite-query-property-order": "warn" */
import { useInfiniteQuery } from '@tanstack/react-query'

const query = useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: async ({ pageParam }) => {
    const response = await fetch(`/api/projects?cursor=${pageParam}`)
    return await response.json()
  },
  initialPageParam: 0,
  getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
  getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
  maxPages: 3,
})
```

## Attributes

- [x] ✅ Recommended
- [x] 🔧 Fixable



================================================
FILE: docs/eslint/no-rest-destructuring.md
================================================
---
id: no-rest-destructuring
title: Disallow object rest destructuring on query results
---

Use object rest destructuring on query results automatically subscribes to every field of the query result, which may cause unnecessary re-renders.
This makes sure that you only subscribe to the fields that you actually need.

## Rule Details

Examples of **incorrect** code for this rule:

```tsx
/* eslint "@tanstack/query/no-rest-destructuring": "warn" */

const useTodos = () => {
  const { data: todos, ...rest } = useQuery({
    queryKey: ['todos'],
    queryFn: () => api.getTodos(),
  })
  return { todos, ...rest }
}
```

Examples of **correct** code for this rule:

```tsx
const todosQuery = useQuery({
  queryKey: ['todos'],
  queryFn: () => api.getTodos(),
})

// normal object destructuring is fine
const { data: todos } = todosQuery
```

## When Not To Use It

If you set the `notifyOnChangeProps` options manually, you can disable this rule.
Since you are not using tracked queries, you are responsible for specifying which props should trigger a re-render.

## Attributes

- [x] ✅ Recommended
- [ ] 🔧 Fixable



================================================
FILE: docs/eslint/no-unstable-deps.md
================================================
---
id: no-unstable-deps
title: Disallow putting the result of query hooks directly in a React hook dependency array
---

The object returned from the following query hooks is **not** referentially stable:

- `useQuery`
- `useSuspenseQuery`
- `useQueries`
- `useSuspenseQueries`
- `useInfiniteQuery`
- `useSuspenseInfiniteQuery`
- `useMutation`

The object returned from those hooks should **not** be put directly into the dependency array of a React hook (e.g. `useEffect`, `useMemo`, `useCallback`).
Instead, destructure the return value of the query hook and pass the destructured values into the dependency array of the React hook.

## Rule Details

Examples of **incorrect** code for this rule:

```tsx
/* eslint "@tanstack/query/no-unstable-deps": "warn" */
import { useCallback } from 'React'
import { useMutation } from '@tanstack/react-query'

function Component() {
  const mutation = useMutation({ mutationFn: (value: string) => value })
  const callback = useCallback(() => {
    mutation.mutate('hello')
  }, [mutation])
  return null
}
```

Examples of **correct** code for this rule:

```tsx
/* eslint "@tanstack/query/no-unstable-deps": "warn" */
import { useCallback } from 'React'
import { useMutation } from '@tanstack/react-query'

function Component() {
  const { mutate } = useMutation({ mutationFn: (value: string) => value })
  const callback = useCallback(() => {
    mutate('hello')
  }, [mutate])
  return null
}
```

## Attributes

- [x] ✅ Recommended
- [ ] 🔧 Fixable



================================================
FILE: docs/eslint/no-void-query-fn.md
================================================
---
id: no-void-query-fn
title: Disallow returning void from query functions
---

Query functions must return a value that will be cached by TanStack Query. Functions that don't return a value (void functions) can lead to unexpected behavior and might indicate a mistake in the implementation.

## Rule Details

Example of **incorrect** code for this rule:

```tsx
/* eslint "@tanstack/query/no-void-query-fn": "error" */

useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    await api.todos.fetch() // Function doesn't return the fetched data
  },
})
```

Example of **correct** code for this rule:

```tsx
/* eslint "@tanstack/query/no-void-query-fn": "error" */
useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    const todos = await api.todos.fetch()
    return todos
  },
})
```

## Attributes

- [x] ✅ Recommended
- [ ] 🔧 Fixable



================================================
FILE: docs/eslint/stable-query-client.md
================================================
---
id: stable-query-client
title: Stable Query Client
---

The QueryClient contains the QueryCache, so you'd only want to create one instance of the QueryClient for the lifecycle of your application - _not_ a new instance on every render.

> Exception: It's allowed to create a new QueryClient inside an async Server Component, because the async function is only called once on the server.

## Rule Details

Examples of **incorrect** code for this rule:

```tsx
/* eslint "@tanstack/query/stable-query-client": "error" */

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}
```

Examples of **correct** code for this rule:

```tsx
function App() {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}
```

```tsx
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}
```

```tsx
async function App() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(options)
}
```

## Attributes

- [x] ✅ Recommended
- [x] 🔧 Fixable



================================================
FILE: docs/framework/angular/angular-httpclient-and-other-data-fetching-clients.md
================================================
---
id: Angular-HttpClient-and-other-data-fetching-clients
title: Angular HttpClient and other data fetching clients
---

Because TanStack Query's fetching mechanisms are agnostically built on Promises, you can use literally any asynchronous data fetching client, including the browser native `fetch` API, `graphql-request`, and more.

## Using Angular's `HttpClient` for data fetching

`HttpClient` is a powerful and integrated part of Angular, which gives the following benefits:

- Mock responses in unit tests using [provideHttpClientTesting](https://angular.dev/guide/http/testing).
- [Interceptors](https://angular.dev/guide/http/interceptors) can be used for a wide range of functionality including adding authentication headers, performing logging, etc. While some data fetching libraries have their own interceptor system, `HttpClient` interceptors are integrated with Angular's dependency injection system.
- `HttpClient` automatically informs [`PendingTasks`](https://angular.dev/api/core/PendingTasks#), which enables Angular to be aware of pending requests. Unit tests and SSR can use the resulting application _stableness_ information to wait for pending requests to finish. This makes unit testing much easier for [Zoneless](https://angular.dev/guide/experimental/zoneless) applications.
- When using SSR, `HttpClient` will [cache requests](https://angular.dev/guide/ssr#caching-data-when-using-HttpClient) performed on the server. This will prevent unneeded requests on the client. `HttpClient` SSR caching works out of the box. TanStack Query has its own hydration functionality which may be more powerful but requires some setup. Which one fits your needs best depends on your use case.

### Using observables in `queryFn`

As TanStack Query is a promise based library, observables from `HttpClient` need to be converted to promises. This can be done with the `lastValueFrom` or `firstValueFrom` functions from `rxjs`.

```ts
@Component({
  // ...
})
class ExampleComponent {
  private readonly http = inject(HttpClient)

  readonly query = injectQuery(() => ({
    queryKey: ['repoData'],
    queryFn: () =>
      lastValueFrom(
        this.http.get('https://api.github.com/repos/tanstack/query'),
      ),
  }))
}
```

> Since Angular is moving towards RxJS as an optional dependency, it's expected that `HttpClient` will also support promises in the future.
>
> Support for observables in TanStack Query for Angular is planned.

## Comparison table

| Data fetching client                                | Pros                                                | Cons                                                                       |
| --------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------- |
| **Angular HttpClient**                              | Featureful and very well integrated with Angular.   | Observables need to be converted to Promises.                              |
| **Fetch**                                           | Browser native API, so adds nothing to bundle size. | Barebones API which lacks many features.                                   |
| **Specialized libraries such as `graphql-request`** | Specialized features for specific use cases.        | If it's not an Angular library it won't integrate well with the framework. |



================================================
FILE: docs/framework/angular/devtools.md
================================================
---
id: devtools
title: Devtools
---

> For Chrome, Firefox, and Edge users: Third-party browser extensions are available for debugging TanStack Query directly in browser DevTools. These provide the same functionality as the framework-specific devtools packages:
>
> - <img alt="Chrome logo" src="https://www.google.com/chrome/static/images/chrome-logo.svg" width="16" height="16" class="inline mr-1 not-prose" /> [Devtools for Chrome](https://chromewebstore.google.com/detail/tanstack-query-devtools/annajfchloimdhceglpgglpeepfghfai)
> - <img alt="Firefox logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" width="16" height="16" class="inline mr-1 not-prose" /> [Devtools for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tanstack-query-devtools/)
> - <img alt="Edge logo" src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg" width="16" height="16" class="inline mr-1 not-prose" /> [Devtools for Edge](https://microsoftedge.microsoft.com/addons/detail/tanstack-query-devtools/edmdpkgkacmjopodhfolmphdenmddobj)

## Enable devtools

The devtools help you debug and inspect your queries and mutations. You can enable the devtools by adding `withDevtools` to `provideTanStackQuery`.

By default, the devtools are enabled when Angular [`isDevMode`](https://angular.dev/api/core/isDevMode) returns true. So you don't need to worry about excluding them during a production build. The core tools are lazily loaded and excluded from bundled code. In most cases, all you'll need to do is add `withDevtools()` to `provideTanStackQuery` without any additional configuration.

```ts
import {
  QueryClient,
  provideTanStackQuery,
  withDevtools,
} from '@tanstack/angular-query-experimental'

export const appConfig: ApplicationConfig = {
  providers: [provideTanStackQuery(new QueryClient(), withDevtools())],
}
```

## Configuring if devtools are loaded

If you need more control over when devtools are loaded, you can use the `loadDevtools` option. This is particularly useful if you want to load devtools based on environment configurations. For instance, you might have a test environment running in production mode but still require devtools to be available.

When not setting the option or setting it to 'auto', the devtools will be loaded when Angular is in development mode.

```ts
provideTanStackQuery(new QueryClient(), withDevtools())

// which is equivalent to
provideTanStackQuery(
  new QueryClient(),
  withDevtools(() => ({ loadDevtools: 'auto' })),
)
```

When setting the option to true, the devtools will be loaded in both development and production mode.

```ts
provideTanStackQuery(
  new QueryClient(),
  withDevtools(() => ({ loadDevtools: true })),
)
```

When setting the option to false, the devtools will not be loaded.

```ts
provideTanStackQuery(
  new QueryClient(),
  withDevtools(() => ({ loadDevtools: false })),
)
```

The `withDevtools` options are returned from a callback function to support reactivity through signals. In the following example
a signal is created from a RxJS observable that listens for a keyboard shortcut. When the event is triggered, the devtools are lazily loaded.
Using this technique allows you to support on-demand loading of the devtools even in production mode, without including the full tools in the bundled code.

```ts
@Injectable({ providedIn: 'root' })
class DevtoolsOptionsManager {
  loadDevtools = toSignal(
    fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      map(
        (event): boolean =>
          event.metaKey && event.ctrlKey && event.shiftKey && event.key === 'D',
      ),
      scan((acc, curr) => acc || curr, false),
    ),
    {
      initialValue: false,
    },
  )
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideTanStackQuery(
      new QueryClient(),
      withDevtools(() => ({
        initialIsOpen: true,
        loadDevtools: inject(DevtoolsOptionsManager).loadDevtools(),
      })),
    ),
  ],
}
```

### Options

Of these options `client`, `position`, `errorTypes`, `buttonPosition`, and `initialIsOpen` support reactivity through signals.

- `loadDevtools?: 'auto' | boolean`
  - Defaults to `auto`: lazily loads devtools when in development mode. Skips loading in production mode.
  - Use this to control if the devtools are loaded.
- `initialIsOpen?: Boolean`
  - Set this to `true` if you want the tools to default to being open
- `buttonPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "relative"`
  - Defaults to `bottom-right`
  - The position of the TanStack logo to open and close the devtools panel
  - If `relative`, the button is placed in the location that you render the devtools.
- `position?: "top" | "bottom" | "left" | "right"`
  - Defaults to `bottom`
  - The position of the Angular Query devtools panel
- `client?: QueryClient`,
  - Use this to use a custom QueryClient. Otherwise, the QueryClient provided through `provideTanStackQuery` will be injected.
- `errorTypes?: { name: string; initializer: (query: Query) => TError}[]`
  - Use this to predefine some errors that can be triggered on your queries. Initializer will be called (with the specific query) when that error is toggled on from the UI. It must return an Error.
- `styleNonce?: string`
  - Use this to pass a nonce to the style tag that is added to the document head. This is useful if you are using a Content Security Policy (CSP) nonce to allow inline styles.
- `shadowDOMTarget?: ShadowRoot`
  - Default behavior will apply the devtool's styles to the head tag within the DOM.
  - Use this to pass a shadow DOM target to the devtools so that the styles will be applied within the shadow DOM instead of within the head tag in the light DOM.



================================================
FILE: docs/framework/angular/installation.md
================================================
---
id: installation
title: Installation
---

> IMPORTANT: This library is currently in an experimental stage. This means that breaking changes will happen in minor AND patch releases. Upgrade carefully. If you use this in production while in experimental stage, please lock your version to a patch-level version to avoid unexpected breaking changes.

### NPM

_Angular Query is compatible with Angular v16 and higher_

```bash
npm i @tanstack/angular-query-experimental
```

or

```bash
pnpm add @tanstack/angular-query-experimental
```

or

```bash
yarn add @tanstack/angular-query-experimental
```

or

```bash
bun add @tanstack/angular-query-experimental
```

> Wanna give it a spin before you download? Try out the [simple](../examples/simple) or [basic](../examples/basic) examples!



================================================
FILE: docs/framework/angular/overview.md
================================================
---
id: overview
title: Overview
---

> IMPORTANT: This library is currently in an experimental stage. This means that breaking changes will happen in minor AND patch releases. Upgrade carefully. If you use this in production while in experimental stage, please lock your version to a patch-level version to avoid unexpected breaking changes.

The `@tanstack/angular-query-experimental` package offers a 1st-class API for using TanStack Query via Angular.

## Feedback welcome!

We are in the process of getting to a stable API for TanStack Query on Angular. If you have any feedback, please contact us at the [TanStack Discord](https://tlinz.com/discord) server or [visit this discussion](https://github.com/TanStack/query/discussions/6293) on Github.

## Supported Angular Versions

TanStack Query is compatible with Angular v16 and higher.

TanStack Query (FKA React Query) is often described as the missing data-fetching library for web applications, but in more technical terms, it makes **fetching, caching, synchronizing and updating server state** in your web applications a breeze.

## Motivation

Most core web frameworks **do not** come with an opinionated way of fetching or updating data in a holistic way. Because of this developers end up building either meta-frameworks which encapsulate strict opinions about data-fetching, or they invent their own ways of fetching data. This usually means cobbling together component-based state and side-effects, or using more general purpose state management libraries to store and provide asynchronous data throughout their apps.

While most traditional state management libraries are great for working with client state, they are **not so great at working with async or server state**. This is because **server state is totally different**. For starters, server state:

- Is persisted remotely in a location you may not control or own
- Requires asynchronous APIs for fetching and updating
- Implies shared ownership and can be changed by other people without your knowledge
- Can potentially become "out of date" in your applications if you're not careful

Once you grasp the nature of server state in your application, **even more challenges will arise** as you go, for example:

- Caching... (possibly the hardest thing to do in programming)
- Deduping multiple requests for the same data into a single request
- Updating "out of date" data in the background
- Knowing when data is "out of date"
- Reflecting updates to data as quickly as possible
- Performance optimizations like pagination and lazy loading data
- Managing memory and garbage collection of server state
- Memoizing query results with structural sharing

If you're not overwhelmed by that list, then that must mean that you've probably solved all of your server state problems already and deserve an award. However, if you are like a vast majority of people, you either have yet to tackle all or most of these challenges and we're only scratching the surface!

TanStack Query is hands down one of the _best_ libraries for managing server state. It works amazingly well **out-of-the-box, with zero-config, and can be customized** to your liking as your application grows.

TanStack Query allows you to defeat and overcome the tricky challenges and hurdles of _server state_ and control your app data before it starts to control you.

On a more technical note, TanStack Query will likely:

- Help you remove **many** lines of complicated and misunderstood code from your application and replace with just a handful of lines of Angular Query logic.
- Make your application more maintainable and easier to build new features without worrying about wiring up new server state data sources
- Have a direct impact on your end-users by making your application feel faster and more responsive than ever before.
- Potentially help you save on bandwidth and increase memory performance

[//]: # 'Example'

## Enough talk, show me some code already!

In the example below, you can see TanStack Query in its most basic and simple form being used to fetch the GitHub stats for the TanStack Query GitHub project itself:

[Open in StackBlitz](https://stackblitz.com/github/TanStack/query/tree/main/examples/angular/simple)

```angular-ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { injectQuery } from '@tanstack/angular-query-experimental'
import { lastValueFrom } from 'rxjs'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'simple-example',
  standalone: true,
  template: `
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error().message }}
    }
    @if (query.data(); as data) {
      <h1>{{ data.name }}</h1>
      <p>{{ data.description }}</p>
      <strong>👀 {{ data.subscribers_count }}</strong>
      <strong>✨ {{ data.stargazers_count }}</strong>
      <strong>🍴 {{ data.forks_count }}</strong>
    }
  `
})
export class SimpleExampleComponent {
  http = inject(HttpClient)

  query = injectQuery(() => ({
    queryKey: ['repoData'],
    queryFn: () =>
      lastValueFrom(
        this.http.get<Response>('https://api.github.com/repos/tanstack/query'),
      ),
  }))
}

interface Response {
  name: string
  description: string
  subscribers_count: number
  stargazers_count: number
  forks_count: number
}
```

## You talked me into it, so what now?

- Learn TanStack Query at your own pace with our amazingly thorough [Walkthrough Guide](../installation.md) and [API Reference](../reference/functions/injectquery.md)



================================================
FILE: docs/framework/angular/quick-start.md
================================================
---
id: quick-start
title: Quick Start
---

> IMPORTANT: This library is currently in an experimental stage. This means that breaking changes will happen in minor AND patch releases. Upgrade carefully. If you use this in production while in experimental stage, please lock your version to a patch-level version to avoid unexpected breaking changes.

[//]: # 'Example'

If you're looking for a fully functioning example, please have a look at our [basic codesandbox example](../examples/basic)

### Provide the client to your App

```ts
import { provideHttpClient } from '@angular/common/http'
import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental'

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideTanStackQuery(new QueryClient())],
})
```

or in a NgModule-based app

```ts
import { provideHttpClient } from '@angular/common/http'
import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [provideTanStackQuery(new QueryClient())],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Component with query and mutation

```angular-ts
import { Component, Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { lastValueFrom } from 'rxjs'

import {
  injectMutation,
  injectQuery,
  QueryClient
} from '@tanstack/angular-query-experimental'

@Component({
  standalone: true,
  template: `
    <div>
      <button (click)="onAddTodo()">Add Todo</button>

      <ul>
        @for (todo of query.data(); track todo.title) {
          <li>{{ todo.title }}</li>
        }
      </ul>
    </div>
  `,
})
export class TodosComponent {
  todoService = inject(TodoService)
  queryClient = inject(QueryClient)

  query = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.todoService.getTodos(),
  }))

  mutation = injectMutation(() => ({
    mutationFn: (todo: Todo) => this.todoService.addTodo(todo),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  }))

  onAddTodo() {
    this.mutation.mutate({
      id: Date.now().toString(),
      title: 'Do Laundry',
    })
  }
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient)

  getTodos(): Promise<Todo[]> {
    return lastValueFrom(
      this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos'),
    )
  }

  addTodo(todo: Todo): Promise<Todo> {
    return lastValueFrom(
      this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo),
    )
  }
}

interface Todo {
  id: string
  title: string
}
```

[//]: # 'Example'



================================================
FILE: docs/framework/angular/typescript.md
================================================
---
id: typescript
title: TypeScript
ref: docs/framework/react/typescript.md
replace:
  {
    'useQuery': 'injectQuery',
    'useMutation': 'injectMutation',
    'react-query': 'angular-query-experimental',
    'public API of React Query': 'public API of TanStack Query and - after the experimental phase, the angular-query package',
    'still follows': 'still follow',
    'React Query': 'TanStack Query',
    '`success`': '`isSuccess()`',
    'function:': 'function.',
  }
---

[//]: # 'TypeInference1'

```angular-ts
@Component({
  // ...
  template: `@let data = query.data();`,
  //               ^? data: number | undefined
})
class MyComponent {
  query = injectQuery(() => ({
    queryKey: ['test'],
    queryFn: () => Promise.resolve(5),
  }))
}
```

[//]: # 'TypeInference1'
[//]: # 'TypeInference2'

```angular-ts
@Component({
  // ...
  template: `@let data = query.data();`,
  //               ^? data: string | undefined
})
class MyComponent {
  query = injectQuery(() => ({
    queryKey: ['test'],
    queryFn: () => Promise.resolve(5),
    select: (data) => data.toString(),
  }))
}
```

[//]: # 'TypeInference2'
[//]: # 'TypeInference3'

In this example we pass Group[] to the type parameter of HttpClient's `get` method.

```angular-ts
@Component({
  template: `@let data = query.data();`,
  //               ^? data: Group[] | undefined
})
class MyComponent {
  http = inject(HttpClient)

  query = injectQuery(() => ({
    queryKey: ['groups'],
    queryFn: () => lastValueFrom(this.http.get<Group[]>('/groups')),
  }))
}
```

[//]: # 'TypeInference3'
[//]: # 'TypeNarrowing'

```angular-ts
@Component({
  // ...
  template: `
    @if (query.isSuccess()) {
      @let data = query.data();
      //    ^? data: number
    }
  `,
})
class MyComponent {
  query = injectQuery(() => ({
    queryKey: ['test'],
    queryFn: () => Promise.resolve(5),
  }))
}
```

> TypeScript currently does not support discriminated unions on object methods. Narrowing on signal fields on objects such as query results only works on signals returning a boolean. Prefer using `isSuccess()` and similar boolean status signals over `status() === 'success'`.

[//]: # 'TypeNarrowing'
[//]: # 'TypingError'

```angular-ts
@Component({
  // ...
  template: `@let error = query.error();`,
  //                ^? error: Error | null
})
class MyComponent {
  query = injectQuery(() => ({
    queryKey: ['groups'],
    queryFn: fetchGroups
  }))
}
```

[//]: # 'TypingError'
[//]: # 'TypingError2'

```angular-ts
@Component({
  // ...
  template: `@let error = query.error();`,
  //                ^? error: string | null
})
class MyComponent {
  query = injectQuery<Group[], string>(() => ({
    queryKey: ['groups'],
    queryFn: fetchGroups,
  }))
}
```

[//]: # 'TypingError2'
[//]: # 'TypingError3'

```ts
import axios from 'axios'

query = injectQuery(() => ({ queryKey: ['groups'], queryFn: fetchGroups }))

computed(() => {
  const error = query.error()
  //     ^? error: Error | null

  if (axios.isAxiosError(error)) {
    error
    // ^? const error: AxiosError
  }
})
```

[//]: # 'TypingError3'
[//]: # 'RegisterErrorType'

```ts
import '@tanstack/angular-query-experimental'

declare module '@tanstack/angular-query-experimental' {
  interface Register {
    // Use unknown so call sites must narrow explicitly.
    defaultError: unknown
  }
}

const query = injectQuery(() => ({
  queryKey: ['groups'],
  queryFn: fetchGroups,
}))

computed(() => {
  const error = query.error()
  //      ^? error: unknown | null
})
```

[//]: # 'RegisterErrorType'
[//]: # 'TypingQueryOptions'

## Typing Query Options

If you inline query options into `injectQuery`, you'll get automatic type inference. However, you might want to extract the query options into a separate function to share them between `injectQuery` and e.g. `prefetchQuery` or manage them in a service. In that case, you'd lose type inference. To get it back, you can use the `queryOptions` helper:

```ts
@Injectable({
  providedIn: 'root',
})
export class QueriesService {
  private http = inject(HttpClient)

  post(postId: number) {
    return queryOptions({
      queryKey: ['post', postId],
      queryFn: () => {
        return lastValueFrom(
          this.http.get<Post>(
            `https://jsonplaceholder.typicode.com/posts/${postId}`,
          ),
        )
      },
    })
  }
}

@Component({
  // ...
})
export class Component {
  queryClient = inject(QueryClient)

  postId = signal(1)

  queries = inject(QueriesService)
  optionsSignal = computed(() => this.queries.post(this.postId()))

  postQuery = injectQuery(() => this.queries.post(1))
  postQuery = injectQuery(() => this.queries.post(this.postId()))

  // You can also pass a signal which returns query options
  postQuery = injectQuery(this.optionsSignal)

  someMethod() {
    this.queryClient.prefetchQuery(this.queries.post(23))
  }
}
```

Further, the `queryKey` returned from `queryOptions` knows about the `queryFn` associated with it, and we can leverage that type information to make functions like `queryClient.getQueryData` aware of those types as well:

```ts
data = this.queryClient.getQueryData(groupOptions().queryKey)
// ^? data: Post | undefined
```

Without `queryOptions`, the type of data would be unknown, unless we'd pass a type parameter:

```ts
data = queryClient.getQueryData<Post>(['post', 1])
```

## Typing Mutation Options

Similarly to `queryOptions`, you can use `mutationOptions` to extract mutation options into a separate function:

```ts
export class QueriesService {
  private http = inject(HttpClient)

  updatePost(id: number) {
    return mutationOptions({
      mutationFn: (post: Post) => Promise.resolve(post),
      mutationKey: ['updatePost', id],
      onSuccess: (newPost) => {
        //           ^? newPost: Post
        this.queryClient.setQueryData(['posts', id], newPost)
      },
    })
  }
}
```

[//]: # 'TypingQueryOptions'
[//]: # 'Materials'
[//]: # 'Materials'



================================================
FILE: docs/framework/angular/zoneless.md
================================================
---
id: zoneless
title: Zoneless Angular
---

Because the Angular adapter for TanStack Query is built on signals, it fully supports Zoneless!

Among Zoneless benefits are improved performance and debugging experience. For details see the [Angular documentation](https://angular.dev/guide/experimental/zoneless).

> Keep in mind that the API for Angular Zoneless is currently experimental and can change in Angular patch versions.
> Besides Zoneless, ZoneJS change detection is also fully supported.



================================================
FILE: docs/framework/angular/guides/background-fetching-indicators.md
================================================
---
id: background-fetching-indicators
title: Background Fetching Indicators
ref: docs/framework/react/guides/background-fetching-indicators.md
---

[//]: # 'Example'

```angular-ts
@Component({
  selector: 'todos',
  template: `
    @if (todosQuery.isPending()) {
      Loading...
    } @else if (todosQuery.isError()) {
      An error has occurred: {{ todosQuery.error().message }}
    } @else if (todosQuery.isSuccess()) {
      @if (todosQuery.isFetching()) {
        Refreshing...
      }
      @for (todos of todosQuery.data(); track todo.id) {
        <todo [todo]="todo" />
      }
    }
  `,
})
class TodosComponent {
  todosQuery = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  }))
}
```

[//]: # 'Example'
[//]: # 'Example2'

```angular-ts
import { injectIsFetching } from '@tanstack/angular-query-experimental'

@Component({
  selector: 'global-loading-indicator',
  template: `
    @if (isFetching()) {
      <div>Queries are fetching in the background...</div>
    }
  `,
})
export class GlobalLoadingIndicatorComponent {
  isFetching = injectIsFetching()
}
```

[//]: # 'Example2'



================================================
FILE: docs/framework/angular/guides/caching.md
================================================
---
id: caching
title: Caching Examples
---

> Please thoroughly read the [Important Defaults](../important-defaults.md) before reading this guide

## Basic Example

This caching example illustrates the story and lifecycle of:

- Query Instances with and without cache data
- Background Refetching
- Inactive Queries
- Garbage Collection

Let's assume we are using the default `gcTime` of **5 minutes** and the default `staleTime` of `0`.

- A new instance of `injectQuery(() => ({ queryKey: ['todos'], queryFn: fetchTodos }))` initializes.
  - Since no other queries have been made with the `['todos']` query key, this query will show a hard loading state and make a network request to fetch the data.
  - When the network request has completed, the returned data will be cached under the `['todos']` key.
  - The date will be marked as stale after the configured `staleTime` (defaults to `0`, or immediately).
- A second instance of `injectQuery(() => ({ queryKey: ['todos'], queryFn: fetchTodos })` initializes elsewhere.
  - Since the cache already has data for the `['todos']` key from the first query, that data is immediately returned from the cache.
  - The new instance triggers a new network request using its query function.
    - Note that regardless of whether both `fetchTodos` query functions are identical or not, both queries' [`status`](../../reference/functions/injectquery.md) are updated (including `isFetching`, `isPending`, and other related values) because they have the same query key.
  - When the request completes successfully, the cache's data under the `['todos']` key is updated with the new data, and both instances are updated with the new data.
- Both instances of the `injectQuery(() => ({ queryKey: ['todos'], queryFn: fetchTodos })` query are destroyed and no longer in use.
  - Since there are no more active instances of this query, a garbage collection timeout is set using `gcTime` to delete and garbage collect the query (defaults to **5 minutes**).
- Before the cache timeout has completed, another instance of `injectQuery(() => ({ queryKey: ['todos'], queyFn: fetchTodos })` mounts. The query immediately returns the available cached data while the `fetchTodos` function is being run in the background. When it completes successfully, it will populate the cache with fresh data.
- The final instance of `injectQuery(() => ({ queryKey: ['todos'], queryFn: fetchTodos })` gets destroyed.
- No more instances of `injectQuery(() => ({ queryKey: ['todos'], queryFn: fetchTodos })` appear within **5 minutes**.
  - The cached data under the `['todos']` key is deleted and garbage collected.

For more advanced use-cases, see [injectQuery](../../reference/functions/injectquery.md).



================================================
FILE: docs/framework/angular/guides/default-query-function.md
================================================
---
id: default-query-function
title: Default Query Function
ref: docs/framework/react/guides/default-query-function.md
---

[//]: # 'Example'

```ts
// Define a default query function that will receive the query key
const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`,
  )
  return data
}

// provide the default query function to your app with defaultOptions
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

bootstrapApplication(MyAppComponent, {
  providers: [provideTanStackQuery(queryClient)],
})

export class PostsComponent {
  // All you have to do now is pass a key!
  postsQuery = injectQuery<Array<Post>>(() => ({
    queryKey: ['/posts'],
  }))
  // ...
}

export class PostComponent {
  // You can even leave out the queryFn and just go straight into options
  postQuery = injectQuery<Post>(() => ({
    enabled: this.postIdSignal() > 0,
    queryKey: [`/posts/${this.postIdSignal()}`],
  }))
  // ...
}
```

[//]: # 'Example'



================================================
FILE: docs/framework/angular/guides/dependent-queries.md
================================================
---
id: dependent-queries
title: Dependent Queries
ref: docs/framework/react/guides/dependent-queries.md
replace: { 'useQuery': 'injectQuery', 'useQueries': 'injectQueries' }
---

[//]: # 'Example'

```ts
// Get the user
userQuery = injectQuery(() => ({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
}))

// Then get the user's projects
projectsQuery = injectQuery(() => ({
  queryKey: ['projects', this.userQuery.data()?.id],
  queryFn: getProjectsByUser,
  // The query will not execute until the user id exists
  enabled: !!this.userQuery.data()?.id,
}))
```

[//]: # 'Example'
[//]: # 'Example2'

```ts
// injectQueries is under development for Angular Query
```

[//]: # 'Example2'



================================================
FILE: docs/framework/angular/guides/disabling-queries.md
================================================
---
id: disabling-queries
title: Disabling/Pausing Queries
ref: docs/framework/react/guides/disabling-queries.md
replace: { 'useQuery': 'injectQuery' }
---

[//]: # 'Example'

```angular-ts
@Component({
  selector: 'todos',
  template: `<div>
    <button (click)="query.refetch()">Fetch Todos</button>

    @if (query.data()) {
      <ul>
        @for (todo of query.data(); track todo.id) {
          <li>{{ todo.title }}</li>
        }
      </ul>
    } @else {
      @if (query.isError()) {
        <span>Error: {{ query.error().message }}</span>
      } @else if (query.isLoading()) {
        <span>Loading...</span>
      } @else if (!query.isLoading() && !query.isError()) {
        <span>Not ready ...</span>
      }
    }

    <div>{{ query.isLoading() ? 'Fetching...' : '' }}</div>
  </div>`,
})
export class TodosComponent {
  query = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
    enabled: false,
  }))
}
```

[//]: # 'Example'
[//]: # 'Example2'

```angular-ts
@Component({
  selector: 'todos',
  template: `
    <div>
      // 🚀 applying the filter will enable and execute the query
      <filters-form onApply="filter.set" />
      <todos-table data="query.data()" />
    </div>
  `,
})
export class TodosComponent {
  filter = signal('')

  todosQuery = injectQuery(() => ({
    queryKey: ['todos', this.filter()],
    queryFn: () => fetchTodos(this.filter()),
    enabled: !!this.filter(),
  }))
}
```

[//]: # 'Example2'
[//]: # 'Example3'

```angular-ts
import { skipToken, injectQuery } from '@tanstack/query-angular'

@Component({
  selector: 'todos',
  template: `
    <div>
      // 🚀 applying the filter will enable and execute the query
      <filters-form onApply="filter.set" />
      <todos-table data="query.data()" />
    </div>
  `,
})
export class TodosComponent {
  filter = signal('')

  todosQuery = injectQuery(() => ({
    queryKey: ['todos', this.filter()],
    queryFn: this.filter() ? () => fetchTodos(this.filter()) : skipToken,
  }))
}
```

[//]: # 'Example3'



================================================
FILE: docs/framework/angular/guides/does-this-replace-client-state.md
================================================
---
id: does-this-replace-client-state
title: Does TanStack Query replace global state managers?
ref: docs/framework/react/guides/does-this-replace-client-state.md
replace:
  {
    'useQuery': 'injectQuery',
    'useMutation': 'injectMutation',
    'hook': 'function',
  }
---



================================================
FILE: docs/framework/angular/guides/filters.md
================================================
---
id: filters
title: Filters
ref: docs/framework/react/guides/filters.md
---



================================================
FILE: docs/framework/angular/guides/important-defaults.md
================================================
---
id: important-defaults
title: Important Defaults
ref: docs/framework/react/guides/important-defaults.md
replace:
  {
    'React': 'Angular',
    'react-query': 'angular-query',
    'useQuery': 'injectQuery',
    'useInfiniteQuery': 'injectInfiniteQuery',
    'useMemo and useCallback': 'setting signal values',
  }
---

[//]: # 'Materials'
[//]: # 'Materials'



================================================
FILE: docs/framework/angular/guides/infinite-queries.md
================================================
---
id: infinite-queries
title: Infinite Queries
ref: docs/framework/react/guides/infinite-queries.md
replace:
  { 'useQuery': 'injectQuery', 'useInfiniteQuery': 'injectInfiniteQuery' }
---

[//]: # 'Example'

```angular-ts
import { Component, computed, inject } from '@angular/core'
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental'
import { lastValueFrom } from 'rxjs'
import { ProjectsService } from './projects-service'

@Component({
  selector: 'example',
  templateUrl: './example.component.html',
})
export class Example {
  projectsService = inject(ProjectsService)

  query = injectInfiniteQuery(() => ({
    queryKey: ['projects'],
    queryFn: async ({ pageParam }) => {
      return lastValueFrom(this.projectsService.getProjects(pageParam))
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    maxPages: 3,
  }))

  nextButtonDisabled = computed(
    () => !this.#hasNextPage() || this.#isFetchingNextPage(),
  )
  nextButtonText = computed(() =>
    this.#isFetchingNextPage()
      ? 'Loading more...'
      : this.#hasNextPage()
        ? 'Load newer'
        : 'Nothing more to load',
  )

  #hasNextPage = this.query.hasNextPage
  #isFetchingNextPage = this.query.isFetchingNextPage
}
```

```angular-html
<div>
  @if (query.isPending()) {
  <p>Loading...</p>
  } @else if (query.isError()) {
  <span>Error: {{ query?.error().message }}</span>
  } @else { @for (page of query?.data().pages; track $index) { @for (project of
  page.data; track project.id) {
  <p>{{ project.name }} {{ project.id }}</p>
  } }
  <div>
    <button (click)="query.fetchNextPage()" [disabled]="nextButtonDisabled()">
      {{ nextButtonText() }}
    </button>
  </div>
  }
</div>
```

[//]: # 'Example'
[//]: # 'Example1'

```angular-ts
@Component({
  template: ` <list-component (endReached)="fetchNextPage()" /> `,
})
export class Example {
  query = injectInfiniteQuery(() => ({
    queryKey: ['projects'],
    queryFn: async ({ pageParam }) => {
      return lastValueFrom(this.projectsService.getProjects(pageParam))
    },
  }))

  fetchNextPage() {
    // Do nothing if already fetching
    if (this.query.isFetching()) return
    this.query.fetchNextPage()
  }
}
```

[//]: # 'Example1'
[//]: # 'Example3'

```ts
query = injectInfiniteQuery(() => ({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
}))
```

[//]: # 'Example3'
[//]: # 'Example4'

```ts
query = injectInfiniteQuery(() => ({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  select: (data) => ({
    pages: [...data.pages].reverse(),
    pageParams: [...data.pageParams].reverse(),
  }),
}))
```

[//]: # 'Example4'
[//]: # 'Example8'

```ts
injectInfiniteQuery(() => ({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  initialPageParam: 0,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
  maxPages: 3,
}))
```

[//]: # 'Example8'
[//]: # 'Example9'

```ts
injectInfiniteQuery(() => ({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  initialPageParam: 0,
  getNextPageParam: (lastPage, allPages, lastPageParam) => {
    if (lastPage.length === 0) {
      return undefined
    }
    return lastPageParam + 1
  },
  getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
    if (firstPageParam <= 1) {
      return undefined
    }
    return firstPageParam - 1
  },
}))
```

[//]: # 'Example9'



================================================
FILE: docs/framework/angular/guides/initial-query-data.md
================================================
---
id: initial-query-data
title: Initial Query Data
ref: docs/framework/react/guides/initial-query-data.md
replace:
  {
    'render': 'service or component instance',
    ' when it mounts': '',
    'after mount': 'after initialization',
    'on mount': 'on initialization',
  }
---

[//]: # 'Example'

```ts
result = injectQuery(() => ({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initialData: initialTodos,
}))
```

[//]: # 'Example'
[//]: # 'Example2'

```ts
// Will show initialTodos immediately, but also immediately refetch todos
// when an instance of the component or service is created
result = injectQuery(() => ({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initialData: initialTodos,
}))
```

[//]: # 'Example2'
[//]: # 'Example3'

```ts
// Show initialTodos immediately, but won't refetch until
// another interaction event is encountered after 1000 ms
result = injectQuery(() => ({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initialData: initialTodos,
  staleTime: 1000,
}))
```

[//]: # 'Example3'
[//]: # 'Example4'

```ts
// Show initialTodos immediately, but won't refetch until
// another interaction event is encountered after 1000 ms
result = injectQuery(() => ({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initialData: initialTodos,
  staleTime: 60 * 1000, // 1 minute
  // This could be 10 seconds ago or 10 minutes ago
  initialDataUpdatedAt: initialTodosUpdatedTimestamp, // eg. 1608412420052
}))
```

[//]: # 'Example4'
[//]: # 'Example5'

```ts
result = injectQuery(() => ({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initialData: () => getExpensiveTodos(),
}))
```

[//]: # 'Example5'
[//]: # 'Example6'

```ts
result = injectQuery(() => ({
  queryKey: ['todo', this.todoId()],
  queryFn: () => fetch('/todos'),
  initialData: () => {
    // Use a todo from the 'todos' query as the initial data for this todo query
    return this.queryClient
      .getQueryData(['todos'])
      ?.find((d) => d.id === this.todoId())
  },
}))
```

[//]: # 'Example6'
[//]: # 'Example7'

```ts
result = injectQuery(() => ({
  queryKey: ['todos', this.todoId()],
  queryFn: () => fetch(`/todos/${this.todoId()}`),
  initialData: () =>
    queryClient.getQueryData(['todos'])?.find((d) => d.id === this.todoId()),
  initialDataUpdatedAt: () =>
    queryClient.getQueryState(['todos'])?.dataUpdatedAt,
}))
```

[//]: # 'Example7'
[//]: # 'Example8'

```ts
result = injectQuery(() => ({
  queryKey: ['todo', this.todoId()],
  queryFn: () => fetch(`/todos/${this.todoId()}`),
  initialData: () => {
    // Get the query state
    const state = queryClient.getQueryState(['todos'])

    // If the query exists and has data that is no older than 10 seconds...
    if (state && Date.now() - state.dataUpdatedAt <= 10 * 1000) {
      // return the individual todo
      return state.data.find((d) => d.id === this.todoId())
    }

    // Otherwise, return undefined and let it fetch from a hard loading state!
  },
}))
```

[//]: # 'Example8'
[//]: # 'Materials'
[//]: # 'Materials'



================================================
FILE: docs/framework/angular/guides/invalidations-from-mutations.md
================================================
---
id: invalidations-from-mutations
title: Invalidations from Mutations
ref: docs/framework/react/guides/invalidations-from-mutations.md
replace: { 'useMutation': 'injectMutation', 'hook': 'function' }
---

[//]: # 'Example'

```ts
mutation = injectMutation(() => ({
  mutationFn: postTodo,
}))
```

[//]: # 'Example'
[//]: # 'Example2'

```ts
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental'

export class TodosComponent {
  queryClient = inject(QueryClient)

  // When this mutation succeeds, invalidate any queries with the `todos` or `reminders` query key
  mutation = injectMutation(() => ({
    mutationFn: addTodo,
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['todos'] })
      this.queryClient.invalidateQueries({ queryKey: ['reminders'] })
    },
  }))
}
```

[//]: # 'Example2'

You can wire up your invalidations to happen using any of the callbacks available in the [`injectMutation` function](../mutations.md)



================================================
FILE: docs/framework/angular/guides/mutation-options.md
================================================
---
id: query-options
title: Mutation Options
---

One of the best ways to share mutation options between multiple places,
is to use the `mutationOptions` helper. At runtime, this helper just returns whatever you pass into it,
but it has a lot of advantages when using it [with TypeScript](../../typescript#typing-query-options.md).
You can define all possible options for a mutation in one place,
and you'll also get type inference and type safety for all of them.

```ts
export class QueriesService {
  private http = inject(HttpClient)

  updatePost(id: number) {
    return mutationOptions({
      mutationFn: (post: Post) => Promise.resolve(post),
      mutationKey: ['updatePost', id],
      onSuccess: (newPost) => {
        //           ^? newPost: Post
        this.queryClient.setQueryData(['posts', id], newPost)
      },
    })
  }
}
```



================================================
FILE: docs/framework/angular/guides/mutations.md
================================================
---
id: mutations
title: Mutations
ref: docs/framework/react/guides/mutations.md
replace:
  {
    'useMutation': 'injectMutation',
    'hook': 'function',
    'still mounted': 'still active',
    'unmounts': 'gets destroyed',
    'mounted': 'initialized',
  }
---

[//]: # 'Example'

```angular-ts
@Component({
  template: `
    <div>
      @if (mutation.isPending()) {
        <span>Adding todo...</span>
      } @else if (mutation.isError()) {
        <div>An error occurred: {{ mutation.error()?.message }}</div>
      } @else if (mutation.isSuccess()) {
        <div>Todo added!</div>
      }
      <button (click)="mutation.mutate(1)">Create Todo</button>
    </div>
  `,
})
export class TodosComponent {
  todoService = inject(TodoService)
  mutation = injectMutation(() => ({
    mutationFn: (todoId: number) =>
      lastValueFrom(this.todoService.create(todoId)),
  }))
}
```

[//]: # 'Example'
[//]: # 'Info1'
[//]: # 'Info1'
[//]: # 'Example2'
[//]: # 'Example2'
[//]: # 'Example3'

```angular-ts
@Component({
  standalone: true,
  selector: 'todo-item',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="todoForm" (ngSubmit)="onCreateTodo()">
      @if (mutation.error()) {
        <h5 (click)="mutation.reset()">{{ mutation.error() }}</h5>
      }
      <input type="text" formControlName="title" />
      <br />
      <button type="submit">Create Todo</button>
    </form>
  `,
})
export class TodosComponent {
  mutation = injectMutation(() => ({
    mutationFn: createTodo,
  }))

  fb = inject(NonNullableFormBuilder)

  todoForm = this.fb.group({
    title: this.fb.control('', {
      validators: [Validators.required],
    }),
  })

  title = toSignal(this.todoForm.controls.title.valueChanges, {
    initialValue: '',
  })

  onCreateTodo = () => {
    this.mutation.mutate(this.title())
  }
}
```

[//]: # 'Example3'
[//]: # 'Example4'

```ts
mutation = injectMutation(() => ({
  mutationFn: addTodo,
  onMutate: (variables) => {
    // A mutation is about to happen!

    // Optionally return a context containing data to use when for example rolling back
    return { id: 1 }
  },
  onError: (error, variables, context) => {
    // An error happened!
    console.log(`rolling back optimistic update with id ${context.id}`)
  },
  onSuccess: (data, variables, context) => {
    // Boom baby!
  },
  onSettled: (data, error, variables, context) => {
    // Error or success... doesn't matter!
  },
}))
```

[//]: # 'Example4'
[//]: # 'Example5'

```ts
mutation = injectMutation(() => ({
  mutationFn: addTodo,
  onSuccess: async () => {
    console.log("I'm first!")
  },
  onSettled: async () => {
    console.log("I'm second!")
  },
}))
```

[//]: # 'Example5'
[//]: # 'Example6'

```ts
mutation = injectMutation(() => ({
  mutationFn: addTodo,
  onSuccess: (data, variables, context) => {
    // I will fire first
  },
  onError: (error, variables, context) => {
    // I will fire first
  },
  onSettled: (data, error, variables, context) => {
    // I will fire first
  },
}))

mutation.mutate(todo, {
  onSuccess: (data, variables, context) => {
    // I will fire second!
  },
  onError: (error, variables, context) => {
    // I will fire second!
  },
  onSettled: (data, error, variables, context) => {
    // I will fire second!
  },
})
```

[//]: # 'Example6'
[//]: # 'Example7'

```ts
export class Example {
  mutation = injectMutation(() => ({
    mutationFn: addTodo,
    onSuccess: (data, variables, context) => {
      // Will be called 3 times
    },
  }))

  doMutations() {
    ;['Todo 1', 'Todo 2', 'Todo 3'].forEach((todo) => {
      this.mutation.mutate(todo, {
        onSuccess: (data, variables, context) => {
          // Will execute only once, for the last mutation (Todo 3),
          // regardless which mutation resolves first
        },
      })
    })
  }
}
```

[//]: # 'Example7'
[//]: # 'Example8'

```ts
mutation = injectMutation(() => ({ mutationFn: addTodo }))

try {
  const todo = await mutation.mutateAsync(todo)
  console.log(todo)
} catch (error) {
  console.error(error)
} finally {
  console.log('done')
}
```

[//]: # 'Example8'
[//]: # 'Example9'

```ts
mutation = injectMutation(() => ({
  mutationFn: addTodo,
  retry: 3,
}))
```

[//]: # 'Example9'
[//]: # 'Example10'

```ts
const queryClient = new QueryClient()

// Define the "addTodo" mutation
queryClient.setMutationDefaults(['addTodo'], {
  mutationFn: addTodo,
  onMutate: async (variables) => {
    // Cancel current queries for the todos list
    await queryClient.cancelQueries({ queryKey: ['todos'] })

    // Create optimistic todo
    const optimisticTodo = { id: uuid(), title: variables.title }

    // Add optimistic todo to todos list
    queryClient.setQueryData(['todos'], (old) => [...old, optimisticTodo])

    // Return context with the optimistic todo
    return { optimisticTodo }
  },
  onSuccess: (result, variables, context) => {
    // Replace optimistic todo in the todos list with the result
    queryClient.setQueryData(['todos'], (old) =>
      old.map((todo) =>
        todo.id === context.optimisticTodo.id ? result : todo,
      ),
    )
  },
  onError: (error, variables, context) => {
    // Remove optimistic todo from the todos list
    queryClient.setQueryData(['todos'], (old) =>
      old.filter((todo) => todo.id !== context.optimisticTodo.id),
    )
  },
  retry: 3,
})

class someComponent {
  // Start mutation in some component:
  mutation = injectMutation(() => ({ mutationKey: ['addTodo'] }))

  someMethod() {
    mutation.mutate({ title: 'title' })
  }
}

// If the mutation has been paused because the device is for example offline,
// Then the paused mutation can be dehydrated when the application quits:
const state = dehydrate(queryClient)

// The mutation can then be hydrated again when the application is started:
hydrate(queryClient, state)

// Resume the paused mutations:
queryClient.resumePausedMutations()
```

[//]: # 'Example10'
[//]: # 'Example11'
[//]: # 'Example11'
[//]: # 'Materials'
[//]: # 'Materials'



================================================
FILE: docs/framework/angular/guides/network-mode.md
================================================
---
id: network-mode
title: Network Mode
ref: docs/framework/react/guides/network-mode.md
---



================================================
FILE: docs/framework/angular/guides/optimistic-updates.md
================================================
---
id: optimistic-updates
title: Optimistic Updates
ref: docs/framework/react/guides/optimistic-updates.md
replace:
  {
    'React': 'Angular',
    'useMutation': 'injectMutation',
    'hook': 'function',
    'useMutationState': 'injectMutationState',
    'addTodoMutation': 'addTodo',
  }
---

[//]: # 'ExampleUI1'

```ts
addTodo = injectMutation(() => ({
  mutationFn: (newTodo: string) => axios.post('/api/data', { text: newTodo }),
  // make sure to _return_ the Promise from the query invalidation
  // so that the mutation stays in `pending` state until the refetch is finished
  onSettled: async () => {
    return await queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
}))
```

[//]: # 'ExampleUI1'
[//]: # 'ExampleUI2'

```angular-ts
@Component({
  template: `
    @for (todo of todos.data(); track todo.id) {
      <li>{{ todo.title }}</li>
    }
    @if (addTodo.isPending()) {
      <li style="opacity: 0.5">{{ addTodo.variables() }}</li>
    }
  `,
})
class TodosComponent {}
```

[//]: # 'ExampleUI2'
[//]: # 'ExampleUI3'

```angular-ts
@Component({
  template: `
    @if (addTodo.isError()) {
      <li style="color: red">
        {{ addTodo.variables() }}
        <button (click)="addTodo.mutate(addTodo.variables())">Retry</button>
      </li>
    }
  `,
})
class TodosComponent {}
```

[//]: # 'ExampleUI3'
[//]: # 'ExampleUI4'

```ts
// somewhere in your app
addTodo = injectMutation(() => ({
  mutationFn: (newTodo: string) => axios.post('/api/data', { text: newTodo }),
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  mutationKey: ['addTodo'],
}))

// access variables somewhere else

mutationState = injectMutationState<string>(() => ({
  filters: { mutationKey: ['addTodo'], status: 'pending' },
  select: (mutation) => mutation.state.variables,
}))
```

[//]: # 'ExampleUI4'
[//]: # 'Example'

```ts
queryClient = inject(QueryClient)

updateTodo = injectMutation(() => ({
  mutationFn: updateTodo,
  // When mutate is called:
  onMutate: async (newTodo) => {
    // Cancel any outgoing refetches
    // (so they don't overwrite our optimistic update)
    await this.queryClient.cancelQueries({ queryKey: ['todos'] })

    // Snapshot the previous value
    const previousTodos = client.getQueryData(['todos'])

    // Optimistically update to the new value
    this.queryClient.setQueryData(['todos'], (old) => [...old, newTodo])

    // Return a context object with the snapshotted value
    return { previousTodos }
  },
  // If the mutation fails,
  // use the context returned from onMutate to roll back
  onError: (err, newTodo, context) => {
    client.setQueryData(['todos'], context.previousTodos)
  },
  // Always refetch after error or success:
  onSettled: () => {
    this.queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
}))
```

[//]: # 'Example'
[//]: # 'Example2'

```ts
queryClient = inject(QueryClient)

updateTodo = injectMutation(() => ({
  mutationFn: updateTodo,
  // When mutate is called:
  onMutate: async (newTodo) => {
    // Cancel any outgoing refetches
    // (so they don't overwrite our optimistic update)
    await this.queryClient.cancelQueries({ queryKey: ['todos', newTodo.id] })

    // Snapshot the previous value
    const previousTodo = this.queryClient.getQueryData(['todos', newTodo.id])

    // Optimistically update to the new value
    this.queryClient.setQueryData(['todos', newTodo.id], newTodo)

    // Return a context with the previous and new todo
    return { previousTodo, newTodo }
  },
  // If the mutation fails, use the context we returned above
  onError: (err, newTodo, context) => {
    this.queryClient.setQueryData(
      ['todos', context.newTodo.id],
      context.previousTodo,
    )
  },
  // Always refetch after error or success:
  onSettled: (newTodo) => {
    this.queryClient.invalidateQueries({ queryKey: ['todos', newTodo.id] })
  },
}))
```

[//]: # 'Example2'
[//]: # 'Example3'

```ts
injectMutation({
  mutationFn: updateTodo,
  // ...
  onSettled: (newTodo, error, variables, context) => {
    if (error) {
      // do something
    }
  },
})
```

[//]: # 'Example3'



================================================
FILE: docs/framework/angular/guides/paginated-queries.md
================================================
---
id: paginated-queries
title: Paginated / Lagged Queries
ref: docs/framework/react/guides/paginated-queries.md
replace:
  {
    'useQuery': 'injectQuery',
    'useInfiniteQuery': 'injectInfiniteQuery',
    'hook': 'function',
  }
---

[//]: # 'Example'

```ts
const result = injectQuery(() => ({
  queryKey: ['projects', page()],
  queryFn: fetchProjects,
}))
```

[//]: # 'Example'
[//]: # 'Example2'

```angular-ts
@Component({
  selector: 'pagination-example',
  template: `
    <div>
      <p>
        In this example, each page of data remains visible as the next page is
        fetched. The buttons and capability to proceed to the next page are also
        suppressed until the next page cursor is known. Each page is cached as a
        normal query too, so when going to previous pages, you'll see them
        instantaneously while they are also re-fetched invisibly in the
        background.
      </p>
      @if (query.status() === 'pending') {
        <div>Loading...</div>
      } @else if (query.status() === 'error') {
        <div>Error: {{ query.error().message }}</div>
      } @else {
        <!-- 'data' will either resolve to the latest page's data -->
        <!-- or if fetching a new page, the last successful page's data -->
        <div>
          @for (project of query.data().projects; track project.id) {
            <p>{{ project.name }}</p>
          }
        </div>
      }

      <div>Current Page: {{ page() + 1 }}</div>
      <button (click)="previousPage()" [disabled]="page() === 0">
        Previous Page
      </button>
      <button
        (click)="nextPage()"
        [disabled]="query.isPlaceholderData() || !query.data()?.hasMore"
      >
        Next Page
      </button>
      <!-- Since the last page's data potentially sticks around between page requests, -->
      <!-- we can use 'isFetching' to show a background loading -->
      <!-- indicator since our status === 'pending' state won't be triggered -->
      @if (query.isFetching()) {
        <span> Loading...</span>
      }
    </div>
  `,
})
export class PaginationExampleComponent {
  page = signal(0)
  queryClient = inject(QueryClient)

  query = injectQuery(() => ({
    queryKey: ['projects', this.page()],
    queryFn: () => lastValueFrom(fetchProjects(this.page())),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  }))

  constructor() {
    effect(() => {
      // Prefetch the next page!
      if (!this.query.isPlaceholderData() && this.query.data()?.hasMore) {
        this.#queryClient.prefetchQuery({
          queryKey: ['projects', this.page() + 1],
          queryFn: () => lastValueFrom(fetchProjects(this.page() + 1)),
        })
      }
    })
  }

  previousPage() {
    this.page.update((old) => Math.max(old - 1, 0))
  }

  nextPage() {
    this.page.update((old) => (this.query.data()?.hasMore ? old + 1 : old))
  }
}
```

[//]: # 'Example2'



================================================
FILE: docs/framework/angular/guides/parallel-queries.md
================================================
---
id: parallel-queries
title: Parallel Queries
ref: docs/framework/react/guides/parallel-queries.md
replace:
  {
    'If the number of queries you need to execute is changing from render to render, you cannot use manual querying since that would violate the rules of hooks. Instead, ': '',
    'hook': 'function',
    'React': 'Angular',
    'hooks': 'functions',
    'useQuery': 'injectQuery',
    'useInfiniteQuery': 'injectInfiniteQuery',
    'useQueries': 'injectQueries',
  }
---

[//]: # 'Example'

```ts
export class AppComponent {
  // The following queries will execute in parallel
  usersQuery = injectQuery(() => ({ queryKey: ['users'], queryFn: fetchUsers }))
  teamsQuery = injectQuery(() => ({ queryKey: ['teams'], queryFn: fetchTeams }))
  projectsQuery = injectQuery(() => ({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  }))
}
```

[//]: # 'Example'
[//]: # 'Info'
[//]: # 'Info'
[//]: # 'DynamicParallelIntro'

TanStack Query provides `injectQueries`, which you can use to dynamically execute as many queries in parallel as you'd like.

[//]: # 'DynamicParallelIntro'
[//]: # 'Example2'

```ts
export class AppComponent {
  users = signal<Array<User>>([])

  // Please note injectQueries is under development and this code does not work yet
  userQueries = injectQueries(() => ({
    queries: users().map((user) => {
      return {
        queryKey: ['user', user.id],
        queryFn: () => fetchUserById(user.id),
      }
    }),
  }))
}
```

[//]: # 'Example2'



================================================
FILE: docs/framework/angular/guides/placeholder-query-data.md
================================================
---
id: placeholder-query-data
title: Placeholder Query Data
ref: docs/framework/react/guides/placeholder-query-data.md
---

[//]: # 'ExampleValue'

```ts
class TodosComponent {
  result = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => fetch('/todos'),
    placeholderData: placeholderTodos,
  }))
}
```

[//]: # 'ExampleValue'
[//]: # 'Memoization'
[//]: # 'Memoization'
[//]: # 'ExampleFunction'

```ts
class TodosComponent {
  result = injectQuery(() => ({
    queryKey: ['todos', id()],
    queryFn: () => fetch(`/todos/${id}`),
    placeholderData: (previousData, previousQuery) => previousData,
  }))
}
```

[//]: # 'ExampleFunction'
[//]: # 'ExampleCache'

```ts
export class BlogPostComponent {
  // Until Angular supports signal-based inputs, we have to set a signal
  @Input({ required: true, alias: 'postId' })
  set _postId(value: number) {
    this.postId.set(value)
  }
  postId = signal(0)
  queryClient = inject(QueryClient)

  result = injectQuery(() => ({
    queryKey: ['blogPost', this.postId()],
    queryFn: () => fetch(`/blogPosts/${this.postId()}`),
    placeholderData: () => {
      // Use the smaller/preview version of the blogPost from the 'blogPosts'
      // query as the placeholder data for this blogPost query
      return queryClient
        .getQueryData(['blogPosts'])
        ?.find((d) => d.id === this.postId())
    },
  }))
}
```

[//]: # 'ExampleCache'
[//]: # 'Materials'
[//]: # 'Materials'



================================================
FILE: docs/framework/angular/guides/queries.md
================================================
---
id: queries
title: Queries
ref: docs/framework/react/guides/queries.md
replace:
  {
    'React': 'Angular',
    'react-query': 'angular-query',
    'promise': 'promise or observable',
    'custom hooks': 'services',
    'the `useQuery` hook': '`injectQuery`',
    '`useQuery`': '`injectQuery`',
    "TypeScript will also narrow the type of data correctly if you've checked for pending and error before accessing it.": 'TypeScript will only narrow the type when checking boolean signals such as `isPending` and `isError`.',
  }
---

[//]: # 'Example'

```ts
import { injectQuery } from '@tanstack/angular-query-experimental'

export class TodosComponent {
  info = injectQuery(() => ({ queryKey: ['todos'], queryFn: fetchTodoList }))
}
```

[//]: # 'Example'
[//]: # 'Example2'

```ts
result = injectQuery(() => ({ queryKey: ['todos'], queryFn: fetchTodoList }))
```

[//]: # 'Example2'
[//]: # 'Example3'

```angular-ts
@Component({
  selector: 'todos',
  standalone: true,
  template: `
    @if (todos.isPending()) {
      <span>Loading...</span>
    } @else if (todos.isError()) {
      <span>Error: {{ todos.error()?.message }}</span>
    } @else {
      <!-- We can assume by this point that status === 'success' -->
      @for (todo of todos.data(); track todo.id) {
        <li>{{ todo.title }}</li>
      } @empty {
        <li>No todos found</li>
      }
    }
  `,
})
export class PostsComponent {
  todos = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  }))
}
```

[//]: # 'Example3'

If booleans aren't your thing, you can always use the `status` state as well:

[//]: # 'Example4'

```angular-ts
@Component({
  selector: 'todos',
  standalone: true,
  template: `
    @switch (todos.status()) {
      @case ('pending') {
        <span>Loading...</span>
      }
      @case ('error') {
        <span>Error: {{ todos.error()?.message }}</span>
      }
      <!-- also status === 'success', but "else" logic works, too -->
      @default {
        <ul>
          @for (todo of todos.data(); track todo.id) {
            <li>{{ todo.title }}</li>
          } @empty {
            <li>No todos found</li>
          }
        </ul>
      }
    }
  `,
})
class TodosComponent {}
```

[//]: # 'Example4'
[//]: # 'Materials'
[//]: # 'Materials'



================================================
FILE: docs/framework/angular/guides/query-cancellation.md
================================================
---
id: query-cancellation
title: Query Cancellation
---

TanStack Query provides each query function with an [`AbortSignal` instance](https://developer.mozilla.org/docs/Web/API/AbortSignal). When a query becomes out-of-date or inactive, this `signal` will become aborted. This means that all queries are cancellable, and you can respond to the cancellation inside your query function if desired. The best part about this is that it allows you to continue to use normal async/await syntax while getting all the benefits of automatic cancellation.

## Default behavior

By default, queries that unmount or become unused before their promises are resolved are _not_ cancelled. This means that after the promise has resolved, the resulting data will be available in the cache. This is helpful if you've started receiving a query, but then unmount the component before it finishes. If you mount the component again and the query has not been garbage collected yet, data will be available.

However, if you consume the `AbortSignal`, the Promise will be cancelled (e.g. aborting the fetch) and therefore, also the Query must be cancelled. Cancelling the query will result in its state being _reverted_ to its previous state.

## Using `HttpClient`

```ts
import { HttpClient } from '@angular/common/http'
import { injectQuery } from '@tanstack/angular-query-experimental'

postQuery = injectQuery(() => ({
  enabled: this.postId() > 0,
  queryKey: ['post', this.postId()],
  queryFn: async (context): Promise<Post> => {
    const abort$ = fromEvent(context.signal, 'abort')
    return lastValueFrom(this.getPost$(this.postId()).pipe(takeUntil(abort$)))
  },
}))
```

## Using `fetch`

[//]: # 'Example2'

```ts
query = injectQuery(() => ({
  queryKey: ['todos'],
  queryFn: async ({ signal }) => {
    const todosResponse = await fetch('/todos', {
      // Pass the signal to one fetch
      signal,
    })
    const todos = await todosResponse.json()

    const todoDetails = todos.map(async ({ details }) => {
      const response = await fetch(details, {
        // Or pass it to several
        signal,
      })
      return response.json()
    })

    return Promise.all(todoDetails)
  },
}))
```

[//]: # 'Example2'

## Using `axios`

[//]: # 'Example3'

```tsx
import axios from 'axios'

const query = injectQuery(() => ({
  queryKey: ['todos'],
  queryFn: ({ signal }) =>
    axios.get('/todos', {
      // Pass the signal to `axios`
      signal,
    }),
}))
```

[//]: # 'Example3'

## Manual Cancellation

You might want to cancel a query manually. For example, if the request takes a long time to finish, you can allow the user to click a cancel button to stop the request. To do this, you just need to call `queryClient.cancelQueries({ queryKey })`, which will cancel the query and revert it back to its previous state. If you have consumed the `signal` passed to the query function, TanStack Query will additionally also cancel the Promise.

[//]: # 'Example7'

```angular-ts
@Component({
  standalone: true,
  template: `<button (click)="onCancel()">Cancel</button>`,
})
export class TodosComponent {
  query = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: async ({ signal }) => {
      const resp = await fetch('/todos', { signal })
      return resp.json()
    },
  }))

  queryClient = inject(QueryClient)

  onCancel() {
    this.queryClient.cancelQueries(['todos'])
  }
}
```

[//]: # 'Example7'



================================================
FILE: docs/framework/angular/guides/query-functions.md
================================================
---
id: query-functions
title: Query Functions
ref: docs/framework/react/guides/query-functions.md
---

[//]: # 'Example'

```ts
injectQuery(() => ({ queryKey: ['todos'], queryFn: fetchAllTodos }))
injectQuery(() => ({ queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId) })
injectQuery(() => ({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId)
    return data
  },
}))
injectQuery(() => ({
  queryKey: ['todos', todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
}))
```

[//]: # 'Example'
[//]: # 'Example2'

```ts
todos = injectQuery(() => ({
  queryKey: ['todos', todoId()],
  queryFn: async () => {
    if (somethingGoesWrong) {
      throw new Error('Oh no!')
    }
    if (somethingElseGoesWrong) {
      return Promise.reject(new Error('Oh no!'))
    }

    return data
  },
}))
```

[//]: # 'Example2'
[//]: # 'Example3'

```ts
todos = injectQuery(() => ({
  queryKey: ['todos', todoId()],
  queryFn: async () => {
    const response = await fetch('/todos/' + todoId)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  },
}))
```

[//]: # 'Example3'
[//]: # 'Example4'

```ts
result = injectQuery(() => ({
  queryKey: ['todos', { status: status(), page: page() }],
  queryFn: fetchTodoList,
}))

// Access the key, status and page variables in your query function!
function fetchTodoList({ queryKey }) {
  const [_key, { status, page }] = queryKey
  return new Promise()
}
```

[//]: # 'Example4'



================================================
FILE: docs/framework/angular/guides/query-invalidation.md
================================================
---
id: query-invalidation
title: Query Invalidation
ref: docs/framework/react/guides/query-invalidation.md
replace: { 'useQuery': 'injectQuery', 'hooks': 'functions' }
---

[//]: # 'Example2'

```ts
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental'

class QueryInvalidationExample {
  queryClient = inject(QueryClient)

  invalidateQueries() {
    this.queryClient.invalidateQueries({ queryKey: ['todos'] })
  }

  // Both queries below will be invalidated
  todoListQuery = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  }))
  todoListQuery = injectQuery(() => ({
    queryKey: ['todos', { page: 1 }],
    queryFn: fetchTodoList,
  }))
}
```

[//]: # 'Example2'

You can even invalidate queries with specific variables by passing a more specific query key to the `invalidateQueries` method:

[//]: # 'Example3'

```ts
queryClient.invalidateQueries({
  queryKey: ['todos', { type: 'done' }],
})

// The query below will be invalidated
todoListQuery = injectQuery(() => ({
  queryKey: ['todos', { type: 'done' }],
  queryFn: fetchTodoList,
}))

// However, the following query below will NOT be invalidated
todoListQuery = injectQuery(() => ({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
}))
```

[//]: # 'Example3'

The `invalidateQueries` API is very flexible, so even if you want to **only** invalidate `todos` queries that don't have any more variables or subkeys, you can pass an `exact: true` option to the `invalidateQueries` method:

[//]: # 'Example4'

```ts
queryClient.invalidateQueries({
  queryKey: ['todos'],
  exact: true,
})

// The query below will be invalidated
todoListQuery = injectQuery(() => ({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
}))

// However, the following query below will NOT be invalidated
const todoListQuery = injectQuery(() => ({
  queryKey: ['todos', { type: 'done' }],
  queryFn: fetchTodoList,
}))
```

[//]: # 'Example4'

If you find yourself wanting **even more** granularity, you can pass a predicate function to the `invalidateQueries` method. This function will receive each `Query` instance from the query cache and allow you to return `true` or `false` for whether you want to invalidate that query:

[//]: # 'Example5'

```ts
queryClient.invalidateQueries({
  predicate: (query) =>
    query.queryKey[0] === 'todos' && query.queryKey[1]?.version >= 10,
})

// The query below will be invalidated
todoListQuery = injectQuery(() => ({
  queryKey: ['todos', { version: 20 }],
  queryFn: fetchTodoList,
}))

// The query below will be invalidated
todoListQuery = injectQuery(() => ({
  queryKey: ['todos', { version: 10 }],
  queryFn: fetchTodoList,
}))

// However, the following query below will NOT be invalidated
todoListQuery = injectQuery(() => ({
  queryKey: ['todos', { version: 5 }],
  queryFn: fetchTodoList,
}))
```

[//]: # 'Example5'



================================================
FILE: docs/framework/angular/guides/query-keys.md
================================================
---
id: query-keys
title: Query Keys
ref: docs/framework/react/guides/query-keys.md
#todo: exhaustive-deps is at least for now React-only
---

[//]: # 'Example'

```ts
// A list of todos
injectQuery(() => ({ queryKey: ['todos'], ... }))

// Something else, whatever!
injectQuery(() => ({ queryKey: ['something', 'special'], ... }))
```

[//]: # 'Example'
[//]: # 'Example2'

```ts
// An individual todo
injectQuery(() => ({queryKey: ['todo', 5], ...}))

// An individual todo in a "preview" format
injectQuery(() => ({queryKey: ['todo', 5, {preview: true}], ...}))

// A list of todos that are "done"
injectQuery(() => ({queryKey: ['todos', {type: 'done'}], ...}))
```

[//]: # 'Example2'
[//]: # 'Example3'

```ts
injectQuery(() => ({ queryKey: ['todos', { status, page }], ... }))
injectQuery(() => ({ queryKey: ['todos', { page, status }], ...}))
injectQuery(() => ({ queryKey: ['todos', { page, status, other: undefined }], ... }))
```

[//]: # 'Example3'
[//]: # 'Example4'

```ts
injectQuery(() => ({ queryKey: ['todos', status, page], ... }))
injectQuery(() => ({ queryKey: ['todos', page, status], ...}))
injectQuery(() => ({ queryKey: ['todos', undefined, page, status], ...}))
```

[//]: # 'Example4'
[//]: # 'Example5'

```ts
todoId = signal(-1)

injectQuery(() => ({
  enabled: todoId() > 0,
  queryKey: ['todos', todoId()],
  queryFn: () => fetchTodoById(todoId()),
}))
```

[//]: # 'Example5'
[//]: # 'Materials'
[//]: # 'Materials'



================================================
FILE: docs/framework/angular/guides/query-options.md
================================================
---
id: query-options
title: Query Options
ref: docs/framework/react/guides/query-options.md
---

[//]: # 'Example1'

```ts
import { queryOptions } from '@tanstack/angular-query-experimental'

@Injectable({
  providedIn: 'root',
})
export class QueriesService {
  private http = inject(HttpClient)

  post(postId: number) {
    return queryOptions({
      queryKey: ['post', postId],
      queryFn: () => {
        return lastValueFrom(
          this.http.get<Post>(
            `https://jsonplaceholder.typicode.com/posts/${postId}`,
          ),
        )
      },
    })
  }
}

// usage:

postId = input.required({
  transform: numberAttribute,
})
queries = inject(QueriesService)

postQuery = injectQuery(() => this.queries.post(this.postId()))

queryClient.prefetchQuery(this.queries.post(23))
queryClient.setQueryData(this.queries.post(42).queryKey, newPost)
```

[//]: # 'Example1'
[//]: # 'Example2'

```ts
// Type inference still works, so query.data will be the return type of select instead of queryFn
queries = inject(QueriesService)

query = injectQuery(() => ({
  ...groupOptions(1),
  select: (data) => data.title,
}))
```

[//]: # 'Example2'



================================================
FILE: docs/framework/angular/guides/query-retries.md
================================================
---
id: query-retries
title: Query Retries
ref: docs/framework/react/guides/query-retries.md
replace:
  {
    'Provider': 'Plugin',
    'useQuery': 'injectQuery',
    'useMutation': 'injectMutation',
  }
---

[//]: # 'Info'
[//]: # 'Info'
[//]: # 'Example'

```ts
import { injectQuery } from '@tanstack/angular-query-experimental'

// Make a specific query retry a certain number of times
const result = injectQuery(() => ({
  queryKey: ['todos', 1],
  queryFn: fetchTodoListPage,
  retry: 10, // Will retry failed requests 10 times before displaying an error
}))
```

[//]: # 'Example'
[//]: # 'Example2'

```ts
// Configure for all queries
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/angular-query-experimental'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})

bootstrapApplication(AppComponent, {
  providers: [provideTanStackQuery(queryClient)],
})
```

[//]: # 'Example2'

Though it is not recommended, you can obviously override the `retryDelay` function/integer in both the Provider and individual query options. If set to an integer instead of a function the delay will always be the same amount of time:

[//]: # 'Example3'

```ts
const result = injectQuery(() => ({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
  retryDelay: 1000, // Will always wait 1000ms to retry, regardless of how many retries
}))
```

[//]: # 'Example3'



================================================
FILE: docs/framework/angular/guides/scroll-restoration.md
================================================
---
id: scroll-restoration
title: Scroll Restoration
ref: docs/framework/react/guides/scroll-restoration.md
---



================================================
FILE: docs/framework/angular/guides/window-focus-refetching.md
================================================
---
id: window-focus-refetching
title: Window Focus Refetching
ref: docs/framework/react/guides/window-focus-refetching.md
replace: { '@tanstack/react-query': '@tanstack/angular-query-experimental' }
---

[//]: # 'Example'

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideTanStackQuery(
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // default: true
          },
        },
      }),
    ),
  ],
}
```

[//]: # 'Example'
[//]: # 'Example2'

```ts
injectQuery(() => ({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  refetchOnWindowFocus: false,
}))
```

[//]: # 'Example2'
[//]: # 'ReactNative'
[//]: # 'ReactNative'



================================================
FILE: docs/framework/angular/reference/index.md
================================================
---
id: '@tanstack/angular-query-experimental'
title: '@tanstack/angular-query-experimental'
---

# @tanstack/angular-query-experimental

## Interfaces

- [BaseMutationNarrowing](../interfaces/basemutationnarrowing.md)
- [BaseQueryNarrowing](../interfaces/basequerynarrowing.md)
- [CreateBaseQueryOptions](../interfaces/createbasequeryoptions.md)
- [CreateInfiniteQueryOptions](../interfaces/createinfinitequeryoptions.md)
- [CreateMutationOptions](../interfaces/createmutationoptions.md)
- [CreateQueryOptions](../interfaces/createqueryoptions.md)
- [DevtoolsOptions](../interfaces/devtoolsoptions.md)
- [InjectInfiniteQueryOptions](../interfaces/injectinfinitequeryoptions.md)
- [InjectIsFetchingOptions](../interfaces/injectisfetchingoptions.md)
- [InjectIsMutatingOptions](../interfaces/injectismutatingoptions.md)
- [InjectMutationOptions](../interfaces/injectmutationoptions.md)
- [InjectMutationStateOptions](../interfaces/injectmutationstateoptions.md)
- [InjectQueryOptions](../interfaces/injectqueryoptions.md)
- [QueryFeature](../interfaces/queryfeature.md)

## Type Aliases

- [CreateBaseMutationResult](../type-aliases/createbasemutationresult.md)
- [CreateBaseQueryResult](../type-aliases/createbasequeryresult.md)
- [CreateInfiniteQueryResult](../type-aliases/createinfinitequeryresult.md)
- [CreateMutateAsyncFunction](../type-aliases/createmutateasyncfunction.md)
- [CreateMutateFunction](../type-aliases/createmutatefunction.md)
- [CreateMutationResult](../type-aliases/createmutationresult.md)
- [CreateQueryResult](../type-aliases/createqueryresult.md)
- [DefinedCreateInfiniteQueryResult](../type-aliases/definedcreateinfinitequeryresult.md)
- [DefinedCreateQueryResult](../type-aliases/definedcreatequeryresult.md)
- [DefinedInitialDataInfiniteOptions](../type-aliases/definedinitialdatainfiniteoptions.md)
- [DefinedInitialDataOptions](../type-aliases/definedinitialdataoptions.md)
- [DeveloperToolsFeature](../type-aliases/developertoolsfeature.md)
- [PersistQueryClientFeature](../type-aliases/persistqueryclientfeature.md)
- [QueriesOptions](../type-aliases/queriesoptions.md)
- [QueriesResults](../type-aliases/queriesresults.md)
- [QueryFeatureKind](../type-aliases/queryfeaturekind.md)
- [QueryFeatures](../type-aliases/queryfeatures.md)
- [UndefinedInitialDataInfiniteOptions](../type-aliases/undefinedinitialdatainfiniteoptions.md)
- [UndefinedInitialDataOptions](../type-aliases/undefinedinitialdataoptions.md)
- [UnusedSkipTokenInfiniteOptions](../type-aliases/unusedskiptokeninfiniteoptions.md)
- [UnusedSkipTokenOptions](../type-aliases/unusedskiptokenoptions.md)

## Variables

- [queryFeatures](../variables/queryfeatures.md)

## Functions

- [infiniteQueryOptions](../functions/infinitequeryoptions.md)
- [injectInfiniteQuery](../functions/injectinfinitequery.md)
- [injectIsFetching](../functions/injectisfetching.md)
- [injectIsMutating](../functions/injectismutating.md)
- [injectIsRestoring](../functions/injectisrestoring.md)
- [injectMutation](../functions/injectmutation.md)
- [injectMutationState](../functions/injectmutationstate.md)
- [injectQueries](../functions/injectqueries.md)
- [injectQuery](../functions/injectquery.md)
- [injectQueryClient](../functions/injectqueryclient.md)
- [mutationOptions](../functions/mutationoptions.md)
- [provideIsRestoring](../functions/provideisrestoring.md)
- [provideQueryClient](../functions/providequeryclient.md)
- [provideTanStackQuery](../functions/providetanstackquery.md)
- [queryFeature](../functions/queryfeature.md)
- [queryOptions](../functions/queryoptions.md)
- [withDevtools](../functions/withdevtools.md)



================================================
FILE: docs/framework/angular/reference/functions/infinitequeryoptions.md
================================================
---
id: infiniteQueryOptions
title: infiniteQueryOptions
---

# Function: infiniteQueryOptions()

Allows to share and re-use infinite query options in a type-safe way.

The `queryKey` will be tagged with the type from `queryFn`.

## Param

The infinite query options to tag with the type from `queryFn`.

## Call Signature

```ts
function infiniteQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam,
>(
  options,
): DefinedInitialDataInfiniteOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam
> &
  object
```

Allows to share and re-use infinite query options in a type-safe way.

The `queryKey` will be tagged with the type from `queryFn`.

### Type Parameters

• **TQueryFnData**

• **TError** = `Error`

• **TData** = `InfiniteData`\<`TQueryFnData`, `unknown`\>

• **TQueryKey** _extends_ readonly `unknown`[] = readonly `unknown`[]

• **TPageParam** = `unknown`

### Parameters

#### options

[`DefinedInitialDataInfiniteOptions`](../../type-aliases/definedinitialdatainfiniteoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`, `TPageParam`\>

The infinite query options to tag with the type from `queryFn`.

### Returns

[`DefinedInitialDataInfiniteOptions`](../../type-aliases/definedinitialdatainfiniteoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`, `TPageParam`\> & `object`

The tagged infinite query options.

The tagged infinite query options.

### Param

The infinite query options to tag with the type from `queryFn`.

### Defined in

[infinite-query-options.ts:94](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/infinite-query-options.ts#L94)

## Call Signature

```ts
function infiniteQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam,
>(
  options,
): UnusedSkipTokenInfiniteOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam
> &
  object
```

Allows to share and re-use infinite query options in a type-safe way.

The `queryKey` will be tagged with the type from `queryFn`.

### Type Parameters

• **TQueryFnData**

• **TError** = `Error`

• **TData** = `InfiniteData`\<`TQueryFnData`, `unknown`\>

• **TQueryKey** _extends_ readonly `unknown`[] = readonly `unknown`[]

• **TPageParam** = `unknown`

### Parameters

#### options

[`UnusedSkipTokenInfiniteOptions`](../../type-aliases/unusedskiptokeninfiniteoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`, `TPageParam`\>

The infinite query options to tag with the type from `queryFn`.

### Returns

[`UnusedSkipTokenInfiniteOptions`](../../type-aliases/unusedskiptokeninfiniteoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`, `TPageParam`\> & `object`

The tagged infinite query options.

The tagged infinite query options.

### Param

The infinite query options to tag with the type from `queryFn`.

### Defined in

[infinite-query-options.ts:126](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/infinite-query-options.ts#L126)

## Call Signature

```ts
function infiniteQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam,
>(
  options,
): UndefinedInitialDataInfiniteOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam
> &
  object
```

Allows to share and re-use infinite query options in a type-safe way.

The `queryKey` will be tagged with the type from `queryFn`.

### Type Parameters

• **TQueryFnData**

• **TError** = `Error`

• **TData** = `InfiniteData`\<`TQueryFnData`, `unknown`\>

• **TQueryKey** _extends_ readonly `unknown`[] = readonly `unknown`[]

• **TPageParam** = `unknown`

### Parameters

#### options

[`UndefinedInitialDataInfiniteOptions`](../../type-aliases/undefinedinitialdatainfiniteoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`, `TPageParam`\>

The infinite query options to tag with the type from `queryFn`.

### Returns

[`UndefinedInitialDataInfiniteOptions`](../../type-aliases/undefinedinitialdatainfiniteoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`, `TPageParam`\> & `object`

The tagged infinite query options.

The tagged infinite query options.

### Param

The infinite query options to tag with the type from `queryFn`.

### Defined in

[infinite-query-options.ts:158](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/infinite-query-options.ts#L158)



================================================
FILE: docs/framework/angular/reference/functions/injectinfinitequery.md
================================================
---
id: injectInfiniteQuery
title: injectInfiniteQuery
---

# Function: injectInfiniteQuery()

Injects an infinite query: a declarative dependency on an asynchronous source of data that is tied to a unique key.
Infinite queries can additively "load more" data onto an existing set of data or "infinite scroll"

## Param

A function that returns infinite query options.

## Param

Additional configuration.

## Call Signature

```ts
function injectInfiniteQuery<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam,
>(
  injectInfiniteQueryFn,
  options?,
): DefinedCreateInfiniteQueryResult<TData, TError>
```

Injects an infinite query: a declarative dependency on an asynchronous source of data that is tied to a unique key.
Infinite queries can additively "load more" data onto an existing set of data or "infinite scroll"

### Type Parameters

• **TQueryFnData**

• **TError** = `Error`

• **TData** = `InfiniteData`\<`TQueryFnData`, `unknown`\>

• **TQueryKey** _extends_ readonly `unknown`[] = readonly `unknown`[]

• **TPageParam** = `unknown`

### Parameters

#### injectInfiniteQueryFn

() => [`DefinedInitialDataInfiniteOptions`](../../type-aliases/definedinitialdatainfiniteoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`, `TPageParam`\>

A function that returns infinite query options.

#### options?

[`InjectInfiniteQueryOptions`](../../interfaces/injectinfinitequeryoptions.md)

Additional configuration.

### Returns

[`DefinedCreateInfiniteQueryResult`](../../type-aliases/definedcreateinfinitequeryresult.md)\<`TData`, `TError`\>

The infinite query result.

The infinite query result.

### Param

A function that returns infinite query options.

### Param

Additional configuration.

### Defined in

[inject-infinite-query.ts:42](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-infinite-query.ts#L42)

## Call Signature

```ts
function injectInfiniteQuery<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam,
>(injectInfiniteQueryFn, options?): CreateInfiniteQueryResult<TData, TError>
```

Injects an infinite query: a declarative dependency on an asynchronous source of data that is tied to a unique key.
Infinite queries can additively "load more" data onto an existing set of data or "infinite scroll"

### Type Parameters

• **TQueryFnData**

• **TError** = `Error`

• **TData** = `InfiniteData`\<`TQueryFnData`, `unknown`\>

• **TQueryKey** _extends_ readonly `unknown`[] = readonly `unknown`[]

• **TPageParam** = `unknown`

### Parameters

#### injectInfiniteQueryFn

() => [`UndefinedInitialDataInfiniteOptions`](../../type-aliases/undefinedinitialdatainfiniteoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`, `TPageParam`\>

A function that returns infinite query options.

#### options?

[`InjectInfiniteQueryOptions`](../../interfaces/injectinfinitequeryoptions.md)

Additional configuration.

### Returns

[`CreateInfiniteQueryResult`](../../type-aliases/createinfinitequeryresult.md)\<`TData`, `TError`\>

The infinite query result.

The infinite query result.

### Param

A function that returns infinite query options.

### Param

Additional configuration.

### Defined in

[inject-infinite-query.ts:67](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-infinite-query.ts#L67)

## Call Signature

```ts
function injectInfiniteQuery<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam,
>(injectInfiniteQueryFn, options?): CreateInfiniteQueryResult<TData, TError>
```

Injects an infinite query: a declarative dependency on an asynchronous source of data that is tied to a unique key.
Infinite queries can additively "load more" data onto an existing set of data or "infinite scroll"

### Type Parameters

• **TQueryFnData**

• **TError** = `Error`

• **TData** = `InfiniteData`\<`TQueryFnData`, `unknown`\>

• **TQueryKey** _extends_ readonly `unknown`[] = readonly `unknown`[]

• **TPageParam** = `unknown`

### Parameters

#### injectInfiniteQueryFn

() => [`CreateInfiniteQueryOptions`](../../interfaces/createinfinitequeryoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryFnData`, `TQueryKey`, `TPageParam`\>

A function that returns infinite query options.

#### options?

[`InjectInfiniteQueryOptions`](../../interfaces/injectinfinitequeryoptions.md)

Additional configuration.

### Returns

[`CreateInfiniteQueryResult`](../../type-aliases/createinfinitequeryresult.md)\<`TData`, `TError`\>

The infinite query result.

The infinite query result.

### Param

A function that returns infinite query options.

### Param

Additional configuration.

### Defined in

[inject-infinite-query.ts:92](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-infinite-query.ts#L92)



================================================
FILE: docs/framework/angular/reference/functions/injectisfetching.md
================================================
---
id: injectIsFetching
title: injectIsFetching
---

# Function: injectIsFetching()

```ts
function injectIsFetching(filters?, options?): Signal<number>
```

Injects a signal that tracks the number of queries that your application is loading or
fetching in the background.

Can be used for app-wide loading indicators

## Parameters

### filters?

`QueryFilters`\<readonly `unknown`[]\>

The filters to apply to the query.

### options?

[`InjectIsFetchingOptions`](../../interfaces/injectisfetchingoptions.md)

Additional configuration

## Returns

`Signal`\<`number`\>

signal with number of loading or fetching queries.

## Defined in

[inject-is-fetching.ts:32](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-is-fetching.ts#L32)



================================================
FILE: docs/framework/angular/reference/functions/injectismutating.md
================================================
---
id: injectIsMutating
title: injectIsMutating
---

# Function: injectIsMutating()

```ts
function injectIsMutating(filters?, options?): Signal<number>
```

Injects a signal that tracks the number of mutations that your application is fetching.

Can be used for app-wide loading indicators

## Parameters

### filters?

`MutationFilters`\<`unknown`, `Error`, `unknown`, `unknown`\>

The filters to apply to the query.

### options?

[`InjectIsMutatingOptions`](../../interfaces/injectismutatingoptions.md)

Additional configuration

## Returns

`Signal`\<`number`\>

signal with number of fetching mutations.

## Defined in

[inject-is-mutating.ts:31](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-is-mutating.ts#L31)



================================================
FILE: docs/framework/angular/reference/functions/injectisrestoring.md
================================================
---
id: injectIsRestoring
title: injectIsRestoring
---

# Function: injectIsRestoring()

```ts
function injectIsRestoring(options?): Signal<boolean>
```

Injects a signal that tracks whether a restore is currently in progress. [injectQuery](../injectquery.md) and friends also check this internally to avoid race conditions between the restore and initializing queries.

## Parameters

### options?

`InjectIsRestoringOptions`

Options for injectIsRestoring.

## Returns

`Signal`\<`boolean`\>

signal with boolean that indicates whether a restore is in progress.

## Defined in

[inject-is-restoring.ts:35](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-is-restoring.ts#L35)



================================================
FILE: docs/framework/angular/reference/functions/injectmutation.md
================================================
---
id: injectMutation
title: injectMutation
---

# Function: injectMutation()

```ts
function injectMutation<TData, TError, TVariables, TContext>(
  injectMutationFn,
  options?,
): CreateMutationResult<TData, TError, TVariables, TContext>
```

Injects a mutation: an imperative function that can be invoked which typically performs server side effects.

Unlike queries, mutations are not run automatically.

## Type Parameters

• **TData** = `unknown`

• **TError** = `Error`

• **TVariables** = `void`

• **TContext** = `unknown`

## Parameters

### injectMutationFn

() => [`CreateMutationOptions`](../../interfaces/createmutationoptions.md)\<`TData`, `TError`, `TVariables`, `TContext`\>

A function that returns mutation options.

### options?

[`InjectMutationOptions`](../../interfaces/injectmutationoptions.md)

Additional configuration

## Returns

[`CreateMutationResult`](../../type-aliases/createmutationresult.md)\<`TData`, `TError`, `TVariables`, `TContext`\>

The mutation.

## Defined in

[inject-mutation.ts:42](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-mutation.ts#L42)



================================================
FILE: docs/framework/angular/reference/functions/injectmutationstate.md
================================================
---
id: injectMutationState
title: injectMutationState
---

# Function: injectMutationState()

```ts
function injectMutationState<TResult>(
  injectMutationStateFn,
  options?,
): Signal<TResult[]>
```

Injects a signal that tracks the state of all mutations.

## Type Parameters

• **TResult** = `MutationState`\<`unknown`, `Error`, `unknown`, `unknown`\>

## Parameters

### injectMutationStateFn

() => `MutationStateOptions`\<`TResult`\>

A function that returns mutation state options.

### options?

[`InjectMutationStateOptions`](../../interfaces/injectmutationstateoptions.md)

The Angular injector to use.

## Returns

`Signal`\<`TResult`[]\>

The signal that tracks the state of all mutations.

## Defined in

[inject-mutation-state.ts:64](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-mutation-state.ts#L64)



================================================
FILE: docs/framework/angular/reference/functions/injectqueries.md
================================================
---
id: injectQueries
title: injectQueries
---

# Function: injectQueries()

```ts
function injectQueries<T, TCombinedResult>(
  __namedParameters,
  injector?,
): Signal<TCombinedResult>
```

## Type Parameters

• **T** _extends_ `any`[]

• **TCombinedResult** = `T` _extends_ [] ? [] : `T` _extends_ [`Head`] ? [`GetResults`\<`Head`\>] : `T` _extends_ [`Head`, `...Tail[]`] ? [`...Tail[]`] _extends_ [] ? [] : [`...Tail[]`] _extends_ [`Head`] ? [`GetResults`\<`Head`\>, `GetResults`\<`Head`\>] : [`...Tail[]`] _extends_ [`Head`, `...Tail[]`] ? [`...Tail[]`] _extends_ [] ? [] : [`...Tail[]`] _extends_ [`Head`] ? [`GetResults`\<`Head`\>, `GetResults`\<`Head`\>, `GetResults`\<`Head`\>] : [`...Tail[]`] _extends_ [`Head`, `...Tail[]`] ? [`...(...)[]`] _extends_ [] ? [] : ... _extends_ ... ? ... : ... : [`...(...)[]`] _extends_ ...[] ? ...[] : ...[] : [`...Tail[]`] _extends_ `QueryObserverOptionsForCreateQueries`\<`TQueryFnData`, `TError`, `TData`, `any`\>[] ? `QueryObserverResult`\<`unknown` _extends_ `TData` ? `TQueryFnData` : `TData`, `unknown` _extends_ `TError` ? `Error` : `TError`\>[] : `QueryObserverResult`[] : `T` _extends_ `QueryObserverOptionsForCreateQueries`\<`TQueryFnData`, `TError`, `TData`, `any`\>[] ? `QueryObserverResult`\<`unknown` _extends_ `TData` ? `TQueryFnData` : `TData`, `unknown` _extends_ `TError` ? `Error` : `TError`\>[] : `QueryObserverResult`[]

## Parameters

### \_\_namedParameters

#### combine

(`result`) => `TCombinedResult`

#### queries

`Signal`\<[`...(T extends [] ? [] : T extends [Head] ? [GetOptions<Head>] : T extends [Head, ...Tail[]] ? [...Tail[]] extends [] ? [] : [...Tail[]] extends [Head] ? [GetOptions<Head>, GetOptions<Head>] : [...Tail[]] extends [Head, ...Tail[]] ? [...(...)[]] extends [] ? [] : (...) extends (...) ? (...) : (...) : readonly (...)[] extends [...(...)[]] ? [...(...)[]] : (...) extends (...) ? (...) : (...) : readonly unknown[] extends T ? T : T extends QueryObserverOptionsForCreateQueries<TQueryFnData, TError, TData, TQueryKey>[] ? QueryObserverOptionsForCreateQueries<TQueryFnData, TError, TData, TQueryKey>[] : QueryObserverOptionsForCreateQueries<unknown, Error, unknown, readonly (...)[]>[])[]`]\>

### injector?

`Injector`

## Returns

`Signal`\<`TCombinedResult`\>

## Defined in

[inject-queries.ts:206](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-queries.ts#L206)



================================================
FILE: docs/framework/angular/reference/functions/injectquery.md
================================================
---
id: injectQuery
title: injectQuery
---

# Function: injectQuery()

Injects a query: a declarative dependency on an asynchronous source of data that is tied to a unique key.

**Basic example**

```ts
class ServiceOrComponent {
  query = injectQuery(() => ({
    queryKey: ['repoData'],
    queryFn: () =>
      this.#http.get<Response>('https://api.github.com/repos/tanstack/query'),
  }))
}
```

Similar to `computed` from Angular, the function passed to `injectQuery` will be run in the reactive context.
In the example below, the query will be automatically enabled and executed when the filter signal changes
to a truthy value. When the filter signal changes back to a falsy value, the query will be disabled.

**Reactive example**

```ts
class ServiceOrComponent {
  filter = signal('')

  todosQuery = injectQuery(() => ({
    queryKey: ['todos', this.filter()],
    queryFn: () => fetchTodos(this.filter()),
    // Signals can be combined with expressions
    enabled: !!this.filter(),
  }))
}
```

## Param

A function that returns query options.

## Param

Additional configuration

## See

https://tanstack.com/query/latest/docs/framework/angular/guides/queries

## Call Signature

```ts
function injectQuery<TQueryFnData, TError, TData, TQueryKey>(
  injectQueryFn,
  options?,
): DefinedCreateQueryResult<TData, TError>
```

Injects a query: a declarative dependency on an asynchronous source of data that is tied to a unique key.

**Basic example**

```ts
class ServiceOrComponent {
  query = injectQuery(() => ({
    queryKey: ['repoData'],
    queryFn: () =>
      this.#http.get<Response>('https://api.github.com/repos/tanstack/query'),
  }))
}
```

Similar to `computed` from Angular, the function passed to `injectQuery` will be run in the reactive context.
In the example below, the query will be automatically enabled and executed when the filter signal changes
to a truthy value. When the filter signal changes back to a falsy value, the query will be disabled.

**Reactive example**

```ts
class ServiceOrComponent {
  filter = signal('')

  todosQuery = injectQuery(() => ({
    queryKey: ['todos', this.filter()],
    queryFn: () => fetchTodos(this.filter()),
    // Signals can be combined with expressions
    enabled: !!this.filter(),
  }))
}
```

### Type Parameters

• **TQueryFnData** = `unknown`

• **TError** = `Error`

• **TData** = `TQueryFnData`

• **TQueryKey** _extends_ readonly `unknown`[] = readonly `unknown`[]

### Parameters

#### injectQueryFn

() => [`DefinedInitialDataOptions`](../../type-aliases/definedinitialdataoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`\>

A function that returns query options.

#### options?

[`InjectQueryOptions`](../../interfaces/injectqueryoptions.md)

Additional configuration

### Returns

[`DefinedCreateQueryResult`](../../type-aliases/definedcreatequeryresult.md)\<`TData`, `TError`\>

The query result.

The query result.

### Param

A function that returns query options.

### Param

Additional configuration

### See

https://tanstack.com/query/latest/docs/framework/angular/guides/queries

### See

https://tanstack.com/query/latest/docs/framework/angular/guides/queries

### Defined in

[inject-query.ts:66](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-query.ts#L66)

## Call Signature

```ts
function injectQuery<TQueryFnData, TError, TData, TQueryKey>(
  injectQueryFn,
  options?,
): CreateQueryResult<TData, TError>
```

Injects a query: a declarative dependency on an asynchronous source of data that is tied to a unique key.

**Basic example**

```ts
class ServiceOrComponent {
  query = injectQuery(() => ({
    queryKey: ['repoData'],
    queryFn: () =>
      this.#http.get<Response>('https://api.github.com/repos/tanstack/query'),
  }))
}
```

Similar to `computed` from Angular, the function passed to `injectQuery` will be run in the reactive context.
In the example below, the query will be automatically enabled and executed when the filter signal changes
to a truthy value. When the filter signal changes back to a falsy value, the query will be disabled.

**Reactive example**

```ts
class ServiceOrComponent {
  filter = signal('')

  todosQuery = injectQuery(() => ({
    queryKey: ['todos', this.filter()],
    queryFn: () => fetchTodos(this.filter()),
    // Signals can be combined with expressions
    enabled: !!this.filter(),
  }))
}
```

### Type Parameters

• **TQueryFnData** = `unknown`

• **TError** = `Error`

• **TData** = `TQueryFnData`

• **TQueryKey** _extends_ readonly `unknown`[] = readonly `unknown`[]

### Parameters

#### injectQueryFn

() => [`UndefinedInitialDataOptions`](../../type-aliases/undefinedinitialdataoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`\>

A function that returns query options.

#### options?

[`InjectQueryOptions`](../../interfaces/injectqueryoptions.md)

Additional configuration

### Returns

[`CreateQueryResult`](../../type-aliases/createqueryresult.md)\<`TData`, `TError`\>

The query result.

The query result.

### Param

A function that returns query options.

### Param

Additional configuration

### See

https://tanstack.com/query/latest/docs/framework/angular/guides/queries

### See

https://tanstack.com/query/latest/docs/framework/angular/guides/queries

### Defined in

[inject-query.ts:118](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-query.ts#L118)

## Call Signature

```ts
function injectQuery<TQueryFnData, TError, TData, TQueryKey>(
  injectQueryFn,
  options?,
): CreateQueryResult<TData, TError>
```

Injects a query: a declarative dependency on an asynchronous source of data that is tied to a unique key.

**Basic example**

```ts
class ServiceOrComponent {
  query = injectQuery(() => ({
    queryKey: ['repoData'],
    queryFn: () =>
      this.#http.get<Response>('https://api.github.com/repos/tanstack/query'),
  }))
}
```

Similar to `computed` from Angular, the function passed to `injectQuery` will be run in the reactive context.
In the example below, the query will be automatically enabled and executed when the filter signal changes
to a truthy value. When the filter signal changes back to a falsy value, the query will be disabled.

**Reactive example**

```ts
class ServiceOrComponent {
  filter = signal('')

  todosQuery = injectQuery(() => ({
    queryKey: ['todos', this.filter()],
    queryFn: () => fetchTodos(this.filter()),
    // Signals can be combined with expressions
    enabled: !!this.filter(),
  }))
}
```

### Type Parameters

• **TQueryFnData** = `unknown`

• **TError** = `Error`

• **TData** = `TQueryFnData`

• **TQueryKey** _extends_ readonly `unknown`[] = readonly `unknown`[]

### Parameters

#### injectQueryFn

() => [`CreateQueryOptions`](../../interfaces/createqueryoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`\>

A function that returns query options.

#### options?

[`InjectQueryOptions`](../../interfaces/injectqueryoptions.md)

Additional configuration

### Returns

[`CreateQueryResult`](../../type-aliases/createqueryresult.md)\<`TData`, `TError`\>

The query result.

The query result.

### Param

A function that returns query options.

### Param

Additional configuration

### See

https://tanstack.com/query/latest/docs/framework/angular/guides/queries

### See

https://tanstack.com/query/latest/docs/framework/angular/guides/queries

### Defined in

[inject-query.ts:170](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-query.ts#L170)



================================================
FILE: docs/framework/angular/reference/functions/injectqueryclient.md
================================================
---
id: injectQueryClient
title: injectQueryClient
---

# Function: ~~injectQueryClient()~~

```ts
function injectQueryClient(injectOptions): QueryClient
```

Injects a `QueryClient` instance and allows passing a custom injector.

## Parameters

### injectOptions

`InjectOptions` & `object` = `{}`

Type of the options argument to inject and optionally a custom injector.

## Returns

`QueryClient`

The `QueryClient` instance.

## Deprecated

Use `inject(QueryClient)` instead.
If you need to get a `QueryClient` from a custom injector, use `injector.get(QueryClient)`.

**Example**

```ts
const queryClient = injectQueryClient()
```

## Defined in

[inject-query-client.ts:19](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-query-client.ts#L19)



================================================
FILE: docs/framework/angular/reference/functions/mutationoptions.md
================================================
---
id: mutationOptions
title: mutationOptions
---

# Function: mutationOptions()

```ts
function mutationOptions<TData, TError, TVariables, TContext>(
  options,
): CreateMutationOptions<TData, TError, TVariables, TContext>
```

Allows to share and re-use mutation options in a type-safe way.

**Example**

```ts
export class QueriesService {
  private http = inject(HttpClient)

  updatePost(id: number) {
    return mutationOptions({
      mutationFn: (post: Post) => Promise.resolve(post),
      mutationKey: ['updatePost', id],
      onSuccess: (newPost) => {
        //           ^? newPost: Post
        this.queryClient.setQueryData(['posts', id], newPost)
      },
    })
  }
}

queries = inject(QueriesService)
idSignal = new Signal(0)
mutation = injectMutation(() => this.queries.updatePost(this.idSignal()))

mutation.mutate({ title: 'New Title' })
```

## Type Parameters

• **TData** = `unknown`

• **TError** = `Error`

• **TVariables** = `void`

• **TContext** = `unknown`

## Parameters

### options

`MutationObserverOptions`\<`TData`, `TError`, `TVariables`, `TContext`\>

The mutation options.

## Returns

[`CreateMutationOptions`](../../interfaces/createmutationoptions.md)\<`TData`, `TError`, `TVariables`, `TContext`\>

Mutation options.

## Defined in

[mutation-options.ts:38](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/mutation-options.ts#L38)



================================================
FILE: docs/framework/angular/reference/functions/provideisrestoring.md
================================================
---
id: provideIsRestoring
title: provideIsRestoring
---

# Function: provideIsRestoring()

```ts
function provideIsRestoring(isRestoring): Provider
```

Used by TanStack Query Angular persist client plugin to provide the signal that tracks the restore state

## Parameters

### isRestoring

`Signal`\<`boolean`\>

a readonly signal that returns a boolean

## Returns

`Provider`

Provider for the `isRestoring` signal

## Defined in

[inject-is-restoring.ts:47](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-is-restoring.ts#L47)



================================================
FILE: docs/framework/angular/reference/functions/providequeryclient.md
================================================
---
id: provideQueryClient
title: provideQueryClient
---

# Function: provideQueryClient()

```ts
function provideQueryClient(queryClient): Provider
```

Usually [provideTanStackQuery](../providetanstackquery.md) is used once to set up TanStack Query and the
[https://tanstack.com/query/latest/docs/reference/QueryClient\|QueryClient](https://tanstack.com/query/latest/docs/reference/QueryClient|QueryClient)
for the entire application. Internally it calls `provideQueryClient`.
You can use `provideQueryClient` to provide a different `QueryClient` instance for a part
of the application or for unit testing purposes.

## Parameters

### queryClient

A `QueryClient` instance, or an `InjectionToken` which provides a `QueryClient`.

`QueryClient` | `InjectionToken`\<`QueryClient`\>

## Returns

`Provider`

a provider object that can be used to provide the `QueryClient` instance.

## Defined in

[providers.ts:31](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L31)



================================================
FILE: docs/framework/angular/reference/functions/providetanstackquery.md
================================================
---
id: provideTanStackQuery
title: provideTanStackQuery
---

# Function: provideTanStackQuery()

```ts
function provideTanStackQuery(queryClient, ...features): Provider[]
```

Sets up providers necessary to enable TanStack Query functionality for Angular applications.

Allows to configure a `QueryClient` and optional features such as developer tools.

**Example - standalone**

```ts
import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental'

bootstrapApplication(AppComponent, {
  providers: [provideTanStackQuery(new QueryClient())],
})
```

**Example - NgModule-based**

```ts
import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [provideTanStackQuery(new QueryClient())],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

You can also enable optional developer tools by adding `withDevtools`. By
default the tools will then be loaded when your app is in development mode.

```ts
import {
  provideTanStackQuery,
  withDevtools
  QueryClient,
} from '@tanstack/angular-query-experimental'

bootstrapApplication(AppComponent,
  {
    providers: [
      provideTanStackQuery(new QueryClient(), withDevtools())
    ]
  }
)
```

**Example: using an InjectionToken**

```ts
export const MY_QUERY_CLIENT = new InjectionToken('', {
  factory: () => new QueryClient(),
})

// In a lazy loaded route or lazy loaded component's providers array:
providers: [provideTanStackQuery(MY_QUERY_CLIENT)]
```

## Parameters

### queryClient

A `QueryClient` instance, or an `InjectionToken` which provides a `QueryClient`.

`QueryClient` | `InjectionToken`\<`QueryClient`\>

### features

...[`QueryFeatures`](../../type-aliases/queryfeatures.md)[]

Optional features to configure additional Query functionality.

## Returns

`Provider`[]

A set of providers to set up TanStack Query.

## See

- https://tanstack.com/query/v5/docs/framework/angular/quick-start
- withDevtools

## Defined in

[providers.ts:118](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L118)



================================================
FILE: docs/framework/angular/reference/functions/queryfeature.md
================================================
---
id: queryFeature
title: queryFeature
---

# Function: queryFeature()

```ts
function queryFeature<TFeatureKind>(kind, providers): QueryFeature<TFeatureKind>
```

Helper function to create an object that represents a Query feature.

## Type Parameters

• **TFeatureKind** _extends_ `"DeveloperTools"` \| `"PersistQueryClient"`

## Parameters

### kind

`TFeatureKind`

### providers

`Provider`[]

## Returns

[`QueryFeature`](../../interfaces/queryfeature.md)\<`TFeatureKind`\>

A Query feature.

## Defined in

[providers.ts:156](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L156)



================================================
FILE: docs/framework/angular/reference/functions/queryoptions.md
================================================
---
id: queryOptions
title: queryOptions
---

# Function: queryOptions()

Allows to share and re-use query options in a type-safe way.

The `queryKey` will be tagged with the type from `queryFn`.

**Example**

```ts
const { queryKey } = queryOptions({
  queryKey: ['key'],
  queryFn: () => Promise.resolve(5),
  //  ^?  Promise<number>
})

const queryClient = new QueryClient()
const data = queryClient.getQueryData(queryKey)
//    ^?  number | undefined
```

## Param

The query options to tag with the type from `queryFn`.

## Call Signature

```ts
function queryOptions<TQueryFnData, TError, TData, TQueryKey>(
  options,
): DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey> & object
```

Allows to share and re-use query options in a type-safe way.

The `queryKey` will be tagged with the type from `queryFn`.

**Example**

```ts
const { queryKey } = queryOptions({
  queryKey: ['key'],
  queryFn: () => Promise.resolve(5),
  //  ^?  Promise<number>
})

const queryClient = new QueryClient()
const data = queryClient.getQueryData(queryKey)
//    ^?  number | undefined
```

### Type Parameters

• **TQueryFnData** = `unknown`

• **TError** = `Error`

• **TData** = `TQueryFnData`

• **TQueryKey** _extends_ readonly `unknown`[] = readonly `unknown`[]

### Parameters

#### options

[`DefinedInitialDataOptions`](../../type-aliases/definedinitialdataoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`\>

The query options to tag with the type from `queryFn`.

### Returns

[`DefinedInitialDataOptions`](../../type-aliases/definedinitialdataoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`\> & `object`

The tagged query options.

The tagged query options.

### Param

The query options to tag with the type from `queryFn`.

### Defined in

[query-options.ts:78](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/query-options.ts#L78)

## Call Signature

```ts
function queryOptions<TQueryFnData, TError, TData, TQueryKey>(
  options,
): UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey> & object
```

Allows to share and re-use query options in a type-safe way.

The `queryKey` will be tagged with the type from `queryFn`.

**Example**

```ts
const { queryKey } = queryOptions({
  queryKey: ['key'],
  queryFn: () => Promise.resolve(5),
  //  ^?  Promise<number>
})

const queryClient = new QueryClient()
const data = queryClient.getQueryData(queryKey)
//    ^?  number | undefined
```

### Type Parameters

• **TQueryFnData** = `unknown`

• **TError** = `Error`

• **TData** = `TQueryFnData`

• **TQueryKey** _extends_ readonly `unknown`[] = readonly `unknown`[]

### Parameters

#### options

[`UnusedSkipTokenOptions`](../../type-aliases/unusedskiptokenoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`\>

The query options to tag with the type from `queryFn`.

### Returns

[`UnusedSkipTokenOptions`](../../type-aliases/unusedskiptokenoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`\> & `object`

The tagged query options.

The tagged query options.

### Param

The query options to tag with the type from `queryFn`.

### Defined in

[query-options.ts:111](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/query-options.ts#L111)

## Call Signature

```ts
function queryOptions<TQueryFnData, TError, TData, TQueryKey>(
  options,
): UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey> & object
```

Allows to share and re-use query options in a type-safe way.

The `queryKey` will be tagged with the type from `queryFn`.

**Example**

```ts
const { queryKey } = queryOptions({
  queryKey: ['key'],
  queryFn: () => Promise.resolve(5),
  //  ^?  Promise<number>
})

const queryClient = new QueryClient()
const data = queryClient.getQueryData(queryKey)
//    ^?  number | undefined
```

### Type Parameters

• **TQueryFnData** = `unknown`

• **TError** = `Error`

• **TData** = `TQueryFnData`

• **TQueryKey** _extends_ readonly `unknown`[] = readonly `unknown`[]

### Parameters

#### options

[`UndefinedInitialDataOptions`](../../type-aliases/undefinedinitialdataoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`\>

The query options to tag with the type from `queryFn`.

### Returns

[`UndefinedInitialDataOptions`](../../type-aliases/undefinedinitialdataoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryKey`\> & `object`

The tagged query options.

The tagged query options.

### Param

The query options to tag with the type from `queryFn`.

### Defined in

[query-options.ts:144](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/query-options.ts#L144)



================================================
FILE: docs/framework/angular/reference/functions/withdevtools.md
================================================
---
id: withDevtools
title: withDevtools
---

# Function: withDevtools()

```ts
function withDevtools(withDevtoolsFn?): DeveloperToolsFeature
```

Enables developer tools.

**Example**

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideTanStackQuery(new QueryClient(), withDevtools())],
}
```

By default the devtools will be loaded when Angular runs in development mode and rendered in `<body>`.

If you need more control over when devtools are loaded, you can use the `loadDevtools` option. This is particularly useful if you want to load devtools based on environment configurations. For instance, you might have a test environment running in production mode but still require devtools to be available.

If you need more control over where devtools are rendered, consider `injectDevtoolsPanel`. This allows rendering devtools inside your own devtools for example.

## Parameters

### withDevtoolsFn?

() => [`DevtoolsOptions`](../../interfaces/devtoolsoptions.md)

A function that returns `DevtoolsOptions`.

## Returns

[`DeveloperToolsFeature`](../../type-aliases/developertoolsfeature.md)

A set of providers for use with `provideTanStackQuery`.

## See

- [provideTanStackQuery](../providetanstackquery.md)
- [DevtoolsOptions](../../interfaces/devtoolsoptions.md)

## Defined in

[providers.ts:262](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L262)



================================================
FILE: docs/framework/angular/reference/interfaces/basemutationnarrowing.md
================================================
---
id: BaseMutationNarrowing
title: BaseMutationNarrowing
---

# Interface: BaseMutationNarrowing\<TData, TError, TVariables, TContext\>

## Type Parameters

• **TData** = `unknown`

• **TError** = `DefaultError`

• **TVariables** = `unknown`

• **TContext** = `unknown`

## Properties

### isError

```ts
isError: SignalFunction<
  (this) => this is CreateMutationResult<
    TData,
    TError,
    TVariables,
    TContext,
    Override<
      MutationObserverErrorResult<TData, TError, TVariables, TContext>,
      { mutate: CreateMutateFunction<TData, TError, TVariables, TContext> }
    > & {
      mutateAsync: CreateMutateAsyncFunction<
        TData,
        TError,
        TVariables,
        TContext
      >
    }
  >
>
```

#### Defined in

[types.ts:242](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L242)

---

### isIdle

```ts
isIdle: SignalFunction<
  (this) => this is CreateMutationResult<
    TData,
    TError,
    TVariables,
    TContext,
    Override<
      MutationObserverIdleResult<TData, TError, TVariables, TContext>,
      { mutate: CreateMutateFunction<TData, TError, TVariables, TContext> }
    > & {
      mutateAsync: CreateMutateAsyncFunction<
        TData,
        TError,
        TVariables,
        TContext
      >
    }
  >
>
```

#### Defined in

[types.ts:276](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L276)

---

### isPending

```ts
isPending: SignalFunction<
  (this) => this is CreateMutationResult<
    TData,
    TError,
    TVariables,
    TContext,
    Override<
      MutationObserverLoadingResult<TData, TError, TVariables, TContext>,
      { mutate: CreateMutateFunction<TData, TError, TVariables, TContext> }
    > & {
      mutateAsync: CreateMutateAsyncFunction<
        TData,
        TError,
        TVariables,
        TContext
      >
    }
  >
>
```

#### Defined in

[types.ts:259](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L259)

---

### isSuccess

```ts
isSuccess: SignalFunction<
  (this) => this is CreateMutationResult<
    TData,
    TError,
    TVariables,
    TContext,
    Override<
      MutationObserverSuccessResult<TData, TError, TVariables, TContext>,
      { mutate: CreateMutateFunction<TData, TError, TVariables, TContext> }
    > & {
      mutateAsync: CreateMutateAsyncFunction<
        TData,
        TError,
        TVariables,
        TContext
      >
    }
  >
>
```

#### Defined in

[types.ts:225](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L225)



================================================
FILE: docs/framework/angular/reference/interfaces/basequerynarrowing.md
================================================
---
id: BaseQueryNarrowing
title: BaseQueryNarrowing
---

# Interface: BaseQueryNarrowing\<TData, TError\>

## Type Parameters

• **TData** = `unknown`

• **TError** = `DefaultError`

## Properties

### isError()

```ts
isError: (this) => this is CreateBaseQueryResult<TData, TError, CreateStatusBasedQueryResult<"error", TData, TError>>;
```

#### Parameters

##### this

[`CreateBaseQueryResult`](../../type-aliases/createbasequeryresult.md)\<`TData`, `TError`, `QueryObserverResult`\<`TData`, `TError`\>\>

#### Returns

`this is CreateBaseQueryResult<TData, TError, CreateStatusBasedQueryResult<"error", TData, TError>>`

#### Defined in

[types.ts:76](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L76)

---

### isPending()

```ts
isPending: (this) => this is CreateBaseQueryResult<TData, TError, CreateStatusBasedQueryResult<"pending", TData, TError>>;
```

#### Parameters

##### this

[`CreateBaseQueryResult`](../../type-aliases/createbasequeryresult.md)\<`TData`, `TError`, `QueryObserverResult`\<`TData`, `TError`\>\>

#### Returns

`this is CreateBaseQueryResult<TData, TError, CreateStatusBasedQueryResult<"pending", TData, TError>>`

#### Defined in

[types.ts:83](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L83)

---

### isSuccess()

```ts
isSuccess: (this) => this is CreateBaseQueryResult<TData, TError, CreateStatusBasedQueryResult<"success", TData, TError>>;
```

#### Parameters

##### this

[`CreateBaseQueryResult`](../../type-aliases/createbasequeryresult.md)\<`TData`, `TError`, `QueryObserverResult`\<`TData`, `TError`\>\>

#### Returns

`this is CreateBaseQueryResult<TData, TError, CreateStatusBasedQueryResult<"success", TData, TError>>`

#### Defined in

[types.ts:69](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L69)



================================================
FILE: docs/framework/angular/reference/interfaces/createbasequeryoptions.md
================================================
---
id: CreateBaseQueryOptions
title: CreateBaseQueryOptions
---

# Interface: CreateBaseQueryOptions\<TQueryFnData, TError, TData, TQueryData, TQueryKey\>

## Extends

- `QueryObserverOptions`\<`TQueryFnData`, `TError`, `TData`, `TQueryData`, `TQueryKey`\>

## Type Parameters

• **TQueryFnData** = `unknown`

• **TError** = `DefaultError`

• **TData** = `TQueryFnData`

• **TQueryData** = `TQueryFnData`

• **TQueryKey** _extends_ `QueryKey` = `QueryKey`



================================================
FILE: docs/framework/angular/reference/interfaces/createinfinitequeryoptions.md
================================================
---
id: CreateInfiniteQueryOptions
title: CreateInfiniteQueryOptions
---

# Interface: CreateInfiniteQueryOptions\<TQueryFnData, TError, TData, TQueryData, TQueryKey, TPageParam\>

## Extends

- `OmitKeyof`\<`InfiniteQueryObserverOptions`\<`TQueryFnData`, `TError`, `TData`, `TQueryData`, `TQueryKey`, `TPageParam`\>, `"suspense"`\>

## Type Parameters

• **TQueryFnData** = `unknown`

• **TError** = `DefaultError`

• **TData** = `TQueryFnData`

• **TQueryData** = `TQueryFnData`

• **TQueryKey** _extends_ `QueryKey` = `QueryKey`

• **TPageParam** = `unknown`



================================================
FILE: docs/framework/angular/reference/interfaces/createmutationoptions.md
================================================
---
id: CreateMutationOptions
title: CreateMutationOptions
---

# Interface: CreateMutationOptions\<TData, TError, TVariables, TContext\>

## Extends

- `OmitKeyof`\<`MutationObserverOptions`\<`TData`, `TError`, `TVariables`, `TContext`\>, `"_defaulted"`\>

## Type Parameters

• **TData** = `unknown`

• **TError** = `DefaultError`

• **TVariables** = `void`

• **TContext** = `unknown`



================================================
FILE: docs/framework/angular/reference/interfaces/createqueryoptions.md
================================================
---
id: CreateQueryOptions
title: CreateQueryOptions
---

# Interface: CreateQueryOptions\<TQueryFnData, TError, TData, TQueryKey\>

## Extends

- `OmitKeyof`\<[`CreateBaseQueryOptions`](../createbasequeryoptions.md)\<`TQueryFnData`, `TError`, `TData`, `TQueryFnData`, `TQueryKey`\>, `"suspense"`\>

## Type Parameters

• **TQueryFnData** = `unknown`

• **TError** = `DefaultError`

• **TData** = `TQueryFnData`

• **TQueryKey** _extends_ `QueryKey` = `QueryKey`



================================================
FILE: docs/framework/angular/reference/interfaces/devtoolsoptions.md
================================================
---
id: DevtoolsOptions
title: DevtoolsOptions
---

# Interface: DevtoolsOptions

Options for configuring the TanStack Query devtools.

## Properties

### buttonPosition?

```ts
optional buttonPosition: DevtoolsButtonPosition;
```

The position of the TanStack logo to open and close the devtools panel.
`top-left` | `top-right` | `bottom-left` | `bottom-right` | `relative`
Defaults to `bottom-right`.

#### Defined in

[providers.ts:192](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L192)

---

### client?

```ts
optional client: QueryClient;
```

Custom instance of QueryClient

#### Defined in

[providers.ts:202](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L202)

---

### errorTypes?

```ts
optional errorTypes: DevtoolsErrorType[];
```

Use this so you can define custom errors that can be shown in the devtools.

#### Defined in

[providers.ts:206](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L206)

---

### initialIsOpen?

```ts
optional initialIsOpen: boolean;
```

Set this true if you want the devtools to default to being open

#### Defined in

[providers.ts:186](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L186)

---

### loadDevtools?

```ts
optional loadDevtools: boolean | "auto";
```

Whether the developer tools should load.

- `auto`- (Default) Lazily loads devtools when in development mode. Skips loading in production mode.
- `true`- Always load the devtools, regardless of the environment.
- `false`- Never load the devtools, regardless of the environment.

You can use `true` and `false` to override loading developer tools from an environment file.
For example, a test environment might run in production mode but you may want to load developer tools.

Additionally, you can use a signal in the callback to dynamically load the devtools based on a condition. For example,
a signal created from a RxJS observable that listens for a keyboard shortcut.

**Example**

```ts
withDevtools(() => ({
  initialIsOpen: true,
  loadDevtools: inject(ExampleService).loadDevtools(),
}))
```

#### Defined in

[providers.ts:236](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L236)

---

### position?

```ts
optional position: DevtoolsPosition;
```

The position of the TanStack Query devtools panel.
`top` | `bottom` | `left` | `right`
Defaults to `bottom`.

#### Defined in

[providers.ts:198](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L198)

---

### shadowDOMTarget?

```ts
optional shadowDOMTarget: ShadowRoot;
```

Use this so you can attach the devtool's styles to a specific element in the DOM.

#### Defined in

[providers.ts:214](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L214)

---

### styleNonce?

```ts
optional styleNonce: string;
```

Use this to pass a nonce to the style tag that is added to the document head. This is useful if you are using a Content Security Policy (CSP) nonce to allow inline styles.

#### Defined in

[providers.ts:210](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L210)



================================================
FILE: docs/framework/angular/reference/interfaces/injectinfinitequeryoptions.md
================================================
---
id: InjectInfiniteQueryOptions
title: InjectInfiniteQueryOptions
---

# Interface: InjectInfiniteQueryOptions

## Properties

### injector?

```ts
optional injector: Injector;
```

The `Injector` in which to create the infinite query.

If this is not provided, the current injection context will be used instead (via `inject`).

#### Defined in

[inject-infinite-query.ts:31](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-infinite-query.ts#L31)



================================================
FILE: docs/framework/angular/reference/interfaces/injectisfetchingoptions.md
================================================
---
id: InjectIsFetchingOptions
title: InjectIsFetchingOptions
---

# Interface: InjectIsFetchingOptions

## Properties

### injector?

```ts
optional injector: Injector;
```

The `Injector` in which to create the isFetching signal.

If this is not provided, the current injection context will be used instead (via `inject`).

#### Defined in

[inject-is-fetching.ts:19](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-is-fetching.ts#L19)



================================================
FILE: docs/framework/angular/reference/interfaces/injectismutatingoptions.md
================================================
---
id: InjectIsMutatingOptions
title: InjectIsMutatingOptions
---

# Interface: InjectIsMutatingOptions

## Properties

### injector?

```ts
optional injector: Injector;
```

The `Injector` in which to create the isMutating signal.

If this is not provided, the current injection context will be used instead (via `inject`).

#### Defined in

[inject-is-mutating.ts:19](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-is-mutating.ts#L19)



================================================
FILE: docs/framework/angular/reference/interfaces/injectmutationoptions.md
================================================
---
id: InjectMutationOptions
title: InjectMutationOptions
---

# Interface: InjectMutationOptions

## Properties

### injector?

```ts
optional injector: Injector;
```

The `Injector` in which to create the mutation.

If this is not provided, the current injection context will be used instead (via `inject`).

#### Defined in

[inject-mutation.ts:30](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-mutation.ts#L30)



================================================
FILE: docs/framework/angular/reference/interfaces/injectmutationstateoptions.md
================================================
---
id: InjectMutationStateOptions
title: InjectMutationStateOptions
---

# Interface: InjectMutationStateOptions

## Properties

### injector?

```ts
optional injector: Injector;
```

The `Injector` in which to create the mutation state signal.

If this is not provided, the current injection context will be used instead (via `inject`).

#### Defined in

[inject-mutation-state.ts:54](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-mutation-state.ts#L54)



================================================
FILE: docs/framework/angular/reference/interfaces/injectqueryoptions.md
================================================
---
id: InjectQueryOptions
title: InjectQueryOptions
---

# Interface: InjectQueryOptions

## Properties

### injector?

```ts
optional injector: Injector;
```

The `Injector` in which to create the query.

If this is not provided, the current injection context will be used instead (via `inject`).

#### Defined in

[inject-query.ts:26](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-query.ts#L26)



================================================
FILE: docs/framework/angular/reference/interfaces/queryfeature.md
================================================
---
id: QueryFeature
title: QueryFeature
---

# Interface: QueryFeature\<TFeatureKind\>

Helper type to represent a Query feature.

## Type Parameters

• **TFeatureKind** _extends_ [`QueryFeatureKind`](../../type-aliases/queryfeaturekind.md)

## Properties

### ɵkind

```ts
ɵkind: TFeatureKind
```

#### Defined in

[providers.ts:146](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L146)

---

### ɵproviders

```ts
ɵproviders: Provider[];
```

#### Defined in

[providers.ts:147](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L147)



================================================
FILE: docs/framework/angular/reference/type-aliases/createbasemutationresult.md
================================================
---
id: CreateBaseMutationResult
title: CreateBaseMutationResult
---

# Type Alias: CreateBaseMutationResult\<TData, TError, TVariables, TContext\>

```ts
type CreateBaseMutationResult<TData, TError, TVariables, TContext> = Override<
  MutationObserverResult<TData, TError, TVariables, TContext>,
  {
    mutate: CreateMutateFunction<TData, TError, TVariables, TContext>
  }
> &
  object
```

## Type declaration

### mutateAsync

```ts
mutateAsync: CreateMutateAsyncFunction<TData, TError, TVariables, TContext>
```

## Type Parameters

• **TData** = `unknown`

• **TError** = `DefaultError`

• **TVariables** = `unknown`

• **TContext** = `unknown`

## Defined in

[types.ts:188](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L188)



================================================
FILE: docs/framework/angular/reference/type-aliases/createbasequeryresult.md
================================================
---
id: CreateBaseQueryResult
title: CreateBaseQueryResult
---

# Type Alias: CreateBaseQueryResult\<TData, TError, TState\>

```ts
type CreateBaseQueryResult<TData, TError, TState> = BaseQueryNarrowing<
  TData,
  TError
> &
  MapToSignals<OmitKeyof<TState, keyof BaseQueryNarrowing, 'safely'>>
```

## Type Parameters

• **TData** = `unknown`

• **TError** = `DefaultError`

• **TState** = `QueryObserverResult`\<`TData`, `TError`\>

## Defined in

[types.ts:117](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L117)



================================================
FILE: docs/framework/angular/reference/type-aliases/createinfinitequeryresult.md
================================================
---
id: CreateInfiniteQueryResult
title: CreateInfiniteQueryResult
---

# Type Alias: CreateInfiniteQueryResult\<TData, TError\>

```ts
type CreateInfiniteQueryResult<TData, TError> = BaseQueryNarrowing<
  TData,
  TError
> &
  MapToSignals<InfiniteQueryObserverResult<TData, TError>>
```

## Type Parameters

• **TData** = `unknown`

• **TError** = `DefaultError`

## Defined in

[types.ts:145](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L145)



================================================
FILE: docs/framework/angular/reference/type-aliases/createmutateasyncfunction.md
================================================
---
id: CreateMutateAsyncFunction
title: CreateMutateAsyncFunction
---

# Type Alias: CreateMutateAsyncFunction\<TData, TError, TVariables, TContext\>

```ts
type CreateMutateAsyncFunction<TData, TError, TVariables, TContext> =
  MutateFunction<TData, TError, TVariables, TContext>
```

## Type Parameters

• **TData** = `unknown`

• **TError** = `DefaultError`

• **TVariables** = `void`

• **TContext** = `unknown`

## Defined in

[types.ts:178](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L178)



================================================
FILE: docs/framework/angular/reference/type-aliases/createmutatefunction.md
================================================
---
id: CreateMutateFunction
title: CreateMutateFunction
---

# Type Alias: CreateMutateFunction()\<TData, TError, TVariables, TContext\>

```ts
type CreateMutateFunction<TData, TError, TVariables, TContext> = (
  ...args
) => void
```

## Type Parameters

• **TData** = `unknown`

• **TError** = `DefaultError`

• **TVariables** = `void`

• **TContext** = `unknown`

## Parameters

### args

...`Parameters`\<`MutateFunction`\<`TData`, `TError`, `TVariables`, `TContext`\>\>

## Returns

`void`

## Defined in

[types.ts:166](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L166)



================================================
FILE: docs/framework/angular/reference/type-aliases/createmutationresult.md
================================================
---
id: CreateMutationResult
title: CreateMutationResult
---

# Type Alias: CreateMutationResult\<TData, TError, TVariables, TContext, TState\>

```ts
type CreateMutationResult<TData, TError, TVariables, TContext, TState> =
  BaseMutationNarrowing<TData, TError, TVariables, TContext> &
    MapToSignals<OmitKeyof<TState, keyof BaseMutationNarrowing, 'safely'>>
```

## Type Parameters

• **TData** = `unknown`

• **TError** = `DefaultError`

• **TVariables** = `unknown`

• **TContext** = `unknown`

• **TState** = `CreateStatusBasedMutationResult`\<[`CreateBaseMutationResult`](../createbasemutationresult.md)\[`"status"`\], `TData`, `TError`, `TVariables`, `TContext`\>

## Defined in

[types.ts:298](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L298)



================================================
FILE: docs/framework/angular/reference/type-aliases/createqueryresult.md
================================================
---
id: CreateQueryResult
title: CreateQueryResult
---

# Type Alias: CreateQueryResult\<TData, TError\>

```ts
type CreateQueryResult<TData, TError> = CreateBaseQueryResult<TData, TError>
```

## Type Parameters

• **TData** = `unknown`

• **TError** = `DefaultError`

## Defined in

[types.ts:127](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L127)



================================================
FILE: docs/framework/angular/reference/type-aliases/definedcreateinfinitequeryresult.md
================================================
---
id: DefinedCreateInfiniteQueryResult
title: DefinedCreateInfiniteQueryResult
---

# Type Alias: DefinedCreateInfiniteQueryResult\<TData, TError, TDefinedInfiniteQueryObserver\>

```ts
type DefinedCreateInfiniteQueryResult<
  TData,
  TError,
  TDefinedInfiniteQueryObserver,
> = MapToSignals<TDefinedInfiniteQueryObserver>
```

## Type Parameters

• **TData** = `unknown`

• **TError** = `DefaultError`

• **TDefinedInfiniteQueryObserver** = `DefinedInfiniteQueryObserverResult`\<`TData`, `TError`\>

## Defined in

[types.ts:154](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L154)



================================================
FILE: docs/framework/angular/reference/type-aliases/definedcreatequeryresult.md
================================================
---
id: DefinedCreateQueryResult
title: DefinedCreateQueryResult
---

# Type Alias: DefinedCreateQueryResult\<TData, TError, TState\>

```ts
type DefinedCreateQueryResult<TData, TError, TState> = BaseQueryNarrowing<
  TData,
  TError
> &
  MapToSignals<OmitKeyof<TState, keyof BaseQueryNarrowing, 'safely'>>
```

## Type Parameters

• **TData** = `unknown`

• **TError** = `DefaultError`

• **TState** = `DefinedQueryObserverResult`\<`TData`, `TError`\>

## Defined in

[types.ts:135](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/types.ts#L135)



================================================
FILE: docs/framework/angular/reference/type-aliases/definedinitialdatainfiniteoptions.md
================================================
---
id: DefinedInitialDataInfiniteOptions
title: DefinedInitialDataInfiniteOptions
---

# Type Alias: DefinedInitialDataInfiniteOptions\<TQueryFnData, TError, TData, TQueryKey, TPageParam\>

```ts
type DefinedInitialDataInfiniteOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam,
> = CreateInfiniteQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryFnData,
  TQueryKey,
  TPageParam
> &
  object
```

## Type declaration

### initialData

```ts
initialData:
  | NonUndefinedGuard<InfiniteData<TQueryFnData, TPageParam>>
  | () => NonUndefinedGuard<InfiniteData<TQueryFnData, TPageParam>>
  | undefined;
```

## Type Parameters

• **TQueryFnData**

• **TError** = `DefaultError`

• **TData** = `InfiniteData`\<`TQueryFnData`\>

• **TQueryKey** _extends_ `QueryKey` = `QueryKey`

• **TPageParam** = `unknown`

## Defined in

[infinite-query-options.ts:66](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/infinite-query-options.ts#L66)



================================================
FILE: docs/framework/angular/reference/type-aliases/definedinitialdataoptions.md
================================================
---
id: DefinedInitialDataOptions
title: DefinedInitialDataOptions
---

# Type Alias: DefinedInitialDataOptions\<TQueryFnData, TError, TData, TQueryKey\>

```ts
type DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey> = Omit<
  CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryFn'
> &
  object
```

## Type declaration

### initialData

```ts
initialData:
  | NonUndefinedGuard<TQueryFnData>
| () => NonUndefinedGuard<TQueryFnData>;
```

### queryFn?

```ts
optional queryFn: QueryFunction<TQueryFnData, TQueryKey>;
```

## Type Parameters

• **TQueryFnData** = `unknown`

• **TError** = `DefaultError`

• **TData** = `TQueryFnData`

• **TQueryKey** _extends_ `QueryKey` = `QueryKey`

## Defined in

[query-options.ts:41](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/query-options.ts#L41)



================================================
FILE: docs/framework/angular/reference/type-aliases/developertoolsfeature.md
================================================
---
id: DeveloperToolsFeature
title: DeveloperToolsFeature
---

# Type Alias: DeveloperToolsFeature

```ts
type DeveloperToolsFeature = QueryFeature<'DeveloperTools'>
```

A type alias that represents a feature which enables developer tools.
The type is used to describe the return value of the `withDevtools` function.

## See

[withDevtools](../../functions/withdevtools.md)

## Defined in

[providers.ts:169](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L169)



================================================
FILE: docs/framework/angular/reference/type-aliases/persistqueryclientfeature.md
================================================
---
id: PersistQueryClientFeature
title: PersistQueryClientFeature
---

# Type Alias: PersistQueryClientFeature

```ts
type PersistQueryClientFeature = QueryFeature<'PersistQueryClient'>
```

A type alias that represents a feature which enables persistence.
The type is used to describe the return value of the `withPersistQueryClient` function.

## Defined in

[providers.ts:176](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L176)



================================================
FILE: docs/framework/angular/reference/type-aliases/queriesoptions.md
================================================
---
id: QueriesOptions
title: QueriesOptions
---

# Type Alias: QueriesOptions\<T, TResult, TDepth\>

```ts
type QueriesOptions<T, TResult, TDepth> = TDepth['length'] extends MAXIMUM_DEPTH
  ? QueryObserverOptionsForCreateQueries[]
  : T extends []
    ? []
    : T extends [infer Head]
      ? [...TResult, GetOptions<Head>]
      : T extends [infer Head, ...infer Tail]
        ? QueriesOptions<
            [...Tail],
            [...TResult, GetOptions<Head>],
            [...TDepth, 1]
          >
        : ReadonlyArray<unknown> extends T
          ? T
          : T extends QueryObserverOptionsForCreateQueries<
                infer TQueryFnData,
                infer TError,
                infer TData,
                infer TQueryKey
              >[]
            ? QueryObserverOptionsForCreateQueries<
                TQueryFnData,
                TError,
                TData,
                TQueryKey
              >[]
            : QueryObserverOptionsForCreateQueries[]
```

QueriesOptions reducer recursively unwraps function arguments to infer/enforce type param

## Type Parameters

• **T** _extends_ `any`[]

• **TResult** _extends_ `any`[] = []

• **TDepth** _extends_ `ReadonlyArray`\<`number`\> = []

## Defined in

[inject-queries.ts:121](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-queries.ts#L121)



================================================
FILE: docs/framework/angular/reference/type-aliases/queriesresults.md
================================================
---
id: QueriesResults
title: QueriesResults
---

# Type Alias: QueriesResults\<T, TResult, TDepth\>

```ts
type QueriesResults<T, TResult, TDepth> = TDepth['length'] extends MAXIMUM_DEPTH
  ? QueryObserverResult[]
  : T extends []
    ? []
    : T extends [infer Head]
      ? [...TResult, GetResults<Head>]
      : T extends [infer Head, ...infer Tail]
        ? QueriesResults<
            [...Tail],
            [...TResult, GetResults<Head>],
            [...TDepth, 1]
          >
        : T extends QueryObserverOptionsForCreateQueries<
              infer TQueryFnData,
              infer TError,
              infer TData,
              any
            >[]
          ? QueryObserverResult<
              unknown extends TData ? TQueryFnData : TData,
              unknown extends TError ? DefaultError : TError
            >[]
          : QueryObserverResult[]
```

QueriesResults reducer recursively maps type param to results

## Type Parameters

• **T** _extends_ `any`[]

• **TResult** _extends_ `any`[] = []

• **TDepth** _extends_ `ReadonlyArray`\<`number`\> = []

## Defined in

[inject-queries.ts:164](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/inject-queries.ts#L164)



================================================
FILE: docs/framework/angular/reference/type-aliases/queryfeaturekind.md
================================================
---
id: QueryFeatureKind
title: QueryFeatureKind
---

# Type Alias: QueryFeatureKind

```ts
type QueryFeatureKind = (typeof queryFeatures)[number]
```

## Defined in

[providers.ts:369](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L369)



================================================
FILE: docs/framework/angular/reference/type-aliases/queryfeatures.md
================================================
---
id: QueryFeatures
title: QueryFeatures
---

# Type Alias: QueryFeatures

```ts
type QueryFeatures = DeveloperToolsFeature | PersistQueryClientFeature
```

A type alias that represents all Query features available for use with `provideTanStackQuery`.
Features can be enabled by adding special functions to the `provideTanStackQuery` call.
See documentation for each symbol to find corresponding function name. See also `provideTanStackQuery`
documentation on how to use those functions.

## See

[provideTanStackQuery](../../functions/providetanstackquery.md)

## Defined in

[providers.ts:365](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L365)



================================================
FILE: docs/framework/angular/reference/type-aliases/undefinedinitialdatainfiniteoptions.md
================================================
---
id: UndefinedInitialDataInfiniteOptions
title: UndefinedInitialDataInfiniteOptions
---

# Type Alias: UndefinedInitialDataInfiniteOptions\<TQueryFnData, TError, TData, TQueryKey, TPageParam\>

```ts
type UndefinedInitialDataInfiniteOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam,
> = CreateInfiniteQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryFnData,
  TQueryKey,
  TPageParam
> &
  object
```

## Type declaration

### initialData?

```ts
optional initialData:
  | NonUndefinedGuard<InfiniteData<TQueryFnData, TPageParam>>
| InitialDataFunction<NonUndefinedGuard<InfiniteData<TQueryFnData, TPageParam>>>;
```

## Type Parameters

• **TQueryFnData**

• **TError** = `DefaultError`

• **TData** = `InfiniteData`\<`TQueryFnData`\>

• **TQueryKey** _extends_ `QueryKey` = `QueryKey`

• **TPageParam** = `unknown`

## Defined in

[infinite-query-options.ts:12](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/infinite-query-options.ts#L12)



================================================
FILE: docs/framework/angular/reference/type-aliases/undefinedinitialdataoptions.md
================================================
---
id: UndefinedInitialDataOptions
title: UndefinedInitialDataOptions
---

# Type Alias: UndefinedInitialDataOptions\<TQueryFnData, TError, TData, TQueryKey\>

```ts
type UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey> =
  CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey> & object
```

## Type declaration

### initialData?

```ts
optional initialData:
  | InitialDataFunction<NonUndefinedGuard<TQueryFnData>>
| NonUndefinedGuard<TQueryFnData>;
```

## Type Parameters

• **TQueryFnData** = `unknown`

• **TError** = `DefaultError`

• **TData** = `TQueryFnData`

• **TQueryKey** _extends_ `QueryKey` = `QueryKey`

## Defined in

[query-options.ts:12](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/query-options.ts#L12)



================================================
FILE: docs/framework/angular/reference/type-aliases/unusedskiptokeninfiniteoptions.md
================================================
---
id: UnusedSkipTokenInfiniteOptions
title: UnusedSkipTokenInfiniteOptions
---

# Type Alias: UnusedSkipTokenInfiniteOptions\<TQueryFnData, TError, TData, TQueryKey, TPageParam\>

```ts
type UnusedSkipTokenInfiniteOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam,
> = OmitKeyof<
  CreateInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryFnData,
    TQueryKey,
    TPageParam
  >,
  'queryFn'
> &
  object
```

## Type declaration

### queryFn?

```ts
optional queryFn: Exclude<CreateInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey, TPageParam>["queryFn"], SkipToken | undefined>;
```

## Type Parameters

• **TQueryFnData**

• **TError** = `DefaultError`

• **TData** = `InfiniteData`\<`TQueryFnData`\>

• **TQueryKey** _extends_ `QueryKey` = `QueryKey`

• **TPageParam** = `unknown`

## Defined in

[infinite-query-options.ts:34](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/infinite-query-options.ts#L34)



================================================
FILE: docs/framework/angular/reference/type-aliases/unusedskiptokenoptions.md
================================================
---
id: UnusedSkipTokenOptions
title: UnusedSkipTokenOptions
---

# Type Alias: UnusedSkipTokenOptions\<TQueryFnData, TError, TData, TQueryKey\>

```ts
type UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey> = OmitKeyof<
  CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryFn'
> &
  object
```

## Type declaration

### queryFn?

```ts
optional queryFn: Exclude<CreateQueryOptions<TQueryFnData, TError, TData, TQueryKey>["queryFn"], SkipToken | undefined>;
```

## Type Parameters

• **TQueryFnData** = `unknown`

• **TError** = `DefaultError`

• **TData** = `TQueryFnData`

• **TQueryKey** _extends_ `QueryKey` = `QueryKey`

## Defined in

[query-options.ts:24](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/query-options.ts#L24)



================================================
FILE: docs/framework/angular/reference/variables/queryfeatures.md
================================================
---
id: queryFeatures
title: queryFeatures
---

# Variable: queryFeatures

```ts
const queryFeatures: readonly ['DeveloperTools', 'PersistQueryClient']
```

## Defined in

[providers.ts:367](https://github.com/TanStack/query/blob/main/packages/angular-query-experimental/src/providers.ts#L367)



================================================
FILE: docs/framework/react/comparison.md
================================================
---
id: comparison
title: Comparison | React Query vs SWR vs Apollo vs RTK Query vs React Router
---

> This comparison table strives to be as accurate and as unbiased as possible. If you use any of these libraries and feel the information could be improved, feel free to suggest changes (with notes or evidence of claims) using the "Edit this page on Github" link at the bottom of this page.

Feature/Capability Key:

- ✅ 1st-class, built-in, and ready to use with no added configuration or code
- 🟡 Supported, but as an unofficial 3rd party or community library/contribution
- 🔶 Supported and documented, but requires extra user-code to implement
- 🛑 Not officially supported or documented.

|                                                    | React Query                              | SWR [_(Website)_][swr]                   | Apollo Client [_(Website)_][apollo]        | RTK-Query [_(Website)_][rtk-query]   | React Router [_(Website)_][react-router]                                  |
| -------------------------------------------------- | ---------------------------------------- | ---------------------------------------- | ------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------- |
| Github Repo / Stars                                | [![][stars-react-query]][gh-react-query] | [![][stars-swr]][gh-swr]                 | [![][stars-apollo]][gh-apollo]             | [![][stars-rtk-query]][gh-rtk-query] | [![][stars-react-router]][gh-react-router]                                |
| Platform Requirements                              | React                                    | React                                    | React, GraphQL                             | Redux                                | React                                                                     |
| Their Comparison                                   |                                          | (none)                                   | (none)                                     | [Comparison][rtk-query-comparison]   | (none)                                                                    |
| Supported Query Syntax                             | Promise, REST, GraphQL                   | Promise, REST, GraphQL                   | GraphQL, Any (Reactive Variables)          | Promise, REST, GraphQL               | Promise, REST, GraphQL                                                    |
| Supported Frameworks                               | React                                    | React                                    | React + Others                             | Any                                  | React                                                                     |
| Caching Strategy                                   | Hierarchical Key -> Value                | Unique Key -> Value                      | Normalized Schema                          | Unique Key -> Value                  | Nested Route -> value                                                     |
| Cache Key Strategy                                 | JSON                                     | JSON                                     | GraphQL Query                              | JSON                                 | Route Path                                                                |
| Cache Change Detection                             | Deep Compare Keys (Stable Serialization) | Deep Compare Keys (Stable Serialization) | Deep Compare Keys (Unstable Serialization) | Key Referential Equality (===)       | Route Change                                                              |
| Data Change Detection                              | Deep Comparison + Structural Sharing     | Deep Compare (via `stable-hash`)         | Deep Compare (Unstable Serialization)      | Key Referential Equality (===)       | Loader Run                                                                |
| Data Memoization                                   | Full Structural Sharing                  | Identity (===)                           | Normalized Identity                        | Identity (===)                       | Identity (===)                                                            |
| Bundle Size                                        | [![][bp-react-query]][bpl-react-query]   | [![][bp-swr]][bpl-swr]                   | [![][bp-apollo]][bpl-apollo]               | [![][bp-rtk-query]][bpl-rtk-query]   | [![][bp-react-router]][bpl-react-router] + [![][bp-history]][bpl-history] |
| API Definition Location                            | Component, External Config               | Component                                | GraphQL Schema                             | External Config                      | Route Tree Configuration                                                  |
| Queries                                            | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Cache Persistence                                  | ✅                                       | ✅                                       | ✅                                         | ✅                                   | 🛑 Active Routes Only <sup>8</sup>                                        |
| Devtools                                           | ✅                                       | ✅                                       | ✅                                         | ✅                                   | 🛑                                                                        |
| Polling/Intervals                                  | ✅                                       | ✅                                       | ✅                                         | ✅                                   | 🛑                                                                        |
| Parallel Queries                                   | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Dependent Queries                                  | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Paginated Queries                                  | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Infinite Queries                                   | ✅                                       | ✅                                       | ✅                                         | ✅                                   | 🛑                                                                        |
| Bi-directional Infinite Queries                    | ✅                                       | 🔶                                       | 🔶                                         | ✅                                   | 🛑                                                                        |
| Infinite Query Refetching                          | ✅                                       | ✅                                       | 🛑                                         | ✅                                   | 🛑                                                                        |
| Lagged Query Data<sup>1</sup>                      | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Selectors                                          | ✅                                       | 🛑                                       | ✅                                         | ✅                                   | N/A                                                                       |
| Initial Data                                       | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Scroll Recovery                                    | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Cache Manipulation                                 | ✅                                       | ✅                                       | ✅                                         | ✅                                   | 🛑                                                                        |
| Outdated Query Dismissal                           | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Render Batching & Optimization<sup>2</sup>         | ✅                                       | ✅                                       | 🛑                                         | ✅                                   | ✅                                                                        |
| Auto Garbage Collection                            | ✅                                       | 🛑                                       | 🛑                                         | ✅                                   | N/A                                                                       |
| Mutation Hooks                                     | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Offline Mutation Support                           | ✅                                       | 🛑                                       | 🟡                                         | 🛑                                   | 🛑                                                                        |
| Prefetching APIs                                   | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Query Cancellation                                 | ✅                                       | 🛑                                       | 🛑                                         | 🛑                                   | ✅                                                                        |
| Partial Query Matching<sup>3</sup>                 | ✅                                       | 🔶                                       | ✅                                         | ✅                                   | N/A                                                                       |
| Stale While Revalidate                             | ✅                                       | ✅                                       | ✅                                         | ✅                                   | 🛑                                                                        |
| Stale Time Configuration                           | ✅                                       | 🛑<sup>7</sup>                           | 🛑                                         | ✅                                   | 🛑                                                                        |
| Pre-usage Query/Mutation Configuration<sup>4</sup> | ✅                                       | 🛑                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Window Focus Refetching                            | ✅                                       | ✅                                       | 🛑                                         | ✅                                   | 🛑                                                                        |
| Network Status Refetching                          | ✅                                       | ✅                                       | ✅                                         | ✅                                   | 🛑                                                                        |
| General Cache Dehydration/Rehydration              | ✅                                       | 🛑                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Offline Caching                                    | ✅                                       | 🛑                                       | ✅                                         | 🔶                                   | 🛑                                                                        |
| React Suspense                                     | ✅                                       | ✅                                       | ✅                                         | 🛑                                   | ✅                                                                        |
| Abstracted/Agnostic Core                           | ✅                                       | 🛑                                       | ✅                                         | ✅                                   | 🛑                                                                        |
| Automatic Refetch after Mutation<sup>5</sup>       | 🔶                                       | 🔶                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Normalized Caching<sup>6</sup>                     | 🛑                                       | 🛑                                       | ✅                                         | 🛑                                   | 🛑                                                                        |

### Notes

> **<sup>1</sup> Lagged Query Data** - React Query provides a way to continue to see an existing query's data while the next query loads (similar to the same UX that suspense will soon provide natively). This is extremely important when writing pagination UIs or infinite loading UIs where you do not want to show a hard loading state whenever a new query is requested. Other libraries do not have this capability and render a hard loading state for the new query (unless it has been prefetched), while the new query loads.

> **<sup>2</sup> Render Optimization** - React Query has excellent rendering performance. By default, it will automatically track which fields are accessed and only re-render if one of them changes. If you would like to opt-out of this optimization, setting `notifyOnChangeProps` to `'all'` will re-render your components whenever the query is updated. For example because it has new data, or to indicate it is fetching. React Query also batches updates together to make sure your application only re-renders once when multiple components are using the same query. If you are only interested in the `data` or `error` properties, you can reduce the number of renders even more by setting `notifyOnChangeProps` to `['data', 'error']`.

> **<sup>3</sup> Partial query matching** - Because React Query uses deterministic query key serialization, this allows you to manipulate variable groups of queries without having to know each individual query-key that you want to match, eg. you can refetch every query that starts with `todos` in its key, regardless of variables, or you can target specific queries with (or without) variables or nested properties, and even use a filter function to only match queries that pass your specific conditions.

> **<sup>4</sup> Pre-usage Query Configuration** - This is simply a fancy name for being able to configure how queries and mutations will behave before they are used. For instance, a query can be fully configured with defaults beforehand and when the time comes to use it, only `useQuery({ queryKey })` is necessary, instead of being required to pass the fetcher and/or options with every usage. SWR does have a partial form of this feature by allowing you to pre-configure a default fetcher, but only as a global fetcher, not on a per-query basis and definitely not for mutations.

> **<sup>5</sup> Automatic Refetch after Mutation** - For truly automatic refetching to happen after a mutation occurs, a schema is necessary (like the one graphQL provides) along with heuristics that help the library know how to identify individual entities and entities types in that schema.

> **<sup>6</sup> Normalized Caching** - React Query, SWR and RTK-Query do not currently support automatic-normalized caching which describes storing entities in a flat architecture to avoid some high-level data duplication.

> **<sup>7</sup> SWR's Immutable Mode** - SWR ships with an "immutable" mode that does allow you to only fetch a query once for the life of the cache, but it still does not have the concept of stale-time or conditional auto-revalidation

> **<sup>8</sup> React Router cache persistence** - React Router does not cache data beyond the currently matched routes. If a route is left, its data is lost.

[bpl-react-query]: https://bundlephobia.com/result?p=react-query
[bp-react-query]: https://badgen.net/bundlephobia/minzip/react-query?label=💾
[gh-react-query]: https://github.com/tannerlinsley/react-query
[stars-react-query]: https://img.shields.io/github/stars/tannerlinsley/react-query?label=%F0%9F%8C%9F
[swr]: https://github.com/vercel/swr
[bp-swr]: https://badgen.net/bundlephobia/minzip/swr?label=💾
[gh-swr]: https://github.com/vercel/swr
[stars-swr]: https://img.shields.io/github/stars/vercel/swr?label=%F0%9F%8C%9F
[bpl-swr]: https://bundlephobia.com/result?p=swr
[apollo]: https://github.com/apollographql/apollo-client
[bp-apollo]: https://badgen.net/bundlephobia/minzip/@apollo/client?label=💾
[gh-apollo]: https://github.com/apollographql/apollo-client
[stars-apollo]: https://img.shields.io/github/stars/apollographql/apollo-client?label=%F0%9F%8C%9F
[bpl-apollo]: https://bundlephobia.com/result?p=@apollo/client
[rtk-query]: https://redux-toolkit.js.org/rtk-query/overview
[rtk-query-comparison]: https://redux-toolkit.js.org/rtk-query/comparison
[rtk-query-bundle-size]: https://redux-toolkit.js.org/rtk-query/comparison#bundle-size
[bp-rtk]: https://badgen.net/bundlephobia/minzip/@reduxjs/toolkit?label=💾
[bp-rtk-query]: https://badgen.net/bundlephobia/minzip/@reduxjs/toolkit?label=💾
[gh-rtk-query]: https://github.com/reduxjs/redux-toolkit
[stars-rtk-query]: https://img.shields.io/github/stars/reduxjs/redux-toolkit?label=🌟
[bpl-rtk]: https://bundlephobia.com/result?p=@reduxjs/toolkit
[bpl-rtk-query]: https://bundlephobia.com/package/@reduxjs/toolkit
[react-router]: https://github.com/remix-run/react-router
[bp-react-router]: https://badgen.net/bundlephobia/minzip/react-router-dom?label=💾
[gh-react-router]: https://github.com/remix-run/react-router
[stars-react-router]: https://img.shields.io/github/stars/remix-run/react-router?label=%F0%9F%8C%9F
[bpl-react-router]: https://bundlephobia.com/result?p=react-router-dom
[bp-history]: https://badgen.net/bundlephobia/minzip/history?label=💾
[bpl-history]: https://bundlephobia.com/result?p=history



================================================
FILE: docs/framework/react/devtools.md
================================================
---
id: devtools
title: Devtools
---

Wave your hands in the air and shout hooray because React Query comes with dedicated devtools! 🥳

When you begin your React Query journey, you'll want these devtools by your side. They help visualize all the inner workings of React Query and will likely save you hours of debugging if you find yourself in a pinch!

> For Chrome, Firefox, and Edge users: Third-party browser extensions are available for debugging TanStack Query directly in browser DevTools. These provide the same functionality as the framework-specific devtools packages:
>
> - <img alt="Chrome logo" src="https://www.google.com/chrome/static/images/chrome-logo.svg" width="16" height="16" class="inline mr-1 not-prose" /> [Devtools for Chrome](https://chromewebstore.google.com/detail/tanstack-query-devtools/annajfchloimdhceglpgglpeepfghfai)
> - <img alt="Firefox logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" width="16" height="16" class="inline mr-1 not-prose" /> [Devtools for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tanstack-query-devtools/)
> - <img alt="Edge logo" src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg" width="16" height="16" class="inline mr-1 not-prose" /> [Devtools for Edge](https://microsoftedge.microsoft.com/addons/detail/tanstack-query-devtools/edmdpkgkacmjopodhfolmphdenmddobj)

> For React Native users: A third-party native macOS app is available for debugging React Query in ANY js-based application. Monitor queries across devices in real-time. Check it out here: [rn-better-dev-tools](https://github.com/LovesWorking/rn-better-dev-tools)

> Note that since version 5, the dev tools support observing mutations as well.

## Install and Import the Devtools

The devtools are a separate package that you need to install:

```bash
npm i @tanstack/react-query-devtools
```

or

```bash
pnpm add @tanstack/react-query-devtools
```

or

```bash
yarn add @tanstack/react-query-devtools
```

or

```bash
bun add @tanstack/react-query-devtools
```

For Next 13+ App Dir you must install it as a dev dependency for it to work.

You can import the devtools like this:

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
```

By default, React Query Devtools are only included in bundles when `process.env.NODE_ENV === 'development'`, so you don't need to worry about excluding them during a production build.

## Floating Mode

Floating Mode will mount the devtools as a fixed, floating element in your app and provide a toggle in the corner of the screen to show and hide the devtools. This toggle state will be stored and remembered in localStorage across reloads.

Place the following code as high in your React app as you can. The closer it is to the root of the page, the better it will work!

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### Options

- `initialIsOpen: Boolean`
  - Set this `true` if you want the dev tools to default to being open
- `buttonPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "relative"`
  - Defaults to `bottom-right`
  - The position of the React Query logo to open and close the devtools panel
  - If `relative`, the button is placed in the location that you render the devtools.
- `position?: "top" | "bottom" | "left" | "right"`
  - Defaults to `bottom`
  - The position of the React Query devtools panel
- `client?: QueryClient`,
  - Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.
- `errorTypes?: { name: string; initializer: (query: Query) => TError}[]`
  - Use this to predefine some errors that can be triggered on your queries. Initializer will be called (with the specific query) when that error is toggled on from the UI. It must return an Error.
- `styleNonce?: string`
  - Use this to pass a nonce to the style tag that is added to the document head. This is useful if you are using a Content Security Policy (CSP) nonce to allow inline styles.
- `shadowDOMTarget?: ShadowRoot`
  - Default behavior will apply the devtool's styles to the head tag within the DOM.
  - Use this to pass a shadow DOM target to the devtools so that the styles will be applied within the shadow DOM instead of within the head tag in the light DOM.

## Embedded Mode

Embedded mode will show the development tools as a fixed element in your application, so you can use our panel in your own development tools.

Place the following code as high in your React app as you can. The closer it is to the root of the page, the better it will work!

```tsx
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

function App() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <button
        onClick={() => setIsOpen(!isOpen)}
      >{`${isOpen ? 'Close' : 'Open'} the devtools panel`}</button>
      {isOpen && <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />}
    </QueryClientProvider>
  )
}
```

### Options

- `style?: React.CSSProperties`
  - Custom styles for the devtools panel
  - Default: `{ height: '500px' }`
  - Example: `{ height: '100%' }`
  - Example: `{ height: '100%', width: '100%' }`
- `onClose?: () => unknown`
  - Callback function that is called when the devtools panel is closed
- `client?: QueryClient`,
  - Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.
- `errorTypes?: { name: string; initializer: (query: Query) => TError}[]`
  - Use this to predefine some errors that can be triggered on your queries. Initializer will be called (with the specific query) when that error is toggled on from the UI. It must return an Error.
- `styleNonce?: string`
  - Use this to pass a nonce to the style tag that is added to the document head. This is useful if you are using a Content Security Policy (CSP) nonce to allow inline styles.
- `shadowDOMTarget?: ShadowRoot`
  - Default behavior will apply the devtool's styles to the head tag within the DOM.
  - Use this to pass a shadow DOM target to the devtools so that the styles will be applied within the shadow DOM instead of within the head tag in the light DOM.

## Devtools in production

Devtools are excluded in production builds. However, it might be desirable to lazy load the devtools in production:

```tsx
import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Example } from './Example'

const queryClient = new QueryClient()

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

function App() {
  const [showDevtools, setShowDevtools] = React.useState(false)

  React.useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <ReactQueryDevtools initialIsOpen />
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </QueryClientProvider>
  )
}

export default App
```

With this, calling `window.toggleDevtools()` will download the devtools bundle and show them.

### Modern bundlers

If your bundler supports package exports, you can use the following import path:

```tsx
const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/production').then((d) => ({
    default: d.ReactQueryDevtools,
  })),
)
```

For TypeScript, you would need to set `moduleResolution: 'nodenext'` in your tsconfig, which requires at least TypeScript v4.7.



================================================
FILE: docs/framework/react/graphql.md
================================================
---
id: graphql
title: GraphQL
---

Because React Query's fetching mechanisms are agnostically built on Promises, you can use React Query with literally any asynchronous data fetching client, including GraphQL!

> Keep in mind that React Query does not support normalized caching. While a vast majority of users do not actually need a normalized cache or even benefit from it as much as they believe they do, there may be very rare circumstances that may warrant it so be sure to check with us first to make sure it's truly something you need!

[//]: # 'Codegen'

## Type-Safety and Code Generation

React Query, used in combination with `graphql-request^5` and [GraphQL Code Generator](https://graphql-code-generator.com/) provides full-typed GraphQL operations:

```tsx
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { graphql } from './gql/gql'

const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allFilmsWithVariablesQuery($first: Int!) {
    allFilms(first: $first) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`)

function App() {
  // `data` is fully typed!
  const { data } = useQuery({
    queryKey: ['films'],
    queryFn: async () =>
      request(
        'https://swapi-graphql.netlify.app/.netlify/functions/index',
        allFilmsWithVariablesQueryDocument,
        // variables are type-checked too!
        { first: 10 },
      ),
  })
  // ...
}
```

_You can find a [complete example in the repo](https://github.com/dotansimha/graphql-code-generator/tree/7c25c4eeb77f88677fd79da557b7b5326e3f3950/examples/front-end/react/tanstack-react-query)_

Get started with the [dedicated guide on GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/guides/react-vue).

[//]: # 'Codegen'



================================================
FILE: docs/framework/react/installation.md
================================================
---
id: installation
title: Installation
---

You can install React Query via [NPM](https://npmjs.com/),
or a good ol' `<script>` via
[ESM.sh](https://esm.sh/).

### NPM

```bash
npm i @tanstack/react-query
```

or

```bash
pnpm add @tanstack/react-query
```

or

```bash
yarn add @tanstack/react-query
```

or

```bash
bun add @tanstack/react-query
```

React Query is compatible with React v18+ and works with ReactDOM and React Native.

> Wanna give it a spin before you download? Try out the [simple](../examples/simple) or [basic](../examples/basic) examples!

### CDN

If you're not using a module bundler or package manager, you can also use this library via an ESM-compatible CDN such as [ESM.sh](https://esm.sh/). Simply add a `<script type="module">` tag to the bottom of your HTML file:

```html
<script type="module">
  import React from 'https://esm.sh/react@18.2.0'
  import ReactDOM from 'https://esm.sh/react-dom@18.2.0'
  import { QueryClient } from 'https://esm.sh/@tanstack/react-query'
</script>
```

> You can find instructions on how to use React without JSX [here](https://react.dev/reference/react/createElement#creating-an-element-without-jsx).

### Requirements

React Query is optimized for modern browsers. It is compatible with the following browsers config

```
Chrome >= 91
Firefox >= 90
Edge >= 91
Safari >= 15
iOS >= 15
Opera >= 77
```

> Depending on your environment, you might need to add polyfills. If you want to support older browsers, you need to transpile the library from `node_modules` yourselves.

### Recommendations

It is recommended to also use our [ESLint Plugin Query](../../../eslint/eslint-plugin-query.md) to help you catch bugs and inconsistencies while you code. You can install it via:

```bash
npm i -D @tanstack/eslint-plugin-query
```

or

```bash
pnpm add -D @tanstack/eslint-plugin-query
```

or

```bash
yarn add -D @tanstack/eslint-plugin-query
```

or

```bash
bun add -D @tanstack/eslint-plugin-query
```



================================================
FILE: docs/framework/react/overview.md
================================================
---
id: overview
title: Overview
---

TanStack Query (formerly known as React Query) is often described as the missing data-fetching library for web applications, but in more technical terms, it makes **fetching, caching, synchronizing and updating server state** in your web applications a breeze.

## Motivation

Most core web frameworks **do not** come with an opinionated way of fetching or updating data in a holistic way. Because of this developers end up building either meta-frameworks which encapsulate strict opinions about data-fetching, or they invent their own ways of fetching data. This usually means cobbling together component-based state and side-effects, or using more general purpose state management libraries to store and provide asynchronous data throughout their apps.

While most traditional state management libraries are great for working with client state, they are **not so great at working with async or server state**. This is because **server state is totally different**. For starters, server state:

- Is persisted remotely in a location you may not control or own
- Requires asynchronous APIs for fetching and updating
- Implies shared ownership and can be changed by other people without your knowledge
- Can potentially become "out of date" in your applications if you're not careful

Once you grasp the nature of server state in your application, **even more challenges will arise** as you go, for example:

- Caching... (possibly the hardest thing to do in programming)
- Deduping multiple requests for the same data into a single request
- Updating "out of date" data in the background
- Knowing when data is "out of date"
- Reflecting updates to data as quickly as possible
- Performance optimizations like pagination and lazy loading data
- Managing memory and garbage collection of server state
- Memoizing query results with structural sharing

If you're not overwhelmed by that list, then that must mean that you've probably solved all of your server state problems already and deserve an award. However, if you are like a vast majority of people, you either have yet to tackle all or most of these challenges and we're only scratching the surface!

TanStack Query is hands down one of the _best_ libraries for managing server state. It works amazingly well **out-of-the-box, with zero-config, and can be customized** to your liking as your application grows.

TanStack Query allows you to defeat and overcome the tricky challenges and hurdles of _server state_ and control your app data before it starts to control you.

On a more technical note, TanStack Query will likely:

- Help you remove **many** lines of complicated and misunderstood code from your application and replace with just a handful of lines of TanStack Query logic
- Make your application more maintainable and easier to build new features without worrying about wiring up new server state data sources
- Have a direct impact on your end-users by making your application feel faster and more responsive than ever before
- Potentially help you save on bandwidth and increase memory performance

[//]: # 'Example'

## Enough talk, show me some code already!

In the example below, you can see TanStack Query in its most basic and simple form being used to fetch the GitHub stats for the TanStack Query GitHub project itself:

[Open in StackBlitz](https://stackblitz.com/github/TanStack/query/tree/main/examples/react/simple)

```tsx
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}
```

[//]: # 'Example'
[//]: # 'Materials'

## You talked me into it, so what now?

- Consider taking the official [TanStack Query Course](https://query.gg?s=tanstack) (or buying it for your whole team!)
- Learn TanStack Query at your own pace with our amazingly thorough [Walkthrough Guide](../installation.md) and [API Reference](../reference/useQuery.md)
- Have a read at [Why You Want React Query](../community/tkdodos-blog.md#23-why-you-want-react-query) from the Community Resources.

[//]: # 'Materials'



================================================
FILE: docs/framework/react/quick-start.md
================================================
---
id: quick-start
title: Quick Start
---

This code snippet very briefly illustrates the 3 core concepts of React Query:

- [Queries](../guides/queries.md)
- [Mutations](../guides/mutations.md)
- [Query Invalidation](../guides/query-invalidation.md)

[//]: # 'Example'

If you're looking for a fully functioning example, please have a look at our [simple StackBlitz example](../examples/simple)

```tsx
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { getTodos, postTodo } from '../my-api'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

function Todos() {
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <div>
      <ul>
        {query.data?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
          })
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

render(<App />, document.getElementById('root'))
```

[//]: # 'Example'

These three concepts make up most of the core functionality of React Query. The next sections of the documentation will go over each of these core concepts in great detail.



================================================
FILE: docs/framework/react/react-native.md
================================================
---
id: react-native
title: React Native
---

React Query is designed to work out of the box with React Native.

## DevTools Support

There are several options available for React Native DevTools integration:

1. **Native macOS App**: A 3rd party app for debugging React Query in any js-based application:
   https://github.com/LovesWorking/rn-better-dev-tools

2. **Flipper Plugin**: A 3rd party plugin for Flipper users:
   https://github.com/bgaleotti/react-query-native-devtools

3. **Reactotron Plugin**: A 3rd party plugin for Reactotron users:
   https://github.com/hsndmr/reactotron-react-query

## Online status management

React Query already supports auto refetch on reconnect in web browser.
To add this behavior in React Native you have to use React Query `onlineManager` as in the example below:

```tsx
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})
```

or

```tsx
import { onlineManager } from '@tanstack/react-query'
import * as Network from 'expo-network'

onlineManager.setEventListener((setOnline) => {
  const eventSubscription = Network.addNetworkStateListener((state) => {
    setOnline(!!state.isConnected)
  })
  return eventSubscription.remove
})
```

## Refetch on App focus

Instead of event listeners on `window`, React Native provides focus information through the [`AppState` module](https://reactnative.dev/docs/appstate#app-states). You can use the `AppState` "change" event to trigger an update when the app state changes to "active":

```tsx
import { useEffect } from 'react'
import { AppState, Platform } from 'react-native'
import type { AppStateStatus } from 'react-native'
import { focusManager } from '@tanstack/react-query'

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

useEffect(() => {
  const subscription = AppState.addEventListener('change', onAppStateChange)

  return () => subscription.remove()
}, [])
```

## Refresh on Screen focus

In some situations, you may want to refetch the query when a React Native Screen is focused again.
This custom hook will refetch **all active stale queries** when the screen is focused again.

```tsx
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'

export function useRefreshOnFocus() {
  const queryClient = useQueryClient()
  const firstTimeRef = React.useRef(true)

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      // refetch all stale active queries
      queryClient.refetchQueries({
        queryKey: ['posts'],
        stale: true,
        type: 'active',
      })
    }, [queryClient]),
  )
}
```

In the above code, the first focus (when the screen is initially mounted) is skipped because `useFocusEffect` calls our callback on mount in addition to screen focus.

## Disable queries on out of focus screens

If you don’t want certain queries to remain “live” while a screen is out of focus, you can use the subscribed prop on useQuery. This prop lets you control whether a query stays subscribed to updates. Combined with React Navigation’s useIsFocused, it allows you to seamlessly unsubscribe from queries when a screen isn’t in focus:

Example usage:

```tsx
import React from 'react'
import { useIsFocused } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Text } from 'react-native'

function MyComponent() {
  const isFocused = useIsFocused()

  const { dataUpdatedAt } = useQuery({
    queryKey: ['key'],
    queryFn: () => fetch(...),
    subscribed: isFocused,
  })

  return <Text>DataUpdatedAt: {dataUpdatedAt}</Text>
}
```

When subscribed is false, the query unsubscribes from updates and won’t trigger re-renders or fetch new data for that screen. Once it becomes true again (e.g., when the screen regains focus), the query re-subscribes and stays up to date.



================================================
FILE: docs/framework/react/typescript.md
================================================
---
id: typescript
title: TypeScript
---

React Query is now written in **TypeScript** to make sure the library and your projects are type-safe!

Things to keep in mind:

- Types currently require using TypeScript **v4.7** or greater
- Changes to types in this repository are considered **non-breaking** and are usually released as **patch** semver changes (otherwise every type enhancement would be a major version!).
- It is **highly recommended that you lock your react-query package version to a specific patch release and upgrade with the expectation that types may be fixed or upgraded between any release**
- The non-type-related public API of React Query still follows semver very strictly.

## Type Inference

Types in React Query generally flow through very well so that you don't have to provide type annotations for yourself

[//]: # 'TypeInference1'

```tsx
const { data } = useQuery({
  //    ^? const data: number | undefined
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
})
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAORToCGAxjALQCOO+VAsAFC8MQAdqnhIAJnRh0icALwoM2XHgAUAbSqDkIAEa4qAXQA0cFQEo5APjgAFciGAYAdLVQQANgDd0KgKxmzXgB6ILgw8IA9AH5eIA)

[//]: # 'TypeInference1'
[//]: # 'TypeInference2'

```tsx
const { data } = useQuery({
  //      ^? const data: string | undefined
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
  select: (data) => data.toString(),
})
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAORToCGAxjALQCOO+VAsAFC8MQAdqnhIAJnRh0icALwoM2XHgAUAbSox0IqgF0ANHBUBKOQD44ABXIhgGAHS1UEADYA3dCoCsxw0gwu6EwAXHASUuZhknT2MBAAyjBQwIIA5iaExrwA9Nlw+QUAegD8vEA)

[//]: # 'TypeInference2'

This works best if your `queryFn` has a well-defined returned type. Keep in mind that most data fetching libraries return `any` per default, so make sure to extract it to a properly typed function:

[//]: # 'TypeInference3'

```tsx
const fetchGroups = (): Promise<Group[]> =>
  axios.get('/groups').then((response) => response.data)

const { data } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const data: Group[] | undefined
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAORToCGAxjALQCOO+VAsAFCiSw4dAB7AIqUuUpURY1Nx68YeMOjgBxcsjBwAvIjjAAJgC44AO2QgARriK9eDCOdTwS6GAwAWmiNon6ABQAlGYAClLAGAA8vtoA2gC6AHx6qbLiAHQA5h6BVAD02Vpg8sGZMF7o5oG0qJAuarqpdQ0YmUZ0MHTBDjxOLvBInd1EeigY2Lh4gfFUxX6lVIkANKQe3nGlvTwFBXAHhwB6APxwA65wI3RmW0lwAD4o5kboJMDm6Ea8QA)

[//]: # 'TypeInference3'

## Type Narrowing

React Query uses a [discriminated union type](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) for the query result, discriminated by the `status` field and the derived status boolean flags. This will allow you to check for e.g. `success` status to make `data` defined:

[//]: # 'TypeNarrowing'

```tsx
const { data, isSuccess } = useQuery({
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
})

if (isSuccess) {
  data
  //  ^? const data: number
}
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAORToCGAxjALQCOO+VAsAFC8MQAdqnhIAJnRh0ANHGCoAysgYN0qVETgBeFBmy48ACgDaVGGphUAurMMBKbQD44ABXIh56AHS1UEADYAbuiGAKx2dry8wCRwhvJKKmqoDgi8cBlwElK8APS5GQB6APy8hLxAA)

[//]: # 'TypeNarrowing'

## Typing the error field

The type for error defaults to `Error`, because that is what most users expect.

[//]: # 'TypingError'

```tsx
const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: Error
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAOQACMAhgHaoMDGA1gPRTr2swBaAI458VALAAoUJFhx6AD2ARUpcpSqLlqCZKkw8YdHADi5ZGDgBeRHGAATAFxxGyEACNcRKVNYRm8CToMKwAFmYQFqo2ABQAlM4ACurAGAA8ERYA2gC6AHzWBVoqAHQA5sExVJxl5mA6cSUwoeiMMTyokMzGVgUdXRgl9vQMcT6SfgG2uORQRNYoGNi4eDFZVLWR9VQ5ADSkwWGZ9WOSnJxwl1cAegD8QA)

[//]: # 'TypingError'

If you want to throw a custom error, or something that isn't an `Error` at all, you can specify the type of the error field:

[//]: # 'TypingError2'

```tsx
const { error } = useQuery<Group[], string>(['groups'], fetchGroups)
//      ^? const error: string | null
```

[//]: # 'TypingError2'

However, this has the drawback that type inference for all other generics of `useQuery` will not work anymore. It is generally not considered a good practice to throw something that isn't an `Error`, so if you have a subclass like `AxiosError` you can use _type narrowing_ to make the error field more specific:

[//]: # 'TypingError3'

```tsx
import axios from 'axios'

const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: Error | null

if (axios.isAxiosError(error)) {
  error
  // ^? const error: AxiosError
}
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAOQACMAhgHaoMDGA1gPRTr2swBaAI458VALAAoUJFhx6AD2ARUpcpSqLlqCZKkw8YdHADi5ZGDgBeRHGAATAFxxGyEACNcRKVNYRm8CToMKwAFmYQFqo2ABQAlM4ACurAGAA8ERYA2gC6AHzWBVoqAHQA5sExVJxl5mA6cSUwoeiMMTyokMzGVgUdXRgl9vQMcT6SfgG2uORQRNYoGNi4eDFIIisA0uh4zllUtZH1VDkANHAb+ABijM5BIeF1qoRjkpyccJ9fAHoA-OPAEhwGLFVAlVIAQSUKgAolBZjEZtA4nFEFJPkioOi4O84H8pIQgA)

[//]: # 'TypingError3'

### Registering a global Error

TanStack Query v5 allows for a way to set a global Error type for everything, without having to specify generics on call-sides, by amending the `Register` interface. This will make sure inference still works, but the error field will be of the specified type. If you want to enforce that call-sides must do explicit type-narrowing, set `defaultError` to `unknown`:

[//]: # 'RegisterErrorType'

```tsx
import '@tanstack/react-query'

declare module '@tanstack/react-query' {
  interface Register {
    // Use unknown so call sites must narrow explicitly.
    defaultError: unknown
  }
}

const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: unknown | null
```

[//]: # 'RegisterErrorType'
[//]: # 'TypingMeta'

## Typing meta

### Registering global Meta

Similarly to registering a [global error type](#registering-a-global-error) you can also register a global `Meta` type. This ensures the optional `meta` field on [queries](../reference/useQuery.md) and [mutations](../reference/useMutation.md) stays consistent and is type-safe. Note that the registered type must extend `Record<string, unknown>` so that `meta` remains an object.

```ts
import '@tanstack/react-query'

interface MyMeta extends Record<string, unknown> {
  // Your meta type definition.
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: MyMeta
    mutationMeta: MyMeta
  }
}
```

[//]: # 'TypingMeta'
[//]: # 'TypingQueryAndMutationKeys'

## Typing query and mutation keys

### Registering the query and mutation key types

Also similarly to registering a [global error type](#registering-a-global-error), you can also register a global `QueryKey` and `MutationKey` type. This allows you to provide more structure to your keys, that matches your application's hierarchy, and have them be typed across all of the library's surface area. Note that the registered type must extend the `Array` type, so that your keys remain an array.

```ts
import '@tanstack/react-query'

type QueryKey = ['dashboard' | 'marketing', ...ReadonlyArray<unknown>]

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: QueryKey
    mutationKey: QueryKey
  }
}
```

[//]: # 'TypingQueryAndMutationKeys'
[//]: # 'TypingQueryOptions'

## Typing Query Options

If you inline query options into `useQuery`, you'll get automatic type inference. However, you might want to extract the query options into a separate function to share them between `useQuery` and e.g. `prefetchQuery`. In that case, you'd lose type inference. To get it back, you can use the `queryOptions` helper:

```ts
import { queryOptions } from '@tanstack/react-query'

function groupOptions() {
  return queryOptions({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 5 * 1000,
  })
}

useQuery(groupOptions())
queryClient.prefetchQuery(groupOptions())
```

Further, the `queryKey` returned from `queryOptions` knows about the `queryFn` associated with it, and we can leverage that type information to make functions like `queryClient.getQueryData` aware of those types as well:

```ts
function groupOptions() {
  return queryOptions({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 5 * 1000,
  })
}

const data = queryClient.getQueryData(groupOptions().queryKey)
//     ^? const data: Group[] | undefined
```

Without `queryOptions`, the type of `data` would be `unknown`, unless we'd pass a generic to it:

```ts
const data = queryClient.getQueryData<Group[]>(['groups'])
```

## Typing Mutation Options

Similarly to `queryOptions`, you can use `mutationOptions` to extract mutation options into a separate function:

```ts
function groupMutationOptions() {
  return mutationOptions({
    mutationKey: ['addGroup'],
    mutationFn: addGroup,
  })
}

useMutation({
  ...groupMutationOptions(),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['groups'] }),
})
useIsMutating(groupMutationOptions())
queryClient.isMutating(groupMutationOptions())
```

[//]: # 'TypingQueryOptions'

## Typesafe disabling of queries using `skipToken`

If you are using TypeScript, you can use the `skipToken` to disable a query. This is useful when you want to disable a query based on a condition, but you still want to keep the query to be type safe.
Read more about it in the [Disabling Queries](../guides/disabling-queries.md) guide.

[//]: # 'Materials'

## Further Reading

For tips and tricks around type inference, have a look at [React Query and TypeScript](../community/tkdodos-blog.md#6-react-query-and-typescript) from
the Community Resources. To find out how to get the best possible type-safety, you can read [Type-safe React Query](../community/tkdodos-blog.md#19-type-safe-react-query). [The Query Options API](../community/tkdodos-blog.md#24-the-query-options-api) outlines how type inference works with the `queryOptions` helper function.

[//]: # 'Materials'



================================================
FILE: docs/framework/react/videos.md
================================================
---
id: videos
title: Videos & Talks
---

<iframe
  width="280"
  height="400"
  title="React Query: It’s Time to Break up with your Global State! – Tanner Linsley"
  src="https://www.youtube.com/embed/seU46c6Jz7E"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style={{
    width: '100%',
  }}
></iframe>

[Click here to view the Repository used for the above presentation](https://github.com/tannerlinsley/react-query-blog-refactor-example)

<iframe
  width="280"
  height="400"
  title="All About React Query (with Tanner Linsley) — Learn With Jason"
  src="https://www.youtube.com/embed/DocXo3gqGdI"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style={{
    width: '100%',
  }}
></iframe>

<iframe
  width="280"
  height="400"
  title="Hooks for Fetching with ReactQuery Creator Tanner Linsley aka @tannerlinsley"
  src="https://www.youtube.com/embed/PPvWXbSCtBU"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style={{
    width: '100%',
  }}
></iframe>

<iframe
  width="280"
  height="400"
  title="React Query - Open Source Friday stream with Tanner Linsley from"
  src="https://www.youtube.com/embed/B3cJDT3j19I"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style={{
    width: '100%',
  }}
></iframe>

<iframe
  width="280"
  height="400"
  title="React Query Presentation - Tanner Linsley"
  src="https://www.youtube.com/embed/_ehibado6rU"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style={{
    width: '100%',
  }}
></iframe>

<iframe
  width="280"
  height="400"
  title="TanStack Query v4 (with Dominik Dorfmeister) — Learn With Jason"
  src="https://www.youtube.com/embed/SPPQm0dvEes"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style={{
    width: '100%',
  }}
></iframe>

<iframe
  width="280"
  height="400"
  title="React Query Exposed by Its Maintainer"
  src="https://www.youtube.com/embed/8-RTNnn9GR8"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style={{
    width: '100%',
  }}
></iframe>

<iframe
  width="280"
  height="400"
  title="React Query API Design: Lessons Learned - Dominik Dorfmeister"
  src="https://www.youtube.com/embed/l3PxErcKeAI"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style={{
    width: '100%',
  }}
></iframe>



================================================
FILE: docs/framework/react/community/community-projects.md
================================================
---
id: community-projects
title: Community Projects
---

There are lots of community projects that build on top of React Query and use it to provide additional functionality or enhanced developer experience. Projects are listed in alphabetical order. If you have a project that you would like to add to this list, please open a PR!

> Please note that these projects are entirely community maintained. If you have questions about these projects, please reach out to the project maintainers.

## Atomic CRM

A full-featured CRM built with React, react-admin, and Supabase.

Link: https://marmelab.com/atomic-crm/

## batshit

A batch manager that will deduplicate and batch requests for a certain data type made within a window

Link: https://github.com/yornaath/batshit

## Blitz

The Missing Fullstack Toolkit for Next.js

Link: https://blitzjs.com/

## Connect

A family of libraries for building building browser and gRPC-compatible HTTP APIs.

Link: https://connectrpc.com/docs

## DevTools Browser Extensions

Browser extensions for Chrome, Firefox, and Edge that provide devtools for TanStack Query, allowing you to inspect and debug queries, mutations, and cache state directly in browser DevTools.

Links:

- <img alt="Chrome logo" src="https://www.google.com/chrome/static/images/chrome-logo.svg" width="16" height="16" class="inline mr-1 not-prose" /> [Devtools for Chrome](https://chromewebstore.google.com/detail/tanstack-query-devtools/annajfchloimdhceglpgglpeepfghfai)
- <img alt="Firefox logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" width="16" height="16" class="inline mr-1 not-prose" /> [Devtools for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tanstack-query-devtools/)
- <img alt="Edge logo" src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg" width="16" height="16" class="inline mr-1 not-prose" /> [Devtools for Edge](https://microsoftedge.microsoft.com/addons/detail/tanstack-query-devtools/edmdpkgkacmjopodhfolmphdenmddobj)

## GraphQL Code Generator

Generate React Query hooks from your GraphQL schema

Link: https://the-guild.dev/graphql/codegen

## Hey API

The OpenAPI to TypeScript codegen. Generate clients, SDKs, validators, and more.

Link: https://heyapi.dev/openapi-ts/plugins/tanstack-query

## Http-wizard

End-to-end type-safe Fastify API with typeScript magic ✨

Link: https://http-wizard.com

## Kubb

Generate SDKs for all your APIs

Link: https://www.kubb.dev/

## NgQuery

Query adapter for Angular

Link: https://ngneat.github.io/query/

## Normy

Automatic normalization and data updates for data fetching libraries

Link: https://github.com/klis87/normy

## OpenAPI codegen

A tool for generating code based on an OpenAPI schema.

Link: https://github.com/fabien0102/openapi-codegen

## OpenAPI Qraft React

Generate type-safe API clients and Hooks for TanStack Query directly from OpenAPI Documents.
Zero-runtime overhead, Proxy-based design, seamless SSR support, and full TanStack Query functionality.

Link: https://github.com/OpenAPI-Qraft/openapi-qraft

## OpenAPI React Query codegen

Generate TanStack Query hooks based on an OpenAPI specification file.

Link: https://github.com/7nohe/openapi-react-query-codegen

### OpenAPI zod client

Generate a zodios client from an OpenAPI specification

Link: https://github.com/astahmer/openapi-zod-client

## openapi-fetch

A 2KB min, typesafe fetch wrapper that uses static TypeScript type inference and no runtime checks.

Link: https://openapi-ts.dev/openapi-react-query/

## oRPC

Easy to build APIs that are end-to-end type-safe and adhere to OpenAPI standards.

Link: https://orpc.unnoq.com/docs/integrations/tanstack-query

## Orval

Generate TypeScript client from OpenAPI specifications

Link: https://orval.dev/

## Query Key factory

A library for creating typesafe standardized query keys, useful for cache management in `@tanstack/query`

Link: https://github.com/lukemorales/query-key-factory

## Rapini

🥬 OpenAPI to React Query (or SWR) & Axios

Link: https://github.com/rametta/rapini

## React Query Kit

🕊️ A toolkit for ReactQuery that makes ReactQuery hooks reusable and typesafe

Link: https://github.com/liaoliao666/react-query-kit

## React Query Rewind

Time travel and visualize state during development

Link: https://reactqueryrewind.com/

## React Query Swagger

Generate React Query hooks based on Swagger API definitions

Link: https://github.com/Shaddix/react-query-swagger

## Suspensive React Query

Enhances React Query with Suspense support, allowing for simpler and more declarative data fetching

Link: https://suspensive.org/docs/react-query/motivation

## tRPC

End-to-end typesafe APIs made easy

Link: https://trpc.io/

## ts-rest

Incrementally adoptable type-safety for your new and existing APIs

Link: https://ts-rest.com/

## wagmi

React Hooks for Ethereum based on `@tanstack/react-query`

Link: https://wagmi.sh/

## zodios

End-to-end typesafe REST API toolbox

Link: https://www.zodios.org/



================================================
FILE: docs/framework/react/community/tkdodos-blog.md
================================================
---
id: tkdodos-blog
title: TkDodo's Blog
---

TanStack Query maintainer [TkDodo](https://bsky.app/profile/tkdodo.eu) has a series of blog posts about using and working with the library. Some articles show general best practices, but most have an _opinionated_ point of view.

## [#1: Practical React Query](https://tkdodo.eu/blog/practical-react-query)

> An advanced introduction to React Query, showing practical tips that go beyond the docs. It covers explaining the defaults (`staleTime` vs. `gcTime`), concepts like keeping server and client state separate, handling dependencies and creating custom hooks, as well as outlining why the `enabled` option is very powerful. [Read more...](https://tkdodo.eu/blog/practical-react-query)

## [#2: React Query Data Transformations](https://tkdodo.eu/blog/react-query-data-transformations)

> Learn the possibilities to perform the quite common and important task of transforming your data with React Query. From transforming in the `queryFn` to using the `select` option, this article outlines the pros and cons of all the different approaches. [Read more...](https://tkdodo.eu/blog/react-query-data-transformations)

## [#3: React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations)

> Let's take a look at what you can do when your component re-renders too often when using React Query. The library is already pretty optimized, but there are still some opt-in features (like `tracked queries`) that you can use to avoid the `isFetching` transition. We're also looking into what `structural sharing` refers to. [Read more...](https://tkdodo.eu/blog/react-query-render-optimizations)

## [#4: Status Checks in React Query](https://tkdodo.eu/blog/status-checks-in-react-query)

> We usually check for `isPending` first before checking for `isError` , but sometimes, checking if `data` is available should be the first thing to do. This article shows how the wrong status check order can negatively impact user experience. [Read more...](https://tkdodo.eu/blog/status-checks-in-react-query)

## [#5: Testing React Query](https://tkdodo.eu/blog/testing-react-query)

> The docs already cover pretty well what you need to do to get started when testing React Query. This article shows some additional tips (like turning off `retries` or silencing the `console`) you might want to follow when testing custom hooks or components using them. It also links to an [example repository](https://github.com/TkDodo/testing-react-query) with tests for success and error states, powered by `mock-service-worker`. [Read more...](https://tkdodo.eu/blog/testing-react-query)

## [#6: React Query and TypeScript](https://tkdodo.eu/blog/react-query-and-type-script)

> Since React Query is written in TypeScript, it has great support for it. This blog post explains the various Generics, how you can leverage type inference to avoid having to explicitly type `useQuery` and friends, what to do with `unknown` errors, how type narrowing works and more! [Read more...](https://tkdodo.eu/blog/react-query-and-type-script)

## [#7: Using WebSockets with React Query](https://tkdodo.eu/blog/using-web-sockets-with-react-query)

> A step-by-step guide on how to make real-time notifications work with React Query, with either event-based subscriptions or pushing full data directly to the client. Applicable to anything from the browser native WebSocket API over Firebase and even GraphQL subscriptions. [Read more...](https://tkdodo.eu/blog/using-web-sockets-with-react-query)

## [#8: Effective React Query Keys](https://tkdodo.eu/blog/effective-react-query-keys)

> Most examples just use a simple String or Array Query Key, but how do you organize your keys effectively once your app grows past a todo list? This article shows how co-location and Query Key Factories can make life easier. [Read more...](https://tkdodo.eu/blog/effective-react-query-keys)

## [#8a: Leveraging the Query Function Context](https://tkdodo.eu/blog/leveraging-the-query-function-context)

> In this amendment to the previous blog post, we look at how we can leverage the Query Function Context and Object Query Keys for maximum safety as our app grows. [Read more...](https://tkdodo.eu/blog/leveraging-the-query-function-context)

## [#9: Placeholder and Initial Data in React Query](https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query)

> Placeholder and Initial Data are two similar yet different concepts for synchronously showing data instead of a loading spinner to improve an application's UX. This blog post compares the two and outlines the scenarios where each one shines. [Read more...](https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query)

## [#10: React Query as a State Manager](https://tkdodo.eu/blog/react-query-as-a-state-manager)

> React Query doesn't fetch any data for you - it's a data synchronization tool that excels when used for server state. This article has everything you need to know to make React Query your single source of truth state manager for your async state. You'll learn how to let React Query do it's magic and why customizing `staleTime` might be all you need. [Read more...](https://tkdodo.eu/blog/react-query-as-a-state-manager)

## [#11: React Query Error Handling](https://tkdodo.eu/blog/react-query-error-handling)

> Handling errors is an integral part of working with asynchronous data, especially data fetching. We have to face it: Not all requests will be successful, and not all Promises will be fulfilled. This blog post describes various ways of coping with errors in React Query, such as the error property, using Error Boundaries or onError callbacks, so that you can prepare your application for the cases when "Something went wrong". [Read more...](https://tkdodo.eu/blog/react-query-error-handling)

## [#12: Mastering Mutations in React Query](https://tkdodo.eu/blog/mastering-mutations-in-react-query)

> Mutations are the important, second part necessary to work with server data - for situations where you need to update it. This blog post covers what mutations are and how they are different from queries. You'll learn the difference between `mutate` and `mutateAsync` as well as how you can tie queries and mutations together. [Read more...](https://tkdodo.eu/blog/mastering-mutations-in-react-query)

## [#13: Offline React Query](https://tkdodo.eu/blog/offline-react-query)

> There are many ways to produce promises - which is everything React Query needs - but by far the biggest use-case is data fetching. Very often, that requires an active network connection. But sometimes, especially on mobile devices where, the network connection can be unreliable, you need your app to also work without it. In this article, you'll learn about the different offline strategies React Query offers. [Read more...](https://tkdodo.eu/blog/offline-react-query)

## [#14: React Query and Forms](https://tkdodo.eu/blog/react-query-and-forms)

> Forms tend to blur the line between what is server state and what is client state. In most applications, we would not only like to display state, but also let the user interact with it. This article shows two different approaches as well as some tips and tricks about using React Query with Forms. [Read more...](https://tkdodo.eu/blog/react-query-and-forms)

## [#15: React Query FAQs](https://tkdodo.eu/blog/react-query-fa-qs)

> This article tries to answer the most frequently asked questions about React Query. [Read more...](https://tkdodo.eu/blog/react-query-fa-qs)

## [#16: React Query meets React Router](https://tkdodo.eu/blog/react-query-meets-react-router)

> Remix and React Router are changing the game when thinking about _when_ to fetch data. This article goes into why React Query and Routers that support data loading are a match made in heaven. [Read more...](https://tkdodo.eu/blog/react-query-meets-react-router)

## [#17: Seeding the Query Cache](https://tkdodo.eu/blog/seeding-the-query-cache)

> This blog post shows multiple ways how to get data into your Query Cache _before_ you start rendering to minimize the amount of loading spinners displayed in your app. The options range from prefetching on the server or in your router to seeding cache entries via `setQueryData`. [Read more...](https://tkdodo.eu/blog/seeding-the-query-cache)

## [#18: Inside React Query](https://tkdodo.eu/blog/inside-react-query)

> If you've ever wondered how React Query works under the hood - this post is for you. It explains the architecture (including visuals), starting with the agnostic Query Core and how it communicates with the framework specific adapters. [Read more...](https://tkdodo.eu/blog/inside-react-query)

## [#19: Type-safe React Query](https://tkdodo.eu/blog/type-safe-react-query)

> There's a big difference between "having types" and "being type-safe". This article tries to outline those differences and shows how you can get the best possible type-safety when using React Query together with TypeScript [Read more...](https://tkdodo.eu/blog/type-safe-react-query)

## [#20: You Might Not Need React Query](https://tkdodo.eu/blog/you-might-not-need-react-query)

> If your application doesn’t rely on client-side data fetching, especially when using frameworks like Next.js or Remix with built-in server components, React Query may be unnecessary. That said, it still shines in hybrid use cases (like infinite scrolling or offline support) where its smart caching and revalidation can be invaluable. [Read more...](https://tkdodo.eu/blog/you-might-not-need-react-query)

## [#21: Thinking in React Query](https://tkdodo.eu/blog/thinking-in-react-query)

> React Query isn’t a data-fetching library - it's an async state manager designed to treat parameters as dependencies, optimize refetch behavior via `staleTime`, and encourage declarative patterns where `queryKey` drives cache and updates. A small shift in mindset can dramatically streamline how you use React Query. [Read more...](https://tkdodo.eu/blog/thinking-in-react-query)

## [#22: React Query and React Context](https://tkdodo.eu/blog/react-query-and-react-context)

> React Query lets components independently manage their own data, making them self-sufficient and resilient, but when shared data (like user info fetched higher up) is needed deeper in the tree, React Context can make that implicit dependency explicit and safer. [Read more...](https://tkdodo.eu/blog/react-query-and-react-context)

## [#23: Why You Want React Query](https://tkdodo.eu/blog/why-you-want-react-query)

> While fetching data with `fetch` inside `useEffect` may seem simple, it quickly gets tangled with bugs like race conditions, missing loading states, stale data, and Strict Mode quirks—making async state management far more complex than it appears. [Read more...](https://tkdodo.eu/blog/why-you-want-react-query)

## [#24: The Query Options API](https://tkdodo.eu/blog/the-query-options-api)

> React Query v5 introduces a unified "Query Options" API - where all functions like `useQuery`, `invalidateQueries`, and imperative calls accept a single object - simplifying the interface and making reuse across different query contexts much easier while at the same time improving type-safety. [Read more...](https://tkdodo.eu/blog/the-query-options-api)

## [#25: Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations)

> React Query doesn’t automatically tie mutations to queries - but you can leverage "global cache callbacks" in a central `MutationCache` to define shared behaviors like invalidating queries on every mutation. [Read more...](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations)

## [#26: How Infinite Queries work](https://tkdodo.eu/blog/how-infinite-queries-work)

> This blog post is a deep dive into how Infinite Queries are designed and work under the hood. Interestingly, there is no distinct InfiniteQuery representation - just a different "behaviour" attached to regular Queries. [Read more...](https://tkdodo.eu/blog/how-infinite-queries-work)

## [#27: React Query API Design - Lessons Learned](https://tkdodo.eu/blog/react-query-api-design-lessons-learned)

> In this talk, Dominik walks us through some of the API design choices that were made in React Query to get to its arguably good developer experience. You'll hear stories about things that went well, but also about tradeoffs and mistakes that were made, and what lessons we can all learn from those. [Read more...](https://tkdodo.eu/blog/react-query-api-design-lessons-learned)

## [#28: React Query - The Bad Parts](https://tkdodo.eu/blog/react-query-the-bad-parts)

> In this talk, Dominik explores the less favorable aspects of React Query and situations where it may not be the best fit. No library is perfect; every choice involves trade-offs. By the end of this talk, you'll have a better understanding of React Query's limitations and why it remains a compelling choice despite them. [Read more...](https://tkdodo.eu/blog/react-query-the-bad-parts)

## [#29: Concurrent Optimistic Updates in React Query](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)

> Optimistic updates in React Query can cause race conditions when multiple mutations run at once, leading to inconsistent UI states. Cancelling in-flight queries helps, but overlapping invalidations may still overwrite newer updates. [Read more...](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)

## [#30: React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)

> React Query’s `select` option enables components to subscribe only to the specific part of a query’s data they care about - so updating one field won’t cause unrelated UI to re-render unnecessarily. This fine-grained approach keeps full responses in the cache while optimizing component updates for performance. [Read more...](https://tkdodo.eu/blog/react-query-selectors-supercharged)



================================================
FILE: docs/framework/react/guides/advanced-ssr.md
================================================
---
id: advanced-ssr
title: Advanced Server Rendering
---

Welcome to the Advanced Server Rendering guide, where you will learn all about using React Query with streaming, Server Components and the Next.js app router.

You might want to read the [Server Rendering & Hydration guide](../ssr.md) before this one as it teaches the basics for using React Query with SSR, and [Performance & Request Waterfalls](../request-waterfalls.md) as well as [Prefetching & Router Integration](../prefetching.md) also contains valuable background.

Before we start, let's note that while the `initialData` approach outlined in the SSR guide also works with Server Components, we'll focus this guide on the hydration APIs.

## Server Components & Next.js app router

We won't cover Server Components in depth here, but the short version is that they are components that are guaranteed to _only_ run on the server, both for the initial page view and **also on page transitions**. This is similar to how Next.js `getServerSideProps`/`getStaticProps` and Remix `loader` works, as these also always run on the server but while those can only return data, Server Components can do a lot more. The data part is central to React Query however, so let's focus on that.

How do we take what we learned in the Server Rendering guide about [passing data prefetched in framework loaders to the app](../ssr.md#using-the-hydration-apis) and apply that to Server Components and the Next.js app router? The best way to start thinking about this is to consider Server Components as "just" another framework loader.

### A quick note on terminology

So far in these guides, we've been talking about the _server_ and the _client_. It's important to note that confusingly enough this does not match 1-1 with _Server Components_ and _Client Components_. Server Components are guaranteed to only run on the server, but Client Components can actually run in both places. The reason for this is that they can also render during the initial _server rendering_ pass.

One way to think of this is that even though Server Components also _render_, they happen during a "loader phase" (always happens on the server), while Client Components run during the "application phase". That application can run both on the server during SSR, and in for example a browser. Where exactly that application runs and if it runs during SSR or not might differ between frameworks.

### Initial setup

The first step of any React Query setup is always to create a `queryClient` and wrap your application in a `QueryClientProvider`. With Server Components, this looks mostly the same across frameworks, one difference being the filename conventions:

```tsx
// In Next.js, this file would be called: app/providers.tsx
'use client'

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
```

```tsx
// In Next.js, this file would be called: app/layout.tsx
import Providers from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

This part is pretty similar to what we did in the SSR guide, we just need to split things up into two different files.

### Prefetching and de/hydrating data

Next, let’s look at how to actually prefetch data, then dehydrate and hydrate it. This is what it looked like using the **Next.js Pages Router**:

```tsx
// pages/posts.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'

// This could also be getServerSideProps
export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

function Posts() {
  // This useQuery could just as well happen in some deeper child to
  // the <PostsRoute>, data will be available immediately either way
  //
  // Note that we are using useQuery here instead of useSuspenseQuery.
  // Because this data has already been prefetched, there is no need to
  // ever suspend in the component itself. If we forget or remove the
  // prefetch, this will instead fetch the data on the client, while
  // using useSuspenseQuery would have had worse side effects.
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts })

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix
  const { data: commentsData } = useQuery({
    queryKey: ['posts-comments'],
    queryFn: getComments,
  })

  // ...
}

export default function PostsRoute({ dehydratedState }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  )
}
```

Converting this to the app router actually looks pretty similar, we just need to move things around a bit. First, we'll create a Server Component to do the prefetching part:

```tsx
// app/posts/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Posts from './posts'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  )
}
```

Next, we'll look at what the Client Component part looks like:

```tsx
// app/posts/posts.tsx
'use client'

export default function Posts() {
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix.
  const { data: commentsData } = useQuery({
    queryKey: ['posts-comments'],
    queryFn: getComments,
  })

  // ...
}
```

One neat thing about the examples above is that the only thing that is Next.js-specific here are the file names, everything else would look the same in any other framework that supports Server Components.

In the SSR guide, we noted that you could get rid of the boilerplate of having `<HydrationBoundary>` in every route. This is not possible with Server Components.

> NOTE: If you encounter a type error while using async Server Components with TypeScript versions lower than `5.1.3` and `@types/react` versions lower than `18.2.8`, it is recommended to update to the latest versions of both. Alternatively, you can use the temporary workaround of adding `{/* @ts-expect-error Server Component */}` when calling this component inside another. For more information, see [Async Server Component TypeScript Error](https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error) in the Next.js 13 docs.

> NOTE: If you encounter an error `Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported.` make sure that you're **not** passing to queryFn a function reference, instead call the function because queryFn args has a bunch of properties and not all of it would be serializable. see [Server Action only works when queryFn isn't a reference](https://github.com/TanStack/query/issues/6264).

### Nesting Server Components

A nice thing about Server Components is that they can be nested and exist on many levels in the React tree, making it possible to prefetch data closer to where it's actually used instead of only at the top of the application (just like Remix loaders). This can be as simple as a Server Component rendering another Server Component (we'll leave the Client Components out in this example for brevity):

```tsx
// app/posts/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Posts from './posts'
import CommentsServerComponent from './comments-server'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
      <CommentsServerComponent />
    </HydrationBoundary>
  )
}

// app/posts/comments-server.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Comments from './comments'

export default async function CommentsServerComponent() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts-comments'],
    queryFn: getComments,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Comments />
    </HydrationBoundary>
  )
}
```

As you can see, it's perfectly fine to use `<HydrationBoundary>` in multiple places, and create and dehydrate multiple `queryClient` for prefetching.

Note that because we are awaiting `getPosts` before rendering `CommentsServerComponent` this would lead to a server side waterfall:

```
1. |> getPosts()
2.   |> getComments()
```

If the server latency to the data is low, this might not be a huge issue, but is still worth pointing out.

In Next.js, besides prefetching data in `page.tsx`, you can also do it in `layout.tsx`, and in [parallel routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes). Because these are all part of the routing, Next.js knows how to fetch them all in parallel. So if `CommentsServerComponent` above was instead expressed as a parallel route, the waterfall would be flattened automatically.

As more frameworks start supporting Server Components, they might have other routing conventions. Read your framework docs for details.

### Alternative: Use a single `queryClient` for prefetching

In the example above, we create a new `queryClient` for each Server Component that fetches data. This is the recommended approach, but if you want to, you can alternatively create a single one that is reused across all Server Components:

```tsx
// app/getQueryClient.tsx
import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

// cache() is scoped per request, so we don't leak data between requests
const getQueryClient = cache(() => new QueryClient())
export default getQueryClient
```

The benefit of this is that you can call `getQueryClient()` to get a hold of this client anywhere that gets called from a Server Component, including utility functions. The downside is that every time you call `dehydrate(getQueryClient())`, you serialize _the entire_ `queryClient`, including queries that have already been serialized before and are unrelated to the current Server Component which is unnecessary overhead.

Next.js already dedupes requests that utilize `fetch()`, but if you are using something else in your `queryFn`, or if you use a framework that does _not_ dedupe these requests automatically, using a single `queryClient` as described above might make sense, despite the duplicated serialization.

> As a future improvement, we might look into creating a `dehydrateNew()` function (name pending) that only dehydrate queries that are _new_ since the last call to `dehydrateNew()`. Feel free to get in touch if this sounds interesting and like something you want to help out with!

### Data ownership and revalidation

With Server Components, it's important to think about data ownership and revalidation. To explain why, let's look at a modified example from above:

```tsx
// app/posts/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Posts from './posts'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  // Note we are now using fetchQuery()
  const posts = await queryClient.fetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* This is the new part */}
      <div>Nr of posts: {posts.length}</div>
      <Posts />
    </HydrationBoundary>
 