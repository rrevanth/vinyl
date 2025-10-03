Directory structure:
└── jpudysz-react-native-unistyles/
    ├── README.md
    ├── babel.config.js
    ├── biome.json
    ├── build-components.js
    ├── LICENSE
    ├── nitro.json
    ├── package.json
    ├── tsconfig.build.json
    ├── tsconfig.json
    ├── Unistyles.podspec
    ├── unistyles_get_rn_version.rb
    ├── .editorconfig
    ├── .nvmrc
    ├── .yarnrc.yml
    ├── android/
    │   ├── CMakeLists.txt
    │   └── src/
    │       └── main/
    │           ├── cxx/
    │           │   ├── cpp-adapter.cpp
    │           │   ├── NativeUnistylesModule.cpp
    │           │   └── NativeUnistylesModule.h
    │           └── java/
    │               └── com/
    │                   └── unistyles/
    │                       ├── Equatable.kt
    │                       ├── NativePlatform+android.kt
    │                       ├── NativePlatform+insets.kt
    │                       ├── NativePlatform+listener.kt
    │                       ├── UnistylesModule.kt
    │                       └── UnistylesPackage.kt
    ├── components/
    │   └── native/
    │       ├── ActivityIndicator/
    │       │   └── package.json
    │       ├── Animated/
    │       │   └── package.json
    │       ├── FlatList/
    │       │   └── package.json
    │       ├── Image/
    │       │   └── package.json
    │       ├── ImageBackground/
    │       │   └── package.json
    │       ├── KeyboardAvoidingView/
    │       │   └── package.json
    │       ├── NativeText/
    │       │   └── package.json
    │       ├── NativeView/
    │       │   └── package.json
    │       ├── Pressable/
    │       │   └── package.json
    │       ├── RefreshControl/
    │       │   └── package.json
    │       ├── SafeAreaView/
    │       │   └── package.json
    │       ├── ScrollView/
    │       │   └── package.json
    │       ├── SectionList/
    │       │   └── package.json
    │       ├── Switch/
    │       │   └── package.json
    │       ├── Text/
    │       │   └── package.json
    │       ├── TextInput/
    │       │   └── package.json
    │       ├── TouchableHighlight/
    │       │   └── package.json
    │       ├── TouchableOpacity/
    │       │   └── package.json
    │       ├── View/
    │       │   └── package.json
    │       └── VirtualizedList/
    │           └── package.json
    ├── cxx/
    │   ├── NativePlatform.h
    │   ├── common/
    │   │   ├── Breakpoints.h
    │   │   ├── Helpers.h
    │   │   └── UnistylesConstants.h
    │   ├── core/
    │   │   ├── HashGenerator.cpp
    │   │   ├── HashGenerator.h
    │   │   ├── HostUnistyle.cpp
    │   │   ├── HostUnistyle.h
    │   │   ├── MediaQueries.cpp
    │   │   ├── MediaQueries.h
    │   │   ├── RNStyle.h
    │   │   ├── StyleSheet.h
    │   │   ├── StyleSheetRegistry.cpp
    │   │   ├── StyleSheetRegistry.h
    │   │   ├── Unistyle.h
    │   │   ├── UnistyleData.h
    │   │   ├── UnistylesCommitShadowNode.h
    │   │   ├── UnistylesRegistry.cpp
    │   │   ├── UnistylesRegistry.h
    │   │   ├── UnistylesState.cpp
    │   │   ├── UnistylesState.h
    │   │   ├── UnistyleWrapper.cpp
    │   │   └── UnistyleWrapper.h
    │   ├── hybridObjects/
    │   │   ├── HybridNavigationBar.cpp
    │   │   ├── HybridNavigationBar.h
    │   │   ├── HybridShadowRegistry.cpp
    │   │   ├── HybridShadowRegistry.h
    │   │   ├── HybridStatusBar.cpp
    │   │   ├── HybridStatusBar.h
    │   │   ├── HybridStyleSheet.cpp
    │   │   ├── HybridStyleSheet.h
    │   │   ├── HybridUnistylesRuntime.cpp
    │   │   └── HybridUnistylesRuntime.h
    │   ├── parser/
    │   │   ├── Parser.cpp
    │   │   └── Parser.h
    │   └── shadowTree/
    │       ├── ShadowLeafUpdate.h
    │       ├── ShadowTrafficController.h
    │       ├── ShadowTreeManager.cpp
    │       └── ShadowTreeManager.h
    ├── docs/
    │   ├── astro.config.mjs
    │   ├── package.json
    │   ├── postcss.config.mjs
    │   ├── theme.json
    │   ├── tsconfig.json
    │   ├── src/
    │   │   ├── animate.ts
    │   │   ├── env.d.ts
    │   │   ├── components/
    │   │   │   ├── Beam.astro
    │   │   │   ├── Button.astro
    │   │   │   ├── CompareChanges.astro
    │   │   │   ├── index.ts
    │   │   │   ├── Seo.astro
    │   │   │   └── TutorialNavigation.astro
    │   │   ├── content/
    │   │   │   ├── config.ts
    │   │   │   └── docs/
    │   │   │       └── v3/
    │   │   │           ├── guides/
    │   │   │           │   ├── avoiding-keyboard.mdx
    │   │   │           │   ├── custom-web.mdx
    │   │   │           │   ├── expo-router.mdx
    │   │   │           │   ├── merging-styles.mdx
    │   │   │           │   ├── react-compiler.mdx
    │   │   │           │   ├── reanimated.mdx
    │   │   │           │   ├── server-side-rendering.mdx
    │   │   │           │   ├── theming.mdx
    │   │   │           │   └── why-my-view-doesnt-update.mdx
    │   │   │           ├── llms/
    │   │   │           │   └── info.mdx
    │   │   │           ├── other/
    │   │   │           │   ├── babel-plugin.mdx
    │   │   │           │   ├── dependencies.mdx
    │   │   │           │   ├── for-library-authors.mdx
    │   │   │           │   ├── for-sponsors.mdx
    │   │   │           │   └── frequently-asked-questions.mdx
    │   │   │           ├── references/
    │   │   │           │   ├── 3rd-party-views.mdx
    │   │   │           │   ├── breakpoints.mdx
    │   │   │           │   ├── compound-variants.mdx
    │   │   │           │   ├── content-size-category.mdx
    │   │   │           │   ├── dimensions.mdx
    │   │   │           │   ├── display-hide.mdx
    │   │   │           │   ├── dynamic-functions.mdx
    │   │   │           │   ├── edge-to-edge.mdx
    │   │   │           │   ├── media-queries.mdx
    │   │   │           │   ├── mini-runtime.mdx
    │   │   │           │   ├── scoped-theme.mdx
    │   │   │           │   ├── stylesheet.mdx
    │   │   │           │   ├── unistyles-runtime.mdx
    │   │   │           │   ├── use-unistyles.mdx
    │   │   │           │   ├── variants.mdx
    │   │   │           │   ├── web-only.mdx
    │   │   │           │   ├── web-styles.mdx
    │   │   │           │   └── with-unistyles.mdx
    │   │   │           ├── start/
    │   │   │           │   ├── configuration.mdx
    │   │   │           │   ├── getting-started.mdx
    │   │   │           │   ├── how-unistyles-works.mdx
    │   │   │           │   ├── introduction.mdx
    │   │   │           │   ├── migration-guide.mdx
    │   │   │           │   ├── new-features.mdx
    │   │   │           │   ├── testing.mdx
    │   │   │           │   └── when-to-use-unistyles.mdx
    │   │   │           └── tutorial/
    │   │   │               ├── cleanup-components.mdx
    │   │   │               ├── cleanup-screens.mdx
    │   │   │               ├── cross-platform.mdx
    │   │   │               ├── intro.mdx
    │   │   │               ├── modals.mdx
    │   │   │               ├── new-screens.mdx
    │   │   │               ├── player-screens.mdx
    │   │   │               └── settings-screen.mdx
    │   │   ├── pages/
    │   │   │   └── index.astro
    │   │   └── styles/
    │   │       ├── docs.css
    │   │       └── home.css
    │   └── .astro/
    │       ├── settings.json
    │       └── types.d.ts
    ├── example/
    │   ├── README.md
    │   ├── app.json
    │   ├── App.tsx
    │   ├── babel.config.js
    │   ├── Button.tsx
    │   ├── Gemfile
    │   ├── index.js
    │   ├── metro.config.js
    │   ├── package.json
    │   ├── react-native.config.js
    │   ├── st.ts
    │   ├── tsconfig.json
    │   ├── Typography.tsx
    │   ├── unistyles.ts
    │   ├── .watchmanconfig
    │   ├── android/
    │   │   ├── gradle.properties
    │   │   ├── gradlew
    │   │   ├── gradlew.bat
    │   │   ├── app/
    │   │   │   ├── debug.keystore
    │   │   │   ├── proguard-rules.pro
    │   │   │   └── src/
    │   │   │       ├── debug/
    │   │   │       │   └── AndroidManifest.xml
    │   │   │       └── main/
    │   │   │           ├── AndroidManifest.xml
    │   │   │           ├── java/
    │   │   │           │   └── com/
    │   │   │           │       └── example/
    │   │   │           │           ├── MainActivity.kt
    │   │   │           │           └── MainApplication.kt
    │   │   │           └── res/
    │   │   │               ├── drawable/
    │   │   │               │   └── rn_edit_text_material.xml
    │   │   │               └── values/
    │   │   │                   ├── strings.xml
    │   │   │                   └── styles.xml
    │   │   └── gradle/
    │   │       └── wrapper/
    │   │           └── gradle-wrapper.properties
    │   └── ios/
    │       ├── AppDelegate.swift
    │       ├── Podfile
    │       ├── .xcode.env
    │       ├── example/
    │       │   ├── Info.plist
    │       │   ├── LaunchScreen.storyboard
    │       │   ├── PrivacyInfo.xcprivacy
    │       │   └── Images.xcassets/
    │       │       ├── Contents.json
    │       │       └── AppIcon.appiconset/
    │       │           └── Contents.json
    │       └── exampleTests/
    │           ├── exampleTests.m
    │           └── Info.plist
    ├── expo-example/
    │   ├── app.json
    │   ├── babel.config.js
    │   ├── index.js
    │   ├── metro.config.js
    │   ├── package.json
    │   ├── react-native.config.js
    │   ├── tsconfig.json
    │   ├── unistyles.ts
    │   ├── __tests__/
    │   │   ├── example.spec.tsx
    │   │   └── __snapshots__/
    │   │       └── example.spec.tsx.snap
    │   └── app/
    │       ├── +html.tsx
    │       ├── +not-found.tsx
    │       ├── _layout.tsx
    │       └── (tabs)/
    │           ├── _layout.tsx
    │           ├── explore.tsx
    │           └── index.tsx
    ├── ios/
    │   ├── Equatable.swift
    │   ├── Extensions.swift
    │   ├── NativePlatform+ios.swift
    │   ├── NativePlatform+keyboard.swift
    │   ├── NativePlatform.swift
    │   ├── NativePlatformListener+ios.swift
    │   ├── Unistyles.h
    │   ├── UnistylesModuleOnLoad.h
    │   └── UnistylesModuleOnLoad.mm
    ├── nitrogen/
    │   └── generated/
    │       ├── android/
    │       │   ├── unistyles+autolinking.cmake
    │       │   ├── unistylesOnLoad.cpp
    │       │   ├── unistylesOnLoad.hpp
    │       │   ├── c++/
    │       │   │   ├── JColorScheme.hpp
    │       │   │   ├── JDimensions.hpp
    │       │   │   ├── JFunc_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime.hpp
    │       │   │   ├── JFunc_void_UnistylesNativeMiniRuntime.hpp
    │       │   │   ├── JHybridNativePlatformSpec.cpp
    │       │   │   ├── JHybridNativePlatformSpec.hpp
    │       │   │   ├── JInsets.hpp
    │       │   │   ├── JOrientation.hpp
    │       │   │   ├── JUnistyleDependency.hpp
    │       │   │   └── JUnistylesNativeMiniRuntime.hpp
    │       │   └── kotlin/
    │       │       └── com/
    │       │           └── margelo/
    │       │               └── nitro/
    │       │                   └── unistyles/
    │       │                       ├── ColorScheme.kt
    │       │                       ├── Dimensions.kt
    │       │                       ├── Func_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime.kt
    │       │                       ├── Func_void_UnistylesNativeMiniRuntime.kt
    │       │                       ├── HybridNativePlatformSpec.kt
    │       │                       ├── Insets.kt
    │       │                       ├── Orientation.kt
    │       │                       ├── UnistyleDependency.kt
    │       │                       ├── UnistylesNativeMiniRuntime.kt
    │       │                       └── unistylesOnLoad.kt
    │       ├── ios/
    │       │   ├── Unistyles+autolinking.rb
    │       │   ├── Unistyles-Swift-Cxx-Bridge.cpp
    │       │   ├── Unistyles-Swift-Cxx-Bridge.hpp
    │       │   ├── Unistyles-Swift-Cxx-Umbrella.hpp
    │       │   ├── c++/
    │       │   │   ├── HybridNativePlatformSpecSwift.cpp
    │       │   │   └── HybridNativePlatformSpecSwift.hpp
    │       │   └── swift/
    │       │       ├── ColorScheme.swift
    │       │       ├── Dimensions.swift
    │       │       ├── Func_void_std__vector_UnistyleDependency__UnistylesNativeMiniRuntime.swift
    │       │       ├── Func_void_UnistylesNativeMiniRuntime.swift
    │       │       ├── HybridNativePlatformSpec.swift
    │       │       ├── HybridNativePlatformSpec_cxx.swift
    │       │       ├── Insets.swift
    │       │       ├── Orientation.swift
    │       │       ├── UnistyleDependency.swift
    │       │       └── UnistylesNativeMiniRuntime.swift
    │       └── shared/
    │           └── c++/
    │               ├── ColorScheme.hpp
    │               ├── Dimensions.hpp
    │               ├── HybridNativePlatformSpec.cpp
    │               ├── HybridNativePlatformSpec.hpp
    │               ├── HybridUnistylesNavigationBarSpec.cpp
    │               ├── HybridUnistylesNavigationBarSpec.hpp
    │               ├── HybridUnistylesRuntimeSpec.cpp
    │               ├── HybridUnistylesRuntimeSpec.hpp
    │               ├── HybridUnistylesShadowRegistrySpec.cpp
    │               ├── HybridUnistylesShadowRegistrySpec.hpp
    │               ├── HybridUnistylesStatusBarSpec.cpp
    │               ├── HybridUnistylesStatusBarSpec.hpp
    │               ├── HybridUnistylesStyleSheetSpec.cpp
    │               ├── HybridUnistylesStyleSheetSpec.hpp
    │               ├── Insets.hpp
    │               ├── Orientation.hpp
    │               ├── UnistyleDependency.hpp
    │               ├── UnistylesCxxMiniRuntime.hpp
    │               └── UnistylesNativeMiniRuntime.hpp
    ├── plugin/
    │   ├── esbuild.js
    │   ├── index.d.ts
    │   ├── index.js
    │   ├── __tests__/
    │   │   ├── dependencies.spec.ts
    │   │   ├── imports.spec.ts
    │   │   ├── playground.js
    │   │   ├── stylesheet.spec.ts
    │   │   ├── userImports.spec.ts
    │   │   ├── variants.spec.ts
    │   │   └── .prettierrc
    │   └── src/
    │       ├── consts.ts
    │       ├── exotic.ts
    │       ├── import.ts
    │       ├── index.ts
    │       ├── paths.ts
    │       ├── ref.ts
    │       ├── stylesheet.ts
    │       ├── types.ts
    │       └── variants.ts
    ├── reanimated/
    │   └── package.json
    ├── repack-plugin/
    │   ├── esbuild.js
    │   ├── index.d.ts
    │   ├── index.js
    │   └── src/
    │       ├── index.ts
    │       └── loader.ts
    ├── server/
    │   └── package.json
    ├── src/
    │   ├── common.ts
    │   ├── global.ts
    │   ├── index.ts
    │   ├── mocks.ts
    │   ├── mq.ts
    │   ├── utils.ts
    │   ├── components/
    │   │   ├── AdaptiveTheme.tsx
    │   │   ├── ApplyScopedTheme.tsx
    │   │   ├── Display.tsx
    │   │   ├── Hide.tsx
    │   │   ├── index.ts
    │   │   ├── NamedTheme.tsx
    │   │   ├── ScopedTheme.tsx
    │   │   └── native/
    │   │       ├── ActivityIndicator.tsx
    │   │       ├── Animated.tsx
    │   │       ├── FlatList.tsx
    │   │       ├── Image.native.tsx
    │   │       ├── Image.tsx
    │   │       ├── ImageBackground.native.tsx
    │   │       ├── ImageBackground.tsx
    │   │       ├── KeyboardAvoidingView.tsx
    │   │       ├── NativeText.native.tsx
    │   │       ├── NativeText.tsx
    │   │       ├── NativeView.native.tsx
    │   │       ├── NativeView.tsx
    │   │       ├── Pressable.native.tsx
    │   │       ├── Pressable.tsx
    │   │       ├── RefreshControl.tsx
    │   │       ├── SafeAreaView.tsx
    │   │       ├── ScrollView.tsx
    │   │       ├── SectionList.tsx
    │   │       ├── Switch.tsx
    │   │       ├── Text.tsx
    │   │       ├── TextInput.tsx
    │   │       ├── TouchableHighlight.tsx
    │   │       ├── TouchableOpacity.tsx
    │   │       ├── View.tsx
    │   │       └── VirtualizedList.tsx
    │   ├── core/
    │   │   ├── createUnistylesElement.native.tsx
    │   │   ├── createUnistylesElement.tsx
    │   │   ├── createUnistylesImageBackground.tsx
    │   │   ├── getClassname.native.ts
    │   │   ├── getClassname.ts
    │   │   ├── index.ts
    │   │   ├── parseBoxShadow.ts
    │   │   ├── passForwardRef.ts
    │   │   ├── useUnistyles.ts
    │   │   ├── warn.ts
    │   │   ├── useProxifiedUnistyles/
    │   │   │   ├── index.ts
    │   │   │   ├── listener.native.ts
    │   │   │   ├── listener.ts
    │   │   │   ├── types.ts
    │   │   │   └── useProxifiedUnistyles.ts
    │   │   └── withUnistyles/
    │   │       ├── index.ts
    │   │       ├── types.ts
    │   │       ├── withUnistyles.native.tsx
    │   │       └── withUnistyles.tsx
    │   ├── hooks/
    │   │   ├── index.ts
    │   │   ├── useMedia.native.ts
    │   │   └── useMedia.ts
    │   ├── reanimated/
    │   │   ├── index.ts
    │   │   ├── useAnimatedTheme.native.ts
    │   │   ├── useAnimatedTheme.ts
    │   │   └── variant/
    │   │       ├── index.ts
    │   │       ├── types.ts
    │   │       ├── useAnimatedVariantColor.ts
    │   │       ├── useUpdateVariantColor.native.ts
    │   │       └── useUpdateVariantColor.ts
    │   ├── server/
    │   │   ├── getServerUnistyles.tsx
    │   │   ├── hydrateServerUnistyles.ts
    │   │   ├── index.ts
    │   │   ├── resetServerUnistyles.ts
    │   │   ├── serialize.ts
    │   │   ├── types.ts
    │   │   └── useServerUnistyles.tsx
    │   ├── specs/
    │   │   ├── index.native.ts
    │   │   ├── index.ts
    │   │   ├── types.ts
    │   │   ├── NativePlatform/
    │   │   │   ├── index.ts
    │   │   │   └── NativePlatform.nitro.ts
    │   │   ├── NavigtionBar/
    │   │   │   ├── index.ts
    │   │   │   └── UnistylesNavigationBar.nitro.ts
    │   │   ├── ShadowRegistry/
    │   │   │   ├── index.ts
    │   │   │   ├── ShadowRegistry.nitro.ts
    │   │   │   └── types.ts
    │   │   ├── StatusBar/
    │   │   │   ├── index.ts
    │   │   │   └── UnistylesStatusBar.nitro.ts
    │   │   ├── StyleSheet/
    │   │   │   ├── index.ts
    │   │   │   └── UnistylesStyleSheet.nitro.ts
    │   │   ├── TurboUnistyles/
    │   │   │   ├── index.ts
    │   │   │   └── NativeTurboUnistyles.ts
    │   │   └── UnistylesRuntime/
    │   │       ├── index.ts
    │   │       └── UnistylesRuntime.nitro.ts
    │   ├── types/
    │   │   ├── accessibility.ts
    │   │   ├── breakpoints.ts
    │   │   ├── common.ts
    │   │   ├── core.ts
    │   │   ├── index.ts
    │   │   ├── stylesheet.ts
    │   │   └── variants.ts
    │   ├── web/
    │   │   ├── create.ts
    │   │   ├── index.ts
    │   │   ├── listener.ts
    │   │   ├── mock.ts
    │   │   ├── registry.ts
    │   │   ├── runtime.ts
    │   │   ├── services.ts
    │   │   ├── shadowRegistry.ts
    │   │   ├── state.ts
    │   │   ├── types.ts
    │   │   ├── variants.ts
    │   │   ├── convert/
    │   │   │   ├── index.ts
    │   │   │   ├── module.d.ts
    │   │   │   ├── pseudo.ts
    │   │   │   ├── style.ts
    │   │   │   ├── types.ts
    │   │   │   ├── utils.ts
    │   │   │   ├── object/
    │   │   │   │   ├── boxShadow.ts
    │   │   │   │   ├── filter.ts
    │   │   │   │   ├── index.ts
    │   │   │   │   ├── objectStyle.ts
    │   │   │   │   └── transform.ts
    │   │   │   └── shadow/
    │   │   │       ├── boxShadow.ts
    │   │   │       ├── getShadowBreakpoints.ts
    │   │   │       ├── index.ts
    │   │   │       └── textShadow.ts
    │   │   ├── css/
    │   │   │   ├── core.ts
    │   │   │   ├── index.ts
    │   │   │   ├── state.ts
    │   │   │   └── utils.ts
    │   │   └── utils/
    │   │       ├── common.ts
    │   │       ├── createUnistylesRef.ts
    │   │       ├── index.ts
    │   │       └── unistyle.ts
    │   └── web-only/
    │       ├── getWebProps.ts
    │       └── index.ts
    ├── web/
    │   └── package.json
    ├── .github/
    │   ├── FUNDING.yml
    │   ├── PULL_REQUEST_TEMPLATE.md
    │   ├── ISSUE_TEMPLATE/
    │   │   ├── bug-report.yml
    │   │   └── config.yml
    │   └── workflows/
    │       ├── ci.yml
    │       └── release.yml
    └── .husky/
        ├── commit-msg
        └── pre-commit


Files Content:

(Files content cropped to 300k characters, download full ingest to see more)
================================================
FILE: README.md
================================================
[<img alt="react-native-unistyles" src="assets/banner3.png">](https://unistyl.es/)

![GitHub package.json version](https://img.shields.io/github/package-json/v/jpudysz/react-native-unistyles?style=for-the-badge)
[![npm downloads](https://img.shields.io/npm/dm/react-native-unistyles?style=for-the-badge)](https://www.npmjs.com/package/react-native-unistyles)
[![npm downloads](https://img.shields.io/npm/dt/react-native-unistyles?style=for-the-badge)](https://www.npmjs.com/package/react-native-unistyles)
[![License: MIT](https://img.shields.io/badge/License-MIT-44CD11.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
<br />
[![platform - expo](https://img.shields.io/badge/Expo-fff?style=for-the-badge&logo=expo&logoColor=black)](https://docs.expo.dev/)
[![platform - web](https://img.shields.io/badge/Web-white?logo=react&logoColor=57BDDA&style=for-the-badge)](https://www.w3.org/)
[![platform - ios](https://img.shields.io/badge/iOS-000?logo=apple&style=for-the-badge)](https://developer.apple.com/ios/)
[![platform - android](https://img.shields.io/badge/Android-44CD11?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com/)
[![platform - ssr](https://img.shields.io/badge/SSR-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)


## Installation

```shell
yarn add react-native-unistyles
```

Install dependencies:

```shell
yarn add react-native-edge-to-edge react-native-nitro-modules@0.28.0
```

> To avoid unexpected behavior, always use a fixed version of `react-native-nitro-modules`

| react-native-unistyles | react-native-nitro-modules |
|------------------------|----------------------------|
| 3.0.0                  | 0.28.0                     |

Then follow [installation guides](https://unistyl.es/v3/start/getting-started) for your platform.

## [Documentation](https://unistyl.es/)
- [Start here](https://unistyl.es/v3/start/introduction)
- [Migration from Unistyles 2.0](https://unistyl.es/v3/start/migration-guide)
- [Learn how Unistyles 3.0 works](https://unistyl.es/v3/start/how-unistyles-works)
- [API](https://unistyl.es/v3/references/stylesheet)
- [Examples](https://unistyl.es/v3/examples/examples)

## Features
- 🚀 Shared core with C++ and JSI bindings
- 🏎️ Powered by Nitro Modules
- 🦸🏼‍♂️ No re-renders
- 🦄 Custom web parser, classes and pseudo classes
- ⚛️ Tightly integrated with Fabric and Shadow Tree
- 🔥 Crazy performance, adds under 0.1 ms to your StyleSheet
- 🎳 Share up to 100% of your styles across platforms in monorepo
- 🎯 Doesn't introduce new components, your view hierarchy is always clean
- 🎨 Register multiple themes and change them with single function call
- and [much much more](https://unistyl.es/v3/start/new-features)!

## Sponsors

<a href="https://codemask.com">
    <img src="https://avatars.githubusercontent.com/u/51229884?s=200&v=4" height="70px" width="70px" alt="codemask" />
</a>
<a href="https://galaxies.dev">
     <img src="https://avatars.githubusercontent.com/u/118431096?s=200&v=4" height="70px" width="70px" alt="galaxies-dev" />
</a>
<a href="https://github.com/mwarger">
     <img src="https://avatars.githubusercontent.com/u/686823?v=4" height="70px" width="70px" alt="mwarger" />
</a>
<a href="https://github.com/biw">
     <img src="https://avatars.githubusercontent.com/u/6139501?v=4" height="70px" width="70px" alt="biw" />
</a>
<a href="https://github.com/happyfloat">
     <img src="https://avatars.githubusercontent.com/u/186333704?s=200&v=4" height="70px" width="70px" alt="happyfloat" />
</a>
<a href="https://github.com/ryanlanciaux">
     <img src="https://avatars.githubusercontent.com/u/85041?v=4" height="70px" width="70px" alt="ryanlanciaux" />
</a>
<a href="https://github.com/jordmccord">
     <img src="https://avatars.githubusercontent.com/u/7591840?v=4" height="70px" width="70px" alt="jordmccord" />
</a>
<a href="https://github.com/kerwanp">
     <img src="https://avatars.githubusercontent.com/u/36955373?v=4" height="70px" width="70px" alt="kerwanp" />
</a>

## Past sponsors

<a href="https://github.com/kmartinezmedia">
     <img src="https://avatars.githubusercontent.com/u/6308123?s=200&v=4" height="60px" width="60px" alt="kmartinezmedia" />
</a>
<a href="https://github.com/levibuzolic">
     <img src="https://avatars.githubusercontent.com/u/721323?v=4" height="60px" width="60px" alt="levibuzolic" />
</a>
<a href="https://github.com/claudesortwell">
     <img src="https://avatars.githubusercontent.com/u/41422239?v=4" height="60px" width="60px" alt="claudesortwell" />
</a>
<a href="https://github.com/luoxuhai">
     <img src="https://avatars.githubusercontent.com/u/37284154?v=4" height="60px" width="60px" alt="luoxuhai" />
</a>
<a href="https://github.com">
     <img src="https://avatars.githubusercontent.com/u/113348625?v=4" height="60px" width="60px" alt="anonymous" />
</a>
<a href="https://github.com/abanobboles">
     <img src="https://avatars.githubusercontent.com/u/9078953?v=4" height="60px" width="60px" alt="abanobboles" />
</a>
<a href="https://github.com/hyoban">
     <img src="https://avatars.githubusercontent.com/u/38493346?v=4" height="60px" width="60px" alt="hyoban" />
</a>
<a href="https://github.com/giovannilondero">
     <img src="https://avatars.githubusercontent.com/u/10998991?v=4" height="60px" width="60px" alt="giovannilondero" />
</a>
<a href="https://github.com/4cc3ssX">
     <img src="https://avatars.githubusercontent.com/u/57473799?v=4" height="60px" width="60px" alt="4cc3ssX" />
</a>
<a href="https://github.com/FilipiRafael">
     <img src="https://avatars.githubusercontent.com/u/61629642?v=4" height="60px" width="60px" alt="FilipiRafael" />
</a>
<a href="https://github.com/dacoto97">
     <img src="https://avatars.githubusercontent.com/u/16915053?v=4" height="60px" width="60px" alt="dacoto97" />
</a>
<a href="https://github.com/chinamcafee">
     <img src="https://avatars.githubusercontent.com/u/3439961?v=4" height="60px" width="60px" alt="chinamcafee" />
</a>
<a href="https://github.com/guillaumehcht">
     <img src="https://avatars.githubusercontent.com/u/80776475?v=4" height="60px" width="60px" alt="guillaumehcht" />
</a>
<a href="https://github.com/FTCHD">
     <img src="https://avatars.githubusercontent.com/u/144691102?v=4" height="60px" width="60px" alt="FTCHD" />
</a>
<a href="https://github.com/avega99">
     <img src="https://avatars.githubusercontent.com/u/177598670?v=4" height="60px" width="60px" alt="avega99" />
</a>
<a href="https://github.com/oscklm">
     <img src="https://avatars.githubusercontent.com/u/22825865?v=4" height="60px" width="60px" alt="oscklm" />
</a>
<a href="https://github.com/loopsware">
     <img src="https://avatars.githubusercontent.com/u/161434039?s=200&v=4" height="60px" width="60px" alt="loopsware" />
</a>
<a href="https://github.com/mobily">
     <img src="https://avatars.githubusercontent.com/u/1467712?v=4" height="60px" width="60px" alt="mobily" />
</a>

## Sponsor my work

[How to become a sponsor?](https://unistyl.es/v3/other/for-sponsors)

If you found the `react-native-unistyles` time-saving and valuable, please consider sponsoring my work. Your support enables me to continue creating libraries with a fresh approach.

Github: https://github.com/sponsors/jpudysz

Ko-fi: https://ko-fi.com/jpudysz

Your support is greatly appreciated and helps me dedicate more time and resources to creating quality libraries. Thank you for all the support!


## Discord
Looking for help or you want to chat with me?

[Join Discord](https://discord.gg/akGHf27P4C)


## License

MIT



================================================
FILE: babel.config.js
================================================
module.exports = {
    presets: ['module:metro-react-native-babel-preset']
}



================================================
FILE: biome.json
================================================
{
  "$schema": "https://biomejs.dev/schemas/1.8.3/schema.json",
  "files": {
    "include": ["src/**/*.ts", "src/**/*.tsx", "plugin/**/*.ts", "repack-plugin/**/*.ts"],
    "ignore": ["example", "expo-example", "docs", "lib"]
  },
  "formatter": {
    "enabled": false
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noEmptyInterface": "off",
        "noExplicitAny": "off"
      },
      "complexity": {
        "noForEach": "off",
        "noUselessSwitchCase": "off",
        "noBannedTypes": "off"
      },
      "correctness": {
        "useExhaustiveDependencies": "off"
      }
    }
  },
  "organizeImports": {
    "enabled": true
  },
  "javascript": {
    "globals": [],
    "jsxRuntime": "reactClassic"
  }
}



================================================
FILE: build-components.js
================================================
const fs = require('node:fs')

const REACT_NATIVE_COMPONENT_NAMES = [
    'ActivityIndicator',
    'View',
    'Text',
    'Image',
    'ImageBackground',
    'KeyboardAvoidingView',
    'Pressable',
    'ScrollView',
    'FlatList',
    'SectionList',
    'Switch',
    'TextInput',
    'RefreshControl',
    'TouchableHighlight',
    'TouchableOpacity',
    'VirtualizedList',
    'Animated',
    'NativeView',
    'NativeText',
    'SafeAreaView'
]

fs.rmSync('./components', { recursive: true, force: true })
fs.mkdirSync('./components')
fs.mkdirSync('./components/native')

REACT_NATIVE_COMPONENT_NAMES.forEach(componentName => {
    fs.mkdirSync(`./components/native/${componentName}`)
    const hasNativeFile = fs.existsSync(`./src/components/native/${componentName}.native.tsx`)
    const packageJson = [
        '{',
        `  "main": "../../../lib/commonjs/components/native/${componentName}.js",`,
        `  "module": "../../../lib/module/components/native/${componentName}.js",`,
        `  "browser": "../../../lib/module/components/native/${componentName}.js",`,
        `  "react-native": "../../../src/components/native/${componentName}.${hasNativeFile ? 'native.' : ''}tsx"`,
        '}',
        ''
    ].join('\n')
    fs.writeFileSync(`./components/native/${componentName}/package.json`, packageJson)
})



================================================
FILE: LICENSE
================================================
MIT License

Copyright (c) 2023-2025 Jacek Pudysz
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
FILE: nitro.json
================================================
{
  "cxxNamespace": ["unistyles"],
  "ios": {
    "iosModuleName": "Unistyles"
  },
  "android": {
    "androidNamespace": ["unistyles"],
    "androidCxxLibName": "unistyles"
  },
  "autolinking": {}
}



================================================
FILE: package.json
================================================
{
  "name": "react-native-unistyles",
  "version": "3.0.10",
  "description": "Level up your React Native StyleSheet",
  "scripts": {
    "test": "NODE_ENV=babel-test jest ./plugin",
    "test:coverage": "NODE_ENV=babel-test jest --passWithNoTests --coverage",
    "tsc": "node_modules/typescript/bin/tsc --noEmit",
    "lint": "biome lint",
    "check": "biome check --write",
    "check:ci": "biome check",
    "prepare": "husky && bob build && yarn plugin:build && yarn repack:plugin:build",
    "precommit": "concurrently 'yarn tsc' 'yarn lint' 'yarn check' 'yarn test' 'yarn circular:check'",
    "release": "release-it",
    "plugin:build": "node plugin/esbuild.js",
    "repack:plugin:build": "node repack-plugin/esbuild.js",
    "circular:check": "dpdm --no-warning --no-tree -T --exit-code circular:1 src/**/*.ts",
    "components:build": "node build-components.js"
  },
  "main": "lib/commonjs/index.js",
  "module": "lib/module/index.js",
  "browser": "lib/module/index.js",
  "types": "lib/typescript/src/index.d.ts",
  "source": "src/index",
  "exports": {
    ".": {
      "types": "./lib/typescript/src/index.d.ts",
      "import": "./lib/module/index.js",
      "browser": "./lib/module/index.js",
      "react-native": "./src/index.ts",
      "default": "./lib/commonjs/index.js"
    },
    "./mocks": {
      "import": "./lib/module/mocks.js",
      "browser": "./lib/module/mocks.js",
      "react-native": "./src/mocks.ts",
      "default": "./lib/commonjs/mocks.js"
    },
    "./components/native/*": {
      "import": "./lib/module/components/native/*",
      "browser": "./lib/module/components/native/*",
      "react-native": "./src/components/native/*",
      "default": "./lib/commonjs/components/native/*"
    },
    "./plugin": {
      "import": "./plugin/index.js",
      "types": "./plugin/index.d.ts",
      "default": "./plugin/index.js"
    },
    "./repack-plugin": {
      "import": "./repack-plugin/index.js",
      "types": "./repack-plugin/index.d.ts",
      "default": "./repack-plugin/index.js"
    },
    "./package.json": "./package.json",
    "./server": {
      "types": "./lib/typescript/src/server/index.d.ts",
      "import": "./lib/module/server/index.js",
      "browser": "./lib/module/server/index.js",
      "react-native": "./src/server/index.ts",
      "default": "./lib/commonjs/server/index.js"
    },
    "./web": {
      "types": "./lib/typescript/src/web-only/index.d.ts",
      "import": "./lib/module/web-only/index.js",
      "browser": "./lib/module/web-only/index.js",
      "react-native": "./src/web-only/index.ts",
      "default": "./lib/commonjs/web-only/index.js"
    },
    "./reanimated": {
      "types": "./lib/typescript/src/reanimated/index.d.ts",
      "import": "./lib/module/reanimated/index.js",
      "browser": "./lib/module/reanimated/index.js",
      "react-native": "./src/reanimated/index.ts",
      "default": "./lib/commonjs/reanimated/index.js"
    }
  },
  "files": [
    "src",
    "lib",
    "ios",
    "android",
    "cxx",
    "nitrogen",
    "plugin",
    "web",
    "components",
    "server",
    "web-only",
    "reanimated",
    "react-native.config.js",
    "Unistyles.podspec",
    "repack-plugin",
    "unistyles_get_rn_version.rb",
    "!repack-plugin/__tests__",
    "!repack-plugin/src",
    "!repack-plugin/esbuild.js",
    "!plugin/__tests__",
    "!plugin/src",
    "!plugin/esbuild.js",
    "!ios/build",
    "!android/build",
    "!android/gradle",
    "!android/gradlew",
    "!android/gradlew.bat",
    "!android/local.properties",
    "!**/*.spec.ts",
    "!**/*.spec.tsx",
    "!**/.*"
  ],
  "keywords": [
    "react-native",
    "ios",
    "android",
    "react-native-web",
    "expo",
    "fabric"
  ],
  "repository": "https://github.com/jpudysz/react-native-unistyles",
  "author": "Jacek Pudysz <jacekpudysz@gmail.com> (https://github.com/jpudysz)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/jpudysz/react-native-unistyles/issues"
  },
  "homepage": "https://github.com/jpudysz/react-native-unistyles#readme",
  "publishConfig": {
    "registry": "https://registry.npmjs.org/"
  },
  "devDependencies": {
    "@babel/core": "7.27.1",
    "@babel/plugin-syntax-jsx": "7.27.1",
    "@babel/preset-flow": "7.27.1",
    "@babel/preset-typescript": "7.27.1",
    "@babel/types": "7.27.1",
    "@biomejs/biome": "1.9.4",
    "@callstack/repack": "5.1.0",
    "@commitlint/config-conventional": "19.8.1",
    "@react-native/normalize-colors": "0.79.2",
    "@release-it/conventional-changelog": "8.0.2",
    "@rspack/core": "1.3.10",
    "@types/jest": "29.5.14",
    "@types/react": "19.1.4",
    "babel-plugin-tester": "11.0.4",
    "commitlint": "19.8.1",
    "concurrently": "9.1.2",
    "dpdm": "3.14.0",
    "esbuild": "0.25.4",
    "husky": "9.1.7",
    "jest": "29.7.0",
    "metro-react-native-babel-preset": "0.77.0",
    "nitro-codegen": "0.28.0",
    "react": "19.1.0",
    "react-native": "0.79.2",
    "react-native-builder-bob": "0.40.10",
    "react-native-nitro-modules": "0.28.0",
    "react-native-reanimated": "3.17.5",
    "react-native-web": "0.20.0",
    "react-test-renderer": "19.1.0",
    "release-it": "17.11.0",
    "typescript": "5.8.3"
  },
  "peerDependencies": {
    "@react-native/normalize-colors": "*",
    "react": "*",
    "react-native": ">=0.76.0",
    "react-native-edge-to-edge": "*",
    "react-native-nitro-modules": "*",
    "react-native-reanimated": "*"
  },
  "peerDependenciesMeta": {
    "react-native-reanimated": {
      "optional": true
    }
  },
  "workspaces": [
    "example",
    "docs",
    "expo-example"
  ],
  "packageManager": "yarn@3.6.1",
  "engines": {
    "node": ">= 18.0.0"
  },
  "jest": {
    "preset": "react-native",
    "modulePathIgnorePatterns": [
      "<rootDir>/docs/node_modules",
      "<rootDir>/lib/",
      "<rootDir>/cxx/tests"
    ],
    "testMatch": [
      "**/*.spec.(ts|tsx|js)"
    ],
    "coverageReporters": [
      "html"
    ]
  },
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  },
  "release-it": {
    "git": {
      "commitMessage": "chore: release ${version}",
      "tagName": "v${version}"
    },
    "npm": {
      "publish": true
    },
    "github": {
      "release": true
    },
    "plugins": {
      "@release-it/conventional-changelog": {
        "preset": "angular"
      }
    }
  },
  "react-native-builder-bob": {
    "source": "src",
    "output": "lib",
    "targets": [
      "commonjs",
      "module",
      [
        "typescript",
        {
          "project": "tsconfig.build.json"
        }
      ]
    ]
  },
  "codegenConfig": {
    "name": "TurboUnistyles",
    "type": "modules",
    "jsSrcsDir": "./src/specs/TurboUnistyles"
  }
}



================================================
FILE: tsconfig.build.json
================================================

{
  "extends": "./tsconfig",
  "compilerOptions": {
    "noEmit": false
  },
  "exclude": ["example", "expo-example", "plugin", "docs"]
}



================================================
FILE: tsconfig.json
================================================
{
  "compilerOptions": {
    "rootDir": ".",
    "paths": {
      "react-native-unistyles": ["./src/index"]
    },
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react",
    "lib": [
      "esnext",
      "dom"
    ],
    "module": "esnext",
    "moduleResolution": "Bundler",
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noImplicitUseStrict": false,
    "noStrictGenericChecks": false,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "target": "esnext",
    "verbatimModuleSyntax": true
  },
  "exclude": [
    "example",
    "expo-example",
    "docs",
    "lib"
  ]
}



================================================
FILE: Unistyles.podspec
================================================
require "json"
require_relative './unistyles_get_rn_version.rb'

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "Unistyles"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => package["repository"], :tag => "#{s.version}" }

  s.source_files = [
    "ios/**/*.{swift,h,mm}",
    "cxx/**/*.{h,cpp,hpp}"
  ]
  s.pod_target_xcconfig = {
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++20",
    "GCC_PREPROCESSOR_DEFINITIONS" => "$(inherited) FOLLY_NO_CONFIG FOLLY_CFG_NO_COROUTINES FOLLY_MOBILE"
  }

  s.public_header_files = [
    "ios/Unistyles.h"
  ]

  if ENV["USE_FRAMEWORKS"]
    RN_VERSION = unistyles_get_rn_version(ENV['REACT_NATIVE_PATH']) || 999

    s.dependency "React-Core"
    add_dependency(s, "React-jsinspector", :framework_name => "jsinspector_modern")

    if RN_VERSION >= 79
      add_dependency(s, "React-jsinspectortracing", :framework_name => 'jsinspector_moderntracing')
    end

    if RN_VERSION >= 80
      add_dependency(s, "React-jsinspectorcdp", :framework_name => 'jsinspector_moderncdp')
    end

    add_dependency(s, "React-rendererconsistency", :framework_name => "React_rendererconsistency")
  end

  load "nitrogen/generated/ios/Unistyles+autolinking.rb"
  add_nitrogen_files(s)

  install_modules_dependencies(s)
end



================================================
FILE: unistyles_get_rn_version.rb
================================================
require 'json'

def unistyles_get_rn_version(rn_path)
    rn_path = rn_path || '../node_modules/react-native'

    maybe_rn_pkg_json = File.expand_path(File.join(rn_path, 'package.json'))
    maybe_local_rn_pkg_json = File.expand_path('./node_modules/react-native/package.json')
    maybe_react_native_pkg_json = File.expand_path('../react-native/package.json')

    rn_pkg_json =
        if File.exist?(maybe_rn_pkg_json)
            maybe_rn_pkg_json
        elsif File.exist?(maybe_local_rn_pkg_json)
            maybe_local_rn_pkg_json
        elsif File.exist?(maybe_react_native_pkg_json)
            maybe_react_native_pkg_json
        else
            nil
        end

    unless rn_pkg_json
        warn "🦄 Unistyles: React Native not found. Frameworks :static will use all dependencies which might fail for older versions of React Native."
        return nil
    end

    rn_pkg = JSON.parse(File.read(rn_pkg_json))
    rn_version = rn_pkg['version']
    parsed_version = Gem::Version.new(rn_version).segments[1]

    parsed_version
end



================================================
FILE: .editorconfig
================================================
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 4
indent_style = space
insert_final_newline = true
max_line_length = 120
trim_trailing_whitespace = true

[*.{sh,json,podspec,yml,yaml}]
indent_style = space
indent_size = 2



================================================
FILE: .nvmrc
================================================
v20



================================================
FILE: .yarnrc.yml
================================================
nmHoistingLimits: workspaces

nodeLinker: node-modules

plugins:
  - path: .yarn/plugins/@yarnpkg/plugin-interactive-tools.cjs
    spec: "@yarnpkg/plugin-interactive-tools"
  - path: .yarn/plugins/@yarnpkg/plugin-workspace-tools.cjs
    spec: "@yarnpkg/plugin-workspace-tools"

yarnPath: .yarn/releases/yarn-3.6.1.cjs



================================================
FILE: android/CMakeLists.txt
================================================
cmake_minimum_required(VERSION 3.9.0)

project(unistyles)

file(GLOB_RECURSE CORE_SRC RELATIVE ${CMAKE_SOURCE_DIR} "../cxx/**/*.cpp")
file(GLOB_RECURSE PLATFORM_SRC RELATIVE ${CMAKE_SOURCE_DIR} "./src/main/cxx/*.cpp")

if(ReactAndroid_VERSION_MINOR GREATER_EQUAL 80)
    target_compile_reactnative_options(unistyles PRIVATE)
endif()

add_library(unistyles
    SHARED
    ${CORE_SRC}
    ${PLATFORM_SRC}
)

include("${CMAKE_SOURCE_DIR}/../nitrogen/generated/android/unistyles+autolinking.cmake")

include_directories(
    ./src/main/cxx
    ../cxx
    ../cxx/common
    ../cxx/core
    ../cxx/hybridObjects
    ../cxx/parser
    ../cxx/shadowTree
)

# Nitro appends all Folly Flags, leaving it empty
string(APPEND CMAKE_CXX_FLAGS " ")

set_target_properties(unistyles PROPERTIES
    CXX_STANDARD 20
    CXX_STANDARD_REQUIRED ON
    CXX_EXTENSIONS OFF
    POSITION_INDEPENDENT_CODE ON
)

# For React Native 0.76 and above, we don't need to link anything
# as NitroModules will automatically add ReactAndroid::reactnative prefab
if (ReactAndroid_VERSION_MINOR LESS 78)
    message(FATAL_ERROR "Unistyles 3.0 requires min. React Native version to be 0.78")
endif ()



================================================
FILE: android/src/main/cxx/cpp-adapter.cpp
================================================
#include <fbjni/fbjni.h>
#include "unistylesOnLoad.hpp"
#include "NativeUnistylesModule.h"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *) {
    return facebook::jni::initialize(vm, [=] {
        margelo::nitro::unistyles::UnistylesModule::registerNatives();
        margelo::nitro::unistyles::initialize(vm);
    });
}



================================================
FILE: android/src/main/cxx/NativeUnistylesModule.cpp
================================================
#include "NativeUnistylesModule.h"
#import <NitroModules/HybridObjectRegistry.hpp>
#import "HybridUnistylesRuntime.h"
#import "HybridStyleSheet.h"
#import "HybridShadowRegistry.h"

using namespace margelo::nitro::unistyles;
using namespace facebook::react;

UnistylesModule::UnistylesModule(
    jni::alias_ref<UnistylesModule::jhybridobject> jThis,
    jni::alias_ref<react::JRuntimeExecutor::javaobject> runtimeExecutorHolder,
    jni::alias_ref<JHybridNativePlatformSpec::javaobject> nativePlatform
):  _runtimeExecutor(runtimeExecutorHolder->cthis()->get()),
    _nativePlatform(nativePlatform->cthis()) {}

jni::local_ref<UnistylesModule::jhybriddata> UnistylesModule::initHybrid(
    jni::alias_ref<UnistylesModule::jhybridobject> jThis,
    jni::alias_ref<JRuntimeExecutor::javaobject> runtimeExecutorHolder,
    jni::alias_ref<JHybridNativePlatformSpec::javaobject> nativePlatform
) {
    return makeCxxInstance(jThis, runtimeExecutorHolder, nativePlatform);
}

void UnistylesModule::registerNatives() {
    javaClassStatic()->registerNatives({
        makeNativeMethod("getBindingsInstaller", UnistylesModule::getBindingsInstaller),
        makeNativeMethod("initHybrid", UnistylesModule::initHybrid),
        makeNativeMethod("invalidateNative", invalidateNative),
    });
}

jni::local_ref<BindingsInstallerHolder::javaobject> UnistylesModule::getBindingsInstaller(jni::alias_ref<UnistylesModule::javaobject> jobj) {
    auto& runtimeExecutor = jobj->cthis()->_runtimeExecutor;
    auto& nativePlatform = jobj->cthis()->_nativePlatform;

    return BindingsInstallerHolder::newObjectCxxArgs([&runtimeExecutor, &nativePlatform](jsi::Runtime& rt) {
        // function is called on: first init and every live reload
        // check if this is live reload, if so let's replace UnistylesRuntime with new runtime
        auto hasUnistylesRuntime = HybridObjectRegistry::hasHybridObject("UnistylesRuntime");

        if (hasUnistylesRuntime) {
            HybridObjectRegistry::unregisterHybridObjectConstructor("UnistylesRuntime");
            HybridObjectRegistry::unregisterHybridObjectConstructor("UnistylesStyleSheet");
            HybridObjectRegistry::unregisterHybridObjectConstructor("UnistylesShadowRegistry");
        }

        auto runOnJSThread = [&runtimeExecutor](std::function<void(jsi::Runtime&)>&& callback) {
            runtimeExecutor([callback = std::move(callback)](jsi::Runtime &rt) {
                callback(rt);
            });
        };

        // init hybrids
        auto unistylesRuntime = std::make_shared<HybridUnistylesRuntime>(nativePlatform, rt, runOnJSThread);
        auto styleSheet = std::make_shared<HybridStyleSheet>(unistylesRuntime);

        HybridObjectRegistry::registerHybridObjectConstructor("UnistylesRuntime", [unistylesRuntime]() -> std::shared_ptr<HybridObject>{
            return unistylesRuntime;
        });
        HybridObjectRegistry::registerHybridObjectConstructor("UnistylesStyleSheet", [styleSheet]() -> std::shared_ptr<HybridObject>{
            return styleSheet;
        });
        HybridObjectRegistry::registerHybridObjectConstructor("UnistylesShadowRegistry", [unistylesRuntime]() -> std::shared_ptr<HybridObject>{
            return std::make_shared<HybridShadowRegistry>(unistylesRuntime);
        });
    });
}



================================================
FILE: android/src/main/cxx/NativeUnistylesModule.h
================================================
#pragma once

#include <ReactCommon/BindingsInstallerHolder.h>
#include <react/jni/JRuntimeExecutor.h>
#include <react/renderer/scheduler/Scheduler.h>
#include "UnistylesRegistry.h"
#include <fbjni/fbjni.h>
#include <react/fabric/Binding.h>
#include "NativePlatform.h"

namespace margelo::nitro::unistyles {

using namespace facebook;
using namespace facebook::react;

struct UnistylesModule : public jni::HybridClass<UnistylesModule> {
    static constexpr auto kJavaDescriptor = "Lcom/unistyles/UnistylesModule;";

    explicit UnistylesModule(
        jni::alias_ref<jhybridobject> jThis,
        jni::alias_ref<react::JRuntimeExecutor::javaobject> runtimeExecutorHolder,
        jni::alias_ref<JHybridNativePlatformSpec::javaobject> nativePlatform
    );

    static void registerNatives();
    static jni::local_ref<jhybriddata> initHybrid(
        jni::alias_ref<jhybridobject> jThis,
        jni::alias_ref<JRuntimeExecutor::javaobject> runtimeExecutorHolder,
        jni::alias_ref<JHybridNativePlatformSpec::javaobject> nativePlatform
    );
    static void invalidateNative(jni::alias_ref<jhybridobject> jThis) {
        core::UnistylesRegistry::get().destroy();
    }

    static jni::local_ref<BindingsInstallerHolder::javaobject> getBindingsInstaller(jni::alias_ref<UnistylesModule::javaobject> jThis);

private:
    RuntimeExecutor _runtimeExecutor;
    std::shared_ptr<HybridNativePlatformSpec> _nativePlatform;
};

}



================================================
FILE: android/src/main/java/com/unistyles/Equatable.kt
================================================
package com.unistyles

import com.margelo.nitro.unistyles.Dimensions
import com.margelo.nitro.unistyles.Insets
import com.margelo.nitro.unistyles.UnistyleDependency
import com.margelo.nitro.unistyles.UnistylesNativeMiniRuntime

fun Dimensions.isEqualTo(other: Dimensions): Boolean {
    return this.width == other.width && this.height == other.height
}

fun Insets.isEqualTo(other: Insets): Boolean {
    return this.top == other.top && this.bottom == other.bottom &&
        this.left == other.left && this.right == other.right &&
        this.ime == other.ime
}

fun NativePlatformAndroid.diffMiniRuntimes(lhs: UnistylesNativeMiniRuntime, rhs: UnistylesNativeMiniRuntime): Array<UnistyleDependency> {
    val dependencies: MutableList<UnistyleDependency> = mutableListOf()

    if (lhs.colorScheme != rhs.colorScheme) {
        dependencies.add(UnistyleDependency.COLORSCHEME)
    }

    if (!lhs.screen.isEqualTo(rhs.screen)) {
        dependencies.add(UnistyleDependency.DIMENSIONS)
    }

    if (lhs.screen.width != rhs.screen.width) {
        dependencies.add(UnistyleDependency.BREAKPOINTS)
    }

    // no need to check isLandscape, as it's always opposite
    if (lhs.isPortrait != rhs.isPortrait) {
        dependencies.add(UnistyleDependency.ORIENTATION)
    }

    if (lhs.contentSizeCategory != rhs.contentSizeCategory) {
        dependencies.add(UnistyleDependency.CONTENTSIZECATEGORY)
    }

    if (!lhs.insets.isEqualTo(rhs.insets)) {
        dependencies.add(UnistyleDependency.INSETS)
    }

    if (lhs.fontScale != rhs.fontScale) {
        dependencies.add(UnistyleDependency.FONTSCALE)
    }

    if (!lhs.statusBar.isEqualTo(rhs.statusBar)) {
        dependencies.add(UnistyleDependency.STATUSBAR)
    }

    if (!lhs.navigationBar.isEqualTo(rhs.navigationBar)) {
        dependencies.add(UnistyleDependency.NAVIGATIONBAR)
    }

    // rtl and pixel ratio are not dynamic

    return dependencies.toTypedArray()
}



================================================
FILE: android/src/main/java/com/unistyles/NativePlatform+android.kt
================================================
package com.unistyles

import android.content.Context
import android.content.res.Configuration
import android.os.Build
import android.util.DisplayMetrics
import android.view.View
import android.view.WindowManager
import androidx.annotation.Keep
import androidx.core.text.TextUtilsCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import com.facebook.proguard.annotations.DoNotStrip
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.margelo.nitro.unistyles.ColorScheme
import com.margelo.nitro.unistyles.Dimensions
import com.margelo.nitro.unistyles.HybridNativePlatformSpec
import com.margelo.nitro.unistyles.Insets
import com.margelo.nitro.unistyles.Orientation
import com.margelo.nitro.unistyles.UnistyleDependency
import com.margelo.nitro.unistyles.UnistylesNativeMiniRuntime
import java.util.Locale

@Keep
@DoNotStrip
class NativePlatformAndroid(private val reactContext: ReactApplicationContext): HybridNativePlatformSpec(), LifecycleEventListener {
    private val _insets = NativePlatformInsets(reactContext, this::getMiniRuntime) { this.onConfigChange() }
    private var _miniRuntime: UnistylesNativeMiniRuntime = buildMiniRuntime()
    private val _listener = NativePlatformListener(reactContext, this::getMiniRuntime) { this.diffMiniRuntime() }

    init {
        checkEdgeToEdge()
        reactContext.addLifecycleEventListener(this)
    }

    fun onDestroy() {
        reactContext.removeLifecycleEventListener(this)
    }

    override fun onHostResume() {
        _insets.getInitialInsets(false)
        _insets.startInsetsListener()
    }

    override fun onHostPause() {
        _insets.stopInsetsListener()
    }

    override fun onHostDestroy() {}

    override val memorySize: Long
        get() = 0

    override fun getInsets(): Insets {
        return _insets.getInsets()
    }

    override fun getColorScheme(): ColorScheme {
        val uiMode = reactContext.resources.configuration.uiMode

        val colorScheme = when (uiMode.and(Configuration.UI_MODE_NIGHT_MASK)) {
            Configuration.UI_MODE_NIGHT_YES -> ColorScheme.DARK
            Configuration.UI_MODE_NIGHT_NO -> ColorScheme.LIGHT
            else -> ColorScheme.UNSPECIFIED
        }

        return colorScheme
    }

    override fun getFontScale(): Double {
        return reactContext.resources.configuration.fontScale.toDouble()
    }

    override fun getPixelRatio(): Double {
        return reactContext.resources.displayMetrics.density.toDouble()
    }

    override fun getOrientation(): Orientation {
        val orientation = when (reactContext.resources.configuration.orientation) {
            Configuration.ORIENTATION_PORTRAIT -> Orientation.PORTRAIT
            Configuration.ORIENTATION_LANDSCAPE -> Orientation.LANDSCAPE
            else -> Orientation.PORTRAIT
        }

        return orientation
    }

    override fun getContentSizeCategory(): String {
        val fontScale = getFontScale()

        val contentSizeCategory = when {
            fontScale <= 0.85f -> "Small"
            fontScale <= 1.0f -> "Default"
            fontScale <= 1.15f -> "Large"
            fontScale <= 1.3f -> "ExtraLarge"
            fontScale <= 1.5f -> "Huge"
            fontScale <= 1.8 -> "ExtraHuge"
            else -> "ExtraExtraHuge"
        }

        return contentSizeCategory
    }

    override fun getScreenDimensions(): Dimensions {
        // function takes in count edge-to-edge layout
        when {
            Build.VERSION.SDK_INT < Build.VERSION_CODES.R -> {
                val windowManager = reactContext.getSystemService(Context.WINDOW_SERVICE) as WindowManager
                val metrics = DisplayMetrics()

                @Suppress("DEPRECATION")
                windowManager.defaultDisplay.getRealMetrics(metrics)

                val screenWidth = (metrics.widthPixels / metrics.density).toDouble()
                val screenHeight = (metrics.heightPixels / metrics.density).toDouble()

                return Dimensions(screenWidth, screenHeight)
            }
            else -> {
                val displayMetrics = reactContext.resources.displayMetrics

                reactContext.currentActivity?.windowManager?.currentWindowMetrics?.bounds?.let {
                    val boundsWidth = (it.width() / displayMetrics.density).toDouble()
                    val boundsHeight = (it.height() / displayMetrics.density).toDouble()

                    return Dimensions(boundsWidth, boundsHeight)
                } ?: run {
                    val screenWidth = (displayMetrics.widthPixels / displayMetrics.density).toDouble()
                    val screenHeight = (displayMetrics.heightPixels / displayMetrics.density).toDouble()

                    return Dimensions(screenWidth, screenHeight)
                }
            }
        }
    }

    override fun getStatusBarDimensions(): Dimensions {
        val screenWidth = getScreenDimensions().width

        return Dimensions(screenWidth, _insets.getInsets().top)
    }

    override fun getNavigationBarDimensions(): Dimensions {
        val screenWidth = getScreenDimensions().width

        return Dimensions(screenWidth, _insets.getInsets().bottom)
    }

    override fun getPrefersRtlDirection(): Boolean {
        // forced by React Native
        val sharedPrefs = reactContext.getSharedPreferences(
            "com.facebook.react.modules.i18nmanager.I18nUtil",
            Context.MODE_PRIVATE
        )
        val hasForcedRtl = sharedPrefs.getBoolean("RCTI18nUtil_forceRTL", false)
        // user preferences
        val isRtl = TextUtilsCompat.getLayoutDirectionFromLocale(Locale.getDefault()) == ViewCompat.LAYOUT_DIRECTION_RTL

        return hasForcedRtl || isRtl
    }

    override fun setRootViewBackgroundColor(color: Double) {
        reactContext.currentActivity?.let { activity ->
            activity.window?.decorView?.let { decorView ->
                activity.runOnUiThread {
                    decorView.rootView.setBackgroundColor(color.toInt())
                }
            }
        }
    }

    override fun setNavigationBarHidden(isHidden: Boolean) {
        reactContext.currentActivity?.let { activity ->
            WindowInsetsControllerCompat(activity.window, activity.window.decorView).apply {
                activity.window?.decorView?.let { decorView ->
                    @Suppress("DEPRECATION")
                    activity.runOnUiThread {
                        if (isHidden) {
                            // below Android 11, we need to use window flags to hide the navigation bar
                            if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.Q) {
                                decorView.systemUiVisibility = (View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                                    or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY)
                            } else {
                                hide(WindowInsetsCompat.Type.navigationBars())
                                systemBarsBehavior =
                                    WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
                            }

                            // dispatch new insets to invoke the insets listener
                            val newInsets = WindowInsetsCompat.Builder()
                                .setInsets(WindowInsetsCompat.Type.navigationBars(), androidx.core.graphics.Insets.of(0, 0, 0, 0))
                                .build()

                            ViewCompat.dispatchApplyWindowInsets(activity.findViewById(android.R.id.content), newInsets)
                        } else {
                            show(WindowInsetsCompat.Type.navigationBars())
                        }
                    }
                }
            }
        }
    }

    override fun setStatusBarHidden(isHidden: Boolean) {
        reactContext.currentActivity?.let { activity ->
            WindowInsetsControllerCompat(activity.window, activity.window.decorView).apply {
                activity.window?.let { window ->
                    @Suppress("DEPRECATION")
                    activity.runOnUiThread {
                        if (isHidden) {
                            if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.Q) {
                                window.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
                                window.clearFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN)
                            } else {
                                hide(WindowInsetsCompat.Type.statusBars())
                            }
                        } else {
                            show(WindowInsetsCompat.Type.statusBars())
                        }
                    }
                }
            }
        }
    }

    override fun setImmersiveMode(isEnabled: Boolean) {
        this.setStatusBarHidden(isEnabled)
        this.setNavigationBarHidden(isEnabled)
    }

    override fun getMiniRuntime(): UnistylesNativeMiniRuntime {
        return _miniRuntime
    }

    private fun buildMiniRuntime(): UnistylesNativeMiniRuntime {
        val orientation = this.getOrientation()

        return UnistylesNativeMiniRuntime(
            colorScheme = this.getColorScheme(),
            screen = this.getScreenDimensions(),
            contentSizeCategory = this.getContentSizeCategory(),
            insets = this.getInsets(),
            pixelRatio = this.getPixelRatio(),
            fontScale = this.getFontScale(),
            rtl = this.getPrefersRtlDirection(),
            statusBar = this.getStatusBarDimensions(),
            navigationBar = this.getNavigationBarDimensions(),
            isPortrait = orientation == Orientation.PORTRAIT,
            isLandscape = orientation == Orientation.LANDSCAPE
        )
    }

    private fun diffMiniRuntime(): Array<UnistyleDependency> {
        val newMiniRuntime = this.buildMiniRuntime()
        val changedDependencies = diffMiniRuntimes(this._miniRuntime, newMiniRuntime)

        if (changedDependencies.isNotEmpty()) {
            this._miniRuntime = newMiniRuntime
        }

        return changedDependencies
    }

    private fun onConfigChange() {
        this._listener.onConfigChange()
    }

    override fun registerPlatformListener(callback: (dependencies: Array<UnistyleDependency>, miniRuntime: UnistylesNativeMiniRuntime) -> Unit) {
        this._listener.addPlatformListener(callback)
    }

    override fun registerImeListener(callback: (miniRuntime: UnistylesNativeMiniRuntime) -> Unit) {
        this._insets.addImeListener(callback)
    }

    override fun unregisterPlatformListeners() {
        this._listener.removePlatformListeners()
        this._insets.removeImeListeners()
    }

    private fun checkEdgeToEdge() {
        // react-native-edge-to-edge will set setDecorFitsSystemWindows automatically
        // if it's present we assume that edge-to-edge is enabled

        try {
            Class.forName("com.zoontek.rnedgetoedge.EdgeToEdgePackage")
        } catch (exception: ClassNotFoundException) {
            enableEdgeToEdge()
        }
    }

    private fun enableEdgeToEdge() {
        reactContext.currentActivity?.let { activity ->
            activity.runOnUiThread {
                WindowCompat.setDecorFitsSystemWindows(activity.window, false)
            }
        }
    }
}



================================================
FILE: android/src/main/java/com/unistyles/NativePlatform+insets.kt
================================================
package com.unistyles

import android.graphics.Rect
import android.os.Build
import android.view.View
import android.view.Window
import android.view.WindowManager
import androidx.annotation.Keep
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsAnimationCompat
import androidx.core.view.WindowInsetsCompat
import com.facebook.proguard.annotations.DoNotStrip
import com.facebook.react.bridge.ReactApplicationContext
import com.margelo.nitro.unistyles.Insets
import com.margelo.nitro.unistyles.UnistylesNativeMiniRuntime

typealias CxxImeListener = (miniRuntime: UnistylesNativeMiniRuntime) -> Unit

@Keep
@DoNotStrip
class NativePlatformInsets(
    private val reactContext: ReactApplicationContext,
    private val getMiniRuntime: () -> UnistylesNativeMiniRuntime,
    private val onConfigChange: () -> Unit
) {
    private var _didGetInsets = false
    private var _shouldListenToImeEvents = false
    private val _imeListeners: MutableList<CxxImeListener> = mutableListOf()
    private var _insets: Insets = Insets(0.0, 0.0, 0.0, 0.0, 0.0)

    init {
        // for SDK below 35, it's possible to get it synchronously
        this.getInitialInsets(true)
    }

    fun onDestroy() {
        this.removeImeListeners()
    }

    fun getInsets(): Insets {
        val density = reactContext.resources.displayMetrics.density

        return Insets(
            this._insets.top / density,
            this._insets.bottom / density,
            this._insets.left / density,
            this._insets.right / density,
            this._insets.ime / density
        )
    }

    fun getInitialInsets(skipUpdate: Boolean = false) {
        if (_didGetInsets) {
            return
        }

        reactContext.currentActivity?.let { activity ->
            activity.findViewById<View>(android.R.id.content)?.let { mainView ->
                val insets = ViewCompat.getRootWindowInsets(mainView)

                insets?.let { windowInsets ->
                    setInsets(windowInsets, activity.window, null, skipUpdate)
                    _didGetInsets = true
                }
            }
        }
    }

    fun setInsets(insetsCompat: WindowInsetsCompat, window: Window, animatedBottomInsets: Double?, skipUpdate: Boolean = false) {
        // below Android 11, we need to use window flags to detect status bar visibility
        val isStatusBarVisible = when(Build.VERSION.SDK_INT) {
            in 30..Int.MAX_VALUE -> {
                insetsCompat.isVisible(WindowInsetsCompat.Type.statusBars())
            }
            else -> {
                @Suppress("DEPRECATION")
                window.attributes.flags and WindowManager.LayoutParams.FLAG_FULLSCREEN != WindowManager.LayoutParams.FLAG_FULLSCREEN
            }
        }
        // React Native is forcing insets to make status bar translucent
        // so we need to calculate top inset manually, as WindowInsetCompat will always return 0
        val statusBarTopInset = when(isStatusBarVisible) {
            true -> {
                val visibleRect = Rect()

                window.decorView.getWindowVisibleDisplayFrame(visibleRect)

                visibleRect.top
            }
            false -> 0
        }

        val insets = insetsCompat.getInsets(WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout())

        // Android 10 and below - set bottom insets to 0 while keyboard is visible and use default bottom insets otherwise
        // Android 11 and above - animate bottom insets while keyboard is appearing and disappearing
        val imeInsets = when {
            animatedBottomInsets != null && Build.VERSION.SDK_INT >= 30 -> animatedBottomInsets
            Build.VERSION.SDK_INT < 30 -> {
                val nextBottomInset = insetsCompat.getInsets(WindowInsetsCompat.Type.ime()).bottom - insets.bottom
                maxOf(nextBottomInset, 0).toDouble()
            }
            else -> 0.0
        }

        val shouldEmitImeEvent = Build.VERSION.SDK_INT < 30 && imeInsets != this._insets.ime || animatedBottomInsets != null && Build.VERSION.SDK_INT >= 30

        this._insets = Insets(
            statusBarTopInset.toDouble(),
            insets.bottom.toDouble(),
            insets.left.toDouble(),
            insets.right.toDouble(),
            imeInsets
        )

        if (skipUpdate) {
            return
        }

        this@NativePlatformInsets.onConfigChange()

        if (shouldEmitImeEvent) {
            this@NativePlatformInsets.emitImeEvent(this.getMiniRuntime())
        }
    }

    fun startInsetsListener() {
        _shouldListenToImeEvents = true

        reactContext.currentActivity?.let { activity ->
            activity.findViewById<View>(android.R.id.content)?.let { mainView ->
                ViewCompat.setOnApplyWindowInsetsListener(mainView) { _, insets ->
                    setInsets(insets, activity.window, null)

                    insets
                }

                // IME insets are available from Android 11
                if (Build.VERSION.SDK_INT >= 30) {
                    ViewCompat.setWindowInsetsAnimationCallback(
                        mainView,
                        object : WindowInsetsAnimationCompat.Callback(DISPATCH_MODE_STOP) {
                            override fun onProgress(
                                insets: WindowInsetsCompat,
                                runningAnimations: List<WindowInsetsAnimationCompat>
                            ): WindowInsetsCompat {
                                if (!_shouldListenToImeEvents) {
                                    return insets
                                }

                                runningAnimations.firstOrNull()?.let {
                                    val bottomInset = insets.getInsets(WindowInsetsCompat.Type.ime()).bottom.toDouble() - this@NativePlatformInsets._insets.bottom
                                    val nextBottomInset = if (bottomInset < 0) {
                                        0.0
                                    } else {
                                        bottomInset
                                    }

                                    this@NativePlatformInsets.setInsets(insets, activity.window, nextBottomInset)
                                }

                                return insets
                            }
                        }
                    )
                }
            }
        }
    }

    fun emitImeEvent(miniRuntime: UnistylesNativeMiniRuntime) {
        _imeListeners.forEach { listener ->
            listener(miniRuntime)
        }
    }

    fun stopInsetsListener() {
        reactContext.currentActivity?.let { activity ->
            activity.findViewById<View>(android.R.id.content)?.let { view ->
                ViewCompat.setOnApplyWindowInsetsListener(view, null)
            }
        }

        _shouldListenToImeEvents = false
    }

    fun addImeListener(listener: CxxImeListener) {
        this._imeListeners.add(listener)
    }

    fun removeImeListeners() {
        this._imeListeners.clear()
    }
}



================================================
FILE: android/src/main/java/com/unistyles/NativePlatform+listener.kt
================================================
package com.unistyles

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Handler
import android.os.Looper
import androidx.annotation.Keep
import com.facebook.proguard.annotations.DoNotStrip
import com.facebook.react.bridge.ReactApplicationContext
import com.margelo.nitro.unistyles.UnistyleDependency
import com.margelo.nitro.unistyles.UnistylesNativeMiniRuntime

typealias CxxDependencyListener = (dependencies: Array<UnistyleDependency>, miniRuntime: UnistylesNativeMiniRuntime) -> Unit

@Keep
@DoNotStrip
class NativePlatformListener(
    private val reactContext: ReactApplicationContext,
    private val getMiniRuntime: () -> UnistylesNativeMiniRuntime,
    private val diffMiniRuntime: () -> Array<UnistyleDependency>
) {
    private val _dependencyListeners: MutableList<CxxDependencyListener> = mutableListOf()

    private val configurationChangeReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            Handler(Looper.getMainLooper()).postDelayed({
                this@NativePlatformListener.onConfigChange()
            }, 25)
        }
    }

    init {
        reactContext.registerReceiver(configurationChangeReceiver, IntentFilter(Intent.ACTION_CONFIGURATION_CHANGED))
    }

    fun onDestroy() {
        this.removePlatformListeners()
        reactContext.unregisterReceiver(configurationChangeReceiver)
    }

    fun addPlatformListener(listener: CxxDependencyListener) {
        this._dependencyListeners.add(listener)
    }

    fun removePlatformListeners() {
        this._dependencyListeners.clear()
    }

    private fun emitCxxEvent(dependencies: Array<UnistyleDependency>, miniRuntime: UnistylesNativeMiniRuntime) {
        this._dependencyListeners.forEach { listener ->
            listener(dependencies, miniRuntime)
        }
    }

    fun onConfigChange() {
        val changedDependencies = diffMiniRuntime()

        if (changedDependencies.isNotEmpty()) {
            emitCxxEvent(changedDependencies, getMiniRuntime())
        }
    }
}



================================================
FILE: android/src/main/java/com/unistyles/UnistylesModule.kt
================================================
package com.unistyles

import com.facebook.fbreact.specs.NativeTurboUnistylesSpec
import com.facebook.jni.HybridData
import com.facebook.proguard.annotations.DoNotStrip
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.RuntimeExecutor
import com.facebook.react.turbomodule.core.interfaces.BindingsInstallerHolder
import com.facebook.react.turbomodule.core.interfaces.TurboModuleWithJSIBindings
import com.margelo.nitro.unistyles.HybridNativePlatformSpec
import com.margelo.nitro.unistyles.unistylesOnLoad.Companion.initializeNative

@Suppress("KotlinJniMissingFunction")
class UnistylesModule(reactContext: ReactApplicationContext): NativeTurboUnistylesSpec(reactContext), TurboModuleWithJSIBindings {
    @DoNotStrip
    private var mHybridData: HybridData?
    private val _nativePlatform = NativePlatformAndroid(reactContext)

    companion object {
        const val NAME = NativeTurboUnistylesSpec.NAME

        init {
            initializeNative()
        }
    }

    override fun invalidate() {
        invalidateNative()
    }

    init {
        mHybridData = initializeHybridData(reactContext)
    }

    private fun initializeHybridData(reactContext: ReactApplicationContext): HybridData {
        val runtimeExecutor = reactContext.catalystInstance?.runtimeExecutor
            ?: throw IllegalStateException("Unistyles: React Native runtime executor is not available. Please follow installation guides.")

        return initHybrid(runtimeExecutor, _nativePlatform)
    }

    @DoNotStrip
    external override fun getBindingsInstaller(): BindingsInstallerHolder

    @DoNotStrip
    private external fun initHybrid(
        runtimeExecutor: RuntimeExecutor,
        nativePlatform: HybridNativePlatformSpec
    ): HybridData

    @DoNotStrip
    private external fun invalidateNative()
}



================================================
FILE: android/src/main/java/com/unistyles/UnistylesPackage.kt
================================================
package com.unistyles

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class UnistylesPackage: BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return if (name == UnistylesModule.NAME) {
            UnistylesModule(reactContext)
        } else {
            null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            mapOf(UnistylesModule.NAME to ReactModuleInfo(
                UnistylesModule.NAME,
                UnistylesModule.NAME,
                true,
                true,
                true,
                true
            ))
        }
    }
}



================================================
FILE: components/native/ActivityIndicator/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/ActivityIndicator.js",
  "module": "../../../lib/module/components/native/ActivityIndicator.js",
  "browser": "../../../lib/module/components/native/ActivityIndicator.js",
  "react-native": "../../../src/components/native/ActivityIndicator.tsx"
}



================================================
FILE: components/native/Animated/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/Animated.js",
  "module": "../../../lib/module/components/native/Animated.js",
  "browser": "../../../lib/module/components/native/Animated.js",
  "react-native": "../../../src/components/native/Animated.tsx"
}



================================================
FILE: components/native/FlatList/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/FlatList.js",
  "module": "../../../lib/module/components/native/FlatList.js",
  "browser": "../../../lib/module/components/native/FlatList.js",
  "react-native": "../../../src/components/native/FlatList.tsx"
}



================================================
FILE: components/native/Image/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/Image.js",
  "module": "../../../lib/module/components/native/Image.js",
  "browser": "../../../lib/module/components/native/Image.js",
  "react-native": "../../../src/components/native/Image.native.tsx"
}



================================================
FILE: components/native/ImageBackground/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/ImageBackground.js",
  "module": "../../../lib/module/components/native/ImageBackground.js",
  "browser": "../../../lib/module/components/native/ImageBackground.js",
  "react-native": "../../../src/components/native/ImageBackground.native.tsx"
}



================================================
FILE: components/native/KeyboardAvoidingView/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/KeyboardAvoidingView.js",
  "module": "../../../lib/module/components/native/KeyboardAvoidingView.js",
  "browser": "../../../lib/module/components/native/KeyboardAvoidingView.js",
  "react-native": "../../../src/components/native/KeyboardAvoidingView.tsx"
}



================================================
FILE: components/native/NativeText/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/NativeText.js",
  "module": "../../../lib/module/components/native/NativeText.js",
  "browser": "../../../lib/module/components/native/NativeText.js",
  "react-native": "../../../src/components/native/NativeText.native.tsx"
}



================================================
FILE: components/native/NativeView/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/NativeView.js",
  "module": "../../../lib/module/components/native/NativeView.js",
  "browser": "../../../lib/module/components/native/NativeView.js",
  "react-native": "../../../src/components/native/NativeView.native.tsx"
}



================================================
FILE: components/native/Pressable/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/Pressable.js",
  "module": "../../../lib/module/components/native/Pressable.js",
  "browser": "../../../lib/module/components/native/Pressable.js",
  "react-native": "../../../src/components/native/Pressable.native.tsx"
}



================================================
FILE: components/native/RefreshControl/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/RefreshControl.js",
  "module": "../../../lib/module/components/native/RefreshControl.js",
  "browser": "../../../lib/module/components/native/RefreshControl.js",
  "react-native": "../../../src/components/native/RefreshControl.tsx"
}



================================================
FILE: components/native/SafeAreaView/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/SafeAreaView.js",
  "module": "../../../lib/module/components/native/SafeAreaView.js",
  "browser": "../../../lib/module/components/native/SafeAreaView.js",
  "react-native": "../../../src/components/native/SafeAreaView.tsx"
}



================================================
FILE: components/native/ScrollView/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/ScrollView.js",
  "module": "../../../lib/module/components/native/ScrollView.js",
  "browser": "../../../lib/module/components/native/ScrollView.js",
  "react-native": "../../../src/components/native/ScrollView.tsx"
}



================================================
FILE: components/native/SectionList/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/SectionList.js",
  "module": "../../../lib/module/components/native/SectionList.js",
  "browser": "../../../lib/module/components/native/SectionList.js",
  "react-native": "../../../src/components/native/SectionList.tsx"
}



================================================
FILE: components/native/Switch/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/Switch.js",
  "module": "../../../lib/module/components/native/Switch.js",
  "browser": "../../../lib/module/components/native/Switch.js",
  "react-native": "../../../src/components/native/Switch.tsx"
}



================================================
FILE: components/native/Text/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/Text.js",
  "module": "../../../lib/module/components/native/Text.js",
  "browser": "../../../lib/module/components/native/Text.js",
  "react-native": "../../../src/components/native/Text.tsx"
}



================================================
FILE: components/native/TextInput/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/TextInput.js",
  "module": "../../../lib/module/components/native/TextInput.js",
  "browser": "../../../lib/module/components/native/TextInput.js",
  "react-native": "../../../src/components/native/TextInput.tsx"
}



================================================
FILE: components/native/TouchableHighlight/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/TouchableHighlight.js",
  "module": "../../../lib/module/components/native/TouchableHighlight.js",
  "browser": "../../../lib/module/components/native/TouchableHighlight.js",
  "react-native": "../../../src/components/native/TouchableHighlight.tsx"
}



================================================
FILE: components/native/TouchableOpacity/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/TouchableOpacity.js",
  "module": "../../../lib/module/components/native/TouchableOpacity.js",
  "browser": "../../../lib/module/components/native/TouchableOpacity.js",
  "react-native": "../../../src/components/native/TouchableOpacity.tsx"
}



================================================
FILE: components/native/View/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/View.js",
  "module": "../../../lib/module/components/native/View.js",
  "browser": "../../../lib/module/components/native/View.js",
  "react-native": "../../../src/components/native/View.tsx"
}



================================================
FILE: components/native/VirtualizedList/package.json
================================================
{
  "main": "../../../lib/commonjs/components/native/VirtualizedList.js",
  "module": "../../../lib/module/components/native/VirtualizedList.js",
  "browser": "../../../lib/module/components/native/VirtualizedList.js",
  "react-native": "../../../src/components/native/VirtualizedList.tsx"
}



================================================
FILE: cxx/NativePlatform.h
================================================
#if __has_include("Unistyles-Swift-Cxx-Umbrella.hpp")
    #include "Unistyles-Swift-Cxx-Umbrella.hpp"
#elif __has_include("JHybridNativePlatformSpec.hpp")
    #include "JHybridNativePlatformSpec.hpp"

    namespace Unistyles {
        using HybridNativePlatformSpecCxx = margelo::nitro::unistyles::JHybridNativePlatformSpec;
    }
#else
    #error "Unistyles: Can't find platform specific header!"
#endif



================================================
FILE: cxx/common/Breakpoints.h
================================================
#pragma once

#include <jsi/jsi.h>
#include "Helpers.h"

using namespace facebook;

namespace margelo::nitro::unistyles::helpers {

using Breakpoints = std::vector<std::pair<std::string, double>>;

// convert user's breakpoints to sorted C++ representation
inline Breakpoints jsiBreakpointsToVecPairs(jsi::Runtime& rt, jsi::Value&& breakpoints) {
    Breakpoints sortedVecPairs;
    
    enumerateJSIObject(rt, breakpoints.asObject(rt), [&](const std::string& propertyName, jsi::Value& propertyValue){
        assertThat(rt, propertyValue.isNumber(), "value for breakpoint " + std::string(propertyName) + " is not a number.");
        
        sortedVecPairs.emplace_back(propertyName, propertyValue.asNumber());
    });
    
    std::sort(sortedVecPairs.begin(), sortedVecPairs.end(), [](auto& a, auto& b){
        return a.second < b.second;
    });
    
    return sortedVecPairs;
}

// C++ function to select current breakpoint based on screen width
inline std::string getBreakpointFromScreenWidth(int screenWidth, const Breakpoints& sortedVecPairs) {
    auto it = std::upper_bound(sortedVecPairs.cbegin(), sortedVecPairs.cend(), screenWidth, [](int width, const auto& pair) {
        return width < pair.second;
    });
    
    // return breakpoint with 0 as lowest
    if (it == sortedVecPairs.begin()) {
        return sortedVecPairs.front().first;
    }
    
    return (--it)->first;
}

}



================================================
FILE: cxx/common/Helpers.h
================================================
#pragma once

#include <jsi/jsi.h>
#include <jsi/JSIDynamic.h>
#include <folly/dynamic.h>
#include "NativePlatform.h"
#include <unordered_set>

using namespace facebook;

namespace margelo::nitro::unistyles::helpers {

using Variants = std::vector<std::pair<std::string, std::string>>;

inline void assertThat(jsi::Runtime& rt, bool condition, const std::string& message) {
    if (!condition) {
        throw jsi::JSError(rt, message);
    }
}

inline void enumerateJSIObject(jsi::Runtime& rt, const jsi::Object& obj, std::function<void(const std::string& propertyName, jsi::Value& propertyValue)> callback) {
    jsi::Array propertyNames = obj.getPropertyNames(rt);
    size_t length = propertyNames.size(rt);

    for (size_t i = 0; i < length; i++) {
        auto propertyName = propertyNames.getValueAtIndex(rt, i).asString(rt).utf8(rt);
        auto propertyValue = obj.getProperty(rt, propertyName.c_str());

        callback(propertyName, propertyValue);
    }
}

template<typename PropertyType>
inline bool vecContainsKeys(std::vector<PropertyType>& vec, std::vector<PropertyType>&& keys) {
    std::unordered_set<PropertyType> availableKeys(keys.begin(), keys.end());

    for (const auto& key : vec) {
        availableKeys.erase(key);

        if (availableKeys.empty()) {
            return true;
        }
    }

    return false;
}

template<typename PropertyType>
inline void defineHiddenProperty(jsi::Runtime& rt, jsi::Object& object, const std::string& propName, PropertyType&& property) {
    auto global = rt.global();
    auto objectConstructor = global.getPropertyAsObject(rt, "Object");
    auto defineProperty = objectConstructor.getPropertyAsFunction(rt, "defineProperty");

    facebook::jsi::Object descriptor(rt);

    if constexpr (std::is_same_v<std::decay_t<PropertyType>, jsi::Function>) {
        descriptor.setProperty(rt, facebook::jsi::PropNameID::forUtf8(rt, "value"), std::forward<PropertyType>(property));
    } else {
        descriptor.setProperty(rt, facebook::jsi::PropNameID::forUtf8(rt, "value"), property);
    }

    descriptor.setProperty(rt, facebook::jsi::PropNameID::forUtf8(rt, "enumerable"), facebook::jsi::Value(false));
    descriptor.setProperty(rt, facebook::jsi::PropNameID::forUtf8(rt, "writable"), facebook::jsi::Value(true));
    descriptor.setProperty(rt, facebook::jsi::PropNameID::forUtf8(rt, "configurable"), facebook::jsi::Value(true));

    defineProperty.call(rt, object, facebook::jsi::String::createFromAscii(rt, propName.c_str()), descriptor);
}

inline jsi::Object& mergeJSIObjects(jsi::Runtime&rt, jsi::Object& obj1, jsi::Object& obj2) {
    helpers::enumerateJSIObject(rt, obj2, [&](const std::string& propertyName, jsi::Value& propertyValue){
        obj1.setProperty(rt, propertyName.c_str(), propertyValue);
    });

    return obj1;
}

inline void iterateJSIArray(jsi::Runtime& rt, const jsi::Array& array, std::function<void(size_t, jsi::Value&)> callback) {
    size_t length = array.size(rt);

    for (size_t i = 0; i < length; i++) {
        auto value = array.getValueAtIndex(rt, i);

        callback(i, value);
    }
}

inline bool isPlatformColor(jsi::Runtime& rt, jsi::Object& maybePlatformColor) {
    auto isIOSPlatformColor = maybePlatformColor.hasProperty(rt, "semantic") && maybePlatformColor.getProperty(rt, "semantic").isObject();

    if (isIOSPlatformColor) {
        return true;
    }

    auto isIOSDynamicColor =
        maybePlatformColor.hasProperty(rt, "dynamic") &&
        maybePlatformColor.getProperty(rt, "dynamic").isObject() &&
        maybePlatformColor.getProperty(rt, "dynamic").asObject(rt).hasProperty(rt, "dark") &&
        maybePlatformColor.getProperty(rt, "dynamic").asObject(rt).hasProperty(rt, "light");

    if (isIOSDynamicColor) {
        return true;
    }

    // Android
    return maybePlatformColor.hasProperty(rt, "resource_paths") && maybePlatformColor.getProperty(rt, "resource_paths").isObject();
}

inline Variants variantsToPairs(jsi::Runtime& rt, jsi::Object&& variants) {
    Variants pairs{};

    helpers::enumerateJSIObject(rt, variants, [&](const std::string& variantName, jsi::Value& variantValue){
        if (variantValue.isUndefined() || variantValue.isNull()) {
            return;
        }

        if (variantValue.isBool()) {
            pairs.emplace_back(std::make_pair(variantName, variantValue.asBool() ? "true" : "false"));

            return;
        }

        if (variantValue.isString()) {
            pairs.emplace_back(std::make_pair(variantName, variantValue.asString(rt).utf8(rt)));
        }

        if (variantValue.isNumber()) {
            pairs.emplace_back(std::make_pair(variantName, std::to_string(static_cast<int>(variantValue.asNumber()))));
        }
    });

    return pairs;
}

inline jsi::Object pairsToVariantsValue(jsi::Runtime& rt, Variants& pairs) {
    auto variantsValue = jsi::Object(rt);

    std::for_each(pairs.begin(), pairs.end(), [&rt, &variantsValue](std::pair<std::string, std::string>& pair){
        variantsValue.setProperty(rt, jsi::PropNameID::forUtf8(rt, pair.first), jsi::String::createFromUtf8(rt, pair.second));
    });

    return variantsValue;
}

inline jsi::Object variantsToValue(jsi::Runtime& rt, Variants& variants) {
    jsi::Object rawVariants = jsi::Object(rt);

    std::for_each(variants.begin(), variants.end(), [&](std::pair<std::string, std::string>& pair){
        rawVariants.setProperty(rt, pair.first.c_str(), jsi::String::createFromUtf8(rt, pair.second));
    });

    return rawVariants;
}

inline std::vector<folly::dynamic> parseDynamicFunctionArguments(jsi::Runtime& rt, jsi::Array& arguments) {
    std::vector<folly::dynamic> parsedArgument{};
    size_t count = arguments.size(rt);

    parsedArgument.reserve(count);

    for (size_t i = 0; i < count; i++) {
        jsi::Value arg = arguments.getValueAtIndex(rt, i);

        if (arg.isBool()) {
            parsedArgument.push_back(folly::dynamic(arg.asBool()));

            continue;
        }

        if (arg.isNumber()) {
            parsedArgument.push_back(folly::dynamic(arg.asNumber()));

            continue;
        }

        if (arg.isString()) {
            parsedArgument.push_back(folly::dynamic(arg.asString(rt).utf8(rt)));

            continue;
        }

        if (arg.isUndefined()) {
            parsedArgument.push_back(folly::dynamic());

            continue;
        }

        if (arg.isNull()) {
            parsedArgument.push_back(folly::dynamic(nullptr));

            continue;
        }

        if (!arg.isObject()) {
            continue;;
        }

        auto argObj = arg.asObject(rt);

        // allow arrays and objects too
        if (!argObj.isFunction(rt) && !argObj.isArrayBuffer(rt)) {
            parsedArgument.push_back(jsi::dynamicFromValue(rt, arg));

            continue;
        }
    }

    return parsedArgument;
}

inline jsi::Array functionArgumentsToArray(jsi::Runtime& rt, const jsi::Value* args, size_t count) {
    auto arr = jsi::Array(rt, count);

    for (size_t i = 0; i < count; i++) {
        const jsi::Value& arg = args[i];

        arr.setValueAtIndex(rt, i, arg);
    }

    return arr;
}

inline static jsi::Array dependenciesToJSIArray(jsi::Runtime& rt, const std::vector<UnistyleDependency>& vec) {
    jsi::Array result(rt, vec.size());

    for (size_t i = 0; i < vec.size(); i++) {
        result.setValueAtIndex(rt, i, jsi::Value(static_cast<int>(vec[i])));
    }

    return result;
}

inline void debugPrintJSIObject(jsi::Runtime& rt, std::string& name, jsi::Object& obj) {
    auto console = rt.global().getPropertyAsObject(rt, "console");
    auto log = console.getPropertyAsFunction(rt, "log");
    auto parser = [&](const std::string& key, jsi::Value& value){
        if (value.isBool()) {
            std::string output = key + ": " + (value.getBool() ? "true" : "false");
            log.call(rt, output);

            return;
        }

        if (value.isNumber()) {
            std::string output = key + ": " + std::to_string(value.getNumber());
            log.call(rt, output);

            return;
        }

        if (value.isString()) {
            std::string output = key + ": " + value.getString(rt).utf8(rt);
            log.call(rt, output);

            return;
        }

        if (value.isUndefined()) {
            std::string output = key + ": undefined";
            log.call(rt, output);

            return;
        }

        if (value.isNull()) {
            std::string output = key + ": null";
            log.call(rt, output);

            return;
        }
    };

    log.call(rt, "===" + name + "===");

    enumerateJSIObject(rt, obj, [&](const std::string& key, jsi::Value& value){
        if (value.isObject()) {
            if (value.asObject(rt).isArray(rt)) {
                iterateJSIArray(rt, value.asObject(rt).asArray(rt), [&](size_t i, jsi::Value& nestedValue){
                    std::string printableKey = key + ": Array[" + std::to_string(i) + "]";

                    log.call(rt, printableKey);

                    if (nestedValue.isObject()) {
                        enumerateJSIObject(rt, nestedValue.asObject(rt), [&](const std::string& nestedKey, jsi::Value& nestedValue){
                            parser(nestedKey, nestedValue);
                        });
                    } else {
                        parser(printableKey, nestedValue);
                    }

                    std::string endKey = key + ": Array[end]";

                    log.call(rt, endKey);
                });
            }

            if (value.asObject(rt).isFunction(rt)) {
                std::string output = key + ": [Function]";

                log.call(rt, output);

                return;
            }

            enumerateJSIObject(rt, value.asObject(rt), [&](const std::string& nestedKey, jsi::Value& nestedValue){
                parser(nestedKey, nestedValue);
            });

            return;
        }

        parser(key, value);
    });

    log.call(rt, "===/" + name + "===");
}

inline void debugPrintFollyDynamic(jsi::Runtime& rt, const std::string& name, const folly::dynamic& obj) {
    auto console = rt.global().getPropertyAsObject(rt, "console");
    auto log = console.getPropertyAsFunction(rt, "log");
    
    std::function<void(const std::string&, const folly::dynamic&)> parser = [&](const std::string& key, const folly::dynamic& value) {
        if (value.isBool()) {
            std::string output = key + ": " + (value.getBool() ? "true" : "false");
            log.call(rt, output);
            return;
        }

        if (value.isNumber()) {
            std::string output = key + ": " + std::to_string(value.asDouble());
            log.call(rt, output);
            return;
        }

        if (value.isString()) {
            std::string output = key + ": " + value.getString();
            log.call(rt, output);
            return;
        }

        if (value.isNull()) {
            std::string output = key + ": null";
            log.call(rt, output);
            return;
        }

        if (value.isArray()) {
            for (size_t i = 0; i < value.size(); i++) {
                std::string arrayKey = key + ": Array[" + std::to_string(i) + "]";
                log.call(rt, arrayKey);
                parser(arrayKey, value[i]);
                std::string endKey = key + ": Array[end]";
                log.call(rt, endKey);
            }
            return;
        }

        if (value.isObject()) {
            for (const auto& pair : value.items()) {
                parser(pair.first.asString(), pair.second);
            }
            return;
        }

        std::string output = key + ": [Unknown type]";
        log.call(rt, output);
    };

    log.call(rt, "===" + name + "===");

    if (obj.isObject()) {
        for (const auto& pair : obj.items()) {
            parser(pair.first.asString(), pair.second);
        }
    } else {
        parser(name, obj);
    }

    log.call(rt, "===/" + name + "===");
}

}



================================================
FILE: cxx/common/UnistylesConstants.h
================================================
#pragma once

namespace margelo::nitro::unistyles::helpers {

static const std::string STYLESHEET_ID = "__stylesheetID";
static const std::string UNISTYLE_ID = "__unistyleID";
static const std::string ADD_VARIANTS_FN = "useVariants";
static const std::string STYLE_DEPENDENCIES = "uni__dependencies";
static const std::string STYLESHEET_VARIANTS = "__stylesheetVariants";
static const std::string WEB_STYLE_KEY = "_web";
static const std::string EXOTIC_STYLE_KEY = "_exotic";
static const std::string ARGUMENTS = "__uni__args";
static const std::string GET_STYLES = "uni__getStyles";

}



================================================
FILE: cxx/core/HashGenerator.cpp
================================================
#include "HashGenerator.h"
#include <sstream>
#include <iomanip>
#include <functional>

namespace margelo::nitro::unistyles::helpers {

std::atomic<unsigned int> HashGenerator::count(0);

std::string HashGenerator::generateHash(const std::string& input) {
    std::hash<std::string> stringHasher;
    uint64_t inputHash = stringHasher(input);

    unsigned int counterValue = count.fetch_add(1, std::memory_order_relaxed);
    uint64_t combinedHash = inputHash ^ (static_cast<uint64_t>(counterValue) << 32);

    std::stringstream ss;
    ss << std::hex << std::setfill('0') << std::setw(8) << (combinedHash & 0xFFFFFFFF);

    return "unistyles_" + ss.str();
}

}



================================================
FILE: cxx/core/HashGenerator.h
================================================
#pragma once

#include <string>
#include <atomic>

namespace margelo::nitro::unistyles::helpers {

struct HashGenerator {
    static std::atomic<unsigned int> count;
    static std::string generateHash(const std::string& input);
};

}



================================================
FILE: cxx/core/HostUnistyle.cpp
================================================
#include "HostUnistyle.h"

using namespace margelo::nitro::unistyles::core;
using namespace facebook;

std::vector<jsi::PropNameID> HostUnistyle::getPropertyNames(jsi::Runtime& rt) {
    auto propertyNames = std::vector<jsi::PropNameID> {};

    propertyNames.reserve(8);

    for (const auto& pair : this->_stylesheet->unistyles) {
        propertyNames.emplace_back(jsi::PropNameID::forUtf8(rt, pair.first));
    }

    propertyNames.emplace_back(jsi::PropNameID::forUtf8(rt, helpers::ADD_VARIANTS_FN.c_str()));

    return propertyNames;
}

jsi::Value HostUnistyle::get(jsi::Runtime& rt, const jsi::PropNameID& propNameId) {
    auto propertyName = propNameId.utf8(rt);

    if (propertyName == helpers::STYLESHEET_ID.c_str()) {
        return jsi::Value(this->_stylesheet->tag);
    }

    if (propertyName == helpers::STYLESHEET_VARIANTS.c_str()) {
        return helpers::variantsToValue(rt, this->_variants);
    }

    if (propertyName == helpers::ADD_VARIANTS_FN.c_str()) {
        return this->createAddVariantsProxyFunction(rt);
    }

    if (!this->_stylesheet->unistyles.contains(propertyName)) {
        return jsi::Value::undefined();
    }

    auto& unistyle = this->_stylesheet->unistyles[propertyName];

    // check if Unistyles recomputed new style in the background
    // (when no node was mounted), if so we need to simply rebuild unistyle to get fresh data
    if (unistyle->isDirty) {
        this->_cache.erase(propertyName);

        auto parser = parser::Parser(this->_unistylesRuntime);

        parser.rebuildUnistyle(rt, unistyle, this->_variants, std::nullopt);
    }

    if (unistyle->type == UnistyleType::DynamicFunction) {
        // for dynamic functions we will also bind "this"
        auto styleFn = valueFromUnistyle(rt, this->_unistylesRuntime, unistyle, this->_variants);

        // construct newThis
        jsi::Object newThis = jsi::Object(rt);
        newThis.setProperty(rt, helpers::STYLESHEET_VARIANTS.c_str(), helpers::variantsToValue(rt, this->_variants));

        auto functionPrototype = rt.global()
            .getPropertyAsObject(rt, "Function")
            .getPropertyAsObject(rt, "prototype")
            .getPropertyAsFunction(rt, "bind");

        return functionPrototype.callWithThis(rt, styleFn.asObject(rt), newThis);
    }

    if (this->_cache.contains(propertyName)) {
        return jsi::Value(rt, this->_cache[propertyName]);
    }

    auto style = valueFromUnistyle(rt, this->_unistylesRuntime, unistyle, this->_variants);

    this->_cache.emplace(propertyName, jsi::Value(rt, style));

    return style;
}

void HostUnistyle::set(jsi::Runtime& rt, const jsi::PropNameID& propNameId, const jsi::Value& value) {}

jsi::Function HostUnistyle::createAddVariantsProxyFunction(jsi::Runtime& rt) {
    auto useVariantsFnName = jsi::PropNameID::forUtf8(rt, helpers::ADD_VARIANTS_FN);

    return jsi::Function::createFromHostFunction(rt, useVariantsFnName, 1, [this](jsi::Runtime &rt, const jsi::Value &thisVal, const jsi::Value *arguments, size_t count){
        helpers::assertThat(rt, count == 1, "Unistyles: useVariants expected to be called with one argument.");
        helpers::assertThat(rt, arguments[0].isObject(), "Unistyles: useVariants expected to be called with object.");

        Variants variants = helpers::variantsToPairs(rt, arguments[0].asObject(rt));
        parser::Parser parser = parser::Parser(this->_unistylesRuntime);

        auto stylesheetCopy = std::make_shared<StyleSheet>(
            this->_stylesheet->tag,
            this->_stylesheet->type,
            jsi::Value(rt, this->_stylesheet->rawValue).asObject(rt)
        );
        
        parser.buildUnistyles(rt, stylesheetCopy);
        parser.parseUnistyles(rt, stylesheetCopy);
        
        helpers::enumerateJSIObject(rt, thisVal.asObject(rt), [this, &parser, &rt, &variants, stylesheetCopy](const std::string& name, jsi::Value& value){
            if (name == helpers::ADD_VARIANTS_FN || !stylesheetCopy->unistyles.contains(name)) {
                return;
            }

            auto unistyle = stylesheetCopy->unistyles[name];
            
            if (unistyle->dependsOn(UnistyleDependency::VARIANTS)) {
                parser.rebuildUnistyle(rt, unistyle, variants, std::nullopt);
            }
        });

        auto style = std::make_shared<core::HostUnistyle>(stylesheetCopy, this->_unistylesRuntime, variants);
        auto styleHostObject = jsi::Object::createFromHostObject(rt, style);

        return styleHostObject;
    });
}



================================================
FILE: cxx/core/HostUnistyle.h
================================================
#pragma once

#include <jsi/jsi.h>
#include "Parser.h"
#include "UnistyleWrapper.h"

namespace margelo::nitro::unistyles::core {

using Variants = std::vector<std::pair<std::string, std::string>>;

struct JSI_EXPORT HostUnistyle : public jsi::HostObject {
    HostUnistyle(std::shared_ptr<StyleSheet> stylesheet, std::shared_ptr<HybridUnistylesRuntime> unistylesRuntime, Variants& variants)
        : _stylesheet(stylesheet), _unistylesRuntime{unistylesRuntime}, _variants{std::move(variants)} {};

    std::vector<jsi::PropNameID> getPropertyNames(jsi::Runtime& rt);
    jsi::Value get(jsi::Runtime& rt, const jsi::PropNameID& propNameId);
    void set(jsi::Runtime& rt, const jsi::PropNameID& propNameId, const jsi::Value& value);

    jsi::Function createAddVariantsProxyFunction(jsi::Runtime& rt);

private:
    Variants _variants;
    std::shared_ptr<StyleSheet> _stylesheet;
    std::shared_ptr<HybridUnistylesRuntime> _unistylesRuntime;
    std::unordered_map<std::string, jsi::Value> _cache;
};

}



================================================
FILE: cxx/core/MediaQueries.cpp
================================================
#include "MediaQueries.h"

using namespace margelo::nitro::unistyles;

bool core::UnistylesMQ::isMQ() {
    return this->isValid;
}

bool core::UnistylesMQ::checkIsMQ(const std::string& maybeMQ) {
    std::regex pattern(R"(:([hw])\[(\d+)(?:,\s*(\d+|Infinity))?\])");

    return std::regex_search(maybeMQ, pattern);
}

bool core::UnistylesMQ::checkIsValidMQ() {
    if (parsedMQ->width && parsedMQ->height) {
        return parsedMQ->width->from <= parsedMQ->width->to && parsedMQ->height->from <= parsedMQ->height->to;
    }

    if (parsedMQ->width) {
        return parsedMQ->width->from <= parsedMQ->width->to;
    }

    if (parsedMQ->height) {
        return parsedMQ->height->from <= parsedMQ->height->to;
    }
    
    return false;
}

void core::UnistylesMQ::parseMQ(const std::string& maybeMQ) {
    const std::regex UNISTYLES_WIDTH_REGEX(R"(:(w)\[(\d+)(?:,\s*(\d+|Infinity))?\])");
    const std::regex UNISTYLES_HEIGHT_REGEX(R"(:(h)\[(\d+)(?:,\s*(\d+|Infinity))?\])");

    ParsedMQ result;
    std::smatch match;

    if (std::regex_search(maybeMQ, match, UNISTYLES_WIDTH_REGEX)) {
        double from = std::stod(match[2]);
        double to = match[3].matched
        ? (match[3] == "Infinity" ? std::numeric_limits<double>::infinity(): std::stod(match[3]))
        : from;
        
        result.width = ParsedMQDimension{from, to};
    }

    if (std::regex_search(maybeMQ, match, UNISTYLES_HEIGHT_REGEX)) {
        double from = std::stod(match[2]);
        double to = match[3].matched
        ? (match[3] == "Infinity" ? std::numeric_limits<double>::infinity() : std::stod(match[3]))
        : from;

        result.height = ParsedMQDimension{from, to};
    }
    
    this->parsedMQ = result;
}

bool core::UnistylesMQ::isWithinScreenWidth(const ParsedMQDimension& width, double screenWidth) {
    return screenWidth >= width.from && screenWidth <= width.to;
}

bool core::UnistylesMQ::isWithinScreenHeight(const ParsedMQDimension& height, double screenHeight) {
    return screenHeight >= height.from && screenHeight <= height.to;
}

bool core::UnistylesMQ::isWithinTheWidthAndHeight(const Dimensions& screenSize) {
    if (!isValid) {
        return false;
    }
    
    auto parsedMq = parsedMQ.value();
    
    if (parsedMq.width && parsedMq.height) {
        return isWithinScreenWidth(*parsedMq.width, screenSize.width) && isWithinScreenHeight(*parsedMq.height, screenSize.height);
    }

    if (parsedMq.width) {
        return isWithinScreenWidth(*parsedMq.width, screenSize.width);
    }

    if (parsedMq.height) {
        return isWithinScreenHeight(*parsedMq.height, screenSize.height);
    }

    return false;
}



================================================
FILE: cxx/core/MediaQueries.h
================================================
#pragma once

#include <optional>
#include <regex>
#include "Dimensions.hpp"

namespace margelo::nitro::unistyles::core {

struct ParsedMQDimension {
    double from;
    double to;
};

struct ParsedMQ {
    std::optional<ParsedMQDimension> width;
    std::optional<ParsedMQDimension> height;
};

struct UnistylesMQ {
    UnistylesMQ(const std::string& maybeMQ) {
        if (!this->checkIsMQ(maybeMQ)) {
            return;
        }
        
        this->parseMQ(maybeMQ);
        
        if (!this->checkIsValidMQ()) {
            return;
        }
        
        this->isValid = true;
    }

    bool isMQ();
    bool isWithinTheWidthAndHeight(const Dimensions& screenSize);
    
private:
    bool isValid = false;
    std::optional<ParsedMQ> parsedMQ;
    bool checkIsValidMQ();
    bool checkIsMQ(const std::string& maybeMQ);
    void parseMQ(const std::string& maybeMQ);
    bool isWithinScreenWidth(const ParsedMQDimension& width, double screenWidth);
    bool isWithinScreenHeight(const ParsedMQDimension& height, double screenHeight);
};

}



================================================
FILE: cxx/core/RNStyle.h
================================================
#pragma once

#include <jsi/jsi.h>
#include "Helpers.h"
#include "Parser.h"
#include "HostUnistyle.h"
#include "UnistyleWrapper.h"

namespace margelo::nitro::unistyles::core {

inline jsi::Object toRNStyle(jsi::Runtime& rt, std::shared_ptr<StyleSheet> stylesheet, std::shared_ptr<HybridUnistylesRuntime> unistylesRuntime, Variants&& variants) {
    auto style = std::make_shared<core::HostUnistyle>(stylesheet, unistylesRuntime, variants);
    auto styleHostObject = jsi::Object::createFromHostObject(rt, style);

    return styleHostObject;
}

}



================================================
FILE: cxx/core/StyleSheet.h
================================================
#pragma once

#include <jsi/jsi.h>
#include "Unistyle.h"
#include "Helpers.h"
#include "UnistylesConstants.h"

namespace margelo::nitro::unistyles::core {

using namespace facebook;

enum class StyleSheetType {
    Static,
    Themable,
    ThemableWithMiniRuntime
};

struct StyleSheet {
    StyleSheet(int tag, StyleSheetType type, jsi::Object rawValue): tag{tag}, type{type}, rawValue{std::move(rawValue)} {};
    
    StyleSheet(const StyleSheet&) = delete;
    StyleSheet(StyleSheet&& other) = delete;

    int tag;
    StyleSheetType type;
    jsi::Object rawValue;
    std::unordered_map<std::string, Unistyle::Shared> unistyles{};
};

}



================================================
FILE: cxx/core/StyleSheetRegistry.cpp
================================================
#include "StyleSheetRegistry.h"
#include "UnistylesRegistry.h"

using namespace margelo::nitro::unistyles::core;
using namespace facebook;

std::shared_ptr<StyleSheet> StyleSheetRegistry::addStyleSheetFromValue(jsi::Runtime& rt, jsi::Object rawStyleSheet, int unid) {
    if (rawStyleSheet.isFunction(rt)) {
        return this->addFromFunction(rt, unid, rawStyleSheet.asFunction(rt));
    }

    return this->addFromObject(rt, unid, std::move(rawStyleSheet));
}

std::shared_ptr<StyleSheet> StyleSheetRegistry::addFromFunction(jsi::Runtime& rt, int unid, jsi::Function styleSheetFn) {
    auto numberOfArgs = styleSheetFn.getProperty(rt, "length").getNumber();

    helpers::assertThat(rt, numberOfArgs <= 2, "StyleSheet.create expected up to 2 arguments.");
    
    auto& registry = UnistylesRegistry::get();

    // stylesheet is still static, remove the function wrapper
    if (numberOfArgs == 0) {
        auto staticStyleSheet = styleSheetFn.call(rt).asObject(rt);

        return registry.addStyleSheet(rt, unid, core::StyleSheetType::Static, std::move(staticStyleSheet));
    }

    // stylesheet depends only on theme
    if (numberOfArgs == 1) {
        return registry.addStyleSheet(rt, unid, core::StyleSheetType::Themable, std::move(styleSheetFn));
    }

    // stylesheet depends on theme and mini runtime
    return registry.addStyleSheet(rt, unid, core::StyleSheetType::ThemableWithMiniRuntime, std::move(styleSheetFn));
}

std::shared_ptr<StyleSheet> StyleSheetRegistry::addFromObject(jsi::Runtime& rt, int tag, jsi::Object rawStyleSheet) {
    auto& registry = UnistylesRegistry::get();
    
    return registry.addStyleSheet(rt, tag, core::StyleSheetType::Static, std::move(rawStyleSheet));
}



================================================
FILE: cxx/core/StyleSheetRegistry.h
================================================
#pragma once

#include <jsi/jsi.h>
#include "StyleSheet.h"
#include "Unistyle.h"
#include "UnistylesState.h"

namespace margelo::nitro::unistyles::core {

using namespace facebook;

struct StyleSheetRegistry {
    StyleSheetRegistry() = default;
    virtual ~StyleSheetRegistry() = default;

    StyleSheetRegistry(const StyleSheetRegistry&) = delete;
    StyleSheetRegistry(StyleSheetRegistry&&) = delete;

    virtual std::shared_ptr<StyleSheet> addStyleSheetFromValue(jsi::Runtime& rt, jsi::Object rawStyleSheet, int unid);
    
private:
    virtual std::shared_ptr<StyleSheet> addFromFunction(jsi::Runtime& rt, int unid, jsi::Function styleSheetFn);
    virtual std::shared_ptr<StyleSheet> addFromObject(jsi::Runtime& rt, int unid, jsi::Object rawStyleSheet);
};

}



================================================
FILE: cxx/core/Unistyle.h
================================================
#pragma once

#include "string"
#include <jsi/jsi.h>
#include <folly/dynamic.h>
#include "NativePlatform.h"

namespace margelo::nitro::unistyles::core {

class StyleSheet;

using namespace facebook;

enum class UnistyleType {
    Object,
    DynamicFunction
};

struct Unistyle {
    using Shared = std::shared_ptr<Unistyle>;

    Unistyle(std::string hash, UnistyleType type, std::string styleKey, jsi::Object& rawObject, std::shared_ptr<StyleSheet> styleSheet)
        : unid{hash}, styleKey{styleKey}, type{type}, rawValue{std::move(rawObject)}, parent{styleSheet} {}
    virtual ~Unistyle() = default;

    Unistyle(const Unistyle&) = delete;
    Unistyle(Unistyle&& other) = delete;

    UnistyleType type;
    std::string styleKey;
    std::string unid;
    jsi::Object rawValue;
    std::optional<jsi::Object> parsedStyle;
    std::vector<UnistyleDependency> dependencies{};
    std::shared_ptr<StyleSheet> parent;

    // defines if given unattached unistyle was modified
    // and should be recomputed when mounting new node
    bool isDirty = false;

    inline void addDependency(UnistyleDependency dependency) {
        // we can't add dependencies if unistyle is sealed
        if (this->_isSealed) {
            return;
        }

        auto it = std::find(this->dependencies.begin(), this->dependencies.end(), dependency);

        if (it == this->dependencies.end()) {
            this->dependencies.push_back(dependency);
        }
    }

    inline void addBreakpointDependency() {
        // this dependency can skip sealed check, as useVariants hook is called during React component render
        // also this is the only dependency that is not staticly deducted from Babel plugin
        auto it = std::find(this->dependencies.begin(), this->dependencies.end(), UnistyleDependency::BREAKPOINTS);

        if (it == this->dependencies.end()) {
            this->dependencies.push_back(UnistyleDependency::BREAKPOINTS);
        }
    }

    inline bool dependsOn(UnistyleDependency dependency) {
        return std::find(this->dependencies.begin(), this->dependencies.end(), dependency) != this->dependencies.end();
    }

    inline bool isSealed() {
        return this->_isSealed;
    }

    inline void seal() {
        this->_isSealed = true;
    }

private:
    bool _isSealed = false;
};

struct UnistyleDynamicFunction: public Unistyle {
    // dynamic function must have 4 different value types
    // rawValue <- original user function
    // proxiedFunction <- host function that is a wrapper for user's original function
    // unprocessedValue <- object generated after calling proxy and user's original function
    // parsedStyle <- parsed with Unistyle's parser

    UnistyleDynamicFunction(std::string hash, UnistyleType type, std::string styleKey, jsi::Object& rawObject, std::shared_ptr<StyleSheet> styleSheet)
        : Unistyle(hash, type, styleKey, rawObject, styleSheet) {}

    UnistyleDynamicFunction(const UnistyleDynamicFunction&) = delete;
    UnistyleDynamicFunction(UnistyleDynamicFunction&& other) = delete;

    std::optional<jsi::Object> unprocessedValue;
    std::optional<jsi::Function> proxiedFunction = std::nullopt;
};

}



================================================
FILE: cxx/core/UnistyleData.h
================================================
#pragma once

#include <jsi/jsi.h>
#include "Unistyle.h"

namespace margelo::nitro::unistyles::core {

using Variants = std::vector<std::pair<std::string, std::string>>;

struct UnistyleData {
    UnistyleData(Unistyle::Shared unistyle, const Variants& variants, std::vector<folly::dynamic>& arguments, std::optional<std::string> scopedTheme)
        : unistyle{unistyle}, variants(std::move(variants)), dynamicFunctionMetadata{std::move(arguments)}, scopedTheme{scopedTheme} {}

    UnistyleData(const UnistyleData&) = delete;
    UnistyleData(UnistyleData&& other) = delete;

    core::Unistyle::Shared unistyle;
    core::Variants variants;
    std::optional<jsi::Object> parsedStyle = std::nullopt;
    std::optional<std::vector<folly::dynamic>> dynamicFunctionMetadata = std::nullopt;
    std::optional<std::string> scopedTheme = std::nullopt;
};

}



================================================
FILE: cxx/core/UnistylesCommitShadowNode.h
================================================
#pragma once

#include <react/renderer/core/ShadowNode.h>

namespace margelo::nitro::unistyles::core {

// used to distinguish Unistyles commits
// React Native uses 0-10
// Reanimated uses 27-28
constexpr shadow::ShadowNodeTraits::Trait UnistylesCommitTrait{1 << 30};

struct UnistylesCommitShadowNode: public shadow::ShadowNode {
    inline void addUnistylesCommitTrait() {
        traits_.set(UnistylesCommitTrait);
    }
};

}



================================================
FILE: cxx/core/UnistylesRegistry.cpp
================================================
#include "UnistylesRegistry.h"
#include "UnistylesState.h"
#include "Parser.h"

using namespace margelo::nitro::unistyles;
using namespace facebook;
using namespace facebook::react;

void core::UnistylesRegistry::registerTheme(jsi::Runtime& rt, std::string name, jsi::Value& theme) {
    auto& state = this->getState(rt);

    state._jsThemes.emplace(name, std::move(theme));
    state._registeredThemeNames.push_back(name);
}

void core::UnistylesRegistry::registerBreakpoints(jsi::Runtime& rt, std::vector<std::pair<std::string, double>>& sortedBreakpoints) {
    auto& state = this->getState(rt);

    state._sortedBreakpointPairs = std::move(sortedBreakpoints);
}

void core::UnistylesRegistry::setPrefersAdaptiveThemes(jsi::Runtime& rt, bool prefersAdaptiveThemes) {
    auto& state = this->getState(rt);

    state._prefersAdaptiveThemes = prefersAdaptiveThemes;
}

void core::UnistylesRegistry::setInitialThemeName(jsi::Runtime& rt, std::string themeName) {
    auto& state = this->getState(rt);

    state._initialThemeName = themeName;
}

core::UnistylesState& core::UnistylesRegistry::getState(jsi::Runtime& rt) {
    auto it = this->_states.find(&rt);

    helpers::assertThat(rt, it != this->_states.end(), "Unistyles was loaded, but it's not configured. Did you forget to call StyleSheet.configure? If you don't want to use any themes or breakpoints, simply call it with an empty object {}.");

    return it->second;
}

void core::UnistylesRegistry::createState(jsi::Runtime& rt) {
    auto it = this->_states.find(&rt);

    this->_states.emplace(
        std::piecewise_construct,
        std::forward_as_tuple(&rt),
        std::forward_as_tuple(rt)
    );
}

void core::UnistylesRegistry::updateTheme(jsi::Runtime& rt, std::string& themeName, jsi::Function&& callback) {
    auto& state = this->getState(rt);
    auto it = state._jsThemes.find(themeName);

    helpers::assertThat(rt, it != state._jsThemes.end(), "Unistyles: You're trying to update theme '" + themeName + "' but it wasn't registered.");

    auto result = callback.call(rt, it->second);

    helpers::assertThat(rt, result.isObject(), "Unistyles: Returned theme is not an object. Please check your updateTheme function.");

    it->second = result.asObject(rt);
}

void core::UnistylesRegistry::linkShadowNodeWithUnistyle(
    jsi::Runtime& rt,
    const ShadowNodeFamily* shadowNodeFamily,
    std::vector<std::shared_ptr<UnistyleData>>& unistylesData
) {
    this->trafficController.withLock([this, &rt, &unistylesData, shadowNodeFamily](){
        shadow::ShadowLeafUpdates updates;
        auto parser = parser::Parser(nullptr);

        std::for_each(unistylesData.begin(), unistylesData.end(), [this, &rt, shadowNodeFamily](std::shared_ptr<UnistyleData> unistyleData){
            this->_shadowRegistry[&rt][shadowNodeFamily].emplace_back(unistyleData);
        });

        updates[shadowNodeFamily] = parser.parseStylesToShadowTreeStyles(rt, unistylesData);

        this->trafficController.setUpdates(updates);
        this->trafficController.resumeUnistylesTraffic();
    });
}

void core::UnistylesRegistry::removeDuplicatedUnistyles(jsi::Runtime& rt, const ShadowNodeFamily *shadowNodeFamily, std::vector<core::Unistyle::Shared>& unistyles) {
    auto targetFamilyUnistyles = this->_shadowRegistry[&rt][shadowNodeFamily];

    unistyles.erase(
        std::remove_if(
            unistyles.begin(),
            unistyles.end(),
            [&targetFamilyUnistyles](const core::Unistyle::Shared& unistyle) {
                return std::any_of(
                    targetFamilyUnistyles.begin(),
                    targetFamilyUnistyles.end(),
                    [&unistyle](const std::shared_ptr<core::UnistyleData>& data) {
                        return data->unistyle == unistyle;
                    }
                );
            }
        ),
        unistyles.end()
    );
}

void core::UnistylesRegistry::unlinkShadowNodeWithUnistyles(jsi::Runtime& rt, const ShadowNodeFamily* shadowNodeFamily) {
    this->trafficController.withLock([this, &rt, shadowNodeFamily](){
        this->_shadowRegistry[&rt].erase(shadowNodeFamily);
        this->trafficController.removeShadowNode(shadowNodeFamily);

        if (this->_shadowRegistry[&rt].empty()) {
            this->_shadowRegistry.erase(&rt);
        }
    });
}

std::shared_ptr<core::StyleSheet> core::UnistylesRegistry::addStyleSheet(jsi::Runtime& rt, int unid, core::StyleSheetType type, jsi::Object&& rawValue) {
    this->_styleSheetRegistry[&rt][unid] = std::make_shared<core::StyleSheet>(unid, type, std::move(rawValue));

    return this->_styleSheetRegistry[&rt][unid];
}

core::DependencyMap core::UnistylesRegistry::buildDependencyMap(jsi::Runtime& rt, std::vector<UnistyleDependency>& deps) {
    core::DependencyMap dependencyMap;

    std::unordered_set<UnistyleDependency> uniqueDependencies(deps.begin(), deps.end());

    for (const auto& [family, unistyles] : this->_shadowRegistry[&rt]) {
        bool hasAnyOfDependencies = false;

        // Check if any dependency matches
        for (const auto& unistyleData : unistyles) {
            for (const auto& dep : unistyleData->unistyle->dependencies) {
                if (uniqueDependencies.count(dep)) {
                    hasAnyOfDependencies = true;
                    break;
                }
            }

            if (hasAnyOfDependencies) {
                break;
            };
        }

        if (!hasAnyOfDependencies) {
            continue;
        }

        dependencyMap[family].insert(
            dependencyMap[family].end(),
            unistyles.begin(),
            unistyles.end()
        );
    }

    return dependencyMap;
}

// called from proxied function only, we don't know host
// so we need to rebuild all instances as they may have different variants
void core::UnistylesRegistry::shadowLeafUpdateFromUnistyle(jsi::Runtime& rt, Unistyle::Shared unistyle, jsi::Value& maybePressableId) {
    shadow::ShadowLeafUpdates updates;
    this->trafficController.withLock([this, &rt, &maybePressableId, unistyle, &updates](){
        auto parser = parser::Parser(nullptr);
        std::optional<std::string> pressableId = maybePressableId.isString()
            ? std::make_optional(maybePressableId.asString(rt).utf8(rt))
            : std::nullopt;

        for (const auto& [family, unistyles] : this->_shadowRegistry[&rt]) {
            for (const auto& unistyleData : unistyles) {
                if (unistyleData->unistyle == unistyle) {
                    updates[family] = parser.parseStylesToShadowTreeStyles(rt, { unistyleData });
                }
            }
        }

        this->trafficController.setUpdates(updates);
    });
}

std::vector<std::shared_ptr<core::StyleSheet>>core::UnistylesRegistry::getStyleSheetsToRefresh(jsi::Runtime& rt, std::vector<UnistyleDependency>& unistylesDependencies) {
    std::vector<std::shared_ptr<core::StyleSheet>> stylesheetsToRefresh;
    std::unordered_set<UnistyleDependency> depSet(
        unistylesDependencies.begin(),
        unistylesDependencies.end()
    );

    bool themeDidChange = depSet.count(UnistyleDependency::THEME) > 0;
    bool runtimeDidChange = (themeDidChange && depSet.size() > 1) || !depSet.empty();

    if (!themeDidChange && !runtimeDidChange) {
        return stylesheetsToRefresh;
    }

    auto& styleSheets = this->_styleSheetRegistry[&rt];

    for (const auto& [_, styleSheet] : styleSheets) {
        if (styleSheet->type == StyleSheetType::ThemableWithMiniRuntime) {
            auto hasMatchingDependency = [&depSet](const auto& unistyles) {
                for (const auto& [_, unistyle] : unistyles) {
                    for (const auto& dep : unistyle->dependencies) {
                        if (depSet.count(dep)) {
                            return true;
                        }
                    }
                }

                return false;
            };

            if (hasMatchingDependency(styleSheet->unistyles)) {
                stylesheetsToRefresh.emplace_back(styleSheet);
            }
        }

        if (styleSheet->type == StyleSheetType::Themable && themeDidChange) {
            stylesheetsToRefresh.emplace_back(styleSheet);
        }
    }

    return stylesheetsToRefresh;
}

core::Unistyle::Shared core::UnistylesRegistry::getUnistyleById(jsi::Runtime& rt, std::string unistyleID) {
    for (auto& pair: this->_styleSheetRegistry[&rt]) {
        auto [_, stylesheet] = pair;

        for (auto unistylePair: stylesheet->unistyles) {
            auto [_, unistyle] = unistylePair;

            if (unistyle->unid == unistyleID) {
                return unistyle;
            }
        }
    }

    return nullptr;
}

const std::optional<std::string> core::UnistylesRegistry::getScopedTheme() {
    return this->_scopedTheme;
}

void core::UnistylesRegistry::setScopedTheme(std::optional<std::string> themeName) {
    this->_scopedTheme = std::move(themeName);
}

void core::UnistylesRegistry::destroy() {
    this->_states.clear();
    this->_styleSheetRegistry.clear();
    this->_shadowRegistry.clear();
    this->_scopedTheme = std::nullopt;
}



================================================
FILE: cxx/core/UnistylesRegistry.h
================================================
#pragma once

#include "set"
#include <jsi/jsi.h>
#include <folly/dynamic.h>
#include <react/renderer/uimanager/UIManager.h>
#include <unordered_map>
#include <unordered_set>
#include "Breakpoints.h"
#include "StyleSheetRegistry.h"
#include "StyleSheet.h"
#include "Unistyle.h"
#include "UnistyleData.h"
#include "ShadowTrafficController.h"

namespace margelo::nitro::unistyles::core {

struct UnistylesState;

using namespace facebook;
using namespace facebook::react;

using DependencyMap = std::unordered_map<const ShadowNodeFamily*, std::vector<std::shared_ptr<UnistyleData>>>;

struct UnistylesRegistry: public StyleSheetRegistry {
    static UnistylesRegistry& get();

    UnistylesRegistry(const UnistylesRegistry&) = delete;
    UnistylesRegistry(const UnistylesRegistry&&) = delete;

    bool shouldUsePointsForBreakpoints = false;

    void registerTheme(jsi::Runtime& rt, std::string name, jsi::Value& theme);
    void registerBreakpoints(jsi::Runtime& rt, std::vector<std::pair<std::string, double>>& sortedBreakpoints);
    void setPrefersAdaptiveThemes(jsi::Runtime& rt, bool prefersAdaptiveThemes);
    void setInitialThemeName(jsi::Runtime& rt, std::string themeName);
    void updateTheme(jsi::Runtime& rt, std::string& themeName, jsi::Function&& callback);

    UnistylesState& getState(jsi::Runtime& rt);
    void createState(jsi::Runtime& rt);
    std::vector<std::shared_ptr<core::StyleSheet>> getStyleSheetsToRefresh(jsi::Runtime& rt, std::vector<UnistyleDependency>& unistylesDependencies);
    void linkShadowNodeWithUnistyle(jsi::Runtime& rt, const ShadowNodeFamily*, std::vector<std::shared_ptr<UnistyleData>>& unistylesData);
    void unlinkShadowNodeWithUnistyles(jsi::Runtime& rt, const ShadowNodeFamily*);
    std::shared_ptr<core::StyleSheet> addStyleSheet(jsi::Runtime& rt, int tag, core::StyleSheetType type, jsi::Object&& rawValue);
    DependencyMap buildDependencyMap(jsi::Runtime& rt, std::vector<UnistyleDependency>& deps);
    void shadowLeafUpdateFromUnistyle(jsi::Runtime& rt, Unistyle::Shared unistyle, jsi::Value& maybePressableId);
    shadow::ShadowTrafficController trafficController{};
    const std::optional<std::string> getScopedTheme();
    void removeDuplicatedUnistyles(jsi::Runtime& rt, const ShadowNodeFamily* shadowNodeFamily, std::vector<core::Unistyle::Shared>& unistyles);
    void setScopedTheme(std::optional<std::string> themeName);
    core::Unistyle::Shared getUnistyleById(jsi::Runtime& rt, std::string unistyleID);
    void destroy();

private:
    UnistylesRegistry() = default;

    std::optional<std::string> _scopedTheme{};
    std::unordered_map<jsi::Runtime*, UnistylesState> _states{};
    std::unordered_map<jsi::Runtime*, std::unordered_map<int, std::shared_ptr<core::StyleSheet>>> _styleSheetRegistry{};
    std::unordered_map<jsi::Runtime*, std::unordered_map<const ShadowNodeFamily*, std::vector<std::shared_ptr<UnistyleData>>>> _shadowRegistry{};
};

inline UnistylesRegistry& UnistylesRegistry::get() {
    static UnistylesRegistry cache;

    return cache;
}

}



================================================
FILE: cxx/core/UnistylesState.cpp
================================================
#include "UnistylesState.h"
#include "UnistylesRegistry.h"

using namespace margelo::nitro::unistyles;

bool core::UnistylesState::hasAdaptiveThemes() {
    if (!this->_prefersAdaptiveThemes.has_value() || !this->_prefersAdaptiveThemes.value()) {
        return false;
    }

    return helpers::vecContainsKeys(this->_registeredThemeNames, {"light", "dark"});
}

void core::UnistylesState::setTheme(std::string themeName) {
    helpers::assertThat(*_rt, helpers::vecContainsKeys(this->_registeredThemeNames, {themeName}), "Unistyles: You're trying to set theme to: '" + std::string(themeName) + "', but it wasn't registered.");

    if (themeName != this->_currentThemeName) {
        this->_currentThemeName = themeName;
    }
}

std::optional<std::string>& core::UnistylesState::getCurrentThemeName() {
    return this->_currentThemeName;
}

jsi::Object core::UnistylesState::getCurrentJSTheme() {
    auto hasSomeThemes = _registeredThemeNames.size() > 0;

    if (!hasSomeThemes && !this->hasUserConfig) {
        helpers::assertThat(*_rt, false, "Unistyles: One of your stylesheets is trying to get the theme, but no theme has been selected yet. Did you forget to call StyleSheet.configure? If you called it, make sure you did so before any StyleSheet.create.");
    }

    // return empty object, if user didn't register any themes
    if (!hasSomeThemes) {
        return jsi::Object(*_rt);
    }

    helpers::assertThat(*_rt, _currentThemeName.has_value(), "Unistyles: One of your stylesheets is trying to get the theme, but no theme has been selected yet. Did you forget to select an initial theme?");

    auto it = this->_jsThemes.find(_currentThemeName.value());

    helpers::assertThat(*_rt, it != this->_jsThemes.end(), "Unistyles: You're trying to get theme '" + _currentThemeName.value() + "', but it was not registered. Did you forget to register it with StyleSheet.configure?");

    return it->second.asObject(*_rt);
}

jsi::Object core::UnistylesState::getJSThemeByName(std::string& themeName) {
    auto it = this->_jsThemes.find(themeName);

    helpers::assertThat(*_rt, it != this->_jsThemes.end(), "Unistyles: You're trying to get theme '" + themeName + "', but it was not registered. Did you forget to register it with StyleSheet.configure?");

    return it->second.asObject(*_rt);
}

void core::UnistylesState::computeCurrentBreakpoint(int screenWidth) {
    if (this->_sortedBreakpointPairs.size() == 0) {
        return;
    }

    this->_currentBreakpointName = helpers::getBreakpointFromScreenWidth(
        screenWidth,
        this->_sortedBreakpointPairs
    );
}

bool core::UnistylesState::hasTheme(std::string themeName) {
    return helpers::vecContainsKeys(this->_registeredThemeNames, {themeName});
}

bool core::UnistylesState::hasInitialTheme() {
    return this->_initialThemeName.has_value();
}

std::vector<std::string> core::UnistylesState::getRegisteredThemeNames() {
    return std::vector<std::string>(this->_registeredThemeNames);
}

std::vector<std::pair<std::string, double>> core::UnistylesState::getSortedBreakpointPairs() {
    return std::vector<std::pair<std::string, double>>(this->_sortedBreakpointPairs);
}

std::optional<std::string> core::UnistylesState::getInitialTheme() {
    return this->_initialThemeName;
}

std::optional<std::string> core::UnistylesState::getCurrentBreakpointName() {
    return this->_currentBreakpointName;
}

bool core::UnistylesState::getPrefersAdaptiveThemes() {
    return this->_prefersAdaptiveThemes.has_value() && this->_prefersAdaptiveThemes.value();
}

void core::UnistylesState::registerProcessColorFunction(jsi::Function&& fn) {
    this->_processColorFn = std::make_shared<jsi::Function>(std::move(fn));
}

void core::UnistylesState::registerParseBoxShadowString(jsi::Function&& fn) {
    this->_parseBoxShadowStringFn = std::make_shared<jsi::Function>(std::move(fn));
}

int core::UnistylesState::parseColor(jsi::Value& maybeColor) {
    if (!maybeColor.isString()) {
        return 0;
    }

    auto colorString = maybeColor.asString(*_rt);

    if (!this->_colorCache.contains(colorString.utf8(*_rt).c_str())) {
        #ifdef ANDROID
            int color = this->_processColorFn.get()->call(*_rt, colorString).asNumber();
        #else
            uint32_t color = this->_processColorFn.get()->call(*_rt, colorString).asNumber();
        #endif

        this->_colorCache[colorString.utf8(*_rt).c_str()] = color ? color : 0;
    }

    return this->_colorCache[colorString.utf8(*_rt).c_str()];
}

jsi::Array core::UnistylesState::parseBoxShadowString(std::string&& boxShadowString) {
    jsi::Value result = this->_parseBoxShadowStringFn.get()->call(*_rt, boxShadowString);

    return result.asObject(*_rt).asArray(*_rt);
}



================================================
FILE: cxx/core/UnistylesState.h
================================================
#pragma once

#include <string>
#include <optional>
#include <jsi/jsi.h>
#include <vector>
#include "Helpers.h"

namespace margelo::nitro::unistyles::core {

struct UnistylesRegistry;

using namespace facebook;

struct UnistylesState {
    UnistylesState(jsi::Runtime& rt): _rt{&rt} {}
    UnistylesState(const UnistylesState&) = delete;
    UnistylesState(const UnistylesState&&) = delete;

    bool hasUserConfig = false;
    bool hasAdaptiveThemes();
    bool hasInitialTheme();
    bool getPrefersAdaptiveThemes();
    void setTheme(std::string themeName);
    bool hasTheme(std::string themeName);
    std::optional<std::string>& getCurrentThemeName();
    std::vector<std::string> getRegisteredThemeNames();
    std::optional<std::string> getInitialTheme();
    std::optional<std::string> getCurrentBreakpointName();
    std::vector<std::pair<std::string, double>> getSortedBreakpointPairs();

    jsi::Object getCurrentJSTheme();
    jsi::Object getJSThemeByName(std::string& themeName);
    int parseColor(jsi::Value& color);
    jsi::Array parseBoxShadowString(std::string&& boxShadowString);
    void computeCurrentBreakpoint(int screenWidth);
    void registerProcessColorFunction(jsi::Function&& fn);
    void registerParseBoxShadowString(jsi::Function&& fn);

private:
    jsi::Runtime* _rt;
    std::unordered_map<std::string, jsi::Value> _jsThemes{};
    std::optional<bool> _prefersAdaptiveThemes = std::nullopt;
    std::optional<std::string> _initialThemeName = std::nullopt;
    std::optional<std::string> _currentBreakpointName = std::nullopt;
    std::vector<std::pair<std::string, double>> _sortedBreakpointPairs{};
    std::vector<std::string> _registeredThemeNames{};
    std::optional<std::string> _currentThemeName = std::nullopt;
    std::shared_ptr<jsi::Function> _processColorFn;
    std::shared_ptr<jsi::Function> _parseBoxShadowStringFn;
    std::unordered_map<std::string, uint32_t> _colorCache{};

    friend class UnistylesRegistry;
};

}



================================================
FILE: cxx/core/UnistyleWrapper.cpp
================================================
#include "UnistyleWrapper.h"

using namespace margelo::nitro::unistyles;

core::UnistyleWrapper::~UnistyleWrapper() = default;



================================================
FILE: cxx/core/UnistyleWrapper.h
================================================
#pragma once

#include <jsi/jsi.h>
#include "Unistyle.h"
#include "UnistylesRegistry.h"
#include "Helpers.h"
#include "HybridUnistylesRuntime.h"
#include "UnistylesConstants.h"
#include "Parser.h"

namespace margelo::nitro::unistyles::core {

struct UnistyleWrapper: public jsi::NativeState {
    explicit UnistyleWrapper(Unistyle::Shared unistyle)
        : unistyle(std::move(unistyle)) {}

    ~UnistyleWrapper() override;

    Unistyle::Shared unistyle;
};

inline static Unistyle::Shared unistyleFromStaticStyleSheet(jsi::Runtime& rt, jsi::Object& value) {
    auto exoticUnistyle = std::make_shared<Unistyle>(
        helpers::HashGenerator::generateHash(helpers::EXOTIC_STYLE_KEY),
        UnistyleType::Object,
        helpers::EXOTIC_STYLE_KEY,
        value,
        nullptr
    );

    exoticUnistyle->seal();

    return exoticUnistyle;
}

inline static std::vector<std::string> getUnistylesHashKeys(jsi::Runtime& rt, jsi::Object& object) {
    std::vector<std::string> matchingKeys{};
    const std::string prefix = "unistyles_";

    auto propertyNames = object.getPropertyNames(rt);
    size_t length = propertyNames.length(rt);

    for (size_t i = 0; i < length; i++) {
        auto propertyName = propertyNames.getValueAtIndex(rt, i).getString(rt);
        std::string key = propertyName.utf8(rt);

        if (key.compare(0, prefix.length(), prefix) == 0) {
            matchingKeys.push_back(key);
        }
    }

    return matchingKeys;
}

inline static std::vector<Unistyle::Shared> unistylesFromHashKeys(jsi::Runtime& rt, jsi::Object& object, std::vector<std::string> keys) {
    std::vector<Unistyle::Shared> unistyles{};
    auto& registry = UnistylesRegistry::get();

    for (auto& key: keys) {
        unistyles.emplace_back(registry.getUnistyleById(rt, key));
    }

    return unistyles;
}

inline static std::vector<Unistyle::Shared> unistylesFromNonExistentNativeState(jsi::Runtime& rt, jsi::Object& value) {
    auto unistyleHashKeys = getUnistylesHashKeys(rt, value);

    // return wrapped RN/inline style
    if (unistyleHashKeys.empty()) {
        return {unistyleFromStaticStyleSheet(rt, value)};
    }

    // last chance to fallback and get unistyle based on hash
    auto unistyles = unistylesFromHashKeys(rt, value, unistyleHashKeys);
    auto areValid = std::all_of(unistyles.begin(), unistyles.end(), [](Unistyle::Shared unistyle){
        return unistyle != nullptr;
    });

    if (!areValid) {
        throw jsi::JSError(rt, R"(Unistyles: Style is not bound!

You likely altered unistyle hash key and we're not able to recover C++ state attached to this node.)");
    }

    // someone merged unistyles, and will be warned in JS
    // the best we can do is to return first unistyle
    if (unistyles.size() > 1) {
        return {unistyles.at(0)};
    }

    return unistyles;
}

inline static std::vector<Unistyle::Shared> unistyleFromValue(jsi::Runtime& rt, const jsi::Value& value) {
    if (value.isNull() || !value.isObject()) {
        return {};
    }

    auto maybeArray = value.asObject(rt);

    helpers::assertThat(rt, maybeArray.isArray(rt), "Unistyles: can't retrieve Unistyle state from node as it's not an array.");

    std::vector<Unistyle::Shared> unistyles;
    jsi::Array unistylesArray = maybeArray.asArray(rt);

    helpers::iterateJSIArray(rt, unistylesArray, [&rt, &unistyles](size_t index, jsi::Value& value){
        auto obj = value.getObject(rt);

        // possible if user used React Native styles or inline styles or did spread styles
        if (!obj.hasNativeState(rt)) {
            auto exoticUnistyles = unistylesFromNonExistentNativeState(rt, obj);

            for (auto& exoticUnistyle: exoticUnistyles) {
                unistyles.emplace_back(exoticUnistyle);
            }

            return;
        }

        unistyles.emplace_back(value.getObject(rt).getNativeState<UnistyleWrapper>(rt)->unistyle);
    });

    return unistyles;
}

inline static jsi::Value objectFromUnistyle(jsi::Runtime& rt, std::shared_ptr<HybridUnistylesRuntime> unistylesRuntime, Unistyle::Shared unistyle, Variants& variants, std::optional<jsi::Array> arguments) {
    auto wrappedUnistyle = std::make_shared<UnistyleWrapper>(unistyle);
    auto unistyleID = jsi::PropNameID::forUtf8(rt, unistyle->unid);

    jsi::Object obj = jsi::Object(rt);

    obj.setNativeState(rt, std::move(wrappedUnistyle));

    auto secrets = jsi::Object(rt);

    auto parsedArguments = arguments.has_value()
        ? helpers::parseDynamicFunctionArguments(rt, arguments.value())
        : std::optional<std::vector<folly::dynamic>>{};

    if (arguments.has_value()) {
        // this is required for HybridShadowRegistry::link
        helpers::defineHiddenProperty(rt, secrets, helpers::ARGUMENTS.c_str(), arguments.value());
    }

    // this is required for HybridShadowRegistry::link
    helpers::defineHiddenProperty(rt, secrets, helpers::STYLESHEET_VARIANTS.c_str(), helpers::variantsToValue(rt, variants));

    // this is required for withUnistyles
    helpers::defineHiddenProperty(rt, secrets, helpers::STYLE_DEPENDENCIES.c_str(), helpers::dependenciesToJSIArray(rt, unistyle->dependencies));

    // this is required for withUnistyles
    auto hostFn = jsi::Function::createFromHostFunction(
        rt,
        jsi::PropNameID::forUtf8(rt, helpers::GET_STYLES.c_str()),
        0,
        [unistyleID = unistyle->unid, unistylesRuntime, variants, parsedArguments](jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count
    ) {
        auto& registry = UnistylesRegistry::get();
        auto unistyle = registry.getUnistyleById(rt, unistyleID);

        parser::Parser(unistylesRuntime).rebuildUnistyle(rt, unistyle, variants, parsedArguments);

        return jsi::Value(rt, unistyle->parsedStyle.value()).asObject(rt);
    });

    helpers::defineHiddenProperty(rt, secrets, helpers::GET_STYLES.c_str(), std::move(hostFn));

    obj.setProperty(rt, unistyleID, secrets);

    helpers::mergeJSIObjects(rt, obj, unistyle->parsedStyle.value());

    return obj;
}

inline static jsi::Value valueFromUnistyle(jsi::Runtime& rt, std::shared_ptr<HybridUnistylesRuntime> unistylesRuntime, Unistyle::Shared unistyle, Variants& variants) {
    if (unistyle->type == UnistyleType::Object) {
        return objectFromUnistyle(rt, unistylesRuntime, unistyle, variants, std::nullopt);
    }

    auto wrappedUnistyle = std::make_shared<UnistyleWrapper>(unistyle);
    auto unistyleID = jsi::PropNameID::forUtf8(rt, unistyle->unid);

    auto unistyleFn = std::dynamic_pointer_cast<UnistyleDynamicFunction>(unistyle);
    auto hostFn = jsi::Value(rt, unistyleFn->proxiedFunction.value()).asObject(rt).asFunction(rt);

    hostFn.setNativeState(rt, std::move(wrappedUnistyle));
    hostFn.setProperty(rt, unistyleID, jsi::Object(rt));

    return std::move(hostFn);
}

}



================================================
FILE: cxx/hybridObjects/HybridNavigationBar.cpp
================================================
#include "HybridNavigationBar.h"

void HybridNavigationBar::setHidden(bool isHidden) {
    this->_nativePlatform->setNavigationBarHidden(isHidden);
};

double HybridNavigationBar::getWidth() {
    return this->_nativePlatform->getNavigationBarDimensions().width;
}

double HybridNavigationBar::getHeight() {
    return this->_nativePlatform->getNavigationBarDimensions().height;
}



================================================
FILE: cxx/hybridObjects/HybridNavigationBar.h
================================================
#pragma once

#include "HybridUnistylesNavigationBarSpec.hpp"
#include "NativePlatform.h"
#include <optional>

using namespace margelo::nitro::unistyles;

struct HybridNavigationBar: public HybridUnistylesNavigationBarSpec {
    HybridNavigationBar(std::shared_ptr<HybridNativePlatformSpec> nativePlatform): HybridObject(TAG), _nativePlatform{nativePlatform} {}

    void setHidden(bool isHidden) override;
    double getWidth() override;
    double getHeight() override;

private:
    std::shared_ptr<HybridNativePlatformSpec> _nativePlatform;
};



================================================
FILE: cxx/hybridObjects/HybridShadowRegistry.cpp
================================================
#include "HybridShadowRegistry.h"

using namespace margelo::nitro::unistyles;
using namespace facebook::react;

jsi::Value HybridShadowRegistry::link(jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) {
    helpers::assertThat(rt, count == 2, "Unistyles: Invalid babel transform 'ShadowRegistry link' expected 2 arguments.");

    auto shadowNodeWrapper = getShadowNodeFromRef(rt, args[0]);

    std::vector<core::Unistyle::Shared> unistyleWrappers = core::unistyleFromValue(rt, args[1]);
    std::vector<std::vector<folly::dynamic>> arguments;
    auto& registry = core::UnistylesRegistry::get();

    // this is special case for Animated, and prevents appending same unistyles to node
    registry.removeDuplicatedUnistyles(rt, &shadowNodeWrapper->getFamily(), unistyleWrappers);

    if (unistyleWrappers.empty()) {
        return jsi::Value::undefined();
    }

    for (size_t i = 0; i < unistyleWrappers.size(); i++) {
        if (unistyleWrappers[i]->type == core::UnistyleType::DynamicFunction) {
            try {
                auto rawStyle = args[1].asObject(rt).asArray(rt).getValueAtIndex(rt, i);
                auto rawStyleObj = rawStyle.getObject(rt);
                auto unistyleHashKeys = core::getUnistylesHashKeys(rt, rawStyleObj);
                auto secrets = rawStyleObj.getProperty(rt, unistyleHashKeys.at(0).c_str()).asObject(rt);
                auto secretArguments = secrets.getProperty(rt, helpers::ARGUMENTS.c_str()).asObject(rt).asArray(rt);

                arguments.push_back(helpers::parseDynamicFunctionArguments(rt, secretArguments));

                continue;
            } catch (...) {
                arguments.push_back({});
            }
        }

        arguments.push_back({});
    }

    auto scopedTheme = registry.getScopedTheme();

    // check if scope theme exists
    if (scopedTheme.has_value()) {
        auto themeName = scopedTheme.value();

        helpers::assertThat(rt, registry.getState(rt).hasTheme(themeName), "Unistyles: You're trying to use scoped theme '" + themeName + "' but it wasn't registered.");
    }

    auto parser = parser::Parser(this->_unistylesRuntime);
    std::vector<std::shared_ptr<core::UnistyleData>> unistylesData{};

    // create unistyleData based on wrappers
    for (size_t i = 0; i < unistyleWrappers.size(); i++) {
        core::Unistyle::Shared& unistyle = unistyleWrappers[i];
        auto rawStyle = args[1].asObject(rt).asArray(rt).getValueAtIndex(rt, i);
        auto rawStyleObj = rawStyle.getObject(rt);
        auto unistyleHashKeys = core::getUnistylesHashKeys(rt, rawStyleObj);
        core::Variants variants{};

        if (unistyleHashKeys.size() == 1) {
            auto secrets = rawStyleObj.getProperty(rt, unistyleHashKeys.at(0).c_str()).asObject(rt);
            auto hasVariants = secrets.hasProperty(rt, helpers::STYLESHEET_VARIANTS.c_str());

            if (hasVariants) {
                variants = helpers::variantsToPairs(rt, secrets.getProperty(rt, helpers::STYLESHEET_VARIANTS.c_str()).asObject(rt));
            }
        }

        std::shared_ptr<core::UnistyleData> unistyleData = std::make_shared<core::UnistyleData>(
            unistyle,
            variants,
            arguments[i],
            scopedTheme
        );

        // before linking we need to check if given unistyle is affected by scoped theme
        if (scopedTheme.has_value() && unistyle->styleKey != helpers::EXOTIC_STYLE_KEY) {
            auto parsedStyleSheet = parser.getParsedStyleSheetForScopedTheme(rt, unistyle, scopedTheme.value());

            // if so we need to force update
            parser.rebuildUnistyleWithScopedTheme(rt, parsedStyleSheet, unistyleData);
        }

        unistylesData.emplace_back(unistyleData);
    }

    registry.linkShadowNodeWithUnistyle(
        rt,
        &shadowNodeWrapper->getFamily(),
        unistylesData
    );

    return jsi::Value::undefined();
}

jsi::Value HybridShadowRegistry::unlink(jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) {
    helpers::assertThat(rt, count == 1, "Unistyles: Invalid babel transform 'ShadowRegistry unlink' expected 1 argument.");

    auto shadowNodeWrapper = getShadowNodeFromRef(rt, args[0]);

    auto& registry = core::UnistylesRegistry::get();

    registry.unlinkShadowNodeWithUnistyles(rt, &shadowNodeWrapper->getFamily());

    return jsi::Value::undefined();
}

jsi::Value HybridShadowRegistry::flush(jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) {
    shadow::ShadowTreeManager::updateShadowTree(rt);

    return jsi::Value::undefined();
}

jsi::Value HybridShadowRegistry::setScopedTheme(jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) {
    helpers::assertThat(rt, count == 1, "Unistyles: setScopedTheme expected 1 argument.");

    auto& registry = core::UnistylesRegistry::get();

    if (args[0].isUndefined()) {
        registry.setScopedTheme(std::nullopt);
    }

    if (args[0].isString()) {
        registry.setScopedTheme(args[0].asString(rt).utf8(rt));
    }

    return jsi::Value::undefined();
}

jsi::Value HybridShadowRegistry::getScopedTheme(jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) {
    auto& registry = core::UnistylesRegistry::get();
    auto maybeScopedTheme = registry.getScopedTheme();

    return maybeScopedTheme.has_value()
        ? jsi::String::createFromUtf8(rt, maybeScopedTheme.value())
        : jsi::Value::undefined();
}

std::shared_ptr<const core::ShadowNode> HybridShadowRegistry::getShadowNodeFromRef(jsi::Runtime& rt, const jsi::Value& maybeRef) {
#if REACT_NATIVE_VERSION_MINOR >= 81
    return Bridging<std::shared_ptr<const ShadowNode>>::fromJs(rt, maybeRef);
#else
    return shadowNodeFromValue(rt, maybeRef);
#endif
}



================================================
FILE: cxx/hybridObjects/HybridShadowRegistry.h
================================================
#pragma once

#include "HybridUnistylesShadowRegistrySpec.hpp"
#include <react/renderer/uimanager/primitives.h>
#include "UnistyleWrapper.h"
#include "UnistylesState.h"
#include "UnistylesRegistry.h"
#include "ShadowTreeManager.h"
#include <cxxreact/ReactNativeVersion.h>

namespace margelo::nitro::unistyles {

struct HybridShadowRegistry: public HybridUnistylesShadowRegistrySpec {
    HybridShadowRegistry(std::shared_ptr<HybridUnistylesRuntime> unistylesRuntime)
        : HybridObject(TAG), _unistylesRuntime{unistylesRuntime} {}

    jsi::Value link(jsi::Runtime& rt,
                            const jsi::Value& thisValue,
                            const jsi::Value* args,
                            size_t count);
    jsi::Value unlink(jsi::Runtime& rt,
                            const jsi::Value& thisValue,
                            const jsi::Value* args,
                            size_t count);
    jsi::Value flush(jsi::Runtime& rt,
                            const jsi::Value& thisValue,
                            const jsi::Value* args,
                            size_t count);
    jsi::Value setScopedTheme(jsi::Runtime& rt,
                            const jsi::Value& thisValue,
                            const jsi::Value* args,
                            size_t count);
    jsi::Value getScopedTheme(jsi::Runtime& rt,
                            const jsi::Value& thisValue,
                            const jsi::Value* args,
                            size_t count);

    void loadHybridMethods() override {
        HybridUnistylesShadowRegistrySpec::loadHybridMethods();

        registerHybrids(this, [](Prototype& prototype) {
            prototype.registerRawHybridMethod("link", 2, &HybridShadowRegistry::link);
            prototype.registerRawHybridMethod("unlink", 1, &HybridShadowRegistry::unlink);
            prototype.registerRawHybridMethod("flush", 0, &HybridShadowRegistry::flush);
            prototype.registerRawHybridMethod("setScopedTheme", 1, &HybridShadowRegistry::setScopedTheme);
            prototype.registerRawHybridMethod("getScopedTheme", 0, &HybridShadowRegistry::getScopedTheme);
        });
    };
    
    std::shared_ptr<const core::ShadowNode> getShadowNodeFromRef(jsi::Runtime& rt, const jsi::Value& maybeRef);

private:
    std::shared_ptr<HybridUnistylesRuntime> _unistylesRuntime;
};

}



================================================
FILE: cxx/hybridObjects/HybridStatusBar.cpp
================================================
#include "HybridStatusBar.h"

double HybridStatusBar::getWidth() {
    return this->_nativePlatform->getStatusBarDimensions().width;
}

double HybridStatusBar::getHeight() {
    return this->_nativePlatform->getStatusBarDimensions().height;
}

void HybridStatusBar::setHidden(bool isHidden) {
    this->_nativePlatform->setStatusBarHidden(isHidden);
}



================================================
FILE: cxx/hybridObjects/HybridStatusBar.h
================================================
#pragma once

#include "HybridUnistylesStatusBarSpec.hpp"
#include "NativePlatform.h"
#include <optional>

using namespace margelo::nitro::unistyles;

struct HybridStatusBar: public HybridUnistylesStatusBarSpec {
    HybridStatusBar(std::shared_ptr<HybridNativePlatformSpec> nativePlatform): HybridObject(TAG), _nativePlatform{nativePlatform} {}

    double getWidth() override;
    double getHeight() override;
    void setHidden(bool isHidden) override;

private:
    std::shared_ptr<HybridNativePlatformSpec> _nativePlatform;
};



================================================
FILE: cxx/hybridObjects/HybridStyleSheet.cpp
================================================
#include "HybridStyleSheet.h"

using namespace facebook::react;

double HybridStyleSheet::getHairlineWidth() {
    double pixelRatio = this->_unistylesRuntime->getPixelRatio();
    double hairlineWidth = std::round(pixelRatio * 0.4) / pixelRatio;

    if (hairlineWidth == 0.0) {
        hairlineWidth = 1.0 / pixelRatio;
    }

    return hairlineWidth;
}

double HybridStyleSheet::getUnid() {
    return this->__unid;
}

jsi::Value HybridStyleSheet::create(jsi::Runtime& rt, const jsi::Value &thisVal, const jsi::Value *arguments, size_t count) {
    if (count == 1) {
        helpers::assertThat(rt, false, "Unistyles is not initialized correctly. Please add babel plugin to your babel config.");
    }

    // second argument is hidden, so validation is perfectly fine
    helpers::assertThat(rt, count == 2, "StyleSheet.create expected to be called with one argument.");
    helpers::assertThat(rt, arguments[0].isObject(), "StyleSheet.create expected to be called with object or function.");

    auto thisStyleSheet = thisVal.asObject(rt);
    auto& registry = core::UnistylesRegistry::get();
    int unid = arguments[1].asNumber();

    jsi::Object rawStyleSheet = arguments[0].asObject(rt);
    auto registeredStyleSheet = registry.addStyleSheetFromValue(rt, std::move(rawStyleSheet), unid);

    this->__unid = registeredStyleSheet->tag;

    auto parser = parser::Parser(this->_unistylesRuntime);

    parser.buildUnistyles(rt, registeredStyleSheet);
    parser.parseUnistyles(rt, registeredStyleSheet);

    return core::toRNStyle(rt, registeredStyleSheet, this->_unistylesRuntime, {});
}

jsi::Value HybridStyleSheet::configure(jsi::Runtime &rt, const jsi::Value &thisVal, const jsi::Value *arguments, size_t count) {
    helpers::assertThat(rt, count == 1, "StyleSheet.configure expected to be called with one argument.");
    helpers::assertThat(rt, arguments[0].isObject(), "StyleSheet.configure expected to be called with object.");

    auto config = arguments[0].asObject(rt);

    helpers::enumerateJSIObject(rt, config, [&](const std::string& propertyName, jsi::Value& propertyValue){
        if (propertyName == "settings") {
            helpers::assertThat(rt, propertyValue.isObject(), "StyleSheet.configure's settings must be an object.");

            return this->parseSettings(rt, propertyValue.asObject(rt));
        }

        if (propertyName == "breakpoints") {
            helpers::assertThat(rt, propertyValue.isObject(), "StyleSheet.configure's breakpoints must be an object.");

            return this->parseBreakpoints(rt, propertyValue.asObject(rt));
        }

        if (propertyName == "themes") {
            helpers::assertThat(rt, propertyValue.isObject(), "StyleSheet.configure's themes must be an object.");

            return this->parseThemes(rt, propertyValue.asObject(rt));
        }

        helpers::assertThat(rt, false, "StyleSheet.configure received unexpected key: '" + std::string(propertyName) + "'.");
    });

    verifyAndSelectTheme(rt);

    auto& state = core::UnistylesRegistry::get().getState(rt);

    state.hasUserConfig = true;

    return jsi::Value::undefined();
}

jsi::Value HybridStyleSheet::init(jsi::Runtime &rt, const jsi::Value &thisVal, const jsi::Value *arguments, size_t count) {
    if (this->isInitialized) {
        return jsi::Value::undefined();
    }

    // create new state
    auto& registry = core::UnistylesRegistry::get();

    registry.createState(rt);

    loadExternalMethods(thisVal, rt);

    this->isInitialized = true;

    return jsi::Value::undefined();
}

void HybridStyleSheet::parseSettings(jsi::Runtime &rt, jsi::Object settings) {
    auto& registry = core::UnistylesRegistry::get();

    helpers::enumerateJSIObject(rt, settings, [&](const std::string& propertyName, jsi::Value& propertyValue){
        if (propertyName == "adaptiveThemes") {
            helpers::assertThat(rt, propertyValue.isBool(), "StyleSheet.configure's adaptiveThemes must be of boolean type.");

            registry.setPrefersAdaptiveThemes(rt, propertyValue.asBool());

            return;
        }

        if (propertyName == "initialTheme") {
            if (propertyValue.isObject()) {
                helpers::assertThat(rt, propertyValue.asObject(rt).isFunction(rt), "StyleSheet.configure's initialTheme must be either a string or a function.");

                auto result = propertyValue.asObject(rt).asFunction(rt).call(rt);

                helpers::assertThat(rt, result.isString(), "StyleSheet.configure's initialTheme resolved from function is not a string. Please check your initialTheme function.");

                return registry.setInitialThemeName(rt, result.asString(rt).utf8(rt));
            }

            helpers::assertThat(rt, propertyValue.isString(), "StyleSheet.configure's initialTheme must be either a string or a function.");

            registry.setInitialThemeName(rt, propertyValue.asString(rt).utf8(rt));

            return;
        }

        if (propertyName == "CSSVars") {
            return;
        }

        if (propertyName == "nativeBreakpointsMode") {
            helpers::assertThat(rt, propertyValue.isString(), "StyleSheet.configure's nativeBreakpointsMode must be a string");

            auto mode = propertyValue.asString(rt).utf8(rt);

            helpers::assertThat(rt, mode == "pixels" || mode == "points", "StyleSheet.configure's nativeBreakpointsMode must be one of: pixels or points");

            if (mode == "points") {
                registry.shouldUsePointsForBreakpoints = true;
            }

            return;
        }

        helpers::assertThat(rt, false, "StyleSheet.configure's settings received unexpected key: '" + std::string(propertyName) + "'");
    });
}

void HybridStyleSheet::parseBreakpoints(jsi::Runtime &rt, jsi::Object breakpoints){
    helpers::Breakpoints sortedBreakpoints = helpers::jsiBreakpointsToVecPairs(rt, std::move(breakpoints));

    helpers::assertThat(rt, !sortedBreakpoints.empty(), "StyleSheet.configure's breakpoints can't be empty.");
    helpers::assertThat(rt, sortedBreakpoints.front().second == 0, "StyleSheet.configure's first breakpoint must start from 0.");

    auto& registry = core::UnistylesRegistry::get();
    auto& state = registry.getState(rt);

    registry.registerBreakpoints(rt, sortedBreakpoints);

    auto rawWidth = this->_unistylesRuntime->getScreen().width;
    auto width = registry.shouldUsePointsForBreakpoints
        ? rawWidth / this->_unistylesRuntime->getPixelRatio()
        : rawWidth;

    state.computeCurrentBreakpoint(width);
}

void HybridStyleSheet::parseThemes(jsi::Runtime &rt, jsi::Object themes) {
    auto& registry = core::UnistylesRegistry::get();

    helpers::enumerateJSIObject(rt, themes, [&](const std::string& propertyName, jsi::Value& propertyValue){
        helpers::assertThat(rt, propertyValue.isObject(), "StyleSheet.configure's registered theme '" + propertyName + "' must be an object.");

        registry.registerTheme(rt, propertyName, propertyValue);
    });
}

void HybridStyleSheet::verifyAndSelectTheme(jsi::Runtime &rt) {
    auto& state = core::UnistylesRegistry::get().getState(rt);

    bool hasInitialTheme = state.hasInitialTheme();
    bool prefersAdaptiveThemes = state.getPrefersAdaptiveThemes();
    bool hasAdaptiveThemes = state.hasAdaptiveThemes();
    std::vector<std::string> registeredThemeNames = state.getRegisteredThemeNames();
    bool hasSingleTheme = registeredThemeNames.size() == 1;

    // user tries to enable adaptive themes, but didn't register both 'light' and 'dark' themes
    if (prefersAdaptiveThemes && !hasAdaptiveThemes) {
        helpers::assertThat(rt, false, "Unistyles: You're trying to enable adaptiveThemes, but you didn't register both 'light' and 'dark' themes.");
    }

    // user didn't select initial theme nor can have adaptive themes, and registered more than 1 theme
    // do nothing - user must select initial theme during runtime
    if (!hasInitialTheme && !hasAdaptiveThemes && !hasSingleTheme) {
        return;
    }

    // user didn't select initial theme nor can have adaptive themes, but registered exactly 1 theme
    // preselect it!
    if (!hasInitialTheme && !hasAdaptiveThemes && hasSingleTheme) {
        return state.setTheme(registeredThemeNames.at(0));
    }

    // user didn't select initial theme, but has adaptive themes
    // simply select theme based on color scheme
    if (!hasInitialTheme && hasAdaptiveThemes) {
        return this->setThemeFromColorScheme(rt);
    }

    // user selected both initial theme and adaptive themes
    // we should throw an error as these options are mutually exclusive
    if (hasInitialTheme && hasAdaptiveThemes) {
        helpers::assertThat(rt, false, "Unistyles: You're trying to set initial theme and enable adaptiveThemes, but these options are mutually exclusive.");
    }

    // user only selected initial theme
    // validate if following theme exist
    std::string selectedTheme = state.getInitialTheme().value();

    helpers::assertThat(rt, state.hasTheme(selectedTheme), "Unistyles: You're trying to select theme '" + selectedTheme + "' but it wasn't registered.");

    state.setTheme(selectedTheme);
}

void HybridStyleSheet::setThemeFromColorScheme(jsi::Runtime& rt) {
    auto& state = core::UnistylesRegistry::get().getState(rt);
    auto colorScheme = static_cast<ColorScheme>(this->_unistylesRuntime->getColorScheme());

    switch (colorScheme) {
        case ColorScheme::LIGHT:
            state.setTheme("light");

            return;
        case ColorScheme::DARK:
            state.setTheme("dark");

            return;
        default:
            throw std::runtime_error("Unistyles: Unable to set adaptive theme as your device doesn't support it.");
    }
}

void HybridStyleSheet::loadExternalMethods(const jsi::Value& thisValue, jsi::Runtime& rt) {
    auto jsMethods = thisValue.getObject(rt).getProperty(rt, "jsMethods");

    helpers::assertThat(rt, jsMethods.isObject(), "Unistyles: Can't find jsMethods.");

    auto maybeProcessColorFn = jsMethods.asObject(rt).getProperty(rt, "processColor");

    helpers::assertThat(rt, maybeProcessColorFn.isObject(), "Unistyles: Can't load processColor function from JS.");
    
    auto maybeParseBoxShadowStringFn = jsMethods.asObject(rt).getProperty(rt, "parseBoxShadowString");
    
    helpers::assertThat(rt, maybeParseBoxShadowStringFn.isObject(), "Unistyles: Can't load parseBoxShadowString function from JS.");

    auto processColorFn = maybeProcessColorFn.asObject(rt).asFunction(rt);
    auto parseBoxShadowStringFn = maybeParseBoxShadowStringFn.asObject(rt).asFunction(rt);
    auto& registry = core::UnistylesRegistry::get();
    auto& state = registry.getState(rt);

    state.registerProcessColorFunction(std::move(processColorFn));
    state.registerParseBoxShadowString(std::move(parseBoxShadowStringFn));
}

void HybridStyleSheet::onPlatformDependenciesChange(std::vector<UnistyleDependency> dependencies) {
    // this event listener is triggered from C++ module, and it's only about theme / adaptive theme changes
    if (dependencies.size() == 0) {
        return;
    }

    auto& registry = core::UnistylesRegistry::get();
    auto& rt = this->_unistylesRuntime->getRuntime();
    auto parser = parser::Parser(this->_unistylesRuntime);
    auto dependencyMap = registry.buildDependencyMap(rt, dependencies);

    if (dependencyMap.empty()) {
        this->notifyJSListeners(dependencies);
    }

    // in a later step, we will rebuild only Unistyles with mounted StyleSheets
    // however, user may have StyleSheets with components that haven't mounted yet
    // we need to rebuild all dependent StyleSheets as well
    auto dependentStyleSheets = registry.getStyleSheetsToRefresh(rt, dependencies);

    parser.rebuildUnistylesInDependencyMap(rt, dependencyMap, dependentStyleSheets, std::nullopt);

    // we need to stop here if there is nothing to update at the moment,
    // but we need to compute dependentStyleSheets
    if (dependencyMap.empty()) {
        return;
    }

    parser.rebuildShadowLeafUpdates(rt, dependencyMap);

    this->notifyJSListeners(dependencies);
    shadow::ShadowTreeManager::updateShadowTree(rt);
}

void HybridStyleSheet::onPlatformNativeDependenciesChange(std::vector<UnistyleDependency> dependencies, UnistylesNativeMiniRuntime miniRuntime) {
    // this event listener is triggered from Native platform
    if (dependencies.size() == 0 || this->_unistylesRuntime == nullptr) {
        return;
    }

    this->_unistylesRuntime->runOnJSThread([this, dependencies, miniRuntime](jsi::Runtime& rt){
        auto& registry = core::UnistylesRegistry::get();
        auto parser = parser::Parser(this->_unistylesRuntime);
        auto unistyleDependencies = std::move(dependencies);

        // re-compute new breakpoint
        auto dimensionsIt = std::find(dependencies.begin(), dependencies.end(), UnistyleDependency::DIMENSIONS);

        if (dimensionsIt != dependencies.end()) {
            auto rawWidth = this->_unistylesRuntime->getScreen().width;
            auto width = registry.shouldUsePointsForBreakpoints
                ? rawWidth / this->_unistylesRuntime->getPixelRatio()
                : rawWidth;

            registry.getState(rt).computeCurrentBreakpoint(width);
        }

        // check if color scheme changed and then if Unistyles state depend on it (adaptive themes)
        auto colorSchemeIt = std::find(dependencies.begin(), dependencies.end(), UnistyleDependency::COLORSCHEME);
        auto hasNewColorScheme = colorSchemeIt != dependencies.end();

        if (hasNewColorScheme) {
            this->_unistylesRuntime->includeDependenciesForColorSchemeChange(unistyleDependencies);
        }

        auto dependencyMap = registry.buildDependencyMap(rt, unistyleDependencies);

        if (dependencyMap.empty()) {
            this->notifyJSListeners(unistyleDependencies);
        }

        // in a later step, we will rebuild only Unistyles with mounted StyleSheets
        // however, user may have StyleSheets with components that haven't mounted yet
        // we need to rebuild all dependent StyleSheets as well
        auto dependentStyleSheets = registry.getStyleSheetsToRefresh(rt, unistyleDependencies);

        parser.rebuildUnistylesInDependencyMap(rt, dependencyMap, dependentStyleSheets, miniRuntime);

        // we need to stop here if there is nothing to update at the moment,
        // but we need to compute dependentStyleSheets
        if (dependencyMap.empty()) {
            return;
        }

        parser.rebuildShadowLeafUpdates(rt, dependencyMap);

        this->notifyJSListeners(unistyleDependencies);
        shadow::ShadowTreeManager::updateShadowTree(rt);
    });
}

void HybridStyleSheet::onImeChange(UnistylesNativeMiniRuntime miniRuntime) {
    if (this->_unistylesRuntime == nullptr) {
        return;
    }

    this->_unistylesRuntime->runOnJSThread([this, miniRuntime](jsi::Runtime& rt){
        std::vector<UnistyleDependency> dependencies{UnistyleDependency::IME};
        auto& registry = core::UnistylesRegistry::get();
        auto parser = parser::Parser(this->_unistylesRuntime);
        auto dependencyMap = registry.buildDependencyMap(rt, dependencies);

        if (dependencyMap.empty()) {
            this->notifyJSListeners(dependencies);

            return;
        }

        // we don't care about other unmounted stylesheets as their not visible
        // so user won't see any changes
        std::vector<std::shared_ptr<core::StyleSheet>> dependentStyleSheets;

        parser.rebuildUnistylesInDependencyMap(rt, dependencyMap, dependentStyleSheets, miniRuntime);
        parser.rebuildShadowLeafUpdates(rt, dependencyMap);

        this->notifyJSListeners(dependencies);
        shadow::ShadowTreeManager::updateShadowTree(rt);
    });
}

void HybridStyleSheet::notifyJSListeners(std::vector<UnistyleDependency>& dependencies) {
    if (!dependencies.empty()) {
        std::for_each(this->_changeListeners.begin(), this->_changeListeners.end(), [&](auto& listener){
            (*listener)(dependencies);
        });
    }
}

std::function<void ()> HybridStyleSheet::addChangeListener(const std::function<void (const std::vector<UnistyleDependency>&)>& onChanged) {
    auto listener = std::make_unique<std::function<void(std::vector<UnistyleDependency>&)>>(onChanged);

    this->_changeListeners.push_back(std::move(listener));

    return [this, listenerPtr = this->_changeListeners.back().get()](){
        auto it = std::find_if(this->_changeListeners.begin(), this->_changeListeners.end(), [listenerPtr](auto& ptr) {
            return ptr.get() == listenerPtr;
        });

        if (it != this->_changeListeners.end()) {
            this->_changeListeners.erase(it);
        }
    };
}



================================================
FILE: cxx/hybridObjects/HybridStyleSheet.h
================================================
#pragma once

#include <cmath>
#include <jsi/jsi.h>
#include "HybridUnistylesRuntime.h"
#include "HybridUnistylesStyleSheetSpec.hpp"
#include "RNStyle.h"
#include "Helpers.h"
#include "UnistylesConstants.h"
#include "Breakpoints.h"
#include "Parser.h"
#include "ShadowTreeManager.h"

using namespace margelo::nitro::unistyles;
using namespace facebook::react;

struct HybridStyleSheet: public HybridUnistylesStyleSheetSpec {
    HybridStyleSheet(std::shared_ptr<HybridUnistylesRuntime> unistylesRuntime): HybridObject(TAG), _unistylesRuntime{unistylesRuntime} {
            this->_unistylesRuntime->registerPlatformListener(
                  std::bind(&HybridStyleSheet::onPlatformDependenciesChange, this, std::placeholders::_1)
            );
            this->_unistylesRuntime->registerNativePlatformListener(
                  std::bind(&HybridStyleSheet::onPlatformNativeDependenciesChange, this, std::placeholders::_1, std::placeholders::_2)
            );
            this->_unistylesRuntime->registerImeListener(
                  std::bind(&HybridStyleSheet::onImeChange, this, std::placeholders::_1)
            );
      }

    ~HybridStyleSheet() {
        this->_unistylesRuntime->unregisterNativePlatformListeners();
    }

    jsi::Value create(jsi::Runtime& rt,
                      const jsi::Value& thisValue,
                      const jsi::Value* args,
                      size_t count);
    jsi::Value configure(jsi::Runtime& rt,
                      const jsi::Value& thisValue,
                      const jsi::Value* args,
                      size_t count);
    jsi::Value init(jsi::Runtime& rt,
                      const jsi::Value& thisValue,
                      const jsi::Value* args,
                      size_t count);

    void loadHybridMethods() override {
        HybridUnistylesStyleSheetSpec::loadHybridMethods();

        registerHybrids(this, [](Prototype& prototype) {
            prototype.registerRawHybridMethod("init", 1, &HybridStyleSheet::init);
            prototype.registerRawHybridMethod("create", 1, &HybridStyleSheet::create);
            prototype.registerRawHybridMethod("configure", 1, &HybridStyleSheet::configure);
        });
    };

    double getHairlineWidth() override;
    double getUnid() override;
    std::function<void ()> addChangeListener(const std::function<void (const std::vector<UnistyleDependency> &)>& onChanged) override;

private:
    void parseSettings(jsi::Runtime& rt, jsi::Object settings);
    void parseBreakpoints(jsi::Runtime& rt, jsi::Object breakpoints);
    void parseThemes(jsi::Runtime& rt, jsi::Object themes);
    void verifyAndSelectTheme(jsi::Runtime &rt);
    void setThemeFromColorScheme(jsi::Runtime& rt);
    void loadExternalMethods(const jsi::Value& thisValue, jsi::Runtime& rt);
    void onPlatformDependenciesChange(std::vector<UnistyleDependency> dependencies);
    void onPlatformNativeDependenciesChange(std::vector<UnistyleDependency> dependencies, UnistylesNativeMiniRuntime miniRuntime);
    void onImeChange(UnistylesNativeMiniRuntime miniRuntime);
    void notifyJSListeners(std::vector<UnistyleDependency>& dependencies);

    bool isInitialized = false;
    double __unid = -1;
    std::vector<std::unique_ptr<const std::function<void(std::vector<UnistyleDependency>&)>>> _changeListeners{};
    std::shared_ptr<HybridUnistylesRuntime> _unistylesRuntime;
    std::shared_ptr<UIManager> _uiManager;
};




================================================
FILE: cxx/hybridObjects/HybridUnistylesRuntime.cpp
================================================
#include "HybridUnistylesRuntime.h"
#include "UnistylesState.h"

using namespace margelo::nitro::unistyles;

ColorScheme HybridUnistylesRuntime::getColorScheme() {
    auto colorScheme = this->_nativePlatform->getColorScheme();

    return static_cast<ColorScheme>(colorScheme);
}

bool HybridUnistylesRuntime::getHasAdaptiveThemes() {
    auto& state = core::UnistylesRegistry::get().getState(*_rt);

    return state.hasAdaptiveThemes();
};

Dimensions HybridUnistylesRuntime::getScreen() {
    return this->_nativePlatform->getScreenDimensions();
};

std::optional<std::string> HybridUnistylesRuntime::getThemeName() {
    auto& registry = core::UnistylesRegistry::get();
    auto maybeScopedTheme = registry.getScopedTheme();
    
    if (maybeScopedTheme.has_value()) {
        return maybeScopedTheme.value();
    }
    
    auto& state = registry.getState(*_rt);
    
    return state.getCurrentThemeName();
};

std::string HybridUnistylesRuntime::getContentSizeCategory() {
    return this->_nativePlatform->getContentSizeCategory();
};

std::optional<std::string> HybridUnistylesRuntime::getBreakpoint() {
    auto& state = core::UnistylesRegistry::get().getState(*_rt);

    return state.getCurrentBreakpointName();
};

bool HybridUnistylesRuntime::getRtl() {
    return this->_nativePlatform->getPrefersRtlDirection();
}

Insets HybridUnistylesRuntime::getInsets() {
    return this->_nativePlatform->getInsets();
};

Orientation HybridUnistylesRuntime::getOrientation() {
    auto orientation = this->_nativePlatform->getOrientation();

    return static_cast<Orientation>(orientation);
};

bool HybridUnistylesRuntime::getIsLandscape() {
    return this->getOrientation() == Orientation::LANDSCAPE;
}

bool HybridUnistylesRuntime::getIsPortrait() {
    return this->getOrientation() == Orientation::PORTRAIT;
}

double HybridUnistylesRuntime::getPixelRatio() {
    return this->_nativePlatform->getPixelRatio();
};

double HybridUnistylesRuntime::getFontScale() {
    return this->_nativePlatform->getFontScale();
};

std::unordered_map<std::string, double> HybridUnistylesRuntime::getBreakpoints() {
    auto& state = core::UnistylesRegistry::get().getState(*_rt);
    auto sortedBreakpointPairs = state.getSortedBreakpointPairs();
    std::unordered_map<std::string, double> breakpoints{};

    std::for_each(sortedBreakpointPairs.begin(), sortedBreakpointPairs.end(), [&breakpoints](std::pair<std::string, double>& pair){
        breakpoints[pair.first] = pair.second;
    });

    return breakpoints;
}

void HybridUnistylesRuntime::setTheme(const std::string &themeName) {
    helpers::assertThat(*_rt, !this->getHasAdaptiveThemes(), "Unistyles: You're trying to set theme to: '" + themeName + "', but adaptiveThemes are enabled.");

    auto& state = core::UnistylesRegistry::get().getState(*_rt);
    auto currentThemeName = state.getCurrentThemeName();

    state.setTheme(themeName);

    if (currentThemeName.value() != themeName) {
        this->_onDependenciesChange({UnistyleDependency::THEME, UnistyleDependency::THEMENAME});
    }
};

void HybridUnistylesRuntime::setAdaptiveThemes(bool isEnabled) {
    auto& registry = core::UnistylesRegistry::get();

    std::vector<UnistyleDependency> changedDependencies{};

    changedDependencies.reserve(3);

    bool hadAdaptiveThemes = this->getHasAdaptiveThemes();

    registry.setPrefersAdaptiveThemes(*_rt, isEnabled);

    bool haveAdaptiveThemes = this->getHasAdaptiveThemes();

    if (hadAdaptiveThemes != haveAdaptiveThemes) {
        changedDependencies.push_back(UnistyleDependency::ADAPTIVETHEMES);
    }

    // if user disabled it, or can't have adaptive themes, do nothing
    if (!this->getHasAdaptiveThemes()) {
        this->_onDependenciesChange(changedDependencies);

        return;
    }

    // if user enabled adaptive themes, then we need to make sure
    // we selected theme based on color scheme
    this->calculateNewThemeAndDependencies(changedDependencies);
    this->_onDependenciesChange(changedDependencies);
};

void HybridUnistylesRuntime::calculateNewThemeAndDependencies(std::vector<UnistyleDependency>& changedDependencies) {
    auto& state = core::UnistylesRegistry::get().getState(*_rt);
    auto colorScheme = this->getColorScheme();
    auto currentThemeName = this->getThemeName();
    auto nextTheme = colorScheme == ColorScheme::LIGHT
        ? "light"
        : "dark";

    if (!currentThemeName.has_value() || nextTheme != currentThemeName.value()) {
        changedDependencies.push_back(UnistyleDependency::THEME);
        changedDependencies.push_back(UnistyleDependency::THEMENAME);

        state.setTheme(nextTheme);
    }
}

jsi::Value HybridUnistylesRuntime::getTheme(jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) {
    helpers::assertThat(rt, count <= 1, "UnistylesRuntime.getTheme expected to be called with 0 or 1 argument.");

    auto& state = core::UnistylesRegistry::get().getState(*_rt);

    if (count == 1) {
        if (args[0].isUndefined()) {
            return state.getCurrentJSTheme();
        }

        helpers::assertThat(rt, args[0].isString(), "UnistylesRuntime.getTheme expected to be called with string.");

        auto themeName = args[0].asString(rt).utf8(rt);

        helpers::assertThat(rt, state.hasTheme(themeName), "Unistyles: You're trying to get theme '" + themeName + "' but it wasn't registered.");

        return state.getJSThemeByName(themeName);
    }

    return state.getCurrentJSTheme();
}

jsi::Value HybridUnistylesRuntime::updateTheme(jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) {
    helpers::assertThat(rt, count == 2, "UnistylesRuntime.updateTheme expected to be called with 2 arguments.");
    helpers::assertThat(rt, args[0].isString(), "UnistylesRuntime.updateTheme expected first argument to be a string.");
    helpers::assertThat(rt, args[1].isObject(), "UnistylesRuntime.updateTheme expected first argument to be a function.");

    auto& registry = core::UnistylesRegistry::get();
    auto themeName = args[0].asString(rt).utf8(rt);

    helpers::assertThat(rt, args[1].asObject(rt).isFunction(rt), "UnistylesRuntime.updateTheme expected second argument to be a function.");

    registry.updateTheme(rt, themeName, args[1].asObject(rt).asFunction(rt));

    this->_onDependenciesChange({UnistyleDependency::THEME});

    return jsi::Value::undefined();
}

void HybridUnistylesRuntime::setImmersiveMode(bool isEnabled) {
    this->_nativePlatform->setImmersiveMode(isEnabled);
};

void HybridUnistylesRuntime::nativeSetRootViewBackgroundColor(double color) {
    this->_nativePlatform->setRootViewBackgroundColor(color);
}

jsi::Value HybridUnistylesRuntime::createHybridStatusBar(jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) {
    if (this->_statusBar == nullptr) {
        this->_statusBar = std::make_shared<HybridStatusBar>(_nativePlatform);
    }

    return this->_statusBar->toObject(rt);
}

jsi::Value HybridUnistylesRuntime::createHybridNavigationBar(jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) {
    if (this->_navigationBar == nullptr) {
        this->_navigationBar = std::make_shared<HybridNavigationBar>(_nativePlatform);
    }

    return this->_navigationBar->toObject(rt);
}

UnistylesCxxMiniRuntime HybridUnistylesRuntime::getMiniRuntime() {
    UnistylesNativeMiniRuntime nativeMiniRuntime = this->_nativePlatform->getMiniRuntime();
    UnistylesCxxMiniRuntime cxxMiniRuntime{
        this->getThemeName(),
        this->getBreakpoint(),
        this->getHasAdaptiveThemes(),
        nativeMiniRuntime.colorScheme,
        nativeMiniRuntime.screen,
        nativeMiniRuntime.contentSizeCategory,
        nativeMiniRuntime.insets,
        nativeMiniRuntime.pixelRatio,
        nativeMiniRuntime.fontScale,
        nativeMiniRuntime.rtl,
        nativeMiniRuntime.statusBar,
        nativeMiniRuntime.navigationBar,
        nativeMiniRuntime.isPortrait,
        nativeMiniRuntime.isLandscape
    };

    return cxxMiniRuntime;
}

UnistylesCxxMiniRuntime HybridUnistylesRuntime::buildMiniRuntimeFromNativeRuntime(UnistylesNativeMiniRuntime& nativeMiniRuntime) {
    UnistylesCxxMiniRuntime cxxMiniRuntime{
        this->getThemeName(),
        this->getBreakpoint(),
        this->getHasAdaptiveThemes(),
        nativeMiniRuntime.colorScheme,
        nativeMiniRuntime.screen,
        nativeMiniRuntime.contentSizeCategory,
        nativeMiniRuntime.insets,
        nativeMiniRuntime.pixelRatio,
        nativeMiniRuntime.fontScale,
        nativeMiniRuntime.rtl,
        nativeMiniRuntime.statusBar,
        nativeMiniRuntime.navigationBar,
        nativeMiniRuntime.isPortrait,
        nativeMiniRuntime.isLandscape
    };

    return cxxMiniRuntime;
}

jsi::Value HybridUnistylesRuntime::getMiniRuntimeAsValue(jsi::Runtime& rt, std::optional<UnistylesNativeMiniRuntime> maybeMiniRuntime) {
    jsi::Object obj(rt);
    auto miniRuntime = maybeMiniRuntime.has_value()
        ? this->buildMiniRuntimeFromNativeRuntime(maybeMiniRuntime.value())
        : this->getMiniRuntime();

    // auto generated by nitro, but can't be accessed due to static inline function
    obj.setProperty(rt, "themeName", JSIConverter<std::optional<std::string>>::toJSI(rt, miniRuntime.themeName));
    obj.setProperty(rt, "breakpoint", JSIConverter<std::optional<std::string>>::toJSI(rt, miniRuntime.breakpoint));
    obj.setProperty(rt, "hasAdaptiveThemes", JSIConverter<bool>::toJSI(rt, miniRuntime.hasAdaptiveThemes));
    obj.setProperty(rt, "colorScheme", JSIConverter<ColorScheme>::toJSI(rt, miniRuntime.colorScheme));
    obj.setProperty(rt, "screen", JSIConverter<Dimensions>::toJSI(rt, miniRuntime.screen));
    obj.setProperty(rt, "contentSizeCategory", JSIConverter<std::string>::toJSI(rt, miniRuntime.contentSizeCategory));
    obj.setProperty(rt, "insets", JSIConverter<Insets>::toJSI(rt, miniRuntime.insets));
    obj.setProperty(rt, "pixelRatio", JSIConverter<double>::toJSI(rt, miniRuntime.pixelRatio));
    obj.setProperty(rt, "fontScale", JSIConverter<double>::toJSI(rt, miniRuntime.fontScale));
    obj.setProperty(rt, "rtl", JSIConverter<bool>::toJSI(rt, miniRuntime.rtl));
    obj.setProperty(rt, "statusBar", JSIConverter<Dimensions>::toJSI(rt, miniRuntime.statusBar));
    obj.setProperty(rt, "navigationBar", JSIConverter<Dimensions>::toJSI(rt, miniRuntime.navigationBar));
    obj.setProperty(rt, "isPortrait", JSIConverter<bool>::toJSI(rt, miniRuntime.isPortrait));
    obj.setProperty(rt, "isLandscape", JSIConverter<bool>::toJSI(rt, miniRuntime.isLandscape));

    return obj;
}

void HybridUnistylesRuntime::registerPlatformListener(const std::function<void (std::vector<UnistyleDependency>)>& listener) {
    this->_onDependenciesChange = listener;
}

void HybridUnistylesRuntime::registerNativePlatformListener(const std::function<void(std::vector<UnistyleDependency>, UnistylesNativeMiniRuntime)>& listener) {
    this->_nativePlatform->registerPlatformListener(listener);
    this->_onNativeDependenciesChange = listener;
}

void HybridUnistylesRuntime::registerImeListener(const std::function<void(UnistylesNativeMiniRuntime)>& listener) {
    this->_nativePlatform->registerImeListener(listener);
}

void HybridUnistylesRuntime::unregisterNativePlatformListeners() {
    this->_nativePlatform->unregisterPlatformListeners();
}

void HybridUnistylesRuntime::includeDependenciesForColorSchemeChange(std::vector<UnistyleDependency>& deps) {
    auto& registry = core::UnistylesRegistry::get();
    auto& state = registry.getState(*this->_rt);

    // ignore color scheme changes if user has no adaptive themes
    if (!state.hasAdaptiveThemes()) {
        return;
    }

    this->calculateNewThemeAndDependencies(deps);
}

jsi::Runtime& HybridUnistylesRuntime::getRuntime() {
    return *this->_rt;
}



================================================
FILE: cxx/hybridObjects/HybridUnistylesRuntime.h
================================================
#pragma once

#include "HybridUnistylesRuntimeSpec.hpp"
#include "HybridNativePlatformSpec.hpp"
#include "NativePlatform.h"
#include "UnistylesState.h"
#include "HybridUnistylesStatusBarSpec.hpp"
#include "HybridNavigationBar.h"
#include "HybridStatusBar.h"
#include "UnistylesRegistry.h"
#include "Helpers.h"

namespace margelo::nitro::unistyles {

struct HybridUnistylesRuntime: public HybridUnistylesRuntimeSpec {
    HybridUnistylesRuntime(std::shared_ptr<HybridNativePlatformSpec> nativePlatform, jsi::Runtime& rt, std::function<void(std::function<void(jsi::Runtime&)>&&)> runOnJSThread)
        : HybridObject(TAG), _nativePlatform{nativePlatform}, _rt{&rt}, runOnJSThread(std::move(runOnJSThread)) {}

    jsi::Value getTheme(jsi::Runtime& rt,
                            const jsi::Value& thisValue,
                            const jsi::Value* args,
                            size_t count);
    jsi::Value updateTheme(jsi::Runtime& rt,
                            const jsi::Value& thisValue,
                            const jsi::Value* args,
                            size_t count);
    jsi::Value createHybridStatusBar(jsi::Runtime& rt,
                            const jsi::Value& thisValue,
                            const jsi::Value* args,
                            size_t count);
    jsi::Value createHybridNavigationBar(jsi::Runtime& rt,
                            const jsi::Value& thisValue,
                            const jsi::Value* args,
                            size_t count);

    void loadHybridMethods() override {
        HybridUnistylesRuntimeSpec::loadHybridMethods();

        registerHybrids(this, [](Prototype& prototype) {
            prototype.registerRawHybridMethod("getTheme", 1, &HybridUnistylesRuntime::getTheme);
            prototype.registerRawHybridMethod("updateTheme", 1, &HybridUnistylesRuntime::updateTheme);
            prototype.registerRawHybridMethod("createHybridStatusBar", 0, &HybridUnistylesRuntime::createHybridStatusBar);
            prototype.registerRawHybridMethod("createHybridNavigationBar", 0, &HybridUnistylesRuntime::createHybridNavigationBar);
        });
    };

    ColorScheme getColorScheme() override;
    bool getHasAdaptiveThemes() override;
    bool getRtl() override;
    bool getIsLandscape() override;
    bool getIsPortrait() override;
    Dimensions getScreen() override;
    std::optional<std::string> getThemeName() override;
    std::string getContentSizeCategory() override;
    std::optional<std::string> getBreakpoint() override;
    Insets getInsets() override;
    Orientation getOrientation() override;
    double getPixelRatio() override;
    double getFontScale() override;
    void registerPlatformListener(const std::function<void(std::vector<UnistyleDependency>)>& listener);
    void registerNativePlatformListener(const std::function<void(std::vector<UnistyleDependency>, UnistylesNativeMiniRuntime)>& listener);
    void registerImeListener(const std::function<void(UnistylesNativeMiniRuntime)>& listener);
    void unregisterNativePlatformListeners();

    void setTheme(const std::string &themeName) override;
    void setAdaptiveThemes(bool isEnabled) override;
    void setImmersiveMode(bool isEnabled) override;
    void nativeSetRootViewBackgroundColor(double color) override;
    UnistylesCxxMiniRuntime getMiniRuntime() override;
    std::unordered_map<std::string, double> getBreakpoints() override;

    jsi::Runtime& getRuntime();
    UnistylesCxxMiniRuntime buildMiniRuntimeFromNativeRuntime(UnistylesNativeMiniRuntime& nativeMiniRuntime);
    jsi::Value getMiniRuntimeAsValue(jsi::Runtime& rt, std::optional<UnistylesNativeMiniRuntime> maybeMiniRuntime);
    void includeDependenciesForColorSchemeChange(std::vector<UnistyleDependency>& deps);
    void calculateNewThemeAndDependencies(std::vector<UnistyleDependency>& deps);
    std::function<void(std::function<void(jsi::Runtime&)>&&)> runOnJSThread;

private:
    jsi::Runtime* _rt;
    std::shared_ptr<HybridNavigationBar> _navigationBar;
    std::shared_ptr<HybridStatusBar> _statusBar;
    std::shared_ptr<HybridNativePlatformSpec> _nativePlatform;
    std::function<void(std::vector<UnistyleDependency>)> _onDependenciesChange;
    std::function<void(std::vector<UnistyleDependency>, UnistylesNativeMiniRuntime)> _onNativeDependenciesChange;
};

}



================================================
FILE: cxx/parser/Parser.cpp
================================================
#include "Parser.h"
#include "UnistyleWrapper.h"

using namespace margelo::nitro::unistyles;
using namespace facebook;
using namespace facebook::react;

using Variants = std::vector<std::pair<std::string, std::string>>;

// called only once while processing StyleSheet.create
void parser::Parser::buildUnistyles(jsi::Runtime& rt, std::shared_ptr<StyleSheet> styleSheet) {
    jsi::Object unwrappedStyleSheet = this->unwrapStyleSheet(rt, styleSheet, std::nullopt);

    helpers::enumerateJSIObject(rt, unwrappedStyleSheet, [&](const std::string& styleKey, jsi::Value& propertyValue){
        helpers::assertThat(rt, propertyValue.isObject(), "Unistyles: Style with name '" + styleKey + "' is not a function or object.");

        jsi::Object styleValue = propertyValue.asObject(rt);

        if (styleValue.isFunction(rt)) {
            styleSheet->unistyles[styleKey] = std::make_shared<UnistyleDynamicFunction>(
                helpers::HashGenerator::generateHash(styleKey + std::to_string(styleSheet->tag)),
                UnistyleType::DynamicFunction,
                styleKey,
                styleValue,
                styleSheet
            );

            return;
        }

        styleSheet->unistyles[styleKey] = std::make_shared<Unistyle>(
            helpers::HashGenerator::generateHash(styleKey + std::to_string(styleSheet->tag)),
            UnistyleType::Object,
            styleKey,
            styleValue,
            styleSheet
        );
    });
}

jsi::Value parser::Parser::getParsedStyleSheetForScopedTheme(jsi::Runtime& rt, core::Unistyle::Shared unistyle, std::string& scopedTheme) {
    // for static stylesheets and exotic styles we don't need to do anything
    if (unistyle->parent == nullptr || unistyle->parent->type == StyleSheetType::Static) {
        return jsi::Value::undefined();
    }

    auto& state = core::UnistylesRegistry::get().getState(rt);
    auto jsTheme = state.getJSThemeByName(scopedTheme);

    if (unistyle->parent->type == StyleSheetType::Themable) {
        return unistyle->parent->rawValue
            .asFunction(rt)
            .call(rt, std::move(jsTheme))
            .asObject(rt);
    }

    auto miniRuntime = this->_unistylesRuntime->getMiniRuntimeAsValue(rt, std::nullopt);

    return unistyle->parent->rawValue
        .asFunction(rt)
        .call(rt, std::move(jsTheme), std::move(miniRuntime))
        .asObject(rt);
}

void parser::Parser::rebuildUnistyleWithScopedTheme(jsi::Runtime& rt, jsi::Value& scopedStyleSheet, std::shared_ptr<core::UnistyleData> unistyleData) {
    auto parsedStyleSheet = scopedStyleSheet.isUndefined()
        ? this->getParsedStyleSheetForScopedTheme(rt, unistyleData->unistyle, unistyleData->scopedTheme.value())
        : scopedStyleSheet.asObject(rt);

    if (parsedStyleSheet.isUndefined()) {
        return;
    }

    // get target style
    auto targetStyle = parsedStyleSheet.asObject(rt).getProperty(rt, unistyleData->unistyle->styleKey.c_str()).asObject(rt);

    // for object we just need to parse it
    if (unistyleData->unistyle->type == UnistyleType::Object) {
        // we need to temporarly swap rawValue to enforce correct parings
        auto sharedRawValue = std::move(unistyleData->unistyle->rawValue);

        unistyleData->unistyle->rawValue = std::move(targetStyle);
        unistyleData->parsedStyle = this->parseFirstLevel(rt, unistyleData->unistyle, unistyleData->variants);
        unistyleData->unistyle->rawValue = std::move(sharedRawValue);

        return;
    }

    // for functions we need to call them with memoized arguments
    auto unistyleFn = std::dynamic_pointer_cast<UnistyleDynamicFunction>(unistyleData->unistyle);

    // convert arguments to jsi::Value
    std::vector<jsi::Value> args{};
    auto arguments = unistyleData->dynamicFunctionMetadata.value();

    args.reserve(arguments.size());

    for (int i = 0; i < arguments.size(); i++) {
        folly::dynamic& arg = arguments.at(i);

        args.emplace_back(jsi::valueFromDynamic(rt, arg));
    }

    const jsi::Value *argStart = args.data();

    // we need to temporarly swap unprocessed value to enforce correct parings
    auto sharedUnprocessedValue = std::move(unistyleFn->unprocessedValue);

    // call cached function with memoized arguments
    auto functionResult = targetStyle
        .asFunction(rt)
        .call(rt, argStart, arguments.size())
        .asObject(rt);

    unistyleFn->unprocessedValue = std::move(functionResult);
    unistyleData->parsedStyle = this->parseFirstLevel(rt, unistyleFn, unistyleData->variants);
    unistyleFn->unprocessedValue = std::move(sharedUnprocessedValue);
}

jsi::Object parser::Parser::unwrapStyleSheet(jsi::Runtime& rt, std::shared_ptr<StyleSheet> styleSheet, std::optional<UnistylesNativeMiniRuntime> maybeMiniRuntime) {
    // firstly we need to get object representation of user's StyleSheet
    // StyleSheet can be a function or an object

    // StyleSheet is already an object
    if (styleSheet->type == StyleSheetType::Static) {
        return jsi::Value(rt, styleSheet->rawValue).asObject(rt);
    }

    // StyleSheet is a function
    auto& state = core::UnistylesRegistry::get().getState(rt);
    auto theme = state.getCurrentJSTheme();

    if (styleSheet->type == StyleSheetType::Themable) {
        return styleSheet->rawValue
            .asFunction(rt)
            .call(rt, std::move(theme))
            .asObject(rt);
    }

    // stylesheet also has a mini runtime dependency
    // StyleSheetType::ThemableWithMiniRuntime
    auto miniRuntime = this->_unistylesRuntime->getMiniRuntimeAsValue(rt, maybeMiniRuntime);

    return styleSheet->rawValue
        .asFunction(rt)
        .call(rt, std::move(theme), std::move(miniRuntime))
        .asObject(rt);
}

// parses all unistyles in StyleSheet
void parser::Parser::parseUnistyles(jsi::Runtime& rt, std::shared_ptr<StyleSheet> styleSheet) {
    for (const auto& [_, unistyle] : styleSheet->unistyles) {
        if (unistyle->type == core::UnistyleType::Object) {
            auto result = this->parseFirstLevel(rt, unistyle, std::nullopt);

            unistyle->parsedStyle = std::move(result);
            unistyle->seal();
        }

        if (unistyle->type == core::UnistyleType::DynamicFunction) {
            auto hostFn = this->createDynamicFunctionProxy(rt, unistyle);
            auto unistyleFn = std::dynamic_pointer_cast<UnistyleDynamicFunction>(unistyle);

            // defer parsing dynamic functions
            unistyleFn->proxiedFunction = std::move(hostFn);
        }
    }
}

// rebuild all unistyles in StyleSheet that depends on variants
void parser::Parser::rebuildUnistyleWithVariants(jsi::Runtime& rt, std::shared_ptr<core::UnistyleData> unistyleData) {
    if (unistyleData->unistyle->styleKey == helpers::EXOTIC_STYLE_KEY) {
        unistyleData->parsedStyle = std::move(unistyleData->unistyle->rawValue);

        return;
    }

    if (unistyleData->unistyle->type == UnistyleType::Object) {
        unistyleData->parsedStyle = this->parseFirstLevel(rt, unistyleData->unistyle, unistyleData->variants);

        return;
    }

    // for functions we need to call them with memoized arguments
    auto unistyleFn = std::dynamic_pointer_cast<UnistyleDynamicFunction>(unistyleData->unistyle);

    // convert arguments to jsi::Value
    std::vector<jsi::Value> args{};
    auto arguments = unistyleData->dynamicFunctionMetadata.value();

    args.reserve(arguments.size());

    for (int i = 0; i < arguments.size(); i++) {
        folly::dynamic& arg = arguments.at(i);

        args.emplace_back(jsi::valueFromDynamic(rt, arg));
    }

    const jsi::Value *argStart = args.data();

    // we need to temporarly swap unprocessed value to enforce correct parings
    auto sharedUnprocessedValue = std::move(unistyleFn->unprocessedValue);

    // call cached function with memoized arguments
    auto functionResult = unistyleFn->rawValue
        .asFunction(rt)
        .call(rt, argStart, arguments.size())
        .asObject(rt);

    unistyleFn->unprocessedValue = std::move(functionResult);
    unistyleData->parsedStyle = this->parseFirstLevel(rt, unistyleFn, unistyleData->variants);
    unistyleFn->unprocessedValue = std::move(sharedUnprocessedValue);
}

// rebuild all unistyles that are affected by platform event
void parser::Parser::rebuildUnistylesInDependencyMap(
    jsi::Runtime& rt,
    DependencyMap& dependencyMap,
    std::vector<std::shared_ptr<core::StyleSheet>>& styleSheets,
    std::optional<UnistylesNativeMiniRuntime> maybeMiniRuntime
) {
    std::unordered_map<std::shared_ptr<StyleSheet>, jsi::Value> parsedStyleSheetsWithDefaultTheme;
    std::unordered_map<std::string, std::unordered_map<std::shared_ptr<StyleSheet>, jsi::Value>> parsedStyleSheetsWithScopedTheme;
    std::unordered_set<std::shared_ptr<core::Unistyle>> parsedUnistyles;

    // Parse all stylesheets that depend on changes
    for (const auto& styleSheet : styleSheets) {
        parsedStyleSheetsWithDefaultTheme.emplace(
            styleSheet,
            this->unwrapStyleSheet(rt, styleSheet, maybeMiniRuntime)
        );
    }

    // Parse all visible Unistyles managed by Unistyle
    for (auto& [shadowNode, unistyles] : dependencyMap) {
        auto styleSheet = unistyles.front()->unistyle->parent;

        // Stylesheet may be optional for exotic unistyles
        if (styleSheet && parsedStyleSheetsWithDefaultTheme.find(styleSheet) == parsedStyleSheetsWithDefaultTheme.end()) {
            parsedStyleSheetsWithDefaultTheme.emplace(
                styleSheet,
                this->unwrapStyleSheet(rt, styleSheet, maybeMiniRuntime)
            );
        }

        for (auto& unistyleData : unistyles) {
            auto& unistyle = unistyleData->unistyle;

            // For RN styles or inline styles, compute styles only once
            if (unistyle->styleKey == helpers::EXOTIC_STYLE_KEY) {
                if (!unistyleData->parsedStyle.has_value()) {
                    unistyleData->parsedStyle = jsi::Value(rt, unistyle->rawValue).asObject(rt);
                    parsedUnistyles.insert(unistyle);
                }

                continue;
            }

            // Reference Unistyles StyleSheet as we may mix them for one style
            auto unistyleStyleSheet = unistyle->parent;

            // We may hit now other StyleSheets that are referenced from affected nodes
            if (unistyleStyleSheet && parsedStyleSheetsWithDefaultTheme.find(unistyleStyleSheet) == parsedStyleSheetsWithDefaultTheme.end()) {
                parsedStyleSheetsWithDefaultTheme.emplace(
                    unistyleStyleSheet,
                    this->unwrapStyleSheet(rt, unistyleStyleSheet, maybeMiniRuntime)
                );
            }

            // StyleSheet might have styles that are not affected
            auto& parsedSheetValue = parsedStyleSheetsWithDefaultTheme[unistyleStyleSheet];
            auto parsedSheetObj = parsedSheetValue.asObject(rt);

            if (!parsedSheetObj.hasProperty(rt, unistyle->styleKey.c_str())) {
                continue;
            }

            // For scoped themes we need to parse unistyle exclusively
            if (unistyleData->scopedTheme.has_value()) {
                auto& scopedThemeName = unistyleData->scopedTheme.value();
                auto& scopedThemeMap = parsedStyleSheetsWithScopedTheme[scopedThemeName];

                jsi::Value parsedStyleSheet = jsi::Value::undefined();
                auto it = scopedThemeMap.find(unistyle->parent);

                if (it != scopedThemeMap.end()) {
                    parsedStyleSheet = jsi::Value(rt, it->second);
                }

                if (parsedStyleSheet.isUndefined()) {
                    parsedStyleSheet = this->getParsedStyleSheetForScopedTheme(rt, unistyle, scopedThemeName);
                    scopedThemeMap.emplace(
                        unistyle->parent,
                        jsi::Value(rt, parsedStyleSheet)
                    );
                }

                this->rebuildUnistyleWithScopedTheme(rt, parsedStyleSheet, unistyleData);
            } else {
                unistyle->rawValue = parsedSheetObj
                    .getProperty(rt, unistyle->styleKey.c_str())
                    .asObject(rt);
                this->rebuildUnistyle(
                    rt, unistyle, unistyleData->variants,
                    unistyleData->dynamicFunctionMetadata
                );
                unistyleData->parsedStyle = jsi::Value(rt, unistyle->parsedStyle.value()).asObject(rt);
                unistyle->isDirty = true;
            }

            parsedUnistyles.insert(unistyle);
        }
    }

    // Parse whatever left in StyleSheets to be later accessible
    for (const auto& styleSheet : styleSheets) {
        auto& parsedSheetValue = parsedStyleSheetsWithDefaultTheme[styleSheet];
        auto parsedSheetObj = parsedSheetValue.asObject(rt);

        for (auto& [_, unistyle] : styleSheet->unistyles) {
            if (!parsedUnistyles.contains(unistyle)) {
                unistyle->rawValue = parsedSheetObj
                    .getProperty(rt, unistyle->styleKey.c_str())
                    .asObject(rt);
                unistyle->isDirty = true;
            }
        }
    }
}

// rebuild single unistyle
void parser::Parser::rebuildUnistyle(jsi::Runtime& rt, Unistyle::Shared unistyle, const Variants& variants, std::optional<std::vector<folly::dynamic>> metadata) {
    if (unistyle->type == core::UnistyleType::Object) {
        auto result = this->parseFirstLevel(rt, unistyle, variants);

        unistyle->parsedStyle = std::move(result);
    }

    // for functions we need to call memoized function
    // with last know arguments and parse it with new theme and mini runtime
    if (unistyle->type == core::UnistyleType::DynamicFunction && metadata.has_value()) {
        auto unistyleFn = std::dynamic_pointer_cast<UnistyleDynamicFunction>(unistyle);

        // convert arguments to jsi::Value
        auto dynamicFunctionMetadata = metadata.value();
        std::vector<jsi::Value> args{};

        args.reserve(dynamicFunctionMetadata.size());

        for (int i = 0; i < dynamicFunctionMetadata.size(); i++) {
            folly::dynamic& arg = dynamicFunctionMetadata.at(i);

            args.emplace_back(jsi::valueFromDynamic(rt, arg));
        }

        const jsi::Value *argStart = args.data();

        // call cached function with memoized arguments
        auto functionResult = unistyleFn->rawValue
            .asFunction(rt)
            .call(rt, argStart, dynamicFunctionMetadata.size())
            .asObject(rt);

        unistyleFn->unprocessedValue = std::move(functionResult);
        unistyleFn->parsedStyle = this->parseFirstLevel(rt, unistyleFn, variants);
    }

    if (unistyle->isDirty) {
        unistyle->isDirty = false;
    }
}

// convert dependency map to shadow tree updates
void parser::Parser::rebuildShadowLeafUpdates(jsi::Runtime& rt, core::DependencyMap& dependencyMap) {
    auto& registry = core::UnistylesRegistry::get();

    registry.trafficController.withLock([this, &rt, &dependencyMap, &registry]() {
        shadow::ShadowLeafUpdates updates;
        updates.reserve(dependencyMap.size());

        for (const auto& [shadowNode, unistyles] : dependencyMap) {
            // Parse string colors (e.g., "#000000") to int representation
            auto rawProps = this->parseStylesToShadowTreeStyles(rt, unistyles);

            updates.emplace(shadowNode, std::move(rawProps));
        }

        registry.trafficController.setUpdates(updates);
        registry.trafficController.resumeUnistylesTraffic();
    });
}


// first level of StyleSheet, we can expect here different properties than on second level
// eg. variants, compoundVariants, mq, breakpoints etc.
jsi::Object parser::Parser::parseFirstLevel(jsi::Runtime& rt, Unistyle::Shared unistyle, std::optional<Variants> variants) {
    // for objects - we simply operate on them
    // for functions we need to work on the unprocessed result (object)
    auto& style = unistyle->type == core::UnistyleType::Object
        ? unistyle->rawValue
        : std::dynamic_pointer_cast<UnistyleDynamicFunction>(unistyle)->unprocessedValue.value();
    auto parsedStyle = jsi::Object(rt);

    // we need to be sure that compoundVariants are parsed after variants and after every other style
    bool shouldParseVariants = style.hasProperty(rt, "variants");
    bool shouldParseCompoundVariants = style.hasProperty(rt, "compoundVariants") && shouldParseVariants;

    helpers::enumerateJSIObject(rt, style, [&](const std::string& propertyName, jsi::Value& propertyValue){
        // parse dependencies only once
        if (propertyName == helpers::STYLE_DEPENDENCIES && !unistyle->isSealed()) {
            auto newDeps = this->parseDependencies(rt, propertyValue.asObject(rt));

            unistyle->dependencies.insert(unistyle->dependencies.end(), newDeps.begin(), newDeps.end());

            return;
        }

        if (propertyName == helpers::STYLE_DEPENDENCIES && !unistyle->dependencies.empty()) {
            return;
        }

        // ignore web styles
        if (propertyName == helpers::WEB_STYLE_KEY) {
            return;
        }

        // special case as we need to convert it to jsi::Array<jsi::Object>
        if (propertyName == "boxShadow" && propertyValue.isString()) {
            parsedStyle.setProperty(rt, jsi::PropNameID::forUtf8(rt, propertyName), parseBoxShadowString(rt, propertyValue.asString(rt).utf8(rt)));

            return;
        }

        // primitives
        if (propertyValue.isNumber() || propertyValue.isString() || propertyValue.isUndefined() || propertyValue.isNull()) {
            parsedStyle.setProperty(rt, jsi::PropNameID::forUtf8(rt, propertyName), propertyValue);

            return;
        }
        
        if (propertyValue.isBool() && propertyName == "includeFontPadding") {
            parsedStyle.setProperty(rt, jsi::PropNameID::forUtf8(rt, propertyName), propertyValue);
            
            return;
        }

        // at this point ignore non objects
        if (!propertyValue.isObject()) {
            return;
        }

        auto propertyValueObject = propertyValue.asObject(rt);

        // also, ignore any functions at this level
        if (propertyValueObject.isFunction(rt)) {
            return;
        }

        // variants and compoundVariants are computed soon after all styles
        if (propertyName == "variants" || propertyName == "compoundVariants") {
            return;
        }

        if (propertyName == "transform" && propertyValueObject.isArray(rt)) {
            parsedStyle.setProperty(rt, jsi::PropNameID::forUtf8(rt, propertyName), parseTransforms(rt, unistyle, propertyValueObject));

            return;
        }

        if (propertyName == "boxShadow" && propertyValueObject.isArray(rt)) {
            parsedStyle.setProperty(rt, jsi::PropNameID::forUtf8(rt, propertyName), parseBoxShadow(rt, unistyle, propertyValueObject));

            return;
        }

        if (propertyName == "filter" && propertyValueObject.isArray(rt)) {
            parsedStyle.setProperty(rt, jsi::PropNameID::forUtf8(rt, propertyName), parseFilters(rt, unistyle, propertyValueObject));

            return;
        }

        if (propertyName == "fontVariant" && propertyValueObject.isArray(rt)) {
            parsedStyle.setProperty(rt, jsi::PropNameID::forUtf8(rt, propertyName), propertyValue);

            return;
        }

        if (propertyName == "shadowOffset" || propertyName == "textShadowOffset") {
            parsedStyle.setProperty(rt, jsi::PropNameID::forUtf8(rt, propertyName), this->parseSecondLevel(rt, unistyle, propertyValue));

            return;
        }

        if (helpers::isPlatformColor(rt, propertyValueObject)) {
            parsedStyle.setProperty(rt, jsi::PropNameID::forUtf8(rt, propertyName), propertyValueObject);

            return;
        }

        // 'mq' or 'breakpoints'
        auto valueFromBreakpoint = getValueFromBreakpoints(rt, unistyle, propertyValueObject);

        parsedStyle.setProperty(rt, jsi::PropNameID::forUtf8(rt, propertyName), this->parseSecondLevel(rt, unistyle, valueFromBreakpoint));
    });

    if (shouldParseVariants && variants.has_value()) {
        auto propertyValueObject = style.getProperty(rt, "variants").asObject(rt);
        auto parsedVariant = this->parseVariants(rt, unistyle, propertyValueObject, variants.value());

        helpers::mergeJSIObjects(rt, parsedStyle, parsedVariant);

        if (shouldParseCompoundVariants) {
            auto compoundVariants = style.getProperty(rt, "compoundVariants").asObject(rt);
            auto parsedCompoundVariants = this->parseCompoundVariants(rt, unistyle, compoundVariants, variants.value());

            helpers::mergeJSIObjects(rt, parsedStyle, parsedCompoundVariants);
        }
    }

    return parsedStyle;
}

// function replaces original user dynamic function with additional logic to memoize arguments
jsi::Function parser::Parser::createDynamicFunctionProxy(jsi::Runtime& rt, Unistyle::Shared unistyle) {
    auto unistylesRuntime = this->_unistylesRuntime;

    return jsi::Function::createFromHostFunction(
        rt,
        jsi::PropNameID::forUtf8(rt, unistyle->styleKey),
        1,
        [this, unistylesRuntime, unistyle](jsi::Runtime& rt, const jsi::Value& thisVal, const jsi::Value* args, size_t count) {
            auto thisObject = thisVal.isObject()
                ? thisVal.asObject(rt)
                : jsi::Object(rt);
            auto parser = parser::Parser(unistylesRuntime);
            // call user function
            auto result = unistyle->rawValue.asFunction(rt).call(rt, args, count);

            // memoize metadata to call it later
            auto unistyleFn = std::dynamic_pointer_cast<UnistyleDynamicFunction>(unistyle);

            unistyleFn->unprocessedValue = jsi::Value(rt, result).asObject(rt);

            jsi::Value rawVariants = thisObject.hasProperty(rt, helpers::STYLESHEET_VARIANTS.c_str())
                ? thisObject.getProperty(rt, helpers::STYLESHEET_VARIANTS.c_str())
                : jsi::Object(rt);

            Variants variants = helpers::variantsToPairs(rt, rawVariants.asObject(rt));

            unistyleFn->parsedStyle = parser.parseFirstLevel(rt, unistyleFn, variants);
            unistyleFn->seal();

            // for compatibility purpose save last arguments to style instance. It will work ok, if user sees warning about multiple unistyles
            helpers::defineHiddenProperty(rt, thisObject, helpers::ARGUMENTS.c_str() + std::string("_") + unistyleFn->styleKey, helpers::functionArgumentsToArray(rt, args, count));

            return core::objectFromUnistyle(rt, unistylesRuntime, unistyle, variants, std::make_optional<jsi::Array>(helpers::functionArgumentsToArray(rt, args, count))).asObject(rt);
    });
}

// function converts babel generated dependencies to C++ dependencies
std::vector<UnistyleDependency> parser::Parser::parseDependencies(jsi::Runtime &rt, jsi::Object&& dependencies) {
    helpers::assertThat(rt, dependencies.isArray(rt), "Unistyles: Babel transform is invalid - unexpected type for dependencies.");

    std::vector<UnistyleDependency> parsedDependencies{};

    parsedDependencies.reserve(5);

    helpers::iterateJSIArray(rt, dependencies.asArray(rt), [&](size_t i, jsi::Value& value){
        auto dependency = static_cast<UnistyleDependency>(value.asNumber());

        parsedDependencies.push_back(dependency);
    });

    return parsedDependencies;
}

// eg. [{ scale: 2 }, { translateX: 100 }]
jsi::Value parser::Parser::parseTransforms(jsi::Runtime& rt, Unistyle::Shared unistyle, jsi::Object& obj) {
    std::vector<jsi::Value> parsedTransforms{};

    parsedTransforms.reserve(2);

    helpers::iterateJSIArray(rt, obj.asArray(rt), [&](size_t i, jsi::Value& value){
        if (!value.isObject()) {
            return;
        }

        auto parsedResult = this->parseSecondLevel(rt, unistyle, value);

        helpers::enumerateJSIObject(rt, parsedResult.asObject(rt), [&](const std::string& propertyName, jsi::Value& propertyValue){
            // we shouldn't allow undefined in transforms, simply remove entire object from array
            if (!propertyValue.isUndefined()) {
                parsedTransforms.emplace_back(std::move(parsedResult));
            }
        });
    });

    // create jsi::Array result with correct transforms
    jsi::Array result = jsi::Array(rt, parsedTransforms.size());

    for (size_t i = 0; i < parsedTransforms.size(); i++) {
        result.setValueAtIndex(rt, i, parsedTransforms[i]);
    }

    return result;
}

// eg [{offsetX: 5, offsetY: 5, blurRadius: 5, spreadDistance: 0, color: ‘rgba(255, 0, 0, 0.5)’}]
jsi::Value parser::Parser::parseBoxShadow(jsi::Runtime &rt, Unistyle::Shared unistyle, jsi::Object &obj) {
    std::vector<jsi::Value> parsedBoxShadows{};

    parsedBoxShadows.reserve(1);

    helpers::iterateJSIArray(rt, obj.asArray(rt), [&](size_t i, jsi::Value& value){
        if (!value.isObject()) {
            return;
        }

        auto parsedResult = this->parseSecondLevel(rt, unistyle, value);

        parsedBoxShadows.emplace_back(std::move(parsedResult));
    });

    // create jsi::Array result with correct box shadows
    jsi::Array result = jsi::Array(rt, parsedBoxShadows.size());

    for (size_t i = 0; i < parsedBoxShadows.size(); i++) {
        result.setValueAtIndex(rt, i, parsedBoxShadows[i]);
    }

    return result;
}

jsi::Array parser::Parser::parseBoxShadowString(jsi::Runtime& rt, std::string&& boxShadowString) {
    auto& registry = core::UnistylesRegistry::get();
    auto& state = registry.getState(rt);

    return state.parseBoxShadowString(std::move(boxShadowString));
}

// eg. [{ brightness: 0.5 }, { opacity: 0.25 }]
jsi::Value parser::Parser::parseFilters(jsi::Runtime &rt, Unistyle::Shared unistyle, jsi::Object &obj) {
    std::vector<jsi::Value> parsedFilters{};

    parsedFilters.reserve(2);

    helpers::iterateJSIArray(rt, obj.asArray(rt), [&](size_t i, jsi::Value& value){
        if (!value.isObject()) {
            return;
        }

        auto parsedResult = this->parseSecondLevel(rt, unistyle, value);

        // take only one filter per object
        jsi::Array propertyNames = parsedResult.asObject(rt).getPropertyNames(rt);
        size_t length = propertyNames.size(rt);

        // ignore no filters
        if (length == 0) {
            return;
        }

        parsedFilters.emplace_back(std::move(parsedResult));
    });

    // create jsi::Array result with correct filters
    jsi::Array result = jsi::Array(rt, parsedFilters.size());

    for (size_t i = 0; i < parsedFilters.size(); i++) {
        result.setValueAtIndex(rt, i, parsedFilters[i]);
    }

    return result;
}

// find value based on breakpoints and mq
jsi::Value parser::Parser::getValueFromBreakpoints(jsi::Runtime& rt, Unistyle::Shared unistyle, jsi::Object& obj) {
    auto& registry = core::UnistylesRegistry::get();
    auto& state = registry.getState(rt);

    auto sortedBreakpoints = state.getSortedBreakpointPairs();
    auto hasBreakpoints = !sortedBreakpoints.empty();
    auto currentBreakpoint = state.getCurrentBreakpointName();
    auto rawDimensions = this->_unistylesRuntime->getScreen();
    auto pixelRatio = this->_unistylesRuntime->getPixelRatio();
    auto dimensions = registry.shouldUsePointsForBreakpoints
        ? Dimensions(rawDimensions.width / pixelRatio, rawDimensions.height / pixelRatio)
        : rawDimensions;
    auto currentOrientation = dimensions.width > dimensions.height
        ? "landscape"
        : "portrait";

    jsi::Array propertyNames = obj.getPropertyNames(rt);
    size_t length = propertyNames.size(rt);

    // mq has the biggest priority, so check if first
    for (size_t i = 0; i < length; i++) {
        auto propertyName = propertyNames.getValueAtIndex(rt, i).asString(rt).utf8(rt);
        auto propertyValue = obj.getProperty(rt, propertyName.c_str());
        auto mq = core::UnistylesMQ{propertyName};

        if (mq.isMQ()) {
            unistyle->addBreakpointDependency();
        }

        if (mq.isWithinTheWidthAndHeight(dimensions)) {
            // we have direct hit
            return propertyValue;
        }
    }

    // check orientation breakpoints if user didn't register own breakpoint
    bool hasOrientationBreakpoint = obj.hasProperty(rt, currentOrientation);

    if (hasOrientationBreakpoint) {
        unistyle->addBreakpointDependency();
    }

    if (!hasBreakpoints && hasOrientationBreakpoint) {
        return obj.getProperty(rt, currentOrientation);
    }

    if (!currentBreakpoint.has_value()) {
        return jsi::Value::undefined();
    }

    unistyle->addBreakpointDependency();

    // if you're still here it means that there is no
    // matching mq nor default breakpoint, let's find the user defined breakpoint
    auto currentBreakpointIt = std::find_if(
        sortedBreakpoints.rbegin(),
        sortedBreakpoints.rend(),
        [&currentBreakpoint](const std::pair<std::string, double>& breakpoint){
            return breakpoint.first == currentBreakpoint.value();
        }
    );

    // look for any hit in reversed vector
    for (auto it = currentBreakpointIt; it != sortedBreakpoints.rend(); ++it) {
        auto breakpoint = it->first.c_str();

        if (obj.hasProperty(rt, breakpoint)) {
            return obj.getProperty(rt, breakpoint);
        }
    }

    // at this point we have no match, return undefined
    return jsi::Value::undefined();
}

// parse all types of variants
jsi::Object parser::Parser::parseVariants(jsi::Runtime& rt, Unistyle::Shared unistyle, jsi::Object& obj, Variants& variants) {
    jsi::Object parsedVariant = jsi::Object(rt);
    jsi::Array propertyNames = obj.getPropertyNames(rt);

    helpers::enumerateJSIObject(rt, obj, [&](const std::string& groupName, jsi::Value& groupValue) {
        // try to match groupName to selected variants
        auto it = std::find_if(
            variants.cbegin(),
            variants.cend(),
            [&groupName](auto& variant){
                return variant.first == groupName;
            }
        );

        auto selectedVariant = it != variants.end()
            ? std::make_optional(it->second)
            : std::nullopt;

        // we've got a match, but we need to check some condition
        auto styles = this->getStylesForVariant(rt, groupName, groupValue.asObject(rt), selectedVariant, variants);

        // oops, invalid variant
        if (styles.isUndefined() || !styles.isObject()) {
            return;
        }

        auto parsedNestedStyles = this->parseSecondLevel(rt, unistyle, styles).asObject(rt);

        helpers::mergeJSIObjects(rt, parsedVariant, parsedNestedStyles);
    });

    return parsedVariant;
}

// helpers function to support 'default' variants
jsi::Value parser::Parser::getStylesForVariant(jsi::Runtime& rt, const std::string groupName, jsi::Object&& groupValue, std::optional<std::string> selectedVariant, Variants& variants) {
    // if there is no value, let's try 'default'
    auto selectedVariantKey = selectedVariant.has_value()
        ? selectedVariant.value().c_str()
        : "default";
    auto hasKey = groupValue.hasProperty(rt, selectedVariantKey);

    if (!hasKey || !selectedVariant.has_value()) {
        // for no key, add 'default' selection to variants map
        variants.emplace_back(groupName, selectedVariantKey);
    }

    if (hasKey) {
        return groupValue.getProperty(rt, selectedVariantKey);
    }

    return jsi::Value::undefined();
}

// get styles from compound variants based on selected variants
jsi::Object parser::Parser::parseCompoundVariants(jsi::Runtime& rt, Unistyle::Shared unistyle, jsi::Object& obj, Variants& variants) {
    if (!obj.isArray(rt)) {
        return jsi::Object(rt);
    }

    jsi::Object parsedCompoundVariants = jsi::Object(rt);

    helpers::iterateJSIArray(rt, obj.asArray(rt), [&](size_t i, jsi::Value& value){
        if (!value.isObject()) {
            return;
        }

        auto valueObject = value.asObject(rt);

        // check if every condition for given compound variant is met
        if (this->shouldApplyCompoundVariants(rt, variants, valueObject)) {
            auto styles = valueObject.getProperty(rt, "styles");
            auto parsedNestedStyles = this->parseSecondLevel(rt, unistyle, styles).asObject(rt);

            unistyles::helpers::mergeJSIObjects(rt, parsedCompoundVariants, parsedNestedStyles);
        }
    });

    return parsedCompoundVariants;
}

// check every condition in compound variants, supports boolean variants
bool parser::Parser::shouldApplyCompoundVariants(jsi::Runtime& rt, const Variants& variants, jsi::Object& compoundVariant) {
    if (variants.empty()) {
        return false;
    }

    for (auto it = variants.cbegin(); it != variants.cend(); ++it) {
        auto variantKey = it->first;
        auto variantValue = it->second;

        if (!compoundVariant.hasProperty(rt, variantKey.c_str())) {
            continue;
        }

        auto property = compoundVariant.getProperty(rt, variantKey.c_str());
        auto propertyName = property.isBool()
            ? (property.asBool() ? "true" : "false")
            : property.isString()
                ? property.asString(rt).utf8(rt)
                : "";

        if (propertyName != variantValue) {
            return false;
        }
    }

    return true;
}

// second level of parser
// we expect here only primitives, arrays and objects
jsi::Value parser::Parser::parseSecondLevel(jsi::Runtime &rt, Unistyle::Shared unistyle, jsi::Value& nestedStyle) {
    // primitives
    if (nestedStyle.isString() || nestedStyle.isNumber() || nestedStyle.isUndefined() || nestedStyle.isNull()) {
        return jsi::Value(rt, nestedStyle);
    }

    // ignore any non objects at this level
    if (!nestedStyle.isObject()) {
        return jsi::Value::undefined();
    }

    auto nestedObjectStyle = nestedStyle.asObject(rt);

    // too deep to accept any functions or arrays
    if (nestedObjectStyle.isArray(rt) || nestedObjectStyle.isFunction(rt)) {
        return jsi::Value::undefined();
    }

    if (helpers::isPlatformColor(rt, nestedObjectStyle)) {
        return jsi::Value(rt, nestedStyle);
    }

    jsi::Object parsedStyle = jsi::Object(rt);

    helpers::enumerateJSIObject(rt, nestedObjectStyle, [&](const std::string& propertyName, jsi::Value& propertyValue){
        // special case as we need to convert it to jsi::Array<jsi::Object>
        // possible with variants and compoundVariants
        if (propertyName == "boxShadow" && propertyValue.isString()) {
            parsedStyle.setProperty(rt, jsi::PropNameID::forUtf8(rt, propertyName), parseBoxShadowString(rt, propertyValue.asString(rt).utf8(rt)));

            return;
        }

        // primitives, bool is possible for boxShadow inset
        if (propertyValue.isString() || propertyValue.isNumber() || propertyValue.isUndefined() || propertyValue.isNull() || propertyValue.isBool()) {
            parsedStyle.setProperty(rt, propertyName.c_str(), propertyValue);

            return;
        }

        // ignore any non objects at this level
        if (!propertyValue.isObject()) {
            parsedStyle.setProperty(rt, propertyName.c_str(), jsi::Value::undefined());

            return;
        }

        auto nestedObjectStyle = propertyValue.asObject(rt);

        if (nestedObjectStyle.isFunction(rt)) {
            parsedStyle.setProperty(rt, propertyName.c_str(), jsi::Value::undefined());

            return;
        }

        auto isArray = nestedObjectStyle.isArray(rt);

        if (!isArray) {
            parsedStyle.setProperty(rt, propertyName.c_str(), this->getValueFromBreakpoints(rt, unistyle, nestedObjectStyle));
        }

        // possible with variants and compoundVariants
        if (propertyName == "transform") {
            parsedStyle.setProperty(rt, propertyName.c_str(), parseTransforms(rt, unistyle, nestedObjectStyle));

            return;
        }

        if (propertyName == "boxShadow") {
            parsedStyle.setProperty(rt, propertyName.c_str(), parseBoxShadow(rt, unistyle, nestedObjectStyle));

            return;
        }

        if (propertyName == "filter") {
            parsedStyle.setProperty(rt, propertyName.c_str(), parseFilters(rt, unistyle, nestedObjectStyle));

            return;
        }

        if (propertyName == "fontVariant") {
            parsedStyle.setProperty(rt, propertyName.c_str(), propertyValue);

            return;
        }

        if (propertyName == "shadowOffset" || propertyName == "textShadowOffset") {
            parsedStyle.setProperty(rt, propertyName.c_str(), this->parseSecondLevel(rt, unistyle, propertyValue));

            return;
        }
    });

    return parsedStyle;
}

// convert unistyles to folly with int colors
folly::dynamic parser::Parser::parseStylesToShadowTreeStyles(jsi::Runtime& rt, const std::vector<std::shared_ptr<UnistyleData>>& unistyles) {
    jsi::Object convertedStyles(rt);
    auto& state = core::UnistylesRegistry::get().getState(rt);

    for (const auto& unistyleData : unistyles) {
        if (!unistyleData->parsedStyle.has_value()) {
            continue;
        }

        helpers::enumerateJSIObject(
            rt,
            unistyleData->parsedStyle.value(),
            [this, &rt, &state, &convertedStyles](const std::string& propertyName, jsi::Value& propertyValue) {
                if (this->isColor(propertyName)) {
                    convertedStyles.setProperty(
                        rt,
                        propertyName.c_str(),
                        jsi::Value(state.parseColor(propertyValue))
                    );

                    return;
                }

                if (!propertyValue.isObject()) {
                    convertedStyles.setProperty(
                        rt,
                        propertyName.c_str(),
                        propertyValue
                    );

                    return;
                }

                jsi::Object objValue = propertyValue.asObject(rt);

                if (!objValue.isArray(rt)) {
                    convertedStyles.setProperty(
                        rt,
                        propertyName.c_str(),
                        propertyValue
                    );

                    return;
                }

                // parse nested arrays like boxShadow
                jsi::Array arrValue = objValue.asArray(rt);
                size_t arrLen = arrValue.length(rt);
                jsi::Array parsedArray(rt, arrLen);

                helpers::iterateJSIArray(
                    rt,
                    arrValue,
                    [this, &rt, &state, &propertyName, &parsedArray](size_t i, jsi::Value& nestedValue) {
                        if (nestedValue.isObject()) {
                            jsi::Object obj(rt);

                            helpers::enumerateJSIObject(
                                rt,
                                nestedValue.asObject(rt),
                                [this, &rt, &state, &obj](const std::string& nestedPropName, jsi::Value& nestedPropValue) {
                                    if (this->isColor(nestedPropName)) {
                                        obj.setProperty(
                                            rt,
                                            nestedPropName.c_str(),
                                            state.parseColor(nestedPropValue)
                                        );
                                    } else {
                                        obj.setProperty(
                                            rt,
                                            nestedPropName.c_str(),
                                            nestedPropValue
                                        );
                                    }
                                }
                            );

                            parsedArray.setValueAtIndex(rt, i, obj);

                            return;
                        }

                        if (this->isColor(propertyName)) {
                            parsedArray.setValueAtIndex(
                                rt,
                                i,
                                jsi::Value(state.parseColor(nestedValue))
                            );
                        } else {
                            parsedArray.setValueAtIndex(rt, i, nestedValue);
                        }
                    }
                );

                convertedStyles.setProperty(rt, propertyName.c_str(), parsedArray);
            }
        );
    }

    return jsi::dynamicFromValue(rt, jsi::Value(rt, convertedStyles));
}


// check is styleKey contains color
bool parser::Parser::isColor(const std::string& propertyName) {
    std::string str = propertyName;
    std::transform(str.begin(), str.end(), str.begin(), ::tolower);

    return str.find("color") != std::string::npos;
}



================================================
FILE: cxx/parser/Parser.h
================================================
#pragma once

#include <jsi/jsi.h>
#include <folly/dynamic.h>
#include "Unistyle.h"
#include "Dimensions.hpp"
#include "UnistylesConstants.h"
#include "Helpers.h"
#include "MediaQueries.h"
#include "HybridUnistylesRuntime.h"
#include "StyleSheet.h"
#include "ShadowLeafUpdate.h"
#include "HashGenerator.h"

namespace margelo::nitro::unistyles::parser {

using namespace facebook;
using namespace margelo::nitro::unistyles::core;

using Variants = std::vector<std::pair<std::string, std::string>>;

struct Parser {
    Parser(std::shared_ptr<HybridUnistylesRuntime> unistylesRuntime): _unistylesRuntime{unistylesRuntime} {}

    void buildUnistyles(jsi::Runtime& rt, std::shared_ptr<StyleSheet> styleSheet);
    void parseUnistyles(jsi::Runtime& rt, std::shared_ptr<StyleSheet> styleSheet);
    void rebuildUnistyleWithVariants(jsi::Runtime& rt, std::shared_ptr<core::UnistyleData> unistyleData);
    void rebuildUnistylesInDependencyMap(jsi::Runtime& rt, core::DependencyMap& dependencyMap, std::vector<std::shared_ptr<core::StyleSheet>>& styleSheets, std::optional<UnistylesNativeMiniRuntime> maybeMiniRuntime);
    void rebuildShadowLeafUpdates(jsi::Runtime& rt, core::DependencyMap& dependencyMap);
    folly::dynamic parseStylesToShadowTreeStyles(jsi::Runtime& rt, const std::vector<std::shared_ptr<UnistyleData>>& unistyles);
    void rebuildUnistyle(jsi::Runtime& rt, Unistyle::Shared unistyle, const Variants& variants, std::optional<std::vector<folly::dynamic>>);
    void rebuildUnistyleWithScopedTheme(jsi::Runtime& rt, jsi::Value& jsScopedTheme, std::shared_ptr<core::UnistyleData> unistyleData);
    jsi::Value getParsedStyleSheetForScopedTheme(jsi::Runtime& rt, core::Unistyle::Shared unistyle, std::string& scopedTheme);

private:
    jsi::Object unwrapStyleSheet(jsi::Runtime& rt, std::shared_ptr<StyleSheet> styleSheet, std::optional<UnistylesNativeMiniRuntime>);
    jsi::Object parseFirstLevel(jsi::Runtime& rt, Unistyle::Shared unistyle, std::optional<Variants> variants);
    jsi::Value parseSecondLevel(jsi::Runtime& rt, Unistyle::Shared unistyle, jsi::Value& nestedObject);
    jsi::Function createDynamicFunctionProxy(jsi::Runtime& rt, Unistyle::Shared unistyle);
    std::vector<UnistyleDependency> parseDependencies(jsi::Runtime &rt, jsi::Object&& dependencies);
    jsi::Value parseTransforms(jsi::Runtime& rt, Unistyle::Shared unistyle, jsi::Object& obj);
    jsi::Value parseBoxShadow(jsi::Runtime& rt, Unistyle::Shared unistyle, jsi::Object& obj);
    jsi::Array parseBoxShadowString(jsi::Runtime& rt, std::string&& boxShadowString);
    jsi::Value parseFilters(jsi::Runtime& rt, Unistyle::Shared unistyle, jsi::Object& obj);
    jsi::Value getValueFromBreakpoints(jsi::Runtime& rt, Unistyle::Shared unistyle, jsi::Object& obj);
    jsi::Object parseVariants(jsi::Runtime& rt, Unistyle::Shared unistyle, jsi::Object& obj, Variants& variants);
    jsi::Value getStylesForVariant(jsi::Runtime& rt, const std::string groupName, jsi::Object&& groupValue, std::optional<std::string> selectedVariant, Variants& variants);
    jsi::Object parseCompoundVariants(jsi::Runtime& rt, Unistyle::Shared unistyle, jsi::Object& obj, Variants& variants);
    bool shouldApplyCompoundVariants(jsi::Runtime& rt, const Variants& variants, jsi::Object& compoundVariant);
    bool isColor(const std::string& propertyName);

    std::shared_ptr<HybridUnistylesRuntime> _unistylesRuntime;
};

}



================================================
FILE: cxx/shadowTree/ShadowLeafUpdate.h
================================================
#pragma once

#include <jsi/jsi.h>
#include <folly/dynamic.h>
#include <react/renderer/uimanager/UIManager.h>

namespace margelo::nitro::unistyles::shadow {

using namespace facebook;
using namespace facebook::react;

// translates Unistyles changes to unified shadow tree changes
using ShadowLeafUpdates = std::unordered_map<const ShadowNodeFamily*, folly::dynamic>;

}



================================================
FILE: cxx/shadowTree/ShadowTrafficController.h
================================================
#pragma once

#import "mutex"
#import "ShadowLeafUpdate.h"

namespace margelo::nitro::unistyles::shadow {

// Like a traffic officer managing a jam, this struct ensures everything
// is synchronized within a set timeframe, controlling flow and preventing chaos.
struct ShadowTrafficController {
    inline bool shouldStop() {
        return !_canCommit;
    }

    inline void stopUnistylesTraffic() {
        this->_canCommit = false;
    }

    inline void resumeUnistylesTraffic() {
        this->_canCommit = true;
    }

    inline shadow::ShadowLeafUpdates& getUpdates() {
        // call it only within withLock!
        return _unistylesUpdates;
    }

    inline void setUpdates(shadow::ShadowLeafUpdates& newUpdates) {
        // call it only within withLock!
        auto& targetUpdates = _unistylesUpdates;

        // this is important as overriding updates may skip some interim changes
        // Unistyles emits different events so this will make sure that everything is synced
        std::for_each(newUpdates.begin(), newUpdates.end(), [&targetUpdates](auto& pair){
            if (targetUpdates.contains(pair.first)) {
                targetUpdates[pair.first] = std::move(pair.second);

                return;
            }

            targetUpdates.emplace(pair.first, std::move(pair.second));
        });
    }

    inline void removeShadowNode(const ShadowNodeFamily* shadowNodeFamily) {
        // call it only within withLock!
        if (_unistylesUpdates.contains(shadowNodeFamily)) {
            _unistylesUpdates.erase(shadowNodeFamily);
        }
    }

    inline void restore() {
        // call it only within withLock!

        _unistylesUpdates = {};
        _canCommit = false;
    }

    template <typename F>
    inline auto withLock(F&& func) {
        std::lock_guard<std::mutex> lock(_mutex);

        return std::forward<F>(func)();
    }

private:
    std::atomic<bool> _canCommit = false;
    shadow::ShadowLeafUpdates _unistylesUpdates{};

    // this struct should be accessed in thread-safe manner. Otherwise shadow tree updates
    // from different threads will break it
    std::mutex _mutex;
};

}



================================================
FILE: cxx/shadowTree/ShadowTreeManager.cpp
================================================
#include "ShadowTreeManager.h"

using namespace margelo::nitro::unistyles;
using namespace facebook::react;
using namespace facebook;

using AffectedNodes = std::unordered_map<const ShadowNodeFamily*, std::unordered_set<int>>;

void shadow::ShadowTreeManager::updateShadowTree(jsi::Runtime& rt) {
    auto& registry = core::UnistylesRegistry::get();

    registry.trafficController.withLock([&](){
        auto updates = registry.trafficController.getUpdates();

        if (updates.empty()) {
            return;
        }

#if REACT_NATIVE_VERSION_MINOR >= 81
        std::unordered_map<Tag, folly::dynamic> tagToProps;

        for (const auto& [family, props] : updates) {
            tagToProps.insert({family->getTag(), props});

            // Store in native props system to preserve during Reanimated cloning
            const_cast<ShadowNodeFamily*>(family)->nativeProps_DEPRECATED =
                std::make_unique<folly::dynamic>(props);
        }

        UIManagerBinding::getBinding(rt)->getUIManager().updateShadowTree(tagToProps);
#else
        const auto& shadowTreeRegistry = UIManagerBinding::getBinding(rt)->getUIManager().getShadowTreeRegistry();

        shadowTreeRegistry.enumerate([&updates](const ShadowTree& shadowTree, bool& stop){
            // we could iterate via updates and create multiple commits
            // but it can cause performance issues for hundreds of nodes
            // so let's mutate Shadow Tree in single transaction
            auto transaction = [&updates](const RootShadowNode& oldRootShadowNode) {
                auto affectedNodes = shadow::ShadowTreeManager::findAffectedNodes(oldRootShadowNode, updates);

                for (const auto& [family, props] : updates) {
                    // Merge props to fix glitches caused by REA updates
                    const_cast<ShadowNodeFamily*>(family)->nativeProps_DEPRECATED =
                        std::make_unique<folly::dynamic>(props);
                }

                return  std::static_pointer_cast<RootShadowNode>(shadow::ShadowTreeManager::cloneShadowTree(
                    oldRootShadowNode,
                    updates,
                    affectedNodes
                ));
            };

            // commit once!
            // CommitOptions:
            // enableStateReconciliation: https://reactnative.dev/architecture/render-pipeline#react-native-renderer-state-updates
            // mountSynchronously: must be true as this is update from C++ not React
            shadowTree.commit(transaction, {false, true});

            // for now we're assuming single surface, can be improved in the future
            // stop = true means stop enumerating next shadow tree
            // so in other words first shadow tree is our desired tree
            stop = true;
        });
#endif
    });
}

// based on Reanimated algorithm
// For each affected family we're gathering affected nodes (their indexes)
// Example:
//      A
//    /   \
//   B     C
//  / \
// D   E*
//    / \
//   F   G
//
// For ShadowFamily E* we will get:
//[
//  0 - because B is a first children of A,
//  1 - because E is a second children of B
//]
// A, B and E are affected now
AffectedNodes shadow::ShadowTreeManager::findAffectedNodes(const RootShadowNode& rootNode, ShadowLeafUpdates& updates) {
    AffectedNodes affectedNodes;

    for (const auto& [family, _] : updates) {
        auto familyAncestors = family->getAncestors(rootNode);

        for (auto it = familyAncestors.rbegin(); it != familyAncestors.rend(); ++it) {
            const auto& [parentNode, index] = *it;
            const auto parentFamily = &parentNode.get().getFamily();
            auto [setIt, inserted] = affectedNodes.try_emplace(parentFamily, std::unordered_set<int>{});

            setIt->second.insert(index);
        }
    }

    return affectedNodes;
}

Props::Shared shadow::ShadowTreeManager::computeUpdatedProps(const ShadowNode &shadowNode, ShadowLeafUpdates& updates) {
    const auto family = &shadowNode.getFamily();
    const auto rawPropsIt = updates.find(family);

    if (rawPropsIt == updates.end()) {
        return ShadowNodeFragment::propsPlaceholder();
    }

    const auto& componentDescriptor = shadowNode.getComponentDescriptor();
    const auto& props = shadowNode.getProps();

    PropsParserContext propsParserContext{
        shadowNode.getSurfaceId(),
        *shadowNode.getContextContainer()
    };

    folly::dynamic newProps = rawPropsIt->second == nullptr
        ? folly::dynamic::object()
        : rawPropsIt->second;

    return componentDescriptor.cloneProps(
        propsParserContext,
        props,
        RawProps(newProps)
    );
}

// based on Reanimated algorithm
// clone affected nodes recursively, inject props and commit tree
std::shared_ptr<ShadowNode> shadow::ShadowTreeManager::cloneShadowTree(const ShadowNode &shadowNode, ShadowLeafUpdates& updates, AffectedNodes& affectedNodes) {
    const auto family = &shadowNode.getFamily();
    const auto childrenIt = affectedNodes.find(family);

    // Only copy children if we need to update them
    std::shared_ptr<std::vector<std::shared_ptr<const ShadowNode>>> childrenPtr;
    const auto& originalChildren = shadowNode.getChildren();

    if (childrenIt != affectedNodes.end()) {
        auto children = originalChildren;

        for (const auto index : childrenIt->second) {
            children[index] = cloneShadowTree(*children[index], updates, affectedNodes);
        }

        childrenPtr = std::make_shared<std::vector<std::shared_ptr<const ShadowNode>>>(std::move(children));
    } else {
        childrenPtr = std::make_shared<std::vector<std::shared_ptr<const ShadowNode>>>(originalChildren);
    }

    Props::Shared updatedProps = computeUpdatedProps(shadowNode, updates);

    return shadowNode.clone({
        .props = updatedProps,
        .children = childrenPtr,
        .state = shadowNode.getState()
    });
}



================================================
FILE: cxx/shadowTree/ShadowTreeManager.h
================================================
#pragma once

#include <jsi/jsi.h>
#include <react/renderer/uimanager/UIManagerBinding.h>
#include <react/renderer/uimanager/UIManager.h>
#include <ranges>
#include "ShadowLeafUpdate.h"
#include "UnistylesRegistry.h"
#include <cxxreact/ReactNativeVersion.h>

namespace margelo::nitro::unistyles::shadow {

using namespace facebook::react;
using namespace facebook;

using AffectedNodes = std::unordered_map<const ShadowNodeFamily *, std::unordered_set<int>>;

struct ShadowTreeManager {
    static void updateShadowTree(jsi::Runtime& rt);
    static AffectedNodes findAffectedNodes(const RootShadowNode& rootNode, ShadowLeafUpdates& updates);
    static std::shared_ptr<ShadowNode> cloneShadowTree(const ShadowNode& shadowNode, ShadowLeafUpdates& updates, AffectedNodes& affectedNodes);
    static Props::Shared computeUpdatedProps(const ShadowNode &shadowNode, ShadowLeafUpdates& updates);
};

}



================================================
FILE: docs/astro.config.mjs
================================================
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import sitemap from '@astrojs/sitemap'
import starlightLlmsTxt from 'starlight-llms-txt'
import expressiveCode, { ExpressiveCodeTheme } from 'astro-expressive-code'
import fs from 'node:fs'

const themeJson = fs.readFileSync(new URL(`./theme.json`, import.meta.url), 'utf8')
const customTheme = ExpressiveCodeTheme.fromJSONString(themeJson)

const oldPaths = {
    'start': [
        'basic-usage',
        'benchmarks',
        'introduction',
        'migration-from-1',
        'migration-from-stylesheet',
        'setup',
    ],
    'reference': [
        'breakpoints',
        'compound-variants',
        'content-size-category',
        'create-stylesheet',
        'debugging',
        'dimensions',
        'dynamic-functions',
        'edge-to-edge',
        'errors',
        'faq',
        'media-queries',
        'plugins',
        'server-side-rendering',
        'testing',
        'theming',
        'unistyles-registry',
        'unistyles-runtime',
        'use-initial-theme',
        'use-styles',
        'unistyles-provider',
        'variants',
        'web-support'
    ],
    'other': [
        'for-library-authors',
        'for-sponsors',
    ],
    'examples': [
        'all'
    ]
}

export default defineConfig({
    site: 'https://unistyl.es/v3/',
	integrations: [
        expressiveCode({
            themes: [customTheme],
            languages: ['typescript', 'tsx']
        }),
		starlight({
			title: 'react-native-unistyles',
            description: 'React Native StyleSheet 3.0',
            customCss: ['./src/styles/docs.css'],
            logo: {
                src: './public/favicon.png'
            },
            social: {
                github: 'https://github.com/jpudysz/react-native-unistyles',
                'x.com': 'https://x.com/jpudysz',
                discord: 'https://discord.gg/akGHf27P4C'
            },
			sidebar: [
                {
                    label: 'Tutorial', slug: 'v3/tutorial/intro', badge: 'New!'
                },
                {
                    label: 'LLMS', slug: 'v3/llms/info', badge: 'Hot!',
                },
				{
					label: 'Start here',
					items: [
						{ label: 'Introduction', slug: 'v3/start/introduction' },
                        { label: 'Getting started', slug: 'v3/start/getting-started' },
                        { label: 'Configuration', slug: 'v3/start/configuration' },
                        { label: 'When to use Unistyles?', slug: 'v3/start/when-to-use-unistyles'},
                        { label: 'New features', slug: 'v3/start/new-features' },
                        { label: 'Look under the hood', slug: 'v3/start/how-unistyles-works' },
                        { label: 'Migration guide', slug: 'v3/start/migration-guide' },
                        { label: 'Testing', slug: 'v3/start/testing' }
					],
				},
                {
                    label: 'Guides',
                    items: [
                        { label: 'Merging styles', slug: 'v3/guides/merging-styles' },
                        { label: 'Why my view doesn\'t update?', slug: 'v3/guides/why-my-view-doesnt-update' },
                        { label: 'Theming', slug: 'v3/guides/theming' },
                        { label: 'Avoiding Keyboard', slug: 'v3/guides/avoiding-keyboard' },
                        { label: 'Expo Router', slug: 'v3/guides/expo-router' },
                        { label: 'React Compiler', slug: 'v3/guides/react-compiler' },
                        { label: 'Custom web', slug: 'v3/guides/custom-web' },
                        { label: 'Reanimated', slug: 'v3/guides/reanimated' },
                        { label: 'Server side rendering', slug: 'v3/guides/server-side-rendering' },
                    ]
                },
                {
                    label: 'API reference',
                    items: [
                        { label: 'StyleSheet', slug: 'v3/references/stylesheet' },
                        { label: 'Unistyles Runtime', slug: 'v3/references/unistyles-runtime' },
                        { label: 'Mini Runtime', slug: 'v3/references/mini-runtime' },
                        { label: 'Dynamic Functions', slug: 'v3/references/dynamic-functions' },
                        { label: 'Breakpoints', slug: 'v3/references/breakpoints' },
                        { label: 'Media Queries', slug: 'v3/references/media-queries' },
                        { label: 'Variants', slug: 'v3/references/variants' },
                        { label: 'Compound Variants', slug: 'v3/references/compound-variants' },
                        { label: 'Web styles', slug: 'v3/references/web-styles' },
                        { label: 'Web Only Features', slug: 'v3/references/web-only' },
                        { label: 'Scoped theme', slug: 'v3/references/scoped-theme', badge: 'Updated!' },
                        { label: 'Update 3rd party views', slug: 'v3/references/3rd-party-views' },
                        { label: 'withUnistyles', slug: 'v3/references/with-unistyles' },
                        { label: 'useUnistyles', slug: 'v3/references/use-unistyles' },
                        { label: 'Display and Hide', slug: 'v3/references/display-hide' },
                        { label: 'Edge to edge', slug: 'v3/references/edge-to-edge' },
                        { label: 'Dimensions', slug: 'v3/references/dimensions' },
                        { label: 'Content size category', slug: 'v3/references/content-size-category' },
                    ]
                },
                {
                    label: 'Other',
                    items: [
                        { label: 'Babel plugin', slug: 'v3/other/babel-plugin' },
                        { label: 'Dependencies', slug: 'v3/other/dependencies' },
                        { label: 'For library authors', slug: 'v3/other/for-library-authors' },
                        { label: 'For sponsors', slug: 'v3/other/for-sponsors' },
                        { label: 'FAQ', slug: 'v3/other/frequently-asked-questions' },
                    ]
                },
                {
                    label: 'Unistyles 2.0 documentation', link: 'https://v2.unistyl.es'
                },
                {
                    label: 'React Native Crossroads', link: 'https://reactnativecrossroads.com'
                },
                {
                    label: 'Codemask', link: 'https://codemask.com'
                },
                {
                    label: 'Hire us!',
                    badge: 'Hot!',
                    link: 'https://x.com/messages/compose?recipient_id=769868612198887425'
                }
			],
            plugins: [
                starlightLlmsTxt({
                    projectName: 'React Native Unistyles 3.0',
                    description: 'Easily style cross platform React Native apps with a single StyleSheet',
                    details: 'This documentation site is a source of truth for the good practices while building apps with React Native Unistyles.',
                    promote: [
                        'v3/start/**', 'v3/guides/**', 'v3/references/**'
                    ],
                    exclude: [
                        'v3/examples/**', 'v3/tutorial/**', 'v3/guides/custom-web', 'v3/other/for-sponsors'
                    ]
                })
            ]
		}),
        sitemap(),
	],
    redirects: Object.fromEntries(Object.entries(oldPaths).flatMap(([parentpath, subPaths]) => {
        return subPaths.map(subPath => {
            const path = `/${parentpath}/${subPath}`

            return [path, `https://v2.unistyl.es/${path}`]
        })
    }))
});



================================================
FILE: docs/package.json
================================================
{
  "name": "react-native-unistyles-docs",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/check": "0.9.4",
    "@astrojs/sitemap": "3.2.1",
    "@astrojs/starlight": "0.32.1",
    "@fontsource-variable/nunito": "5.1.1",
    "astro": "5.3.1",
    "astro-expressive-code": "0.40.2",
    "astro-seo": "0.8.4",
    "autoprefixer": "10.4.20",
    "postcss-easing-gradients": "3.0.1",
    "postcss-nested": "7.0.2",
    "sharp": "0.33.5",
    "starlight-llms-txt": "0.4.1",
    "typescript": "5.7.3"
  }
}



================================================
FILE: docs/postcss.config.mjs
================================================
import autoprefixer from 'autoprefixer'
import postcssNested from 'postcss-nested'
import gradients from 'postcss-easing-gradients'

export default {
    plugins: [
        autoprefixer,
        postcssNested,
        gradients
    ]
}



================================================
FILE: docs/theme.json
================================================
{
	"$schema": "vscode://schemas/color-theme",
	"type": "dark",
	"colors": {
		"activityBar.background": "#161624",
		"activityBar.border": "#161624",
		"activityBar.foreground": "#5f7e97",
		"activityBarBadge.background": "#44596b",
		"activityBarBadge.foreground": "#ffffff",
		"badge.background": "#5f7e97",
		"badge.foreground": "#ffffff",
		"breadcrumb.activeSelectionForeground": "#ffffff",
		"breadcrumb.focusForeground": "#ffffff",
		"breadcrumb.foreground": "#a599e9",
		"breadcrumbPicker.background": "#001122",
		"button.background": "#7e57c2cc",
		"button.foreground": "#ffffffcc",
		"button.hoverBackground": "#7e57c2",
		"contrastBorder": "#122d42",
		"debugExceptionWidget.background": "#161624",
		"debugExceptionWidget.border": "#5f7e97",
		"debugToolBar.background": "#161624",
		"diffEditor.insertedTextBackground": "#99b76d23",
		"diffEditor.insertedTextBorder": "#c5e47833",
		"diffEditor.removedTextBackground": "#ef535033",
		"diffEditor.removedTextBorder": "#ef53504d",
		"dropdown.background": "#161624",
		"dropdown.border": "#5f7e97",
		"dropdown.foreground": "#ffffffcc",
		"editor.background": "#161624",
		"editor.findMatchBackground": "#5f7e9779",
		"editor.findMatchHighlightBackground": "#1085bb5d",
		"editor.foreground": "#d6deeb",
		"editor.hoverHighlightBackground": "#7e57c25a",
		"editor.inactiveSelectionBackground": "#7e57c25a",
		"editor.lineHighlightBackground": "#00000033",
		"editor.rangeHighlightBackground": "#7e57c25a",
		"editor.selectionBackground": "#1d3b53",
		"editor.selectionHighlightBackground": "#5f7e9779",
		"editor.wordHighlightBackground": "#f6bbe533",
		"editor.wordHighlightStrongBackground": "#e2a2f433",
		"editorBracketMatch.background": "#5f7e974d",
		"editorCodeLens.foreground": "#5e82ceb4",
		"editorCursor.foreground": "#80a4c2",
		"editorError.foreground": "#ef5350",
		"editorGroup.border": "#161624",
		"editorGroup.dropBackground": "#7e57c273",
		"editorGroup.emptyBackground": "#161624",
		"editorGroupHeader.noTabsBackground": "#161624",
		"editorGroupHeader.tabsBackground": "#161624",
		"editorGroupHeader.tabsBorder": "#262a39",
		"editorGutter.addedBackground": "#9ccc65",
		"editorGutter.background": "#161624",
		"editorGutter.deletedBackground": "#ef5350",
		"editorGutter.modifiedBackground": "#e2b93d",
		"editorHoverWidget.background": "#161624",
		"editorHoverWidget.border": "#5f7e97",
		"editorIndentGuide.activeBackground": "#7e97ac",
		"editorIndentGuide.background": "#5e81ce52",
		"editorLineNumber.activeForeground": "#c5e4fd",
		"editorLineNumber.foreground": "#4b6479",
		"editorMarkerNavigation.background": "#0b2942",
		"editorMarkerNavigationError.background": "#ef5350",
		"editorMarkerNavigationWarning.background": "#ffca28",
		"editorOverviewRuler.commonContentForeground": "#7e57c2",
		"editorOverviewRuler.currentContentForeground": "#7e57c2",
		"editorOverviewRuler.incomingContentForeground": "#7e57c2",
		"editorRuler.foreground": "#5e81ce52",
		"editorSuggestWidget.background": "#2c3043",
		"editorSuggestWidget.border": "#2b2f40",
		"editorSuggestWidget.foreground": "#d6deeb",
		"editorSuggestWidget.highlightForeground": "#ffffff",
		"editorSuggestWidget.selectedBackground": "#5f7e97",
		"editorWarning.foreground": "#b39554",
		"editorWidget.background": "#021320",
		"editorWidget.border": "#5f7e97",
		"errorForeground": "#ef5350",
		"extensionButton.prominentBackground": "#7e57c2cc",
		"extensionButton.prominentForeground": "#ffffffcc",
		"extensionButton.prominentHoverBackground": "#7e57c2",
		"focusBorder": "#122d42",
		"foreground": "#d6deeb",
		"gitDecoration.conflictingResourceForeground": "#ffeb95cc",
		"gitDecoration.deletedResourceForeground": "#ef535090",
		"gitDecoration.ignoredResourceForeground": "#395a75",
		"gitDecoration.modifiedResourceForeground": "#a2bffc",
		"gitDecoration.untrackedResourceForeground": "#c5e478",
		"input.background": "#0b253a",
		"input.border": "#5f7e97",
		"input.foreground": "#ffffffcc",
		"input.placeholderForeground": "#5f7e97",
		"inputOption.activeBorder": "#ffffffcc",
		"inputValidation.errorBackground": "#ab0300f2",
		"inputValidation.errorBorder": "#ef5350",
		"inputValidation.infoBackground": "#00589ef2",
		"inputValidation.infoBorder": "#64b5f6",
		"inputValidation.warningBackground": "#675700f2",
		"inputValidation.warningBorder": "#ffca28",
		"list.activeSelectionBackground": "#234d708c",
		"list.activeSelectionForeground": "#ffffff",
		"list.dropBackground": "#161624",
		"list.focusBackground": "#010d18",
		"list.focusForeground": "#ffffff",
		"list.highlightForeground": "#ffffff",
		"list.hoverBackground": "#161624",
		"list.hoverForeground": "#ffffff",
		"list.inactiveSelectionBackground": "#0e293f",
		"list.inactiveSelectionForeground": "#5f7e97",
		"list.invalidItemForeground": "#975f94",
		"merge.currentHeaderBackground": "#5f7e97",
		"merge.incomingHeaderBackground": "#7e57c25a",
		"notificationCenter.border": "#262a39",
		"notificationLink.foreground": "#80cbc4",
		"notificationToast.border": "#262a39",
		"notifications.background": "#01111d",
		"notifications.border": "#262a39",
		"notifications.foreground": "#ffffffcc",
		"panel.background": "#161624",
		"panel.border": "#5f7e97",
		"panelTitle.activeBorder": "#5f7e97",
		"panelTitle.activeForeground": "#ffffffcc",
		"panelTitle.inactiveForeground": "#d6deeb80",
		"peekView.border": "#5f7e97",
		"peekViewEditor.background": "#161624",
		"peekViewEditor.matchHighlightBackground": "#7e57c25a",
		"peekViewResult.background": "#161624",
		"peekViewResult.fileForeground": "#5f7e97",
		"peekViewResult.lineForeground": "#5f7e97",
		"peekViewResult.matchHighlightBackground": "#ffffffcc",
		"peekViewResult.selectionBackground": "#2e3250",
		"peekViewResult.selectionForeground": "#5f7e97",
		"peekViewTitle.background": "#161624",
		"peekViewTitleDescription.foreground": "#697098",
		"peekViewTitleLabel.foreground": "#5f7e97",
		"pickerGroup.border": "#161624",
		"pickerGroup.foreground": "#d1aaff",
		"scrollbar.shadow": "#010b14",
		"scrollbarSlider.activeBackground": "#084d8180",
		"scrollbarSlider.background": "#084d8180",
		"scrollbarSlider.hoverBackground": "#084d8180",
		"selection.background": "#4373c2",
		"sideBar.background": "#161624",
		"sideBar.border": "#161624",
		"sideBar.foreground": "#89a4bb",
		"sideBarSectionHeader.background": "#161624",
		"sideBarSectionHeader.foreground": "#5f7e97",
		"sideBarTitle.foreground": "#5f7e97",
		"statusBar.background": "#161624",
		"statusBar.border": "#262a39",
		"statusBar.debuggingBackground": "#202431",
		"statusBar.debuggingBorder": "#1f2330",
		"statusBar.foreground": "#5f7e97",
		"statusBar.noFolderBackground": "#161624",
		"statusBar.noFolderBorder": "#25293a",
		"statusBarItem.activeBackground": "#202431",
		"statusBarItem.hoverBackground": "#202431",
		"statusBarItem.prominentBackground": "#202431",
		"statusBarItem.prominentHoverBackground": "#202431",
		"tab.activeBackground": "#0b2942",
		"tab.activeBorder": "#262a39",
		"tab.activeForeground": "#d2dee7",
		"tab.border": "#272b3b",
		"tab.inactiveBackground": "#01111d",
		"tab.inactiveForeground": "#5f7e97",
		"tab.unfocusedActiveBorder": "#262a39",
		"tab.unfocusedActiveForeground": "#5f7e97",
		"tab.unfocusedInactiveForeground": "#5f7e97",
		"terminal.ansiBlack": "#161624",
		"terminal.ansiBlue": "#82aaff",
		"terminal.ansiBrightBlack": "#575656",
		"terminal.ansiBrightBlue": "#82aaff",
		"terminal.ansiBrightCyan": "#7fdbca",
		"terminal.ansiBrightGreen": "#22da6e",
		"terminal.ansiBrightMagenta": "#c792ea",
		"terminal.ansiBrightRed": "#ef5350",
		"terminal.ansiBrightWhite": "#ffffff",
		"terminal.ansiBrightYellow": "#ffeb95",
		"terminal.ansiCyan": "#21c7a8",
		"terminal.ansiGreen": "#22da6e",
		"terminal.ansiMagenta": "#c792ea",
		"terminal.ansiRed": "#ef5350",
		"terminal.ansiWhite": "#ffffff",
		"terminal.ansiYellow": "#c5e478",
		"terminal.selectionBackground": "#1b90dd4d",
		"terminalCursor.background": "#234d70",
		"textCodeBlock.background": "#4f4f4f",
		"titleBar.activeBackground": "#161624",
		"titleBar.activeForeground": "#eeefff",
		"titleBar.inactiveBackground": "#010e1a",
		"walkThrough.embeddedEditorBackground": "#161624",
		"widget.shadow": "#161624",
	},
	"tokenColors": [
		{
			"scope": [
				"markup.changed",
				"meta.diff.header.git",
				"meta.diff.header.from-file",
				"meta.diff.header.to-file"
			],
			"settings": {
				"foreground": "#A2BFFC",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "markup.deleted.diff",
			"settings": {
				"foreground": "#EF535090",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "markup.inserted.diff",
			"settings": {
				"foreground": "#80EEFB",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "comment",
			"settings": {
				"foreground": "#637777",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "string",
			"settings": {
				"foreground": "#ECC48D"
			}
		},
		{
			"scope": [
				"string.quoted",
				"variable.other.readwrite.js"
			],
			"settings": {
				"foreground": "#ECC48D"
			}
		},
		{
			"scope": "support.constant.math",
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": [
				"constant.numeric",
				"constant.character.numeric"
			],
			"settings": {
				"foreground": "#FF70DB",
				"fontStyle": ""
			}
		},
		{
			"scope": [
				"constant.language",
				"punctuation.definition.constant",
				"variable.other.constant"
			],
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": [
				"constant.character",
				"constant.other"
			],
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": "constant.character.escape",
			"settings": {
				"foreground": "#FF70DB"
			}
		},
		{
			"scope": [
				"string.regexp",
				"string.regexp keyword.other"
			],
			"settings": {
				"foreground": "#5CA7E4"
			}
		},
		{
			"scope": "meta.function punctuation.separator.comma",
			"settings": {
				"foreground": "#5F7E97"
			}
		},
		{
			"scope": "variable",
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": [
				"punctuation.accessor",
				"keyword"
			],
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": [
				"storage",
				"meta.var.expr",
				"meta.class meta.method.declaration meta.var.expr storage.type.js",
				"storage.type.property.js",
				"storage.type.property.ts",
				"storage.type.property.tsx"
			],
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "storage.type",
			"settings": {
				"foreground": "#C792EA"
			}
		},
		{
			"scope": "storage.type.function.arrow.js",
			"settings": {
				"fontStyle": ""
			}
		},
		{
			"scope": [
				"entity.name.class",
				"meta.class entity.name.type.class"
			],
			"settings": {
				"foreground": "#FFCB8B"
			}
		},
		{
			"scope": "entity.other.inherited-class",
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": "entity.name.function",
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": [
				"punctuation.definition.tag",
				"meta.tag"
			],
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": [
				"entity.name.tag",
				"meta.tag.other.html",
				"meta.tag.other.js",
				"meta.tag.other.tsx",
				"entity.name.tag.tsx",
				"entity.name.tag.js",
				"entity.name.tag",
				"meta.tag.js",
				"meta.tag.tsx",
				"meta.tag.html"
			],
			"settings": {
				"foreground": "#CAECE6",
				"fontStyle": ""
			}
		},
		{
			"scope": "entity.other.attribute-name",
			"settings": {
				"foreground": "#80EEFB",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "entity.name.tag.custom",
			"settings": {
				"foreground": "#FF70DB"
			}
		},
		{
			"scope": [
				"support.function",
				"support.constant"
			],
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": "support.constant.meta.property-value",
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": [
				"support.type",
				"support.class"
			],
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": "support.variable.dom",
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": "invalid",
			"settings": {
				"foreground": "#FFFFFF",
				"background": "#FF2C83"
			}
		},
		{
			"scope": "invalid.deprecated",
			"settings": {
				"foreground": "#FFFFFF",
				"background": "#D3423E"
			}
		},
		{
			"scope": "keyword.operator",
			"settings": {
				"foreground": "#7FDBCA",
				"fontStyle": ""
			}
		},
		{
			"scope": "keyword.operator.relational",
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "keyword.operator.assignment",
			"settings": {
				"foreground": "#C792EA"
			}
		},
		{
			"scope": "keyword.operator.arithmetic",
			"settings": {
				"foreground": "#C792EA"
			}
		},
		{
			"scope": "keyword.operator.bitwise",
			"settings": {
				"foreground": "#C792EA"
			}
		},
		{
			"scope": "keyword.operator.increment",
			"settings": {
				"foreground": "#C792EA"
			}
		},
		{
			"scope": "keyword.operator.ternary",
			"settings": {
				"foreground": "#C792EA"
			}
		},
		{
			"scope": "comment.line.double-slash",
			"settings": {
				"foreground": "#637777"
			}
		},
		{
			"scope": "object",
			"settings": {
				"foreground": "#CDEBF7"
			}
		},
		{
			"scope": "constant.language.null",
			"settings": {
				"foreground": "#FF5874"
			}
		},
		{
			"scope": "meta.brace",
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": "meta.delimiter.period",
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "punctuation.definition.string",
			"settings": {
				"foreground": "#D9F5DD"
			}
		},
		{
			"scope": "punctuation.definition.string.begin.markdown",
			"settings": {
				"foreground": "#FF5874"
			}
		},
		{
			"scope": "constant.language.boolean",
			"settings": {
				"foreground": "#FF5874"
			}
		},
		{
			"scope": "object.comma",
			"settings": {
				"foreground": "#FFFFFF"
			}
		},
		{
			"scope": "variable.parameter.function",
			"settings": {
				"foreground": "#7FDBCA",
				"fontStyle": ""
			}
		},
		{
			"scope": [
				"support.type.vendor.property-name",
				"support.constant.vendor.property-value",
				"support.type.property-name",
				"meta.property-list entity.name.tag"
			],
			"settings": {
				"foreground": "#80CBC4",
				"fontStyle": ""
			}
		},
		{
			"scope": "meta.property-list entity.name.tag.reference",
			"settings": {
				"foreground": "#57EAF1"
			}
		},
		{
			"scope": "constant.other.color.rgb-value punctuation.definition.constant",
			"settings": {
				"foreground": "#FF70DB"
			}
		},
		{
			"scope": "constant.other.color",
			"settings": {
				"foreground": "#FFEB95"
			}
		},
		{
			"scope": "keyword.other.unit",
			"settings": {
				"foreground": "#FFEB95"
			}
		},
		{
			"scope": "meta.selector",
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "entity.other.attribute-name.id",
			"settings": {
				"foreground": "#FAD430"
			}
		},
		{
			"scope": "meta.property-name",
			"settings": {
				"foreground": "#80CBC4"
			}
		},
		{
			"scope": [
				"entity.name.tag.doctype",
				"meta.tag.sgml.doctype"
			],
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "punctuation.definition.parameters",
			"settings": {
				"foreground": "#D9F5DD"
			}
		},
		{
			"scope": "keyword.control.operator",
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": "keyword.operator.logical",
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": ""
			}
		},
		{
			"scope": [
				"variable.instance",
				"variable.other.instance",
				"variable.readwrite.instance",
				"variable.other.readwrite.instance",
				"variable.other.property"
			],
			"settings": {
				"foreground": "#BAEBE2"
			}
		},
		{
			"scope": [
				"variable.other.object.property"
			],
			"settings": {
				"foreground": "#FAF39F",
				"fontStyle": "italic"
			}
		},
		{
			"scope": [
				"variable.other.object.js"
			],
			"settings": {
				"fontStyle": ""
			}
		},
		{
			"scope": [
				"entity.name.function"
			],
			"settings": {
				"foreground": "#82AAFF",
				"fontStyle": "italic"
			}
		},
		{
			"scope": [
				"keyword.operator.comparison",
				"keyword.control.flow.js",
				"keyword.control.flow.ts",
				"keyword.control.flow.tsx",
				"keyword.control.ruby",
				"keyword.control.module.ruby",
				"keyword.control.class.ruby",
				"keyword.control.def.ruby",
				"keyword.control.loop.js",
				"keyword.control.loop.ts",
				"keyword.control.import.js",
				"keyword.control.import.ts",
				"keyword.control.import.tsx",
				"keyword.control.from.js",
				"keyword.control.from.ts",
				"keyword.control.from.tsx",
				"keyword.operator.instanceof.js",
				"keyword.operator.expression.instanceof.ts",
				"keyword.operator.expression.instanceof.tsx"
			],
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": [
				"keyword.control.conditional.js",
				"keyword.control.conditional.ts",
				"keyword.control.switch.js",
				"keyword.control.switch.ts"
			],
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": ""
			}
		},
		{
			"scope": [
				"support.constant",
				"keyword.other.special-method",
				"keyword.other.new",
				"keyword.other.debugger",
				"keyword.control"
			],
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": "support.function",
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": "invalid.broken",
			"settings": {
				"foreground": "#020E14",
				"background": "#FF70DB"
			}
		},
		{
			"scope": "invalid.unimplemented",
			"settings": {
				"foreground": "#FFFFFF",
				"background": "#8BD649"
			}
		},
		{
			"scope": "invalid.illegal",
			"settings": {
				"foreground": "#FFFFFF",
				"background": "#EC5F67"
			}
		},
		{
			"scope": "variable.language",
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": "support.variable.property",
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": "variable.function",
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": "variable.interpolation",
			"settings": {
				"foreground": "#EC5F67"
			}
		},
		{
			"scope": "meta.function-call",
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": "punctuation.section.embedded",
			"settings": {
				"foreground": "#D3423E"
			}
		},
		{
			"scope": [
				"punctuation.terminator.expression",
				"punctuation.definition.arguments",
				"punctuation.definition.array",
				"punctuation.section.array",
				"meta.array"
			],
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": [
				"punctuation.definition.list.begin",
				"punctuation.definition.list.end",
				"punctuation.separator.arguments",
				"punctuation.definition.list"
			],
			"settings": {
				"foreground": "#D9F5DD"
			}
		},
		{
			"scope": "string.template meta.template.expression",
			"settings": {
				"foreground": "#D3423E"
			}
		},
		{
			"scope": "string.template punctuation.definition.string",
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": "italic",
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "bold",
			"settings": {
				"foreground": "#80EEFB",
				"fontStyle": "bold"
			}
		},
		{
			"scope": "quote",
			"settings": {
				"foreground": "#697098",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "raw",
			"settings": {
				"foreground": "#80CBC4"
			}
		},
		{
			"scope": "variable.assignment.coffee",
			"settings": {
				"foreground": "#31E1EB"
			}
		},
		{
			"scope": "variable.parameter.function.coffee",
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": "variable.assignment.coffee",
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": "variable.other.readwrite.cs",
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": [
				"entity.name.type.class.cs",
				"storage.type.cs"
			],
			"settings": {
				"foreground": "#FFCB8B"
			}
		},
		{
			"scope": "entity.name.type.namespace.cs",
			"settings": {
				"foreground": "#B2CCD6"
			}
		},
		{
			"scope": "string.unquoted.preprocessor.message.cs",
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": [
				"punctuation.separator.hash.cs",
				"keyword.preprocessor.region.cs",
				"keyword.preprocessor.endregion.cs"
			],
			"settings": {
				"foreground": "#FFCB8B",
				"fontStyle": "bold"
			}
		},
		{
			"scope": "variable.other.object.cs",
			"settings": {
				"foreground": "#B2CCD6"
			}
		},
		{
			"scope": "entity.name.type.enum.cs",
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": [
				"string.interpolated.single.dart",
				"string.interpolated.double.dart"
			],
			"settings": {
				"foreground": "#FFCB8B"
			}
		},
		{
			"scope": "support.class.dart",
			"settings": {
				"foreground": "#FFCB8B"
			}
		},
		{
			"scope": [
				"entity.name.tag.css",
				"entity.name.tag.less",
				"entity.name.tag.custom.css",
				"support.constant.property-value.css"
			],
			"settings": {
				"foreground": "#FF6363",
				"fontStyle": ""
			}
		},
		{
			"scope": [
				"entity.name.tag.wildcard.css",
				"entity.name.tag.wildcard.less",
				"entity.name.tag.wildcard.scss",
				"entity.name.tag.wildcard.sass"
			],
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": "keyword.other.unit.css",
			"settings": {
				"foreground": "#FFEB95"
			}
		},
		{
			"scope": [
				"meta.attribute-selector.css entity.other.attribute-name.attribute",
				"variable.other.readwrite.js"
			],
			"settings": {
				"foreground": "#FF70DB"
			}
		},
		{
			"scope": [
				"source.elixir support.type.elixir",
				"source.elixir meta.module.elixir entity.name.class.elixir"
			],
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": "source.elixir entity.name.function",
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": [
				"source.elixir constant.other.symbol.elixir",
				"source.elixir constant.other.keywords.elixir"
			],
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": "source.elixir punctuation.definition.string",
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": [
				"source.elixir variable.other.readwrite.module.elixir",
				"source.elixir variable.other.readwrite.module.elixir punctuation.definition.variable.elixir"
			],
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": "source.elixir .punctuation.binary.elixir",
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "constant.keyword.clojure",
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": "source.go meta.function-call.go",
			"settings": {
				"foreground": "#DDDDDD"
			}
		},
		{
			"scope": [
				"source.go keyword.package.go",
				"source.go keyword.import.go",
				"source.go keyword.function.go",
				"source.go keyword.type.go",
				"source.go keyword.struct.go",
				"source.go keyword.interface.go",
				"source.go keyword.const.go",
				"source.go keyword.var.go",
				"source.go keyword.map.go",
				"source.go keyword.channel.go",
				"source.go keyword.control.go"
			],
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": [
				"source.go constant.language.go",
				"source.go constant.other.placeholder.go"
			],
			"settings": {
				"foreground": "#FF5874"
			}
		},
		{
			"scope": [
				"entity.name.function.preprocessor.cpp",
				"entity.scope.name.cpp"
			],
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": [
				"meta.namespace-block.cpp"
			],
			"settings": {
				"foreground": "#E0DEC6"
			}
		},
		{
			"scope": [
				"storage.type.language.primitive.cpp"
			],
			"settings": {
				"foreground": "#FF5874"
			}
		},
		{
			"scope": [
				"meta.preprocessor.macro.cpp"
			],
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": [
				"variable.parameter"
			],
			"settings": {
				"foreground": "#FFCB8B"
			}
		},
		{
			"scope": [
				"variable.other.readwrite.powershell"
			],
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": [
				"support.function.powershell"
			],
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": "entity.other.attribute-name.id.html",
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": "punctuation.definition.tag.html",
			"settings": {
				"foreground": "#6AE9F0"
			}
		},
		{
			"scope": "meta.tag.sgml.doctype.html",
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "meta.class entity.name.type.class.js",
			"settings": {
				"foreground": "#FFCB8B"
			}
		},
		{
			"scope": "meta.method.declaration storage.type.js",
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": "terminator.js",
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": "meta.js punctuation.definition.js",
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": [
				"entity.name.type.instance.jsdoc",
				"entity.name.type.instance.phpdoc"
			],
			"settings": {
				"foreground": "#5F7E97"
			}
		},
		{
			"scope": [
				"variable.other.jsdoc",
				"variable.other.phpdoc"
			],
			"settings": {
				"foreground": "#78CCF0"
			}
		},
		{
			"scope": [
				"variable.other.meta.import.js",
				"meta.import.js variable.other",
				"variable.other.meta.export.js",
				"meta.export.js variable.other"
			],
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": "variable.parameter.function.js",
			"settings": {
				"foreground": "#7986E7"
			}
		},
		{
			"scope": [
				"variable.other.object.js",
				"variable.other.object.jsx",
				"variable.object.property.js",
				"variable.object.property.jsx"
			],
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": [
				"variable.js",
				"variable.other.js"
			],
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": [
				"entity.name.type.js",
				"entity.name.type.module.js"
			],
			"settings": {
				"foreground": "#FFCB8B",
				"fontStyle": ""
			}
		},
		{
			"scope": "support.class.js",
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": "support.type.property-name.json",
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": "support.constant.json",
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": "meta.structure.dictionary.value.json string.quoted.double",
			"settings": {
				"foreground": "#C789D6"
			}
		},
		{
			"scope": "string.quoted.double.json punctuation.definition.string.json",
			"settings": {
				"foreground": "#80CBC4"
			}
		},
		{
			"scope": "meta.structure.dictionary.json meta.structure.dictionary.value constant.language",
			"settings": {
				"foreground": "#FF5874"
			}
		},
		{
			"scope": "variable.other.object.js",
			"settings": {
				"foreground": "#7FDBCA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": [
				"variable.other.ruby"
			],
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": [
				"entity.name.type.class.ruby"
			],
			"settings": {
				"foreground": "#ECC48D"
			}
		},
		{
			"scope": "constant.language.symbol.hashkey.ruby",
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": "constant.language.symbol.ruby",
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": "entity.name.tag.less",
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": "keyword.other.unit.css",
			"settings": {
				"foreground": "#FFEB95"
			}
		},
		{
			"scope": "meta.attribute-selector.less entity.other.attribute-name.attribute",
			"settings": {
				"foreground": "#FF70DB"
			}
		},
		{
			"scope": [
				"markup.heading.markdown",
				"markup.heading.setext.1.markdown",
				"markup.heading.setext.2.markdown"
			],
			"settings": {
				"foreground": "#82B1FF"
			}
		},
		{
			"scope": "markup.italic.markdown",
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "markup.bold.markdown",
			"settings": {
				"foreground": "#80EEFB",
				"fontStyle": "bold"
			}
		},
		{
			"scope": "markup.quote.markdown",
			"settings": {
				"foreground": "#697098",
				"fontStyle": "italic"
			}
		},
		{
			"scope": "markup.inline.raw.markdown",
			"settings": {
				"foreground": "#80CBC4"
			}
		},
		{
			"scope": [
				"markup.underline.link.markdown",
				"markup.underline.link.image.markdown"
			],
			"settings": {
				"foreground": "#FF869A"
			}
		},
		{
			"scope": [
				"string.other.link.title.markdown",
				"string.other.link.description.markdown"
			],
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": [
				"punctuation.definition.string.markdown",
				"punctuation.definition.string.begin.markdown",
				"punctuation.definition.string.end.markdown",
				"meta.link.inline.markdown punctuation.definition.string"
			],
			"settings": {
				"foreground": "#82B1FF"
			}
		},
		{
			"scope": [
				"punctuation.definition.metadata.markdown"
			],
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": [
				"beginning.punctuation.definition.list.markdown"
			],
			"settings": {
				"foreground": "#82B1FF"
			}
		},
		{
			"scope": "markup.inline.raw.string.markdown",
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": [
				"variable.other.php",
				"variable.other.property.php"
			],
			"settings": {
				"foreground": "#BEC5D4"
			}
		},
		{
			"scope": "support.class.php",
			"settings": {
				"foreground": "#FFCB8B"
			}
		},
		{
			"scope": "meta.function-call.php punctuation",
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": "variable.other.global.php",
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": "variable.other.global.php punctuation.definition.variable",
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": "constant.language.python",
			"settings": {
				"foreground": "#FF5874"
			}
		},
		{
			"scope": [
				"variable.parameter.function.python",
				"meta.function-call.arguments.python"
			],
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": [
				"meta.function-call.python",
				"meta.function-call.generic.python"
			],
			"settings": {
				"foreground": "#B2CCD6"
			}
		},
		{
			"scope": "punctuation.python",
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": "entity.name.function.decorator.python",
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": "source.python variable.language.special",
			"settings": {
				"foreground": "#8EACE3"
			}
		},
		{
			"scope": "keyword.control",
			"settings": {
				"foreground": "#C792EA",
				"fontStyle": "italic"
			}
		},
		{
			"scope": [
				"variable.scss",
				"variable.sass",
				"variable.parameter.url.scss",
				"variable.parameter.url.sass"
			],
			"settings": {
				"foreground": "#80EEFB"
			}
		},
		{
			"scope": [
				"source.css.scss meta.at-rule variable",
				"source.css.sass meta.at-rule variable"
			],
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": [
				"source.css.scss meta.at-rule variable",
				"source.css.sass meta.at-rule variable"
			],
			"settings": {
				"foreground": "#BEC5D4"
			}
		},
		{
			"scope": [
				"meta.attribute-selector.scss entity.other.attribute-name.attribute",
				"meta.attribute-selector.sass entity.other.attribute-name.attribute"
			],
			"settings": {
				"foreground": "#FF70DB"
			}
		},
		{
			"scope": [
				"entity.name.tag.scss",
				"entity.name.tag.sass"
			],
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": [
				"keyword.other.unit.scss",
				"keyword.other.unit.sass"
			],
			"settings": {
				"foreground": "#FFEB95"
			}
		},
		{
			"scope": [
				"variable.other.readwrite.alias.ts",
				"variable.other.readwrite.alias.tsx",
				"variable.other.readwrite.ts",
				"variable.other.readwrite.tsx",
				"variable.other.object.ts",
				"variable.other.object.tsx",
				"variable.object.property.ts",
				"variable.object.property.tsx",
				"variable.other.ts",
				"variable.other.tsx",
				"variable.tsx",
				"variable.ts"
			],
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": [
				"entity.name.type.ts",
				"entity.name.type.tsx"
			],
			"settings": {
				"foreground": "#FFCB8B"
			}
		},
		{
			"scope": [
				"support.class.node.ts",
				"support.class.node.tsx"
			],
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": [
				"meta.type.parameters.ts entity.name.type",
				"meta.type.parameters.tsx entity.name.type"
			],
			"settings": {
				"foreground": "#5F7E97"
			}
		},
		{
			"scope": [
				"meta.import.ts punctuation.definition.block",
				"meta.import.tsx punctuation.definition.block",
				"meta.export.ts punctuation.definition.block",
				"meta.export.tsx punctuation.definition.block"
			],
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": [
				"meta.decorator punctuation.decorator.ts",
				"meta.decorator punctuation.decorator.tsx"
			],
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": "meta.tag.js meta.jsx.children.tsx",
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": "entity.name.tag.yaml",
			"settings": {
				"foreground": "#7FDBCA"
			}
		},
		{
			"scope": [
				"variable.other.readwrite.js",
				"variable.parameter"
			],
			"settings": {
				"foreground": "#D7DBE0"
			}
		},
		{
			"scope": [
				"support.class.component.js",
				"support.class.component.tsx"
			],
			"settings": {
				"foreground": "#FF70DB",
				"fontStyle": ""
			}
		},
		{
			"scope": [
				"meta.jsx.children",
				"meta.jsx.children.js",
				"meta.jsx.children.tsx"
			],
			"settings": {
				"foreground": "#D6DEEB"
			}
		},
		{
			"scope": "meta.class entity.name.type.class.tsx",
			"settings": {
				"foreground": "#FFCB8B"
			}
		},
		{
			"scope": [
				"entity.name.type.tsx",
				"entity.name.type.module.tsx"
			],
			"settings": {
				"foreground": "#FFCB8B"
			}
		},
		{
			"scope": [
				"meta.class.ts meta.var.expr.ts storage.type.ts",
				"meta.class.tsx meta.var.expr.tsx storage.type.tsx"
			],
			"settings": {
				"foreground": "#C792EA"
			}
		},
		{
			"scope": [
				"meta.method.declaration storage.type.ts",
				"meta.method.declaration storage.type.tsx"
			],
			"settings": {
				"foreground": "#82AAFF"
			}
		},
		{
			"scope": [
				"meta.property-list.css meta.property-value.css variable.other.less",
				"meta.property-list.scss variable.scss",
				"meta.property-list.sass variable.sass",
				"meta.brace",
				"keyword.operator.operator",
				"keyword.operator.or.regexp",
				"keyword.operator.expression.in",
				"keyword.operator.relational",
				"keyword.operator.assignment",
				"keyword.operator.comparison",
				"keyword.operator.type",
				"keyword.operator",
				"keyword",
				"punctuation.definintion.string",
				"punctuation",
				"variable.other.readwrite.js",
				"storage.type",
				"source.css",
				"string.quoted"
			],
			"settings": {
				"fontStyle": ""
			}
		},
		{
			"scope": "token.info-token",
			"settings": {
				"foreground": "#6796E6"
			}
		},
		{
			"scope": "token.warn-token",
			"settings": {
				"foreground": "#CD9731"
			}
		},
		{
			"scope": "token.error-token",
			"settings": {
				"foreground": "#F44747"
			}
		},
		{
			"scope": "token.debug-token",
			"settings": {
				"foreground": "#B267E6"
			}
		}
	]
}



================================================
FILE: docs/tsconfig.json
================================================
{
  "extends": "astro/tsconfigs/strict"
}



================================================
FILE: docs/src/animate.ts
================================================
const unicorn = document.querySelector<HTMLDivElement>('.unicorn')!
const light = document.querySelector<HTMLDivElement>('.light')!
const clouds = document.querySelector<HTMLDivElement>('.clouds')!
const mobileQuery = window.matchMedia('(max-width: 991px)')

const handler = (event: MouseEvent) => {
    const x = mobileQuery.matches ? 0 : (event.clientX - (window.innerWidth / 2)) / window.innerWidth * 2
    const y = mobileQuery.matches ? 0 : (event.clientY - (window.innerHeight / 2)) / window.innerHeight * 2

    unicorn.style.transform = `translate(${x * 15}px, ${y * 15}px)`
    light.style.transform = `translate(${x * 15}px, ${y * 15}px)`
    clouds.style.transform = `translate(${x * 30}px, ${y * 30}px)`
    canvas.style.transform = `rotateY(${x * -7}deg) rotateX(${y * -7}deg)`
}

window.addEventListener('mousemove', handler)

type Star = {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    glow: number
}

const createStar = () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: getRandom(0.5, 2),
    speedX: getRandom(-0.05, 0.05),
    speedY: getRandom(-0.05, 0.05),
    glow: getRandom(0, 10)
})

const canvas = document.querySelector<HTMLCanvasElement>('.galaxy')!
const ctx = canvas.getContext('2d')!
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min
const stars = new Set<Star>()

const configCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx.shadowColor = '#fff'
    ctx.fillStyle = `rgba(255, 255, 255, ${0.7})`
    stars.clear()
    Array.from({ length: Math.floor(canvas.width * canvas.height / 25_000) }, () => stars.add(createStar()))
}

configCanvas()

let debounceId: NodeJS.Timeout

window.addEventListener('resize', () => {
    clearTimeout(debounceId)
    debounceId = setTimeout(() => {
        configCanvas()
    }, 50)
})

const drawStars = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    stars.forEach(star => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.shadowBlur = star.glow
        ctx.fill()

        star.x += star.speedX
        star.y += star.speedY

        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0
    })
}

const animate = () => {
    drawStars()
    requestAnimationFrame(animate)
}

const createAnimation = (updateFn: (progress: number) => void, duration: number) => {
    let startTime: number | null = null

    const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const elapsedTime = currentTime - startTime
        const progress = Math.min(elapsedTime / duration, 1)

        updateFn(progress)

        if (progress < 1) {
            requestAnimationFrame(animate)
        }
    }

    requestAnimationFrame(animate)
}

const beamA = document.getElementById('beam-a')
const beamB = document.getElementById('beam-b')

requestAnimationFrame(() => {
    createAnimation(progress => {
        beamA?.setAttribute('offset', String(progress * 0.9))
        beamB?.setAttribute('offset', String(progress * 0.8))
    }, 500)
    animate()
})



================================================
FILE: docs/src/env.d.ts
================================================
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />



================================================
FILE: docs/src/components/Beam.astro
================================================
<svg class="beam" viewBox="0 0 2342 1348" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_146_6710)">
    <path d="M286.582 241.545L100 100L2241.85 526.563L1741.55 1175.37L286.582 241.545Z" fill="url(#paint0_linear_146_6710)"/>
    </g>
    <g filter="url(#filter1_f_146_6710)">
    <path d="M238 346.276C227 335.566 230.346 314.5 250.408 321C270.47 327.5 1147.54 838.888 1722.38 1170.73L1244.9 1247.02C1244.9 1247.02 249 356.985 238 346.276Z" fill="url(#paint1_linear_146_6710)"/>
    </g>
    <defs>
    <filter id="filter0_f_146_6710" x="0" y="0" width="2341.85" height="1275.37" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_146_6710"/>
    </filter>
    <filter id="filter1_f_146_6710" x="131.802" y="219.779" width="1690.58" height="1127.24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_146_6710"/>
    </filter>
    <linearGradient id="paint0_linear_146_6710" x1="99.0007" y1="-290.325" x2="1824.15" y2="1476.76" gradientUnits="userSpaceOnUse">
    <stop stop-color="#02B5CB"/>
    <stop id="beam-a" offset="0" stop-color="#02B5CB" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="paint1_linear_146_6710" x1="231.106" y1="-16.7767" x2="1692.51" y2="1191.41" gradientUnits="userSpaceOnUse">
    <stop stop-color="#02B5CB"/>
    <stop id="beam-b" offset="0" stop-color="#02B5CB" stop-opacity="0"/>
    </linearGradient>
    </defs>
</svg>

<style>
    .beam {
        position: absolute;
        top: max(-200px, -10vw);
        width: min(2000px, 100vw);
        aspect-ratio: 16 / 9;
        right: max(-600px, -30vw);

        @media (max-width: 991px) {
            display: none;
        }
    }
</style>



================================================
FILE: docs/src/components/Button.astro
================================================
---
export type Props = {
    text: string
    github?: boolean
    href: string
}

const { text, github, href } = Astro.props
---

<a href={href} target={github ? '_blank' : '_self'} class=`button ${github ? 'button__github' : 'button__primary'}`>
    {github && (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="32" fill="none"><path fill="#000" d="M31.72 8.169c-1.52-2.513-3.582-4.502-6.186-5.97C22.929.734 20.084 0 17 0c-3.084 0-5.929.733-8.533 2.2C5.863 3.665 3.801 5.655 2.28 8.168.76 10.68 0 13.426 0 16.4c0 3.574 1.08 6.788 3.243 9.642 2.162 2.855 4.954 4.83 8.377 5.925.398.071.693.021.886-.149a.822.822 0 0 0 .288-.64c0-.042-.003-.426-.011-1.153-.008-.727-.011-1.36-.011-1.9l-.51.084a6.698 6.698 0 0 1-1.228.075 9.652 9.652 0 0 1-1.538-.15 3.503 3.503 0 0 1-1.484-.64 2.725 2.725 0 0 1-.974-1.313l-.221-.492c-.148-.327-.38-.69-.698-1.088-.317-.399-.638-.669-.963-.811l-.155-.108a1.598 1.598 0 0 1-.288-.256c-.089-.1-.156-.199-.2-.298-.044-.1-.008-.182.111-.247.118-.064.333-.095.642-.095l.443.064c.295.057.66.227 1.095.512.436.284.793.654 1.073 1.11.34.585.749 1.03 1.229 1.336.48.306.963.458 1.45.458.486 0 .907-.036 1.26-.106.354-.071.687-.178.996-.32.133-.955.495-1.688 1.085-2.2a15.693 15.693 0 0 1-2.269-.384 9.231 9.231 0 0 1-2.08-.833 5.913 5.913 0 0 1-1.782-1.43c-.472-.57-.86-1.318-1.161-2.242-.303-.926-.454-1.993-.454-3.203 0-1.724.583-3.19 1.749-4.4-.546-1.295-.495-2.747.155-4.356.428-.128 1.063-.031 1.904.288.841.32 1.457.595 1.848.822.392.227.705.42.94.577 1.373-.37 2.79-.555 4.25-.555 1.462 0 2.878.185 4.25.555l.842-.513a12.12 12.12 0 0 1 2.036-.94c.783-.284 1.38-.363 1.794-.234.663 1.609.722 3.061.177 4.357 1.166 1.21 1.748 2.676 1.748 4.399 0 1.21-.152 2.281-.453 3.213-.303.933-.693 1.68-1.173 2.243a6.145 6.145 0 0 1-1.793 1.42 9.237 9.237 0 0 1-2.082.833c-.671.17-1.428.3-2.268.385.767.64 1.151 1.651 1.151 3.032v4.505c0 .256.092.47.277.64.185.171.475.222.874.15 3.425-1.097 6.217-3.072 8.38-5.926 2.16-2.854 3.242-6.068 3.242-9.642 0-2.974-.761-5.719-2.281-8.231l.002-.002Z"/></svg>
    )}
    {text}
</a>

<style>
    .button {
        font-size: 20px;
        font-weight: 600;
        height: 66px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        border-radius: 33px;
        cursor: pointer;
        gap: 10px;

        &__primary {
            width: 192px;
            background: linear-gradient(324.94deg, #241836 12.16%, #D928A4 95.36%)
        }

        &__github {
            width: 188px;
            background: rgba(255, 255, 255, 0.5);
            color: var(--black);
        }

        @media (max-width: 991px) {
            width: 100%;
        }
    }
</style>



================================================
FILE: docs/src/components/CompareChanges.astro
================================================
---
import { Icon } from '@astrojs/starlight/components';

export interface Props {
  commitUrl: string;
}

const { commitUrl } = Astro.props;

// Extract commit hash from URL
const getCommitHash = () => {
  const match = commitUrl.match(/commit\/([a-f0-9]{7,40})/);
  return match ? match[1].substring(0, 7) : 'commit';
};

// Extract repository name from URL
const getRepositoryName = () => {
  const match = commitUrl.match(/github\.com\/([^\/]+\/[^\/]+)/);
  return match ? match[1] : 'repository';
};

const displayCommitHash = getCommitHash();
const displayRepository = getRepositoryName();
---

<div class="compare-changes">
  <div class="compare-header">
    <Icon name="github" />
    <span class="compare-title">Compare changes with commit</span>
  </div>
  <a href={commitUrl} target="_blank" rel="noopener noreferrer" class="compare-link">
    {displayRepository}@{displayCommitHash}
  </a>
</div>

<style>
  .compare-changes {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid var(--sl-color-gray-6);
    border-radius: 0.375rem;
    background: var(--sl-color-bg);
    margin: 1rem 0;
    position: relative;
  }

  .compare-changes::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--sl-color-accent) 0%, transparent 100%);
    opacity: 0.6;
    border-radius: 0.375rem 0.375rem 0 0;
  }

  .compare-header {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .compare-title {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--sl-color-gray-2);
    line-height: 1;
  }

  .compare-link {
    font-family: var(--sl-font-mono);
    font-size: 0.75rem;
    color: var(--sl-color-gray-2);
    text-decoration: none;
    padding: 0.125rem 0;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
  }

  .compare-link:hover {
    color: var(--sl-color-accent);
    text-decoration: underline;
  }

  .compare-link:focus {
    outline: 2px solid var(--sl-color-accent);
    outline-offset: 2px;
  }

  /* GitHub icon styling */
  .compare-header :global(svg) {
    color: var(--sl-color-gray-3);
    width: 1rem;
    height: 1rem;
  }
</style>



================================================
FILE: docs/src/components/index.ts
================================================
export { default as Button } from './Button.astro'
export { default as Beam } from './Beam.astro'
export { default as TutorialNavigation } from './TutorialNavigation.astro'
export { default as CompareChanges } from './CompareChanges.astro'



================================================
FILE: docs/src/components/Seo.astro
================================================
---
import { SEO } from 'astro-seo'

type Props = {
    seo: {
        title: string,
        description?: string,
        image?: {
            src: string,
            mimeType: string,
            alt: string
        }
    }
}

const { seo: { title, description, image } } = Astro.props as Props
const DEFAULT_TITLE_PAGE = 'Unistyles 3.0'
const DEFAULT_DESCRIPTION_PAGE = 'Level up your React Native StyleSheet!'
const DEFAULT_URL_SITE = 'https://unistyl.es'
const openGraph = {
    title: title || DEFAULT_TITLE_PAGE,
    type: image?.mimeType || 'image/png',
    image: image?.src || `${DEFAULT_URL_SITE}/opengraph-image3.png`,
    alt: image?.alt || 'Unistyles',
    url: DEFAULT_URL_SITE,
    description: description || DEFAULT_DESCRIPTION_PAGE
}
---

<head>
    <SEO
        charset="UTF-8"
        title={title || DEFAULT_TITLE_PAGE}
        description={description || DEFAULT_DESCRIPTION_PAGE}
        openGraph={{
            basic: {
                title: openGraph.title,
                type: openGraph.type,
                image: openGraph.image
            },
            image: {
                alt: openGraph.alt
            },
            optional: {
                description: openGraph.description
            }
        }}
        twitter={{
            creator: '@jpudysz'
        }}
        extend={{
            link: [
                { rel: 'icon', href: '/favicon.png' },
                { rel: 'sitemap', href: '/sitemap-index.xml' }
            ],
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'generator', content: Astro.generator },
                { name: 'twitter:image', content: openGraph.image },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: openGraph.title },
                { name: 'twitter:description', content: openGraph.description },
                { name: 'twitter:site', content: '@jpudysz' }
            ]
        }}
    />
    <script>
        window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    </script>
    <script defer src="/_vercel/insights/script.js"></script>
</head>
<slot/>



================================================
FILE: docs/src/components/TutorialNavigation.astro
================================================
---
export interface Props {
  prev?: {
    title: string;
    href: string;
  };
  next?: {
    title: string;
    href: string;
  };
}

const { prev, next } = Astro.props;

const getNavigationClass = () => {
  if (prev && next) return 'has-both';
  if (prev && !next) return 'prev-only';
  if (!prev && next) return 'next-only';
  return '';
};
---

<div class={`tutorial-navigation ${getNavigationClass()}`}>
  {prev && (
    <a href={prev.href} class="tutorial-nav-link prev">
      <div class="nav-content">
        <div class="nav-header">
          <svg class="arrow" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="nav-label">Previous</span>
        </div>
        <span class="nav-title">{prev.title}</span>
      </div>
    </a>
  )}
  
  {next && (
    <a href={next.href} class="tutorial-nav-link next">
      <div class="nav-content">
        <div class="nav-header">
          <span class="nav-label">Next</span>
          <svg class="arrow" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="nav-title">{next.title}</span>
      </div>
    </a>
  )}
</div>

<style>
  .tutorial-navigation {
    display: flex;
    gap: 1rem;
    margin: 2rem 0;
  }

  .tutorial-navigation.has-both {
    justify-content: space-between;
  }

  .tutorial-navigation.prev-only {
    justify-content: flex-start;
  }

  .tutorial-navigation.next-only {
    justify-content: flex-end;
  }

  .tutorial-nav-link {
    display: flex;
    padding: 1rem 1.5rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.5rem;
    text-decoration: none;
    color: var(--sl-color-text);
    background: var(--sl-color-bg-nav);
    transition: all 0.2s ease;
    flex: 1;
    max-width: 45%;
    min-height: 80px;
  }

  .tutorial-nav-link:hover {
    border-color: var(--sl-color-accent);
    background: var(--sl-color-bg-sidebar);
    transform: translateY(-2px);
  }

  .tutorial-navigation.prev-only .tutorial-nav-link,
  .tutorial-navigation.next-only .tutorial-nav-link {
    flex: 0 0 auto;
    width: 45%;
    max-width: 45%;
  }

  .nav-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .tutorial-nav-link.prev .nav-content {
    align-items: flex-start;
  }

  .tutorial-nav-link.next .nav-content {
    align-items: flex-end;
  }

  .nav-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .nav-label {
    font-size: 0.875rem;
    color: var(--sl-color-text-accent);
    font-weight: 500;
  }

  .nav-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--sl-color-text);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
  }

  .arrow {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--sl-color-text-accent);
    transition: color 0.2s ease;
  }

  .tutorial-nav-link:hover .arrow {
    color: var(--sl-color-accent);
  }

  @media (max-width: 768px) {
    .tutorial-navigation {
      flex-direction: column;
      gap: 0.75rem;
    }

    .tutorial-nav-link {
      max-width: 100%;
    }

    .tutorial-nav-link.next {
      margin-left: 0;
    }
  }
</style>


================================================
FILE: docs/src/content/config.ts
================================================
import { defineCollection } from 'astro:content'
import { docsSchema } from '@astrojs/starlight/schema'

export const collections = {
	docs: defineCollection({ schema: docsSchema() }),
}



================================================
FILE: docs/src/content/docs/v3/guides/avoiding-keyboard.mdx
================================================
---
title: Avoiding keyboard
description: Learn how to avoid keyboard with Unistyles
---

import { Card } from '@astrojs/starlight/components'
import Seo from '../../../../components/Seo.astro'

<Seo
    seo={{
        title: 'Keyboard insets (IME)',
        description: 'Learn how to avoid keyboard with Unistyles'
    }}
>

Unistyles 3.0 introduces a new `inset` called `ime`, which is automatically animated when the keyboard appears or disappears.
Using this inset in your style will automatically register it for future updates.

Unistyles dynamically recalculates your styles based on their dependencies. To learn more about how Unistyles re-calculates your styles, please refer to the [guide](/v3/start/how-unistyles-works).

### Usage

```tsx /rt.insets.ime/
import { TextInput, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

const KeyboardAvoidingView = () => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create((theme, rt) => ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: theme.colors.backgroundColor,
        paddingHorizontal: theme.gap(2),
        paddingTop: rt.insets.top,
        transform: [
            {
                translateY: rt.insets.ime * -1
            }
        ]
    },
    input: {
        width: '100%',
    }
}))
```

In this example, the `container` will automatically adjust to avoid the keyboard, ensuring the `input` remains visible at all times.


</Seo>



================================================
FILE: docs/src/content/docs/v3/guides/custom-web.mdx
================================================
---
title: Custom Web
description: Learn how to use Unistyles 3.0 without React Native Web
---

import { Card, Aside } from '@astrojs/starlight/components'
import Seo from '../../../../components/Seo.astro'

<Seo
    seo={{
        title: 'Custom Web integration',
        description: 'Learn how to use Unistyles 3.0 without React Native Web'
    }}
>

It's possible to render Unistyles without `react-native-web` dependency by simply creating your own web-only components.

Unfortunately, you still need to install `react-native-web` in order to run your app, because most of the React Native libraries do not work without it.

For this we recommend following the guidelines provided by [Expo](https://docs.expo.dev/workflow/web/).

## How to create custom web components

In order to create custom web components, you need to use `getWebProps` function. It takes a `StyleProp` and returns an object with `className` and `ref` properties.

```tsx title="src/components/Header.tsx" /getWebProps/
import { StyleProp, TextStyle } from 'react-native'
import { getWebProps } from 'react-native-unistyles/web'

type HeaderProps = {
    style: StyleProp<TextStyle>
    children: string
}

export const Header: React.FC<HeaderProps> = ({ style, children }) => {
    const { ref, className } = getWebProps(style)

    return (
        <h1
            ref={ref}
            className={className}
        >
            {children}
        </h1>
    )
}
```

Or merge multiple styles:

```tsx title="src/components/Header.tsx" /getWebProps/
import { StyleProp, TextStyle } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { getWebProps } from 'react-native-unistyles/web'

type HeaderProps = {
    customStyle: StyleProp<TextStyle>
    children: string
}

export const Header: React.FC<HeaderProps> = ({ customStyle, children }) => {
    const webProps = getWebProps([customStyle, style.text])

    return (
        <h1 {...webProps}>
            {children}
        </h1>
    )
}

const style = StyleSheet.create(theme => ({
    text: {
        color: theme.colors.text,
        _web: {
            _hover: {
                color: theme.colors.primary,
            }
        }
    }
}))
```

That's it! Now you can use your custom web components in your app.

<Aside type="caution">
    If you're creating multiplatform app, remember to create a native fallback for your web components.
</Aside>

</Seo>



================================================
FILE: docs/src/content/docs/v3/guides/expo-router.mdx
================================================
---
title: Expo Router
description: Integrate Expo Router with Unistyles
---

import { Card, Aside } from '@astrojs/starlight/components'
import Seo from '../../../../components/Seo.astro'

<Seo
    seo={{
        title: 'Expo Router integration',
        description: 'Integrate Expo Router with Unistyles'
    }}
>


[Expo Router](https://docs.expo.dev/router/introduction/) is a popular routing library from Expo that is built on top of React Navigation. When using Unistyles with Expo Router, it's necessary to configure it properly.

### Modify main entry

Expo Router resolves routes differently than expected. Also, Unistyles 3.0 is parsing your `StyleSheets` as soon as you import file containing it.
This combination may cause some issues. To prevent that you need to modify your main entry file:

```diff lang="json" title="package.json"
{
-   "main": "expo-router/entry"
+   "main": "index.ts"
}
```

Then, create `index.ts` file with following content:

```js title="index.ts"
import 'expo-router/entry'
import './unistyles' // <-- file that initializes Unistyles
```

<Aside>
The `unistyles.ts` file is where Unistyles is configured. For more details, refer to the [configuration guide](/v3/start/configuration).
</Aside>

With this setup, we will ensure that Unistyles is initialized before any other component.

### Expo Router Web - Static rendering

:::caution
This is the default option since Expo SDK 52.
:::

You can check if you are using static rendering in `app.json`:

```json title="app.json"
{
  "expo": {
    "web": {
      "bundler": "metro",
      "output": "static"
    }
  }
}
```

For Expo static rendering, every page will be resolved with the root HTML file. Unfortunately, this file is hidden, and you need to create it manually.
Please follow the [Expo guide](https://docs.expo.dev/router/reference/static-rendering/#root-html) and add a `+html.tsx` file.

In this file, initialize Unistyles by importing the config file:

```diff lang="tsx" title="+html.tsx"
import React from 'react'
import { ScrollViewStyleReset } from 'expo-router/html'
import { type PropsWithChildren } from 'react'
+ import '../unistyles' // <-- file that initializes Unistyles

export default function Root({ children }: PropsWithChildren) {
    ...
}
```

This ensures that Unistyles is initialized whenever Expo Router renders the next static page.

</Seo>



================================================
FILE: docs/src/content/docs/v3/guides/merging-styles.mdx
================================================
---
title: Merging styles
description: Learn about how to